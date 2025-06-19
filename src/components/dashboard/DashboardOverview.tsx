import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Database,
  FileText,
  Search,
  Users,
  Plus,
  ArrowRight,
  Zap,
  BarChart3,
  Upload,
  Brain,
  Activity
} from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'

export function DashboardOverview() {
  const { profile, organization } = useAuthStore()

  const stats = [
    {
      name: 'Knowledge Bases',
      value: '3',
      change: '+2 this month',
      changeType: 'positive',
      icon: Database,
    },
    {
      name: 'Documents',
      value: '1,247',
      change: '+180 this week',
      changeType: 'positive',
      icon: FileText,
    },
    {
      name: 'Searches',
      value: '8,429',
      change: '+12% from last month',
      changeType: 'positive',
      icon: Search,
    },
    {
      name: 'Team Members',
      value: '12',
      change: '+3 this month',
      changeType: 'positive',
      icon: Users,
    },
  ]

  const recentKnowledgeBases = [
    {
      id: 1,
      name: 'Product Documentation',
      description: 'Technical documentation and user guides',
      documents: 156,
      lastUpdated: '2 hours ago',
      status: 'active',
    },
    {
      id: 2,
      name: 'Customer Support',
      description: 'FAQ and support articles',
      documents: 89,
      lastUpdated: '1 day ago',
      status: 'active',
    },
    {
      id: 3,
      name: 'Research Papers',
      description: 'Academic and industry research',
      documents: 234,
      lastUpdated: '3 days ago',
      status: 'processing',
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'upload',
      message: 'New document uploaded to Product Documentation',
      time: '5 minutes ago',
      icon: Upload,
    },
    {
      id: 2,
      type: 'search',
      message: 'High-relevance search performed on Customer Support',
      time: '12 minutes ago',
      icon: Search,
    },
    {
      id: 3,
      type: 'processing',
      message: 'Document processing completed for Research Papers',
      time: '1 hour ago',
      icon: Brain,
    },
    {
      id: 4,
      type: 'user',
      message: 'New team member added to organization',
      time: '2 hours ago',
      icon: Users,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {profile?.fullName?.split(' ')[0] || 'User'}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your knowledge bases in {organization?.name || 'your organization'}.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Get started with common tasks and workflows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button className="h-auto flex-col space-y-2 p-6" variant="outline">
              <Plus className="h-8 w-8" />
              <div className="text-center">
                <div className="font-medium">Create Knowledge Base</div>
                <div className="text-xs text-muted-foreground">
                  Start a new intelligent repository
                </div>
              </div>
            </Button>
            <Button className="h-auto flex-col space-y-2 p-6" variant="outline">
              <Upload className="h-8 w-8" />
              <div className="text-center">
                <div className="font-medium">Upload Documents</div>
                <div className="text-xs text-muted-foreground">
                  Add content to existing bases
                </div>
              </div>
            </Button>
            <Button className="h-auto flex-col space-y-2 p-6" variant="outline">
              <Search className="h-8 w-8" />
              <div className="text-center">
                <div className="font-medium">Search Knowledge</div>
                <div className="text-xs text-muted-foreground">
                  Find information across all bases
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Knowledge Bases */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Knowledge Bases</CardTitle>
                <CardDescription>
                  Your active intelligent repositories
                </CardDescription>
              </div>
              <Button size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentKnowledgeBases.map((kb) => (
                <div key={kb.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{kb.name}</h4>
                      <Badge variant={kb.status === 'active' ? 'default' : 'secondary'}>
                        {kb.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{kb.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{kb.documents} documents</span>
                      <span>Updated {kb.lastUpdated}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates across your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Performance Overview
          </CardTitle>
          <CardDescription>
            Key metrics for your knowledge management system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Search Accuracy</span>
                <span className="font-medium">94%</span>
              </div>
              <Progress value={94} className="h-2" />
              <p className="text-xs text-muted-foreground">
                +2% from last month
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Processing Speed</span>
                <span className="font-medium">87%</span>
              </div>
              <Progress value={87} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Average 1.2s per document
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Storage Utilization</span>
                <span className="font-medium">68%</span>
              </div>
              <Progress value={68} className="h-2" />
              <p className="text-xs text-muted-foreground">
                2.1GB of 3GB used
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
