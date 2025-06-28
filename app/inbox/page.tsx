"use client"

import { useState, useMemo } from "react"
import { Search, Filter, ArrowUpDown, Smile, Paperclip, Mic, Send, PanelRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ConversationDetailsSidebar } from "@/components/conversation-details-sidebar"

// Mock data for conversations
const conversations = [
  {
    id: 1,
    name: "Felecia Rower",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "felecia.rower@example.com",
    phone: "1-555-123-4567",
    language: "English",
    lastMessage: "I will purchase it for sure. 👍",
    timestamp: "Jun 27",
    unreadCount: 0,
    isOnline: true,
    isPriority: false,
    messages: [
      { id: 1, text: "Looks clean and fresh UI. 😍", sender: "other", timestamp: "2:46 AM" },
      { id: 2, text: "It's perfect for my next project.", sender: "user", timestamp: "2:46 AM" },
      { id: 3, text: "How can I purchase it?", sender: "user", timestamp: "2:46 AM" },
      { id: 4, text: "Thanks, From our official site 😊", sender: "other", timestamp: "2:46 AM" },
      { id: 5, text: "I will purchase it for sure. 👍", sender: "other", timestamp: "1:32 PM" },
    ],
  },
  {
    id: 2,
    name: "Adalberto Granzin",
    role: "Property Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "adalberto.granzin@example.com",
    phone: "1-555-987-6543",
    language: "Spanish",
    lastMessage: "If it takes long you can mail me ...",
    timestamp: "Jun 26",
    unreadCount: 2,
    isOnline: false,
    isPriority: true,
    messages: [
      { id: 1, text: "Hello, I need help with the booking system", sender: "other", timestamp: "10:30 AM" },
      { id: 2, text: "Sure, what specific issue are you facing?", sender: "user", timestamp: "10:32 AM" },
      { id: 3, text: "If it takes long you can mail me the details", sender: "other", timestamp: "10:35 AM" },
    ],
  },
  {
    id: 3,
    name: "Zenia Jacobs",
    role: "Guest",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "zenia.jacobs@example.com",
    phone: "1-555-456-7890",
    language: "English",
    lastMessage: "Thank you, looking forward to it.",
    timestamp: "Dec 13",
    unreadCount: 0,
    isOnline: true,
    isPriority: false,
    messages: [
      { id: 1, text: "Hi, when will my reservation be confirmed?", sender: "other", timestamp: "9:15 AM" },
      { id: 2, text: "Your reservation will be confirmed within 24 hours", sender: "user", timestamp: "9:20 AM" },
      { id: 3, text: "Thank you, looking forward to it.", sender: "other", timestamp: "9:22 AM" },
    ],
  },
  {
    id: 4,
    name: "Miguel Guelff",
    role: "Property Owner",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "miguel.guelff@example.com",
    phone: "1-555-321-0987",
    language: "English",
    lastMessage: "Thank you, looking forward to it.",
    timestamp: "Dec 11",
    unreadCount: 0,
    isOnline: true,
    isPriority: false,
    messages: [
      { id: 1, text: "The property maintenance is scheduled for tomorrow", sender: "user", timestamp: "2:00 PM" },
      { id: 2, text: "Perfect, I'll make sure someone is there", sender: "other", timestamp: "2:05 PM" },
      { id: 3, text: "Thank you, looking forward to it.", sender: "other", timestamp: "2:10 PM" },
    ],
  },
  {
    id: 5,
    name: "Lauran Starner",
    role: "Guest",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "lauran.starner@example.com",
    phone: "1-555-654-3210",
    language: "French",
    lastMessage: "That sounds interesting. I'll hav...",
    timestamp: "Dec 13",
    unreadCount: 1,
    isOnline: false,
    isPriority: false,
    messages: [
      { id: 1, text: "Do you have any special packages for long stays?", sender: "other", timestamp: "11:00 AM" },
      { id: 2, text: "Yes, we offer monthly discounts for stays over 30 days", sender: "user", timestamp: "11:15 AM" },
      { id: 3, text: "That sounds interesting. I'll have to think about it.", sender: "other", timestamp: "11:20 AM" },
    ],
  },
  {
    id: 6,
    name: "Ramonita Veras",
    role: "Property Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "ramonita.veras@example.com",
    phone: "1-555-789-0123",
    language: "Spanish",
    lastMessage: "Sounds good. Let's do it.",
    timestamp: "Dec 13",
    unreadCount: 1,
    isOnline: true,
    isPriority: true,
    messages: [
      { id: 1, text: "We need to schedule a property inspection", sender: "other", timestamp: "3:30 PM" },
      { id: 2, text: "How about next Tuesday at 10 AM?", sender: "user", timestamp: "3:35 PM" },
      { id: 3, text: "Sounds good. Let's do it.", sender: "other", timestamp: "3:40 PM" },
    ],
  },
  {
    id: 7,
    name: "Verla Morgano",
    role: "Guest",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "verla.morgano@example.com",
    phone: "1-555-012-3456",
    language: "English",
    lastMessage: "Great work. Keep it up.",
    timestamp: "Dec 13",
    unreadCount: 0,
    isOnline: true,
    isPriority: false,
    messages: [
      { id: 1, text: "The check-in process was very smooth", sender: "other", timestamp: "4:00 PM" },
      { id: 2, text: "Thank you for the feedback!", sender: "user", timestamp: "4:05 PM" },
      { id: 3, text: "Great work. Keep it up.", sender: "other", timestamp: "4:10 PM" },
    ],
  },
  {
    id: 8,
    name: "Cecilia Shockey",
    role: "Property Owner",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "cecilia.shockey@example.com",
    phone: "1-555-345-6789",
    language: "English",
    lastMessage: "Your Welcome!😊",
    timestamp: "Dec 13",
    unreadCount: 1,
    isOnline: false,
    isPriority: false,
    messages: [
      { id: 1, text: "Thank you for managing my property so well", sender: "other", timestamp: "5:00 PM" },
      { id: 2, text: "It's our pleasure to help!", sender: "user", timestamp: "5:05 PM" },
      { id: 3, text: "Your Welcome!😊", sender: "other", timestamp: "5:10 PM" },
    ],
  },
]

