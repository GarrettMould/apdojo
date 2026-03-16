'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function SubjectToggle() {
  const { selectedSubject, setSelectedSubject } = useAuthContext();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Ensure component is mounted before using selectedSubject to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use 'macro' as default until mounted to match server render
  const displaySubject = mounted ? selectedSubject : 'macro';

  const handleSubjectChange = (newSubject: 'macro' | 'micro') => {
    // If we're on the blog home, update URL so the page stays in sync
    if (pathname === '/ap-blog-home') {
      setSelectedSubject(newSubject);
      router.replace(`/ap-blog-home?subject=${newSubject}`, { scroll: false });
      return;
    }
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
    <div className="inline-flex items-center bg-stone-50 rounded-xl p-1 border-2 border-black">
      <button
        onClick={() => handleSubjectChange('macro')}
        className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 border-2 ${
          displaySubject === 'macro'
            ? 'bg-blue-500 text-white shadow-sm border-black'
            : 'bg-stone-50 text-gray-700 hover:text-gray-900 border-black'
        }`}
      >
        Macro
      </button>
      <button
        onClick={() => handleSubjectChange('micro')}
        className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 border-2 ${
          displaySubject === 'micro'
            ? 'bg-blue-500 text-white shadow-sm border-black'
            : 'bg-stone-50 text-gray-700 hover:text-gray-900 border-black'
        }`}
      >
        Micro
      </button>
    </div>
  );
}

