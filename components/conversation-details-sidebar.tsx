"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  X,
  Plus,
  Mail,
  Phone,
  Clock,
  User,
  MessageSquare,
  Calendar,
  Users,
  CheckCircle,
  FileText,
  MoreHorizontal,
  Edit,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ConversationDetailsSidebarProps {
  isOpen: boolean
  onClose: () => void
  contact: {
    id: string | number
    name: string
    role: string
    avatar?: string
    email?: string
    phone?: string
    language?: string
  }
}

export function ConversationDetailsSidebar({ isOpen, onClose, contact }: ConversationDetailsSidebarProps) {
  const [detailsExpanded, setDetailsExpanded] = useState(true)
  const [listingsExpanded, setListingsExpanded] = useState(true)
  const [guestTags, setGuestTags] = useState(["Hiker", "Mother"])
  const [newTag, setNewTag] = useState("")
  const [conversationSummary, setConversationSummary] = useState(
    "Giana Torff confirmed a 3:00 PM check-in on December 22 and received the access code (12345). She also made a few special requests to enhance her stay, including extra towels and a crib, which have been noted and will be pro...",
  )

  const removeTag = (tagToRemove: string) => {
    setGuestTags(guestTags.filter((tag) => tag !== tagToRemove))
  }

  const addTag = () => {
    if (newTag.trim() && !guestTags.includes(newTag.trim())) {
      setGuestTags([...guestTags, newTag.trim()])
      setNewTag("")
    }
  }

  if (!isOpen) return null

  return (
    <div className="w-80 border-l border-border bg-card flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Details Section */}
        <div className="p-4 border-b border-border">
          <Button
            variant="ghost"
            onClick={() => setDetailsExpanded(!detailsExpanded)}
            className="w-full justify-between p-0 h-auto font-semibold text-left"
          >
            Details
            {detailsExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>

          {detailsExpanded && (
            <div className="mt-4 space-y-4">
              {/* Assignee */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Assignee
                </label>
                <Select defaultValue="lindsey">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lindsey">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=24&width=24" />
                          <AvatarFallback>LD</AvatarFallback>
                        </Avatar>
                        Lindsey D.
                      </div>
                    </SelectItem>
                    <SelectItem value="john">John S.</SelectItem>
                    <SelectItem value="sarah">Sarah M.</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Guest Tags */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Guest Tags</label>
                <div className="flex flex-wrap gap-2">
                  {guestTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-3 w-3 p-0 hover:bg-transparent"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    </Badge>
                  ))}
                  <div className="flex items-center gap-1">
                    <Input
                      placeholder="Add tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                      className="h-6 w-20 text-xs"
                    />
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={addTag}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Response Time
                </label>
                <div className="text-right text-sm font-medium">40 min</div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{contact.email || "giana.torff9@gmail.com"}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </label>
                <div className="text-sm font-medium">1-488-206-1738 x8841</div>
              </div>

              {/* Language */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Language</label>
                <Select defaultValue="english">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">
                      <div className="flex items-center gap-2">🇺🇸 English</div>
                    </SelectItem>
                    <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
                    <SelectItem value="french">🇫🇷 French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Conversation Summary */}
        <div className="p-4 border-b border-border">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-purple-500" />
              Conversation Summary
            </label>
            <Textarea
              value={conversationSummary}
              onChange={(e) => setConversationSummary(e.target.value)}
              className="min-h-[100px] text-sm"
              placeholder="Add conversation summary..."
            />
          </div>
        </div>

        {/* Listings Section */}
        <div className="p-4">
          <Button
            variant="ghost"
            onClick={() => setListingsExpanded(!listingsExpanded)}
            className="w-full justify-between p-0 h-auto font-semibold text-left mb-4"
          >
            Listings
            {listingsExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>

          {listingsExpanded && (
            <div className="space-y-4">
              <Tabs defaultValue="active" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="active" className="text-xs">
                    Active{" "}
                    <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                      9
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="upcoming" className="text-xs">
                    Upcoming{" "}
                    <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                      2
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="past" className="text-xs">
                    Past{" "}
                    <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                      4
                    </Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="relative">
                          <img
                            src="/placeholder.svg?height=120&width=200&text=Villa+Nel+Bosco"
                            alt="Villa Nel Bosco"
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Badge className="absolute top-2 right-2 bg-green-500 text-white">Confirmed</Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-sm">Villa Nel Bosco</h3>
                            <span className="text-sm font-bold">€ 496.00 EUR</span>
                          </div>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              May 8, 2023 → May 12, 2023
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />2 Guests
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                              More Info
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                              Automations
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Boarding Pass Section */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">Boarding Pass</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            Unverified
                          </Badge>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <FileText className="h-4 w-4 text-gray-400" />
                          </div>
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <FileText className="h-4 w-4 text-gray-400" />
                          </div>
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Early Check-in Request */}
                  <Card className="bg-blue-50 dark:bg-blue-950/20">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <p className="text-sm font-medium">Guest has requested early check-in</p>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            Decline
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="upcoming">
                  <div className="text-center text-sm text-muted-foreground py-8">No upcoming listings</div>
                </TabsContent>

                <TabsContent value="past">
                  <div className="text-center text-sm text-muted-foreground py-8">No past listings</div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
