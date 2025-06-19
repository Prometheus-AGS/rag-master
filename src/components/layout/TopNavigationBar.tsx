import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Database, Github, User } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useIsMobile } from '@/hooks/use-mobile'

export function TopNavigationBar() {
  const isMobile = useIsMobile()
  const { setShowAuth, user, profile } = useAuthStore()

  const handleSignIn = () => {
    setShowAuth(true)
  }

  const handleGetStarted = () => {
    setShowAuth(true)
  }

  const handleWorkflowClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const workflowSection = document.getElementById('workflow')
    if (workflowSection) {
      workflowSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const navLinks = [
    { href: '#workflow', label: 'Workflow', onClick: handleWorkflowClick },
    {
      href: 'https://github.com',
      label: 'GitHub',
      icon: Github,
      external: true
    }
  ]

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="container mx-auto max-w-screen-2xl h-full">
        <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo - Left */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2" aria-label="RAG Master Home">
              <Database className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">RAG Master</span>
            </a>
          </div>

          {/* Desktop: Center Navigation */}
          {!isMobile && (
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  onClick={link.onClick}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* Right: Auth Buttons (Desktop) / Avatar Dropdown (Mobile) */}
          {!isMobile ? (
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={handleSignIn}
                className="text-sm font-medium text-foreground"
              >
                Sign In
              </Button>
              <Button 
                onClick={handleGetStarted}
                size="sm"
                className="text-sm font-medium"
              >
                Get Started
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none">
                  <Avatar className="h-8 w-8 shadow-none">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="shadow-none border-0">
                      {profile?.fullName ? getInitials(profile.fullName) : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                {user ? (
                  <>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={handleSignIn}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Sign In</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleGetStarted}>
                      <span>Get Started</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}

export default TopNavigationBar
