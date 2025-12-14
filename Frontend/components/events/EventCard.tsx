import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Event } from "@/types/event"
import { Calendar, ExternalLink } from "lucide-react"
import { format } from "date-fns"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(event.startTime), "MMM d, yyyy &apos;at&apos; h:mm a")}</span>
            </div>
          </div>
          <Badge variant={event.type === "FREE" ? "success" : "warning"}>
            {event.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        {event.registrationUrl && (
          <Button asChild variant="outline" className="w-full">
            <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
              Register <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

