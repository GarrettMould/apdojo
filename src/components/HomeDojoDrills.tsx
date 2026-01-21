'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { dojoDrills, getDrillUnitForSubject } from '@/data/dojoDrills';
import { useRouter } from 'next/navigation';
import { DojoDrillPreview } from '@/components/DojoDrillPreview';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasValidSeasonPass } from '@/lib/utils';

// Framer Motion variants for staggered animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function HomeDojoDrills() {
  const router = useRouter();
  const { user, userData, selectedSubject } = useAuthContext();
  
  // Shuffle drills for random order
  const shuffledDrills = useMemo(() => {
    const allDrills = Object.values(dojoDrills);
    return shuffleArray(allDrills);
  }, []);

  // Show a curated set on the homepage (2 rows = 4 cards)
  const featuredDrills = useMemo(() => shuffledDrills.slice(0, 4), [shuffledDrills]);

  const isProCustomer = useMemo(() => {
    if (!user || !userData) return false;
    const subjectKey = selectedSubject === 'macro' ? 'macro' : 'micro';
    return hasValidSeasonPass(userData, subjectKey);
  }, [user, userData, selectedSubject]);

  const handleStart = (drillId: string) => {
    if (!isProCustomer) {
      const subjectKey = selectedSubject === 'macro' ? 'macro' : 'micro';
      router.push(`/purchase/season-pass?courseType=${subjectKey}`);
      return;
    }
    router.push(`/dojo-drills?drill=${drillId}`);
  };

  // Helper to get subject label
  const getSubjectLabel = (drill: typeof shuffledDrills[0]): string => {
    if (drill.subjects && drill.subjects.length > 0) {
      return drill.subjects[0] === 'ap_macroeconomics' ? 'Macro' : 'Micro';
    }
    return drill.subject === 'ap_macroeconomics' ? 'Macro' : 'Micro';
  };

  // Helper to get subject for styling
  const getSubject = (drill: typeof shuffledDrills[0]): 'ap_macroeconomics' | 'ap_microeconomics' => {
    if (drill.subjects && drill.subjects.length > 0) {
      return drill.subjects[0];
    }
    return drill.subject;
  };

  // Helper to get unit number for display
  const getUnitNumber = (drill: typeof shuffledDrills[0]): number => {
    const subject = getSubject(drill);
    const unit = getDrillUnitForSubject(drill, subject);
    if (unit !== null) return unit;
    return drill.unit || 1;
  };

  if (shuffledDrills.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-gray-600">No Dojo Drills available yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="w-full py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-5">
          Master the <span className="text-blue-500">Interactive</span> activities for the hardest topics.
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Don't just watch. Do. These drills mimic the exact skills you need for the exam.
        </p>
      </div>

      {/* Grid Layout */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {featuredDrills.map((drill) => {
          return (
            <motion.div
              key={drill.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="h-full cursor-pointer"
              onClick={() => handleStart(drill.id)}
            >
              <DojoDrillPreview
                title={drill.title}
                description={drill.description}
                xpReward={drill.xpReward.total}
                difficulty="Medium"
                onStart={() => handleStart(drill.id)}
                isLocked={!isProCustomer}
                progress={null}
                buttonText={isProCustomer ? undefined : 'Join the Dojo'}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Show more link after 2 rows */}
      {shuffledDrills.length > 4 && (
        <div className="mt-16 text-center">
          <button
            onClick={() => router.push('/dojo-drills')}
            className="text-xl sm:text-2xl font-black text-blue-600 hover:text-blue-700 underline underline-offset-4"
          >
            Show more →
          </button>
        </div>
      )}
    </div>
  );
}

