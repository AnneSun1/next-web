"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataTable, type DataTableColumn } from "@/components/ui/data-table"
import { Plus, Eye } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  lastActive: string
  joinDate: string
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Admin",
    status: "active",
    lastActive: "2024-01-15T10:30:00Z",
    joinDate: "2023-06-15T09:00:00Z",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Property Manager",
    status: "active",
    lastActive: "2024-01-14T16:45:00Z",
    joinDate: "2023-08-22T14:30:00Z",
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike.wilson@example.com",
    role: "Maintenance",
    status: "inactive",
    lastActive: "2024-01-10T08:15:00Z",
    joinDate: "2023-09-10T11:00:00Z",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Guest Services",
    status: "active",
    lastActive: "2024-01-15T14:20:00Z",
    joinDate: "2023-11-05T10:15:00Z",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@example.com",
    role: "Cleaner",
    status: "pending",
    lastActive: "2024-01-12T12:00:00Z",
    joinDate: "2024-01-01T09:30:00Z",
  },
]

export default function UsersPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [users] = useState<User[]>(mockUsers)
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [loading] = useState(false)

  useEffect(() => {
    dispatch(setActiveTab("users"))
  }, [dispatch])

  const getStatusBadge = (status: User["status"]) => {
    const statusConfig = {
      active: { color: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30", text: "Active" },
      inactive: { color: "bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30", text: "Inactive" },
      pending: { color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30", text: "Pending" },
    }

    const config = statusConfig[status]
    return <Badge className={`${config.color} border`}>{config.text}</Badge>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return formatDate(dateString)
  }

  const handleRowClick = (user: User) => {
    router.push(`/users/${user.id}`)
  }

  const handleViewUser = (user: User, event: React.MouseEvent) => {
    event.stopPropagation()
    router.push(`/users/${user.id}`)
  }

  const columns: DataTableColumn<User>[] = [
    {
      key: "user",
      header: "User",
      width: "w-80",
      render: (user) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
            <span className="text-purple-600 dark:text-purple-400 font-medium text-sm">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <div className="font-medium text-foreground">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      width: "w-40",
      render: (user) => <span className="text-foreground">{user.role}</span>,
    },
    {
      key: "status",
      header: "Status",
      width: "w-32",
      render: (user) => getStatusBadge(user.status),
    },
    {
      key: "lastActive",
      header: "Last Active",
      width: "w-40",
      render: (user) => <span className="text-muted-foreground text-sm">{formatLastActive(user.lastActive)}</span>,
    },
    {
      key: "joinDate",
      header: "Join Date",
      width: "w-32",
      render: (user) => <span className="text-muted-foreground text-sm">{formatDate(user.joinDate)}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      width: "w-20",
      render: (user) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => handleViewUser(user, e)}
          className="h-8 w-8 p-0 hover:bg-accent"
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ]

  const handleSelectionChange = (selectedIds: number[]) => {
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Users</h1>
          <p className="text-muted-foreground">Manage team members and their permissions</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {selectedUsers.length > 0 && (
        <div className="flex items-center justify-between mb-6 p-4 bg-accent/50 rounded-lg border border-border">
          <span className="text-sm text-foreground">{selectedUsers.length} user(s) selected</span>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="border-border text-foreground hover:bg-accent bg-transparent"
            >
              Deactivate
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-border text-foreground hover:bg-accent bg-transparent"
            >
              Change Role
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-border text-foreground hover:bg-accent bg-transparent"
            >
              Delete
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
      />
    </div>
  )
}
