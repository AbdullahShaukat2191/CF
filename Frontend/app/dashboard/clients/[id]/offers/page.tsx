import { OffersList } from "@/components/offers/OffersList"

export const dynamic = 'force-dynamic'

export default function ClientOffersPage({
  params,
}: {
  params: { id: string }
}) {
  return <OffersList clientId={params.id} />
}

