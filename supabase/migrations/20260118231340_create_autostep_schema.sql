/*
  # Autostep SaaS Platform Schema

  ## Overview
  Creates the complete database schema for Autostep AI Automation Agency platform including user profiles, automation requests, and projects.

  ## Tables Created

  1. **profiles**
     - `id` (uuid, primary key) - References auth.users
     - `email` (text, unique, not null) - User email address
     - `full_name` (text, nullable) - User's full name
     - `role` (text, not null) - User role: 'client' or 'admin'
     - `created_at` (timestamptz) - Account creation timestamp
     
  2. **automation_requests**
     - `id` (uuid, primary key) - Unique request identifier
     - `user_id` (uuid, not null) - References profiles(id)
     - `title` (text, not null) - Request title
     - `description` (text, nullable) - Detailed description
     - `status` (text, not null) - Request status: 'pending', 'in_progress', 'completed', 'cancelled'
     - `created_at` (timestamptz) - Request creation timestamp
     
  3. **projects**
     - `id` (uuid, primary key) - Unique project identifier
     - `user_id` (uuid, not null) - References profiles(id)
     - `name` (text, not null) - Project name
     - `status` (text, not null) - Project status: 'active', 'paused', 'completed'
     - `n8n_webhook_url` (text, nullable) - n8n webhook endpoint
     - `created_at` (timestamptz) - Project creation timestamp

  ## Security

  ### Row Level Security (RLS)
  All tables have RLS enabled with the following policies:
  
  **profiles:**
  - Users can view their own profile
  - Users can update their own profile
  - Admins can view all profiles
  
  **automation_requests:**
  - Users can view their own requests
  - Users can create their own requests
  - Users can update their own requests
  - Admins can view all requests
  - Admins can update all requests
  
  **projects:**
  - Users can view their own projects
  - Admins can view all projects
  - Admins can create and update all projects

  ## Notes
  - All IDs use gen_random_uuid() for secure generation
  - Timestamps default to now()
  - Foreign keys ensure referential integrity
  - Status fields use text type with application-level validation
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  role text NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  created_at timestamptz DEFAULT now()
);

-- Create automation_requests table
CREATE TABLE IF NOT EXISTS automation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
  n8n_webhook_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Automation requests policies
CREATE POLICY "Users can view own requests"
  ON automation_requests FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own requests"
  ON automation_requests FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own requests"
  ON automation_requests FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all requests"
  ON automation_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all requests"
  ON automation_requests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Projects policies
CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all projects"
  ON projects FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_automation_requests_user_id ON automation_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_automation_requests_status ON automation_requests(status);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
