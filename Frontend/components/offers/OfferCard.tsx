import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Offer } from "@/types/offer"
import { DollarSign, Calendar, Percent } from "lucide-react"

interface OfferCardProps {
  offer: Offer
  onSelect?: (offerId: string) => void
  selected?: boolean
}

export function OfferCard({ offer, onSelect, selected }: OfferCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className={selected ? "border-primary border-2" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">{offer.label}</h3>
            {offer.isSelected && (
              <Badge variant="success" className="mt-2">Selected</Badge>
            )}
          </div>
          <Badge variant="outline">Lender #{offer.id.slice(-4)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <DollarSign className="h-4 w-4" />
              Loan Amount
            </div>
            <p className="text-xl font-bold">
              {formatCurrency(offer.amountMin)} - {formatCurrency(offer.amountMax)}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Percent className="h-4 w-4" />
              APR Range
            </div>
            <p className="text-xl font-bold">
              {offer.aprMin}% - {offer.aprMax}%
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Calendar className="h-4 w-4" />
              Term
            </div>
            <p className="text-lg font-semibold">
              {offer.termMinMonths} - {offer.termMaxMonths} months
            </p>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Est. Monthly Payment</div>
            <p className="text-lg font-semibold">{formatCurrency(offer.estMonthlyPay)}</p>
          </div>
        </div>
        {onSelect && !offer.isSelected && (
          <Button
            onClick={() => onSelect(offer.id)}
            className="w-full"
            variant={selected ? "default" : "outline"}
          >
            {selected ? "Selected" : "Select Offer"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

