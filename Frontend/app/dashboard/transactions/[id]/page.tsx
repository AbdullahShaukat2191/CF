"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Transaction } from "@/types/transaction"
import { api } from "@/lib/api"
import { format } from "date-fns"

export default function TransactionDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [loading, setLoading] = useState(true)

  const loadTransaction = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.getTransaction(params.id)
      setTransaction(data)
    } catch (error) {
      console.error("Failed to load transaction", error)
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    loadTransaction()
  }, [loadTransaction])

  if (loading) {
    return <div className="text-center py-12">Loading transaction details...</div>
  }

  if (!transaction) {
    return <div className="text-center py-12 text-gray-500">Transaction not found</div>
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Transaction Details</h1>
        <p className="text-gray-600 mt-2">View complete transaction information</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transaction #{transaction.id.slice(-8)}</CardTitle>
            <Badge variant={transaction.status === "CONFIRMED" ? "success" : "error"}>
              {transaction.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-500">Loan Amount</p>
              <p className="text-2xl font-bold">{formatCurrency(transaction.loanAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Platform Fee</p>
              <p className="text-xl font-semibold">{formatCurrency(transaction.platformFee)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Lender Fee</p>
              <p className="text-xl font-semibold">{formatCurrency(transaction.lenderFee)}</p>
            </div>
            {transaction.partnerShare && (
              <div>
                <p className="text-sm text-gray-500">Partner Share</p>
                <p className="text-xl font-semibold">{formatCurrency(transaction.partnerShare)}</p>
              </div>
            )}
          </div>
          <div className="border-t pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Created</p>
                <p className="font-medium">
                  {format(new Date(transaction.createdAt), "MMM d, yyyy &apos;at&apos; h:mm a")}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Last Updated</p>
                <p className="font-medium">
                  {format(new Date(transaction.updatedAt), "MMM d, yyyy &apos;at&apos; h:mm a")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

