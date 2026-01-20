'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function FRQFeedbackDemo() {
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
      className="w-full h-full flex flex-col bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-10 cursor-pointer hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all"
    >
      {/* Question Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Part B
        </h3>
        <p className="text-lg text-gray-700 mb-4">
          Identify one specific monetary policy action the central bank would take to restore full employment.
        </p>
      </div>

      {/* Student Answer Section - Text */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Your Answer:
        </label>
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 min-h-[120px]">
          <p className="text-gray-800 leading-relaxed">
            Decrease the interest on reserves (IOR) rate.
          </p>
        </div>
      </div>

      {/* Feedback Block */}
      <div className="space-y-4 flex-grow flex flex-col">
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
              <button className="flex-1 py-3 px-4 rounded-lg border-2 font-semibold text-lg transition-all bg-green-100 border-green-500 text-green-700">
                1
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-2 text-center">
              Full credit - Correctly identifies a monetary policy action
            </p>
          </div>

          {/* Feedback Section */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-800 leading-relaxed">
              Perfect! You correctly identified decreasing the interest on reserves (IOR) rate as a monetary policy action that would help restore full employment. This action increases the money supply and lowers interest rates, stimulating investment and aggregate demand.
            </p>
          </div>
        </div>

        {/* Correct Answer Display */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-xs font-semibold text-green-800 mb-2 uppercase tracking-wide">Correct Answer:</p>
          <div className="text-gray-800 leading-relaxed">
            <p>
              Decrease the interest on reserves (IOR) rate.
            </p>
            <p className="mt-2 text-sm text-gray-700">
              Other acceptable answers include: lowering the policy rate, engaging in open market operations to purchase government bonds, or other expansionary monetary policy actions.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
