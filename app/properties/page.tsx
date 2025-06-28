"use client"

import { useState } from "react"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
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

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const filteredProperties = mockProperties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddProperty = () => {
    router.push("/properties/new")
  }

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

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No properties found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
