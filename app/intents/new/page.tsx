"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Target, Settings, MessageSquare, FileText } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewIntentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    trigger: "",
    timing: "",
    messageTemplate: "",
    status: "draft",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Creating intent:", formData)
      setIsLoading(false)
      router.push("/intents")
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = formData.name && formData.type && formData.trigger

  const intentTypes = [
    { value: "communication", label: "Communication" },
    { value: "maintenance", label: "Maintenance" },
    { value: "pricing", label: "Pricing" },
    { value: "availability", label: "Availability" },
  ]

  const triggerOptions = [
    { value: "booking_confirmed", label: "Booking Confirmed" },
    { value: "check_in", label: "Check-in" },
    { value: "check_out", label: "Check-out" },
    { value: "payment_received", label: "Payment Received" },
    { value: "review_received", label: "Review Received" },
    { value: "maintenance_due", label: "Maintenance Due" },
  ]

  const timingOptions = [
    { value: "immediate", label: "Immediate" },
    { value: "1_hour", label: "1 Hour Before" },
    { value: "1_day", label: "1 Day Before" },
    { value: "3_days", label: "3 Days Before" },
    { value: "1_week", label: "1 Week Before" },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/intents">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Intents
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Create New Intent</h2>
          <p className="text-muted-foreground">Set up automated actions for your vacation rental management</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>Define the intent name and description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Intent Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter intent name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe what this intent does..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Intent Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Intent Configuration
            </CardTitle>
            <CardDescription>Configure when and how this intent should trigger</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Intent Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select intent type" />
                </SelectTrigger>
                <SelectContent>
                  {intentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trigger">Trigger Event *</Label>
                <Select value={formData.trigger} onValueChange={(value) => handleInputChange("trigger", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    {triggerOptions.map((trigger) => (
                      <SelectItem key={trigger.value} value={trigger.value}>
                        {trigger.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timing">Timing</Label>
                <Select value={formData.timing} onValueChange={(value) => handleInputChange("timing", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timing" />
                  </SelectTrigger>
                  <SelectContent>
                    {timingOptions.map((timing) => (
                      <SelectItem key={timing.value} value={timing.value}>
                        {timing.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message Template (for communication intents) */}
        {formData.type === "communication" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Message Template
              </CardTitle>
              <CardDescription>Define the message template for communication intents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="messageTemplate">Message Template</Label>
                <Textarea
                  id="messageTemplate"
                  value={formData.messageTemplate}
                  onChange={(e) => handleInputChange("messageTemplate", e.target.value)}
                  placeholder="Enter your message template here. You can use variables like {guest_name}, {property_name}, {check_in_date}..."
                  rows={5}
                />
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Available variables:</strong> {"{guest_name}"}, {"{property_name}"}, {"{check_in_date}"},{" "}
                  {"{check_out_date}"}, {"{total_amount}"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Status
            </CardTitle>
            <CardDescription>Set the initial status for this intent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex gap-4">
          <Button type="submit" disabled={!isFormValid || isLoading}>
            {isLoading ? "Creating Intent..." : "Create Intent"}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/intents">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
