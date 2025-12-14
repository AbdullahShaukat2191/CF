import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import { ReadinessCheck } from "@/types/credit"
import { cn } from "@/lib/utils"

interface ReadinessChecklistProps {
  checks: ReadinessCheck[]
}

export function ReadinessChecklist({ checks }: ReadinessChecklistProps) {
  if (checks.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Readiness Checklist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {checks.map((check, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg border",
                check.passed ? "bg-success/10 border-success/20" : "bg-error/10 border-error/20"
              )}
            >
              <div className="flex items-center gap-3">
                {check.passed ? (
                  <CheckCircle className="h-5 w-5 text-success" />
                ) : (
                  <XCircle className="h-5 w-5 text-error" />
                )}
                <span className="font-medium">{check.name}</span>
              </div>
              <div className="text-sm text-gray-600">
                {check.value !== undefined && (
                  <span>
                    {check.value}
                    {check.threshold !== undefined && ` / ${check.threshold}`}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

