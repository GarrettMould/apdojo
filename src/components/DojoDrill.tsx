"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DraggableGraph from "./DraggableGraph";
import { DojoTable } from "./DojoTable";
import { MonopolyRevenueVisualizer } from "./MonopolyRevenueVisualizer";
import { allQuestions } from "@/data/unitPracticeProblems/unitPracticeProblems";
import { Question } from "@/data/questionBanks/types";
import { CheckCircle2, ArrowRight, Trophy, Check } from "lucide-react";

type Step2Type = "graph" | "table" | "monopoly";

interface DojoDrillProps {
  videoUrl: string;
  videoTitle?: string;
  unit?: number;
  subject?: "ap_macroeconomics" | "ap_microeconomics";
  lessonIds?: string[];
  onComplete?: () => void;
  step2Type?: Step2Type; // "graph" for DraggableGraph, "table" for DojoTable
}

export default function DojoDrill({
  videoUrl,
  videoTitle = "Dojo Drill",
  unit,
  subject = "ap_macroeconomics",
  lessonIds = [],
  onComplete,
  step2Type = "graph", // Default to graph
}: DojoDrillProps) {
  const [step, setStep] = useState(1);
  const [videoEnded, setVideoEnded] = useState(false);
  const [graphCompleted, setGraphCompleted] = useState(false);
  const [tableCompleted, setTableCompleted] = useState(false);
  const [monopolyCompleted, setMonopolyCompleted] = useState(false);
  const [mcqQuestions, setMcqQuestions] = useState<Question[]>([]);
  const [currentMcqIndex, setCurrentMcqIndex] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, string>>({});
  const [xpEarned, setXpEarned] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const totalSteps = 4;

  // Get 3 random MCQs when entering step 3
  useEffect(() => {
    if (step === 3 && mcqQuestions.length === 0) {
      let filteredQuestions = allQuestions.filter((q) => {
        if (subject && q.subject !== subject) return false;
        if (unit && q.unit !== unit) return false;
        if (lessonIds.length > 0) {
          return lessonIds.some((lid) => q.lessonIDS.includes(lid));
        }
        return true;
      });

      // If no filtered questions, just get any 3 from the subject
      if (filteredQuestions.length === 0) {
        filteredQuestions = allQuestions.filter((q) => q.subject === subject);
      }

      // Shuffle and take 3
      const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 3);
      setMcqQuestions(selected);
      setCurrentMcqIndex(0);
      setMcqAnswers({});
    }
  }, [step, subject, unit, lessonIds, mcqQuestions.length]);

  // Calculate XP when completing MCQs
  useEffect(() => {
    if (step === 3 && mcqQuestions.length > 0) {
      const answeredCount = Object.keys(mcqAnswers).length;
      if (answeredCount === mcqQuestions.length) {
        // Calculate XP: 10 per correct answer
        let totalXp = 0;
        mcqQuestions.forEach((q, idx) => {
          if (mcqAnswers[q.id] === q.correctAnswer) {
            totalXp += 10;
          }
        });
        setXpEarned(totalXp);
      }
    }
  }, [mcqAnswers, mcqQuestions, step]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleVideoNext = () => {
    setStep(2);
    setVideoEnded(false);
  };

  const handleGraphComplete = () => {
    setGraphCompleted(true);
  };

  const handleTableComplete = () => {
    setTableCompleted(true);
  };

  const handleMonopolyComplete = () => {
    setMonopolyCompleted(true);
  };

  const handleStep2Next = () => {
    setStep(3);
    setGraphCompleted(false);
    setTableCompleted(false);
    setMonopolyCompleted(false);
  };

  const isStep2Completed = 
    step2Type === "graph" ? graphCompleted : 
    step2Type === "table" ? tableCompleted : 
    monopolyCompleted;

  const handleMcqAnswer = (questionId: number, answer: string) => {
    setMcqAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleMcqNext = () => {
    if (currentMcqIndex < mcqQuestions.length - 1) {
      setCurrentMcqIndex(currentMcqIndex + 1);
    } else {
      setStep(4);
    }
  };

  const handleFinish = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const currentQuestion = mcqQuestions[currentMcqIndex];
  const isCurrentQuestionAnswered = currentQuestion
    ? mcqAnswers[currentQuestion.id] !== undefined
    : false;
  const isCurrentQuestionCorrect = currentQuestion
    ? mcqAnswers[currentQuestion.id] === currentQuestion.correctAnswer
    : false;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Dots - Above Container */}
      <div className="flex justify-center gap-2 mb-6">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNum = index + 1;
          const isActive = step === stepNum;
          const isCompleted = step > stepNum;
          return (
            <div
              key={stepNum}
              className={`w-3 h-3 rounded-full transition-all ${
                isActive
                  ? "bg-black scale-125"
                  : isCompleted
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            />
          );
        })}
      </div>

      {/* Card Container - Just Content */}
      <div className="relative h-[600px]">
        <AnimatePresence mode="wait">
          {/* Step 1: The Briefing - Video Player */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-2 flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  controls
                  className="w-full h-full aspect-video rounded-lg"
                  playsInline
                  onEnded={handleVideoEnd}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          )}

          {/* Step 2: The Simulator - Draggable Graph or Table */}
          {step === 2 && step2Type === "graph" && (
            <motion.div
              key="step2-graph"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                <div className="w-full max-w-3xl">
                  <DraggableGraph onComplete={handleGraphComplete} />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && step2Type === "table" && (
            <motion.div
              key="step2-table"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center overflow-y-auto">
                <GDPTable onComplete={handleTableComplete} />
              </div>
            </motion.div>
          )}

          {step === 2 && step2Type === "monopoly" && (
            <motion.div
              key="step2-monopoly"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col overflow-y-auto"
            >
              <div className="flex-1 flex items-center justify-center">
                <MonopolyRevenueVisualizer onComplete={handleMonopolyComplete} />
              </div>
            </motion.div>
          )}

          {/* Step 3: The Gauntlet - MCQs */}
          {step === 3 && currentQuestion && (
            <motion.div
              key={`step3-${currentMcqIndex}`}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col"
            >
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-2xl mx-auto">
                  <p className="text-lg font-medium text-gray-800 mb-6 leading-relaxed">
                    {currentQuestion.question}
                  </p>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                      const optionLetter = String.fromCharCode(65 + index);
                      const isSelected =
                        mcqAnswers[currentQuestion.id] === optionLetter;
                      const isCorrect = optionLetter === currentQuestion.correctAnswer;
                      const showResult = isCurrentQuestionAnswered;

                      return (
                        <button
                          key={index}
                          onClick={() =>
                            !isCurrentQuestionAnswered &&
                            handleMcqAnswer(currentQuestion.id, optionLetter)
                          }
                          disabled={isCurrentQuestionAnswered}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            !showResult
                              ? "bg-white border-gray-300 hover:border-black hover:bg-gray-50 cursor-pointer"
                              : isSelected && isCorrect
                              ? "bg-green-100 border-green-500 text-green-900"
                              : isSelected && !isCorrect
                              ? "bg-red-100 border-red-500 text-red-900"
                              : isCorrect && showResult
                              ? "bg-green-100 border-green-500 text-green-900"
                              : "bg-gray-50 border-gray-300 text-gray-600"
                          } ${isCurrentQuestionAnswered ? "cursor-default" : ""}`}
                        >
                          <span className="font-semibold">{optionLetter}.</span>{" "}
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  {isCurrentQuestionAnswered && currentQuestion.explanation && (
                    <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                      <p className="text-gray-800 leading-relaxed">
                        <strong>Explanation:</strong> {currentQuestion.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Victory Screen */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col items-center justify-center"
            >
              <Trophy className="w-24 h-24 text-yellow-500 mb-6" />
              <p className="text-2xl font-semibold text-gray-700 mb-8">
                XP Earned: <span className="text-green-600">{xpEarned}</span>
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleFinish}
                  className="px-8 py-3 rounded-lg font-bold text-lg bg-black text-white border-2 border-black hover:bg-gray-800 active:translate-y-1 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Finish
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Next Button - Below Container with Framer Motion */}
      <div className="mt-6 flex justify-center">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.button
              key="next-step1"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={handleVideoNext}
              disabled={!videoEnded}
              className={`px-8 py-3 rounded-lg font-bold text-lg border-2 border-black transition-all ${
                videoEnded
                  ? "bg-black text-white hover:bg-gray-800 active:translate-y-1"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Next <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </motion.button>
          )}
          {step === 2 && (
            <motion.button
              key="next-step2"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={handleStep2Next}
              disabled={!isStep2Completed}
              className={`px-8 py-3 rounded-lg font-bold text-lg border-2 border-black transition-all ${
                isStep2Completed
                  ? "bg-black text-white hover:bg-gray-800 active:translate-y-1"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Next <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </motion.button>
          )}
          {step === 3 && currentQuestion && (
            <motion.button
              key="next-step3"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={handleMcqNext}
              disabled={!isCurrentQuestionAnswered}
              className={`px-8 py-3 rounded-lg font-bold text-lg border-2 border-black transition-all ${
                isCurrentQuestionAnswered
                  ? "bg-black text-white hover:bg-gray-800 active:translate-y-1"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {currentMcqIndex < mcqQuestions.length - 1 ? (
                <>
                  Next <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </>
              ) : (
                "Finish Gauntlet"
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// GDP Table Component for Gradeflation Drill
const GDPTable = ({ onComplete }: { onComplete: () => void }) => {
  const [correctCount, setCorrectCount] = useState(0);
  const totalInputs = 3; // Number of input cells in the table

  // Track when all inputs are correct
  useEffect(() => {
    if (correctCount === totalInputs) {
      onComplete();
    }
  }, [correctCount, totalInputs, onComplete]);

  const handleInputCorrect = () => {
    setCorrectCount((prev) => Math.min(prev + 1, totalInputs));
  };

  return (
    <div className="w-full">
      <p className="text-center text-lg font-semibold mb-6 text-gray-800">
        Calculate the Nominal GDP for each year.
      </p>
      <GDPTableWithTracking
        headers={['Year', 'Price of Pizza', 'Qty Pizza', 'Nominal GDP']}
        rows={[
          ['2011', '$10', '400', { type: 'input', answer: '4000' }],
          ['2012', '$11', '500', { type: 'input', answer: '5500' }],
          ['2013', '$12', '600', { type: 'input', answer: '7200' }],
        ]}
        onInputCorrect={handleInputCorrect}
      />
    </div>
  );
};

// Wrapper component that tracks input completion
const GDPTableWithTracking = ({ 
  headers, 
  rows, 
  onInputCorrect 
}: { 
  headers: string[]; 
  rows: Array<string | { type: "input"; answer: string; placeholder?: string }>[]; 
  onInputCorrect: () => void;
}) => {
  const [completedInputs, setCompletedInputs] = useState<Set<number>>(new Set());

  const handleInputComplete = (rowIndex: number) => {
    if (!completedInputs.has(rowIndex)) {
      setCompletedInputs((prev) => new Set([...prev, rowIndex]));
      onInputCorrect();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      {/* HEADER ROW */}
      <div 
        className="grid border-b-4 border-black bg-gray-100"
        style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}
      >
        {headers.map((header, i) => (
          <div key={i} className={`p-4 font-black text-center text-sm md:text-lg uppercase tracking-wider flex items-center justify-center ${i !== headers.length - 1 ? 'border-r-4 border-black' : ''}`}>
            {header}
          </div>
        ))}
      </div>

      {/* BODY ROWS */}
      {rows.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className={`grid ${rowIndex !== rows.length - 1 ? 'border-b-4 border-black' : ''}`}
          style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}
        >
          {row.map((cell, colIndex) => (
            <div key={colIndex} className={`relative flex items-center justify-center p-3 ${colIndex !== headers.length - 1 ? 'border-r-4 border-black' : ''}`}>
              {typeof cell === "string" ? (
                <span className="font-bold text-lg md:text-xl text-center">{cell}</span>
              ) : (
                <GDPInput 
                  answer={cell.answer} 
                  placeholder={cell.placeholder}
                  onCorrect={() => handleInputComplete(rowIndex)}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Input component that calls onCorrect when answer is correct
const GDPInput = ({ 
  answer, 
  placeholder,
  onCorrect 
}: { 
  answer: string; 
  placeholder?: string;
  onCorrect: () => void;
}) => {
  const [val, setVal] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  const checkAnswer = () => {
    const cleanVal = val.replace(/[$,]/g, "").trim();
    const cleanAnswer = answer.replace(/[$,]/g, "").trim();

    if (cleanVal === cleanAnswer) {
      setStatus("correct");
      onCorrect(); // Notify parent that this input is correct
    } else {
      setStatus("wrong");
      setTimeout(() => setStatus("idle"), 1000);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[60px]">
      <motion.input
        type="text"
        placeholder={placeholder || "?"}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={checkAnswer}
        onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
        disabled={status === "correct"}
        animate={status === "wrong" ? { x: [0, -10, 10, -5, 5, 0] } : {}}
        whileFocus={{ scale: 1.05 }}
        className={`w-full max-w-[120px] h-12 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all
          ${status === "idle" ? "bg-gray-50 border-gray-300 focus:border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] placeholder:text-gray-300" : ""}
          ${status === "correct" ? "bg-green-100 border-green-500 text-green-800 shadow-none" : ""}
          ${status === "wrong" ? "bg-red-50 border-red-500 text-red-600" : ""}
        `}
      />
      <AnimatePresence>
        {status === "correct" && (
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-sm z-10"
          >
            <Check size={14} strokeWidth={4} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
