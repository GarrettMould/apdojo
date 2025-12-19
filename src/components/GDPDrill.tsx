"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";

interface GDPDrillProps {
  onComplete?: () => void;
}

export function GDPDrill({ onComplete }: GDPDrillProps) {
  const [step, setStep] = useState<1 | 2>(1);
  
  // Step 1: Nominal GDP
  const [nominalAnswers, setNominalAnswers] = useState<Record<number, string>>({});
  const [nominalCorrect, setNominalCorrect] = useState<Record<number, boolean>>({});
  const [nominalAttempts, setNominalAttempts] = useState<Record<number, number>>({});
  const [nominalCompleted, setNominalCompleted] = useState(false);
  
  // Step 2: Real GDP
  const [realAnswers, setRealAnswers] = useState<Record<number, string>>({});
  const [realCorrect, setRealCorrect] = useState<Record<number, boolean>>({});
  const [realAttempts, setRealAttempts] = useState<Record<number, number>>({});
  const [realCompleted, setRealCompleted] = useState(false);
  
  const [nominalFocused, setNominalFocused] = useState<Record<number, boolean>>({});
  const [realFocused, setRealFocused] = useState<Record<number, boolean>>({});

  // Step 1 Data
  const step1Data = [
    { year: '2020', pizzaP: '$10', pizzaQ: '10', sodaP: '$2', sodaQ: '50', answer: '200' },
    { year: '2021', pizzaP: '$12', pizzaQ: '10', sodaP: '$3', sodaQ: '60', answer: '300' },
    { year: '2022', pizzaP: '$15', pizzaQ: '20', sodaP: '$4', sodaQ: '50', answer: '500' }
  ];

  // Step 2 Data - Same prices as Step 1 (current year prices), but Real GDP uses 2020 base year prices
  const step2Data = [
    { year: '2020', pizzaP: '$10', pizzaQ: '10', sodaP: '$2', sodaQ: '50', answer: '200' },
    { year: '2021', pizzaP: '$12', pizzaQ: '10', sodaP: '$3', sodaQ: '60', answer: '220' },
    { year: '2022', pizzaP: '$15', pizzaQ: '20', sodaP: '$4', sodaQ: '50', answer: '300' }
  ];

  // Check if step 1 is complete
  useEffect(() => {
    const allCorrect = step1Data.every((_, index) => nominalCorrect[index] === true);
    if (allCorrect && step1Data.length > 0) {
      setNominalCompleted(true);
      // Auto-advance to step 2 after a short delay
      setTimeout(() => {
        setStep(2);
      }, 1000);
    }
  }, [nominalCorrect]);

  // Check if step 2 is complete
  useEffect(() => {
    const allCorrect = step2Data.every((_, index) => realCorrect[index] === true);
    if (allCorrect && step2Data.length > 0 && onComplete) {
      setRealCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  }, [realCorrect, onComplete]);

  const normalizeAnswer = (value: string): string => {
    return value.trim().replace(/[$,]/g, '');
  };

  const handleNominalInput = (index: number, value: string) => {
    setNominalAnswers(prev => ({ ...prev, [index]: value }));
  };

  const handleNominalBlur = (index: number) => {
    const userAnswer = normalizeAnswer(nominalAnswers[index] || '');
    const correctAnswer = normalizeAnswer(step1Data[index].answer);
    
    if (userAnswer === correctAnswer) {
      setNominalCorrect(prev => ({ ...prev, [index]: true }));
    } else {
      setNominalCorrect(prev => ({ ...prev, [index]: false }));
      setNominalAttempts(prev => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
    }
  };

  const handleNominalKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNominalBlur(index);
      e.currentTarget.blur();
    }
  };

  const handleRealInput = (index: number, value: string) => {
    setRealAnswers(prev => ({ ...prev, [index]: value }));
  };

  const handleRealBlur = (index: number) => {
    const userAnswer = normalizeAnswer(realAnswers[index] || '');
    const correctAnswer = normalizeAnswer(step2Data[index].answer);
    
    if (userAnswer === correctAnswer) {
      setRealCorrect(prev => ({ ...prev, [index]: true }));
    } else {
      setRealCorrect(prev => ({ ...prev, [index]: false }));
      setRealAttempts(prev => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
    }
  };

  const handleRealKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRealBlur(index);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="w-full h-full">
      <AnimatePresence mode="wait">
        {/* Step 1: Nominal GDP */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-black text-black mb-4">
              Calculate Nominal GDP (Current P × Current Q)
            </h2>
            
            <div className="w-full bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative">
              {/* Continuous Vertical Borders - Total: 1 + 1.2 + 1.2 + 1.2 + 1.2 + 1.5 = 7.3fr */}
              <div className="absolute inset-0 pointer-events-none z-20">
                <div className="absolute top-0 bottom-0 w-[4px] bg-black" style={{ left: '13.7%' }}></div>
                <div className="absolute top-0 bottom-0 w-[4px] bg-black" style={{ left: '30.1%' }}></div>
                <div className="absolute top-0 bottom-0 w-[4px] bg-black" style={{ left: '46.6%' }}></div>
                <div className="absolute top-0 bottom-0 w-[4px] bg-black" style={{ left: '63.0%' }}></div>
                <div className="absolute top-0 bottom-0 w-[4px] bg-black" style={{ left: '79.5%' }}></div>
              </div>
              
              {/* Header Row */}
              <div 
                className="grid border-b-4 border-black bg-gray-100 relative z-30"
                style={{ gridTemplateColumns: '1fr 1.2fr 1.2fr 1.2fr 1.2fr 1.5fr' }}
              >
                {['Year', 'Pizza (P)', 'Pizza (Q)', 'Soda (P)', 'Soda (Q)', 'Nominal GDP'].map((header, i) => (
                  <div 
                    key={i} 
                    className="p-6 font-black text-center text-base md:text-xl uppercase tracking-wider flex items-center justify-center"
                  >
                    {header}
                  </div>
                ))}
              </div>

              {/* Body Rows */}
              {step1Data.map((row, rowIndex) => {
                const isCorrect = nominalCorrect[rowIndex] === true;
                const isWrong = nominalCorrect[rowIndex] === false;
                const attempts = nominalAttempts[rowIndex] || 0;
                const showHint = attempts >= 3;

                return (
                  <div key={rowIndex}>
                    <div 
                      className={`grid relative z-30 ${rowIndex !== step1Data.length - 1 ? 'border-b-4 border-black' : ''}`}
                      style={{ gridTemplateColumns: '1fr 1.2fr 1.2fr 1.2fr 1.2fr 1.5fr' }}
                    >
                      <div className="p-6 font-black text-center text-xl md:text-2xl">
                        {row.year}
                      </div>
                      <div className="p-6 font-bold text-center text-xl md:text-2xl">
                        {row.pizzaP}
                      </div>
                      <div className="p-6 font-bold text-center text-xl md:text-2xl">
                        {row.pizzaQ}
                      </div>
                      <div className="p-6 font-bold text-center text-xl md:text-2xl">
                        {row.sodaP}
                      </div>
                      <div className="p-6 font-bold text-center text-xl md:text-2xl">
                        {row.sodaQ}
                      </div>
                      <div className="p-6 relative flex items-center justify-center">
                        <motion.input
                          type="text"
                          value={nominalAnswers[rowIndex] || ''}
                          onChange={(e) => handleNominalInput(rowIndex, e.target.value)}
                          onKeyDown={(e) => handleNominalKeyDown(rowIndex, e)}
                          onFocus={() => setNominalFocused(prev => ({ ...prev, [rowIndex]: true }))}
                          onBlur={() => {
                            setNominalFocused(prev => ({ ...prev, [rowIndex]: false }));
                            handleNominalBlur(rowIndex);
                          }}
                          disabled={isCorrect}
                          animate={
                            isWrong
                              ? { x: [0, -10, 10, -5, 5, 0] }
                              : {}
                          }
                          whileFocus={{ scale: 1.02 }}
                          className={`w-full h-14 text-center text-2xl font-black border-4 border-black rounded-xl outline-none transition-all ${
                            isCorrect
                              ? "bg-green-100 border-green-500"
                              : isWrong
                              ? "bg-red-50 border-red-500"
                              : "bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                          } ${isCorrect ? "cursor-default" : ""}`}
                          placeholder={nominalFocused[rowIndex] || nominalAnswers[rowIndex] ? "" : "?"}
                        />
                      </div>
                    </div>
                    {showHint && isWrong && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded mt-2"
                      >
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm font-semibold text-yellow-900">
                            Remember: (P_pizza × Q_pizza) + (P_soda × Q_soda)
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 2: Real GDP */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-black text-black mb-4">
              Calculate Real GDP for each year, using 2020 as the base year
            </h2>
            
            <div className="w-full bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative">
              {/* Continuous Vertical Borders - Total: 1 + 1.2 + 1.2 + 1.2 + 1.2 + 1.5 = 7.3fr */}
              <div className="absolute inset-0 pointer-events-none z-20">
                <div className="absolute top-0 bottom-0 w-[4px] bg-black" style={{ left: '13.7%' }}></div>
                <div className="absolute top-0 bottom-0 w-[4px] bg-black" style={{ left: '30.1%' }}></div>
                <div className="absolute top-0 bottom-0 w-[4px] bg-black" style={{ left: '46.6%' }}></div>
                <div className="absolute top-0 bottom-0 w-[4px] bg-black" style={{ left: '63.0%' }}></div>
                <div className="absolute top-0 bottom-0 w-[4px] bg-black" style={{ left: '79.5%' }}></div>
              </div>
              
              {/* Header Row */}
              <div 
                className="grid border-b-4 border-black bg-gray-100 relative z-30"
                style={{ gridTemplateColumns: '1fr 1.2fr 1.2fr 1.2fr 1.2fr 1.5fr' }}
              >
                {['Year', 'Pizza (P)', 'Pizza (Q)', 'Soda (P)', 'Soda (Q)', 'Real GDP'].map((header, i) => (
                  <div 
                    key={i} 
                    className="p-6 font-black text-center text-base md:text-xl uppercase tracking-wider flex items-center justify-center"
                  >
                    {header}
                  </div>
                ))}
              </div>

              {/* Body Rows */}
              {step2Data.map((row, rowIndex) => {
                const isCorrect = realCorrect[rowIndex] === true;
                const isWrong = realCorrect[rowIndex] === false;
                const attempts = realAttempts[rowIndex] || 0;
                const showHint = attempts >= 3;

                return (
                  <div key={rowIndex}>
                    <div 
                      className={`grid relative z-30 ${rowIndex !== step2Data.length - 1 ? 'border-b-4 border-black' : ''}`}
                      style={{ gridTemplateColumns: '1fr 1.2fr 1.2fr 1.2fr 1.2fr 1.5fr' }}
                    >
                      <div className="p-6 font-black text-center text-xl md:text-2xl">
                        {row.year}
                      </div>
                      <div className="p-6 font-bold text-center text-xl md:text-2xl">
                        {row.pizzaP}
                      </div>
                      <div className="p-6 font-bold text-center text-xl md:text-2xl">
                        {row.pizzaQ}
                      </div>
                      <div className="p-6 font-bold text-center text-xl md:text-2xl">
                        {row.sodaP}
                      </div>
                      <div className="p-6 font-bold text-center text-xl md:text-2xl">
                        {row.sodaQ}
                      </div>
                      <div className="p-6 relative flex items-center justify-center">
                        <motion.input
                          type="text"
                          value={realAnswers[rowIndex] || ''}
                          onChange={(e) => handleRealInput(rowIndex, e.target.value)}
                          onKeyDown={(e) => handleRealKeyDown(rowIndex, e)}
                          onFocus={() => setRealFocused(prev => ({ ...prev, [rowIndex]: true }))}
                          onBlur={() => {
                            setRealFocused(prev => ({ ...prev, [rowIndex]: false }));
                            handleRealBlur(rowIndex);
                          }}
                          disabled={isCorrect}
                          animate={
                            isWrong
                              ? { x: [0, -10, 10, -5, 5, 0] }
                              : {}
                          }
                          whileFocus={{ scale: 1.02 }}
                          className={`w-full h-14 text-center text-2xl font-black border-4 border-black rounded-xl outline-none transition-all ${
                            isCorrect
                              ? "bg-green-100 border-green-500"
                              : isWrong
                              ? "bg-red-50 border-red-500"
                              : "bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                          } ${isCorrect ? "cursor-default" : ""}`}
                          placeholder={realFocused[rowIndex] || realAnswers[rowIndex] ? "" : "?"}
                        />
                      </div>
                    </div>
                    {showHint && isWrong && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded mt-2"
                      >
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm font-semibold text-yellow-900">
                            Remember: (P_pizza × Q_pizza) + (P_soda × Q_soda) using 2020 prices (Pizza=$10, Soda=$2)
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

