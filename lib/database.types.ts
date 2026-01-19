export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'client' | 'admin'
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'client' | 'admin'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'client' | 'admin'
          created_at?: string
        }
      }
      automation_requests: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          status?: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          status?: 'pending' | 'in_progress' | 'completed' | 'cancelled'
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          name: string
          status: 'active' | 'paused' | 'completed'
          n8n_webhook_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          status?: 'active' | 'paused' | 'completed'
          n8n_webhook_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          status?: 'active' | 'paused' | 'completed'
          n8n_webhook_url?: string | null
          created_at?: string
        }
      }
    }
  }
}
