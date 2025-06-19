import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'
import type { UserProfile, Organization } from '@/types'

interface AuthState {
  user: User | null
  session: Session | null
  profile: UserProfile | null
  organization: Organization | null
  showAuth: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string, organizationName?: string) => Promise<void>
  signOut: () => Promise<void>
  loadProfile: () => Promise<void>
  setShowAuth: (show: boolean) => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      profile: null,
      organization: null,
      showAuth: false,
      isLoading: false,
      error: null,

      signIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null })
          
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          })

          if (error) throw error

          set({ 
            user: data.user,
            session: data.session,
            showAuth: false
          })

          // Load profile after successful sign in
          await get().loadProfile()
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Sign in failed' })
        } finally {
          set({ isLoading: false })
        }
      },

      signUp: async (email: string, password: string, fullName: string, organizationName?: string) => {
        try {
          set({ isLoading: true, error: null })
          
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
                organization_name: organizationName || 'Personal'
              }
            }
          })

          if (error) throw error

          if (data.user) {
            set({ 
              user: data.user,
              session: data.session,
              showAuth: false
            })
            
            // Load profile after successful sign up
            await get().loadProfile()
          }
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Sign up failed' })
        } finally {
          set({ isLoading: false })
        }
      },

      signOut: async () => {
        try {
          set({ isLoading: true })
          
          const { error } = await supabase.auth.signOut()
          if (error) throw error

          set({
            user: null,
            session: null,
            profile: null,
            organization: null,
            showAuth: false
          })
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Sign out failed' })
        } finally {
          set({ isLoading: false })
        }
      },

      loadProfile: async () => {
        try {
          const { user } = get()
          if (!user) return

          set({ isLoading: true })

          // Load user profile
          const { data: profile, error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          if (profileError) throw profileError

          // Load organization
          const { data: organization, error: orgError } = await supabase
            .from('organizations')
            .select('*')
            .eq('id', profile.organization_id)
            .single()

          if (orgError) throw orgError

          set({
            profile,
            organization
          })
        } catch (error) {
          console.error('Failed to load profile:', error)
          set({ error: error instanceof Error ? error.message : 'Failed to load profile' })
        } finally {
          set({ isLoading: false })
        }
      },

      setShowAuth: (show: boolean) => {
        set({ showAuth: show, error: null })
      },

      clearError: () => {
        set({ error: null })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        profile: state.profile,
        organization: state.organization
      })
    }
  )
)

// Initialize auth state from Supabase session
supabase.auth.onAuthStateChange((event, session) => {
  
  if (event === 'SIGNED_IN' && session) {
    useAuthStore.setState({
      user: session.user,
      session
    })
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({
      user: null,
      session: null,
      profile: null,
      organization: null
    })
  }
})
