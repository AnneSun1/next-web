import type { Listing } from "@/types/listing"

export const mockListings: Listing[] = [
  {
    id: "1",
    tenantId: "tenant-1",
    externalId: "EXT-001",
    pmsAccountId: "PMS-001",
    title: "Panorama Base Camp",
    nickname: "Base Camp",
    timezone: "America/Vancouver",
    accommodates: 4,
    bedrooms: 1,
    bathrooms: 1,
    beds: 2,
    propertyType: "Condo",
    roomType: "Entire condo",
    areaSquareFeet: 850,
    defaultCheckInTime: "15:00:00",
    defaultCheckOutTime: "11:00:00",
    minimumAge: 21,
    isListed: true,
    active: true,
    fullAddress: "123 Mountain View Drive, Panorama, BC V0A 1T0, Canada",
    street: "123 Mountain View Drive",
    city: "Panorama",
    state: "BC",
    country: "Canada",
    zipcode: "V0A 1T0",
    latitude: 50.2034,
    longitude: -116.2134,
    hostName: "Sarah Johnson",
    wifiName: "PanoramaGuest",
    wifiPassword: "Mountain2024!",
    cleaningInstructions: "Please wash dishes and take out trash. Cleaning fee covers deep cleaning.",
    parkingInstructions: "Parking spot #15 in the underground garage. Use the key fob provided.",
    trashCollectionInfo: "Trash pickup is every Tuesday and Friday. Bins are located in the garage.",
    houseManual:
      "Welcome to Panorama Base Camp! This cozy condo is perfect for your mountain getaway. Check-in is contactless - you'll find the key in the lockbox by the door.",
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      heating: true,
      tv: true,
      mountainView: true,
    },
    tags: ["Mountain View", "Ski-in/Ski-out", "Pet Friendly", "Family Friendly"],
    ownerIds: ["owner-1"],
    listingRooms: {
      bedroom1: { beds: 1, bedType: "Queen" },
      livingRoom: { beds: 1, bedType: "Sofa Bed" },
    },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-12-20T14:22:00Z",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  {
    id: "2",
    tenantId: "tenant-1",
    externalId: "EXT-002",
    pmsAccountId: "PMS-001",
    title: "Downtown Loft Retreat",
    nickname: "Urban Loft",
    timezone: "America/Vancouver",
    accommodates: 6,
    bedrooms: 2,
    bathrooms: 2,
    beds: 3,
    propertyType: "Loft",
    roomType: "Entire loft",
    areaSquareFeet: 1200,
    defaultCheckInTime: "16:00:00",
    defaultCheckOutTime: "10:00:00",
    minimumAge: 25,
    isListed: true,
    active: true,
    fullAddress: "456 Urban Street, Vancouver, BC V6B 1A1, Canada",
    street: "456 Urban Street",
    city: "Vancouver",
    state: "BC",
    country: "Canada",
    zipcode: "V6B 1A1",
    latitude: 49.2827,
    longitude: -123.1207,
    hostName: "Michael Chen",
    wifiName: "UrbanLoft_Guest",
    wifiPassword: "City2024#",
    cleaningInstructions:
      "Please load dishwasher and start it before checkout. Strip beds and place linens in laundry basket.",
    parkingInstructions:
      "Street parking available. Check signs for time restrictions. Parkade entrance on Beatty Street.",
    trashCollectionInfo: "Garbage chute on each floor. Recycling bins in the lobby.",
    houseManual:
      "Welcome to our downtown loft! You're in the heart of the city with restaurants, shops, and transit at your doorstep. The building has 24/7 concierge service.",
    amenities: {
      wifi: true,
      kitchen: true,
      parking: false,
      heating: true,
      tv: true,
      mountainView: false,
    },
    tags: ["Downtown", "City View", "Transit Friendly", "Business Travel"],
    ownerIds: ["owner-2"],
    listingRooms: {
      bedroom1: { beds: 1, bedType: "King" },
      bedroom2: { beds: 1, bedType: "Queen" },
      livingRoom: { beds: 1, bedType: "Sofa Bed" },
    },
    createdAt: "2024-02-10T09:15:00Z",
    updatedAt: "2024-12-18T16:45:00Z",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
]
