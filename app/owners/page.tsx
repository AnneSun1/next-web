"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataTable, type DataTableColumn, type DataTableFilter } from "@/components/ui/data-table"
import { PageHeader } from "@/components/ui/page-header"
import { Plus, Eye, Edit, Mail, Phone, Crown, Building2 } from "lucide-react"

interface Owner {
  id: string
  name: string
  email: string
  phone: string
  properties: number
  totalRevenue: number
  isPrimary: boolean
  status: "active" | "inactive" | "pending"
  joinDate: string
  lastLogin: string
}

const mockOwners: Owner[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    properties: 5,
    totalRevenue: 125000,
    isPrimary: true,
    status: "active",
    joinDate: "2022-01-15",
    lastLogin: "2024-01-20",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 234-5678",
    properties: 3,
    totalRevenue: 78000,
    isPrimary: false,
    status: "active",
    joinDate: "2022-08-22",
    lastLogin: "2024-01-18",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 345-6789",
    properties: 8,
    totalRevenue: 210000,
    isPrimary: true,
    status: "active",
    joinDate: "2021-11-10",
    lastLogin: "2024-01-19",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 456-7890",
    properties: 2,
    totalRevenue: 45000,
    isPrimary: false,
    status: "pending",
    joinDate: "2024-01-01",
    lastLogin: "2024-01-15",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    phone: "+1 (555) 567-8901",
    properties: 1,
    totalRevenue: 15000,
    isPrimary: false,
    status: "inactive",
    joinDate: "2023-05-20",
    lastLogin: "2023-12-01",
  },
]

export default function OwnersPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [owners] = useState<Owner[]>(mockOwners)
  const [loading] = useState(false)
  const [selectedOwners, setSelectedOwners] = useState<string[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [filters, setFilters] = useState<Record<string, string>>({
    status: "",
    properties: "",
    joinDate: "",
  })

  useEffect(() => {
    dispatch(setActiveTab("owners"))
  }, [dispatch])

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; text: string }> = {
      active: { color: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30", text: "Active" },
      pending: { color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30", text: "Pending" },
      inactive: { color: "bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30", text: "Inactive" },
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

  const handleRowClick = (owner: Owner) => {
    router.push(`/owners/${owner.id}`)
  }

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }))
  }

  const handleAddOwner = () => {
    console.log("Add new owner...")
  }

  const handleExport = () => {
    console.log("Exporting owners data...")
  }

  const handleShare = () => {
    console.log("Sharing owners data...")
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
      label: "Status",
      type: "select",
      value: filters.status,
      options: [
        { value: "active", label: "Active" },
        { value: "pending", label: "Pending" },
        { value: "inactive", label: "Inactive" },
      ],
    },
    {
      key: "properties",
      label: "Min Properties",
      type: "number",
      value: filters.properties,
      placeholder: "Minimum properties",
    },
    {
      key: "joinDate",
      label: "Join Date",
      type: "date",
      value: filters.joinDate,
      placeholder: "Filter by join date",
    },
  ]

  const columns: DataTableColumn<Owner>[] = [
    {
      key: "owner",
      header: "Owner",
      width: "w-64",
      render: (owner) => (
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            {owner.isPrimary && <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 fill-current" />}
          </div>
          <div className="space-y-1">
            <div className="font-medium text-foreground">{owner.name}</div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Mail className="h-3 w-3" />
              <span>{owner.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="h-3 w-3" />
              <span>{owner.phone}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "properties",
      header: "Properties",
      width: "w-32",
      render: (owner) => (
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">{owner.properties}</div>
          <div className="text-xs text-muted-foreground">properties</div>
        </div>
      ),
    },
    {
      key: "revenue",
      header: "Total Revenue",
      width: "w-40",
      render: (owner) => <div className="font-medium text-foreground">{formatCurrency(owner.totalRevenue)}</div>,
    },
    {
      key: "dates",
      header: "Dates",
      width: "w-40",
      render: (owner) => (
        <div className="space-y-1">
          <div className="text-sm text-foreground">Joined: {formatDate(owner.joinDate)}</div>
          <div className="text-xs text-muted-foreground">Last login: {formatDate(owner.lastLogin)}</div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "w-32",
      render: (owner) => getStatusBadge(owner.status),
    },
    {
      key: "actions",
      header: "Actions",
      width: "w-24",
      render: (owner) => (
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              console.log("View owner:", owner.id)
            }}
            className="h-8 w-8 p-0 hover:bg-accent"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              console.log("Edit owner:", owner.id)
            }}
            className="h-8 w-8 p-0 hover:bg-accent"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedOwners(selectedIds)
    setIsAllSelected(selectedIds.length === owners.length && owners.length > 0)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOwners(owners.map((owner) => owner.id))
      setIsAllSelected(true)
    } else {
      setSelectedOwners([])
      setIsAllSelected(false)
    }
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <PageHeader
        title="Owners"
        description="Manage property owners and partnerships"
        buttonText="Add Owner"
        buttonIcon={Plus}
        onButtonClick={handleAddOwner}
      />

      {selectedOwners.length > 0 && (
        <div className="flex items-center justify-between mb-6 p-4 bg-accent/50 rounded-lg border border-border">
          <span className="text-sm text-foreground">{selectedOwners.length} owner(s) selected</span>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedOwners([])}
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
        data={owners}
        columns={columns}
        loading={loading}
        searchable
        searchPlaceholder="Search owners..."
        selectable
        selectedItems={selectedOwners}
        onSelectionChange={handleSelectionChange}
        onSelectAll={handleSelectAll}
        isAllSelected={isAllSelected}
        onRowClick={handleRowClick}
        emptyMessage="No owners found"
        emptyDescription="Property owners will appear here once added"
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
