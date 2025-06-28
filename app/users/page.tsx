"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"
import { DataTable, type DataTableFilter, type DataTableView, type BulkAction } from "@/components/ui/data-table"
import { Plus, UserX, Shield, FileDown } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Calendar } from "lucide-react"
import type { DataTableColumn } from "@/components/ui/data-table"

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "manager" | "staff"
  status: "active" | "inactive" | "pending"
  joinDate: string
  lastLogin: string
}

const getRoleBadge = (role: string) => {
  const roleConfig: Record<string, { color: string; text: string; icon: any }> = {
    admin: {
      color: "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30",
      text: "Admin",
      icon: Shield,
    },
    manager: {
      color: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
      text: "Manager",
      icon: Shield,
    },
    staff: {
      color: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30",
      text: "Staff",
      icon: Shield,
    },
  }

  const config = roleConfig[role.toLowerCase()] || roleConfig.staff
  const IconComponent = config.icon

  return (
    <Badge className={`${config.color} border flex items-center space-x-1`}>
      <IconComponent className="h-3 w-3" />
      <span>{config.text}</span>
    </Badge>
  )
}

const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { color: string; text: string }> = {
    active: { color: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30", text: "Active" },
    inactive: { color: "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30", text: "Inactive" },
    pending: { color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30", text: "Pending" },
  }

  const config = statusConfig[status.toLowerCase()] || statusConfig.pending
  return <Badge className={`${config.color} border`}>{config.text}</Badge>
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export const columns: DataTableColumn<User>[] = [
  {
    key: "user",
    header: "User",
    width: "w-64",
    render: (user) => (
      <div className="space-y-1">
        <div className="font-medium text-foreground">{user.name}</div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Mail className="h-3 w-3" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Phone className="h-3 w-3" />
          <span>{user.phone}</span>
        </div>
      </div>
    ),
  },
  {
    key: "role",
    header: "Role",
    width: "w-32",
    render: (user) => getRoleBadge(user.role),
  },
  {
    key: "status",
    header: "Status",
    width: "w-32",
    render: (user) => getStatusBadge(user.status),
  },
  {
    key: "dates",
    header: "Dates",
    width: "w-48",
    render: (user) => (
      <div className="space-y-1">
        <div className="flex items-center space-x-2 text-sm text-foreground">
          <Calendar className="h-3 w-3" />
          <span>Joined: {formatDate(user.joinDate)}</span>
        </div>
        <div className="text-xs text-muted-foreground">Last login: {formatDateTime(user.lastLogin)}</div>
      </div>
    ),
  },
]
interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "manager" | "staff"
  status: "active" | "inactive" | "pending"
  joinDate: string
  lastLogin: string
}

export const userData: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "admin",
    status: "active",
    joinDate: "2023-01-15",
    lastLogin: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    role: "manager",
    status: "active",
    joinDate: "2023-03-22",
    lastLogin: "2024-01-19T14:15:00Z",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 345-6789",
    role: "staff",
    status: "pending",
    joinDate: "2024-01-10",
    lastLogin: "2024-01-18T09:45:00Z",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 (555) 456-7890",
    role: "staff",
    status: "active",
    joinDate: "2023-08-12",
    lastLogin: "2024-01-17T16:20:00Z",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1 (555) 567-8901",
    role: "manager",
    status: "inactive",
    joinDate: "2023-05-03",
    lastLogin: "2023-12-15T11:30:00Z",
  },
]


export default function UsersPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [data, setData] = useState(userData)
  const [filters, setFilters] = useState<Record<string, string>>({
    role: "",
    status: "",
    joinDate: "",
  })

  const [currentView, setCurrentView] = useState<DataTableView | undefined>(undefined)

  const views: DataTableView[] = [
    {
      id: "all",
      name: "All Users",
      filters: {},
    },
    {
      id: "active",
      name: "Active Users",
      filters: { status: "active" },
    },
    {
      id: "admins",
      name: "Administrators",
      filters: { role: "admin" },
    },
    {
      id: "staff",
      name: "Staff Members",
      filters: { role: "staff" },
    },
    {
      id: "pending",
      name: "Pending Approval",
      filters: { status: "pending" },
    },
  ]

  const bulkActions: BulkAction[] = [
    {
      label: "Update Role",
      icon: Shield,
      onClick: (selectedIds) => {
        console.log("Update role:", selectedIds)
      },
    },
    {
      label: "Deactivate",
      icon: UserX,
      variant: "destructive",
      onClick: (selectedIds) => {
        console.log("Deactivate users:", selectedIds)
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
    dispatch(setActiveTab("users"))
  }, [dispatch])

  const handleAddUser = () => {
    router.push("/users/new")
  }

  const handleViewChange = (view: DataTableView) => {
    setCurrentView(view)
    setFilters(view.filters)
  }

  const handleCreateView = () => {
    console.log("Creating new view...")
  }

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }))
  }

  const handleSelectionChange = (selectedIds: string[], selectedItems: any[]) => {
    console.log("Selection changed:", selectedIds, selectedItems)
  }

  const handleRowClick = (user: any) => {
    router.push(`/users/${user.id}`)
  }

  const tableFilters: DataTableFilter[] = [
    {
      key: "role",
      label: "Role",
      type: "select",
      value: filters.role,
      options: [
        { value: "admin", label: "Admin" },
        { value: "manager", label: "Manager" },
        { value: "staff", label: "Staff" },
      ],
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      value: filters.status,
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending" },
      ],
    },
    {
      key: "joinDate",
      label: "Join Date",
      type: "date",
      value: filters.joinDate,
      placeholder: "Filter by join date",
    },
  ]

  return (
    <div className="p-8 bg-background min-h-screen">
      <DataTable
        title="Users"
        views={views}
        currentView={currentView}
        onViewChange={handleViewChange}
        onCreateView={handleCreateView}
        primaryAction={{
          text: "Add User",
          icon: Plus,
          onClick: handleAddUser,
        }}
        columns={columns}
        data={data}
        searchable
        searchPlaceholder="Search users..."
        selectable
        bulkActions={bulkActions}
        onSelectionChange={handleSelectionChange}
        filters={tableFilters}
        onFilterChange={handleFilterChange}
        onExport={() => console.log("Export all")}
        onShare={() => console.log("Share")}
        onViewsClick={() => console.log("Views")}
        onSaveView={() => console.log("Save view")}
        onRowClick={handleRowClick}
      />
    </div>
  )
}
