"use client"

import { Plus, Calendar, Users, DollarSign, User, Edit, FileDown, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import {
  DataTable,
  type DataTableColumn,
  type DataTableFilter,
  type DataTableView,
  type BulkAction,
} from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { reservations, type Reservation } from "@/data/reservations"

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
    case "completed":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
    case "checked_in":
      return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const columns: DataTableColumn<Reservation>[] = [
  {
    key: "guest",
    header: "Guest & Property",
    width: "w-64",
    render: (reservation) => (
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">{reservation.guestName}</span>
        </div>
        <div className="text-sm text-muted-foreground">{reservation.guestEmail}</div>
        <div className="text-sm font-medium text-foreground">{reservation.propertyName}</div>
      </div>
    ),
  },
  {
    key: "dates",
    header: "Dates",
    width: "w-40",
    render: (reservation) => (
      <div className="space-y-1">
        <div className="flex items-center space-x-2 text-sm">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span>{formatDate(reservation.checkInDate)}</span>
        </div>
        <div className="text-sm text-muted-foreground">to {formatDate(reservation.checkOutDate)}</div>
        <div className="text-xs text-muted-foreground">{reservation.nights} nights</div>
      </div>
    ),
  },
  {
    key: "guests",
    header: "Guests",
    width: "w-24",
    render: (reservation) => (
      <div className="flex items-center space-x-1">
        <Users className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{reservation.guests}</span>
      </div>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    width: "w-32",
    render: (reservation) => (
      <div className="space-y-1">
        <div className="flex items-center space-x-1">
          <DollarSign className="h-3 w-3 text-muted-foreground" />
          <span className="font-medium">{formatCurrency(reservation.totalAmount)}</span>
        </div>
        <div className="text-xs text-muted-foreground capitalize">{reservation.paymentStatus}</div>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "w-32",
    render: (reservation) => (
      <Badge variant="outline" className={getStatusColor(reservation.status)}>
        {reservation.status.replace("_", " ").toUpperCase()}
      </Badge>
    ),
  },
  {
    key: "source",
    header: "Source",
    width: "w-24",
    render: (reservation) => <div className="text-sm capitalize">{reservation.source.replace("_", " ")}</div>,
  },
]

export default function ReservationsPage() {
  const [filters, setFilters] = useState<Record<string, string>>({
    status: "",
    paymentStatus: "",
    source: "",
  })

  const router = useRouter()

  const [currentView, setCurrentView] = useState<DataTableView | undefined>(undefined)

  const views: DataTableView[] = [
    {
      id: "all",
      name: "All Reservations",
      filters: {},
    },
    {
      id: "confirmed",
      name: "Confirmed",
      filters: { status: "confirmed" },
    },
    {
      id: "pending",
      name: "Pending Approval",
      filters: { status: "pending" },
    },
    {
      id: "completed",
      name: "Completed Stays",
      filters: { status: "completed" },
    },
    {
      id: "checked-in",
      name: "Currently Checked In",
      filters: { status: "checked_in" },
    },
  ]

  const bulkActions: BulkAction[] = [
    {
      label: "Update Status",
      icon: Edit,
      onClick: (selectedIds) => {
        console.log("Update status for:", selectedIds)
      },
    },
    {
      label: "Export Selected",
      icon: FileDown,
      onClick: (selectedIds) => {
        console.log("Export:", selectedIds)
      },
    },
    {
      label: "Cancel Reservations",
      icon: X,
      variant: "destructive",
      onClick: (selectedIds) => {
        console.log("Cancel:", selectedIds)
      },
    },
  ]

  const handleViewChange = (view: DataTableView) => {
    setCurrentView(view)
    // Apply the view's filters
    setFilters(view.filters)
  }

  const handleCreateView = () => {
    console.log("Creating new view...")
  }

  const handleNewReservation = () => {
    toast({
      title: "New Reservation",
      description: "Implement new reservation logic here.",
    })
  }

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }))
  }

  const handleSelectionChange = (selectedIds: string[], selectedItems: Reservation[]) => {
    console.log("Selection changed:", selectedIds, selectedItems)
  }

  const handleRowClick = (reservation: Reservation) => {
    router.push(`/reservations/${reservation.id}`)
  }

  const tableFilters: DataTableFilter[] = [
    {
      key: "status",
      label: "Status",
      type: "select",
      value: filters.status,
      options: [
        { value: "confirmed", label: "Confirmed" },
        { value: "pending", label: "Pending" },
        { value: "cancelled", label: "Cancelled" },
        { value: "completed", label: "Completed" },
        { value: "checked_in", label: "Checked In" },
      ],
    },
    {
      key: "paymentStatus",
      label: "Payment",
      type: "select",
      value: filters.paymentStatus,
      options: [
        { value: "paid", label: "Paid" },
        { value: "pending", label: "Pending" },
        { value: "partial", label: "Partial" },
        { value: "refunded", label: "Refunded" },
      ],
    },
    {
      key: "source",
      label: "Source",
      type: "select",
      value: filters.source,
      options: [
        { value: "direct", label: "Direct" },
        { value: "airbnb", label: "Airbnb" },
        { value: "vrbo", label: "VRBO" },
        { value: "booking.com", label: "Booking.com" },
        { value: "expedia", label: "Expedia" },
      ],
    },
  ]

  return (
    <div className="p-8 bg-background min-h-screen">
      <DataTable
        title="Reservations"
        views={views}
        currentView={currentView}
        onViewChange={handleViewChange}
        onCreateView={handleCreateView}
        primaryAction={{
          text: "New Reservation",
          icon: Plus,
          onClick: handleNewReservation,
        }}
        columns={columns}
        data={reservations}
        searchable
        searchPlaceholder="Search reservations..."
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
