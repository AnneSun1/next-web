"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Edit2,
  Save,
  X,
  Clock,
  MapPin,
  User,
  FileText,
  CheckSquare,
  MessageSquare,
  Paperclip,
  Play,
  Upload,
  Send,
  Camera,
  Check,
  Download,
  Trash2,
  Plus,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TASK_STATUS, TASK_PRIORITY, TASK_TYPE, type Task, type TaskChecklistItem } from "@/types/task"

// Mock data
const mockComments = [
  {
    id: "1",
    author: "John Smith",
    avatar: "/placeholder.svg?height=32&width=32&text=JS",
    content: "Started working on the kitchen cleaning. The oven needs extra attention.",
    timestamp: "2024-01-15T09:30:00Z",
  },
  {
    id: "2",
    author: "Jane Doe",
    avatar: "/placeholder.svg?height=32&width=32&text=JD",
    content: "Please make sure to clean behind the refrigerator as well.",
    timestamp: "2024-01-15T08:15:00Z",
  },
]

const mockAttachments = [
  {
    id: "1",
    name: "before-kitchen.jpg",
    size: "2.4 MB",
    type: "image/jpeg",
    url: "/placeholder.svg?height=200&width=300&text=Before+Photo",
    uploadedBy: "John Smith",
    uploadedAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "2",
    name: "cleaning-checklist.pdf",
    size: "156 KB",
    type: "application/pdf",
    url: "/placeholder.svg?height=200&width=300&text=PDF+Document",
    uploadedBy: "Jane Doe",
    uploadedAt: "2024-01-14T16:30:00Z",
  },
  {
    id: "3",
    name: "after-kitchen.jpg",
    size: "3.1 MB",
    type: "image/jpeg",
    url: "/placeholder.svg?height=200&width=300&text=After+Photo",
    uploadedBy: "John Smith",
    uploadedAt: "2024-01-15T12:00:00Z",
  },
  {
    id: "4",
    name: "receipt.jpg",
    size: "1.8 MB",
    type: "image/jpeg",
    url: "/placeholder.svg?height=200&width=300&text=Receipt",
    uploadedBy: "Jane Doe",
    uploadedAt: "2024-01-15T14:30:00Z",
  },
]

const mockChecklist: TaskChecklistItem[] = [
  {
    id: "1",
    taskId: "1",
    title: "Clean oven interior",
    description: "Remove all racks and clean thoroughly",
    isCompleted: true,
    completedAt: "2024-01-15T10:00:00Z",
    sortOrder: 1,
    requiresAttachment: true,
    attachmentDescription: "Photo of clean oven interior",
  },
  {
    id: "2",
    taskId: "1",
    title: "Clean refrigerator",
    description: "Clean inside and outside, including behind",
    isCompleted: false,
    sortOrder: 2,
    requiresAttachment: true,
    attachmentDescription: "Before and after photos",
  },
  {
    id: "3",
    taskId: "1",
    title: "Mop floors",
    description: "Sweep and mop all kitchen floors",
    isCompleted: false,
    sortOrder: 3,
    requiresAttachment: false,
  },
]

const mockActivityLog = [
  {
    id: "1",
    type: "status_change",
    description: "Task status changed from Pending to In Progress",
    user: "John Smith",
    timestamp: "2024-01-15T09:15:00Z",
  },
  {
    id: "2",
    type: "assignment",
    description: "Task assigned to John Smith",
    user: "Jane Doe",
    timestamp: "2024-01-15T08:00:00Z",
  },
  {
    id: "3",
    type: "comment",
    description: "Added comment about oven cleaning",
    user: "John Smith",
    timestamp: "2024-01-15T09:30:00Z",
  },
  {
    id: "4",
    type: "checklist",
    description: "Completed checklist item: Clean oven interior",
    user: "John Smith",
    timestamp: "2024-01-15T10:00:00Z",
  },
  {
    id: "5",
    type: "attachment",
    description: "Uploaded before-kitchen.jpg",
    user: "John Smith",
    timestamp: "2024-01-15T09:00:00Z",
  },
]

