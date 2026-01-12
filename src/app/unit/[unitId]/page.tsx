'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Head from 'next/head';
import { macroUnits, microUnits } from '@/data/cheatSheets';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter
import Image from 'next/image';
import { keyTerms as allContentKeyTerms, whiteboardImages as allContentWhiteboards, KeyTerm, WhiteboardImage } from '@/data/allContent';
import { macroUnits as allMacroUnits, microUnits as allMicroUnits } from '@/data/cheatSheets';
import { useAuthContext } from '@/contexts/AuthContext';
import Link from 'next/link';
import { keyTerms as apMacroTerms } from '@/data/apMacroTerms';
import { keyTerms as apMicroTerms } from '@/data/apMicroTerms';
import { unit1Whiteboards, apMacroUnit2Whiteboards, apMacroUnit3Whiteboards, apMacroUnit4Whiteboards, apMacroUnit5Whiteboards, apMicroUnit3Whiteboards, apMicroUnit4Whiteboards, apMicroUnit5Whiteboards, apMicroUnit6Whiteboards, Whiteboard } from '@/data/whiteboards';
import { getCheckpointForLesson, microCheckpoints, macroCheckpoints } from '@/data/checkpoints';
import { microLessons, macroLessons } from '@/data/lessons';
import { videos, Video } from '@/data/videos';
import { getVideosForLessonId } from '@/data/videosByLessonId';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question as QuestionType } from '@/data/questionBanks/types';
import { X, ArrowRight, Lock, ArrowLeft, CheckCircle2, XCircle, Download, Bookmark, BookmarkPlus, Check, Brain, Maximize2, Play, FileText, Zap, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import jsPDF from 'jspdf';
import { dojoIcon } from '@/data/imagePaths';
import { motion, AnimatePresence } from 'framer-motion';
import { dojoDrills, drillAppliesToSubject, getDrillUnitForSubject } from '@/data/dojoDrills';
import { saveQuizResult } from '@/lib/quizHistory';
import { hasValidSeasonPass } from '@/lib/utils';

// Helper to combine and structure whiteboard data for Macro
const getUnitWhiteboards = (unitNumber: number): WhiteboardImage[] => {
  let rawWhiteboards: Whiteboard[] = [];
  
  switch (unitNumber) {
    case 1:
      rawWhiteboards = unit1Whiteboards;
      break;
    case 2:
      rawWhiteboards = apMacroUnit2Whiteboards;
      break;
    case 3:
      rawWhiteboards = apMacroUnit3Whiteboards;
      break;
    case 4:
      rawWhiteboards = apMacroUnit4Whiteboards;
      break;
    case 5:
      rawWhiteboards = apMacroUnit5Whiteboards;
      break;
    default:
      return allContentWhiteboards.filter(wb => wb.subject === 'ap_macroeconomics' && wb.unit === unitNumber);
  }
  
  return rawWhiteboards.map((wb, index) => ({
    id: `wb-unit${unitNumber}-${index}`,
    subject: 'ap_macroeconomics',
    unit: unitNumber,
    lessonIDs: [wb.lessonID], // Ensure lessonIDs is an array
    imageUrl: wb.url,
    title: wb.topic,
    topic: wb.topic // Preserve topic as separate field
  }));
};

// Helper to combine and structure whiteboard data for Micro
const getMicroUnitWhiteboards = (unitNumber: number): WhiteboardImage[] => {
  let rawWhiteboards: Whiteboard[] = [];
  
  switch (unitNumber) {
    case 2:
      // Unit 2 might be in allContentWhiteboards or could have its own array
      return allContentWhiteboards.filter(wb => wb.subject === 'ap_microeconomics' && wb.unit === unitNumber);
    case 3:
      rawWhiteboards = apMicroUnit3Whiteboards;
      break;
    case 4:
      rawWhiteboards = apMicroUnit4Whiteboards;
      break;
    case 5:
      rawWhiteboards = apMicroUnit5Whiteboards;
      break;
    case 6:
      rawWhiteboards = apMicroUnit6Whiteboards;
      break;
    default:
      return allContentWhiteboards.filter(wb => wb.subject === 'ap_microeconomics' && wb.unit === unitNumber);
  }
  
  return rawWhiteboards.map((wb, index) => ({
    id: `wb-micro-unit${unitNumber}-${index}`,
    subject: 'ap_microeconomics',
    unit: unitNumber,
    lessonIDs: [wb.lessonID], // Ensure lessonIDs is an array
    imageUrl: wb.url,
    title: wb.topic,
    topic: wb.topic // Preserve topic as separate field
  }));
};

interface LessonContent {
  lessonId: string;
  whiteboards: WhiteboardImage[];
  keyTerms: KeyTerm[];
}

// Checkpoint component for section quizzes
interface CheckpointProps {
  lessonId: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  subject: 'macro' | 'micro';
  allCheckpoints?: {
    lessonId: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
  }[];
}

function Checkpoint({ lessonId, question, options, correctAnswer, explanation, subject, allCheckpoints = [] }: CheckpointProps) {
  // Combine first question with all additional checkpoints, but limit to only 2 questions
  const allQuestions = [
    { lessonId, question, options, correctAnswer, explanation },
    ...allCheckpoints
  ].slice(0, 2); // Only show 2 questions maximum

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | null>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const [showDojoDrill, setShowDojoDrill] = useState(false);
  const [dojoDrillVideo, setDojoDrillVideo] = useState<Video | null>(null);

  const currentQuestion = allQuestions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex] || null;
  const showResult = showResults[currentQuestionIndex] || false;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  // Find matching video for the lesson
  const findVideoForLesson = (lessonId: string): Video | null => {
    const subjectFilter = subject === 'macro' ? 'AP Macroeconomics' : 'AP Microeconomics';
    return videos.find(video => 
      video.subjects.includes(subjectFilter) &&
      video.lessonIDS.includes(lessonId)
    ) || null;
  };

  const handleTeachMe = (qLessonId: string) => {
    const video = findVideoForLesson(qLessonId);
    if (video) {
      setDojoDrillVideo(video);
      setShowDojoDrill(true);
    }
  };

  const handleAnswer = (option: string) => {
    if (showResult) return; // Prevent changing answer after submission
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: option }));
    setShowResults(prev => ({ ...prev, [currentQuestionIndex]: true }));
    
    // If there are more questions, transition to next after 1.5 seconds
    if (currentQuestionIndex < allQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 1500);
    }
    // After the second question, just maintain the answered state (no transition to Dojo Gym)
  };

  const practiceUrl = `/unitMCQPracticePage?subject=${subject}&mode=topic&lessonId=${lessonId}`;

  return (
    <div className="mt-12 mb-8 relative">
      {/* Card Container with overflow hidden for transitions */}
      <div className="relative min-h-[500px] overflow-hidden">
        {/* Render all question cards */}
        {allQuestions.map((q, questionIndex) => {
          const isActive = currentQuestionIndex === questionIndex;
          const qSelectedAnswer = selectedAnswers[questionIndex] || null;
          const qShowResult = showResults[questionIndex] || false;
          const qIsCorrect = qSelectedAnswer === q.correctAnswer;

          return (
            <div
              key={questionIndex}
              className={`absolute inset-0 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 shadow-lg transition-all duration-500 ease-in-out ${
                isActive
                  ? 'opacity-100 translate-x-0'
                  : questionIndex < currentQuestionIndex
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
              }`}
            >
              {/* Teach Me Button - Upper Border - HIDDEN FOR NOW */}
              {/* {isActive && findVideoForLesson(q.lessonId) && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <button
                    onClick={() => handleTeachMe(q.lessonId)}
                    className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-md"
                  >
                    Teach Me...
                  </button>
                </div>
              )} */}

      <div className="mb-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-1">Checkpoint</h3>
                    <p className="text-xs text-gray-500">Test your understanding of {q.lessonId}</p>
          </div>
                  {qShowResult && questionIndex === 1 && (
            <Link 
              href={practiceUrl}
              className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors whitespace-nowrap inline-block"
            >
              Want to practice AP MCQs on this topic?
            </Link>
          )}
        </div>
      </div>
      
      <p className="text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-tight">
                {q.question}
      </p>

      <div className="space-y-3">
                {q.options.map((option, index) => {
          const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
                  const isSelected = qSelectedAnswer === optionLetter;
                  const isCorrectOption = optionLetter === q.correctAnswer;
                  const showCorrect = qShowResult && isCorrectOption;
                  const showIncorrect = qShowResult && isSelected && !isCorrectOption;

          let buttonClass = "w-full text-left p-5 text-lg font-semibold rounded-lg transition-all duration-200 border-2 ";
          
                  if (qShowResult) {
            if (showCorrect) {
              buttonClass += "bg-green-100 border-green-400 text-green-800 shadow-md";
            } else if (showIncorrect) {
              buttonClass += "bg-red-100 border-red-400 text-red-800 shadow-md";
            } else {
              buttonClass += "bg-gray-100 border-gray-300 text-gray-600";
            }
          } else {
            buttonClass += "bg-blue-100 border-blue-300 text-gray-900 hover:bg-blue-200 hover:border-blue-400 hover:shadow-lg cursor-pointer active:scale-95";
          }

          return (
            <button
              key={index}
                      onClick={() => {
                        if (questionIndex === currentQuestionIndex) {
                          handleAnswer(optionLetter);
                        }
                      }}
                      disabled={qShowResult}
              className={buttonClass}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold min-w-[1.5rem]">{optionLetter}.</span>
                <span className="flex-1">{option}</span>
                        {qShowResult && showCorrect && (
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                )}
                        {qShowResult && showIncorrect && (
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>
            </div>
          );
        })}

        {/* Navigation Dots */}
        {allQuestions.length > 1 && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
            {allQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentQuestionIndex ? 'bg-blue-500 scale-110' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to question ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dojo Drill Modal */}
      <AnimatePresence>
        {showDojoDrill && dojoDrillVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowDojoDrill(false);
              }
            }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative my-8 border border-gray-200"
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                onClick={() => setShowDojoDrill(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm hover:shadow-md"
                aria-label="Close Dojo Drill"
              >
                <X className="w-5 h-5" />
              </motion.button>
              
              <div className="p-6">
                <motion.h2 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-2xl font-bold text-gray-900 mb-4"
                >
                  Dojo Drill: {dojoDrillVideo.title}
                </motion.h2>
                
                {/* Video Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <video
                    src={dojoDrillVideo.videoUrl}
                    controls
                    autoPlay
                    className="w-full aspect-video rounded-lg shadow-md"
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                </motion.div>

                {/* Questions Section */}
                {dojoDrillVideo.questions && dojoDrillVideo.questions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mt-8"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Practice Questions</h3>
                    <div className="space-y-4">
                      {dojoDrillVideo.questions.map((q, index) => (
                        <motion.div 
                          key={q.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100/50 transition-colors"
                        >
                          <p className="font-semibold text-gray-900 mb-3">
                            {index + 1}. {q.text}
                          </p>
                          <div className="space-y-2">
                            {q.options.map((option, optIndex) => (
                              <motion.div
                                key={optIndex}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35 + index * 0.1 + optIndex * 0.05 }}
                                whileHover={{ scale: 1.02 }}
                                className={`p-3 rounded-lg border-2 transition-all ${
                                  optIndex === q.correctAnswer
                                    ? 'bg-green-50 border-green-400 text-green-800'
                                    : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                                }`}
                              >
                                <span className="font-medium">
                                  {String.fromCharCode(65 + optIndex)}. {option}
                                </span>
                                {optIndex === q.correctAnswer && (
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.4 + index * 0.1 + optIndex * 0.05, type: "spring" }}
                                  >
                                    <CheckCircle2 className="w-5 h-5 text-green-600 inline-block ml-2" />
                                  </motion.span>
                                )}
                              </motion.div>
                            ))}
                          </div>
                          {q.explanation && (
                            <motion.p 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.45 + index * 0.1 }}
                              className="mt-3 text-sm text-gray-600 italic"
                            >
                              {q.explanation}
                            </motion.p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Done Button */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 text-center"
                >
                  <motion.button
                    onClick={() => setShowDojoDrill(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                  >
                    Done
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper function to format subnotes with bold text before colons
function formatSubNote(note: string): React.ReactNode {
  // Find the first colon in the note
  const colonIndex = note.indexOf(':');
  
  // If there's a colon, bold everything from the start up to and including the colon
  if (colonIndex !== -1) {
    const beforeColon = note.substring(0, colonIndex + 1);
    const afterColon = note.substring(colonIndex + 1);
    
    return (
      <>
        <strong>{beforeColon}</strong>
        <span>{afterColon}</span>
      </>
    );
  }
  
  // If no colon, return the note as-is
  return <span>{note}</span>;
}

// JoinDojoModal Component
interface JoinDojoModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSubject: 'macro' | 'micro';
}

function JoinDojoModal({ isOpen, onClose, selectedSubject }: JoinDojoModalProps) {
  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex items-center justify-center p-4"
        onClick={(e) => {
          // Close when clicking outside the modal content
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 max-w-md w-full text-center relative"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-3xl font-black text-gray-900 mb-4">
            Join the Dojo for this Feature and more!
          </h3>
          <p className="text-gray-700 mb-6">
            Unlock unlimited quiz generation, all Dojo Drills, FRQ practice, and full-length exams with a Season Pass.
          </p>
          <Link
            href={`/purchase/season-pass?courseType=${selectedSubject}`}
            className={`inline-flex items-center justify-center w-full px-6 py-3 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg ${
              selectedSubject === 'macro'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-green-600 hover:bg-green-700'
            }`}
            onClick={() => onClose()}
          >
            Learn More <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

interface UnitPageProps {
  unitNumber?: number;
  subject?: 'macro' | 'micro';
}

export default function UnitPage({ unitNumber: propUnitNumber, subject: propSubject }: UnitPageProps = {}) {
  const params = useParams();
  const router = useRouter(); // Initialize useRouter
  const { user, userData, selectedSubject: contextSubject, awardXp } = useAuthContext(); // Correctly destructure userData and selectedSubject
  
  // Use props if provided, otherwise use params/context
  const selectedSubject = propSubject || contextSubject;
  const initialUnit = propUnitNumber ? String(propUnitNumber) : ((params.unitId as string) || '1');
  const [activeUnit, setActiveUnit] = useState(initialUnit);
  const [selectedWhiteboard, setSelectedWhiteboard] = useState<WhiteboardImage | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videoQuestionAnswers, setVideoQuestionAnswers] = useState<Record<string, number>>({});
  const [selectedWhiteboards, setSelectedWhiteboards] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleWhiteboardsCount, setVisibleWhiteboardsCount] = useState<Record<string, number>>({});
  const [selectedTerms, setSelectedTerms] = useState<Set<string>>(new Set());
  const [showQuizPanel, setShowQuizPanel] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState<QuestionType | null>(null);
  const [availableQuizQuestions, setAvailableQuizQuestions] = useState<QuestionType[]>([]);
  const [originalQuizQuestions, setOriginalQuizQuestions] = useState<QuestionType[]>([]); // Track original questions for dots
  const [answeredQuizQuestions, setAnsweredQuizQuestions] = useState<Set<number>>(new Set());
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({}); // Track answers per question
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(65); // Percentage width for left panel
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cheatSheetContentRef = React.useRef<HTMLDivElement>(null);
  const [showImageSlides, setShowImageSlides] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [hasSeenExplainer, setHasSeenExplainer] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [loadingQuestionIndex, setLoadingQuestionIndex] = useState(0);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [showExplanations, setShowExplanations] = useState<Set<number>>(new Set());
  const [showJoinDojoModal, setShowJoinDojoModal] = useState(false);

  // Check if user is a pro customer (has season pass)
  const isProCustomer = useMemo(() => {
    if (!user || !userData) return false;
    // Check if user has valid season pass for current subject
    const subjectKey = selectedSubject === 'macro' ? 'macro' : 'micro';
    return hasValidSeasonPass(userData, subjectKey);
  }, [user, userData, selectedSubject]);

  // --- FAQ Schema Data ---
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the main topic of this unit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This is a placeholder answer. This unit covers the fundamental economic concepts that form the foundation of both microeconomics and macroeconomics.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the key graphs I need to know for this unit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This is a placeholder answer. The most important graphs for this unit include the Production Possibilities Curve (PPC), the Circular Flow Diagram, and the basic Supply and Demand model.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is this unit tested on the AP Exam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This is a placeholder answer. Concepts from this unit appear in both the multiple-choice and free-response sections of the AP exam. It is crucial to have a strong understanding of these basics.',
        },
      },
    ],
  };

  const activeUnitNum = parseInt(activeUnit as string);
  
  const subjectFilter = useMemo(() => selectedSubject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics', [selectedSubject]);

  const unitKeyTerms: KeyTerm[] = useMemo(() => selectedSubject === 'macro' 
    ? apMacroTerms.filter(term => term.unit === activeUnitNum)
    : apMicroTerms.filter(term => term.unit === activeUnitNum), [selectedSubject, activeUnitNum]);
  
  const unitWhiteboards: WhiteboardImage[] = useMemo(() => selectedSubject === 'macro'
    ? getUnitWhiteboards(activeUnitNum)
    : getMicroUnitWhiteboards(activeUnitNum), [selectedSubject, activeUnitNum]);

  // --- Modal Logic ---
  const openModal = (whiteboard: WhiteboardImage) => {
    setSelectedWhiteboard(whiteboard);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWhiteboard(null);
  };
  
  const handleWhiteboardClick = (whiteboard: WhiteboardImage) => {
    setSelectedWhiteboards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(whiteboard.id)) {
        newSet.delete(whiteboard.id);
      } else {
        newSet.add(whiteboard.id);
      }
      return newSet;
    });
  };
  

  const handleUnitChange = (unitNumber: string) => {
    setActiveUnit(unitNumber);
    // If we have props (new static routes), use the new URL format
    if (propSubject && propUnitNumber) {
      const subjectPrefix = selectedSubject === 'macro' ? 'ap-macro' : 'ap-micro';
      router.push(`/${subjectPrefix}-unit-${unitNumber}-cheat-sheet`, { scroll: false });
    } else {
      // Otherwise, use the old dynamic route (backwards compatibility)
      router.push(`/unit/${unitNumber}`, { scroll: false });
    }
  };

  // Find all relevant questions for a specific term
  const findRelevantQuestionsForTerm = (term: KeyTerm): QuestionType[] => {
    // Filter questions by subject and unit
    const relevantQuestions = allQuestions.filter(q => 
      q.subject === subjectFilter && 
      q.unit === activeUnitNum &&
      !q.isTest && // Exclude test questions
      !answeredQuizQuestions.has(q.id) // Exclude already answered questions
    );

    if (relevantQuestions.length === 0) return [];

    // Score each question based on relevance to the term
    const scoredQuestions = relevantQuestions.map(question => {
      let score = 0;
      const questionText = `${question.question} ${question.options.join(' ')}`.toLowerCase();
      const termLower = term.term.toLowerCase();
      
      // Exact term match (highest priority)
      if (questionText.includes(termLower)) {
        score += 100;
      }

      // Whole word match
      const termWordRegex = new RegExp(`\\b${termLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (termWordRegex.test(questionText)) {
        score += 80;
      }

      // Partial word matches
      const termWords = termLower.split(/\s+/).filter(w => w.length > 3);
      termWords.forEach(word => {
        if (questionText.includes(word)) {
          score += 20;
        }
      });

      // Check aliases if they exist
      if ((term as any).aliases) {
        (term as any).aliases.forEach((alias: string) => {
          if (questionText.includes(alias.toLowerCase())) {
            score += 60;
          }
        });
      }

      // Definition keywords
      const definitionWords = term.definition.toLowerCase().split(/\s+/).filter(w => w.length > 4);
      definitionWords.forEach(word => {
        if (questionText.includes(word)) {
          score += 10;
        }
      });

      // Lesson ID match bonus
      if (question.lessonIDS && term.lessonIDs) {
        const hasMatchingLesson = question.lessonIDS.some(lid => term.lessonIDs.includes(lid));
        if (hasMatchingLesson) {
          score += 50;
        }
      }

      return { question, score };
    });

    // Filter to only questions with score > 0 and return unique questions
    const relevant = scoredQuestions
      .filter(item => item.score > 0)
      .map(item => item.question);
    
    // Remove duplicates by question ID
    const uniqueQuestions = relevant.filter((q, index, self) => 
      index === self.findIndex(q2 => q2.id === q.id)
    );

    return uniqueQuestions;
  };

  // Update available quiz questions when terms are selected/unselected
  useEffect(() => {
    if (selectedTerms.size === 0 && selectedWhiteboards.size === 0) {
      setAvailableQuizQuestions([]);
      return;
    }

    const allTerms = selectedSubject === 'macro' ? apMacroTerms : apMicroTerms;
    const allRelevantQuestions: QuestionType[] = [];

    // Find questions for each selected term
    selectedTerms.forEach(termId => {
      const term = allTerms.find(t => t.id === termId);
      if (term) {
        // Inline the logic to avoid dependency issues
        const relevantQuestions = allQuestions.filter(q => 
          q.subject === subjectFilter && 
          q.unit === activeUnitNum &&
          !q.isTest &&
          !answeredQuizQuestions.has(q.id)
        );

        if (relevantQuestions.length > 0) {
          const scoredQuestions = relevantQuestions.map(question => {
            let score = 0;
            const questionText = `${question.question} ${question.options.join(' ')}`.toLowerCase();
            const termLower = term.term.toLowerCase();
            
            if (questionText.includes(termLower)) score += 100;
            const termWordRegex = new RegExp(`\\b${termLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            if (termWordRegex.test(questionText)) score += 80;
            
            const termWords = termLower.split(/\s+/).filter(w => w.length > 3);
            termWords.forEach(word => { if (questionText.includes(word)) score += 20; });
            
            if ((term as any).aliases) {
              (term as any).aliases.forEach((alias: string) => {
                if (questionText.includes(alias.toLowerCase())) score += 60;
              });
            }
            
            const definitionWords = term.definition.toLowerCase().split(/\s+/).filter(w => w.length > 4);
            definitionWords.forEach(word => { if (questionText.includes(word)) score += 10; });
            
            if (question.lessonIDS && term.lessonIDs) {
              if (question.lessonIDS.some(lid => term.lessonIDs.includes(lid))) score += 50;
            }
            
            return { question, score };
          });

          const relevant = scoredQuestions
            .filter(item => item.score > 0)
            .map(item => item.question);
          
          allRelevantQuestions.push(...relevant);
        }
      }
    });

    // Find questions for each selected whiteboard
    selectedWhiteboards.forEach(whiteboardId => {
      const whiteboard = unitWhiteboards.find(wb => wb.id === whiteboardId);
      if (whiteboard) {
        const relevantQuestions = allQuestions.filter(q => 
          q.subject === subjectFilter && 
          q.unit === activeUnitNum &&
          !q.isTest &&
          !answeredQuizQuestions.has(q.id)
        );

        if (relevantQuestions.length > 0) {
          const scoredQuestions = relevantQuestions.map(question => {
            let score = 0;
            const questionText = `${question.question} ${question.options.join(' ')}`.toLowerCase();
            const titleLower = whiteboard.title?.toLowerCase() || '';

            if (titleLower && questionText.includes(titleLower)) {
              score += 100;
            }
            
            const titleWords = titleLower.split(/\s+/).filter(w => w.length > 3);
            titleWords.forEach(word => {
              if (questionText.includes(word)) {
                score += 20;
              }
            });

            if (question.lessonIDS && whiteboard.lessonIDs) {
              if (question.lessonIDS.some(lid => whiteboard.lessonIDs.includes(lid))) {
                score += 50;
              }
            }
            
            return { question, score };
          });

          const relevant = scoredQuestions
            .filter(item => item.score > 0)
            .map(item => item.question);
          
          allRelevantQuestions.push(...relevant);
        }
      }
    });

    // Remove duplicates
    const uniqueQuestions = allRelevantQuestions.filter((q, index, self) => 
      index === self.findIndex(q2 => q2.id === q.id)
    );

    // Score all unique questions against all selected items to find the most relevant
    const selectedTermObjects = Array.from(selectedTerms)
      .map(termId => allTerms.find(t => t.id === termId))
      .filter(Boolean) as KeyTerm[];
      
    const selectedWhiteboardObjects = Array.from(selectedWhiteboards)
      .map(wbId => unitWhiteboards.find(wb => wb.id === wbId))
      .filter(Boolean) as WhiteboardImage[];

    const scoredQuestions = uniqueQuestions.map(question => {
      let score = 0;
      const questionText = `${question.question} ${question.options.join(' ')}`.toLowerCase();

      selectedTermObjects.forEach(term => {
        const termLower = term.term.toLowerCase();
        if (questionText.includes(termLower)) score += 100;
        const termWordRegex = new RegExp(`\\b${termLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (termWordRegex.test(questionText)) score += 80;
        if (question.lessonIDS && term.lessonIDs && question.lessonIDS.some(lid => term.lessonIDs.includes(lid))) score += 50;
      });

      selectedWhiteboardObjects.forEach(whiteboard => {
        const titleLower = whiteboard.title?.toLowerCase() || '';
        if (titleLower && questionText.includes(titleLower)) score += 100;
        const titleWords = titleLower.split(/\s+/).filter(w => w.length > 3);
        titleWords.forEach(word => { if (questionText.includes(word)) score += 20; });
        if (question.lessonIDS && whiteboard.lessonIDs && question.lessonIDS.some(lid => whiteboard.lessonIDs.includes(lid))) score += 50;
      });

      return { question, score };
    });

    // Sort by score and take the top 5
    scoredQuestions.sort((a, b) => b.score - a.score);
    const topQuestions = scoredQuestions.slice(0, 5).map(item => item.question);

    // Filter out already answered questions from the top list
    const finalQuestions = topQuestions.filter(q => !answeredQuizQuestions.has(q.id));

    setAvailableQuizQuestions(finalQuestions);
  }, [selectedTerms, selectedWhiteboards, answeredQuizQuestions, activeUnitNum, selectedSubject, subjectFilter, unitWhiteboards]);

  // Find most relevant question from available questions
  const findMostRelevantQuestion = (): QuestionType | null => {
    if (availableQuizQuestions.length === 0) return null;

    // Get the selected term objects
    const allTerms = selectedSubject === 'macro' ? apMacroTerms : apMicroTerms;
    const selectedTermObjects = Array.from(selectedTerms)
      .map(termId => allTerms.find(t => t.id === termId))
      .filter(Boolean) as KeyTerm[];

    // Get selected whiteboard objects
    const selectedWhiteboardObjects = Array.from(selectedWhiteboards)
      .map(wbId => unitWhiteboards.find(wb => wb.id === wbId))
      .filter(Boolean) as WhiteboardImage[];

    if (selectedTermObjects.length === 0 && selectedWhiteboardObjects.length === 0) return availableQuizQuestions[0];

    // Score each available question
    const scoredQuestions = availableQuizQuestions.map(question => {
      let score = 0;
      const questionText = `${question.question} ${question.options.join(' ')}`.toLowerCase();

      selectedTermObjects.forEach(term => {
        const termLower = term.term.toLowerCase();
        
        // Exact term match (highest priority)
        if (questionText.includes(termLower)) {
          score += 100;
        }

        // Whole word match
        const termWordRegex = new RegExp(`\\b${termLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (termWordRegex.test(questionText)) {
          score += 80;
        }

        // Lesson ID match bonus
        if (question.lessonIDS && term.lessonIDs) {
          const hasMatchingLesson = question.lessonIDS.some(lid => term.lessonIDs.includes(lid));
          if (hasMatchingLesson) {
            score += 50;
          }
        }
      });

      // Score against selected whiteboards
      selectedWhiteboardObjects.forEach(whiteboard => {
        const titleLower = whiteboard.title?.toLowerCase() || '';
        
        if (titleLower && questionText.includes(titleLower)) {
          score += 100;
        }

        const titleWords = titleLower.split(/\s+/).filter(w => w.length > 3);
        titleWords.forEach(word => {
          if (questionText.includes(word)) {
            score += 20;
          }
        });

        if (question.lessonIDS && whiteboard.lessonIDs) {
          const hasMatchingLesson = question.lessonIDS.some(lid => whiteboard.lessonIDs.includes(lid));
          if (hasMatchingLesson) {
            score += 50;
          }
        }
      });

      return { question, score };
    });

    // Sort by score and return the best match
    scoredQuestions.sort((a, b) => b.score - a.score);
    const bestMatch = scoredQuestions[0];
    
    return bestMatch ? bestMatch.question : availableQuizQuestions[0];
  };

  const handleMakeQuiz = async () => {
    // Check if user is pro customer
    if (!isProCustomer) {
      setShowJoinDojoModal(true);
      return;
    }

    // Check if we have selections
    if (selectedTerms.size === 0 && selectedWhiteboards.size === 0) {
      return;
    }

    // Open the quiz panel immediately and show loading animation
    setShowQuizPanel(true);
    setLeftPanelWidth(65); // Set default width
    setIsGeneratingQuiz(true);
    setQuizError(null);
    setLoadingQuestionIndex(0);

    try {
      // Get selected term objects - only send term names
      const allTerms = selectedSubject === 'macro' ? apMacroTerms : apMicroTerms;
      const selectedTermObjects = Array.from(selectedTerms)
        .map(termId => allTerms.find(t => t.id === termId))
        .filter(Boolean) as KeyTerm[];

      // Get selected whiteboard objects
      const selectedWhiteboardObjects = Array.from(selectedWhiteboards)
        .map(wbId => unitWhiteboards.find(wb => wb.id === wbId))
        .filter(Boolean) as WhiteboardImage[];

      // For each selected image, find all terms that match its lessonIDs
      const imageRelatedTerms: string[] = [];
      selectedWhiteboardObjects.forEach(img => {
        if (img.lessonIDs && img.lessonIDs.length > 0) {
          img.lessonIDs.forEach(lessonId => {
            // Find all terms for this lessonID in the current unit
            const termsForLesson = allTerms.filter(term => 
              term.unit === activeUnitNum && 
              term.lessonIDs && 
              term.lessonIDs.includes(lessonId)
            );
            // Add term names (avoid duplicates)
            termsForLesson.forEach(term => {
              if (!imageRelatedTerms.includes(term.term)) {
                imageRelatedTerms.push(term.term);
              }
            });
          });
        }
      });

      // Combine selected term names with image-related term names (no duplicates)
      const allTermNames = [
        ...selectedTermObjects.map(term => term.term),
        ...imageRelatedTerms
      ].filter((term, index, self) => self.indexOf(term) === index); // Remove duplicates

      // Prepare data for API
      const payload = {
        selectedTerms: allTermNames, // Just an array of term names
        selectedImages: selectedWhiteboardObjects.map(img => ({
          title: img.title || '',
          lessonIDs: img.lessonIDs || [],
          imageUrl: img.imageUrl,
          topic: (img as any).topic || null // Include topic if available (from Whiteboard type)
        })),
        subject: subjectFilter,
        unit: activeUnitNum
      };

      // Call the API
      const response = await fetch('/api/generate-unit-drill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate quiz');
      }

      const data = await response.json();

      // Debug: Log how many questions were generated
      console.log(`Generated ${data.questions?.length || 0} questions (expected 3-5)`);

      // Convert generated questions to QuestionType format
      const convertedQuestions: QuestionType[] = data.questions.map((q: any, index: number) => {
        // Debug: Log tableData if present
        if (q.tableData) {
          console.log(`[Quiz] Question ${index + 1} has tableData:`, q.tableData);
        }
        const question: QuestionType = {
          id: parseInt(q.id?.replace(/\D/g, '') || `${Date.now()}${index}`, 10),
          unit: activeUnitNum,
          subject: subjectFilter,
          unitName: unitsToDisplay.find(u => u.number === activeUnitNum)?.title || '',
          question: q.question || '',
          image: null,
          options: q.options || [],
          correctAnswer: q.correctAnswer || '',
          explanation: q.explanation || null,
          lessonIDS: selectedTermObjects[0]?.lessonIDs || selectedWhiteboardObjects[0]?.lessonIDs || [],
        };
        
        // Only add tableData if it exists
        if (q.tableData) {
          question.tableData = q.tableData;
        }
        
        return question;
      });

      if (convertedQuestions.length === 0) {
        throw new Error('No questions were generated');
      }

      // Set up the quiz
      setAvailableQuizQuestions(convertedQuestions);
      setOriginalQuizQuestions(convertedQuestions);
      setQuizQuestion(convertedQuestions[0]);
        setSelectedQuizAnswer(null);
      setQuizAnswers({}); // Reset all answers
        setIsAnimatingOut(false);
      setAnsweredQuizQuestions(new Set()); // Reset answered questions for new quiz
      
      // Clear selections immediately
      setSelectedTerms(new Set());
      setSelectedWhiteboards(new Set());

    } catch (error: any) {
      console.error('Error generating quiz:', error);
      setQuizError(error.message || 'Failed to generate quiz. Please try again.');
    } finally {
      setIsGeneratingQuiz(false);
      setLoadingQuestionIndex(0);
    }
  };

  // Cycle through loading question indices while generating
  useEffect(() => {
    if (!isGeneratingQuiz) {
      setLoadingQuestionIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setLoadingQuestionIndex((prev) => (prev + 1) % 5);
    }, 2000); // Change question every 2 seconds

    return () => clearInterval(interval);
  }, [isGeneratingQuiz]);

  const handleQuizAnswerSelect = async (questionId: number, answerLetter: string) => {
    // Don't allow changing answer if already answered
    if (quizAnswers[questionId]) return;
    
    // Find the question to check if answer is correct
    const question = originalQuizQuestions.find(q => q.id === questionId);
    if (!question) return;
    
    const isCorrect = answerLetter === question.correctAnswer;
    
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerLetter
    }));
    
    // Mark question as answered
    setAnsweredQuizQuestions(prev => new Set(prev).add(questionId));
    
    // Award XP for correct answers (100 XP per correct question)
    if (isCorrect && awardXp) {
      try {
        await awardXp(100, selectedSubject);
        console.log(`[Quiz Me] Awarded 100 XP for correct answer to question ${questionId}`);
      } catch (error) {
        console.error('[Quiz Me] Error awarding XP:', error);
      }
    }
  };

  const handleCloseQuizPanel = async () => {
    // Save quiz history if user has answered at least one question
    if (user && originalQuizQuestions.length > 0 && Object.keys(quizAnswers).length > 0) {
      try {
        const correctCount = originalQuizQuestions.filter(q => quizAnswers[q.id] === q.correctAnswer).length;
        const totalQuestions = originalQuizQuestions.length;
        const score = Math.round((correctCount / totalQuestions) * 100);
        
        const unitsToDisplay = selectedSubject === 'macro' ? allMacroUnits : allMicroUnits;
        const currentUnit = unitsToDisplay.find(u => u.number === activeUnitNum);
        const title = `Unit ${activeUnitNum} Cheat Sheet Quiz${currentUnit ? `: ${currentUnit.title}` : ''}`;

        await saveQuizResult({
          userId: user.uid,
          type: 'cheat-sheet',
          title,
          score,
          correctCount,
          totalQuestions,
          questions: originalQuizQuestions,
          userAnswers: quizAnswers,
        });
        console.log('[Quiz Me] Saved quiz history');
      } catch (error) {
        console.error('[Quiz Me] Error saving quiz history:', error);
      }
    }

    setShowQuizPanel(false);
    setIsAnimatingOut(false);
    setQuizError(null);
    setIsGeneratingQuiz(false);
  };

  // Handle resizing the divider
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      
      // Constrain between 30% and 80%
      const constrainedWidth = Math.max(30, Math.min(80, newLeftWidth));
      setLeftPanelWidth(constrainedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // Lock body scroll when panel is open
  useEffect(() => {
    if (showQuizPanel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showQuizPanel]);

  const unitsToDisplay = selectedSubject === 'macro' ? allMacroUnits : allMicroUnits;
  const pageTitleSubject = selectedSubject === 'macro' ? 'Macroeconomics' : 'Microeconomics';
  const themeColor = selectedSubject === 'macro' ? 'blue' : 'green';
  
  // Get lesson names
  const lessons = selectedSubject === 'macro' ? macroLessons : microLessons;
  const getLessonName = (lessonId: string): string => {
    const lesson = lessons.find(l => l.lessonNumber === lessonId);
    return lesson ? lesson.lessonName : '';
  };

  // Determine if the unit is locked
  const unitNumber = parseInt(params.unitId as string, 10);
  const isLocked = false;

  // This page will now render the content for all units, assuming it exists.
  // The lock will be handled visually on the component that links here.

  // --- Data Grouping Logic ---
  const lessonGroups = new Map<string, { whiteboards: WhiteboardImage[], keyTerms: KeyTerm[] }>();
  unitWhiteboards.forEach(wb => {
    wb.lessonIDs.forEach(lessonId => {
      if (!lessonGroups.has(lessonId)) lessonGroups.set(lessonId, { whiteboards: [], keyTerms: [] });
      lessonGroups.get(lessonId)!.whiteboards.push(wb);
    });
  });
  unitKeyTerms.forEach(term => {
    term.lessonIDs.forEach(lessonId => {
      if (!lessonGroups.has(lessonId)) lessonGroups.set(lessonId, { whiteboards: [], keyTerms: [] });
      lessonGroups.get(lessonId)!.keyTerms.push(term);
    });
  });
                
  const sortedLessons: LessonContent[] = Array.from(lessonGroups.entries())
    .map(([lessonId, content]) => ({ lessonId, ...content }))
    .sort((a, b) => {
        const [aMain, aSub] = a.lessonId.split('.').map(Number);
        const [bMain, bSub] = b.lessonId.split('.').map(Number);
        if (aMain !== bMain) return aMain - bMain;
        return (aSub || 0) - (bSub || 0);
    });

  // Add structured data for SEO
  useEffect(() => {
    const currentUnit = unitsToDisplay.find(u => u.number === activeUnitNum);
    if (!currentUnit) return;

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: `AP ${pageTitleSubject} Unit ${activeUnitNum}: ${currentUnit.title}`,
      description: `Free AP ${pageTitleSubject} Unit ${activeUnitNum} cheat sheet covering ${currentUnit.description}. Review key terms, definitions, formulas, graphs, and whiteboards with practice questions.`,
      educationalLevel: 'High School',
      courseCode: `AP ${pageTitleSubject.substring(0, 4)} Unit ${activeUnitNum}`,
      about: {
        '@type': 'Thing',
        name: `AP ${pageTitleSubject}`,
      },
      teaches: currentUnit.title,
      url: typeof window !== 'undefined' ? window.location.href : '',
      inLanguage: 'en-US',
      isAccessibleForFree: true,
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [activeUnitNum, pageTitleSubject, unitsToDisplay]);

  // Handle scrolling to term when hash is present in URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Wait for content to render, then scroll
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [activeUnitNum]); // Re-run when unit changes

  // PDF Generation Function - Simple document format
  const handleGeneratePDF = async () => {
    // Check if user is free and show JoinDojoModal
    if (!isProCustomer) {
      setShowJoinDojoModal(true);
      return;
    }

    try {
      // Get unit information
      const currentUnit = unitsToDisplay.find(u => u.number === activeUnitNum);
      if (!currentUnit) {
        throw new Error('Unit not found');
      }

      // Get terms for current unit
      const terms = unitKeyTerms;
      if (terms.length === 0) {
        alert('No terms found for this unit.');
        return;
      }

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const margin = 20; // mm
      const maxWidth = pageWidth - (margin * 2);
      let yPosition = margin;
      const lineHeight = 7; // mm between lines
      const termSpacing = 10; // mm between terms
      const subNoteIndent = 5; // mm indent for subnotes

      // Helper function to add text with word wrapping
      const addText = (text: string, fontSize: number, isBold: boolean = false, indent: number = 0) => {
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
        
        const lines = pdf.splitTextToSize(text, maxWidth - indent);
        
        // Check if we need a new page
        if (yPosition + (lines.length * lineHeight) > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        
        lines.forEach((line: string) => {
          pdf.text(line, margin + indent, yPosition);
          yPosition += lineHeight;
        });
      };

      // Add title
      const title = `Unit ${activeUnitNum} - ${currentUnit.title}`;
      addText(title, 18, true);
      yPosition += lineHeight * 0.5; // Small gap after title

      // Add terms
      terms.forEach((term, index) => {
        // Check if we need a new page before adding term
        if (yPosition + termSpacing + lineHeight * 3 > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        } else if (index > 0) {
          yPosition += termSpacing;
        }

        // Add term name (bold)
        addText(term.term, 12, true);
        
        // Add definition
        addText(term.definition, 10, false);
        
        // Add subnotes if they exist
        if (term.subNotes && term.subNotes.length > 0) {
          term.subNotes.forEach((subNote) => {
            // Check if we need a new page
            if (yPosition + lineHeight > pageHeight - margin) {
              pdf.addPage();
              yPosition = margin;
            }
            addText(`• ${subNote}`, 9, false, subNoteIndent);
          });
        }
      });

      // Save PDF
      const subjectName = selectedSubject === 'macro' ? 'Macro' : 'Micro';
      pdf.save(`AP-${subjectName}-Unit-${activeUnitNum}-Cheat-Sheet.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <div ref={containerRef} className="flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* Left Side - Cheat Sheet Content */}
        <motion.div
          animate={{
            width: showQuizPanel ? `${leftPanelWidth}%` : '100%',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          className="flex-shrink-0 overflow-y-auto min-w-0"
        >
      <div className="max-w-7xl mx-auto px-4 py-12 mt-12" ref={cheatSheetContentRef}>
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            <span className={themeColor === 'blue' ? 'text-blue-500' : 'text-green-500'}>AP {selectedSubject === 'macro' ? 'Macro' : 'Micro'}</span> Unit Cheat Sheets
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">Key terms, formulas, and graphs for every unit.</p>
        </div>

        {/* Unit Navigation Tabs */}
        <div className="mb-8 border-b border-gray-200 flex items-center justify-between">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {unitsToDisplay.map((unit) => {
              return (
                <button
                  key={unit.number}
                  onClick={() => handleUnitChange(String(unit.number))}
                  className={`${
                    activeUnit === String(unit.number)
                      ? `border-${themeColor}-500 text-${themeColor}-600`
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2`}
                >
                  <span>Unit {unit.number}</span>
                </button>
              );
            })}
          </nav>
          <button
            onClick={handleGeneratePDF}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 font-semibold text-gray-900"
          >
            <Download className="w-4 h-4" />
            Turn this Cheat Sheet into a PDF
          </button>
        </div>

        {/* Unit Practice Test Banner */}
        {(() => {
          const currentUnit = unitsToDisplay.find(u => u.number === activeUnitNum);
          const unitPrice = currentUnit?.price || 4.99;
          const isMicro = selectedSubject === 'micro';
          
          return (
            <div className={`mb-8 rounded-xl p-6 shadow-md border print:hidden ${
              themeColor === 'blue' 
                ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200' 
                : 'bg-gradient-to-r from-green-50 to-green-100 border-green-200'
            }`}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-900">
                    Strengthen your mastery of Unit {activeUnitNum}!
                  </p>
                  <p className="text-gray-600 mt-1">
                    Test your knowledge with a full-length practice test.
                  </p>
                </div>
                {isMicro ? (
                  <button
                    disabled
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                ) : (
                  <Link 
                    href={`/purchase/season-pass?courseType=${selectedSubject}`}
                    className={`inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg ${
                      themeColor === 'blue'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    Take the Unit {activeUnitNum} Practice Test now
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })()}

        {/* Dojo Drills Row - Below Strengthen your mastery button */}
        {(() => {
          // Filter drills by current unit and subject
          const relevantDrills = Object.values(dojoDrills).filter(
            drill => {
              const drillUnit = getDrillUnitForSubject(drill, subjectFilter);
              return drillUnit === activeUnitNum && drillAppliesToSubject(drill, subjectFilter);
            }
          );

          if (relevantDrills.length === 0) return null;

          return (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Dojo Drills</h2>
              <div className="flex md:flex-row md:flex-wrap gap-4 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
                {relevantDrills.map((drill) => (
                  <button
                    key={drill.id}
                    onClick={() => router.push(`/dojo-drills/preview/${drill.id}`)}
                    className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 text-left hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 flex-shrink-0 w-[45%] md:flex-1 md:min-w-[240px] md:max-w-[320px] flex flex-col group aspect-[5/6] md:aspect-auto"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`inline-block text-xs font-semibold px-2 py-1 rounded ${
                          subjectFilter === 'ap_macroeconomics'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        Unit {getDrillUnitForSubject(drill, subjectFilter) || drill.unit}
                      </div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                        <span>{drill.xpReward.total}</span>
                        <span className="inline-flex items-center">
                          <Image
                            src="/images/flame100.png"
                            alt="XP Flame"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                          />
                        </span>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1.5 line-clamp-2 group-hover:text-blue-600 transition-colors flex-1">
                      {drill.title}
                    </h3>
                    <p className="hidden md:block text-xs text-gray-600 line-clamp-2 mb-2">
                      {drill.description}
                    </p>
                    <div className="text-xs font-semibold text-blue-600 mt-auto flex items-center gap-1">
                      Start →
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Main Content Layout */}
        <div className="space-y-12">
          {(() => {
            // Collect all checkpoints for the unit
            const allCheckpoints = subjectFilter === 'ap_microeconomics' ? microCheckpoints : macroCheckpoints;
            const unitCheckpoints = allCheckpoints
              .filter(cp => cp.unit === activeUnitNum && cp.subject === subjectFilter)
              .sort((a, b) => {
                // Sort by lessonId to maintain order
                const [aMain, aSub] = a.lessonId.split('.').map(Number);
                const [bMain, bSub] = b.lessonId.split('.').map(Number);
                if (aMain !== bMain) return aMain - bMain;
                return (aSub || 0) - (bSub || 0);
              });

            // Calculate midpoint
            const totalLessons = sortedLessons.length;
            const midpoint = Math.ceil(totalLessons / 2);

            // Helper function to get lesson index from lessonId
            const getLessonIndex = (lessonId: string): number => {
              const index = sortedLessons.findIndex(lesson => lesson.lessonId === lessonId);
              return index >= 0 ? index + 1 : 0; // Return 1-based index, or 0 if not found
            };

            // Filter checkpoints for first half (lessons 1 to midpoint)
            const firstHalfCheckpoints = unitCheckpoints
              .filter(cp => {
                const lessonIndex = getLessonIndex(cp.lessonId);
                return lessonIndex >= 1 && lessonIndex <= midpoint;
              })
              .slice(0, 2); // Take first 2 available

            // Filter checkpoints for second half (lessons midpoint+1 to end)
            const secondHalfCheckpoints = unitCheckpoints
              .filter(cp => {
                const lessonIndex = getLessonIndex(cp.lessonId);
                return lessonIndex > midpoint && lessonIndex <= totalLessons;
              })
              .slice(0, 2); // Take first 2 available

            return (
              <>
                {sortedLessons.map(({ lessonId, whiteboards, keyTerms }, index) => {
            const lessonName = getLessonName(lessonId);
                  const lessonIndex = index + 1; // 1-based index
                  const isMidpoint = lessonIndex === midpoint;
                  
            return (
                    <React.Fragment key={lessonId}>
                      <div className="space-y-8">
              {/* Lesson Header */}
              <h2 className="text-2xl font-bold text-gray-800 pb-2 border-b border-gray-200">
                {lessonId}{lessonName ? ` - ${lessonName}` : ''}
              </h2>
              
              {/* Videos Section */}
              {(() => {
                const lessonVideos = getVideosForLessonId(lessonId);
                // Filter by subject
                const subjectFilter = selectedSubject === 'macro' ? 'AP Macroeconomics' : 'AP Microeconomics';
                const relevantVideos = lessonVideos.filter(video => 
                  video.subjects.includes(subjectFilter)
                );

                if (relevantVideos.length === 0) return null;

                return (
                  <div className="mb-6" data-section="videos">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Videos</h3>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {relevantVideos.map((video) => (
                        <button
                          key={video.id}
                          onClick={() => {
                            setSelectedVideo(video);
                            setShowVideoModal(true);
                            // Reset answers when opening a new video
                            setVideoQuestionAnswers({});
                          }}
                          className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 text-left hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 flex-shrink-0 w-[45%] md:flex-1 md:min-w-[240px] md:max-w-[320px] flex flex-col group aspect-[5/6] md:aspect-auto"
                        >
                          {/* Thumbnail Image */}
                          {video.thumbnail && (
                            <div className="relative w-full aspect-video mb-3 rounded-lg overflow-hidden bg-gray-100">
                              <Image
                                src={video.thumbnail}
                                alt={video.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-200"
                                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 33vw, 320px"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 rounded-full p-2">
                                  <Play className="w-5 h-5 text-blue-600 fill-blue-600" />
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="flex items-center justify-between mb-2">
                            <div
                              className={`inline-block text-xs font-semibold px-2 py-1 rounded ${
                                subjectFilter === 'AP Macroeconomics'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              Video
                            </div>
                            {video.questions && video.questions.length > 0 && (
                              <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                                <span>{video.questions.length}</span>
                                <span className="text-xs text-gray-600">questions</span>
                              </div>
                            )}
                          </div>
                          <h3 className="text-base font-bold text-gray-900 mb-1.5 line-clamp-2 group-hover:text-blue-600 transition-colors flex-1">
                            {video.title}
                          </h3>
                          {video.description && (
                            <p className="hidden md:block text-xs text-gray-600 line-clamp-2 mb-2">
                              {video.description}
                            </p>
                          )}
                          <div className="text-xs font-semibold text-blue-600 mt-auto flex items-center gap-1">
                            Watch →
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}
              
              {/* Key Terms Section */}
              {keyTerms.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Key Terms & Definitions</h3>
                  <div className="space-y-4">
                    {keyTerms.map(term => {
                      const isSelected = selectedTerms.has(term.id);
                      return (
                        <div 
                          key={term.id} 
                          id={`term-${term.id}`} 
                          onClick={() => {
                            setSelectedTerms(prev => {
                              const newSet = new Set(prev);
                              if (newSet.has(term.id)) {
                                newSet.delete(term.id);
                              } else {
                                newSet.add(term.id);
                              }
                              return newSet;
                            });
                          }}
                          className={`p-4 border rounded-lg scroll-mt-20 cursor-pointer transition-all duration-200 relative ${
                            isSelected 
                              ? 'border-gray-300 bg-gray-50 shadow-inner transform scale-[0.98]' 
                              : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                          }`}
                        >
                          {/* Selection Indicator */}
                          {isSelected && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-gray-300">
                              <Check className="w-4 h-4 text-gray-500" />
                            </div>
                          )}
                          <h3 className="font-bold text-gray-800 pr-8">{term.term}</h3>
                        <p className="mt-1 text-gray-600">{term.definition}</p>
                        {term.subNotes && term.subNotes.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <ul className="space-y-1.5 pl-0 list-none">
                              {term.subNotes.map((note, index) => (
                                <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                                  <span className="text-blue-500 flex-shrink-0 mt-0.5">•</span>
                                  <span className="leading-relaxed flex-1">{formatSubNote(note)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Whiteboards Section */}
                        {whiteboards.length > 0 && (() => {
                          const initialCount = 3; // Show 3 whiteboards initially (1 row of 3)
                          const visibleCount = visibleWhiteboardsCount[lessonId] || initialCount;
                          const hasMore = whiteboards.length > visibleCount;
                          const whiteboardsToShow = whiteboards.slice(0, visibleCount);

                          return (
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Whiteboards</h3>
                              <div className="border border-gray-300 rounded-lg p-6 bg-white">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                  {whiteboardsToShow.map((image, index) => {
                                    const isSelected = selectedWhiteboards.has(image.id);
                                    return (
                      <div 
                        key={`${image.id}-${index}`} 
                                        className={`relative p-2 border rounded-lg cursor-pointer transition-all duration-200 ${
                                          isSelected
                                            ? 'border-black border-2 shadow-inner transform scale-[0.98] bg-blue-50'
                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                        }`}
                                        onClick={() => handleWhiteboardClick(image)}
                                      >
                                        <div className="relative aspect-video rounded-md overflow-hidden">
                          <Image 
                            src={image.imageUrl} 
                                            alt={`Whiteboard for Lesson ${lessonId}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          />
                        </div>

                                        {isSelected && (
                                          <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-gray-300 pointer-events-none">
                                            <Check className="w-4 h-4 text-gray-500" />
                      </div>
                                        )}
                  </div>
                                    );
                                  })}
                  </div>
                                {hasMore && (
                                  <div 
                                    className="mt-6 pt-4 border-t border-gray-200 text-center cursor-pointer group"
                                    onClick={() => {
                                      setVisibleWhiteboardsCount(prev => ({
                                        ...prev,
                                        [lessonId]: whiteboards.length // Show all
                                      }));
                                    }}
                                  >
                                    <span className="text-gray-500 text-base font-medium uppercase tracking-wider group-hover:text-gray-700 transition-colors">SEE MORE BOARDS</span>
                </div>
              )}
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      {/* First Checkpoint - After midpoint lesson */}
                      {isMidpoint && firstHalfCheckpoints.length > 0 && (
                        <div data-section="checkpoint">
                          <Checkpoint
                            lessonId={firstHalfCheckpoints[0].lessonId}
                            question={firstHalfCheckpoints[0].question}
                            options={firstHalfCheckpoints[0].options}
                            correctAnswer={firstHalfCheckpoints[0].correctAnswer}
                            explanation={firstHalfCheckpoints[0].explanation}
                            subject={selectedSubject}
                            allCheckpoints={firstHalfCheckpoints.slice(1).map(cp => ({
                              lessonId: cp.lessonId,
                              question: cp.question,
                              options: cp.options,
                              correctAnswer: cp.correctAnswer,
                              explanation: cp.explanation
                            }))}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}

                {/* Second Checkpoint - After all lessons */}
                {secondHalfCheckpoints.length > 0 && (
                  <div data-section="checkpoint">
                    <Checkpoint
                      lessonId={secondHalfCheckpoints[0].lessonId}
                      question={secondHalfCheckpoints[0].question}
                      options={secondHalfCheckpoints[0].options}
                      correctAnswer={secondHalfCheckpoints[0].correctAnswer}
                      explanation={secondHalfCheckpoints[0].explanation}
                      subject={selectedSubject}
                      allCheckpoints={secondHalfCheckpoints.slice(1).map(cp => ({
                        lessonId: cp.lessonId,
                        question: cp.question,
                        options: cp.options,
                        correctAnswer: cp.correctAnswer,
                        explanation: cp.explanation
                      }))}
                    />
                  </div>
                )}
              </>
            );
              })()}
        </div>

        {/* Unit Navigation - Previous/Next Buttons */}
        {(() => {
          const unitsToDisplay = selectedSubject === 'macro' ? allMacroUnits : allMicroUnits;
          const prevUnit = unitsToDisplay.find(u => u.number === activeUnitNum - 1);
          const nextUnit = unitsToDisplay.find(u => u.number === activeUnitNum + 1);
          const buttonColorClass = themeColor === 'blue' 
            ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' 
            : 'bg-green-600 hover:bg-green-700 text-white border-green-600';
          
          return (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex gap-4">
                {/* Previous Unit Button */}
                {prevUnit ? (
                  <Link
                    href={propSubject && propUnitNumber 
                      ? `/${selectedSubject === 'macro' ? 'ap-macro' : 'ap-micro'}-unit-${prevUnit.number}-cheat-sheet`
                      : `/unit/${prevUnit.number}`}
                    className={`flex-1 flex items-center gap-3 px-6 py-4 ${buttonColorClass} border-2 rounded-lg transition-all duration-200 group shadow-sm hover:shadow-md`}
                  >
                    <ArrowLeft className="w-5 h-5 flex-shrink-0" />
                    <div className="text-left min-w-0">
                      <div className="text-xs opacity-80 uppercase tracking-wide">Previous</div>
                      <div className="text-base font-semibold truncate">
                        Unit {prevUnit.number}: {prevUnit.title}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex-1" /> // Spacer when no previous unit
                )}

                {/* Next Unit Button */}
                {nextUnit ? (
                  <Link
                    href={propSubject && propUnitNumber 
                      ? `/${selectedSubject === 'macro' ? 'ap-macro' : 'ap-micro'}-unit-${nextUnit.number}-cheat-sheet`
                      : `/unit/${nextUnit.number}`}
                    className={`flex-1 flex items-center justify-end gap-3 px-6 py-4 ${buttonColorClass} border-2 rounded-lg transition-all duration-200 group shadow-sm hover:shadow-md`}
                  >
                    <div className="text-right min-w-0">
                      <div className="text-xs opacity-80 uppercase tracking-wide">Next</div>
                      <div className="text-base font-semibold truncate">
                        Unit {nextUnit.number}: {nextUnit.title}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 flex-shrink-0" />
                  </Link>
                ) : (
                  <div className="flex-1" /> // Spacer when no next unit
                )}
              </div>
            </div>
          );
        })()}
          </div>
        </motion.div>

        {/* Resizable Divider */}
        {showQuizPanel && (
          <div
            onMouseDown={handleMouseDown}
            className={`hidden md:flex items-center justify-center w-2 bg-black cursor-col-resize hover:bg-gray-800 hover:w-3 transition-all flex-shrink-0 z-10 relative group ${
              isResizing ? 'bg-gray-800 w-3' : ''
            }`}
            style={{ cursor: 'col-resize' }}
          >
            <div className="w-1 h-12 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {/* Right Side - Quiz Panel */}
        <AnimatePresence>
          {showQuizPanel && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="hidden md:block border-l-2 border-black bg-white shadow-[-10px_0px_20px_rgba(0,0,0,0.1)] h-full overflow-y-auto flex-shrink-0 relative"
              style={{ width: `${100 - leftPanelWidth}%` }}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseQuizPanel}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm hover:shadow-md"
                aria-label="Close Quiz"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="border-b border-gray-200 mb-6 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">Quiz Me!</h1>
                      <p className="text-sm text-gray-600">
                        {isGeneratingQuiz ? 'Generating your custom quiz...' : quizError ? 'Error generating quiz' : 'A quick question to test your knowledge.'}
                      </p>
                    </div>
                    {originalQuizQuestions.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span>{originalQuizQuestions.length} Question{originalQuizQuestions.length !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {isGeneratingQuiz ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={loadingQuestionIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                        <CardHeader>
                          <CardTitle className="text-xl">
                            Question {loadingQuestionIndex + 1} of 5
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            Generating questions...
                          </p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Animated Text Bars for Question */}
                            <div className="space-y-3">
                              <motion.div
                                className="h-6 bg-gray-200 rounded-lg"
                                animate={{
                                  width: ['100%', '95%', '100%', '98%', '100%'],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                }}
                              />
                              <motion.div
                                className="h-6 bg-gray-200 rounded-lg"
                                animate={{
                                  width: ['98%', '100%', '96%', '100%', '97%'],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  delay: 0.2,
                                }}
                              />
                              <motion.div
                                className="h-6 bg-gray-200 rounded-lg"
                                animate={{
                                  width: ['96%', '100%', '94%', '100%', '99%'],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  delay: 0.4,
                                }}
                              />
                              <motion.div
                                className="h-6 bg-gray-200 rounded-lg w-3/4"
                                animate={{
                                  width: ['75%', '80%', '70%', '78%', '75%'],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  delay: 0.6,
                                }}
                              />
                            </div>

                            {/* Animated Text Bars for Options */}
                            <div className="space-y-2 mt-6">
                              {[1, 2, 3, 4].map((i) => (
                                <motion.div
                                  key={i}
                                  className="h-12 bg-gray-100 rounded-lg border-2 border-gray-200"
                                  animate={{
                                    opacity: [0.6, 1, 0.6],
                                  }}
                                  transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: i * 0.15,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </AnimatePresence>
                ) : quizError ? (
                  <div className="space-y-4">
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                      <p className="text-red-800 font-medium">{quizError}</p>
                    </div>
                    <button
                      onClick={handleCloseQuizPanel}
                      className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : originalQuizQuestions.length > 0 ? (
                  <div className="space-y-6">
                    {originalQuizQuestions.map((question, questionIndex) => {
                      const selectedAnswer = quizAnswers[question.id] || null;
                      const showResult = selectedAnswer !== null;
                      const isCorrect = selectedAnswer === question.correctAnswer;
                      const showExplanation = showExplanations.has(question.id);

                      return (
                        <Card key={question.id} id={`question-${question.id}`} className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                          <CardHeader>
                            <CardTitle className="text-xl">
                              Question {questionIndex + 1} of {originalQuizQuestions.length}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <p className="text-lg font-semibold text-gray-900">
                                {question.question}
                              </p>
                              
                              {/* Question Image */}
                              {question.image && (
                                <div className="my-4">
                                  <img
                                    src={typeof question.image === 'string' ? question.image : (question.image as any).src} 
                                    alt="Question related image" 
                                    className="w-full max-w-2xl h-auto object-contain cursor-pointer hover:opacity-90 transition-opacity rounded-lg"
                                  />
                                </div>
                              )}

                              {/* Table Data */}
                              {question.tableData && (
                                <div className="my-4 overflow-x-auto">
                                  <div className="flex items-center gap-4">
                                    {question.tableData.playerNames && (
                                      <div className="flex items-center justify-center h-full w-16">
                                        <p className="transform -rotate-90 whitespace-nowrap text-center font-bold text-lg text-gray-900 leading-tight">
                                          {question.tableData.playerNames.row.split(' ')[0]}
                                          <br />
                                          {question.tableData.playerNames.row.split(' ').slice(1).join(' ')}
                                        </p>
                                      </div>
                                    )}
                                    <div className="flex-1">
                                      {question.tableData.playerNames && (
                                        <p className="text-center font-bold text-lg text-gray-900 mb-2">
                                          {question.tableData.playerNames.column}
                                        </p>
                                      )}
                                      <table className="min-w-full border-collapse border border-black">
                                        <thead className="bg-white">
                                          <tr>
                                            {question.tableData.headers.map((header: string) => (
                                              <th key={header} className="border border-black px-4 py-3 text-center text-base font-bold text-gray-900">
                                                {header}
                                              </th>
                                            ))}
                                          </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                          {question.tableData.rows.map((row: string[], rowIndex: number) => (
                                            <tr key={rowIndex}>
                                              {row.map((cell: string, cellIndex: number) => {
                                                const isRowHeader = question.tableData?.rowHeaders && cellIndex === 0;
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

                              {/* Answer Options */}
                              <div className="space-y-2">
                                {question.options.map((option, index) => {
                                  const optionLetter = String.fromCharCode(65 + index);
                                  const isCorrectAnswer = optionLetter === question.correctAnswer;
                                  const isSelected = selectedAnswer === optionLetter;
                                  
                                  // Determine styling based on state
                                  let optionStyle = 'bg-white border-gray-300';
                                  if (showResult) {
                                    if (isCorrectAnswer) {
                                      optionStyle = 'bg-green-50 border-green-500';
                                    } else if (isSelected && !isCorrectAnswer) {
                                      optionStyle = 'bg-red-50 border-red-500';
                                    }
                                  } else if (isSelected) {
                                    optionStyle = 'bg-blue-50 border-blue-500';
                                  }

                                  return (
                                    <motion.div
                                      key={index}
                                      initial={false}
                                      animate={showResult && isCorrectAnswer ? { scale: [1, 1.05, 1] } : {}}
                                      transition={{ duration: 0.3 }}
                                      className={`p-3 rounded-lg border-2 transition-colors ${optionStyle} ${
                                        !showResult ? 'cursor-pointer hover:bg-blue-50 hover:border-blue-300' : ''
                                      }`}
                                      onClick={!showResult ? () => handleQuizAnswerSelect(question.id, optionLetter) : undefined}
                                    >
                                      <div className="flex items-center gap-3">
                                        {!showResult ? (
                                          <>
                                            <input
                                              type="radio"
                                              name={`question-${question.id}`}
                                              value={optionLetter}
                                              checked={isSelected}
                                              onChange={() => handleQuizAnswerSelect(question.id, optionLetter)}
                                              className="w-5 h-5 text-blue-600 flex-shrink-0"
                                              onClick={(e) => e.stopPropagation()}
                                            />
                                            <span className="flex-1 text-gray-900">{option}</span>
                                          </>
                                        ) : (
                                          <>
                                            <span
                                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                                                isCorrectAnswer
                                                  ? 'bg-green-500 text-white'
                                                  : isSelected && !isCorrectAnswer
                                                  ? 'bg-red-500 text-white'
                                                  : 'bg-gray-200 text-gray-700'
                                              }`}
                                            >
                                              {optionLetter}
                                            </span>
                                            <span className="flex-1 text-gray-900">{option}</span>
                                            {isCorrectAnswer && (
                                              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                                            )}
                                            {isSelected && !isCorrectAnswer && (
                                              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </motion.div>
                                  );
                                })}
                              </div>

                              {/* Explanation Section - Show based on answer correctness */}
                              {showResult && (() => {
                                // If incorrect, show explanation automatically
                                if (!isCorrect) {
                                  return (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      transition={{ duration: 0.3 }}
                                      className="mt-6 pt-6 border-t border-gray-200"
                                    >
                                      {question.explanation && (
                                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Explanation</h4>
                                          <p className="text-gray-900">{question.explanation}</p>
                                        </div>
                                      )}
                                    </motion.div>
                                  );
                                }
                                
                                // If correct, show explanation as a link
                                if (isCorrect && question.explanation) {
                                  return (
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                      <button
                                        onClick={() => {
                                          const newSet = new Set(showExplanations);
                                          if (showExplanation) {
                                            newSet.delete(question.id);
                                          } else {
                                            newSet.add(question.id);
                                          }
                                          setShowExplanations(newSet);
                                        }}
                                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-2 underline"
                                      >
                                        <Lightbulb className="w-4 h-4" />
                                        View Explanation
                                      </button>
                                      {showExplanation && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          transition={{ duration: 0.3 }}
                                          className="mt-4"
                                        >
                                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Explanation</h4>
                                            <p className="text-gray-900">{question.explanation}</p>
                                          </div>
                                        </motion.div>
                                      )}
                                    </div>
                                  );
                                }
                                
                                return null;
                              })()}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Full-Screen Panel */}
        <AnimatePresence>
          {showQuizPanel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={handleCloseQuizPanel}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
                onClick={(e) => e.stopPropagation()}
                className="w-full h-full bg-white shadow-lg overflow-y-auto relative"
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseQuizPanel}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm hover:shadow-md"
                  aria-label="Close Quiz"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="border-b border-gray-200 mb-6 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-xl font-bold text-gray-900">Quiz Me!</h1>
                        <p className="text-sm text-gray-600">
                          {isGeneratingQuiz ? 'Generating your custom quiz...' : quizError ? 'Error generating quiz' : 'A quick question to test your knowledge.'}
                        </p>
                      </div>
                      {originalQuizQuestions.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FileText className="w-4 h-4" />
                          <span>{originalQuizQuestions.length} Question{originalQuizQuestions.length !== 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {isGeneratingQuiz ? (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={loadingQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                          <CardHeader>
                            <CardTitle className="text-xl">
                              Question {loadingQuestionIndex + 1} of 5
                            </CardTitle>
                            <p className="text-sm text-gray-600 mt-1">
                              Generating questions...
                            </p>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {/* Animated Text Bars for Question */}
                              <div className="space-y-3">
                                <motion.div
                                  className="h-6 bg-gray-200 rounded-lg"
                                  animate={{
                                    width: ['100%', '95%', '100%', '98%', '100%'],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                  }}
                                />
                                <motion.div
                                  className="h-6 bg-gray-200 rounded-lg"
                                  animate={{
                                    width: ['98%', '100%', '96%', '100%', '97%'],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: 0.2,
                                  }}
                                />
                                <motion.div
                                  className="h-6 bg-gray-200 rounded-lg"
                                  animate={{
                                    width: ['96%', '100%', '94%', '100%', '99%'],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: 0.4,
                                  }}
                                />
                                <motion.div
                                  className="h-6 bg-gray-200 rounded-lg w-3/4"
                                  animate={{
                                    width: ['75%', '80%', '70%', '78%', '75%'],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: 0.6,
                                  }}
                                />
                              </div>

                              {/* Animated Text Bars for Options */}
                              <div className="space-y-2 mt-6">
                                {[1, 2, 3, 4].map((i) => (
                                  <motion.div
                                    key={i}
                                    className="h-12 bg-gray-100 rounded-lg border-2 border-gray-200"
                                    animate={{
                                      opacity: [0.6, 1, 0.6],
                                    }}
                                    transition={{
                                      duration: 1.2,
                                      repeat: Infinity,
                                      ease: 'easeInOut',
                                      delay: i * 0.15,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </AnimatePresence>
                  ) : quizError ? (
                    <div className="space-y-4">
                      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                        <p className="text-red-800 font-medium">{quizError}</p>
                      </div>
                      <button
                        onClick={handleCloseQuizPanel}
                        className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  ) : originalQuizQuestions.length > 0 ? (
                    <div className="space-y-6">
                      {originalQuizQuestions.map((question, questionIndex) => {
                        const selectedAnswer = quizAnswers[question.id] || null;
                        const showResult = selectedAnswer !== null;
                        const isCorrect = selectedAnswer === question.correctAnswer;
                        const showExplanation = showExplanations.has(question.id);

                        return (
                          <Card key={question.id} id={`question-${question.id}`} className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                            <CardHeader>
                              <CardTitle className="text-xl">
                                Question {questionIndex + 1} of {originalQuizQuestions.length}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <p className="text-lg font-semibold text-gray-900">
                                  {question.question}
                                </p>
                                
                                {/* Question Image */}
                                {question.image && (
                                  <div className="my-4">
                                    <img
                                      src={typeof question.image === 'string' ? question.image : (question.image as any).src} 
                                      alt="Question related image" 
                                      className="w-full max-w-2xl h-auto object-contain cursor-pointer hover:opacity-90 transition-opacity rounded-lg"
                                    />
                                  </div>
                                )}

                                {/* Table Data */}
                                {question.tableData && (
                                  <div className="my-4 overflow-x-auto">
                                    <div className="flex items-center gap-4">
                                      {question.tableData.playerNames && (
                                        <div className="flex items-center justify-center h-full w-16">
                                          <p className="transform -rotate-90 whitespace-nowrap text-center font-bold text-lg text-gray-900 leading-tight">
                                            {question.tableData.playerNames.row.split(' ')[0]}
                                            <br />
                                            {question.tableData.playerNames.row.split(' ').slice(1).join(' ')}
                                          </p>
                                        </div>
                                      )}
                                      <div className="flex-1">
                                        {question.tableData.playerNames && (
                                          <p className="text-center font-bold text-lg text-gray-900 mb-2">
                                            {question.tableData.playerNames.column}
                                          </p>
                                        )}
                                        <table className="min-w-full border-collapse border border-black">
                                          <thead className="bg-white">
                                            <tr>
                                              {question.tableData.headers.map((header: string) => (
                                                <th key={header} className="border border-black px-4 py-3 text-center text-base font-bold text-gray-900">
                                                  {header}
                                                </th>
                                              ))}
                                            </tr>
                                          </thead>
                                          <tbody className="bg-white">
                                            {question.tableData.rows.map((row: string[], rowIndex: number) => (
                                              <tr key={rowIndex}>
                                                {row.map((cell: string, cellIndex: number) => {
                                                  const isRowHeader = question.tableData?.rowHeaders && cellIndex === 0;
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

                                {/* Answer Options */}
                                <div className="space-y-2">
                                  {question.options.map((option, index) => {
                                    const optionLetter = String.fromCharCode(65 + index);
                                    const isCorrectAnswer = optionLetter === question.correctAnswer;
                                    const isSelected = selectedAnswer === optionLetter;
                                    
                                    // Determine styling based on state
                                    let optionStyle = 'bg-white border-gray-300';
                                    if (showResult) {
                                      if (isCorrectAnswer) {
                                        optionStyle = 'bg-green-50 border-green-500';
                                      } else if (isSelected && !isCorrectAnswer) {
                                        optionStyle = 'bg-red-50 border-red-500';
                                      }
                                    } else if (isSelected) {
                                      optionStyle = 'bg-blue-50 border-blue-500';
                                    }

                                    return (
                                      <motion.div
                                        key={index}
                                        initial={false}
                                        animate={showResult && isCorrectAnswer ? { scale: [1, 1.05, 1] } : {}}
                                        transition={{ duration: 0.3 }}
                                        className={`p-3 rounded-lg border-2 transition-colors ${optionStyle} ${
                                          !showResult ? 'cursor-pointer hover:bg-blue-50 hover:border-blue-300' : ''
                                        }`}
                                        onClick={!showResult ? () => handleQuizAnswerSelect(question.id, optionLetter) : undefined}
                                      >
                                        <div className="flex items-center gap-3">
                                          {!showResult ? (
                                            <>
                                              <input
                                                type="radio"
                                                name={`question-${question.id}`}
                                                value={optionLetter}
                                                checked={isSelected}
                                                onChange={() => handleQuizAnswerSelect(question.id, optionLetter)}
                                                className="w-5 h-5 text-blue-600 flex-shrink-0"
                                                onClick={(e) => e.stopPropagation()}
                                              />
                                              <span className="flex-1 text-gray-900">{option}</span>
                                            </>
                                          ) : (
                                            <>
                                              <span
                                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                                                  isCorrectAnswer
                                                    ? 'bg-green-500 text-white'
                                                    : isSelected && !isCorrectAnswer
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-gray-200 text-gray-700'
                                                }`}
                                              >
                                                {optionLetter}
                                              </span>
                                              <span className="flex-1 text-gray-900">{option}</span>
                                              {isCorrectAnswer && (
                                                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                                              )}
                                              {isSelected && !isCorrectAnswer && (
                                                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                                              )}
                                            </>
                                          )}
                                        </div>
                                      </motion.div>
                                    );
                                  })}
                                </div>

                                {/* Explanation Section - Show based on answer correctness */}
                                {showResult && (() => {
                                  // If incorrect, show explanation automatically
                                  if (!isCorrect) {
                                    return (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-6 pt-6 border-t border-gray-200"
                                      >
                                        {question.explanation && (
                                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Explanation</h4>
                                            <p className="text-gray-900">{question.explanation}</p>
                                          </div>
                                        )}
                                      </motion.div>
                                    );
                                  }
                                  
                                  // If correct, show explanation as a link
                                  if (isCorrect && question.explanation) {
                                    return (
                                      <div className="mt-6 pt-6 border-t border-gray-200">
                                        <button
                                          onClick={() => {
                                            const newSet = new Set(showExplanations);
                                            if (showExplanation) {
                                              newSet.delete(question.id);
                                            } else {
                                              newSet.add(question.id);
                                            }
                                            setShowExplanations(newSet);
                                          }}
                                          className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-2 underline"
                                        >
                                          <Lightbulb className="w-4 h-4" />
                                          View Explanation
                                        </button>
                                        {showExplanation && (
                                          <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-4"
                                          >
                                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Explanation</h4>
                                              <p className="text-gray-900">{question.explanation}</p>
                                            </div>
                                          </motion.div>
                                        )}
                                      </div>
                                    );
                                  }
                                  
                                  return null;
                                })()}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Whiteboard Modal */}
      {isModalOpen && selectedWhiteboard && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto relative">
            <button onClick={closeModal} className="absolute top-2 right-2 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors z-10" aria-label="Close whiteboard view">
              <X className="w-5 h-5"/>
            </button>
            <div className="p-6">
              <Image src={selectedWhiteboard.imageUrl} alt={selectedWhiteboard.title || 'Enlarged whiteboard image'} width={1200} height={800} className="w-full h-auto rounded" />
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Dock */}
      {(() => {
        const isAnythingSelected = selectedTerms.size > 0 || selectedWhiteboards.size > 0;
        const showDownload = selectedWhiteboards.size > 0;
        const showFullscreenButton = selectedWhiteboards.size === 1 && selectedTerms.size === 0;

        const handleDownload = async () => {
          for (const id of selectedWhiteboards) {
            const whiteboard = unitWhiteboards.find(wb => wb.id === id);
            if (whiteboard) {
              try {
                // Fetch the image as a blob
                const response = await fetch(whiteboard.imageUrl);
                const blob = await response.blob();
                
                // Create object URL from blob
                const blobUrl = URL.createObjectURL(blob);
                
                // Create download link
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = whiteboard.title || `whiteboard-${whiteboard.id}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Clean up the object URL after a short delay
                setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
              } catch (error) {
                console.error('Error downloading image:', error);
                // Fallback to opening in new tab if download fails
                window.open(whiteboard.imageUrl, '_blank');
              }
            }
          }
        };

        const handleFullscreen = () => {
          setShowFullscreen(true);
        };

        return (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: isAnythingSelected ? 1 : 0,
              x: isAnythingSelected ? 0 : -20
            }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
            className={`fixed top-1/2 -translate-y-1/2 left-8 z-50 ${
              isAnythingSelected ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center gap-2 bg-white text-gray-800 rounded-2xl shadow-lg p-2 border border-gray-300"
            >
              <motion.button 
                onClick={handleMakeQuiz}
                disabled={isGeneratingQuiz}
                whileHover={!isGeneratingQuiz ? { scale: 1.05 } : {}}
                whileTap={!isGeneratingQuiz ? { scale: 0.95 } : {}}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 w-20 h-16 ${
                  isGeneratingQuiz 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100'
                }`}
                title="Generate Quiz"
              >
                {isGeneratingQuiz ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
                  />
                ) : (
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Zap className="w-6 h-6 text-blue-600" fill="currentColor" />
                  </motion.div>
                )}
                <span className="text-xs font-semibold mt-1">{isGeneratingQuiz ? 'Generating...' : 'Quiz Me!'}</span>
              </motion.button>
              
              <div className="w-px h-6 bg-gray-300" />

              <button 
                onClick={(e) => e.preventDefault()}
                className="flex flex-col items-center justify-center p-2 rounded-md w-20 h-16 cursor-not-allowed"
                title="Save to Board (Coming Soon)"
              >
                <BookmarkPlus className="w-6 h-6 text-gray-500" />
              </button>
              
              {showFullscreenButton && (
                <>
                  <div className="h-px w-full bg-gray-300" />
                  <button 
                    onClick={handleFullscreen}
                    className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors w-20 h-16"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-6 h-6 text-blue-500" />
                  </button>
                </>
              )}
              
              {showDownload && (
                <>
                  <div className="h-px w-full bg-gray-300" />
                  <button 
                    onClick={handleDownload}
                    className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors w-20 h-16"
                    title="Download Selected Images"
                  >
                    <Download className="w-6 h-6 text-blue-500" />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        );
      })()}


      {/* Image Slides Modal */}
      <AnimatePresence>
        {showImageSlides && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowImageSlides(false);
                setHasSeenExplainer(true);
              }
            }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative my-8 border border-gray-200"
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                onClick={() => {
                  setShowImageSlides(false);
                  setHasSeenExplainer(true);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm hover:shadow-md"
                aria-label="Close Image Slides"
              >
                <X className="w-5 h-5" />
              </motion.button>
              
              <div className="p-6">
                <motion.h2 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-xl font-bold text-gray-900 mb-4 text-center"
                >
                  Dojo Drill
                </motion.h2>
                
                {/* Image Slides Container */}
                <div className="relative">
                  {/* Previous Button */}
                  <AnimatePresence>
                    {currentImageIndex > 0 && (
                      <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        onClick={() => setCurrentImageIndex(prev => prev - 1)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg hover:shadow-xl transition-all z-10 border border-gray-200"
                        aria-label="Previous image"
                      >
                        <ArrowLeft className="w-4 h-4 text-gray-700" />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  {/* Current Image */}
                  <div className="flex flex-col justify-center items-center min-h-[200px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="w-full flex flex-col items-center"
                      >
                        <img
                          src={currentImageIndex === 0 
                            ? '/images/dojoDrillPreviewB.png'
                            : currentImageIndex === 1
                            ? '/images/dojoDrillPreviewC.png'
                            : '/images/dojoDrillPreviewA.png'}
                          alt={`Dojo Drill Slide ${currentImageIndex + 1}`}
                          className="max-w-full max-h-[300px] h-auto rounded-lg shadow-md object-contain mb-4"
                        />
                        {/* Text overlay for slides 0 and 1 */}
                        {currentImageIndex === 0 && (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-center font-semibold text-gray-900 text-base"
                          >
                            Choose any term or whiteboard
                          </motion.p>
                        )}
                        {currentImageIndex === 1 && (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-center font-semibold text-gray-900 text-base"
                          >
                            Create a custom Dojo Drill
                          </motion.p>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Next Button */}
                  <AnimatePresence>
                    {currentImageIndex < 2 && (
                      <motion.button
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        onClick={() => setCurrentImageIndex(prev => prev + 1)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg hover:shadow-xl transition-all z-10 border border-gray-200"
                        aria-label="Next image"
                      >
                        <ArrowRight className="w-4 h-4 text-gray-700" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                {/* Slide Indicators */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="flex justify-center gap-2 mt-6"
                >
                  {[0, 1, 2].map((index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentImageIndex === index
                          ? 'bg-blue-600'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                      animate={{
                        scale: currentImageIndex === index ? 1.3 : 1,
                        opacity: currentImageIndex === index ? 1 : 0.5
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </motion.div>

                {/* Slide Counter */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mt-3 text-sm text-gray-500 font-medium"
                >
                  {currentImageIndex + 1} of 3
                </motion.div>

                {/* Done Button */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-6 text-center"
                >
                  <motion.button
                    onClick={() => {
                      setShowImageSlides(false);
                      setHasSeenExplainer(true);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                  >
                    Done
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Whiteboard Modal */}
      {showFullscreen && selectedWhiteboards.size === 1 && (() => {
        const whiteboardId = Array.from(selectedWhiteboards)[0];
        const whiteboard = unitWhiteboards.find(wb => wb.id === whiteboardId);
        
        if (!whiteboard) return null;
        
        return (
          <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-[60]"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowFullscreen(false);
              }
            }}
          >
            {/* Match the main content container dimensions */}
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-center relative pt-12 pb-12">
              <button
                onClick={() => setShowFullscreen(false)}
                className="absolute top-16 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3 shadow-lg"
                aria-label="Close Fullscreen"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="w-full h-full flex items-center justify-center">
                <Image 
                  src={whiteboard.imageUrl} 
                  alt={whiteboard.title || 'Fullscreen whiteboard image'} 
                  width={2000} 
                  height={1500} 
                  className="max-w-full max-h-full w-auto h-auto rounded-lg shadow-2xl object-contain" 
                />
              </div>
            </div>
          </div>
        );
      })()}

      {/* Video Modal - Similar to Dojo Drill Modal */}
      <AnimatePresence>
        {showVideoModal && selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowVideoModal(false);
              }
            }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[85vh] overflow-hidden relative my-8 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                onClick={() => setShowVideoModal(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm hover:shadow-md"
                aria-label="Close Video"
              >
                <X className="w-5 h-5" />
              </motion.button>
              
              <div className="p-4 flex gap-4 h-[75vh]">
                {/* Video Section - Left */}
                <div className="flex-1 flex items-center justify-center">
                  <video
                    src={selectedVideo.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full aspect-video rounded-lg"
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Comprehension Check Sidebar - Right */}
                {selectedVideo.questions && selectedVideo.questions.length > 0 && (
                  <div className="w-96 h-full flex flex-col pl-4">
                    <div className="pb-4 mb-4 flex-shrink-0">
                      <h3 className="text-xl font-bold text-gray-900">
                        Comprehension Check
                      </h3>
                    </div>
                    
                    {/* Scrollable Questions */}
                    <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                      {selectedVideo.questions.map((question, qIndex) => {
                        const selectedAnswer = videoQuestionAnswers[question.id];
                        const isAnswered = selectedAnswer !== undefined;
                        const isCorrect = selectedAnswer === question.correctAnswer;
                        
                        return (
                          <div key={question.id} className="space-y-3">
                            <p className="text-sm font-semibold text-gray-600">
                              Question {qIndex + 1}
                            </p>
                            <p className="text-base font-medium text-gray-800 leading-relaxed">
                              {question.text}
                            </p>
                            <div className="space-y-2">
                              {question.options.map((option, index) => {
                                const isSelected = selectedAnswer === index;
                                const isCorrectOption = index === question.correctAnswer;
                                const showResult = isAnswered;
                                
                                return (
                                  <button
                                    key={index}
                                    onClick={() => {
                                      if (!isAnswered) {
                                        setVideoQuestionAnswers(prev => ({
                                          ...prev,
                                          [question.id]: index
                                        }));
                                      }
                                    }}
                                    disabled={isAnswered}
                                    className={`w-full text-left p-3 rounded-lg transition-all ${
                                      !showResult
                                        ? isSelected
                                          ? "bg-gray-200 border-[3px] border-black text-gray-900"
                                          : "bg-white border-2 border-gray-300 hover:border-black hover:bg-gray-50 cursor-pointer"
                                        : isSelected && isCorrectOption
                                        ? "bg-green-100 border-[3px] border-black text-green-900"
                                        : isSelected && !isCorrectOption
                                        ? "bg-red-100 border-[3px] border-black text-red-900"
                                        : isCorrectOption && showResult
                                        ? "bg-green-100 border-[3px] border-black text-green-900"
                                        : "bg-gray-50 border-2 border-gray-300 text-gray-600"
                                    } ${showResult ? "cursor-default" : ""}`}
                                  >
                                    <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>{" "}
                                    {option}
                                  </button>
                                );
                              })}
                            </div>
                            
                            {isAnswered && question.explanation && (
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
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Join the Dojo Modal */}
      <AnimatePresence>
        {showJoinDojoModal && (
          <JoinDojoModal
            isOpen={showJoinDojoModal}
            onClose={() => setShowJoinDojoModal(false)}
            selectedSubject={selectedSubject}
          />
        )}
      </AnimatePresence>
    </>
  );
} 