import { Check } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { reviews } from '@/data/reviews'
import { Button } from "@/components/ui/button"
import { ReviewsSection } from '@/components/ReviewsSection'

export default function TutoringPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-12">
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 text-center mb-6 leading-tight">
        Private Tutoring for AP Economics
      </h1>
      
      <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
        Get personalized instruction from experienced AP Economics tutors. Whether you need help with specific concepts or comprehensive exam preparation, we offer flexible packages to meet your needs.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Single Sessions Card */}
        <Card className="hover:shadow-lg transition-shadow flex flex-col h-full">
          <div className="bg-gradient-to-b from-blue-500 to-blue-600 p-6 rounded-t-lg">
            <h3 className="text-2xl font-bold text-white">Single Sessions</h3>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="space-y-4 flex flex-col h-full">
              <div>
                <p className="text-3xl font-bold">$80<span className="text-lg text-gray-500"> /session</span></p>
                <p className="text-gray-600 mt-4">Perfect for students who need quick help on specific topics.</p>
              </div>
              
              <div className="space-y-3 pt-4 flex-grow">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>60-minute one-on-one sessions</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Flexible scheduling</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>No long-term commitment</span>
                </div>
              </div>

              <button className="w-full mt-6 px-6 py-3 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Book a Session
              </button>
            </div>
          </div>
        </Card>

        {/* Multi-Session Package Card */}
        <Card className="hover:shadow-lg transition-shadow flex flex-col h-full">
          <div className="bg-gradient-to-b from-blue-500 to-blue-600 p-6 rounded-t-lg">
            <h3 className="text-2xl font-bold text-white">Multi-Session Packages</h3>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="space-y-4 flex flex-col h-full">
              <div>
                <div className="space-y-2">
                  <p className="text-lg"><span className="font-bold">3 Sessions:</span> $225 ($75/each)</p>
                  <p className="text-lg"><span className="font-bold">5 Sessions:</span> $350 ($70/each)</p>
                  <p className="text-lg"><span className="font-bold">10 Sessions:</span> $650 ($65/each)</p>
                </div>
                <p className="text-gray-600 mt-4">Best for students wanting consistent tutoring at a lower rate.</p>
              </div>

              <div className="space-y-3 pt-4 flex-grow">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Discounted hourly rates</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Book sessions as needed</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Valid for 6 months</span>
                </div>
              </div>

              <button className="w-full mt-6 px-6 py-3 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Choose Package
              </button>
            </div>
          </div>
        </Card>

        {/* Full AP Exam Prep Card */}
        <Card className="hover:shadow-lg transition-shadow flex flex-col h-full opacity-75 overflow-hidden">
          <div className="bg-gradient-to-b from-gray-400 to-gray-500 p-6 rounded-t-lg">
            <h3 className="text-2xl font-bold text-white">Full AP Exam Prep</h3>
          </div>
          <div className="p-6 pb-0 flex flex-col flex-grow">
            <div className="space-y-4 flex flex-col h-full">
              <div>
                <p className="text-3xl font-bold text-gray-400">$1,000<span className="text-lg text-gray-400"> one-time payment</span></p>
                <p className="text-gray-500 mt-4">Comprehensive preparation for serious AP students.</p>
              </div>

              <div className="space-y-3 pt-4 flex-grow">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500">15 tutoring sessions</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500">Full practice test access</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500">Premium cheat sheets</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500">All interactive tools</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500">Structured study plan</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-blue-600 -mx-6 p-4 rounded-b-lg">
                <p className="text-white font-bold text-center">
                  No longer available for the 2024 - 2025 academic year
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <ReviewsSection />
    </div>
  )
} 