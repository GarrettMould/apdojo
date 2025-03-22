'use client'

import { Hero } from "@/components/hero"
import LiveTestMockup from '@/components/previews/liveTestMockup'
import VideoLibraryPreview from "@/components/previews/VidLibraryPreview"

export default function Home() {
  return (
    <main>
      <Hero />
      <VideoLibraryPreview />
      <LiveTestMockup />
    </main>
  )
}
