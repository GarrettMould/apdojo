'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

type PlacementResults = {
  score: number;       // 0-5
  total: number;      // 5
  belt: string;        // 'White Belt', 'Yellow Belt', 'Green Belt'
  beltTitle: string;  // 'The Rookie', 'The Apprentice', 'The Expert'
  message: string;
};

interface PlacementResultsProps {
  results: PlacementResults;
}

export function PlacementResults({ results }: PlacementResultsProps) {
  const router = useRouter();
  const [showCalculating, setShowCalculating] = useState(true);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Show calculating animation for 2 seconds
    const timer = setTimeout(() => {
      setShowCalculating(false);
      setShowResults(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClaimBelt = () => {
    // Store results in localStorage and route to signup
    localStorage.setItem('placementResults', JSON.stringify({
      belt: results.belt,
      score: results.score,
      total: results.total,
    }));
    router.push(`/signup?belt=${encodeURIComponent(results.belt)}&score=${results.score}&total=${results.total}`);
  };

  const handleRetake = () => {
    router.push('/diagnostic-test');
  };

  // Determine belt image
  const getBeltImage = () => {
    if (results.belt === 'White Belt') {
      return '/images/beltNewWhite.svg';
    } else if (results.belt === 'Yellow Belt') {
      return '/images/beltNewYellow.svg';
    } else if (results.belt === 'Green Belt') {
      return '/images/beltNewGreen.svg';
    } else if (results.belt === 'Purple Belt') {
      return '/images/beltNewPurple.svg';
    } else if (results.belt === 'Black Belt') {
      return '/images/beltNewBlack.svg';
    } else {
      return '/images/beltNewWhite.svg'; // Default to white
    }
  };

  if (showCalculating) {
    return (
      <div className="relative bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex-1 p-8 sm:p-12 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl font-black text-gray-900 uppercase tracking-wide"
          >
            Calculating...
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-lg text-gray-600"
          >
            Determining your placement
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex-1 p-8 sm:p-12 flex flex-col items-center text-center space-y-8 overflow-y-auto"
    >
      {/* Belt Image */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
      >
        <Image
          src={getBeltImage()}
          alt={results.belt}
          width={192}
          height={192}
          className="w-48 h-auto"
        />
      </motion.div>

      {/* Belt Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-4xl font-black uppercase tracking-wide text-gray-900"
      >
        {results.belt}
      </motion.h1>

      {/* Belt Subtitle */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-2xl font-bold text-gray-700"
      >
        {results.beltTitle}
      </motion.h2>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-xl text-gray-800 max-w-2xl leading-relaxed"
        style={{ fontFamily: 'Permanent Marker, cursive' }}
      >
        {results.message}
      </motion.p>

      {/* Score Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="bg-gray-100 border-2 border-gray-300 rounded-xl p-6"
      >
        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
          Your Score
        </p>
        <p 
          className="text-3xl font-bold text-gray-900"
          style={{ fontFamily: 'Permanent Marker, cursive' }}
        >
          {results.score}/{results.total}
        </p>
      </motion.div>

      {/* Claim Belt Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="w-full max-w-md space-y-4"
      >
        <motion.button
          onClick={handleClaimBelt}
          className="w-full bg-green-600 text-white px-12 py-6 rounded-xl font-black text-xl shadow-lg flex items-center justify-center gap-3 hover:bg-green-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Claim My Belt & Save Progress</span>
        </motion.button>

        {/* Retake Link */}
        <button
          onClick={handleRetake}
          className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
        >
          Retake Placement Test
        </button>
      </motion.div>
    </motion.div>
  );
}

