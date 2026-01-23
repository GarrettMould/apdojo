'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface SeasonPassModalProps {
  subject: 'macro' | 'micro';
  onClose: () => void;
}

export function SeasonPassModal({ subject, onClose }: SeasonPassModalProps) {
  useEffect(() => {
    // Allow Escape key to close the modal
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const isGreen = subject === 'micro';
  const config = {
    badge: subject === 'macro' ? 'AP MACRO SEASON PASS' : 'AP MICRO SEASON PASS',
    price: 29,
    features: [
      { text: 'Full Practice Exams based on 2026 AP ' + (subject === 'macro' ? 'Macro' : 'Micro') + ' CED', key: 'Full Practice Exams' },
      { text: 'Endless AP-Style MCQ Bank', key: 'Endless' },
      { text: 'AI-Graded FRQs with Graphing Help', key: 'AI-Graded' },
      { text: 'Interactive Graphing Simulators', key: 'Interactive Graphing Simulators' },
      { text: 'Interactive Cheat Sheets + Downloadable PDFs', key: 'Interactive Cheat Sheets' },
      { text: 'Upload Notes to Create Quizzes', key: 'Upload Notes' },
    ],
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex items-center justify-center p-4 overflow-y-auto"
        onClick={(e) => {
          // Close when clicking outside the modal content
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 max-w-xl w-full relative my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          <div className="space-y-4">
            {/* Badge */}
            <div>
              <h3 className="text-3xl font-black text-black uppercase tracking-wide">
                {subject === 'macro' ? 'AP MACRO ' : 'AP MICRO '}
                <span className={isGreen ? 'text-green-600' : 'text-blue-600'}>SEASON PASS</span>
              </h3>
            </div>

            {/* Price Section */}
            <div className="space-y-1">
              <p className="text-base font-semibold text-gray-700">
                One-time payment of
              </p>
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-extrabold ${isGreen ? 'text-green-600' : 'text-blue-600'}`}>
                  ${config.price}
                </span>
                <span className="text-base text-gray-400 line-through ml-1">
                  $39
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Valid until June 30th, 2026
              </p>
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs font-medium text-gray-600">
                500+ Students Trained
              </span>
            </div>

            {/* What's Included */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-black">
                What's Included:
              </h2>
              <ul className="space-y-2">
                {config.features.map((benefit, index) => {
                  const parts = benefit.text.split(benefit.key);
                  return (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isGreen ? 'text-green-600' : 'text-blue-600'}`} />
                      <span className="text-sm font-semibold text-gray-900">
                        {parts[0]}
                        <strong>{benefit.key}</strong>
                        {parts[1]}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href={`/purchase/season-pass?courseType=${subject}`}
                className={`block w-full text-white font-extrabold text-lg py-4 px-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 uppercase tracking-wide text-center ${
                  isGreen 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                onClick={() => onClose()}
              >
                UNLOCK INSTANT ACCESS
              </Link>

              {/* Trust Elements */}
              <p className="text-xs text-gray-500 text-center mt-3 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-gray-400" />
                100% Money-Back Guarantee
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
