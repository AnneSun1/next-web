"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyCalendar } from "@/components/property-calendar"
import { mockListings } from "@/constants/listingData"
import {
  ArrowLeft,
  Share,
  Heart,
  MapPin,
  Users,
  Bed,
  Bath,
  Wifi,
  Car,
  Tv,
  Mountain,
  Utensils,
  Thermometer,
  Edit,
  Save,
  X,
  Globe,
  Calendar,
  Camera,
  Building,
  FileText,
  ChevronLeft,
  ChevronRight,
  Download,
  Trash2,
  Upload,
} from "lucide-react"

export default function PropertyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const propertyId = params.id as string

  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [formData, setFormData] = useState<any>({})
  const [activeTab, setActiveTab] = useState("listing-info")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const listing = mockListings.find((l) => l.id === propertyId)

  if (!listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/properties")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Button>
        </div>
      </div>
    )
  }

  const handleEdit = (section: string) => {
    setEditingSection(section)
    setFormData({ ...listing })
  }

  const handleSave = (section: string) => {
    console.log(`Saving ${section}:`, formData)
    setEditingSection(null)
    setFormData({})
  }

  const handleCancel = () => {
    setEditingSection(null)
    setFormData({})
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="h-4 w-4" />
      case "kitchen":
        return <Utensils className="h-4 w-4" />
      case "parking":
        return <Car className="h-4 w-4" />
      case "heating":
        return <Thermometer className="h-4 w-4" />
      case "tv":
        return <Tv className="h-4 w-4" />
      case "mountainView":
        return <Mountain className="h-4 w-4" />
      default:
        return null
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-8">
        {/* Back Button - Top Row */}
        <div className="mb-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/properties")} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Property Title and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{listing.title}</h1>
            <p className="text-muted-foreground mt-1">{listing.nickname}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Heart className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Property Information Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="listing-info" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Listing Info</span>
            </TabsTrigger>
            <TabsTrigger value="ota-info" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>OTA Info</span>
            </TabsTrigger>
            <TabsTrigger value="descriptions" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Descriptions</span>
            </TabsTrigger>
            <TabsTrigger value="reservations" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Reservations</span>
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>Photos</span>
            </TabsTrigger>
          </TabsList>

          {/* Listing Table Info Tab */}
          <TabsContent value="listing-info" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Property Information */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Basic Information</h3>
                      {editingSection !== "basic" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit("basic")}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {editingSection === "basic" && (
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSave("basic")}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {editingSection === "basic" ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-foreground">Title</label>
                            <Input
                              value={formData.title || listing.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground">Nickname</label>
                            <Input
                              value={formData.nickname || listing.nickname}
                              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-foreground">Property Type</label>
                            <Select
                              value={formData.propertyType || listing.propertyType}
                              onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="house">House</SelectItem>
                                <SelectItem value="condo">Condo</SelectItem>
                                <SelectItem value="villa">Villa</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground">Room Type</label>
                            <Input
                              value={formData.roomType || listing.roomType}
                              onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <label className="text-sm font-medium text-foreground">Accommodates</label>
                            <Input
                              type="number"
                              value={formData.accommodates || listing.accommodates}
                              onChange={(e) =>
                                setFormData({ ...formData, accommodates: Number.parseInt(e.target.value) })
                              }
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground">Bedrooms</label>
                            <Input
                              type="number"
                              value={formData.bedrooms || listing.bedrooms}
                              onChange={(e) => setFormData({ ...formData, bedrooms: Number.parseInt(e.target.value) })}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground">Beds</label>
                            <Input
                              type="number"
                              value={formData.beds || listing.beds}
                              onChange={(e) => setFormData({ ...formData, beds: Number.parseInt(e.target.value) })}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground">Bathrooms</label>
                            <Input
                              type="number"
                              step="0.5"
                              value={formData.bathrooms || listing.bathrooms}
                              onChange={(e) =>
                                setFormData({ ...formData, bathrooms: Number.parseFloat(e.target.value) })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 text-muted-foreground">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {listing.accommodates} guests
                          </div>
                          <div className="flex items-center">
                            <Bed className="h-4 w-4 mr-1" />
                            {listing.bedrooms} bedroom{listing.bedrooms !== 1 ? "s" : ""}
                          </div>
                          <div className="flex items-center">
                            <Bed className="h-4 w-4 mr-1" />
                            {listing.beds} bed{listing.beds !== 1 ? "s" : ""}
                          </div>
                          <div className="flex items-center">
                            <Bath className="h-4 w-4 mr-1" />
                            {listing.bathrooms} bath{listing.bathrooms !== 1 ? "s" : ""}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={listing.active ? "default" : "secondary"}>
                            {listing.active ? "Active" : "Inactive"}
                          </Badge>
                          <Badge variant={listing.isListed ? "default" : "outline"}>
                            {listing.isListed ? "Listed" : "Unlisted"}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Property Details */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Property Details</h3>
                      {editingSection !== "details" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit("details")}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {editingSection === "details" && (
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSave("details")}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {editingSection === "details" ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-foreground">Area (sq ft)</label>
                            <Input
                              type="number"
                              value={formData.areaSquareFeet || listing.areaSquareFeet}
                              onChange={(e) =>
                                setFormData({ ...formData, areaSquareFeet: Number.parseInt(e.target.value) })
                              }
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground">Minimum Age</label>
                            <Input
                              type="number"
                              value={formData.minimumAge || listing.minimumAge}
                              onChange={(e) =>
                                setFormData({ ...formData, minimumAge: Number.parseInt(e.target.value) })
                              }
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-foreground">Check-in Time</label>
                            <Input
                              type="time"
                              value={formData.defaultCheckInTime || listing.defaultCheckInTime}
                              onChange={(e) => setFormData({ ...formData, defaultCheckInTime: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground">Check-out Time</label>
                            <Input
                              type="time"
                              value={formData.defaultCheckOutTime || listing.defaultCheckOutTime}
                              onChange={(e) => setFormData({ ...formData, defaultCheckOutTime: e.target.value })}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">Timezone</label>
                          <Input
                            value={formData.timezone || listing.timezone}
                            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Property Type:</span>
                          <span className="ml-2 text-foreground">{listing.propertyType}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Area:</span>
                          <span className="ml-2 text-foreground">{listing.areaSquareFeet} sq ft</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Check-in:</span>
                          <span className="ml-2 text-foreground">{formatTime(listing.defaultCheckInTime)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Check-out:</span>
                          <span className="ml-2 text-foreground">{formatTime(listing.defaultCheckOutTime)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Minimum Age:</span>
                          <span className="ml-2 text-foreground">{listing.minimumAge} years</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Timezone:</span>
                          <span className="ml-2 text-foreground">{listing.timezone}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Amenities */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Amenities</h3>
                      {editingSection !== "amenities" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit("amenities")}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {editingSection === "amenities" && (
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSave("amenities")}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {editingSection === "amenities" ? (
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(listing.amenities).map(([key, value]) => (
                          <div key={key} className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={formData.amenities?.[key] ?? value}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  amenities: { ...formData.amenities, [key]: e.target.checked },
                                })
                              }
                              className="rounded"
                            />
                            <span className="text-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(listing.amenities).map(([key, value]) => {
                          if (!value) return null
                          const icon = getAmenityIcon(key)
                          return (
                            <div key={key} className="flex items-center space-x-3">
                              {icon}
                              <span className="text-foreground capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Location */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Location</h3>
                      {editingSection !== "location" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit("location")}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {editingSection === "location" && (
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSave("location")}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {editingSection === "location" ? (
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-foreground">Full Address</label>
                          <Input
                            value={formData.fullAddress || listing.fullAddress}
                            onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm font-medium text-foreground">City</label>
                            <Input
                              value={formData.city || listing.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground">State</label>
                            <Input
                              value={formData.state || listing.state}
                              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm font-medium text-foreground">Zipcode</label>
                            <Input
                              value={formData.zipcode || listing.zipcode}
                              onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground">Country</label>
                            <Input
                              value={formData.country || listing.country}
                              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div className="text-sm">
                            <p className="text-foreground">{listing.fullAddress}</p>
                            <p className="text-muted-foreground">
                              {listing.city}, {listing.state} {listing.zipcode}
                            </p>
                            <p className="text-muted-foreground">{listing.country}</p>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Coordinates: {listing.latitude}, {listing.longitude}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* System Information */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">System Information</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Property ID:</span>
                        <span className="text-foreground">{listing.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">External ID:</span>
                        <span className="text-foreground">{listing.externalId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created:</span>
                        <span className="text-foreground">{new Date(listing.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Updated:</span>
                        <span className="text-foreground">{new Date(listing.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* OTA Info Tab */}
          <TabsContent value="ota-info" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Airbnb Integration</h3>
                    {editingSection !== "airbnb" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit("airbnb")}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {editingSection === "airbnb" && (
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleSave("airbnb")}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {editingSection === "airbnb" ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground">Listing ID</label>
                        <Input placeholder="Enter Airbnb listing ID" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Listing URL</label>
                        <Input placeholder="https://airbnb.com/rooms/..." />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Host ID</label>
                        <Input placeholder="Enter host ID" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Status</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                            <SelectItem value="unlisted">Unlisted</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant="default">Not Connected</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Listing ID:</span>
                        <span className="text-foreground">-</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Connected to PMS:</span>
                        <span className="text-foreground">No</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">VRBO Integration</h3>
                    {editingSection !== "vrbo" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit("vrbo")}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {editingSection === "vrbo" && (
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleSave("vrbo")}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {editingSection === "vrbo" ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground">Listing ID</label>
                        <Input placeholder="Enter VRBO listing ID" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Listing URL</label>
                        <Input placeholder="https://vrbo.com/..." />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Host ID</label>
                        <Input placeholder="Enter host ID" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Status</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                            <SelectItem value="unlisted">Unlisted</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant="default">Not Connected</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Listing ID:</span>
                        <span className="text-foreground">-</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Connected to PMS:</span>
                        <span className="text-foreground">No</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Public Descriptions Tab */}
          <TabsContent value="descriptions" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* Summary */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Summary</h3>
                      {editingSection !== "summary" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit("summary")}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {editingSection === "summary" && (
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSave("summary")}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {editingSection === "summary" ? (
                      <Textarea placeholder="Enter property summary..." rows={4} className="w-full" />
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No summary provided. Click edit to add a property summary.
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Space Description */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Space</h3>
                      {editingSection !== "space" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit("space")}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {editingSection === "space" && (
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSave("space")}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {editingSection === "space" ? (
                      <Textarea placeholder="Describe the space..." rows={4} className="w-full" />
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No space description provided. Click edit to add details about the space.
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Access */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Guest Access</h3>
                      {editingSection !== "access" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit("access")}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {editingSection === "access" && (
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSave("access")}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {editingSection === "access" ? (
                      <Textarea placeholder="Describe guest access..." rows={3} className="w-full" />
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No access information provided. Click edit to add guest access details.
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* House Rules */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">House Rules</h3>
                      {editingSection !== "rules" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit("rules")}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {editingSection === "rules" && (
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSave("rules")}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {editingSection === "rules" ? (
                      <Textarea placeholder="Enter house rules..." rows={4} className="w-full" />
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No house rules provided. Click edit to add house rules.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Interaction with Guests */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Interaction with Guests</h3>
                      {editingSection !== "interaction" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit("interaction")}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {editingSection === "interaction" && (
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSave("interaction")}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {editingSection === "interaction" ? (
                      <Textarea placeholder="Describe interaction with guests..." rows={3} className="w-full" />
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No interaction details provided. Click edit to add information about guest interaction.
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Neighborhood */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Neighborhood</h3>
                      {editingSection !== "neighborhood" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit("neighborhood")}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {editingSection === "neighborhood" && (
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSave("neighborhood")}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {editingSection === "neighborhood" ? (
                      <Textarea placeholder="Describe the neighborhood..." rows={4} className="w-full" />
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No neighborhood information provided. Click edit to add neighborhood details.
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Transit */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Transit</h3>
                      {editingSection !== "transit" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit("transit")}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {editingSection === "transit" && (
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSave("transit")}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {editingSection === "transit" ? (
                      <Textarea placeholder="Describe transit options..." rows={3} className="w-full" />
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No transit information provided. Click edit to add transit details.
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Notes */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Additional Notes</h3>
                      {editingSection !== "notes" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit("notes")}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {editingSection === "notes" && (
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSave("notes")}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {editingSection === "notes" ? (
                      <Textarea placeholder="Enter additional notes..." rows={4} className="w-full" />
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No additional notes provided. Click edit to add notes.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">Recent Reservations</h3>
                    <div className="space-y-4">
                      <div className="text-center text-muted-foreground py-8">
                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No recent reservations found for this property.</p>
                        <p className="text-sm">Reservations will appear here once bookings are made.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <PropertyCalendar propertyId={listing.id} />
              </div>
            </div>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Property Photos</h3>
                <Button className="flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload Photos</span>
                </Button>
              </div>

              {/* Main Gallery */}
              <div className="space-y-4">
                {/* Main Image Display */}
                <div className="relative aspect-[16/9] bg-muted rounded-lg overflow-hidden">
                  <img
                    src={listing.images[currentImageIndex] || "/placeholder.svg?height=600&width=800"}
                    alt={`${listing.title} - Photo ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Navigation Arrows */}
                  {listing.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {listing.images.length}
                  </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                  {listing.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-transparent hover:border-muted-foreground/30"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg?height=100&width=100"}
                        alt={`${listing.title} - Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Photo Management */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download All
                    </Button>
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Set as Cover
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Photo
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
