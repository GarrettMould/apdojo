'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TutorialTooltipProps {
  children: ReactNode;
  onClick: () => void;
  show: boolean;
  /** Optional: Only show when this element is in viewport */
  useIntersectionObserver?: boolean;
}

export function TutorialTooltip({ 
  children, 
  onClick, 
  show,
  useIntersectionObserver = true 
}: TutorialTooltipProps) {
  const [isInView, setIsInView] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to detect when element enters viewport
  useEffect(() => {
    if (!show || !useIntersectionObserver || !elementRef.current) {
      setIsInView(true); // If not using observer, always show
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only trigger when fully visible (threshold: 1.0)
          if (entry.isIntersecting && entry.intersectionRatio >= 1.0) {
            setIsInView(true);
            // Small delay to ensure smooth animation
            setTimeout(() => setIsVisible(true), 300);
          } else {
            setIsInView(false);
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 1.0, // Element must be 100% visible
        rootMargin: '0px',
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [show, useIntersectionObserver]);

  // If show is false, don't render tutorial
  if (!show) {
    return <>{children}</>;
  }

  // Only show tutorial when element is in view
  const shouldShowTutorial = isInView && isVisible;

  const handleClick = () => {
    onClick();
  };

  return (
    <div ref={elementRef} className="relative">
      {/* Container with blue glow effect */}
      <motion.div
        className="relative"
        animate={shouldShowTutorial ? {
          boxShadow: [
            '0 0 0px rgba(59, 130, 246, 0)',
            '0 0 25px rgba(59, 130, 246, 0.8)',
            '0 0 0px rgba(59, 130, 246, 0)',
          ],
        } : {}}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={handleClick}
        style={{ cursor: shouldShowTutorial ? 'pointer' : 'inherit' }}
      >
        {children}
      </motion.div>

      {/* "Click me" text positioned outside container, top right */}
      <AnimatePresence>
        {shouldShowTutorial && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ 
              opacity: 1, 
              x: 0,
            }}
            exit={{ opacity: 0, x: -10 }}
            transition={{
              opacity: { duration: 0.3 },
              x: { duration: 0.3 }
            }}
            className="absolute top-2 right-0 translate-x-full z-50 ml-2"
            style={{ pointerEvents: 'none' }}
          >
            <p className="text-black font-bold text-sm whitespace-nowrap">
              Click me
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
