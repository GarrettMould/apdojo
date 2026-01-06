'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CourseToggleProps {
  activeTab: 'macro' | 'micro';
  onToggle: (tab: 'macro' | 'micro') => void;
}

export function CourseToggle({ activeTab, onToggle }: CourseToggleProps) {
  return (
    <div className="relative inline-flex items-center bg-blue-500 rounded-full p-1 border-2 border-black">
      {/* Sliding Background Pill */}
      <motion.div
        layoutId="activeTab"
        className="absolute bg-[#FDFBF7] rounded-full top-1 bottom-1"
        style={{
          width: 'calc(50% - 4px)',
          left: activeTab === 'macro' ? '4px' : 'calc(50% + 0px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />

      {/* Macro Button */}
      <button
        onClick={() => onToggle('macro')}
        className="relative z-10 flex-1 px-6 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200"
        style={{
          color: activeTab === 'macro' ? '#3B82F6' : '#FFFFFF',
        }}
      >
        Macro
      </button>

      {/* Micro Button */}
      <button
        onClick={() => onToggle('micro')}
        className="relative z-10 flex-1 px-6 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200"
        style={{
          color: activeTab === 'micro' ? '#3B82F6' : '#FFFFFF',
        }}
      >
        Micro
      </button>
    </div>
  );
}

