"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"
import { DataTable, type DataTableColumn, type DataTableFilter } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Clock, MapPin, Plus } from "lucide-react"
import { TASK_STATUS, TASK_PRIORITY, TASK_TYPE, type Task } from "@/types/task"
import { PageHeader } from "@/components/ui/page-header"

// Mock data for tasks
const mockTasks: Task[] = [
  {
    id: "1",
    tenantId: "1",
    title: "Deep Clean Kitchen",
    description: "Complete deep cleaning of kitchen including appliances, cabinets, and floors",
    status: TASK_STATUS.IN_PROGRESS,
    assignmentStatusCode: "ASSIGNED",
    assigneeId: "user-1",
    supervisorId: "user-2",
    requestedById: "user-3",
    taskTypeCode: TASK_TYPE.CLEANING,
    subcategoryCode: "DEEP_CLEAN",
    priority: TASK_PRIORITY.HIGH,
    taskSourceCode: "MANUAL",
    listingId: "listing-1",
    reservationId: "res-1",
    plannedStartAt: "2024-01-15T09:00:00Z",
    plannedDurationMin: 180,
    dueAt: "2024-01-15T15:00:00Z",
    actualStart: "2024-01-15T09:15:00Z",
    isPaused: false,
    createdAt: "2024-01-14T10:00:00Z",
    updatedAt: "2024-01-15T09:15:00Z",
    comments: [],
    attachments: [],
    listingNickname: "Downtown Loft",
    listingFullAddress: "123 Main St, City, State 12345",
  },
  {
    id: "2",
    tenantId: "1",
    title: "Fix Leaky Faucet",
    description: "Repair bathroom faucet that's been dripping",
    status: TASK_STATUS.PENDING,
    assignmentStatusCode: "UNASSIGNED",
    taskTypeCode: TASK_TYPE.MAINTENANCE,
    subcategoryCode: "PLUMBING",
    priority: TASK_PRIORITY.MEDIUM,
    taskSourceCode: "GUEST_REPORT",
    listingId: "listing-2",
    reservationId: "res-2",
    plannedStartAt: "2024-01-16T10:00:00Z",
    plannedDurationMin: 60,
    dueAt: "2024-01-16T12:00:00Z",
    createdAt: "2024-01-14T14:30:00Z",
    updatedAt: "2024-01-14T14:30:00Z",
    comments: [],
    attachments: [],
    listingNickname: "Seaside Villa",
    listingFullAddress: "456 Ocean Ave, Beach City, State 67890",
  },
  {
    id: "3",
    tenantId: "1",
    title: "Property Inspection",
    description: "Monthly property inspection checklist",
    status: TASK_STATUS.COMPLETED,
    assignmentStatusCode: "COMPLETED",
    assigneeId: "user-4",
    supervisorId: "user-2",
    taskTypeCode: TASK_TYPE.INSPECTION,
    priority: TASK_PRIORITY.LOW,
    taskSourceCode: "SCHEDULED",
    listingId: "listing-3",
    plannedStartAt: "2024-01-10T14:00:00Z",
    plannedDurationMin: 120,
    dueAt: "2024-01-10T16:00:00Z",
    actualStart: "2024-01-10T14:00:00Z",
    actualEnd: "2024-01-10T15:45:00Z",
    actualDurationMin: "105",
    feedbackRating: 5,
    feedBackNote: "Excellent work, very thorough",
    createdAt: "2024-01-09T09:00:00Z",
    updatedAt: "2024-01-10T15:45:00Z",
    comments: [],
    attachments: [],
    listingNickname: "Mountain Cabin",
    listingFullAddress: "789 Pine Ridge Rd, Mountain View, State 13579",
  },
  {
    id: "4",
    tenantId: "1",
    title: "Guest Welcome Package",
    description: "Prepare and deliver welcome package for incoming guests",
    status: TASK_STATUS.PENDING,
    assignmentStatusCode: "UNASSIGNED",
    taskTypeCode: TASK_TYPE.GUEST_SERVICE,
    priority: TASK_PRIORITY.URGENT,
    taskSourceCode: "RESERVATION",
    listingId: "listing-1",
    reservationId: "res-3",
    plannedStartAt: "2024-01-17T15:00:00Z",
    plannedDurationMin: 30,
    dueAt: "2024-01-17T16:00:00Z",
    createdAt: "2024-01-16T09:00:00Z",
    updatedAt: "2024-01-16T09:00:00Z",
    comments: [],
    attachments: [],
    listingNickname: "Downtown Loft",
    listingFullAddress: "123 Main St, City, State 12345",
  },
  {
    id: "5",
    tenantId: "1",
    title: "Update Property Listing",
    description: "Update photos and description for summer season",
    status: TASK_STATUS.ON_HOLD,
    assignmentStatusCode: "ASSIGNED",
    assigneeId: "user-1",
    supervisorId: "user-2",
    taskTypeCode: TASK_TYPE.ADMINISTRATIVE,
    priority: TASK_PRIORITY.LOW,
    taskSourceCode: "MANUAL",
    listingId: "listing-4",
    plannedStartAt: "2024-01-20T09:00:00Z",
    plannedDurationMin: 240,
    dueAt: "2024-01-20T17:00:00Z",
    pausedAt: "2024-01-16T14:00:00Z",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-16T14:00:00Z",
    comments: [],
    attachments: [],
    listingNickname: "Beach House",
    listingFullAddress: "321 Coastal Dr, Seaside, State 24680",
  },
]

