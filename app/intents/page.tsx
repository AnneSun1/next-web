"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataTable, type DataTableColumn, type DataTableFilter } from "@/components/ui/data-table"
import { PageHeader } from "@/components/ui/page-header"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Play, Pause, CheckCircle, Clock, AlertCircle, Target, MoreHorizontal, Calendar } from "lucide-react"

interface Intent {
  id: string
  name: string
  description: string
  type: "checkin" | "cleaning" | "review" | "maintenance"
  status: "active" | "paused" | "draft"
  priority: "urgent" | "high" | "medium" | "low"
  triggerCount: number
  successRate: number
  lastTriggered: string
  properties: number
  source: string
  createdAt: string
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
    source: "system",
    createdAt: "2023-12-01T10:00:00Z",
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
    createdAt: "2023-11-15T14:30:00Z",
  },
  {
    id: "3",
    name: "Cleaning Schedule Alert",
    description: "Notify cleaning team 1 hour before checkout and schedule cleaning",
    type: "cleaning",
    status: "paused",
    priority: "urgent",
    triggerCount: 234,
    successRate: 94.2,
    lastTriggered: "2024-01-18T16:45:00Z",
    properties: 15,
    source: "system",
    createdAt: "2023-10-20T09:00:00Z",
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
    createdAt: "2024-01-15T11:20:00Z",
  },
]

export default function IntentsPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [intents, setIntents] = useState<Intent[]>(mockIntents)
  const [loading] = useState(false)
  const [selectedIntents, setSelectedIntents] = useState<string[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [filters, setFilters] = useState<Record<string, string>>({
    status: "",
    type: "",
    priority: "",
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
    router.push("/intents/new")
  }

  const handleToggleIntent = (intentId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "paused" : "active"
    setIntents((prev) =>
      prev.map((intent) =>
        intent.id === intentId ? { ...intent, status: newStatus as "active" | "paused" | "draft" } : intent,
      ),
    )
  }

  const handleEditIntent = (intentId: string) => {
    router.push(`/intents/${intentId}/edit`)
  }

  const handleViewIntent = (intentId: string) => {
    router.push(`/intents/${intentId}`)
  }

  const handleRowClick = (intent: Intent) => {
    router.push(`/intents/${intent.id}`)
  }

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }))
  }

  const handleExport = () => {
    console.log("Exporting intents data...")
  }

  const handleShare = () => {
    console.log("Sharing intents data...")
  }

  const handleViewsClick = () => {
    console.log("Opening views...")
  }

  const handleSaveView = () => {
    console.log("Saving current view...")
  }

  const tableFilters: DataTableFilter[] = [
    {
      key: "status",
      label: "Status",
      type: "select",
      value: filters.status,
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
      value: filters.type,
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
      value: filters.priority,
      options: [
        { value: "urgent", label: "Urgent" },
        { value: "high", label: "High" },
        { value: "medium", label: "Medium" },
        { value: "low", label: "Low" },
      ],
    },
  ]

  const columns: DataTableColumn<Intent>[] = [
    {
      key: "intent",
      header: "Intent",
      width: "w-80",
      render: (intent) => (
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg border ${getTypeColor(intent.type)} flex-shrink-0`}>
            {getTypeIcon(intent.type)}
          </div>
          <div className="space-y-1 min-w-0">
            <div className="font-medium text-foreground truncate">{intent.name}</div>
            <div className="text-sm text-muted-foreground line-clamp-2">{intent.description}</div>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      width: "w-24",
      render: (intent) => (
        <Badge variant="outline" className="text-xs capitalize">
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
  ]

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedIntents(selectedIds)
    setIsAllSelected(selectedIds.length === intents.length && intents.length > 0)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIntents(intents.map((intent) => intent.id))
      setIsAllSelected(true)
    } else {
      setSelectedIntents([])
      setIsAllSelected(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        <PageHeader
          title="Intents"
          description="Automate guest communication and property management workflows"
          buttonText="Create Intent"
          buttonIcon={Plus}
          onButtonClick={handleCreateIntent}
        />

        {selectedIntents.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-accent/50 rounded-lg border border-border">
            <span className="text-sm text-foreground">{selectedIntents.length} intent(s) selected</span>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedIntents([])}
                className="border-border text-foreground hover:bg-accent bg-transparent"
              >
                Clear
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-border text-foreground hover:bg-accent bg-transparent"
              >
                Enable Selected
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-border text-foreground hover:bg-accent bg-transparent"
              >
                Disable Selected
              </Button>
            </div>
          </div>
        )}

        <DataTable
          data={intents}
          columns={columns}
          loading={loading}
          searchable
          searchPlaceholder="Search intents..."
          selectable
          selectedItems={selectedIntents}
          onSelectionChange={handleSelectionChange}
          onSelectAll={handleSelectAll}
          isAllSelected={isAllSelected}
          onRowClick={handleRowClick}
          emptyMessage="No intents found"
          emptyDescription="Create your first automation intent to streamline workflows"
          filters={tableFilters}
          onFilterChange={handleFilterChange}
          onExport={handleExport}
          onShare={handleShare}
          onViewsClick={handleViewsClick}
          onSaveView={handleSaveView}
        />
      </div>
    </div>
  )
}
