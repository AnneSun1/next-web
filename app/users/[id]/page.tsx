"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Edit, Save, X, Mail, Phone, MapPin, Calendar, Briefcase } from "lucide-react"
import { toast } from "sonner"

interface UserDetail {
  id: number
  name: string
  username: string
  email: string
  phone: string
  role: string
  status: "active" | "inactive" | "pending"
  lastActive: string
  joinDate: string
  address: string
  department: string
  bio: string
  profilePhoto: string
}

const mockUser: UserDetail = {
  id: 1,
  name: "John Smith",
  username: "johnsmith",
  email: "john.smith@example.com",
  phone: "+1 (555) 123-4567",
  role: "Admin",
  status: "active",
  lastActive: "2024-01-15T10:30:00Z",
  joinDate: "2023-06-15T09:00:00Z",
  address: "123 Main St, New York, NY 10001",
  department: "Operations",
  bio: "Experienced property manager with over 5 years in vacation rental management. Specializes in guest relations and property maintenance coordination.",
  profilePhoto: "/placeholder.svg?height=80&width=80",
}

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [user, setUser] = useState<UserDetail | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editForm, setEditForm] = useState<UserDetail | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Simulate API call
    const fetchUser = async () => {
      try {
        setLoading(true)
        // In a real app, you'd fetch the user by ID
        await new Promise((resolve) => setTimeout(resolve, 500))
        setUser(mockUser)
        setEditForm(mockUser)
      } catch (error) {
        toast.error("Failed to load user")
        router.push("/users")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [params.id, router])

  const getStatusBadge = (status: UserDetail["status"]) => {
    const statusConfig = {
      active: { color: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30", text: "Active" },
      inactive: { color: "bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30", text: "Inactive" },
      pending: { color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30", text: "Pending" },
    }

    const config = statusConfig[status]
    return <Badge className={`${config.color} border`}>{config.text}</Badge>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    if (diffInHours < 48) return "Yesterday"
    return formatDate(dateString)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!editForm?.name?.trim()) {
      newErrors.name = "Name is required"
    }

    if (!editForm?.username?.trim()) {
      newErrors.username = "Username is required"
    }

    if (!editForm?.email?.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!editForm?.phone?.trim()) {
      newErrors.phone = "Phone is required"
    }

    if (!editForm?.role?.trim()) {
      newErrors.role = "Role is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleEdit = () => {
    setIsEditing(true)
    setErrors({})
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditForm(user)
    setErrors({})
  }

  const handleSave = async () => {
    if (!validateForm()) {
      return
    }

    setSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser(editForm!)
      setIsEditing(false)
      toast.success("User updated successfully")
    } catch (error) {
      toast.error("Failed to update user")
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: keyof UserDetail, value: string) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value })
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors({ ...errors, [field]: "" })
      }
    }
  }

  if (loading) {
    return (
      <div className="p-8 bg-background min-h-screen">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-muted rounded-lg"></div>
              <div className="h-32 bg-muted rounded-lg"></div>
            </div>
            <div className="space-y-6">
              <div className="h-48 bg-muted rounded-lg"></div>
              <div className="h-32 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="p-8 bg-background min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">User Not Found</h1>
          <p className="text-muted-foreground mb-4">The user you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/users")}>Back to Users</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.push("/users")} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Header with Edit Button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">User Details</h1>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel} disabled={saving}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving} className="bg-purple-600 hover:bg-purple-700">
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit} className="bg-purple-600 hover:bg-purple-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit User
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Photo, Name, Username */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img
                      src={user.profilePhoto || "/placeholder.svg"}
                      alt={user.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-border"
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-background rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="name" className="text-foreground">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            value={editForm?.name || ""}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className={`bg-muted border-border text-foreground ${errors.name ? "border-red-500" : ""}`}
                          />
                          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <Label htmlFor="username" className="text-foreground">
                            Username *
                          </Label>
                          <Input
                            id="username"
                            value={editForm?.username || ""}
                            onChange={(e) => handleInputChange("username", e.target.value)}
                            className={`bg-muted border-border text-foreground ${errors.username ? "border-red-500" : ""}`}
                          />
                          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                        <p className="text-muted-foreground">@{user.username}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {user.role} • {user.department}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-foreground">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={editForm?.email || ""}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`bg-muted border-border text-foreground ${errors.email ? "border-red-500" : ""}`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-foreground">
                        Phone *
                      </Label>
                      <Input
                        id="phone"
                        value={editForm?.phone || ""}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={`bg-muted border-border text-foreground ${errors.phone ? "border-red-500" : ""}`}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <Label htmlFor="role" className="text-foreground">
                        Role *
                      </Label>
                      <Select value={editForm?.role || ""} onValueChange={(value) => handleInputChange("role", value)}>
                        <SelectTrigger
                          className={`bg-muted border-border text-foreground ${errors.role ? "border-red-500" : ""}`}
                        >
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border">
                          <SelectItem value="Admin" className="text-foreground hover:bg-accent">
                            Admin
                          </SelectItem>
                          <SelectItem value="Property Manager" className="text-foreground hover:bg-accent">
                            Property Manager
                          </SelectItem>
                          <SelectItem value="Maintenance" className="text-foreground hover:bg-accent">
                            Maintenance
                          </SelectItem>
                          <SelectItem value="Guest Services" className="text-foreground hover:bg-accent">
                            Guest Services
                          </SelectItem>
                          <SelectItem value="Cleaner" className="text-foreground hover:bg-accent">
                            Cleaner
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                    </div>
                    <div>
                      <Label htmlFor="department" className="text-foreground">
                        Department
                      </Label>
                      <Input
                        id="department"
                        value={editForm?.department || ""}
                        onChange={(e) => handleInputChange("department", e.target.value)}
                        className="bg-muted border-border text-foreground"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address" className="text-foreground">
                        Address
                      </Label>
                      <Input
                        id="address"
                        value={editForm?.address || ""}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="bg-muted border-border text-foreground"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium text-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium text-foreground">{user.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Role</p>
                        <p className="font-medium text-foreground">{user.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Department</p>
                        <p className="font-medium text-foreground">{user.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 md:col-span-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium text-foreground">{user.address}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bio */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Bio</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div>
                    <Label htmlFor="bio" className="text-foreground">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={editForm?.bio || ""}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      className="bg-muted border-border text-foreground mt-2"
                      rows={4}
                      placeholder="Tell us about this user..."
                    />
                  </div>
                ) : (
                  <p className="text-foreground leading-relaxed">{user.bio}</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Status */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Current Status</p>
                  {getStatusBadge(user.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Active</p>
                  <p className="font-medium text-foreground">{formatLastActive(user.lastActive)}</p>
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">User ID</p>
                    <p className="font-medium text-foreground">#{user.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Joined</p>
                    <p className="font-medium text-foreground">{formatDate(user.joinDate)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
