"use client"

import { useState, useEffect, useCallback } from "react"
import { ClientCard } from "./ClientCard"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { api } from "@/lib/api"
import { Client, ClientFilters } from "@/types/client"
import Link from "next/link"

export function ClientList() {
  const [clients, setClients] = useState<Client[]>([])
  const [filters, setFilters] = useState<ClientFilters>({})
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  const loadClients = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.getClients(filters)
      setClients(data)
    } catch (error) {
      console.error("Failed to load clients", error)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    loadClients()
  }, [loadClients])

  const handleSearch = () => {
    setFilters({ ...filters, search })
  }

  const filteredClients = clients.filter((client) => {
    if (!search) return true
    const searchLower = search.toLowerCase()
    return (
      client.firstName.toLowerCase().includes(searchLower) ||
      client.lastName.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      client.phone.includes(search)
    )
  })

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Clients</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
            Manage your clients and their credit profiles
          </p>
        </div>
        <Link href="/dashboard/clients/new" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            New Client
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1 w-full sm:min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10 w-full"
            />
          </div>
        </div>
        <Select
          value={filters.path || "all"}
          onValueChange={(value) =>
            setFilters({ ...filters, path: value === "all" ? undefined : value as any })
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Paths" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Paths</SelectItem>
            <SelectItem value="LENDING">Lending</SelectItem>
            <SelectItem value="CREDIT_IMPROVEMENT">Credit Improvement</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.readiness || "all"}
          onValueChange={(value) =>
            setFilters({ ...filters, readiness: value === "all" ? undefined : value as any })
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="fundable">Fundable</SelectItem>
            <SelectItem value="not_fundable">Not Fundable</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-8 sm:py-12 text-sm sm:text-base">Loading clients...</div>
      ) : filteredClients.length === 0 ? (
        <div className="text-center py-8 sm:py-12 text-gray-500 text-sm sm:text-base">
          No clients found. Create your first client to get started.
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      )}
    </div>
  )
}

