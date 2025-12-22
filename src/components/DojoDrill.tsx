"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DraggableGraph from "./DraggableGraph";
import { DojoTable } from "./DojoTable";
import { MonopolyRevenueVisualizer } from "./MonopolyRevenueVisualizer";
import { CompAdvantageDrill, CompAdvantageProblem } from "./CompAdvantageDrill";
import { GDPDrill } from "./GDPDrill";
import { PPCDrill } from "./PPCDrill";
import { DemandChangeDrill, DemandChangeScenario } from "./DemandChangeDrill";
import { ElasticityRevenueDrill, ElasticityScenario } from "./ElasticityRevenueDrill";
import { ConsumerProducerSurplusDrill } from "./ConsumerProducerSurplusDrill";
import { allQuestions } from "@/data/unitPracticeProblems/unitPracticeProblems";
import { Question } from "@/data/questionBanks/types";
import { CheckCircle2, ArrowRight, Trophy, Check, Lightbulb } from "lucide-react";
import Image from "next/image";
import { DojoDrill as DojoDrillType, ComprehensionQuestion } from "@/data/dojoDrills";
import ReactMarkdown from 'react-markdown';

// Helper function to parse markdown table from text
const parseMarkdownTable = (text: string): { tableData: { headers: string[]; rows: string[][] } | null; textWithoutTable: string } => {
  const lines = text.split('\n');
  let tableStartIndex = -1;
  let tableEndIndex = -1;
  
  // Find table boundaries (lines starting with |)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      if (tableStartIndex === -1) {
        tableStartIndex = i;
      }
      tableEndIndex = i;
    } else if (tableStartIndex !== -1 && !line.startsWith('|') && line.length > 0) {
      // Table ended (non-empty line that doesn't start with |)
      break;
    }
  }
  
  if (tableStartIndex === -1 || tableEndIndex === -1) {
    return { tableData: null, textWithoutTable: text };
  }
  
  // Extract table lines
  const tableLines = lines.slice(tableStartIndex, tableEndIndex + 1);
  
  if (tableLines.length < 2) {
    return { tableData: null, textWithoutTable: text };
  }
  
  // Parse headers (first line)
  const headerLine = tableLines[0];
  const headers = headerLine
    .split('|')
    .map(h => h.trim())
    .filter(h => h.length > 0);
  
  // Parse rows (skip header and separator line)
  const rows: string[][] = [];
  for (let i = 2; i < tableLines.length; i++) {
    const line = tableLines[i].trim();
    // Skip empty lines
    if (!line || !line.startsWith('|')) continue;
    
    const cells = line
      .split('|')
      .map(c => c.trim())
      .filter(c => c.length > 0);
    
    if (cells.length > 0) {
      rows.push(cells);
    }
  }
  
  // Remove table from text
  const textWithoutTable = [
    ...lines.slice(0, tableStartIndex),
    ...lines.slice(tableEndIndex + 1)
  ].join('\n').trim();
  
  if (headers.length === 0 || rows.length === 0) {
    return { tableData: null, textWithoutTable: text };
  }
  
  return {
    tableData: { headers, rows },
    textWithoutTable
  };
};

interface DojoDrillProps {
  drill: DojoDrillType;
  onComplete?: () => void;
}

