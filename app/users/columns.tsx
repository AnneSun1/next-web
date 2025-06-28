import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Calendar, Shield } from "lucide-react"
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
