'use client'

import { Check } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { reviews } from '@/data/reviews'
import { Button } from "@/components/ui/button"
import { ReviewsSection } from '@/components/ReviewsSection'
import { useAuthContext } from '@/contexts/AuthContext'
import { useState } from 'react'
import { LoginModal, SignupModal } from '@/components/AuthModals'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CalendlyWidget from '@/components/CalendlyWidget'



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

  const handleBookSession = () => {
    if (!user) {
      setShowLoginModal(true)
      return
    }
    window.location.href = '/availability'
  }

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
          Private Tutoring for AP Economics
        </h1>
        
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
        Get personalized instruction from an experienced AP Economics teacher and tutor who has helped hundreds of students achieve their desired score.
        </p>

        <div className="max-w-3xl mx-auto">
          <Card className="hover:shadow-lg transition-all duration-200 flex flex-col border border-gray-200">
            <div className="grid md:grid-cols-2 divide-x">
              {/* Tutoring Card */}
              <div className="p-6 text-center flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">Single Session</h3>
                  <div className="mt-4">
                    <p className="text-3xl font-bold text-gray-900">$50<span className="text-lg text-gray-500"> /session</span></p>
                  </div>
                  <p className="text-gray-600">Perfect for students who need quick help with specific topics.</p>
                </div>

                <div className="space-y-2 mt-4">
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
              <div className="flex flex-col justify-between p-6 h-full">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                    What's Included in Each Session
                  </h3>
                  <div className="space-y-4">
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

        {/* Calendly Widget */}
        <div className="mt-32">
          <h3 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Booking Your Next Lesson is Simple!</h3>
          <div className="max-w-2xl mx-auto mb-16">
            <div className="space-y-6 flex flex-col items-center">
              <div className="flex items-center gap-6 w-full max-w-md">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <p className="text-lg font-bold text-gray-900">Choose a date and time</p>
              </div>
              <div className="flex items-center gap-6 w-full max-w-md">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">2</span>
                </div>
                <p className="text-lg font-bold text-gray-900">Pay using Stripe</p>
              </div>
              <div className="flex items-center gap-6 w-full max-w-md">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">3</span>
                </div>
                <p className="text-lg font-bold text-gray-900">Receive an automatically generated meeting link via email</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-600">Questions about Booking? Email <a href="mailto:garrett@apdojo.com" className="text-blue-600 hover:text-blue-700 transition-colors">garrett@apdojo.com</a></p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <CalendlyWidget />
          </div>
        </div>
      </div>

      <ReviewsSection />
    </>
  )
} 