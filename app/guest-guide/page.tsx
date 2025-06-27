"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, BookOpen, Edit, Eye } from "lucide-react"

export default function GuestGuidePage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setActiveTab("guest-guide"))
  }, [dispatch])

  const guides = [
    {
      id: 1,
      title: "Ocean View Villa - Guest Guide",
      property: "Ocean View Villa",
      lastUpdated: "Dec 15, 2024",
      status: "Published",
      sections: 8,
      views: 45,
    },
    {
      id: 2,
      title: "Downtown Loft - Welcome Guide",
      property: "Downtown Loft",
      lastUpdated: "Dec 10, 2024",
      status: "Draft",
      sections: 6,
      views: 12,
    },
    {
      id: 3,
      title: "Mountain Cabin - House Rules & Info",
      property: "Mountain Cabin",
      lastUpdated: "Dec 8, 2024",
      status: "Published",
      sections: 10,
      views: 28,
    },
  ]

  const guideTemplates = [
    {
      title: "Check-in Instructions",
      description: "Step-by-step guide for guest arrival and property access",
    },
    {
      title: "House Rules",
      description: "Property rules, policies, and guest expectations",
    },
    {
      title: "Local Recommendations",
      description: "Restaurants, attractions, and activities in the area",
    },
    {
      title: "Emergency Information",
      description: "Important contacts and emergency procedures",
    },
    {
      title: "Amenities Guide",
      description: "How to use property amenities and appliances",
    },
    {
      title: "Check-out Instructions",
      description: "Departure procedures and checkout requirements",
    },
  ]

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Guest Guide</h1>
          <p className="text-gray-400">Create and manage comprehensive guides for your guests</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Guide
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">Your Guides</h2>
          <div className="space-y-4">
            {guides.map((guide) => (
              <Card key={guide.id} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <BookOpen className="h-5 w-5 text-purple-500" />
                        <h3 className="font-semibold text-white">{guide.title}</h3>
                        <Badge className={guide.status === "Published" ? "bg-green-600" : "bg-yellow-600"}>
                          {guide.status}
                        </Badge>
                      </div>

                      <p className="text-gray-400 text-sm mb-3">{guide.property}</p>

                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span>Last updated: {guide.lastUpdated}</span>
                        <span>{guide.sections} sections</span>
                        <span>{guide.views} views</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent border-gray-700 text-white hover:bg-gray-800"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent border-gray-700 text-white hover:bg-gray-800"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Guide Templates</h2>
          <div className="space-y-3">
            {guideTemplates.map((template, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors"
              >
                <CardContent className="p-4">
                  <h4 className="font-medium text-white mb-1">{template.title}</h4>
                  <p className="text-sm text-gray-400">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gray-900 border-gray-800 mt-6">
            <CardHeader>
              <CardTitle className="text-white text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Guides</span>
                  <span className="text-white font-medium">{guides.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Published</span>
                  <span className="text-white font-medium">
                    {guides.filter((g) => g.status === "Published").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Views</span>
                  <span className="text-white font-medium">{guides.reduce((sum, guide) => sum + guide.views, 0)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
