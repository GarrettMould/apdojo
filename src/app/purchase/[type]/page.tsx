'use client'
import { useState, use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'

type ExamType = 'macro-exams' | 'micro-exams'

interface PageProps {
  params: Promise<{ type: string }>
}

export default function PurchaseExams({ params }: PageProps) {
  const resolvedParams = use(params)
  
  if (resolvedParams.type !== 'macro-exams' && resolvedParams.type !== 'micro-exams') {
    notFound()
  }

  const examType = resolvedParams.type === 'macro-exams' ? 'Macroeconomics' : 'Microeconomics'
  const oppositeType = resolvedParams.type === 'macro-exams' ? 'micro-exams' : 'macro-exams'
  const oppositeExamType = resolvedParams.type === 'macro-exams' ? 'Microeconomics' : 'Macroeconomics'
  const titleColorClass = resolvedParams.type === 'macro-exams' ? 'text-blue-600' : 'text-green-600'
  const oppositeTitleColorClass = resolvedParams.type === 'macro-exams' ? 'text-green-600' : 'text-blue-600'

  return (
    <div className="container max-w-6xl mx-auto px-4 py-16">
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-center">
          <span className={titleColorClass}>AP {examType}</span> Practice Exams
        </h1>
        <p className="text-gray-600 text-center mt-4 text-lg max-w-2xl mx-auto">
          Comprehensive exam preparation trusted by top-performing students nationwide. Created by AP® Economics experts and veteran teachers.
        </p>
      </div>

      {/* Trust badges section */}
      <div className="flex justify-center gap-12 mb-20">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">15,000+</div>
          <div className="text-gray-600 mt-1">Students Served</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">94%</div>
          <div className="text-gray-600 mt-1">Score 4 or 5</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">100%</div>
          <div className="text-gray-600 mt-1">Money-Back Guarantee</div>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-semibold mb-12 text-center">Why Top Schools and Students Choose AP Dojo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* AP Experts Benefit */}
          <div className="bg-gray-50 p-8 rounded-xl text-center">
            <div className="bg-blue-50 p-3 rounded-full w-fit mx-auto mb-4">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Created by AP® Experts</h3>
            <p className="text-gray-600">Crafted by experienced AP® Economics teachers and exam writers</p>
          </div>

          {/* Study Plan Benefit */}
          <div className="bg-gray-50 p-8 rounded-xl text-center">
            <div className="bg-blue-50 p-3 rounded-full w-fit mx-auto mb-4">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Personalized Study Plan</h3>
            <p className="text-gray-600">Tailored learning paths that adapt to your progress</p>
          </div>

          {/* Video Explanations Benefit */}
          <div className="bg-gray-50 p-8 rounded-xl text-center">
            <div className="bg-blue-50 p-3 rounded-full w-fit mx-auto mb-4">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Video Explanations</h3>
            <p className="text-gray-600">Clear, detailed video solutions for every question</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold">Multiple Choice Exams (MCQs)</h3>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-sm">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-blue-700">College Board® Aligned</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            {[1, 2, 3].map((num, index) => (
              <div key={`mcq-${num}`}>
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">MCQ Exam {num}</h4>
                      <p className="text-gray-500 text-sm mt-1">60 questions • 70 minutes</p>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-sm text-sm font-semibold">$15</span>
                      
                      {/* Study Plan Icon + Tooltip */}
                      <div className="relative group">
                        <div className="bg-blue-50 p-1.5 rounded-sm cursor-help">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        <div className="bg-blue-50 p-1.5 rounded-sm cursor-help">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <div className="flex items-center gap-3">
                    <button className="bg-gray-50 text-gray-900 px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors font-medium border border-gray-200">
                      Purchase
                    </button>
                    <Link 
                      href={`/preview/${resolvedParams.type}/mcq/${num}`}
                      className="px-6 py-2.5 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Preview
                    </Link>
                  </div>
                </div>
                {index < 2 && <div className="border-b border-gray-100" />}
              </div>
            ))}
          </div>
          
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Free Response Exams (FRQs)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[1, 2, 3].map((num) => (
              <div 
                key={`frq-${num}`}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">FRQ Exam {num}</h4>
                    <p className="text-gray-500 text-sm mt-1">3 questions • 60 minutes</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-sm text-sm font-semibold">
                    $10
                  </span>
                </div>
                <ul className="space-y-1.5 text-sm text-gray-600 mb-6 mt-4">
                  {num === 1 && (
                    <>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        AD-AS Model Analysis
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        Bank Balance Sheets
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        Exchange Rate Systems
                      </li>
                    </>
                  )}
                  {num === 2 && (
                    <>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        Monetary Policy
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        International Trade
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        Phillips Curve Analysis
                      </li>
                    </>
                  )}
                  {num === 3 && (
                    <>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        Fiscal Policy
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        Economic Growth
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        Financial Markets
                      </li>
                    </>
                  )}
                </ul>
                <button className="w-full bg-gray-50 text-gray-900 px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors font-medium border border-gray-200">
                  Purchase
                </button>
              </div>
            ))}
          </div>
          
        </div>

        <div className="text-center text-sm text-gray-600 mt-8">
          <p>Questions? Email support@apdojo.com</p>
          <p className="mt-2">30-day money-back guarantee</p>
        </div>

        {/* Bottom commitment section with gradient */}
        <div className="bg-gray-50 rounded-xl p-8 mt-12 text-center">
          <h4 className="text-xl font-semibold mb-4">Our Commitment to Excellence</h4>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every exam is crafted by experienced AP® Economics teachers and reviewed by our academic board. We maintain the highest standards to ensure your student's success.
          </p>
          <div className="mt-6 flex justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              30-day money-back guarantee
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure payment
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Priority support
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 