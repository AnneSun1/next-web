import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import {
  reservationService,
  type CreateReservationRequest,
  type UpdateReservationRequest,
  type ReservationFilters,
} from "@/services/reservationService"
import type { Reservation } from "@/types/reservation"

// Async thunks for API calls
export const fetchReservations = createAsyncThunk(
  "reservations/fetchReservations",
  async (filters: ReservationFilters = {}, { rejectWithValue }) => {
    try {
      const response = await reservationService.getReservations(filters)
      if (!response.success) {
        return rejectWithValue(response.error || "Failed to fetch reservations")
      }
      return response.data!
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
    }
  },
)

export const fetchReservationById = createAsyncThunk(
  "reservations/fetchReservationById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await reservationService.getReservationById(id)
      if (!response.success) {
        return rejectWithValue(response.error || "Failed to fetch reservation")
      }
      return response.data!
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
    }
  },
)

export const createReservation = createAsyncThunk(
  "reservations/createReservation",
  async (reservation: CreateReservationRequest, { rejectWithValue }) => {
    try {
      const response = await reservationService.createReservation(reservation)
      if (!response.success) {
        return rejectWithValue(response.error || "Failed to create reservation")
      }
      return response.data!
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
    }
  },
)

export const updateReservation = createAsyncThunk(
  "reservations/updateReservation",
  async (reservation: UpdateReservationRequest, { rejectWithValue }) => {
    try {
      const response = await reservationService.updateReservation(reservation)
      if (!response.success) {
        return rejectWithValue(response.error || "Failed to update reservation")
      }
      return response.data!
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
    }
  },
)

export const deleteReservation = createAsyncThunk(
  "reservations/deleteReservation",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await reservationService.deleteReservation(id)
      if (!response.success) {
        return rejectWithValue(response.error || "Failed to delete reservation")
      }
      return id
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
    }
  },
)

export const bulkDeleteReservations = createAsyncThunk(
  "reservations/bulkDeleteReservations",
  async (ids: number[], { rejectWithValue }) => {
    try {
      const response = await reservationService.bulkDeleteReservations(ids)
      if (!response.success) {
        return rejectWithValue(response.error || "Failed to delete reservations")
      }
      return ids
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
    }
  },
)

export const updateReservationStatus = createAsyncThunk(
  "reservations/updateReservationStatus",
  async ({ id, status }: { id: number; status: string }, { rejectWithValue }) => {
    try {
      const response = await reservationService.updateReservationStatus(id, status)
      if (!response.success) {
        return rejectWithValue(response.error || "Failed to update reservation status")
      }
      return response.data!
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
    }
  },
)

export const bulkUpdateReservationStatus = createAsyncThunk(
  "reservations/bulkUpdateReservationStatus",
  async ({ ids, status }: { ids: number[]; status: string }, { rejectWithValue }) => {
    try {
      const response = await reservationService.bulkUpdateReservationStatus(ids, status)
      if (!response.success) {
        return rejectWithValue(response.error || "Failed to update reservation statuses")
      }
      return response.data!
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
    }
  },
)

export const confirmReservation = createAsyncThunk(
  "reservations/confirmReservation",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await reservationService.confirmReservation(id)
      if (!response.success) {
        return rejectWithValue(response.error || "Failed to confirm reservation")
      }
      return response.data!
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
    }
  },
)

export const cancelReservation = createAsyncThunk(
  "reservations/cancelReservation",
  async ({ id, reason }: { id: number; reason?: string }, { rejectWithValue }) => {
    try {
      const response = await reservationService.cancelReservation(id, reason)
      if (!response.success) {
        return rejectWithValue(response.error || "Failed to cancel reservation")
      }
      return response.data!
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
    }
  },
)

export const fetchReservationStats = createAsyncThunk(
  "reservations/fetchReservationStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await reservationService.getReservationStats()
      if (!response.success) {
        return rejectWithValue(response.error || "Failed to fetch reservation stats")
      }
      return response.data!
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
    }
  },
)

// State interface
interface ReservationState {
  reservations: Reservation[]
  selectedReservation: Reservation | null
  selectedReservationIds: number[]
  stats: {
    total: number
    confirmed: number
    pending: number
    cancelled: number
    totalRevenue: number
  }
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  filters: ReservationFilters
  loading: {
    list: boolean
    create: boolean
    update: boolean
    delete: boolean
    stats: boolean
  }
  error: string | null
}

