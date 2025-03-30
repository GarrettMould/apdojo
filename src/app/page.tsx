'use client'

import { Hero } from "@/components/hero"
import LiveTestMockup from '@/components/previews/liveTestMockup'
import VideoLibraryPreview from "@/components/previews/VidLibraryPreview"
import { QuestionsGrid } from "@/components/questionsGrid"

export default function Home() {
  return (
    <main>
      <Hero />
      <VideoLibraryPreview />
      <QuestionsGrid></QuestionsGrid>
      <LiveTestMockup />
    </main>
  )
}
