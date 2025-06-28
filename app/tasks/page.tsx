"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"
import {
  DataTable,
  type DataTableColumn,
  type DataTableFilter,
  type DataTableView,
  type BulkAction,
} from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Clock, MapPin, Plus, CheckSquare, UserCheck, FileDown } from "lucide-react"

// Mock data for tasks
interface Task {
  id: string
  title: string
  description: string
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "ON_HOLD"
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  taskType: "CLEANING" | "MAINTENANCE" | "INSPECTION" | "GUEST_SERVICE" | "ADMINISTRATIVE"
  assigneeId?: string
  listingNickname: string
  plannedStartAt: string
  plannedDurationMin: number
  dueAt: string
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Deep Clean Kitchen",
    description: "Complete deep cleaning of kitchen including appliances, cabinets, and floors",
    status: "IN_PROGRESS",
    priority: "HIGH",
    taskType: "CLEANING",
    assigneeId: "user-1",
    listingNickname: "Downtown Loft",
    plannedStartAt: "2024-01-15T09:00:00Z",
    plannedDurationMin: 180,
    dueAt: "2024-01-15T15:00:00Z",
  },
  {
    id: "2",
    title: "Fix Leaky Faucet",
    description: "Repair bathroom faucet that's been dripping",
    status: "PENDING",
    priority: "MEDIUM",
    taskType: "MAINTENANCE",
    listingNickname: "Seaside Villa",
    plannedStartAt: "2024-01-16T10:00:00Z",
    plannedDurationMin: 60,
    dueAt: "2024-01-16T12:00:00Z",
  },
  {
    id: "3",
    title: "Property Inspection",
    description: "Monthly property inspection checklist",
    status: "COMPLETED",
    priority: "LOW",
    taskType: "INSPECTION",
    assigneeId: "user-4",
    listingNickname: "Mountain Cabin",
    plannedStartAt: "2024-01-10T14:00:00Z",
    plannedDurationMin: 120,
    dueAt: "2024-01-10T16:00:00Z",
  },
  {
    id: "4",
    title: "Guest Welcome Package",
    description: "Prepare and deliver welcome package for incoming guests",
    status: "PENDING",
    priority: "URGENT",
    taskType: "GUEST_SERVICE",
    listingNickname: "Downtown Loft",
    plannedStartAt: "2024-01-17T15:00:00Z",
    plannedDurationMin: 30,
    dueAt: "2024-01-17T16:00:00Z",
  },
  {
    id: "5",
    title: "Update Property Listing",
    description: "Update photos and description for summer season",
    status: "ON_HOLD",
    priority: "LOW",
    taskType: "ADMINISTRATIVE",
    assigneeId: "user-1",
    listingNickname: "Beach House",
    plannedStartAt: "2024-01-20T09:00:00Z",
    plannedDurationMin: 240,
    dueAt: "2024-01-20T17:00:00Z",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
    case "COMPLETED":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
    case "CANCELLED":
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
    case "ON_HOLD":
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "LOW":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
    case "HIGH":
      return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800"
    case "URGENT":
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
  const [tasks] = useState<Task[]>(mockTasks)
  const [loading] = useState(false)
  const [currentView, setCurrentView] = useState<DataTableView | undefined>(undefined)
  const [filters, setFilters] = useState<Record<string, string>>({
    status: "",
    priority: "",
    taskType: "",
    assigneeId: "",
  })

  const views: DataTableView[] = [
    {
      id: "all",
      name: "All Tasks",
      filters: {},
    },
    {
      id: "pending",
      name: "Pending Tasks",
      filters: { status: "PENDING" },
    },
    {
      id: "in-progress",
      name: "In Progress",
      filters: { status: "IN_PROGRESS" },
    },
    {
      id: "urgent",
      name: "Urgent Tasks",
      filters: { priority: "URGENT" },
    },
    {
      id: "my-tasks",
      name: "My Tasks",
      filters: { assigneeId: "user-1" },
    },
  ]

  const bulkActions: BulkAction[] = [
    {
      label: "Mark Complete",
      icon: CheckSquare,
      onClick: (selectedIds) => {
        console.log("Mark complete:", selectedIds)
      },
    },
    {
      label: "Assign Tasks",
      icon: UserCheck,
      onClick: (selectedIds) => {
        console.log("Assign tasks:", selectedIds)
      },
    },
    {
      label: "Export Selected",
      icon: FileDown,
      onClick: (selectedIds) => {
        console.log("Export:", selectedIds)
      },
    },
  ]

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

  const handleViewChange = (view: DataTableView) => {
    setCurrentView(view)
    setFilters(view.filters)
  }

  const handleCreateView = () => {
    console.log("Creating new view...")
  }

  const tableFilters: DataTableFilter[] = [
    {
      key: "status",
      label: "Status",
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
      label: "Priority",
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
      key: "taskType",
      label: "Type",
      type: "select",
      value: filters.taskType,
      options: [
        { value: "CLEANING", label: "Cleaning" },
        { value: "MAINTENANCE", label: "Maintenance" },
        { value: "INSPECTION", label: "Inspection" },
        { value: "GUEST_SERVICE", label: "Guest Service" },
        { value: "ADMINISTRATIVE", label: "Administrative" },
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
      render: (task) => <div className="text-sm">{task.taskType?.replace("_", " ")}</div>,
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
      <DataTable
        title="Tasks"
        views={views}
        currentView={currentView}
        onViewChange={handleViewChange}
        onCreateView={handleCreateView}
        primaryAction={{
          text: "Create Task",
          icon: Plus,
          onClick: handleAddTask,
        }}
        data={tasks}
        columns={columns}
        loading={loading}
        searchable
        searchPlaceholder="Search tasks..."
        selectable
        bulkActions={bulkActions}
        onRowClick={handleTaskClick}
        emptyMessage="No tasks found"
        emptyDescription="Create your first task to get started"
        filters={tableFilters}
        onFilterChange={handleFilterChange}
        onExport={() => console.log("Export all")}
        onShare={() => console.log("Share")}
        onSaveView={() => console.log("Save view")}
      />
    </div>
  )
}
