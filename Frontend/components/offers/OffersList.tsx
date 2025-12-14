"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OfferCard } from "./OfferCard"
import { OfferSelection } from "./OfferSelection"
import { api } from "@/lib/api"
import { Offer } from "@/types/offer"
import { Sparkles } from "lucide-react"

interface OffersListProps {
  clientId: string
}

export function OffersList({ clientId }: OffersListProps) {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null)

  const loadOffers = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.getOffers(clientId)
      setOffers(data)
    } catch (error) {
      console.error("Failed to load offers", error)
    } finally {
      setLoading(false)
    }
  }, [clientId])

  useEffect(() => {
    loadOffers()
  }, [loadOffers])

  const handleGenerateOffers = async () => {
    setGenerating(true)
    try {
      await api.generateOffers(clientId, "PERSONAL")
      await loadOffers()
    } catch (error) {
      console.error("Failed to generate offers", error)
    } finally {
      setGenerating(false)
    }
  }

  const handleSelectOffer = (offerId: string) => {
    setSelectedOfferId(offerId)
  }

  if (loading) {
    return <div className="text-center py-12">Loading offers...</div>
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Funding Options</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Compare and select from available lending offers
          </p>
        </div>
        {offers.length === 0 && (
          <Button onClick={handleGenerateOffers} disabled={generating} className="w-full sm:w-auto">
            <Sparkles className="h-4 w-4 mr-2" />
            {generating ? "Generating..." : "Generate Offers"}
          </Button>
        )}
      </div>

      {offers.length === 0 ? (
        <Card>
          <CardContent className="py-8 sm:py-12 text-center">
            <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">No Offers Available</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Generate funding options based on the client&apos;s credit profile.
            </p>
            <Button onClick={handleGenerateOffers} disabled={generating} className="w-full sm:w-auto">
              {generating ? "Generating Offers..." : "Generate Offers"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onSelect={handleSelectOffer}
                selected={selectedOfferId === offer.id}
              />
            ))}
          </div>
          {selectedOfferId && (
            <OfferSelection
              offerId={selectedOfferId}
              onSuccess={() => {
                setSelectedOfferId(null)
                loadOffers()
              }}
            />
          )}
        </>
      )}
    </div>
  )
}

