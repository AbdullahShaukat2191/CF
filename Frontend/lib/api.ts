// Placeholder API client for frontend-only implementation
// This will be replaced with actual API calls when backend is integrated

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

class ApiClient {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    // Placeholder: return mock data
    // In production, this would make actual HTTP requests
    return {} as T
  }

  // Auth endpoints
  async login(email: string, password: string) {
    // Mock implementation - check registered users first
    if (typeof window !== "undefined") {
      const users = JSON.parse(localStorage.getItem("registered_users") || "[]")
      const foundUser = users.find((u: any) => u.email === email)
      if (foundUser) {
        return {
          token: "mock-jwt-token",
          user: foundUser,
        }
      }
    }
    // Default fallback user
    return {
      token: "mock-jwt-token",
      user: {
        id: "1",
        email,
        firstName: "John",
        lastName: "Doe",
        role: "org admin",
        organizationId: "org-1",
      },
    }
  }

  async register(data: any) {
    // Mock implementation - in production, this would save to database
    // Store user data with role in localStorage for demo purposes
    if (typeof window !== "undefined") {
      const users = JSON.parse(localStorage.getItem("registered_users") || "[]")
      const newUser = {
        id: `user-${Date.now()}`,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        organizationId: "org-1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      users.push(newUser)
      localStorage.setItem("registered_users", JSON.stringify(users))
    }
    return { success: true }
  }

  // Client endpoints
  async getClients(filters?: any) {
    return []
  }

  async getClient(id: string) {
    return null
  }

  async createClient(data: any) {
    return { id: "new-client-id", ...data }
  }

  async updateClient(id: string, data: any) {
    return { id, ...data }
  }

  // Credit endpoints
  async startCreditProcess(clientId: string, data: any) {
    return { creditReportId: "credit-report-id" }
  }

  async uploadCreditReport(clientId: string, file: File) {
    return { creditReportId: "credit-report-id" }
  }

  async getLatestCreditSummary(clientId: string) {
    return null
  }

  // Offer endpoints
  async generateOffers(clientId: string, mode: string) {
    return []
  }

  async getOffers(clientId: string) {
    return []
  }

  async selectOffer(offerId: string) {
    return { transactionId: "transaction-id" }
  }

  async recordFunding(offerId: string, data: any) {
    return { success: true }
  }

  // Transaction endpoints
  async getTransactions(filters?: any) {
    return []
  }

  async getTransaction(id: string) {
    return null
  }

  // Referral endpoints
  async createReferral(clientId: string, type: string) {
    return { id: "referral-id" }
  }

  async getReferrals(filters?: any) {
    return []
  }

  // Event endpoints
  async getEvents(filters?: any) {
    return []
  }

  async getEvent(id: string) {
    return null
  }

  async createEvent(data: any) {
    return { id: "event-id", ...data }
  }

  async updateEvent(id: string, data: any) {
    return { id, ...data }
  }

  // Admin endpoints
  async getAdminSummary() {
    return {
      totalClients: 0,
      fundableClients: 0,
      totalFundedAmount: 0,
      platformFees: 0,
      partnerShares: 0,
    }
  }
}

export const api = new ApiClient()

