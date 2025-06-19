import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Database types
export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          settings: Record<string, any>
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          settings?: Record<string, any>
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          settings?: Record<string, any>
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          organization_id: string
          role: 'owner' | 'admin' | 'editor' | 'viewer'
          full_name: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          organization_id: string
          role?: 'owner' | 'admin' | 'editor' | 'viewer'
          full_name: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          organization_id?: string
          role?: 'owner' | 'admin' | 'editor' | 'viewer'
          full_name?: string
          avatar_url?: string | null
          updated_at?: string
        }
      }
      knowledge_bases: {
        Row: {
          id: string
          organization_id: string
          name: string
          description: string | null
          settings: Record<string, any>
          chunking_strategy: Record<string, any>
          retrieval_config: Record<string, any>
          embedding_provider: string
          embedding_model: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          name: string
          description?: string | null
          settings?: Record<string, any>
          chunking_strategy?: Record<string, any>
          retrieval_config?: Record<string, any>
          embedding_provider?: string
          embedding_model?: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string | null
          settings?: Record<string, any>
          chunking_strategy?: Record<string, any>
          retrieval_config?: Record<string, any>
          embedding_provider?: string
          embedding_model?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          knowledge_base_id: string
          filename: string
          original_filename: string
          file_type: string
          file_size: number
          storage_path: string
          content_hash: string
          metadata: Record<string, any>
          processing_status: 'pending' | 'processing' | 'completed' | 'failed'
          processing_error: string | null
          uploaded_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          knowledge_base_id: string
          filename: string
          original_filename: string
          file_type: string
          file_size: number
          storage_path: string
          content_hash: string
          metadata?: Record<string, any>
          processing_status?: 'pending' | 'processing' | 'completed' | 'failed'
          processing_error?: string | null
          uploaded_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          filename?: string
          metadata?: Record<string, any>
          processing_status?: 'pending' | 'processing' | 'completed' | 'failed'
          processing_error?: string | null
          updated_at?: string
        }
      }
      document_chunks: {
        Row: {
          id: string
          document_id: string
          knowledge_base_id: string
          chunk_index: number
          content: string
          content_length: number
          metadata: Record<string, any>
          embedding: number[] | null
          created_at: string
        }
        Insert: {
          id?: string
          document_id: string
          knowledge_base_id: string
          chunk_index: number
          content: string
          content_length: number
          metadata?: Record<string, any>
          embedding?: number[] | null
          created_at?: string
        }
        Update: {
          content?: string
          content_length?: number
          metadata?: Record<string, any>
          embedding?: number[] | null
        }
      }
      api_keys: {
        Row: {
          id: string
          organization_id: string
          name: string
          key_hash: string
          permissions: string[]
          last_used_at: string | null
          expires_at: string | null
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          name: string
          key_hash: string
          permissions?: string[]
          last_used_at?: string | null
          expires_at?: string | null
          created_by: string
          created_at?: string
        }
        Update: {
          name?: string
          permissions?: string[]
          last_used_at?: string | null
          expires_at?: string | null
        }
      }
    }
  }
}