export default function DojoDrill({ drill, onComplete }: DojoDrillProps) {
  const [step, setStep] = useState(1);
  const [videoEnded, setVideoEnded] = useState(false);
  const [comprehensionAnswers, setComprehensionAnswers] = useState<Record<string, number>>({});
  const [compQuestionsSubmitted, setCompQuestionsSubmitted] = useState(false);
  
  const [graphCompleted, setGraphCompleted] = useState(false);
  const [tableCompleted, setTableCompleted] = useState(false);
  const [monopolyCompleted, setMonopolyCompleted] = useState(false);
  
  const [mcqQuestions, setMcqQuestions] = useState<Question[]>([]);
  const [currentMcqIndex, setCurrentMcqIndex] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, string>>({});
  const [showHint, setShowHint] = useState(false);
  
  const [xpEarned, setXpEarned] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const totalSteps = 4;

  // Load MCQs from stage3.mcqIds when entering step 3
  useEffect(() => {
    if (step === 3 && mcqQuestions.length === 0) {
      const questions = drill.stage3.mcqIds
        .map(id => allQuestions.find(q => q.id === id))
        .filter((q): q is Question => q !== undefined);
      
      if (questions.length === 3) {
        setMcqQuestions(questions);
        setCurrentMcqIndex(0);
        setMcqAnswers({});
      }
    }
  }, [step, drill.stage3.mcqIds, mcqQuestions.length]);

  // Calculate XP when completing MCQs
  useEffect(() => {
    if (step === 3 && mcqQuestions.length > 0) {
      const answeredCount = Object.keys(mcqAnswers).length;
      if (answeredCount === mcqQuestions.length) {
        // Calculate XP: 20 for completion + 10 per correct answer
        let mcqXp = 0;
        mcqQuestions.forEach((q) => {
          if (mcqAnswers[q.id] === q.correctAnswer) {
            mcqXp += drill.xpReward.perMcqCorrect;
          }
        });
        const totalXp = drill.xpReward.completion + mcqXp;
        setXpEarned(totalXp);
      }
    }
  }, [mcqAnswers, mcqQuestions, step, drill.xpReward]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleComprehensionAnswer = (questionId: string, answerIndex: number) => {
    if (!compQuestionsSubmitted) {
      setComprehensionAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    }
  };

  const handleCompQuestionsSubmit = () => {
    const allAnswered = drill.stage1.comprehensionQuestions.every(
      q => comprehensionAnswers[q.id] !== undefined
    );
    if (allAnswered) {
      setCompQuestionsSubmitted(true);
    }
  };

  const handleStage1Next = () => {
    if (videoEnded && compQuestionsSubmitted) {
      setStep(2);
      setVideoEnded(false);
      setCompQuestionsSubmitted(false);
    }
  };

  const handleGraphComplete = () => {
    setGraphCompleted(true);
    // Auto-advance to step 3 after a delay for demand-change activity
    if (drill.stage2.type === 'demand-change') {
      setTimeout(() => {
        setStep(3);
        setGraphCompleted(false);
      }, 2000); // 2 second delay to show the green background
    }
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
    drill.stage2.type === "graph" ? graphCompleted : 
    drill.stage2.type === "table" ? tableCompleted : 
    drill.stage2.type === "monopoly" ? monopolyCompleted :
    drill.stage2.type === "demand-change" ? graphCompleted :
    drill.stage2.type === "elasticity-revenue" ? graphCompleted :
    drill.stage2.type === "consumer-producer-surplus" ? graphCompleted :
    false;

  const handleMcqAnswer = (questionId: number, answer: string) => {
    setMcqAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  // Reset hint when question changes
  useEffect(() => {
    setShowHint(false);
  }, [currentMcqIndex]);

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

  const allCompQuestionsAnswered = drill.stage1.comprehensionQuestions.every(
    q => comprehensionAnswers[q.id] !== undefined
  );

  const currentMcqQuestion = mcqQuestions[currentMcqIndex];
  const isCurrentMcqAnswered = currentMcqQuestion
    ? mcqAnswers[currentMcqQuestion.id] !== undefined
    : false;
  const isCurrentMcqCorrect = currentMcqQuestion
    ? mcqAnswers[currentMcqQuestion.id] === currentMcqQuestion.correctAnswer
    : false;

  // Activity component mapping
  const getActivityComponent = () => {
    switch (drill.stage2.type) {
      case 'graph':
        return <DraggableGraph onComplete={handleGraphComplete} />;
      case 'table':
        // Use GDPDrill for the nominal vs real GDP drill
        return <GDPDrill onComplete={handleTableComplete} />;
      case 'monopoly':
        return <MonopolyRevenueVisualizer onComplete={handleMonopolyComplete} />;
      case 'comparative-advantage':
        // Get problem data from stage2.config
        const problemData = drill.stage2.config as CompAdvantageProblem;
        if (problemData) {
          return <CompAdvantageDrill problem={problemData} onComplete={handleGraphComplete} />;
        }
        return null;
      case 'ppc-drill':
        return <PPCDrill onComplete={handleGraphComplete} />;
      case 'demand-change':
        const demandChangeData = drill.stage2.config as DemandChangeScenario;
        if (demandChangeData) {
          return <DemandChangeDrill problem={demandChangeData} onComplete={handleGraphComplete} />;
        }
        return null;
      case 'elasticity-revenue':
        const elasticityData = drill.stage2.config as ElasticityScenario;
        if (elasticityData) {
          return <ElasticityRevenueDrill problem={elasticityData} onComplete={handleGraphComplete} />;
        }
        return null;
      case 'consumer-producer-surplus':
        return <ConsumerProducerSurplusDrill onComplete={handleGraphComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
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

      {/* Card Container */}
      <div className="relative min-h-[600px]">
        <AnimatePresence mode="wait">
          {/* Step 1: Video + Comprehension Check Sidebar */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 flex gap-4 min-h-[600px]"
            >
              {/* Video Section - Left */}
              <div className="flex-1 flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={drill.stage1.videoUrl}
                  controls
                  className="w-full h-full aspect-video rounded-lg"
                  playsInline
                  onEnded={handleVideoEnd}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Comprehension Check Sidebar - Right */}
              <div className="w-96 h-full flex flex-col pl-4">
                <div className="pb-4 mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Comprehension Check
                  </h3>
                </div>
                
                {/* Scrollable Questions */}
                <div className="flex-1 overflow-y-auto space-y-6 pr-2 pb-4">
                  {drill.stage1.comprehensionQuestions.map((question, qIndex) => {
                    const isAnswered = comprehensionAnswers[question.id] !== undefined;
                    const selectedAnswer = comprehensionAnswers[question.id];
                    const showResults = compQuestionsSubmitted;

                    return (
                      <div key={question.id} className="space-y-3">
                        <p className="text-sm font-semibold text-gray-600">
                          Question {qIndex + 1}
                        </p>
                        <p className="text-base font-medium text-gray-800 leading-relaxed">
                          {question.question}
                        </p>
                        <div className="space-y-2">
                          {question.options.map((option, index) => {
                            const isSelected = selectedAnswer === index;
                            const isCorrect = index === question.correctAnswer;
                            const showResult = showResults;

                            return (
                              <button
                                key={index}
                                onClick={() => handleComprehensionAnswer(question.id, index)}
                                disabled={showResults}
                                className={`w-full text-left p-3 rounded-lg transition-all ${
                                  !showResult
                                    ? isSelected
                                      ? "bg-gray-200 border-[3px] border-black text-gray-900"
                                      : "bg-white border-2 border-gray-300 hover:border-black hover:bg-gray-50 cursor-pointer"
                                    : isSelected && isCorrect
                                    ? "bg-green-100 border-[3px] border-black text-green-900"
                                    : isSelected && !isCorrect
                                    ? "bg-red-100 border-[3px] border-black text-red-900"
                                    : isCorrect && showResult
                                    ? "bg-green-100 border-[3px] border-black text-green-900"
                                    : "bg-gray-50 border-2 border-gray-300 text-gray-600"
                                } ${showResults ? "cursor-default" : ""}`}
                              >
                                <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>{" "}
                                {option}
                              </button>
                            );
                          })}
                        </div>
                        
                        {showResults && question.explanation && selectedAnswer !== undefined && selectedAnswer !== question.correctAnswer && (
                          <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                            <p className="text-sm text-gray-800 leading-relaxed">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Submit Button */}
                {!compQuestionsSubmitted && (
                  <div className="pt-4 mt-4">
                    <button
                      onClick={handleCompQuestionsSubmit}
                      disabled={!allCompQuestionsAnswered}
                      className={`w-full px-6 py-3 rounded-lg font-bold text-lg border-2 border-black transition-all ${
                        allCompQuestionsAnswered
                          ? "bg-black text-white hover:bg-gray-800 active:translate-y-1"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Submit Answers
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 2: Interactive Activity */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col min-h-[600px] overflow-hidden"
            >
              <div className="flex-1 flex items-center justify-center px-12 py-8 overflow-hidden">
                {getActivityComponent()}
              </div>
            </motion.div>
          )}

          {/* Step 3: MCQs - Split Screen Layout */}
          {step === 3 && currentMcqQuestion && (
            <motion.div
              key={`step3-${currentMcqIndex}`}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col"
            >
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-5 gap-6 h-full">
                  {/* Left Column: Question and Options (span-3) */}
                  <div className="col-span-5 md:col-span-3 flex flex-col">
                    <div className="mb-6">
                      {/* Parse markdown table from question text */}
                      {(() => {
                        const { tableData: parsedTableData, textWithoutTable } = parseMarkdownTable(currentMcqQuestion.question);
                        const displayTableData = currentMcqQuestion.tableData || parsedTableData;
                        const displayQuestionText = parsedTableData ? textWithoutTable : currentMcqQuestion.question;
                        
                        return (
                          <>
                            {/* Table Data from tableData property or parsed from markdown */}
                            {displayTableData && (
                              <div className="my-6 flex justify-center">
                                <div className="flex items-center gap-4">
                                  {currentMcqQuestion.tableData && 'playerNames' in currentMcqQuestion.tableData && currentMcqQuestion.tableData.playerNames && (
                                    <div className="flex items-center justify-center h-full w-16">
                                      <p className="transform -rotate-90 whitespace-nowrap text-center font-bold text-lg text-gray-900 leading-tight">
                                        {currentMcqQuestion.tableData.playerNames.row.split(' ')[0]}
                                        <br />
                                        {currentMcqQuestion.tableData.playerNames.row.split(' ').slice(1).join(' ')}
                                      </p>
                                    </div>
                                  )}
                                  <div className="flex-1 overflow-x-auto">
                                    <table className="min-w-full border-collapse border border-black">
                                      <thead className="bg-white">
                                        <tr>
                                          {displayTableData.headers.map((header: string) => (
                                            <th key={header} className="border border-black px-4 py-3 text-center text-base font-bold text-gray-900">
                                              {header}
                                            </th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white">
                                        {displayTableData.rows.map((row: string[], rowIndex: number) => (
                                          <tr key={rowIndex}>
                                            {row.map((cell: string, cellIndex: number) => {
                                              const isRowHeader = 'rowHeaders' in displayTableData && displayTableData.rowHeaders && cellIndex === 0;
                                              return (
                                                <td 
                                                  key={cellIndex} 
                                                  className={`border border-black px-4 py-3 text-center text-base ${isRowHeader ? 'font-bold' : ''}`}
                                                >
                                                  {cell}
                                                </td>
                                              );
                                            })}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            )}
                            {/* Render question text with markdown support (excluding tables, which are rendered above) */}
                            <div className="text-lg font-medium text-gray-800 mb-4 leading-relaxed prose prose-sm max-w-none">
                              <ReactMarkdown
                                components={{
                                  p: ({ children }) => <p className="mb-2">{children}</p>,
                                }}
                              >
                                {displayQuestionText}
                              </ReactMarkdown>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    <div className="space-y-3 flex-1">
                      {currentMcqQuestion.options.map((option, index) => {
                        const optionLetter = String.fromCharCode(65 + index);
                        const isSelected =
                          mcqAnswers[currentMcqQuestion.id] === optionLetter;
                        const isCorrect = optionLetter === currentMcqQuestion.correctAnswer;
                        const showResult = isCurrentMcqAnswered;

                        return (
                          <div
                            key={index}
                            onClick={() =>
                              !isCurrentMcqAnswered &&
                              handleMcqAnswer(currentMcqQuestion.id, optionLetter)
                            }
                            className={`w-full p-4 border-2 border-black rounded-xl mb-3 transition-all ${
                              !showResult
                                ? "bg-white hover:bg-gray-50 hover:shadow-md cursor-pointer"
                                : isSelected && isCorrect
                                ? "bg-green-100 border-green-600 cursor-default"
                                : isSelected && !isCorrect
                                ? "bg-red-100 border-red-600 cursor-default"
                                : isCorrect && showResult
                                ? "bg-green-100 border-green-600 cursor-default"
                                : "bg-gray-50 cursor-default"
                            } ${isCurrentMcqAnswered ? "" : "hover:translate-y-[-2px]"}`}
                          >
                            <span className="font-semibold">{optionLetter}.</span>{" "}
                            {option}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Intel Panel (span-2) */}
                  <div className="col-span-5 md:col-span-2 bg-gray-50 border-l-4 border-black h-full p-6 hidden md:flex flex-col">
                    {!isCurrentMcqAnswered ? (
                      /* State A: Before Answer - Image or Hint */
                      <div className="flex flex-col h-full">
                        {currentMcqQuestion.image ? (
                          <div className="flex-1 flex items-center justify-center">
                            {typeof currentMcqQuestion.image === 'object' && 'src' in currentMcqQuestion.image && !('default' in currentMcqQuestion.image) ? (
                              <Image
                                src={(currentMcqQuestion.image as { src: string; alt?: string }).src}
                                alt={(currentMcqQuestion.image as { src: string; alt?: string }).alt || 'Question image'}
                                width={400}
                                height={300}
                                className="max-w-full h-auto rounded-lg border-2 border-black"
                              />
                            ) : (
                              <Image
                                src={currentMcqQuestion.image as any}
                                alt="Question image"
                                width={400}
                                height={300}
                                className="max-w-full h-auto rounded-lg border-2 border-black"
                              />
                            )}
                          </div>
                        ) : (
                          <div className="flex-1 flex items-center justify-center">
                            <button
                              onClick={() => setShowHint(!showHint)}
                              className="px-6 py-3 bg-black text-white border-2 border-black rounded-xl font-bold hover:bg-gray-800 active:translate-y-1 transition-all flex items-center gap-2"
                            >
                              <Lightbulb className="w-5 h-5" />
                              {showHint ? 'Hide Hint' : 'Show Hint'}
                            </button>
                          </div>
                        )}
                        {showHint && !currentMcqQuestion.image && (
                          <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
                            <p className="text-sm font-medium text-gray-800">
                              Think about the key concepts related to this question. Consider what you learned in the video and interactive activity.
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* State B: After Answer - Debrief Card */
                      <div className="flex flex-col h-full">
                        <h3 className="text-xl font-black text-black mb-4">Analysis</h3>
                        {currentMcqQuestion.explanation && (
                          <div className="flex-1 overflow-y-auto">
                            <p className="text-sm font-medium text-gray-800 leading-relaxed">
                              {currentMcqQuestion.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Mobile: Show explanation below options */}
                  {isCurrentMcqAnswered && currentMcqQuestion.explanation && (
                    <div className="col-span-5 md:hidden mt-4 p-4 bg-gray-50 border-2 border-black rounded-xl">
                      <h3 className="text-lg font-black text-black mb-2">Analysis</h3>
                      <p className="text-sm font-medium text-gray-800 leading-relaxed">
                        {currentMcqQuestion.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Results */}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Dojo Drill Complete!
              </h2>
              <p className="text-2xl font-semibold text-gray-700 mb-8">
                XP Earned: <span className="text-green-600">{xpEarned}</span> / {drill.xpReward.total}
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

      {/* Next Button - Below Container */}
      <div className="mt-6 flex justify-center">
        <AnimatePresence mode="wait">
          {step === 1 && videoEnded && compQuestionsSubmitted && (
            <motion.button
              key="next-step1"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={handleStage1Next}
              className="px-8 py-3 rounded-lg font-bold text-lg bg-black text-white border-2 border-black hover:bg-gray-800 active:translate-y-1 transition-all"
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
          {step === 3 && currentMcqQuestion && (
            <motion.button
              key="next-step3"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={handleMcqNext}
              disabled={!isCurrentMcqAnswered}
              className={`px-8 py-3 rounded-lg font-bold text-lg border-2 border-black transition-all ${
                isCurrentMcqAnswered
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

