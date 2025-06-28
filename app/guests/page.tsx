"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataTable, type DataTableColumn, type DataTableFilter } from "@/components/ui/data-table"
import { PageHeader } from "@/components/ui/page-header"
import { Download, Eye, Edit, Mail, Phone, MapPin, Star, Plus } from "lucide-react"

interface Guest {
  id: string
  name: string
  email: string
  phone: string
  totalStays: number
  totalSpent: number
  lastStay: string
  favoriteProperty: string
  status: "verified" | "pending" | "blocked"
  rating: number
  joinDate: string
}

const mockGuests: Guest[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1 (555) 111-2222",
    totalStays: 8,
    totalSpent: 12500,
    lastStay: "2024-01-15",
    favoriteProperty: "Oceanview Villa",
    status: "verified",
    rating: 4.8,
    joinDate: "2022-06-15",
  },
  {
    id: "2",
    name: "Bob Wilson",
    email: "bob.wilson@example.com",
    phone: "+1 (555) 222-3333",
    totalStays: 3,
    totalSpent: 4200,
    lastStay: "2023-12-20",
    favoriteProperty: "Mountain Cabin",
    status: "verified",
    rating: 4.5,
    joinDate: "2023-03-10",
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol.davis@example.com",
    phone: "+1 (555) 333-4444",
    totalStays: 1,
    totalSpent: 850,
    lastStay: "2024-01-05",
    favoriteProperty: "City Apartment",
    status: "pending",
    rating: 0,
    joinDate: "2024-01-01",
  },
  {
    id: "4",
    name: "David Martinez",
    email: "david.martinez@example.com",
    phone: "+1 (555) 444-5555",
    totalStays: 12,
    totalSpent: 18900,
    lastStay: "2024-01-20",
    favoriteProperty: "Beachfront Condo",
    status: "verified",
    rating: 4.9,
    joinDate: "2021-09-12",
  },
  {
    id: "5",
    name: "Emma Thompson",
    email: "emma.thompson@example.com",
    phone: "+1 (555) 555-6666",
    totalStays: 2,
    totalSpent: 1650,
    lastStay: "2023-11-30",
    favoriteProperty: "Downtown Loft",
    status: "blocked",
    rating: 2.1,
    joinDate: "2023-08-05",
  },
]

export default function GuestsPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [guests] = useState<Guest[]>(mockGuests)
  const [loading] = useState(false)
  const [selectedGuests, setSelectedGuests] = useState<string[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [filters, setFilters] = useState<Record<string, string>>({
    status: "",
    totalStays: "",
    joinDate: "",
  })

  useEffect(() => {
    dispatch(setActiveTab("guests"))
  }, [dispatch])

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; text: string }> = {
      verified: { color: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30", text: "Verified" },
      pending: { color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30", text: "Pending" },
      blocked: { color: "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30", text: "Blocked" },
    }

    const config = statusConfig[status.toLowerCase()] || statusConfig.pending
    return <Badge className={`${config.color} border`}>{config.text}</Badge>
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

  const handleRowClick = (guest: Guest) => {
    router.push(`/guests/${guest.id}`)
  }

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }))
  }

  const handleAddGuest = () => {
    router.push("/guests/new")
  }

  const handleExport = () => {
    console.log("Exporting data...")
  }

  const handleShare = () => {
    console.log("Sharing guests data...")
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
      label: "",
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
      label: "",
      type: "number",
      value: filters.totalStays,
      placeholder: "Minimum stays",
    },
    {
      key: "joinDate",
      label: "",
      type: "date",
      value: filters.joinDate,
      placeholder: "Filter by join date",
    },
  ]

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
      key: "stays",
      header: "Stay History",
      width: "w-40",
      render: (guest) => (
        <div className="space-y-1">
          <div className="text-sm text-foreground font-medium">{guest.totalStays} stays</div>
          <div className="text-xs text-muted-foreground">Last: {formatDate(guest.lastStay)}</div>
        </div>
      ),
    },
    {
      key: "spending",
      header: "Total Spent",
      width: "w-32",
      render: (guest) => <div className="font-medium text-foreground">{formatCurrency(guest.totalSpent)}</div>,
    },
    {
      key: "favorite",
      header: "Favorite Property",
      width: "w-48",
      render: (guest) => (
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{guest.favoriteProperty}</span>
        </div>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      width: "w-24",
      render: (guest) => (
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="text-foreground">{guest.rating > 0 ? guest.rating.toFixed(1) : "N/A"}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "w-32",
      render: (guest) => getStatusBadge(guest.status),
    },
    // {
    //   key: "actions",
    //   header: "Actions",
    //   width: "w-24",
    //   render: (guest) => (
    //     <div className="flex items-center space-x-1">
    //       <Button
    //         variant="ghost"
    //         size="sm"
    //         onClick={(e) => {
    //           e.stopPropagation()
    //           console.log("View guest:", guest.id)
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
    //           console.log("Edit guest:", guest.id)
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
    setSelectedGuests(selectedIds)
    setIsAllSelected(selectedIds.length === guests.length && guests.length > 0)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedGuests(guests.map((guest) => guest.id))
      setIsAllSelected(true)
    } else {
      setSelectedGuests([])
      setIsAllSelected(false)
    }
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <PageHeader
        title="Guests"
        description="Manage guest profiles and stay history"
        buttonText="Add Guest"
        buttonIcon={Plus}
        onButtonClick={handleAddGuest}
      />

      {selectedGuests.length > 0 && (
        <div className="flex items-center justify-between mb-6 p-4 bg-accent/50 rounded-lg border border-border">
          <span className="text-sm text-foreground">{selectedGuests.length} guest(s) selected</span>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedGuests([])}
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
              Send Message
            </Button>
          </div>
        </div>
      )}

      <DataTable
        data={guests}
        columns={columns}
        loading={loading}
        searchable
        searchPlaceholder="Search guests..."
        selectable
        selectedItems={selectedGuests}
        onSelectionChange={handleSelectionChange}
        onSelectAll={handleSelectAll}
        isAllSelected={isAllSelected}
        onRowClick={handleRowClick}
        emptyMessage="No guests found"
        emptyDescription="Guests will appear here after their first booking"
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
