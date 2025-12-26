'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function SubjectToggle() {
  const { selectedSubject, setSelectedSubject } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSubjectChange = (newSubject: 'macro' | 'micro') => {
    // If we're on the unit MCQ practice page, preserve the unit and reload with new subject
    if (pathname === '/unitMCQPracticePage') {
      const unitsParam = searchParams.get('units');
      const modeParam = searchParams.get('mode');
      const lessonIdParam = searchParams.get('lessonId');
      const testMode = searchParams.get('test');
      
      const params = new URLSearchParams();
      params.set('subject', newSubject);
      if (unitsParam) params.set('units', unitsParam);
      if (modeParam) params.set('mode', modeParam);
      if (lessonIdParam) params.set('lessonId', lessonIdParam);
      if (testMode) params.set('test', testMode);
      
      router.push(`/unitMCQPracticePage?${params.toString()}`);
    } else {
      // For other pages, just update the subject
      setSelectedSubject(newSubject);
    }
  };

  const primary = selectedSubject === 'macro' ? 'bg-blue-600' : 'bg-green-600';

  return (
    <div className="bg-gray-100 rounded-full p-1 flex relative w-fit mx-auto">
      {/* Sliding Background Pill */}
      <motion.div
        layoutId="activeTab"
        className={`absolute inset-y-1 rounded-full ${primary}`}
        style={{
          width: 'calc(50% - 4px)',
          left: selectedSubject === 'macro' ? '4px' : 'calc(50% + 4px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />

      {/* AP Macro Button */}
      <button
        onClick={() => handleSubjectChange('macro')}
        className={`relative z-10 px-6 py-2 rounded-full font-semibold transition-colors ${
          selectedSubject === 'macro'
            ? 'text-white font-bold'
            : 'text-gray-500 font-medium'
        }`}
      >
        AP Macro
      </button>

      {/* AP Micro Button */}
      <button
        onClick={() => handleSubjectChange('micro')}
        className={`relative z-10 px-6 py-2 rounded-full font-semibold transition-colors ${
          selectedSubject === 'micro'
            ? 'text-white font-bold'
            : 'text-gray-500 font-medium'
        }`}
      >
        AP Micro
      </button>
    </div>
  );
}

