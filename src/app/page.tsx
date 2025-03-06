'use client'

import { Hero } from "@/components/hero"
import LiveTestMockup from '@/components/previews/liveTestMockup'
import { ExamOptionsPreview } from "@/components/previews/ExamOptionsPreview"
import ExamDayCountdown from '@/components/ExamDayCountdown'

export default function Home() {
  return (
    <main>
      <Hero />
      <LiveTestMockup />
      <ExamOptionsPreview />
      <ExamDayCountdown />
    </main>
  )
}
