"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Edit, Save, X, User, Mail, Phone, Calendar, MapPin, Users, CreditCard } from "lucide-react"
import { toast } from "sonner"
import type { Reservation } from "@/types/reservation"

const mockReservation: Reservation = {
  id: "res-001",
  guestName: "John Smith",
  guestEmail: "john.smith@example.com",
  guestPhone: "+1 (555) 123-4567",
  propertyName: "Sunset Villa",
  propertyAddress: "123 Ocean Drive, Malibu, CA 90265",
  checkInDate: "2024-02-15",
  checkOutDate: "2024-02-20",
  guestCount: 4,
  totalAmount: 1250.0,
  status: "Confirmed",
  bookingDate: "2024-01-10T14:30:00Z",
  specialRequests: "Late check-in requested. Celebrating anniversary.",
  paymentStatus: "Paid",
  paymentMethod: "Credit Card",
}

export default function ReservationDetailPage({ params }: { params: { "reservation-id": string } }) {
  const router = useRouter()
  const [reservation, setReservation] = useState<Reservation | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editForm, setEditForm] = useState<Reservation | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Simulate API call
    const fetchReservation = async () => {
      try {
        setLoading(true)
        // In a real app, you'd fetch the reservation by ID
        await new Promise((resolve) => setTimeout(resolve, 500))
        setReservation(mockReservation)
        setEditForm(mockReservation)
      } catch (error) {
        toast.error("Failed to load reservation")
        router.push("/reservations")
      } finally {
        setLoading(false)
      }
    }

    fetchReservation()
  }, [params["reservation-id"], router])

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

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; text: string }> = {
      paid: { color: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30", text: "Paid" },
      pending: { color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30", text: "Pending" },
      failed: { color: "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30", text: "Failed" },
      refunded: { color: "bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30", text: "Refunded" },
    }

    const config = statusConfig[status.toLowerCase()] || statusConfig.pending
    return <Badge className={`${config.color} border`}>{config.text}</Badge>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!editForm?.guestName?.trim()) {
      newErrors.guestName = "Guest name is required"
    }

    if (!editForm?.guestEmail?.trim()) {
      newErrors.guestEmail = "Guest email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.guestEmail)) {
      newErrors.guestEmail = "Please enter a valid email address"
    }

    if (!editForm?.guestPhone?.trim()) {
      newErrors.guestPhone = "Guest phone is required"
    }

    if (!editForm?.checkInDate) {
      newErrors.checkInDate = "Check-in date is required"
    }

    if (!editForm?.checkOutDate) {
      newErrors.checkOutDate = "Check-out date is required"
    }

    if (editForm?.checkInDate && editForm?.checkOutDate) {
      const checkIn = new Date(editForm.checkInDate)
      const checkOut = new Date(editForm.checkOutDate)
      if (checkOut <= checkIn) {
        newErrors.checkOutDate = "Check-out date must be after check-in date"
      }
    }

    if (!editForm?.guestCount || editForm.guestCount < 1) {
      newErrors.guestCount = "Guest count must be at least 1"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleEdit = () => {
    setIsEditing(true)
    setErrors({})
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditForm(reservation)
    setErrors({})
  }

  const handleSave = async () => {
    if (!validateForm()) {
      return
    }

    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Auto-calculate nights and update total
      if (editForm) {
        const nights = calculateNights(editForm.checkInDate, editForm.checkOutDate)
        const updatedReservation = {
          ...editForm,
          totalAmount: nights * 250, // $250 per night (example calculation)
        }
        setReservation(updatedReservation)
        setEditForm(updatedReservation)
      }

      setIsEditing(false)
      toast.success("Reservation updated successfully")
    } catch (error) {
      toast.error("Failed to update reservation")
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: keyof Reservation, value: string | number) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value })
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors({ ...errors, [field]: "" })
      }
    }
  }

  if (loading) {
    return (
      <div className="p-8 bg-background min-h-screen">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-muted rounded-lg"></div>
              <div className="h-48 bg-muted rounded-lg"></div>
              <div className="h-32 bg-muted rounded-lg"></div>
            </div>
            <div className="space-y-6">
              <div className="h-48 bg-muted rounded-lg"></div>
              <div className="h-32 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!reservation) {
    return (
      <div className="p-8 bg-background min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Reservation Not Found</h1>
          <p className="text-muted-foreground mb-4">The reservation you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/reservations")}>Back to Reservations</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.push("/reservations")} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Header with Edit Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reservation #{reservation.id}</h1>
            <p className="text-muted-foreground">
              {reservation.guestName} • {reservation.propertyName}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel} disabled={saving}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving} className="bg-purple-600 hover:bg-purple-700">
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit} className="bg-purple-600 hover:bg-purple-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Reservation
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Guest Information */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Guest Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="guestName" className="text-foreground">
                        Guest Name *
                      </Label>
                      <Input
                        id="guestName"
                        value={editForm?.guestName || ""}
                        onChange={(e) => handleInputChange("guestName", e.target.value)}
                        className={`bg-muted border-border text-foreground ${errors.guestName ? "border-red-500" : ""}`}
                      />
                      {errors.guestName && <p className="text-red-500 text-sm mt-1">{errors.guestName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="guestEmail" className="text-foreground">
                        Email *
                      </Label>
                      <Input
                        id="guestEmail"
                        type="email"
                        value={editForm?.guestEmail || ""}
                        onChange={(e) => handleInputChange("guestEmail", e.target.value)}
                        className={`bg-muted border-border text-foreground ${errors.guestEmail ? "border-red-500" : ""}`}
                      />
                      {errors.guestEmail && <p className="text-red-500 text-sm mt-1">{errors.guestEmail}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="guestPhone" className="text-foreground">
                        Phone *
                      </Label>
                      <Input
                        id="guestPhone"
                        value={editForm?.guestPhone || ""}
                        onChange={(e) => handleInputChange("guestPhone", e.target.value)}
                        className={`bg-muted border-border text-foreground ${errors.guestPhone ? "border-red-500" : ""}`}
                      />
                      {errors.guestPhone && <p className="text-red-500 text-sm mt-1">{errors.guestPhone}</p>}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Guest Name</p>
                        <p className="font-medium text-foreground">{reservation.guestName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium text-foreground">{reservation.guestEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium text-foreground">{reservation.guestPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Guest Count</p>
                        <p className="font-medium text-foreground">{reservation.guestCount} guests</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="checkInDate" className="text-foreground">
                        Check-in Date *
                      </Label>
                      <Input
                        id="checkInDate"
                        type="text"
                        value={editForm?.checkInDate || ""}
                        onChange={(e) => handleInputChange("checkInDate", e.target.value)}
                        className={`bg-muted border-border text-foreground ${errors.checkInDate ? "border-red-500" : ""}`}
                        placeholder="YYYY-MM-DD"
                      />
                      {errors.checkInDate && <p className="text-red-500 text-sm mt-1">{errors.checkInDate}</p>}
                    </div>
                    <div>
                      <Label htmlFor="checkOutDate" className="text-foreground">
                        Check-out Date *
                      </Label>
                      <Input
                        id="checkOutDate"
                        type="text"
                        value={editForm?.checkOutDate || ""}
                        onChange={(e) => handleInputChange("checkOutDate", e.target.value)}
                        className={`bg-muted border-border text-foreground ${errors.checkOutDate ? "border-red-500" : ""}`}
                        placeholder="YYYY-MM-DD"
                      />
                      {errors.checkOutDate && <p className="text-red-500 text-sm mt-1">{errors.checkOutDate}</p>}
                    </div>
                    <div>
                      <Label htmlFor="guestCount" className="text-foreground">
                        Guest Count *
                      </Label>
                      <Input
                        id="guestCount"
                        type="number"
                        min="1"
                        value={editForm?.guestCount || ""}
                        onChange={(e) => handleInputChange("guestCount", Number.parseInt(e.target.value))}
                        className={`bg-muted border-border text-foreground ${errors.guestCount ? "border-red-500" : ""}`}
                      />
                      {errors.guestCount && <p className="text-red-500 text-sm mt-1">{errors.guestCount}</p>}
                    </div>
                    <div>
                      <Label htmlFor="status" className="text-foreground">
                        Status
                      </Label>
                      <Select
                        value={editForm?.status || ""}
                        onValueChange={(value) => handleInputChange("status", value)}
                      >
                        <SelectTrigger className="bg-muted border-border text-foreground">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border">
                          <SelectItem value="Confirmed" className="text-foreground hover:bg-accent">
                            Confirmed
                          </SelectItem>
                          <SelectItem value="Pending" className="text-foreground hover:bg-accent">
                            Pending
                          </SelectItem>
                          <SelectItem value="Cancelled" className="text-foreground hover:bg-accent">
                            Cancelled
                          </SelectItem>
                          <SelectItem value="Completed" className="text-foreground hover:bg-accent">
                            Completed
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Check-in</p>
                        <p className="font-medium text-foreground">{formatDate(reservation.checkInDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Check-out</p>
                        <p className="font-medium text-foreground">{formatDate(reservation.checkOutDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium text-foreground">
                          {calculateNights(reservation.checkInDate, reservation.checkOutDate)} nights
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Guests</p>
                        <p className="font-medium text-foreground">{reservation.guestCount}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Special Requests */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Special Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div>
                    <Label htmlFor="specialRequests" className="text-foreground">
                      Special Requests
                    </Label>
                    <Textarea
                      id="specialRequests"
                      value={editForm?.specialRequests || ""}
                      onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                      className="bg-muted border-border text-foreground mt-2"
                      rows={3}
                      placeholder="Any special requests from the guest..."
                    />
                  </div>
                ) : (
                  <p className="text-foreground leading-relaxed">
                    {reservation.specialRequests || "No special requests"}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Property Information */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{reservation.propertyName}</p>
                    <p className="text-sm text-muted-foreground">{reservation.propertyAddress}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="font-bold text-foreground text-lg">{formatCurrency(reservation.totalAmount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payment Status</span>
                  {getPaymentStatusBadge(reservation.paymentStatus)}
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-medium text-foreground">{reservation.paymentMethod}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Reservation Status</p>
                  {getStatusBadge(reservation.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Booking Date</p>
                  <p className="font-medium text-foreground">
                    {new Date(reservation.bookingDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
