'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { macroFlashcards } from '@/data/macroFlashcards'

export default function Flashcards() {
  // Get random unit and card index
  const getRandomUnit = () => {
    const units = Object.keys(macroFlashcards)
    const randomIndex = Math.floor(Math.random() * units.length)
    return units[randomIndex]
  }

  const getRandomCardIndex = (unitName: string) => {
    const cards = macroFlashcards[unitName]
    return Math.floor(Math.random() * cards.length)
  }

  // Initialize with random values
  const initialUnit = getRandomUnit()
  const [selectedUnit, setSelectedUnit] = useState<string>(initialUnit)
  const [currentCardIndex, setCurrentCardIndex] = useState(getRandomCardIndex(initialUnit))
  const [isFlipped, setIsFlipped] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const units = Object.keys(macroFlashcards)
  const currentCards = selectedUnit ? macroFlashcards[selectedUnit] : []

  const nextCard = () => {
    setIsFlipped(false)
    setCurrentCardIndex((prev) => 
      prev === currentCards.length - 1 ? 0 : prev + 1
    )
  }

  const previousCard = () => {
    setIsFlipped(false)
    setCurrentCardIndex((prev) => 
      prev === 0 ? currentCards.length - 1 : prev - 1
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="relative mb-8 max-w-2xl mx-auto">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between"
        >
          <span className="text-lg font-semibold">
            {selectedUnit || 'Select a Unit'}
          </span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            {units.map((unit) => (
              <button
                key={unit}
                onClick={() => {
                  setSelectedUnit(unit)
                  setIsDropdownOpen(false)
                  setCurrentCardIndex(0)
                  setIsFlipped(false)
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                {unit}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedUnit && (
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={previousCard}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative w-full max-w-2xl aspect-[3/2]">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className={`w-full h-full cursor-pointer transition-all duration-500 [transform-style:preserve-3d] ${
                isFlipped ? '[transform:rotateY(180deg)]' : ''
              }`}
            >
              {/* Front of card */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-center">
                  {currentCards[currentCardIndex]?.term}
                </h3>
              </div>

              {/* Back of card */}
              <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex items-center justify-center">
                <p className="text-lg text-center">
                  {currentCards[currentCardIndex]?.definition}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={nextCard}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {selectedUnit && (
        <div className="mt-6 text-center text-gray-600">
          Card {currentCardIndex + 1} of {currentCards.length}
        </div>
      )}
    </div>
  )
} 