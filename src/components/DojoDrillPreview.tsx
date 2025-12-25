'use client';

import React from 'react';
import { Circle, Lock } from 'lucide-react';

interface DojoDrillPreviewProps {
  title: string;
  description: string;
  xpReward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  onStart: () => void;
  isLocked?: boolean;
}

const learningPathItems = [
  'Video Briefing',
  'Interactive Simulation',
  'MCQ Gauntlet',
  'Mastery Challenge',
];

export function DojoDrillPreview({
  title,
  description,
  xpReward,
  difficulty,
  onStart,
  isLocked = false,
}: DojoDrillPreviewProps) {
  return (
    <div className="bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-12 flex flex-col min-h-full"
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
        <p className="text-gray-600 font-medium mt-4 mb-6 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Learning Path Section */}
      <div className="mb-6">
        {/* Kicker Header */}
        <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
          LEARNING PATH
        </div>
        
        {/* Learning Path Items */}
        <div>
          {learningPathItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 py-3 border-b-2 border-dashed border-gray-100 last:border-0"
            >
              <Circle className="w-8 h-8 text-gray-300 stroke-[3px] flex-shrink-0" />
              <span className="text-lg font-bold text-gray-800">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <button
        onClick={onStart}
        disabled={isLocked}
        className={`w-full font-bold py-4 rounded-lg uppercase tracking-widest transition-colors ${
          isLocked
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          {isLocked && <Lock className="w-5 h-5" />}
          <span>{isLocked ? 'Locked (Season Pass)' : 'Start Drill'}</span>
        </div>
      </button>
    </div>
  );
}

