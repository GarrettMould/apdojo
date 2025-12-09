'use client';

import { reviews } from '@/data/reviews'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, GraduationCap } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function ReviewsSection() {
  const [showAll, setShowAll] = useState(false);
  const [selectedReview, setSelectedReview] = useState<typeof reviews[0] | null>(null);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <>
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              <span className="text-blue-500">Success Stories</span> from AP Dojo Users
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how students are achieving their AP goals with our comprehensive study resources
            </p>
          </div>

          {/* Book a Lesson CTA */}
          <div className="text-center mb-12">
            <Link href="/tutoring">
              <Button 
                size="lg"
                className="px-8 py-6 text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Book a Lesson
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {displayedReviews.map((review, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent opacity-50 rounded-bl-full" />
                
                <div className="relative p-6 flex flex-col flex-grow">
                  {/* Quote icon */}
                  <div className="mb-4">
                    <Quote className="w-8 h-8 text-blue-100 group-hover:text-blue-200 transition-colors" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Title */}
                  {review.title && (
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      {review.title}
                    </h3>
                  )}
                  
                  {/* Review text */}
                  <div className="flex-grow mb-4">
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-5">
                      "{review.text}"
                    </p>

                    {review.text.length > 200 && (
                      <button 
                        onClick={() => setSelectedReview(review)}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline mt-2 transition-colors"
                      >
                        Read full review →
                      </button>
                    )}
                  </div>
                  
                  {/* Author info */}
                  <div className="pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                          {review.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {review.author}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <GraduationCap className="w-4 h-4" />
                        <span className="font-medium">{review.lessonCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Show More Button */}
          {reviews.length > 3 && (
            <div className="text-center">
              <Button 
                variant="outline"
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-6 text-base font-semibold border-2 hover:bg-blue-50 hover:border-blue-300 transition-all"
              >
                {showAll ? 'Show Less' : `See All ${reviews.length} Reviews`}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Full Review Dialog */}
      <Dialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Quote className="w-6 h-6 text-blue-500" />
              {selectedReview?.title || 'Student Review'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            {/* Stars */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-6 h-6 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            
            {/* Full review text */}
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 text-base leading-relaxed italic">
                "{selectedReview?.text}"
              </p>
            </div>
            
            {/* Author info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                  {selectedReview?.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {selectedReview?.author}
                  </p>
                  <p className="text-sm text-gray-500">Student</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-full">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">{selectedReview?.lessonCount} lessons</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
