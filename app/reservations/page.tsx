"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"
import { useReservations } from "@/hooks/useReservations"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataTable, type DataTableColumn, type DataTableFilter } from "@/components/ui/data-table"
import { PageHeader } from "@/components/ui/page-header"
import { ReservationViewModal } from "@/components/modals/reservation-view-modal"
import { ReservationEditModal } from "@/components/modals/reservation-edit-modal"
import { Plus, Eye, Edit, Calendar, MapPin, Users, DollarSign } from "lucide-react"
import type { Reservation } from "@/types/reservation"

export default function ReservationsPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    reservations,
    loading,
    error,
    fetchReservations,
    selectedReservationIds,
    setSelectedIds,
    selectAll,
    clearSelection,
    isAllSelected,
  } = useReservations()

  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [filters, setFilters] = useState<Record<string, string>>({
    status: "",
    property: "",
    checkInDate: "",
  })

  useEffect(() => {
    dispatch(setActiveTab("reservations"))
    // Fetch reservations when component mounts
    fetchReservations()
  }, [dispatch, fetchReservations])

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; text: string }> = {
      confirmed: { color: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30", text: "Confirmed" },
      pending: { color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30", text: "Pending" },
      cancelled: { color: "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30", text: "Cancelled" },
      completed: { color: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30", text: "Completed" },
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const handleRowClick = (reservation: Reservation) => {
    router.push(`/reservations/${reservation.id}`)
  }

  const handleViewReservation = (reservation: Reservation, event: React.MouseEvent) => {
    event.stopPropagation()
    setSelectedReservation(reservation)
    setViewModalOpen(true)
  }

  const handleEditReservation = (reservation: Reservation, event: React.MouseEvent) => {
    event.stopPropagation()
    setSelectedReservation(reservation)
    setEditModalOpen(true)
  }

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }))
  }

  const handleExport = () => {
    console.log("Exporting reservations data...")
    // Implement export functionality
  }

  const handleShare = () => {
    console.log("Sharing reservations data...")
    // Implement share functionality
  }

  const handleViewsClick = () => {
    console.log("Opening views...")
    // Implement views functionality
  }

  const handleSaveView = () => {
    console.log("Saving current view...")
    // Implement save view functionality
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
      ],
    },
    {
      key: "property",
      label: "Property",
      type: "text",
      value: filters.property,
      placeholder: "Filter by property name",
    },
    {
      key: "checkInDate",
      label: "Check-in Date",
      type: "date",
      value: filters.checkInDate,
      placeholder: "Filter by check-in date",
    },
  ]

  const columns: DataTableColumn<Reservation>[] = [
    {
      key: "guest",
      header: "Guest",
      width: "w-64",
      render: (reservation) => (
        <div className="space-y-1">
          <div className="font-medium text-foreground">{reservation.guest_full_name}</div>
          <div className="text-sm text-muted-foreground">{reservation.guest?.email || "No email"}</div>
          <div className="text-xs text-muted-foreground">ID: {reservation.id}</div>
        </div>
      ),
    },
    {
      key: "property",
      header: "Property",
      width: "w-48",
      render: (reservation) => (
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{reservation.listing?.name || `Property ${reservation.listing_id}`}</span>
        </div>
      ),
    },
    {
      key: "dates",
      header: "Dates",
      width: "w-48",
      render: (reservation) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground">
              {formatDate(reservation.check_in)} - {formatDate(reservation.check_out)}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">{reservation.nights_count} nights</div>
        </div>
      ),
    },
    {
      key: "guests",
      header: "Guests",
      width: "w-24",
      render: (reservation) => (
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{reservation.guestscount}</span>
        </div>
      ),
    },
    {
      key: "total",
      header: "Total",
      width: "w-32",
      render: (reservation) => (
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">{formatCurrency(reservation.amount || 0)}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "w-32",
      render: (reservation) => getStatusBadge(reservation.reservation_status_code),
    },
    {
      key: "actions",
      header: "Actions",
      width: "w-24",
      render: (reservation) => (
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleViewReservation(reservation, e)}
            className="h-8 w-8 p-0 hover:bg-accent"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleEditReservation(reservation, e)}
            className="h-8 w-8 p-0 hover:bg-accent"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedIds(selectedIds.map((id) => Number.parseInt(id)))
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      selectAll()
    } else {
      clearSelection()
    }
  }

  if (error) {
    return (
      <div className="p-8 bg-background min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Error Loading Reservations</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <PageHeader
        title="Reservations"
        description="Manage guest bookings and reservations"
        buttonText="New Reservation"
        buttonIcon={Plus}
        onButtonClick={() => console.log("New reservation clicked")}
      />

      {selectedReservationIds.length > 0 && (
        <div className="flex items-center justify-between mb-6 p-4 bg-accent/50 rounded-lg border border-border">
          <span className="text-sm text-foreground">{selectedReservationIds.length} reservation(s) selected</span>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={clearSelection}
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
              Export
            </Button>
          </div>
        </div>
      )}

      <DataTable
        data={reservations}
        columns={columns}
        loading={loading.list}
        searchable
        searchPlaceholder="Search reservations..."
        selectable
        selectedItems={selectedReservationIds.map((id) => String(id))}
        onSelectionChange={handleSelectionChange}
        onSelectAll={handleSelectAll}
        isAllSelected={isAllSelected}
        onRowClick={handleRowClick}
        emptyMessage="No reservations found"
        emptyDescription="Create your first reservation to get started"
        filters={tableFilters}
        onFilterChange={handleFilterChange}
        onExport={handleExport}
        onShare={handleShare}
        onViewsClick={handleViewsClick}
        onSaveView={handleSaveView}
      />

      {selectedReservation && (
        <>
          <ReservationViewModal
            reservation={selectedReservation}
            open={viewModalOpen}
            onOpenChange={setViewModalOpen}
          />
          <ReservationEditModal
            reservation={selectedReservation}
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
          />
        </>
      )}
    </div>
  )
}
