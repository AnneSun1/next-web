"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DollarSign, Calendar, Home, TrendingUp, MessageSquare, Plus, ArrowRight, Users } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Reservations",
      value: "2,350",
      change: "+180.1% from last month",
      icon: Calendar,
      trend: "up",
    },
    {
      title: "Properties",
      value: "12",
      change: "+19% from last month",
      icon: Home,
      trend: "up",
    },
    {
      title: "Occupancy Rate",
      value: "89.2%",
      change: "+4.3% from last month",
      icon: TrendingUp,
      trend: "up",
    },
  ]

  const recentReservations = [
    {
      id: "1",
      guest: "Alice Johnson",
      property: "Ocean View Villa",
      checkIn: "2024-01-15",
      checkOut: "2024-01-20",
      status: "confirmed",
      amount: "$1,200",
    },
    {
      id: "2",
      guest: "Bob Smith",
      property: "Mountain Cabin",
      checkIn: "2024-01-18",
      checkOut: "2024-01-25",
      status: "pending",
      amount: "$850",
    },
    {
      id: "3",
      guest: "Carol Davis",
      property: "Downtown Loft",
      checkIn: "2024-01-22",
      checkOut: "2024-01-24",
      status: "confirmed",
      amount: "$400",
    },
  ]

  const upcomingTasks = [
    {
      id: "1",
      title: "Property inspection - Ocean View Villa",
      dueDate: "Today",
      priority: "high",
      type: "maintenance",
    },
    {
      id: "2",
      title: "Guest check-in - Mountain Cabin",
      dueDate: "Tomorrow",
      priority: "medium",
      type: "guest",
    },
    {
      id: "3",
      title: "Cleaning service - Downtown Loft",
      dueDate: "Jan 20",
      priority: "low",
      type: "cleaning",
    },
  ]

  const recentMessages = [
    {
      id: "1",
      guest: "Alice Johnson",
      message: "Hi, I have a question about the check-in process...",
      time: "2 min ago",
      unread: true,
    },
    {
      id: "2",
      guest: "Bob Smith",
      message: "Thank you for the welcome package!",
      time: "1 hour ago",
      unread: false,
    },
    {
      id: "3",
      guest: "Carol Davis",
      message: "Is early check-in available?",
      time: "3 hours ago",
      unread: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your properties.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/reservations/new">
              <Plus className="mr-2 h-4 w-4" />
              New Reservation
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Reservations */}
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Reservations</CardTitle>
                <CardDescription>Latest bookings from your properties</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/reservations">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReservations.map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>
                        {reservation.guest
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{reservation.guest}</p>
                      <p className="text-sm text-muted-foreground">{reservation.property}</p>
                      <p className="text-xs text-muted-foreground">
                        {reservation.checkIn} - {reservation.checkOut}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={reservation.status === "confirmed" ? "default" : "secondary"}>
                      {reservation.status}
                    </Badge>
                    <span className="text-sm font-medium">{reservation.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Tasks that need your attention</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/tasks">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        task.priority === "high"
                          ? "bg-red-500"
                          : task.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.dueDate}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {task.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Latest guest communications</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/inbox">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>
                      {message.guest
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{message.guest}</p>
                      <div className="flex items-center space-x-1">
                        {message.unread && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex-col bg-transparent" asChild>
                <Link href="/reservations/new">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span className="text-sm">New Booking</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent" asChild>
                <Link href="/users/new">
                  <Users className="h-6 w-6 mb-2" />
                  <span className="text-sm">Add User</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent" asChild>
                <Link href="/properties">
                  <Home className="h-6 w-6 mb-2" />
                  <span className="text-sm">Properties</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent" asChild>
                <Link href="/inbox">
                  <MessageSquare className="h-6 w-6 mb-2" />
                  <span className="text-sm">Messages</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
