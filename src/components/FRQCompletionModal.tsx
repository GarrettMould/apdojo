'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FRQCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  xpEarned: number;
  score: number;
  totalPoints: number;
  message: string;
}

export function FRQCompletionModal({
  isOpen,
  onClose,
  xpEarned,
  score,
  totalPoints,
  message,
}: FRQCompletionModalProps) {
  const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 pointer-events-auto relative overflow-hidden"
            >
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="relative z-10">
                {/* Trophy Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  }}
                  className="flex justify-center mb-6"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-extrabold text-center text-gray-900 mb-2"
                >
                  FRQ Complete!
                </motion.h2>

                {/* Message */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-gray-600 mb-6 text-lg"
                >
                  {message}
                </motion.p>

                {/* Score Display */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 mb-6 shadow-lg"
                >
                  <div className="text-center text-white">
                    <p className="text-sm font-semibold mb-2 opacity-90">Your Score</p>
                    <p className="text-4xl font-extrabold mb-1">
                      {score}/{totalPoints}
                    </p>
                    <p className="text-lg font-semibold opacity-90">
                      {percentage}%
                    </p>
                  </div>
                </motion.div>

                {/* XP Earned */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-center gap-3 mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200"
                >
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">XP Earned</p>
                    <p className="text-2xl font-extrabold text-yellow-600">
                      +{xpEarned.toLocaleString()}
                    </p>
                  </div>
                </motion.div>

                {/* Close Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 text-lg rounded-lg shadow-lg"
                  >
                    Continue Practicing
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

