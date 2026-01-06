'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CourseToggleProps {
  activeTab: 'macro' | 'micro';
  onToggle: (tab: 'macro' | 'micro') => void;
}

export function CourseToggle({ activeTab, onToggle }: CourseToggleProps) {
  return (
    <div className="relative inline-flex items-center bg-gray-100 rounded-full p-0.5 shadow-sm">
      {/* Sliding Background Pill */}
      <motion.div
        layoutId="activeTab"
        className="absolute bg-white rounded-full shadow-sm"
        style={{
          width: 'calc(50% - 2px)',
          height: 'calc(100% - 4px)',
          left: activeTab === 'macro' ? '2px' : 'calc(50% + 0px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
      />

      {/* Macro Button */}
      <button
        onClick={() => onToggle('macro')}
        className="relative z-10 flex-1 px-5 py-1.5 text-sm font-medium rounded-full transition-colors duration-200"
        style={{
          color: activeTab === 'macro' ? '#3B82F6' : '#6B7280',
        }}
      >
        Macro
      </button>

      {/* Micro Button */}
      <button
        onClick={() => onToggle('micro')}
        className="relative z-10 flex-1 px-5 py-1.5 text-sm font-medium rounded-full transition-colors duration-200"
        style={{
          color: activeTab === 'micro' ? '#3B82F6' : '#6B7280',
        }}
      >
        Micro
      </button>
    </div>
  );
}