const initialState: ReservationState = {
  reservations: [],
  selectedReservation: null,
  selectedReservationIds: [],
  stats: {
    total: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
    totalRevenue: 0,
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  filters: {},
  loading: {
    list: false,
    create: false,
    update: false,
    delete: false,
    stats: false,
  },
  error: null,
}

const reservationSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    // UI state management
    setSelectedReservation: (state, action: PayloadAction<Reservation | null>) => {
      state.selectedReservation = action.payload
    },
    setSelectedReservationIds: (state, action: PayloadAction<number[]>) => {
      state.selectedReservationIds = action.payload
    },
    toggleReservationSelection: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const index = state.selectedReservationIds.indexOf(id)
      if (index > -1) {
        state.selectedReservationIds.splice(index, 1)
      } else {
        state.selectedReservationIds.push(id)
      }
    },
    selectAllReservations: (state) => {
      state.selectedReservationIds = state.reservations.map((r) => r.id)
    },
    clearReservationSelection: (state) => {
      state.selectedReservationIds = []
    },
    setFilters: (state, action: PayloadAction<ReservationFilters>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {}
    },
    setPagination: (state, action: PayloadAction<Partial<ReservationState["pagination"]>>) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Fetch reservations
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.loading.list = true
        state.error = null
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading.list = false
        state.reservations = action.payload.data
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          totalPages: action.payload.totalPages,
        }
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading.list = false
        state.error = action.payload as string
      })

    // Fetch single reservation
    builder
      .addCase(fetchReservationById.pending, (state) => {
        state.loading.list = true
        state.error = null
      })
      .addCase(fetchReservationById.fulfilled, (state, action) => {
        state.loading.list = false
        state.selectedReservation = action.payload
      })
      .addCase(fetchReservationById.rejected, (state, action) => {
        state.loading.list = false
        state.error = action.payload as string
      })

    // Create reservation
    builder
      .addCase(createReservation.pending, (state) => {
        state.loading.create = true
        state.error = null
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading.create = false
        state.reservations.unshift(action.payload)
        state.stats.total += 1
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading.create = false
        state.error = action.payload as string
      })

    // Update reservation
    builder
      .addCase(updateReservation.pending, (state) => {
        state.loading.update = true
        state.error = null
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        state.loading.update = false
        const index = state.reservations.findIndex((r) => r.id === action.payload.id)
        if (index !== -1) {
          state.reservations[index] = action.payload
        }
        if (state.selectedReservation?.id === action.payload.id) {
          state.selectedReservation = action.payload
        }
      })
      .addCase(updateReservation.rejected, (state, action) => {
        state.loading.update = false
        state.error = action.payload as string
      })

    // Delete reservation
    builder
      .addCase(deleteReservation.pending, (state) => {
        state.loading.delete = true
        state.error = null
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.loading.delete = false
        state.reservations = state.reservations.filter((r) => r.id !== action.payload)
        state.selectedReservationIds = state.selectedReservationIds.filter((id) => id !== action.payload)
        state.stats.total -= 1
        if (state.selectedReservation?.id === action.payload) {
          state.selectedReservation = null
        }
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.loading.delete = false
        state.error = action.payload as string
      })

    // Bulk delete reservations
    builder
      .addCase(bulkDeleteReservations.pending, (state) => {
        state.loading.delete = true
        state.error = null
      })
      .addCase(bulkDeleteReservations.fulfilled, (state, action) => {
        state.loading.delete = false
        state.reservations = state.reservations.filter((r) => !action.payload.includes(r.id))
        state.selectedReservationIds = []
        state.stats.total -= action.payload.length
      })
      .addCase(bulkDeleteReservations.rejected, (state, action) => {
        state.loading.delete = false
        state.error = action.payload as string
      })

    // Update reservation status
    builder.addCase(updateReservationStatus.fulfilled, (state, action) => {
      const index = state.reservations.findIndex((r) => r.id === action.payload.id)
      if (index !== -1) {
        state.reservations[index] = action.payload
      }
      if (state.selectedReservation?.id === action.payload.id) {
        state.selectedReservation = action.payload
      }
    })

    // Bulk update reservation status
    builder.addCase(bulkUpdateReservationStatus.fulfilled, (state, action) => {
      action.payload.forEach((updatedReservation) => {
        const index = state.reservations.findIndex((r) => r.id === updatedReservation.id)
        if (index !== -1) {
          state.reservations[index] = updatedReservation
        }
      })
    })

    // Confirm reservation
    builder.addCase(confirmReservation.fulfilled, (state, action) => {
      const index = state.reservations.findIndex((r) => r.id === action.payload.id)
      if (index !== -1) {
        state.reservations[index] = action.payload
      }
      if (state.selectedReservation?.id === action.payload.id) {
        state.selectedReservation = action.payload
      }
    })

    // Cancel reservation
    builder.addCase(cancelReservation.fulfilled, (state, action) => {
      const index = state.reservations.findIndex((r) => r.id === action.payload.id)
      if (index !== -1) {
        state.reservations[index] = action.payload
      }
      if (state.selectedReservation?.id === action.payload.id) {
        state.selectedReservation = action.payload
      }
    })

    // Fetch stats
    builder
      .addCase(fetchReservationStats.pending, (state) => {
        state.loading.stats = true
      })
      .addCase(fetchReservationStats.fulfilled, (state, action) => {
        state.loading.stats = false
        state.stats = action.payload
      })
      .addCase(fetchReservationStats.rejected, (state, action) => {
        state.loading.stats = false
        state.error = action.payload as string
      })
  },
})

export const {
  setSelectedReservation,
  setSelectedReservationIds,
  toggleReservationSelection,
  selectAllReservations,
  clearReservationSelection,
  setFilters,
  clearFilters,
  setPagination,
  clearError,
} = reservationSlice.actions

export default reservationSlice.reducer
