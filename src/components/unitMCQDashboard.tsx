'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Image component
import dojoIcon from "../../public/images/dojoIcon.png"
import { useAuthContext } from '@/contexts/AuthContext'; // <-- Import AuthContext

// --- Define Interfaces & Calculation Function --- 
interface McqAnswer {
  id?: string;
  questionId: string | number;
  isCorrect: boolean;
  unitId: number;
  lessonIDS: string[];
  timestamp?: any;
}

interface UnitPerformanceInfo {
  unitId: number;
  percentage: number;
  totalAnswers: number;
  correctAnswers: number;
}

interface UnitStats {
  correct: number;
  total: number;
}

function calculateAllUnitStats(answers: McqAnswer[]): UnitPerformanceInfo[] {
  if (!answers || answers.length === 0) return [];
  const unitStats: { [key: number]: UnitStats } = {};
  answers.forEach(answer => {
    if (typeof answer.unitId === 'number') {
      const unitId = answer.unitId;
      if (!unitStats[unitId]) {
        unitStats[unitId] = { correct: 0, total: 0 };
      }
      unitStats[unitId].total++;
      if (answer.isCorrect) {
        unitStats[unitId].correct++;
      }
    }
  });
  const unitsWithStats = Object.entries(unitStats)
    .map(([unitIdStr, stats]): UnitPerformanceInfo => {
      const unitId = parseInt(unitIdStr, 10);
      const percentage = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
      return {
        unitId: unitId,
        percentage: percentage,
        totalAnswers: stats.total,
        correctAnswers: stats.correct,
      };
    });
  unitsWithStats.sort((a, b) => a.unitId - b.unitId);
  return unitsWithStats;
}
// --- End Definitions ---

interface UnitMCQDashboardProps {
  currentUnitName?: string; // Optional for now, make required later
  // Add other props as needed for actual data, e.g., userId
}

// Example function structure - adjust props as needed
export function UnitMCQDashboard({ currentUnitName }: UnitMCQDashboardProps) {
  console.log("[Dashboard] Component Rendered");
  const { user, mcqAnswersData, loadingMcqData } = useAuthContext(); // <-- Get data from context

  // --- State for Unit Performance --- 
  const [unitPerformance, setUnitPerformance] = useState<UnitPerformanceInfo[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  // --- Effect to Calculate Performance --- 
  useEffect(() => {
    if (!loadingMcqData && user && mcqAnswersData) { // Check if data is available
      setIsCalculating(true);
      const timer = setTimeout(() => { // Prevent blocking render thread
        const results = calculateAllUnitStats(mcqAnswersData);
        setUnitPerformance(results);
        setIsCalculating(false);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setUnitPerformance([]); // Clear performance if no data/user
    }
  }, [mcqAnswersData, user, loadingMcqData]); // Dependencies

  // --- Placeholder Data ---
  // Replace these with actual state fetched from Firestore later
  const sessionPercentage = 70;
  const dojoProgress = 65; // Example progress percentage (0-100)

  return (
    <div className="w-full bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">

      {/* Header Section */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {/* Using Dojo Icon in Header */}
          <Image src={dojoIcon} alt="Dojo Logo" width={32} height={32} className="rounded-full"/>
          <h2 className="text-lg font-semibold text-gray-800">AP Dojo Learner Dashboard</h2>
        </div>
        <div className="text-sm font-medium text-gray-600 whitespace-nowrap">
          {/* Display current unit if passed, otherwise maybe hide */}
          {currentUnitName && (
            <>Current Unit: <span className="font-semibold text-gray-800">{currentUnitName}</span></>
          )}
        </div>
      </div>

      {/* Main Content - Now 2 Rows */}
      <div className="p-6 space-y-6">
        {/* Row 1: 3 Columns (Last one empty for now) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Column 1: Session Performance */}
          <div className="flex flex-col items-center justify-center text-center p-4 border border-gray-100 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 shadow-inner">
            <h3 className="text-md font-semibold text-gray-700 mb-2 uppercase tracking-wide">This Session</h3>
            <p className="text-6xl font-bold text-blue-600 my-2">{sessionPercentage}%</p>
            <p className="text-sm text-gray-500 mt-1">Accuracy</p>
          </div>

          {/* Column 2: Unit Performance */}
          <div className="p-4 border border-gray-200 rounded-lg bg-white">
            <h3 className="text-md font-semibold text-gray-700 mb-3 uppercase tracking-wide">Unit Performance</h3>
            {isCalculating ? (
              <p className="text-sm text-gray-400 italic">Calculating...</p>
            ) : unitPerformance.length > 0 ? (
              <ul className="space-y-2 max-h-48 overflow-y-auto pr-2"> {/* Added scroll */} 
                {unitPerformance.map((unitInfo) => (
                  <li key={unitInfo.unitId} className="text-sm text-gray-600 flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="font-medium">Unit {unitInfo.unitId}</span>
                    <span className={`font-semibold px-1.5 py-0.5 rounded text-xs ${ 
                      unitInfo.percentage < 50 ? 'bg-red-100 text-red-700' :
                      unitInfo.percentage < 75 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}> 
                      {unitInfo.percentage.toFixed(0)}% ({unitInfo.correctAnswers}/{unitInfo.totalAnswers})
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic mt-2">No unit performance data yet. Answer some MCQs!</p>
            )}
          </div>

          {/* Column 3: Empty Placeholder */}
          <div className="p-4 border border-dashed border-gray-200 rounded-lg bg-white flex items-center justify-center">
            <p className="text-sm text-gray-400 italic">Future Content</p>
          </div>
        </div>

        {/* Row 2: Progress Bar (Cols 1-2) and Empty (Col 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dojo Meter (Spanning 2 columns) */}
          <div className="p-4 border border-gray-200 rounded-lg bg-white md:col-span-2">
            <h3 className="text-md font-semibold text-gray-700 mb-4 uppercase tracking-wide text-center">Dojo Progress</h3>
            {/* Container for bar and right logo - Centered */}
            <div className="flex items-center justify-between w-full max-w-lg mx-auto gap-3 mt-2">
               {/* Left Logo Removed */}

               {/* Horizontal Meter Bar */}
               <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden relative flex-grow">
                  {/* Filled part */}
                  <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${dojoProgress}%` }} // Use width for horizontal fill
                  ></div>
               </div>

               {/* Right Logo (Next Belt?) */}
               <Image
                 src={dojoIcon} // Using same icon for now
                 alt="Next Dojo Belt Icon"
                 width={40}
                 height={40}
                 className="shrink-0" // Prevent logo from shrinking
               />
            </div>
          </div>

          {/* Empty Placeholder (Row 2, Col 3) */}
          <div className="p-4 border border-dashed border-gray-200 rounded-lg bg-white flex items-center justify-center">
            <p className="text-sm text-gray-400 italic">Future Content</p>
          </div>
        </div>
      </div>

    </div>
  );
}
