import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditIntakeForm } from "@/components/credit/CreditIntakeForm"
import { ClientList } from "@/components/clients/ClientList"

export default function CreditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Credit Reports</h1>
        <p className="text-gray-600 mt-2">Manage credit intake and analysis</p>
      </div>
      <ClientList />
    </div>
  )
}

