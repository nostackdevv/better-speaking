/**
 * Supabase Database Types
 *
 * Generated types for type-safe database operations
 */

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
      waitlist: {
        Row: {
          id: string
          email: string
          source: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          source?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          source?: string
          created_at?: string
        }
      }
    }
  }
}
