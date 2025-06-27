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
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
        <p className="text-gray-400">Manage your personal information and account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Personal Information</CardTitle>
              <CardDescription className="text-gray-400">
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first-name" className="text-gray-300">
                    First Name
                  </Label>
                  <Input id="first-name" defaultValue="John" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <Label htmlFor="last-name" className="text-gray-300">
                    Last Name
                  </Label>
                  <Input id="last-name" defaultValue="Doe" className="bg-gray-800 border-gray-700 text-white" />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@novavacation.com"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-gray-300">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    defaultValue="+1 (555) 123-4567"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="title" className="text-gray-300">
                    Job Title
                  </Label>
                  <Input
                    id="title"
                    defaultValue="Property Manager"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address" className="text-gray-300">
                  Address
                </Label>
                <Input
                  id="address"
                  defaultValue="123 Main Street, Miami, FL 33101"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="bio" className="text-gray-300">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Account Activity</CardTitle>
              <CardDescription className="text-gray-400">Recent account activity and login history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-white text-sm">Last login</p>
                    <p className="text-gray-400 text-xs">Today at 2:30 PM from Miami, FL</p>
                  </div>
                  <Badge className="bg-green-600 text-white">Current</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-white text-sm">Previous login</p>
                    <p className="text-gray-400 text-xs">Yesterday at 9:15 AM from Miami, FL</p>
                  </div>
                  <Badge variant="outline" className="border-gray-600 text-gray-400">
                    Success
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-white text-sm">Password changed</p>
                    <p className="text-gray-400 text-xs">3 days ago</p>
                  </div>
                  <Badge variant="outline" className="border-gray-600 text-gray-400">
                    Security
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
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
                <h3 className="text-xl font-semibold text-white mb-1">John Doe</h3>
                <p className="text-gray-400 mb-2">Property Manager</p>
                <Badge className="bg-purple-600 text-white mb-4">Administrator</Badge>
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-gray-700 text-white hover:bg-gray-800"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    Member since
                  </div>
                  <span className="text-white">Nov 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400">
                    <User className="h-4 w-4 mr-2" />
                    Properties managed
                  </div>
                  <span className="text-white">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400">
                    <Mail className="h-4 w-4 mr-2" />
                    Messages handled
                  </div>
                  <span className="text-white">156</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-lg">Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-gray-700 text-white hover:bg-gray-800"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-gray-700 text-white hover:bg-gray-800"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Notification Preferences
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-gray-700 text-white hover:bg-gray-800"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Location Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <Button variant="outline" className="bg-transparent border-gray-700 text-white hover:bg-gray-800">
          Cancel
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700">Save Changes</Button>
      </div>
    </div>
  )
}
