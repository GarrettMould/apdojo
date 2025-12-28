'use client';

import React from 'react';
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

  return (
    <div className="inline-flex items-center bg-gray-100 rounded p-1 border border-gray-200">
      <button
        onClick={() => handleSubjectChange('macro')}
        className={`flex-1 px-4 py-2.5 text-sm font-medium rounded transition-all duration-200 ${
          selectedSubject === 'macro'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Macro
      </button>
      <button
        onClick={() => handleSubjectChange('micro')}
        className={`flex-1 px-4 py-2.5 text-sm font-medium rounded transition-all duration-200 ${
          selectedSubject === 'micro'
            ? 'bg-green-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Micro
      </button>
    </div>
  );
}

