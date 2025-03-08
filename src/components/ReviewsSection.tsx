'use client';

import { reviews } from '@/data/reviews'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from 'lucide-react'
import { useState } from 'react'
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
      <section className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">What Students Are Saying</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {displayedReviews.map((review, index) => (
            <Card 
              key={index} 
              className={`p-6 h-[320px] flex flex-col ${
                index % 2 === 0 
                  ? 'bg-white' 
                  : 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
              }`}
            >
              <div className="space-y-4 flex flex-col">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {review.title && (
                  <h3 className={`text-xl font-semibold ${
                    index % 2 === 0 ? 'text-gray-900' : 'text-white'
                  }`}>
                    {review.title}
                  </h3>
                )}
                
                <div className="flex-grow">
                  <p className={`italic line-clamp-4 ${
                    index % 2 === 0 ? 'text-gray-600' : 'text-white/90'
                  }`}>
                    "{review.text}"
                  </p>
                  {review.text.length > 200 && (
                    <button 
                      onClick={() => setSelectedReview(review)}
                      className={`text-sm mt-2 ${
                        index % 2 === 0 ? 'text-blue-600' : 'text-white/90'
                      } hover:underline`}
                    >
                      Read More...
                    </button>
                  )}
                </div>
                
                <div className={`flex items-center justify-between text-base font-bold ${
                  index % 2 === 0 ? 'text-gray-900' : 'text-white'
                } mt-auto`}>
                  <span>{review.author}</span>
                  <span>{review.lessonCount} lessons</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="mt-8"
          >
            {showAll ? 'Show Less' : 'See More Reviews'}
          </Button>
        </div>
      </section>

      <Dialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedReview?.title || 'Student Review'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-gray-600 italic text-lg">
              "{selectedReview?.text}"
            </p>
            <div className="flex items-center justify-between text-base font-bold text-gray-900">
              <span>{selectedReview?.author}</span>
              <span>{selectedReview?.lessonCount} lessons</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 