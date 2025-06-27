export interface Reservation {
  id: number
  tenant_id: number
  listing_id: number
  guest_id: number | null
  guest_full_name: string
  pms_reservation_id: string | null
  ota_confirmation_code: string | null
  ota_type_code: string
  reservation_status_code: string
  check_in: string // ISO timestamp
  check_out: string // ISO timestamp
  nights_count: number
  guestscount: number
  confirmed_at: string | null
  canceled_at: string | null
  created_at: string
  updated_at: string
  created_by: number | null
  updated_by: number | null

  // Joined data from related tables (for display purposes)
  guest?: {
    email: string
    phone: string
    avatar?: string
  }
  listing?: {
    name: string
    address: string
  }
  amount?: number // This would come from a pricing/payment table
}

export interface ReservationStatus {
  code: string
  label: string
  color: string
}

export interface OTAType {
  code: string
  label: string
}
