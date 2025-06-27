"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard, StatsGrid } from "@/components/ui/stats-card"
import { BarChart3, Users, Building2, Calendar } from "lucide-react"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"

export default function DashboardPage() {
  const dispatch = useAppDispatch()
  useKeyboardShortcuts()

  useEffect(() => {
    dispatch(setActiveTab("dashboard"))
  }, [dispatch])

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your properties.</p>
      </div>

      <StatsGrid className="mb-8">
        <StatsCard
          title="Total Properties"
          value="24"
          description="Active listings"
          icon={Building2}
          color="text-blue-500"
        />
        <StatsCard
          title="Active Reservations"
          value="18"
          description="Current bookings"
          icon={Calendar}
          color="text-green-500"
          trend={{ value: "+12%", isPositive: true }}
        />
        <StatsCard
          title="Total Users"
          value="156"
          description="Registered guests"
          icon={Users}
          color="text-purple-500"
        />
        <StatsCard
          title="Revenue"
          value="$12,450"
          description="This month"
          icon={BarChart3}
          color="text-yellow-500"
          trend={{ value: "+8.2%", isPositive: true }}
        />
      </StatsGrid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
            <CardDescription className="text-muted-foreground">Latest updates from your properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">New reservation for Ocean View Villa</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">Property maintenance completed</p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">New user registration</p>
                  <p className="text-xs text-muted-foreground">6 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Upcoming Tasks</CardTitle>
            <CardDescription className="text-muted-foreground">Tasks that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">Property inspection due</p>
                  <p className="text-xs text-muted-foreground">Tomorrow</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">Guest check-in preparation</p>
                  <p className="text-xs text-muted-foreground">In 2 days</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">Monthly report generation</p>
                  <p className="text-xs text-muted-foreground">Next week</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
