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
      <section className="mt-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 text-center mb-10 leading-tight">
            <span className="text-blue-500">Success Stories</span> from AP Dojo Users
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 md:space-y-12">
              {displayedReviews.map((review, index) => (
                <Card 
                  key={index} 
                  className={`w-full md:max-w-lg lg:max-w-xl p-8 h-auto md:h-[300px] flex flex-col border border-black border-2 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl ${
                    index % 2 === 0 
                      ? 'bg-white md:mr-auto'
                      : 'bg-blue-500 text-white md:ml-auto'
                  }`}
                >
                  <div className="flex flex-col flex-grow space-y-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {review.title && (
                      <h3 className={`text-xl font-semibold ${index % 2 === 0 ? 'text-gray-900' : 'text-white'}`}>
                        {review.title}
                      </h3>
                    )}
                    
                    <div>
                      <p className={`italic text-sm line-clamp-4 ${index % 2 === 0 ? 'text-gray-600' : 'text-white/90'}`}>
                        "{review.text}"
                      </p>

                      {review.text.length > 200 && (
                        <button 
                          onClick={() => setSelectedReview(review)}
                          className={`text-sm font-semibold hover:underline mt-1 ${index % 2 === 0 ? 'text-blue-600' : 'text-white'}`}
                        >
                          Read More...
                        </button>
                      )}
                    </div>
                    
                    <div className="flex-grow"></div>

                    <div className={`flex items-center justify-between text-base font-bold ${index % 2 === 0 ? 'text-gray-900' : 'text-white'} mt-auto pt-3`}>
                      <span>{review.author}</span>
                      <span>{review.lessonCount} lessons</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-12 md:mt-16">
            <Button 
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="mt-8"
            >
              {showAll ? 'Show Less' : 'See More Reviews'}
            </Button>
          </div>
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