'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getBeltProgress, type BeltProgress } from '@/lib/beltSystem';
import { Trophy, Lock } from 'lucide-react';

interface UserBeltProgressProps {
  totalXP: number;
  animateOnChange?: boolean; // If true, animate when XP changes
}

export function UserBeltProgress({ totalXP, animateOnChange = false }: UserBeltProgressProps) {
  const [progress, setProgress] = useState<BeltProgress>(() => getBeltProgress(totalXP));
  const [previousXP, setPreviousXP] = useState(totalXP);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Update progress when XP changes
  useEffect(() => {
    const newProgress = getBeltProgress(totalXP);
    setProgress(newProgress);
    
    // Trigger animation if XP increased
    if (animateOnChange && totalXP > previousXP) {
      setShouldAnimate(true);
      // Reset animation flag after animation completes
      setTimeout(() => setShouldAnimate(false), 1000);
    }
    setPreviousXP(totalXP);
  }, [totalXP, previousXP, animateOnChange]);

  const isMaxRank = progress.nextBelt === null;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">
          Your Rank
        </h3>
      </div>

      {/* Current Belt Info */}
      <div className="mb-3">
        <p className={`text-xs font-bold uppercase ${progress.currentBelt.textColor}`}>
          {progress.currentBelt.name}
        </p>
        <p className="text-[10px] font-medium text-gray-600">
          {progress.currentBelt.label}
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="mb-2">
        <div className="relative">
          {/* Background Bar */}
          <div className="h-4 bg-gray-200 border-2 border-gray-400 rounded-full overflow-hidden shadow-inner">
            {/* Animated Fill Bar - Always Blue */}
            <motion.div
              className="h-full bg-blue-600"
              style={{ width: `${progress.percent}%` }}
              initial={shouldAnimate ? { width: '0%' } : false}
              animate={{ width: `${progress.percent}%` }}
              transition={{
                duration: shouldAnimate ? 1 : 0.3,
                ease: 'easeOut',
              }}
            />
          </div>
        </div>
        {/* XP Until Level Up Text */}
        <div className="mt-1.5 text-center">
          {isMaxRank ? (
            <p className="text-[10px] font-bold text-gray-700">
              🎉 Max Rank Achieved! 🎉
            </p>
          ) : (
            <p className="text-[10px] font-bold text-gray-700">
              {progress.xpToNext !== null && progress.xpToNext > 0 ? (
                <>
                  <span className="text-gray-900">{progress.xpToNext.toLocaleString()}</span> XP until Level Up
                </>
              ) : (
                <span className="text-green-600">Ready to Level Up!</span>
              )}
            </p>
          )}
        </div>
      </div>

      {/* Total XP */}
      <div className="text-center">
        <p className="text-[10px] text-gray-500">
          Total: <span className="font-bold">{totalXP.toLocaleString()}</span> XP
        </p>
      </div>
    </div>
  );
}

