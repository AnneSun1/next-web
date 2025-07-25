"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Calendar, Edit, Camera } from "lucide-react"

export default function ProfilePage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setActiveTab("profile"))
  }, [dispatch])

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Personal Information</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first-name" className="text-foreground">
                      First Name
                    </Label>
                    <Input
                      id="first-name"
                      defaultValue="John"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="last-name" className="text-foreground">
                      Last Name
                    </Label>
                    <Input id="last-name" defaultValue="Doe" className="bg-background border-border text-foreground" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@novavacation.com"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-foreground">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      defaultValue="+1 (555) 123-4567"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title" className="text-foreground">
                      Job Title
                    </Label>
                    <Input
                      id="title"
                      defaultValue="Property Manager"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address" className="text-foreground">
                    Address
                  </Label>
                  <Input
                    id="address"
                    defaultValue="123 Main Street, Miami, FL 33101"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="bio" className="text-foreground">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Account Activity</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Recent account activity and login history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg border border-border">
                    <div>
                      <p className="text-foreground text-sm">Last login</p>
                      <p className="text-muted-foreground text-xs">Today at 2:30 PM from Miami, FL</p>
                    </div>
                    <Badge className="bg-green-600 text-white">Current</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg border border-border">
                    <div>
                      <p className="text-foreground text-sm">Previous login</p>
                      <p className="text-muted-foreground text-xs">Yesterday at 9:15 AM from Miami, FL</p>
                    </div>
                    <Badge variant="outline" className="border-border text-muted-foreground">
                      Success
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg border border-border">
                    <div>
                      <p className="text-foreground text-sm">Password changed</p>
                      <p className="text-muted-foreground text-xs">3 days ago</p>
                    </div>
                    <Badge variant="outline" className="border-border text-muted-foreground">
                      Security
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-purple-600 hover:bg-purple-700"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">John Doe</h3>
                  <p className="text-muted-foreground mb-2">Property Manager</p>
                  <Badge className="bg-purple-600 text-white mb-4">Administrator</Badge>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-border text-foreground hover:bg-accent"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      Member since
                    </div>
                    <span className="text-foreground">Nov 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-muted-foreground">
                      <User className="h-4 w-4 mr-2" />
                      Properties managed
                    </div>
                    <span className="text-foreground">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-muted-foreground">
                      <Mail className="h-4 w-4 mr-2" />
                      Messages handled
                    </div>
                    <span className="text-foreground">156</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground text-lg">Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-border text-foreground hover:bg-accent"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-border text-foreground hover:bg-accent"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Notifications
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent border-border text-foreground hover:bg-accent"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Location
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <Button variant="outline" className="bg-transparent border-border text-foreground hover:bg-accent">
            Cancel
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Save Changes</Button>
        </div>
      </div>
    </div>
  )
}
