'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

interface ConceptItem {
  title: string;
  description: string | React.ReactNode;
  voicePrompt: string;
  branchNote: string;
}

const ECON_TOPICS: ConceptItem[] = [
  {
    title: 'Profit Maximization',
    description: (
      <>
        Explain the <InlineMath math="MR = MC" /> rule and how firms determine output levels to
        maximize total profit.
      </>
    ),
    voicePrompt:
      'In one minute: state the rule a profit‑maximizing firm uses to pick output, and explain in plain language why marginal revenue should equal marginal cost at that quantity.',
    branchNote: 'Sketch the MR, MC, and demand picture in words: where does the firm produce, and what happens if it produces one unit more?',
  },
  {
    title: 'Perfect Competition',
    description: (
      <>
        Describe the characteristics of many small firms, price-taking behavior, and long-run
        equilibrium where <InlineMath math="P = MC = ATC" />.
      </>
    ),
    voicePrompt:
      'In one minute: define a price‑taker, then describe long‑run equilibrium for a competitive firm using P, MC, and ATC.',
    branchNote: 'List three conditions that must hold for a market to behave like perfect competition in the model.',
  },
  {
    title: 'Price Discrimination',
    description:
      'Outline how firms with market power charge different prices to different consumers to capture consumer surplus, focusing on the conditions required for success.',
    voicePrompt:
      'In one minute: what must a firm know or prevent so that charging different prices to different groups actually increases profit instead of collapsing to one price?',
    branchNote: 'Contrast first‑ vs third‑degree price discrimination with one sentence each.',
  },
];

function pad(n: number) {
  return String(n).padStart(2, '0');
}

type Branch = 'voice' | 'written' | null;

