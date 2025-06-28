export interface Guest {
  id: string
  name: string
  email: string
  phone: string
  location: string
  totalStays: number
  totalSpent: number
  averageRating: number
  status: "verified" | "pending" | "blocked"
  joinDate: string
  lastCheckIn: string
  preferredContactMethod: "email" | "phone" | "sms"
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
  notes?: string
}

export const guests: Guest[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    totalStays: 8,
    totalSpent: 12500,
    averageRating: 4.8,
    status: "verified",
    joinDate: "2022-03-15",
    lastCheckIn: "2024-01-10",
    preferredContactMethod: "email",
    emergencyContact: {
      name: "Bob Johnson",
      phone: "+1 (555) 123-4568",
      relationship: "Spouse",
    },
    notes: "Prefers ground floor rooms. Excellent guest.",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    totalStays: 3,
    totalSpent: 4200,
    averageRating: 4.5,
    status: "verified",
    joinDate: "2023-06-20",
    lastCheckIn: "2023-12-15",
    preferredContactMethod: "phone",
    notes: "Business traveler, often books last minute.",
  },
  {
    id: "3",
    name: "Sarah Williams",
    email: "sarah.williams@email.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    totalStays: 12,
    totalSpent: 18900,
    averageRating: 4.9,
    status: "verified",
    joinDate: "2021-11-08",
    lastCheckIn: "2024-01-05",
    preferredContactMethod: "email",
    emergencyContact: {
      name: "David Williams",
      phone: "+1 (555) 345-6790",
      relationship: "Brother",
    },
    notes: "VIP guest. Always leaves properties in excellent condition.",
  },
  {
    id: "4",
    name: "James Rodriguez",
    email: "james.rodriguez@email.com",
    phone: "+1 (555) 456-7890",
    location: "Miami, FL",
    totalStays: 1,
    totalSpent: 850,
    averageRating: 4.2,
    status: "pending",
    joinDate: "2024-01-12",
    lastCheckIn: "2024-01-12",
    preferredContactMethod: "sms",
    notes: "New guest, first stay went well.",
  },
  {
    id: "5",
    name: "Emma Thompson",
    email: "emma.thompson@email.com",
    phone: "+1 (555) 567-8901",
    location: "Seattle, WA",
    totalStays: 5,
    totalSpent: 7300,
    averageRating: 4.6,
    status: "verified",
    joinDate: "2023-02-28",
    lastCheckIn: "2023-11-20",
    preferredContactMethod: "email",
    notes: "Travels with pets, always follows pet policies.",
  },
  {
    id: "6",
    name: "David Park",
    email: "david.park@email.com",
    phone: "+1 (555) 678-9012",
    location: "Los Angeles, CA",
    totalStays: 15,
    totalSpent: 22400,
    averageRating: 4.7,
    status: "verified",
    joinDate: "2021-08-14",
    lastCheckIn: "2023-12-28",
    preferredContactMethod: "phone",
    emergencyContact: {
      name: "Lisa Park",
      phone: "+1 (555) 678-9013",
      relationship: "Wife",
    },
    notes: "Frequent guest, prefers ocean view properties.",
  },
  {
    id: "7",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "+1 (555) 789-0123",
    location: "Chicago, IL",
    totalStays: 2,
    totalSpent: 2100,
    averageRating: 3.8,
    status: "verified",
    joinDate: "2023-09-10",
    lastCheckIn: "2023-12-05",
    preferredContactMethod: "email",
    notes: "Had some issues with first stay, resolved amicably.",
  },
  {
    id: "8",
    name: "Robert Kim",
    email: "robert.kim@email.com",
    phone: "+1 (555) 890-1234",
    location: "Denver, CO",
    totalStays: 6,
    totalSpent: 9200,
    averageRating: 4.4,
    status: "verified",
    joinDate: "2022-12-03",
    lastCheckIn: "2024-01-08",
    preferredContactMethod: "sms",
    notes: "Mountain enthusiast, books ski properties frequently.",
  },
]
