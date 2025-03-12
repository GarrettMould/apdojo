import Link from 'next/link'
import logo from '../../public/logo.png'
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="py-20 text-center max-w-3xl mx-auto relative">
      <h1 className="text-6xl font-extrabold tracking-tight drop-shadow-sm leading-tight">
      Ace Your <span className="text-blue-500">
        AP Exams
        </span>{' '} with Expert 1-on-1 Tutoring
      </h1>
      <p className="text-xl text-gray-600 mt-6">
      Get personalized AP tutoring, interactive tools, and top-tier study resources—all designed to boost your confidence and scores.
      </p>
      <Button 
        asChild
        size="xl"
        className="mt-10"
      >
        <Link href="/tutoring">
          Book a Lesson
        </Link>
      </Button>
    </section>
  )
} 