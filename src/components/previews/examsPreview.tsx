'use client';

import { Brain, Bookmark, Check, X } from 'lucide-react';
import underline from "../../../public/images/underline.svg"
import Link from 'next/link';

export function ExamsPreview() {
  // Sample question data
  const sampleQuestion = {
    question: "If the Federal Reserve increases the money supply, which of the following is most likely to occur in the short run?",
    options: [
      "Interest rates will rise and investment will decrease",
      "Interest rates will fall and investment will increase",
      "Interest rates will fall and unemployment will rise",
      "Interest rates will rise and inflation will decrease"
    ]
  };

  // Sample feedback data - for correct answer
  const sampleFeedback = {
    status: 'correct' as const,
    message: "Excellent! When the Fed increases money supply, it leads to lower interest rates as there's more money available for lending. Lower interest rates make borrowing cheaper, which encourages businesses to invest more."
  };

  return (
    <div className="w-full py-12 md:py-24">
      <div className="w-full">
        <div className="max-w-[1400px] mx-auto px-4">
          {/* Update headline for mobile */}
          <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight text-gray-900 text-center mb-8 md:mb-12 leading-[1.2]">
            Instant Feedback.{' '}
            <br></br>
            <span className="text-blue-500">
              Smarter Studying.
            </span>
          </h1>

          <div className="flex flex-col xl:flex-row gap-4 md:gap-8">
            {/* MCQ Question Preview (Left side) */}
            <div className="xl:w-2/3">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-3 md:p-6 h-auto md:h-[520px]">
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 md:p-6 h-full">
                  {/* Question header */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <span className="px-2 md:px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md text-xs md:text-sm font-medium">
                        Question 1 of 60
                      </span>
                      <span className="px-2 md:px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-xs md:text-sm font-medium">
                        Unit 4
                      </span>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <div className="p-1.5 md:p-2 rounded-lg bg-blue-500 text-white">
                        <Brain className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div className="p-1.5 md:p-2 rounded-lg bg-yellow-50 text-yellow-500">
                        <Bookmark className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Question content */}
                  <div className="space-y-4 md:space-y-6">
                    <p className="text-base md:text-lg font-medium font-serif leading-relaxed text-gray-800">
                      {sampleQuestion.question}
                    </p>

                    <div className="space-y-2 md:space-y-3">
                      {sampleQuestion.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`w-full text-left p-3 md:p-4 rounded-lg text-xs md:text-sm font-medium border
                            ${optIndex === 1 
                              ? 'bg-blue-50 text-gray-900 border-blue-200' 
                              : 'bg-gray-50/50 border-transparent'
                            }`}
                        >
                          <div className="flex items-center gap-2 md:gap-3">
                            <span className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 font-medium text-xs md:text-sm">
                              {String.fromCharCode(97 + optIndex)}
                            </span>
                            <span className="flex-1">{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Feedback Preview (Right side) */}
            <div className="xl:w-1/3">
              <div className="w-full bg-white rounded-lg shadow-xl border border-gray-100 h-auto md:h-[520px]">
                <div className="p-4 md:p-6">
                  <div className="flex flex-col space-y-3 md:space-y-4">
                    {/* Question */}
                    <div>
                      <p className="text-xs md:text-sm font-bold text-gray-900">
                        {sampleQuestion.question}
                      </p>
                    </div>

                    {/* Correct Answer */}
                    <div>
                      <div className="p-2 md:p-3 rounded-lg bg-green-50 border border-green-200">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          </div>
                          <p className="font-medium text-xs md:text-sm">
                            b) Interest rates will fall and investment will increase
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Why This Answer */}
                    <div className="rounded-lg border border-gray-200 overflow-hidden">
                      <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900 text-xs md:text-sm">Why This Answer</h3>
                      </div>
                      <div className="p-2 md:p-3">
                        <div className="text-gray-700 text-xs md:text-sm">
                          {sampleFeedback.message}
                        </div>
                      </div>
                    </div>

                    {/* Study Resources */}
                    <div className="rounded-lg border border-blue-200 overflow-hidden">
                      <div className="bg-blue-50 px-3 py-2 border-b border-blue-200">
                        <h3 className="font-semibold text-gray-900 text-xs md:text-sm">Study Concepts</h3>
                      </div>
                      <div className="p-2 md:p-3">
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-xs md:text-sm">
                            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-blue-100 flex items-center justify-center">
                              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-blue-500" />
                            </div>
                            <span className="text-gray-900 font-medium">
                              Video: Monetary Policy Basics
                            </span>
                          </li>
                          <li className="flex items-center gap-2 text-xs md:text-sm">
                            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-blue-100 flex items-center justify-center">
                              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-blue-500" />
                            </div>
                            <span className="text-gray-900 font-medium">
                              Practice: Federal Reserve Tools
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Update View All Practice Tests button */}
          <div className="mt-8 md:mt-12 text-center">
            <Link 
              href="/purchase/exams"
              className="inline-block px-6 md:px-8 py-2.5 md:py-3 text-base md:text-lg font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View All Practice Tests
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}