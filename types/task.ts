export enum TASK_STATUS {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  ON_HOLD = "ON_HOLD",
}

export enum TASK_PRIORITY {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum TASK_TYPE {
  MAINTENANCE = "MAINTENANCE",
  CLEANING = "CLEANING",
  INSPECTION = "INSPECTION",
  GUEST_SERVICE = "GUEST_SERVICE",
  ADMINISTRATIVE = "ADMINISTRATIVE",
}

export interface Task {
  id: string
  tenantId: string
  title: string
  description: string
  status: TASK_STATUS
  assignmentStatusCode: string
  assigneeId?: string
  supervisorId?: string
  requestedById?: string

  taskTypeCode?: TASK_TYPE
  subcategoryCode?: string
  priority: TASK_PRIORITY
  taskSourceCode?: string
  listingId: string
  reservationId?: string
  plannedStartAt?: string
  plannedDurationMin?: number
  dueAt?: string
  actualStart?: string
  actualEnd?: string
  actualDurationMin?: string
  isPaused?: boolean
  pausedAt?: string
  totalPausedDurationMin?: number
  feedbackRating?: number
  feedBackNote?: string
  jobResultNote?: string
  hasFollowup?: boolean
  createdBy?: number
  updatedBy?: number
  createdAt?: string
  updatedAt?: string

  listingNickname?: string
  listingFullAddress?: string
  comments?: Comment[]
  attachments?: string[]
}
