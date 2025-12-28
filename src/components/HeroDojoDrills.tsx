'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { dojoDrills } from '@/data/dojoDrills';
import { DojoDrillPreview } from '@/components/DojoDrillPreview';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasValidSeasonPass } from '@/lib/utils';

export function HeroDojoDrills() {
  const router = useRouter();
  const { user, userData, selectedSubject } = useAuthContext();
  const allDrills = Object.values(dojoDrills);
  
  // Get first two drills to display
  const drill1 = allDrills[0] || null;
  const drill2 = allDrills[1] || null;

  // Check if user is a pro customer (has season pass)
  const isProCustomer = useMemo(() => {
    if (!user || !userData) return false;
    // Check if user has valid season pass for current subject
    const subjectKey = selectedSubject === 'macro' ? 'macro' : 'micro';
    return hasValidSeasonPass(userData, subjectKey) || hasValidSeasonPass(userData);
  }, [user, userData, selectedSubject]);

  const handleStart = (drillId: string) => {
    if (!isProCustomer) {
      const subjectKey = selectedSubject === 'macro' ? 'macro' : 'micro';
      router.push(`/purchase/season-pass?courseType=${subjectKey}`);
      return;
    }
    router.push(`/dojo-drills?drill=${drillId}`);
  };

  // Determine difficulty - default to Medium
  const difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium';

  if (allDrills.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-gray-600">No Dojo Drills available yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
          Master the Hardest Topics with <span className="text-blue-500">Interactive</span> Drills
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master key concepts through interactive video lessons, graph simulations, and practice questions.
        </p>
      </div>

      {/* Two Preview Cards Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto items-stretch">
        {drill1 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full flex"
          >
            <div className="flex-1 flex flex-col">
              <DojoDrillPreview
                title={drill1.title}
                description={drill1.description}
                xpReward={drill1.xpReward.total}
                difficulty={difficulty}
                onStart={() => handleStart(drill1.id)}
                isLocked={!isProCustomer}
                progress={null}
                buttonText={isProCustomer ? undefined : 'Join the Dojo'}
              />
            </div>
          </motion.div>
        )}
        {drill2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full flex"
          >
            <div className="flex-1 flex flex-col">
              <DojoDrillPreview
                title={drill2.title}
                description={drill2.description}
                xpReward={drill2.xpReward.total}
                difficulty={difficulty}
                onStart={() => handleStart(drill2.id)}
                isLocked={!isProCustomer}
                progress={null}
                buttonText={isProCustomer ? undefined : 'Join the Dojo'}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

