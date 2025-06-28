interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "manager" | "staff"
  status: "active" | "inactive" | "pending"
  joinDate: string
  lastLogin: string
}

export const userData: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "admin",
    status: "active",
    joinDate: "2023-01-15",
    lastLogin: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    role: "manager",
    status: "active",
    joinDate: "2023-03-22",
    lastLogin: "2024-01-19T14:15:00Z",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 345-6789",
    role: "staff",
    status: "pending",
    joinDate: "2024-01-10",
    lastLogin: "2024-01-18T09:45:00Z",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 (555) 456-7890",
    role: "staff",
    status: "active",
    joinDate: "2023-08-12",
    lastLogin: "2024-01-17T16:20:00Z",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1 (555) 567-8901",
    role: "manager",
    status: "inactive",
    joinDate: "2023-05-03",
    lastLogin: "2023-12-15T11:30:00Z",
  },
]
