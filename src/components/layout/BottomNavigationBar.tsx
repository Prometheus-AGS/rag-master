import * as React from 'react'
import { Button } from '@/components/ui/button'
import { 
  Database, 
  Github, 
  Home, 
  MoreHorizontal 
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

interface NavigationItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  external?: boolean
}

interface BottomNavigationBarProps {
  navigationLinks: NavigationItem[]
}

export function BottomNavigationBar({ navigationLinks }: BottomNavigationBarProps) {
  const [isMoreOpen, setIsMoreOpen] = React.useState(false)

  // Add Home as the first item
  const allNavItems: NavigationItem[] = [
    { href: '/', label: 'Home', icon: Home },
    ...navigationLinks
  ]

  const visibleItems = allNavItems.slice(0, 4)
  const moreItems = allNavItems.slice(4)
  const showMoreButton = moreItems.length > 0

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border lg:hidden">
      <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
        {visibleItems.map((item, index) => (
          <Button
            key={item.href}
            variant="ghost"
            size="sm"
            className="flex flex-col items-center justify-center h-12 w-16 p-1 text-xs"
            asChild
          >
            <a
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-[10px] leading-none">{item.label}</span>
            </a>
          </Button>
        ))}
        
        {showMoreButton && (
          <Sheet open={isMoreOpen} onOpenChange={setIsMoreOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center justify-center h-12 w-16 p-1 text-xs"
              >
                <MoreHorizontal className="h-5 w-5 mb-1" />
                <span className="text-[10px] leading-none">More</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto">
              <SheetHeader>
                <SheetTitle>More Navigation</SheetTitle>
              </SheetHeader>
              <div className="grid grid-cols-2 gap-4 mt-6 pb-6">
                {moreItems.map((item) => (
                  <Button
                    key={item.href}
                    variant="outline"
                    className="flex flex-col items-center justify-center h-20 p-4"
                    asChild
                  >
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="flex flex-col items-center justify-center w-full h-full"
                      onClick={() => setIsMoreOpen(false)}
                    >
                      <item.icon className="h-6 w-6 mb-2" />
                      <span className="text-sm">{item.label}</span>
                    </a>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  )
}

export default BottomNavigationBar