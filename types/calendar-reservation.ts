export interface CalendarReservation {
  id: string
  propertyId: string
  guestName: string
  guestEmail: string
  guestPhone: string
  checkInDate: string
  checkOutDate: string
  guestCount: number
  totalAmount: number
  status: "confirmed" | "pending" | "cancelled" | "completed"
  bookingDate: string
  specialRequests?: string
  paymentStatus: "paid" | "pending" | "failed" | "refunded"
  paymentMethod: string
}
