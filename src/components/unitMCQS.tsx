'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Question as QuestionType } from '@/data/questionBanks/types';
import { Unit } from '@/data/cheatSheets';
import { Check, X, Brain, FileText, ChevronDown, Triangle, Loader2, RefreshCw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Clipboard, Lock, Play, Minus, Menu } from 'lucide-react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import html2canvas from 'html2canvas';
import { videos as allVideos, Video } from '@/data/videos';
import { QuestionWithKeyTerms } from './QuestionWithKeyTerms';
import { keyTerms as apMacroTerms } from '@/data/apMacroTerms';
import { keyTerms as apMicroTerms } from '@/data/apMicroTerms';
import { KeyTerm } from '@/data/allContent';
import { logger } from '@/utils/logger';

import dojoIcon from "../../public/images/dojoIcon.png";

// Type definition consistent with the parent page
interface AnsweredQuestionState {
  selectedLetter: string;
  isCorrect: boolean;
}

interface UnitMCQSProps {
  currentUnit: number;
  currentQuestionIndex: number;
  isLoggedIn: boolean;
  onAnswer: (questionId: number, answerLetter: string, isCorrect: boolean, lessonIDS: string[]) => void; 
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  onQuestionSelect: (index: number) => void;
  onUnitChange: (unitId: number) => void;
  answeredQuestions: Record<number, AnsweredQuestionState>; 
  units: Unit[];
  dojoProgress: number;
  correctStreak: number;
  isWeakestUnitsMode: boolean;
  totalQuestions: number;
  unitName: string;
  questions: QuestionType[];
  subject: 'macro' | 'micro';
  practiceUnitIds: number[];
  isParentModalOpen: boolean;
  isSidebar?: boolean; // New optional prop
  hasTestModeAccess: boolean;
  onEnterTestMode: () => void;
}

interface QuestionCardProps {
  question: QuestionType;
  currentIndex: number;
  totalQuestions: number;
  onAnswerSelect: (questionId: number, answerLetter: string, answerText: string, lessonIDS: string[]) => void;
  initialSelectedLetter?: string; 
  isAnswered: boolean;
  aiExplanation?: string;
  isLoadingAI: boolean;
  isLoggedIn: boolean;
  signup: (email: string, password: string, isSubscribed: boolean) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  dojoProgress: number;
  correctStreak: number;
  highlightedIndex: number | null;
  isParentModalOpen: boolean;
  enableUnderlining?: boolean;
  enableStrikethrough?: boolean;
}

