'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface BlogPostScrollContextType {
  showPracticeBox: boolean;
  setShowPracticeBox: (show: boolean) => void;
}

const BlogPostScrollContext = createContext<BlogPostScrollContextType | undefined>(undefined);

export function BlogPostScrollProvider({ children }: { children: ReactNode }) {
  const [showPracticeBox, setShowPracticeBox] = useState(false);

  return (
    <BlogPostScrollContext.Provider value={{ showPracticeBox, setShowPracticeBox }}>
      {children}
    </BlogPostScrollContext.Provider>
  );
}

export function useBlogPostScroll() {
  const context = useContext(BlogPostScrollContext);
  if (context === undefined) {
    throw new Error('useBlogPostScroll must be used within BlogPostScrollProvider');
  }
  return context;
}

