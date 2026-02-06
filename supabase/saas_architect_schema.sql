-- =============================================
-- SAAS ARCHITECT SCHEMA
-- Implementation of strict access control & admin
-- =============================================

-- 1. ENUMS & UTILS
-- ---------------------------------------------
create type access_status as enum ('active', 'suspended', 'expired');
create type payment_status as enum ('paid', 'failed', 'refunded');

-- 2. PRODUCTS TABLE UPDATE
-- ---------------------------------------------
-- Ensure products has necessary fields
alter table products add column if not exists is_subscription boolean default false;
alter table products add column if not exists internal_code text;
-- Add unique constraint to internal_code for lookups
create unique index if not exists products_internal_code_idx on products(internal_code);

-- 3. USER_PRODUCTS TABLE (THE BRAIN)
-- ---------------------------------------------
create table if not exists user_products (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  product_id uuid references products(id) not null,
  status access_status default 'active',
  expires_at timestamp with time zone, -- Null = Lifetime access
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for fast access checks
create index if not exists user_products_lookup_idx on user_products(user_id, product_id);

-- 4. PAYMENTS TABLE
-- ---------------------------------------------
create table if not exists payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  product_id uuid references products(id) not null,
  amount numeric not null,
  currency text default 'USD',
  payment_provider text default 'stripe_mock',
  status payment_status default 'paid',
  paid_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. ROW LEVEL SECURITY (STRICT)
-- ---------------------------------------------

-- Helper function to check if user is admin
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer;

-- Enable RLS
alter table user_products enable row level security;
alter table payments enable row level security;
alter table products enable row level security;

-- USER_PRODUCTS POLICIES
create policy "Admins can view all user_products"
  on user_products for select
  using ( is_admin() );

create policy "Admins can insert/update user_products"
  on user_products for all
  using ( is_admin() );

create policy "Users can view their own products"
  on user_products for select
  using ( auth.uid() = user_id );

-- ALLOW USERS TO INSERT THEIR OWN PRODUCTS (For Demo/Mock Purchase)
-- In real strict SaaS, this would be disabled and handled by a Service Role hook.
create policy "Users can purchase products (demo)"
  on user_products for insert
  with check ( auth.uid() = user_id );

-- PAYMENTS POLICIES
create policy "Admins can view all payments"
  on payments for select
  using ( is_admin() );

create policy "Users can view their own payments"
  on payments for select
  using ( auth.uid() = user_id );

create policy "System can insert payments"
  on payments for insert
  with check ( auth.uid() = user_id );

-- PRODUCTS POLICIES
create policy "Everyone can view products"
  on products for select
  using ( true );

create policy "Admins can manage products"
  on products for all
  using ( is_admin() );

-- PROFILES POLICIES
drop policy if exists "Users can view own profile" on profiles;
create policy "Users can view own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Admins can view all profiles"
  on profiles for select
  using ( is_admin() );

create policy "Admins can update all profiles"
  on profiles for update
  using ( is_admin() );
