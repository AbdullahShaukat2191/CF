export type OfferStatus = "PENDING" | "SELECTED" | "FUNDED" | "DECLINED"

export type OfferMode = "PERSONAL" | "BUSINESS"

export interface Offer {
  id: string
  clientId: string
  label: string
  amountMin: number
  amountMax: number
  aprMin: number
  aprMax: number
  termMinMonths: number
  termMaxMonths: number
  estMonthlyPay: number
  mode: OfferMode
  status: OfferStatus
  isSelected: boolean
  createdAt: string
  updatedAt: string
}

