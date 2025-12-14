export type ReferralType = "CREDIT_REPAIR"

export type ReferralStatus = "PENDING" | "COMPLETED" | "CANCELLED"

export interface Referral {
  id: string
  clientId: string
  organizationId: string
  type: ReferralType
  status: ReferralStatus
  rewardAmount: number
  createdAt: string
  updatedAt: string
}