const getStatusColor = (status: TASK_STATUS) => {
  switch (status) {
    case TASK_STATUS.PENDING:
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
    case TASK_STATUS.IN_PROGRESS:
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
    case TASK_STATUS.COMPLETED:
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
    case TASK_STATUS.CANCELLED:
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
    case TASK_STATUS.ON_HOLD:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
  }
}

const getPriorityColor = (priority: TASK_PRIORITY) => {
  switch (priority) {
    case TASK_PRIORITY.LOW:
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
    case TASK_PRIORITY.MEDIUM:
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
    case TASK_PRIORITY.HIGH:
      return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800"
    case TASK_PRIORITY.URGENT:
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
  }
}

const formatDate = (dateString?: string) => {
  if (!dateString) return "Not set"
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function TasksPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [filters, setFilters] = useState<Record<string, string>>({
    status: "",
    priority: "",
    taskTypeCode: "",
    assigneeId: "",
  })

  useEffect(() => {
    dispatch(setActiveTab("tasks"))
  }, [dispatch])

  const handleTaskClick = (task: Task) => {
    router.push(`/tasks/${task.id}`)
  }

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }))
  }

  const handleAddTask = () => {
    router.push("tasks/new")
  }

  const handleExport = () => {
    console.log("Exporting tasks data...")
  }

  const handleShare = () => {
    console.log("Sharing tasks data...")
  }

  const handleViewsClick = () => {
    console.log("Opening views...")
  }

  const handleSaveView = () => {
    console.log("Saving current view...")
  }

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedTasks(selectedIds)
    setIsAllSelected(selectedIds.length === mockTasks.length && mockTasks.length > 0)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTasks(mockTasks.map((task) => task.id))
      setIsAllSelected(true)
    } else {
      setSelectedTasks([])
      setIsAllSelected(false)
    }
  }

  const tableFilters: DataTableFilter[] = [
    {
      key: "status",
      label: "",
      type: "select",
      value: filters.status,
      options: [
        { value: "PENDING", label: "Pending" },
        { value: "IN_PROGRESS", label: "In Progress" },
        { value: "COMPLETED", label: "Completed" },
        { value: "CANCELLED", label: "Cancelled" },
        { value: "ON_HOLD", label: "On Hold" },
      ],
    },
    {
      key: "priority",
      label: "",
      type: "select",
      value: filters.priority,
      options: [
        { value: "LOW", label: "Low" },
        { value: "MEDIUM", label: "Medium" },
        { value: "HIGH", label: "High" },
        { value: "URGENT", label: "Urgent" },
      ],
    },
    {
      key: "taskTypeCode",
      label: "",
      type: "select",
      value: filters.taskTypeCode,
      options: [
        { value: "CLEANING", label: "Cleaning" },
        { value: "MAINTENANCE", label: "Maintenance" },
        { value: "INSPECTION", label: "Inspection" },
        { value: "GUEST_SERVICE", label: "Guest Service" },
        { value: "ADMINISTRATIVE", label: "Administrative" },
      ],
    },
    {
      key: "assigneeId",
      label: "",
      type: "select",
      value: filters.assigneeId,
      options: [
        { value: "user-1", label: "User 1" },
        { value: "user-2", label: "User 2" },
        { value: "user-3", label: "User 3" },
        { value: "user-4", label: "User 4" },
      ],
    },
  ]

  const columns: DataTableColumn<Task>[] = [
    {
      key: "title",
      header: "Task",
      render: (task) => (
        <div className="space-y-1">
          <div className="font-medium text-foreground">{task.title}</div>
          <div className="text-sm text-muted-foreground line-clamp-1">{task.description}</div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{task.listingNickname}</span>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (task) => (
        <Badge variant="outline" className={getStatusColor(task.status)}>
          {task.status.replace("_", " ")}
        </Badge>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      render: (task) => (
        <Badge variant="outline" className={getPriorityColor(task.priority)}>
          {task.priority}
        </Badge>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (task) => <div className="text-sm">{task.taskTypeCode?.replace("_", " ")}</div>,
    },
    {
      key: "assignee",
      header: "Assignee",
      render: (task) => (
        <div className="flex items-center gap-2">
          {task.assigneeId ? (
            <>
              <Avatar className="h-6 w-6">
                <AvatarImage src={`/placeholder.svg?height=24&width=24&text=${task.assigneeId}`} />
                <AvatarFallback className="text-xs">{task.assigneeId.slice(-2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm">User {task.assigneeId.slice(-1)}</span>
            </>
          ) : (
            <span className="text-sm text-muted-foreground">Unassigned</span>
          )}
        </div>
      ),
    },
    {
      key: "schedule",
      header: "Schedule",
      render: (task) => (
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <CalendarDays className="h-3 w-3" />
            <span>{formatDate(task.plannedStartAt)}</span>
          </div>
          {task.plannedDurationMin && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{task.plannedDurationMin}min</span>
            </div>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="p-8 bg-background min-h-screen">

      <PageHeader
        title="Tasks"
        description="Manage and track all property tasks"
        buttonText="Create Task"
        buttonIcon={Plus}
        onButtonClick={handleAddTask}
        />

      {selectedTasks.length > 0 && (
        <div className="flex items-center justify-between mb-6 p-4 bg-accent/50 rounded-lg border border-border">
          <span className="text-sm text-foreground">{selectedTasks.length} task(s) selected</span>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedTasks([])}
              className="border-border text-foreground hover:bg-accent bg-transparent"
            >
              Clear
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-border text-foreground hover:bg-accent bg-transparent"
            >
              Update Status
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-border text-foreground hover:bg-accent bg-transparent"
            >
              Assign Tasks
            </Button>
          </div>
        </div>
      )}

      <DataTable
        data={mockTasks}
        columns={columns}
        searchable
        searchPlaceholder="Search tasks..."
        selectable
        selectedItems={selectedTasks}
        onSelectionChange={handleSelectionChange}
        onSelectAll={handleSelectAll}
        isAllSelected={isAllSelected}
        onRowClick={handleTaskClick}
        emptyMessage="No tasks found"
        emptyDescription="Create your first task to get started"
        filters={tableFilters}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        onShare={handleShare}
        onViewsClick={handleViewsClick}
        onSaveView={handleSaveView}
      />
    </div>
  )
}
