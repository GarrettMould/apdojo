'use client';

import React, { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRight, Lock, CheckCircle2, Circle, LockKeyhole, Shuffle, ChevronDown, Monitor, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCourseTheme, useCourseContext } from '@/contexts/CourseContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { graphGymScenarios, GraphGymScenario } from '@/data/graphGymScenarios';
import { hasValidSeasonPass } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import '@excalidraw/excalidraw/index.css';

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  },
);

function JoinDojoModal({ isOpen, onClose, selectedSubject }: { isOpen: boolean; onClose: () => void; selectedSubject: 'macro' | 'micro' }) {
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 max-w-md w-full text-center relative"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-3xl font-black text-gray-900 mb-4">
            Join the Dojo for this Feature and more!
          </h3>
          <p className="text-gray-700 mb-6">
            Unlock unlimited quiz generation, all Dojo Drills, FRQ practice, and full-length exams with a Season Pass.
          </p>
          <Link
            href={`/purchase/season-pass?courseType=${selectedSubject}`}
            className={`inline-flex items-center justify-center w-full px-6 py-3 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg ${
              selectedSubject === 'macro'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-green-600 hover:bg-green-700'
            }`}
            onClick={() => onClose()}
          >
            Learn More <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function GraphGym() {
  const theme = useCourseTheme();
  const { currentCourse } = useCourseContext();
  const { user, userData } = useAuthContext();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [excalidrawKey, setExcalidrawKey] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  const [showJoinDojoModal, setShowJoinDojoModal] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Check if user has access (logged in + season pass)
  const hasAccess = useMemo(() => {
    if (!user || !userData) return false;
    return hasValidSeasonPass(userData, currentCourse);
  }, [user, userData, currentCourse]);

  // Filter scenarios by current subject
  const filteredScenarios = useMemo(() => {
    let scenarios = graphGymScenarios.filter(scenario => scenario.subject === currentCourse);
    
    // Filter by unit if selected
    if (selectedUnit !== null) {
      scenarios = scenarios.filter(scenario => {
        const unitFromLessonId = parseInt(scenario.lessonId.split('.')[0]);
        return unitFromLessonId === selectedUnit;
      });
    }
    
    return scenarios;
  }, [currentCourse, selectedUnit]);

  // Get available units from scenarios
  const availableUnits = useMemo(() => {
    const units = new Set<number>();
    graphGymScenarios
      .filter(scenario => scenario.subject === currentCourse)
      .forEach(scenario => {
        const unit = parseInt(scenario.lessonId.split('.')[0]);
        units.add(unit);
      });
    return Array.from(units).sort((a, b) => a - b);
  }, [currentCourse]);

  // Reset to first scenario when subject or unit changes
  useEffect(() => {
    setCurrentScenarioIndex(0);
    setIsSubmitted(false);
    setCheckedItems(new Set());
    setExcalidrawKey(prev => prev + 1); // Clear Excalidraw board when subject/unit changes
  }, [currentCourse, selectedUnit]);

  const activeScenario = filteredScenarios[currentScenarioIndex] || filteredScenarios[0];

  // Show message if no scenarios available for current subject
  if (filteredScenarios.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 mb-2">No scenarios available</p>
          <p className="text-gray-600">Graph Gym scenarios for {currentCourse === 'macro' ? 'Macroeconomics' : 'Microeconomics'} are coming soon!</p>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleChecklistToggle = (id: number) => {
    if (!isSubmitted) return; // Only allow toggling after submission
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

  const handleShuffleScenario = () => {
    // Reset submission state and checked items
    setIsSubmitted(false);
    setCheckedItems(new Set());
    
    // Clear Excalidraw by forcing a remount with new key
    setExcalidrawKey(prev => prev + 1);
    
    // Shuffle to a random scenario (different from current) from filtered scenarios
    const availableIndices = filteredScenarios
      .map((_, index) => index)
      .filter(index => index !== currentScenarioIndex);
    
    if (availableIndices.length > 0) {
      const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      setCurrentScenarioIndex(randomIndex);
    } else {
      // If only one scenario, just reset to it
      setCurrentScenarioIndex(0);
    }
  };

  const handleUnitSelect = (unit: number) => {
    if (!hasAccess) {
      setShowJoinDojoModal(true);
      setShowUnitDropdown(false);
      return;
    }
    setSelectedUnit(unit);
    setShowUnitDropdown(false);
  };

  const handleUnitDropdownClick = () => {
    if (!hasAccess) {
      setShowJoinDojoModal(true);
      return;
    }
    setShowUnitDropdown(!showUnitDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!showUnitDropdown) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.unit-dropdown-container')) {
        setShowUnitDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUnitDropdown]);

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gray-50">
      {/* View Toggle Button - Fixed top right */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-1">
        <button
          onClick={() => setViewMode('desktop')}
          className={`p-2 rounded transition-colors ${
            viewMode === 'desktop'
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-gray-100'
          }`}
          aria-label="Desktop view"
        >
          <Monitor className="w-5 h-5" />
        </button>
        <button
          onClick={() => setViewMode('mobile')}
          className={`p-2 rounded transition-colors ${
            viewMode === 'mobile'
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-gray-100'
          }`}
          aria-label="Mobile view"
        >
          <Smartphone className="w-5 h-5" />
        </button>
      </div>

      {viewMode === 'desktop' ? (
        <>
          {/* Main Drawing Area - Excalidraw Container */}
          <div className="flex-1 relative" style={{ minWidth: 0 }}>
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
              initialData={useMemo(() => ({
                elements: [],
                appState: {
                  theme: "light",
                  currentItemStrokeWidth: 1,
                },
              }), [])}
            />
            
            
            {/* Lock Icon - Show when submitted */}
            {isSubmitted && (
              <div className="absolute top-6 left-6 z-50 bg-white rounded-full p-3 shadow-lg border-2 border-gray-300">
                <Lock className="w-6 h-6 text-gray-600" />
              </div>
            )}
          </div>

          {/* Right Column - Instructions & Sample Answer (Neo-Brutalist Style) */}
          <div className="w-[420px] flex-shrink-0 flex flex-col bg-white border-l-4 border-black h-screen">
        {/* Scenario Instructions Section - Reduced Height */}
        <div className="h-[40%] border-b-2 border-black p-6 bg-white flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between gap-3 mb-3">
              <h2 className="uppercase font-black tracking-widest text-xs text-black">
                Scenario
              </h2>
              
              {/* Unit Dropdown */}
              <div className="relative unit-dropdown-container flex-shrink-0">
                <button
                  onClick={handleUnitDropdownClick}
                  className="bg-white rounded-lg border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-between gap-2 font-bold text-black text-xs"
                >
                  <span>
                    {selectedUnit !== null ? `Unit ${selectedUnit}` : 'All Units'}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showUnitDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                {showUnitDropdown && hasAccess && (
                  <div className="absolute top-full right-0 mt-2 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 overflow-hidden min-w-[120px]">
                    <button
                      onClick={() => {
                        setSelectedUnit(null);
                        setShowUnitDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 font-bold text-black hover:bg-gray-100 transition-colors text-xs ${
                        selectedUnit === null ? 'bg-gray-100' : ''
                      }`}
                    >
                      All Units
                    </button>
                    {availableUnits.map(unit => (
                      <button
                        key={unit}
                        onClick={() => handleUnitSelect(unit)}
                        className={`w-full text-left px-4 py-3 font-bold text-black hover:bg-gray-100 transition-colors border-t-2 border-black text-xs ${
                          selectedUnit === unit ? 'bg-gray-100' : ''
                        }`}
                      >
                        Unit {unit}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="text-xl font-bold text-black leading-relaxed mb-3">
                {activeScenario.title}
              </p>
              
              {/* Unit Tag and Difficulty */}
              <div className="mb-4 flex items-center gap-3 flex-wrap">
                <span className="inline-block bg-white text-black px-3 py-1 rounded-lg font-bold text-xs border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Unit {parseInt(activeScenario.lessonId.split('.')[0])}
                </span>
                
                {/* Difficulty Belt Icon */}
                <img
                  src={
                    activeScenario.difficulty === 'easy'
                      ? '/images/beltNewWhite.svg'
                      : activeScenario.difficulty === 'medium'
                      ? '/images/beltNewYellow.svg'
                      : '/images/beltNewBlack.svg'
                  }
                  alt={`${activeScenario.difficulty} difficulty`}
                  className="w-10 h-10"
                />
              </div>
            </div>
            {!isSubmitted ? (
              <>
                {/* Scenario Description Card */}
                <div className="bg-white rounded-xl border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-base text-black leading-relaxed font-medium">
                    {activeScenario.description}
                  </p>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <p className="uppercase font-black tracking-widest text-xs text-black mb-3">Self-Correction Checklist</p>
                <div className="space-y-2">
                  {activeScenario.checklist.map((item) => {
                    const isChecked = checkedItems.has(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleChecklistToggle(item.id)}
                        className={`w-full text-left p-3 rounded-lg border-2 border-black transition-transform hover:-translate-y-1 ${
                          isChecked
                            ? 'bg-green-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                            : 'bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isChecked ? (
                            <CheckCircle2 className="w-5 h-5 text-black flex-shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-black border-2 border-black rounded-full flex-shrink-0" />
                          )}
                          <span className={`text-sm font-bold ${
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
          </div>
          
          {/* Shuffle Scenario Button - Fixed at bottom */}
          {!isSubmitted && (
            <button
              onClick={handleShuffleScenario}
              className="w-full mt-4 bg-white rounded-lg border-2 border-black p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 flex items-center justify-between font-bold text-black flex-shrink-0"
            >
              <span>Shuffle Scenario</span>
              <Shuffle className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Sample Answer Section - Increased Height */}
        <div className="h-[60%] bg-white p-6 flex flex-col relative">
          <div className="mb-4 flex-shrink-0">
            <h3 className="uppercase font-black tracking-widest text-xs text-black mb-3">Sample Answer</h3>
          </div>
          <div className="relative bg-white rounded-xl border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4" style={{ height: 'calc(100% - 180px)' }}>
            <img
              src={activeScenario.correctImage}
              alt="Sample answer"
              className={`w-full h-full object-contain ${!isSubmitted ? 'blur-md' : ''}`}
            />
            {!isSubmitted && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-95">
                <LockKeyhole className="w-12 h-12 text-black mb-3" strokeWidth={2.5} />
                <p className="text-black font-black text-lg uppercase tracking-widest">Locked</p>
              </div>
            )}
          </div>
          
          {/* Submit Button - Fixed at bottom */}
          {!isSubmitted && (
            <div className="absolute bottom-4 left-6 right-6">
              <Button
                onClick={handleSubmit}
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3 text-lg rounded-lg shadow-lg w-full flex items-center justify-center"
              >
                Submit Answer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
        </>
      ) : (
        <>
          {/* Mobile View */}
          <div className="flex-1 flex flex-col overflow-y-auto w-full">
            {/* Top Section - Title, Description, Unit Tag, Belt */}
            <div className="w-full px-4 pt-16 pb-6 bg-white border-b-4 border-black">
              <div className="max-w-2xl mx-auto text-center space-y-4">
                <h2 className="text-2xl font-black text-black leading-tight">
                  {activeScenario.title}
                </h2>
                
                <p className="text-base text-black leading-relaxed font-medium">
                  {activeScenario.description}
                </p>
                
                {/* Unit Tag and Difficulty Belt */}
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <span className="inline-block bg-white text-black px-3 py-1 rounded-lg font-bold text-xs border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Unit {parseInt(activeScenario.lessonId.split('.')[0])}
                  </span>
                  
                  {/* Difficulty Belt Icon */}
                  <img
                    src={
                      activeScenario.difficulty === 'easy'
                        ? '/images/beltNewWhite.svg'
                        : activeScenario.difficulty === 'medium'
                        ? '/images/beltNewYellow.svg'
                        : '/images/beltNewBlack.svg'
                    }
                    alt={`${activeScenario.difficulty} difficulty`}
                    className="w-10 h-10"
                  />
                </div>
              </div>
            </div>

            {/* Excalidraw Board - Taller than wide */}
            <div className="flex-1 flex flex-col px-4 pb-4">
              <div className="relative flex-1 w-full" style={{ aspectRatio: '3/4', maxWidth: '100%' }}>
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
                  initialData={useMemo(() => ({
                    elements: [],
                    appState: {
                      theme: "light",
                      currentItemStrokeWidth: 1,
                    },
                  }), [])}
                />
                
                {/* Lock Icon - Show when submitted */}
                {isSubmitted && (
                  <div className="absolute top-4 left-4 z-50 bg-white rounded-full p-2 shadow-lg border-2 border-gray-300">
                    <Lock className="w-5 h-5 text-gray-600" />
                  </div>
                )}

                {/* Submit Button - Fixed at bottom of board */}
                {!isSubmitted && (
                  <div className="absolute bottom-4 left-4 right-4 z-50">
                    <Button
                      onClick={handleSubmit}
                      size="lg"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 text-base rounded-lg shadow-lg w-full flex items-center justify-center"
                    >
                      Submit Answer
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Shuffle Button - Below the board */}
              {!isSubmitted && (
                <button
                  onClick={handleShuffleScenario}
                  className="w-full mt-4 bg-white rounded-lg border-2 border-black p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 flex items-center justify-between font-bold text-black"
                >
                  <span>Shuffle Scenario</span>
                  <Shuffle className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* Join Dojo Modal */}
      <JoinDojoModal
        isOpen={showJoinDojoModal}
        onClose={() => setShowJoinDojoModal(false)}
        selectedSubject={currentCourse}
      />
    </div>
  );
}
