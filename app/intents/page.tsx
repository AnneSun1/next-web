"use client"

import { useEffect, useState } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/ui/page-header"
import { Plus, Play, Pause, Settings, CheckCircle, Clock, AlertCircle, Target } from "lucide-react"

interface Intent {
  id: string
  name: string
  description: string
  type: "checkin" | "cleaning" | "review" | "maintenance"
  status: "active" | "paused" | "draft"
  triggerCount: number
  successRate: number
  lastTriggered: string
  properties: number
}

const mockIntents: Intent[] = [
  {
    id: "1",
    name: "Welcome Check-in Message",
    description: "Send automated welcome message with check-in instructions 2 hours before arrival",
    type: "checkin",
    status: "active",
    triggerCount: 156,
    successRate: 98.5,
    lastTriggered: "2024-01-20T14:30:00Z",
    properties: 8,
  },
  {
    id: "2",
    name: "Post-Stay Review Request",
    description: "Request guest review 24 hours after checkout with personalized message",
    type: "review",
    status: "active",
    triggerCount: 89,
    successRate: 76.4,
    lastTriggered: "2024-01-19T10:15:00Z",
    properties: 12,
  },
  {
    id: "3",
    name: "Cleaning Schedule Alert",
    description: "Notify cleaning team 1 hour before checkout and schedule cleaning",
    type: "cleaning",
    status: "paused",
    triggerCount: 234,
    successRate: 94.2,
    lastTriggered: "2024-01-18T16:45:00Z",
    properties: 15,
  },
  {
    id: "4",
    name: "Maintenance Reminder",
    description: "Schedule monthly maintenance checks for all properties",
    type: "maintenance",
    status: "draft",
    triggerCount: 0,
    successRate: 0,
    lastTriggered: "",
    properties: 0,
  },
]

export default function IntentsPage() {
  const dispatch = useAppDispatch()
  const [intents] = useState<Intent[]>(mockIntents)
  const [loading] = useState(false)

  useEffect(() => {
    dispatch(setActiveTab("intents"))
  }, [dispatch])

  const getTypeIcon = (type: string) => {
    const icons = {
      checkin: CheckCircle,
      cleaning: Clock,
      review: Target,
      maintenance: AlertCircle,
    }
    const Icon = icons[type as keyof typeof icons] || Target
    return <Icon className="h-5 w-5" />
  }

  const getTypeColor = (type: string) => {
    const colors = {
      checkin: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
      cleaning: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30",
      review: "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30",
      maintenance: "bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30",
    }
    return colors[type as keyof typeof colors] || colors.review
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; text: string }> = {
      active: { color: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30", text: "Active" },
      paused: { color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30", text: "Paused" },
      draft: { color: "bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30", text: "Draft" },
    }

    const config = statusConfig[status.toLowerCase()] || statusConfig.draft
    return <Badge className={`${config.color} border`}>{config.text}</Badge>
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Never"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleCreateIntent = () => {
    console.log("Create new intent...")
  }

  const handleToggleIntent = (intentId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "paused" : "active"
    console.log(`Toggle intent ${intentId} to ${newStatus}`)
  }

  const handleEditIntent = (intentId: string) => {
    console.log(`Edit intent ${intentId}`)
  }

  if (loading) {
    return (
      <div className="p-8 bg-background min-h-screen">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-8 w-48 bg-muted rounded"></div>
              <div className="h-4 w-64 bg-muted rounded"></div>
            </div>
            <div className="h-10 w-32 bg-muted rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <PageHeader
        title="Intents"
        description="Automate guest communication and property management workflows"
        buttonText="Create Intent"
        buttonIcon={Plus}
        onButtonClick={handleCreateIntent}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {intents.map((intent) => (
          <Card key={intent.id} className="border border-border bg-card hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg border ${getTypeColor(intent.type)}`}>{getTypeIcon(intent.type)}</div>
                  <div>
                    <CardTitle className="text-lg text-foreground">{intent.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusBadge(intent.status)}
                      <Badge variant="outline" className="text-xs">
                        {intent.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditIntent(intent.id)}
                  className="h-8 w-8 p-0 hover:bg-accent"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-muted-foreground">{intent.description}</CardDescription>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Triggers</div>
                  <div className="font-medium text-foreground">{intent.triggerCount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Success Rate</div>
                  <div className="font-medium text-foreground">{intent.successRate}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Properties</div>
                  <div className="font-medium text-foreground">{intent.properties}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Last Triggered</div>
                  <div className="font-medium text-foreground text-xs">{formatDate(intent.lastTriggered)}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleIntent(intent.id, intent.status)}
                  disabled={intent.status === "draft"}
                  className="flex items-center space-x-2 border-border text-foreground hover:bg-accent bg-transparent"
                >
                  {intent.status === "active" ? (
                    <>
                      <Pause className="h-4 w-4" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Activate</span>
                    </>
                  )}
                </Button>
                <div className="text-xs text-muted-foreground">
                  {intent.status === "active" && "Running"}
                  {intent.status === "paused" && "Paused"}
                  {intent.status === "draft" && "Not configured"}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {intents.length === 0 && (
        <div className="text-center py-12">
          <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No intents created yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first automation intent to streamline your property management workflow.
          </p>
          <Button onClick={handleCreateIntent} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Create Your First Intent</span>
          </Button>
        </div>
      )}
    </div>
  )
}
