"use client"

import { Plus, Trash2, Edit, FileDown } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { DataTable, type DataTableFilter, type DataTableView, type BulkAction } from "@/components/ui/data-table"


import { properties, type Property } from "@/data/properties"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Users, DollarSign, Star } from "lucide-react"
import type { DataTableColumn } from "@/components/ui/data-table"


const getStatusColor = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
    case "Occupied":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
    case "Maintenance":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
    case "Blocked":
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
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

export const propertyColumns: DataTableColumn<Property>[] = [
  {
    key: "property",
    header: "Property",
    width: "w-80",
    render: (property) => (
      <div className="flex items-start space-x-3">
        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
          <Building2 className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-1 min-w-0 flex-1">
          <div className="font-medium text-foreground truncate">{property.name}</div>
          <div className="text-sm text-muted-foreground truncate">{property.nickname}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">
              {property.city}, {property.state}
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "details",
    header: "Details",
    width: "w-40",
    render: (property) => (
      <div className="space-y-1">
        <div className="text-sm">
          <span className="font-medium">{property.bedrooms}</span> bed,{" "}
          <span className="font-medium">{property.bathrooms}</span> bath
        </div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Users className="h-3 w-3" />
          <span>Up to {property.maxGuests} guests</span>
        </div>
        <div className="text-xs text-muted-foreground capitalize">{property.propertyType.replace("_", " ")}</div>
      </div>
    ),
  },
  {
    key: "pricing",
    header: "Pricing",
    width: "w-32",
    render: (property) => (
      <div className="space-y-1">
        <div className="flex items-center space-x-1">
          <DollarSign className="h-3 w-3 text-muted-foreground" />
          <span className="font-medium">{formatCurrency(property.basePrice)}</span>
          <span className="text-xs text-muted-foreground">/night</span>
        </div>
        <div className="text-xs text-muted-foreground">+{formatCurrency(property.cleaningFee)} cleaning</div>
      </div>
    ),
  },
  {
    key: "performance",
    header: "Performance",
    width: "w-40",
    render: (property) => (
      <div className="space-y-1">
        <div className="flex items-center space-x-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{property.averageRating}</span>
          <span className="text-xs text-muted-foreground">({property.bookingCount} bookings)</span>
        </div>
        <div className="text-xs text-muted-foreground">{formatCurrency(property.totalRevenue)} total revenue</div>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "w-32",
    render: (property) => (
      <Badge variant="outline" className={getStatusColor(property.status)}>
        {property.status}
      </Badge>
    ),
  },
]
export default function PropertiesPage() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<Record<string, string>>({
    status: "",
    bedrooms: "",
    propertyType: "",
  })

  const [currentView, setCurrentView] = useState<DataTableView | undefined>(undefined)
  const router = useRouter()

  const views: DataTableView[] = [
    {
      id: "all",
      name: "All Properties",
      filters: {},
    },
    {
      id: "available",
      name: "Available",
      filters: { status: "Available" },
    },
    {
      id: "occupied",
      name: "Occupied",
      filters: { status: "Occupied" },
    },
    {
      id: "maintenance",
      name: "Under Maintenance",
      filters: { status: "Maintenance" },
    },
    {
      id: "large",
      name: "Large Properties (3+ BR)",
      filters: { bedrooms: "3" },
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
      label: "Delete Properties",
      icon: Trash2,
      variant: "destructive",
      onClick: (selectedIds) => {
        console.log("Delete:", selectedIds)
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

  const handleAddProperty = async () => {
    setLoading(true)

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLoading(false)
    setOpen(false)
    toast({
      title: "Property Added",
      description: "Your property has been added to the system.",
    })
  }

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }))
  }

  const handleSelectionChange = (selectedIds: string[], selectedItems: Property[]) => {
    console.log("Selection changed:", selectedIds, selectedItems)
  }

  const handleRowClick = (property: Property) => {
    router.push(`/properties/${property.id}`)
  }

  const tableFilters: DataTableFilter[] = [
    {
      key: "status",
      label: "Status",
      type: "select",
      value: filters.status,
      options: [
        { value: "Available", label: "Available" },
        { value: "Occupied", label: "Occupied" },
        { value: "Maintenance", label: "Maintenance" },
        { value: "Blocked", label: "Blocked" },
      ],
    },
    {
      key: "bedrooms",
      label: "Min Bedrooms",
      type: "number",
      value: filters.bedrooms,
      placeholder: "Minimum bedrooms",
    },
    {
      key: "propertyType",
      label: "Property Type",
      type: "select",
      value: filters.propertyType,
      options: [
        { value: "apartment", label: "Apartment" },
        { value: "house", label: "House" },
        { value: "condo", label: "Condo" },
        { value: "villa", label: "Villa" },
        { value: "cabin", label: "Cabin" },
        { value: "loft", label: "Loft" },
      ],
    },
  ]

  return (
    <div className="p-8 bg-background min-h-screen">
      <DataTable
        title="Properties"
        views={views}
        currentView={currentView}
        onViewChange={handleViewChange}
        onCreateView={handleCreateView}
        primaryAction={{
          text: "Add Property",
          icon: Plus,
          onClick: handleAddProperty,
        }}
        columns={propertyColumns}
        data={properties}
        searchable
        searchPlaceholder="Search properties..."
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Property</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Property</DialogTitle>
            <DialogDescription>Add a new property to the system.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Property Name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="beds" className="text-right">
                Beds
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleAddProperty} disabled={loading}>
            {loading ? "Loading" : "Add Property"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
