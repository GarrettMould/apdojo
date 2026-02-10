'use client';

import { useState, useEffect } from 'react';
import { dojoDrills, DojoDrill } from '@/data/dojoDrills';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DraggableGraph from './DraggableGraph';
import { DojoTable } from './DojoTable';
import { MonopolyRevenueVisualizer } from './MonopolyRevenueVisualizer';
import { CompAdvantageDrill, CompAdvantageProblem } from './CompAdvantageDrill';
import { GDPDrill } from './GDPDrill';
import { PPCDrill } from './PPCDrill';
import { DemandChangeDrill, DemandChangeScenario } from './DemandChangeDrill';
import { ElasticityRevenueDrill, ElasticityScenario } from './ElasticityRevenueDrill';
import { ConsumerProducerSurplusDrill } from './ConsumerProducerSurplusDrill';
import { StudyModeModal } from './StudyModeModal';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasValidSeasonPass } from '@/lib/utils';

export interface InstantAnswerKeyTerm {
  term: string;
  definition: string;
}

export interface FlashcardData {
  id: string;
  type: 'visual' | 'rapid-fire' | 'list';
  tag: string; // e.g. "GRAPH", "RULE"
  front: string;
  back: React.ReactNode;
  /** Optional image URL shown on the back of the card (e.g. for GRAPH cards). */
  backImage?: string;
}

interface DrillDeepDiveProps {
  /** Dojo drill id; null for review-only lessons (no video, interactive, or MCQ). */
  drillId: string | null;
  backLink: string;
  backLinkText: string;
  /** When drillId is null, used as the page title. */
  lessonTitle?: string;
  /** Pills showing subject and lesson ID (e.g. "AP Macro - 1.2"). When set, replaces the description paragraph. */
  lessonPills?: { label: string }[];
  /** Optional instant answer at top: short blurb + key term cards */
  instantAnswer?: {
    blurb: string;
    keyTerms: InstantAnswerKeyTerm[];
  };
  /** Optional flashcard warm-up section (above Stage 2 / near Instant Answer). */
  flashcards?: FlashcardData[];
  stage2Content?: React.ReactNode; // Optional custom content for stage 2 (above interactive drill)
  keyTakeaways?: React.ReactNode; // Optional custom key takeaways section
  /** When lesson has no drill video (e.g. review-only), show this video from the unit cheat sheet directory. */
  fallbackVideo?: {
    videoUrl: string;
    title: string;
    questions?: Array<{ id: string; text: string; options: string[]; correctAnswer: number; explanation?: string }>;
  } | null;
  /** Optional 3 MCQs per lesson from unitPracticeProblems (used for Unit 1 deep dives). */
  lessonMcqQuestions?: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
    image?: { src: string; alt: string } | null;
    tableData?: { headers: string[]; rows: string[][] };
  }>;
}

/** Tag badge colors for flashcard front */
function getFlashcardTagClass(tag: string): string {
  const t = tag.toUpperCase();
  if (t === 'GRAPH') return 'bg-purple-100 text-purple-700';
  if (t === 'RULE') return 'bg-blue-100 text-blue-700';
  if (t === 'LIST') return 'bg-orange-100 text-orange-700';
  return 'bg-gray-100 text-gray-700';
}

/** Picks exactly 3 entry cards: one list, one graph (tag), one rapid-fire (rule). */
function getWarmUpEntryCards(flashcards: FlashcardData[]): (FlashcardData | null)[] {
  const listCard = flashcards.find((c) => c.type === 'list') ?? null;
  const graphCard = flashcards.find((c) => c.tag === 'GRAPH') ?? null;
  const rapidFireCard = flashcards.find((c) => c.type === 'rapid-fire' && c.tag === 'RULE') ?? flashcards.find((c) => c.type === 'rapid-fire') ?? null;
  return [listCard, graphCard, rapidFireCard];
}

