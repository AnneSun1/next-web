"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Play,
  Pause,
  Edit,
  Save,
  X,
  CheckCircle,
  Clock,
  Target,
  AlertCircle,
  Calendar,
  TrendingUp,
  Home,
  MessageSquare,
  BarChart3,
} from "lucide-react"

interface Intent {
  id: string
  name: string
  description: string
  type: "checkin" | "cleaning" | "review" | "maintenance"
  status: "active" | "paused" | "draft"
  priority: "urgent" | "high" | "medium" | "low"
  source: string
  triggerCount: number
  successRate: number
  lastTriggered: string
  properties: number
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
  message: string
  triggerConditions: {
    timing: string
    propertyTypes: string[]
    guestTypes: string[]
  }
  analytics: {
    totalTriggers: number
    successfulTriggers: number
    failedTriggers: number
    averageResponseTime: number
    lastWeekTriggers: number[]
  }
}

// Mock data for the intent
const mockIntent: Intent = {
  id: "1",
  name: "Welcome Check-in Message",
  description: "Send automated welcome message with check-in instructions 2 hours before arrival",
  type: "checkin",
  status: "active",
  priority: "high",
  source: "system",
  triggerCount: 156,
  successRate: 98.5,
  lastTriggered: "2024-01-20T14:30:00Z",
  properties: 8,
  createdAt: "2023-06-15T10:00:00Z",
  createdBy: "John Doe",
  updatedAt: "2024-01-20T14:30:00Z",
  updatedBy: "Jane Smith",
  message:
    "Welcome to [PROPERTY_NAME]! Your check-in is at [CHECK_IN_TIME]. Here are your access instructions: [ACCESS_CODE]. If you need assistance, please contact us at [CONTACT_NUMBER].",
  triggerConditions: {
    timing: "2 hours before check-in",
    propertyTypes: ["villa", "apartment", "condo"],
    guestTypes: ["verified", "new"],
  },
  analytics: {
    totalTriggers: 156,
    successfulTriggers: 154,
    failedTriggers: 2,
    averageResponseTime: 1.2,
    lastWeekTriggers: [12, 8, 15, 22, 18, 25, 19],
  },
}

