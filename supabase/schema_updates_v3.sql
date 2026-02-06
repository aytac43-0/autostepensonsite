-- Create Projects Table
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  name text not null,
  description text,
  status text check (status in ('active', 'paused', 'completed')) default 'active',
  webhook_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Projects
alter table projects enable row level security;

-- Policies for Projects
create policy "Users can view their own projects"
  on projects for select
  using ( auth.uid() = user_id );

create policy "Users can create their own projects"
  on projects for insert
  with check ( auth.uid() = user_id );

-- Create Automation Requests Table
create table if not exists automation_requests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  title text not null,
  description text not null,
  status text check (status in ('pending', 'in_progress', 'completed', 'rejected')) default 'pending',
  priority text check (priority in ('low', 'medium', 'high')) default 'medium',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Automation Requests
alter table automation_requests enable row level security;

-- Policies for Automation Requests
create policy "Users can view their own requests"
  on automation_requests for select
  using ( auth.uid() = user_id );

create policy "Users can create their own requests"
  on automation_requests for insert
  with check ( auth.uid() = user_id );

create policy "Admins can view all requests"
  on automation_requests for select
  using ( 
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Create Indexes for performance
create index if not exists projects_user_id_idx on projects(user_id);
create index if not exists automation_requests_user_id_idx on automation_requests(user_id);
