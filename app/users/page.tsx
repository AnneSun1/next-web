"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataTable, type DataTableColumn, type DataTableFilter } from "@/components/ui/data-table"
import { PageHeader } from "@/components/ui/page-header"
import { Plus, Eye, Edit, Mail, Phone, Calendar } from "lucide-react"

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

const mockUsers: User[] = [
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
]

export default function UsersPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [users] = useState<User[]>(mockUsers)
  const [loading] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [filters, setFilters] = useState<Record<string, string>>({
    role: "",
    status: "",
    joinDate: "",
  })

  useEffect(() => {
    dispatch(setActiveTab("users"))
  }, [dispatch])

  const getRoleBadge = (role: string) => {
    const roleConfig: Record<string, { color: string; text: string }> = {
      admin: { color: "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30", text: "Admin" },
      manager: { color: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30", text: "Manager" },
      staff: { color: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30", text: "Staff" },
    }

    const config = roleConfig[role.toLowerCase()] || roleConfig.staff
    return <Badge className={`${config.color} border`}>{config.text}</Badge>
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

  const handleRowClick = (user: User) => {
    router.push(`/users/${user.id}`)
  }

  const handleAddUser = () => {
    router.push("/users/new")
  }

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }))
  }

  const handleExport = () => {
    console.log("Exporting users data...")
  }

  const handleShare = () => {
    console.log("Sharing users data...")
  }

  const handleViewsClick = () => {
    console.log("Opening views...")
  }

  const handleSaveView = () => {
    console.log("Saving current view...")
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

  const columns: DataTableColumn<User>[] = [
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
    // {
    //   key: "actions",
    //   header: "Actions",
    //   width: "w-24",
    //   render: (user) => (
    //     <div className="flex items-center space-x-1">
    //       <Button
    //         variant="ghost"
    //         size="sm"
    //         onClick={(e) => {
    //           e.stopPropagation()
    //           console.log("View user:", user.id)
    //         }}
    //         className="h-8 w-8 p-0 hover:bg-accent"
    //       >
    //         <Eye className="h-4 w-4" />
    //       </Button>
    //       <Button
    //         variant="ghost"
    //         size="sm"
    //         onClick={(e) => {
    //           e.stopPropagation()
    //           console.log("Edit user:", user.id)
    //         }}
    //         className="h-8 w-8 p-0 hover:bg-accent"
    //       >
    //         <Edit className="h-4 w-4" />
    //       </Button>
    //     </div>
    //   ),
    // },
  ]

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedUsers(selectedIds)
    setIsAllSelected(selectedIds.length === users.length && users.length > 0)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map((user) => user.id))
      setIsAllSelected(true)
    } else {
      setSelectedUsers([])
      setIsAllSelected(false)
    }
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <PageHeader
        title="Users"
        description="Manage team members and user accounts"
        buttonText="Add User"
        buttonIcon={Plus}
        onButtonClick={handleAddUser}
      />

      {selectedUsers.length > 0 && (
        <div className="flex items-center justify-between mb-6 p-4 bg-accent/50 rounded-lg border border-border">
          <span className="text-sm text-foreground">{selectedUsers.length} user(s) selected</span>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedUsers([])}
              className="border-border text-foreground hover:bg-accent bg-transparent"
            >
              Clear
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-border text-foreground hover:bg-accent bg-transparent"
            >
              Update Role
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-border text-foreground hover:bg-accent bg-transparent"
            >
              Export
            </Button>
          </div>
        </div>
      )}

      <DataTable
        data={users}
        columns={columns}
        loading={loading}
        searchable
        searchPlaceholder="Search users..."
        selectable
        selectedItems={selectedUsers}
        onSelectionChange={handleSelectionChange}
        onSelectAll={handleSelectAll}
        isAllSelected={isAllSelected}
        onRowClick={handleRowClick}
        emptyMessage="No users found"
        emptyDescription="Add your first team member to get started"
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
