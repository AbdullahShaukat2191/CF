"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, DollarSign, FileText, Percent } from "lucide-react"
import { api } from "@/lib/api"

interface AdminSummary {
  totalClients: number
  fundableClients: number
  totalFundedAmount: number
  platformFees: number
  partnerShares: number
}

export function StatsDashboard() {
  const [summary, setSummary] = useState<AdminSummary>({
    totalClients: 0,
    fundableClients: 0,
    totalFundedAmount: 0,
    platformFees: 0,
    partnerShares: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSummary()
  }, [])

  const loadSummary = async () => {
    setLoading(true)
    try {
      const data = await api.getAdminSummary()
      setSummary(data)
    } catch (error) {
      console.error("Failed to load admin summary", error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return <div className="text-center py-12">Loading statistics...</div>
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
          Platform overview and statistics
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalClients}</div>
            <p className="text-xs text-muted-foreground">All active clients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fundable Clients</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.fundableClients}</div>
            <p className="text-xs text-muted-foreground">
              {summary.totalClients > 0
                ? `${Math.round((summary.fundableClients / summary.totalClients) * 100)}% of total`
                : "0% of total"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funded</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.totalFundedAmount)}</div>
            <p className="text-xs text-muted-foreground">All time funding</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Fees</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.platformFees)}</div>
            <p className="text-xs text-muted-foreground">Total platform revenue</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Platform Fees</span>
              <span className="font-semibold">{formatCurrency(summary.platformFees)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Partner Shares</span>
              <span className="font-semibold">{formatCurrency(summary.partnerShares)}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total Revenue</span>
                <span className="text-lg font-bold">
                  {formatCurrency(summary.platformFees + summary.partnerShares)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Fundable Rate</span>
                <span className="font-semibold">
                  {summary.totalClients > 0
                    ? `${Math.round((summary.fundableClients / summary.totalClients) * 100)}%`
                    : "0%"}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-success"
                  style={{
                    width: `${
                      summary.totalClients > 0
                        ? (summary.fundableClients / summary.totalClients) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average Funding</span>
                <span className="font-semibold">
                  {summary.fundableClients > 0
                    ? formatCurrency(summary.totalFundedAmount / summary.fundableClients)
                    : formatCurrency(0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

