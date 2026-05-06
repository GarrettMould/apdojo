'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRight, Lock, CheckCircle2, Circle, LockKeyhole, ChevronDown, Monitor, Smartphone, Play, X, FileText, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCourseTheme, useCourseContext } from '@/contexts/CourseContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { graphGymScenarios, GraphGymScenario } from '@/data/graphGymScenarios';
import { hasValidSeasonPass } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getSlugForScenario, getScenarioBySlug } from '@/lib/graphGymSlugs';
import type { CourseSubject } from '@/lib/courseSubject';
import { econCourseFromSubject } from '@/lib/courseSubject';
import { SeasonPassModal } from '@/components/SeasonPassModal';
import '@excalidraw/excalidraw/index.css';

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  },
);

// Import Excalidraw export utilities
let exportToCanvas: any = null;
const loadExcalidrawExports = async () => {
  if (!exportToCanvas) {
    const excalidrawModule = await import("@excalidraw/excalidraw");
    exportToCanvas = excalidrawModule.exportToCanvas;
  }
  return exportToCanvas;
};

function JoinDojoModal({ isOpen, onClose, selectedSubject }: { isOpen: boolean; onClose: () => void; selectedSubject: CourseSubject }) {
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
            href={`/purchase/season-pass?courseType=${selectedSubject === 'gov' ? 'bundle' : selectedSubject}`}
            className={`inline-flex items-center justify-center w-full px-6 py-3 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg ${
              selectedSubject === 'macro'
                ? 'bg-blue-600 hover:bg-blue-700'
                : selectedSubject === 'micro'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-violet-600 hover:bg-violet-700'
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

interface GraphGymProps {
  assignmentScenarios?: GraphGymScenario[]; // Scenarios from assignment link
  isAssignment?: boolean; // Whether this is an assignment (no shuffle, show next)
  assignmentLinkId?: string; // The encoded param from the assignment link
  initialScenarioSlug?: string; // Optional initial scenario slug from URL
}

export function GraphGym({ assignmentScenarios, isAssignment = false, assignmentLinkId, initialScenarioSlug }: GraphGymProps) {
  const theme = useCourseTheme();
  const { currentCourse } = useCourseContext();
  const { user, userData } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [excalidrawKey, setExcalidrawKey] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  const [showJoinDojoModal, setShowJoinDojoModal] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<Set<number>>(new Set());
  const [scenarioImages, setScenarioImages] = useState<Map<number, string>>(new Map()); // Map of scenarioId -> imageUrl
  const excalidrawRef = useRef<any>(null); // Excalidraw API ref
  const [showNameInputModal, setShowNameInputModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [currentElements, setCurrentElements] = useState<any[]>([]); // Track current Excalidraw elements
  const [currentAppState, setCurrentAppState] = useState<any>(null); // Track current Excalidraw app state
  const [showTip, setShowTip] = useState(false); // Track whether tip is shown
  const [hasUsedFreeGraphGym, setHasUsedFreeGraphGym] = useState(false); // One free submit for non-season-pass users

  // Check if user has access (logged in + season pass)
  const hasAccess = useMemo(() => {
    if (!user || !userData) return false;
    return hasValidSeasonPass(userData, currentCourse);
  }, [user, userData, currentCourse]);

  // Read whether the user has already used their one free Graph Gym submit
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('graphGymFullFreeUsed');
    setHasUsedFreeGraphGym(stored === 'true');
  }, []);

  // Filter scenarios by current subject (or use assignment scenarios)
  const filteredScenarios = useMemo(() => {
    // If this is an assignment, use the provided scenarios
    if (isAssignment && assignmentScenarios) {
      return assignmentScenarios;
    }
    
    // Otherwise, filter from all scenarios by subject (show all for current course)
    let scenarios = graphGymScenarios.filter(scenario => {
      const scenarioSubjects = Array.isArray(scenario.subject) ? scenario.subject : [scenario.subject];
      const econ = econCourseFromSubject(currentCourse);
      return econ != null && scenarioSubjects.includes(econ);
    });
    
    // Filter by unit if selected
    if (selectedUnit !== null) {
      scenarios = scenarios.filter(scenario => {
        const unitFromLessonId = parseInt(scenario.lessonId.split('.')[0]);
        return unitFromLessonId === selectedUnit;
      });
    }
    
    return scenarios;
  }, [currentCourse, selectedUnit, isAssignment, assignmentScenarios]);

  // Get available units from scenarios
  const availableUnits = useMemo(() => {
    const econ = econCourseFromSubject(currentCourse);
    const units = new Set<number>();
    graphGymScenarios
      .filter(scenario => {
        if (!econ) return false;
        const subjects = Array.isArray(scenario.subject) ? scenario.subject : [scenario.subject];
        return subjects.includes(econ);
      })
      .forEach(scenario => {
        const unit = parseInt(scenario.lessonId.split('.')[0]);
        units.add(unit);
      });
    return Array.from(units).sort((a, b) => a - b);
  }, [currentCourse]);

  // URL as Source of Truth: Single effect that loads scenario from URL slug
  useEffect(() => {
    // Only run for non-assignment mode (assignments don't use URL routing)
    if (isAssignment || !initialScenarioSlug || filteredScenarios.length === 0) {
      return;
    }

    // Find the scenario by slug
    const scenario = getScenarioBySlug(
      initialScenarioSlug,
      econCourseFromSubject(currentCourse) ?? undefined,
    );
    if (!scenario) {
      console.warn('[GraphGym] Scenario not found for slug:', initialScenarioSlug);
      return;
    }

    // Find the index of this scenario in the filtered list
    const index = filteredScenarios.findIndex(s => s.id === scenario.id);
    if (index === -1) {
      console.warn('[GraphGym] Scenario not in filtered list:', scenario.id);
      return;
    }

    // Only update if we're not already on this scenario
    if (index !== currentScenarioIndex) {
      console.log('[GraphGym] Loading scenario from URL:', initialScenarioSlug, 'index:', index);
      setCurrentScenarioIndex(index);
      // Reset submission state when scenario changes
      setIsSubmitted(false);
      setCheckedItems(new Set());
      setExcalidrawKey(prev => prev + 1); // Clear Excalidraw board
    }
  }, [initialScenarioSlug, currentCourse, isAssignment, filteredScenarios, currentScenarioIndex]);

  // Reset to first scenario when subject or unit changes (for non-assignment mode, navigate to URL)
  useEffect(() => {
    if (isAssignment) {
      // Assignments manage currentScenarioIndex via handleNextScenario; do NOT reset here
      // (resetting would overwrite the user's progress when deps like currentCourse/filteredScenarios change)
      return;
    }

    // For non-assignment mode: navigate to first scenario's URL
    if (filteredScenarios.length > 0 && !initialScenarioSlug) {
      const firstScenario = filteredScenarios[0];
      const firstSlug = getSlugForScenario(firstScenario);
      router.push(`/${firstSlug}`);
    } else {
      // Just reset state, URL effect will handle loading the scenario
      setIsSubmitted(false);
      setCheckedItems(new Set());
      setExcalidrawKey(prev => prev + 1);
    }
  }, [currentCourse, selectedUnit, isAssignment, filteredScenarios, initialScenarioSlug, router]);

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

  // Excalidraw initial data - must be at top level (not conditional)
  const excalidrawInitialData = useMemo(() => ({
    elements: [],
    appState: {
      theme: "light",
      currentItemStrokeWidth: 1,
      gridSize: null, // Disable grid
      showGrid: false, // Hide grid
    },
  }), []);

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
    // Paid users: always allow submit
    if (!hasAccess) {
      // Free users:
      // If they've already used their one free submit, show the join modal instead of submitting
      if (hasUsedFreeGraphGym) {
        setShowJoinDojoModal(true);
        return;
      }

      // First-ever free submit: allow it and mark as used
      setHasUsedFreeGraphGym(true);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('graphGymFullFreeUsed', 'true');
      }
    }

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


  // Capture and upload Excalidraw board snapshot
  const captureAndUploadBoard = async (scenarioId: number): Promise<string | null> => {
    if (!user || !assignmentLinkId) {
      console.warn('[Graph Gym] Missing user or assignmentLinkId', { user: !!user, assignmentLinkId: !!assignmentLinkId });
      return null;
    }
    
    try {
      // Prioritize tracked state (from onChange callback) - this is more reliable
      let elements: any[] | null = null;
      let appState: any = null;
      let files: any = {};
      
      // Use tracked elements first (most reliable)
      if (currentElements && Array.isArray(currentElements)) {
        elements = currentElements;
        appState = currentAppState || {};
        console.log('[Graph Gym] Using tracked elements from state:', { count: elements.length });
      }
      
      // Try to get from Excalidraw API as fallback
      if (!elements && excalidrawRef.current) {
        const excalidrawAPI = excalidrawRef.current;
        if (typeof excalidrawAPI.getSceneElements === 'function') {
          elements = excalidrawAPI.getSceneElements();
          appState = excalidrawAPI.getAppState();
          console.log('[Graph Gym] Using API methods:', { count: elements?.length || 0 });
        }
      }
      
      console.log('[Graph Gym] Capturing board for scenario', scenarioId, {
        elementsCount: elements?.length || 0,
        hasElements: !!(elements && elements.length > 0),
        refAvailable: !!excalidrawRef.current,
        currentElementsCount: currentElements?.length || 0,
        currentElementsExists: !!currentElements,
        hasAppState: !!appState,
        usingTrackedState: !!(currentElements && Array.isArray(currentElements))
      });
      
      // Check if elements array exists (it should always be an array)
      if (!elements || !Array.isArray(elements)) {
        console.error('[Graph Gym] Elements array is null or not an array - cannot export', { 
          elements,
          currentElements: currentElements,
          currentElementsType: typeof currentElements,
          currentElementsIsArray: Array.isArray(currentElements),
          refExists: !!excalidrawRef.current
        });
        return null;
      }
      
      // Log if using tracked state
      if (elements === currentElements) {
        console.log('[Graph Gym] Successfully using tracked elements:', elements.length);
      }
      
      // Allow export even with empty elements (student might not have drawn anything)
      // But log a warning if there are no elements
      if (elements.length === 0) {
        console.warn('[Graph Gym] No elements on board, but will still export empty board');
      }

      // Load export function
      const exportFn = await loadExcalidrawExports();
      if (!exportFn) {
        console.error('[Graph Gym] Failed to load Excalidraw export function');
        return null;
      }

      // Export canvas
      // Try to get files from API if available, otherwise use empty object
      if (excalidrawRef.current && typeof excalidrawRef.current.getFiles === 'function') {
        try {
          files = excalidrawRef.current.getFiles() || {};
        } catch (e) {
          console.warn('[Graph Gym] Error getting files from API, using empty object:', e);
          files = {};
        }
      }
      
      console.log('[Graph Gym] Exporting with:', {
        elementsCount: elements.length,
        hasAppState: !!appState,
        hasFiles: Object.keys(files).length > 0
      });
      
      const canvas = await exportFn({
        elements,
        appState: appState || {},
        files,
      });

      // Convert canvas to blob
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob: Blob | null) => resolve(blob), 'image/png', 0.9);
      });

      if (!blob) {
        console.error('[Graph Gym] Failed to convert canvas to blob');
        return null;
      }

      // Create storage path: assignment-images/{assignmentLinkId}/{userId}/{scenarioId}-{timestamp}.png
      const timestamp = Date.now();
      const storagePath = `assignment-images/${assignmentLinkId}/${user.uid}/${scenarioId}-${timestamp}.png`;
      const storageRef = ref(storage, storagePath);

      // Upload blob to Firebase Storage
      await uploadBytes(storageRef, blob);
      
      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      console.log('[Graph Gym] Board snapshot uploaded:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('[Graph Gym] Error capturing/uploading board snapshot:', error);
      return null;
    }
  };

  const handleNextScenario = async () => {
    // Mark current scenario as completed if this is an assignment
    if (isAssignment && filteredScenarios[currentScenarioIndex]) {
      const currentScenario = filteredScenarios[currentScenarioIndex];
      
      // Capture board snapshot before moving to next scenario
      // Wait a tiny bit to ensure Excalidraw API is fully ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('[Graph Gym] Capturing board for scenario', currentScenario.id);
      console.log('[Graph Gym] Excalidraw ref state:', {
        refExists: !!excalidrawRef.current,
        apiExists: !!excalidrawRef.current?.getSceneElements,
        currentIndex: currentScenarioIndex
      });
      
      const imageUrl = await captureAndUploadBoard(currentScenario.id);
      console.log('[Graph Gym] Capture result:', { scenarioId: currentScenario.id, imageUrl });
      
      if (imageUrl) {
        // Update state immediately
        setScenarioImages(prev => {
          const newMap = new Map(prev);
          newMap.set(currentScenario.id, imageUrl);
          console.log('[Graph Gym] Updated scenarioImages:', Array.from(newMap.entries()));
          return newMap;
        });
      } else {
        console.warn('[Graph Gym] Failed to capture image for scenario', currentScenario.id);
      }
      
      const newCompleted = new Set([...completedScenarios, currentScenario.id]);
      setCompletedScenarios(newCompleted);
      
      // If this is the last scenario, show name input modal before saving
      // Store the last captured image URL in a way that's immediately accessible
      if (currentScenarioIndex >= filteredScenarios.length - 1) {
        // Ensure the last scenario's image is stored before showing modal
        if (imageUrl) {
          setScenarioImages(prev => {
            const newMap = new Map(prev);
            newMap.set(currentScenario.id, imageUrl);
            return newMap;
          });
        }
        // Show name input modal
        setShowNameInputModal(true);
        return; // Don't move to next since we're already on the last one
      }
    }
    
    // Reset submission state and checked items
    setIsSubmitted(false);
    setCheckedItems(new Set());
    
    // Clear Excalidraw by forcing a remount with new key
    setExcalidrawKey(prev => prev + 1);
    
    // Move to next scenario in order (wrap around to first if at the end for non-assignment mode)
    if (isAssignment) {
      // For assignments, only move forward if not at the end
      if (currentScenarioIndex < filteredScenarios.length - 1) {
        const nextIndex = currentScenarioIndex + 1;
        const nextScenario = filteredScenarios[nextIndex];
        if (nextScenario) {
          setCurrentScenarioIndex(nextIndex);
        }
      }
    } else {
      // For non-assignment mode: URL as Source of Truth
      // Simply calculate next scenario and navigate to its URL
      const nextIndex = (currentScenarioIndex + 1) % filteredScenarios.length;
      const nextScenario = filteredScenarios[nextIndex];
      if (nextScenario) {
        const nextSlug = getSlugForScenario(nextScenario);
        console.log('[GraphGym] Navigating to next scenario:', nextSlug);
        // Simply navigate to the new URL - the useEffect will handle loading the scenario
        router.push(`/${nextSlug}`);
      }
    }
  };

  const handleNameSubmit = async () => {
    if (!studentName.trim()) {
      alert('Please enter your name');
      return;
    }
    setShowNameInputModal(false);
    
    // Save results with student name
    // Wait a bit to ensure state has updated
    await new Promise(resolve => setTimeout(resolve, 100));
    const allCompleted = new Set([...completedScenarios, filteredScenarios[filteredScenarios.length - 1].id]);
    await saveAssignmentResults(allCompleted, studentName.trim());
  };

  const saveAssignmentResults = async (finalCompleted: Set<number>, studentNameInput?: string) => {
    if (!isAssignment || !assignmentLinkId) return;
    
    try {
      // Get assignment link document
      const assignmentLinkQuery = query(
        collection(db, 'assignmentLinks'),
        where('encodedParam', '==', assignmentLinkId)
      );
      const assignmentLinkDoc = await getDocs(assignmentLinkQuery);
      
      if (assignmentLinkDoc.empty) {
        console.warn('Assignment link not found in Firebase');
        return;
      }

      const linkDoc = assignmentLinkDoc.docs[0];
      const linkDocId = linkDoc.id;

      // Create scenario results (for Graph Gym, we track completion and images)
      // Create a fresh copy of the map to ensure we have the latest state
      const currentScenarioImages = new Map(scenarioImages);
      const scenarioResults = filteredScenarios.map(scenario => {
        const imageUrl = currentScenarioImages.get(scenario.id) || null;
        return {
          scenarioId: scenario.id,
          scenarioTitle: scenario.title,
          completed: finalCompleted.has(scenario.id),
          imageUrl: imageUrl
        };
      });
      
      console.log('[Graph Gym] Saving assignment results:', {
        totalScenarios: filteredScenarios.length,
        completedCount: finalCompleted.size,
        scenarioImagesMap: Array.from(currentScenarioImages.entries()).map(([id, url]) => ({ id, url: url ? 'present' : 'missing' })),
        scenarioResults: scenarioResults.map(sr => ({
          id: sr.scenarioId,
          completed: sr.completed,
          hasImage: !!sr.imageUrl,
          imageUrl: sr.imageUrl || 'NULL'
        }))
      });

      const totalScenarios = filteredScenarios.length;
      const completedCount = finalCompleted.size;
      const completionPercentage = Math.round((completedCount / totalScenarios) * 100);

      // Prepare the data to save
      const resultData = {
        assignmentLinkId: linkDocId,
        tutorId: linkDoc.data().tutorId,
        studentId: user?.uid || null,
        studentEmail: user?.email || null,
        studentName: studentNameInput || user?.displayName || user?.email?.split('@')[0] || 'Student',
        scenarioResults: scenarioResults,
        totalQuestions: totalScenarios, // Using same field name for consistency
        correctCount: completedCount,
        incorrectCount: totalScenarios - completedCount,
        score: completionPercentage, // Completion percentage as score
        assignmentType: 'graphGym',
        submittedAt: serverTimestamp()
      };

      console.log('[Graph Gym] Attempting to save results:', {
        tutorId: resultData.tutorId,
        studentId: resultData.studentId,
        studentName: resultData.studentName,
        scenarioResultsCount: scenarioResults.length,
        hasImages: scenarioResults.filter(sr => sr.imageUrl).length
      });

      // Save results
      await addDoc(collection(db, 'assignmentResults'), resultData);

      console.log('[Graph Gym Assignment] Results saved successfully');
    } catch (error) {
      console.error('[Graph Gym Assignment] Error saving results:', error);
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

  // Reset tip visibility when scenario changes
  useEffect(() => {
    setShowTip(false);
  }, [currentScenarioIndex]);

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gray-50">
      {viewMode === 'desktop' ? (
        <>
          {/* Left Column - Title Section + Drawing Pad */}
          <div className="flex-1 flex flex-col overflow-hidden" style={{ minWidth: 0 }}>
            {/* Title Section */}
            <div className="flex-shrink-0 bg-white px-6 py-4">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm mb-4">
                <span className="font-semibold text-gray-700 capitalize">
                  {currentCourse === 'macro' ? 'Macroeconomics' : 'Microeconomics'}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="font-semibold text-gray-700">
                  Unit {parseInt(activeScenario.lessonId.split('.')[0])}
                </span>
              </nav>
              
              {/* Title */}
              <h1 className="text-2xl font-black text-black mb-3">
                {activeScenario.title}
              </h1>
              
              {/* Next Scenario Button - Only show in scenario section (not in assignment mode) */}
              {!isAssignment && (
                <div className="mb-3">
                  <button
                    onClick={handleNextScenario}
                    className="inline-flex items-center gap-2 bg-white rounded-lg border-2 border-black px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 font-bold text-black text-sm"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>Next Scenario</span>
                  </button>
                </div>
              )}
              
              {/* Graphing Tip */}
              {(activeScenario as any).tip && (
                <div className="mt-3">
                  <button
                    onClick={() => setShowTip(!showTip)}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 underline flex items-center gap-1"
                  >
                    Graphing Tip
                    {showTip ? (
                      <ChevronDown className="w-4 h-4 rotate-180 transition-transform" />
                    ) : (
                      <ChevronDown className="w-4 h-4 transition-transform" />
                    )}
                  </button>
                  {showTip && (
                    <div className="mt-2 p-3 bg-muted border border-border rounded-lg">
                      <p className="text-sm text-gray-700">{(activeScenario as any).tip}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Drawing Area - Excalidraw Container */}
            <div className="flex-1 relative bg-gray-200" style={{ minWidth: 0 }}>
            <Excalidraw
              ref={excalidrawRef}
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
              onChange={(elements, appState) => {
                // Track elements and appState for capture
                setCurrentElements(elements);
                setCurrentAppState(appState);
              }}
            />
            
            
              {/* Lock Icon - Show when submitted */}
              {isSubmitted && (
                <div className="absolute top-6 left-6 z-50 bg-white rounded-full p-3 shadow-lg border-2 border-gray-300">
                  <Lock className="w-6 h-6 text-gray-600" />
                </div>
              )}
            </div>
          </div>

          {/* Right Column - standalone sidebar panel */}
          <div className="w-[420px] flex-shrink-0 flex flex-col bg-white h-full overflow-hidden ml-4 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {!isSubmitted ? (
              <>
                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Description Section */}
                  <div className="mb-6">
                    <h3 className="uppercase font-black tracking-widest text-xs text-black mb-3">Instructions</h3>
                    <div className="bg-white rounded-xl border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <p className="text-base text-black leading-relaxed font-medium mb-3">
                        {activeScenario.description}
                      </p>
                      {/* To-Do List */}
                      {activeScenario.toDoList && activeScenario.toDoList.length > 0 && (
                        <div className="mt-4 pt-4 border-t-2 border-black">
                          <p className="text-xs font-black uppercase tracking-widest text-black mb-2">To Do:</p>
                          <ul className="list-disc list-inside space-y-2">
                            {activeScenario.toDoList.map((item, index) => (
                              <li key={index} className="text-sm text-black leading-relaxed font-medium">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Locked Resources */}
                  <div className="mb-6">
                    <h3 className="uppercase font-black tracking-widest text-xs text-black mb-3">Resources</h3>
                    <div className="space-y-3">
                      {/* Sample Answer Row */}
                      <div className="bg-white rounded-lg border-2 border-black p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-black" />
                          <span className="text-base font-bold text-black">Sample Answer</span>
                        </div>
                      </div>
                      
                      {/* Video Walkthrough Row */}
                      <div className="bg-white rounded-lg border-2 border-black p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-black" />
                          <span className="text-base font-bold text-black">Video Walkthrough</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer Action Area — independent from scroll/content above */}
                <div className="flex-shrink-0 bg-white p-6">
                  <Button
                    onClick={handleSubmit}
                    size="lg"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3 text-lg rounded-lg shadow-lg w-full flex items-center justify-center"
                  >
                    Submit Answer
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6 relative">
                  {/* Video Walkthrough - Expanded Overlay */}
                  <AnimatePresence>
                    {isVideoExpanded && activeScenario.videoExplanation && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-white z-50 flex flex-col p-6 -m-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="uppercase font-black tracking-widest text-xs text-black">Video Walkthrough</h3>
                          <button
                            onClick={() => setIsVideoExpanded(false)}
                            className="bg-white border-2 border-black rounded-full p-2 hover:bg-gray-100 transition-colors"
                            aria-label="Close video"
                          >
                            <X className="w-5 h-5 text-black" />
                          </button>
                        </div>
                        <div className="flex-1 flex items-center justify-center min-h-0">
                          <div className="w-full h-full max-h-[calc(100vh-200px)] flex items-center justify-center">
                            <video
                              src={activeScenario.videoExplanation}
                              controls
                              autoPlay
                              className="w-full h-full max-h-full object-contain"
                              playsInline
                            >
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Sample Answer Section */}
                  <div className={`transition-opacity ${isVideoExpanded ? 'opacity-0 pointer-events-none' : ''}`}>
                    <h3 className="uppercase font-black tracking-widest text-xs text-black mb-3">Sample Answer</h3>
                    <div className="bg-white rounded-xl border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      {activeScenario.correctImage ? (
                        <img
                          src={activeScenario.correctImage}
                          alt="Sample answer"
                          className="w-full h-auto object-contain max-h-[400px]"
                        />
                      ) : (
                        <div className="w-full aspect-video bg-gray-100 border-2 border-gray-300 rounded flex items-center justify-center">
                          <p className="text-gray-500 font-bold">Sample Answer Image</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Checklist Section */}
                  <div className={`transition-opacity ${isVideoExpanded ? 'opacity-0 pointer-events-none' : ''}`}>
                    <h3 className="uppercase font-black tracking-widest text-xs text-black mb-3">Self-Correction Checklist</h3>
                    <div className="space-y-2">
                      {activeScenario.checklist.map((item) => {
                        const isChecked = checkedItems.has(item.id);
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleChecklistToggle(item.id)}
                            className={`w-full text-left p-3 rounded-lg border-2 border-black transition-transform hover:-translate-y-1 ${
                              isChecked
                                ? 'bg-muted shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
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

                  {/* Video Walkthrough - Collapsed */}
                  {activeScenario.videoExplanation && !isVideoExpanded && (
                    <div className={`transition-opacity ${isVideoExpanded ? 'opacity-0 pointer-events-none' : ''}`}>
                      <h3 className="uppercase font-black tracking-widest text-xs text-black mb-3">Video Walkthrough</h3>
                      <div className="bg-white rounded-xl border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] aspect-video relative cursor-pointer group" onClick={() => setIsVideoExpanded(true)}>
                        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all flex items-center justify-center z-10">
                          <div className="bg-white rounded-full p-4 shadow-lg">
                            <Play className="w-12 h-12 text-black fill-black" />
                          </div>
                        </div>
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <p className="text-gray-600 font-bold">Click to Play Video</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Next Button - Only show for assignments */}
                  {isAssignment && (
                    <div className={`pt-4 transition-opacity ${isVideoExpanded ? 'opacity-0 pointer-events-none' : ''}`}>
                      <button
                        onClick={handleNextScenario}
                        className="w-full bg-white rounded-lg border-2 border-black p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 flex items-center justify-between font-bold text-black"
                      >
                        <span>
                          {currentScenarioIndex >= filteredScenarios.length - 1 
                            ? 'Submit Assignment' 
                            : `Next Scenario (${currentScenarioIndex + 1}/${filteredScenarios.length})`
                          }
                        </span>
                        {currentScenarioIndex >= filteredScenarios.length - 1 ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <ArrowRight className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Mobile View */}
          <div className="flex-1 flex flex-col overflow-y-auto w-full">
            {/* Top Section - Title, Unit Tag, Belt, Description - Sticky */}
            <div className="sticky top-0 z-10 w-full px-4 pt-16 pb-6 bg-white border-b-4 border-black">
              <div className="max-w-2xl mx-auto text-center space-y-4">
                <h2 className="text-2xl font-black text-black leading-tight">
                  {activeScenario.title}
                </h2>
                
                {/* Unit Tag and Difficulty Belt */}
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <span className="inline-flex items-center bg-white text-black px-3 py-1 rounded-lg font-bold text-xs border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] h-7">
                    Unit {parseInt(activeScenario.lessonId.split('.')[0])}
                  </span>
                  
                  {/* Difficulty Belt Tag */}
                  <span className="inline-flex items-center bg-white text-black px-3 py-1 rounded-lg font-bold text-xs border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] gap-2 h-7">
                    <img
                      src={
                        activeScenario.difficulty === 'easy'
                          ? '/images/beltNewWhite.svg'
                          : activeScenario.difficulty === 'medium'
                          ? '/images/beltNewYellow.svg'
                          : '/images/beltNewBlack.svg'
                      }
                      alt={`${activeScenario.difficulty} difficulty`}
                      className="w-5 h-5"
                    />
                    <span className="uppercase">{activeScenario.difficulty}</span>
                  </span>
                </div>
                
                <p className="text-base text-black leading-relaxed font-medium mb-3">
                  {activeScenario.description}
                </p>
                
                {/* To-Do List */}
                {activeScenario.toDoList && activeScenario.toDoList.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 mt-3 text-left max-w-lg mx-auto">
                    {activeScenario.toDoList.map((item, index) => (
                      <li key={index} className="text-base text-black leading-relaxed font-medium">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Excalidraw Board - Taller than wide */}
            <div className="flex-1 flex flex-col px-4 pb-4 min-h-0">
              <div className="relative flex-1 w-full min-h-0" style={{ aspectRatio: '3/4', maxWidth: '100%' }}>
                <Excalidraw
                  ref={excalidrawRef}
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
                  onChange={(elements, appState) => {
                    // Track elements and appState for capture
                    setCurrentElements(elements);
                    setCurrentAppState(appState);
                  }}
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

              {/* Next Button - Only show for assignments when not submitted */}
              {!isSubmitted && isAssignment && (
                <button
                  onClick={handleNextScenario}
                  className="w-full mt-4 bg-white rounded-lg border-2 border-black p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 flex items-center justify-between font-bold text-black"
                >
                  <span>
                    {currentScenarioIndex >= filteredScenarios.length - 1 
                      ? 'Submit Assignment' 
                      : `Next Scenario (${currentScenarioIndex + 1}/${filteredScenarios.length})`
                    }
                  </span>
                  {currentScenarioIndex >= filteredScenarios.length - 1 ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>

            {/* Submitted Content - Sample Answer, Checklist, Video, Next Button */}
            {isSubmitted && (
              <div className="w-full px-4 py-6 space-y-6 bg-white relative">
                {/* Video Walkthrough - Expanded Overlay */}
                <AnimatePresence>
                  {isVideoExpanded && activeScenario.videoExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-white z-50 flex flex-col p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="uppercase font-black tracking-widest text-xs text-black">Video Walkthrough</h3>
                        <button
                          onClick={() => setIsVideoExpanded(false)}
                          className="bg-white border-2 border-black rounded-full p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Close video"
                        >
                          <X className="w-5 h-5 text-black" />
                        </button>
                      </div>
                      <div className="flex-1 flex items-center justify-center min-h-0">
                        <div className="w-full h-full max-h-full flex items-center justify-center">
                          <video
                            src={activeScenario.videoExplanation}
                            controls
                            autoPlay
                            className="w-full h-full max-h-full object-contain"
                            playsInline
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sample Answer */}
                <div className={`transition-opacity ${isVideoExpanded ? 'opacity-0 pointer-events-none' : ''}`}>
                  <h3 className="uppercase font-black tracking-widest text-xs text-black mb-3">Sample Answer</h3>
                  <div className="bg-white rounded-xl border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {activeScenario.correctImage ? (
                      <img
                        src={activeScenario.correctImage}
                        alt="Sample answer"
                        className="w-full h-auto object-contain"
                      />
                    ) : (
                      <div className="w-full aspect-video bg-gray-100 border-2 border-gray-300 rounded flex items-center justify-center">
                        <p className="text-gray-500 font-bold">Sample Answer Image</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Checklist */}
                <div className={`transition-opacity ${isVideoExpanded ? 'opacity-0 pointer-events-none' : ''}`}>
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
                              ? 'bg-muted shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
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

                {/* Video Walkthrough - Expanded Overlay */}
                <AnimatePresence>
                  {isVideoExpanded && activeScenario.videoExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="fixed inset-0 bg-white z-50 flex flex-col p-6"
                      style={{ top: '64px' }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="uppercase font-black tracking-widest text-xs text-black">Video Walkthrough</h3>
                        <button
                          onClick={() => setIsVideoExpanded(false)}
                          className="bg-white border-2 border-black rounded-full p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Close video"
                        >
                          <X className="w-5 h-5 text-black" />
                        </button>
                      </div>
                      <div className="flex-1 flex items-center justify-center min-h-0">
                        <div className="w-full h-full max-h-full flex items-center justify-center">
                          <video
                            src={activeScenario.videoExplanation}
                            controls
                            autoPlay
                            className="w-full h-full max-h-full object-contain"
                            playsInline
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Video Walkthrough - Collapsed */}
                {activeScenario.videoExplanation && !isVideoExpanded && (
                  <div>
                    <h3 className="uppercase font-black tracking-widest text-xs text-black mb-3">Video Walkthrough</h3>
                    <div className="bg-white rounded-xl border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] aspect-video relative cursor-pointer group" onClick={() => setIsVideoExpanded(true)}>
                      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                        <div className="bg-white rounded-full p-4 shadow-lg">
                          <Play className="w-12 h-12 text-black fill-black" />
                        </div>
                      </div>
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <p className="text-gray-600 font-bold">Click to Play Video</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Next Button - Only show for assignments */}
                {isAssignment && (
                  <button
                    onClick={handleNextScenario}
                    className="w-full bg-white rounded-lg border-2 border-black p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 flex items-center justify-between font-bold text-black"
                  >
                    <span>
                      {currentScenarioIndex >= filteredScenarios.length - 1 
                        ? 'Submit Assignment' 
                        : `Next Scenario (${currentScenarioIndex + 1}/${filteredScenarios.length})`
                      }
                    </span>
                    {currentScenarioIndex >= filteredScenarios.length - 1 ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <ArrowRight className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Season Pass Modal (used when free users exceed their Graph Gym limit or try gated actions) */}
      {showJoinDojoModal && (
        <SeasonPassModal
          subject={currentCourse}
          onClose={() => setShowJoinDojoModal(false)}
        />
      )}

      {/* Name Input Modal for Assignments */}
      {showNameInputModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 border-4 border-black">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-black text-gray-900">
                Enter Your Name
              </h3>
            </div>
            <p className="text-gray-700 mb-6 font-semibold">
              Please enter your name so your teacher can identify your submission.
            </p>
            <div className="mb-6">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && studentName.trim()) {
                    handleNameSubmit();
                  }
                }}
                placeholder="Your name"
                className="w-full px-4 py-3 border-2 border-black rounded-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleNameSubmit}
                disabled={!studentName.trim()}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors duration-200 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
