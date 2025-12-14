"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { CheckCircle } from "lucide-react"

interface ReferralFormProps {
  clientId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function ReferralForm({ clientId, onSuccess, onCancel }: ReferralFormProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await api.createReferral(clientId, "CREDIT_REPAIR")
      setSuccess(true)
      setTimeout(() => {
        onSuccess?.()
      }, 2000)
    } catch (error) {
      console.error("Failed to create referral", error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Referral Created</h3>
          <p className="text-gray-600">The client has been referred for credit repair.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Credit Repair Referral</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md bg-blue-50 p-4">
          <p className="text-sm text-blue-900">
            This will create a referral for credit repair services. The client will be routed to the
            credit repair team.
          </p>
        </div>
        <div className="flex gap-4">
          <Button onClick={handleSubmit} disabled={loading} className="flex-1">
            {loading ? "Creating..." : "Create Referral"}
          </Button>
          {onCancel && (
            <Button onClick={onCancel} variant="outline" disabled={loading}>
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

