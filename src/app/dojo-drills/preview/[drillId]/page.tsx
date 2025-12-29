'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { dojoDrills, getDrillUnitForSubject } from '@/data/dojoDrills';
import { DojoDrillPreview } from '@/components/DojoDrillPreview';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthContext } from '@/contexts/AuthContext';
import { loadDojoDrillProgress, getDrillProgress, resetDojoDrillProgress } from '@/lib/dojoDrillProgress';
import { hasValidSeasonPass } from '@/lib/utils';

export default function DojoDrillPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const { user, userData, selectedSubject, loading: authLoading } = useAuthContext();
  const drillId = params.drillId as string;
  const [progress, setProgress] = useState<{ stage1: boolean; stage2: boolean; stage3: boolean } | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(true);
  
  const drill = drillId ? dojoDrills[drillId] : null;

  // Check if user is a pro customer (has season pass)
  const isProCustomer = useMemo(() => {
    if (!user || !userData) return false;
    // Check if user has valid season pass for current subject
    const subjectKey = selectedSubject === 'macro' ? 'macro' : 'micro';
    return hasValidSeasonPass(userData, subjectKey);
  }, [user, userData, selectedSubject]);

  // Load progress when user and drill are available
  useEffect(() => {
    const fetchProgress = async () => {
      if (user && drillId) {
        setLoadingProgress(true);
        try {
          const allProgress = await loadDojoDrillProgress(user.uid);
          const drillProgress = getDrillProgress(allProgress, drillId);
          setProgress(drillProgress);
        } catch (error) {
          console.error('[DojoDrillPreview] Error loading progress:', error);
        } finally {
          setLoadingProgress(false);
        }
      } else {
        setLoadingProgress(false);
      }
    };

    if (!authLoading) {
      fetchProgress();
    }
  }, [user, drillId, authLoading]);

  if (!drill) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Drill Not Found</h1>
          <button
            onClick={() => router.push('/dojo-drills')}
            className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
          >
            Back to Drills
          </button>
        </div>
      </div>
    );
  }

  const handleStart = async () => {
    if (!isProCustomer) {
      const subjectKey = selectedSubject === 'macro' ? 'macro' : 'micro';
      router.push(`/purchase/season-pass?courseType=${subjectKey}`);
      return;
    }
    
    // Check if drill is completed (all stages done)
    const isCompleted = progress?.stage1 && progress?.stage2 && progress?.stage3;
    
    // If completed, reset progress before starting
    if (isCompleted && user) {
      try {
        await resetDojoDrillProgress(user.uid, drill.id);
        // Reload progress to update UI
        const allProgress = await loadDojoDrillProgress(user.uid);
        const drillProgress = getDrillProgress(allProgress, drill.id);
        setProgress(drillProgress);
      } catch (error) {
        console.error('[DojoDrillPreview] Error resetting progress:', error);
      }
    }
    
    router.push(`/dojo-drills?drill=${drill.id}`);
  };

  const handleReset = async () => {
    if (!user || !drill) return;
    
    try {
      await resetDojoDrillProgress(user.uid, drill.id);
      // Reload progress to update UI
      const allProgress = await loadDojoDrillProgress(user.uid);
      const drillProgress = getDrillProgress(allProgress, drill.id);
      setProgress(drillProgress);
    } catch (error) {
      console.error('[DojoDrillPreview] Error resetting progress:', error);
    }
  };

  // Determine difficulty - default to Medium for now
  // You can add a difficulty field to the DojoDrill interface later if needed
  const difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium';

  // Check if this drill is unit 4, 5, or 6 for macro (coming soon)
  const macroUnit = getDrillUnitForSubject(drill, 'ap_macroeconomics');
  const isComingSoon = macroUnit !== null && (macroUnit === 4 || macroUnit === 5 || macroUnit === 6);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto relative h-full flex gap-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="w-12 h-12 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 group flex-shrink-0 self-start"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900 group-hover:text-gray-700 transition-colors" />
        </button>

        {/* Card Container with Stacked Paper Effect */}
        <div className="flex-1 relative h-full flex flex-col">
          {/* Stacked Paper Effect - Background layers */}
          <div className="absolute inset-0 -z-10">
            {/* First layer */}
            <div className="absolute top-2 left-2 right-2 bottom-2 bg-white border-4 border-black rounded-3xl opacity-20 transform rotate-1" />
            {/* Second layer */}
            <div className="absolute top-4 left-4 right-4 bottom-4 bg-white border-4 border-black rounded-3xl opacity-10 transform -rotate-1" />
          </div>

          {/* Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative flex-1 overflow-y-auto"
          >
            <DojoDrillPreview
              title={drill.title}
              description={drill.description}
              xpReward={drill.xpReward.total}
              difficulty={difficulty}
              onStart={handleStart}
              isLocked={!isProCustomer}
              progress={progress}
              buttonText={isProCustomer ? undefined : 'Join the Dojo'}
              comingSoon={isComingSoon}
              onReset={user ? handleReset : undefined}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

