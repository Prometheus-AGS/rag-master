import { useEffect } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { AuthForm } from '@/components/auth/AuthForm'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'
import { LandingPage } from '@/components/landing/LandingPage'
import { useAuthStore } from '@/stores/authStore'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const { user, loadProfile, showAuth } = useAuthStore()

  useEffect(() => {
    // Load user profile on app start if user exists
    if (user && !useAuthStore.getState().profile) {
      loadProfile()
    }
  }, [user, loadProfile])

  // Show auth form when explicitly requested
  if (showAuth && !user) {
    return (
      <>
        <AuthForm />
        <Toaster />
      </>
    )
  }

  // Show dashboard if authenticated
  if (user) {
    return (
      <>
        <AppLayout>
          <DashboardOverview />
        </AppLayout>
        <Toaster />
      </>
    )
  }

  // Show landing page by default
  return (
    <>
      <LandingPage />
      <Toaster />
    </>
  )
}

export default App
