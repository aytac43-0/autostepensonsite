/*
  # Optimize RLS Policies for Performance

  ## Overview
  Optimizes all RLS policies to prevent re-evaluation of auth functions for each row by wrapping auth.uid() in a SELECT statement.

  ## Changes Made
  
  ### Performance Optimization
  Replaces all instances of `auth.uid()` with `(select auth.uid())` in RLS policies.
  This prevents the function from being re-evaluated for each row, significantly improving query performance at scale.
  
  ### Tables Updated
  
  1. **profiles**
     - "Users can view own profile" - Optimized SELECT policy
     - "Users can update own profile" - Optimized UPDATE policy
     - "Admins can view all profiles" - Optimized SELECT policy with subquery
  
  2. **automation_requests**
     - "Users can view own requests" - Optimized SELECT policy
     - "Users can create own requests" - Optimized INSERT policy
     - "Users can update own requests" - Optimized UPDATE policy
     - "Admins can view all requests" - Optimized SELECT policy with subquery
     - "Admins can update all requests" - Optimized UPDATE policy with subquery
  
  3. **projects**
     - "Users can view own projects" - Optimized SELECT policy
     - "Admins can view all projects" - Optimized SELECT policy with subquery
     - "Admins can create projects" - Optimized INSERT policy with subquery
     - "Admins can update all projects" - Optimized UPDATE policy with subquery

  ## Security Notes
  - All security restrictions remain identical to the original policies
  - Only the performance characteristics have been improved
  - No changes to access control logic
*/

-- Drop existing policies for profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Drop existing policies for automation_requests
DROP POLICY IF EXISTS "Users can view own requests" ON automation_requests;
DROP POLICY IF EXISTS "Users can create own requests" ON automation_requests;
DROP POLICY IF EXISTS "Users can update own requests" ON automation_requests;
DROP POLICY IF EXISTS "Admins can view all requests" ON automation_requests;
DROP POLICY IF EXISTS "Admins can update all requests" ON automation_requests;

-- Drop existing policies for projects
DROP POLICY IF EXISTS "Users can view own projects" ON projects;
DROP POLICY IF EXISTS "Admins can view all projects" ON projects;
DROP POLICY IF EXISTS "Admins can create projects" ON projects;
DROP POLICY IF EXISTS "Admins can update all projects" ON projects;

-- Recreate optimized profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = (select auth.uid())
      AND profiles.role = 'admin'
    )
  );

-- Recreate optimized automation_requests policies
CREATE POLICY "Users can view own requests"
  ON automation_requests FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create own requests"
  ON automation_requests FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own requests"
  ON automation_requests FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Admins can view all requests"
  ON automation_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = (select auth.uid())
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all requests"
  ON automation_requests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = (select auth.uid())
      AND profiles.role = 'admin'
    )
  );

-- Recreate optimized projects policies
CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Admins can view all projects"
  ON projects FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = (select auth.uid())
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = (select auth.uid())
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = (select auth.uid())
      AND profiles.role = 'admin'
    )
  );
