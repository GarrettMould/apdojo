'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
import { unit1Whiteboards, apMacroUnit2Whiteboards, apMacroUnit3Whiteboards, apMacroUnit4Whiteboards, apMacroUnit5Whiteboards, Whiteboard } from '@/data/whiteboards';
import { getCheckpointForLesson, microCheckpoints, macroCheckpoints } from '@/data/checkpoints';
import { microLessons, macroLessons } from '@/data/lessons';
import { videos, Video } from '@/data/videos';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question as QuestionType } from '@/data/questionBanks/types';
import { X, ArrowRight, Lock, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';

// Helper to combine and structure whiteboard data
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
    title: wb.topic
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
  // Combine first question with all additional checkpoints
  const allQuestions = [
    { lessonId, question, options, correctAnswer, explanation },
    ...allCheckpoints
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | null>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const [showCTA, setShowCTA] = useState(false);
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
    } else {
      // If this is the last question, show CTA after 1.5 seconds
      setTimeout(() => {
        setShowCTA(true);
      }, 1500);
    }
  };

  const practiceUrl = `/unitMCQPracticePage?subject=${subject}&mode=topic&lessonId=${lessonId}`;

  return (
    <div className="mt-12 mb-8 relative">
      {/* Card Container with overflow hidden for transitions */}
      <div className="relative min-h-[500px] overflow-hidden">
        {/* Render all question cards */}
        {allQuestions.map((q, questionIndex) => {
          const isActive = currentQuestionIndex === questionIndex && !showCTA;
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
              {/* Teach Me Button - Upper Border */}
              {isActive && findVideoForLesson(q.lessonId) && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <button
                    onClick={() => handleTeachMe(q.lessonId)}
                    className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-md"
                  >
                    Teach Me...
                  </button>
                </div>
              )}

      <div className="mb-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-1">Checkpoint</h3>
                    <p className="text-xs text-gray-500">Test your understanding of {q.lessonId}</p>
          </div>
                  {qShowResult && questionIndex === 0 && (
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

        {/* CTA Card */}
        {allQuestions.length > 0 && (
          <div 
            className={`absolute inset-0 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 shadow-lg transition-all duration-500 ease-in-out ${
              showCTA
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-full'
            }`}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white shadow-lg h-full flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold mb-3">Ready to Level Up?</h3>
              <p className="text-lg mb-6 opacity-90">
                Join Dojo Gym and unlock unlimited practice questions, detailed explanations, and personalized study plans.
              </p>
              <Link
                href="/membership"
                className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-md"
              >
                Join Dojo Gym Now
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Dojo Drill Modal */}
      {showDojoDrill && dojoDrillVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowDojoDrill(false);
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative my-8">
            <button
              onClick={() => setShowDojoDrill(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors z-10 bg-white rounded-full p-2 shadow-md"
              aria-label="Close Dojo Drill"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dojo Drill: {dojoDrillVideo.title}</h2>
              
              {/* Video Section */}
              <div className="mb-6">
                <video
                  src={dojoDrillVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full aspect-video rounded-lg shadow-lg"
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Questions Section */}
              {dojoDrillVideo.questions && dojoDrillVideo.questions.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Practice Questions</h3>
                  <div className="space-y-4">
                    {dojoDrillVideo.questions.map((q, index) => (
                      <div key={q.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <p className="font-semibold text-gray-900 mb-3">
                          {index + 1}. {q.text}
                        </p>
                        <div className="space-y-2">
                          {q.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`p-3 rounded-lg border-2 ${
                                optIndex === q.correctAnswer
                                  ? 'bg-green-100 border-green-400 text-green-800'
                                  : 'bg-white border-gray-300 text-gray-700'
                              }`}
                            >
                              <span className="font-medium">
                                {String.fromCharCode(65 + optIndex)}. {option}
                              </span>
                              {optIndex === q.correctAnswer && (
                                <CheckCircle2 className="w-5 h-5 text-green-600 inline-block ml-2" />
                              )}
                            </div>
                          ))}
                        </div>
                        {q.explanation && (
                          <p className="mt-3 text-sm text-gray-600 italic">{q.explanation}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Done Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowDojoDrill(false)}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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

export default function UnitPage() {
  const params = useParams();
  const router = useRouter(); // Initialize useRouter
  const { user, userData, selectedSubject } = useAuthContext(); // Correctly destructure userData and selectedSubject
  
  const [activeUnit, setActiveUnit] = useState((params.unitId as string) || '1');
  const [selectedWhiteboard, setSelectedWhiteboard] = useState<WhiteboardImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleWhiteboardsCount, setVisibleWhiteboardsCount] = useState<Record<string, number>>({});
  const [selectedTerms, setSelectedTerms] = useState<Set<string>>(new Set());
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState<QuestionType | null>(null);
  const [availableQuizQuestions, setAvailableQuizQuestions] = useState<QuestionType[]>([]);
  const [answeredQuizQuestions, setAnsweredQuizQuestions] = useState<Set<number>>(new Set());
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);

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
  const subjectFilter = selectedSubject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';

  // --- Modal Logic ---
  const openModal = (whiteboard: WhiteboardImage) => {
    setSelectedWhiteboard(whiteboard);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWhiteboard(null);
  };
  

  const handleUnitChange = (unitNumber: string) => {
    setActiveUnit(unitNumber);
    router.push(`/unit/${unitNumber}`, { scroll: false });
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
    if (selectedTerms.size === 0) {
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

    // Remove duplicates and filter out answered questions
    const uniqueQuestions = allRelevantQuestions.filter((q, index, self) => 
      index === self.findIndex(q2 => q2.id === q.id) &&
      !answeredQuizQuestions.has(q.id)
    );

    setAvailableQuizQuestions(uniqueQuestions);
  }, [selectedTerms, answeredQuizQuestions, activeUnitNum, selectedSubject, subjectFilter]);

  // Find most relevant question from available questions
  const findMostRelevantQuestion = (): QuestionType | null => {
    if (availableQuizQuestions.length === 0) return null;

    // Get the selected term objects
    const allTerms = selectedSubject === 'macro' ? apMacroTerms : apMicroTerms;
    const selectedTermObjects = Array.from(selectedTerms)
      .map(termId => allTerms.find(t => t.id === termId))
      .filter(Boolean) as KeyTerm[];

    if (selectedTermObjects.length === 0) return availableQuizQuestions[0];

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

      return { question, score };
    });

    // Sort by score and return the best match
    scoredQuestions.sort((a, b) => b.score - a.score);
    const bestMatch = scoredQuestions[0];
    
    return bestMatch ? bestMatch.question : availableQuizQuestions[0];
  };

  const handleMakeQuiz = () => {
    const question = findMostRelevantQuestion();
    if (question) {
      setQuizQuestion(question);
      setSelectedQuizAnswer(null);
      setShowQuizModal(true);
    }
  };

  const handleQuizAnswerSelect = (answerLetter: string) => {
    setSelectedQuizAnswer(answerLetter);
  };

  const handleQuizSubmit = () => {
    if (quizQuestion && selectedQuizAnswer) {
      // Mark question as answered
      setAnsweredQuizQuestions(prev => new Set(prev).add(quizQuestion.id));
      // Remove from available questions (will be handled by useEffect)
      
      // If there are more questions, show the next one
      const remainingQuestions = availableQuizQuestions.filter(q => q.id !== quizQuestion.id);
      if (remainingQuestions.length > 0) {
        // Find the next most relevant question
        const nextQuestion = findMostRelevantQuestion();
        if (nextQuestion && nextQuestion.id !== quizQuestion.id) {
          setQuizQuestion(nextQuestion);
          setSelectedQuizAnswer(null);
        } else {
          // Fallback to first remaining question
          setQuizQuestion(remainingQuestions[0]);
          setSelectedQuizAnswer(null);
        }
      } else {
        // No more questions, close modal
        setShowQuizModal(false);
        setQuizQuestion(null);
        setSelectedQuizAnswer(null);
      }
    }
  };

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
  let unitKeyTerms: KeyTerm[] = selectedSubject === 'macro' 
    ? apMacroTerms.filter(term => term.unit === activeUnitNum)
    : apMicroTerms.filter(term => term.unit === activeUnitNum);
  
  let unitWhiteboards: WhiteboardImage[] = selectedSubject === 'macro'
    ? getUnitWhiteboards(activeUnitNum)
    : allContentWhiteboards.filter(img => img.subject === subjectFilter && img.unit === activeUnitNum);

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


  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <div className="max-w-7xl mx-auto px-4 py-12 mt-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            <span className={themeColor === 'blue' ? 'text-blue-500' : 'text-green-500'}>AP {selectedSubject === 'macro' ? 'Macro' : 'Micro'}</span> Unit Cheat Sheets
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">Key terms, formulas, and graphs for every unit.</p>
        </div>

        {/* Unit Navigation Tabs */}
        <div className="mb-8 border-b border-gray-200">
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
        </div>

        {/* Unit Practice Test Banner */}
        {(() => {
          const currentUnit = unitsToDisplay.find(u => u.number === activeUnitNum);
          const unitPrice = currentUnit?.price || 4.99;
          const isMicro = selectedSubject === 'micro';
          
          return (
            <div className={`mb-8 rounded-xl p-6 shadow-md border ${
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
                    href={`/purchase/mcq-practice?units=${activeUnitNum}&total=${unitPrice.toFixed(2)}&bundle=false`}
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
                          className={`p-4 bg-white border rounded-lg scroll-mt-20 cursor-pointer transition-all duration-200 relative ${
                            isSelected 
                              ? 'border-blue-500 border-2 shadow-md transform scale-[0.98] bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                          }`}
                        >
                          {/* Selection Indicator */}
                          {isSelected && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-white" />
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
                                  {whiteboardsToShow.map((image, index) => (
                      <div 
                        key={`${image.id}-${index}`} 
                        className="border rounded-lg shadow-sm overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200 bg-white"
                        onClick={() => openModal(image)}
                      >
                        <div className="relative aspect-video">
                          <Image 
                            src={image.imageUrl} 
                            alt={image.title || `Whiteboard for Lesson ${lessonId}`} 
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          />
                        </div>
                      </div>
                    ))}
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
                      )}
                    </React.Fragment>
                  );
                })}

                {/* Second Checkpoint - After all lessons */}
                {secondHalfCheckpoints.length > 0 && (
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
                )}
              </>
            );
              })()}
        </div>
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

      {/* Make a Quiz Sidebar */}
      <div 
        className={`fixed right-4 top-20 bg-white border border-gray-200 rounded-lg shadow-lg z-40 transform transition-all duration-300 ease-in-out cursor-pointer ${
          selectedTerms.size >= 3 
            ? 'w-40 p-4 opacity-100 translate-x-0 hover:bg-gray-50' 
            : 'w-0 p-0 opacity-0 translate-x-full overflow-hidden'
        }`}
        onClick={handleMakeQuiz}
      >
        <h2 className="text-base font-bold text-gray-900 whitespace-nowrap">Make a Quiz</h2>
      </div>

      {/* Quiz Modal */}
      {showQuizModal && quizQuestion && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowQuizModal(false);
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowQuizModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors z-10 bg-white rounded-full p-2 shadow-md"
              aria-label="Close Quiz"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quiz Question</h2>
              
              <div className="space-y-4">
                <p className="text-lg font-medium text-gray-800 leading-relaxed">
                  {quizQuestion.question}
                </p>

                {quizQuestion.image && (
                  <div className="my-4 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={typeof quizQuestion.image === 'string' ? quizQuestion.image : (quizQuestion.image as any).src} 
                      alt="Question related image" 
                      className="max-h-60 w-auto mx-auto object-contain"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  {quizQuestion.options.map((option, index) => {
                    const optionLetter = String.fromCharCode(65 + index);
                    const isCorrect = optionLetter === quizQuestion.correctAnswer;
                    const isSelected = selectedQuizAnswer === optionLetter;
                    const showResult = selectedQuizAnswer !== null;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => !showResult && handleQuizAnswerSelect(optionLetter)}
                        disabled={showResult}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          showResult
                            ? isCorrect
                              ? 'bg-green-50 border-green-400 text-green-800'
                              : isSelected && !isCorrect
                              ? 'bg-red-50 border-red-400 text-red-800'
                              : 'bg-gray-50 border-gray-200 text-gray-700'
                            : isSelected
                            ? 'bg-blue-50 border-blue-400 text-blue-800 hover:bg-blue-100'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold ${
                            showResult
                              ? isCorrect
                                ? 'bg-green-100 border-green-400 text-green-700'
                                : isSelected && !isCorrect
                                ? 'bg-red-100 border-red-400 text-red-700'
                                : 'bg-white border-gray-300 text-gray-500'
                              : isSelected
                              ? 'bg-blue-100 border-blue-400 text-blue-700'
                              : 'bg-white border-gray-300 text-gray-600'
                          }`}>
                            {optionLetter}
                          </span>
                          <span className="flex-1">{option}</span>
                          {showResult && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          )}
                          {showResult && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedQuizAnswer && quizQuestion.explanation && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Explanation</h3>
                    <p className="text-gray-700">{quizQuestion.explanation}</p>
                  </div>
                )}

                {/* Submit/Next Button */}
                {selectedQuizAnswer && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleQuizSubmit}
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors shadow-md ${
                        themeColor === 'blue'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {availableQuizQuestions.length > 1 ? 'Next Question' : 'Done'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 