'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ScrollTriggeredPracticeBoxProps {
  isVisible: boolean;
  practiceUrl?: string;
}

export function ScrollTriggeredPracticeBox({ 
  isVisible, 
  practiceUrl = '/unitFRQpracticePage' 
}: ScrollTriggeredPracticeBoxProps) {
  const [shouldShow, setShouldShow] = useState(false);

  // Once triggered, keep it visible (don't hide on scroll up)
  useEffect(() => {
    if (isVisible) {
      setShouldShow(true);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
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
  );
}

