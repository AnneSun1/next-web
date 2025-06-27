import type { Reservation } from "@/types/reservation"
import { MOCK_RESERVATIONS } from "@/constants/mockData"

// API response types
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Request types
interface CreateReservationRequest {
  tenant_id: number
  listing_id: number
  guest_id?: number
  guest_full_name: string
  ota_type_code: string
  reservation_status_code: string
  check_in: string
  check_out: string
  nights_count: number
  guestscount: number
  ota_confirmation_code?: string
  amount?: number
}

interface UpdateReservationRequest extends Partial<CreateReservationRequest> {
  id: number
}

interface ReservationFilters {
  status?: string
  ota_type?: string
  guest_name?: string
  listing_id?: number
  date_from?: string
  date_to?: string
  page?: number
  limit?: number
}

class ReservationService {
  // In-memory storage for mock data
  private reservations: Reservation[] = [...MOCK_RESERVATIONS]

  // Get all reservations - just return all mock data
  async getReservations(filters: ReservationFilters = {}): Promise<ApiResponse<PaginatedResponse<Reservation>>> {
    return {
      success: true,
      data: {
        data: this.reservations,
        total: this.reservations.length,
        page: 1,
        limit: this.reservations.length,
        totalPages: 1,
      },
      message: "Reservations retrieved successfully",
    }
  }

  // Get single reservation by ID
  async getReservationById(id: number): Promise<ApiResponse<Reservation>> {
    const reservation = this.reservations.find((r) => r.id === id)
    if (!reservation) {
      return {
        success: false,
        error: `Reservation with ID ${id} not found`,
      }
    }
    return {
      success: true,
      data: reservation,
      message: "Reservation retrieved successfully",
    }
  }

  // Create new reservation
  async createReservation(reservation: CreateReservationRequest): Promise<ApiResponse<Reservation>> {
    const maxId = Math.max(...this.reservations.map((r) => r.id))
    const newReservation: Reservation = {
      id: maxId + 1,
      ...reservation,
      confirmed_at: reservation.reservation_status_code === "CONFIRMED" ? new Date().toISOString() : null,
      canceled_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: 1,
      updated_by: 1,
      // Mock additional data
      guest: {
        email: `guest${maxId + 1}@example.com`,
        phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      },
      listing: {
        name: `Property ${reservation.listing_id}`,
        address: "Mock Address",
      },
    }

    this.reservations.unshift(newReservation)
    return {
      success: true,
      data: newReservation,
      message: "Reservation created successfully",
    }
  }

  // Update existing reservation
  async updateReservation(reservation: UpdateReservationRequest): Promise<ApiResponse<Reservation>> {
    const { id, ...updateData } = reservation
    const index = this.reservations.findIndex((r) => r.id === id)

    if (index === -1) {
      return {
        success: false,
        error: `Reservation with ID ${id} not found`,
      }
    }

    const updatedReservation: Reservation = {
      ...this.reservations[index],
      ...updateData,
      updated_at: new Date().toISOString(),
      updated_by: 1,
    }

    this.reservations[index] = updatedReservation
    return {
      success: true,
      data: updatedReservation,
      message: "Reservation updated successfully",
    }
  }

  // Delete reservation
  async deleteReservation(id: number): Promise<ApiResponse<void>> {
    const index = this.reservations.findIndex((r) => r.id === id)

    if (index === -1) {
      return {
        success: false,
        error: `Reservation with ID ${id} not found`,
      }
    }

    this.reservations.splice(index, 1)
    return {
      success: true,
      message: "Reservation deleted successfully",
    }
  }

  // Bulk delete reservations
  async bulkDeleteReservations(ids: number[]): Promise<ApiResponse<void>> {
    const notFoundIds: number[] = []

    ids.forEach((id) => {
      const index = this.reservations.findIndex((r) => r.id === id)
      if (index === -1) {
        notFoundIds.push(id)
      }
    })

    if (notFoundIds.length > 0) {
      return {
        success: false,
        error: `Reservations not found: ${notFoundIds.join(", ")}`,
      }
    }

    this.reservations = this.reservations.filter((r) => !ids.includes(r.id))
    return {
      success: true,
      message: "Reservations deleted successfully",
    }
  }

