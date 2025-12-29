"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";

interface MonopolyRevenueVisualizerProps {
  onComplete?: () => void;
}

interface TableRow {
  quantity: number;
  price: number;
  totalRevenue: number;
  marginalRevenue: number | null; // null means student needs to calculate
}

export const MonopolyRevenueVisualizer = ({ onComplete }: MonopolyRevenueVisualizerProps) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [correct, setCorrect] = useState<Record<number, boolean>>({});
  const [attempts, setAttempts] = useState<Record<number, number>>({});
  const [focused, setFocused] = useState<Record<number, boolean>>({});

  // Table data: Quantity, Price, Total Revenue, Marginal Revenue (to calculate)
  const tableData: TableRow[] = [
    { quantity: 1, price: 52, totalRevenue: 52, marginalRevenue: 52 },
    { quantity: 2, price: 51, totalRevenue: 102, marginalRevenue: 50 },
    { quantity: 3, price: 50, totalRevenue: 150, marginalRevenue: 48 },
    { quantity: 4, price: 49, totalRevenue: 196, marginalRevenue: 46 },
  ];

  // Normalize answer (remove $ and commas)
  const normalizeAnswer = (value: string): string => {
    return value.trim().replace(/[$,]/g, '');
  };

  const handleInput = (index: number, value: string) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const handleBlur = (index: number) => {
    const userAnswer = normalizeAnswer(answers[index] || '');
    const correctAnswer = tableData[index].marginalRevenue?.toString() || '';
    
    if (userAnswer === correctAnswer) {
      setCorrect(prev => ({ ...prev, [index]: true }));
    } else {
      setCorrect(prev => ({ ...prev, [index]: false }));
      setAttempts(prev => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur(index);
      e.currentTarget.blur();
    }
  };

  // Check if all answers are correct (skip row 0 which is pre-filled)
  const allCorrect = tableData.slice(1).every((_, index) => correct[index + 1] === true);
  
  // Check if user has any wrong answers (has attempted and got wrong)
  const hasWrongAnswers = tableData.slice(1).some((_, index) => {
    const rowIndex = index + 1;
    return correct[rowIndex] === false && (answers[rowIndex] !== undefined && answers[rowIndex] !== '');
  });

  // Call onComplete when all answers are correct to enable the external Next button
  useEffect(() => {
    if (allCorrect && onComplete) {
      onComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCorrect]); // Only depend on allCorrect, not onComplete to avoid unnecessary re-renders

  const handleAdvance = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Instruction */}
      <div className="mb-4 text-center">
        <h2 className="text-xl font-black text-black mb-1">
          Calculate Marginal Revenue
        </h2>
        <p className="text-sm font-semibold text-gray-800 mb-1">
          A monopolist must lower the price on all units to sell more. Calculate the marginal revenue for each quantity.
        </p>
        <p className="text-xs text-gray-600">
          Remember: MR = Change in Total Revenue / Change in Quantity
        </p>
      </div>

      {/* Table */}
      <div className="w-full bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative">
        {/* Vertical Borders */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-0 bottom-0 w-[2px] bg-black" style={{ left: '20%' }}></div>
          <div className="absolute top-0 bottom-0 w-[2px] bg-black" style={{ left: '40%' }}></div>
          <div className="absolute top-0 bottom-0 w-[2px] bg-black" style={{ left: '60%' }}></div>
          <div className="absolute top-0 bottom-0 w-[2px] bg-black" style={{ left: '80%' }}></div>
        </div>
        
        {/* Header Row */}
        <div 
          className="grid border-b-2 border-black bg-gray-100 relative z-30"
          style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}
        >
          {['Quantity', 'Price', 'Total Revenue', 'Marginal Revenue', 'Status'].map((header, i) => (
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
          const isCorrect = correct[rowIndex] === true;
          const isWrong = correct[rowIndex] === false;
          const attemptCount = attempts[rowIndex] || 0;
          const showHint = attemptCount >= 3;

          return (
            <div key={rowIndex}>
              <div 
                className={`grid relative z-30 ${rowIndex !== tableData.length - 1 ? 'border-b-2 border-black' : ''}`}
                style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}
              >
                {/* Quantity */}
                <div className="p-3 font-black text-center text-base md:text-lg">
                  {row.quantity}
                </div>
                
                {/* Price */}
                <div className="p-3 font-bold text-center text-base md:text-lg">
                  ${row.price}
                </div>
                
                {/* Total Revenue */}
                <div className="p-3 font-bold text-center text-base md:text-lg">
                  ${row.totalRevenue}
                </div>
                
                {/* Marginal Revenue Input */}
                <div className="p-3 relative flex items-center justify-center">
                  {rowIndex === 0 ? (
                    // First row: MR = TR (no calculation needed, just show it)
                    <div className="w-full h-10 flex items-center justify-center text-base font-black text-gray-600">
                      ${row.marginalRevenue}
                    </div>
                  ) : (
                    <motion.input
                      type="text"
                      value={answers[rowIndex] || ''}
                      onChange={(e) => handleInput(rowIndex, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(rowIndex, e)}
                      onFocus={() => setFocused(prev => ({ ...prev, [rowIndex]: true }))}
                      onBlur={() => {
                        setFocused(prev => ({ ...prev, [rowIndex]: false }));
                        handleBlur(rowIndex);
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
                      placeholder={focused[rowIndex] || answers[rowIndex] ? "" : "?"}
                    />
                  )}
                </div>
                
                {/* Status */}
                <div className="p-3 flex items-center justify-center">
                  <AnimatePresence>
                    {isCorrect && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-green-500 text-white rounded-full p-1 shadow-sm"
                      >
                        <Check size={14} strokeWidth={4} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Hint */}
              {showHint && isWrong && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded mt-2"
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-yellow-900">
                      💡 Remember: MR = (New TR - Old TR) / (New Q - Old Q). Don't forget the price reduction affects all previous units!
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Hint Row - Shows when user has wrong answers */}
      <AnimatePresence>
        {hasWrongAnswers && !allCorrect && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 bg-yellow-50 border-2 border-yellow-500 rounded-lg p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-2 flex-1">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-yellow-900 mb-1">
                    💡 Hint: How to Calculate Marginal Revenue
                  </p>
                  <p className="text-xs text-yellow-800">
                    Marginal Revenue (MR) = Change in Total Revenue ÷ Change in Quantity. 
                    For a monopolist, remember that when you lower the price to sell more units, 
                    you must lower the price on ALL previous units too. So MR = (New Total Revenue - Old Total Revenue) ÷ (New Quantity - Old Quantity).
                  </p>
                </div>
              </div>
              <motion.button
                onClick={handleAdvance}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-800 text-white font-bold text-sm rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition-all whitespace-nowrap flex-shrink-0"
              >
                Advance
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {allCorrect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center"
          >
            <p className="text-base font-bold text-green-800">
              ✓ Perfect! You understand why marginal revenue falls faster than price for a monopolist.
            </p>
            <p className="text-xs text-green-700 mt-1">
              Notice how MR decreases faster than price because the monopolist must lower the price on all previous units.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
