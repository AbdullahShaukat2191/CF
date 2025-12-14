export enum UserRole {
  CLIENT = "client",
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
  AGENT = "agent",
  ORG_ADMIN = "org admin",
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  organizationId: string
  createdAt: string
  updatedAt: string
}

export interface Organization {
  id: string
  name: string
  branding?: {
    logo?: string
    primaryColor?: string
  }
  feeSplitPct?: number
  createdAt: string
  updatedAt: string
}

