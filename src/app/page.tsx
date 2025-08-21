'use client'

import VideoLibraryPreview from "@/components/previews/VidLibraryPreview"
import { QuestionsGrid } from "@/components/questionsGrid"
import { ExamsPreview } from "../components/previews/examsPreview"
import { Hero } from "@/components/hero"
import { ReviewsSection } from "@/components/ReviewsSection"
import UserHomePage from "@/app/userHomePage/page"

export default function Home() {
  // MVP: Always show UserHomePage regardless of authentication status
  return <UserHomePage />;
}