const QuestionCard = ({ 
  question, 
  currentIndex,
  totalQuestions,
  onAnswerSelect,
  initialSelectedLetter, 
  isAnswered,
  aiExplanation,
  isLoadingAI,
  isLoggedIn,
  signup,
  login,
  dojoProgress,
  correctStreak,
  highlightedIndex,
  isParentModalOpen,
  enableUnderlining = true,
  enableStrikethrough = true
}: QuestionCardProps) => {
  const letterToIndex = (letter?: string): number | null => {
    if (!letter) return null;
    const index = letter.charCodeAt(0) - 65;
    return index >= 0 && index < question.options.length ? index : null;
  };

  const initialSelectedIndex = letterToIndex(initialSelectedLetter);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(initialSelectedIndex);
  const [isSubmitted, setIsSubmitted] = useState(isAnswered);
  const [struckThroughOptions, setStruckThroughOptions] = useState<Set<number>>(new Set());

  // --- State for Overlay --- 
  const [overlayMode, setOverlayMode] = useState<'signup' | 'login'>('signup');
  
  // Signup Form State
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Password validation states (used by signup form)
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  // Add state for password requirement visibility
  const [showPasswordReqs, setShowPasswordReqs] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  // Effect to sync internal state and reset forms/validation/mode
  useEffect(() => {
    logger.debug(`[QuestionCard] useEffect triggered for question ${question.id}, isAnswered: ${isAnswered}, initialSelectedLetter: ${initialSelectedLetter}`);
    const currentSelectedIndex = letterToIndex(initialSelectedLetter);
    setSelectedAnswerIndex(currentSelectedIndex);
    // Ensure isSubmitted matches isAnswered state - if not answered, definitely not submitted
    setIsSubmitted(isAnswered && !!initialSelectedLetter);
    setShowInternalOverlay(false);
    setStruckThroughOptions(new Set()); // Reset strikethrough options when question changes
    
    // Reset common overlay state
    setOverlayMode('signup'); // Default to signup when question changes

    // Reset signup form
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword(''); 
    setSignupError(null);
    setSignupLoading(false);
    setHasMinLength(false);
    setHasUpperCase(false);
    setHasLowerCase(false);
    setHasNumber(false);
    setPasswordsMatch(false);

    // Reset login form
    setLoginEmail('');
    setLoginPassword('');
    setLoginError(null);
    setLoginLoading(false);

    setShowPasswordReqs(false);
  }, [question.id, initialSelectedLetter, isAnswered]);

  // Effect for password validation (signup only)
  useEffect(() => {
    if (overlayMode === 'signup') {
      setHasMinLength(signupPassword.length >= 8);
      setHasUpperCase(/[A-Z]/.test(signupPassword));
      setHasLowerCase(/[a-z]/.test(signupPassword));
      setHasNumber(/[0-9]/.test(signupPassword));
      setPasswordsMatch(signupPassword === signupConfirmPassword && signupPassword !== '');
    }
  }, [signupPassword, signupConfirmPassword, overlayMode]);

  const isValidSignupPassword = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && passwordsMatch;

  const correctAnswerIndex = letterToIndex(question.correctAnswer);

  const handleAnswerSelect = (index: number) => {
    if (isSubmitted) {
      logger.warn(`[QuestionCard] Blocked answer selection: question ${question.id} already submitted (isSubmitted: ${isSubmitted}, isAnswered: ${isAnswered})`);
      return;
    }
    
    // If option is struck through, just remove strikethrough and don't submit
    if (struckThroughOptions.has(index)) {
      setStruckThroughOptions(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
      return;
    }
    
    logger.debug(`[QuestionCard] Answer selected for question ${question.id}, index ${index}, isLoggedIn: ${isLoggedIn}, currentIndex: ${currentIndex}`);
    setSelectedAnswerIndex(index);
    setIsSubmitted(true);
    try {
      onAnswerSelect(
        question.id,
        String.fromCharCode(65 + index),
        question.options[index],
        question.lessonIDS
      );
    } catch (error) {
      console.error(`[QuestionCard] Error in onAnswerSelect for question ${question.id}:`, error);
      // Reset state on error so user can try again
      setIsSubmitted(false);
      setSelectedAnswerIndex(null);
    }
  };



  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);
    if (!isValidSignupPassword) {
      setSignupError('Please ensure all password requirements are met.');
      return;
    }
    setSignupLoading(true);
    try {
      await signup(signupEmail, signupPassword, false);
      // Success will trigger auth context update and re-render
    } catch (err: any) {
      console.error("Signup failed:", err);
      // Map Firebase errors to user-friendly messages
      switch (err.code) {
        case 'auth/invalid-email':
          setSignupError('Please enter a valid email address');
          break;
        case 'auth/email-already-in-use':
          setSignupError('An account already exists with this email');
          break;
        case 'auth/weak-password':
          setSignupError('Password is too weak. Please choose a stronger one.');
          break;
        default:
          setSignupError(err.message || "Failed to create account. Please try again.");
      }
    } finally {
      setSignupLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    try {
      await login(loginEmail, loginPassword);
      // Success will trigger auth context update and re-render
    } catch (err: any) {
      console.error("Login failed:", err);
      // Map Firebase errors to user-friendly messages
      switch (err.code) {
        case 'auth/invalid-email':
          setLoginError('Please enter a valid email address.');
          break;
        case 'auth/user-not-found':
        case 'auth/invalid-credential': // Catch newer Firebase error code
          setLoginError('No account found with this email or password.');
          break;
        case 'auth/wrong-password':
          setLoginError('Incorrect password. Please try again.');
          break;
        default:
          setLoginError(err.message || "Failed to log in. Please try again.");
      }
    } finally {
      setLoginLoading(false);
    }
  };

  // Effect to hide internal overlay if parent modal is closed
  useEffect(() => {
    if (!isParentModalOpen) {
      setShowInternalOverlay(false);
    }
  }, [isParentModalOpen]);

  // Function to capture the card as an image
  const handleSaveToBoard = async () => {
    if (!cardRef.current) {
      console.error("Card element ref not found for capture.");
      alert("Failed to capture card: Element not ready.");
      return;
    }

    try {
      console.log("Attempting to capture card element...");
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true, // Allow capturing external images if any are present
        logging: true, // Enable logging for debugging
        // Optional: Set background color if transparency is an issue
        // backgroundColor: '#ffffff', 
      });
      logger.debug("Canvas generated.");

      const imageDataUrl = canvas.toDataURL('image/png');
      logger.debug("Captured Image Data URL (first 100 chars):", imageDataUrl.substring(0, 100) + "...");

      // --- TEMPORARY FRONTEND ACTION --- 
      // alert(`Question Card Captured! ...`); // Optional: Remove or keep the alert

      // --- Save image data to localStorage (Temporary Solution) ---
      try {
         // Retrieve existing images or initialize an empty array
         const boardBlocksRaw = localStorage.getItem('tempBoardBlocks');
         let boardBlocks = boardBlocksRaw ? JSON.parse(boardBlocksRaw) : [];
         
         // Ensure it's an array (handle potential data corruption)
         if (!Array.isArray(boardBlocks)) {
             logger.warn('localStorage tempBoardBlocks was not an array, resetting.');
             boardBlocks = [];
         }

         // Define a structure for the image block
         const newImageBlock = {
             id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`, // Unique ID
             type: 'image_capture', // Identify block type
             imageUrl: imageDataUrl, // The captured Base64 data
             title: `Question ${question.id} Capture`, // Simple title
             userId: 'local', // Indicate it's local
             createdAt: new Date().toISOString() // Add timestamp
         };

         // Add the new block
         boardBlocks.push(newImageBlock);

         // Optional: Limit the number of stored images to prevent localStorage bloat
         const MAX_LOCAL_BLOCKS = 10;
         if (boardBlocks.length > MAX_LOCAL_BLOCKS) {
             boardBlocks = boardBlocks.slice(-MAX_LOCAL_BLOCKS); // Keep only the last X items
         }

         // Save back to localStorage
         localStorage.setItem('tempBoardBlocks', JSON.stringify(boardBlocks));
         logger.debug(`Saved image block ${newImageBlock.id} to localStorage (temporary)`);
         alert('Question Card image saved to temporary local board!'); // Give feedback

      } catch (e) {
         console.error("Error saving captured image to localStorage:", e);
         alert("Could not save image to temporary local board storage.");
      }

    } catch (error) {
      console.error('Error capturing QuestionCard with html2canvas:', error);
      alert("Failed to capture QuestionCard image. See console for details.");
    }
  };

  const [showInternalOverlay, setShowInternalOverlay] = useState(false);
  const [showDojoDrill, setShowDojoDrill] = useState(false);
  const [dojoDrillVideo, setDojoDrillVideo] = useState<Video | null>(null);

  // Find matching video for the lesson
  const findVideoForLesson = (lessonIds: string[]): Video | null => {
    if (!lessonIds || lessonIds.length === 0) return null;
    const subjectFilter = question.subject === 'ap_macroeconomics' ? 'AP Macroeconomics' : 'AP Microeconomics';
    for (const lessonId of lessonIds) {
      const video = allVideos.find(v => 
        v.subjects.includes(subjectFilter) &&
        v.lessonIDS.includes(lessonId)
      );
      if (video) return video;
    }
    return null;
  };

  const handleTeachMe = () => {
    const video = findVideoForLesson(question.lessonIDS);
    if (video) {
      setDojoDrillVideo(video);
      setShowDojoDrill(true);
    }
  };

  const matchingVideo = findVideoForLesson(question.lessonIDS);

  // Find best matching key term for the question
  const findBestMatchingTerm = (): KeyTerm | null => {
    const allTerms = question.subject === 'ap_macroeconomics' ? apMacroTerms : apMicroTerms;
    
    // Filter terms by subject and unit (prioritize same unit, but also check adjacent units)
    const sameUnitTerms = allTerms.filter(
      term => term.subject === question.subject && term.unit === question.unit
    );
    
    // Also check adjacent units (unit ± 1) for broader matching
    const adjacentUnitTerms = allTerms.filter(
      term => term.subject === question.subject && 
      (term.unit === question.unit - 1 || term.unit === question.unit + 1)
    );

    const relevantTerms = [...sameUnitTerms, ...adjacentUnitTerms];

    if (relevantTerms.length === 0) return null;

    // Combine question text and options for matching
    const searchText = `${question.question} ${question.options.join(' ')}`.toLowerCase();

    // Score each term based on relevance
    const scoredTerms = relevantTerms.map(term => {
      let score = 0;
      const termLower = term.term.toLowerCase();
      const definitionLower = term.definition.toLowerCase();

      // Unit match bonus (same unit gets higher priority)
      if (term.unit === question.unit) {
        score += 10;
      }

      // Exact term match in question (highest priority)
      if (searchText.includes(termLower)) {
        score += 100;
      }

      // Term appears as whole word in question
      const termWordRegex = new RegExp(`\\b${termLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (termWordRegex.test(searchText)) {
        score += 80; // Whole word match is better than substring
      }

      // Term appears in question (case-insensitive partial match)
      const termWords = termLower.split(/\s+/).filter(w => w.length > 2);
      const matchingWords = termWords.filter(word => 
        searchText.includes(word)
      );
      score += matchingWords.length * 15;

      // Check aliases if they exist
      if ((term as any).aliases) {
        (term as any).aliases.forEach((alias: string) => {
          const aliasLower = alias.toLowerCase();
          if (searchText.includes(aliasLower)) {
            score += 60;
          }
          // Whole word alias match
          const aliasRegex = new RegExp(`\\b${aliasLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
          if (aliasRegex.test(searchText)) {
            score += 40;
          }
        });
      }

      // Lesson ID match (bonus for same lesson)
      if (question.lessonIDS.some(lessonId => term.lessonIDs.includes(lessonId))) {
        score += 40;
      }

      // Definition keywords in question (lower priority)
      const definitionWords = definitionLower.split(/\s+/).filter(word => word.length > 4);
      const matchingDefWords = definitionWords.filter(word => searchText.includes(word));
      score += matchingDefWords.length * 3;

      return { term, score };
    });

    // Sort by score and return the best match
    scoredTerms.sort((a, b) => b.score - a.score);
    const bestMatch = scoredTerms[0];
    
    // Only return if score is above threshold (at least some relevance)
    return bestMatch && bestMatch.score >= 25 ? bestMatch.term : null;
  };

  const matchingTerm = findBestMatchingTerm();

  return (
    <>
      <div ref={cardRef} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-8 relative">
        {/* Overlay: Simplified or removed if parent modal is sufficient */} 
        {showInternalOverlay && (
          <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-10 flex items-center justify-center p-4 rounded-lg">
            <div className="text-center">
              <Loader2 className={`h-8 w-8 animate-spin mx-auto mb-4 ${question.subject === 'ap_macroeconomics' ? 'text-blue-600' : 'text-green-600'}`} />
              <p className="text-lg font-semibold text-gray-700">Loading options...</p>
              {/* Or a message like: "Please complete your selection via the plan modal." */}
            </div>
          </div>
        )}

        {/* Main Question Content */}
        <div className="space-y-6"> 
          {/* Question Text */}
          <p className="text-base md:text-lg font-medium font-serif leading-relaxed text-gray-800">
            {enableUnderlining ? (
              <QuestionWithKeyTerms 
                questionText={question.question} 
                unit={question.unit} 
                subject={question.subject}
              />
            ) : (
              question.question
            )}
          </p>

        {/* --- ADDED: Question Image Display --- */}
        {question.image && (
          <div className="my-4 rounded-lg overflow-hidden border border-gray-200">
            <img
              src={typeof question.image === 'string' ? question.image : (question.image as any).src} 
              alt={question.unitName || 'Question related image'} 
              className="max-h-60 w-auto mx-auto object-contain"
            />
          </div>
        )}
        {/* --- End Image Display --- */}

        {isSubmitted && aiExplanation ? (
          // --- Display Explanation Mode ---
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-6">
            {/* Correct Answer Summary */}
             <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Correct Answer</h4>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-green-200 text-green-600 font-medium">
                  {question.correctAnswer}
                </span>
                <span className="font-medium text-gray-900">
                  {question.options[correctAnswerIndex ?? 0]}
                </span>
              </div>
            </div>
            {/* Explanation Box */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Explanation</h4>
              <p className="text-gray-900">{aiExplanation}</p>
            </div>
          </div>
        ) : (
          // --- Display Answer Options Mode ---
          <>
            {/* Answer Options */}
            <div className="space-y-3">
              {question.options.map((option, optIndex) => {
                 const isHighlighted = !isSubmitted && highlightedIndex === optIndex;
                 const isStruckThrough = struckThroughOptions.has(optIndex);
                 const handleStrikethroughToggle = (e: React.MouseEvent) => {
                   e.stopPropagation();
                   setStruckThroughOptions(prev => {
                     const newSet = new Set(prev);
                     if (newSet.has(optIndex)) {
                       newSet.delete(optIndex);
                     } else {
                       newSet.add(optIndex);
                     }
                     return newSet;
                   });
                 };
                 return (
                    <button
                      key={optIndex}
                      onClick={() => handleAnswerSelect(optIndex)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-3 rounded-lg text-sm font-medium transition-all duration-150 border flex items-center gap-3
                        ${isSubmitted ? 
                          (optIndex === correctAnswerIndex ? 'bg-green-50 text-gray-900 shadow-sm border-green-200 cursor-default' : 
                          optIndex === selectedAnswerIndex ? 'bg-red-50 text-gray-900 shadow-sm border-red-200 cursor-default' : 
                          'bg-transparent text-gray-900 border-gray-200 cursor-default') 
                        : isStruckThrough ?
                          'bg-gray-100 border-gray-300 opacity-60 cursor-pointer' // Struck through style - locked but clickable to unlock
                        : isHighlighted ? 
                          'bg-gray-100 border-gray-400 shadow-sm' // Highlight style
                        : 
                          'bg-transparent hover:bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm' // Default non-submitted style
                        }`}
                    >
                       {/* Letter bubble */}
                      <span className={`w-6 h-6 flex items-center justify-center rounded-full border text-xs font-medium flex-shrink-0 ${isSubmitted ? (optIndex === correctAnswerIndex ? 'bg-green-100 border-green-300 text-green-700' : optIndex === selectedAnswerIndex ? 'bg-red-100 border-red-300 text-red-700' : 'bg-white border-gray-300 text-gray-500') : isHighlighted ? 'bg-white border-gray-400 text-gray-700' : 'bg-white border-gray-300 text-gray-600'}`}> 
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                       {/* Option Text - Reduced Size */}
                      <span className={`flex-1 text-sm ${isStruckThrough ? 'line-through text-gray-400' : ''} ${isSubmitted ? 'text-gray-800' : isHighlighted ? 'text-gray-900' : 'text-gray-900'}`}>{option}</span>
                      {/* Strikethrough Button - Only show when enabled and not submitted */}
                      {!isSubmitted && enableStrikethrough && (
                        <button
                          onClick={handleStrikethroughToggle}
                          className="flex-shrink-0 p-1.5 rounded hover:bg-gray-200 transition-colors flex items-center justify-center"
                          title={isStruckThrough ? "Remove strikethrough" : "Strikethrough option"}
                        >
                          <span className="relative inline-block text-sm font-bold text-gray-400" style={{ lineHeight: '1' }}>
                            <span className="relative inline-block">
                              S
                              <span className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-600 transform -translate-y-1/2" style={{ width: '100%' }}></span>
                            </span>
                          </span>
                        </button>
                      )}
                      {/* Feedback Icon */}
                      {isSubmitted && (
                        <div className="flex-shrink-0">
                          {optIndex === correctAnswerIndex
                            ? <Check className="w-5 h-5 text-green-500" />
                            : optIndex === selectedAnswerIndex
                              ? <X className="w-5 h-5 text-red-500" />
                              : null
                          }
                        </div>
                      )}
                    </button>
                 );
                })}
            </div>
            
            
          </>
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
                                <Check className="w-5 h-5 text-green-600 inline-block ml-2" />
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
    </>
  );
};

export function UnitMCQs({ 
  currentUnit, 
  currentQuestionIndex, 
  isLoggedIn,
  onAnswer, 
  onNextQuestion,
  onPreviousQuestion,
  onQuestionSelect,
  onUnitChange,
  answeredQuestions,
  units,
  dojoProgress,
  correctStreak,
  isWeakestUnitsMode,
  totalQuestions,
  unitName,
  questions,
  subject,
  practiceUnitIds,
  isParentModalOpen,
  isSidebar = false, // Default to false
  hasTestModeAccess,
  onEnterTestMode,
}: UnitMCQSProps) {
  const { login, signup, userData, loadingUserData, user, awardXp } = useAuthContext();
  const [aiExplanations, setAiExplanations] = useState<Record<number, string>>({});
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [explanationError, setExplanationError] = useState<string | null>(null);
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
  const [isSwitchingUnit, setIsSwitchingUnit] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const DOUBLE_XP_CHANCE = 0.15;
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [showAiTooltip, setShowAiTooltip] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [enableUnderlining, setEnableUnderlining] = useState(true); // Default ON
  const [enableStrikethrough, setEnableStrikethrough] = useState(true); // Default ON
  const [enableZenMode, setEnableZenMode] = useState(false);
  const [showZenModeHelp, setShowZenModeHelp] = useState(false);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  
  // Store previous state before zen mode
  const prevUnderliningRef = useRef<boolean>(true);
  const prevStrikethroughRef = useRef<boolean>(true);

  // Handle zen mode toggle - disable underlining and strikethrough in zen mode
  useEffect(() => {
    if (enableZenMode) {
      // Save current state before disabling
      prevUnderliningRef.current = enableUnderlining;
      prevStrikethroughRef.current = enableStrikethrough;
      // Disable both features in zen mode
      setEnableUnderlining(false);
      setEnableStrikethrough(false);
      // Show help text when first entering Zen Mode
      setShowZenModeHelp(true);
    } else {
      // Restore to default ON when exiting zen mode
      setEnableUnderlining(true);
      setEnableStrikethrough(true);
      // Hide help text when exiting Zen Mode
      setShowZenModeHelp(false);
    }
  }, [enableZenMode]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUnitDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);





  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswerState = currentQuestion ? answeredQuestions[currentQuestion.id] : undefined;
  const displayUnitId = currentQuestion?.unit ?? currentUnit;



  const handleAnswerSelection = async (questionId: number, answerLetter: string, answerText: string, lessonIDS: string[]) => {
    if (!currentQuestion) {
      console.error(`[handleAnswerSelection] No current question available for questionId ${questionId}`);
      return;
    }

    const isCorrect = answerLetter === currentQuestion.correctAnswer;
    const unitId = currentQuestion.unit; // Get unitId from the question data

    logger.debug(`[handleAnswerSelection] Processing answer for question ${questionId}, answer: ${answerLetter}, correct: ${isCorrect}, user: ${user?.uid || 'not logged in'}`);

    // Award XP for correct answers (100 XP per correct question)
    if (isCorrect && awardXp) {
      logger.debug(`[handleAnswerSelection] Answer is correct! Awarding 100 XP...`);
      try {
        await awardXp(100);
        logger.debug(`[handleAnswerSelection] Successfully awarded 100 XP`);
      } catch (error) {
        console.error(`[handleAnswerSelection] Error awarding XP:`, error);
      }
    } else if (isCorrect && !awardXp) {
      logger.warn(`[handleAnswerSelection] Answer is correct but awardXp function is not available`);
    }

    // Update local state for immediate UI feedback
    onAnswer(questionId, answerLetter, isCorrect, lessonIDS);
    setHighlightedIndex(null);

    // --- Backend Updates (Only if logged in) --- 
    if (user) { 
        
        // 1. Update mcqAnswerStatus Map (via API)
        try {
            logger.debug(`[handleAnswerSelection] Updating MCQ status for question ${questionId}`);
            const statusResponse = await fetch('/api/update-mcq-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.uid,
                    questionId: questionId,
                    isCorrect: isCorrect
                }),
            });
            
            if (!statusResponse.ok) {
                const errorData = await statusResponse.json().catch(() => ({}));
                console.error(`[handleAnswerSelection] Failed to update MCQ status for ${questionId}: ${statusResponse.status}`, errorData);
            } else {
                logger.debug(`[handleAnswerSelection] Successfully updated MCQ status for question ${questionId}`);
            }
        } catch (error) {
            console.error(`[handleAnswerSelection] Error calling /api/update-mcq-status for question ${questionId}:`, error);
        }

        // 2. Update Total XP (via API)
        // (Keep your existing XP calculation and fetch call to /api/update-total-xp here...)
        // If XP logic needs to move here, it would go here.

        // 3. --- >>> Write Detailed Answer to mcqAnswers Subcollection <<< ---
        try {
            logger.debug(`[handleAnswerSelection] Writing detailed answer log for user ${user.uid}, question ${questionId}`);
            const userAnswersColRef = collection(db, 'users', user.uid, 'mcqAnswers');
            const answerData = {
                questionId: questionId,      // Use the actual number ID
                isCorrect: isCorrect,
                unitId: unitId,              // Store the unit ID
                lessonIDS: lessonIDS,        // Store the lesson IDs array
                timestamp: serverTimestamp() // Use Firestore server timestamp
            };
            await addDoc(userAnswersColRef, answerData);
            logger.debug(`[handleAnswerSelection] Successfully wrote detailed answer log for question ${questionId}`);
        } catch (error) {
            console.error(`[handleAnswerSelection] Error writing detailed answer log to Firestore for question ${questionId}:`, error);
            // Don't throw - allow the UI to continue even if logging fails
        }
        // --- >>> End Subcollection Write <<< ---

    } else {
        logger.warn(`[handleAnswerSelection] User not logged in. Skipping backend updates for question ${questionId}.`);
    }
  };

  const handleQuestionSelect = (index: number) => {
    if (index >= 0 && index < totalQuestions) {
        onQuestionSelect(index);
        setHighlightedIndex(null);
    } else {
        logger.warn("Attempted to select invalid question index:", index);
    }
  };

  const handleAIExplanation = () => {
    if (!currentQuestion || !currentAnswerState) return; 
    
    setIsLoadingExplanation(true);
    setExplanationError(null);
    
    setTimeout(() => {
      try {
        const explanation = currentQuestion.explanation;
        if (explanation) {
           setAiExplanations(prev => ({
                ...prev,
                [currentQuestion.id]: explanation
           }));
        } else {
            throw new Error("Explanation is not available for this question."); 
        }
      } catch (error) {
        console.error('Error setting explanation:', error);
        setExplanationError(error instanceof Error ? error.message : 'Failed to get explanation');
      } finally {
        setIsLoadingExplanation(false);
      }
    }, 1500); 
  };

  const proceedToActualNextQuestion = () => {
     if (totalQuestions === 0) return;
     const nextIndex = currentQuestionIndex + 1;
     if (nextIndex >= totalQuestions) {
       handleQuestionSelect(0); // Wrap to start
     } else {
       handleQuestionSelect(nextIndex);
     }
  };

  const handlePreviousQuestion = () => {
    logger.debug("Handling Previous Question Request");
    onPreviousQuestion();
  };

  const handleNextQuestion = () => {
    logger.debug("Handling Next Question Request");
    proceedToActualNextQuestion(); 
  };

  // --- Keyboard Navigation for Zen Mode Only --- 
  useEffect(() => {
    // Only enable keyboard navigation in zen mode
    if (!enableZenMode) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      // Hide help text when any relevant key is pressed
      if (showZenModeHelp && (event.key === 'Escape' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Enter')) {
        setShowZenModeHelp(false);
      }

      // ESC key to exit zen mode
      if (event.key === 'Escape') {
        event.preventDefault();
        setEnableZenMode(false);
        return;
      }

      // Ignore if focused on input/textarea/button or if modal is open
      const target = event.target as HTMLElement;
      if (isParentModalOpen || isSettingsModalOpen || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'BUTTON') {
        return;
      }

      const numOptions = currentQuestion?.options?.length ?? 0;
      if (numOptions === 0) return;

      // Left/Right arrows for navigation between questions
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePreviousQuestion();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNextQuestion();
      } 
      // Up/Down arrows for navigating answer options
      else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlightedIndex(prevIndex => {
          if (prevIndex === null) return numOptions - 1; // Start from last option
          if (prevIndex === 0) return numOptions - 1; // Wrap from first to last
          return prevIndex - 1; // Move up
        });
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlightedIndex(prevIndex => {
          if (prevIndex === null) return 0; // Start from first option
          if (prevIndex === numOptions - 1) return 0; // Wrap from last to first
          return prevIndex + 1; // Move down
        });
      } 
      // Enter key to submit selected answer
      else if (event.key === 'Enter') {
        if (highlightedIndex !== null && !currentAnswerState && currentQuestion) {
          event.preventDefault();
          const letter = String.fromCharCode(65 + highlightedIndex);
          const text = currentQuestion.options[highlightedIndex];
          const lessonIds = currentQuestion.lessonIDS;
          handleAnswerSelection(currentQuestion.id, letter, text, lessonIds);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [enableZenMode, showZenModeHelp, handlePreviousQuestion, handleNextQuestion, isParentModalOpen, isSettingsModalOpen, currentQuestion, highlightedIndex, currentAnswerState, handleAnswerSelection]);

  // --- Hide Header when Zen Mode is Active ---
  useEffect(() => {
    if (enableZenMode) {
      // Add class to body to hide header
      document.body.classList.add('zen-mode-active');
      // Also hide header directly
      const header = document.querySelector('header');
      if (header) {
        (header as HTMLElement).style.display = 'none';
      }
      // Hide any banners below header
      const banners = document.querySelectorAll('[class*="top-16"], [class*="top-20"]');
      banners.forEach(banner => {
        (banner as HTMLElement).style.display = 'none';
      });
    } else {
      // Remove class and restore header
      document.body.classList.remove('zen-mode-active');
      const header = document.querySelector('header');
      if (header) {
        (header as HTMLElement).style.display = '';
      }
      // Restore banners
      const banners = document.querySelectorAll('[class*="top-16"], [class*="top-20"]');
      banners.forEach(banner => {
        (banner as HTMLElement).style.display = '';
      });
    }

    return () => {
      // Cleanup on unmount
      document.body.classList.remove('zen-mode-active');
      const header = document.querySelector('header');
      if (header) {
        (header as HTMLElement).style.display = '';
      }
    };
  }, [enableZenMode]);

  // --- >>> NEW: Sidebar Rendering Logic <<< ---
  if (isSidebar) {
    return (
      <div className="space-y-4">
        {questions.map((question) => {
          const answerState = answeredQuestions[question.id];
          const correctAnswerIndex = question.options.findIndex((opt, index) => String.fromCharCode(65 + index) === question.correctAnswer);

          return (
            <div key={question.id} className="p-4 border-b border-gray-200 last:border-b-0">
              <p className="text-sm font-medium text-gray-800 mb-3">
                {enableUnderlining ? (
                  <QuestionWithKeyTerms 
                    questionText={question.question} 
                    unit={question.unit} 
                    subject={question.subject}
                  />
                ) : (
                  question.question
                )}
              </p>
              <div className="space-y-2">
                {question.options.map((option, optIndex) => {
                  const letter = String.fromCharCode(65 + optIndex);
                  const isSelected = answerState?.selectedLetter === letter;
                  const isCorrect = optIndex === correctAnswerIndex;

                  let buttonClass = 'w-full text-left p-2 rounded-md text-xs border flex items-center gap-2 transition-colors ';
                  if (answerState) {
                    // Answered
                    if (isCorrect) {
                      buttonClass += 'bg-green-50 border-green-200 text-gray-900 cursor-default';
                    } else if (isSelected) {
                      buttonClass += 'bg-red-50 border-red-200 text-gray-900 cursor-default';
                    } else {
                      buttonClass += 'bg-gray-50 border-gray-100 text-gray-500 cursor-default';
                    }
                  } else {
                    // Not answered
                    buttonClass += 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700';
                  }

                  return (
                    <button
                      key={optIndex}
                      disabled={!!answerState}
                      onClick={() => onAnswer(question.id, letter, isCorrect, question.lessonIDS)}
                      className={buttonClass}
                    >
                      <span className={`w-5 h-5 flex items-center justify-center rounded-full border text-xs font-semibold flex-shrink-0 
                        ${answerState && isCorrect ? 'bg-green-100 border-green-300 text-green-700' : ''}
                        ${answerState && isSelected && !isCorrect ? 'bg-red-100 border-red-300 text-red-700' : ''}
                        ${!answerState ? 'bg-white border-gray-300 text-gray-600' : ''}
                      `}>
                        {letter}
                      </span>
                      <span className="flex-1">{option}</span>
                      {answerState && isCorrect && <Check className="w-4 h-4 text-green-500" />}
                      {answerState && isSelected && !isCorrect && <X className="w-4 h-4 text-red-500" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  // --- >>> END: Sidebar Rendering Logic <<< ---

  return (
    <div className={`${enableZenMode ? 'fixed inset-0 flex items-center justify-center bg-gray-50' : 'container mx-auto px-4 pt-4 pb-12 relative'}`}>
      {/* Zen Mode Help Text - Top Left */}
      {enableZenMode && showZenModeHelp && (
        <div className="fixed top-4 left-4 z-50 text-sm text-gray-400 font-medium space-y-1 pointer-events-none">
          <div>ESC to exit</div>
          <div>← → to change question</div>
          <div>↑ ↓ to change answer</div>
          <div>ENTER to submit</div>
        </div>
      )}
      
      {/* Zen Mode Settings Button - Top Right of Main Content */}
      {enableZenMode && (
        <div className="fixed top-4 right-4 z-40">
          <div className="relative">
            <button
              ref={settingsButtonRef}
              onClick={() => setIsSettingsModalOpen(true)}
              className="p-3 rounded-lg transition-all hover:scale-110 hover:opacity-80"
              aria-label="Open settings"
            >
              <Image 
                src={subject === 'macro' ? "/images/sliderBlue.svg" : "/images/sliderGreen.svg"} 
                alt="Settings" 
                width={28} 
                height={28}
                className="w-7 h-7"
                style={{
                  transform: 'scale(1.4)',
                  filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))'
                }}
              />
            </button>
            
            {/* Settings Modal - Positioned under button */}
            {isSettingsModalOpen && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setIsSettingsModalOpen(false)}
                />
                {/* Modal */}
                <div 
                  className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl w-80 p-6 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsSettingsModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label="Close settings"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Customize your Dojo Experience</h2>
                  
                  <div className="space-y-3">
                    {/* Underline Key Terms - Item 1 */}
                    <label className="flex items-center justify-between p-4 rounded-lg border-2 border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors">
                      <span className="text-gray-900 font-bold text-base">Underline Key Terms</span>
                      <input
                        type="checkbox"
                        checked={enableUnderlining}
                        onChange={(e) => setEnableUnderlining(e.target.checked)}
                        className={`w-5 h-5 rounded focus:ring-2 ${
                          subject === 'macro' 
                            ? 'text-blue-600 focus:ring-blue-500' 
                            : 'text-green-600 focus:ring-green-500'
                        }`}
                        style={{
                          accentColor: subject === 'macro' ? '#2563eb' : '#22c55e'
                        }}
                      />
                    </label>

                    {/* Strikethrough - Item 2 */}
                    <label className="flex items-center justify-between p-4 rounded-lg border-2 border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors">
                      <span className="text-gray-900 font-bold text-base">Strikethrough</span>
                      <input
                        type="checkbox"
                        checked={enableStrikethrough}
                        onChange={(e) => setEnableStrikethrough(e.target.checked)}
                        className={`w-5 h-5 rounded focus:ring-2 ${
                          subject === 'macro' 
                            ? 'text-blue-600 focus:ring-blue-500' 
                            : 'text-green-600 focus:ring-green-500'
                        }`}
                        style={{
                          accentColor: subject === 'macro' ? '#2563eb' : '#22c55e'
                        }}
                      />
                    </label>

                    {/* Zen Mode / Standard Mode - Link */}
                    <div className="p-4 rounded-lg border-2 border-gray-300">
                      <button
                        onClick={() => {
                          setEnableZenMode(!enableZenMode);
                          setIsSettingsModalOpen(false);
                        }}
                        className={`w-full text-left font-bold text-base ${
                          subject === 'macro' ? 'text-blue-500' : 'text-green-500'
                        } hover:opacity-80 transition-opacity`}
                      >
                        {enableZenMode ? 'Standard Mode' : 'Zen Mode'}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Use Flexbox for columns */}
      {enableZenMode ? (
        /* Zen Mode: Centered Question Card Only */
        <div className="w-full max-w-4xl mx-auto px-4 z-10">
          {currentQuestion && (
            <div className="transform scale-110">
              <div className="bg-white rounded-lg border-2 border-gray-300 shadow-2xl p-1">
                <div className="bg-white rounded-lg">
                  <QuestionCard 
                    key={`${currentUnit}-${currentQuestion.id}`} 
                    question={currentQuestion} 
                    currentIndex={currentQuestionIndex}
                    onAnswerSelect={handleAnswerSelection}
                    initialSelectedLetter={currentAnswerState?.selectedLetter}
                    isAnswered={!!currentAnswerState} 
                    aiExplanation={aiExplanations[currentQuestion.id]}
                    isLoadingAI={isLoadingExplanation} 
                    isLoggedIn={isLoggedIn}
                    signup={signup}
                    login={login}
                    dojoProgress={dojoProgress}
                    correctStreak={correctStreak}
                    totalQuestions={totalQuestions}
                    highlightedIndex={highlightedIndex}
                    isParentModalOpen={isParentModalOpen}
                    enableUnderlining={enableUnderlining}
                    enableStrikethrough={enableStrikethrough}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Normal Mode: Sidebar Layout */
        <div className="flex flex-col lg:flex-row gap-6 lg:items-stretch">
          {/* Left Column: Question Card */}
          <div className="w-full lg:w-3/5">
            {currentQuestion && (
              <QuestionCard 
                key={`${currentUnit}-${currentQuestion.id}`} 
                question={currentQuestion} 
                currentIndex={currentQuestionIndex}
                onAnswerSelect={handleAnswerSelection}
                initialSelectedLetter={currentAnswerState?.selectedLetter}
                isAnswered={!!currentAnswerState} 
                aiExplanation={aiExplanations[currentQuestion.id]}
                isLoadingAI={isLoadingExplanation} 
                isLoggedIn={isLoggedIn}
                signup={signup}
                login={login}
                dojoProgress={dojoProgress}
                correctStreak={correctStreak}
                totalQuestions={totalQuestions}
                highlightedIndex={highlightedIndex}
                isParentModalOpen={isParentModalOpen}
                enableUnderlining={enableUnderlining}
                enableStrikethrough={enableStrikethrough}
              />
            )}
          </div>

          {/* Right Column: Controls and Resources */}
          <div className="w-full lg:w-2/5 bg-white rounded-lg shadow-md border border-gray-200 p-4 lg:p-6 flex flex-col h-full">
          {/* Top Section: Headline, Tags, Navigation */}
          <div className="mb-6"> {/* Reduced bottom margin */} 
            <div className="flex items-center justify-between gap-4 mb-3"> {/* Added justify-between and bottom margin */} 
              <div className="flex items-center gap-4">
                <h3 className="font-extrabold tracking-tight text-gray-900 text-2xl">
                    <span className={subject === 'macro' ? 'text-blue-600' : 'text-green-600'}>Unit MCQ</span> Practice
                </h3>
                {/* Subject Pill */}
                <span className={`px-3 py-1 rounded-md text-sm font-medium bg-gray-100 ${
                  subject === 'macro' ? 'text-blue-600' : 'text-green-600'
                }`}>
                  AP {subject === 'macro' ? 'Macro' : 'Micro'}
                </span>
              </div>
              
              {/* Settings Button */}
              <div className="relative">
                <button
                  ref={settingsButtonRef}
                  onClick={() => setIsSettingsModalOpen(true)}
                  className="p-3 rounded-lg transition-all hover:scale-110 hover:opacity-80"
                  aria-label="Open settings"
                >
                  <Image 
                    src={subject === 'macro' ? "/images/sliderBlue.svg" : "/images/sliderGreen.svg"} 
                    alt="Settings" 
                    width={28} 
                    height={28}
                    className="w-7 h-7"
                    style={{
                      transform: 'scale(1.4)',
                      filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))'
                    }}
                  />
                </button>
                
                {/* Settings Modal - Positioned under button */}
                {isSettingsModalOpen && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 bg-black bg-opacity-50 z-40"
                      onClick={() => setIsSettingsModalOpen(false)}
                    />
                    {/* Modal */}
                    <div 
                      className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl w-80 p-6 z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setIsSettingsModalOpen(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors"
                        aria-label="Close settings"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      
                      <h2 className="text-xl font-bold text-gray-900 mb-6">Customize your Dojo Experience</h2>
                      
                      <div className="space-y-3">
                        {/* Underline Key Terms - Item 1 */}
                        <label className="flex items-center justify-between p-4 rounded-lg border-2 border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors">
                          <span className="text-gray-900 font-bold text-base">Underline Key Terms</span>
                          <input
                            type="checkbox"
                            checked={enableUnderlining}
                            onChange={(e) => setEnableUnderlining(e.target.checked)}
                            className={`w-5 h-5 rounded focus:ring-2 ${
                              subject === 'macro' 
                                ? 'text-blue-600 focus:ring-blue-500' 
                                : 'text-green-600 focus:ring-green-500'
                            }`}
                            style={{
                              accentColor: subject === 'macro' ? '#2563eb' : '#22c55e'
                            }}
                          />
                        </label>

                        {/* Strikethrough - Item 2 */}
                        <label className="flex items-center justify-between p-4 rounded-lg border-2 border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors">
                          <span className="text-gray-900 font-bold text-base">Strikethrough</span>
                          <input
                            type="checkbox"
                            checked={enableStrikethrough}
                            onChange={(e) => setEnableStrikethrough(e.target.checked)}
                            className={`w-5 h-5 rounded focus:ring-2 ${
                              subject === 'macro' 
                                ? 'text-blue-600 focus:ring-blue-500' 
                                : 'text-green-600 focus:ring-green-500'
                            }`}
                            style={{
                              accentColor: subject === 'macro' ? '#2563eb' : '#22c55e'
                            }}
                          />
                        </label>

                        {/* Zen Mode / Standard Mode - Link */}
                        <div className="p-4 rounded-lg border-2 border-gray-300">
                          <button
                            onClick={() => {
                              setEnableZenMode(!enableZenMode);
                              setIsSettingsModalOpen(false);
                            }}
                            className={`w-full text-left font-bold text-base ${
                              subject === 'macro' ? 'text-blue-500' : 'text-green-500'
                            } hover:opacity-80 transition-opacity`}
                          >
                            {enableZenMode ? 'Standard Mode' : 'Zen Mode'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* --- Unit Tags --- */}
            {practiceUnitIds && practiceUnitIds.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4"> {/* Container for tags */} 
                    {practiceUnitIds.map(unitId => (
                        <span key={unitId} className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-md">
                            Unit {unitId}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex gap-2 mt-4">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`flex-1 p-2 rounded-md font-semibold text-sm transition-colors text-white disabled:bg-gray-300 disabled:cursor-not-allowed ${subject === 'macro' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}`}
              >
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === totalQuestions - 1 || totalQuestions === 0}
                className={`flex-1 p-2 rounded-md font-semibold text-sm transition-colors text-white disabled:bg-gray-300 disabled:cursor-not-allowed ${subject === 'macro' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}`}
              >
                Next
              </button>
            </div>
          </div>

          {/* Middle Section: Study Resources (Takes remaining space) */}
          <div className="space-y-3 flex-grow"> {/* Added flex-grow */}
             {/* Reduced heading size */}
             <h3 className="font-extrabold tracking-tight text-gray-900 text-lg mb-3">Study Resources</h3>
            

            
            {/* Study Guide Link - Reduced padding */} 
            {(() => {
              const isLocked = false;
              if (isLocked) {
                return (
                  <div className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 group block opacity-60">
                    <div className="flex items-center gap-3 justify-start">
                      <div className="p-1.5 rounded-lg bg-gray-200 text-gray-400"> {/* Reduced icon padding */} 
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-sm text-gray-500"> {/* Reduced text size */} 
                        Unit {displayUnitId} Study Guide (Coming Soon)
                      </span>
                    </div>
                  </div>
                );
              }
              return (
                <a
                  href={`/unit/${displayUnitId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 bg-white hover:bg-gray-50 group block"
                >
                   <div className="flex items-center gap-3 justify-start">
                     <div className="p-1.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-200 transition-colors"> {/* Reduced icon padding */} 
                       <FileText className="w-5 h-5" />
                     </div>
                     <span className="font-semibold text-sm text-gray-900"> {/* Reduced text size */} 
                       Unit {displayUnitId} Study Guide
                     </span>
                   </div>
                </a>
              );
            })()}

            {/* Test Mode CTA */}
            {currentUnit > 0 && (
              <div className="w-full p-3 rounded-lg border border-gray-200 bg-white flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Test Mode</p>
                  <p className="text-xs text-gray-600">
                    Timed, exam-style practice for Unit {displayUnitId}.
                  </p>
                </div>
                <button
                  onClick={onEnterTestMode}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                    hasTestModeAccess
                      ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-500 border-gray-200 cursor-pointer hover:bg-gray-100'
                  }`}
                >
                  {hasTestModeAccess ? (
                    <>Enter Test</>
                  ) : (
                    <>
                      <Lock className="w-3 h-3" />
                      <span>Locked</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Video Lessons - Removed: Now using "Teach Me..." button on question card */}

            {/* AI Explanation Button - Reduced padding */}
            <div 
               className="relative" 
               onMouseEnter={() => { if (!currentAnswerState) setShowAiTooltip(true); }}
               onMouseLeave={() => setShowAiTooltip(false)}
            >
              <button
                onClick={handleAIExplanation}
                disabled={!currentAnswerState}
                className={`w-full p-3 rounded-lg border transition-all duration-200 bg-white group relative
                  ${explanationError ? 'border-red-200 hover:border-red-300' : 'border-gray-200 hover:border-gray-300'} 
                  hover:bg-gray-50
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white`}
              >
                <div className="flex items-center gap-3 justify-start">
                  <div className={`p-1.5 rounded-lg text-white transition-colors ${explanationError ? 'bg-red-500 group-hover:bg-red-600' : subject === 'macro' ? 'bg-blue-500 group-hover:bg-blue-600' : 'bg-green-500 group-hover:bg-green-600'} group-disabled:bg-gray-400`}>
                    {isLoadingExplanation ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Brain className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`font-semibold text-sm text-left ${explanationError ? 'text-red-600' : 'text-gray-900'} group-disabled:text-gray-500`}>
                    Explain with AI Dojo
                  </span>
                </div>
              </button>

              {/* Tooltip */}
              {showAiTooltip && (
                 <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-1.5 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                   Choose an answer before using AI Dojo
                   <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
                 </div>
              )}
            </div>
            
             {/* Conditional Error Message */} 
             {explanationError && (
               <div className="px-3 py-1.5 bg-red-50 border border-red-200 rounded-md"> {/* Reduced padding */} 
                 <p className="text-xs text-red-600"> {/* Reduced text size */} 
                   {explanationError}
                 </p>
               </div>
             )}

          </div>

          {/* Footer Section: Change Units Link */}
          <div className="mt-auto pt-6"> {/* Increased top padding */} 
             {/* Change Units Link - Adjusted size/styling */}
             <Link 
                 href={`/select-practice-units?subject=${subject}`}
                 className="inline-flex items-center justify-center w-full text-base text-gray-900 hover:underline" /* Increased size */ 
             >
                 <RefreshCw className={`w-5 h-5 mr-2 ${subject === 'macro' ? 'text-blue-600' : 'text-green-600'}`} /> 
                 Change Units
             </Link>
          </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Corrected styles string literal
const styles = ` 
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-slide-down {
    animation: slideDown 0.3s ease-out forwards;
  }

  @keyframes pulse-intense {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }

  .animate-pulse-intense {
    animation: pulse-intense 1s ease-in-out infinite;
  }

  @keyframes pulse-normal {
    0% { opacity: 0.7; }
    50% { opacity: 1; }
    100% { opacity: 0.7; }
  }

  .animate-pulse-normal {
    animation: pulse-normal 1.5s ease-in-out infinite;
  }

  @keyframes progress-pulse {
    0% { transform: scaleX(1); }
    50% { transform: scaleX(1.1); }
    100% { transform: scaleX(1); }
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'progress-pulse-styles';
  if (!document.getElementById(styleSheet.id)) {
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
}
