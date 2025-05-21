'use client'

import VideoLibraryPreview from "@/components/previews/VidLibraryPreview"
import { QuestionsGrid } from "@/components/questionsGrid"
import { ExamsPreview } from "../components/previews/examsPreview"
import { Hero } from "@/components/hero"
import { ReviewsSection } from "@/components/ReviewsSection"
import { useAuthContext } from "@/contexts/AuthContext"
import UserHomePage from "@/app/userHomePage/page"
import { Loader2 } from "lucide-react"

export default function Home() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (user) {
    return <UserHomePage />;
  } else {
    return (
      <main>
        <Hero />
        <ReviewsSection />
      </main>
    )
  }
}
