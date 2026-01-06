'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Question as QuestionType } from '@/data/questionBanks/types';
import { Unit } from '@/data/cheatSheets';
import { Check, X, Brain, FileText, ChevronDown, Triangle, Loader2, RefreshCw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Clipboard, Lock, Play, Minus, Book, Lightbulb, Calculator, Pen, Strikethrough, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { getBeltProgress } from '@/lib/beltSystem';
import { getSubjectXP } from '@/hooks/useUserProgress';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import html2canvas from 'html2canvas';
import { videos as allVideos, Video } from '@/data/videos';
import { QuestionWithKeyTerms } from './QuestionWithKeyTerms';
import { keyTerms as apMacroTerms } from '@/data/apMacroTerms';
import { keyTerms as apMicroTerms } from '@/data/apMicroTerms';
import { KeyTerm } from '@/data/allContent';
import ReactMarkdown from 'react-markdown';
import { ExamCalculator } from './ExamCalculator';
import { ExamWhiteboard } from './ExamWhiteboard';

import dojoIcon from "../../public/images/dojoIcon.png";

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
  isTopicMode?: boolean; // New prop to indicate topic mode (from unit cheat sheet)
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

// BeltHUD Component
interface BeltHUDProps {
  currentXP: number;
  nextBeltXP: number | null;
  currentBelt: { name: string; color: string; textColor: string };
  percent: number;
}

const BeltHUD = ({ currentXP, nextBeltXP, currentBelt, percent }: BeltHUDProps) => {
  // Helper function to get belt image path
  const getBeltImage = () => {
    if (currentBelt.name === 'White Belt') {
      return '/images/beltNewWhite.svg';
    } else if (currentBelt.name === 'Yellow Belt') {
      return '/images/beltNewYellow.svg';
    } else if (currentBelt.name === 'Green Belt') {
      return '/images/beltNewGreen.svg';
    } else if (currentBelt.name === 'Purple Belt') {
      return '/images/beltNewPurple.svg';
    } else if (currentBelt.name === 'Black Belt') {
      return '/images/beltNewBlack.svg';
    } else {
      return '/images/beltNewWhite.svg'; // Default to white
    }
  };

  return (
    <div className="w-full flex items-center gap-4 mb-6">
      {/* Left: Belt Badge */}
      <div className="flex items-center">
        <Image
          src={getBeltImage()}
          alt={currentBelt.name}
          width={40}
          height={40}
          className="h-10 w-auto"
        />
      </div>
      
      {/* Right: Progress Bar */}
      <div className="flex-1 relative">
        <div className="h-6 bg-gray-200 border-2 border-black rounded-full overflow-hidden relative">
          <motion.div
            className={`h-full ${currentBelt.color === 'bg-yellow-400' ? 'bg-yellow-400' : currentBelt.color === 'bg-green-600' ? 'bg-green-600' : currentBelt.color === 'bg-purple-600' ? 'bg-purple-600' : currentBelt.color === 'bg-gray-900' ? 'bg-gray-900' : 'bg-gray-100'}`}
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.3 }}
          />
          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-900 z-10">
              {currentXP.toLocaleString()} / {nextBeltXP ? nextBeltXP.toLocaleString() : 'MAX'} XP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// TacticalToolbar Component
interface TacticalToolbarProps {
  onCalculatorClick: () => void;
  onWhiteboardClick: () => void;
}

const TacticalToolbar = ({ onCalculatorClick, onWhiteboardClick }: TacticalToolbarProps) => {
  return (
    <>
      {/* Desktop: Fixed on right side */}
      <div className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-30">
        <div className="bg-white border-2 border-black shadow-lg rounded-full p-2 flex flex-col gap-4">
          {/* Calculator Button */}
          <button
            onClick={onCalculatorClick}
            className="p-3 rounded-full bg-white border-2 border-black hover:bg-gray-50 transition-all active:scale-95"
            title="Open Calculator"
          >
            <Calculator className="w-6 h-6 text-gray-900" />
          </button>
          
          {/* Whiteboard Button */}
          <button
            onClick={onWhiteboardClick}
            className="p-3 rounded-full bg-white border-2 border-black hover:bg-gray-50 transition-all active:scale-95"
            title="Open Whiteboard"
          >
            <Pen className="w-6 h-6 text-gray-900" />
          </button>
        </div>
      </div>
      
      {/* Mobile: Fixed bottom bar */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-30">
        <div className="bg-white border-2 border-black shadow-lg rounded-full p-2 flex flex-row gap-4 justify-center">
          <button
            onClick={onCalculatorClick}
            className="p-3 rounded-full bg-white border-2 border-black hover:bg-gray-50 transition-all active:scale-95"
            title="Open Calculator"
          >
            <Calculator className="w-6 h-6 text-gray-900" />
          </button>
          
          <button
            onClick={onWhiteboardClick}
            className="p-3 rounded-full bg-white border-2 border-black hover:bg-gray-50 transition-all active:scale-95"
            title="Open Whiteboard"
          >
            <Pen className="w-6 h-6 text-gray-900" />
          </button>
        </div>
      </div>
    </>
  );
};

// InlineExplanation Component
interface InlineExplanationProps {
  question: QuestionType;
  aiExplanation?: string;
  isLoadingAI: boolean;
  isVisible: boolean;
}

const InlineExplanation = ({ question, aiExplanation, isLoadingAI, isVisible }: InlineExplanationProps) => {
  const correctAnswerIndex = question.options.findIndex((opt, index) => String.fromCharCode(65 + index) === question.correctAnswer);
  
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6 pt-6 border-t border-gray-200 space-y-6"
    >
      {/* Correct Answer Summary */}
      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Correct Answer</h4>
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-green-200 text-green-600 font-medium">
            {question.correctAnswer}
          </span>
          <span className="font-medium text-gray-900">
            {question.options[correctAnswerIndex]}
          </span>
        </div>
      </div>
      
      {/* Explanation Box */}
      {isLoadingAI ? (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
            <span className="text-sm text-gray-600">Loading explanation...</span>
          </div>
        </div>
      ) : aiExplanation ? (
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Explanation</h4>
          <p className="text-gray-900">{aiExplanation}</p>
        </div>
      ) : null}
    </motion.div>
  );
};

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
  isParentModalOpen
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
  const [showExplanation, setShowExplanation] = useState(false);

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
    console.log(`[QuestionCard] useEffect triggered for question ${question.id}, isAnswered: ${isAnswered}, initialSelectedLetter: ${initialSelectedLetter}`);
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
      console.warn(`[QuestionCard] Blocked answer selection: question ${question.id} already submitted (isSubmitted: ${isSubmitted}, isAnswered: ${isAnswered})`);
      return;
    }
    
    // If option is struck through, just remove strikethrough and don't select
    // This matches the exact logic from FullExam.tsx
    if (struckThroughOptions.has(index)) {
      setStruckThroughOptions(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
      return; // Exit early - do NOT select
    }
    
    console.log(`[QuestionCard] Answer selected for question ${question.id}, index ${index}, isLoggedIn: ${isLoggedIn}, currentIndex: ${currentIndex}`);
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
      console.log("Canvas generated.");

      const imageDataUrl = canvas.toDataURL('image/png');
      console.log("Captured Image Data URL (first 100 chars):", imageDataUrl.substring(0, 100) + "...");

      // --- TEMPORARY FRONTEND ACTION --- 
      // alert(`Question Card Captured! ...`); // Optional: Remove or keep the alert

      // --- Save image data to localStorage (Temporary Solution) ---
      try {
         // Retrieve existing images or initialize an empty array
         const boardBlocksRaw = localStorage.getItem('tempBoardBlocks');
         let boardBlocks = boardBlocksRaw ? JSON.parse(boardBlocksRaw) : [];
         
         // Ensure it's an array (handle potential data corruption)
         if (!Array.isArray(boardBlocks)) {
             console.warn('localStorage tempBoardBlocks was not an array, resetting.');
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
         console.log(`Saved image block ${newImageBlock.id} to localStorage (temporary)`);
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
      <Card ref={cardRef} className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
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

        <CardHeader>
          <CardTitle className="text-xl">
            Question {currentIndex + 1} of {totalQuestions}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4"> 
          {/* Parse and render markdown table if present */}
          {(() => {
            const { tableData: parsedTableData, textWithoutTable } = parseMarkdownTable(question.question);
            const displayTableData = question.tableData || parsedTableData;
            const displayQuestionText = parsedTableData ? textWithoutTable : question.question;
            
            return (
              <>
            {/* Question Text with markdown support */}
            <p className="text-lg font-semibold text-gray-900">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <span>{children}</span>,
                  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                }}
              >
                {displayQuestionText}
              </ReactMarkdown>
            </p>
                {/* Table Data from tableData property or parsed from markdown - shown below question text */}
                {displayTableData && (
                  <div className="my-6 flex justify-center">
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
                )}
              </>
            );
          })()}

            {/* Question Image Display */}
            {question.image && (
              <div className="my-4 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={typeof question.image === 'string' ? question.image : (question.image as any).src} 
                  alt={question.unitName || 'Question related image'} 
                  className="max-h-60 w-auto mx-auto object-contain"
                />
              </div>
            )}

            {/* Answer Options (Dojo Infinite Style) */}
            <div className="space-y-2">
              {question.options.map((option, optIndex) => {
                const letter = String.fromCharCode(65 + optIndex);
                const isSelected = selectedAnswerIndex === optIndex;
                const isCorrectAnswer = optIndex === correctAnswerIndex;
                const isStruckThrough = struckThroughOptions.has(optIndex);
                
                const handleStrikethroughToggle = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  
                  // If the option being struck through is the currently selected answer, deselect it.
                  if (selectedAnswerIndex === optIndex && !isStruckThrough) {
                    setSelectedAnswerIndex(null);
                    setIsSubmitted(false);
                  }
                  
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
                
                // Determine styling based on state (matching dojo infinite)
                let optionStyle = 'bg-white border-gray-300';
                if (isSubmitted) {
                  if (isCorrectAnswer) {
                    optionStyle = 'bg-green-50 border-green-500';
                  } else if (isSelected && !isCorrectAnswer) {
                    optionStyle = 'bg-red-50 border-red-500';
                  }
                } else if (isStruckThrough) {
                  optionStyle = 'bg-gray-100 border-gray-300 opacity-60';
                } else if (isSelected) {
                  optionStyle = 'bg-blue-50 border-blue-500';
                }

                return (
                  <motion.div
                    key={optIndex}
                    initial={false}
                    animate={isSubmitted && isCorrectAnswer ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    className={`p-3 rounded-lg border-2 transition-colors ${optionStyle} ${
                      !isSubmitted && !isStruckThrough ? 'cursor-pointer hover:bg-blue-50 hover:border-blue-300' : ''
                    }`}
                    onClick={!isSubmitted && !isStruckThrough ? () => handleAnswerSelect(optIndex) : isStruckThrough ? () => handleStrikethroughToggle({ stopPropagation: () => {} } as React.MouseEvent) : undefined}
                  >
                    <div className="flex items-center gap-3">
                      {!isSubmitted ? (
                        <>
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={letter}
                            checked={isSelected}
                            onChange={() => handleAnswerSelect(optIndex)}
                            className="w-5 h-5 text-blue-600 flex-shrink-0"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span className={`flex-1 text-gray-900 ${isStruckThrough ? 'line-through text-gray-400' : ''}`}>{option}</span>
                          {/* Strikethrough Button */}
                          <div
                            role="button"
                            onClick={handleStrikethroughToggle}
                            className={`flex-shrink-0 p-2 rounded-lg transition-colors cursor-pointer ${
                              isStruckThrough ? 'bg-slate-200 text-slate-600' : 'bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-600'
                            }`}
                            aria-label={isStruckThrough ? "Remove strikethrough" : "Strikethrough option"}
                          >
                            <Strikethrough className="w-5 h-5" />
                          </div>
                        </>
                      ) : (
                        <>
                          <span
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                              isCorrectAnswer
                                ? 'bg-green-500 text-white'
                                : isSelected
                                  ? 'bg-red-500 text-white'
                                  : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {letter}
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

            {/* Explanation Section - Show based on answer correctness (matching dojo infinite) */}
            {isSubmitted && (() => {
              const isCorrect = selectedAnswerIndex === correctAnswerIndex;
              
              // If incorrect, show explanation automatically
              if (!isCorrect && aiExplanation) {
                return (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t border-gray-200"
                  >
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Explanation</h4>
                      <p className="text-gray-900">{aiExplanation}</p>
                    </div>
                  </motion.div>
                );
              }
              
              // If correct, show explanation as a link
              if (isCorrect && aiExplanation) {
                return (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setShowExplanation(!showExplanation)}
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
                          <p className="text-gray-900">{aiExplanation}</p>
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
    </>
  );
};

// QuestionArena Component (Refactored from QuestionCard for Focus Mode)
interface QuestionArenaProps {
  question: QuestionType;
  onAnswerSelect: (questionId: number, answerLetter: string, answerText: string, lessonIDS: string[]) => void;
  initialSelectedLetter?: string;
  isAnswered: boolean;
  highlightedIndex: number | null;
  aiExplanation?: string;
  isLoadingAI: boolean;
  onExplanationClick?: () => void;
  showExplanationForCorrect?: boolean;
}

const QuestionArena = ({ question, onAnswerSelect, initialSelectedLetter, isAnswered, highlightedIndex, aiExplanation, isLoadingAI, onExplanationClick, showExplanationForCorrect }: QuestionArenaProps) => {
  const letterToIndex = (letter?: string): number | null => {
    if (!letter) return null;
    const index = letter.charCodeAt(0) - 65;
    return index >= 0 && index < question.options.length ? index : null;
  };

  const initialSelectedIndex = letterToIndex(initialSelectedLetter);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(initialSelectedIndex);
  const [isSubmitted, setIsSubmitted] = useState(isAnswered);
  const correctAnswerIndex = letterToIndex(question.correctAnswer);

  useEffect(() => {
    const currentSelectedIndex = letterToIndex(initialSelectedLetter);
    setSelectedAnswerIndex(currentSelectedIndex);
    setIsSubmitted(isAnswered && !!initialSelectedLetter);
  }, [question.id, initialSelectedLetter, isAnswered]);

  const handleAnswerSelect = (index: number) => {
    if (isSubmitted) return;
    
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
      console.error(`[QuestionArena] Error in onAnswerSelect:`, error);
      setIsSubmitted(false);
      setSelectedAnswerIndex(null);
    }
  };

  // Parse markdown table if present
  const { tableData: parsedTableData, textWithoutTable } = parseMarkdownTable(question.question);
  const displayTableData = question.tableData || parsedTableData;
  const displayQuestionText = parsedTableData ? textWithoutTable : question.question;

  return (
    <div className="space-y-8">
      {/* Question Text - Large and Readable */}
      <div className="space-y-6">
        <div className="text-2xl font-black leading-tight text-gray-900 prose prose-lg max-w-none">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-4">{children}</p>,
              strong: ({ children }) => <strong className="font-black">{children}</strong>,
            }}
          >
            {displayQuestionText}
          </ReactMarkdown>
        </div>
        
        {/* Table Data */}
        {displayTableData && (
          <div className="my-6 flex justify-center">
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
                      {row.map((cell: string, cellIndex: number) => (
                        <td 
                          key={cellIndex} 
                          className="border border-black px-4 py-3 text-center text-base"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Question Image */}
        {question.image && (
          <div className="my-4 rounded-lg overflow-hidden border border-gray-200">
            <img
              src={typeof question.image === 'string' ? question.image : (question.image as any).src}
              alt={question.unitName || 'Question related image'}
              className="max-h-60 w-auto mx-auto object-contain"
            />
          </div>
        )}
      </div>

      {/* Answer Options - Vertical Stack */}
      <div className="space-y-4">
        {question.options.map((option, optIndex) => {
          const isHighlighted = !isSubmitted && highlightedIndex === optIndex;
          const isSelected = selectedAnswerIndex === optIndex;
          const isCorrect = optIndex === correctAnswerIndex;
          
          let optionClass = 'w-full text-left p-6 border-4 rounded-xl cursor-pointer transition-all ';
          
          if (isSubmitted) {
            if (isCorrect) {
              optionClass += 'bg-green-50 border-green-500 shadow-sm';
            } else if (isSelected) {
              optionClass += 'bg-red-50 border-red-500 shadow-sm';
            } else {
              optionClass += 'bg-transparent border-gray-100';
            }
          } else {
            if (isSelected) {
              optionClass += 'bg-blue-50 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
            } else {
              optionClass += 'bg-transparent border-gray-100 hover:border-black';
            }
          }
          
          return (
            <button
              key={optIndex}
              onClick={() => handleAnswerSelect(optIndex)}
              disabled={isSubmitted}
              className={optionClass}
            >
              <div className="flex items-center gap-4">
                <span className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-bold flex-shrink-0 ${
                  isSubmitted
                    ? isCorrect
                      ? 'bg-green-100 border-green-500 text-green-700'
                      : isSelected
                        ? 'bg-red-100 border-red-500 text-red-700'
                        : 'bg-white border-gray-300 text-gray-500'
                    : isSelected
                      ? 'bg-blue-100 border-black text-blue-900'
                      : 'bg-white border-gray-300 text-gray-600'
                }`}>
                  {String.fromCharCode(65 + optIndex)}
                </span>
                <span className="flex-1 text-lg font-medium text-gray-900">{option}</span>
                {isSubmitted && (
                  <div className="flex-shrink-0">
                    {isCorrect ? (
                      <Check className="w-6 h-6 text-green-500" />
                    ) : isSelected ? (
                      <X className="w-6 h-6 text-red-500" />
                    ) : null}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Explanation Section - Show based on answer correctness */}
      {isSubmitted && (() => {
        const isCorrect = selectedAnswerIndex === correctAnswerIndex;
        
        // If incorrect, show explanation automatically
        if (!isCorrect) {
          return (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              {/* Explanation */}
              {isLoadingAI ? (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
                    <span className="text-sm text-gray-600">Loading explanation...</span>
                  </div>
                </div>
              ) : aiExplanation ? (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Explanation</h4>
                  <p className="text-gray-900">{aiExplanation}</p>
                </div>
              ) : null}
            </motion.div>
          );
        }
        
        // If correct, show explanation as a link
        if (isCorrect && onExplanationClick) {
          return (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={onExplanationClick}
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-2 underline"
              >
                <Lightbulb className="w-4 h-4" />
                View Explanation
              </button>
              {/* Show explanation if it exists and was requested */}
              {showExplanationForCorrect && (
                <>
                  {isLoadingAI ? (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
                        <span className="text-sm text-gray-600">Loading explanation...</span>
                      </div>
                    </div>
                  ) : aiExplanation ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Explanation</h4>
                        <p className="text-gray-900">{aiExplanation}</p>
                      </div>
                    </motion.div>
                  ) : null}
                </>
              )}
            </div>
          );
        }
        
        return null;
      })()}
    </div>
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
  isTopicMode = false, // Default to false
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
  const { login, signup, userData, loadingUserData, user, awardXp, totalXP, guestXp } = useAuthContext();
  const [aiExplanations, setAiExplanations] = useState<Record<number, string>>({});
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [explanationError, setExplanationError] = useState<string | null>(null);
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
  const [isSwitchingUnit, setIsSwitchingUnit] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const DOUBLE_XP_CHANCE = 0.15;
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [showAiTooltip, setShowAiTooltip] = useState(false);


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





  // Log when currentQuestionIndex prop changes
  useEffect(() => {
    console.log('[Child] currentQuestionIndex prop changed', {
      newIndex: currentQuestionIndex,
      questionId: questions[currentQuestionIndex]?.id,
      totalQuestions: totalQuestions,
      questionText: questions[currentQuestionIndex]?.question?.substring(0, 50) + '...'
    });
  }, [currentQuestionIndex, questions, totalQuestions]);

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

    console.log(`[handleAnswerSelection] Processing answer for question ${questionId}, answer: ${answerLetter}, correct: ${isCorrect}, user: ${user?.uid || 'not logged in'}`);

    // Award XP for correct answers (100 XP per correct question)
    if (isCorrect && awardXp) {
      console.log(`[handleAnswerSelection] Answer is correct! Awarding 100 XP...`);
      try {
        await awardXp(100);
        console.log(`[handleAnswerSelection] Successfully awarded 100 XP`);
      } catch (error) {
        console.error(`[handleAnswerSelection] Error awarding XP:`, error);
      }
    } else if (isCorrect && !awardXp) {
      console.warn(`[handleAnswerSelection] Answer is correct but awardXp function is not available`);
    }

    // Update local state for immediate UI feedback
    onAnswer(questionId, answerLetter, isCorrect, lessonIDS);
    setHighlightedIndex(null);

    // --- Backend Updates (Only if logged in) --- 
    if (user) { 
        
        // 1. Update mcqAnswerStatus Map (via API)
        try {
            console.log(`[handleAnswerSelection] Updating MCQ status for question ${questionId}`);
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
                // Try to get error details from response
                let errorData: any = {};
                try {
                    const responseText = await statusResponse.text();
                    if (responseText) {
                        errorData = JSON.parse(responseText);
                    }
                } catch (parseError) {
                    errorData = { rawResponse: await statusResponse.text().catch(() => 'Unable to read response') };
                }
                console.error(`[handleAnswerSelection] Failed to update MCQ status for ${questionId}: ${statusResponse.status}`, {
                    status: statusResponse.status,
                    statusText: statusResponse.statusText,
                    error: errorData
                });
            } else {
                console.log(`[handleAnswerSelection] Successfully updated MCQ status for question ${questionId}`);
            }
        } catch (error) {
            console.error(`[handleAnswerSelection] Error calling /api/update-mcq-status for question ${questionId}:`, error);
        }

        // 2. Update Total XP (via API)
        // (Keep your existing XP calculation and fetch call to /api/update-total-xp here...)
        // If XP logic needs to move here, it would go here.

        // 3. --- >>> Write Detailed Answer to mcqAnswers Subcollection <<< ---
        try {
            console.log(`[handleAnswerSelection] Writing detailed answer log for user ${user.uid}, question ${questionId}`);
            const userAnswersColRef = collection(db, 'users', user.uid, 'mcqAnswers');
            const answerData = {
                questionId: questionId,      // Use the actual number ID
                isCorrect: isCorrect,
                unitId: unitId,              // Store the unit ID
                lessonIDS: lessonIDS,        // Store the lesson IDs array
                timestamp: serverTimestamp() // Use Firestore server timestamp
            };
            await addDoc(userAnswersColRef, answerData);
            console.log(`[handleAnswerSelection] Successfully wrote detailed answer log for question ${questionId}`);
        } catch (error) {
            console.error(`[handleAnswerSelection] Error writing detailed answer log to Firestore for question ${questionId}:`, error);
            // Don't throw - allow the UI to continue even if logging fails
        }
        // --- >>> End Subcollection Write <<< ---

    } else {
        console.warn(`[handleAnswerSelection] User not logged in. Skipping backend updates for question ${questionId}.`);
    }
  };

  const handleQuestionSelect = (index: number) => {
    console.log('[Child] handleQuestionSelect called', {
      requestedIndex: index,
      currentIndex: currentQuestionIndex,
      totalQuestions: totalQuestions,
      isValid: index >= 0 && index < totalQuestions
    });
    if (index >= 0 && index < totalQuestions) {
        onQuestionSelect(index);
        setHighlightedIndex(null);
    } else {
        console.warn("[Child] Attempted to select invalid question index:", index);
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

  const handlePreviousQuestion = () => {
    console.log('[Child] handlePreviousQuestion called', {
      currentIndex: currentQuestionIndex,
      totalQuestions: totalQuestions
    });
    onPreviousQuestion();
  };

  const handleNextQuestion = () => {
    console.log('[Child] handleNextQuestion called', {
      currentIndex: currentQuestionIndex,
      totalQuestions: totalQuestions
    });
    onNextQuestion(); 
  };

  // --- Updated useEffect for Keyboard Navigation --- 
  useEffect(() => {
    /* // --- START COMMENT OUT - Keyboard Navigation --- 
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if focused on input/button or if an overlay/offer is active
      const target = event.target as HTMLElement;
      if (displayDoubleXpOffer || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'BUTTON') {
        return;
      }

      const numOptions = currentQuestion?.options?.length ?? 0;
      if (numOptions === 0) return; // No options to navigate

      if (event.key === 'ArrowLeft') {
        handlePreviousQuestion();
      } else if (event.key === 'ArrowRight') {
        handleNextQuestion();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlightedIndex(prevIndex => {
          if (prevIndex === null) return numOptions - 1; // Highlight D first
          if (prevIndex === 0) return numOptions - 1;    // Wrap from A to D
          return prevIndex - 1;                   // Go up
        });
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlightedIndex(prevIndex => {
          if (prevIndex === null) return 0; // Highlight A first
          if (prevIndex === numOptions - 1) return 0; // Wrap from D to A
          return prevIndex + 1;                   // Go down
        });
      } else if (event.key === 'Enter') {
        if (highlightedIndex !== null && !currentAnswerState) { // Only submit if highlighted and not already answered
           event.preventDefault();
           console.log("Enter pressed, submitting option:", highlightedIndex); // Debug
           // Find the actual answer details for the highlighted index
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
    // --- END COMMENT OUT - Keyboard Navigation --- */ 
  }, [handlePreviousQuestion, handleNextQuestion, currentQuestion, highlightedIndex, currentAnswerState, handleAnswerSelection]); // Added dependencies

  // --- NEW useEffect to Disable Body Scroll --- 
  useEffect(() => {
    /* // --- START COMMENT OUT - Scroll Lock --- 
    // Store original overflow style
    const originalOverflow = document.body.style.overflow;
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    console.log("Body scroll disabled"); // Debug

    // Cleanup function to restore scroll
    return () => {
      document.body.style.overflow = originalOverflow;
      console.log("Body scroll enabled"); // Debug
    };
    // --- END COMMENT OUT - Scroll Lock --- */
  }, []); // Empty dependency array runs only on mount and unmount

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
                <QuestionWithKeyTerms 
                  questionText={question.question} 
                  unit={question.unit} 
                  subject={question.subject}
                />
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

  // State for Focus Mode features
  const [showCalculator, setShowCalculator] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [showExplanationForCorrect, setShowExplanationForCorrect] = useState(false);
  
  // Get belt progress
  const userXP = user ? getSubjectXP(userData, subject) : (guestXp ?? 0);
  const beltProgress = getBeltProgress(userXP);
  const { percent, nextBelt, xpToNext, currentBelt } = beltProgress;

  // Handle calculator click
  const handleCalculatorClick = () => {
    setShowCalculator(true);
  };

  // Handle whiteboard click
  const handleWhiteboardClick = () => {
    setShowWhiteboard(true);
  };

  // Handle explanation click (for correct answers - shows as link)
  const handleExplanationClick = () => {
    if (!currentAnswerState) return;
    
    // Toggle explanation visibility
    setShowExplanationForCorrect(!showExplanationForCorrect);
    
    // If explanation doesn't exist yet, load it
    if (!aiExplanations[currentQuestion?.id || 0] && !isLoadingExplanation) {
      handleAIExplanation();
    }
  };
  
  // Reset explanation visibility when question changes
  useEffect(() => {
    setShowExplanationForCorrect(false);
  }, [currentQuestion?.id]);

  // Auto-load explanation for incorrect answers
  useEffect(() => {
    if (currentAnswerState && currentQuestion) {
      const isCorrect = currentAnswerState.selectedLetter === currentQuestion.correctAnswer;
      // If incorrect, automatically load explanation
      if (!isCorrect && !aiExplanations[currentQuestion.id] && !isLoadingExplanation) {
        handleAIExplanation();
      }
    }
  }, [currentAnswerState, currentQuestion?.id, aiExplanations, isLoadingExplanation]);
            
                        return (
    <>
      {/* Calculator */}
      {showCalculator && (
        <ExamCalculator onClose={() => setShowCalculator(false)} />
      )}

      {/* Whiteboard */}
      {showWhiteboard && (
        <ExamWhiteboard onClose={() => setShowWhiteboard(false)} />
      )}

      {/* Focus Mode Layout */}
      <div className="min-h-screen bg-gray-50 pb-20 lg:pb-4">
        <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
          {/* Top Row: BeltHUD */}
          <BeltHUD
            currentXP={userXP}
            nextBeltXP={beltProgress.nextBeltXP}
            currentBelt={currentBelt}
            percent={percent}
          />

          {/* Center: QuestionArena */}
          {currentQuestion && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-8 mb-8">
              <QuestionArena
                question={currentQuestion}
                onAnswerSelect={handleAnswerSelection}
                initialSelectedLetter={currentAnswerState?.selectedLetter}
                isAnswered={!!currentAnswerState}
                highlightedIndex={highlightedIndex}
                aiExplanation={aiExplanations[currentQuestion.id]}
                isLoadingAI={isLoadingExplanation}
                onExplanationClick={handleExplanationClick}
                showExplanationForCorrect={showExplanationForCorrect}
              />
                </div>
            )}

          {/* Bottom: Navigation Buttons */}
          <div className="flex gap-4">
              <button
              onClick={() => {
                console.log('[Child] Previous button clicked', {
                  currentIndex: currentQuestionIndex,
                  totalQuestions: totalQuestions
                });
                onPreviousQuestion();
              }}
                disabled={currentQuestionIndex === 0}
              className="flex-1 px-6 py-4 border-4 border-black rounded-xl font-black text-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Previous
              </button>
              <button
              onClick={() => {
                console.log('[Child] Next button clicked', {
                  currentIndex: currentQuestionIndex,
                  totalQuestions: totalQuestions,
                  willBeDisabled: currentQuestionIndex === totalQuestions - 1 || totalQuestions === 0
                });
                onNextQuestion();
              }}
                disabled={currentQuestionIndex === totalQuestions - 1 || totalQuestions === 0}
              className="flex-1 px-6 py-4 border-4 border-black rounded-xl font-black text-lg bg-black text-white hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Next
              </button>
            </div>
          </div>

        {/* Right Side: TacticalToolbar */}
        <TacticalToolbar
          onCalculatorClick={handleCalculatorClick}
          onWhiteboardClick={handleWhiteboardClick}
        />
                      </div>
    </>
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
