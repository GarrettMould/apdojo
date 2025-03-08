'use client'
import { useState, use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { redirectToCheckout } from '@/lib/stripe'
import { useAuthContext } from '@/contexts/AuthContext'
import { LoginModal, SignupModal } from '@/components/AuthModals'

type ExamType = 'macro-exams' | 'micro-exams'

interface PageProps {
  params: Promise<{ type: string }>
}

export default function PurchaseExams({ params }: PageProps) {
  const resolvedParams = use(params)
  const { user } = useAuthContext();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [pendingPurchase, setPendingPurchase] = useState<{
    examType: 'macro' | 'micro';
    questionType: 'mcq' | 'frq';
    examNumber: string;
  } | null>(null);
  
  if (resolvedParams.type !== 'macro-exams' && resolvedParams.type !== 'micro-exams') {
    notFound()
  }

  const handlePurchase = async (examType: 'macro' | 'micro', questionType: 'mcq' | 'frq', examNumber: string) => {
    if (!user) {
      setPendingPurchase({ examType, questionType, examNumber });
      setShowLoginModal(true);
      return;
    }

    try {
      await redirectToCheckout(examType, questionType, examNumber);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const handleAuthSuccess = () => {
    if (pendingPurchase) {
      redirectToCheckout(
        pendingPurchase.examType,
        pendingPurchase.questionType,
        pendingPurchase.examNumber
      );
      setPendingPurchase(null);
    }
  };

  const examType = resolvedParams.type === 'macro-exams' ? 'Macroeconomics' : 'Microeconomics'
  const oppositeType = resolvedParams.type === 'macro-exams' ? 'micro-exams' : 'macro-exams'
  const oppositeExamType = resolvedParams.type === 'macro-exams' ? 'Microeconomics' : 'Macroeconomics'
  const titleColorClass = resolvedParams.type === 'macro-exams' ? 'text-blue-600' : 'text-green-600'
  const oppositeTitleColorClass = resolvedParams.type === 'macro-exams' ? 'text-green-600' : 'text-blue-600'

  return (
    <>
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        switchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
        onAuthSuccess={handleAuthSuccess}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        switchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
        onAuthSuccess={handleAuthSuccess}
      />

      <div className="container max-w-4xl mx-auto px-4 py-16">
      <div className="mb-16">
          <h1 className="text-6xl font-extrabold tracking-tight text-center leading-tight">
            <span className={titleColorClass}>AP {examType}</span>
            <br />
            Practice Exams
        </h1>
        <p className="text-gray-600 text-center mt-4 text-lg max-w-2xl mx-auto">
          Comprehensive exam preparation trusted by top-performing students nationwide. Created by AP® Economics experts and veteran teachers.
        </p>
      </div>

      {/* Trust badges section */}
        <div className="flex justify-center gap-8 mb-20">
          <div className="bg-blue-50/80 p-6 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
        <div className="text-center">
              <div className="text-3xl font-bold mb-1">15,000+</div>
              <div className="text-sm text-blue-900 tracking-wide font-medium">Students Served</div>
            </div>
        </div>
          <div className="bg-blue-50/80 p-6 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
        <div className="text-center">
              <div className="text-3xl font-bold mb-1">94%</div>
              <div className="text-sm text-blue-900 tracking-wide font-medium">Score 4 or 5</div>
            </div>
        </div>
          <div className="bg-blue-50/80 p-6 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
        <div className="text-center">
              <div className="text-3xl font-bold  mb-1">100%</div>
              <div className="text-sm text-blue-900 tracking-wide font-medium">Money-Back Guarantee</div>
            </div>
        </div>
      </div>

      <div className="mb-20">
          <h2 className="text-5xl font-extrabold tracking-tight mb-12 text-center leading-tight">Why Top Schools and Students Choose AP Dojo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* AP Experts Benefit */}
            <div className="text-center bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-blue-50 p-3 rounded-full w-fit mx-auto mb-4">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
              <h3 className="font-semibold text-lg mb-2 min-h-[3rem] flex items-center justify-center">Created by AP® Experts</h3>
              <p className="text-gray-600">Crafted by experienced AP® Economics teachers and exam writers to align with the AP® Exam</p>
          </div>

          {/* Study Plan Benefit */}
            <div className="text-center bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-blue-50 p-3 rounded-full w-fit mx-auto mb-4">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
              <h3 className="font-semibold text-lg mb-2 min-h-[3rem] flex items-center justify-center">Personalized Study Plan</h3>
              <p className="text-gray-600">Tailored learning paths based on your exam results, to ensure you get the most out of your study time</p>
          </div>

          {/* Video Explanations Benefit */}
            <div className="text-center bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-blue-50 p-3 rounded-full w-fit mx-auto mb-4">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
              <h3 className="font-semibold text-lg mb-2 min-h-[3rem] flex items-center justify-center">Video Explanations</h3>
              <p className="text-gray-600">Clear, detailed video solutions to help you master the material in Study Mode</p>
          </div>
        </div>
      </div>

        <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-extrabold tracking-tight text-gray-900">Multiple Choice Exams (MCQs)</h3>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-sm">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-blue-700">College Board® Aligned</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            {[1, 2, 3].map((num, index) => (
              <div key={`mcq-${num}`} className="mb-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex">
                  {/* Left side - Price and Purchase */}
                  <div className="w-1/4 bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-l-lg flex flex-col justify-between">
                    <div className="text-center">
                      <span className="text-4xl font-bold text-white">$20</span>
                    </div>
                    <button 
                      onClick={() => handlePurchase(resolvedParams.type === 'macro-exams' ? 'macro' : 'micro', 'mcq', num.toString())}
                      className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Purchase
                    </button>
                  </div>

                  {/* Right side - Exam Info */}
                  <div className="w-3/4 p-6 flex justify-between items-center">
                    <div>
                      <div className="inline-block bg-gray-100 px-3 py-1.5 rounded-lg">
                        <h4 className="text-2xl font-bold text-blue-600">MCQ Exam {num}</h4>
                      </div>
                      <p className="text-gray-500 mt-2">60 questions • 70 minutes</p>
                      
                      <div className="flex items-center gap-4 mt-4">
                      {/* Study Plan Icon + Tooltip */}
                      <div className="relative group">
                          <div className="bg-blue-50 p-2 rounded-lg">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                          Includes personalized study plan
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>

                      {/* Video Explanation Icon + Tooltip */}
                      <div className="relative group">
                          <div className="bg-blue-50 p-2 rounded-lg">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                          Detailed video explanations for each question
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                    <Link 
                      href={`/preview/${resolvedParams.type}/mcq/${num}`}
                      className="px-6 py-3 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Preview
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-extrabold tracking-tight text-gray-900">Free Response Exams (FRQs)</h3>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-sm">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-blue-700">College Board® Aligned</span>
            </div>
          </div>

            {[1, 2, 3].map((num) => (
            <div key={`frq-${num}`} className="mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex">
                {/* Left side - Price and Purchase */}
                <div className="w-1/4 bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-l-lg flex flex-col justify-between">
                  <div className="text-center">
                    <span className="text-4xl font-bold text-white">$10</span>
                  </div>
                  <button 
                    onClick={() => handlePurchase(resolvedParams.type === 'macro-exams' ? 'macro' : 'micro', 'frq', num.toString())}
                    className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Purchase
                  </button>
                </div>

                {/* Right side - Exam Info */}
                <div className="w-3/4 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="inline-block bg-gray-100 px-3 py-1.5 rounded-lg">
                        <h4 className="text-2xl font-bold text-blue-600">FRQ Exam {num}</h4>
                      </div>
                      <p className="text-gray-500 mt-2">3 questions • 60 minutes</p>

                      <ul className="space-y-2 mt-4 text-gray-600">
                  {num === 1 && (
                    <>
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        AD-AS Model Analysis
                      </li>
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        Bank Balance Sheets
                      </li>
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        Exchange Rate Systems
                      </li>
                    </>
                  )}
                  {num === 2 && (
                    <>
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        Monetary Policy
                      </li>
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        International Trade
                      </li>
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        Phillips Curve Analysis
                      </li>
                    </>
                  )}
                  {num === 3 && (
                    <>
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        Fiscal Policy
                      </li>
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        Economic Growth
                      </li>
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        Financial Markets
                      </li>
                    </>
                  )}
                </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                      {/* Study Plan Icon + Tooltip */}
                      <div className="relative group">
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                          Includes personalized study plan
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>

                      {/* Video Explanation Icon + Tooltip */}
                      <div className="relative group">
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                          Detailed video explanations for each question
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            ))}
        </div>

       

        {/* Bottom commitment section with gradient */}
        <div className="bg-gray-50 rounded-xl p-8 mt-12 text-center">
          <h4 className="text-xl font-semibold mb-4">Our Commitment to Excellence</h4>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every exam is crafted by experienced AP® Economics teachers and reviewed by our academic board. We maintain the highest standards to ensure your student's success.
          </p>
          <div className="mt-6 flex justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              30-day money-back guarantee
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure payment
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Priority support
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
} 