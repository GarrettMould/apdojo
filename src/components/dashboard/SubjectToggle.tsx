'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import type { CourseSubject } from '@/lib/courseSubject';
import { hasAdminRole } from '@/lib/adminAccess';
import { AdminSubjectSelect } from '@/components/dashboard/AdminSubjectSelect';
import { useSubjectSwitchNavigation } from '@/hooks/useSubjectSwitchNavigation';

export function SubjectToggle() {
  const { selectedSubject, user, userData } = useAuthContext();
  const isAdmin = Boolean(user && hasAdminRole(userData));
  const [mounted, setMounted] = useState(false);
  const handleSubjectSwitch = useSubjectSwitchNavigation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const displaySubject = mounted ? selectedSubject : 'macro';

  const handleSubjectChange = (newSubject: CourseSubject) => {
    void handleSubjectSwitch(newSubject, displaySubject);
  };

  if (isAdmin) {
    return <AdminSubjectSelect value={displaySubject} onChange={handleSubjectChange} />;
  }

  return (
    <div className="inline-flex items-center bg-stone-50 rounded-xl p-1 border-2 border-black flex-wrap gap-0.5 justify-center">
      <button
        type="button"
        onClick={() => handleSubjectChange('macro')}
        className={`flex-1 min-w-[4.5rem] px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 border-2 ${
          displaySubject === 'macro'
            ? 'bg-blue-500 text-white shadow-sm border-black'
            : 'bg-stone-50 text-gray-700 hover:text-gray-900 border-black'
        }`}
      >
        Macro
      </button>
      <button
        type="button"
        onClick={() => handleSubjectChange('micro')}
        className={`flex-1 min-w-[4.5rem] px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 border-2 ${
          displaySubject === 'micro'
            ? 'bg-emerald-500 text-white shadow-sm border-black'
            : 'bg-stone-50 text-gray-700 hover:text-gray-900 border-black'
        }`}
      >
        Micro
      </button>
    </div>
  );
}
