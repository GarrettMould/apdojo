'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DrawingPad } from '@/components/DrawingPad';
import {
  X,
  Pause,
  Play,
  Eye,
  List,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

interface SubPart {
  label: string;
  text: string;
  answerType: 'draw' | 'text';
  answer?: StaticImageData | string;
}

interface Part {
  label: string;
  text: string;
  answerType: 'draw' | 'text' | null;
  answer?: StaticImageData | string;
  subparts?: SubPart[];
}

interface TableData {
  headers: string[];
  rows: (string | number)[][];
  rowHeaders?: boolean;
  playerNames?: {
    row: string;
    column: string;
  };
}

interface Question {
  questionNumber: number;
  /** FRQ title (e.g. “FRQ 3: …”) when shown separately from prompt body. */
  questionTitle?: string;
  prompt: string;
  /** Gov SCOTUS comparison: instructions (bold), citation (italic), summary; `prompt` is the task line. */
  govScotusStimulus?: {
    instructions: string;
    caseCitation: string;
    summary: string;
  };
  image?: StaticImageData;
  tableData?: TableData;
  /** Shown after `tableData` (e.g. Gov quantitative: task line after the stimulus table). */
  directionsAfterTable?: string;
  parts: Part[];
}

interface FullExamFRQProps {
  questions: {
    examTitle: string;
    questions: Question[];
  };
  examType?: 'macro' | 'micro' | 'gov';
  backUrl?: string;
  /** Hide the bottom “Question N of M” dropdown + numbered grid; use Prev/Next only. */
  hideExpandingQuestionNav?: boolean;
}

/** Macro/Micro FRQ practice sessions default; Gov unit FRQ pack uses AP Gov Section II–style pacing. */
const DEFAULT_FRQ_TOTAL_SECONDS = 50 * 60;
const GOV_UNIT_FRQ_PACK_TOTAL_SECONDS = 60 * 60;

const FONT_SIZE_CLASSES = ['text-sm', 'text-base', 'text-lg', 'text-xl'];
const FONT_SIZE_MAX = FONT_SIZE_CLASSES.length - 1;

export function FullExamFRQ({
  questions,
  examType = 'macro',
  backUrl,
  hideExpandingQuestionNav = false,
}: FullExamFRQProps) {
  const router = useRouter();
  const frqSessionTotalSeconds =
    examType === 'gov' ? GOV_UNIT_FRQ_PACK_TOTAL_SECONDS : DEFAULT_FRQ_TOTAL_SECONDS;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [drawingAnswers, setDrawingAnswers] = useState<Record<string, string>>({});
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(frqSessionTotalSeconds);
  const [showTimer, setShowTimer] = useState(true);
  const [questionFontSize, setQuestionFontSize] = useState(1);
  const [savedDrawingKeys, setSavedDrawingKeys] = useState<Set<string>>(new Set());
  const [showScratchPanel, setShowScratchPanel] = useState(false);
  const [scratchTab, setScratchTab] = useState<'draw' | 'text'>('draw');
  const [scratchNotes, setScratchNotes] = useState('');
  const [scratchDrawKey, setScratchDrawKey] = useState(0);

  // Clear scratch pad on question change
  useEffect(() => {
    setScratchNotes('');
    setScratchDrawKey(k => k + 1);
  }, [currentQuestionIndex]);

  /** One expanded part at a time; accordion for the rest (per FRQ question). */
  const [activePartIndex, setActivePartIndex] = useState(0);
  useEffect(() => {
    setActivePartIndex(0);
  }, [currentQuestionIndex]);

  const [showExitModal, setShowExitModal] = useState(false);
  const [showQuestionNavigator, setShowQuestionNavigator] = useState(false);
  const questionNavigatorRef = useRef<HTMLDivElement>(null);

  const accentColor =
    examType === 'macro' ? 'bg-blue-600' : examType === 'micro' ? 'bg-green-600' : 'bg-violet-600';

  const answerFocusClass =
    examType === 'macro'
      ? 'focus:border-blue-500 focus:ring-1 focus:ring-blue-400'
      : examType === 'micro'
        ? 'focus:border-green-500 focus:ring-1 focus:ring-green-400'
        : 'focus:border-violet-500 focus:ring-1 focus:ring-violet-400';

  const openExitFlow = () => setShowExitModal(true);

  useEffect(() => {
    if (showResults || isTimerPaused) return;
    const interval = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [showResults, isTimerPaused]);

  useEffect(() => {
    if (hideExpandingQuestionNav) return;
    const handler = (event: MouseEvent) => {
      if (
        questionNavigatorRef.current &&
        !questionNavigatorRef.current.contains(event.target as Node)
      ) {
        setShowQuestionNavigator(false);
      }
    };
    if (showQuestionNavigator) {
      document.addEventListener('mousedown', handler);
    }
    return () => document.removeEventListener('mousedown', handler);
  }, [showQuestionNavigator, hideExpandingQuestionNav]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleTextAnswer = (key: string, value: string) => {
    setTextAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleDrawingAnswer = (key: string, data: string) => {
    setDrawingAnswers(prev => ({ ...prev, [key]: data }));
    setSavedDrawingKeys(prev => new Set(prev).add(key));
  };

  const unlockDrawing = (key: string) => {
    setSavedDrawingKeys(prev => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      window.scrollTo({ top: 0 });
    }
  };

  const goToPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(i => i - 1);
      window.scrollTo({ top: 0 });
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    window.scrollTo({ top: 0 });
  };

  const handleExit = () => {
    if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

    const currentQuestion = questions.questions[currentQuestionIndex];
  const fontClass = FONT_SIZE_CLASSES[questionFontSize];

  const renderTable = (tableData: TableData, _bleed: 'none' | 'exam' | 'results' = 'none') => {
    const tableElClass = 'min-w-full border-collapse border border-black';
    const cellBorder = 'border border-black';
    const innerWrapClass = 'flex items-center gap-4';
    const outerClass = 'my-6 w-full max-w-full overflow-x-auto flex justify-center';

    return (
      <div className={outerClass}>
        <div className={innerWrapClass}>
          {tableData.playerNames && (
            <div className="flex h-full w-16 items-center justify-center">
              <p className="transform -rotate-90 text-center text-base font-bold leading-tight text-gray-900 whitespace-nowrap">
                {tableData.playerNames.row.split(' ')[0]}
                <br />
                {tableData.playerNames.row.split(' ').slice(1).join(' ')}
              </p>
            </div>
          )}
          <div className="flex-1">
            {tableData.playerNames && (
              <p className="mb-2 text-center text-base font-bold text-gray-900">
                {tableData.playerNames.column}
              </p>
            )}
            <table className={tableElClass}>
              <thead className="bg-white">
                <tr>
                  {tableData.headers.map((header) => (
                    <th
                      key={header}
                      className={`${cellBorder} bg-white px-4 py-3 text-center text-sm text-gray-900 font-bold`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {tableData.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => {
                      const isRowHeader = tableData.rowHeaders && cellIndex === 0;
                      return (
                        <td
                          key={cellIndex}
                          className={`${cellBorder} bg-white px-4 py-3 text-center text-sm text-gray-900 ${
                            isRowHeader ? 'font-bold' : ''
                          }`}
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
    );
  };

  const renderGovFrqPrompt = (q: Question) => {
    if (examType === 'gov' && q.govScotusStimulus) {
      return (
        <>
          {q.questionTitle ? (
            <h2 className={`mb-4 font-black text-gray-900 tracking-tight ${fontClass}`}>{q.questionTitle}</h2>
          ) : null}
          <div
            className={`mb-5 space-y-4 text-gray-900 font-['Times_New_Roman',Times,serif] leading-relaxed ${fontClass}`}
          >
            <p className="font-bold whitespace-pre-line">{q.govScotusStimulus.instructions}</p>
            <p className="text-center font-normal italic">{q.govScotusStimulus.caseCitation}</p>
            <p className="font-normal whitespace-pre-line">{q.govScotusStimulus.summary}</p>
            {q.prompt.trim() ? (
              <p className="border-t border-gray-200 pt-4 font-semibold whitespace-pre-line">{q.prompt}</p>
            ) : null}
          </div>
        </>
      );
    }
    if (examType === 'gov' && q.questionTitle) {
      return (
        <>
          <h2 className={`mb-4 font-black text-gray-900 tracking-tight ${fontClass}`}>{q.questionTitle}</h2>
          {q.prompt.trim() ? (
            <p
              className={`mb-5 font-semibold text-gray-900 leading-relaxed whitespace-pre-line font-['Times_New_Roman',Times,serif] ${fontClass}`}
            >
              {q.prompt}
            </p>
          ) : null}
        </>
      );
    }
    return (
      <p className={`font-semibold text-gray-900 mb-5 leading-relaxed whitespace-pre-line ${fontClass}`}>
        {q.prompt}
      </p>
    );
  };

  const renderPartBlock = (part: Part, partIndex: number, largeText: boolean) => {
    const answerMargin = largeText ? '' : 'ml-6';
    const textAreaClass = largeText
      ? `w-full min-h-[min(52vh,460px)] px-4 py-4 rounded-xl border-2 border-gray-200 ${answerFocusClass} outline-none text-base text-gray-900 resize-y leading-relaxed transition-colors`
      : `w-full px-3 py-2.5 rounded border border-gray-300 ${answerFocusClass} outline-none text-sm text-gray-900 resize-y transition-colors`;

    return (
      <div className="space-y-4">
        <div className="flex gap-3">
          <span className={`font-black text-gray-700 shrink-0 ${fontClass}`}>{part.label})</span>
          <p className={`text-gray-900 font-semibold leading-relaxed whitespace-pre-line ${fontClass}`}>
            {part.text}
          </p>
        </div>

        <div className={answerMargin}>
          {part.answerType === 'text' ? (
            <textarea
              placeholder="Enter your answer here..."
              value={textAnswers[`${currentQuestionIndex}-${part.label}`] || ''}
              onChange={(e) => handleTextAnswer(`${currentQuestionIndex}-${part.label}`, e.target.value)}
              rows={largeText ? 18 : 4}
              className={textAreaClass}
            />
          ) : part.answerType === 'draw' ? (
            (() => {
              const drawKey = `${currentQuestionIndex}-${part.label}`;
              const isLocked = savedDrawingKeys.has(drawKey);
              const drawH = largeText ? 'min-h-[min(48vh,420px)]' : 'h-[400px]';
              return (
                <div className={`${drawH} relative border-2 border-gray-300 rounded-lg overflow-hidden`}>
                  <DrawingPad
                    isLarge={true}
                    className="w-full relative"
                    hideDoneButton
                    initialData={drawingAnswers[drawKey]}
                    onSave={(data) => handleDrawingAnswer(drawKey, data)}
                  />
                  {isLocked && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 z-20">
                      <div className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-full px-4 py-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        <span className="text-sm font-bold text-gray-700">Drawing saved</span>
                      </div>
                      <button type="button" onClick={() => unlockDrawing(drawKey)} className="text-xs font-semibold text-gray-400 hover:text-gray-600 underline transition-colors">
                        Edit drawing
                      </button>
                    </div>
                  )}
                </div>
              );
            })()
          ) : null}
        </div>

        {part.subparts && (
          <div className={`${largeText ? 'mt-2' : 'ml-6'} space-y-6`}>
            {part.subparts.map((subpart, si) => (
              <div key={si} className="space-y-3">
                <div className="flex gap-3">
                  <span className={`font-black text-gray-700 shrink-0 ${fontClass}`}>{subpart.label}.</span>
                  <p className={`text-gray-900 font-semibold leading-relaxed whitespace-pre-line ${fontClass}`}>
                    {subpart.text}
                  </p>
                </div>
                <div className="ml-6">
                  {subpart.answerType === 'text' ? (
                    <textarea
                      placeholder="Enter your answer here..."
                      value={textAnswers[`${currentQuestionIndex}-${part.label}-${subpart.label}`] || ''}
                      onChange={(e) =>
                        handleTextAnswer(
                          `${currentQuestionIndex}-${part.label}-${subpart.label}`,
                          e.target.value
                        )
                      }
                      rows={largeText ? 12 : 4}
                      className={textAreaClass}
                    />
                  ) : subpart.answerType === 'draw' ? (
                    (() => {
                      const drawKey = `${currentQuestionIndex}-${part.label}-${subpart.label}`;
                      const isLocked = savedDrawingKeys.has(drawKey);
                      return (
                        <div className="h-[400px] relative border-2 border-gray-300 rounded overflow-hidden">
                          <DrawingPad
                            isLarge={true}
                            className="w-full relative"
                            hideDoneButton
                            onSave={(data) => handleDrawingAnswer(drawKey, data)}
                            initialData={drawingAnswers[drawKey]}
                          />
                          {isLocked && (
                            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 z-20">
                              <div className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-full px-4 py-2">
                                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                <span className="text-sm font-bold text-gray-700">Drawing saved</span>
                              </div>
                              <button type="button" onClick={() => unlockDrawing(drawKey)} className="text-xs font-semibold text-gray-400 hover:text-gray-600 underline transition-colors">
                                Edit drawing
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })()
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const ResultsView = () => {
    const [resultsIndex, setResultsIndex] = useState(0);
    const rq = questions.questions[resultsIndex];
    return (
      <>
      <div className="flex min-h-[calc(100dvh-56px)] w-full justify-center bg-gradient-to-b from-slate-50 via-white to-slate-100/85 px-3 py-6 sm:px-6 sm:py-10">
        <div className="flex h-[min(920px,calc(100dvh-3.5rem))] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/[0.05]">
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 pb-28 sm:px-6 sm:py-6">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Results</p>
          <h2 className={`font-bold text-gray-900 ${fontClass}`}>
            Question {resultsIndex + 1} of {questions.questions.length}
          </h2>
          </div>

        <div className="mb-4">{renderGovFrqPrompt(rq)}</div>
        {rq.image && (
          <img src={rq.image.src} alt="Question" className="max-h-[300px] object-contain mb-6 rounded" />
        )}
        {rq.tableData && renderTable(rq.tableData, 'results')}
        {rq.directionsAfterTable ? (
          <p className={`font-semibold text-gray-900 mb-6 leading-relaxed whitespace-pre-line ${fontClass}`}>
            {rq.directionsAfterTable}
          </p>
        ) : null}

        <div className="space-y-8 mt-6">
          {rq.parts.map((part, partIndex) => (
              <div key={partIndex} className="space-y-4">
                <div className="flex gap-3">
                <span className={`font-bold text-gray-700 shrink-0 ${fontClass}`}>{part.label})</span>
                <p className={`text-gray-900 font-semibold leading-relaxed whitespace-pre-line ${fontClass}`}>
                  {part.text}
                </p>
              </div>
              {part.answerType === 'text' && (
                <div className="ml-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Your response</p>
                  <div className="p-3 bg-gray-50 rounded border border-gray-200 text-sm text-gray-800">
                    {textAnswers[`${resultsIndex}-${part.label}`] || <span className="italic text-gray-400">No response</span>}
                  </div>
                  {part.answer && (
                    <div className="mt-3">
                      <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-1.5">Correct answer</p>
                      <div className="p-3 bg-green-50 rounded border border-green-200 text-sm text-gray-800">
                        {typeof part.answer === 'string' ? part.answer : ''}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {part.answerType === 'draw' && (
                <div className="ml-6 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Your response</p>
                    <div className="h-[300px] bg-white rounded border border-gray-200">
                      {drawingAnswers[`${resultsIndex}-${part.label}`] ? (
                        <img src={drawingAnswers[`${resultsIndex}-${part.label}`]} alt="Your drawing" className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm italic">No drawing</div>
                      )}
                    </div>
                  </div>
                  {part.answer && (
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-1.5">Correct response</p>
                      <div className="h-[300px] bg-white rounded border border-gray-200">
                        {typeof part.answer === 'object' ? (
                          <img src={(part.answer as StaticImageData).src} alt="Correct" className="w-full h-full object-contain" />
                        ) : (
                          <div className="p-3 text-sm">{part.answer}</div>
                        )}
                      </div>
                    </div>
                          )}
                        </div>
              )}
              {part.subparts && (
                <div className="ml-6 space-y-6">
                  {part.subparts.map((subpart, si) => (
                    <div key={si} className="space-y-3">
                      <div className="flex gap-3">
                        <span className={`font-bold text-gray-700 shrink-0 ${fontClass}`}>{subpart.label}.</span>
                        <p className={`text-gray-900 font-semibold leading-relaxed whitespace-pre-line ${fontClass}`}>
                          {subpart.text}
                        </p>
                      </div>
                      {subpart.answerType === 'text' && (
                        <div className="ml-6">
                          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Your response</p>
                          <div className="p-3 bg-gray-50 rounded border border-gray-200 text-sm text-gray-800">
                            {textAnswers[`${resultsIndex}-${part.label}-${subpart.label}`] || <span className="italic text-gray-400">No response</span>}
                  </div>
                          {subpart.answer && (
                            <div className="mt-3">
                              <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-1.5">Correct answer</p>
                              <div className="p-3 bg-green-50 rounded border border-green-200 text-sm">
                                {typeof subpart.answer === 'string' ? subpart.answer : ''}
                    </div>
                  </div>
                )}
                        </div>
                      )}
                      {subpart.answerType === 'draw' && (
                        <div className="ml-6 flex flex-col sm:flex-row gap-4">
                          <div className="flex-1">
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Your response</p>
                            <div className="h-[300px] bg-white rounded border border-gray-200">
                              {drawingAnswers[`${resultsIndex}-${part.label}-${subpart.label}`] ? (
                                <img src={drawingAnswers[`${resultsIndex}-${part.label}-${subpart.label}`]} alt="Your drawing" className="w-full h-full object-contain" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm italic">No drawing</div>
                                        )}
                                      </div>
                                    </div>
                          {subpart.answer && (
                            <div className="flex-1">
                              <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-1.5">Correct response</p>
                              <div className="h-[300px] bg-white rounded border border-gray-200">
                                      {typeof subpart.answer === 'object' ? (
                                  <img src={(subpart.answer as StaticImageData).src} alt="Correct" className="w-full h-full object-contain" />
                                ) : (
                                  <div className="p-3 text-sm">{subpart.answer}</div>
                                      )}
                                    </div>
                                  </div>
                                )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
          </div>
        </div>
      </div>

        {/* Results navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <button
              onClick={() => { setResultsIndex(i => Math.max(0, i - 1)); window.scrollTo({ top: 0 }); }}
              disabled={resultsIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded font-semibold text-sm border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-gray-700"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <span className="text-sm font-medium text-gray-500">
              Question {resultsIndex + 1} of {questions.questions.length}
            </span>
            {resultsIndex < questions.questions.length - 1 ? (
              <button
                onClick={() => { setResultsIndex(i => i + 1); window.scrollTo({ top: 0 }); }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded font-semibold text-sm border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => { setShowResults(false); setCurrentQuestionIndex(0); window.scrollTo({ top: 0 }); }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded font-semibold text-sm text-white ${accentColor} hover:opacity-90 transition-opacity`}
              >
                Return to Exam
              </button>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Fixed Header (matches MCQ unit test top bar) ── */}
      {!showResults && (
        <header className="fixed top-0 left-0 right-0 z-50 h-14 px-6 py-0 flex items-center justify-between flex-shrink-0 bg-white border-b border-gray-200">
          {/* Left: logo — same placement as MCQ unit test */}
          <button
            type="button"
            onClick={openExitFlow}
            className="flex items-center gap-2.5 p-0.5 -m-0.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 text-left"
            aria-label="Exit exam"
            title="Exit"
          >
            <Image src="/images/dojoIconJan26.svg" alt="" width={26} height={26} unoptimized />
            <span className="text-sm font-black text-gray-900 tracking-wide">AP Dojo</span>
          </button>

          {/* Center: section label (MCQ-style) */}
          <span className="text-sm font-medium text-gray-500 hidden sm:block">
            Section II – Free Response
              </span>

          {/* Right: Exit + tools — order aligned with MCQ unit test */}
          <div className="flex items-center gap-1.5">
                <button
              type="button"
              onClick={openExitFlow}
              className="px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded hover:bg-gray-50 text-gray-700 transition-colors"
            >
              Exit
                </button>
                <button
              type="button"
              onClick={() => setShowScratchPanel(p => !p)}
              className={`px-3 py-1.5 text-xs font-semibold border rounded transition-colors ${
                showScratchPanel
                  ? 'border-gray-400 bg-gray-100 text-gray-900'
                  : 'border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              Scratch Paper
            </button>
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <button
                type="button"
                onClick={() => setQuestionFontSize(s => Math.max(0, s - 1))}
                disabled={questionFontSize === 0}
                className="px-2 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-r border-gray-300"
                title="Decrease text size"
              >
                −
              </button>
              <span className="px-2 text-xs font-semibold text-gray-700 select-none">Aa</span>
              <button
                type="button"
                onClick={() => setQuestionFontSize(s => Math.min(FONT_SIZE_MAX, s + 1))}
                disabled={questionFontSize === FONT_SIZE_MAX}
                className="px-2 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-l border-gray-300"
                title="Increase text size"
              >
                +
                </button>
            </div>
            {!isTimerPaused ? (
              <button
                type="button"
                onClick={() => setIsTimerPaused(true)}
                className="px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded hover:bg-gray-50 text-gray-700 transition-colors flex items-center gap-1"
              >
                <Pause className="w-3 h-3" /> Pause
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsTimerPaused(false)}
                className="px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center gap-1"
              >
                <Play className="w-3 h-3" /> Resume
              </button>
            )}
            {showTimer ? (
              <button
                type="button"
                onClick={() => setShowTimer(false)}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded border min-w-[72px] text-center transition-colors ${
                  timeRemaining <= 300 && timeRemaining > 0
                    ? 'border-red-400 text-red-600 bg-red-50'
                    : 'border-gray-300 text-gray-900 bg-white'
                }`}
                title="Hide timer"
              >
                {formatTime(timeRemaining)}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowTimer(true)}
                className="px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded hover:bg-gray-50 text-gray-700 transition-colors"
                title="Show timer"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </header>
      )}

      {/* ── Scratch Paper Panel ── */}
      {!showResults && showScratchPanel && (
        <div
          className="fixed top-14 right-0 bg-white border-l border-gray-200 flex flex-col z-[55]"
          style={{ width: '380px', height: 'calc(100vh - 56px)' }}
        >
          {/* Tab links — same voice as type pad (mono, plain text) */}
          <div className="flex items-baseline gap-8 px-4 pt-4 pb-3 border-b border-gray-100 shrink-0 font-mono">
            <button
              type="button"
              onClick={() => setScratchTab('draw')}
              className={`text-left text-lg font-semibold tracking-tight bg-transparent border-0 p-0 cursor-pointer transition-colors ${
                scratchTab === 'draw'
                  ? 'text-gray-900 underline decoration-2 underline-offset-4'
                  : 'text-gray-400 hover:text-gray-700 hover:underline decoration-1 underline-offset-4'
              }`}
            >
              drawing pad
            </button>
            <button
              type="button"
              onClick={() => setScratchTab('text')}
              className={`text-left text-lg font-semibold tracking-tight bg-transparent border-0 p-0 cursor-pointer transition-colors ${
                scratchTab === 'text'
                  ? 'text-gray-900 underline decoration-2 underline-offset-4'
                  : 'text-gray-400 hover:text-gray-700 hover:underline decoration-1 underline-offset-4'
              }`}
            >
              type pad
            </button>
          </div>

          {/* Panel body */}
          <div className="flex-1 overflow-hidden">
            {scratchTab === 'draw' ? (
              <div className="w-full h-full">
                <DrawingPad
                  key={scratchDrawKey}
                  isLarge={true}
                  className="w-full h-full"
                  hideDoneButton
                  onSave={() => {}}
                />
              </div>
            ) : (
              <textarea
                value={scratchNotes}
                onChange={e => setScratchNotes(e.target.value)}
                placeholder="Type your scratch notes here..."
                className="w-full h-full p-4 text-base text-gray-800 resize-none outline-none font-mono leading-relaxed"
              />
            )}
          </div>
        </div>
      )}

      {/* Blur overlay when paused */}
      {isTimerPaused && !showResults && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-40" style={{ top: '56px' }} />
      )}

      {/* ── Main content ── */}
      <div
        style={{
          marginTop: showResults ? 0 : '56px',
          marginRight: !showResults && showScratchPanel ? '380px' : 0,
          transition: 'margin-right 0.2s ease',
        }}
        className={!showResults ? 'pb-28' : undefined}
      >
        {showResults ? (
          <ResultsView />
        ) : (
          <div className="p-8 max-w-3xl mx-auto">
            {/* Question label */}
            <div className="mb-6 flex items-center gap-3">
              <span className={`font-black text-gray-900 ${fontClass}`}>
                Question {currentQuestionIndex + 1}
              </span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                of {questions.questions.length}
              </span>
            </div>

            {/* Prompt / Gov SCOTUS stimulus layout */}
            {renderGovFrqPrompt(currentQuestion)}

            {/* Image */}
              {currentQuestion.image && (
              <div className="mb-5">
                  <img 
                    src={currentQuestion.image.src}
                    alt="Question"
                  className="max-h-[320px] object-contain rounded cursor-pointer"
                    onClick={() => {
                      if (currentQuestion.image) {
                        setSelectedImage(currentQuestion.image);
                        setShowImageModal(true);
                      }
                    }}
                  />
                </div>
              )}

            {/* Table */}
            {currentQuestion.tableData && renderTable(currentQuestion.tableData, 'exam')}
            {currentQuestion.directionsAfterTable ? (
              <p className={`font-semibold text-gray-900 mb-6 leading-relaxed whitespace-pre-line ${fontClass}`}>
                {currentQuestion.directionsAfterTable}
              </p>
            ) : null}

            {/* Parts — fixed order A→B→C; one expanded at a time, no reordering */}
            <div className="mt-6">
              {currentQuestion.parts.length > 0 ? (
                <div
                  className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-gray-50/70 shadow-[4px_4px_0px_0px_rgba(17,24,39,0.06)] divide-y divide-gray-200"
                  role="tablist"
                  aria-label="Free response parts"
                >
                  {currentQuestion.parts.map((part, i) => {
                    const isOpen = i === activePartIndex;
                    const summary =
                      part.text.length > 120 ? `${part.text.slice(0, 118).trim()}…` : part.text;
                    return (
                      <div key={`${part.label}-${i}`} id={`frq-part-${currentQuestionIndex}-${i}`}>
                        {isOpen ? (
                          <div className="bg-gray-50/90 p-5 sm:p-6">
                            {renderPartBlock(part, i, true)}
                          </div>
                        ) : (
                          <button
                            type="button"
                            role="tab"
                            aria-selected={false}
                            onClick={() => {
                              setActivePartIndex(i);
                              requestAnimationFrame(() => {
                                document
                                  .getElementById(`frq-part-${currentQuestionIndex}-${i}`)
                                  ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                              });
                            }}
                            className="flex w-full items-start gap-3 bg-white/55 px-5 py-3.5 text-left transition-colors hover:bg-gray-100/90 sm:px-6"
                          >
                            <span className={`font-black text-gray-900 shrink-0 ${fontClass}`}>
                              {part.label})
                            </span>
                            <span
                              className={`min-w-0 flex-1 text-gray-600 leading-snug line-clamp-2 ${fontClass}`}
                            >
                              {summary}
                            </span>
                            <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" aria-hidden />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar — matches MCQ unit test navigator + Prev / Next */}
      {!showResults && (
        <div className="fixed bottom-0 left-0 right-0 bg-white z-50 border-t border-gray-200">
          {!hideExpandingQuestionNav && (
            <AnimatePresence>
              {showQuestionNavigator && (
                <motion.div
                  key="question-navigator"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  className="overflow-hidden w-full border-b border-gray-200"
                >
                  <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {questions.questions.map((_, index) => {
                        const isCurrent = index === currentQuestionIndex;
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              if (isTimerPaused) return;
                              setCurrentQuestionIndex(index);
                              setShowQuestionNavigator(false);
                              window.scrollTo({ top: 0 });
                            }}
                            disabled={isTimerPaused}
                            className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                              isTimerPaused
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-300'
                                : isCurrent
                                  ? `${
                                      examType === 'macro' ? 'bg-blue-600' : 'bg-green-600'
                                    } text-white ring-2 ring-offset-1 ring-gray-400`
                                  : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                            }`}
                            title={isTimerPaused ? 'Timer paused' : `Question ${index + 1}`}
                          >
                            {index + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <span
              className={`text-xs text-gray-400 font-medium shrink-0 ${
                hideExpandingQuestionNav ? 'hidden min-[400px]:block' : 'hidden sm:block'
              }`}
            >
              Sec II &bull; {questions.questions.length} Questions
            </span>
            {hideExpandingQuestionNav ? (
              <p className="min-w-0 flex-1 text-center text-sm font-semibold tabular-nums text-gray-800 sm:text-base">
                Question {currentQuestionIndex + 1} of {questions.questions.length}
              </p>
            ) : (
              <div className="relative flex-1 max-w-md" ref={questionNavigatorRef}>
                <button
                  type="button"
                  onClick={() => setShowQuestionNavigator(v => !v)}
                  disabled={isTimerPaused}
                  className={`w-full px-4 py-2.5 rounded-lg font-semibold flex items-center justify-between transition-colors ${
                    isTimerPaused
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <List className="w-5 h-5" />
                    <span>
                      Question {currentQuestionIndex + 1} of {questions.questions.length}
                    </span>
                  </div>
                  {showQuestionNavigator ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            )}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={goToPrev}
                disabled={currentQuestionIndex === 0 || isTimerPaused}
                className={`px-6 py-2.5 rounded font-semibold transition-colors flex items-center gap-2 ${
                  currentQuestionIndex === 0 || isTimerPaused
                    ? 'border border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                >
                  Previous
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isTimerPaused) return;
                  if (currentQuestionIndex < questions.questions.length - 1) {
                    goToNext();
                  } else {
                    handleSubmit();
                  }
                }}
                disabled={isTimerPaused}
                className={`px-6 py-2.5 rounded font-semibold transition-colors flex items-center gap-2 ${
                  isTimerPaused
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : currentQuestionIndex === questions.questions.length - 1
                      ? 'bg-black hover:bg-gray-800 text-white'
                      : 'bg-gray-900 hover:bg-gray-700 text-white'
                }`}
              >
                {currentQuestionIndex === questions.questions.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit confirmation modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4">
          <div className="bg-gray-50 border-2 border-black rounded-md shadow-2xl w-full max-w-sm p-6">
            <h2 className="text-base font-black text-gray-900 mb-1">Exit exam?</h2>
            <p className="text-sm text-gray-500 mb-6">
              Your progress will <span className="font-bold text-gray-700">not be saved</span>. Any answers or drawings you've entered will be lost.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitModal(false)}
                className="flex-1 py-2.5 text-sm font-black border-2 border-gray-300 rounded text-gray-700 hover:border-gray-400 hover:bg-white transition-colors"
              >
                Stay
              </button>
              <button
                onClick={handleExit}
                className="flex-1 py-2.5 text-sm font-black border-2 border-red-600 bg-red-600 rounded text-white hover:bg-red-700 hover:border-red-700 transition-colors"
              >
                Exit anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image modal */}
      {showImageModal && selectedImage && (
        <div 
          className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img 
              src={selectedImage.src} 
              alt="Question" 
              className="max-w-full max-h-[90vh] object-contain rounded"
            />
            <button
              onClick={e => { e.stopPropagation(); setShowImageModal(false); }}
              className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 
