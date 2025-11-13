'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamically import the Calendly component
const CalendlyWidget = dynamic(
  () => import('@/components/CalendlyWidget'),
  { ssr: false }
)

export default function AvailabilityPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 mt-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
          Find the Perfect Time for Your Next Lesson
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Schedule a tutoring session that fits your schedule. Select a time slot below to book your lesson.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <Suspense fallback={<div className="h-[700px] flex items-center justify-center">Loading calendar...</div>}>
          <CalendlyWidget />
        </Suspense>
      </div>
    </div>
  )
} 