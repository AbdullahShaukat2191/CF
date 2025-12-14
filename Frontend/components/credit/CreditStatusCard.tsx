"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditIntakeForm } from "./CreditIntakeForm"
import { CreditReportView } from "./CreditReportView"
import { ReadinessChecklist } from "./ReadinessChecklist"
import { api } from "@/lib/api"
import { CreditStatus } from "@/types/credit"
import { FileText, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

interface CreditStatusCardProps {
  clientId: string
  showFullReport?: boolean
}

export function CreditStatusCard({ clientId, showFullReport }: CreditStatusCardProps) {
  const [creditStatus, setCreditStatus] = useState<CreditStatus | null>(null)
  const [creditSummary, setCreditSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showIntakeForm, setShowIntakeForm] = useState(false)

  const loadCreditStatus = useCallback(async () => {
    setLoading(true)
    try {
      const summary = await api.getLatestCreditSummary(clientId)
      setCreditSummary(summary)
      if (summary) {
        setShowIntakeForm(false)
      } else {
        setShowIntakeForm(true)
      }
    } catch (error) {
      console.error("Failed to load credit status", error)
      setShowIntakeForm(true)
    } finally {
      setLoading(false)
    }
  }, [clientId])

  useEffect(() => {
    loadCreditStatus()
  }, [loadCreditStatus])

  const handleIntakeSuccess = () => {
    setTimeout(() => {
      loadCreditStatus()
    }, 2000)
  }

  if (loading) {
    return <div className="text-center py-8">Loading credit status...</div>
  }

  if (showIntakeForm || !creditSummary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Credit Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 mb-4">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Credit Report Found</h3>
            <p className="text-gray-600 mb-6">
              Start by initiating a credit pull or uploading a credit report PDF.
            </p>
          </div>
          <CreditIntakeForm clientId={clientId} onSuccess={handleIntakeSuccess} />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Credit Status</CardTitle>
            <Badge
              variant={creditSummary.isFundable ? "success" : "error"}
              className="text-lg px-3 py-1"
            >
              {creditSummary.isFundable ? "Fundable" : "Not Fundable"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Readiness Score</p>
              <p
                className={`text-3xl font-bold ${
                  creditSummary.isFundable ? "text-success" : "text-error"
                }`}
              >
                {creditSummary.readinessScore}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Path</p>
              <Badge variant={creditSummary.path === "LENDING" ? "success" : "warning"}>
                {creditSummary.path === "LENDING" ? "Lending" : "Credit Repair"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500">Credit Score</p>
              <p className="text-2xl font-bold">{creditSummary.score?.summary || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Utilization</p>
              <p className="text-2xl font-bold">{creditSummary.utilization?.overall?.toFixed(1) || "N/A"}%</p>
            </div>
          </div>

          {showFullReport && (
            <>
              <ReadinessChecklist checks={creditSummary.checks || []} />
              <CreditReportView creditData={creditSummary} />
            </>
          )}

          {creditSummary.path === "LENDING" && (
            <Link href={`/dashboard/clients/${clientId}/offers`}>
              <Button className="w-full">View Funding Options</Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

