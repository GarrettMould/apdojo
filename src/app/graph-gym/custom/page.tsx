'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { graphGymScenarios, GraphGymScenario } from '@/data/graphGymScenarios';
import { GraphGym } from '@/components/GraphGym';
import { AlertCircle, Home, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CourseProvider } from '@/contexts/CourseContext';

function CustomGraphGymContent() {
  const searchParams = useSearchParams();
  const [scenarios, setScenarios] = useState<GraphGymScenario[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const encodedParam = searchParams.get('q');
      
      if (!encodedParam) {
        setError('No scenarios parameter found in URL.');
        setIsLoading(false);
        return;
      }

      // Decode Base64
      let decodedString: string;
      try {
        decodedString = atob(encodedParam);
      } catch (e) {
        setError('Invalid link format. The encoded parameter is corrupted.');
        setIsLoading(false);
        return;
      }

      // Split into array of IDs
      const ids = decodedString.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));

      if (ids.length === 0) {
        setError('No valid scenario IDs found in the link.');
        setIsLoading(false);
        return;
      }

      // Create a Map to store scenarios by ID (ensures uniqueness and fast lookup)
      const scenariosMap = new Map<number, GraphGymScenario>();
      graphGymScenarios.forEach(s => {
        if (!scenariosMap.has(s.id)) {
          scenariosMap.set(s.id, s);
        }
      });

      // Filter scenarios in the order of IDs from the link, ensuring uniqueness
      const filteredScenarios: GraphGymScenario[] = [];
      const foundIds = new Set<number>();
      
      for (const id of ids) {
        if (!foundIds.has(id)) {
          const scenario = scenariosMap.get(id);
          if (scenario) {
            filteredScenarios.push(scenario);
            foundIds.add(id);
          }
        }
      }

      if (filteredScenarios.length === 0) {
        setError('No scenarios found matching the provided IDs.');
        setIsLoading(false);
        return;
      }

      setScenarios(filteredScenarios);
      setError(null);
    } catch (e) {
      setError('An unexpected error occurred while processing the assignment link.');
      console.error('Error processing custom graph gym:', e);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-black rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-green-700 active:translate-y-1 transition-all"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </motion.div>
      </div>
    );
  }

  if (scenarios.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">Unable to load assignment.</p>
        </div>
      </div>
    );
  }

  return (
    <CourseProvider>
      <GraphGym 
        assignmentScenarios={scenarios}
        isAssignment={true}
      />
    </CourseProvider>
  );
}

export default function CustomGraphGymPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-700">Loading...</p>
          </div>
        </div>
      }
    >
      <CustomGraphGymContent />
    </Suspense>
  );
}