export default function IntentDetailPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const params = useParams()
  const [intent, setIntent] = useState<Intent>(mockIntent)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editForm, setEditForm] = useState({
    name: intent.name,
    description: intent.description,
    message: intent.message,
    type: intent.type,
    priority: intent.priority,
    timing: intent.triggerConditions.timing,
  })

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

  const getPriorityBadge = (priority: string) => {
    const priorityConfig: Record<string, { color: string; text: string }> = {
      urgent: { color: "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30", text: "Urgent" },
      high: { color: "bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30", text: "High" },
      medium: { color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30", text: "Medium" },
      low: { color: "bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30", text: "Low" },
    }
    const config = priorityConfig[priority.toLowerCase()] || priorityConfig.medium
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

  const handleToggleStatus = () => {
    const newStatus = intent.status === "active" ? "paused" : "active"
    setIntent((prev) => ({ ...prev, status: newStatus }))
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditForm({
      name: intent.name,
      description: intent.description,
      message: intent.message,
      type: intent.type,
      priority: intent.priority,
      timing: intent.triggerConditions.timing,
    })
  }

  const handleSave = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIntent((prev) => ({
        ...prev,
        name: editForm.name,
        description: editForm.description,
        message: editForm.message,
        type: editForm.type,
        priority: editForm.priority,
        triggerConditions: {
          ...prev.triggerConditions,
          timing: editForm.timing,
        },
        updatedAt: new Date().toISOString(),
        updatedBy: "Current User",
      }))
      setIsEditing(false)
      setLoading(false)
    }, 1000)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditForm({
      name: intent.name,
      description: intent.description,
      message: intent.message,
      type: intent.type,
      priority: intent.priority,
      timing: intent.triggerConditions.timing,
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="hover:bg-accent">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                {isEditing ? "Edit Intent" : intent.name}
              </h1>
              <p className="text-muted-foreground">
                {isEditing ? "Modify intent settings and configuration" : "Intent details and analytics"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <>
                <Button
                  variant="outline"
                  onClick={handleToggleStatus}
                  disabled={intent.status === "draft"}
                  className="bg-transparent border-border text-foreground hover:bg-accent"
                >
                  {intent.status === "active" ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Activate</span>
                    </>
                  )}
                </Button>
                <Button onClick={handleEdit} className="bg-primary hover:bg-primary/90">
                  <Edit className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
              </>
            )}
            {isEditing && (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="bg-transparent border-border text-foreground hover:bg-accent"
                >
                  <X className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Cancel</span>
                </Button>
                <Button onClick={handleSave} disabled={loading} className="bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{loading ? "Saving..." : "Save"}</span>
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Basic Information</CardTitle>
                <CardDescription className="text-muted-foreground">Intent configuration and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <Label htmlFor="name" className="text-foreground">
                        Intent Name
                      </Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description" className="text-foreground">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={editForm.description}
                        onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
                        className="bg-background border-border text-foreground"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="type" className="text-foreground">
                          Type
                        </Label>
                        <Select
                          value={editForm.type}
                          onValueChange={(value) => setEditForm((prev) => ({ ...prev, type: value as any }))}
                        >
                          <SelectTrigger className="bg-background border-border text-foreground">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="checkin">Check-in</SelectItem>
                            <SelectItem value="cleaning">Cleaning</SelectItem>
                            <SelectItem value="review">Review</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="priority" className="text-foreground">
                          Priority
                        </Label>
                        <Select
                          value={editForm.priority}
                          onValueChange={(value) => setEditForm((prev) => ({ ...prev, priority: value as any }))}
                        >
                          <SelectTrigger className="bg-background border-border text-foreground">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="urgent">Urgent</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="timing" className="text-foreground">
                        Trigger Timing
                      </Label>
                      <Input
                        id="timing"
                        value={editForm.timing}
                        onChange={(e) => setEditForm((prev) => ({ ...prev, timing: e.target.value }))}
                        className="bg-background border-border text-foreground"
                        placeholder="e.g., 2 hours before check-in"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg border ${getTypeColor(intent.type)}`}>
                        {getTypeIcon(intent.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{intent.name}</h3>
                        <p className="text-muted-foreground">{intent.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {getStatusBadge(intent.status)}
                      {getPriorityBadge(intent.priority)}
                      <Badge variant="outline" className="border-border text-foreground">
                        {intent.type}
                      </Badge>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Message Template */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Message Template</CardTitle>
                <CardDescription className="text-muted-foreground">
                  The message that will be sent when this intent is triggered
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div>
                    <Label htmlFor="message" className="text-foreground">
                      Message Content
                    </Label>
                    <Textarea
                      id="message"
                      value={editForm.message}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, message: e.target.value }))}
                      className="bg-background border-border text-foreground"
                      rows={6}
                      placeholder="Enter your message template with variables like [PROPERTY_NAME], [CHECK_IN_TIME], etc."
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Use variables like [PROPERTY_NAME], [CHECK_IN_TIME], [ACCESS_CODE], [CONTACT_NUMBER]
                    </p>
                  </div>
                ) : (
                  <div className="bg-accent/50 p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Message Preview</span>
                    </div>
                    <p className="text-foreground whitespace-pre-wrap">{intent.message}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Analytics */}
            {!isEditing && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Performance Analytics
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Intent performance metrics and statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{intent.analytics.totalTriggers}</div>
                      <div className="text-sm text-muted-foreground">Total Triggers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{intent.analytics.successfulTriggers}</div>
                      <div className="text-sm text-muted-foreground">Successful</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{intent.analytics.failedTriggers}</div>
                      <div className="text-sm text-muted-foreground">Failed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{intent.successRate}%</div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                  </div>
                  <div className="bg-accent/50 p-4 rounded-lg border border-border">
                    <h4 className="text-sm font-medium text-foreground mb-2">Last 7 Days Activity</h4>
                    <div className="flex items-end gap-1 h-16">
                      {intent.analytics.lastWeekTriggers.map((count, index) => (
                        <div
                          key={index}
                          className="bg-primary/60 rounded-t flex-1 min-w-[8px]"
                          style={{ height: `${(count / Math.max(...intent.analytics.lastWeekTriggers)) * 100}%` }}
                          title={`Day ${index + 1}: ${count} triggers`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Triggers
                  </div>
                  <span className="text-foreground font-medium">{intent.triggerCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <Target className="h-4 w-4 mr-2" />
                    Success Rate
                  </div>
                  <span className="text-foreground font-medium">{intent.successRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <Home className="h-4 w-4 mr-2" />
                    Properties
                  </div>
                  <span className="text-foreground font-medium">{intent.properties}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Last Triggered
                  </div>
                  <span className="text-foreground font-medium text-xs">{formatDate(intent.lastTriggered)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Trigger Conditions */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground text-lg">Trigger Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Timing</div>
                  <div className="text-sm text-muted-foreground">{intent.triggerConditions.timing}</div>
                </div>
                <Separator className="bg-border" />
                <div>
                  <div className="text-sm font-medium text-foreground mb-2">Property Types</div>
                  <div className="flex flex-wrap gap-1">
                    {intent.triggerConditions.propertyTypes.map((type) => (
                      <Badge key={type} variant="outline" className="text-xs border-border text-foreground">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator className="bg-border" />
                <div>
                  <div className="text-sm font-medium text-foreground mb-2">Guest Types</div>
                  <div className="flex flex-wrap gap-1">
                    {intent.triggerConditions.guestTypes.map((type) => (
                      <Badge key={type} variant="outline" className="text-xs border-border text-foreground">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metadata */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground text-lg">Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-foreground">Created</div>
                  <div className="text-sm text-muted-foreground">{formatDate(intent.createdAt)}</div>
                  <div className="text-xs text-muted-foreground">by {intent.createdBy}</div>
                </div>
                <Separator className="bg-border" />
                <div>
                  <div className="text-sm font-medium text-foreground">Last Updated</div>
                  <div className="text-sm text-muted-foreground">{formatDate(intent.updatedAt)}</div>
                  <div className="text-xs text-muted-foreground">by {intent.updatedBy}</div>
                </div>
                <Separator className="bg-border" />
                <div>
                  <div className="text-sm font-medium text-foreground">Source</div>
                  <div className="text-sm text-muted-foreground capitalize">{intent.source}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
