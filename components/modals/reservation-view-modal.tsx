"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  Building2,
  CreditCard,
  FileText,
  Edit,
} from "lucide-react"
import type { Reservation } from "@/types/reservation"

interface ReservationViewModalProps {
  reservation: Reservation | null
  isOpen: boolean
  onClose: () => void
  onEdit: (reservation: Reservation) => void
}

export function ReservationViewModal({ reservation, isOpen, onClose, onEdit }: ReservationViewModalProps) {
  if (!reservation) return null

  const getStatusBadge = (statusCode: string) => {
    const colorClasses = {
      CONFIRMED: "bg-green-500/20 text-green-400 border-green-500/30",
      PENDING: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      CANCELLED: "bg-red-500/20 text-red-400 border-red-500/30",
      CHECKED_IN: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      CHECKED_OUT: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    }

    return (
      <Badge className={colorClasses[statusCode as keyof typeof colorClasses] || "bg-gray-500/20 text-gray-400"}>
        {statusCode.replace("_", " ")}
      </Badge>
    )
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-foreground">Reservation #{reservation.id}</DialogTitle>
            <Button onClick={() => onEdit(reservation)} className="bg-purple-600 hover:bg-purple-700 text-white">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Guest Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-foreground">Guest Information</h3>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                <User className="h-6 w-6" />
              </div>
              <div>
                <div className="font-medium text-foreground">{reservation.guest_full_name}</div>
                {reservation.guest?.email && (
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Mail className="h-3 w-3 mr-1" />
                    {reservation.guest.email}
                  </div>
                )}
                {reservation.guest?.phone && (
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Phone className="h-3 w-3 mr-1" />
                    {reservation.guest.phone}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{reservation.guestscount} guests</span>
            </div>
          </div>

          {/* Stay Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-foreground">Stay Details</h3>
            </div>

            <div className="space-y-2">
              <div>
                <div className="text-sm text-muted-foreground">Check-in</div>
                <div className="text-foreground font-medium">{formatDate(reservation.check_in)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Check-out</div>
                <div className="text-foreground font-medium">{formatDate(reservation.check_out)}</div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{reservation.nights_count} nights</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Property Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-foreground">Property</h3>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">
                  {reservation.listing?.name || `Listing ${reservation.listing_id}`}
                </span>
              </div>
              {reservation.listing?.address && (
                <div className="text-muted-foreground text-sm ml-6">{reservation.listing.address}</div>
              )}
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-foreground">Payment & Status</h3>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                {getStatusBadge(reservation.reservation_status_code)}
              </div>
              {reservation.amount && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Amount</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">{formatCurrency(reservation.amount)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Booking Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-purple-500" />
            <h3 className="text-lg font-semibold text-foreground">Booking Information</h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Source</div>
              <div className="text-foreground">{reservation.ota_type_code}</div>
            </div>
            {reservation.ota_confirmation_code && (
              <div>
                <div className="text-sm text-muted-foreground">Confirmation Code</div>
                <div className="text-foreground">{reservation.ota_confirmation_code}</div>
              </div>
            )}
            <div>
              <div className="text-sm text-muted-foreground">Created</div>
              <div className="text-foreground">{new Date(reservation.created_at).toLocaleDateString("en-US")}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Last Updated</div>
              <div className="text-foreground">{new Date(reservation.updated_at).toLocaleDateString("en-US")}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
