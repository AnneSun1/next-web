"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"
import { DataTable, type DataTableColumn, type DataTableFilter } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/ui/page-header"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Play,
  Pause,
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
  Target,
  MoreHorizontal,
  Calendar,
  Building,
} from "lucide-react"

interface Intent {
  id: string
  name: string
  description: string
  type: "checkin" | "cleaning" | "review" | "maintenance"
  status: "active" | "paused" | "draft"
  priority: "low" | "medium" | "high" | "urgent"
  triggerCount: number
  successRate: number
  lastTriggered: string
  properties: number
  source: string
  createdAt: string
  resolvedBy?: string
  resolvedAt?: string
}

const mockIntents: Intent[] = [
  {
    id: "1",
    name: "Welcome Check-in Message",
    description: "Send automated welcome message with check-in instructions 2 hours before arrival",
    type: "checkin",
    status: "active",
    priority: "high",
    triggerCount: 156,
    successRate: 98.5,
    lastTriggered: "2024-01-20T14:30:00Z",
    properties: 8,
    source: "automation",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Post-Stay Review Request",
    description: "Request guest review 24 hours after checkout with personalized message",
    type: "review",
    status: "active",
    priority: "medium",
    triggerCount: 89,
    successRate: 76.4,
    lastTriggered: "2024-01-19T10:15:00Z",
    properties: 12,
    source: "manual",
    createdAt: "2024-01-10T14:30:00Z",
  },
  {
    id: "3",
    name: "Cleaning Schedule Alert",
    description: "Notify cleaning team 1 hour before checkout and schedule cleaning",
    type: "cleaning",
    status: "paused",
    priority: "high",
    triggerCount: 234,
    successRate: 94.2,
    lastTriggered: "2024-01-18T16:45:00Z",
    properties: 15,
    source: "system",
    createdAt: "2024-01-05T09:15:00Z",
  },
  {
    id: "4",
    name: "Maintenance Reminder",
    description: "Schedule monthly maintenance checks for all properties",
    type: "maintenance",
    status: "draft",
    priority: "low",
    triggerCount: 0,
    successRate: 0,
    lastTriggered: "",
    properties: 0,
    source: "manual",
    createdAt: "2024-01-22T11:00:00Z",
  },
  {
    id: "5",
    name: "Late Checkout Notification",
    description: "Alert property managers when guests exceed checkout time",
    type: "checkin",
    status: "active",
    priority: "urgent",
    triggerCount: 45,
    successRate: 89.2,
    lastTriggered: "2024-01-21T11:30:00Z",
    properties: 6,
    source: "automation",
    createdAt: "2024-01-12T16:20:00Z",
  },
  {
    id: "6",
    name: "Weekly Property Inspection",
    description: "Schedule weekly property inspections for maintenance team",
    type: "maintenance",
    status: "active",
    priority: "medium",
    triggerCount: 78,
    successRate: 95.1,
    lastTriggered: "2024-01-19T09:00:00Z",
    properties: 20,
    source: "system",
    createdAt: "2024-01-08T14:45:00Z",
  },
]

