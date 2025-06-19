import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Database, Zap, Shield, Users, Star, Github, Upload, Search, Brain, Download, ChevronLeft, ChevronRight, Bot } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useIsMobile } from '@/hooks/use-mobile'
import { useRef, useState, useEffect } from 'react'
import { TopNavigationBar } from '@/components/layout/TopNavigationBar'
import { Footer } from '@/components/layout/Footer'

export function LandingPage() {
  const isMobile = useIsMobile()
  const { setShowAuth } = useAuthStore()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const handleGetStarted = () => {
    setShowAuth(true)
  }

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320 // Approximate width of each card including gap
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320 // Approximate width of each card including gap
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    checkScrollButtons()
    const handleResize = () => checkScrollButtons()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const features = [
    {
      icon: Database,
      title: 'Smart Data Processing',
      description: 'Advanced RAG capabilities with intelligent document parsing and semantic search.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with real-time responses and efficient data retrieval.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with end-to-end encryption and compliance standards.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Built for teams with shared workspaces and collaborative workflows.'
    }
  ]

  const workflowSteps = [
    {
      step: 1,
      icon: Upload,
      title: 'Upload Documents',
      description: 'Simply drag and drop your documents, PDFs, or text files into RAG Master.'
    },
    {
      step: 2,
      icon: Brain,
      title: 'AI Processing',
      description: 'Our advanced AI analyzes and indexes your content for intelligent retrieval.'
    },
    {
      step: 3,
      icon: Search,
      title: 'Smart Search',
      description: 'Ask questions in natural language and get precise, contextual answers.'
    },
    {
      step: 4,
      icon: Download,
      title: 'Export Results',
      description: 'Download insights, summaries, or integrate with your existing workflows.'
    },
    {
      step: 5,
      icon: Bot,
      title: 'Agent Retrieval Tool',
      description: 'Expose RAG configuration as a tool for agents to retrieve custom chunked content according to a strategy.'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Data Scientist',
      company: 'TechCorp',
      content: 'RAG Master transformed how we handle document analysis. The accuracy is incredible.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Engineering Manager',
      company: 'StartupXYZ',
      content: 'Implementation was seamless. Our team productivity increased by 40% in the first month.',
      rating: 5
    },
    {
      name: 'Emily Johnson',
      role: 'Research Director',
      company: 'Innovation Labs',
      content: 'The best RAG solution we have tried. Intuitive interface with powerful capabilities.',
      rating: 5
    }
  ]

  return (
    <>
      <TopNavigationBar />
      <main className={`flex-grow pt-16 ${isMobile ? 'pb-20' : ''}`}>
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                🚀 Now in Beta
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Master Your Data with{' '}
                <span className="text-primary">Intelligent RAG</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
                Transform your documents into intelligent, searchable knowledge bases. 
                RAG Master combines cutting-edge AI with intuitive design to revolutionize 
                how you interact with your data.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button size="lg" onClick={handleGetStarted} className="text-base">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="text-base">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section id="workflow" className="py-20 bg-background">
          <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                How RAG Master Works
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Transform your documents into intelligent knowledge in four simple steps.
              </p>
            </div>
            
            {/* Carousel Container */}
            <div className="relative">
              {/* Left Arrow - Only show when can scroll left */}
              {canScrollLeft && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full shadow-lg hover:bg-accent"
                  onClick={scrollLeft}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              )}

              {/* Right Arrow - Only show when can scroll right */}
              {canScrollRight && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full shadow-lg hover:bg-accent"
                  onClick={scrollRight}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              )}

              {/* Scrollable Content */}
              <div
                ref={scrollContainerRef}
                className="flex gap-8 overflow-x-auto scrollbar-hide px-12 py-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onScroll={checkScrollButtons}
              >
                {workflowSteps.map((step, index) => (
                  <div key={step.step} className="flex-none w-80 text-center">
                    <Card className="h-full border-0 shadow-sm bg-card/50 backdrop-blur">
                      <CardContent className="p-8">
                        <div className="relative mb-6">
                          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <step.icon className="h-8 w-8 text-primary" />
                          </div>
                          <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                            {step.step}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Everything you need to succeed
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed to make your data work smarter, not harder.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center border-0 shadow-sm">
                  <CardHeader>
                    <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Trusted by teams worldwide
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                See what our users are saying about RAG Master.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardDescription className="text-base italic">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Ready to transform your data?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                Join thousands of teams already using RAG Master to unlock the power of their documents.
              </p>
              <div className="mt-8">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  onClick={handleGetStarted}
                  className="text-base"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default LandingPage
