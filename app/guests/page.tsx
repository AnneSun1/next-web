"use client"

import { Plus, MapPin, Star, Mail, Phone, UserCheck, MessageSquare, FileDown } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  DataTable,
  type DataTableView,
  type DataTableColumn,
  type DataTableFilter,
  type BulkAction,
} from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"

import { type Guest, guests } from "@/data/guests"

const columns: DataTableColumn<Guest>[] = [
  {
    key: "guest",
    header: "Guest",
    width: "w-64",
    render: (guest) => (
      <div className="space-y-1">
        <div className="font-medium text-foreground">{guest.name}</div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Mail className="h-3 w-3" />
          <span>{guest.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Phone className="h-3 w-3" />
          <span>{guest.phone}</span>
        </div>
      </div>
    ),
  },
  {
    key: "location",
    header: "Location",
    width: "w-40",
    render: (guest) => (
      <div className="flex items-center space-x-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{guest.location}</span>
      </div>
    ),
  },
  {
    key: "stays",
    header: "Stays & Spending",
    width: "w-40",
    render: (guest) => (
      <div className="space-y-1">
        <div className="text-sm font-medium">{guest.totalStays} stays</div>
        <div className="text-xs text-muted-foreground">${guest.totalSpent.toLocaleString()} total</div>
      </div>
    ),
  },
  {
    key: "rating",
    header: "Rating",
    width: "w-24",
    render: (guest) => (
      <div className="flex items-center space-x-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">{guest.averageRating}</span>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "w-32",
    render: (guest) => {
      const statusColors = {
        verified:
          "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
        pending:
          "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800",
        blocked: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
      }
      return (
        <Badge variant="outline" className={statusColors[guest.status]}>
          {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
        </Badge>
      )
    },
  },
  {
    key: "lastCheckIn",
    header: "Last Check-in",
    width: "w-32",
    render: (guest) => (
      <div className="text-sm text-muted-foreground">
        {new Date(guest.lastCheckIn).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    ),
  },
]

export default function GuestsPage() {
  const [data, setData] = useState(guests)
  const [currentView, setCurrentView] = useState<DataTableView | undefined>(undefined)

  const router = useRouter()

  const views: DataTableView[] = [
    {
      id: "all",
      name: "All Guests",
      filters: {},
    },
    {
      id: "verified",
      name: "Verified Guests",
      filters: { status: "verified" },
    },
    {
      id: "vip",
      name: "VIP Guests (5+ Stays)",
      filters: { totalStays: "5" },
    },
    {
      id: "new",
      name: "New Guests",
      filters: { totalStays: "1" },
    },
    {
      id: "pending",
      name: "Pending Verification",
      filters: { status: "pending" },
    },
  ]

  const bulkActions: BulkAction[] = [
    {
      label: "Verify Guests",
      icon: UserCheck,
      onClick: (selectedIds) => {
        console.log("Verify guests:", selectedIds)
      },
    },
    {
      label: "Send Message",
      icon: MessageSquare,
      onClick: (selectedIds) => {
        console.log("Send message to:", selectedIds)
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

  const handleViewChange = (view: DataTableView) => {
    setCurrentView(view)
  }

  const handleCreateView = () => {
    console.log("Creating new view...")
  }

  const handleAddGuest = () => {
    alert("Add guest")
  }

  const [filters, setFilters] = useState({
    status: "",
    totalStays: "",
  })

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }))
  }

  const handleSelectionChange = (selectedIds: string[], selectedItems: Guest[]) => {
    console.log("Selection changed:", selectedIds, selectedItems)
  }

  const handleRowClick = (guest: Guest) => {
    router.push(`/guests/${guest.id}`)
  }

  const tableFilters: DataTableFilter[] = [
    {
      key: "status",
      label: "Status",
      type: "select",
      value: filters.status,
      options: [
        { value: "verified", label: "Verified" },
        { value: "pending", label: "Pending" },
        { value: "blocked", label: "Blocked" },
      ],
    },
    {
      key: "totalStays",
      label: "Min Stays",
      type: "number",
      value: filters.totalStays,
      placeholder: "Minimum stays",
    },
  ]

  return (
    <div className="p-8 bg-background min-h-screen">
      <DataTable
        title="Guests"
        views={views}
        currentView={currentView}
        onViewChange={handleViewChange}
        onCreateView={handleCreateView}
        primaryAction={{
          text: "Add Guest",
          icon: Plus,
          onClick: handleAddGuest,
        }}
        columns={columns}
        data={data}
        searchable
        searchPlaceholder="Search guests..."
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
