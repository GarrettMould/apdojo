'use client'

import { Check, Star, Quote, GraduationCap } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { reviews } from '@/data/reviews'
import { Button } from "@/components/ui/button"
import { useAuthContext } from '@/contexts/AuthContext'
import { useState } from 'react'
import { LoginModal, SignupModal } from '@/components/AuthModals'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Link from 'next/link'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function SetupPaymentForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/availability`,
      }
    })

    if (error) {
      setError(error.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Save Card Details'}
      </button>
    </form>
  )
}

export default function TutoringPage() {
  const { user } = useAuthContext()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [setupIntent, setSetupIntent] = useState<{ clientSecret: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [selectedReview, setSelectedReview] = useState<typeof reviews[0] | null>(null)

  const handleBookSession = () => {
    if (!user) {
      setShowLoginModal(true)
      return
    }
    window.location.href = '/availability'
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setSubmitStatus('idle')
    
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      dates: formData.get('dates'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch(`${window.location.origin}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      try {
        const result = await response.json();
        if (result.success) {
          setSubmitStatus('success')
          form.reset()
        } else {
          throw new Error(result.error || 'Unknown error occurred')
        }
      } catch (parseError) {
        console.error('Response parsing error:', parseError);
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setLoading(false)
    }
  }

  // Display first 3 reviews
  const displayedReviews = reviews.slice(0, 3)

  return (
    <>
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        switchToSignup={() => {
          setShowLoginModal(false)
          setShowSignupModal(true)
        }}
        onAuthSuccess={() => {
          setShowLoginModal(false)
          window.location.href = '/availability'
        }}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        switchToLogin={() => {
          setShowSignupModal(false)
          setShowLoginModal(true)
        }}
        onAuthSuccess={() => {
          setShowSignupModal(false)
          window.location.href = '/availability'
        }}
      />

      {showPaymentModal && setupIntent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add Payment Method</h3>
            <Elements 
              stripe={stripePromise} 
              options={{ clientSecret: setupIntent.clientSecret }}
            >
              <SetupPaymentForm 
                onSuccess={() => window.location.href = '/availability'} 
              />
            </Elements>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12 mt-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 text-center mb-6 leading-tight">
          <span className="text-blue-500">Private Tutoring</span> for AP Economics
        </h1>
        
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
          Get personalized instruction from an experienced AP Economics teacher and tutor who has helped hundreds of students achieve their desired score.
        </p>

        <div className="max-w-3xl mx-auto mb-20">
          <Card className="hover:shadow-lg transition-all duration-200 flex flex-col border border-gray-200">
            <div className="grid md:grid-cols-2 divide-x">
              {/* Tutoring Card */}
              <div className="p-8 text-center flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Single Session</h3>
                  <div className="mt-6">
                  <p className="text-3xl font-bold text-gray-900">$50<span className="text-lg text-gray-500"> /session</span></p>
                </div>
                  <p className="text-gray-600">Perfect for students who need quick help with specific topics.</p>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex items-start gap-3 justify-center">
                    <Check className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">60-minute one-on-one sessions</span>
                  </div>
                  <div className="flex items-start gap-3 justify-center">
                    <Check className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">Flexible scheduling</span>
                  </div>
                  <div className="flex items-start gap-3 justify-center">
                    <Check className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">No long-term commitment</span>
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <div className="flex flex-col justify-between p-8 h-full">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
                What's Included in Each Session
              </h3>
                  <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900">AP College Board Practice Problems</h4>
                        <p className="text-xs text-gray-600 mt-0.5">Work through official AP Economics questions with expert guidance</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900">Personalized Notes and Examples</h4>
                        <p className="text-xs text-gray-600 mt-0.5">Receive custom study materials tailored to your learning style</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900">Strategic Test-Taking Techniques</h4>
                        <p className="text-xs text-gray-600 mt-0.5">Learn proven strategies for maximizing your score on exam day</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Two Column Layout: Form and Reviews */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left Column: Contact Form */}
          <div>
            <h3 className="text-3xl font-extrabold text-gray-900 mb-6">Request a Tutoring Session</h3>
            <Card className="p-6 lg:p-8 border border-gray-200">
              <form 
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-1.5">
                    Name <span className="text-gray-400 font-normal">(required)</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-1.5">
                    Email <span className="text-gray-400 font-normal">(required)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-bold text-gray-900 mb-1.5">Subject</label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-white appearance-none cursor-pointer pr-10"
                    >
                      <option value="AP Macroeconomics">AP Macroeconomics</option>
                      <option value="AP Microeconomics">AP Microeconomics</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="dates" className="block text-sm font-bold text-gray-900 mb-1.5">Preferred Dates & Times</label>
                  <textarea
                    id="dates"
                    name="dates"
                    rows={3}
                    placeholder="Please list your preferred dates and times for tutoring"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-1.5">Additional Notes</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Any specific topics you'd like to cover or questions you have"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {loading ? 'Sending...' : 'Send Request'}
                </button>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <svg 
                        className="w-6 h-6 text-green-600 flex-shrink-0" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                      </svg>
                      <div>
                        <p className="font-semibold text-green-800">Request sent successfully!</p>
                        <p className="text-sm text-green-700">We'll get back to you shortly.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <p className="text-red-700 font-medium">Sorry, there was an error. Please try again.</p>
                  </div>
                )}
              </form>
            </Card>
          </div>

          {/* Right Column: Reviews */}
          <div>
            <h3 className="text-3xl font-extrabold text-gray-900 mb-6">
              <span className="text-blue-500">Success Stories</span> from Students
            </h3>
            <div className="space-y-4">
              {displayedReviews.map((review, index) => (
                <Card 
                  key={index} 
                  className="group relative overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative p-5">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {review.title && (
                      <h4 className="text-base font-bold text-gray-900 mb-2 line-clamp-1">
                        {review.title}
                      </h4>
                    )}
                    
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-4 mb-3">
                      "{review.text}"
                    </p>

                    {review.text.length > 200 && (
                      <button 
                        onClick={() => setSelectedReview(review)}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                      >
                        Read full review →
                      </button>
                    )}

                    <div className="pt-3 border-t border-gray-100 mt-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                            {review.author.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-gray-900 text-sm">{review.author}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <GraduationCap className="w-3.5 h-3.5" />
                          <span className="font-medium">{review.lessonCount} lessons</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/">
                <Button variant="outline" className="w-full">
                  See All Reviews
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Review Dialog */}
      {selectedReview && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedReview(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Quote className="w-6 h-6 text-blue-500" />
                  {selectedReview.title || 'Student Review'}
                </h3>
                <button
                  onClick={() => setSelectedReview(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed italic">
                    "{selectedReview.text}"
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                      {selectedReview.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{selectedReview.author}</p>
                      <p className="text-sm text-gray-500">Student</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-full">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold">{selectedReview.lessonCount} lessons</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
