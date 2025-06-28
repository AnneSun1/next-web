"use client"

import { useEffect, useState } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, MailOpen, Reply, Star } from "lucide-react"

interface Message {
  id: number
  from: string
  subject: string
  preview: string
  time: string
  unread: boolean
  important: boolean
}

export default function InboxPage() {
  const dispatch = useAppDispatch()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMessages, setSelectedMessages] = useState<number[]>([])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  // useEffect(() => {
  //   dispatch(setActiveTab("inbox"))
  // }, [dispatch])

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

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "unread") return matchesSearch && message.unread
    if (activeTab === "important") return matchesSearch && message.important
    return matchesSearch
  })

  const handleSelectMessage = (messageId: number) => {
    setSelectedMessages((prev) =>
      prev.includes(messageId) ? prev.filter((id) => id !== messageId) : [...prev, messageId],
    )
  }

  const handleSelectAll = () => {
    setSelectedMessages(selectedMessages.length === filteredMessages.length ? [] : filteredMessages.map((m) => m.id))
  }

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message)
    // Mark as read
    message.unread = false
  }

  const handleStarMessage = (messageId: number) => {
    const message = messages.find((m) => m.id === messageId)
    if (message) {
      message.important = !message.important
    }
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action}`, selectedMessages)
    setSelectedMessages([])
  }

  if (selectedMessage) {
    return (
      <div className="p-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => setSelectedMessage(null)} className="mb-4">
            ← Back to Inbox
          </Button>
        </div>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-full ${
                    selectedMessage.unread ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {selectedMessage.unread ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{selectedMessage.subject}</h2>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{selectedMessage.from}</span>
                    <span>•</span>
                    <span>{selectedMessage.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Reply className="h-4 w-4 mr-2" />
                  Reply
                </Button>
              </div>
            </div>
            <div className="prose max-w-none text-foreground">
              <p>{selectedMessage.preview}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Inbox</h1>
          <p className="text-muted-foreground">Manage your guest communications</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="secondary" className="bg-primary text-primary-foreground">
            {messages.filter((m) => m.unread).length} Unread
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <Card
            key={message.id}
            className={`border cursor-pointer transition-all hover:bg-accent/50 ${
              message.unread ? "border-l-4 border-l-primary bg-accent/20" : "bg-card"
            }`}
            onClick={() => handleMessageClick(message)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div
                    className={`p-2 rounded-full ${
                      message.unread ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {message.unread ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-semibold ${message.unread ? "text-foreground" : "text-muted-foreground"}`}>
                        {message.from}
                      </h3>
                      {message.important && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </div>
                    <h4
                      className={`text-sm mb-2 ${
                        message.unread ? "text-foreground font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {message.subject}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{message.preview}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="text-xs text-muted-foreground">{message.time}</span>
                  <Button size="sm" variant="outline" className="hover:bg-accent bg-transparent">
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
