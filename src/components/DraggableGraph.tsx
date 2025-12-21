"use client";

import React, { useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { RefreshCcw } from "lucide-react";

interface DraggableGraphProps {
  onComplete?: () => void;
}

export default function DraggableGraph({ onComplete }: DraggableGraphProps) {
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [feedback, setFeedback] = useState<"neutral" | "correct" | "wrong">("neutral");
  const [isDragging, setIsDragging] = useState(false);
  const [draggingCurve, setDraggingCurve] = useState<"AD" | "SRAS" | "LRAS" | null>(null);
  const [stage3Answers, setStage3Answers] = useState<{
    priceLevel: "increase" | "decrease" | "stay the same" | null;
    output: "increase" | "decrease" | "stay the same" | null;
    unemployment: "increase" | "decrease" | "stay the same" | null;
  }>({
    priceLevel: null,
    output: null,
    unemployment: null,
  });
  
  // Correct answers for stage 3
  const correctAnswers = {
    priceLevel: "decrease" as const,
    output: "stay the same" as const,
    unemployment: "stay the same" as const,
  };
  
  // Motion Values track the X position of each curve
  const adX = useMotionValue(0);
  const srasX = useMotionValue(0);
  const lrasX = useMotionValue(0);
  
  // Handle drag end for AD curve
  const handleADDragEnd = () => {
    setIsDragging(false);
    setDraggingCurve(null);
    const currentX = adX.get();
    
    // Stage 1: Only AD left shift is correct
    if (stage === 1) {
      if (currentX < -50) {
        // Snap to left drop spot (correct)
        animate(adX, leftDropSpot, { type: "spring", stiffness: 300, damping: 20 });
        setFeedback("correct");
        // Move to stage 2 after animation completes
        setTimeout(() => {
          setStage(2);
          setFeedback("neutral");
        }, 400);
      } else if (currentX > 50) {
        // Snap to right drop spot (wrong)
        animate(adX, rightDropSpot, { type: "spring", stiffness: 300, damping: 20 });
        setFeedback("wrong");
      } else {
        // Snap back to center if not moved enough
        animate(adX, 0, { type: "spring", stiffness: 300, damping: 20 });
        setFeedback("neutral");
      }
    } else {
      // Stage 2: AD should not be draggable, snap back
      animate(adX, leftDropSpot, { type: "spring", stiffness: 300, damping: 20 });
    }
  };
  
  const handleADDragStart = () => {
    setIsDragging(true);
    setDraggingCurve("AD");
  };
  
  // Handle drag end for SRAS curve
  const handleSRASDragEnd = () => {
    setIsDragging(false);
    setDraggingCurve(null);
    const currentX = srasX.get();
    
    if (stage === 1) {
      // Stage 1: SRAS any direction is wrong
      if (currentX < -50) {
        // Snap to left drop spot (wrong)
        animate(srasX, leftDropSpot, { type: "spring", stiffness: 300, damping: 20 });
        setFeedback("wrong");
      } else if (currentX > 50) {
        // Snap to right drop spot (wrong)
        animate(srasX, rightDropSpot, { type: "spring", stiffness: 300, damping: 20 });
        setFeedback("wrong");
      } else {
        // Snap back to center if not moved enough
        animate(srasX, 0, { type: "spring", stiffness: 300, damping: 20 });
        setFeedback("neutral");
      }
    } else {
      // Stage 2: Only SRAS right shift is correct
      if (currentX > 50) {
        // Snap to right drop spot (correct)
        animate(srasX, rightDropSpot, { type: "spring", stiffness: 300, damping: 20 });
        setFeedback("correct");
        // Call onComplete callback when graph is successfully completed
        if (onComplete) {
          setTimeout(() => {
            onComplete();
          }, 400);
        }
        // Move to stage 3 after animation completes
        setTimeout(() => {
          setStage(3);
          setFeedback("neutral");
        }, 400);
      } else if (currentX < -50) {
        // Snap to left drop spot (wrong)
        animate(srasX, leftDropSpot, { type: "spring", stiffness: 300, damping: 20 });
        setFeedback("wrong");
      } else {
        // Snap back to center if not moved enough
        animate(srasX, 0, { type: "spring", stiffness: 300, damping: 20 });
        setFeedback("neutral");
      }
    }
  };
  
  const handleSRASDragStart = () => {
    setIsDragging(true);
    setDraggingCurve("SRAS");
  };
  
  // Handle drag end for LRAS curve
  const handleLRASDragEnd = () => {
    setIsDragging(false);
    setDraggingCurve(null);
    const currentX = lrasX.get();
    
    // LRAS any direction is wrong in both stages
    if (currentX < -25) {
      // Snap to left drop spot (wrong)
      animate(lrasX, lrasLeftDropSpot, { type: "spring", stiffness: 300, damping: 20 });
      setFeedback("wrong");
    } else if (currentX > 25) {
      // Snap to right drop spot (wrong)
      animate(lrasX, lrasRightDropSpot, { type: "spring", stiffness: 300, damping: 20 });
      setFeedback("wrong");
    } else {
      // Snap back to center if not moved enough
      animate(lrasX, 0, { type: "spring", stiffness: 300, damping: 20 });
      setFeedback("neutral");
    }
  };
  
  const handleLRASDragStart = () => {
    setIsDragging(true);
    setDraggingCurve("LRAS");
  };
  
  // Reset Function
  const resetGraph = () => {
    if (stage === 3) {
      // Reset stage 3 answers, go back to stage 2
      setStage3Answers({ priceLevel: null, output: null, unemployment: null });
      setFeedback("neutral");
      setStage(2);
    } else if (stage === 2) {
      // Only reset stage 2 progress (SRAS), keep AD shifted left from stage 1
      animate(srasX, 0);
      setFeedback("neutral");
      setIsDragging(false);
      setDraggingCurve(null);
      // Stay on stage 2
    } else {
      // Reset everything and go back to stage 1
      animate(adX, 0);
      animate(srasX, 0);
      animate(lrasX, 0);
      setFeedback("neutral");
      setIsDragging(false);
      setDraggingCurve(null);
      setStage(1);
    }
  };
  
  // Drop spot positions (in pixels relative to center)
  const leftDropSpot = -100; // Left shift
  const rightDropSpot = 100; // Right shift
  const lrasLeftDropSpot = -50; // LRAS left shift (shorter)
  const lrasRightDropSpot = 50; // LRAS right shift (shorter)
  
  // Container background color based on feedback
  const containerBgColor = feedback === "wrong" ? "bg-red-200" : feedback === "correct" ? "bg-green-200" : "bg-white";
  
  const handleStage3Select = <K extends keyof typeof stage3Answers>(
    key: K,
    option: (typeof stage3Answers)[K]
  ) => {
    // Do not allow changes once an answer for this field is set
    if (stage3Answers[key] !== null) return;
    setStage3Answers((prev) => ({ ...prev, [key]: option }));
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Instruction Text - Above the graph */}
      <div className="mb-4">
        <p className="text-lg font-bold text-black bg-white px-4 py-2 rounded-lg border-2 border-black shadow-md">
          {stage === 1 
            ? "Suppose fears of a recession cause consumers to spend less. Show the shift that occurs."
            : stage === 2
            ? "Suppose the economy undergoes long-run self adjustment. Show the change on the graph."
            : "Compared to the initial equilibrium, how have each of the following changed?"}
        </p>
      </div>
      
      <motion.div 
        className={`relative ${containerBgColor} rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden aspect-[16/9] transition-colors duration-300`}
        animate={
          feedback === "wrong"
            ? {
                x: [0, -10, 10, -10, 10, -5, 5, 0],
                transition: { duration: 0.5, ease: "easeInOut" }
              }
            : feedback === "correct"
            ? {
                scale: [1, 1.05, 1],
                transition: { duration: 0.4, ease: "easeOut" }
              }
            : {}
        }
      >
        
        {/* Reset Button */}
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={resetGraph}
            className="p-2 bg-white border-2 border-black rounded-full hover:bg-gray-100 active:translate-y-1 transition-transform"
          >
            <RefreshCcw size={16} />
          </button>
        </div>
        
        {stage === 3 ? (
          /* Stage 3: Radio Button Questions */
          <div className="w-full h-full p-8 flex flex-col justify-center items-center">
            <div className="w-full max-w-2xl space-y-6">
              {/* Price Level */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-black text-center">Price Level</h3>
                <div className="flex gap-4 justify-center">
                  {(["increase", "decrease", "stay the same"] as const).map((option) => {
                    const isSelected = stage3Answers.priceLevel === option;
                    const isCorrect = option === correctAnswers.priceLevel;
                    const showFeedback = stage3Answers.priceLevel !== null;
                    const isWrong = isSelected && !isCorrect;
                    const showCorrect = showFeedback && !isSelected && isCorrect;
                    const locked = stage3Answers.priceLevel !== null;
                    
                    return (
                      <label
                        key={option}
                        className={`flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg cursor-pointer transition-all ${
                          isWrong
                            ? "bg-red-200 text-black"
                            : isSelected && isCorrect
                            ? "bg-green-200 text-black"
                            : showCorrect
                            ? "bg-green-200 text-black"
                            : isSelected
                            ? "bg-black text-white"
                            : "bg-white text-black hover:bg-gray-100"
                        } ${locked ? "cursor-default opacity-80" : ""}`}
                      >
                        <input
                          type="radio"
                          name="priceLevel"
                          value={option}
                          checked={isSelected}
                          disabled={locked}
                          onChange={() => handleStage3Select("priceLevel", option)}
                          className="sr-only"
                        />
                        <span className="font-semibold capitalize">{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Output */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-black text-center">Output</h3>
                <div className="flex gap-4 justify-center">
                  {(["increase", "decrease", "stay the same"] as const).map((option) => {
                    const isSelected = stage3Answers.output === option;
                    const isCorrect = option === correctAnswers.output;
                    const showFeedback = stage3Answers.output !== null;
                    const isWrong = isSelected && !isCorrect;
                    const showCorrect = showFeedback && !isSelected && isCorrect;
                    const locked = stage3Answers.output !== null;
                    
                    return (
                      <label
                        key={option}
                        className={`flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg cursor-pointer transition-all ${
                          isWrong
                            ? "bg-red-200 text-black"
                            : isSelected && isCorrect
                            ? "bg-green-200 text-black"
                            : showCorrect
                            ? "bg-green-200 text-black"
                            : isSelected
                            ? "bg-black text-white"
                            : "bg-white text-black hover:bg-gray-100"
                        } ${locked ? "cursor-default opacity-80" : ""}`}
                      >
                        <input
                          type="radio"
                          name="output"
                          value={option}
                          checked={isSelected}
                          disabled={locked}
                          onChange={() => handleStage3Select("output", option)}
                          className="sr-only"
                        />
                        <span className="font-semibold capitalize">{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Unemployment */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-black text-center">Unemployment</h3>
                <div className="flex gap-4 justify-center">
                  {(["increase", "decrease", "stay the same"] as const).map((option) => {
                    const isSelected = stage3Answers.unemployment === option;
                    const isCorrect = option === correctAnswers.unemployment;
                    const showFeedback = stage3Answers.unemployment !== null;
                    const isWrong = isSelected && !isCorrect;
                    const showCorrect = showFeedback && !isSelected && isCorrect;
                    const locked = stage3Answers.unemployment !== null;
                    
                    return (
                      <label
                        key={option}
                        className={`flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg cursor-pointer transition-all ${
                          isWrong
                            ? "bg-red-200 text-black"
                            : isSelected && isCorrect
                            ? "bg-green-200 text-black"
                            : showCorrect
                            ? "bg-green-200 text-black"
                            : isSelected
                            ? "bg-black text-white"
                            : "bg-white text-black hover:bg-gray-100"
                        } ${locked ? "cursor-default opacity-80" : ""}`}
                      >
                        <input
                          type="radio"
                          name="unemployment"
                          value={option}
                          checked={isSelected}
                          disabled={locked}
                          onChange={() => handleStage3Select("unemployment", option)}
                          className="sr-only"
                        />
                        <span className="font-semibold capitalize">{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* THE GRAPH CANVAS */
          <svg className="w-full h-full p-8" viewBox="0 0 800 450">
          
          {/* 1. Static Axes */}
          <line x1="80" y1="50" x2="80" y2="400" stroke="black" strokeWidth="4" strokeLinecap="round" /> {/* Y Axis */}
          <line x1="80" y1="400" x2="750" y2="400" stroke="black" strokeWidth="4" strokeLinecap="round" /> {/* X Axis */}
          <text x="40" y="230" fill="black" fontSize="18" fontWeight="900" transform="rotate(-90 40 230)">Price Level</text>
          <text x="415" y="430" fill="black" fontSize="18" fontWeight="900">Real GDP</text>
          
          {/* 2. Draggable SRAS Curve (Upward) - Shorter 45 degree angle from bottom-left to top-right */}
          <motion.g
            drag="x" // Always draggable
            dragConstraints={{ left: -150, right: 150 }}
            dragElastic={0.1}
            style={{ x: srasX }}
            onDragStart={handleSRASDragStart}
            onDragEnd={handleSRASDragEnd}
            className="cursor-grab active:cursor-grabbing"
          >
            <motion.line 
              x1="200" y1="380" 
              x2="600" y2="120" 
              stroke="black" 
              strokeWidth="6" 
              strokeLinecap="round"
            />
            <motion.text 
              x="610" 
              y="115" 
              fill="black" 
              fontSize="20" 
              fontWeight="900"
            >
              SRAS
            </motion.text>
            {/* Invisible Touch Area */}
            <line x1="200" y1="380" x2="600" y2="120" stroke="transparent" strokeWidth="40" />
          </motion.g>
          
          {/* 3. Draggable LRAS (Vertical) - Solid line, at the intersection point */}
          <motion.g
            drag="x" // Always draggable
            dragConstraints={{ left: -150, right: 150 }}
            dragElastic={0.1}
            style={{ x: lrasX }}
            onDragStart={handleLRASDragStart}
            onDragEnd={handleLRASDragEnd}
            className="cursor-grab active:cursor-grabbing"
          >
            <motion.line 
              x1="400" y1="50" 
              x2="400" y2="400" 
              stroke="black" 
              strokeWidth="4" 
              strokeLinecap="round"
            />
            <motion.text 
              x="410" 
              y="35" 
              fill="black" 
              fontSize="18" 
              fontWeight="900"
            >
              LRAS
            </motion.text>
            {/* Invisible Touch Area */}
            <line x1="400" y1="50" x2="400" y2="400" stroke="transparent" strokeWidth="40" />
          </motion.g>
          
          {/* Drop Spots - Visible when dragging any curve */}
          {isDragging && draggingCurve && (
            <>
              {/* Left Drop Spot */}
              {draggingCurve === "AD" && (
                <g>
                  <line 
                    x1={200 + leftDropSpot} y1="120" 
                    x2={600 + leftDropSpot} y2="380" 
                    stroke="#94a3b8" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    strokeDasharray="10 10"
                    opacity="0.5"
                  />
                  <circle cx={400 + leftDropSpot} cy="250" r="12" fill="#94a3b8" opacity="0.2" />
                </g>
              )}
              {draggingCurve === "SRAS" && (
                <g>
                  <line 
                    x1={200 + leftDropSpot} y1="380" 
                    x2={600 + leftDropSpot} y2="120" 
                    stroke="#94a3b8" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    strokeDasharray="10 10"
                    opacity="0.5"
                  />
                  <circle cx={400 + leftDropSpot} cy="250" r="12" fill="#94a3b8" opacity="0.2" />
                </g>
              )}
              {draggingCurve === "LRAS" && (
                <g>
                  <line 
                    x1={400 + lrasLeftDropSpot} y1="50" 
                    x2={400 + lrasLeftDropSpot} y2="400" 
                    stroke="#94a3b8" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    strokeDasharray="10 10"
                    opacity="0.5"
                  />
                  <circle cx={400 + lrasLeftDropSpot} cy="225" r="12" fill="#94a3b8" opacity="0.2" />
                </g>
              )}
              
              {/* Right Drop Spot */}
              {draggingCurve === "AD" && (
                <g>
                  <line 
                    x1={200 + rightDropSpot} y1="120" 
                    x2={600 + rightDropSpot} y2="380" 
                    stroke="#94a3b8" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    strokeDasharray="10 10"
                    opacity="0.5"
                  />
                  <circle cx={400 + rightDropSpot} cy="250" r="12" fill="#94a3b8" opacity="0.2" />
                </g>
              )}
              {draggingCurve === "SRAS" && (
                <g>
                  <line 
                    x1={200 + rightDropSpot} y1="380" 
                    x2={600 + rightDropSpot} y2="120" 
                    stroke="#94a3b8" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    strokeDasharray="10 10"
                    opacity="0.5"
                  />
                  <circle cx={400 + rightDropSpot} cy="250" r="12" fill="#94a3b8" opacity="0.2" />
                </g>
              )}
              {draggingCurve === "LRAS" && (
                <g>
                  <line 
                    x1={400 + lrasRightDropSpot} y1="50" 
                    x2={400 + lrasRightDropSpot} y2="400" 
                    stroke="#94a3b8" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    strokeDasharray="10 10"
                    opacity="0.5"
                  />
                  <circle cx={400 + lrasRightDropSpot} cy="225" r="12" fill="#94a3b8" opacity="0.2" />
                </g>
              )}
            </>
          )}
          
          {/* 4. Draggable AD Curve (Downward) - Shorter 45 degree angle from top-left to bottom-right */}
          {/* Shorter curve, still at 45 degrees, passing through center at (400, 225) */}
          <motion.g
            drag="x" // Always draggable
            dragConstraints={{ left: -150, right: 150 }}
            dragElastic={0.1}
            style={{ x: adX }}
            onDragStart={handleADDragStart}
            onDragEnd={handleADDragEnd}
            className="cursor-grab active:cursor-grabbing"
          >
            {/* The Line - AD curve at 45 degrees, shorter length */}
            <motion.line 
              x1="200" y1="120" 
              x2="600" y2="380" 
              stroke="black" 
              strokeWidth="6" // THICK LINES
              strokeLinecap="round"
            />
            
            {/* The Label (Moves with the line) */}
            <motion.text 
              x="190" 
              y="115" 
              className="text-xl font-black"
              fill="black"
            >
              AD
            </motion.text>
            
            {/* Invisible Touch Area (Makes it easier to grab on mobile) */}
            <line x1="200" y1="120" x2="600" y2="380" stroke="transparent" strokeWidth="40" />
          </motion.g>
          
        </svg>
        )}
      </motion.div>
    </div>
  );
}


