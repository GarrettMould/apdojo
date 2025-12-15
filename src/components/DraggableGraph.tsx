"use client";

import React, { useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { RefreshCcw } from "lucide-react";

export default function DraggableGraph() {
  const [feedback, setFeedback] = useState<"neutral" | "correct" | "wrong">("neutral");
  const [isDragging, setIsDragging] = useState(false);
  const [draggingCurve, setDraggingCurve] = useState<"AD" | "SRAS" | "LRAS" | null>(null);
  
  // Motion Values track the X position of each curve
  const adX = useMotionValue(0);
  const srasX = useMotionValue(0);
  const lrasX = useMotionValue(0);
  
  // Handle drag end for AD curve
  const handleADDragEnd = () => {
    setIsDragging(false);
    setDraggingCurve(null);
    const currentX = adX.get();
    
    // Only AD left shift is correct - snap to drop spots or center
    if (currentX < -50) {
      // Snap to left drop spot (correct)
      animate(adX, leftDropSpot, { type: "spring", stiffness: 300, damping: 20 });
      setFeedback("correct");
    } else if (currentX > 50) {
      // Snap to right drop spot (wrong)
      animate(adX, rightDropSpot, { type: "spring", stiffness: 300, damping: 20 });
      setFeedback("wrong");
    } else {
      // Snap back to center if not moved enough
      animate(adX, 0, { type: "spring", stiffness: 300, damping: 20 });
      setFeedback("neutral");
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
    
    // SRAS shifts are incorrect - snap to drop spots or center
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
    
    // LRAS shifts are incorrect - snap to drop spots or center
    if (currentX < -50) {
      // Snap to left drop spot (wrong)
      animate(lrasX, leftDropSpot, { type: "spring", stiffness: 300, damping: 20 });
      setFeedback("wrong");
    } else if (currentX > 50) {
      // Snap to right drop spot (wrong)
      animate(lrasX, rightDropSpot, { type: "spring", stiffness: 300, damping: 20 });
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
    animate(adX, 0);
    animate(srasX, 0);
    animate(lrasX, 0);
    setFeedback("neutral");
    setIsDragging(false);
    setDraggingCurve(null);
  };
  
  // Drop spot positions (in pixels relative to center)
  const leftDropSpot = -100; // Left shift
  const rightDropSpot = 100; // Right shift
  
  // Container background color based on feedback
  const containerBgColor = feedback === "wrong" ? "bg-red-300" : feedback === "correct" ? "bg-green-300" : "bg-white";
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className={`relative ${containerBgColor} rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden aspect-[16/9] transition-colors duration-300`}>
        
        {/* Reset Button */}
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={resetGraph}
            className="p-2 bg-white border-2 border-black rounded-full hover:bg-gray-100 active:translate-y-1 transition-transform"
          >
            <RefreshCcw size={16} />
          </button>
        </div>
        
        {/* THE GRAPH CANVAS */}
        <svg className="w-full h-full p-8" viewBox="0 0 800 450">
          
          {/* 1. Static Axes */}
          <line x1="80" y1="50" x2="80" y2="400" stroke="black" strokeWidth="4" strokeLinecap="round" /> {/* Y Axis */}
          <line x1="80" y1="400" x2="750" y2="400" stroke="black" strokeWidth="4" strokeLinecap="round" /> {/* X Axis */}
          <text x="40" y="230" fill="black" fontSize="18" fontWeight="900" transform="rotate(-90 40 230)">Price Level</text>
          <text x="415" y="430" fill="black" fontSize="18" fontWeight="900">Real GDP</text>
          
          {/* 2. Draggable SRAS Curve (Upward) - Shorter 45 degree angle from bottom-left to top-right */}
          <motion.g
            drag="x" // Restrict to horizontal
            dragConstraints={{ left: -150, right: 150 }}
            dragElastic={0.1}
            style={{ x: srasX }}
            onDragStart={handleSRASDragStart}
            onDragEnd={handleSRASDragEnd}
            className="cursor-grab active:cursor-grabbing"
          >
            <motion.line 
              x1="250" y1="350" 
              x2="500" y2="150" 
              stroke="black" 
              strokeWidth="6" 
              strokeLinecap="round"
            />
            <motion.text 
              x="510" 
              y="145" 
              fill="black" 
              fontSize="20" 
              fontWeight="900"
            >
              SRAS
            </motion.text>
            {/* Invisible Touch Area */}
            <line x1="250" y1="350" x2="500" y2="150" stroke="transparent" strokeWidth="40" />
          </motion.g>
          
          {/* 3. Draggable LRAS (Vertical) - Solid line, at the intersection point */}
          <motion.g
            drag="x" // Restrict to horizontal
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
                    x1={250 + leftDropSpot} y1="100" 
                    x2={500 + leftDropSpot} y2="300" 
                    stroke="#94a3b8" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    strokeDasharray="10 10"
                    opacity="0.5"
                  />
                  <circle cx={375 + leftDropSpot} cy="200" r="12" fill="#94a3b8" opacity="0.2" />
                </g>
              )}
              {draggingCurve === "SRAS" && (
                <g>
                  <line 
                    x1={250 + leftDropSpot} y1="350" 
                    x2={500 + leftDropSpot} y2="150" 
                    stroke="#94a3b8" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    strokeDasharray="10 10"
                    opacity="0.5"
                  />
                  <circle cx={375 + leftDropSpot} cy="250" r="12" fill="#94a3b8" opacity="0.2" />
                </g>
              )}
              {draggingCurve === "LRAS" && (
                <g>
                  <line 
                    x1={400 + leftDropSpot} y1="50" 
                    x2={400 + leftDropSpot} y2="400" 
                    stroke="#94a3b8" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    strokeDasharray="10 10"
                    opacity="0.5"
                  />
                  <circle cx={400 + leftDropSpot} cy="225" r="12" fill="#94a3b8" opacity="0.2" />
                </g>
              )}
              
              {/* Right Drop Spot */}
              {draggingCurve === "AD" && (
                <g>
                  <line 
                    x1={250 + rightDropSpot} y1="100" 
                    x2={500 + rightDropSpot} y2="300" 
                    stroke="#94a3b8" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    strokeDasharray="10 10"
                    opacity="0.5"
                  />
                  <circle cx={375 + rightDropSpot} cy="200" r="12" fill="#94a3b8" opacity="0.2" />
                </g>
              )}
              {draggingCurve === "SRAS" && (
                <g>
                  <line 
                    x1={250 + rightDropSpot} y1="350" 
                    x2={500 + rightDropSpot} y2="150" 
                    stroke="#94a3b8" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    strokeDasharray="10 10"
                    opacity="0.5"
                  />
                  <circle cx={375 + rightDropSpot} cy="250" r="12" fill="#94a3b8" opacity="0.2" />
                </g>
              )}
              {draggingCurve === "LRAS" && (
                <g>
                  <line 
                    x1={400 + rightDropSpot} y1="50" 
                    x2={400 + rightDropSpot} y2="400" 
                    stroke="#94a3b8" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    strokeDasharray="10 10"
                    opacity="0.5"
                  />
                  <circle cx={400 + rightDropSpot} cy="225" r="12" fill="#94a3b8" opacity="0.2" />
                </g>
              )}
            </>
          )}
          
          {/* 4. Draggable AD Curve (Downward) - Shorter 45 degree angle from top-left to bottom-right */}
          {/* Shorter curve, still at 45 degrees, passing through center at (400, 225) */}
          <motion.g
            drag="x" // Restrict to horizontal
            dragConstraints={{ left: -150, right: 150 }}
            dragElastic={0.1}
            style={{ x: adX }}
            onDragStart={handleADDragStart}
            onDragEnd={handleADDragEnd}
            className="cursor-grab active:cursor-grabbing"
          >
            {/* The Line - AD curve at 45 degrees, shorter length */}
            <motion.line 
              x1="250" y1="100" 
              x2="500" y2="300" 
              stroke="black" 
              strokeWidth="6" // THICK LINES
              strokeLinecap="round"
            />
            
            {/* The Label (Moves with the line) */}
            <motion.text 
              x="260" 
              y="95" 
              className="text-xl font-black"
              fill="black"
            >
              AD
            </motion.text>
            
            {/* Invisible Touch Area (Makes it easier to grab on mobile) */}
            <line x1="250" y1="100" x2="500" y2="300" stroke="transparent" strokeWidth="40" />
          </motion.g>
          
        </svg>
      </div>
    </div>
  );
}
