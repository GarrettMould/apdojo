"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCcw, CheckCircle2, Check, AlertCircle } from "lucide-react";

interface ConsumerProducerSurplusDrillProps {
  onComplete?: () => void;
}

interface TableRow {
  person: string;
  price: number;
  maxWillingnessToPay: number;
  willBuy: boolean; // true if maxWillingnessToPay > price
}

export function ConsumerProducerSurplusDrill({ onComplete }: ConsumerProducerSurplusDrillProps) {
  const [stage, setStage] = useState<1 | 2 | 3>(1); // 1 = will buy table, 2 = consumer surplus table, 3 = graph
  
  // Stage 1: Will Buy table state
  const [tableAnswers, setTableAnswers] = useState<Record<number, 'yes' | 'no' | null>>({});
  const [tableCorrect, setTableCorrect] = useState<Record<number, boolean>>({});
  const [tableCompleted, setTableCompleted] = useState(false);
  
  // Stage 2: Consumer Surplus table state
  const [csAnswers, setCsAnswers] = useState<Record<number, string>>({});
  const [csCorrect, setCsCorrect] = useState<Record<number, boolean>>({});
  const [csFocused, setCsFocused] = useState<Record<number, boolean>>({});
  const [csCompleted, setCsCompleted] = useState(false);
  
  // Graph stage state
  const [csHotspotsClicked, setCsHotspotsClicked] = useState<Set<number>>(new Set());
  const [wrongClick, setWrongClick] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Table data
  const tableData: TableRow[] = [
    { person: 'Person 1', price: 50, maxWillingnessToPay: 80, willBuy: true },
    { person: 'Person 2', price: 50, maxWillingnessToPay: 60, willBuy: true },
    { person: 'Person 3', price: 50, maxWillingnessToPay: 50, willBuy: true }, // Equal means they will buy
    { person: 'Person 4', price: 50, maxWillingnessToPay: 40, willBuy: false },
    { person: 'Person 5', price: 50, maxWillingnessToPay: 30, willBuy: false },
  ];
  
  // Number of hotspots - just one big triangle for each
  const numCSHotspots = 1;
  const numPSHotspots = 1;

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

  // Create one big Consumer Surplus triangle (above price, below demand)
  const createCSHotspots = () => {
    const x1 = padding; // Start of demand curve at y-axis
    const y1 = demandSlope * x1 + demandIntercept; // Point on demand curve at y-axis
    const x2 = intersectX; // Equilibrium quantity
    const y2 = intersectY; // Equilibrium price
    
    // Create triangle: from demand curve at y-axis, to equilibrium point, to price line at y-axis
    // Extend slightly below price line to ensure clicks near price line are captured
    const priceLineBuffer = 3; // Small buffer to capture clicks near price line
    const path = `
      M ${x1} ${y1}
      L ${x2} ${y2 + priceLineBuffer}
      L ${x1} ${y2 + priceLineBuffer}
      Z
    `;
    
    return [{
      path,
      centerX: (x1 + x2) / 2,
      centerY: (y1 + y2) / 2
    }];
  };

  // Create one big Producer Surplus triangle (below price, above supply)
  const createPSHotspots = () => {
    const x1 = padding; // Start of supply curve at y-axis
    const y1 = supplySlope * x1 + supplyIntercept; // Point on supply curve at y-axis
    const x2 = intersectX; // Equilibrium quantity
    const y2 = intersectY; // Equilibrium price
    
    // Create triangle: from price line at y-axis, to equilibrium point, to supply curve at y-axis
    // Start well below the price line to avoid capturing clicks meant for CS
    const priceLineBuffer = 5; // Buffer to ensure PS doesn't overlap with CS area
    const path = `
      M ${x1} ${y2 + priceLineBuffer}
      L ${x2} ${y2 + priceLineBuffer}
      L ${x1} ${y1}
      Z
    `;
    
    return [{
      path,
      centerX: (x1 + x2) / 2,
      centerY: (y1 + y2) / 2
    }];
  };

  const csHotspots = createCSHotspots();
  const psHotspots = createPSHotspots();
  
  const allCSClicked = csHotspotsClicked.size === numCSHotspots;

  const handleCSHotspotClick = (index: number) => {
    if (isComplete || wrongClick) return;
    setCsHotspotsClicked(prev => new Set(prev).add(index));
  };

  const handlePSHotspotClick = (index: number) => {
    if (isComplete || wrongClick) return;
    // Wrong click - show red screen
    setWrongClick(true);
  };
  
  const handleRetry = () => {
    setCsHotspotsClicked(new Set());
    setWrongClick(false);
    setIsComplete(false);
  };

  // Check stage 1 table completion
  useEffect(() => {
    const allAnswered = tableData.every((_, index) => tableAnswers[index] !== null);
    const allCorrect = tableData.every((_, index) => tableCorrect[index] === true);
    
    if (allAnswered && allCorrect && !tableCompleted) {
      setTableCompleted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableAnswers, tableCorrect, tableCompleted]);
  
  // Check stage 2 consumer surplus completion
  useEffect(() => {
    // Only check rows where willBuy is true
    const buyerIndices = tableData
      .map((row, index) => row.willBuy ? index : -1)
      .filter(index => index !== -1);
    
    const allAnswered = buyerIndices.every(index => 
      csAnswers[index] !== undefined && csAnswers[index] !== ''
    );
    const allCorrect = buyerIndices.every(index => 
      csCorrect[index] === true
    );
    
    if (allAnswered && allCorrect && !csCompleted) {
      setCsCompleted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [csAnswers, csCorrect, csCompleted]);
  
  // Check graph completion - only need CS clicked (PS is visible but not required)
  useEffect(() => {
    if (stage === 3 && allCSClicked && !isComplete) {
      setIsComplete(true);
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 1500);
    }
  }, [stage, allCSClicked, isComplete, onComplete]);
  
  const handleTableAnswer = (index: number, answer: 'yes' | 'no') => {
    if (tableCompleted) return;
    
    setTableAnswers(prev => ({ ...prev, [index]: answer }));
    
    const correctAnswer = tableData[index].willBuy ? 'yes' : 'no';
    const isCorrect = answer === correctAnswer;
    setTableCorrect(prev => ({ ...prev, [index]: isCorrect }));
  };
  
  const handleTableNext = () => {
    if (tableCompleted) {
      setStage(2);
    }
  };
  
  const normalizeAnswer = (value: string): string => {
    return value.trim().replace(/[$,]/g, '');
  };
  
  const handleCsInput = (index: number, value: string) => {
    setCsAnswers(prev => ({ ...prev, [index]: value }));
  };
  
  const handleCsBlur = (index: number) => {
    const userAnswer = normalizeAnswer(csAnswers[index] || '');
    const correctAnswer = (tableData[index].maxWillingnessToPay - tableData[index].price).toString();
    
    if (userAnswer === correctAnswer) {
      setCsCorrect(prev => ({ ...prev, [index]: true }));
    } else {
      setCsCorrect(prev => ({ ...prev, [index]: false }));
    }
  };
  
  const handleCsKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCsBlur(index);
      e.currentTarget.blur();
    }
  };
  
  const handleCsNext = () => {
    if (csCompleted) {
      setStage(3);
    }
  };

  const handleReset = () => {
    setCsHotspotsClicked(new Set());
    setWrongClick(false);
    setIsComplete(false);
  };

  return (
    <div className="w-full h-full">
      <AnimatePresence mode="wait">
        {/* Stage 1: Table */}
        {stage === 1 && (
          <motion.div
            key="stage1"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full space-y-4"
          >
            {/* Instruction */}
            <div className="mb-4 text-center">
              <h2 className="text-xl font-black text-black mb-1">
                Will This Person Buy?
              </h2>
              <p className="text-sm font-semibold text-gray-800 mb-1">
                A person will buy if their maximum willingness to pay is greater than or equal to the price.
              </p>
              <p className="text-xs text-gray-600">
                Remember: If Max Willingness to Pay ≥ Price, then Yes
              </p>
            </div>

            {/* Table */}
            <div className="w-full bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative">
              {/* Vertical Borders */}
              <div className="absolute inset-0 pointer-events-none z-20">
                <div className="absolute top-0 bottom-0 w-[2px] bg-black" style={{ left: '25%' }}></div>
                <div className="absolute top-0 bottom-0 w-[2px] bg-black" style={{ left: '50%' }}></div>
                <div className="absolute top-0 bottom-0 w-[2px] bg-black" style={{ left: '75%' }}></div>
              </div>
              
              {/* Header Row */}
              <div 
                className="grid border-b-2 border-black bg-gray-100 relative z-30"
                style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}
              >
                {['Person', 'Price', 'Max Willingness to Pay', 'Will This Person Buy?'].map((header, i) => (
                  <div 
                    key={i} 
                    className="p-3 font-black text-center text-xs md:text-sm uppercase tracking-wide flex items-center justify-center"
                  >
                    {header}
                  </div>
                ))}
              </div>

              {/* Body Rows */}
              {tableData.map((row, rowIndex) => {
                const isCorrect = tableCorrect[rowIndex] === true;
                const isWrong = tableCorrect[rowIndex] === false;
                const answer = tableAnswers[rowIndex];

                return (
                  <div 
                    key={rowIndex}
                    className={`grid relative z-30 ${rowIndex !== tableData.length - 1 ? 'border-b-2 border-black' : ''}`}
                    style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}
                  >
                    {/* Person */}
                    <div className="p-3 font-black text-center text-base md:text-lg">
                      {row.person}
                    </div>
                    
                    {/* Price */}
                    <div className="p-3 font-bold text-center text-base md:text-lg">
                      ${row.price}
                    </div>
                    
                    {/* Max Willingness to Pay */}
                    <div className="p-3 font-bold text-center text-base md:text-lg">
                      ${row.maxWillingnessToPay}
                    </div>
                    
                    {/* Will Buy - Radio Buttons */}
                    <div className="p-3 relative flex items-center justify-center gap-4">
                      <button
                        onClick={() => handleTableAnswer(rowIndex, 'yes')}
                        disabled={tableCompleted}
                        className={`px-4 py-2 rounded-lg border-2 border-black font-bold text-sm transition-all ${
                          answer === 'yes'
                            ? isCorrect
                              ? 'bg-green-100 border-green-500 text-green-800'
                              : 'bg-red-50 border-red-500 text-red-600'
                            : 'bg-white hover:bg-gray-50'
                        } ${tableCompleted ? 'cursor-default' : 'cursor-pointer hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleTableAnswer(rowIndex, 'no')}
                        disabled={tableCompleted}
                        className={`px-4 py-2 rounded-lg border-2 border-black font-bold text-sm transition-all ${
                          answer === 'no'
                            ? isCorrect
                              ? 'bg-green-100 border-green-500 text-green-800'
                              : 'bg-red-50 border-red-500 text-red-600'
                            : 'bg-white hover:bg-gray-50'
                        } ${tableCompleted ? 'cursor-default' : 'cursor-pointer hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Button */}
            {tableCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
              >
                <motion.button
                  onClick={handleTableNext}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-black text-white font-bold text-base rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 transition-all"
                >
                  Next: Identify Surplus Areas
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Stage 2: Consumer Surplus Table */}
        {stage === 2 && (
          <motion.div
            key="stage2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full space-y-4"
          >
            {/* Instruction */}
            <div className="mb-4 text-center">
              <h2 className="text-xl font-black text-black mb-1">
                Calculate Consumer Surplus
              </h2>
              <p className="text-sm font-semibold text-gray-800 mb-1">
                Consumer Surplus = Max Willingness to Pay - Price
              </p>
              <p className="text-xs text-gray-600">
                Only calculate for people who will buy the product
              </p>
            </div>

            {/* Table */}
            <div className="w-full bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative">
              {/* Vertical Borders */}
              <div className="absolute inset-0 pointer-events-none z-20">
                <div className="absolute top-0 bottom-0 w-[2px] bg-black" style={{ left: '25%' }}></div>
                <div className="absolute top-0 bottom-0 w-[2px] bg-black" style={{ left: '50%' }}></div>
                <div className="absolute top-0 bottom-0 w-[2px] bg-black" style={{ left: '75%' }}></div>
              </div>
              
              {/* Header Row */}
              <div 
                className="grid border-b-2 border-black bg-gray-100 relative z-30"
                style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}
              >
                {['Person', 'Price', 'Max Willingness to Pay', 'Consumer Surplus'].map((header, i) => (
                  <div 
                    key={i} 
                    className="p-3 font-black text-center text-xs md:text-sm uppercase tracking-wide flex items-center justify-center"
                  >
                    {header}
                  </div>
                ))}
              </div>

              {/* Body Rows */}
              {tableData.map((row, rowIndex) => {
                const isCorrect = csCorrect[rowIndex] === true;
                const isWrong = csCorrect[rowIndex] === false;
                const willBuy = row.willBuy;
                const correctCs = row.maxWillingnessToPay - row.price;

                return (
                  <div 
                    key={rowIndex}
                    className={`grid relative z-30 ${rowIndex !== tableData.length - 1 ? 'border-b-2 border-black' : ''}`}
                    style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}
                  >
                    {/* Person */}
                    <div className="p-3 font-black text-center text-base md:text-lg">
                      {row.person}
                    </div>
                    
                    {/* Price */}
                    <div className="p-3 font-bold text-center text-base md:text-lg">
                      ${row.price}
                    </div>
                    
                    {/* Max Willingness to Pay */}
                    <div className="p-3 font-bold text-center text-base md:text-lg">
                      ${row.maxWillingnessToPay}
                    </div>
                    
                    {/* Consumer Surplus - Input or N/A */}
                    <div className="p-3 relative flex items-center justify-center">
                      {willBuy ? (
                        <motion.input
                          type="text"
                          value={csAnswers[rowIndex] || ''}
                          onChange={(e) => handleCsInput(rowIndex, e.target.value)}
                          onKeyDown={(e) => handleCsKeyDown(rowIndex, e)}
                          onFocus={() => setCsFocused(prev => ({ ...prev, [rowIndex]: true }))}
                          onBlur={() => {
                            setCsFocused(prev => ({ ...prev, [rowIndex]: false }));
                            handleCsBlur(rowIndex);
                          }}
                          disabled={isCorrect}
                          animate={
                            isWrong
                              ? { x: [0, -10, 10, -5, 5, 0] }
                              : {}
                          }
                          whileFocus={{ scale: 1.02 }}
                          className={`w-full h-10 text-center text-base font-black border-2 border-black rounded-lg outline-none transition-all ${
                            isCorrect
                              ? "bg-green-100 border-green-500 text-green-800"
                              : isWrong
                              ? "bg-red-50 border-red-500 text-red-600"
                              : "bg-white focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          } ${isCorrect ? "cursor-default" : ""}`}
                          placeholder={csFocused[rowIndex] || csAnswers[rowIndex] ? "" : "?"}
                        />
                      ) : (
                        <div className="w-full h-10 flex items-center justify-center text-base font-bold text-gray-400">
                          N/A
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Button */}
            {csCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
              >
                <motion.button
                  onClick={handleCsNext}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-black text-white font-bold text-base rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 transition-all"
                >
                  Next: Identify Surplus Areas
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Stage 3: Graph */}
        {stage === 3 && (
          <motion.div
            key="stage2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full h-full flex flex-row items-center justify-center gap-6 px-6 py-6"
          >
      {/* Left Side: Instructions */}
      <div className="flex-1 flex flex-col gap-4 max-w-md">
        <div className="w-full">
          <p className="text-2xl font-black text-black leading-relaxed">
            Click on the area representing Consumer Surplus on the graph.
          </p>
        </div>

        {/* Reset Button */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-100 border-2 border-green-600 rounded-lg"
          >
            <p className="text-base font-bold text-green-900">
              Excellent! You've correctly identified Consumer Surplus.
            </p>
          </motion.div>
        )}
      </div>

      {/* Right Side: Graph */}
      <div className="flex-1 flex items-center justify-center w-full min-h-0">
        <div className="relative border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 bg-white">
          {/* Retry Button - Shows when wrong click */}
          {wrongClick && (
            <div className="absolute top-4 right-4 z-50">
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={handleRetry}
                className="p-2 bg-white border-2 border-black rounded-full hover:bg-gray-100 active:translate-y-1 transition-transform"
              >
                <RefreshCcw size={16} />
              </motion.button>
            </div>
          )}

          {/* Reset Button - Shows when complete */}
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
          
          {/* Red Overlay when wrong click */}
          <AnimatePresence>
            {wrongClick && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-red-500 bg-opacity-20 z-40 rounded-3xl pointer-events-none"
              />
            )}
          </AnimatePresence>

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

            {/* Consumer Surplus Triangle - Clickable (Correct Answer) */}
            {csHotspots.map((hotspot, index) => {
              const isClicked = csHotspotsClicked.has(index);
              return (
                <g key={`cs-${index}`}>
                  <path
                    d={hotspot.path}
                    fill={isClicked ? "rgba(16, 185, 129, 0.4)" : "rgba(16, 185, 129, 0.1)"}
                    stroke={isClicked ? "#10b981" : "#10b981"}
                    strokeWidth={isClicked ? "4" : "3"}
                    strokeDasharray={isClicked ? "0" : "8 4"}
                    className={wrongClick ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                    onClick={() => handleCSHotspotClick(index)}
                    style={{ pointerEvents: 'auto' }}
                  />
                  {/* Invisible larger hit area - smaller to avoid overlap */}
                  <path
                    d={hotspot.path}
                    fill="transparent"
                    stroke="transparent"
                    strokeWidth="15"
                    className={wrongClick ? "cursor-not-allowed" : "cursor-pointer"}
                    onClick={() => handleCSHotspotClick(index)}
                    style={{ pointerEvents: 'auto' }}
                  />
                </g>
              );
            })}

            {/* Producer Surplus Triangle - Clickable (Wrong Answer) */}
            {psHotspots.map((hotspot, index) => {
              return (
                <g key={`ps-${index}`}>
                  <path
                    d={hotspot.path}
                    fill="rgba(59, 130, 246, 0.1)"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="8 4"
                    className={wrongClick ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                    onClick={() => handlePSHotspotClick(index)}
                    style={{ pointerEvents: 'auto' }}
                  />
                  {/* Invisible larger hit area - smaller and only for lower portion */}
                  <path
                    d={hotspot.path}
                    fill="transparent"
                    stroke="transparent"
                    strokeWidth="10"
                    className={wrongClick ? "cursor-not-allowed" : "cursor-pointer"}
                    onClick={() => handlePSHotspotClick(index)}
                    style={{ pointerEvents: 'auto' }}
                  />
                </g>
              );
            })}

          </svg>
        </div>
      </div>
    </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

