import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import Flashcards from '@/components/Flashcards'

export default function FlashcardsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link 
        href="/interactive-tools" 
        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-8 group"
      >
        <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
        Return to Interactive Tools
      </Link>

      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 text-center mb-12">
        AP Marcoeconomics Flashcards
      </h1>
      
      <Flashcards />
    </div>
  )
} 