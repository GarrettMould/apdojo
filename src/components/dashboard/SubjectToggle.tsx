'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCourseContext, useCourseTheme } from '@/contexts/CourseContext';

export function SubjectToggle() {
  const { currentCourse, switchCourse } = useCourseContext();
  const { primary } = useCourseTheme();

  return (
    <div className="bg-gray-100 rounded-full p-1 flex relative w-fit mx-auto">
      {/* Sliding Background Pill */}
      <motion.div
        layoutId="activeTab"
        className={`absolute inset-y-1 rounded-full ${primary}`}
        style={{
          width: 'calc(50% - 4px)',
          left: currentCourse === 'macro' ? '4px' : 'calc(50% + 4px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />

      {/* AP Macro Button */}
      <button
        onClick={() => switchCourse('macro')}
        className={`relative z-10 px-6 py-2 rounded-full font-semibold transition-colors ${
          currentCourse === 'macro'
            ? 'text-white font-bold'
            : 'text-gray-500 font-medium'
        }`}
      >
        AP Macro
      </button>

      {/* AP Micro Button */}
      <button
        onClick={() => switchCourse('micro')}
        className={`relative z-10 px-6 py-2 rounded-full font-semibold transition-colors ${
          currentCourse === 'micro'
            ? 'text-white font-bold'
            : 'text-gray-500 font-medium'
        }`}
      >
        AP Micro
      </button>
    </div>
  );
}

