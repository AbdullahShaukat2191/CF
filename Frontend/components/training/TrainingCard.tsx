import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ArrowRight } from "lucide-react"

interface TrainingCardProps {
  title: string
  description: string
  level: "Basic" | "Intermediate" | "Advanced"
  isPremium?: boolean
  ctaText?: string
  ctaLink?: string
}

export function TrainingCard({
  title,
  description,
  level,
  isPremium = false,
  ctaText = "Learn More",
  ctaLink = "#",
}: TrainingCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <Badge variant="outline" className="mt-1">
                {level}
              </Badge>
            </div>
          </div>
          {isPremium && (
            <Badge variant="warning">Premium</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <Button asChild variant={isPremium ? "default" : "outline"} className="w-full">
          <a href={ctaLink}>
            {ctaText} <ArrowRight className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

