"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { RefreshCcw, CheckCircle2 } from "lucide-react";

interface ConsumerProducerSurplusDrillProps {
  onComplete?: () => void;
}

export function ConsumerProducerSurplusDrill({ onComplete }: ConsumerProducerSurplusDrillProps) {
  // Track which hotspots have been clicked (by index)
  const [csHotspotsClicked, setCsHotspotsClicked] = useState<Set<number>>(new Set());
  const [psHotspotsClicked, setPsHotspotsClicked] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Number of hotspots for each area
  const numCSHotspots = 4;
  const numPSHotspots = 4;

  // Graph dimensions
  const graphWidth = 600;
  const graphHeight = 400;
  const padding = 60;
  const graphInnerWidth = graphWidth - padding * 2;
  const graphInnerHeight = graphHeight - padding * 2;

  // Demand curve points (downward sloping)
  const demandStartX = padding + 50;
  const demandStartY = padding + 30;
  const demandEndX = padding + graphInnerWidth - 50;
  const demandEndY = padding + graphInnerHeight - 30;
  
  // Supply curve points (upward sloping)
  const supplyStartX = padding + 50;
  const supplyStartY = padding + graphInnerHeight - 30;
  const supplyEndX = padding + graphInnerWidth - 50;
  const supplyEndY = padding + 30;

  // Calculate intersection point (equilibrium)
  const demandSlope = (demandEndY - demandStartY) / (demandEndX - demandStartX);
  const supplySlope = (supplyEndY - supplyStartY) / (supplyEndX - supplyStartX);
  const demandIntercept = demandStartY - demandSlope * demandStartX;
  const supplyIntercept = supplyStartY - supplySlope * supplyStartX;
  
  // Find intersection
  const intersectX = (supplyIntercept - demandIntercept) / (demandSlope - supplySlope);
  const intersectY = demandSlope * intersectX + demandIntercept;

  // Find where curves intersect y-axis (price axis at x = padding)
  const demandYIntercept = demandSlope * padding + demandIntercept;
  const supplyYIntercept = supplySlope * padding + supplyIntercept;

  // Create multiple Consumer Surplus hotspots (divided triangles)
  const createCSHotspots = () => {
    const hotspots = [];
    for (let i = 0; i < numCSHotspots; i++) {
      const t1 = i / numCSHotspots; // Start of this segment
      const t2 = (i + 1) / numCSHotspots; // End of this segment
      
      // Points along demand curve
      const x1 = padding + (intersectX - padding) * t1;
      const y1 = demandSlope * x1 + demandIntercept;
      const x2 = padding + (intersectX - padding) * t2;
      const y2 = demandSlope * x2 + demandIntercept;
      
      // Create triangle: point on demand curve, next point on demand curve, point on price line
      const path = `
        M ${x1} ${y1}
        L ${x2} ${y2}
        L ${x2} ${intersectY}
        L ${x1} ${intersectY}
        Z
      `;
      
      hotspots.push({
        path,
        centerX: (x1 + x2) / 2,
        centerY: (y1 + y2 + intersectY * 2) / 4
      });
    }
    return hotspots;
  };

  // Create multiple Producer Surplus hotspots (divided triangles)
  const createPSHotspots = () => {
    const hotspots = [];
    for (let i = 0; i < numPSHotspots; i++) {
      const t1 = i / numPSHotspots; // Start of this segment
      const t2 = (i + 1) / numPSHotspots; // End of this segment
      
      // Points along supply curve
      const x1 = padding + (intersectX - padding) * t1;
      const y1 = supplySlope * x1 + supplyIntercept;
      const x2 = padding + (intersectX - padding) * t2;
      const y2 = supplySlope * x2 + supplyIntercept;
      
      // Create triangle: point on supply curve, next point on supply curve, point on price line
      const path = `
        M ${x1} ${y1}
        L ${x2} ${y2}
        L ${x2} ${intersectY}
        L ${x1} ${intersectY}
        Z
      `;
      
      hotspots.push({
        path,
        centerX: (x1 + x2) / 2,
        centerY: (y1 + y2 + intersectY * 2) / 4
      });
    }
    return hotspots;
  };

  const csHotspots = createCSHotspots();
  const psHotspots = createPSHotspots();
  
  const allCSClicked = csHotspotsClicked.size === numCSHotspots;
  const allPSClicked = psHotspotsClicked.size === numPSHotspots;

  const handleCSHotspotClick = (index: number) => {
    if (isComplete) return;
    setCsHotspotsClicked(prev => new Set(prev).add(index));
  };

  const handlePSHotspotClick = (index: number) => {
    if (isComplete) return;
    setPsHotspotsClicked(prev => new Set(prev).add(index));
  };

  // Check completion when all hotspots are clicked
  React.useEffect(() => {
    if (allCSClicked && allPSClicked && !isComplete) {
      setIsComplete(true);
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 1500);
    }
  }, [allCSClicked, allPSClicked, isComplete, onComplete]);

  const handleReset = () => {
    setCsHotspotsClicked(new Set());
    setPsHotspotsClicked(new Set());
    setIsComplete(false);
  };

  return (
    <div className="w-full h-full flex flex-row items-center justify-center gap-6 px-6 py-6">
      {/* Left Side: Instructions */}
      <div className="flex-1 flex flex-col gap-4 max-w-md">
        <div className="w-full">
          <p className="text-xl font-black text-black mb-2">Instructions:</p>
          <p className="text-lg font-bold text-black leading-relaxed mb-4">
            Click on the areas representing Consumer Surplus and Producer Surplus on the graph.
          </p>
          <div className="space-y-3 text-base">
            <p className="font-semibold text-gray-700">
              • Consumer Surplus: Area above the equilibrium price line and below the demand curve
            </p>
            <p className="font-semibold text-gray-700">
              • Producer Surplus: Area below the equilibrium price line and above the supply curve
            </p>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="space-y-3 mt-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {allCSClicked ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
              )}
              <span className={`font-bold ${allCSClicked ? "text-green-600" : "text-gray-500"}`}>
                Consumer Surplus ({csHotspotsClicked.size}/{numCSHotspots})
              </span>
            </div>
            <div className="flex gap-1 ml-7">
              {Array.from({ length: numCSHotspots }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    csHotspotsClicked.has(i) ? "bg-green-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              {allPSClicked ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
              )}
              <span className={`font-bold ${allPSClicked ? "text-green-600" : "text-gray-500"}`}>
                Producer Surplus ({psHotspotsClicked.size}/{numPSHotspots})
              </span>
            </div>
            <div className="flex gap-1 ml-7">
              {Array.from({ length: numPSHotspots }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    psHotspotsClicked.has(i) ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Reset Button */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-100 border-2 border-green-600 rounded-lg"
          >
            <p className="text-base font-bold text-green-900">
              Excellent! You've correctly identified both Consumer Surplus and Producer Surplus.
            </p>
          </motion.div>
        )}
      </div>

      {/* Right Side: Graph */}
      <div className="flex-1 flex items-center justify-center w-full min-h-0">
        <div className="relative border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 bg-white">
          {/* Reset Button */}
          {isComplete && (
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={handleReset}
                className="p-2 bg-white border-2 border-black rounded-full hover:bg-gray-100 active:translate-y-1 transition-transform"
              >
                <RefreshCcw size={16} />
              </button>
            </div>
          )}

          {/* Success Checkmark */}
          {isComplete && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-4 right-16 z-10"
            >
              <CheckCircle2 size={24} className="text-green-600" />
            </motion.div>
          )}

          <svg
            ref={svgRef}
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

            {/* Demand Curve */}
            <line
              x1={demandStartX}
              y1={demandStartY}
              x2={demandEndX}
              y2={demandEndY}
              stroke="black"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <text
              x={demandEndX - 10}
              y={demandEndY + 20}
              fill="black"
              fontSize="18"
              fontWeight="900"
            >
              D
            </text>

            {/* Supply Curve */}
            <line
              x1={supplyStartX}
              y1={supplyStartY}
              x2={supplyEndX}
              y2={supplyEndY}
              stroke="black"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <text
              x={supplyEndX - 10}
              y={supplyEndY - 10}
              fill="black"
              fontSize="18"
              fontWeight="900"
            >
              S
            </text>

            {/* Equilibrium Price Line (dashed) */}
            <line
              x1={padding}
              y1={intersectY}
              x2={intersectX}
              y2={intersectY}
              stroke="black"
              strokeWidth="4"
              strokeDasharray="8 4"
              strokeLinecap="round"
            />
            <line
              x1={intersectX}
              y1={intersectY}
              x2={intersectX}
              y2={padding + graphInnerHeight}
              stroke="black"
              strokeWidth="4"
              strokeDasharray="8 4"
              strokeLinecap="round"
            />

            {/* Equilibrium Point */}
            <circle
              cx={intersectX}
              cy={intersectY}
              r="8"
              fill="black"
              stroke="white"
              strokeWidth="2"
            />

            {/* Consumer Surplus Hotspots (multiple clickable areas) */}
            {csHotspots.map((hotspot, index) => {
              const isClicked = csHotspotsClicked.has(index);
              return (
                <g key={`cs-${index}`}>
                  <path
                    d={hotspot.path}
                    fill={isClicked ? "rgba(16, 185, 129, 0.3)" : "transparent"}
                    stroke={isClicked ? "#10b981" : "transparent"}
                    strokeWidth="3"
                    strokeDasharray={isClicked ? "0" : "4 4"}
                    className="cursor-pointer"
                    onClick={() => handleCSHotspotClick(index)}
                  />
                  {/* Invisible larger hit area */}
                  <path
                    d={hotspot.path}
                    fill="transparent"
                    stroke="transparent"
                    strokeWidth="20"
                    className="cursor-pointer"
                    onClick={() => handleCSHotspotClick(index)}
                  />
                  {/* Label for clicked hotspot */}
                  {isClicked && (
                    <motion.text
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      x={hotspot.centerX}
                      y={hotspot.centerY}
                      fill="#10b981"
                      fontSize="14"
                      fontWeight="900"
                      textAnchor="middle"
                    >
                      CS
                    </motion.text>
                  )}
                </g>
              );
            })}

            {/* Producer Surplus Hotspots (multiple clickable areas) */}
            {psHotspots.map((hotspot, index) => {
              const isClicked = psHotspotsClicked.has(index);
              return (
                <g key={`ps-${index}`}>
                  <path
                    d={hotspot.path}
                    fill={isClicked ? "rgba(59, 130, 246, 0.3)" : "transparent"}
                    stroke={isClicked ? "#3b82f6" : "transparent"}
                    strokeWidth="3"
                    strokeDasharray={isClicked ? "0" : "4 4"}
                    className="cursor-pointer"
                    onClick={() => handlePSHotspotClick(index)}
                  />
                  {/* Invisible larger hit area */}
                  <path
                    d={hotspot.path}
                    fill="transparent"
                    stroke="transparent"
                    strokeWidth="20"
                    className="cursor-pointer"
                    onClick={() => handlePSHotspotClick(index)}
                  />
                  {/* Label for clicked hotspot */}
                  {isClicked && (
                    <motion.text
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      x={hotspot.centerX}
                      y={hotspot.centerY}
                      fill="#3b82f6"
                      fontSize="14"
                      fontWeight="900"
                      textAnchor="middle"
                    >
                      PS
                    </motion.text>
                  )}
                </g>
              );
            })}

            {/* Final labels when all are clicked */}
            {allCSClicked && (
              <motion.text
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                x={demandStartX + (intersectX - demandStartX) / 2}
                y={demandStartY + 20}
                fill="#10b981"
                fontSize="18"
                fontWeight="900"
                textAnchor="middle"
              >
                Consumer Surplus
              </motion.text>
            )}

            {allPSClicked && (
              <motion.text
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                x={supplyStartX + (intersectX - supplyStartX) / 2}
                y={supplyStartY - 20}
                fill="#3b82f6"
                fontSize="18"
                fontWeight="900"
                textAnchor="middle"
              >
                Producer Surplus
              </motion.text>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

