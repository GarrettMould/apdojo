'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { dojoDrills, getDrillUnitForSubject } from '@/data/dojoDrills';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
  
  // Shuffle drills for random order
  const shuffledDrills = useMemo(() => {
    const allDrills = Object.values(dojoDrills);
    return shuffleArray(allDrills);
  }, []);

  const handleDrillClick = () => {
    router.push(`/dojo-drills`);
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
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
          Master the <span className="text-blue-500">Interactive</span> activities for the hardest topics.
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Don't just watch. Do. These drills mimic the exact skills you need for the exam.
        </p>
      </div>

      {/* Grid Layout */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {shuffledDrills.map((drill) => {
          const unitNumber = getUnitNumber(drill);
          const subject = getSubject(drill);
          const subjectLabel = getSubjectLabel(drill);
          
          return (
            <motion.button
              key={drill.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 text-left hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 flex flex-col"
              onClick={handleDrillClick}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${
                    subject === 'ap_macroeconomics'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {subjectLabel} - Unit {unitNumber}
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                  <span>{drill.xpReward.total}</span>
                  <span className="inline-flex items-center">
                    <Image
                      src="/images/flame100.png"
                      alt="XP Flame"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {drill.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {drill.description}
              </p>
              <div className="text-sm font-semibold text-blue-600 mt-auto">
                Start Drill →
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}

