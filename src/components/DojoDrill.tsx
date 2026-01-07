"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
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
import { CheckCircle2, ArrowRight, Trophy, Check, Lightbulb, Calculator, Pen } from "lucide-react";
import Image from "next/image";
import { DojoDrill as DojoDrillType, ComprehensionQuestion } from "@/data/dojoDrills";
import ReactMarkdown from 'react-markdown';
import { useAuthContext } from '@/contexts/AuthContext';
import { saveDojoDrillProgress, loadDojoDrillProgress, getDrillProgress } from '@/lib/dojoDrillProgress';
import { getBeltProgress } from '@/lib/beltSystem';
import { getSubjectXP } from '@/hooks/useUserProgress';
import { DojoDrillResults } from './DojoDrillResults';
import { whiteboardImages as allContentWhiteboards, WhiteboardImage } from '@/data/allContent';
import { unit1Whiteboards, apMacroUnit2Whiteboards, apMacroUnit3Whiteboards, apMacroUnit4Whiteboards, apMacroUnit5Whiteboards, apMicroUnit3Whiteboards, apMicroUnit4Whiteboards, apMicroUnit5Whiteboards, apMicroUnit6Whiteboards, Whiteboard } from '@/data/whiteboards';
import { ExamCalculator } from './ExamCalculator';
import { ExamWhiteboard } from './ExamWhiteboard';

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
  const { awardXp, user, userData, selectedSubject } = useAuthContext();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [videoEnded, setVideoEnded] = useState(false);
  const [comprehensionAnswers, setComprehensionAnswers] = useState<Record<string, number>>({});
  const [compQuestionsSubmitted, setCompQuestionsSubmitted] = useState(false);
  
  const [graphCompleted, setGraphCompleted] = useState(false);
  const [tableCompleted, setTableCompleted] = useState(false);
  const [monopolyCompleted, setMonopolyCompleted] = useState(false);
  const [ppcLevel, setPpcLevel] = useState<1 | 2>(1); // Track PPC drill level
  const [level1Ready, setLevel1Ready] = useState(false); // Track if PPC level 1 is ready to proceed
  
  const [mcqQuestions, setMcqQuestions] = useState<Question[]>([]);
  const [currentMcqIndex, setCurrentMcqIndex] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, string>>({});
  const [showHint, setShowHint] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showDrawingPad, setShowDrawingPad] = useState(false);
  
  const [xpEarned, setXpEarned] = useState(0);
  const [xpAwarded, setXpAwarded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const totalSteps = 4;
  const [loadingProgress, setLoadingProgress] = useState(true);

  // Load progress and determine starting step
  useEffect(() => {
    const loadProgressAndSetStep = async () => {
      if (!user || !drill) {
        setLoadingProgress(false);
        return;
      }

      try {
        const allProgress = await loadDojoDrillProgress(user.uid);
        const drillProgress = getDrillProgress(allProgress, drill.id);
        
        if (drillProgress) {
          // Determine starting step based on completed stages
          if (drillProgress.stage3) {
            // All stages complete, show results
            setStep(4);
            setCompQuestionsSubmitted(true);
            setGraphCompleted(true);
            setTableCompleted(true);
            setMonopolyCompleted(true);
            // Load MCQs for XP calculation - filter by subject
            const subjectFilter = selectedSubject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';
            const questions = drill.stage3.mcqIds
              .map(id => allQuestions.find(q => q.id === id && q.subject === subjectFilter))
              .filter((q): q is Question => q !== undefined);
            setMcqQuestions(questions);
          } else if (drillProgress.stage2) {
            // Stage 2 complete, start at MCQs (step 3)
            setStep(3);
            setCompQuestionsSubmitted(true);
            setGraphCompleted(true);
            setTableCompleted(true);
            setMonopolyCompleted(true);
            // Load MCQs - filter by subject
            const subjectFilter = selectedSubject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';
            const questions = drill.stage3.mcqIds
              .map(id => allQuestions.find(q => q.id === id && q.subject === subjectFilter))
              .filter((q): q is Question => q !== undefined);
            setMcqQuestions(questions);
          } else if (drillProgress.stage1) {
            // Stage 1 complete, start at interactive activity (step 2)
            setStep(2);
            setCompQuestionsSubmitted(true);
            setVideoEnded(true);
          }
        }
      } catch (error) {
        console.error('[DojoDrill] Error loading progress:', error);
      } finally {
        setLoadingProgress(false);
      }
    };

    loadProgressAndSetStep();
  }, [user, drill]);

  // Load MCQs from stage3.mcqIds when entering step 3
  useEffect(() => {
    if (step === 3 && mcqQuestions.length === 0) {
      // Determine the subject filter based on selectedSubject
      const subjectFilter = selectedSubject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';
      
      const questions = drill.stage3.mcqIds
        .map(id => allQuestions.find(q => q.id === id && q.subject === subjectFilter))
        .filter((q): q is Question => q !== undefined);
      
      if (questions.length === 3) {
        setMcqQuestions(questions);
        setCurrentMcqIndex(0);
        setMcqAnswers({});
      } else {
        console.error(`[DojoDrill] Expected 3 questions for subject ${subjectFilter}, but found ${questions.length}. MCQ IDs:`, drill.stage3.mcqIds);
      }
    }
  }, [step, drill.stage3.mcqIds, mcqQuestions.length, selectedSubject]);

  // Calculate XP when completing MCQs
  useEffect(() => {
    if (step === 3 && mcqQuestions.length > 0) {
      const answeredCount = Object.keys(mcqAnswers).length;
      if (answeredCount === mcqQuestions.length) {
        // Calculate XP: 200 for completion + 100 per correct answer
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

  // Award XP when drill is completed (step 4)
  useEffect(() => {
    if (step === 4 && xpEarned > 0 && !xpAwarded && awardXp) {
      awardXp(xpEarned).then(() => {
        setXpAwarded(true);
        console.log(`[DojoDrill] Awarded ${xpEarned} XP for completing drill: ${drill.id}`);
      }).catch((error) => {
        console.error('[DojoDrill] Error awarding XP:', error);
      });
    }
  }, [step, xpEarned, xpAwarded, awardXp, drill.id]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Save stage1 progress when video ends (if comprehension questions already submitted)
    if (compQuestionsSubmitted && user) {
      saveDojoDrillProgress(user.uid, drill.id, 'stage1').catch((error) => {
        console.error('[DojoDrill] Error saving stage1 progress:', error);
      });
    }
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
      // Save stage1 progress when comprehension questions are submitted (if video also ended)
      if (videoEnded && user) {
        saveDojoDrillProgress(user.uid, drill.id, 'stage1').catch((error) => {
          console.error('[DojoDrill] Error saving stage1 progress:', error);
        });
      }
    }
  };

  const handleStage1Next = () => {
    if (videoEnded && compQuestionsSubmitted) {
      // Ensure stage1 progress is saved (in case video ended after submission)
      if (user) {
        saveDojoDrillProgress(user.uid, drill.id, 'stage1').catch((error) => {
          console.error('[DojoDrill] Error saving stage1 progress:', error);
        });
      }
      setStep(2);
      setVideoEnded(false);
      setCompQuestionsSubmitted(false);
    }
  };

  const handleGraphComplete = () => {
    // For PPC drill, only handle level 2 completion
    if (drill.stage2.type === 'ppc-drill') {
      // Level 2 complete, mark as done
      setGraphCompleted(true);
    } else {
      setGraphCompleted(true);
      
      // Save stage2 progress
      if (user) {
        saveDojoDrillProgress(user.uid, drill.id, 'stage2').catch((error) => {
          console.error('[DojoDrill] Error saving stage2 progress:', error);
        });
      }
      
      // Load MCQs before advancing to step 3 - filter by subject
      const subjectFilter = selectedSubject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';
      const questions = drill.stage3.mcqIds
        .map(id => allQuestions.find(q => q.id === id && q.subject === subjectFilter))
        .filter((q): q is Question => q !== undefined);
      
      if (questions.length > 0) {
        setMcqQuestions(questions);
        setCurrentMcqIndex(0);
        setMcqAnswers({});
        // Auto-advance to step 3 after a delay for demand-change and elasticity-revenue activities
        if (drill.stage2.type === 'demand-change' || drill.stage2.type === 'elasticity-revenue') {
          setTimeout(() => {
            setStep(3);
            setGraphCompleted(false);
          }, 1500); // 1.5 second delay to show completion feedback
        }
      } else {
        console.error(`[DojoDrill] Failed to load MCQs for subject ${subjectFilter}. Expected questions, found:`, questions.length);
        console.error('[DojoDrill] MCQ IDs:', drill.stage3.mcqIds);
      }
    }
  };

  const handleTableComplete = () => {
    setTableCompleted(true);
  };

  const handleMonopolyComplete = () => {
    setMonopolyCompleted(true);
  };

  const handleStep2Next = () => {
    // For PPC drill, handle level progression
    if (drill.stage2.type === 'ppc-drill' && ppcLevel === 1) {
      // Move from level 1 to level 2
      setPpcLevel(2);
      setLevel1Ready(false);
      return;
    }
    
    // Save stage2 progress
    if (user) {
      saveDojoDrillProgress(user.uid, drill.id, 'stage2').catch((error) => {
        console.error('[DojoDrill] Error saving stage2 progress:', error);
      });
    }
    
    // Load MCQs before advancing to step 3 - filter by subject
    const subjectFilter = selectedSubject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';
    const questions = drill.stage3.mcqIds
      .map(id => allQuestions.find(q => q.id === id && q.subject === subjectFilter))
      .filter((q): q is Question => q !== undefined);
    
    if (questions.length === 3) {
      setMcqQuestions(questions);
      setCurrentMcqIndex(0);
      setMcqAnswers({});
      setStep(3);
    } else {
      console.error(`[DojoDrill] Failed to load MCQs for subject ${subjectFilter}. Expected 3, found:`, questions.length);
      console.error('[DojoDrill] MCQ IDs:', drill.stage3.mcqIds);
      // Still set step to 3 so loading state shows
      setStep(3);
    }
    setGraphCompleted(false);
    setTableCompleted(false);
    setMonopolyCompleted(false);
    setPpcLevel(1); // Reset PPC level
    setLevel1Ready(false);
  };

  const isStep2Completed = 
    drill.stage2.type === "graph" ? graphCompleted : 
    drill.stage2.type === "table" ? tableCompleted : 
    drill.stage2.type === "monopoly" ? monopolyCompleted :
    drill.stage2.type === "demand-change" ? graphCompleted :
    drill.stage2.type === "elasticity-revenue" ? graphCompleted :
    drill.stage2.type === "consumer-producer-surplus" ? graphCompleted :
    drill.stage2.type === "comparative-advantage" ? graphCompleted :
    drill.stage2.type === "ppc-drill" ? (ppcLevel === 1 ? (level1Ready || false) : graphCompleted) :
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
      // All MCQs answered - save stage3 progress
      if (user) {
        saveDojoDrillProgress(user.uid, drill.id, 'stage3').catch((error) => {
          console.error('[DojoDrill] Error saving stage3 progress:', error);
        });
      }
      setStep(4);
    }
  };

  const handleFinish = () => {
    // Navigate to personalized homepage
    router.push('/');
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

  // Get whiteboards for current question's lesson IDs
  const relevantWhiteboards: WhiteboardImage[] = React.useMemo(() => {
    if (!currentMcqQuestion || !currentMcqQuestion.lessonIDS || currentMcqQuestion.lessonIDS.length === 0) {
      return [];
    }
    
    const subjectFilter = selectedSubject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';
    const questionUnit = currentMcqQuestion.unit;
    
    // Get unit-specific whiteboards
    let unitWhiteboards: Whiteboard[] = [];
    if (selectedSubject === 'macro') {
      switch (questionUnit) {
        case 1:
          unitWhiteboards = unit1Whiteboards;
          break;
        case 2:
          unitWhiteboards = apMacroUnit2Whiteboards;
          break;
        case 3:
          unitWhiteboards = apMacroUnit3Whiteboards;
          break;
        case 4:
          unitWhiteboards = apMacroUnit4Whiteboards;
          break;
        case 5:
          unitWhiteboards = apMacroUnit5Whiteboards;
          break;
      }
    } else {
      switch (questionUnit) {
        case 3:
          unitWhiteboards = apMicroUnit3Whiteboards;
          break;
        case 4:
          unitWhiteboards = apMicroUnit4Whiteboards;
          break;
        case 5:
          unitWhiteboards = apMicroUnit5Whiteboards;
          break;
        case 6:
          unitWhiteboards = apMicroUnit6Whiteboards;
          break;
      }
    }
    
    // Convert unit-specific whiteboards to WhiteboardImage format
    const unitWhiteboardImages: WhiteboardImage[] = unitWhiteboards
      .filter(wb => currentMcqQuestion.lessonIDS?.includes(wb.lessonID))
      .map((wb, index) => ({
        id: `wb-unit${questionUnit}-${index}`,
        subject: subjectFilter,
        unit: questionUnit,
        lessonIDs: [wb.lessonID],
        imageUrl: wb.url,
        title: wb.topic,
      }));
    
    // Get whiteboards from allContent
    const contentWhiteboards = allContentWhiteboards.filter(wb => 
      wb.subject === subjectFilter &&
      wb.unit === questionUnit &&
      wb.lessonIDs.some(lessonId => currentMcqQuestion.lessonIDS?.includes(lessonId))
    );
    
    // Combine and deduplicate by imageUrl
    const allRelevant = [...unitWhiteboardImages, ...contentWhiteboards];
    const uniqueWhiteboards = Array.from(
      new Map(allRelevant.map(wb => [wb.imageUrl, wb])).values()
    );
    
    return uniqueWhiteboards;
  }, [currentMcqQuestion, selectedSubject]);

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
        return <PPCDrill onComplete={handleGraphComplete} currentLevel={ppcLevel} onLevel1Ready={() => setLevel1Ready(true)} />;
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

  // Show loading state while progress is being loaded
  if (loadingProgress) {
    return (
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
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
              className="absolute inset-0 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 flex gap-4 min-h-[600px] overflow-y-auto"
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

              {/* Calculator and Drawing Pad Buttons - Fixed position to the right */}
              <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
                {!showCalculator && (
                  <button
                    onClick={() => setShowCalculator(true)}
                    className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 hover:bg-gray-50 transition-all active:scale-95"
                    aria-label="Open calculator"
                  >
                    <Calculator className="w-6 h-6 text-black" />
                  </button>
                )}
                {!showDrawingPad && (
                  <button
                    onClick={() => setShowDrawingPad(true)}
                    className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 hover:bg-gray-50 transition-all active:scale-95"
                    aria-label="Open whiteboard"
                  >
                    <Pen className="w-6 h-6 text-black" />
                  </button>
                )}
              </div>

              {/* Calculator Component */}
              {showCalculator && (
                <ExamCalculator onClose={() => setShowCalculator(false)} />
              )}

              {/* Drawing Pad Component */}
              {showDrawingPad && (
                <ExamWhiteboard onClose={() => setShowDrawingPad(false)} />
              )}
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
              className="absolute inset-0 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col min-h-[600px] overflow-y-auto"
            >
              <div className="flex-1 flex items-center justify-center px-12 py-8 min-h-0">
                {getActivityComponent()}
              </div>
            </motion.div>
          )}

          {/* Step 3: MCQs - Split Screen Layout */}
          {step === 3 && (
            <>
              {currentMcqQuestion ? (
                <motion.div
                  key={`step3-${currentMcqIndex}`}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col overflow-y-auto"
                >
              <div className="flex-1">
                <div className="grid grid-cols-5 gap-6 h-full">
                  {/* Left Column: Question and Options (span-3) */}
                  <div className="col-span-5 md:col-span-3 flex flex-col h-full">
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
                        ) : relevantWhiteboards.length > 0 ? (
                          /* State: Show Whiteboards */
                          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                            {relevantWhiteboards.map((whiteboard) => (
                              <div key={whiteboard.id} className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
                                <Image
                                  src={whiteboard.imageUrl}
                                  alt="Whiteboard"
                                  width={400}
                                  height={300}
                                  className="w-full h-auto"
                                  unoptimized
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          /* State: Show Hint (only if no whiteboards) */
                          <div className="flex-1 flex flex-col items-center justify-center">
                            <button
                              onClick={() => setShowHint(!showHint)}
                              className="px-6 py-3 bg-black text-white border-2 border-black rounded-xl font-bold hover:bg-gray-800 active:translate-y-1 transition-all flex items-center gap-2"
                            >
                              <Lightbulb className="w-5 h-5" />
                              {showHint ? 'Hide Hint' : 'Show Hint'}
                            </button>
                            {showHint && (
                              <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
                                <p className="text-sm font-medium text-gray-800">
                                  Think about the key concepts related to this question. Consider what you learned in the video and interactive activity.
                                </p>
                              </div>
                            )}
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

              {/* Calculator and Drawing Pad Buttons - Fixed position to the right */}
              <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
                {!showCalculator && (
                  <button
                    onClick={() => setShowCalculator(true)}
                    className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 hover:bg-gray-50 transition-all active:scale-95"
                    aria-label="Open calculator"
                  >
                    <Calculator className="w-6 h-6 text-black" />
                  </button>
                )}
                {!showDrawingPad && (
                  <button
                    onClick={() => setShowDrawingPad(true)}
                    className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 hover:bg-gray-50 transition-all active:scale-95"
                    aria-label="Open whiteboard"
                  >
                    <Pen className="w-6 h-6 text-black" />
                  </button>
                )}
              </div>

              {/* Calculator Component */}
              {showCalculator && (
                <ExamCalculator onClose={() => setShowCalculator(false)} />
              )}

              {/* Drawing Pad Component */}
              {showDrawingPad && (
                <ExamWhiteboard onClose={() => setShowDrawingPad(false)} />
              )}
            </motion.div>
              ) : (
                <motion.div
                  key="step3-loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading questions...</p>
                  </div>
                </motion.div>
              )}
            </>
          )}

          {/* Step 4: Results */}
          {step === 4 && (
            <DojoDrillResults
              xpEarned={xpEarned}
              userData={userData}
              selectedSubject={selectedSubject}
              onExit={handleFinish}
            />
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


