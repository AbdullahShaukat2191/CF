export type EventType = "FREE" | "PAID"

export interface Event {
  id: string
  organizationId: string
  title: string
  description: string
  startTime: string
  endTime?: string
  type: EventType
  registrationUrl?: string
  createdAt: string
  updatedAt: string
}

