"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { setActiveTab } from "@/lib/features/navigation/navigationSlice"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, MailOpen, Reply, Star } from "lucide-react"

export default function InboxPage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setActiveTab("inbox"))
  }, [dispatch])

  const messages = [
    {
      id: 1,
      from: "John Smith",
      subject: "Booking Inquiry - Ocean View Villa",
      preview: "Hi, I'm interested in booking your Ocean View Villa for next month...",
      time: "2 hours ago",
      unread: true,
      important: true,
    },
    {
      id: 2,
      from: "Sarah Johnson",
      subject: "Check-in Instructions Request",
      preview: "Could you please send me the check-in instructions for my upcoming stay...",
      time: "4 hours ago",
      unread: true,
      important: false,
    },
    {
      id: 3,
      from: "Mike Wilson",
      subject: "Thank you for the wonderful stay!",
      preview: "We had an amazing time at your property. Everything was perfect...",
      time: "1 day ago",
      unread: false,
      important: false,
    },
    {
      id: 4,
      from: "Emma Davis",
      subject: "Maintenance Issue Report",
      preview: "I wanted to report a minor issue with the air conditioning in bedroom 2...",
      time: "2 days ago",
      unread: false,
      important: true,
    },
  ]

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Inbox</h1>
          <p className="text-gray-400">Manage your guest communications</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="secondary" className="bg-purple-600 text-white">
            {messages.filter((m) => m.unread).length} Unread
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={`bg-gray-900 border-gray-800 cursor-pointer transition-all hover:bg-gray-800 ${
              message.unread ? "border-l-4 border-l-purple-500" : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`p-2 rounded-full ${message.unread ? "bg-purple-600" : "bg-gray-700"}`}>
                    {message.unread ? (
                      <Mail className="h-4 w-4 text-white" />
                    ) : (
                      <MailOpen className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-semibold ${message.unread ? "text-white" : "text-gray-300"}`}>
                        {message.from}
                      </h3>
                      {message.important && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </div>
                    <h4 className={`text-sm mb-2 ${message.unread ? "text-white font-medium" : "text-gray-400"}`}>
                      {message.subject}
                    </h4>
                    <p className="text-sm text-gray-500 line-clamp-2">{message.preview}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="text-xs text-gray-500">{message.time}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent border-gray-700 text-white hover:bg-gray-800"
                  >
                    <Reply className="h-3 w-3 mr-1" />
                    Reply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
