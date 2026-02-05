'use client';

import { useState, useEffect } from 'react';
import { dojoDrills, DojoDrill } from '@/data/dojoDrills';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, CheckCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
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
}

interface DrillDeepDiveProps {
  drillId: string;
  backLink: string;
  backLinkText: string;
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
function WarmUpEntryCard({ card, onOpen }: { card: FlashcardData; onOpen: () => void }) {
  const tagClass = getFlashcardTagClass(card.tag);
  return (
    <button
      type="button"
      onClick={onOpen}
      className="relative w-full min-h-[160px] rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-gray-50 transition-colors"
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

export function DrillDeepDive({ drillId, backLink, backLinkText, lessonPills, instantAnswer, flashcards, stage2Content, keyTakeaways }: DrillDeepDiveProps) {
  // State for comprehension questions (one at a time below video)
  const [compAnswers, setCompAnswers] = useState<Record<string, number | null>>({});
  const [compSubmitted, setCompSubmitted] = useState<Record<string, boolean>>({});
  const [currentCompQuestionIndex, setCurrentCompQuestionIndex] = useState(0);

  // State for MCQ questions (one at a time)
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number | null>>({});
  const [mcqSubmitted, setMcqSubmitted] = useState<Record<number, boolean>>({});
  const [currentMcqQuestionIndex, setCurrentMcqQuestionIndex] = useState(0);

  const [flippedKeyTermIndices, setFlippedKeyTermIndices] = useState<Set<number>>(new Set());
  const toggleKeyTermFlip = (idx: number) => {
    setFlippedKeyTermIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

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
  const currentWarmUpCard = warmUpDeck[warmUpIndex];
  const canPrevWarmUp = warmUpIndex > 0;
  const canNextWarmUp = warmUpIndex < warmUpDeck.length - 1;
  const goPrevWarmUp = () => setWarmUpIndex((i) => Math.max(0, i - 1));
  const goNextWarmUp = () => {
    if (warmUpIndex < warmUpDeck.length - 1) setWarmUpIndex((i) => i + 1);
    else setWarmUpModalOpen(false);
  };

  // Flip state for the active card in study modal; reset when changing cards
  const [warmUpCardFlipped, setWarmUpCardFlipped] = useState(false);
  useEffect(() => {
    if (warmUpModalOpen) setWarmUpCardFlipped(false);
  }, [warmUpModalOpen, warmUpIndex]);

  // Keyboard: Space = flip, ArrowRight = next, ArrowLeft = prev, Escape = close
  useEffect(() => {
    if (!warmUpModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setWarmUpModalOpen(false);
      else if (e.key === ' ') {
        e.preventDefault();
        setWarmUpCardFlipped((f) => !f);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (warmUpIndex >= warmUpDeck.length - 1) setWarmUpModalOpen(false);
        else setWarmUpIndex((i) => i + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setWarmUpIndex((i) => Math.max(0, i - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [warmUpModalOpen, warmUpIndex, warmUpDeck.length]);

  // State for interactive drill completion
  const [ppcLevel, setPpcLevel] = useState<1 | 2>(1);
  const [level1Ready, setLevel1Ready] = useState(false);

  const drill = dojoDrills[drillId];

  if (!drill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Drill not found</p>
      </div>
    );
  }

  // Get MCQ questions for stage 3
  const subjectFilter = drill.subject === 'ap_macroeconomics' ? 'ap_macroeconomics' : 'ap_microeconomics';
  const mcqQuestions = drill.stage3.mcqIds
    .map(id => allQuestions.find(q => q.id === id && q.subject === subjectFilter))
    .filter((q): q is typeof allQuestions[0] => q !== undefined);

  const handleCompAnswer = (questionId: string, answerIndex: number) => {
    if (compSubmitted[questionId]) return;
    setCompAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    setCompSubmitted(prev => ({ ...prev, [questionId]: true }));
    setCurrentCompQuestionIndex(prev => prev + 1);
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
      <div className="max-w-7xl mx-auto px-4 py-12 mt-12">
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
            {drill.title}
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
          ) : (
            <p className="text-xl text-gray-600 max-w-2xl">
              {drill.description}
            </p>
          )}
        </div>

        {/* Instant Answer Section (optional): blog-style blurb + key term flip cards, no container */}
        {instantAnswer && (
          <section className="mb-16">
            <div className="bg-gray-50 border-l-4 border-yellow-400 rounded-r-lg px-6 py-4 mb-6">
              <p className="text-lg text-gray-700 leading-relaxed font-bold">
                {instantAnswer.blurb}
              </p>
            </div>
            <h3 className="text-lg font-bold text-black mb-4">Key Terms</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ perspective: '1000px' }}>
              {instantAnswer.keyTerms.map((item, idx) => {
                const isFlipped = flippedKeyTermIndices.has(idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleKeyTermFlip(idx)}
                    className="relative h-28 sm:h-32 w-full rounded-lg border-2 border-gray-300 bg-white shadow-sm text-left overflow-hidden hover:border-yellow-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                    style={{ transformStyle: 'preserve-3d' }}
                    aria-label={isFlipped ? `Definition: ${item.definition}` : `Term: ${item.term}. Click to reveal definition.`}
                  >
                    <div
                      className="relative w-full h-full transition-transform duration-300 ease-in-out"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      }}
                    >
                      {/* Front: term only */}
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-white rounded-lg"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                      >
                        <p className="font-bold text-black text-sm sm:text-base line-clamp-3 text-center">{item.term}</p>
                        <span className="text-xs text-gray-500 mt-2">Click to reveal definition</span>
                      </div>
                      {/* Back: definition (visible after flip) */}
                      <div
                        className="absolute inset-0 flex items-center justify-center p-4 bg-gray-50 rounded-lg"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        <p className="text-sm text-gray-700 leading-snug line-clamp-4">{item.definition}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Flashcard Warm-up (optional): 3 entry cards → modal with same-type deck */}
        {flashcards && flashcards.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-black text-black mb-4">⚡ Warm Up: Rapid Fire Review</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {getWarmUpEntryCards(flashcards)
                .filter((card): card is FlashcardData => card != null)
                .map((card) => (
                  <WarmUpEntryCard key={card.id} card={card} onOpen={() => openWarmUpModal(card)} />
                ))}
            </div>
          </section>
        )}

        {/* Study Mode overlay: immersive flashcard modal */}
        <AnimatePresence>
          {warmUpModalOpen && currentWarmUpCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
              onClick={() => setWarmUpModalOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="warmup-modal-title"
            >
              {/* Progress bar at top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800">
                <motion.div
                  className="h-full bg-white"
                  initial={false}
                  animate={{ width: `${((warmUpIndex + 1) / warmUpDeck.length) * 100}%` }}
                  transition={{ duration: 0.25 }}
                />
              </div>
              <div className="absolute top-4 left-4 text-sm font-medium text-slate-400">
                Card {warmUpIndex + 1} of {warmUpDeck.length}
              </div>

              {/* Close (X) top right */}
              <button
                type="button"
                onClick={() => setWarmUpModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Center: card + side arrows (clickable area stops propagation) */}
              <div
                className="flex items-center justify-center gap-4 w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Left arrow */}
                <button
                  type="button"
                  onClick={goPrevWarmUp}
                  disabled={!canPrevWarmUp}
                  className="flex-shrink-0 p-4 rounded-full text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
                  aria-label="Previous card"
                >
                  <ChevronLeft className="w-10 h-10" />
                </button>

                {/* Card container: max-w-2xl, aspect-[3/2], 3D flip */}
                <div className="w-full max-w-2xl flex-1 min-w-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={warmUpIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="w-full aspect-[3/2] cursor-pointer"
                      style={{ perspective: '1200px' }}
                      onClick={() => setWarmUpCardFlipped((f) => !f)}
                    >
                      <div
                        className="relative w-full h-full transition-transform duration-500 ease-in-out"
                        style={{
                          transformStyle: 'preserve-3d',
                          transform: warmUpCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        }}
                      >
                        {/* Front: white, huge text, tag badge top-right */}
                        <div
                          className="absolute inset-0 rounded-2xl bg-white border-2 border-slate-200 shadow-2xl flex flex-col items-center justify-center p-8"
                          style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                          }}
                        >
                          <span
                            className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-xs font-bold ${getFlashcardTagClass(currentWarmUpCard.tag)}`}
                          >
                            {currentWarmUpCard.tag}
                          </span>
                          <p
                            id="warmup-modal-title"
                            className="text-3xl font-bold text-center text-slate-900 leading-snug px-4"
                          >
                            {currentWarmUpCard.front}
                          </p>
                          <span className="mt-6 text-sm text-slate-500">Space or click to flip</span>
                        </div>
                        {/* Back: slate-50 */}
                        <div
                          className="absolute inset-0 rounded-2xl bg-slate-50 border-2 border-slate-200 shadow-2xl flex flex-col p-8 overflow-y-auto"
                          style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                          }}
                        >
                          <span
                            className={`self-end mb-4 px-3 py-1 rounded-lg text-xs font-bold ${getFlashcardTagClass(currentWarmUpCard.tag)}`}
                          >
                            {currentWarmUpCard.tag}
                          </span>
                          <div className="text-lg text-slate-800 leading-relaxed flex-1">
                            {currentWarmUpCard.back}
                          </div>
                          <span className="mt-4 text-sm text-slate-500">Space or click to flip back</span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right arrow */}
                <button
                  type="button"
                  onClick={goNextWarmUp}
                  className="flex-shrink-0 p-4 rounded-full text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
                  aria-label={canNextWarmUp ? 'Next card' : 'Done'}
                >
                  <ChevronRight className="w-10 h-10" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 1: Video + Comprehension Check */}
        <section className="mb-16">
          <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
            <h2 className="text-3xl font-bold text-black mb-4">
              Understanding {drill.title}
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {drill.description}
            </p>
            
            {/* Video */}
            <div className="my-8">
              <video 
                src={drill.stage1.videoUrl} 
                controls 
                className="w-full aspect-video rounded-lg shadow-md"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Comprehension Questions — one at a time, blog-style UI */}
            <div className="mt-8">
              <h3 className="text-3xl font-black text-black mb-6">
                Key Concepts to Understand
              </h3>
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
                                !showFeedback ? 'cursor-pointer hover:bg-blue-50 hover:border-blue-300' : ''
                              }`}
                              onClick={!showFeedback ? () => handleCompAnswer(question.id, optIndex) : undefined}
                            >
                              <div className="flex items-center gap-3">
                                {!showFeedback ? (
                                  <>
                                    <input
                                      type="radio"
                                      name={`comp-${question.id}`}
                                      value={optionLetter}
                                      checked={isThisSelected}
                                      onChange={() => handleCompAnswer(question.id, optIndex)}
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

        {/* Stage 2: Interactive Activity */}
        <section className="mb-16">
          <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
            <h2 className="text-3xl font-bold text-black mb-4">
              Interactive Practice
            </h2>
            {stage2Content && (
              <div className="mb-6">
                {stage2Content}
              </div>
            )}
            <div className="mt-8 min-h-[500px] flex items-center justify-center">
              {getActivityComponent() || (
                <p className="text-gray-500">Interactive activity not available for this drill.</p>
              )}
            </div>
          </div>
        </section>

        {/* Stage 3: MCQ Practice Questions */}
        <section className="mb-16">
          <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
            <h2 className="text-3xl font-bold text-black mb-4">
              Practice Questions: Test Your Understanding
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Apply what you've learned with these practice questions. These questions test your understanding of the key concepts.
            </p>

            {currentMcqQuestionIndex < mcqQuestions.length ? (
              (() => {
                const question = mcqQuestions[currentMcqQuestionIndex];
                const selectedAnswer = mcqAnswers[question.id] ?? null;
                const showFeedback = mcqSubmitted[question.id] ?? false;
                const isCorrect = selectedAnswer === question.correctAnswer;
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
                              !showFeedback ? 'cursor-pointer hover:bg-blue-50 hover:border-blue-300' : ''
                            }`}
                            onClick={!showFeedback ? () => handleMcqAnswer(question.id, optIndex) : undefined}
                          >
                            <div className="flex items-center gap-3">
                              {!showFeedback ? (
                                <>
                                  <input
                                    type="radio"
                                    name={`mcq-${question.id}`}
                                    value={optionLetter}
                                    checked={isThisSelected}
                                    onChange={() => handleMcqAnswer(question.id, optIndex)}
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
                        disabled={currentMcqQuestionIndex === 0}
                        className={`px-6 py-3 rounded-xl border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 font-black text-base flex items-center gap-2 ${
                          currentMcqQuestionIndex === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black'
                        }`}
                      >
                        <ArrowRight className="w-5 h-5 rotate-180" />
                        Previous
                      </button>
                      <button
                        onClick={handleNextMcq}
                        disabled={currentMcqQuestionIndex >= mcqQuestions.length - 1}
                        className={`px-6 py-3 rounded-xl border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 font-black text-base flex items-center gap-2 ${
                          currentMcqQuestionIndex >= mcqQuestions.length - 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black'
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
  );
}
