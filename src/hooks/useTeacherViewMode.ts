'use client';

import { useState, useEffect } from 'react';

export function useTeacherViewMode() {
  const [viewMode, setViewMode] = useState<'tutor' | 'student'>('tutor');
  const [isTeacher, setIsTeacher] = useState(false);

  // Load view mode preference from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedViewMode = localStorage.getItem('teacherViewMode') as 'tutor' | 'student' | null;
      if (savedViewMode) {
        setViewMode(savedViewMode);
      }
    }
  }, []);

  // Save view mode preference to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && isTeacher) {
      localStorage.setItem('teacherViewMode', viewMode);
    }
  }, [viewMode, isTeacher]);

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'tutor' ? 'student' : 'tutor');
  };

  return {
    viewMode,
    setViewMode,
    toggleViewMode,
    setIsTeacher,
  };
}
