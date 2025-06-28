"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Building2, Save, X } from "lucide-react"
import type { Reservation } from "@/types/reservation"
import type { UpdateReservationRequest } from "@/services/reservationService"

interface ReservationEditModalProps {
  reservation: Reservation | null
  isOpen: boolean
  onClose: () => void
  onSave: (reservation: UpdateReservationRequest) => Promise<void>
  isLoading?: boolean
}

export function ReservationEditModal({
  reservation,
  isOpen,
  onClose,
  onSave,
  isLoading = false,
}: ReservationEditModalProps) {
  const [formData, setFormData] = useState<UpdateReservationRequest>({
    id: 0,
    tenant_id: 1,
    listing_id: 0,
    guest_id: undefined,
    guest_full_name: "",
    ota_type_code: "",
    reservation_status_code: "",
    check_in: "",
    check_out: "",
    nights_count: 0,
    guestscount: 1,
    ota_confirmation_code: "",
    amount: 0,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Initialize form data when reservation changes
  useEffect(() => {
    if (reservation) {
      setFormData({
        id: reservation.id,
        tenant_id: reservation.tenant_id,
        listing_id: reservation.listing_id,
        guest_id: reservation.guest_id,
        guest_full_name: reservation.guest_full_name,
        ota_type_code: reservation.ota_type_code,
        reservation_status_code: reservation.reservation_status_code,
        check_in: reservation.check_in.split("T")[0], // Convert to date format
        check_out: reservation.check_out.split("T")[0],
        nights_count: reservation.nights_count,
        guestscount: reservation.guestscount,
        ota_confirmation_code: reservation.ota_confirmation_code || "",
        amount: reservation.amount || 0,
      })
      setErrors({})
    }
  }, [reservation])

  // Calculate nights when dates change
  useEffect(() => {
    if (formData.check_in && formData.check_out) {
      const checkIn = new Date(formData.check_in)
      const checkOut = new Date(formData.check_out)
      const diffTime = checkOut.getTime() - checkIn.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays > 0) {
        setFormData((prev) => ({ ...prev, nights_count: diffDays }))
      }
    }
  }, [formData.check_in, formData.check_out])

  const handleInputChange = (field: keyof UpdateReservationRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.guest_full_name.trim()) {
      newErrors.guest_full_name = "Guest name is required"
    }

    if (!formData.check_in) {
      newErrors.check_in = "Check-in date is required"
    }

    if (!formData.check_out) {
      newErrors.check_out = "Check-out date is required"
    }

    if (formData.check_in && formData.check_out) {
      const checkIn = new Date(formData.check_in)
      const checkOut = new Date(formData.check_out)
      if (checkOut <= checkIn) {
        newErrors.check_out = "Check-out must be after check-in"
      }
    }

    if (!formData.guestscount || formData.guestscount < 1) {
      newErrors.guestscount = "At least 1 guest is required"
    }

    if (!formData.ota_type_code) {
      newErrors.ota_type_code = "Booking source is required"
    }

    if (!formData.reservation_status_code) {
      newErrors.reservation_status_code = "Status is required"
    }

    if (!formData.listing_id || formData.listing_id < 1) {
      newErrors.listing_id = "Valid listing ID is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      return
    }

    try {
      // Convert dates back to ISO format
      const saveData = {
        ...formData,
        check_in: new Date(formData.check_in + "T15:00:00Z").toISOString(),
        check_out: new Date(formData.check_out + "T11:00:00Z").toISOString(),
      }

      await onSave(saveData)
      onClose()
    } catch (error) {
      console.error("Failed to save reservation:", error)
    }
  }

  if (!reservation) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">Edit Reservation</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Guest Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <User className="h-5 w-5 mr-2" />
                Guest Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="guest_full_name" className="text-foreground">
                  Guest Name *
                </Label>
                <Input
                  id="guest_full_name"
                  value={formData.guest_full_name}
                  onChange={(e) => handleInputChange("guest_full_name", e.target.value)}
                  className="bg-muted border-border text-foreground"
                  placeholder="Enter guest full name"
                />
                {errors.guest_full_name && <p className="text-red-400 text-sm mt-1">{errors.guest_full_name}</p>}
              </div>

              <div>
                <Label htmlFor="guest_id" className="text-foreground">
                  Guest ID
                </Label>
                <Input
                  id="guest_id"
                  type="number"
                  value={formData.guest_id || ""}
                  onChange={(e) =>
                    handleInputChange("guest_id", e.target.value ? Number.parseInt(e.target.value) : undefined)
                  }
                  className="bg-muted border-border text-foreground"
                  placeholder="Optional guest ID"
                />
              </div>

              <div>
                <Label htmlFor="guestscount" className="text-foreground">
                  Number of Guests *
                </Label>
                <Input
                  id="guestscount"
                  type="number"
                  min="1"
                  value={formData.guestscount}
                  onChange={(e) => handleInputChange("guestscount", Number.parseInt(e.target.value) || 1)}
                  className="bg-muted border-border text-foreground"
                />
                {errors.guestscount && <p className="text-red-400 text-sm mt-1">{errors.guestscount}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Property Information */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Property Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="listing_id" className="text-foreground">
                  Listing ID *
                </Label>
                <Input
                  id="listing_id"
                  type="number"
                  value={formData.listing_id}
                  onChange={(e) => handleInputChange("listing_id", Number.parseInt(e.target.value) || 0)}
                  className="bg-muted border-border text-foreground"
                />
                {errors.listing_id && <p className="text-red-400 text-sm mt-1">{errors.listing_id}</p>}
              </div>

              <div>
                <Label htmlFor="tenant_id" className="text-foreground">
                  Tenant ID
                </Label>
                <Input
                  id="tenant_id"
                  type="number"
                  value={formData.tenant_id}
                  onChange={(e) => handleInputChange("tenant_id", Number.parseInt(e.target.value) || 1)}
                  className="bg-muted border-border text-foreground"
                />
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="check_in" className="text-foreground">
                    Check-in Date *
                  </Label>
                  <Input
                    id="check_in"
                    type="text"
                    value={formData.check_in}
                    onChange={(e) => handleInputChange("check_in", e.target.value)}
                    className="bg-muted border-border text-foreground"
                    placeholder="YYYY-MM-DD"
                  />
                  {errors.check_in && <p className="text-red-400 text-sm mt-1">{errors.check_in}</p>}
                </div>

                <div>
                  <Label htmlFor="check_out" className="text-foreground">
                    Check-out Date *
                  </Label>
                  <Input
                    id="check_out"
                    type="text"
                    value={formData.check_out}
                    onChange={(e) => handleInputChange("check_out", e.target.value)}
                    className="bg-muted border-border text-foreground"
                    placeholder="YYYY-MM-DD"
                  />
                  {errors.check_out && <p className="text-red-400 text-sm mt-1">{errors.check_out}</p>}
                </div>
              </div>

              <div>
                <Label className="text-foreground">Duration</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="border-border text-foreground">
                    {formData.nights_count} nights
                  </Badge>
                </div>
              </div>

              <div>
                <Label htmlFor="amount" className="text-foreground">
                  Total Amount ($)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", Number.parseFloat(e.target.value) || 0)}
                  className="bg-muted border-border text-foreground"
                  placeholder="0.00"
                />
              </div>
            </CardContent>
          </Card>

          {/* Booking Source & Status */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Booking Source & Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ota_type_code" className="text-foreground">
                  Booking Source *
                </Label>
                <Select
                  value={formData.ota_type_code}
                  onValueChange={(value) => handleInputChange("ota_type_code", value)}
                >
                  <SelectTrigger className="bg-muted border-border text-foreground">
                    <SelectValue placeholder="Select booking source" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="AIRBNB">Airbnb</SelectItem>
                    <SelectItem value="BOOKING">Booking.com</SelectItem>
                    <SelectItem value="VRBO">VRBO</SelectItem>
                    <SelectItem value="EXPEDIA">Expedia</SelectItem>
                    <SelectItem value="DIRECT">Direct Booking</SelectItem>
                  </SelectContent>
                </Select>
                {errors.ota_type_code && <p className="text-red-400 text-sm mt-1">{errors.ota_type_code}</p>}
              </div>

              <div>
                <Label htmlFor="reservation_status_code" className="text-foreground">
                  Status *
                </Label>
                <Select
                  value={formData.reservation_status_code}
                  onValueChange={(value) => handleInputChange("reservation_status_code", value)}
                >
                  <SelectTrigger className="bg-muted border-border text-foreground">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                    <SelectItem value="CHECKED_IN">Checked In</SelectItem>
                    <SelectItem value="CHECKED_OUT">Checked Out</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                {errors.reservation_status_code && (
                  <p className="text-red-400 text-sm mt-1">{errors.reservation_status_code}</p>
                )}
              </div>

              <div>
                <Label htmlFor="ota_confirmation_code" className="text-foreground">
                  OTA Confirmation Code
                </Label>
                <Input
                  id="ota_confirmation_code"
                  value={formData.ota_confirmation_code}
                  onChange={(e) => handleInputChange("ota_confirmation_code", e.target.value)}
                  className="bg-muted border-border text-foreground"
                  placeholder="Optional confirmation code"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="bg-muted border-border text-foreground hover:bg-accent"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
