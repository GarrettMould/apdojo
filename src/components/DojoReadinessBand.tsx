"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface DojoReadinessBandProps {
  score: number; // 0 to 100
}

export function DojoReadinessBand({ score }: DojoReadinessBandProps) {
  // Clamp score between 0 and 100
  const clampedScore = Math.max(0, Math.min(100, score));

  // Calculate needle position (percentage of bar width)
  const needlePosition = clampedScore;

  // Determine current belt rank
  const getBeltRank = (score: number): { name: string; color: string } => {
    if (score < 20) return { name: "White Belt", color: "gray" };
    if (score < 40) return { name: "Yellow Belt", color: "yellow" };
    if (score < 60) return { name: "Green Belt", color: "green" };
    if (score < 80) return { name: "Brown Belt", color: "amber" };
    return { name: "Black Belt", color: "black" };
  };

  const beltRank = getBeltRank(clampedScore);

  // For testing: hidden slider (only in development)
  const [testScore, setTestScore] = useState(clampedScore);
  const isDevelopment = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  const displayScore = isDevelopment ? testScore : clampedScore;

  return (
    <div className="w-full bg-white border-b-4 border-black py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* The Belt Bar */}
        <div className="relative mb-4">
          {/* Segmented Bar Container */}
          <div className="h-8 border-4 border-black rounded-full overflow-hidden relative">
            {/* White Segment (0-20%) */}
            <div
              className="absolute left-0 top-0 h-full bg-gray-100"
              style={{ width: "20%" }}
            />
            {/* Yellow Segment (20-40%) */}
            <div
              className="absolute left-[20%] top-0 h-full bg-yellow-400"
              style={{ width: "20%" }}
            />
            {/* Green Segment (40-60%) */}
            <div
              className="absolute left-[40%] top-0 h-full bg-green-500"
              style={{ width: "20%" }}
            />
            {/* Brown Segment (60-80%) */}
            <div
              className="absolute left-[60%] top-0 h-full bg-amber-700"
              style={{ width: "20%" }}
            />
            {/* Black Segment (80-100%) */}
            <div
              className="absolute left-[80%] top-0 h-full bg-gray-900"
              style={{ width: "20%" }}
            />
          </div>

          {/* The Needle (Triangular Pointer) */}
          <motion.div
            className="absolute top-[-12px]"
            style={{
              left: `${displayScore}%`,
              transform: "translateX(-50%)",
            }}
            animate={{
              left: `${displayScore}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            {/* Triangle SVG */}
            <svg
              width="24"
              height="16"
              viewBox="0 0 24 16"
              className="drop-shadow-md"
            >
              <path
                d="M12 0 L24 16 L0 16 Z"
                fill="black"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </motion.div>
        </div>

        {/* Labels */}
        <div className="flex items-center justify-between mt-2">
          {/* Left Label */}
          <span className="text-sm font-bold uppercase text-gray-600">
            Fresh Study
          </span>

          {/* Center Label - Belt Status */}
          <div className="flex-1 text-center">
            <span className="text-sm font-bold uppercase text-black">
              Current Rank:{" "}
              <span
                className={
                  beltRank.color === "gray"
                    ? "text-gray-600"
                    : beltRank.color === "yellow"
                    ? "text-yellow-500"
                    : beltRank.color === "green"
                    ? "text-green-600"
                    : beltRank.color === "amber"
                    ? "text-amber-700"
                    : "text-gray-900"
                }
              >
                {beltRank.name}
              </span>
            </span>
          </div>

          {/* Right Label */}
          <span className="text-sm font-bold uppercase text-black">
            Exam Ready
          </span>
        </div>

        {/* Hidden Test Slider (only in development) */}
        {typeof window !== 'undefined' && window.location.hostname === 'localhost' && (
          <div className="mt-4 flex items-center gap-4 justify-center opacity-50">
            <label className="text-xs font-semibold text-gray-600">
              Test Score:
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={testScore}
              onChange={(e) => setTestScore(Number(e.target.value))}
              className="w-64"
            />
            <span className="text-xs font-bold text-gray-800 w-12">
              {testScore}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}




