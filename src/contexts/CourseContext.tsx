'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useAuthContext } from './AuthContext';
import type { CourseSubject } from '@/lib/courseSubject';

interface CourseContextValue {
  currentCourse: CourseSubject;
  switchCourse: (course: CourseSubject) => void;
}

const CourseContext = createContext<CourseContextValue | null>(null);

function CourseProvider({ children, initialSubject }: { children: ReactNode; initialSubject?: CourseSubject }) {
  const { selectedSubject, setSelectedSubject } = useAuthContext();

  // Use initialSubject if provided, otherwise use selectedSubject from AuthContext
  const currentCourse = initialSubject || selectedSubject;

  // Sync CourseContext with useAuth's selectedSubject
  // This maintains backward compatibility for components using CourseContext
  const switchCourse = (course: CourseSubject) => {
    setSelectedSubject(course);
  };

  return (
    <CourseContext.Provider value={{ currentCourse, switchCourse }}>
      {children}
    </CourseContext.Provider>
  );
}

function useCourseContext(): CourseContextValue {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext must be used within CourseProvider');
  }
  return context;
}

// Theme helper hook
function useCourseTheme() {
  const { currentCourse } = useCourseContext();

  if (currentCourse === 'macro') {
    return {
      theme: 'blue' as const,
      primary: 'bg-blue-600',
      text: 'text-blue-600',
      border: 'border-blue-600',
      lightBg: 'bg-blue-50',
      hoverBorder: 'hover:border-blue-600',
    };
  }
  if (currentCourse === 'micro') {
    return {
      theme: 'green' as const,
      primary: 'bg-green-600',
      text: 'text-green-600',
      border: 'border-green-600',
      lightBg: 'bg-green-50',
      hoverBorder: 'hover:border-green-600',
    };
  }
  return {
    theme: 'violet' as const,
    primary: 'bg-violet-600',
    text: 'text-violet-600',
    border: 'border-violet-600',
    lightBg: 'bg-violet-50',
    hoverBorder: 'hover:border-violet-600',
  };
}

export { CourseProvider, useCourseContext, useCourseTheme };

