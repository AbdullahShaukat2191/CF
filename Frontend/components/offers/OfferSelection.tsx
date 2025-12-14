"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api"
import { Offer } from "@/types/offer"
import { CheckCircle } from "lucide-react"

interface OfferSelectionProps {
  offerId: string
  onSuccess?: () => void
}

export function OfferSelection({ offerId, onSuccess }: OfferSelectionProps) {
  const [offer, setOffer] = useState<Offer | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [fundingData, setFundingData] = useState({
    loanAmount: "",
    status: "CONFIRMED" as const,
  })

  useEffect(() => {
    // In a real app, fetch offer details
    // For now, we'll use placeholder data
  }, [offerId])

  const handleSelectOffer = async () => {
    setLoading(true)
    try {
      await api.selectOffer(offerId)
      setSuccess(true)
      setTimeout(() => {
        onSuccess?.()
      }, 2000)
    } catch (error) {
      console.error("Failed to select offer", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRecordFunding = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.recordFunding(offerId, {
        loanAmount: parseFloat(fundingData.loanAmount),
        status: fundingData.status,
      })
      setSuccess(true)
      setTimeout(() => {
        onSuccess?.()
      }, 2000)
    } catch (error) {
      console.error("Failed to record funding", error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Offer Selected Successfully</h3>
          <p className="text-gray-600">The transaction has been recorded.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Offer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md bg-blue-50 p-4">
          <p className="text-sm text-blue-900">
            By selecting this offer, you agree to proceed with the funding process. You can record
            the final funding result after the loan is confirmed.
          </p>
        </div>
        <Button onClick={handleSelectOffer} disabled={loading} className="w-full">
          {loading ? "Processing..." : "Confirm Selection"}
        </Button>
        <div className="border-t pt-4">
          <h4 className="font-semibold mb-4">Record Funding Result</h4>
          <form onSubmit={handleRecordFunding} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">Final Loan Amount</Label>
              <Input
                id="loanAmount"
                type="number"
                step="0.01"
                placeholder="25000"
                value={fundingData.loanAmount}
                onChange={(e) =>
                  setFundingData({ ...fundingData, loanAmount: e.target.value })
                }
              />
            </div>
            <Button type="submit" disabled={loading} variant="outline" className="w-full">
              {loading ? "Recording..." : "Record Funding"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

