'use client';

import React from 'react';
import Image from 'next/image'; // Import Image component
import dojoIcon from "../../public/images/dojoIcon.png"
interface UnitMCQDashboardProps {
  currentUnitName?: string; // Optional for now, make required later
  // Add other props as needed for actual data, e.g., userId
}

// Example function structure - adjust props as needed
export function UnitMCQDashboard({ currentUnitName }: UnitMCQDashboardProps) {

  // --- Placeholder Data ---
  // Replace these with actual state fetched from Firestore later
  const sessionPercentage = 70;
  const weakSpots = ['3.7', '3.5', '3.1']; // Example lesson IDs
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
          Current Unit: <span className="font-semibold text-gray-800">{currentUnitName || 'Unit X'}</span>
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

          {/* Column 2: Weak Spots */}
          <div className="p-4 border border-gray-200 rounded-lg bg-white">
            <h3 className="text-md font-semibold text-gray-700 mb-3 uppercase tracking-wide">Focus Areas</h3>
            <ul className="space-y-2">
              {weakSpots.map((spot, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center bg-gray-50 p-2 rounded">
                  <span className="mr-2 text-gray-400 font-medium">{index + 1}.</span>
                  Lesson {spot}
                </li>
              ))}
              {weakSpots.length === 0 && (
                  <p className="text-sm text-gray-400 italic mt-2">Keep practicing to identify focus areas!</p>
              )}
            </ul>
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
