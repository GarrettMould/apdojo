'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { dojoDrills, drillAppliesToSubject, getDrillUnitForSubject } from '@/data/dojoDrills';
import DojoDrill from '@/components/DojoDrill';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useAuthContext } from '@/contexts/AuthContext';
import React from 'react';
import { hasValidSeasonPass } from '@/lib/utils';

function DojoDrillsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selectedSubject, user, userData } = useAuthContext();
  const drillIdFromQuery = searchParams.get('drill');
  const [selectedDrillId, setSelectedDrillId] = useState<string | null>(drillIdFromQuery);

  // Check if user is a pro customer (has season pass)
  const isProCustomer = useMemo(() => {
    if (!user || !userData) return false;
    // Check if user has valid season pass for current subject
    const subjectKey = selectedSubject === 'macro' ? 'macro' : 'micro';
    return hasValidSeasonPass(userData, subjectKey);
  }, [user, userData, selectedSubject]);

  // Handle drill click - redirect non-pro users to purchase page
  const handleDrillClick = (drillId: string) => {
    // Always route to preview page first
    router.push(`/dojo-drills/preview/${drillId}`);
  };

  // Update selectedDrillId when query param changes
  useEffect(() => {
    if (drillIdFromQuery) {
      setSelectedDrillId(drillIdFromQuery);
    } else {
      setSelectedDrillId(null);
    }
  }, [drillIdFromQuery]);

  // Show all drills, sorted by unit (prefer macro unit if available)
  // This hook must be called before any conditional returns
  const filteredAndSortedDrills = useMemo(() => {
    const allDrills = Object.values(dojoDrills);
    // Sort by unit number (prefer macro unit, fallback to micro or deprecated unit field)
    return allDrills.sort((a, b) => {
      const unitA = getDrillUnitForSubject(a, 'ap_macroeconomics') || 
                    getDrillUnitForSubject(a, 'ap_microeconomics') || 
                    a.unit || 0;
      const unitB = getDrillUnitForSubject(b, 'ap_macroeconomics') || 
                    getDrillUnitForSubject(b, 'ap_microeconomics') || 
                    b.unit || 0;
      return unitA - unitB;
    });
  }, []);

  const currentDrill = selectedDrillId ? dojoDrills[selectedDrillId] : null;

  const getSubjectLabel = (drill: typeof filteredAndSortedDrills[0]) => {
    if (drill.subjects && drill.subjects.length > 0) {
      return drill.subjects[0] === 'ap_macroeconomics' ? 'Macro' : 'Micro';
    }
    return drill.subject === 'ap_macroeconomics' ? 'Macro' : 'Micro';
  };

  // If accessing drill directly, show the drill component
  if (currentDrill) {
    return (
      <div className="h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto relative h-full flex gap-6">
          <button
            onClick={() => {
              setSelectedDrillId(null);
              router.push('/dojo-drills');
            }}
            className="w-12 h-12 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 group flex-shrink-0 self-start"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900 group-hover:text-gray-700 transition-colors" />
          </button>
          <div className="flex-1 h-full overflow-y-auto">
            <DojoDrill
              drill={currentDrill}
              onComplete={() => {
                // Handle completion - maybe show a success message or navigate
                console.log('Dojo Drill completed!');
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Show all drills list
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            <span className="text-blue-500">Dojo</span> Drills
          </h1>
          <p className="text-lg text-gray-600">
            Master key concepts through interactive video lessons, graph simulations, and practice questions.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Showing all drills, ordered by unit
          </p>
        </div>

        {filteredAndSortedDrills.length === 0 ? (
          <div className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
            <p className="text-gray-600">No Dojo Drills available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedDrills.map((drill) => (
              <button
                key={drill.id}
                onClick={() => handleDrillClick(drill.id)}
                className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 text-left hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${
                      (drill.subjects && drill.subjects.includes('ap_macroeconomics')) || drill.subject === 'ap_macroeconomics'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {(() => {
                      const subject = drill.subjects && drill.subjects.length > 0 
                        ? drill.subjects[0] 
                        : drill.subject;
                      const unit = getDrillUnitForSubject(drill, subject) || drill.unit;
                      return `${getSubjectLabel(drill)} - Unit ${unit}`;
                    })()}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                    <span>{drill.xpReward.total}</span>
                    <span className="inline-flex items-center">
                      <Image
                        src="/images/flame100.png"
                        alt="XP Flame"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {drill.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {drill.description}
                </p>
                <div className={`text-sm font-semibold mt-auto ${
                  isProCustomer ? 'text-blue-600' : 'text-orange-600'
                }`}>
                  {isProCustomer ? 'Start Drill →' : 'Join the Dojo'}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DojoDrillsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    }>
      <DojoDrillsContent />
    </Suspense>
  );
}
