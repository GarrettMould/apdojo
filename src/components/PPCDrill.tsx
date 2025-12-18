"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PPCDrillProps {
  onComplete?: () => void;
}

// Helper function to calculate PPC curve path with offset
function getPPCPath(offsetX: number, svgWidth: number, svgHeight: number, padding: number): string {
  const ppcStartX = padding;
  const ppcStartY = padding;
  const ppcEndX = svgWidth - padding;
  const ppcEndY = svgHeight - padding;
  
  // Control points for bowed out curve (concave to origin)
  const control1X = ppcStartX + (ppcEndX - ppcStartX) * 0.3;
  const control1Y = ppcStartY + (ppcEndY - ppcStartY) * 0.4;
  const control2X = ppcStartX + (ppcEndX - ppcStartX) * 0.7;
  const control2Y = ppcStartY + (ppcEndY - ppcStartY) * 0.4;

  // Shift curve outward (up and right) or inward (down and left)
  const startX = ppcStartX - offsetX;
  const startY = ppcStartY - offsetX * 0.8;
  const endX = ppcEndX + offsetX;
  const endY = ppcEndY - offsetX * 0.8;
  const c1X = control1X - offsetX * 0.5;
  const c1Y = control1Y - offsetX * 1.0;
  const c2X = control2X + offsetX * 0.5;
  const c2Y = control2Y - offsetX * 1.0;

  return `M ${startX} ${startY} C ${c1X} ${c1Y}, ${c2X} ${c2Y}, ${endX} ${endY}`;
}

