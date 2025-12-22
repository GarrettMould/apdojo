'use client';

import { useState, useEffect } from 'react';
import { dojoDrills } from '@/data/dojoDrills';
import DojoDrill from '@/components/DojoDrill';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function DojoDrillsPage() {
  const [selectedDrillId, setSelectedDrillId] = useState<string | null>(null);

  const drills = Object.values(dojoDrills);
  const currentDrill = selectedDrillId ? dojoDrills[selectedDrillId] : null;

  if (currentDrill) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto relative">
          <button
            onClick={() => setSelectedDrillId(null)}
            className="absolute -left-16 top-0 w-12 h-12 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 group"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900 group-hover:text-gray-700 transition-colors" />
          </button>
          <DojoDrill
            drill={currentDrill}
            onComplete={() => {
              // Handle completion - maybe show a success message or navigate
              console.log('Dojo Drill completed!');
            }}
          />
        </div>
      </div>
    );
  }

  const getSubjectLabel = (subject: string) => {
    return subject === 'ap_macroeconomics' ? 'Macro' : 'Micro';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dojo Drills</h1>
          <p className="text-lg text-gray-600">
            Master key concepts through interactive video lessons, graph simulations, and practice questions.
          </p>
        </div>

        {drills.length === 0 ? (
          <div className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
            <p className="text-gray-600">No Dojo Drills available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drills.map((drill) => (
              <button
                key={drill.id}
                onClick={() => setSelectedDrillId(drill.id)}
                className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 text-left hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${
                      drill.subject === 'ap_macroeconomics'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {getSubjectLabel(drill.subject)} - Unit {drill.unit}
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
                <div className="text-sm font-semibold text-blue-600 mt-auto">
                  Start Drill →
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
