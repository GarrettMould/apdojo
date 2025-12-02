'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface ScrollTriggerProps {
  onTrigger: () => void;
  threshold?: number;
  rootMargin?: string;
  children?: React.ReactNode;
}

/**
 * Invisible trigger element that calls onTrigger when it enters the viewport
 * Used to trigger animations or state changes as user scrolls
 */
export function ScrollTrigger({ 
  onTrigger, 
  threshold = 0.3,
  rootMargin = '0px',
  children 
}: ScrollTriggerProps) {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: false, // Allow multiple triggers
  });

  const hasTriggered = useRef(false);

  useEffect(() => {
    if (inView && !hasTriggered.current) {
      onTrigger();
      hasTriggered.current = true;
    }
  }, [inView, onTrigger]);

  return (
    <div 
      ref={ref}
      className="w-full h-1"
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

