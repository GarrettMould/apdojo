'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { dojoDrills } from '@/data/dojoDrills';
import DojoDrill from '@/components/DojoDrill';
import { AlertCircle, Home, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function CustomDojoDrillContent() {
  const searchParams = useSearchParams();
  const [drill, setDrill] = useState<typeof dojoDrills[string] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const encodedParam = searchParams.get('q');
      
      if (!encodedParam) {
        setError('No drill parameter found in URL.');
        setIsLoading(false);
        return;
      }

      // Decode Base64 - the encoded param should be the drill ID
      let drillId: string;
      try {
        drillId = atob(encodedParam);
      } catch (e) {
        setError('Invalid link format. The encoded parameter is corrupted.');
        setIsLoading(false);
        return;
      }

      // Look up the drill by ID
      const foundDrill = dojoDrills[drillId];

      if (!foundDrill) {
        setError('Drill not found matching the provided ID.');
        setIsLoading(false);
        return;
      }

      setDrill(foundDrill);
      setError(null);
    } catch (e) {
      setError('An unexpected error occurred while processing the assignment link.');
      console.error('Error processing custom dojo drill:', e);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700">Loading assignment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white border-4 border-red-600 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-black mb-4">Corrupted Link</h2>
          <p className="text-gray-700 font-semibold mb-6">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-black rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-700 active:translate-y-1 transition-all"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!drill) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">Unable to load assignment.</p>
        </div>
      </div>
    );
  }

  // Get the encoded parameter to pass to DojoDrill
  const encodedParam = searchParams.get('q');

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto relative h-full flex gap-6">
        <div className="flex-1 h-full overflow-y-auto">
          <DojoDrill
            drill={drill}
            isAssignment={true}
            assignmentLinkId={encodedParam || undefined}
            onComplete={() => {
              console.log('Dojo Drill assignment completed!');
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function CustomDojoDrillPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-700">Loading...</p>
          </div>
        </div>
      }
    >
      <CustomDojoDrillContent />
    </Suspense>
  );
}

