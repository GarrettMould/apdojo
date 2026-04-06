'use client';

import React from 'react';

interface CourseToggleProps {
  activeTab: 'macro' | 'micro';
  onToggle: (tab: 'macro' | 'micro') => void;
}

/** Matches header subject toggle: rounded-xl rail, font-black, blue/green active pills with offset shadow. */
export function CourseToggle({ activeTab, onToggle }: CourseToggleProps) {
  return (
    <div className="inline-flex items-center bg-gray-100 rounded-xl p-1 border-2 border-gray-300 shadow-[0_3px_0_0_rgba(209,213,219,1)]">
      <button
        type="button"
        onClick={() => onToggle('macro')}
        className={`px-4 py-1.5 text-sm font-black rounded-lg transition-all duration-200 ${
          activeTab === 'macro'
            ? 'bg-blue-500 text-white border-2 border-blue-700 shadow-[0_2px_0_0_rgba(0,0,0,0.4)]'
            : 'bg-gray-100 text-gray-600 hover:text-gray-900'
        }`}
      >
        Macro
      </button>
      <button
        type="button"
        onClick={() => onToggle('micro')}
        className={`px-4 py-1.5 text-sm font-black rounded-lg transition-all duration-200 ${
          activeTab === 'micro'
            ? 'bg-green-500 text-white border-2 border-green-700 shadow-[0_2px_0_0_rgba(0,0,0,0.4)]'
            : 'bg-gray-100 text-gray-600 hover:text-gray-900'
        }`}
      >
        Micro
      </button>
    </div>
  );
}
