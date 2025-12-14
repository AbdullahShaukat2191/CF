import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Client, ClientPath } from "@/types/client"
import { User } from "lucide-react"

interface ClientCardProps {
  client: Client
  path?: ClientPath
  readinessScore?: number
  isFundable?: boolean
}

export function ClientCard({ client, path, readinessScore, isFundable }: ClientCardProps) {
  return (
    <Link href={`/dashboard/clients/${client.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">
                  {client.firstName} {client.lastName}
                </h3>
                <p className="text-sm text-gray-500">{client.email}</p>
              </div>
            </div>
            {path && (
              <Badge variant={path === "LENDING" ? "success" : "warning"}>
                {path === "LENDING" ? "Lending" : "Credit Repair"}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium">{client.phone}</p>
            </div>
            {readinessScore !== undefined && (
              <div className="text-right">
                <p className="text-gray-500">Readiness Score</p>
                <p className={`font-bold text-lg ${isFundable ? "text-success" : "text-error"}`}>
                  {readinessScore}%
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

