'use client';

import React from 'react';
import type { CourseSubject } from '@/lib/courseSubject';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasAdminRole } from '@/lib/adminAccess';

interface CourseToggleProps {
  activeTab: CourseSubject;
  onToggle: (tab: CourseSubject) => void;
}

/** Matches header subject toggle: rounded-xl rail, font-black, colored active pills with offset shadow. */
export function CourseToggle({ activeTab, onToggle }: CourseToggleProps) {
  const { user, userData } = useAuthContext();
  const canAccessGov = Boolean(user && hasAdminRole(userData));
  return (
    <div className="inline-flex items-center bg-gray-100 rounded-xl p-1 border-2 border-gray-300 shadow-[0_3px_0_0_rgba(209,213,219,1)]">
      <button
        type="button"
        onClick={() => onToggle('macro')}
        className={`px-3 sm:px-4 py-1.5 text-sm font-black rounded-lg transition-all duration-200 ${
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
        className={`px-3 sm:px-4 py-1.5 text-sm font-black rounded-lg transition-all duration-200 ${
          activeTab === 'micro'
            ? 'bg-green-500 text-white border-2 border-green-700 shadow-[0_2px_0_0_rgba(0,0,0,0.4)]'
            : 'bg-gray-100 text-gray-600 hover:text-gray-900'
        }`}
      >
        Micro
      </button>
      {canAccessGov && (
        <button
          type="button"
          onClick={() => onToggle('gov')}
          className={`px-3 sm:px-4 py-1.5 text-sm font-black rounded-lg transition-all duration-200 ${
            activeTab === 'gov'
              ? 'bg-violet-500 text-white border-2 border-violet-800 shadow-[0_2px_0_0_rgba(0,0,0,0.4)]'
              : 'bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
        >
          Gov
        </button>
      )}
    </div>
  );
}
