"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Settings, Bell, Shield, Palette, Globe, Database } from "lucide-react"

export default function SettingsPage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setActiveTab("settings"))
  }, [dispatch])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your application preferences and configurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                General Settings
              </CardTitle>
              <CardDescription className="text-muted-foreground">Basic application configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-name" className="text-foreground">
                    Company Name
                  </Label>
                  <Input
                    id="company-name"
                    defaultValue="Nova Vacation"
                    className="bg-muted border-border text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-email" className="text-foreground">
                    Contact Email
                  </Label>
                  <Input
                    id="contact-email"
                    defaultValue="contact@novavacation.com"
                    className="bg-muted border-border text-foreground"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="company-address" className="text-foreground">
                  Company Address
                </Label>
                <Input
                  id="company-address"
                  defaultValue="123 Vacation Street, Miami, FL 33101"
                  className="bg-muted border-border text-foreground"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-foreground">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    defaultValue="+1 (555) 123-4567"
                    className="bg-muted border-border text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="timezone" className="text-foreground">
                    Timezone
                  </Label>
                  <Input id="timezone" defaultValue="EST (UTC-5)" className="bg-muted border-border text-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Settings
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Booking Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified of new bookings</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Maintenance Reminders</Label>
                  <p className="text-sm text-muted-foreground">Receive property maintenance reminders</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Settings
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Manage your account security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Login Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-border" />
              <div>
                <Button
                  variant="outline"
                  className="bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Use dark theme</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Compact View</Label>
                  <p className="text-sm text-muted-foreground">Reduce spacing</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Localization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-foreground">Language</Label>
                <Input defaultValue="English (US)" className="bg-muted border-border text-foreground mt-1" />
              </div>
              <div>
                <Label className="text-foreground">Currency</Label>
                <Input defaultValue="USD ($)" className="bg-muted border-border text-foreground mt-1" />
              </div>
              <div>
                <Label className="text-foreground">Date Format</Label>
                <Input defaultValue="MM/DD/YYYY" className="bg-muted border-border text-foreground mt-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Data & Storage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Storage Used: 2.4 GB / 10 GB</p>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "24%" }}></div>
                </div>
              </div>
              <Separator className="bg-border" />
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Export Data
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Clear Cache
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <Button
          variant="outline"
          className="bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          Cancel
        </Button>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
      </div>
    </div>
  )
}
