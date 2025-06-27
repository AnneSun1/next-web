"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar, Users, DollarSign } from "lucide-react"
import { mockCalendarReservations } from "@/constants/calendarReservations"
import type { CalendarReservation } from "@/types/calendar-reservation"

interface PropertyCalendarProps {
  propertyId: string
}

export function PropertyCalendar({ propertyId }: PropertyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Filter reservations for this property
  const propertyReservations = useMemo(() => {
    return mockCalendarReservations.filter((res) => res.propertyId === propertyId)
  }, [propertyId])

  // Get current month's reservations
  const currentMonthReservations = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    return propertyReservations.filter((res) => {
      const checkIn = new Date(res.checkInDate)
      const checkOut = new Date(res.checkOutDate)

      // Check if reservation overlaps with current month
      const monthStart = new Date(year, month, 1)
      const monthEnd = new Date(year, month + 1, 0)

      return checkIn <= monthEnd && checkOut >= monthStart
    })
  }, [propertyReservations, currentDate])

  // Get upcoming reservations (next 3)
  const upcomingReservations = useMemo(() => {
    const today = new Date()
    return propertyReservations
      .filter((res) => new Date(res.checkInDate) >= today)
      .sort((a, b) => new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime())
      .slice(0, 3)
  }, [propertyReservations])

  // Calculate monthly stats
  const monthlyStats = useMemo(() => {
    const confirmed = currentMonthReservations.filter((res) => res.status === "confirmed")
    const pending = currentMonthReservations.filter((res) => res.status === "pending")
    const totalRevenue = confirmed.reduce((sum, res) => sum + res.totalAmount, 0)

    return {
      total: currentMonthReservations.length,
      confirmed: confirmed.length,
      pending: pending.length,
      revenue: totalRevenue,
    }
  }, [currentMonthReservations])

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const getReservationForDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dateString = date.toISOString().split("T")[0]

    return currentMonthReservations.find((res) => {
      const checkIn = res.checkInDate
      const checkOut = res.checkOutDate
      return dateString >= checkIn && dateString <= checkOut
    })
  }

  const isCheckInDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dateString = date.toISOString().split("T")[0]

    return currentMonthReservations.some((res) => res.checkInDate === dateString)
  }

  const isCheckOutDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dateString = date.toISOString().split("T")[0]

    return currentMonthReservations.some((res) => res.checkOutDate === dateString)
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const getStatusColor = (status: CalendarReservation["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30"
      case "completed":
        return "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const days = getDaysInMonth(currentDate)
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Reservations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")} className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-semibold text-foreground">{monthName}</h3>
          <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")} className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-2">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 text-xs text-muted-foreground">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center p-1 font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={index} className="h-8" />
              }

              const reservation = getReservationForDate(day)
              const isCheckIn = isCheckInDate(day)
              const isCheckOut = isCheckOutDate(day)
              const todayClass = isToday(day) ? "ring-2 ring-primary" : ""

              return (
                <div
                  key={day}
                  className={`
                    h-8 flex items-center justify-center text-xs relative rounded
                    ${todayClass}
                    ${reservation ? "bg-opacity-50" : ""}
                    ${
                      reservation?.status === "confirmed"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : reservation?.status === "pending"
                          ? "bg-yellow-100 dark:bg-yellow-900/30"
                          : reservation?.status === "cancelled"
                            ? "bg-red-100 dark:bg-red-900/30"
                            : ""
                    }
                  `}
                >
                  <span className="text-foreground">{day}</span>
                  {isCheckIn && <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full" />}
                  {isCheckOut && <div className="absolute bottom-0 right-0 w-2 h-2 bg-red-500 rounded-full" />}
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Legend</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-100 dark:bg-green-900/30 rounded" />
              <span className="text-muted-foreground">Confirmed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-100 dark:bg-yellow-900/30 rounded" />
              <span className="text-muted-foreground">Pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-muted-foreground">Check-in</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span className="text-muted-foreground">Check-out</span>
            </div>
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">This Month</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-medium text-foreground">{monthlyStats.total}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Confirmed:</span>
              <span className="font-medium text-green-600 dark:text-green-400">{monthlyStats.confirmed}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Pending:</span>
              <span className="font-medium text-yellow-600 dark:text-yellow-400">{monthlyStats.pending}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Revenue:</span>
              <span className="font-medium text-foreground">{formatCurrency(monthlyStats.revenue)}</span>
            </div>
          </div>
        </div>

        {/* Upcoming Reservations */}
        {upcomingReservations.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Upcoming</h4>
            <div className="space-y-2">
              {upcomingReservations.map((reservation) => (
                <div key={reservation.id} className="p-3 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground text-sm">{reservation.guestName}</span>
                    <Badge className={`${getStatusColor(reservation.status)} border text-xs`}>
                      {reservation.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center justify-between">
                      <span>
                        {formatDate(reservation.checkInDate)} - {formatDate(reservation.checkOutDate)}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{reservation.guestCount}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{calculateNights(reservation.checkInDate, reservation.checkOutDate)} nights</span>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3" />
                        <span>{formatCurrency(reservation.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