// Mock task data - in real app, this would come from API
const mockTask: Task = {
  id: "1",
  tenantId: "1",
  title: "Deep Clean Kitchen",
  description:
    "Complete deep cleaning of kitchen including appliances, cabinets, and floors. Pay special attention to the oven and refrigerator.",
  status: TASK_STATUS.IN_PROGRESS,
  assignmentStatusCode: "ASSIGNED",
  assigneeId: "user-1",
  supervisorId: "user-2",
  requestedById: "user-3",
  taskTypeCode: TASK_TYPE.CLEANING,
  subcategoryCode: "DEEP_CLEAN",
  priority: TASK_PRIORITY.HIGH,
  taskSourceCode: "MANUAL",
  listingId: "listing-1",
  reservationId: "res-1",
  plannedStartAt: "2024-01-15T09:00:00Z",
  plannedDurationMin: 180,
  dueAt: "2024-01-15T15:00:00Z",
  actualStart: "2024-01-15T09:15:00Z",
  isPaused: false,
  feedbackRating: 4,
  feedBackNote: "Good progress so far",
  jobResultNote: "Kitchen appliances cleaned thoroughly",
  hasFollowup: false,
  createdAt: "2024-01-14T10:00:00Z",
  updatedAt: "2024-01-15T09:15:00Z",
  comments: [],
  attachments: [],
  checklist: mockChecklist,
  listingNickname: "Downtown Loft",
  listingFullAddress: "123 Main St, City, State 12345",
  listingLongitude: -122.4194,
  listingLatitude: 37.7749,
}

type EditingSection = "basic" | "assignment" | "timing" | "location" | "financial" | "progress" | null

const getStatusColor = (status: TASK_STATUS) => {
  switch (status) {
    case TASK_STATUS.PENDING:
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
    case TASK_STATUS.IN_PROGRESS:
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
    case TASK_STATUS.COMPLETED:
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
    case TASK_STATUS.CANCELLED:
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
    case TASK_STATUS.ON_HOLD:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
  }
}

const getPriorityColor = (priority: TASK_PRIORITY) => {
  switch (priority) {
    case TASK_PRIORITY.LOW:
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
    case TASK_PRIORITY.MEDIUM:
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
    case TASK_PRIORITY.HIGH:
      return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800"
    case TASK_PRIORITY.URGENT:
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
  }
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case "status_change":
      return <CheckSquare className="h-4 w-4 text-blue-500" />
    case "assignment":
      return <User className="h-4 w-4 text-green-500" />
    case "comment":
      return <MessageSquare className="h-4 w-4 text-purple-500" />
    case "checklist":
      return <Check className="h-4 w-4 text-green-500" />
    case "attachment":
      return <Paperclip className="h-4 w-4 text-orange-500" />
    default:
      return <Activity className="h-4 w-4 text-gray-500" />
  }
}

