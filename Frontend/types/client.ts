export interface Client {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  organizationId: string
  createdAt: string
  updatedAt: string
}

export type ClientPath = "LENDING" | "CREDIT_IMPROVEMENT"

export interface ClientFilters {
  organization?: string
  path?: ClientPath
  readiness?: "fundable" | "not_fundable"
  search?: string
}

