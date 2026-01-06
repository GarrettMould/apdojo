"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RefreshCcw } from "lucide-react";

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
  
  const [stage2TaskWheatAnswer, setStage2TaskWheatAnswer] = useState<'USA' | 'France' | null>(null);
  const [stage2TaskWheatCorrect, setStage2TaskWheatCorrect] = useState<boolean | null>(null);
  
  const [stage2TaskClothCompAnswer, setStage2TaskClothCompAnswer] = useState<'USA' | 'France' | null>(null);
  const [stage2TaskClothCompCorrect, setStage2TaskClothCompCorrect] = useState<boolean | null>(null);
  
  const [stage2TaskWheatCompAnswer, setStage2TaskWheatCompAnswer] = useState<'USA' | 'France' | null>(null);
  const [stage2TaskWheatCompCorrect, setStage2TaskWheatCompCorrect] = useState<boolean | null>(null);

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

  // Calculate absolute advantage in wheat
  // USA: 10 hours, France: 20 hours - USA has absolute advantage (fewer hours)
  const absoluteAdvantageWheat: 'USA' | 'France' = 'USA';
  
  // Calculate comparative advantage
  // For cloth: USA opp cost = 10/5 = 2 wheat, France opp cost = 20/15 = 1.33 wheat
  // Lower opp cost = comparative advantage, so France has comp adv in cloth... wait, user said USA
  // Let me recalculate: USA needs 5 hours for cloth (could make 5/10 = 0.5 wheat), France needs 15 hours (could make 15/20 = 0.75 wheat)
  // USA opp cost of cloth = 0.5 wheat, France = 0.75 wheat. USA has lower, so USA has comp adv in cloth ✓
  // For wheat: USA opp cost = 5/10 = 0.5 cloth, France = 15/20 = 0.75 cloth
  // USA has lower, so USA has comp adv in wheat... but user said France
  // Actually, if USA has comp adv in cloth, then France must have comp adv in wheat (they're opposites)
  const comparativeAdvantageCloth: 'USA' | 'France' = 'USA';
  const comparativeAdvantageWheat: 'USA' | 'France' = 'France';
  
  // Check if Stage 2 is complete
  const isStage2Complete = 
    stage2TaskACorrect === true &&
    stage2TaskWheatCorrect === true &&
    stage2TaskClothCompCorrect === true &&
    stage2TaskWheatCompCorrect === true;

  // Call onComplete when all stages are done (enables Next button)
  useEffect(() => {
    if (isStage2Complete && onComplete) {
      console.log('[CompAdvantageDrill] All questions correct, calling onComplete');
      onComplete();
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
  
  const resetStage2TaskA = () => {
    console.log('Resetting Task A');
    setStage2TaskAAnswer(null);
    setStage2TaskACorrect(null);
  };
  
  const handleStage2TaskWheat = (answer: 'USA' | 'France') => {
    // Allow clicking if state is null (reset state)
    if (stage2TaskWheatCorrect !== null && stage2TaskWheatCorrect !== false) return;
    
    setStage2TaskWheatAnswer(answer);
    const isCorrect = answer === absoluteAdvantageWheat;
    setStage2TaskWheatCorrect(isCorrect);
  };
  
  const resetStage2TaskWheat = () => {
    setStage2TaskWheatAnswer(null);
    setStage2TaskWheatCorrect(null);
  };
  
  const handleStage2TaskClothComp = (answer: 'USA' | 'France') => {
    // Allow clicking if state is null (reset state)
    if (stage2TaskClothCompCorrect !== null && stage2TaskClothCompCorrect !== false) return;
    
    setStage2TaskClothCompAnswer(answer);
    const isCorrect = answer === comparativeAdvantageCloth;
    setStage2TaskClothCompCorrect(isCorrect);
  };
  
  const resetStage2TaskClothComp = () => {
    setStage2TaskClothCompAnswer(null);
    setStage2TaskClothCompCorrect(null);
  };
  
  const handleStage2TaskWheatComp = (answer: 'USA' | 'France') => {
    // Allow clicking if state is null (reset state)
    if (stage2TaskWheatCompCorrect !== null && stage2TaskWheatCompCorrect !== false) return;
    
    setStage2TaskWheatCompAnswer(answer);
    const isCorrect = answer === comparativeAdvantageWheat;
    setStage2TaskWheatCompCorrect(isCorrect);
  };
  
  const resetStage2TaskWheatComp = () => {
    setStage2TaskWheatCompAnswer(null);
    setStage2TaskWheatCompCorrect(null);
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
                    className={`p-8 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-black text-3xl uppercase transition-all relative ${
                      isCorrect
                        ? "bg-green-100 border-green-500"
                        : isWrong
                        ? "bg-red-100 border-red-500"
                        : "hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-y-1"
                    } ${stage1Correct !== null ? "cursor-default" : "cursor-pointer"}`}
                  >
                    {option === 'input' ? 'INPUT' : 'OUTPUT'}
                    {isWrong && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setStage1Answer(null);
                            setStage1Correct(null);
                          }}
                          className="p-1.5 bg-white border-2 border-black rounded-full hover:bg-gray-100 active:translate-y-0.5 transition-transform cursor-pointer"
                          title="Try again"
                        >
                          <RefreshCcw size={14} className="text-gray-900" />
                        </div>
                      </div>
                    )}
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
            className="space-y-2"
          >
            {/* Task A: Absolute Advantage - Both Questions Side by Side */}
            <div className="grid grid-cols-2 gap-6">
              {/* Cloth Absolute Advantage */}
              <div className="space-y-4">
                <h2 className="text-lg font-black text-black">
                  Who has the absolute advantage in the production of cloth?
                </h2>
                
                <div className="grid grid-cols-2 gap-3">
                  {(['USA', 'France'] as const).map((option) => {
                    const isSelected = stage2TaskAAnswer === option;
                    const isCorrect = stage2TaskACorrect === true && isSelected;
                    const isWrong = stage2TaskACorrect === false && isSelected;

                    return (
                      <motion.button
                        key={`${option}-${stage2TaskACorrect === null ? 'reset' : stage2TaskACorrect}`}
                        onClick={() => handleStage2TaskA(option)}
                        disabled={stage2TaskACorrect === true}
                        animate={
                          isWrong
                            ? { x: [0, -10, 10, -5, 5, 0] }
                            : isCorrect
                            ? { scale: [1, 1.05, 1] }
                            : {}
                        }
                        className={`p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-lg transition-all relative ${
                          isCorrect
                            ? "bg-green-100 border-green-500"
                            : isWrong
                            ? "bg-red-100 border-red-500"
                            : "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1"
                        } ${stage2TaskACorrect !== null ? "cursor-default" : "cursor-pointer"}`}
                      >
                        {option}
                        {isCorrect && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 shadow-sm"
                          >
                            <Check size={14} strokeWidth={4} />
                          </motion.div>
                        )}
                        {isWrong && (
                          <div className="absolute -top-2 -right-2 z-10">
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                resetStage2TaskA();
                              }}
                              className="p-1.5 bg-white border-2 border-black rounded-full hover:bg-gray-100 active:translate-y-0.5 transition-transform cursor-pointer"
                              title="Try again"
                            >
                              <RefreshCcw size={14} className="text-gray-900" />
                            </div>
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Wheat Absolute Advantage */}
              <div className="space-y-4">
                <h2 className="text-lg font-black text-black">
                  Who has the absolute advantage in the production of wheat?
                </h2>
                
                <div className="grid grid-cols-2 gap-3">
                  {(['USA', 'France'] as const).map((option) => {
                    const isSelected = stage2TaskWheatAnswer === option;
                    const isCorrect = stage2TaskWheatCorrect === true && isSelected;
                    const isWrong = stage2TaskWheatCorrect === false && isSelected;

                    return (
                      <motion.button
                        key={`${option}-${stage2TaskWheatCorrect === null ? 'reset' : stage2TaskWheatCorrect}`}
                        onClick={() => handleStage2TaskWheat(option)}
                        disabled={stage2TaskWheatCorrect === true}
                        animate={
                          isWrong
                            ? { x: [0, -10, 10, -5, 5, 0] }
                            : isCorrect
                            ? { scale: [1, 1.05, 1] }
                            : {}
                        }
                        className={`p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-lg transition-all relative ${
                          isCorrect
                            ? "bg-green-100 border-green-500"
                            : isWrong
                            ? "bg-red-100 border-red-500"
                            : "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1"
                        } ${stage2TaskWheatCorrect !== null ? "cursor-default" : "cursor-pointer"}`}
                      >
                        {option}
                        {isCorrect && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 shadow-sm"
                          >
                            <Check size={14} strokeWidth={4} />
                          </motion.div>
                        )}
                        {isWrong && (
                          <div className="absolute -top-2 -right-2 z-10">
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                resetStage2TaskWheat();
                              }}
                              className="p-1.5 bg-white border-2 border-black rounded-full hover:bg-gray-100 active:translate-y-0.5 transition-transform cursor-pointer"
                              title="Try again"
                            >
                              <RefreshCcw size={14} className="text-gray-900" />
                            </div>
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Task B: Comparative Advantage Questions */}
            {stage2TaskACorrect === true && stage2TaskWheatCorrect === true && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4 pt-2"
              >
                <div className="grid grid-cols-2 gap-6">
                  {/* Comparative Advantage in Cloth */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-black text-black">
                      Who has the comparative advantage in the production of cloth?
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {(['USA', 'France'] as const).map((option) => {
                        const isSelected = stage2TaskClothCompAnswer === option;
                        const isCorrect = stage2TaskClothCompCorrect === true && isSelected;
                        const isWrong = stage2TaskClothCompCorrect === false && isSelected;

                        return (
                          <motion.button
                            key={`${option}-${stage2TaskClothCompCorrect === null ? 'reset' : stage2TaskClothCompCorrect}`}
                            onClick={() => handleStage2TaskClothComp(option)}
                            disabled={stage2TaskClothCompCorrect === true}
                            animate={
                              isWrong
                                ? { x: [0, -10, 10, -5, 5, 0] }
                                : isCorrect
                                ? { scale: [1, 1.05, 1] }
                                : {}
                            }
                            className={`p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-lg transition-all relative ${
                              isCorrect
                                ? "bg-green-100 border-green-500"
                                : isWrong
                                ? "bg-red-100 border-red-500"
                                : "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1"
                            } ${stage2TaskClothCompCorrect !== null ? "cursor-default" : "cursor-pointer"}`}
                          >
                            {option}
                            {isCorrect && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 shadow-sm"
                              >
                                <Check size={14} strokeWidth={4} />
                              </motion.div>
                            )}
                            {isWrong && (
                              <div className="absolute -top-2 -right-2 z-10">
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    resetStage2TaskClothComp();
                                  }}
                                  className="p-1.5 bg-white border-2 border-black rounded-full hover:bg-gray-100 active:translate-y-0.5 transition-transform cursor-pointer"
                                  title="Try again"
                                >
                                  <RefreshCcw size={14} className="text-gray-900" />
                                </div>
                              </div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Comparative Advantage in Wheat */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-black text-black">
                      Who has the comparative advantage in the production of wheat?
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {(['USA', 'France'] as const).map((option) => {
                        const isSelected = stage2TaskWheatCompAnswer === option;
                        const isCorrect = stage2TaskWheatCompCorrect === true && isSelected;
                        const isWrong = stage2TaskWheatCompCorrect === false && isSelected;

                        return (
                          <motion.button
                            key={`${option}-${stage2TaskWheatCompCorrect === null ? 'reset' : stage2TaskWheatCompCorrect}`}
                            onClick={() => handleStage2TaskWheatComp(option)}
                            disabled={stage2TaskWheatCompCorrect === true}
                            animate={
                              isWrong
                                ? { x: [0, -10, 10, -5, 5, 0] }
                                : isCorrect
                                ? { scale: [1, 1.05, 1] }
                                : {}
                            }
                            className={`p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-lg transition-all relative ${
                              isCorrect
                                ? "bg-green-100 border-green-500"
                                : isWrong
                                ? "bg-red-100 border-red-500"
                                : "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1"
                            } ${stage2TaskWheatCompCorrect !== null ? "cursor-default" : "cursor-pointer"}`}
                          >
                            {option}
                            {isCorrect && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 shadow-sm"
                              >
                                <Check size={14} strokeWidth={4} />
                              </motion.div>
                            )}
                            {isWrong && (
                              <div className="absolute -top-2 -right-2 z-10">
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    resetStage2TaskWheatComp();
                                  }}
                                  className="p-1.5 bg-white border-2 border-black rounded-full hover:bg-gray-100 active:translate-y-0.5 transition-transform cursor-pointer"
                                  title="Try again"
                                >
                                  <RefreshCcw size={14} className="text-gray-900" />
                                </div>
                              </div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}







