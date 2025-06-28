"use client"

import { useState } from "react"
import { DataTable, type DataTableColumn, type DataTableFilter } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Plus, MapPin, Bed, Bath, Square } from "lucide-react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/ui/page-header"

// Mock data for properties
const mockProperties = [
  {
    id: "1",
    title: "Panorama Base Camp",
    location: "Panorama, BC, Canada",
    bedrooms: 1,
    bathrooms: 1,
    area: 850,
    status: "Available",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
  },
  {
    id: "2",
    title: "Downtown Loft Retreat",
    location: "Vancouver, BC, Canada",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    status: "Available",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
  },
  {
    id: "3",
    title: "Cozy Mountain Cabin",
    location: "Whistler, BC, Canada",
    bedrooms: 3,
    bathrooms: 2,
    area: 1400,
    status: "Occupied",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
  },
  {
    id: "4",
    title: "Beachfront Villa",
    location: "Tofino, BC, Canada",
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    status: "Available",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
  },
  {
    id: "5",
    title: "Urban Studio Apartment",
    location: "Toronto, ON, Canada",
    bedrooms: 0,
    bathrooms: 1,
    area: 450,
    status: "Maintenance",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
  },
  {
    id: "6",
    title: "Luxury Penthouse",
    location: "Montreal, QC, Canada",
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    status: "Available",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
  },
]

type Property = (typeof mockProperties)[0]

export default function PropertiesPage() {
  const router = useRouter()
  const [filters, setFilters] = useState<Record<string, string>>({
    status: "",
    bedrooms: "",
  })

  const handleAddProperty = () => {
    router.push("/properties/new")
  }

  const handleRowClick = (property: Property) => {
    router.push(`/properties/${property.id}`)
  }

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }))
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "default"
      case "occupied":
        return "secondary"
      case "maintenance":
        return "destructive"
      default:
        return "outline"
    }
  }

  const columns: DataTableColumn<Property>[] = [
    {
      key: "property",
      header: "Property",
      width: "flex-[2]",
      render: (property) => (
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <img
              src={property.images[0] || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="font-medium text-foreground truncate">{property.title}</div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">{property.location}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "details",
      header: "Details",
      width: "w-48",
      render: (property) => (
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Bed className="h-3 w-3 mr-1" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-3 w-3 mr-1" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Square className="h-3 w-3 mr-1" />
            <span>{property.area} sq ft</span>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "w-32",
      render: (property) => <Badge variant={getStatusBadgeVariant(property.status)}>{property.status}</Badge>,
    },
  ]

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
      ],
    },
    {
      key: "bedrooms",
      label: "Bedrooms",
      type: "select",
      value: filters.bedrooms,
      options: [
        { value: "0", label: "Studio" },
        { value: "1", label: "1 Bedroom" },
        { value: "2", label: "2 Bedrooms" },
        { value: "3", label: "3 Bedrooms" },
        { value: "4", label: "4+ Bedrooms" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <PageHeader
          title="Properties"
          description="Manage property owners and partnerships"
          buttonText="Add Property"
          buttonIcon={Plus}
          onButtonClick={handleAddProperty}
        />

        {/* Data Table */}
        <DataTable
          data={mockProperties}
          columns={columns}
          searchable={true}
          searchPlaceholder="Search properties by name or location..."
          selectable={true}
          onRowClick={handleRowClick}
          emptyMessage="No properties found"
          emptyDescription="No properties match your current search and filters."
          filters={tableFilters}
          onFilterChange={handleFilterChange}
          onExport={() => {
            console.log("Export properties")
          }}
          onShare={() => {
            console.log("Share properties")
          }}
          onViewsClick={() => {
            console.log("Manage views")
          }}
          onSaveView={() => {
            console.log("Save current view")
          }}
        />
      </div>
    </div>
  )
}
