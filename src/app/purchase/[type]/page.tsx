'use client'
import { useState, use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { redirectToCheckout } from '@/lib/stripe'
import { useAuthContext } from '@/contexts/AuthContext'
import { LoginModal, SignupModal } from '@/components/AuthModals'
import { Lock } from 'lucide-react'

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


     {/*<div className="mb-20">
          <h2 className="text-5xl font-extrabold tracking-tight mb-12 text-center leading-tight">Why Top Schools and Students Choose AP Dojo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
            <div className="text-center bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-blue-50 p-3 rounded-full w-fit mx-auto mb-4">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
              <h3 className="font-semibold text-lg mb-2 min-h-[3rem] flex items-center justify-center">Created by AP® Experts</h3>
              <p className="text-gray-600">Crafted by experienced AP® Economics teachers and exam writers to align with the AP® Exam</p>
          </div>

         
            <div className="text-center bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-blue-50 p-3 rounded-full w-fit mx-auto mb-4">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
              <h3 className="font-semibold text-lg mb-2 min-h-[3rem] flex items-center justify-center">Personalized Study Plan</h3>
              <p className="text-gray-600">Tailored learning paths based on your exam results, to ensure you get the most out of your study time</p>
          </div>

          
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
      </div>*/}

        <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-8">Multiple Choice Exams (MCQs)</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div key={`mcq-${num}`} className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden ${num > 1 ? 'opacity-75' : ''}`}>
                <div className={`${num === 1 ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'} p-6`}>
                  <div className="flex items-center justify-center gap-2">
                  <h4 className="text-xl font-bold text-white text-center">MCQ Exam {num}</h4>
                    {num > 1 && <Lock className="w-5 h-5 text-white" />}
                  </div>
                  <p className="text-blue-100 text-center mt-2">60 questions • 70 minutes</p>
                </div>
                
                <div className="p-6">
                    <Link 
                    href={num === 1 ? `/preview/${resolvedParams.type}/mcq/${num}` : '#'}
                    className={`w-full px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                      num === 1 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 transition-colors' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    >
                      Start Exam
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-8">Free Response Exams (FRQs)</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div key={`frq-${num}`} className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden ${num > 1 ? 'opacity-75' : ''}`}>
                <div className={`${num === 1 ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'} p-6`}>
                  <div className="flex items-center justify-center gap-2">
                  <h4 className="text-xl font-bold text-white text-center">FRQ Exam {num}</h4>
                    {num > 1 && <Lock className="w-5 h-5 text-white" />}
                  </div>
                  <p className={`${num === 1 ? 'text-blue-100' : 'text-gray-200'} text-center mt-2`}>3 questions • 60 minutes</p>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-2 mb-6 text-gray-600">
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

                    <Link 
                    href={num === 1 ? `/preview/${resolvedParams.type}/frq/${num}` : '#'}
                    className={`w-full px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                      num === 1 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 transition-colors' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    >
                      Start Exam
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                </div>
              </div>
            ))}
          </div>
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