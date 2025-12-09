'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface InlineScrollTriggeredBoxProps {
  practiceUrl?: string;
  threshold?: number;
  rootMargin?: string;
}

/**
 * Component that appears inline in the content when the trigger point is reached
 * The box appears exactly where the trigger is located in the scroll position
 */
export function InlineScrollTriggeredBox({ 
  practiceUrl = '/unitFRQpracticePage',
  threshold = 0.3,
  rootMargin = '0px 0px -200px 0px'
}: InlineScrollTriggeredBoxProps) {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: false,
  });

  const [shouldShow, setShouldShow] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (inView && !hasTriggered.current) {
      setShouldShow(true);
      hasTriggered.current = true;
    }
  }, [inView]);

  return (
    <div ref={ref} className="w-full my-12">
      <AnimatePresence>
        {shouldShow && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="p-6 border border-blue-200 bg-blue-50 rounded-lg shadow-lg"
          >
            <h3 className="text-lg font-bold text-blue-800 mb-3">Ready to Practice?</h3>
            <p className="text-sm text-blue-700 mb-4">
              Test your knowledge on the FRQ Dojo.
            </p>
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-sm rounded-md">
              <Link href={practiceUrl}>
                Start Now
              </Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

