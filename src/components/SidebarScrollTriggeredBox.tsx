'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface SidebarScrollTriggeredBoxProps {
  practiceUrl?: string;
  threshold?: number;
  rootMargin?: string;
  sidebarSelector?: string;
}

/**
 * Trigger component that, when scrolled to, renders a practice box in the sidebar
 * The box appears at the scroll position where the trigger is located
 */
export function SidebarScrollTriggeredBox({ 
  practiceUrl = '/unitFRQpracticePage',
  threshold = 0.3,
  rootMargin = '0px 0px -200px 0px',
  sidebarSelector = '[data-blog-sidebar]'
}: SidebarScrollTriggeredBoxProps) {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: false,
  });

  const [shouldShow, setShouldShow] = useState(false);
  const [position, setPosition] = useState({ top: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (inView && !hasTriggered.current && triggerRef.current) {
      // Calculate position relative to the article start
      const articleElement = triggerRef.current.closest('article');
      if (articleElement) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const articleTop = articleElement.getBoundingClientRect().top + scrollTop;
        const triggerTop = triggerRef.current.getBoundingClientRect().top + scrollTop;
        
        // Calculate offset from top of article content (after header)
        // Article has padding and header, so we need to account for that
        const articleHeader = articleElement.querySelector('header');
        const headerHeight = articleHeader ? articleHeader.offsetHeight : 0;
        const articlePadding = 32; // p-8 = 2rem = 32px
        
        // Position in sidebar at same relative position as trigger in article
        const offsetFromArticleTop = triggerTop - articleTop - headerHeight;
        setPosition({ top: offsetFromArticleTop });
        setShouldShow(true);
        hasTriggered.current = true;
      }
    }
  }, [inView]);

  const sidebarElement = typeof window !== 'undefined' 
    ? document.querySelector(sidebarSelector) 
    : null;

  return (
    <>
      <div ref={ref}>
        <div ref={triggerRef} className="w-full h-1" aria-hidden="true" />
      </div>
      {shouldShow && sidebarElement && typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute left-0 right-0"
            style={{ top: `${position.top}px` }}
          >
            <div className="p-6 border border-blue-200 bg-blue-50 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold text-blue-800 mb-3">Ready to Practice?</h3>
              <p className="text-sm text-blue-700 mb-4">
                Test your knowledge on the FRQ Dojo.
              </p>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-sm rounded-md">
                <Link href={practiceUrl}>
                  Start Now
                </Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>,
        sidebarElement
      )}
    </>
  );
}

