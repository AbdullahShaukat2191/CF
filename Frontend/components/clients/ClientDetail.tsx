"use client"

import { useState, useEffect, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { Client } from "@/types/client"
import { CreditStatusCard } from "@/components/credit/CreditStatusCard"
import { OffersList } from "@/components/offers/OffersList"
import { ReferralList } from "@/components/referrals/ReferralList"
import { User, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

interface ClientDetailProps {
  clientId: string
}

export function ClientDetail({ clientId }: ClientDetailProps) {
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)

  const loadClient = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.getClient(clientId)
      setClient(data)
    } catch (error) {
      console.error("Failed to load client", error)
    } finally {
      setLoading(false)
    }
  }, [clientId])

  useEffect(() => {
    loadClient()
  }, [loadClient])

  if (loading) {
    return <div className="text-center py-12">Loading client details...</div>
  }

  if (!client) {
    return <div className="text-center py-12 text-gray-500">Client not found</div>
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {client.firstName} {client.lastName}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
            Client profile and credit information
          </p>
        </div>
        <Link href={`/dashboard/clients/${clientId}/edit`} className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">Edit Client</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">
                  {client.firstName} {client.lastName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{client.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{client.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{client.address}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full sm:w-auto flex-wrap">
          <TabsTrigger value="overview" className="flex-1 sm:flex-none">Overview</TabsTrigger>
          <TabsTrigger value="credit" className="flex-1 sm:flex-none">Credit</TabsTrigger>
          <TabsTrigger value="offers" className="flex-1 sm:flex-none">Offers</TabsTrigger>
          <TabsTrigger value="referrals" className="flex-1 sm:flex-none">Referrals</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <CreditStatusCard clientId={clientId} />
        </TabsContent>
        <TabsContent value="credit" className="space-y-4">
          <CreditStatusCard clientId={clientId} showFullReport />
        </TabsContent>
        <TabsContent value="offers" className="space-y-4">
          <OffersList clientId={clientId} />
        </TabsContent>
        <TabsContent value="referrals" className="space-y-4">
          <ReferralList clientId={clientId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

