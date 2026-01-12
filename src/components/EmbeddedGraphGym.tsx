'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Lock, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { graphGymScenarios, GraphGymScenario } from '@/data/graphGymScenarios';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasValidSeasonPass } from '@/lib/utils';
import '@excalidraw/excalidraw/index.css';

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  },
);

interface EmbeddedGraphGymProps {
  scenarioId: number;
  prompt: string;
  subject: 'macro' | 'micro';
}

export function EmbeddedGraphGym({ scenarioId, prompt, subject }: EmbeddedGraphGymProps) {
  const { user, userData } = useAuthContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [excalidrawKey, setExcalidrawKey] = useState(0);

  // Check if user has access (logged in + season pass)
  const hasAccess = useMemo(() => {
    if (!user || !userData) return false;
    return hasValidSeasonPass(userData, subject);
  }, [user, userData, subject]);

  // Find the specific scenario
  const scenario = useMemo(() => {
    return graphGymScenarios.find(s => s.id === scenarioId);
  }, [scenarioId]);

  // Excalidraw initial data
  const excalidrawInitialData = useMemo(() => ({
    elements: [],
    appState: {
      theme: "light",
      currentItemStrokeWidth: 1,
    },
  }), []);

  // Reset when scenario changes
  useEffect(() => {
    setIsSubmitted(false);
    setCheckedItems(new Set());
    setExcalidrawKey(prev => prev + 1);
  }, [scenarioId]);

  if (!scenario) {
    return (
      <div className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
        <p className="text-black font-bold">Scenario not found</p>
      </div>
    );
  }

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowSampleAnswer(true);
  };

  const handleChecklistToggle = (id: number) => {
    if (!isSubmitted) return;
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      {/* Header with Prompt */}
      <div className="bg-blue-600 border-b-4 border-black p-6 text-white">
        <h3 className="text-xl font-black mb-2">Graph Gym Challenge</h3>
        <p className="text-base font-medium opacity-95">{prompt}</p>
      </div>

      {/* Main Content - Split Layout */}
      <div className="flex flex-col lg:flex-row gap-0 h-[600px] lg:h-[700px]">
        {/* Drawing Area - Left Side */}
        <div className="flex-1 h-full border-b-4 lg:border-b-0 lg:border-r-4 border-black relative bg-gray-50 overflow-hidden">
          {!hasAccess && (
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
              <div className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 max-w-md mx-4 text-center">
                <h4 className="text-xl font-black text-black mb-3">Join the Dojo to Access Graph Gym</h4>
                <p className="text-sm text-gray-700 mb-4">
                  Unlock unlimited Graph Gym challenges, Dojo Drills, and more with a Season Pass.
                </p>
                <Button
                  asChild
                  className="bg-black text-white hover:bg-gray-800 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5"
                >
                  <a href={`/purchase/season-pass?courseType=${subject}`}>
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          )}
          
          {hasAccess && (
            <>
              <div className="w-full h-full absolute inset-0">
                <Excalidraw
                  key={excalidrawKey}
                  viewModeEnabled={isSubmitted}
                  gridModeEnabled={false}
                  UIOptions={{
                    canvasActions: {
                      toggleTheme: false,
                      changeViewBackgroundColor: false,
                      loadScene: false,
                      saveToActiveFile: false,
                      export: false,
                    },
                  }}
                  initialData={excalidrawInitialData}
                />
              </div>
              
              {isSubmitted && (
                <div className="absolute top-4 left-4 z-50 bg-white rounded-full p-2 shadow-lg border-2 border-black">
                  <Lock className="w-5 h-5 text-black" />
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Sidebar - Instructions and Feedback */}
        <div className="w-full lg:w-80 flex-shrink-0 bg-white flex flex-col h-full lg:max-h-none overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Instructions */}
            {!isSubmitted && (
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-black mb-3">Instructions</h4>
                <p className="text-sm text-black leading-relaxed font-medium mb-3">
                  {scenario.description}
                </p>
                {scenario.toDoList && scenario.toDoList.length > 0 && (
                  <div className="mt-3 pt-3 border-t-2 border-black">
                    <p className="text-xs font-black uppercase tracking-widest text-black mb-2">To Do:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {scenario.toDoList.map((item, index) => (
                        <li key={index} className="text-xs text-black leading-relaxed font-medium">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            {!isSubmitted && hasAccess && (
              <Button
                onClick={handleSubmit}
                size="lg"
                className="w-full bg-black text-white hover:bg-gray-800 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5"
              >
                Submit Answer
              </Button>
            )}

            {/* Sample Answer - After Submission - Always Show */}
            {isSubmitted && scenario.correctImage && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-black mb-3">Sample Answer</h4>
                  <div className="bg-white border-2 border-black rounded-lg overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <img
                      src={scenario.correctImage}
                      alt="Sample answer"
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Checklist */}
                {scenario.checklist && scenario.checklist.length > 0 && (
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest text-black mb-3">Checklist</h4>
                    <div className="space-y-2">
                      {scenario.checklist.map((item) => {
                        const isChecked = checkedItems.has(item.id);
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleChecklistToggle(item.id)}
                            className={`w-full text-left p-2 rounded-lg border-2 border-black transition-all ${
                              isChecked
                                ? 'bg-green-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                : 'bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {isChecked ? (
                                <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-black border-2 border-black rounded-full flex-shrink-0" />
                              )}
                              <span className={`text-xs font-bold ${
                                isChecked ? 'text-black line-through' : 'text-black'
                              }`}>
                                {item.text}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Video Explanation */}
                {scenario.videoExplanation && (
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest text-black mb-3">Video Walkthrough</h4>
                    <div className="bg-white border-2 border-black rounded-lg overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] aspect-video relative cursor-pointer group">
                      <video
                        src={scenario.videoExplanation}
                        controls
                        className="w-full h-full object-contain"
                        playsInline
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}

                {/* Try More Graph Challenges Button */}
                <div className="mt-4 pt-4 border-t-2 border-black">
                  <Link
                    href="/graph-gym"
                    className="block w-full bg-white rounded-lg border-2 border-black p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 flex items-center justify-between font-bold text-black text-sm"
                  >
                    <span>Try More Graph Challenges</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

