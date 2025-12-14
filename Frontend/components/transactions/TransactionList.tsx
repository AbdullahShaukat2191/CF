"use client"

import { useState, useEffect, useCallback } from "react"
import { TransactionCard } from "./TransactionCard"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Transaction } from "@/types/transaction"
import { api } from "@/lib/api"
import { Search } from "lucide-react"

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filters, setFilters] = useState<any>({})
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  const loadTransactions = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.getTransactions(filters)
      setTransactions(data)
    } catch (error) {
      console.error("Failed to load transactions", error)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    loadTransactions()
  }, [loadTransactions])

  const filteredTransactions = transactions.filter((transaction) => {
    if (!search) return true
    const searchLower = search.toLowerCase()
    return transaction.id.toLowerCase().includes(searchLower)
  })

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Transactions</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
          View and manage all funding transactions
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1 w-full sm:min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
        <Select
          value={filters.status || "all"}
          onValueChange={(value) =>
            setFilters({ ...filters, status: value === "all" ? undefined : value })
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
            <SelectItem value="DECLINED">Declined</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-8 sm:py-12 text-sm sm:text-base">Loading transactions...</div>
      ) : filteredTransactions.length === 0 ? (
        <div className="text-center py-8 sm:py-12 text-gray-500 text-sm sm:text-base">
          No transactions found.
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  )
}

