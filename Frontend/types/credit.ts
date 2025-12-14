export type CreditReportStatus = "PENDING" | "COMPLETED" | "FAILED"

export type CreditVendor = "FAKE" | "PDF" | "ISOFTPULL"

export interface CreditReport {
  id: string
  clientId: string
  status: CreditReportStatus
  vendor: CreditVendor
  rawData?: any
  parsedData?: CreditParsedData
  createdAt: string
  updatedAt: string
}

export interface CreditParsedData {
  scores: {
    summary: number
    experian: number
    equifax: number
    transunion: number
  }
  utilization: {
    overall: number
    revolving: number
  }
  openAccounts: number
  derogatories: number
  accounts?: CreditAccount[]
  inquiries?: CreditInquiry[]
  publicRecords?: PublicRecord[]
}

export interface CreditAccount {
  id: string
  accountName: string
  accountType: string
  balance: number
  limit: number
  status: string
  openedDate: string
}

export interface CreditInquiry {
  id: string
  date: string
  creditor: string
  type: string
}

export interface PublicRecord {
  id: string
  type: string
  date: string
  amount?: number
}

export interface CreditStatus {
  id: string
  clientId: string
  creditReportId: string
  path: "LENDING" | "CREDIT_IMPROVEMENT"
  readinessScore: number
  isFundable: boolean
  checks: ReadinessCheck[]
  createdAt: string
  updatedAt: string
}

export interface ReadinessCheck {
  name: string
  passed: boolean
  value?: string | number
  threshold?: string | number
}

