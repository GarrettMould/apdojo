'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { getFlashcardsForLesson, UnitFlashcardData } from '@/data/unitFlashcards';
import { macroUnits, microUnits } from '@/data/cheatSheets';

// Helper to define lesson structures (You can adjust this if you have a dynamic manifest)
const LESSON_MAP: Record<string, string[]> = {
  // MACRO
  'macro-1': ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6'],
  'macro-2': ['2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8'],
  'macro-3': ['3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8', '3.9'],
  'macro-4': ['4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7'],
  'macro-5': ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'],
  'macro-6': ['6.1', '6.2', '6.3', '6.4', '6.5', '6.6'],
  // MICRO
  'micro-1': ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6'],
  'micro-2': ['2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9'],
  'micro-3': ['3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7'],
  'micro-4': ['4.1', '4.2', '4.3', '4.4', '4.5'],
  'micro-5': ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7'],
  'micro-6': ['6.1', '6.2', '6.3', '6.4', '6.5'],
};

export default function PacketPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const subject = (searchParams.get('subject') as 'macro' | 'micro') || 'macro';
  const unitId = Number(params.unitId);
  const [isClient, setIsClient] = useState(false);

  const cheatSheetUrl = `/${subject === 'macro' ? 'ap-macro' : 'ap-micro'}-unit-${unitId}-cheat-sheet`;

  // Get Unit Title
  const unitTitle = useMemo(() => {
    const units = subject === 'macro' ? macroUnits : microUnits;
    return units.find((u) => u.number === unitId)?.title || `Unit ${unitId}`;
  }, [subject, unitId]);

  // Aggregate and Randomize Data
  const packetData = useMemo(() => {
    const lessonKey = `${subject}-${unitId}`;
    const lessons = LESSON_MAP[lessonKey] || [];

    let allTerms: UnitFlashcardData[] = [];
    let allGraphs: UnitFlashcardData[] = [];
    let allRules: UnitFlashcardData[] = [];

    // 1. Collect EVERYTHING from the unit
    lessons.forEach((lessonId) => {
      const cards = getFlashcardsForLesson(subject, unitId, lessonId);
      allTerms.push(...cards.filter((c) => c.type === 'list'));
      allGraphs.push(...cards.filter((c) => c.tag === 'GRAPH'));
      allRules.push(...cards.filter((c) => c.tag === 'RULE' || (c.type === 'rapid-fire' && c.tag !== 'GRAPH')));
    });

    // 2. Shuffle helper
    const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);

    // 3. Select specific amounts
    // Terms: Keep ALL of them, but maybe sort by lesson or alphabetical? Let's keep them by lesson order.
    // Graphs: Pick 5 Random
    const selectedGraphs = shuffle([...allGraphs]).slice(0, 5);
    // Rules: Pick 5 Random
    const selectedRules = shuffle([...allRules]).slice(0, 5);

    return {
      terms: allTerms,
      graphs: selectedGraphs,
      rules: selectedRules,
    };
  }, [subject, unitId]);

  useEffect(() => {
    setIsClient(true);
    // Auto-print after a delay so external graph images have time to load (avoids black squares when printing)
    const timer = setTimeout(() => {
      window.print();
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) return <div className="p-10 text-center">Loading Study Packet...</div>;

  return (
    <div className="min-h-screen bg-white text-black p-0 m-0 font-serif leading-relaxed">
      {/* Ensure images print: many browsers omit or break cross-origin images without this */}
      <style jsx global>{`
        @media print {
          img[src*="apdojowhiteboards"] {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* Ready to Print bar — clean, minimal (hidden when printing) */}
      <div className="print:hidden fixed top-0 left-0 w-full bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-50">
        <div className="font-sans">
          <p className="font-semibold text-base text-gray-900">Ready to Print</p>
          <p className="text-sm text-gray-500 mt-0.5">Select &quot;Save as PDF&quot; in your print settings.</p>
        </div>
        <div className="flex items-center gap-8">
          <button
            onClick={() => window.print()}
            className="text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
          >
            Open Print Dialog
          </button>
          <button
            onClick={() => router.push(cheatSheetUrl)}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* --- THE PAGE CONTENT --- */}
      <div className="max-w-[210mm] mx-auto p-[15mm] pt-20 print:p-0 print:pt-0">
        {/* Blank space above title on screen only — smaller so headline sits higher; no effect on print */}
        <div className="min-h-[3rem] print:min-h-0 print:hidden" aria-hidden="true" />

        {/* Header */}
        <div className="text-center border-b-4 border-black pb-6 mb-8">
          <h1 className="text-4xl font-extrabold uppercase tracking-tight mb-2">AP {subject === 'macro' ? 'Macro' : 'Micro'}</h1>
          <h2 className="text-2xl font-bold text-gray-800">Unit {unitId}: {unitTitle}</h2>
          <p className="text-sm font-bold text-gray-500 mt-2 uppercase tracking-widest">Review Packet</p>
        </div>

        {/* 1. KEY TERMS (All of them) */}
        <div className="mb-10">
          <div className="flex items-center mb-6">
            <h3 className="text-xl font-bold uppercase bg-black text-white px-3 py-1 inline-block">Key Terms</h3>
            <div className="h-1 bg-black flex-grow ml-2"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-y-1 gap-x-8">
            {packetData.terms.map((term, i) => (
              <div key={i} className="flex text-sm border-b border-gray-200 py-2 break-inside-avoid">
                <div className="w-[30%] font-bold pr-4 leading-tight">{term.front}</div>
                <div className="w-[70%] text-gray-800 leading-tight">{term.back}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Page Break for Questions usually looks better */}
        <div className="print:break-before-page"></div>

        {/* 2. GRAPHING SCENARIOS (5 Selected) */}
        {packetData.graphs.length > 0 && (
          <div className="mb-10">
             <div className="flex items-center mb-6">
                <h3 className="text-xl font-bold uppercase bg-black text-white px-3 py-1 inline-block">Graphing Practice</h3>
                <div className="h-1 bg-black flex-grow ml-2"></div>
            </div>
            <div className="space-y-8">
              {packetData.graphs.map((q, i) => (
                <div key={i} className="break-inside-avoid">
                  <p className="font-bold text-md mb-2">Scenario {i + 1}: {q.front}</p>
                  <p className="text-gray-500 text-sm italic mb-2">Draw graph here</p>
                  <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. RULE QUESTIONS (5 Selected) */}
        {packetData.rules.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
                <h3 className="text-xl font-bold uppercase bg-black text-white px-3 py-1 inline-block">Concept Check</h3>
                <div className="h-1 bg-black flex-grow ml-2"></div>
            </div>
            <div className="space-y-6">
              {packetData.rules.map((q, i) => (
                <div key={i} className="break-inside-avoid">
                  <p className="font-bold text-md mb-3">Q{i + 1}: {q.front}</p>
                  <div className="h-8 border-b-2 border-gray-300"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FOOTER: ANSWER KEY */}
        <div className="mt-12 pt-8 border-t-4 border-dashed border-gray-400">
            {/* The Rotation Container */}
            <div className="rotate-180 origin-center bg-gray-50 p-6 rounded-xl border border-gray-200">
                
                <p className="text-center text-xs font-bold text-gray-500 mb-6 uppercase tracking-[0.2em]">
                Answer Key (Flip Page Upside Down to Read)
                </p>

                <div className="grid grid-cols-2 gap-8 text-xs">
                    {/* Rules Keys */}
                    <div>
                        <h4 className="font-bold underline mb-3 text-sm">Concept Answers</h4>
                        <ul className="space-y-3">
                        {packetData.rules.map((q, i) => (
                            <li key={i} className="leading-snug">
                            <span className="font-bold block text-gray-900">Q{i + 1}:</span> 
                            {q.back}
                            </li>
                        ))}
                        </ul>
                    </div>

                    {/* Graphs Keys */}
                    <div>
                        <h4 className="font-bold underline mb-3 text-sm">Graph Answers</h4>
                        <div className="space-y-6">
                        {packetData.graphs.map((q, i) => (
                            <div key={i}>
                            <p className="mb-1 leading-snug">
                                <span className="font-bold text-gray-900">Scenario {i + 1}:</span> {q.back}
                            </p>
                            {/* Render image if available */}
                            {q.backImage && (
                                <div className="mt-2 w-full h-24 relative border border-gray-300 bg-white overflow-hidden" style={{ printColorAdjust: 'exact' }}>
                                    <img 
                                        src={q.backImage} 
                                        alt={`Answer for scenario ${i+1}`}
                                        className="w-full h-full object-contain p-1"
                                        loading="eager"
                                    />
                                </div>
                            )}
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
