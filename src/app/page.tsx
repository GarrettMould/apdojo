'use client'

import { Hero } from "@/components/hero"
import LiveTestMockup from '@/components/liveTestMockup'
import { ExamOptionsPreview } from "@/components/previews/ExamOptionsPreview"
import { VideoLibraryPreview } from "@/components/previews/VideoLibraryPreview"
import ExamDayCountdown from '@/components/ExamDayCountdown'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to APDojo</h1>
    </main>
  )
}
