'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, FileText, ListChecks, PenTool, Target, Lock } from 'lucide-react';
import Image from 'next/image';

type TestResults = {
  score: number;       // e.g., 15
  total: number;       // e.g., 20
  percent: number;     // e.g., 75
  belt: string;        // 'White', 'Yellow', etc.
  weakestUnit: string; // The unit with the most wrong answers
};

interface DiagnosticResultsProps {
  results: TestResults;
  onClaimRank: () => void;
  user?: any; // User from auth context
}

export function DiagnosticResults({ results, onClaimRank, user }: DiagnosticResultsProps) {
  const { score, total, percent, belt, weakestUnit } = results;
  const scoreDisplay = `${score}/${total}`;
  
  // Calculate XP earned (100 XP per correct answer)
  const xpEarned = score * 100;
  const xpPercentage = (score / total) * 100;
  
  // Determine belt image and headline based on belt
  const isYellowBelt = belt === 'Yellow Belt';
  // Using belt for both until beltWhite.svg is added
  const beltImage = '/images/belt.svg';
  const headline = isYellowBelt ? 'Excellent Start!' : 'Good Effort, Rookie!';

  // Resource prescription cards
  const resourceCards = [
    {
      icon: FileText,
      title: `${weakestUnit} Visual Cheat Sheet`,
      type: 'Cheat Sheet',
    },
    {
      icon: ListChecks,
      title: `${weakestUnit} MCQ Bank`,
      type: 'MCQ Practice',
    },
    {
      icon: PenTool,
      title: `${weakestUnit} FRQ Practice`,
      type: 'FRQ Practice',
    },
    {
      icon: Target,
      title: 'Relevant Dojo Drill: Mastery Drill',
      type: 'Dojo Drill',
    },
  ];

  return (
    <>
      {/* Stacked Paper Effect - Background layers */}
      <div className="absolute inset-0 -z-10 top-16">
        {/* First layer */}
        <div className="absolute top-2 left-2 right-2 bottom-2 bg-white border-4 border-black rounded-3xl opacity-20 transform rotate-1" />
        {/* Second layer */}
        <div className="absolute top-4 left-4 right-4 bottom-4 bg-white border-4 border-black rounded-3xl opacity-10 transform -rotate-1" />
      </div>

      {/* Results Card */}
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex-1 p-8 sm:p-12 flex flex-col items-center text-center space-y-8 overflow-y-auto"
      >
        {/* Hero Section - Belt Image */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
        >
          <Image
            src={beltImage}
            alt={belt}
            width={192}
            height={192}
            className="w-48 h-auto"
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl font-black uppercase tracking-wide text-gray-900"
        >
          {headline}
        </motion.h1>

        {/* XP Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <div className="relative">
            {/* XP Label */}
            <div className="text-center mb-2">
              <span className="text-lg font-bold text-gray-900">+{xpEarned} XP EARNED</span>
            </div>
            {/* XP Track */}
            <div className="h-6 w-full bg-gray-200 rounded-full border-2 border-black overflow-hidden relative">
              <motion.div
                className="h-full bg-yellow-400 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${xpPercentage}%` }}
                transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          {/* Placement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="bg-white border-2 border-gray-200 rounded-xl p-6"
          >
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Placement
            </p>
            <p className="text-2xl font-bold text-gray-900">{belt}</p>
          </motion.div>

          {/* Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="bg-white border-2 border-gray-200 rounded-xl p-6"
          >
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Score
            </p>
            <p className="text-2xl font-bold text-gray-900">{scoreDisplay}</p>
          </motion.div>

          {/* Weakest Unit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="bg-white border-2 border-gray-200 rounded-xl p-6"
          >
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Weakest Unit
            </p>
            <p className="text-lg font-bold text-gray-900">{weakestUnit}</p>
          </motion.div>
        </div>

        {/* Prescription Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="w-full max-w-2xl space-y-4"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
            Recommended Training for: {weakestUnit}
          </h2>
          
          <div className="space-y-3">
            {resourceCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                  className="bg-white border-2 border-black rounded-xl p-4 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{card.title}</p>
                      <p className="text-sm text-gray-600">{card.type}</p>
                    </div>
                  </div>
                  <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Get Started Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.4 }}
          className="w-full max-w-2xl space-y-3"
        >
          {!user && (
            <p className="text-center text-sm text-gray-600 font-medium">
              Log in to claim your rank and access personalized training recommendations
            </p>
          )}
          <motion.button
            onClick={onClaimRank}
            className="w-full bg-green-600 text-white px-12 py-4 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{user ? 'Get Started' : 'Log In to Get Started'}</span>
            <CheckCircle className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}

