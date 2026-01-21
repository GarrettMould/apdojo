'use client';

import React from 'react';
import { Circle, Lock, RotateCcw } from 'lucide-react';

interface DojoDrillPreviewProps {
  title: string;
  description: string;
  xpReward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  onStart: () => void;
  isLocked?: boolean;
  progress?: {
    stage1: boolean;
    stage2: boolean;
    stage3: boolean;
  } | null;
  buttonText?: string; // Optional custom button text
  comingSoon?: boolean; // If true, show "Coming Soon" with lock icon
  onReset?: () => void; // Optional reset handler
}

const learningPathItems = [
  { label: 'Video Briefing', stage: 'stage1' as const },
  { label: 'Interactive Simulation', stage: 'stage2' as const },
  { label: 'MCQ Gauntlet', stage: 'stage3' as const },
];

function DojoDrillPreview({
  title,
  description,
  xpReward,
  difficulty,
  onStart,
  isLocked = false,
  progress = null,
  buttonText,
  comingSoon = false,
  onReset,
}: DojoDrillPreviewProps) {
  // Check if all stages are completed
  const isCompleted = progress?.stage1 && progress?.stage2 && progress?.stage3;
  // Check if at least one stage is completed (but not all)
  const hasProgress = progress && (progress.stage1 || progress.stage2 || progress.stage3);
  const isInProgress = hasProgress && !isCompleted;
  
  const displayButtonText = comingSoon 
    ? 'Coming Soon' 
    : (buttonText || (isCompleted ? 'Restart Drill' : (isInProgress ? 'Resume Drill' : (isLocked ? 'Locked (Season Pass)' : 'Start Drill'))));
  
  return (
    <div className="bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-12 flex flex-col h-full"
    >
      {/* Header Section */}
      <div className="mb-6">
        {/* Massive Title */}
        <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-900 mb-3">
          {title}
        </h2>
        
        {/* Meta Row */}
        <div className="flex items-center gap-3 mb-4">
          {/* XP Badge */}
          <div className="bg-yellow-400 border-2 border-black rounded-full px-3 py-1">
            <span className="text-sm font-bold text-gray-900">
              {xpReward} XP
            </span>
          </div>
          
          {/* Difficulty Badge */}
          <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">
            {difficulty}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 font-medium mt-4 mb-6 leading-relaxed min-h-[4.5rem]">
          {description}
        </p>
      </div>

      {/* Learning Path Section */}
      <div className="mb-6">
        {/* Kicker Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="text-xs font-black text-gray-400 uppercase tracking-widest">
            LEARNING PATH
          </div>
          {onReset && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              className="p-1 hover:bg-gray-100 rounded transition-colors group"
              title="Reset progress"
            >
              <RotateCcw className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </button>
          )}
        </div>
        
        {/* Learning Path Items */}
        <div>
          {learningPathItems.map((item, index) => {
            const isCompleted = item.stage && progress?.[item.stage];
            return (
              <div
                key={index}
                className={`flex items-center gap-4 py-3 border-b-2 border-dashed border-gray-100 last:border-0 ${
                  isCompleted ? 'opacity-100' : ''
                }`}
              >
                {isCompleted ? (
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <Circle className="w-8 h-8 text-gray-300 stroke-[3px] absolute" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 bg-blue-600 rounded-full" />
                    </div>
                  </div>
                ) : (
                  <Circle className="w-8 h-8 text-gray-300 stroke-[3px] flex-shrink-0" />
                )}
                <span
                  className={`text-lg font-bold relative ${
                    isCompleted
                      ? 'text-gray-900'
                      : 'text-gray-800'
                  }`}
                  style={isCompleted ? {
                    textDecoration: 'line-through',
                    textDecorationColor: '#2563eb', // blue-600
                    textDecorationThickness: '2px'
                  } : {}}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer CTA */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!comingSoon) {
            onStart();
          }
        }}
        disabled={comingSoon || (isLocked && !buttonText)} // Disable if coming soon or locked without buttonText
        className={`w-full mt-auto font-bold py-4 rounded-lg uppercase tracking-widest transition-colors ${
          comingSoon
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : (isLocked && !buttonText
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800')
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          {(comingSoon || (isLocked && !buttonText)) && <Lock className="w-5 h-5" />}
          <span>{displayButtonText}</span>
        </div>
      </button>
    </div>
  );
}

export { DojoDrillPreview };
