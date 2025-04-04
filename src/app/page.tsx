'use client'

import VideoLibraryPreview from "@/components/previews/VidLibraryPreview"
import { QuestionsGrid } from "@/components/questionsGrid"
import { ExamsPreview } from "../components/previews/examsPreview"
import { Hero } from "@/components/hero"

export default function Home() {
  return (
    <main>
      <Hero></Hero>
      <QuestionsGrid></QuestionsGrid>
      <ExamsPreview></ExamsPreview>
      <VideoLibraryPreview />
    </main>
  )
}
