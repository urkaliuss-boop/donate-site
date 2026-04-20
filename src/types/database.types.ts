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
          steam_id: string | null
          discord_id: string | null
          username: string | null
          avatar_url: string | null
          role: 'user' | 'admin'
          created_at: string
        }
        Insert: {
          id: string
          steam_id?: string | null
          discord_id?: string | null
          username?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          created_at?: string
        }
        Update: {
          id?: string
          steam_id?: string | null
          discord_id?: string | null
          username?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price_cents: number
          image_url: string | null
          category: string
          duration_days: number | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price_cents: number
          image_url?: string | null
          category: string
          duration_days?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price_cents?: number
          image_url?: string | null
          category?: string
          duration_days?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          total_amount_cents: number
          currency: string
          payment_method: string | null
          external_payment_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          total_amount_cents: number
          currency?: string
          payment_method?: string | null
          external_payment_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          total_amount_cents?: number
          currency?: string
          payment_method?: string | null
          external_payment_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      transaction_items: {
        Row: {
          id: string
          transaction_id: string
          product_id: string
          price_cents: number
          quantity: number
          created_at: string
        }
        Insert: {
          id?: string
          transaction_id: string
          product_id: string
          price_cents: number
          quantity?: number
          created_at?: string
        }
        Update: {
          id?: string
          transaction_id?: string
          product_id?: string
          price_cents?: number
          quantity?: number
          created_at?: string
        }
      }
      user_purchases: {
        Row: {
          id: string
          user_id: string
          product_id: string
          transaction_id: string | null
          starts_at: string
          expires_at: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          transaction_id?: string | null
          starts_at?: string
          expires_at?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          transaction_id?: string | null
          starts_at?: string
          expires_at?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'user' | 'admin'
      transaction_status: 'pending' | 'completed' | 'failed' | 'refunded'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
