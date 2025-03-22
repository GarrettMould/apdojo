import Link from 'next/link'
import logo from '../../public/logo.png'
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    
      <section className="pt-20 pb-10 text-center max-w-3xl mx-auto relative bg-gradient-to-b from-gray-50 to-white via-white from-5%">
        <h1 className="text-6xl font-extrabold tracking-tight drop-shadow-sm leading-tight">
          Ace Your <span className="text-blue-500">
            AP Exams
          </span>{' '} with Expert 1-on-1 Tutoring
        </h1>
        <p className="text-xl text-gray-600 mt-6">
          Get personalized AP tutoring, interactive tools, and top-tier study resources—all designed to boost your confidence and scores.
        </p>
        <Link 
          href="/tutoring"
          className="inline-block px-8 py-3 mt-10 text-lg font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Book a Lesson
        </Link>
      </section>
    
  )
} 