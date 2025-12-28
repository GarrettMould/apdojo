'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function FRQFeedbackDemo() {
  const [showCriteria, setShowCriteria] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    router.push('/unitFRQpracticePage?frqId=1');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onClick={handleCardClick}
      className="w-full max-w-4xl mx-auto bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-10 cursor-pointer hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all"
    >
      {/* Question Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Part B (ii)
        </h3>
        <p className="text-lg text-gray-700 mb-4">
          Draw a correctly labeled graph of the reserve market and show the effect of the monetary policy action identified in part (B) on the policy rate.
        </p>
      </div>

      {/* Student Answer Section */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Your Answer:
        </label>
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 min-h-[120px]">
          <p className="text-gray-800 leading-relaxed">
            The graph shows the reserve market with the demand for reserves (DR) and supply of reserves (SR) curves. 
            The monetary policy action shifts the SR curve to the right, decreasing the policy rate from r1 to r2.
          </p>
        </div>
      </div>

      {/* Feedback Block */}
      <div className="space-y-4">
        {/* AP-Style Score Selector */}
        <div className="rounded-lg p-4 bg-gray-50 border border-gray-200">
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              AP Exam Score
            </p>
            <div className="flex gap-2">
              <button className="flex-1 py-3 px-4 rounded-lg border-2 font-semibold text-lg transition-all bg-white border-gray-300 text-gray-500 hover:border-gray-400">
                0
              </button>
              <button className="flex-1 py-3 px-4 rounded-lg border-2 font-semibold text-lg transition-all bg-white border-gray-300 text-gray-500 hover:border-gray-400">
                1
              </button>
              <button className="flex-1 py-3 px-4 rounded-lg border-2 font-semibold text-lg transition-all bg-green-100 border-green-500 text-green-700">
                2
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-2 text-center">
              Full credit - Meets all criteria
            </p>
          </div>

          {/* Feedback Section */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-800 leading-relaxed">
              Excellent work! Your graph correctly shows the reserve market with properly labeled axes and curves. 
              The shift in the supply of reserves is accurately depicted, and the resulting decrease in the policy rate is clearly indicated.
            </p>
          </div>
        </div>

        {/* Correct Answer Display */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-xs font-semibold text-green-800 mb-2 uppercase tracking-wide">Correct Answer:</p>
          <div className="text-gray-800 leading-relaxed">
            <p className="mb-2">
              The graph should show:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Correctly labeled axes (Quantity of Reserves, Policy Rate)</li>
              <li>Demand for Reserves (DR) curve sloping downward</li>
              <li>Supply of Reserves (SR) curve shifting right</li>
              <li>Policy rate decreasing from r1 to r2</li>
            </ul>
          </div>
        </div>

        {/* Grading Criteria (Expandable) */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowCriteria(!showCriteria);
            }}
            className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
          >
            <span className="text-sm font-medium text-gray-700">View Grading Criteria</span>
            {showCriteria ? (
              <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
            )}
          </button>
          {showCriteria && (
            <div className="p-4 bg-white border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Grading Criteria
              </p>
              <div className="text-sm text-gray-800 leading-relaxed space-y-3">
                <div>
                  <p className="text-gray-800">
                    <span className="font-bold text-gray-900">2 points:</span> Graph shows correctly labeled axes, 
                    both DR and SR curves, and the shift in SR resulting in a decrease in the policy rate.
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-gray-800">
                    <span className="font-bold text-gray-900">1 point:</span> Graph shows some correct elements 
                    but is missing labels, curves, or the correct shift direction.
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-gray-800">
                    <span className="font-bold text-gray-900">0 points:</span> Graph does not meet the criteria 
                    or is not attempted.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

