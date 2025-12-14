"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ReferralForm } from "./ReferralForm"
import { Referral } from "@/types/referral"
import { api } from "@/lib/api"
import { UserCheck, Plus } from "lucide-react"
import { format } from "date-fns"

interface ReferralListProps {
  clientId?: string
}

export function ReferralList({ clientId }: ReferralListProps) {
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const loadReferrals = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.getReferrals(clientId ? { clientId } : {})
      setReferrals(data)
    } catch (error) {
      console.error("Failed to load referrals", error)
    } finally {
      setLoading(false)
    }
  }, [clientId])

  useEffect(() => {
    loadReferrals()
  }, [loadReferrals])

  const handleSuccess = () => {
    setShowForm(false)
    loadReferrals()
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "success"
      case "CANCELLED":
        return "error"
      default:
        return "warning"
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Referrals</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage credit repair referrals</p>
        </div>
        {clientId && (
          <Button onClick={() => setShowForm(true)} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create Referral
          </Button>
        )}
      </div>

      {showForm && clientId && (
        <ReferralForm clientId={clientId} onSuccess={handleSuccess} onCancel={() => setShowForm(false)} />
      )}

      {loading ? (
        <div className="text-center py-8 sm:py-12 text-sm sm:text-base">Loading referrals...</div>
      ) : referrals.length === 0 ? (
        <Card>
          <CardContent className="py-8 sm:py-12 text-center">
            <UserCheck className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">No Referrals Found</h3>
            <p className="text-sm sm:text-base text-gray-600">
              {clientId
                ? "Create a referral to get started."
                : "No referrals have been created yet."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {referrals.map((referral) => (
            <Card key={referral.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Credit Repair</h3>
                      <p className="text-sm text-gray-500">
                        {format(new Date(referral.createdAt), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(referral.status) as any}>
                    {referral.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="text-gray-500">Reward Amount</p>
                  <p className="font-semibold">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(referral.rewardAmount)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

