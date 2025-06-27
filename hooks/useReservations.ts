"use client"

import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import {
  fetchReservations,
  fetchReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
  bulkDeleteReservations,
  updateReservationStatus,
  bulkUpdateReservationStatus,
  confirmReservation,
  cancelReservation,
  fetchReservationStats,
  setSelectedReservation,
  setSelectedReservationIds,
  toggleReservationSelection,
  selectAllReservations,
  clearReservationSelection,
  setFilters,
  clearFilters,
  setPagination,
  clearError,
} from "@/lib/features/reservations/reservationSlice"
import type {
  CreateReservationRequest,
  UpdateReservationRequest,
  ReservationFilters,
} from "@/services/reservationService"
import type { Reservation } from "@/types/reservation"

export function useReservations() {
  const dispatch = useAppDispatch()
  const reservationState = useAppSelector((state) => state.reservations)

  // Actions
  const actions = {
    // Data fetching
    fetchReservations: useCallback(
      (filters?: ReservationFilters) => {
        return dispatch(fetchReservations(filters))
      },
      [dispatch],
    ),

    fetchReservationById: useCallback(
      (id: number) => {
        return dispatch(fetchReservationById(id))
      },
      [dispatch],
    ),

    fetchStats: useCallback(() => {
      return dispatch(fetchReservationStats())
    }, [dispatch]),

    // CRUD operations
    createReservation: useCallback(
      (reservation: CreateReservationRequest) => {
        return dispatch(createReservation(reservation))
      },
      [dispatch],
    ),

    updateReservation: useCallback(
      (reservation: UpdateReservationRequest) => {
        return dispatch(updateReservation(reservation))
      },
      [dispatch],
    ),

    deleteReservation: useCallback(
      (id: number) => {
        return dispatch(deleteReservation(id))
      },
      [dispatch],
    ),

    bulkDeleteReservations: useCallback(
      (ids: number[]) => {
        return dispatch(bulkDeleteReservations(ids))
      },
      [dispatch],
    ),

    // Status management
    updateStatus: useCallback(
      (id: number, status: string) => {
        return dispatch(updateReservationStatus({ id, status }))
      },
      [dispatch],
    ),

    bulkUpdateStatus: useCallback(
      (ids: number[], status: string) => {
        return dispatch(bulkUpdateReservationStatus({ ids, status }))
      },
      [dispatch],
    ),

    confirmReservation: useCallback(
      (id: number) => {
        return dispatch(confirmReservation(id))
      },
      [dispatch],
    ),

    cancelReservation: useCallback(
      (id: number, reason?: string) => {
        return dispatch(cancelReservation({ id, reason }))
      },
      [dispatch],
    ),

    // UI state management
    setSelectedReservation: useCallback(
      (reservation: Reservation | null) => {
        dispatch(setSelectedReservation(reservation))
      },
      [dispatch],
    ),

    setSelectedIds: useCallback(
      (ids: number[]) => {
        dispatch(setSelectedReservationIds(ids))
      },
      [dispatch],
    ),

    toggleSelection: useCallback(
      (id: number) => {
        dispatch(toggleReservationSelection(id))
      },
      [dispatch],
    ),

    selectAll: useCallback(() => {
      dispatch(selectAllReservations())
    }, [dispatch]),

    clearSelection: useCallback(() => {
      dispatch(clearReservationSelection())
    }, [dispatch]),

    // Filters and pagination
    setFilters: useCallback(
      (filters: ReservationFilters) => {
        dispatch(setFilters(filters))
      },
      [dispatch],
    ),

    clearFilters: useCallback(() => {
      dispatch(clearFilters())
    }, [dispatch]),

    setPagination: useCallback(
      (pagination: Partial<typeof reservationState.pagination>) => {
        dispatch(setPagination(pagination))
      },
      [dispatch],
    ),

    clearError: useCallback(() => {
      dispatch(clearError())
    }, [dispatch]),
  }

  // Computed values
  const computed = {
    hasSelectedReservations: reservationState.selectedReservationIds.length > 0,
    selectedCount: reservationState.selectedReservationIds.length,
    isAllSelected:
      reservationState.selectedReservationIds.length === reservationState.reservations.length &&
      reservationState.reservations.length > 0,
    filteredCount: reservationState.reservations.length,
    hasFilters: Object.keys(reservationState.filters).length > 0,
    isLoading: Object.values(reservationState.loading).some(Boolean),
  }

  return {
    // State
    ...reservationState,
    // Actions
    ...actions,
    // Computed values
    ...computed,
  }
}
