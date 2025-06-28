"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Zap, MessageSquare, Settings, Plus } from "lucide-react"
import Link from "next/link"

export default function NewIntentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
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
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Creating intent:", formData)
    setLoading(false)
    router.push("/intents")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = formData.name && formData.type && formData.trigger

  const getTriggerOptions = () => {
    switch (formData.type) {
      case "communication":
        return [
          { value: "booking_confirmation", label: "Booking Confirmation" },
          { value: "check_in_reminder", label: "Check-in Reminder" },
          { value: "check_out_reminder", label: "Check-out Reminder" },
          { value: "review_request", label: "Review Request" },
        ]
      case "maintenance":
        return [
          { value: "cleaning_schedule", label: "Cleaning Schedule" },
          { value: "maintenance_due", label: "Maintenance Due" },
          { value: "inspection_required", label: "Inspection Required" },
        ]
      case "pricing":
        return [
          { value: "seasonal_adjustment", label: "Seasonal Price Adjustment" },
          { value: "demand_pricing", label: "Demand-based Pricing" },
          { value: "competitor_analysis", label: "Competitor Analysis" },
        ]
      default:
        return []
    }
  }

  const getTimingOptions = () => {
    switch (formData.trigger) {
      case "booking_confirmation":
        return [
          { value: "immediate", label: "Immediately" },
          { value: "1_hour", label: "1 hour after booking" },
        ]
      case "check_in_reminder":
      case "check_out_reminder":
        return [
          { value: "24_hours", label: "24 hours before" },
          { value: "12_hours", label: "12 hours before" },
          { value: "2_hours", label: "2 hours before" },
        ]
      case "review_request":
        return [
          { value: "1_day", label: "1 day after checkout" },
          { value: "3_days", label: "3 days after checkout" },
          { value: "1_week", label: "1 week after checkout" },
        ]
      default:
        return [
          { value: "immediate", label: "Immediately" },
          { value: "daily", label: "Daily" },
          { value: "weekly", label: "Weekly" },
        ]
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/intents">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Intent</h1>
          <p className="text-muted-foreground">Set up automated actions and workflows</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>Define the intent name and purpose</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Intent Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., Welcome Message for New Guests"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe what this intent does and when it should be triggered..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Intent Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select intent type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="communication">Guest Communication</SelectItem>
                  <SelectItem value="maintenance">Property Maintenance</SelectItem>
                  <SelectItem value="pricing">Dynamic Pricing</SelectItem>
                  <SelectItem value="reporting">Automated Reporting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Trigger Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Trigger Configuration
            </CardTitle>
            <CardDescription>Define when and how this intent should be activated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="trigger">Trigger Event *</Label>
              <Select
                value={formData.trigger}
                onValueChange={(value) => handleInputChange("trigger", value)}
                disabled={!formData.type}
              >
                <SelectTrigger>
                  <SelectValue placeholder={formData.type ? "Select trigger event" : "Select intent type first"} />
                </SelectTrigger>
                <SelectContent>
                  {getTriggerOptions().map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timing">Timing</Label>
              <Select
                value={formData.timing}
                onValueChange={(value) => handleInputChange("timing", value)}
                disabled={!formData.trigger}
              >
                <SelectTrigger>
                  <SelectValue placeholder={formData.trigger ? "Select timing" : "Select trigger event first"} />
                </SelectTrigger>
                <SelectContent>
                  {getTimingOptions().map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="messageTemplate">Message Content</Label>
                <Textarea
                  id="messageTemplate"
                  value={formData.messageTemplate}
                  onChange={(e) => handleInputChange("messageTemplate", e.target.value)}
                  placeholder="Hello {{guest_name}}, welcome to {{property_name}}! Your check-in is scheduled for {{check_in_date}}..."
                  rows={6}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-2">Available variables:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <span>{"{{guest_name}}"} - Guest's name</span>
                  <span>{"{{property_name}}"} - Property name</span>
                  <span>{"{{check_in_date}}"} - Check-in date</span>
                  <span>{"{{check_out_date}}"} - Check-out date</span>
                  <span>{"{{booking_id}}"} - Booking reference</span>
                  <span>{"{{total_amount}}"} - Total booking amount</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status & Activation</CardTitle>
            <CardDescription>Set the initial status of this intent</CardDescription>
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

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={!isFormValid || loading}>
            {loading ? (
              <>
                <Plus className="mr-2 h-4 w-4 animate-spin" />
                Creating Intent...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Intent
              </>
            )}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/intents">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