export function PPCDrill({ onComplete }: PPCDrillProps) {
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [level1Selected, setLevel1Selected] = useState<number | null>(null);
  const [level1Correct, setLevel1Correct] = useState(false);
  const [level2CurveOffset, setLevel2CurveOffset] = useState(0);
  const [level2Correct, setLevel2Correct] = useState(false);
  const [level3Correct, setLevel3Correct] = useState(false);
  const [level3Answer, setLevel3Answer] = useState("");
  const [level3Focused, setLevel3Focused] = useState(false);
  const [showGhost, setShowGhost] = useState(false);

  // SVG dimensions
  const svgWidth = 600;
  const svgHeight = 400;
  const padding = 60;

  // Base PPC curve path (for Level 1 and ghost)
  const basePPCPath = getPPCPath(0, svgWidth, svgHeight, padding);

  // Level 1: Ghost dot positions
  // Dot 1: Inside the curve (correct for unemployment)
  const dot1X = svgWidth * 0.4;
  const dot1Y = svgHeight * 0.6;
  // Dot 2: On the curve
  const dot2X = svgWidth * 0.5;
  const dot2Y = svgHeight * 0.5;
  // Dot 3: Outside the curve
  const dot3X = svgWidth * 0.6;
  const dot3Y = svgHeight * 0.3;

  // Check if a point is inside the PPC curve area
  const isPointInsidePPC = (x: number, y: number): boolean => {
    const normalizedX = (x - padding) / (svgWidth - 2 * padding);
    const normalizedY = (y - padding) / (svgHeight - 2 * padding);
    const invertedY = 1 - normalizedY;
    const curveY = 1 - Math.pow((normalizedX - 0.5) * 2, 2) * 0.6;
    return invertedY < curveY;
  };

  // Level 1: Handle dot click
  const handleDotClick = (dotIndex: number, x: number, y: number) => {
    if (level1Selected !== null) return; // Already selected
    
    setLevel1Selected(dotIndex);
    const isCorrect = dotIndex === 1 && isPointInsidePPC(x, y); // Dot 1 (inside) is correct
    
    if (isCorrect) {
      setLevel1Correct(true);
      setTimeout(() => {
        setLevel(2);
        setLevel1Selected(null);
        setLevel1Correct(false);
      }, 1000);
    }
  };

  // Level 2: Handle shift buttons
  const handleShiftRight = () => {
    if (level2Correct) return; // Already completed
    
    setLevel2CurveOffset(50);
    setLevel2Correct(true);
    setShowGhost(true);
    setTimeout(() => {
      setLevel(3);
      setLevel2CurveOffset(0);
      setLevel2Correct(false);
      setShowGhost(false);
    }, 2000);
  };

  const handleShiftLeft = () => {
    if (level2Correct) return; // Already completed
    
    setLevel2CurveOffset(-50);
    // Show feedback and reset
    setTimeout(() => {
      setLevel2CurveOffset(0);
    }, 1500);
  };

  // Level 3: Handle input change
  const handleLevel3Input = (value: string) => {
    setLevel3Answer(value);
  };

  const handleLevel3Blur = () => {
    const normalizedAnswer = level3Answer.trim().replace(/[^0-9.-]/g, '');
    if (normalizedAnswer === '1') {
      setLevel3Correct(true);
      // Call onComplete after a short delay
      setTimeout(() => {
        onComplete?.();
      }, 1000);
    }
  };

  const handleLevel3KeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLevel3Blur();
      e.currentTarget.blur();
    }
  };

  // Reset state when level changes
  useEffect(() => {
    if (level === 1) {
      setLevel1Selected(null);
      setLevel1Correct(false);
    } else if (level === 2) {
      setLevel2CurveOffset(0);
      setLevel2Correct(false);
      setShowGhost(false);
    }
  }, [level]);


  return (
    <div className="w-full max-w-7xl mx-auto bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
      <AnimatePresence mode="wait">
        {/* Level 1: Click-to-Select Ghost Dots */}
        {level === 1 && (
          <motion.div
            key="level1"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-black text-black mb-4">
              Scenario: High Unemployment. Place the economy.
            </h2>
            
            <div className="w-full flex justify-center">
              <svg
                width={svgWidth}
                height={svgHeight}
                className="border-4 border-black rounded-xl bg-white"
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              >
                {/* Axes */}
                <line
                  x1={padding}
                  y1={svgHeight - padding}
                  x2={svgWidth - padding}
                  y2={svgHeight - padding}
                  stroke="black"
                  strokeWidth="3"
                />
                <line
                  x1={padding}
                  y1={padding}
                  x2={padding}
                  y2={svgHeight - padding}
                  stroke="black"
                  strokeWidth="3"
                />
                
                {/* Axis labels */}
                <text
                  x={svgWidth / 2}
                  y={svgHeight - 20}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="900"
                  fill="black"
                >
                  Good A
                </text>
                <text
                  x={20}
                  y={svgHeight / 2}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="900"
                  fill="black"
                  transform={`rotate(-90, 20, ${svgHeight / 2})`}
                >
                  Good B
                </text>
                
                {/* PPC Curve - Bowed Out */}
                <path
                  d={basePPCPath}
                  fill="none"
                  stroke="black"
                  strokeWidth="4"
                />
                
                {/* Ghost Dot 1: Inside (Correct) */}
                <motion.circle
                  cx={dot1X}
                  cy={dot1Y}
                  r="15"
                  fill={level1Selected === 1 ? "#3b82f6" : "transparent"}
                  stroke="black"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                  className="cursor-pointer"
                  onClick={() => handleDotClick(1, dot1X, dot1Y)}
                  animate={
                    level1Selected === 1 && level1Correct
                      ? {}
                      : level1Selected === 1 && !level1Correct
                      ? { x: [0, -10, 10, -5, 5, 0] }
                      : {}
                  }
                />
                
                {/* Ghost Dot 2: On Curve */}
                <motion.circle
                  cx={dot2X}
                  cy={dot2Y}
                  r="15"
                  fill={level1Selected === 2 ? "#ef4444" : "transparent"}
                  stroke="black"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                  className="cursor-pointer"
                  onClick={() => handleDotClick(2, dot2X, dot2Y)}
                  animate={
                    level1Selected === 2
                      ? { x: [0, -10, 10, -5, 5, 0] }
                      : {}
                  }
                />
                
                {/* Ghost Dot 3: Outside */}
                <motion.circle
                  cx={dot3X}
                  cy={dot3Y}
                  r="15"
                  fill={level1Selected === 3 ? "#ef4444" : "transparent"}
                  stroke="black"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                  className="cursor-pointer"
                  onClick={() => handleDotClick(3, dot3X, dot3Y)}
                  animate={
                    level1Selected === 3
                      ? { x: [0, -10, 10, -5, 5, 0] }
                      : {}
                  }
                />
              </svg>
            </div>
            
            {level1Correct && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-green-600 font-bold text-lg"
              >
                Correct! Moving to Level 2...
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Level 2: Button Control */}
        {level === 2 && (
          <motion.div
            key="level2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-black text-black mb-4">
              Scenario: Improved Technology. Show the shift.
            </h2>
            
            <div className="w-full flex flex-col items-center space-y-6">
              <svg
                width={svgWidth}
                height={svgHeight}
                className="border-4 border-black rounded-xl bg-white"
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              >
                {/* Axes */}
                <line
                  x1={padding}
                  y1={svgHeight - padding}
                  x2={svgWidth - padding}
                  y2={svgHeight - padding}
                  stroke="black"
                  strokeWidth="3"
                />
                <line
                  x1={padding}
                  y1={padding}
                  x2={padding}
                  y2={svgHeight - padding}
                  stroke="black"
                  strokeWidth="3"
                />
                
                {/* Axis labels */}
                <text
                  x={svgWidth / 2}
                  y={svgHeight - 20}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="900"
                  fill="black"
                >
                  Good A
                </text>
                <text
                  x={20}
                  y={svgHeight / 2}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="900"
                  fill="black"
                  transform={`rotate(-90, 20, ${svgHeight / 2})`}
                >
                  Good B
                </text>
                
                {/* Ghost of old curve (shown when correct) */}
                {showGhost && (
                  <path
                    d={basePPCPath}
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="3"
                    strokeDasharray="8 4"
                    opacity={0.5}
                  />
                )}
                
                {/* Animated PPC Curve */}
                <motion.path
                  d={getPPCPath(level2CurveOffset, svgWidth, svgHeight, padding)}
                  fill="none"
                  stroke="black"
                  strokeWidth="4"
                  initial={false}
                  animate={{
                    d: getPPCPath(level2CurveOffset, svgWidth, svgHeight, padding),
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </svg>
              
              {/* Control Buttons */}
              <div className="flex gap-4">
                <motion.button
                  onClick={handleShiftLeft}
                  disabled={level2Correct}
                  className="px-8 py-4 bg-white border-4 border-black rounded-xl font-black text-lg flex items-center gap-2 hover:bg-gray-50 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!level2Correct ? { scale: 1.05 } : {}}
                  whileTap={!level2Correct ? { scale: 0.95 } : {}}
                >
                  <ArrowLeft className="w-6 h-6" />
                  Shift Left
                </motion.button>
                <motion.button
                  onClick={handleShiftRight}
                  disabled={level2Correct}
                  className="px-8 py-4 bg-white border-4 border-black rounded-xl font-black text-lg flex items-center gap-2 hover:bg-gray-50 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!level2Correct ? { scale: 1.05 } : {}}
                  whileTap={!level2Correct ? { scale: 0.95 } : {}}
                >
                  Shift Right
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
            
            {level2CurveOffset < 0 && !level2Correct && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-red-600 font-bold text-lg"
              >
                That's an inward shift. Try shifting the curve outward (to the right)!
              </motion.div>
            )}
            {level2Correct && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-green-600 font-bold text-lg"
              >
                Correct! Moving to Level 3...
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Level 3: Math Input */}
        {level === 3 && (
          <motion.div
            key="level3"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-black text-black mb-4">
              We moved from A to B. What was the Opportunity Cost?
            </h2>
            
            <div className="w-full flex justify-center">
              <svg
                width={svgWidth}
                height={svgHeight}
                className="border-4 border-black rounded-xl bg-white"
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              >
                {/* Axes */}
                <line
                  x1={padding}
                  y1={svgHeight - padding}
                  x2={svgWidth - padding}
                  y2={svgHeight - padding}
                  stroke="black"
                  strokeWidth="3"
                />
                <line
                  x1={padding}
                  y1={padding}
                  x2={padding}
                  y2={svgHeight - padding}
                  stroke="black"
                  strokeWidth="3"
                />
                
                {/* Axis labels */}
                <text
                  x={svgWidth / 2}
                  y={svgHeight - 20}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="900"
                  fill="black"
                >
                  Robots
                </text>
                <text
                  x={20}
                  y={svgHeight / 2}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="900"
                  fill="black"
                  transform={`rotate(-90, 20, ${svgHeight / 2})`}
                >
                  Wheat
                </text>
                
                {/* Points A and B */}
                <circle cx={padding} cy={svgHeight - padding - 10} r="8" fill="#3b82f6" stroke="black" strokeWidth="2" />
                <text x={padding - 15} y={svgHeight - padding - 20} fontSize="16" fontWeight="900" fill="black">A</text>
                
                <circle cx={padding + 100} cy={svgHeight - padding - 50} r="8" fill="#3b82f6" stroke="black" strokeWidth="2" />
                <text x={padding + 100 - 15} y={svgHeight - padding - 60} fontSize="16" fontWeight="900" fill="black">B</text>
                
                {/* Line connecting A to B */}
                <line
                  x1={padding}
                  y1={svgHeight - padding - 10}
                  x2={padding + 100}
                  y2={svgHeight - padding - 50}
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
            
            <div className="flex flex-col items-center space-y-4">
              <label className="text-lg font-bold text-gray-800">
                Robots given up:
              </label>
              <motion.input
                type="text"
                value={level3Answer}
                onChange={(e) => handleLevel3Input(e.target.value)}
                onKeyDown={handleLevel3KeyDown}
                onFocus={() => setLevel3Focused(true)}
                onBlur={() => {
                  setLevel3Focused(false);
                  handleLevel3Blur();
                }}
                disabled={level3Correct}
                whileFocus={{ scale: 1.02 }}
                className={`w-32 h-14 text-center text-2xl font-black border-4 border-black rounded-xl outline-none transition-all ${
                  level3Correct
                    ? "bg-green-100 border-green-500"
                    : "bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                } ${level3Correct ? "cursor-default" : ""}`}
                placeholder={level3Focused || level3Answer ? "" : "?"}
              />
            </div>
            
            {level3Correct && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-green-600 font-bold text-lg"
              >
                Correct! Drill complete!
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

