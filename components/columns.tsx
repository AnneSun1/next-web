import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Users, DollarSign, Star } from "lucide-react"
import type { DataTableColumn } from "@/components/ui/data-table"
import type { Property } from "@/data/properties"

const getStatusColor = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
    case "Occupied":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
    case "Maintenance":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
    case "Blocked":
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

export const propertyColumns: DataTableColumn<Property>[] = [
  {
    key: "property",
    header: "Property",
    width: "w-80",
    render: (property) => (
      <div className="flex items-start space-x-3">
        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
          <Building2 className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-1 min-w-0 flex-1">
          <div className="font-medium text-foreground truncate">{property.name}</div>
          <div className="text-sm text-muted-foreground truncate">{property.nickname}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">
              {property.city}, {property.state}
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "details",
    header: "Details",
    width: "w-40",
    render: (property) => (
      <div className="space-y-1">
        <div className="text-sm">
          <span className="font-medium">{property.bedrooms}</span> bed,{" "}
          <span className="font-medium">{property.bathrooms}</span> bath
        </div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Users className="h-3 w-3" />
          <span>Up to {property.maxGuests} guests</span>
        </div>
        <div className="text-xs text-muted-foreground capitalize">{property.propertyType.replace("_", " ")}</div>
      </div>
    ),
  },
  {
    key: "pricing",
    header: "Pricing",
    width: "w-32",
    render: (property) => (
      <div className="space-y-1">
        <div className="flex items-center space-x-1">
          <DollarSign className="h-3 w-3 text-muted-foreground" />
          <span className="font-medium">{formatCurrency(property.basePrice)}</span>
          <span className="text-xs text-muted-foreground">/night</span>
        </div>
        <div className="text-xs text-muted-foreground">+{formatCurrency(property.cleaningFee)} cleaning</div>
      </div>
    ),
  },
  {
    key: "performance",
    header: "Performance",
    width: "w-40",
    render: (property) => (
      <div className="space-y-1">
        <div className="flex items-center space-x-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{property.averageRating}</span>
          <span className="text-xs text-muted-foreground">({property.bookingCount} bookings)</span>
        </div>
        <div className="text-xs text-muted-foreground">{formatCurrency(property.totalRevenue)} total revenue</div>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "w-32",
    render: (property) => (
      <Badge variant="outline" className={getStatusColor(property.status)}>
        {property.status}
      </Badge>
    ),
  },
]
