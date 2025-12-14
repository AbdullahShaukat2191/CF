"use client"

import { useState, useEffect } from "react"
import { EventCard } from "./EventCard"
import { Button } from "@/components/ui/button"
import { EventForm } from "./EventForm"
import { Event } from "@/types/event"
import { api } from "@/lib/api"
import { Plus } from "lucide-react"

export function EventList() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    setLoading(true)
    try {
      const data = await api.getEvents()
      setEvents(data)
    } catch (error) {
      console.error("Failed to load events", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSuccess = () => {
    setShowForm(false)
    setEditingEvent(null)
    loadEvents()
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Events</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
            Manage webinars, workshops, and training events
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          New Event
        </Button>
      </div>

      {showForm && (
        <EventForm
          event={editingEvent || undefined}
          onSuccess={handleSuccess}
          onCancel={() => {
            setShowForm(false)
            setEditingEvent(null)
          }}
        />
      )}

      {loading ? (
        <div className="text-center py-8 sm:py-12 text-sm sm:text-base">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="text-center py-8 sm:py-12 text-gray-500 text-sm sm:text-base">
          No events found. Create your first event to get started.
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

