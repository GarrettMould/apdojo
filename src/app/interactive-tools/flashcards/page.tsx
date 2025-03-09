"use client"

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import Flashcards from '@/components/Flashcards'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from 'react'
import { macroFlashcards } from '@/data/macroFlashcards'
import { microFlashcards } from '@/data/microFlashcards'

export default function FlashcardsPage() {
  const [currentSubject, setCurrentSubject] = useState<'macro' | 'micro'>('macro')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const flashcardsData = currentSubject === 'macro' ? macroFlashcards : microFlashcards
  const subjectTitle = currentSubject === 'macro' ? 'Macroeconomics' : 'Microeconomics'

  if (!mounted) {
    return null // or a loading state
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link 
        href="/interactive-tools" 
        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-8 group"
      >
        <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
        Return to Interactive Tools
      </Link>

      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 text-center mb-6">
          AP {subjectTitle} Flashcards
        </h1>

        <Tabs 
          defaultValue="macro" 
          className="w-full max-w-2xl"
          onValueChange={(value) => setCurrentSubject(value as 'macro' | 'micro')}
        >
          <TabsList className="grid grid-cols-2 w-full h-12 mb-6">
            <TabsTrigger 
              value="macro"
              className="text-lg font-bold flex items-center justify-center h-full data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              AP Macro
            </TabsTrigger>
            <TabsTrigger 
              value="micro"
              className="text-lg font-bold flex items-center justify-center h-full data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              AP Micro
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <Flashcards flashcards={flashcardsData} />
    </div>
  )
} 