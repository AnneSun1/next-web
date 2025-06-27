export type Listing = {
  id: string
  tenantId: string
  externalId: string
  pmsAccountId: string
  title: string
  nickname: string
  timezone: string
  accommodates: number
  bedrooms: number
  bathrooms: number
  propertyType: string
  roomType: string
  areaSquareFeet: number
  defaultCheckInTime: string // e.g. "14:00:00"
  defaultCheckOutTime: string // e.g. "11:00:00"
  minimumAge: number
  isListed: boolean
  active: boolean
  fullAddress: string
  street: string
  city: string
  state: string
  country: string
  zipcode: string
  latitude: number
  longitude: number

  hostName?: string
  wifiName?: string
  wifiPassword?: string
  cleaningInstructions?: string
  parkingInstructions?: string
  trashCollectionInfo?: string
  houseManual?: string

  amenities: any // JSON column
  tags: any // JSON column
  ownerIds: any // JSON column
  listingRooms: any // JSON column

  createdAt: string // ISO timestamp
  updatedAt: string // ISO timestamp

  // Additional fields for display
  images: string[]
  beds: number
}
