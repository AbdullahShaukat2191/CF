import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Transaction } from "@/types/transaction"
import { Receipt, DollarSign } from "lucide-react"
import { format } from "date-fns"

interface TransactionCardProps {
  transaction: Transaction
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "success"
      case "DECLINED":
        return "error"
      case "PENDING":
        return "warning"
      default:
        return "default"
    }
  }

  return (
    <Link href={`/dashboard/transactions/${transaction.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Receipt className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Transaction #{transaction.id.slice(-8)}</h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(transaction.createdAt), "MMM d, yyyy")}
                </p>
              </div>
            </div>
            <Badge variant={getStatusVariant(transaction.status) as any}>
              {transaction.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Loan Amount</p>
              <p className="font-semibold text-lg">{formatCurrency(transaction.loanAmount)}</p>
            </div>
            <div>
              <p className="text-gray-500">Platform Fee</p>
              <p className="font-semibold">{formatCurrency(transaction.platformFee)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

