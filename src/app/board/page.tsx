'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import '@excalidraw/excalidraw/index.css';
import { graphGymScenarios, GraphGymScenario } from '@/data/graphGymScenarios';
import { Lock, Play, X, CheckCircle2, Circle, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasValidSeasonPass } from '@/lib/utils';
import { SeasonPassModal } from '@/components/SeasonPassModal';

const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  { ssr: false }
);

const SIDEBAR_WIDTH = 360;
const BOARD_TOP_OFFSET = '5rem';

function getUnitFromLessonId(lessonId: string): string {
  const unitNum = lessonId.split('.')[0];
  return `Unit ${unitNum}`;
}

function pickRandomScenario(): GraphGymScenario {
  const index = Math.floor(Math.random() * graphGymScenarios.length);
  return graphGymScenarios[index];
}

function getSubjectFromScenario(scenario: GraphGymScenario): 'macro' | 'micro' {
  const s = scenario.subject;
  return Array.isArray(s) ? s[0] : s;
}

export default function BoardPage() {
  const { user, userData } = useAuthContext();
  const [activeScenario, setActiveScenario] = useState<GraphGymScenario>(() => pickRandomScenario());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [showSeasonPassModal, setShowSeasonPassModal] = useState(false);

  const boardSubject = getSubjectFromScenario(activeScenario);
  const isPremium = !!(user && userData && hasValidSeasonPass(userData, boardSubject));

  const handleShuffle = () => {
    setActiveScenario(pickRandomScenario());
    setIsSubmitted(false);
    setIsVideoExpanded(false);
    setCheckedItems(new Set());
  };

  const handleSubmit = () => {
    if (!isPremium) {
      setShowSeasonPassModal(true);
      return;
    }
    setIsSubmitted(true);
  };

  const excalidrawInitialData = useMemo(
    () => ({
      elements: [],
      appState: {
        theme: 'light',
        currentItemStrokeWidth: 2, // medium (1=thin, 2=medium, 4=thick)
      },
    }),
    []
  );

  const handleChecklistToggle = (id: number) => {
    if (!isSubmitted) return;
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div
      className="fixed left-0 right-0 bottom-0 flex bg-[#fafafa]"
      style={{ top: BOARD_TOP_OFFSET }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap"
      />

      {/* Left sidebar: sticky note + resources (Basecamp-style) */}
      <aside
        className="flex-shrink-0 flex flex-col h-full overflow-y-auto border-r border-gray-200 bg-[#f6f6f6]"
        style={{ width: SIDEBAR_WIDTH }}
      >
        <div className="p-4 space-y-5">
          {/* Mission Control–style card: beige card, yellow tilted unit, scenario in big black text */}
          <div
            className="relative rounded-xl p-0 flex-shrink-0 overflow-hidden"
            style={{
              backgroundColor: '#f5f0e8',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {/* Top row: yellow unit banner (straight) + shuffle button aligned */}
            <div className="flex items-center justify-between gap-2 px-4 pt-3 pb-2">
              <div
                className="rounded px-3.5 py-1.5 flex-shrink-0"
                style={{
                  backgroundColor: '#f5e642',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                <span className="text-sm font-bold uppercase tracking-wide text-gray-900">
                  {getUnitFromLessonId(activeScenario.lessonId)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleShuffle}
                className="p-2 rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white transition-colors flex-shrink-0"
                aria-label="Shuffle to another scenario"
              >
                <Shuffle className="w-5 h-5" strokeWidth={3} />
              </button>
            </div>
            <div className="p-5 pt-0 pb-5">
              <h3 className="text-xl font-black text-black leading-tight">
                {activeScenario.title}
              </h3>
              <p className="text-base text-gray-600 mt-3 leading-snug">
                {activeScenario.description}
              </p>
              {activeScenario.toDoList && activeScenario.toDoList.length > 0 && (
                <ul className="list-disc list-inside text-base text-gray-600 mt-3 space-y-1">
                  {activeScenario.toDoList.slice(0, 3).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {!isSubmitted ? (
            <>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Resources</p>
                <div className="rounded-lg bg-white border border-gray-200 p-3 flex items-center gap-3 text-gray-600">
                  <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm">Sample answer</span>
                </div>
                <div className="rounded-lg bg-white border border-gray-200 p-3 flex items-center gap-3 text-gray-600">
                  <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm">Video walkthrough</span>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full py-2.5 px-4 rounded-lg bg-[#1f7f4c] hover:bg-[#196b3f] text-white text-sm font-medium transition-colors"
              >
                Submit answer
              </button>
            </>
          ) : (
            <div className="space-y-5 relative">
              <AnimatePresence>
                {isVideoExpanded && activeScenario.videoExplanation && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-white/95 z-50 flex flex-col p-4"
                    style={{ top: BOARD_TOP_OFFSET }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-gray-800">Video walkthrough</p>
                      <button
                        onClick={() => setIsVideoExpanded(false)}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                        aria-label="Close video"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex-1 min-h-0 flex items-center justify-center">
                      <video
                        src={activeScenario.videoExplanation}
                        controls
                        autoPlay
                        className="max-w-full max-h-full object-contain rounded-lg"
                        playsInline
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={`space-y-4 ${isVideoExpanded ? 'opacity-0 pointer-events-none' : ''}`}>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Sample answer</p>
                  <div className="rounded-lg bg-white border border-gray-200 overflow-hidden">
                    {activeScenario.correctImage ? (
                      <img
                        src={activeScenario.correctImage}
                        alt="Sample answer"
                        className="w-full h-auto object-contain max-h-[200px]"
                      />
                    ) : (
                      <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
                        <p className="text-sm text-gray-400">No image</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Self-correction checklist</p>
                  <ul className="divide-y divide-gray-100">
                    {activeScenario.checklist.map((item) => {
                      const isChecked = checkedItems.has(item.id);
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => handleChecklistToggle(item.id)}
                            className={`w-full text-left flex items-start gap-3 py-2.5 px-0 rounded transition-colors hover:bg-gray-50/80 ${
                              isChecked ? 'opacity-90' : ''
                            }`}
                          >
                            <span className="flex-shrink-0 mt-0.5 text-gray-400">
                              {isChecked ? (
                                <CheckCircle2 className="w-4 h-4 text-green-600" strokeWidth={2} />
                              ) : (
                                <Circle className="w-4 h-4" strokeWidth={2} />
                              )}
                            </span>
                            <span
                              className={`text-sm leading-snug ${
                                isChecked ? 'text-gray-500 line-through' : 'text-gray-800'
                              }`}
                            >
                              {item.text}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {activeScenario.videoExplanation && !isVideoExpanded && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Video walkthrough</p>
                    <button
                      type="button"
                      onClick={() => setIsVideoExpanded(true)}
                      className="w-full rounded-lg bg-white border border-gray-200 overflow-hidden group hover:border-gray-300 transition-colors"
                    >
                      <div className="aspect-video bg-gray-100 relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                          <span className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                            <Play className="w-5 h-5 text-gray-700 ml-0.5 fill-current" />
                          </span>
                        </div>
                        <span className="text-sm text-gray-400">Play video</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Excalidraw */}
      <div
        className="flex-1 min-h-0 overflow-hidden"
        style={{ minWidth: 0 }}
      >
        <Excalidraw
          initialData={excalidrawInitialData}
          viewModeEnabled={isSubmitted}
          UIOptions={{
            canvasActions: {
              toggleTheme: true,
              changeViewBackgroundColor: true,
              loadScene: true,
              saveToActiveFile: false,
              export: { saveFileToDisk: true },
            },
          }}
        />
      </div>

      {showSeasonPassModal && (
        <SeasonPassModal
          subject={boardSubject}
          onClose={() => setShowSeasonPassModal(false)}
        />
      )}
    </div>
  );
}