export default function ConceptExplorer() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [branchStep, setBranchStep] = useState<Branch>(null);
  const [recordingTopicIndex, setRecordingTopicIndex] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isScoringVoice, setIsScoringVoice] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceFeedback, setVoiceFeedback] = useState('');
  const [voiceError, setVoiceError] = useState('');
  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef('');

  useEffect(() => {
    setBranchStep(null);
  }, [activeIndex]);

  const toggle = (i: number) => {
    setActiveIndex(prev => (prev === i ? null : i));
  };

  const activeTopic =
    activeIndex !== null ? ECON_TOPICS[activeIndex] : null;
  const recordingTopic =
    recordingTopicIndex !== null ? ECON_TOPICS[recordingTopicIndex] : null;

  const showTopicsBackLink = activeIndex !== null && branchStep !== null;
  const browserSupportsSpeech =
    typeof window !== 'undefined' &&
    !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

  const resetVoiceOverlayState = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onresult = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
    setIsScoringVoice(false);
    setVoiceTranscript('');
    transcriptRef.current = '';
    setVoiceFeedback('');
    setVoiceError('');
  };

  const scoreVoiceResponse = async (topic: ConceptItem, transcriptText: string) => {
    if (!transcriptText.trim()) return;
    setIsScoringVoice(true);
    setVoiceError('');
    try {
      const response = await fetch('/api/voice-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: topic.voicePrompt,
          transcript: transcriptText,
          topicTitle: topic.title,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Unable to generate feedback right now.');
      }
      setVoiceFeedback(data.feedback || 'Solid attempt. Keep your answer focused on the prompt.');
    } catch (err: any) {
      setVoiceError(err?.message || 'Could not generate feedback.');
    } finally {
      setIsScoringVoice(false);
    }
  };

  const startVoiceRecording = () => {
    setVoiceError('');
    setVoiceFeedback('');
    setVoiceTranscript('');
    transcriptRef.current = '';

    if (!browserSupportsSpeech) {
      setVoiceError('Speech recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognitionCtor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    let finalTranscript = '';
    recognition.onresult = (event: any) => {
      let rollingTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const segment = event.results[i][0].transcript || '';
        if (event.results[i].isFinal) {
          finalTranscript += `${segment} `;
        } else {
          rollingTranscript += segment;
        }
      }
      setVoiceTranscript((finalTranscript + rollingTranscript).trim());
      transcriptRef.current = (finalTranscript + rollingTranscript).trim();
    };

    recognition.onerror = (event: any) => {
      setVoiceError(event?.error ? `Recording error: ${event.error}` : 'Recording failed.');
    };

    recognition.onend = () => {
      setIsRecording(false);
      const trimmed = finalTranscript.trim() || transcriptRef.current.trim();
      if (recordingTopicIndex !== null && trimmed) {
        scoreVoiceResponse(ECON_TOPICS[recordingTopicIndex], trimmed);
      }
    };

    recognitionRef.current = recognition;
    setIsRecording(true);
    recognition.start();
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  return (
    <div
      className="min-h-screen w-full min-w-0 bg-white overflow-x-auto relative"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {/* Page-level back: restores terms + branch picker */}
      <AnimatePresence>
        {showTopicsBackLink && (
          <motion.button
            type="button"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            onClick={() => setBranchStep(null)}
            className="fixed top-5 left-5 z-[80] font-mono text-xs sm:text-sm text-gray-500 hover:text-gray-900 underline decoration-1 underline-offset-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded"
          >
            ← topics
          </motion.button>
        )}
      </AnimatePresence>

      <div className="flex flex-row w-full min-w-0 min-h-screen pt-14 sm:pt-16 pb-20 px-3 sm:px-5 md:px-8">
        {/* Terms rail — slides almost off when in a branch */}
        <motion.aside
          className="shrink-0 overflow-hidden border-r border-gray-100/80"
          initial={false}
          animate={{
            width: branchStep !== null ? 52 : 280,
            opacity: branchStep !== null ? 0.28 : 1,
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
        >
          <nav className="sticky top-24 w-full min-w-0 space-y-1 pr-1">
            <ol className="space-y-0">
              {ECON_TOPICS.map((topic, i) => {
                const isOpen = activeIndex === i;
                return (
                  <li key={i} className="border-b border-gray-100 last:border-0">
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      className="w-full text-left py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 rounded-sm"
                    >
                      <div className="flex items-baseline gap-3">
                        <span
                          className="text-2xl sm:text-3xl font-black leading-none tabular-nums transition-colors"
                          style={{ color: isOpen ? '#3b82f6' : '#d1d5db' }}
                        >
                          {pad(i + 1)}.
                        </span>
                        <span
                          className="text-lg sm:text-2xl font-black leading-tight transition-colors"
                          style={{ color: isOpen ? '#111' : '#9ca3af' }}
                        >
                          {topic.title}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </motion.aside>

        {/* Main stage — horizontal choose-your-path */}
        <div className="flex-1 min-w-0 min-h-[70vh] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {activeTopic && activeIndex !== null ? (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                className="w-full overflow-hidden"
              >
                <div className="relative w-full overflow-hidden rounded-sm">
                  <motion.div
                    className="flex flex-row w-[200%]"
                    animate={{ x: branchStep === null ? '0%' : '-50%' }}
                    transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                  >
                    {/* —— Level 0: description (first), then wide branch cards stacked vertically —— */}
                    <div className="w-1/2 shrink-0 min-w-0 box-border pr-3 sm:pr-5">
                      <div className="relative grid w-full min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start max-w-[980px]">
                        {branchStep === null && (
                          <svg
                            className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M43 36 C 50 36, 53 24, 60 22"
                              fill="none"
                              stroke="#22d3ee"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M43 36 C 50 36, 53 68, 60 74"
                              fill="none"
                              stroke="#22d3ee"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                        {/* Show description before sliding right; swap to connector once past it */}
                        <div className="relative z-10 w-full min-w-0">
                          {branchStep === null ? (
                            <div className="text-base sm:text-lg font-medium leading-relaxed text-gray-600 border-l border-gray-200 pl-4 sm:pl-6">
                              {activeTopic.description}
                            </div>
                          ) : (
                            <div className="flex items-start pt-2 lg:pt-4">
                              <div className="flex items-center gap-2 text-gray-300">
                                <span className="h-px w-10 sm:w-14 bg-gray-300" />
                                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
                                  from terms
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="relative z-10 flex flex-col gap-3 w-full min-w-0">
                          <button
                            type="button"
                            onClick={() => {
                              setBranchStep('voice');
                              if (activeIndex !== null) {
                                setRecordingTopicIndex(activeIndex);
                              }
                            }}
                            className="w-full text-left rounded-lg border border-gray-200 bg-white px-4 py-4 sm:px-5 sm:py-5 min-h-[6rem] hover:border-gray-300 hover:bg-gray-50/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/25"
                          >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
                              Voice
                            </p>
                            <p className="font-mono text-base sm:text-lg md:text-xl font-semibold leading-snug text-gray-900 tracking-tight">
                              {activeTopic.voicePrompt}
                            </p>
                            <span className="mt-3 inline-block font-mono text-xs text-gray-400">
                              choose path →
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setBranchStep('written')}
                            className="w-full text-left rounded-lg border border-gray-200 bg-white px-4 py-4 sm:px-5 sm:py-5 min-h-[6rem] hover:border-gray-300 hover:bg-gray-50/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/25"
                          >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
                              Written
                            </p>
                            <p className="font-mono text-sm sm:text-base leading-relaxed text-gray-600">
                              {activeTopic.branchNote}
                            </p>
                            <span className="mt-3 inline-block font-mono text-xs text-gray-400">
                              choose path →
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* —— Level 1: three columns share one panel width (grid, no zoom hacks) —— */}
                    <div className="w-1/2 shrink-0 min-w-0 box-border pl-2 sm:pl-4 border-l border-gray-100">
                      <div
                        className="relative grid w-full min-w-0 min-h-[240px] gap-4
                        grid-cols-1
                        lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)_minmax(0,1fr)]
                        lg:gap-x-3 lg:gap-y-0 lg:items-stretch"
                      >
                        {branchStep !== null && (
                          <svg
                            className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M26 24 C 33 24, 37 24, 45 24"
                              fill="none"
                              stroke="#e879f9"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                            />
                            <path
                              d="M56 24 C 64 24, 70 24, 78 24"
                              fill="none"
                              stroke="#22d3ee"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                        {/* Column 1 — minimal connector back to terms */}
                        <div className="relative z-10 min-w-0 lg:pr-1 flex items-start pt-1">
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="h-px w-10 bg-gray-300" />
                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
                              from terms
                            </span>
                          </div>
                        </div>

                        {/* Column 2 — active path */}
                        <div className="relative z-10 min-w-0 rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-4 sm:px-4 sm:py-4">
                          {branchStep === 'voice' && (
                            <div className="space-y-4">
                              <p className="font-mono text-base sm:text-lg md:text-xl font-semibold leading-snug text-gray-900 tracking-tight">
                                {activeTopic.voicePrompt}
                              </p>
                              <button
                                type="button"
                                onClick={() => setRecordingTopicIndex(activeIndex)}
                                className="font-mono text-sm text-gray-400 hover:text-gray-700 underline decoration-1 underline-offset-4"
                              >
                                click to answer
                              </button>
                            </div>
                          )}
                          {branchStep === 'written' && (
                            <div className="space-y-4">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                                Written
                              </p>
                              <p className="font-mono text-lg sm:text-xl leading-relaxed text-gray-800">
                                {activeTopic.branchNote}
                              </p>
                              <p className="font-mono text-sm text-gray-400">More drills coming here.</p>
                            </div>
                          )}
                        </div>

                        {/* Column 3 — next paths: wide vertical stack */}
                        <div className="relative z-10 min-w-0 flex flex-col gap-2 border-t border-gray-100 pt-4 lg:border-t-0 lg:border-l lg:pl-3">
                          {branchStep === 'voice' && (
                            <>
                              <button
                                type="button"
                                className="w-full text-left rounded-lg border border-gray-200 bg-white px-4 py-4 sm:px-5 sm:py-4 hover:bg-gray-50 transition-colors min-h-[5rem]"
                              >
                                <p className="font-mono text-xs font-semibold text-gray-900 mb-1.5">
                                  90-second drill
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                  Timed follow-up — same prompt, tighter scoring rubric.
                                </p>
                              </button>
                              <button
                                type="button"
                                className="w-full text-left rounded-lg border border-gray-200 bg-white px-4 py-4 sm:px-5 sm:py-4 hover:bg-gray-50 transition-colors min-h-[5rem]"
                              >
                                <p className="font-mono text-xs font-semibold text-gray-900 mb-1.5">
                                  Exam-style follow-up
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                  A second question that builds on your spoken answer.
                                </p>
                              </button>
                            </>
                          )}
                          {branchStep === 'written' && (
                            <div className="rounded-lg border border-dashed border-gray-200 px-5 py-6 text-sm text-gray-400 leading-relaxed">
                              Branching practice for written work could slot in here — same horizontal
                              pattern as voice.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-400 text-sm font-medium pl-2"
              >
                Select a topic from the list.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Recording — ultra-minimal overlay */}
      <AnimatePresence>
        {recordingTopic && recordingTopicIndex !== null && (
          <motion.div
            key="rec"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-neutral-900/20"
            onClick={() => {
              resetVoiceOverlayState();
              setRecordingTopicIndex(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              className="relative w-full max-w-lg rounded-md bg-white px-10 py-12 sm:px-12 sm:py-14"
              onClick={e => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => {
                  resetVoiceOverlayState();
                  setRecordingTopicIndex(null);
                }}
                className="absolute top-4 right-4 text-gray-300 hover:text-gray-600 p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" strokeWidth={1.25} />
              </button>

              <p className="font-mono text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-gray-900 pr-6 mb-12">
                {recordingTopic.voicePrompt}
              </p>

              <div className="flex flex-col items-center gap-8">
                <button
                  type="button"
                  onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                  disabled={isScoringVoice}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-red-400 text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                  aria-label="Record"
                >
                  <Mic className="w-5 h-5" strokeWidth={1.5} />
                </button>
                <p className="font-mono text-[11px] text-gray-400 text-center">
                  {isRecording ? 'Listening... tap to stop.' : 'Tap to record your answer.'}
                </p>
                {!browserSupportsSpeech && (
                  <p className="font-mono text-[11px] text-amber-500 text-center">
                    Use Chrome/Safari for voice capture.
                  </p>
                )}
                {voiceTranscript && (
                  <div className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                      transcript
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">{voiceTranscript}</p>
                  </div>
                )}
                {isScoringVoice && (
                  <p className="font-mono text-xs text-gray-400 text-center">Generating feedback...</p>
                )}
                {voiceFeedback && (
                  <div className="w-full rounded-md border border-blue-100 bg-blue-50/60 px-4 py-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-500 mb-1">
                      ai feedback
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">{voiceFeedback}</p>
                  </div>
                )}
                {voiceError && (
                  <p className="font-mono text-xs text-red-500 text-center">{voiceError}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
