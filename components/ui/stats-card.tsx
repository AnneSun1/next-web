import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { Loader2 } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  color?: string
  isLoading?: boolean
  trend?: {
    value: string
    isPositive: boolean
  }
  className?: string
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  color = "text-blue-500",
  isLoading = false,
  trend,
  className = "",
}: StatsCardProps) {
  return (
    <Card className={`bg-card border-border ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon && <Icon className={`h-4 w-4 ${color}`} />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-1">
          {isLoading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /> : value}
        </div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {trend && (
          <div className={`text-xs mt-1 ${trend.isPositive ? "text-green-500" : "text-red-500"}`}>
            {trend.isPositive ? "↗" : "↘"} {trend.value}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface StatsGridProps {
  children: React.ReactNode
  className?: string
}

export function StatsGrid({ children, className = "" }: StatsGridProps) {
  return <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>{children}</div>
}
