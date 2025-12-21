"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCcw } from "lucide-react";

export interface DemandChangeScenario {
  scenario: string;
  correctAnswer: "movement" | "shift";
}

interface DemandChangeDrillProps {
  problem: DemandChangeScenario;
  onComplete?: () => void;
}

export function DemandChangeDrill({ problem, onComplete }: DemandChangeDrillProps) {
  const [selectedTarget, setSelectedTarget] = useState<"movement" | "shift" | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showNewDot, setShowNewDot] = useState(false);
  const [newDotPosition, setNewDotPosition] = useState<{ x: number; y: number } | null>(null);

  // Graph dimensions
  const graphWidth = 600;
  const graphHeight = 400;
  const padding = 60;
  const graphInnerWidth = graphWidth - padding * 2;
  const graphInnerHeight = graphHeight - padding * 2;

  // Demand curve points (downward sloping) - shifted up and left
  const curveOffsetX = -30; // Shift left
  const curveOffsetY = -20; // Shift up
  const startX = padding + 50 + curveOffsetX;
  const startY = padding + 30 + curveOffsetY;
  const endX = padding + graphInnerWidth - 50 + curveOffsetX;
  const endY = padding + graphInnerHeight - 30 + curveOffsetY;

  // Calculate points ON the demand curve using linear interpolation
  // Point A (start point) - at 30% along the curve
  const pointAT = 0.3; // 30% along the curve
  const pointAX = startX + (endX - startX) * pointAT;
  const pointAY = startY + (endY - startY) * pointAT;

  // Target 1 (Movement) - at 70% along the same curve
  const movementT = 0.7; // 70% along the curve
  const movementX = startX + (endX - startX) * movementT;
  const movementY = startY + (endY - startY) * movementT;

  // Target 2 (Shift) - same x position as Point A, but on parallel curve shifted right
  const shiftOffset = 120; // Horizontal shift amount
  const shiftX = pointAX + shiftOffset;
  // For shift right, the curve is parallel, so same slope but shifted
  // Calculate y on the shifted curve (parallel means same slope)
  const slope = (endY - startY) / (endX - startX);
  const shiftY = pointAY; // Same price level (shift right means more quantity at same price)

  const handleTargetClick = (target: "movement" | "shift") => {
    if (isComplete) return;

    setSelectedTarget(target);
    const correct = target === problem.correctAnswer;
    setIsCorrect(correct);

    // Show new dot at clicked position
    if (target === "movement") {
      setNewDotPosition({ x: movementX, y: movementY });
    } else {
      setNewDotPosition({ x: shiftX, y: shiftY });
    }
    setShowNewDot(true);

    if (correct) {
      setIsComplete(true);
      // Call onComplete after animation
      setTimeout(() => {
      if (onComplete) {
          onComplete();
        }
        }, 1500);
      }
  };

  const handleReset = () => {
        setSelectedTarget(null);
        setIsCorrect(null);
    setIsComplete(false);
    setShowNewDot(false);
    setNewDotPosition(null);
  };

  // Calculate graph container height for matching scenario container
  const graphContainerHeight = graphHeight + 48; // graphHeight + padding (p-6 = 24px top + 24px bottom)

  return (
    <div className="w-full h-full flex flex-row items-center justify-center p-8 gap-8">
      {/* Left Side: Scenario Text */}
      <div className="flex-1 max-w-md flex flex-col justify-center">
        <div 
          className="bg-white px-6 py-6 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
          style={{ height: `${graphContainerHeight}px` }}
        >
          <div>
            <p className="text-xl font-black text-black mb-4">
              Scenario:
            </p>
            <p className="text-lg font-bold text-black leading-relaxed mb-6">
              {problem.scenario}
            </p>
            <div className="mb-6">
              <p className="text-base font-bold text-gray-800 leading-relaxed">
                Instructions:
              </p>
              <p className="text-base font-semibold text-gray-700 leading-relaxed mt-2">
                Determine if this will cause a movement along the curve or a shift of the curve
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              Select your answer:
            </p>
            <div className="flex gap-6">
              <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all cursor-pointer ${
                selectedTarget === "movement" && !isComplete
                  ? "bg-white border-[3px] border-dashed border-gray-600"
                  : isComplete
                  ? "cursor-default opacity-60"
                  : "bg-white border-2 border-gray-300 hover:border-black"
              }`}>
                <input
                  type="radio"
                  name="demand-change"
                  value="movement"
                  checked={selectedTarget === "movement"}
                  onChange={() => handleTargetClick("movement")}
                  disabled={isComplete}
                  className="w-5 h-5 cursor-pointer accent-black"
                />
                <span className="text-base font-bold text-gray-900">Move</span>
              </label>
              <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all cursor-pointer ${
                selectedTarget === "shift" && !isComplete
                  ? "bg-white border-[3px] border-dashed border-gray-600"
                  : isComplete
                  ? "cursor-default opacity-60"
                  : "bg-white border-2 border-gray-300 hover:border-black"
              }`}>
                <input
                  type="radio"
                  name="demand-change"
                  value="shift"
                  checked={selectedTarget === "shift"}
                  onChange={() => handleTargetClick("shift")}
                  disabled={isComplete}
                  className="w-5 h-5 cursor-pointer accent-black"
                />
                <span className="text-base font-bold text-gray-900">Shift</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Graph Container */}
      <div className="flex-1 flex items-center justify-center">
        <div 
          className={`relative border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 transition-colors duration-300 ${
            isCorrect === true ? "bg-green-100" : isCorrect === false ? "bg-red-100" : "bg-white"
          }`}
        >
          {/* Try Again Button */}
          {isCorrect === false && (
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={handleReset}
                className="p-2 bg-white border-2 border-black rounded-full hover:bg-gray-100 active:translate-y-1 transition-transform"
              >
                <RefreshCcw size={16} />
              </button>
            </div>
          )}
        <svg
          width={graphWidth}
          height={graphHeight}
          className="overflow-visible"
        >
          {/* Axes */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={padding + graphInnerHeight}
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            x1={padding}
            y1={padding + graphInnerHeight}
            x2={padding + graphInnerWidth}
            y2={padding + graphInnerHeight}
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Axis Labels */}
          <text
            x={padding - 30}
            y={padding + graphInnerHeight / 2}
            fill="black"
            fontSize="18"
            fontWeight="900"
            transform={`rotate(-90 ${padding - 30} ${padding + graphInnerHeight / 2})`}
            textAnchor="middle"
          >
            Price (P)
          </text>
          <text
            x={padding + graphInnerWidth / 2}
            y={padding + graphInnerHeight + 40}
            fill="black"
            fontSize="18"
            fontWeight="900"
            textAnchor="middle"
          >
            Quantity (Q)
          </text>

          {/* Original Demand Curve */}
          <line
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            stroke="black"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <text
            x={endX - 10}
            y={endY + 20}
            fill="black"
            fontSize="16"
            fontWeight="900"
          >
            D
          </text>

          {/* Point A (Start Point) */}
          <circle
            cx={pointAX}
            cy={pointAY}
            r="8"
            fill="#ef4444"
            stroke="black"
            strokeWidth="2"
          />
          <text
            x={pointAX + 12}
            y={pointAY + 4}
            fill="black"
            fontSize="14"
            fontWeight="900"
          >
            A
          </text>

          {/* Ghost Target 1: Movement (on the same curve) */}
          <g
            onClick={() => handleTargetClick("movement")}
            className={isComplete ? "cursor-default" : "cursor-pointer"}
          >
            {/* Ghost dot - same size as point A */}
            <motion.circle
              cx={movementX}
              cy={movementY}
              r="8"
              fill={selectedTarget === "movement" && isCorrect === true
                ? "#10b981"
                : selectedTarget === "movement" && isCorrect === false
                ? "#ef4444"
                : isComplete && problem.correctAnswer === "movement"
                ? "#10b981"
                : "rgba(107, 114, 128, 0.5)"}
              stroke={selectedTarget === "movement" && isCorrect === true
                ? "#059669"
                : selectedTarget === "movement" && isCorrect === false
                ? "#dc2626"
                : isComplete && problem.correctAnswer === "movement"
                ? "#059669"
                : "rgba(107, 114, 128, 0.8)"}
              strokeWidth="4"
              animate={
                !isComplete && selectedTarget !== "movement"
                  ? {
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }
                  : selectedTarget === "movement" && isCorrect === false
                  ? {
                      x: [0, -10, 10, -10, 10, 0],
                      opacity: [1, 0.8, 0.6, 0.4, 0.2, 0],
                    }
                  : {}
              }
              transition={{
                duration: selectedTarget === "movement" && isCorrect === false ? 0.5 : 1.5,
                repeat: selectedTarget === "movement" && isCorrect === false ? 0 : !isComplete ? Infinity : 0,
              }}
              whileHover={!isComplete ? { scale: 1.4, opacity: 0.9 } : {}}
            />
          </g>

          {/* Ghost Target 2: Shift (to the right, with ghost curve) - ONLY the curve is clickable */}
          <g>
            {/* Ghost curve (parallel, shifted right) - This is the clickable target */}
            <motion.line
              x1={startX + shiftOffset}
              y1={startY}
              x2={endX + shiftOffset}
              y2={endY}
              stroke={selectedTarget === "shift" && isCorrect === true
                ? "black"
                : selectedTarget === "shift" && isCorrect === false
                ? "black"
                : isComplete && problem.correctAnswer === "shift"
                ? "black"
                : "rgba(107, 114, 128, 0.6)"}
              strokeWidth={selectedTarget === "shift" && isCorrect === true
                ? "6"
                : selectedTarget === "shift" && isCorrect === false
                ? "6"
                : isComplete && problem.correctAnswer === "shift"
                ? "6"
                : "5"}
              strokeDasharray={selectedTarget === "shift" && isCorrect === true
                ? "0"
                : selectedTarget === "shift" && isCorrect === false
                ? "0"
                : isComplete && problem.correctAnswer === "shift"
                ? "0"
                : "16 8"}
              strokeLinecap="round"
            onClick={() => handleTargetClick("shift")}
              className={isComplete ? "cursor-default" : "cursor-pointer"}
            animate={
                !isComplete && selectedTarget !== "shift"
                  ? {
                      opacity: [0.5, 0.8, 0.5],
                      strokeWidth: [4, 5, 4],
                    }
                  : selectedTarget === "shift" && isCorrect === false
                  ? {
                      x: [0, -5, 5, -5, 5, 0],
                      opacity: [1, 0.8, 0.6, 0.4, 0.2, 0],
                    }
                  : {}
              }
              transition={{
                duration: selectedTarget === "shift" && isCorrect === false ? 0.5 : 1.5,
                repeat: selectedTarget === "shift" && isCorrect === false ? 0 : !isComplete ? Infinity : 0,
              }}
              whileHover={!isComplete ? { opacity: 0.9, strokeWidth: 5 } : {}}
            />
            {/* Invisible wider hit area for easier clicking */}
            <line
              x1={startX + shiftOffset}
              y1={startY}
              x2={endX + shiftOffset}
              y2={endY}
              stroke="transparent"
              strokeWidth="20"
              strokeLinecap="round"
              onClick={() => handleTargetClick("shift")}
              className={isComplete ? "cursor-default" : "cursor-pointer"}
            />
            <text
              x={endX + shiftOffset - 10}
              y={endY + 20}
              fill={selectedTarget === "shift" && isCorrect === true ? "black" : selectedTarget === "shift" && isCorrect === false ? "black" : isComplete && problem.correctAnswer === "shift" ? "black" : "rgba(107, 114, 128, 0.7)"}
              fontSize="18"
              fontWeight="900"
            >
              D'
            </text>
          </g>

          {/* If correct, show the final state */}
          {isComplete && isCorrect && (
            <>
              {problem.correctAnswer === "movement" ? (
                <>
                  {/* Point moves to movement position */}
                  <motion.circle
                    initial={{ cx: pointAX, cy: pointAY }}
                    animate={{ cx: movementX, cy: movementY }}
                    cx={movementX}
                    cy={movementY}
                    r="8"
                    fill="#10b981"
                    stroke="black"
                    strokeWidth="2"
                  />
                </>
              ) : (
                <>
                  {/* Curve shifts to new position */}
            <motion.line
                    initial={{ x1: startX, y1: startY, x2: endX, y2: endY }}
                    animate={{
                      x1: startX + shiftOffset,
                      y1: startY,
                      x2: endX + shiftOffset,
                      y2: endY,
                    }}
                    x1={startX + shiftOffset}
                    y1={startY}
                    x2={endX + shiftOffset}
                    y2={endY}
                    stroke="black"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <text
                    x={endX + shiftOffset - 10}
                    y={endY + 20}
                    fill="black"
                    fontSize="18"
                    fontWeight="900"
                  >
                    D'
                  </text>
                </>
              )}
            </>
          )}
        </svg>
        </div>
      </div>
    </div>
  );
}