type FilterType = "all" | "unread" | "online" | "priority"
type SortType = "recent" | "name" | "unread" | "priority"

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<FilterType>("all")
  const [sort, setSortType] = useState<SortType>("recent")
  const [newMessage, setNewMessage] = useState("")
  const [detailsSidebarOpen, setDetailsSidebarOpen] = useState(false)
  const [inboxSidebarOpen, setInboxSidebarOpen] = useState(true)

  // Filter and sort conversations
  const filteredAndSortedConversations = useMemo(() => {
    const filtered = conversations.filter((conv) => {
      // Search filter
      if (searchQuery && !conv.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Type filter
      switch (filter) {
        case "unread":
          return conv.unreadCount > 0
        case "online":
          return conv.isOnline
        case "priority":
          return conv.isPriority
        default:
          return true
      }
    })

    // Sort
    return filtered.sort((a, b) => {
      switch (sort) {
        case "name":
          return a.name.localeCompare(b.name)
        case "unread":
          return b.unreadCount - a.unreadCount
        case "priority":
          return (b.isPriority ? 1 : 0) - (a.isPriority ? 1 : 0)
        default: // recent
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      }
    })
  }, [searchQuery, filter, sort])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* Sidebar - Conversations List */}
      {inboxSidebarOpen && (
        <div className="w-80 border-r border-border bg-card flex flex-col">
          {/* Search Header */}
          <div className="p-4 border-b border-border">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Contacts"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted border-border"
              />
            </div>

            {/* Filter and Sort Buttons */}
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-40">
                  <DropdownMenuItem onClick={() => setFilter("all")} className={filter === "all" ? "bg-accent" : ""}>
                    All Contacts
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFilter("unread")}
                    className={filter === "unread" ? "bg-accent" : ""}
                  >
                    Unread Messages
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFilter("online")}
                    className={filter === "online" ? "bg-accent" : ""}
                  >
                    Online Only
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFilter("priority")}
                    className={filter === "priority" ? "bg-accent" : ""}
                  >
                    High Priority
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem
                    onClick={() => setSortType("recent")}
                    className={sort === "recent" ? "bg-accent" : ""}
                  >
                    Most Recent
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortType("name")} className={sort === "name" ? "bg-accent" : ""}>
                    Name (A-Z)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortType("unread")}
                    className={sort === "unread" ? "bg-accent" : ""}
                  >
                    Unread First
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortType("priority")}
                    className={sort === "priority" ? "bg-accent" : ""}
                  >
                    Priority Level
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredAndSortedConversations.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <p>No conversations found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredAndSortedConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-accent/50 ${
                    selectedConversation.id === conversation.id ? "bg-accent" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                          {getInitials(conversation.name)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground truncate">{conversation.name}</h3>
                          {conversation.isPriority && <div className="h-2 w-2 rounded-full bg-red-500"></div>}
                        </div>
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{conversation.role}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate flex-1">{conversation.lastMessage}</p>
                        {conversation.unreadCount > 0 && (
                          <Badge className="ml-2 h-5 w-5 rounded-full bg-red-500 p-0 text-xs text-white flex items-center justify-center">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Toggle Inbox Sidebar Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setInboxSidebarOpen(!inboxSidebarOpen)}
              >
                <Menu className="h-4 w-4" />
              </Button>

              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={selectedConversation.avatar || "/placeholder.svg"}
                    alt={selectedConversation.name}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    {getInitials(selectedConversation.name)}
                  </AvatarFallback>
                </Avatar>
                {selectedConversation.isOnline && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
                )}
              </div>
              <div>
                <h2 className="font-semibold text-foreground">{selectedConversation.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedConversation.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Search className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setDetailsSidebarOpen(!detailsSidebarOpen)}
              >
                <PanelRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedConversation.messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex items-end gap-2 max-w-xs lg:max-w-md">
                {message.sender === "other" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={selectedConversation.avatar || "/placeholder.svg"}
                      alt={selectedConversation.name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white text-xs">
                      {getInitials(selectedConversation.name)}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="text-center">
            <span className="text-xs text-muted-foreground">2:46 AM</span>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
              <Smile className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
              <Mic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
              <Paperclip className="h-4 w-4" />
            </Button>

            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="pr-12 bg-muted border-border"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Sidebar */}
      <ConversationDetailsSidebar
        isOpen={detailsSidebarOpen}
        onClose={() => setDetailsSidebarOpen(false)}
        contact={selectedConversation}
      />
    </div>
  )
}

