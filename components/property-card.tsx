"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Property {
  id: string
  title: string
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  status: string
  images: string[]
}

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const router = useRouter()

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
  }

  const goToImage = (e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    setCurrentImageIndex(index)
  }

  const handleCardClick = () => {
    router.push(`/properties/${property.id}`)
  }

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg bg-card border-border"
      onClick={handleCardClick}
    >
      <div className="relative h-48 group">
        <img
          src={property.images[currentImageIndex] || "/placeholder.svg"}
          alt={property.title}
          className="w-full h-full object-cover"
        />

        {/* Carousel Controls */}
        {property.images.length > 1 && (
          <>
            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => goToImage(e, index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>

            {/* Image Counter */}
            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </>
        )}

        {/* Status Badge */}
        <div className="absolute top-2 left-2">
          <Badge variant={property.status === "Available" ? "default" : "secondary"} className="text-xs">
            {property.status}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-foreground line-clamp-1">{property.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{property.location}</p>
          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            <span>{property.bedrooms} bed</span>
            <span>{property.bathrooms} bath</span>
            <span>{property.area} sq ft</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
