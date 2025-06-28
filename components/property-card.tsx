"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Bed, Bath, Star, Calendar, DollarSign } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Listing } from "@/types/listing"

interface PropertyCardProps {
  listing: Listing
}

export function PropertyCard({ listing }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <Image
          src="/placeholder.svg?height=200&width=300"
          alt={listing.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2">
          <Badge variant={listing.status === "active" ? "default" : "secondary"}>{listing.status}</Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="bg-white/90">
            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
            {listing.rating}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {listing.location}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {listing.maxGuests}
              </div>
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                {listing.bedrooms}
              </div>
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                {listing.bathrooms}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4" />
              <span className="font-semibold">{listing.pricePerNight}</span>
              <span className="text-sm text-muted-foreground ml-1">/night</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1" />
              {listing.nextAvailable}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button asChild size="sm" className="flex-1">
              <Link href={`/properties/${listing.id}`}>View Details</Link>
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <Calendar className="w-4 h-4 mr-1" />
              Calendar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