const formatDateTime = (dateString?: string) => {
  if (!dateString) return "Not set"
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const formatFileSize = (bytes: string) => {
  return bytes // Already formatted in mock data
}

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [task, setTask] = useState<Task>(mockTask)
  const [editingSection, setEditingSection] = useState<EditingSection>(null)
  const [editedData, setEditedData] = useState<Partial<Task>>({})
  const [newComment, setNewComment] = useState("")
  const [checklist, setChecklist] = useState<TaskChecklistItem[]>(mockChecklist)
  const [editingChecklistItem, setEditingChecklistItem] = useState<string | null>(null)
  const [newChecklistItem, setNewChecklistItem] = useState({
    title: "",
    description: "",
    requiresAttachment: false,
    attachmentDescription: "",
  })
  const [showAddChecklistDialog, setShowAddChecklistDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("basic-info")

  const handleEdit = (section: EditingSection) => {
    setEditingSection(section)
    setEditedData(task)
  }

  const handleSave = () => {
    setTask({ ...task, ...editedData })
    setEditingSection(null)
    setEditedData({})
    // In real app, make API call here
  }

  const handleCancel = () => {
    setEditingSection(null)
    setEditedData({})
  }

  const updateEditedData = (field: keyof Task, value: any) => {
    setEditedData((prev) => ({ ...prev, [field]: value }))
  }

  const handleStartTask = () => {
    // In real app, make API call to start task
    console.log("Starting task...")
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In real app, make API call to add comment
      console.log("Adding comment:", newComment)
      setNewComment("")
    }
  }

  const handleChecklistToggle = (itemId: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              isCompleted: !item.isCompleted,
              completedAt: !item.isCompleted ? new Date().toISOString() : undefined,
            }
          : item,
      ),
    )
  }

  const handleAddChecklistItem = () => {
    if (newChecklistItem.title.trim()) {
      const newItem: TaskChecklistItem = {
        id: Date.now().toString(),
        taskId: task.id,
        title: newChecklistItem.title,
        description: newChecklistItem.description,
        isCompleted: false,
        sortOrder: checklist.length + 1,
        requiresAttachment: newChecklistItem.requiresAttachment,
        attachmentDescription: newChecklistItem.attachmentDescription,
      }
      setChecklist((prev) => [...prev, newItem])
      setNewChecklistItem({
        title: "",
        description: "",
        requiresAttachment: false,
        attachmentDescription: "",
      })
      setShowAddChecklistDialog(false)
    }
  }

  const handleEditChecklistItem = (itemId: string, updates: Partial<TaskChecklistItem>) => {
    setChecklist((prev) => prev.map((item) => (item.id === itemId ? { ...item, ...updates } : item)))
    setEditingChecklistItem(null)
  }

  const handleDeleteChecklistItem = (itemId: string) => {
    setChecklist((prev) => prev.filter((item) => item.id !== itemId))
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{task.title}</h1>
              <p className="text-muted-foreground">{task.description}</p>
            </div>
          </div>
          <Button onClick={handleStartTask} className="bg-green-600 hover:bg-green-700">
            <Play className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Start Task</span>
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic-info" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Basic Info</span>
            </TabsTrigger>
            <TabsTrigger value="comments" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Comments</span>
              <Badge variant="secondary" className="ml-1 text-xs">
                {mockComments.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="attachments" className="flex items-center gap-2">
              <Paperclip className="h-4 w-4" />
              <span className="hidden sm:inline">Attachments</span>
              <Badge variant="secondary" className="ml-1 text-xs">
                {mockAttachments.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Activity</span>
            </TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic-info" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Basic Information
                    </CardTitle>
                    {editingSection !== "basic" && editingSection === null && (
                      <Button variant="ghost" size="sm" onClick={() => handleEdit("basic")}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                    {editingSection === "basic" && (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Title</label>
                      {editingSection === "basic" ? (
                        <Input
                          value={editedData.title || ""}
                          onChange={(e) => updateEditedData("title", e.target.value)}
                          className="bg-background border-border"
                        />
                      ) : (
                        <p className="text-foreground">{task.title}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                      {editingSection === "basic" ? (
                        <Textarea
                          value={editedData.description || ""}
                          onChange={(e) => updateEditedData("description", e.target.value)}
                          className="bg-background border-border min-h-[100px]"
                        />
                      ) : (
                        <p className="text-foreground">{task.description}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
                        {editingSection === "basic" ? (
                          <Select
                            value={editedData.status || task.status}
                            onValueChange={(value) => updateEditedData("status", value)}
                          >
                            <SelectTrigger className="bg-background border-border">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={TASK_STATUS.PENDING}>Pending</SelectItem>
                              <SelectItem value={TASK_STATUS.IN_PROGRESS}>In Progress</SelectItem>
                              <SelectItem value={TASK_STATUS.COMPLETED}>Completed</SelectItem>
                              <SelectItem value={TASK_STATUS.CANCELLED}>Cancelled</SelectItem>
                              <SelectItem value={TASK_STATUS.ON_HOLD}>On Hold</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge variant="outline" className={getStatusColor(task.status)}>
                            {task.status.replace("_", " ")}
                          </Badge>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Priority</label>
                        {editingSection === "basic" ? (
                          <Select
                            value={editedData.priority || task.priority}
                            onValueChange={(value) => updateEditedData("priority", value)}
                          >
                            <SelectTrigger className="bg-background border-border">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={TASK_PRIORITY.LOW}>Low</SelectItem>
                              <SelectItem value={TASK_PRIORITY.MEDIUM}>Medium</SelectItem>
                              <SelectItem value={TASK_PRIORITY.HIGH}>High</SelectItem>
                              <SelectItem value={TASK_PRIORITY.URGENT}>Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge variant="outline" className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Assignment & People */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Assignment & People
                    </CardTitle>
                    {editingSection !== "assignment" && editingSection === null && (
                      <Button variant="ghost" size="sm" onClick={() => handleEdit("assignment")}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                    {editingSection === "assignment" && (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Assignee</label>
                        {editingSection === "assignment" ? (
                          <Select
                            value={editedData.assigneeId || task.assigneeId || ""}
                            onValueChange={(value) => updateEditedData("assigneeId", value)}
                          >
                            <SelectTrigger className="bg-background border-border">
                              <SelectValue placeholder="Select assignee" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user-1">John Smith</SelectItem>
                              <SelectItem value="user-2">Jane Doe</SelectItem>
                              <SelectItem value="user-3">Mike Johnson</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="flex items-center gap-2">
                            {task.assigneeId ? (
                              <>
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${task.assigneeId}`} />
                                  <AvatarFallback>{task.assigneeId.slice(-2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span className="text-foreground">John Smith</span>
                              </>
                            ) : (
                              <span className="text-muted-foreground">Unassigned</span>
                            )}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Supervisor</label>
                        <div className="flex items-center gap-2">
                          {task.supervisorId ? (
                            <>
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${task.supervisorId}`} />
                                <AvatarFallback>{task.supervisorId.slice(-2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <span className="text-foreground">Jane Doe</span>
                            </>
                          ) : (
                            <span className="text-muted-foreground">Not assigned</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Requested By</label>
                        <div className="flex items-center gap-2">
                          {task.requestedById ? (
                            <>
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${task.requestedById}`} />
                                <AvatarFallback>{task.requestedById.slice(-2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <span className="text-foreground">Mike Johnson</span>
                            </>
                          ) : (
                            <span className="text-muted-foreground">Not specified</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timing & Schedule */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Timing & Schedule
                    </CardTitle>
                    {editingSection !== "timing" && editingSection === null && (
                      <Button variant="ghost" size="sm" onClick={() => handleEdit("timing")}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                    {editingSection === "timing" && (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Planned Start</label>
                        <p className="text-foreground">{formatDateTime(task.plannedStartAt)}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Due Date</label>
                        <p className="text-foreground">{formatDateTime(task.dueAt)}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Planned Duration</label>
                        <p className="text-foreground">{task.plannedDurationMin} minutes</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Actual Start</label>
                        <p className="text-foreground">{formatDateTime(task.actualStart)}</p>
                      </div>
                    </div>
                    {task.actualEnd && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Actual End</label>
                          <p className="text-foreground">{formatDateTime(task.actualEnd)}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Actual Duration</label>
                          <p className="text-foreground">{task.actualDurationMin} minutes</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Progress & Results */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="flex items-center gap-2">
                      <CheckSquare className="h-5 w-5" />
                      Progress & Results
                    </CardTitle>
                    {editingSection !== "progress" && editingSection === null && (
                      <Button variant="ghost" size="sm" onClick={() => handleEdit("progress")}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                    {editingSection === "progress" && (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {task.feedbackRating && (
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Feedback Rating</label>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`text-lg ${star <= task.feedbackRating! ? "text-yellow-400" : "text-gray-300"}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{task.feedbackRating}/5</span>
                        </div>
                      </div>
                    )}
                    {task.feedBackNote && (
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Feedback Note</label>
                        {editingSection === "progress" ? (
                          <Textarea
                            value={editedData.feedBackNote || ""}
                            onChange={(e) => updateEditedData("feedBackNote", e.target.value)}
                            className="bg-background border-border"
                          />
                        ) : (
                          <p className="text-foreground">{task.feedBackNote}</p>
                        )}
                      </div>
                    )}
                    {task.jobResultNote && (
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Job Result Note</label>
                        {editingSection === "progress" ? (
                          <Textarea
                            value={editedData.jobResultNote || ""}
                            onChange={(e) => updateEditedData("jobResultNote", e.target.value)}
                            className="bg-background border-border"
                          />
                        ) : (
                          <p className="text-foreground">{task.jobResultNote}</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Location & Property */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Property</label>
                      <p className="font-medium text-foreground">{task.listingNickname}</p>
                      <p className="text-sm text-muted-foreground">{task.listingFullAddress}</p>
                    </div>
                    {task.reservationId && (
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Reservation</label>
                        <p className="text-foreground">{task.reservationId}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* System Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">System Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <p className="text-foreground">{formatDateTime(task.createdAt)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Updated:</span>
                      <p className="text-foreground">{formatDateTime(task.updatedAt)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Task ID:</span>
                      <p className="text-foreground font-mono">{task.id}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      size="sm"
                      onClick={() => setActiveTab("comments")}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      View Comments ({mockComments.length})
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      size="sm"
                      onClick={() => setActiveTab("attachments")}
                    >
                      <Paperclip className="h-4 w-4 mr-2" />
                      View Attachments ({mockAttachments.length})
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      size="sm"
                      onClick={() => setActiveTab("activity")}
                    >
                      <Activity className="h-4 w-4 mr-2" />
                      View Activity Log
                    </Button>
                    <Separator className="my-2" />
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                      size="sm"
                    >
                      Delete Task
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Comments Tab */}
          <TabsContent value="comments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Comments ({mockComments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {mockComments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 p-4 bg-accent/50 rounded-lg">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{comment.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{formatDateTime(comment.timestamp)}</span>
                          </div>
                          <p className="text-sm text-foreground">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="flex gap-2 mt-4">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 min-h-[80px]"
                  />
                  <Button onClick={handleAddComment} size="sm" className="self-end">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attachments Tab */}
          <TabsContent value="attachments" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Paperclip className="h-5 w-5" />
                  Attachments ({mockAttachments.length})
                </CardTitle>
                <Button className="bg-transparent" variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockAttachments.map((attachment) => (
                      <div key={attachment.id} className="border border-border rounded-lg p-4 space-y-3">
                        <div className="aspect-square bg-accent/50 rounded overflow-hidden">
                          <img
                            src={attachment.url || "/placeholder.svg"}
                            alt={attachment.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm truncate" title={attachment.name}>
                            {attachment.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{attachment.size}</p>
                          <p className="text-xs text-muted-foreground">
                            By {attachment.uploadedBy} • {formatDateTime(attachment.uploadedAt)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="flex-1">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Log Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Activity Log */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Activity Log
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {mockActivityLog.map((activity) => (
                        <div key={activity.id} className="flex gap-3 p-3 bg-accent/50 rounded-lg">
                          <div className="mt-1">{getActivityIcon(activity.type)}</div>
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{activity.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">by {activity.user}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">
                                {formatDateTime(activity.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Checklist */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CheckSquare className="h-5 w-5" />
                    Task Checklist ({checklist.filter((item) => item.isCompleted).length}/{checklist.length})
                  </CardTitle>
                  <Dialog open={showAddChecklistDialog} onOpenChange={setShowAddChecklistDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-transparent" variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Checklist Item</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Title</label>
                          <Input
                            value={newChecklistItem.title}
                            onChange={(e) => setNewChecklistItem((prev) => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter checklist item title"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Description</label>
                          <Textarea
                            value={newChecklistItem.description}
                            onChange={(e) => setNewChecklistItem((prev) => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter description (optional)"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="requires-attachment"
                            checked={newChecklistItem.requiresAttachment}
                            onCheckedChange={(checked) =>
                              setNewChecklistItem((prev) => ({ ...prev, requiresAttachment: !!checked }))
                            }
                          />
                          <label htmlFor="requires-attachment" className="text-sm">
                            Requires photo attachment
                          </label>
                        </div>
                        {newChecklistItem.requiresAttachment && (
                          <div>
                            <label className="text-sm font-medium mb-2 block">Attachment Description</label>
                            <Input
                              value={newChecklistItem.attachmentDescription}
                              onChange={(e) =>
                                setNewChecklistItem((prev) => ({ ...prev, attachmentDescription: e.target.value }))
                              }
                              placeholder="Describe what photo is needed"
                            />
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button onClick={handleAddChecklistItem} className="flex-1">
                            Add Item
                          </Button>
                          <Button variant="outline" onClick={() => setShowAddChecklistDialog(false)} className="flex-1">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {checklist.map((item) => (
                        <div key={item.id} className="border border-border rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={item.isCompleted}
                              onCheckedChange={() => handleChecklistToggle(item.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              {editingChecklistItem === item.id ? (
                                <div className="space-y-3">
                                  <Input
                                    defaultValue={item.title}
                                    onBlur={(e) => handleEditChecklistItem(item.id, { title: e.target.value })}
                                    className="font-medium"
                                  />
                                  <Textarea
                                    defaultValue={item.description || ""}
                                    onBlur={(e) => handleEditChecklistItem(item.id, { description: e.target.value })}
                                    className="text-sm"
                                  />
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      checked={item.requiresAttachment}
                                      onCheckedChange={(checked) =>
                                        handleEditChecklistItem(item.id, { requiresAttachment: !!checked })
                                      }
                                    />
                                    <label className="text-sm">Requires photo attachment</label>
                                  </div>
                                  {item.requiresAttachment && (
                                    <Input
                                      defaultValue={item.attachmentDescription || ""}
                                      onBlur={(e) =>
                                        handleEditChecklistItem(item.id, { attachmentDescription: e.target.value })
                                      }
                                      placeholder="Attachment description"
                                      className="text-xs"
                                    />
                                  )}
                                  <div className="flex gap-2">
                                    <Button size="sm" onClick={() => setEditingChecklistItem(null)}>
                                      Done
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4
                                      className={`font-medium ${item.isCompleted ? "line-through text-muted-foreground" : ""}`}
                                    >
                                      {item.title}
                                    </h4>
                                    {item.requiresAttachment && (
                                      <Badge variant="outline" className="text-xs">
                                        <Camera className="h-3 w-3 mr-1" />
                                        Photo Required
                                      </Badge>
                                    )}
                                  </div>
                                  {item.description && (
                                    <p
                                      className={`text-sm mb-2 ${item.isCompleted ? "line-through text-muted-foreground" : "text-muted-foreground"}`}
                                    >
                                      {item.description}
                                    </p>
                                  )}
                                  {item.requiresAttachment && item.attachmentDescription && (
                                    <p className="text-xs text-muted-foreground mb-2">
                                      📷 {item.attachmentDescription}
                                    </p>
                                  )}
                                  {item.isCompleted && item.completedAt && (
                                    <div className="flex items-center gap-1 text-xs text-green-600 mb-2">
                                      <Check className="h-3 w-3" />
                                      Completed {formatDateTime(item.completedAt)}
                                    </div>
                                  )}
                                  <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => setEditingChecklistItem(item.id)}>
                                      <Edit2 className="h-3 w-3 mr-1" />
                                      Edit
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDeleteChecklistItem(item.id)}
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="h-3 w-3 mr-1" />
                                      Delete
                                    </Button>
                                    {item.requiresAttachment && (
                                      <Button variant="outline" size="sm" className="bg-transparent">
                                        <Upload className="h-3 w-3 mr-1" />
                                        Upload Photo
                                      </Button>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
