"use client"

import { TrainingCard } from "./TrainingCard"
import { Button } from "@/components/ui/button"

const trainingContent = [
  {
    title: "Understanding Credit Scores",
    description: "Learn the basics of credit scores, how they&apos;re calculated, and what factors influence them.",
    level: "Basic" as const,
    isPremium: false,
    ctaText: "Start Learning",
    ctaLink: "#",
  },
  {
    title: "Credit Repair Strategies",
    description: "Advanced techniques for improving your credit score and removing negative items.",
    level: "Intermediate" as const,
    isPremium: true,
    ctaText: "Upgrade to Premium",
    ctaLink: "#",
  },
  {
    title: "Funding Readiness Guide",
    description: "Comprehensive guide to preparing for business and personal funding opportunities.",
    level: "Advanced" as const,
    isPremium: true,
    ctaText: "Upgrade to Premium",
    ctaLink: "#",
  },
  {
    title: "Debt Management Basics",
    description: "Essential strategies for managing and reducing debt effectively.",
    level: "Basic" as const,
    isPremium: false,
    ctaText: "Start Learning",
    ctaLink: "#",
  },
]

export function TrainingList() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Training & Education</h1>
        <p className="text-gray-600 mt-2">
          Access free training content and upgrade to premium courses for advanced learning
        </p>
      </div>

      <div className="rounded-lg bg-primary/10 p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Unlock Premium Content</h2>
        <p className="text-gray-700 mb-4">
          Get access to advanced courses, personalized coaching, and exclusive resources.
        </p>
        <Button variant="default" asChild>
          <a href="#">Upgrade to Premium</a>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trainingContent.map((content, index) => (
          <TrainingCard key={index} {...content} />
        ))}
      </div>
    </div>
  )
}
