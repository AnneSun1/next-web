"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/ui/stats-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Users, Home, DollarSign, CheckCircle, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
      icon: DollarSign,
      trend: "up" as const,
    },
    {
      title: "Active Reservations",
      value: "23",
      change: "+180.1% from last month",
      icon: CalendarDays,
      trend: "up" as const,
    },
    {
      title: "Properties",
      value: "12",
      change: "+19% from last month",
      icon: Home,
      trend: "up" as const,
    },
    {
      title: "Guests",
      value: "573",
      change: "+201 since last hour",
      icon: Users,
      trend: "up" as const,
    },
  ]

  const recentReservations = [
    {
      id: "RES-001",
      guest: "John Doe",
      property: "Sunset Villa",
      checkIn: "2024-01-15",
      checkOut: "2024-01-20",
      status: "confirmed",
      amount: "$1,250",
    },
    {
      id: "RES-002",
      guest: "Jane Smith",
      property: "Ocean View Condo",
      checkIn: "2024-01-18",
      checkOut: "2024-01-25",
      status: "pending",
      amount: "$2,100",
    },
    {
      id: "RES-003",
      guest: "Mike Johnson",
      property: "Mountain Cabin",
      checkIn: "2024-01-22",
      checkOut: "2024-01-28",
      status: "confirmed",
      amount: "$980",
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      title: "Property inspection - Sunset Villa",
      dueDate: "Today, 2:00 PM",
      priority: "high",
      type: "maintenance",
    },
    {
      id: 2,
      title: "Guest check-in - Ocean View Condo",
      dueDate: "Tomorrow, 3:00 PM",
      priority: "medium",
      type: "guest",
    },
    {
      id: 3,
      title: "Cleaning - Mountain Cabin",
      dueDate: "Jan 20, 10:00 AM",
      priority: "low",
      type: "cleaning",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download Report</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Reservations */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Reservations</CardTitle>
            <CardDescription>You have {recentReservations.length} reservations this week.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentReservations.map((reservation) => (
                <div key={reservation.id} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{reservation.guest}</p>
                    <p className="text-sm text-muted-foreground">{reservation.property}</p>
                    <p className="text-xs text-muted-foreground">
                      {reservation.checkIn} - {reservation.checkOut}
                    </p>
                  </div>
                  <div className="ml-auto font-medium flex items-center gap-2">
                    <Badge variant={reservation.status === "confirmed" ? "default" : "secondary"}>
                      {reservation.status}
                    </Badge>
                    {reservation.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>You have {upcomingTasks.length} tasks pending.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    {task.type === "maintenance" && <AlertCircle className="h-4 w-4" />}
                    {task.type === "guest" && <Users className="h-4 w-4" />}
                    {task.type === "cleaning" && <CheckCircle className="h-4 w-4" />}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.dueDate}</p>
                  </div>
                  <div className="ml-auto">
                    <Badge
                      variant={
                        task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
