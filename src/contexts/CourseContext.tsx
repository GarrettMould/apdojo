'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAuthContext } from './AuthContext';

type Course = 'macro' | 'micro';

interface CourseContextValue {
  currentCourse: Course;
  switchCourse: (course: Course) => void;
}

const CourseContext = createContext<CourseContextValue | null>(null);

export function CourseProvider({ children }: { children: ReactNode }) {
  const { selectedSubject, setSelectedSubject } = useAuthContext();

  // Sync CourseContext with useAuth's selectedSubject
  // This maintains backward compatibility for components using CourseContext
  const switchCourse = (course: Course) => {
    setSelectedSubject(course);
  };

  return (
    <CourseContext.Provider value={{ currentCourse: selectedSubject, switchCourse }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourseContext(): CourseContextValue {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext must be used within CourseProvider');
  }
  return context;
}

// Theme helper hook
export function useCourseTheme() {
  const { currentCourse } = useCourseContext();
  
  return {
    theme: currentCourse === 'macro' ? 'blue' : 'green',
    primary: currentCourse === 'macro' ? 'bg-blue-600' : 'bg-green-600',
    text: currentCourse === 'macro' ? 'text-blue-600' : 'text-green-600',
    border: currentCourse === 'macro' ? 'border-blue-600' : 'border-green-600',
    lightBg: currentCourse === 'macro' ? 'bg-blue-50' : 'bg-green-50',
    hoverBorder: currentCourse === 'macro' ? 'hover:border-blue-600' : 'hover:border-green-600',
  };
}

