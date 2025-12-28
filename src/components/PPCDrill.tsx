"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";

interface PPCDrillProps {
  onComplete?: () => void;
  currentLevel?: 1 | 2;
  onLevel1Ready?: () => void;
}

// Helper function to calculate PPC curve path
// Creates a bowed-out (concave to origin) curve using a quadratic Bezier
function getPPCPath(svgWidth: number, svgHeight: number, padding: number): string {
  const ppcStartX = padding;
  const ppcStartY = padding;
  const ppcEndX = svgWidth - padding;
  const ppcEndY = svgHeight - padding;
  
  // Control point for bowed-out curve
  const midX = (ppcStartX + ppcEndX) / 2;
  const controlY = ppcStartY + (ppcEndY - ppcStartY) * 0.15; // 15% down from start creates nice bow
  const controlX = midX;

  // Use quadratic Bezier for a smooth bowed-out curve
  return `M ${ppcStartX} ${ppcStartY} Q ${controlX} ${controlY}, ${ppcEndX} ${ppcEndY}`;
}

export function PPCDrill({ onComplete, currentLevel = 1, onLevel1Ready }: PPCDrillProps) {
  const [level, setLevel] = useState<1 | 2>(currentLevel);
  
  // Sync level with prop changes
  useEffect(() => {
    setLevel(currentLevel);
  }, [currentLevel]);
  const [level1Selected, setLevel1Selected] = useState<number | null>(null);
  const [level1Correct, setLevel1Correct] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Level 2: Opportunity Cost Table
  const [level2Answers, setLevel2Answers] = useState<{
    aToB: string;
    bToC: string;
    dToC: string;
  }>({
    aToB: "",
    bToC: "",
    dToC: "",
  });
  const [level2Feedback, setLevel2Feedback] = useState<{
    aToB: "correct" | "incorrect" | null;
    bToC: "correct" | "incorrect" | null;
    dToC: "correct" | "incorrect" | null;
  }>({
    aToB: null,
    bToC: null,
    dToC: null,
  });
  const [level2Complete, setLevel2Complete] = useState(false);

  // Production combinations table data
  // Point A: 0 Computers, 20 Textbooks
  // Point B: 5 Computers, 18 Textbooks (OC: 2 textbooks)
  // Point C: 10 Computers, 14 Textbooks (OC: 4 textbooks)
  // Point D: 15 Computers, 8 Textbooks (OC: 6 textbooks)
  const productionTable = [
    { point: "A", computers: 0, textbooks: 20 },
    { point: "B", computers: 5, textbooks: 18 },
    { point: "C", computers: 10, textbooks: 14 },
    { point: "D", computers: 15, textbooks: 8 },
  ];

  // Correct answers for opportunity cost
  const correctAnswers = {
    aToB: "2", // Moving from A to B: 2 textbooks given up
    bToC: "4", // Moving from B to C: 4 textbooks given up
    dToC: "5", // Moving from D to C: 5 computers given up (going backwards, so we're giving up 5 computers to gain 6 textbooks)
  };

  // SVG dimensions
  const svgWidth = 600;
  const svgHeight = 400;
  const padding = 60;

  // Base PPC curve path (for Level 1)
  const basePPCPath = getPPCPath(svgWidth, svgHeight, padding);

  // Helper function to calculate a point on the PPC curve at parameter t (0-1)
  const getPointOnCurve = (t: number): { x: number; y: number } => {
    const startX = padding;
    const startY = padding;
    const endX = svgWidth - padding;
    const endY = svgHeight - padding;
    const midX = (startX + endX) / 2;
    const controlY = startY + (endY - startY) * 0.15;
    
    const x = Math.pow(1 - t, 2) * startX + 2 * (1 - t) * t * midX + Math.pow(t, 2) * endX;
    const y = Math.pow(1 - t, 2) * startY + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * endY;
    
    return { x, y };
  };

  // Level 1: Ghost dot positions
  // Dot 1: Inside the curve (correct for unemployment/recession)
  const dot1X = svgWidth * 0.4;
  const dot1Y = svgHeight * 0.6;
  // Dot 2: On the curve (first point)
  const dot2OnCurve = getPointOnCurve(0.3);
  const dot2X = dot2OnCurve.x;
  const dot2Y = dot2OnCurve.y;
  // Dot 3: On the curve (second point)
  const dot3OnCurve = getPointOnCurve(0.7);
  const dot3X = dot3OnCurve.x;
  const dot3Y = dot3OnCurve.y;

  // Check if a point is inside the PPC curve area
  const isPointInsidePPC = (x: number, y: number): boolean => {
    const startX = padding;
    const startY = padding;
    const endX = svgWidth - padding;
    const endY = svgHeight - padding;
    
    const midX = (startX + endX) / 2;
    const controlY = startY + (endY - startY) * 0.15;
    
    const t = (x - startX) / (endX - startX);
    if (t < 0 || t > 1) return false;
    
    const curveY = Math.pow(1 - t, 2) * startY + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * endY;
    
    return y > curveY && x >= startX && x <= endX;
  };

  // Level 1: Handle dot click
  const handleDotClick = (dotIndex: number, x: number, y: number) => {
    if (level1Selected !== null) return;
    
    setLevel1Selected(dotIndex);
    const isCorrect = dotIndex === 1 && isPointInsidePPC(x, y);
    
    if (isCorrect) {
      setLevel1Correct(true);
    } else {
      setShowTooltip(true);
    }
    
    // Signal that level 1 is ready to proceed (enables external Next button)
    onLevel1Ready?.();
  };

  // Level 2: Handle opportunity cost input
  const handleOpportunityCostInput = (question: "aToB" | "bToC" | "dToC", value: string) => {
    if (level2Feedback[question] !== null) return; // Already answered
    
    setLevel2Answers(prev => ({ ...prev, [question]: value }));
  };

  const handleOpportunityCostSubmit = (question: "aToB" | "bToC" | "dToC") => {
    const answer = level2Answers[question].trim().toLowerCase();
    const correctAnswer = correctAnswers[question];
    
    // Convert number words to digits
    const numberWords: { [key: string]: string } = {
      "zero": "0", "one": "1", "two": "2", "three": "3", "four": "4",
      "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9"
    };
    
    // Extract number from answer (handles "2", "two", "2 textbooks", "two textbooks", "5 computers", "five computers", etc.)
    let normalizedAnswer = answer;
    
    // Remove "textbooks", "textbook", "computers", or "computer" from the answer
    normalizedAnswer = normalizedAnswer.replace(/\s*(textbooks?|computers?)\s*/gi, '');
    
    // Try to convert number words to digits
    for (const [word, digit] of Object.entries(numberWords)) {
      if (normalizedAnswer === word || normalizedAnswer.startsWith(word + ' ')) {
        normalizedAnswer = digit;
        break;
      }
    }
    
    // Extract just the number (remove any remaining non-numeric characters except decimal point)
    normalizedAnswer = normalizedAnswer.replace(/[^0-9.]/g, '');
    
    // Check if answer is correct
    const isCorrect = normalizedAnswer === correctAnswer;
    
    setLevel2Feedback(prev => ({ ...prev, [question]: isCorrect ? "correct" : "incorrect" }));
    
    // Check if all questions are answered correctly
    const allCorrect = Object.values({ ...level2Feedback, [question]: isCorrect ? "correct" : "incorrect" })
      .every(feedback => feedback === "correct");
    
    if (allCorrect && isCorrect) {
      setLevel2Complete(true);
      // Signal to parent that stage is complete (enables Next button)
      onComplete?.();
    }
  };

  // Reset state when level changes
  useEffect(() => {
    if (level === 1) {
      setLevel1Selected(null);
      setLevel1Correct(false);
      setShowTooltip(false);
    }
  }, [level]);

  return (
    <div className="w-full h-full overflow-y-auto">
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
                  fill={
                    level1Selected === 1 && level1Correct
                      ? "#10b981"
                      : showTooltip
                      ? "#10b981"
                      : level1Selected === 1
                      ? "#ef4444"
                      : "transparent"
                  }
                  stroke={showTooltip ? "#10b981" : "black"}
                  strokeWidth={showTooltip ? "4" : "3"}
                  strokeDasharray="4 4"
                  className="cursor-pointer"
                  onClick={() => handleDotClick(1, dot1X, dot1Y)}
                  animate={
                    showTooltip
                      ? { scale: [1, 1.2, 1], strokeWidth: [4, 5, 4] }
                      : level1Selected === 1 && !level1Correct
                      ? { x: [0, -10, 10, -5, 5, 0] }
                      : {}
                  }
                  transition={{ duration: 0.5, repeat: showTooltip ? Infinity : 0, repeatDelay: 0.5 }}
                />
                
                {/* Ghost Dot 2: On Curve (First Point) */}
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
                
                {/* Ghost Dot 3: On Curve (Second Point) */}
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

                {/* Tooltip for correct answer */}
                <AnimatePresence>
                  {showTooltip && (
                    <motion.g
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Tooltip background */}
                      <rect
                        x={dot1X - 140}
                        y={dot1Y - 60}
                        width={280}
                        height={45}
                        rx={8}
                        fill="#1f2937"
                        stroke="#10b981"
                        strokeWidth="2"
                      />
                      {/* Tooltip text */}
                      <text
                        x={dot1X}
                        y={dot1Y - 35}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="600"
                        fill="white"
                      >
                        A point inside the PPC shows
                      </text>
                      <text
                        x={dot1X}
                        y={dot1Y - 18}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="600"
                        fill="white"
                      >
                        an economy in recession
                      </text>
                      {/* Arrow pointing to dot */}
                      <path
                        d={`M ${dot1X} ${dot1Y - 15} L ${dot1X} ${dot1Y - 5}`}
                        stroke="#10b981"
                        strokeWidth="3"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                      />
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="10"
                          markerHeight="10"
                          refX="5"
                          refY="5"
                          orient="auto"
                        >
                          <polygon
                            points="0,0 10,5 0,10"
                            fill="#10b981"
                          />
                        </marker>
                      </defs>
                    </motion.g>
                  )}
                </AnimatePresence>
              </svg>
            </div>
            
            {level1Correct && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-green-600 font-bold text-lg"
              >
                Correct! Click Next to continue.
              </motion.div>
            )}
            
            {showTooltip && !level1Correct && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-gray-600 font-semibold"
              >
                Click Next to continue.
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Level 2: Opportunity Cost Table */}
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
              Calculate Opportunity Cost
            </h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Use the production combinations table below to calculate the opportunity cost of moving between points.
              <br />
              <span className="font-semibold">Opportunity Cost = Total Quantity Given Up</span>
            </p>

            {/* Production Combinations Table */}
            <div className="w-full overflow-x-auto">
              <table className="w-full border-4 border-black bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border-2 border-black px-4 py-3 text-left font-black text-lg">Point</th>
                    <th className="border-2 border-black px-4 py-3 text-center font-black text-lg">Computers</th>
                    <th className="border-2 border-black px-4 py-3 text-center font-black text-lg">Textbooks</th>
                  </tr>
                </thead>
                <tbody>
                  {productionTable.map((row, index) => (
                    <tr key={row.point} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border-2 border-black px-4 py-3 font-bold text-lg">{row.point}</td>
                      <td className="border-2 border-black px-4 py-3 text-center font-semibold">{row.computers}</td>
                      <td className="border-2 border-black px-4 py-3 text-center font-semibold">{row.textbooks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Opportunity Cost Questions */}
            <div className="space-y-6 mt-8">
              {/* Question 1: A to B */}
              <div className="bg-white border-4 border-black rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-black">
                    Moving from Point A to Point B:
                  </h3>
                  {level2Feedback.aToB === "correct" && (
                    <Check className="w-6 h-6 text-green-600" />
                  )}
                  {level2Feedback.aToB === "incorrect" && (
                    <X className="w-6 h-6 text-red-600" />
                  )}
                </div>
                <p className="text-gray-700 mb-4">
                  What is the opportunity cost of producing 5 more computers? (How many textbooks are given up?)
                </p>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    value={level2Answers.aToB}
                    onChange={(e) => handleOpportunityCostInput("aToB", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && level2Feedback.aToB === null) {
                        handleOpportunityCostSubmit("aToB");
                      }
                    }}
                    disabled={level2Feedback.aToB !== null}
                    className={`flex-1 h-12 px-4 text-center text-xl font-bold border-4 border-black rounded-lg outline-none transition-all ${
                      level2Feedback.aToB === "correct"
                        ? "bg-green-100 border-green-500"
                        : level2Feedback.aToB === "incorrect"
                        ? "bg-red-100 border-red-500"
                        : "bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    } ${level2Feedback.aToB !== null ? "cursor-default" : ""}`}
                    placeholder="?"
                  />
                  <motion.button
                    onClick={() => handleOpportunityCostSubmit("aToB")}
                    disabled={level2Feedback.aToB !== null || !level2Answers.aToB.trim()}
                    className="px-6 py-3 bg-blue-600 text-white border-4 border-black rounded-lg font-black text-lg hover:bg-blue-700 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={level2Feedback.aToB === null && level2Answers.aToB.trim() ? { scale: 1.05 } : {}}
                    whileTap={level2Feedback.aToB === null && level2Answers.aToB.trim() ? { scale: 0.95 } : {}}
                  >
                    Check
                  </motion.button>
                </div>
                {level2Feedback.aToB === "incorrect" && (
                  <p className="mt-2 text-red-600 font-semibold">
                    Try again! Count how many textbooks are given up when moving from Point A to Point B.
                  </p>
                )}
              </div>

              {/* Question 2: B to C */}
              <div className="bg-white border-4 border-black rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-black">
                    Moving from Point B to Point C:
                  </h3>
                  {level2Feedback.bToC === "correct" && (
                    <Check className="w-6 h-6 text-green-600" />
                  )}
                  {level2Feedback.bToC === "incorrect" && (
                    <X className="w-6 h-6 text-red-600" />
                  )}
                </div>
                <p className="text-gray-700 mb-4">
                  What is the opportunity cost of producing 5 more computers? (How many textbooks are given up?)
                </p>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    value={level2Answers.bToC}
                    onChange={(e) => handleOpportunityCostInput("bToC", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && level2Feedback.bToC === null) {
                        handleOpportunityCostSubmit("bToC");
                      }
                    }}
                    disabled={level2Feedback.bToC !== null}
                    className={`flex-1 h-12 px-4 text-center text-xl font-bold border-4 border-black rounded-lg outline-none transition-all ${
                      level2Feedback.bToC === "correct"
                        ? "bg-green-100 border-green-500"
                        : level2Feedback.bToC === "incorrect"
                        ? "bg-red-100 border-red-500"
                        : "bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    } ${level2Feedback.bToC !== null ? "cursor-default" : ""}`}
                    placeholder="?"
                  />
                <motion.button
                    onClick={() => handleOpportunityCostSubmit("bToC")}
                    disabled={level2Feedback.bToC !== null || !level2Answers.bToC.trim()}
                    className="px-6 py-3 bg-blue-600 text-white border-4 border-black rounded-lg font-black text-lg hover:bg-blue-700 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={level2Feedback.bToC === null && level2Answers.bToC.trim() ? { scale: 1.05 } : {}}
                    whileTap={level2Feedback.bToC === null && level2Answers.bToC.trim() ? { scale: 0.95 } : {}}
                  >
                    Check
                </motion.button>
              </div>
                {level2Feedback.bToC === "incorrect" && (
                  <p className="mt-2 text-red-600 font-semibold">
                    Try again! Count how many textbooks are given up when moving from Point B to Point C.
                  </p>
                )}
            </div>
            
              {/* Question 3: D to C */}
              <div className="bg-white border-4 border-black rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-black">
                    Moving from Point D to Point C:
                  </h3>
                  {level2Feedback.dToC === "correct" && (
                    <Check className="w-6 h-6 text-green-600" />
                  )}
                  {level2Feedback.dToC === "incorrect" && (
                    <X className="w-6 h-6 text-red-600" />
                  )}
            </div>
                <p className="text-gray-700 mb-4">
                  What is the opportunity cost? (How many computers are given up?)
                </p>
                <div className="flex items-center gap-4">
                  <input
                type="text"
                    value={level2Answers.dToC}
                    onChange={(e) => handleOpportunityCostInput("dToC", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && level2Feedback.dToC === null) {
                        handleOpportunityCostSubmit("dToC");
                      }
                    }}
                    disabled={level2Feedback.dToC !== null}
                    className={`flex-1 h-12 px-4 text-center text-xl font-bold border-4 border-black rounded-lg outline-none transition-all ${
                      level2Feedback.dToC === "correct"
                    ? "bg-green-100 border-green-500"
                        : level2Feedback.dToC === "incorrect"
                        ? "bg-red-100 border-red-500"
                    : "bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    } ${level2Feedback.dToC !== null ? "cursor-default" : ""}`}
                    placeholder="?"
                  />
                  <motion.button
                    onClick={() => handleOpportunityCostSubmit("dToC")}
                    disabled={level2Feedback.dToC !== null || !level2Answers.dToC.trim()}
                    className="px-6 py-3 bg-blue-600 text-white border-4 border-black rounded-lg font-black text-lg hover:bg-blue-700 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={level2Feedback.dToC === null && level2Answers.dToC.trim() ? { scale: 1.05 } : {}}
                    whileTap={level2Feedback.dToC === null && level2Answers.dToC.trim() ? { scale: 0.95 } : {}}
                  >
                    Check
                  </motion.button>
                </div>
                {level2Feedback.dToC === "incorrect" && (
                  <p className="mt-2 text-red-600 font-semibold">
                    Try again! Count how many computers are given up when moving from Point D to Point C.
                  </p>
                )}
              </div>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
