'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getBeltProgress } from '@/lib/beltSystem';
import { getSubjectXP } from '@/hooks/useUserProgress';
import { UserData } from '@/hooks/useAuth';

interface DojoDrillResultsProps {
  xpEarned: number;
  userData: UserData | null;
  selectedSubject: 'macro' | 'micro';
  onExit: () => void;
}

export function DojoDrillResults({ xpEarned, userData, selectedSubject, onExit }: DojoDrillResultsProps) {
  // Calculate current XP and progress
  const currentXP = useMemo(() => {
    return getSubjectXP(userData, selectedSubject);
  }, [userData, selectedSubject]);

  const xpBefore = currentXP - xpEarned;
  const progressBefore = getBeltProgress(xpBefore);
  const progressAfter = getBeltProgress(currentXP);

  // Determine belt image
  const getBeltImage = () => {
    const belt = progressAfter.currentBelt.name;
    if (belt === 'White Belt') {
      return '/images/beltNewWhite.svg';
    } else if (belt === 'Yellow Belt') {
      return '/images/beltNewYellow.svg';
    } else if (belt === 'Green Belt') {
      return '/images/beltNewGreen.svg';
    } else if (belt === 'Purple Belt') {
      return '/images/beltNewPurple.svg';
    } else if (belt === 'Black Belt') {
      return '/images/beltNewBlack.svg';
    } else {
      return '/images/beltNewWhite.svg';
    }
  };

  const isMaxRank = progressAfter.nextBelt === null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex-1 px-8 sm:px-12 pt-0 pb-8 sm:pb-12 flex flex-col items-center text-center space-y-8 overflow-y-auto"
    >
      {/* Stacked Paper Effect - Background layers */}
      <div className="absolute inset-0 -z-10 top-16">
        {/* First layer */}
        <div className="absolute top-2 left-2 right-2 bottom-2 bg-white border-4 border-black rounded-3xl opacity-20 transform rotate-1" />
        {/* Second layer */}
        <div className="absolute top-4 left-4 right-4 bottom-4 bg-white border-4 border-black rounded-3xl opacity-10 transform -rotate-1" />
      </div>

      {/* Belt Image with Title */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
        className="flex flex-col items-center gap-2"
      >
        <Image
          src={getBeltImage()}
          alt={progressAfter.currentBelt.name}
          width={192}
          height={192}
          className="w-48 h-auto"
        />
        {/* Belt Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-4xl font-black uppercase tracking-wide text-gray-900"
        >
          {progressAfter.currentBelt.name}
        </motion.h1>
        {/* Belt Subtitle - Close to belt, italic grey */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-xl italic text-gray-500"
        >
          {progressAfter.currentBelt.label}
        </motion.h2>
      </motion.div>

      {/* XP Earned Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-gray-100 border-2 border-gray-300 rounded-xl p-6 w-full max-w-md"
      >
        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
          XP Earned
        </p>
        <p className="text-4xl font-black text-gray-900">
          +{xpEarned.toLocaleString()}
        </p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="w-full max-w-md space-y-3"
      >
        <div className="text-left">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide mb-2">
            Progress to {isMaxRank ? 'Max Rank' : progressAfter.nextBelt?.name || 'Next Belt'}
          </h3>
        </div>
        
        {/* Progress Bar Container */}
        <div className="relative">
          {/* Background Bar */}
          <div className="h-6 bg-gray-200 border-2 border-gray-400 rounded-full overflow-hidden shadow-inner">
            {/* Animated Fill Bar */}
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ width: `${progressBefore.percent}%` }}
              animate={{ width: `${progressAfter.percent}%` }}
              transition={{
                duration: 1,
                ease: 'easeOut',
              }}
            />
          </div>
        </div>
        
        {/* XP Until Level Up Text */}
        <div className="text-center">
          {isMaxRank ? (
            <p className="text-sm font-bold text-gray-700">
              🎉 Max Rank Achieved! 🎉
            </p>
          ) : (
            <p className="text-sm font-bold text-gray-700">
              {progressAfter.xpToNext !== null && progressAfter.xpToNext > 0 ? (
                <>
                  <span className="text-gray-900">{progressAfter.xpToNext.toLocaleString()}</span> XP until {progressAfter.nextBelt?.name}
                </>
              ) : (
                <span className="text-green-600">Ready to Level Up!</span>
              )}
            </p>
          )}
        </div>
      </motion.div>

      {/* Exit Drill Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="w-full max-w-md mb-8"
      >
        <motion.button
          onClick={onExit}
          className="w-full bg-blue-600 text-white px-12 py-6 rounded-xl font-black text-xl shadow-lg flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Exit Drill</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

