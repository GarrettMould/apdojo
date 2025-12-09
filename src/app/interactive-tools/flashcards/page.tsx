"use client"

import Link from 'next/link'
import { ChevronLeft, Loader2 } from 'lucide-react'
import Flashcards from '@/components/Flashcards'
import { useState, useEffect } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { macroFlashcards } from '@/data/macroFlashcards'
import { microFlashcards } from '@/data/microFlashcards'

export default function FlashcardsPage() {
  const { user, userData, loadingUserData } = useAuthContext()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Get effective subject (only for logged-in users)
  const getEffectiveSubject = () => {
    if (user && userData?.selectedSubject) {
      return userData.selectedSubject;
    }
    return null;
  };

  const selectedSubject = getEffectiveSubject();
  const flashcardsData = 
      selectedSubject === 'macro' ? macroFlashcards : 
      selectedSubject === 'micro' ? microFlashcards : 
      null

  const subjectTitle = 
      selectedSubject === 'macro' ? 'Macroeconomics' : 
      selectedSubject === 'micro' ? 'Microeconomics' : 
      ''

  if (!mounted) {
    return null // or a loading state
  }

  // Show loading state while user data is loading (only for logged-in users)
  if (user && loadingUserData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500"/>
        <p className="ml-2">Loading user data...</p>
      </div>
    )
  }

  // Show subject selection prompt if no subject is selected (for logged-in users)
  if (user && !selectedSubject) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">Subject Not Selected</h2>
          <p className="text-gray-600 mb-6">Please select your primary subject on the homepage to view flashcards.</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Go to Homepage
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto mt-4 px-4 py-8">
      {/* Back Button */}
      <div className="max-w-3xl mx-auto px-4 mb-6">
        <Link 
          href="/interactive-tools" 
          className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Interactive Tools
        </Link>
      </div>
      
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl text-center font-extrabold tracking-tight text-gray-900 mt-12 mb-6">
          <span className="text-blue-500">AP {subjectTitle}</span> Flashcards
        </h1>
      </div>
      
      {/* Conditionally render Flashcards only if data is available */}
      {flashcardsData ? (
          <Flashcards 
            key={selectedSubject} 
            flashcards={flashcardsData} 
          />
      ) : (
          // Optional: Fallback if subject selected but no data found (shouldn't happen with current setup)
          <p className="text-center text-gray-500">No flashcards available for {subjectTitle}.</p>
      )}
    </div>
  )
} 