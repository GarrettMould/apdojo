"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export interface CompAdvantageProblem {
  type: 'input' | 'output';
  data: {
    headers: string[];
    rows: Array<{
      country: string;
      wheat: string | number;
      cloth: string | number;
    }>;
  };
  answers: {
    usaOpportunityCostWheat: string; // e.g., "2" or "1/2"
    franceOpportunityCostWheat: string;
    absoluteAdvantageCloth: 'USA' | 'France';
    comparativeAdvantageWheat: 'USA' | 'France';
  };
}

interface CompAdvantageDrillProps {
  problem: CompAdvantageProblem;
  onComplete?: () => void;
}

export function CompAdvantageDrill({ problem, onComplete }: CompAdvantageDrillProps) {
  const [stage, setStage] = useState<1 | 2>(1);
  const [stage1Answer, setStage1Answer] = useState<'input' | 'output' | null>(null);
  const [stage1Correct, setStage1Correct] = useState<boolean | null>(null);
  
  const [stage2TaskAAnswer, setStage2TaskAAnswer] = useState<'USA' | 'France' | null>(null);
  const [stage2TaskACorrect, setStage2TaskACorrect] = useState<boolean | null>(null);
  
  const [usaOcInput, setUsaOcInput] = useState("");
  const [franceOcInput, setFranceOcInput] = useState("");
  const [usaOcCorrect, setUsaOcCorrect] = useState(false);
  const [franceOcCorrect, setFranceOcCorrect] = useState(false);
  
  const [stage2TaskBAnswer, setStage2TaskBAnswer] = useState<'USA' | 'France' | null>(null);
  const [stage2TaskBCorrect, setStage2TaskBCorrect] = useState<boolean | null>(null);
  
  const [usaOcFocused, setUsaOcFocused] = useState(false);
  const [franceOcFocused, setFranceOcFocused] = useState(false);

  // Auto-advance Stage 1 on correct answer
  useEffect(() => {
    if (stage1Correct === true) {
      const timer = setTimeout(() => {
        setStage(2);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [stage1Correct]);

  // Auto-advance Task A on correct answer
  useEffect(() => {
    if (stage2TaskACorrect === true) {
      // Task A complete, user can proceed to Task B
    }
  }, [stage2TaskACorrect]);

  // Check if Stage 2 is complete
  const isStage2Complete = 
    stage2TaskACorrect === true &&
    usaOcCorrect &&
    franceOcCorrect &&
    stage2TaskBCorrect === true;

  // Call onComplete when all stages are done
  useEffect(() => {
    if (isStage2Complete && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isStage2Complete, onComplete]);

  const handleStage1Answer = (answer: 'input' | 'output') => {
    if (stage1Correct !== null) return; // Already answered
    
    setStage1Answer(answer);
    const isCorrect = answer === problem.type;
    setStage1Correct(isCorrect);
  };

  const handleStage2TaskA = (answer: 'USA' | 'France') => {
    if (stage2TaskACorrect !== null) return;
    
    setStage2TaskAAnswer(answer);
    const isCorrect = answer === problem.answers.absoluteAdvantageCloth;
    setStage2TaskACorrect(isCorrect);
  };

  const checkOpportunityCost = (value: string, correctAnswer: string): boolean => {
    // Normalize inputs: remove spaces, handle fractions
    const normalized = value.trim().replace(/\s+/g, '');
    const normalizedCorrect = correctAnswer.trim().replace(/\s+/g, '');
    
    // Check exact match first
    if (normalized === normalizedCorrect) return true;
    
    // Handle fraction formats (e.g., "1/2" vs "0.5")
    if (normalized.includes('/')) {
      const [num, den] = normalized.split('/').map(Number);
      if (!isNaN(num) && !isNaN(den) && den !== 0) {
        const decimal = num / den;
        const correctDecimal = normalizedCorrect.includes('/') 
          ? (() => {
              const [cNum, cDen] = normalizedCorrect.split('/').map(Number);
              return cDen !== 0 ? cNum / cDen : null;
            })()
          : parseFloat(normalizedCorrect);
        if (correctDecimal !== null && Math.abs(decimal - correctDecimal) < 0.001) {
          return true;
        }
      }
    }
    
    // Handle decimal formats
    const decimal = parseFloat(normalized);
    if (!isNaN(decimal)) {
      const correctDecimal = normalizedCorrect.includes('/')
        ? (() => {
            const [cNum, cDen] = normalizedCorrect.split('/').map(Number);
            return cDen !== 0 ? cNum / cDen : null;
          })()
        : parseFloat(normalizedCorrect);
      if (correctDecimal !== null && Math.abs(decimal - correctDecimal) < 0.001) {
        return true;
      }
    }
    
    return false;
  };

  const handleUsaOcBlur = () => {
    const isCorrect = checkOpportunityCost(usaOcInput, problem.answers.usaOpportunityCostWheat);
    setUsaOcCorrect(isCorrect);
  };

  const handleFranceOcBlur = () => {
    const isCorrect = checkOpportunityCost(franceOcInput, problem.answers.franceOpportunityCostWheat);
    setFranceOcCorrect(isCorrect);
  };

  const handleStage2TaskB = (answer: 'USA' | 'France') => {
    if (stage2TaskBCorrect !== null) return;
    
    setStage2TaskBAnswer(answer);
    const isCorrect = answer === problem.answers.comparativeAdvantageWheat;
    setStage2TaskBCorrect(isCorrect);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Data Table - Always Visible */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-black mb-4">
          This table shows the number of labor hours needed to make one unit of wheat or cloth in two countries, the USA and France.
        </p>
        <div className="w-full bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          {/* Header Row */}
          <div 
            className="grid border-b-4 border-black bg-gray-100"
            style={{ gridTemplateColumns: `repeat(${problem.data.headers.length}, 1fr)` }}
          >
            {problem.data.headers.map((header, i) => (
              <div 
                key={i} 
                className={`p-4 font-black text-center text-sm md:text-lg uppercase tracking-wider flex items-center justify-center ${
                  i !== problem.data.headers.length - 1 ? 'border-r-4 border-black' : ''
                }`}
              >
                {header}
              </div>
            ))}
          </div>

          {/* Body Rows */}
          {problem.data.rows.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className={`grid ${rowIndex !== problem.data.rows.length - 1 ? 'border-b-4 border-black' : ''}`}
              style={{ gridTemplateColumns: `repeat(${problem.data.headers.length}, 1fr)` }}
            >
              <div className="p-4 font-black text-center text-lg md:text-xl border-r-4 border-black">
                {row.country}
              </div>
              <div className="p-4 font-bold text-center text-lg md:text-xl border-r-4 border-black">
                {row.wheat}
              </div>
              <div className="p-4 font-bold text-center text-lg md:text-xl">
                {row.cloth}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Stage 1: Input vs Output */}
        {stage === 1 && (
          <motion.div
            key="stage1"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-black text-black mb-6">
              Is this an INPUT problem or an OUTPUT problem?
            </h2>
            
            <div className="grid grid-cols-2 gap-6">
              {(['input', 'output'] as const).map((option) => {
                const isSelected = stage1Answer === option;
                const isCorrect = stage1Correct === true && isSelected;
                const isWrong = stage1Correct === false && isSelected;

                return (
                  <motion.button
                    key={option}
                    onClick={() => handleStage1Answer(option)}
                    disabled={stage1Correct !== null}
                    animate={
                      isWrong
                        ? { x: [0, -10, 10, -5, 5, 0] }
                        : {}
                    }
                    className={`p-8 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-black text-3xl uppercase transition-all ${
                      isCorrect
                        ? "bg-green-100 border-green-500"
                        : isWrong
                        ? "bg-red-100 border-red-500"
                        : "hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-y-1"
                    } ${stage1Correct !== null ? "cursor-default" : "cursor-pointer"}`}
                  >
                    {option === 'input' ? 'INPUT' : 'OUTPUT'}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Stage 2: Math & Decision */}
        {stage === 2 && (
          <motion.div
            key="stage2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-8"
          >
            {/* Task A: Absolute Advantage */}
            {stage2TaskACorrect !== true && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-black">
                  Who has the absolute advantage in the production of cloth?
                </h2>
                
                <div className="grid grid-cols-2 gap-6">
                  {(['USA', 'France'] as const).map((option) => {
                    const isSelected = stage2TaskAAnswer === option;
                    const isCorrect = false; // Can't be true inside this block
                    const isWrong = stage2TaskACorrect === false && isSelected;

                    return (
                      <motion.button
                        key={option}
                        onClick={() => handleStage2TaskA(option)}
                        disabled={stage2TaskACorrect !== null}
                        animate={
                          isWrong
                            ? { x: [0, -10, 10, -5, 5, 0] }
                            : {}
                        }
                        className={`p-6 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-black text-2xl transition-all ${
                          isCorrect
                            ? "bg-green-100 border-green-500"
                            : isWrong
                            ? "bg-red-100 border-red-500"
                            : "hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-y-1"
                        } ${stage2TaskACorrect !== null ? "cursor-default" : "cursor-pointer"}`}
                      >
                        {option}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Task B: Opportunity Cost Calculations */}
            {stage2TaskACorrect === true && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-black mb-4">
                  Calculate the Opportunity Costs:
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-black text-black flex-shrink-0">
                      USA Opportunity Cost of 1 Wheat =
                    </span>
                    <motion.input
                      type="text"
                      value={usaOcInput}
                      onChange={(e) => setUsaOcInput(e.target.value)}
                      onFocus={() => setUsaOcFocused(true)}
                      onBlur={() => {
                        setUsaOcFocused(false);
                        if (!usaOcCorrect) {
                          handleUsaOcBlur();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !usaOcCorrect) {
                          e.currentTarget.blur();
                          handleUsaOcBlur();
                        }
                      }}
                      disabled={usaOcCorrect}
                      animate={
                        usaOcCorrect
                          ? { scale: [1, 1.02, 1] }
                          : {}
                      }
                      whileFocus={{ scale: 1.02 }}
                      className={`flex-1 max-w-[200px] h-16 text-center text-2xl font-black border-4 border-black rounded-xl outline-none transition-all ${
                        usaOcCorrect
                          ? "bg-green-100 border-green-500"
                          : "bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      } ${usaOcCorrect ? "cursor-default" : ""}`}
                      placeholder={usaOcFocused || usaOcInput ? "" : "?"}
                    />
                    <span className="text-xl font-black text-black flex-shrink-0">
                      Cloth
                    </span>
                    {usaOcCorrect && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Check className="w-6 h-6 text-green-600" />
                      </motion.div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xl font-black text-black flex-shrink-0">
                      France Opportunity Cost of 1 Wheat =
                    </span>
                    <motion.input
                      type="text"
                      value={franceOcInput}
                      onChange={(e) => setFranceOcInput(e.target.value)}
                      onFocus={() => setFranceOcFocused(true)}
                      onBlur={() => {
                        setFranceOcFocused(false);
                        if (!franceOcCorrect) {
                          handleFranceOcBlur();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !franceOcCorrect) {
                          e.currentTarget.blur();
                          handleFranceOcBlur();
                        }
                      }}
                      disabled={franceOcCorrect}
                      animate={
                        franceOcCorrect
                          ? { scale: [1, 1.02, 1] }
                          : {}
                      }
                      whileFocus={{ scale: 1.02 }}
                      className={`flex-1 max-w-[200px] h-16 text-center text-2xl font-black border-4 border-black rounded-xl outline-none transition-all ${
                        franceOcCorrect
                          ? "bg-green-100 border-green-500"
                          : "bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      } ${franceOcCorrect ? "cursor-default" : ""}`}
                      placeholder={franceOcFocused || franceOcInput ? "" : "?"}
                    />
                    <span className="text-xl font-black text-black flex-shrink-0">
                      Cloth
                    </span>
                    {franceOcCorrect && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Check className="w-6 h-6 text-green-600" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Task B: Comparative Advantage Decision */}
                {usaOcCorrect && franceOcCorrect && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6 pt-6 border-t-4 border-black"
                  >
                    <h2 className="text-2xl font-black text-black">
                      Who has the Comparative Advantage in Wheat?
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-6">
                      {(['USA', 'France'] as const).map((option) => {
                        const isSelected = stage2TaskBAnswer === option;
                        const isCorrect = stage2TaskBCorrect === true && isSelected;
                        const isWrong = stage2TaskBCorrect === false && isSelected;

                        return (
                          <motion.button
                            key={option}
                            onClick={() => handleStage2TaskB(option)}
                            disabled={stage2TaskBCorrect !== null}
                            animate={
                              isWrong
                                ? { x: [0, -10, 10, -5, 5, 0] }
                                : {}
                            }
                            className={`p-6 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-black text-2xl transition-all ${
                              isCorrect
                                ? "bg-green-100 border-green-500"
                                : isWrong
                                ? "bg-red-100 border-red-500"
                                : "hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-y-1"
                            } ${stage2TaskBCorrect !== null ? "cursor-default" : "cursor-pointer"}`}
                          >
                            {option}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



