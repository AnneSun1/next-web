import { reservationService } from "@/services/reservationService"

// Development utilities for managing mock data
export const mockDataUtils = {
  // Reset all data to original state
  resetData: async () => {
    try {
      await reservationService.resetMockData()
      console.log("Mock data reset successfully")
      return true
    } catch (error) {
      console.error("Failed to reset mock data:", error)
      return false
    }
  },

  // Get current data state
  getCurrentData: () => {
    return reservationService.getCurrentMockData()
  },

  // Log current statistics
  logStats: async () => {
    try {
      const response = await reservationService.getReservationStats()
      if (response.success && response.data) {
        console.table(response.data)
      }
    } catch (error) {
      console.error("Failed to get stats:", error)
    }
  },

  // Add sample reservation for testing
  addSampleReservation: async () => {
    try {
      const sampleReservation = {
        tenant_id: 1,
        listing_id: 999,
        guest_full_name: "Test Guest",
        ota_type_code: "DIRECT",
        reservation_status_code: "PENDING",
        check_in: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        check_out: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
        nights_count: 7,
        guestscount: 2,
        amount: 1400,
      }

      const response = await reservationService.createReservation(sampleReservation)
      if (response.success) {
        console.log("Sample reservation added:", response.data)
        return response.data
      }
    } catch (error) {
      console.error("Failed to add sample reservation:", error)
    }
  },
}

// Make available globally in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  ;(window as any).mockDataUtils = mockDataUtils
}
