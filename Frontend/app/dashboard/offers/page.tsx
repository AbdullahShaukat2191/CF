import { Card, CardContent } from "@/components/ui/card"
import { OffersList } from "@/components/offers/OffersList"
import { ClientList } from "@/components/clients/ClientList"

export default function OffersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Lending Marketplace</h1>
        <p className="text-gray-600 mt-2">View and manage funding offers for clients</p>
      </div>
      <ClientList />
    </div>
  )
}

