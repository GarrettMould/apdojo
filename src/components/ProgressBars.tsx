import React from 'react';
import Image from 'next/image';

interface ProgressBarsProps {
  currentXp: number;
  xpForNextLevel: number;
  currentPoints: number;
  totalPoints: number;
}

export const ProgressBars: React.FC<ProgressBarsProps> = ({
  currentXp,
  xpForNextLevel,
  currentPoints,
  totalPoints,
}) => {
  const pointsPercentage = totalPoints > 0 ? (currentPoints / totalPoints) * 100 : 0;

  // XP Background calculation from header.tsx
  const ratio = xpForNextLevel > 0 ? currentXp / xpForNextLevel : 0;
  const baseAlpha = 0.08;
  const maxAlpha = 0.24;
  const alpha = baseAlpha + (maxAlpha - baseAlpha) * ratio;
  const background = `rgba(248, 113, 113, ${alpha})`; // red-400 with low opacity

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Points Progress */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-1.5">Points Earned</h3>
        <div className="relative rounded-md border border-gray-200 bg-gray-200 overflow-hidden">
          {/* Fill layer */}
          <div
            className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${pointsPercentage}%` }}
          ></div>
          
          {/* Text on top, centered */}
          <div className="relative z-10 flex items-center justify-center px-3 py-1.5">
            <span className="text-sm font-bold text-gray-900 mix-blend-screen whitespace-nowrap">
              {currentPoints} / {totalPoints}
            </span>
          </div>
        </div>
      </div>

      {/* XP Display */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-1.5">XP Earned</h3>
        <div
          className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-md border border-red-100 text-sm font-bold text-gray-800 transition-colors duration-300"
          style={{ background }}
        >
          <span className="uppercase tracking-tight text-xs text-gray-600 font-semibold">XP</span>
          <span>{currentXp}</span>
          <Image
            src="/images/flame100.png"
            alt="XP Flame"
            width={16}
            height={16}
            className="w-4 h-4"
          />
        </div>
      </div>
    </div>
  );
};
