'use client'

import { Hero } from "@/components/hero"
import LiveTestMockup from '@/components/liveTestMockup'
import { ExamOptionsPreview } from "@/components/previews/ExamOptionsPreview"
import { VideoLibraryPreview } from "@/components/previews/VideoLibraryPreview"
import ExamDayCountdown from '@/components/ExamDayCountdown'

export default function Home() {
  return (
    <main>
      <Hero />
      <LiveTestMockup />
      <ExamOptionsPreview />
      <ExamDayCountdown />
      <VideoLibraryPreview />
    </main>
  )
}
