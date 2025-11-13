'use client';

import React from 'react';
import type { UnitXPData } from '@/hooks/useAuth';

// --- Types ---
// Interface for the unit details (matching cheat sheet structure)
export interface UnitDetails {
  number: number; // Corresponds to unitId
  title: string;  // Corresponds to unitName
  // Add other fields from CheatSheetUnitType if needed
}

// --- Helper Function ---
// Assigns light pastel background colors based on unit ID
const getUnitColor = (unitId: number): string => {
  const colors = [
    'bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-yellow-100',
    'bg-red-100', 'bg-indigo-100', 'bg-pink-100', 'bg-teal-100',
    'bg-lime-100', 'bg-orange-100', 'bg-cyan-100', 'bg-fuchsia-100',
  ];
  // Use unitId directly, adjust index calculation if needed
  return colors[(unitId - 1) % colors.length] || 'bg-gray-100'; // Fallback
};

// --- Component Props ---
interface UnitPerformanceDisplayProps {
  isLoading: boolean;
  xpData: UnitXPData[];
  unitsData: UnitDetails[]; // Expecting data like [{ number: 1, title: 'Unit 1 Name' }, ...]
  isLoggedIn: boolean;
}

// --- Component ---
export function UnitPerformanceDisplay({
  isLoading,
  xpData,
  unitsData,
  isLoggedIn,
}: UnitPerformanceDisplayProps) {

  // Don't render anything if not logged in
  if (!isLoggedIn) {
    return null;
  }

  return (
    <section aria-labelledby="unit-performance-heading" className="mb-8">
      <h2 id="unit-performance-heading" className="sr-only">Unit Levels Overview</h2>
      <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md border border-gray-200">
        {isLoading ? (
          <p className="text-sm text-gray-500 text-center italic">Loading unit levels...</p>
        ) : xpData.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Unit Levels:</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1 sm:pr-2"> {/* Increased max-height */}
              {xpData.map(unitInfo => {
                const unitColor = getUnitColor(unitInfo.unitId);
                const level = Math.floor(unitInfo.totalXP / 100) + 1;
                const xpTowardsNext = unitInfo.totalXP % 100;
                const xpNeededForNext = 100; // Assuming 100 XP per level
                const progressPercentage = (xpTowardsNext / xpNeededForNext) * 100;

                const unitDetails = unitsData.find(u => u.number === unitInfo.unitId);
                const unitDisplayName = unitDetails ? `Unit ${unitInfo.unitId}: ${unitDetails.title}` : `Unit ${unitInfo.unitId}`;

                return (
                  <div
                    key={unitInfo.unitId}
                    className="relative h-8 w-full bg-gray-200 rounded overflow-hidden group" // Added group for potential hover effects
                    title={`${unitDisplayName}: Level ${level} (${unitInfo.totalXP} XP)`}
                  >
                    {/* Progress Fill */}
                    <div
                      className={`absolute top-0 left-0 h-full rounded ${unitColor} transition-all duration-500 ease-out`}
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                    {/* Unit Name Label */}
                    <span className="absolute inset-y-0 left-3 flex items-center z-10 text-sm font-bold text-gray-800 truncate pr-20">
                      {unitDisplayName}
                    </span>
                    {/* Level Label - replaces percentage */}
                    <span className="absolute inset-y-0 right-3 flex items-center z-10 text-sm font-bold text-gray-800">
                      Lvl {level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center italic">Answer some practice questions to see your unit levels here!</p>
        )}
      </div>
    </section>
  );
}