export default function IntentsPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [intents, setIntents] = useState<Intent[]>(mockIntents)
  const [loading] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

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
    return <Icon className="h-4 w-4" />
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
    return <Badge className={`${config.color} border text-xs`}>{config.text}</Badge>
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
    router.push("/intents/new")
  }

  const handleToggleIntent = (intentId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "paused" : "active"
    setIntents((prev) =>
      prev.map((intent) => (intent.id === intentId ? { ...intent, status: newStatus as Intent["status"] } : intent)),
    )
  }

  const handleEditIntent = (intentId: string) => {
    router.push(`/intents/${intentId}`)
  }

  const handleViewIntent = (intent: Intent) => {
    router.push(`/intents/${intent.id}`)
  }

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedItems(selectedIds)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(intents.map((intent) => intent.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleExport = () => {
    console.log("Export intents")
  }

  const handleShare = () => {
    console.log("Share intents")
  }

   const handleViewsClick = () => {
    console.log("Opening views...")
  }

  const handleSaveView = () => {
    console.log("Saving current view...")
  }

  const columns: DataTableColumn<Intent>[] = [
    {
      key: "name",
      header: "Intent",
      width: "w-80",
      render: (intent) => (
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg border ${getTypeColor(intent.type)}`}>{getTypeIcon(intent.type)}</div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-foreground truncate">{intent.name}</div>
            <div className="text-sm text-muted-foreground truncate max-w-xs">{intent.description}</div>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      width: "w-24",
      render: (intent) => (
        <Badge variant="outline" className="capitalize">
          {intent.type}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "w-24",
      render: (intent) => getStatusBadge(intent.status),
    },
    {
      key: "priority",
      header: "Priority",
      width: "w-24",
      render: (intent) => getPriorityBadge(intent.priority),
    },
    // {
    //   key: "triggerCount",
    //   header: "Triggers",
    //   width: "w-20",
    //   render: (intent) => (
    //     <div className="text-center">
    //       <div className="font-medium">{intent.triggerCount.toLocaleString()}</div>
    //     </div>
    //   ),
    // },
    // {
    //   key: "successRate",
    //   header: "Success Rate",
    //   width: "w-24",
    //   render: (intent) => {
    //     if (intent.status === "draft" || intent.successRate === 0) {
    //       return <span className="text-muted-foreground">-</span>
    //     }
    //     return (
    //       <div className="text-center">
    //         <div className="font-medium">{intent.successRate}%</div>
    //       </div>
    //     )
    //   },
    // },
    // {
    //   key: "properties",
    //   header: "Properties",
    //   width: "w-24",
    //   render: (intent) => (
    //     <div className="flex items-center space-x-1">
    //       <Building className="h-4 w-4 text-muted-foreground" />
    //       <span className="font-medium">{intent.properties}</span>
    //     </div>
    //   ),
    // },
    // {
    //   key: "lastTriggered",
    //   header: "Last Triggered",
    //   width: "w-32",
    //   render: (intent) => (
    //     <div className="flex items-center space-x-1">
    //       <Calendar className="h-4 w-4 text-muted-foreground" />
    //       <span className="text-sm">{formatDate(intent.lastTriggered)}</span>
    //     </div>
    //   ),
    // }
  ]

  const filters: DataTableFilter[] = [
    {
      key: "status",
      label: "Status",
      type: "select",
      value: "",
      options: [
        { value: "active", label: "Active" },
        { value: "paused", label: "Paused" },
        { value: "draft", label: "Draft" },
      ],
    },
    {
      key: "type",
      label: "Type",
      type: "select",
      value: "",
      options: [
        { value: "checkin", label: "Check-in" },
        { value: "cleaning", label: "Cleaning" },
        { value: "review", label: "Review" },
        { value: "maintenance", label: "Maintenance" },
      ],
    },
    {
      key: "priority",
      label: "Priority",
      type: "select",
      value: "",
      options: [
        { value: "urgent", label: "Urgent" },
        { value: "high", label: "High" },
        { value: "medium", label: "Medium" },
        { value: "low", label: "Low" },
      ],
    },
  ]

  const handleFilterChange = (filterKey: string, value: string) => {
    // Update filter state if needed
    console.log(`Filter ${filterKey} changed to ${value}`)
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
          <div className="h-96 bg-muted rounded-lg"></div>
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

      <DataTable
        data={intents}
        columns={columns}
        loading={loading}
        searchable={true}
        searchPlaceholder="Search intents by name or description..."
        selectable={true}
        selectedItems={selectedItems}
        onSelectionChange={handleSelectionChange}
        onSelectAll={handleSelectAll}
        isAllSelected={selectedItems.length === intents.length && intents.length > 0}
        onRowClick={handleViewIntent}
        emptyMessage="No intents found"
        emptyDescription="Create your first automation intent to streamline your property management workflow."
        filters={filters}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        onShare={handleShare}
        onViewsClick={handleViewsClick}
        onSaveView={handleSaveView}
      />

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
