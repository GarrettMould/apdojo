'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Course = 'macro' | 'micro';

interface CourseContextValue {
  currentCourse: Course;
  switchCourse: (course: Course) => void;
}

const CourseContext = createContext<CourseContextValue | null>(null);

const STORAGE_KEY = 'dojo_course_preference';

export function CourseProvider({ children }: { children: ReactNode }) {
  const [currentCourse, setCurrentCourse] = useState<Course>('macro');

  // Load preference from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as Course | null;
      if (saved === 'macro' || saved === 'micro') {
        setCurrentCourse(saved);
      }
    }
  }, []);

  // Save to localStorage on change
  const switchCourse = (course: Course) => {
    setCurrentCourse(course);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, course);
    }
  };

  return (
    <CourseContext.Provider value={{ currentCourse, switchCourse }}>
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

