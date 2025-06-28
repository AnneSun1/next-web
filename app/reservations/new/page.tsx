"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, X, Calendar, Users, DollarSign } from "lucide-react"

export default function NewReservationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    propertyId: "",
    checkIn: "",
    checkOut: "",
    guestCount: "1",
    amount: "",
    status: "pending",
    notes: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Creating reservation:", formData)
      router.push("/reservations")
    } catch (error) {
      console.error("Error creating reservation:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/reservations")
  }

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const start = new Date(formData.checkIn)
      const end = new Date(formData.checkOut)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }
    return 0
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" size="sm" onClick={handleCancel} className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Reservations</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">New Reservation</h1>
            <p className="text-muted-foreground">Create a new guest booking</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Guest Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Guest Information</span>
              </CardTitle>
              <CardDescription>Enter the guest's contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="guestName">Guest Name *</Label>
                  <Input
                    id="guestName"
                    type="text"
                    value={formData.guestName}
                    onChange={(e) => handleInputChange("guestName", e.target.value)}
                    placeholder="Enter guest name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guestEmail">Email Address *</Label>
                  <Input
                    id="guestEmail"
                    type="email"
                    value={formData.guestEmail}
                    onChange={(e) => handleInputChange("guestEmail", e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guestPhone">Phone Number</Label>
                  <Input
                    id="guestPhone"
                    type="tel"
                    value={formData.guestPhone}
                    onChange={(e) => handleInputChange("guestPhone", e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Booking Details</span>
              </CardTitle>
              <CardDescription>Set the reservation dates and property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="propertyId">Property *</Label>
                  <Select value={formData.propertyId} onValueChange={(value) => handleInputChange("propertyId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Oceanview Villa</SelectItem>
                      <SelectItem value="2">Mountain Cabin</SelectItem>
                      <SelectItem value="3">City Apartment</SelectItem>
                      <SelectItem value="4">Beachfront Condo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="checkIn">Check-in Date *</Label>
                  <Input
                    id="checkIn"
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => handleInputChange("checkIn", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="checkOut">Check-out Date *</Label>
                  <Input
                    id="checkOut"
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => handleInputChange("checkOut", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guestCount">Number of Guests *</Label>
                  <Select value={formData.guestCount} onValueChange={(value) => handleInputChange("guestCount", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>
                          {i + 1} {i === 0 ? "Guest" : "Guests"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.checkIn && formData.checkOut && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">
                    Duration: <span className="font-medium text-foreground">{calculateNights()} nights</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment & Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Payment & Status</span>
              </CardTitle>
              <CardDescription>Set the booking amount and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Total Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => handleInputChange("amount", e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Add any special notes or requests..."
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4">
            <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                loading ||
                !formData.guestName ||
                !formData.guestEmail ||
                !formData.propertyId ||
                !formData.checkIn ||
                !formData.checkOut ||
                !formData.amount
              }
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Creating..." : "Create Reservation"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
