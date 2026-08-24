'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Source_Serif_4 } from 'next/font/google';
import { DrawingPad } from '@/components/DrawingPad';
import { ExpandableQuestionImage } from '@/components/ExpandableQuestionImage';
import { VideoModal } from '@/components/VideoModal';
import {
  Pause,
  Play,
  PlayCircle,
  Lock,
  Eye,
  List,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { unitFrqTimeLimitSeconds } from '@/data/unitTestMeta';
import { useAuthContext } from '@/contexts/AuthContext';
import {
  getUnitFrqTestId,
  saveTestProgress,
  saveTestResult,
} from '@/lib/testProgress';
import type { CourseSubject } from '@/lib/courseSubject';

/** Readable on-screen FRQ body type — replaces hard-to-read Times New Roman. */
const frqBody = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

interface TableData {
  title?: string;
  headers: string[];
  rows: (string | number)[][];
  rowHeaders?: boolean;
  playerNames?: {
    row: string;
    column: string;
  };
}

interface SubPart {
  label: string;
  text: string;
  answerType: 'draw' | 'text';
  answer?: StaticImageData | string;
  partImage?: { src: string; alt?: string };
  templateImageUrl?: string;
}

interface Part {
  label: string;
  text: string;
  answerType: 'draw' | 'text' | null;
  answer?: StaticImageData | string;
  subparts?: SubPart[];
  tableData?: TableData;
  /** Stimulus image after stem (e.g. summary statistics table SVG). */
  stimulusImage?: { src: string; alt?: string };
  partImage?: { src: string; alt?: string };
  drawPrompt?: string;
  templateImageUrl?: string;
}

interface FrqImageRef {
  src: string;
  alt?: string;
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
  image?: StaticImageData | FrqImageRef;
  tableData?: TableData;
  /** Shown after `tableData` (e.g. Gov quantitative: task line after the stimulus table). */
  directionsAfterTable?: string;
  /** Gov unit FRQ pack: optional walkthrough shown on the results screen. */
  walkthroughVideoUrl?: string;
  parts: Part[];
}

interface FullExamFRQProps {
  questions: {
    examTitle: string;
    questions: Question[];
  };
  examType?: 'macro' | 'micro' | 'gov' | 'stats';
  backUrl?: string;
  /** When set with gov/stats examType, submission is saved for unit FRQ completion tracking. */
  unitNumber?: number;
  /** Hide the bottom “Question N of M” dropdown + numbered grid; use Prev/Next only. */
  hideExpandingQuestionNav?: boolean;
}

/** Macro/Micro FRQ practice sessions default. */
const DEFAULT_FRQ_TOTAL_SECONDS = 50 * 60;

function frqImageSrc(image: StaticImageData | FrqImageRef): string {
  return image.src;
}

function isFrqPackExamType(examType?: FullExamFRQProps['examType']): boolean {
  return examType === 'gov' || examType === 'stats';
}

function statsFrqImageContainerClass(examType?: FullExamFRQProps['examType']): string {
  return isFrqPackExamType(examType) ? 'flex justify-center w-full' : '';
}

function statsFrqImageClass(
  examType?: FullExamFRQProps['examType'],
  variant: 'default' | 'sketch' = 'default'
): string {
  const maxH = variant === 'sketch' ? 'max-h-[280px]' : 'max-h-[320px]';
  const base = `${maxH} max-w-full object-contain rounded cursor-pointer`;
  if (isFrqPackExamType(examType)) {
    return `${base} border border-gray-300 bg-white p-1`;
  }
  if (variant === 'sketch') {
    return `${base} border border-gray-200`;
  }
  return base;
}

const FONT_SIZE_CLASSES = ['text-sm', 'text-base', 'text-lg', 'text-xl'];
const FONT_SIZE_MAX = FONT_SIZE_CLASSES.length - 1;

export function FullExamFRQ({
  questions,
  examType = 'macro',
  backUrl,
  unitNumber,
  hideExpandingQuestionNav = false,
}: FullExamFRQProps) {
  const router = useRouter();
  const { user } = useAuthContext();
  const frqSessionTotalSeconds =
    examType === 'gov' || examType === 'stats'
      ? unitFrqTimeLimitSeconds(questions.questions.length, examType)
      : DEFAULT_FRQ_TOTAL_SECONDS;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [drawingAnswers, setDrawingAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(frqSessionTotalSeconds);
  const [showTimer, setShowTimer] = useState(true);
  const [questionFontSize, setQuestionFontSize] = useState(1);
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
    examType === 'macro'
      ? 'bg-blue-600'
      : examType === 'micro'
        ? 'bg-green-600'
        : examType === 'stats'
          ? 'bg-orange-600'
          : 'bg-violet-600';

  const backLinkClass =
    examType === 'macro'
      ? 'text-blue-700 hover:text-blue-900'
      : examType === 'micro'
        ? 'text-green-700 hover:text-green-900'
        : examType === 'stats'
          ? 'text-orange-700 hover:text-orange-900'
          : 'text-violet-700 hover:text-violet-900';

  const walkthroughAccent =
    examType === 'stats'
      ? {
          bar: 'border-l-orange-500 bg-orange-50/70',
          muted: 'text-orange-800/70',
          strong: 'text-orange-950',
          btn: 'bg-orange-600 text-white hover:bg-orange-700',
        }
      : examType === 'gov'
        ? {
            bar: 'border-l-violet-500 bg-violet-50/70',
            muted: 'text-violet-800/70',
            strong: 'text-violet-950',
            btn: 'bg-violet-600 text-white hover:bg-violet-700',
          }
        : {
            bar: 'border-l-sky-500 bg-sky-50/70',
            muted: 'text-sky-800/70',
            strong: 'text-sky-950',
            btn: 'bg-sky-600 text-white hover:bg-sky-700',
          };

  const answerFocusClass =
    examType === 'macro'
      ? 'focus:border-blue-500 focus:ring-1 focus:ring-blue-400'
      : examType === 'micro'
        ? 'focus:border-green-500 focus:ring-1 focus:ring-green-400'
        : examType === 'stats'
          ? 'focus:border-orange-500 focus:ring-1 focus:ring-orange-400'
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

  const handleSubmit = async () => {
    setShowResults(true);
    window.scrollTo({ top: 0 });

    const isUnitFrqPack =
      unitNumber != null &&
      (examType === 'gov' || examType === 'stats') &&
      questions.questions.length > 0;

    if (user && isUnitFrqPack) {
      const subject = examType as CourseSubject;
      const testId = getUnitFrqTestId(unitNumber, subject);
      const totalQuestions = questions.questions.length;
      try {
        await saveTestResult({
          userId: user.uid,
          testType: 'full_frq',
          testId,
          score: 0,
          totalQuestions,
        });
        await saveTestProgress({
          userId: user.uid,
          testType: 'full_frq',
          testId,
          progress: {
            textAnswers,
            drawingAnswers,
            currentQuestionIndex,
            isSubmitted: true,
            totalQuestions,
            startedAt: new Date(),
            lastUpdated: new Date(),
          },
        });
      } catch (error) {
        console.error('[FullExamFRQ] Error saving unit FRQ result:', error);
      }
    }
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
  const hasWalkthroughVideos =
    isFrqPackExamType(examType) && questions.questions.some((q) => q.walkthroughVideoUrl);
  const walkthroughQuestionCount = questions.questions.filter((q) => q.walkthroughVideoUrl).length;
  const currentQuestionHasWalkthrough = !!currentQuestion.walkthroughVideoUrl;

  const renderWalkthroughCard = (
    mode: 'locked' | 'unlocked',
    options?: { onWatch?: () => void; className?: string },
  ) => {
    const isLocked = mode === 'locked';

    return (
      <div
        className={`flex items-center gap-3 border-l-[3px] py-3 pl-3.5 pr-3 sm:gap-4 sm:pl-4 ${walkthroughAccent.bar} ${options?.className ?? ''}`}
        role="note"
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/80 ${walkthroughAccent.strong}`}
          aria-hidden
        >
          {isLocked ? <Lock className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
        </div>

        <div className="min-w-0 flex-1">
          <p className={`text-sm font-semibold leading-snug ${walkthroughAccent.strong}`}>
            {isLocked
              ? currentQuestionHasWalkthrough
                ? 'Solution video unlocks when you submit'
                : `${walkthroughQuestionCount} solution video${walkthroughQuestionCount === 1 ? '' : 's'} unlock after submit`
              : 'Solution video ready'}
          </p>
          <p className={`mt-0.5 text-xs leading-snug ${walkthroughAccent.muted}`}>
            {isLocked
              ? currentQuestionHasWalkthrough
                ? 'A step-by-step walkthrough for this question.'
                : 'Available on your results page for questions that have one.'
              : 'Compare your work to a model solution.'}
          </p>
        </div>

        {!isLocked && options?.onWatch ? (
          <button
            type="button"
            onClick={options.onWatch}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${walkthroughAccent.btn}`}
          >
            <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
            Watch
          </button>
        ) : null}
      </div>
    );
  };

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
            {tableData.title ? (
              <p className="mb-3 text-center text-base font-bold text-gray-900 leading-snug">
                {tableData.title}
              </p>
            ) : null}
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
            className={`mb-5 space-y-4 text-gray-900 leading-relaxed ${frqBody.className} ${fontClass}`}
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
    if ((examType === 'gov' || examType === 'stats') && q.questionTitle) {
      return (
        <>
          <h2 className={`mb-4 font-black text-gray-900 tracking-tight ${fontClass}`}>{q.questionTitle}</h2>
          {q.prompt.trim() ? (
            <p
              className={`mb-5 font-semibold text-gray-900 leading-relaxed whitespace-pre-line ${frqBody.className} ${fontClass}`}
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

  const renderQuestionStimulusImage = (
    image: StaticImageData | FrqImageRef | undefined,
    options?: { clickable?: boolean; marginClass?: string }
  ) => {
    if (!image?.src) return null;
    const marginClass = options?.marginClass ?? 'mb-5';
    const imageClassName = statsFrqImageClass(examType);
    if (options?.clickable === false) {
      return (
        <div className={`${marginClass} ${statsFrqImageContainerClass(examType)}`}>
          <img
            src={frqImageSrc(image)}
            alt={'alt' in image && image.alt ? image.alt : 'Question stimulus'}
            className={imageClassName}
          />
        </div>
      );
    }
    return (
      <div className={`${marginClass} ${statsFrqImageContainerClass(examType)}`}>
        <ExpandableQuestionImage
          src={frqImageSrc(image)}
          alt={'alt' in image && image.alt ? image.alt : 'Question stimulus'}
          imageClassName={imageClassName}
        />
      </div>
    );
  };

  const renderPartBlock = (part: Part, partIndex: number, largeText: boolean) => {
    const answerMargin = largeText ? '' : 'ml-6';
    const promptFont = examType === 'gov' ? frqBody.className : '';
    const textAreaClass = largeText
      ? `w-full min-h-[min(52vh,460px)] px-4 py-4 rounded-xl border-2 border-gray-200 ${answerFocusClass} outline-none text-base text-gray-900 resize-y leading-relaxed transition-colors ${promptFont}`
      : `w-full px-3 py-2.5 rounded border border-gray-300 ${answerFocusClass} outline-none text-sm text-gray-900 resize-y transition-colors ${promptFont}`;

    return (
      <div className="space-y-4">
        <div className="flex gap-3">
          <span className={`font-black text-gray-700 shrink-0 ${promptFont} ${fontClass}`}>{part.label})</span>
          <p className={`text-gray-900 font-semibold leading-relaxed whitespace-pre-line ${promptFont} ${fontClass}`}>
            {part.text}
          </p>
        </div>

        {part.tableData ? renderTable(part.tableData, 'part') : null}

        {part.stimulusImage ? (
          <div className={`${answerMargin} ${statsFrqImageContainerClass(examType)}`}>
            <ExpandableQuestionImage
              src={part.stimulusImage.src}
              alt={part.stimulusImage.alt ?? 'Part stimulus'}
              imageClassName={statsFrqImageClass(examType)}
            />
          </div>
        ) : null}

        {part.partImage && !part.drawPrompt && !part.templateImageUrl ? (
          <div className={`${answerMargin} ${statsFrqImageContainerClass(examType)}`}>
            <ExpandableQuestionImage
              src={part.partImage.src}
              alt={part.partImage.alt ?? 'Part diagram'}
              imageClassName={statsFrqImageClass(examType)}
            />
          </div>
        ) : null}

        <div className={answerMargin}>
          {part.answerType === 'text' ? (
            <>
              <textarea
                placeholder="Enter your answer here..."
                value={textAnswers[`${currentQuestionIndex}-${part.label}`] || ''}
                onChange={(e) => handleTextAnswer(`${currentQuestionIndex}-${part.label}`, e.target.value)}
                rows={largeText ? 18 : 4}
                className={textAreaClass}
              />
              {part.drawPrompt ? (
                <div className="mt-6 space-y-3">
                  <p className={`font-semibold text-gray-900 whitespace-pre-line ${fontClass}`}>{part.drawPrompt}</p>
                  {part.partImage ? (
                    <div className={statsFrqImageContainerClass(examType)}>
                      <ExpandableQuestionImage
                        src={part.partImage.src}
                        alt={part.partImage.alt ?? 'Sketch grid'}
                        imageClassName={statsFrqImageClass(examType, 'sketch')}
                      />
                    </div>
                  ) : null}
                  {(() => {
                    const drawKey = `${currentQuestionIndex}-${part.label}-draw`;
                    const drawH = largeText ? 'min-h-[min(48vh,420px)]' : 'h-[400px]';
                    return (
                      <div className={`${drawH} relative border-2 border-gray-300 rounded-lg overflow-hidden`}>
                        <DrawingPad
                          key={drawKey}
                          isLarge={true}
                          className="relative h-full w-full"
                          hideDoneButton
                          initialData={drawingAnswers[drawKey]}
                          templateImageUrl={part.templateImageUrl}
                          onSave={(data) => handleDrawingAnswer(drawKey, data)}
                        />
                      </div>
                    );
                  })()}
                </div>
              ) : null}
            </>
          ) : part.answerType === 'draw' ? (
            (() => {
              const drawKey = `${currentQuestionIndex}-${part.label}`;
              const drawH = largeText ? 'min-h-[min(48vh,420px)]' : 'h-[400px]';
              return (
                <div className={`${drawH} relative border-2 border-gray-300 rounded-lg overflow-hidden`}>
                  <DrawingPad
                    key={drawKey}
                    isLarge={true}
                    className="relative h-full w-full"
                    hideDoneButton
                    initialData={drawingAnswers[drawKey]}
                    templateImageUrl={part.templateImageUrl}
                    onSave={(data) => handleDrawingAnswer(drawKey, data)}
                  />
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
                {subpart.partImage && !subpart.templateImageUrl ? (
                  <div className={`ml-6 ${statsFrqImageContainerClass(examType)}`}>
                    <ExpandableQuestionImage
                      src={subpart.partImage.src}
                      alt={subpart.partImage.alt ?? 'Subpart diagram'}
                      imageClassName={statsFrqImageClass(examType, 'sketch')}
                    />
                  </div>
                ) : null}
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
                      return (
                        <div className="h-[400px] relative border-2 border-gray-300 rounded overflow-hidden">
                          <DrawingPad
                            key={drawKey}
                            isLarge={true}
                            className="relative h-full w-full"
                            hideDoneButton
                            onSave={(data) => handleDrawingAnswer(drawKey, data)}
                            initialData={drawingAnswers[drawKey]}
                            templateImageUrl={subpart.templateImageUrl}
                          />
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
    const [walkthroughOpen, setWalkthroughOpen] = useState(false);
    const rq = questions.questions[resultsIndex];

    useEffect(() => {
      setWalkthroughOpen(false);
    }, [resultsIndex]);

    return (
      <>
      <VideoModal
        isOpen={walkthroughOpen && !!rq.walkthroughVideoUrl}
        onClose={() => setWalkthroughOpen(false)}
        videoUrl={rq.walkthroughVideoUrl ?? ''}
        title={`Question ${resultsIndex + 1} walkthrough`}
      />
      <div className="min-h-dvh w-full bg-gradient-to-b from-slate-50 via-white to-slate-100/85 pb-36">
        {backUrl ? (
          <div className="sticky top-0 z-40 border-b border-slate-200/90 bg-slate-50/95 backdrop-blur-md">
            <div className="mx-auto flex w-full max-w-7xl items-center px-3 py-3 sm:px-6">
              <Link
                href={backUrl}
                className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${backLinkClass}`}
              >
                <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
                Back to unit practice tests
              </Link>
            </div>
          </div>
        ) : null}
        <div className="px-3 pt-6 sm:px-6 sm:pt-8">
        <div className="mx-auto mb-10 w-full max-w-7xl rounded-2xl border border-slate-200/90 bg-white/95 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/[0.05] sm:mb-12">
          <div className="px-4 py-5 sm:px-6 sm:py-6">
        <div className="mb-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Results</p>
            <h2 className={`font-bold text-gray-900 ${fontClass}`}>
              Question {resultsIndex + 1} of {questions.questions.length}
            </h2>
          </div>
          {rq.walkthroughVideoUrl
            ? renderWalkthroughCard('unlocked', { onWatch: () => setWalkthroughOpen(true), className: 'mt-4' })
            : null}
        </div>

        <div className="mb-4">{renderGovFrqPrompt(rq)}</div>
        {rq.tableData && renderTable(rq.tableData, 'results')}
        {rq.directionsAfterTable ? (
          <p className={`font-semibold text-gray-900 mb-6 leading-relaxed whitespace-pre-line ${fontClass}`}>
            {rq.directionsAfterTable}
          </p>
        ) : null}
        {renderQuestionStimulusImage(rq.image, { clickable: false, marginClass: 'mb-6' })}

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
                      <div className="p-3 bg-green-50 rounded border border-green-200 text-sm text-gray-800 whitespace-pre-line">
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
      </div>

        {/* Results navigation */}
        <div
          className={`fixed bottom-0 left-0 right-0 border-t border-gray-200 z-50 bg-white transition-opacity ${
            walkthroughOpen ? 'pointer-events-none opacity-40' : ''
          }`}
          aria-hidden={walkthroughOpen}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <button
              onClick={() => { setResultsIndex(i => Math.max(0, i - 1)); window.scrollTo({ top: 0 }); }}
              disabled={walkthroughOpen || resultsIndex === 0}
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
                disabled={walkthroughOpen}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded font-semibold text-sm border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-gray-700"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => { setShowResults(false); setCurrentQuestionIndex(0); window.scrollTo({ top: 0 }); }}
                disabled={walkthroughOpen}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded font-semibold text-sm text-white disabled:opacity-40 disabled:cursor-not-allowed ${accentColor} hover:opacity-90 transition-opacity`}
              >
                Exit
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

            {hasWalkthroughVideos ? renderWalkthroughCard('locked', { className: 'mb-6' }) : null}

            {/* Prompt / Gov SCOTUS stimulus layout */}
            {renderGovFrqPrompt(currentQuestion)}

            {/* Table */}
            {currentQuestion.tableData && renderTable(currentQuestion.tableData, 'exam')}
            {currentQuestion.directionsAfterTable ? (
              <p className={`font-semibold text-gray-900 mb-6 leading-relaxed whitespace-pre-line ${fontClass}`}>
                {currentQuestion.directionsAfterTable}
              </p>
            ) : null}

            {renderQuestionStimulusImage(currentQuestion.image)}

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
                            {(
                              Boolean(textAnswers[`${currentQuestionIndex}-${part.label}`]?.trim()) ||
                              Boolean(
                                part.subparts?.some((sp) =>
                                  textAnswers[`${currentQuestionIndex}-${part.label}-${sp.label}`]?.trim()
                                )
                              )
                            ) && (
                              <span className="mt-0.5 shrink-0 self-center bg-violet-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white">
                                Saved
                              </span>
                            )}
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
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      {questions.questions.map((_, index) => {
                        const isCurrent = index === currentQuestionIndex;
                        const accentLink =
                          examType === 'macro'
                            ? 'text-blue-700 hover:text-blue-900'
                            : examType === 'micro'
                              ? 'text-green-700 hover:text-green-900'
                              : examType === 'stats'
                                ? 'text-orange-700 hover:text-orange-900'
                                : 'text-violet-700 hover:text-violet-900';
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
                            className={`text-base font-semibold underline underline-offset-4 transition sm:text-lg ${
                              isTimerPaused
                                ? 'cursor-not-allowed text-gray-300 no-underline'
                                : isCurrent
                                  ? `${accentLink} decoration-2 font-bold`
                                  : accentLink
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

    </div>
  );
} 