/** Entry card: shows only front (tag + text); click opens modal. */
function WarmUpEntryCard({ card, onOpen, disabled = false }: { card: FlashcardData; onOpen: () => void; disabled?: boolean }) {
  const tagClass = getFlashcardTagClass(card.tag);
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onOpen}
      disabled={disabled}
      className={`relative w-full min-h-[160px] rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
      aria-label="Open card"
    >
      <span className={`absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-bold ${tagClass}`}>
        {card.tag}
      </span>
      <p className="font-semibold text-gray-900 mt-6 pr-16 line-clamp-4 p-4">{card.front}</p>
      <span className="absolute bottom-2 left-4 text-xs text-gray-500">Click to open</span>
    </button>
  );
}

export function DrillDeepDive({ drillId, backLink, backLinkText, lessonTitle, lessonPills, instantAnswer, flashcards, stage2Content, keyTakeaways, fallbackVideo, lessonMcqQuestions }: DrillDeepDiveProps) {
  const { userData } = useAuthContext();
  const isPremium = hasValidSeasonPass(userData);
  
  // State for comprehension questions (one at a time below video)
  const [compAnswers, setCompAnswers] = useState<Record<string, number | null>>({});
  const [compSubmitted, setCompSubmitted] = useState<Record<string, boolean>>({});
  const [currentCompQuestionIndex, setCurrentCompQuestionIndex] = useState(0);

  // State for fallback video comprehension questions
  const [fallbackCompAnswers, setFallbackCompAnswers] = useState<Record<string, number | null>>({});
  const [fallbackCompSubmitted, setFallbackCompSubmitted] = useState<Record<string, boolean>>({});
  const [currentFallbackCompIndex, setCurrentFallbackCompIndex] = useState(0);

  // State for MCQ questions (one at a time)
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number | null>>({});
  const [mcqSubmitted, setMcqSubmitted] = useState<Record<number, boolean>>({});
  const [currentMcqQuestionIndex, setCurrentMcqQuestionIndex] = useState(0);

  // Warm-up modal: show back of one card at a time; navigate through deck of same type
  const [warmUpModalOpen, setWarmUpModalOpen] = useState(false);
  const [warmUpDeck, setWarmUpDeck] = useState<FlashcardData[]>([]);
  const [warmUpIndex, setWarmUpIndex] = useState(0);
  const openWarmUpModal = (card: FlashcardData) => {
    if (!flashcards) return;
    const deck = flashcards.filter((c) => c.type === card.type);
    const idx = deck.findIndex((c) => c.id === card.id);
    setWarmUpDeck(deck);
    setWarmUpIndex(idx >= 0 ? idx : 0);
    setWarmUpModalOpen(true);
  };

  // State for interactive drill completion
  const [ppcLevel, setPpcLevel] = useState<1 | 2>(1);
  const [level1Ready, setLevel1Ready] = useState(false);

  const drill = drillId ? dojoDrills[drillId] : null;
  const isReviewOnly = !drillId || !drill;

  // Get MCQ questions for stage 3: use lessonMcqQuestions when provided (e.g. 3 per lesson from unitPracticeProblems), else from drill
  const subjectFilter = drill ? (drill.subject === 'ap_macroeconomics' ? 'ap_macroeconomics' : 'ap_microeconomics') : 'ap_macroeconomics';
  const drillMcqQuestions = drill
    ? drill.stage3.mcqIds
        .map(id => allQuestions.find(q => q.id === id && q.subject === subjectFilter))
        .filter((q): q is typeof allQuestions[0] => q !== undefined)
    : [];
  const mcqQuestions = lessonMcqQuestions?.length
    ? lessonMcqQuestions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        image: q.image ?? null,
        tableData: q.tableData,
      }))
    : drillMcqQuestions;

  const handleCompAnswer = (questionId: string, answerIndex: number) => {
    if (compSubmitted[questionId]) return;
    setCompAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    setCompSubmitted(prev => ({ ...prev, [questionId]: true }));
  };

  const handleFallbackCompAnswer = (questionId: string, answerIndex: number) => {
    if (fallbackCompSubmitted[questionId]) return;
    setFallbackCompAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    setFallbackCompSubmitted(prev => ({ ...prev, [questionId]: true }));
  };

  const goToNextCompQuestion = () => {
    if (currentCompQuestionIndex < drill.stage1.comprehensionQuestions.length - 1) {
      setCurrentCompQuestionIndex(prev => prev + 1);
    }
  };

  const goToNextFallbackQuestion = () => {
    if (currentFallbackCompIndex < (fallbackVideo?.questions?.length || 0) - 1) {
      setCurrentFallbackCompIndex(prev => prev + 1);
    }
  };

  const handleMcqAnswer = (questionId: number, answerIndex: number) => {
    if (mcqSubmitted[questionId]) return;
    setMcqAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    setMcqSubmitted(prev => ({ ...prev, [questionId]: true }));
  };

  const handlePreviousMcq = () => {
    if (currentMcqQuestionIndex > 0) setCurrentMcqQuestionIndex(prev => prev - 1);
  };

  const handleNextMcq = () => {
    if (currentMcqQuestionIndex < mcqQuestions.length - 1) setCurrentMcqQuestionIndex(prev => prev + 1);
  };

  const getLetter = (index: number) => String.fromCharCode(65 + index);

  const isCorrectMcqAnswer = (question: { correctAnswer: string | number }, optIndex: number) =>
    typeof question.correctAnswer === 'string'
      ? getLetter(optIndex) === question.correctAnswer
      : optIndex === question.correctAnswer;

  // Handler for interactive drill completion (no-op for deep-dive pages)
  const handleDrillComplete = () => {
    // Interactive drill completed - no action needed for deep-dive pages
  };

  // Get the appropriate interactive activity component
  const getActivityComponent = () => {
    if (!drill) return null;
    
    switch (drill.stage2.type) {
      case 'graph':
        return <DraggableGraph onComplete={handleDrillComplete} />;
      case 'table':
        return <GDPDrill onComplete={handleDrillComplete} />;
      case 'monopoly':
        return <MonopolyRevenueVisualizer onComplete={handleDrillComplete} />;
      case 'comparative-advantage':
        const problemData = drill.stage2.config as CompAdvantageProblem;
        if (problemData) {
          return <CompAdvantageDrill problem={problemData} onComplete={handleDrillComplete} />;
        }
        return null;
      case 'ppc-drill':
        return <PPCDrill onComplete={handleDrillComplete} currentLevel={ppcLevel} onLevel1Ready={() => setLevel1Ready(true)} />;
      case 'demand-change':
        const demandChangeData = drill.stage2.config as DemandChangeScenario;
        if (demandChangeData) {
          return <DemandChangeDrill problem={demandChangeData} onComplete={handleDrillComplete} />;
        }
        return null;
      case 'elasticity-revenue':
        const elasticityData = drill.stage2.config as ElasticityScenario;
        if (elasticityData) {
          return <ElasticityRevenueDrill problem={elasticityData} onComplete={handleDrillComplete} />;
        }
        return null;
      case 'consumer-producer-surplus':
        return <ConsumerProducerSurplusDrill onComplete={handleDrillComplete} />;
      default:
        return null;
    }
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 mt-12 relative">
        {/* Yellow Diagonal Banner - Show for non-premium users; smaller, lower, tilted across top-left corner */}
        {!isPremium && (
          <div
            className="absolute z-10 bg-yellow-400 shadow-md overflow-hidden"
            style={{
              width: '240px',
              left: '-8px',
              top: '8px',
              padding: '10px 20px',
              transform: 'rotate(-14deg)',
              transformOrigin: 'top left',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
          >
            <div style={{ transform: 'rotate(14deg)', transformOrigin: 'top left' }}>
              <p className="text-lg sm:text-xl text-black whitespace-nowrap" style={{
                fontFamily: "'Permanent Marker', cursive",
                textShadow: '1px 1px 0px rgba(0,0,0,0.1)',
                letterSpacing: '0.02em',
                lineHeight: '1.2',
              }}>
                Join the Dojo for Unlimited Access
              </p>
            </div>
          </div>
        )}

        {/* Wrap content in black border for non-premium users */}
        <div className={`relative ${!isPremium ? "bg-white border-8 border-black rounded-lg shadow-2xl p-6 sm:p-8 md:p-12 pt-16 sm:pt-20 md:pt-24" : ""}`}>
          {/* Overlay to block interactions for non-premium users */}
          {!isPremium && (
            <div className="absolute inset-0 z-50 rounded-lg pointer-events-auto" aria-hidden="true" />
          )}
          
          {/* Content wrapper */}
          <div className={!isPremium ? "opacity-90" : ""}>
        {/* Header */}
        <div className="mb-8">
          <Link 
            href={backLink} 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 group font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            {backLinkText}
          </Link>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-black mb-6 leading-tight">
            {isReviewOnly ? (lessonTitle ?? 'Lesson Review') : drill!.title}
          </h1>
          {lessonPills && lessonPills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {lessonPills.map((pill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-black text-white border-2 border-black"
                >
                  {pill.label}
                </span>
              ))}
            </div>
          ) : !isReviewOnly && drill ? (
            <p className="text-xl text-gray-600 max-w-2xl">
              {drill.description}
            </p>
          ) : null}
        </div>

        {/* Instant Answer blurb (optional): short summary at top, no key terms */}
        {instantAnswer?.blurb && (
          <section className="mb-16">
            <div className="bg-gray-50 border-l-4 border-yellow-400 rounded-r-lg px-6 py-4">
              <p className="text-lg text-gray-700 leading-relaxed font-bold">
                {instantAnswer.blurb}
              </p>
            </div>
          </section>
        )}

        {/* Flashcard Warm-up (optional): 3 entry cards → modal with same-type deck */}
        {flashcards && flashcards.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-black text-black">Ultimate Flashcard Review</h2>
              <button
                type="button"
                onClick={() => {
                  if (isPremium) {
                    // Open modal with first card of the first available type
                    const firstCard = getWarmUpEntryCards(flashcards).find((card): card is FlashcardData => card != null);
                    if (firstCard) {
                      openWarmUpModal(firstCard);
                    }
                  }
                }}
                disabled={!isPremium}
                className={`text-blue-600 hover:text-blue-700 font-black flex items-center gap-1 transition-colors ${!isPremium ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                (Pick a Card)
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {getWarmUpEntryCards(flashcards)
                .filter((card): card is FlashcardData => card != null)
                .map((card) => (
                  <WarmUpEntryCard key={card.id} card={card} onOpen={() => openWarmUpModal(card)} disabled={!isPremium} />
                ))}
            </div>
          </section>
        )}

        {/* Study Mode overlay: shared modal */}
        <StudyModeModal
          open={warmUpModalOpen && warmUpDeck.length > 0}
          onClose={() => setWarmUpModalOpen(false)}
          deck={warmUpDeck}
          initialIndex={warmUpIndex}
        />

        {/* Fallback video from unit cheat sheet (when lesson has no drill video, e.g. review-only) */}
        {isReviewOnly && fallbackVideo && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-black mb-2">Video</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {fallbackVideo.title}
            </p>
            <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
              <div className="my-8">
                <video
                  src={fallbackVideo.videoUrl}
                  controls={isPremium}
                  className="w-full aspect-video rounded-lg shadow-md"
                  preload="metadata"
                  disablePictureInPicture
                  controlsList={!isPremium ? "nodownload nofullscreen noremoteplayback" : undefined}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              {/* Comprehension questions for fallback video (same as unit cheat sheet modal) */}
              {fallbackVideo.questions && fallbackVideo.questions.length > 0 && (
                <>
                  <h3 className="text-3xl font-black text-black mb-4 mt-8">Key Concepts to Understand</h3>
                  <div className="mt-4">
                  {currentFallbackCompIndex < fallbackVideo.questions.length ? (
                    (() => {
                      const compQuestions = fallbackVideo.questions;
                      const question = compQuestions[currentFallbackCompIndex];
                      const selectedAnswer = fallbackCompAnswers[question.id] ?? null;
                      const showFeedback = fallbackCompSubmitted[question.id] ?? false;
                      const isCorrect = selectedAnswer === question.correctAnswer;
                      const isSelected = selectedAnswer !== null;
                      return (
                        <div className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
                          <div className="flex items-center justify-between mb-6 pb-4 border-b-4 border-black">
                            <h4 className="text-xl font-black text-black">
                              Question {currentFallbackCompIndex + 1} of {compQuestions.length}
                            </h4>
                            <div className="flex items-center gap-2">
                              {compQuestions.map((q, idx) => (
                                <div
                                  key={q.id}
                                  className={`w-3 h-3 rounded-full border-2 border-black ${
                                    idx === currentFallbackCompIndex ? 'bg-black' : fallbackCompSubmitted[q.id] ? 'bg-green-400' : 'bg-white'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-lg text-black mb-6 font-medium leading-relaxed">{question.text}</p>
                          <div className="space-y-2 mb-6">
                            {question.options.map((option, optIndex) => {
                              const optionLetter = getLetter(optIndex);
                              const isCorrectAnswer = optIndex === question.correctAnswer;
                              const isThisSelected = selectedAnswer === optIndex;
                              let optionStyle = 'bg-white border-gray-300';
                              if (showFeedback) {
                                if (isCorrectAnswer) optionStyle = 'bg-green-50 border-green-500';
                                else if (isThisSelected && !isCorrectAnswer) optionStyle = 'bg-red-50 border-red-500';
                              } else if (isThisSelected) optionStyle = 'bg-blue-50 border-blue-500';
                              return (
                                <motion.div
                                  key={optIndex}
                                  initial={false}
                                  animate={showFeedback && isCorrectAnswer ? { scale: [1, 1.05, 1] } : {}}
                                  transition={{ duration: 0.3 }}
                                  className={`p-3 rounded-lg border-2 transition-colors ${optionStyle} ${
                                    !showFeedback && isPremium ? 'cursor-pointer hover:bg-blue-50 hover:border-blue-300' : !isPremium ? 'cursor-not-allowed opacity-50' : ''
                                  }`}
                                  onClick={!showFeedback && isPremium ? () => handleFallbackCompAnswer(question.id, optIndex) : undefined}
                                >
                                  <div className="flex items-center gap-3">
                                    {!showFeedback ? (
                                      <>
                                        <input
                                          type="radio"
                                          name={`fallback-comp-${question.id}`}
                                          value={optionLetter}
                                          checked={isThisSelected}
                                          onChange={() => isPremium && handleFallbackCompAnswer(question.id, optIndex)}
                                          disabled={!isPremium}
                                          className="w-5 h-5 text-blue-600 flex-shrink-0"
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                        <span className="flex-1 text-gray-900">{option}</span>
                                      </>
                                    ) : (
                                      <>
                                        <span
                                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                                            isCorrectAnswer ? 'bg-green-500 text-white' : isThisSelected && !isCorrectAnswer ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                                          }`}
                                        >
                                          {optionLetter}
                                        </span>
                                        <span className={`flex-1 ${isCorrectAnswer ? 'text-green-900 font-semibold' : isThisSelected && !isCorrectAnswer ? 'text-red-900 font-semibold' : 'text-gray-900'}`}>
                                          {option}
                                        </span>
                                        {isCorrectAnswer && <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />}
                                        {isThisSelected && !isCorrectAnswer && <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />}
                                      </>
                                    )}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                          {showFeedback && isSelected && question.explanation && (
                            <div className="relative mt-6 mb-6">
                              <div
                                className={`bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 relative ${isCorrect ? 'border-green-400' : 'border-red-400'}`}
                              >
                                <div className="flex items-start gap-3 mb-3">
                                  {isCorrect ? (
                                    <>
                                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                      <span className="font-black text-green-900 text-lg">Correct!</span>
                                    </>
                                  ) : (
                                    <>
                                      <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                                      <span className="font-black text-red-900 text-lg">Incorrect</span>
                                    </>
                                  )}
                                </div>
                                <p className="text-base text-black font-medium leading-relaxed">{question.explanation}</p>
                              </div>
                            </div>
                          )}
                          {showFeedback && currentFallbackCompIndex < (fallbackVideo?.questions?.length || 0) - 1 && (
                            <button
                              onClick={goToNextFallbackQuestion}
                              disabled={!isPremium}
                              className={`w-full mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${!isPremium ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              Next Question
                              <ArrowRight className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      );
                    })()
                  ) : (
                    <div className="bg-white border-4 border-green-500 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
                      <p className="text-lg font-semibold text-green-800 flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                        Comprehension check complete
                      </p>
                      <p className="text-gray-700 mt-1">
                        You&apos;ve answered all {fallbackVideo.questions.length} questions. Scroll down to continue.
                      </p>
                    </div>
                  )}
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {/* Stage 1: Video + Comprehension Check (only when drill exists) */}
        {!isReviewOnly && drill && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-2">
            Understanding {drill.title}
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {drill.description}
          </p>
          <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
            {/* Video */}
            <div className="my-8">
              <video 
                src={drill.stage1.videoUrl} 
                controls={isPremium}
                className="w-full aspect-video rounded-lg shadow-md"
                disablePictureInPicture
                controlsList={!isPremium ? "nodownload nofullscreen noremoteplayback" : undefined}
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Comprehension Questions — one at a time, blog-style UI */}
            <h3 className="text-3xl font-black text-black mb-4 mt-8">
              Key Concepts to Understand
            </h3>
            <div className="mt-4">
              {currentCompQuestionIndex < drill.stage1.comprehensionQuestions.length ? (
                (() => {
                  const compQuestions = drill.stage1.comprehensionQuestions;
                  const question = compQuestions[currentCompQuestionIndex];
                  const selectedAnswer = compAnswers[question.id] ?? null;
                  const showFeedback = compSubmitted[question.id] ?? false;
                  const isCorrect = selectedAnswer === question.correctAnswer;
                  const isSelected = selectedAnswer !== null;

                  return (
                    <div className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
                      <div className="flex items-center justify-between mb-6 pb-4 border-b-4 border-black">
                        <h4 className="text-xl font-black text-black">
                          Question {currentCompQuestionIndex + 1} of {compQuestions.length}
                        </h4>
                        <div className="flex items-center gap-2">
                          {compQuestions.map((q, idx) => (
                            <div
                              key={q.id}
                              className={`w-3 h-3 rounded-full border-2 border-black ${
                                idx === currentCompQuestionIndex ? 'bg-black' : compSubmitted[q.id] ? 'bg-green-400' : 'bg-white'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-lg text-black mb-6 font-medium leading-relaxed">{question.question}</p>
                      <div className="space-y-2 mb-6">
                        {question.options.map((option, optIndex) => {
                          const optionLetter = getLetter(optIndex);
                          const isCorrectAnswer = optIndex === question.correctAnswer;
                          const isThisSelected = selectedAnswer === optIndex;
                          let optionStyle = 'bg-white border-gray-300';
                          if (showFeedback) {
                            if (isCorrectAnswer) optionStyle = 'bg-green-50 border-green-500';
                            else if (isThisSelected && !isCorrectAnswer) optionStyle = 'bg-red-50 border-red-500';
                          } else if (isThisSelected) optionStyle = 'bg-blue-50 border-blue-500';
                          return (
                            <motion.div
                              key={optIndex}
                              initial={false}
                              animate={showFeedback && isCorrectAnswer ? { scale: [1, 1.05, 1] } : {}}
                              transition={{ duration: 0.3 }}
                              className={`p-3 rounded-lg border-2 transition-colors ${optionStyle} ${
                                !showFeedback && isPremium ? 'cursor-pointer hover:bg-blue-50 hover:border-blue-300' : !isPremium ? 'cursor-not-allowed opacity-50' : ''
                              }`}
                              onClick={!showFeedback && isPremium ? () => handleCompAnswer(question.id, optIndex) : undefined}
                            >
                              <div className="flex items-center gap-3">
                                {!showFeedback ? (
                                  <>
                                    <input
                                      type="radio"
                                      name={`comp-${question.id}`}
                                      value={optionLetter}
                                      checked={isThisSelected}
                                      onChange={() => isPremium && handleCompAnswer(question.id, optIndex)}
                                      disabled={!isPremium}
                                      className="w-5 h-5 text-blue-600 flex-shrink-0"
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                    <span className="flex-1 text-gray-900">{option}</span>
                                  </>
                                ) : (
                                  <>
                                    <span
                                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                                        isCorrectAnswer ? 'bg-green-500 text-white' : isThisSelected && !isCorrectAnswer ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                                      }`}
                                    >
                                      {optionLetter}
                                    </span>
                                    <span className="flex-1 text-gray-900">{option}</span>
                                    {isCorrectAnswer && <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />}
                                    {isThisSelected && !isCorrectAnswer && <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />}
                                  </>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                      {showFeedback && isSelected && question.explanation && (
                        <div className="relative mt-6 mb-6">
                          <div
                            className={`bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 relative ${isCorrect ? 'border-green-400' : 'border-red-400'}`}
                          >
                            <div className="flex items-start gap-3 mb-3">
                              {isCorrect ? (
                                <>
                                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span className="font-black text-green-900 text-lg">Correct!</span>
                                </>
                              ) : (
                                <>
                                  <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                                  <span className="font-black text-red-900 text-lg">Incorrect</span>
                                </>
                              )}
                            </div>
                            <p className="text-base text-black font-medium leading-relaxed">{question.explanation}</p>
                          </div>
                        </div>
                      )}
                      {showFeedback && currentCompQuestionIndex < drill.stage1.comprehensionQuestions.length - 1 && (
                        <button
                          onClick={goToNextCompQuestion}
                          disabled={!isPremium}
                          className={`w-full mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${!isPremium ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          Next Question
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  );
                })()
              ) : (
                <div className="bg-white border-4 border-green-500 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
                  <p className="text-lg font-semibold text-green-800 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                    Comprehension check complete
                  </p>
                  <p className="text-gray-700 mt-1">
                    You've answered all {drill.stage1.comprehensionQuestions.length} questions. Scroll down to continue.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
        )}

        {/* Stage 2: Interactive Activity (only when drill exists) */}
        {!isReviewOnly && drill && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-4">
            Interactive Practice
          </h2>
          <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
            {stage2Content && (
              <div className="mb-6">
                {stage2Content}
              </div>
            )}
            <div className={`mt-8 min-h-[500px] flex items-center justify-center relative ${!isPremium ? 'pointer-events-none opacity-50' : ''}`}>
              {getActivityComponent() || (
                <p className="text-gray-500">Interactive activity not available for this drill.</p>
              )}
              {!isPremium && (
                <div className="absolute inset-0 z-10 rounded-lg pointer-events-auto" aria-hidden="true" />
              )}
            </div>
          </div>
        </section>
        )}

        {/* Stage 3: MCQ Practice Questions (from drill or lessonMcqQuestions e.g. 3 per lesson from unitPracticeProblems) */}
        {mcqQuestions.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-2">
            Practice Questions: Test Your Understanding
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Apply what you&apos;ve learned with these practice questions. These questions test your understanding of the key concepts.
          </p>
          <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
            {currentMcqQuestionIndex < mcqQuestions.length ? (
              (() => {
                const question = mcqQuestions[currentMcqQuestionIndex];
                const selectedAnswer = mcqAnswers[question.id] ?? null;
                const showFeedback = mcqSubmitted[question.id] ?? false;
                const isCorrect = selectedAnswer !== null && isCorrectMcqAnswer(question, selectedAnswer);
                const isSelected = selectedAnswer !== null;

                return (
                  <div className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b-4 border-black">
                      <h3 className="text-xl font-black text-black">
                        Question {currentMcqQuestionIndex + 1} of {mcqQuestions.length}
                      </h3>
                      <div className="flex items-center gap-2">
                        {mcqQuestions.map((q, idx) => (
                          <div
                            key={q.id}
                            className={`w-3 h-3 rounded-full border-2 border-black ${
                              idx === currentMcqQuestionIndex ? 'bg-black' : mcqSubmitted[q.id] ? 'bg-green-400' : 'bg-white'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-lg text-black mb-6 font-medium leading-relaxed">{question.question}</p>
                    {question.tableData && (
                      <div className="my-6 overflow-x-auto">
                        <div className="flex items-center gap-4">
                          {question.tableData.playerNames && (
                            <div className="flex items-center justify-center h-full w-16 flex-shrink-0">
                              <p className="transform -rotate-90 whitespace-nowrap text-center font-bold text-lg text-gray-900 leading-tight">
                                {question.tableData.playerNames.row.split(' ')[0]}
                                <br />
                                {question.tableData.playerNames.row.split(' ').slice(1).join(' ')}
                              </p>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <table className="min-w-full border-collapse border-2 border-black">
                              <thead className="bg-gray-100">
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
                                          className={`border border-black px-4 py-3 text-center text-base ${isRowHeader ? 'font-bold bg-gray-50' : ''}`}
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
                          {question.tableData.playerNames && (
                            <div className="flex items-center justify-center h-full w-16 flex-shrink-0">
                              <p className="transform -rotate-90 whitespace-nowrap text-center font-bold text-lg text-gray-900 leading-tight">
                                {question.tableData.playerNames.column}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {question.image && (
                      <div className="my-6">
                        <Image
                          src={question.image.src}
                          alt={question.image.alt || 'Question diagram'}
                          width={600}
                          height={400}
                          className="w-full max-w-2xl h-auto object-contain rounded-lg shadow-md"
                        />
                      </div>
                    )}
                    <div className="space-y-2 mb-6">
                      {question.options.map((option, optIndex) => {
                        const optionLetter = getLetter(optIndex);
                        const isCorrectAnswer = isCorrectMcqAnswer(question, optIndex);
                        const isThisSelected = selectedAnswer === optIndex;
                        let optionStyle = 'bg-white border-gray-300';
                        if (showFeedback) {
                          if (isCorrectAnswer) optionStyle = 'bg-green-50 border-green-500';
                          else if (isThisSelected && !isCorrectAnswer) optionStyle = 'bg-red-50 border-red-500';
                        } else if (isThisSelected) optionStyle = 'bg-blue-50 border-blue-500';
                        return (
                          <motion.div
                            key={optIndex}
                            initial={false}
                            animate={showFeedback && isCorrectAnswer ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 0.3 }}
                            className={`p-3 rounded-lg border-2 transition-colors ${optionStyle} ${
                              !showFeedback && isPremium ? 'cursor-pointer hover:bg-blue-50 hover:border-blue-300' : !isPremium ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                            onClick={!showFeedback && isPremium ? () => handleMcqAnswer(question.id, optIndex) : undefined}
                          >
                            <div className="flex items-center gap-3">
                              {!showFeedback ? (
                                <>
                                  <input
                                    type="radio"
                                    name={`mcq-${question.id}`}
                                    value={optionLetter}
                                    checked={isThisSelected}
                                    onChange={() => isPremium && handleMcqAnswer(question.id, optIndex)}
                                    disabled={!isPremium}
                                    className="w-5 h-5 text-blue-600 flex-shrink-0"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <span className="flex-1 text-gray-900">{option}</span>
                                </>
                              ) : (
                                <>
                                  <span
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                                      isCorrectAnswer ? 'bg-green-500 text-white' : isThisSelected && !isCorrectAnswer ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                                    }`}
                                  >
                                    {optionLetter}
                                  </span>
                                  <span className="flex-1 text-gray-900">{option}</span>
                                  {isCorrectAnswer && <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />}
                                  {isThisSelected && !isCorrectAnswer && <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />}
                                </>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                    {showFeedback && isSelected && question.explanation && (
                      <div className="relative mt-6 mb-6">
                        <div
                          className={`bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 relative ${isCorrect ? 'border-green-400' : 'border-red-400'}`}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            {isCorrect ? (
                              <>
                                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="font-black text-green-900 text-lg">Correct!</span>
                              </>
                            ) : (
                              <>
                                <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                                <span className="font-black text-red-900 text-lg">Incorrect</span>
                              </>
                            )}
                          </div>
                          <p className="text-base text-black font-medium leading-relaxed">{question.explanation}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-4 pt-4 border-t-4 border-black">
                      <button
                        onClick={handlePreviousMcq}
                        disabled={currentMcqQuestionIndex === 0 || !isPremium}
                        className={`px-6 py-3 rounded-xl border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 font-black text-base flex items-center gap-2 ${
                          currentMcqQuestionIndex === 0 || !isPremium ? 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-50' : 'bg-white text-black'
                        }`}
                      >
                        <ArrowRight className="w-5 h-5 rotate-180" />
                        Previous
                      </button>
                      <button
                        onClick={handleNextMcq}
                        disabled={currentMcqQuestionIndex >= mcqQuestions.length - 1 || !isPremium}
                        className={`px-6 py-3 rounded-xl border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 font-black text-base flex items-center gap-2 ${
                          currentMcqQuestionIndex >= mcqQuestions.length - 1 || !isPremium ? 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-50' : 'bg-white text-black'
                        }`}
                      >
                        Next
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="bg-white border-4 border-green-500 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
                <p className="text-lg font-semibold text-green-800 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  Practice questions complete
                </p>
                <p className="text-gray-700 mt-1">
                  You've answered all {mcqQuestions.length} practice questions. Great work!
                </p>
              </div>
            )}
          </div>
        </section>
        )}

        {/* Summary Section */}
        {keyTakeaways ? (
          <section className="mb-16">
            {keyTakeaways}
          </section>
        ) : (
          <section className="mb-16">
            <div className="bg-yellow-50 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
              <h2 className="text-2xl font-black text-black mb-6">Key Takeaways</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="text-2xl">📊</span>
                  <div>
                    <strong className="text-black">Master the fundamentals:</strong> Understanding these core concepts is essential for success in AP Economics.
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <strong className="text-black">Practice makes perfect:</strong> Use the interactive exercises and practice questions to reinforce your understanding.
                  </div>
                </li>
              </ul>
            </div>
          </section>
        )}

          </div>
        </div>
      </div>
    </div>
  );
}
