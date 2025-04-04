"use client"

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import Flashcards from '@/components/Flashcards'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
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
    <div className="max-w-4xl mx-auto mt-4 px-4 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          
          <Tabs defaultValue={currentSubject} onValueChange={(value) => setCurrentSubject(value as 'macro' | 'micro')}>
            <TabsList className="bg-gray-100 p-1 rounded-md">
              <TabsTrigger 
                value="macro" 
                className="px-3 py-1 text-sm rounded-sm data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-700"
              >
                Macro
              </TabsTrigger>
              <TabsTrigger 
                value="micro" 
                className="px-3 py-1 text-sm rounded-sm data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-700"
              >
                Micro
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <h1 className="text-4xl text-center font-extrabold tracking-tight text-gray-900 mt-12 mb-6">
          <span className="text-blue-500">AP {subjectTitle}</span> Flashcards
        </h1>
      </div>
      
      <Flashcards 
        key={currentSubject}
        flashcards={flashcardsData} 
      />
    </div>
  )
} 