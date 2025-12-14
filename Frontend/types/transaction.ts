export type TransactionStatus = "PENDING" | "CONFIRMED" | "DECLINED" | "CANCELLED"

export interface Transaction {
  id: string
  clientId: string
  offerId: string
  organizationId: string
  loanAmount: number
  platformFee: number
  lenderFee: number
  partnerShare?: number
  status: TransactionStatus
  createdAt: string
  updatedAt: string
}