  // Update reservation status
  async updateReservationStatus(id: number, status: string): Promise<ApiResponse<Reservation>> {
    const index = this.reservations.findIndex((r) => r.id === id)

    if (index === -1) {
      return {
        success: false,
        error: `Reservation with ID ${id} not found`,
      }
    }

    const now = new Date().toISOString()
    const updatedReservation: Reservation = {
      ...this.reservations[index],
      reservation_status_code: status,
      updated_at: now,
      updated_by: 1,
      confirmed_at: status === "CONFIRMED" ? now : this.reservations[index].confirmed_at,
      canceled_at: status === "CANCELLED" ? now : this.reservations[index].canceled_at,
    }

    this.reservations[index] = updatedReservation
    return {
      success: true,
      data: updatedReservation,
      message: "Reservation status updated successfully",
    }
  }

  // Bulk update reservation status
  async bulkUpdateReservationStatus(ids: number[], status: string): Promise<ApiResponse<Reservation[]>> {
    const updatedReservations: Reservation[] = []
    const notFoundIds: number[] = []

    ids.forEach((id) => {
      const index = this.reservations.findIndex((r) => r.id === id)
      if (index === -1) {
        notFoundIds.push(id)
        return
      }

      const now = new Date().toISOString()
      const updatedReservation: Reservation = {
        ...this.reservations[index],
        reservation_status_code: status,
        updated_at: now,
        updated_by: 1,
        confirmed_at: status === "CONFIRMED" ? now : this.reservations[index].confirmed_at,
        canceled_at: status === "CANCELLED" ? now : this.reservations[index].canceled_at,
      }

      this.reservations[index] = updatedReservation
      updatedReservations.push(updatedReservation)
    })

    if (notFoundIds.length > 0) {
      return {
        success: false,
        error: `Reservations not found: ${notFoundIds.join(", ")}`,
      }
    }

    return {
      success: true,
      data: updatedReservations,
      message: "Reservation statuses updated successfully",
    }
  }

  // Confirm reservation
  async confirmReservation(id: number): Promise<ApiResponse<Reservation>> {
    return this.updateReservationStatus(id, "CONFIRMED")
  }

  // Cancel reservation
  async cancelReservation(id: number, reason?: string): Promise<ApiResponse<Reservation>> {
    const index = this.reservations.findIndex((r) => r.id === id)

    if (index === -1) {
      return {
        success: false,
        error: `Reservation with ID ${id} not found`,
      }
    }

    const now = new Date().toISOString()
    const updatedReservation: Reservation = {
      ...this.reservations[index],
      reservation_status_code: "CANCELLED",
      canceled_at: now,
      updated_at: now,
      updated_by: 1,
    }

    this.reservations[index] = updatedReservation
    return {
      success: true,
      data: updatedReservation,
      message: "Reservation cancelled successfully",
    }
  }

  // Get reservation statistics - return mock stats
  async getReservationStats(): Promise<
    ApiResponse<{
      total: number
      confirmed: number
      pending: number
      cancelled: number
      totalRevenue: number
    }>
  > {
    // Calculate stats from current reservations
    const stats = {
      total: this.reservations.length,
      confirmed: this.reservations.filter((r) => r.reservation_status_code === "CONFIRMED").length,
      pending: this.reservations.filter((r) => r.reservation_status_code === "PENDING").length,
      cancelled: this.reservations.filter((r) => r.reservation_status_code === "CANCELLED").length,
      totalRevenue: this.reservations.reduce((sum, r) => sum + (r.amount || 0), 0),
    }

    return {
      success: true,
      data: stats,
      message: "Statistics retrieved successfully",
    }
  }

  // Reset to original mock data
  async resetMockData(): Promise<ApiResponse<void>> {
    this.reservations = [...MOCK_RESERVATIONS]
    return {
      success: true,
      message: "Mock data reset successfully",
    }
  }

  // Get current mock data (for debugging)
  getCurrentMockData(): Reservation[] {
    return [...this.reservations]
  }
}

// Export singleton instance
export const reservationService = new ReservationService()
export type { CreateReservationRequest, UpdateReservationRequest, ReservationFilters }
