'use client';

import { useState, useMemo, useEffect, Suspense, useRef } from 'react';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question } from '@/data/questionBanks/types';
import { Copy, CheckCircle2, Search, Filter, Eye, Loader2, GraduationCap, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { useSearchParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, getDoc, doc, orderBy } from 'firebase/firestore';
import { graphGymScenarios, GraphGymScenario } from '@/data/graphGymScenarios';
import { dojoDrills, DojoDrill, drillAppliesToSubject, getDrillUnitForSubject } from '@/data/dojoDrills';

type AssignmentType = 'mcq' | 'graphGym' | 'dojoDrill';
type ViewMode = 'builder' | 'results';
type AssignmentModeChoice = 'live' | 'homework' | null; // null = haven't chosen yet (show choice screen)

interface AssignmentResult {
  id: string;
  assignmentLinkId: string;
  assignmentName: string;
  studentId: string | null;
  studentEmail: string | null;
  studentName: string | null;
  score: number;
  totalQuestions: number;
  correctCount: number;
  submittedAt: any;
  assignmentType: 'mcq' | 'graphGym' | 'dojoDrill';
}

function TutorBuilderContent() {
  const { user, userData, loadingUserData, setUserData } = useAuthContext();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [assignmentModeChoice, setAssignmentModeChoice] = useState<AssignmentModeChoice>(null);
  const [quickPicksPage, setQuickPicksPage] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('builder');
  const [isUpgrading, setIsUpgrading] = useState(false);
  
  // Check URL hash or localStorage for view mode preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#results') {
        setViewMode('results');
      }
    }
  }, []);
  
  // Initialize search term from URL parameter
  const initialSearchTerm = useMemo(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      // Decode URL-encoded spaces (%20 or +)
      return decodeURIComponent(searchParam.replace(/\+/g, ' '));
    }
    return '';
  }, [searchParams]);
  
  const [assignmentType, setAssignmentType] = useState<AssignmentType>('mcq');
  const [selectedIds, setSelectedIds] = useState<Set<number | string>>(new Set());
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  
  // Update search term when URL parameter changes
  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);
  const [unitFilter, setUnitFilter] = useState<number | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<'ap_macroeconomics' | 'ap_microeconomics'>('ap_macroeconomics');
  const [linkCopied, setLinkCopied] = useState(false);
  
  // Assignment results state
  const [assignmentResults, setAssignmentResults] = useState<AssignmentResult[]>([]);
  const [loadingResults, setLoadingResults] = useState(false);

  // Convert subject filter to graph gym format
  const graphGymSubject = useMemo(() => {
    return subjectFilter === 'ap_macroeconomics' ? 'macro' : 'micro';
  }, [subjectFilter]);

  // Filter Dojo Drills based on search and filters
  const filteredDrills = useMemo(() => {
    if (assignmentType !== 'dojoDrill') return [];
    const allDrillsArray = Object.values(dojoDrills);
    return allDrillsArray.filter((drill) => {
      const matchesSubject = drillAppliesToSubject(drill, subjectFilter);
      const matchesSearch = searchTerm === '' || 
        drill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drill.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSubject && matchesSearch;
    });
  }, [searchTerm, subjectFilter, assignmentType]);

  // Get unique units for the selected subject (MCQs only)
  const uniqueUnits = useMemo(() => {
    if (assignmentType === 'graphGym' || assignmentType === 'dojoDrill') return [];
    const units = new Set(
      allQuestions
        .filter(q => q.subject === subjectFilter)
        .map(q => q.unit)
    );
    return Array.from(units).sort((a, b) => a - b);
  }, [subjectFilter, assignmentType]);

  // Filter questions based on search and filters (MCQs only)
  const filteredQuestions = useMemo(() => {
    if (assignmentType === 'graphGym' || assignmentType === 'dojoDrill') return [];
    const filtered = allQuestions.filter(q => {
      const matchesSearch = searchTerm === '' || 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.id.toString().includes(searchTerm) ||
        q.unitName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesUnit = unitFilter === null || q.unit === unitFilter;
      
      const matchesSubject = q.subject === subjectFilter;
      
      return matchesSearch && matchesUnit && matchesSubject;
    });
    
    // Remove duplicates by ID - keep only the first occurrence of each ID
    const seenIds = new Set<number>();
    return filtered.filter(q => {
      if (seenIds.has(q.id)) {
        return false;
      }
      seenIds.add(q.id);
      return true;
    });
  }, [searchTerm, unitFilter, subjectFilter, assignmentType]);

  // Filter Graph Gym scenarios based on search and filters - only show IDs 1, 13-17, 41-45, and 46
  const filteredScenarios = useMemo(() => {
    if (assignmentType === 'mcq' || assignmentType === 'dojoDrill') return [];
    return graphGymScenarios.filter(scenario => {
      // Handle both single subject and array of subjects
      const scenarioSubjects = Array.isArray(scenario.subject) ? scenario.subject : [scenario.subject];
      const matchesSubject = scenarioSubjects.includes(graphGymSubject);
      // Show IDs: 1, 2-5, 13-17, 41-45, 46, 47, 48, 50, 51, 52, 53
      const matchesIdRange = scenario.id === 1 ||
             (scenario.id >= 2 && scenario.id <= 5) ||
             (scenario.id >= 13 && scenario.id <= 17) ||
             (scenario.id >= 41 && scenario.id <= 45) ||
             scenario.id === 46 ||
             scenario.id === 47 ||
             scenario.id === 48 ||
             scenario.id === 50 ||
             scenario.id === 51 ||
             scenario.id === 52 ||
             scenario.id === 53;
      
      const matchesSearch = searchTerm === '' || 
        scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scenario.id.toString().includes(searchTerm) ||
        scenario.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scenario.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesSubject && matchesIdRange && matchesSearch;
    });
  }, [searchTerm, graphGymSubject, assignmentType]);

  const toggleSelection = (id: number | string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Build the same URL students would see (for preview in new tab)
  const getPreviewUrl = (): string | null => {
    if (selectedIds.size === 0) return null;
    let idsArray: (number | string)[];
    let idsString: string;
    if (assignmentType === 'dojoDrill') {
      idsArray = Array.from(selectedIds).sort((a, b) => String(a).localeCompare(String(b)));
      idsString = idsArray.length === 1 ? String(idsArray[0]) : idsArray.join(',');
    } else {
      idsArray = Array.from(selectedIds).sort((a, b) => Number(a) - Number(b));
      idsString = idsArray.map(id => String(id)).join(',');
    }
    const encoded = btoa(idsString);
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const previewSuffix = '&preview=1';
    if (assignmentType === 'mcq') {
      return `${origin}/exam/custom?q=${encoded}${previewSuffix}`;
    }
    if (assignmentType === 'graphGym') {
      return `${origin}/graph-gym/custom?q=${encoded}${previewSuffix}`;
    }
    return `${origin}/dojo-drills/custom?q=${encoded}${previewSuffix}`;
  };

  const openPreview = () => {
    const url = getPreviewUrl();
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Encoded assignment ID for live presenter URL (same encoding as getPreviewUrl)
  const getEncodedAssignmentId = (): string | null => {
    if (selectedIds.size === 0) return null;
    let idsString: string;
    if (assignmentType === 'dojoDrill') {
      const idsArray = Array.from(selectedIds).sort((a, b) => String(a).localeCompare(String(b)));
      idsString = idsArray.length === 1 ? String(idsArray[0]) : idsArray.join(',');
    } else {
      const idsArray = Array.from(selectedIds).sort((a, b) => Number(a) - Number(b));
      idsString = idsArray.map(id => String(id)).join(',');
    }
    return btoa(idsString);
  };

  // Generate a unique 5-character alphanumeric join code (A-Z, 0-9)
  const generateJoinCode = async (): Promise<string> => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let attempt = 0; attempt < 10; attempt++) {
      let code = '';
      for (let i = 0; i < 5; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
      }
      const existing = await getDocs(query(collection(db, 'sessions'), where('code', '==', code)));
      if (existing.empty) return code;
    }
    // Fallback with timestamp to avoid collision
    return chars[Math.floor(Math.random() * 26)] + Date.now().toString(36).slice(-4).toUpperCase();
  };

  const openShareScreen = async () => {
    const encoded = getEncodedAssignmentId();
    if (!encoded || !user || assignmentType !== 'mcq') return;
    try {
      const code = await generateJoinCode();
      const sessionRef = await addDoc(collection(db, 'sessions'), {
        status: 'WAITING',
        assignmentId: encoded,
        assignmentType: assignmentType,
        tutorId: user.uid,
        tutorEmail: user.email || null,
        code,
        createdAt: serverTimestamp(),
      });
      router.push(`/live/present/${sessionRef.id}`);
    } catch (err) {
      console.error('Error creating live session:', err);
      alert('Could not create session. Please try again.');
    }
  };

  const generateLink = async () => {
    if (selectedIds.size === 0) return;
    
    let idsArray: (number | string)[];
    let idsString: string;
    
    // For dojo drills, IDs are strings, so we need to handle them differently
    if (assignmentType === 'dojoDrill') {
      idsArray = Array.from(selectedIds).sort((a, b) => String(a).localeCompare(String(b)));
      // For dojo drills, we only allow selecting one drill at a time
      if (idsArray.length === 1) {
        idsString = String(idsArray[0]);
      } else {
        idsString = idsArray.join(',');
      }
    } else {
      idsArray = Array.from(selectedIds).sort((a, b) => Number(a) - Number(b));
      idsString = idsArray.map(id => String(id)).join(',');
    }
    
    const encoded = btoa(idsString);
    
    // Generate URL based on assignment type
    let url: string;
    if (assignmentType === 'mcq') {
      url = `${window.location.origin}/exam/custom?q=${encoded}`;
    } else if (assignmentType === 'graphGym') {
      url = `${window.location.origin}/graph-gym/custom?q=${encoded}`;
    } else {
      url = `${window.location.origin}/dojo-drills/custom?q=${encoded}`;
    }
    
    // Save to Firebase if user is logged in
    if (user) {
      try {
        await addDoc(collection(db, 'assignmentLinks'), {
          tutorId: user.uid,
          tutorEmail: user.email,
          questionIds: idsArray,
          encodedParam: encoded,
          url: url,
          subject: subjectFilter,
          assignmentType: assignmentType, // 'mcq', 'graphGym', or 'dojoDrill'
          createdAt: serverTimestamp(),
          totalQuestions: idsArray.length
        });
      } catch (error) {
        console.error('Error saving assignment link to Firebase:', error);
        // Continue even if Firebase save fails
      }
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 3000);
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Tooltip component for showing full question text
  const QuestionTooltip = ({ question, children }: { question: string; children: React.ReactNode }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
      if (question.length <= 150) return; // Don't show tooltip if text isn't truncated
      
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY + 10,
          left: rect.left + window.scrollX + rect.width / 2,
        });
        setShowTooltip(true);
      }
    };

    const handleMouseLeave = () => {
      setShowTooltip(false);
    };

    return (
      <>
        <div
          ref={triggerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative inline-block w-full"
        >
          {children}
        </div>
        {showTooltip && (
          <div
            className="fixed z-[9999] bg-gray-900 text-white text-sm rounded-lg shadow-xl p-4 max-w-md pointer-events-none"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              transform: 'translateX(-50%)',
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <div className="whitespace-pre-wrap break-words">{question}</div>
            {/* Arrow pointing up */}
            <div
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"
            />
          </div>
        )}
      </>
    );
  };

  // Fetch assignment results
  useEffect(() => {
    if (!user || viewMode !== 'results') return;

    const fetchResults = async () => {
      setLoadingResults(true);
      try {
        // Fetch all assignment results for this tutor
        const resultsQuery = query(
          collection(db, 'assignmentResults'),
          where('tutorId', '==', user.uid),
          orderBy('submittedAt', 'desc')
        );
        
        const resultsSnapshot = await getDocs(resultsQuery);
        const results: AssignmentResult[] = [];
        
        // Note: We no longer fetch student names from user documents
        // because tutors don't have permission to read other users' documents.
        // We rely on studentName stored in assignmentResults instead.

        // Fetch assignment link details and build results
        for (const resultDoc of resultsSnapshot.docs) {
          const data = resultDoc.data();
          try {
            let assignmentName = 'Unknown Assignment';
            
            // Try to fetch assignment link, but handle permission errors gracefully
            try {
              const assignmentLinkDoc = await getDoc(doc(db, 'assignmentLinks', data.assignmentLinkId));
              if (assignmentLinkDoc.exists()) {
                const linkData = assignmentLinkDoc.data();
                const subjectLabel = linkData.subject === 'ap_macroeconomics' ? 'Macro' : 'Micro';
                const typeLabel = linkData.assignmentType === 'mcq' ? 'MCQ' : linkData.assignmentType === 'graphGym' ? 'Graph Gym' : 'Dojo Drill';
                assignmentName = `${subjectLabel} ${typeLabel} - ${linkData.totalQuestions} questions`;
              }
            } catch (linkError: any) {
              // If we can't read the assignment link, use a fallback name
              console.warn(`Could not read assignment link ${data.assignmentLinkId}:`, linkError);
              const typeLabel = data.assignmentType === 'mcq' ? 'MCQ' : data.assignmentType === 'graphGym' ? 'Graph Gym' : 'Dojo Drill';
              assignmentName = `${typeLabel} Assignment - ${data.totalQuestions || '?'} questions`;
            }

            // Use studentName from result if available, otherwise fall back to email
            const studentName = data.studentName || data.studentEmail || 'Guest';

            results.push({
              id: resultDoc.id,
              assignmentLinkId: data.assignmentLinkId,
              assignmentName,
              studentId: data.studentId || null,
              studentEmail: data.studentEmail || null,
              studentName,
              score: data.score || 0,
              totalQuestions: data.totalQuestions || 0,
              correctCount: data.correctCount || 0,
              submittedAt: data.submittedAt,
              assignmentType: data.assignmentType || 'mcq'
            });
          } catch (error) {
            console.error(`Error processing result ${resultDoc.id}:`, error);
          }
        }

        setAssignmentResults(results);
      } catch (error) {
        console.error('Error fetching assignment results:', error);
      } finally {
        setLoadingResults(false);
      }
    };

    fetchResults();
  }, [user, viewMode]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Check if user is a teacher
  const isTeacher = user && userData?.teacher === true;
  const showUpgradeBanner = !isTeacher && !loadingUserData;

  // Handle upgrade to teacher mode
  const handleUpgradeToTeacher = async () => {
    if (!user) {
      // Not logged in - redirect to signup with teacher code
      router.push('/signup?code=9759');
      return;
    }

    // Logged in - upgrade account
    setIsUpgrading(true);
    try {
      const response = await fetch('/api/upgrade-to-teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.uid }),
      });

      // Check if response is OK before parsing JSON
      if (!response.ok) {
        // Try to parse error response, but handle HTML error pages
        let errorMessage = 'Failed to upgrade account';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
          if (errorData.details) {
            console.error('Upgrade error details:', errorData.details);
          }
        } catch (parseError) {
          // Response might be HTML error page
          console.error('Failed to parse error response:', parseError);
          errorMessage = `Server error (${response.status}). Check server logs.`;
        }
        alert(errorMessage);
        return;
      }

      const data = await response.json();

      if (data.success) {
        // Update local userData to reflect teacher status
        if (userData) {
          setUserData({ ...userData, teacher: true });
        }
        // Refresh the page to show teacher features
        router.refresh();
      } else {
        console.error('Failed to upgrade to teacher:', data.error);
        alert(data.error || 'Failed to upgrade account. Please try again.');
      }
    } catch (error: any) {
      console.error('Error upgrading to teacher:', error);
      // Handle JSON parse errors specifically
      if (error.message?.includes('JSON')) {
        alert('Server returned an invalid response. Check that environment variables are set correctly in production.');
      } else {
        alert('An error occurred. Please try again.');
      }
    } finally {
      setIsUpgrading(false);
    }
  };

  // Assignment mode choice screen (shown first when visiting /tutor/builder)
  if (assignmentModeChoice === null) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-black mb-3">
              How would you like to assign this?
            </h1>
            <p className="text-lg text-gray-700 font-semibold">
              Run a live session now or generate a link for later.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <button
              type="button"
              onClick={() => setAssignmentModeChoice('live')}
              className="group flex flex-col items-center justify-center text-left p-8 md:p-10 bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all min-h-[200px]"
            >
              <h2 className="text-xl font-black text-black mb-2 group-hover:text-blue-600 transition-colors">
                Launch a Live Session
              </h2>
              <p className="text-sm text-gray-600 font-semibold">
                Best for bell-ringers and synchronous activities
              </p>
            </button>
            <button
              type="button"
              onClick={() => setAssignmentModeChoice('homework')}
              className="group flex flex-col items-center justify-center text-left p-8 md:p-10 bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all min-h-[200px]"
            >
              <h2 className="text-xl font-black text-black mb-2 group-hover:text-green-600 transition-colors">
                Assign as Homework
              </h2>
              <p className="text-sm text-gray-600 font-semibold">
                Best for take home activities or individual class work
              </p>
            </button>
          </div>

          {/* Quick Picks - pre-made drills carousel (3 at a time, left/right arrows) */}
          {(() => {
            const DRILLS_PER_PAGE = 3;
            const quickPicksDrills: { id: string; title: string; subject: 'macro' | 'micro' | 'both'; questionCount: number }[] = [
              { id: '1', title: 'Unit 1 Basics', subject: 'both', questionCount: 12 },
              { id: '2', title: 'Unit 2 Supply', subject: 'macro', questionCount: 8 },
              { id: '3', title: 'Unit 3 Costs', subject: 'micro', questionCount: 10 },
              { id: '4', title: 'Unit 4 Market Structures', subject: 'both', questionCount: 15 },
              { id: '5', title: 'Unit 5 Factor Markets', subject: 'macro', questionCount: 9 },
              { id: '6', title: 'Unit 6 International', subject: 'micro', questionCount: 11 },
            ];
            const totalPages = Math.ceil(quickPicksDrills.length / DRILLS_PER_PAGE);
            const start = quickPicksPage * DRILLS_PER_PAGE;
            const visibleDrills = quickPicksDrills.slice(start, start + DRILLS_PER_PAGE);
            return (
              <div className="mb-20">
                <h2 className="text-xl font-black text-black text-center mb-6">
                  Short on time? Grab a pre-made drill:
                </h2>
                <div className="flex items-stretch justify-center gap-4 max-w-5xl mx-auto">
                  <button
                    type="button"
                    onClick={() => setQuickPicksPage((p) => Math.max(0, p - 1))}
                    disabled={quickPicksPage === 0}
                    className="flex-shrink-0 w-14 h-14 self-center rounded-full border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:scale-105 transition-all"
                    aria-label="Previous drills"
                  >
                    <ChevronLeft className="w-7 h-7 text-black" />
                  </button>
                  <div className="flex flex-1 justify-center gap-6">
                    {visibleDrills.map((drill) => (
                      <button
                        key={drill.id}
                        type="button"
                        className="flex-1 min-w-0 max-w-[280px] flex flex-col items-start text-left p-7 bg-white border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-black text-black hover:bg-gray-50 transition-all min-h-[200px]"
                      >
                        <span className="text-xl leading-tight block mb-3">{drill.title}</span>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {drill.subject === 'both' ? (
                            <>
                              <span className="inline-block px-3 py-1.5 rounded-md text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">Macro</span>
                              <span className="inline-block px-3 py-1.5 rounded-md text-xs font-bold bg-green-100 text-green-800 border border-green-300">Micro</span>
                            </>
                          ) : (
                            <span className={`inline-block px-3 py-1.5 rounded-md text-xs font-bold ${
                              drill.subject === 'macro' ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-green-100 text-green-800 border border-green-300'
                            }`}>
                              {drill.subject === 'macro' ? 'Macro' : 'Micro'}
                            </span>
                          )}
                        </div>
                        <span className="text-base font-semibold text-gray-600">{drill.questionCount} questions</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuickPicksPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={quickPicksPage >= totalPages - 1}
                    className="flex-shrink-0 w-14 h-14 self-center rounded-full border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:scale-105 transition-all"
                    aria-label="Next drills"
                  >
                    <ChevronRight className="w-7 h-7 text-black" />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Three steps: circle numbers with one connecting line */}
          <div className="max-w-3xl mx-auto pt-6">
            <div className="flex items-center justify-center gap-0">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-black text-white font-black text-lg flex items-center justify-center z-10">1</span>
              <span className="flex-1 max-w-[120px] h-0.5 bg-black" aria-hidden="true" />
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-black text-white font-black text-lg flex items-center justify-center z-10">2</span>
              <span className="flex-1 max-w-[120px] h-0.5 bg-black" aria-hidden="true" />
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-black text-white font-black text-lg flex items-center justify-center z-10">3</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
              <div>
                <h3 className="text-base font-black text-black mb-1">Choose your mode</h3>
                <p className="text-sm text-gray-600 font-semibold">Live activities or asynchronous assignments</p>
              </div>
              <div>
                <h3 className="text-base font-black text-black mb-1">Create and Share</h3>
                <p className="text-sm text-gray-600 font-semibold">Choose from our library of MCQs, Graphing Exercises, or interactive activities</p>
              </div>
              <div>
                <h3 className="text-base font-black text-black mb-1">Track Results</h3>
                <p className="text-sm text-gray-600 font-semibold">Detailed progress tracking for every student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        {/* Upgrade Banner for Non-Teachers */}
        {showUpgradeBanner && (
          <div className="mb-6 bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-full">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900 mb-1">
                    Unlock Teacher Mode
                  </h2>
                  <p className="text-gray-700 font-semibold">
                    Create custom assignments, track student progress, and access all tutor features - completely free!
                  </p>
                </div>
              </div>
              <button
                onClick={handleUpgradeToTeacher}
                disabled={isUpgrading}
                className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-black rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-700 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${
                  isUpgrading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isUpgrading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Upgrading...
                  </>
                ) : (
                  <>
                    Free Teacher Access
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Title and Tabs */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-black mb-4">Tutor Dashboard</h1>
          
          {/* Tabs */}
          <div className="flex border-2 border-black rounded-lg overflow-hidden w-fit">
            <button
              onClick={() => setViewMode('builder')}
              className={`px-6 py-2 font-black transition-colors ${
                viewMode === 'builder'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Assignment Builder
            </button>
            <button
              onClick={() => setViewMode('results')}
              className={`px-6 py-2 font-black transition-colors border-l-2 border-black ${
                viewMode === 'results'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Assignment Results
            </button>
          </div>
        </div>

        {/* Assignment Results View */}
        {viewMode === 'results' && (
          <div className="bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            {loadingResults ? (
              <div className="p-12 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-gray-500 font-semibold">Loading results...</p>
              </div>
            ) : assignmentResults.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-500 font-semibold">No assignment results yet. Share your assignment links with students to see their submissions here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b-4 border-black">
                    <tr>
                      <th className="px-4 py-3 text-left font-black text-black">Assignment</th>
                      <th className="px-4 py-3 text-left font-black text-black">Student Name</th>
                      <th className="px-4 py-3 text-left font-black text-black">Score</th>
                      <th className="px-4 py-3 text-left font-black text-black">Submitted</th>
                      <th className="px-4 py-3 text-left font-black text-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignmentResults.map((result) => (
                      <tr
                        key={result.id}
                        className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 font-semibold text-gray-900">
                          {result.assignmentName}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {result.studentName || result.studentEmail || 'Guest'}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            result.score >= 80
                              ? 'bg-green-100 text-green-800'
                              : result.score >= 60
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {result.score}% ({result.correctCount}/{result.totalQuestions})
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-sm">
                          {formatDate(result.submittedAt)}
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            href={`/tutor/results/${result.id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          >
                            <Eye className="w-4 h-4" />
                            View Results
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Assignment Builder View */}
        {viewMode === 'builder' && (
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-600">Select questions to create a custom assignment link</p>
            </div>

        {/* Assignment Type Selection */}
        <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-700">Assignment Type:</span>
            <div className="flex border-2 border-black rounded-lg overflow-hidden">
              <button
                onClick={() => {
                  setAssignmentType('mcq');
                  setSelectedIds(new Set());
                  setSearchTerm('');
                  setUnitFilter(null);
                }}
                className={`px-6 py-2 font-black transition-colors ${
                  assignmentType === 'mcq'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                MCQs
              </button>
              <button
                onClick={() => {
                  setAssignmentType('graphGym');
                  setSelectedIds(new Set());
                  setSearchTerm('');
                  setUnitFilter(null);
                }}
                className={`px-6 py-2 font-black transition-colors border-l-2 border-black ${
                  assignmentType === 'graphGym'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Graph Gym FRQs
              </button>
              <button
                onClick={() => {
                  setAssignmentType('dojoDrill');
                  setSelectedIds(new Set());
                  setSearchTerm('');
                  setUnitFilter(null);
                }}
                className={`px-6 py-2 font-black transition-colors border-l-2 border-black ${
                  assignmentType === 'dojoDrill'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Dojo Drills
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={
                  assignmentType === 'mcq' 
                    ? "Search by ID, question text, or unit..." 
                    : assignmentType === 'graphGym'
                    ? "Search by ID, title, description, or topics..."
                    : "Search by title, description, or drill ID..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-black rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Unit Filter - Only show for MCQs */}
            {assignmentType === 'mcq' ? (
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={unitFilter || ''}
                  onChange={(e) => setUnitFilter(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-black rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="">All Units</option>
                  {uniqueUnits.map(unit => (
                    <option key={unit} value={unit}>Unit {unit}</option>
                  ))}
                </select>
              </div>
            ) : assignmentType === 'graphGym' || assignmentType === 'dojoDrill' ? (
              <div />
            ) : null}

            {/* Subject Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">Subject:</span>
              <div className="flex border-2 border-black rounded-lg overflow-hidden">
                <button
                  onClick={() => {
                    setSubjectFilter('ap_macroeconomics');
                    setUnitFilter(null); // Reset unit filter when switching subjects
                  }}
                  className={`px-4 py-2 font-black transition-colors ${
                    subjectFilter === 'ap_macroeconomics'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Macro
                </button>
                <button
                  onClick={() => {
                    setSubjectFilter('ap_microeconomics');
                    setUnitFilter(null); // Reset unit filter when switching subjects
                  }}
                  className={`px-4 py-2 font-black transition-colors border-l-2 border-black ${
                    subjectFilter === 'ap_microeconomics'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Micro
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Table - MCQs */}
        {assignmentType === 'mcq' && (
          <div className="bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b-4 border-black">
                  <tr>
                    <th className="px-4 py-3 text-left font-black text-black">ID</th>
                    <th className="px-4 py-3 text-left font-black text-black">Unit</th>
                    <th className="px-4 py-3 text-left font-black text-black">Question Text</th>
                    <th className="px-4 py-3 text-left font-black text-black">Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuestions.map((question, index) => {
                    const isSelected = selectedIds.has(question.id);
                    return (
                      <tr
                        key={`${question.id}-${index}`}
                        className={`border-b-2 border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer ${
                          isSelected ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => toggleSelection(question.id)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center">
                            {isSelected ? (
                              <CheckCircle2 className="w-6 h-6 text-blue-600" />
                            ) : (
                              <div className="w-6 h-6 border-2 border-gray-400 rounded" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-bold text-gray-900">{question.id}</td>
                        <td className="px-4 py-3 font-semibold text-gray-700">Unit {question.unit}</td>
                        <td className="px-4 py-3 text-gray-700 max-w-md">
                          <QuestionTooltip question={question.question}>
                            <span className="cursor-help">{truncateText(question.question, 150)}</span>
                          </QuestionTooltip>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded border border-blue-300">
                              {question.unitName}
                            </span>
                            {question.lessonIDS.map((lessonId, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded border border-green-300"
                              >
                                {lessonId}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredQuestions.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-gray-500 font-semibold">No questions found matching your filters.</p>
              </div>
            )}
          </div>
        )}

        {/* Graph Gym Scenarios Table */}
        {assignmentType === 'graphGym' && (
          <div className="bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b-4 border-black">
                  <tr>
                    <th className="px-4 py-3 text-left font-black text-black">ID</th>
                    <th className="px-4 py-3 text-left font-black text-black">Title</th>
                    <th className="px-4 py-3 text-left font-black text-black">Description</th>
                    <th className="px-4 py-3 text-left font-black text-black">Lesson</th>
                    <th className="px-4 py-3 text-left font-black text-black">Difficulty</th>
                    <th className="px-4 py-3 text-left font-black text-black">Topics</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredScenarios.map((scenario, index) => {
                    const isSelected = selectedIds.has(scenario.id);
                    return (
                      <tr
                        key={`${scenario.id}-${index}`}
                        className={`border-b-2 border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer ${
                          isSelected ? 'bg-green-50' : ''
                        }`}
                        onClick={() => toggleSelection(scenario.id)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center">
                            {isSelected ? (
                              <CheckCircle2 className="w-6 h-6 text-green-600" />
                            ) : (
                              <div className="w-6 h-6 border-2 border-gray-400 rounded" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-bold text-gray-900">{scenario.id}</td>
                        <td className="px-4 py-3 font-semibold text-gray-900">{scenario.title}</td>
                        <td className="px-4 py-3 text-gray-700 max-w-md">
                          {truncateText(scenario.description, 150)}
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-700">{scenario.lessonId}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-semibold rounded border ${
                            scenario.difficulty === 'easy' 
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : scenario.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                              : 'bg-red-100 text-red-800 border-red-300'
                          }`}>
                            {scenario.difficulty.charAt(0).toUpperCase() + scenario.difficulty.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            {scenario.topics.slice(0, 3).map((topic, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded border border-purple-300"
                              >
                                {topic}
                              </span>
                            ))}
                            {scenario.topics.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded border border-gray-300">
                                +{scenario.topics.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredScenarios.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-gray-500 font-semibold">No scenarios found matching your filters.</p>
              </div>
            )}
          </div>
        )}

        {/* Dojo Drills Table */}
        {assignmentType === 'dojoDrill' && (
          <div className="bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b-4 border-black">
                  <tr>
                    <th className="px-4 py-3 text-left font-black text-black">Select</th>
                    <th className="px-4 py-3 text-left font-black text-black">Title</th>
                    <th className="px-4 py-3 text-left font-black text-black">Description</th>
                    <th className="px-4 py-3 text-left font-black text-black">Subject</th>
                    <th className="px-4 py-3 text-left font-black text-black">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDrills.map((drill) => {
                    const isSelected = selectedIds.has(drill.id);
                    const drillUnit = getDrillUnitForSubject(drill, subjectFilter);
                    const subjectLabel = drillAppliesToSubject(drill, 'ap_macroeconomics') ? 'Macro' : 'Micro';
                    return (
                      <tr
                        key={drill.id}
                        className={`border-b-2 border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer ${
                          isSelected ? 'bg-purple-50' : ''
                        }`}
                        onClick={() => toggleSelection(drill.id)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center">
                            {isSelected ? (
                              <CheckCircle2 className="w-6 h-6 text-purple-600" />
                            ) : (
                              <div className="w-6 h-6 border-2 border-gray-400 rounded" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-900">{drill.title}</td>
                        <td className="px-4 py-3 text-gray-700 max-w-md">
                          {truncateText(drill.description, 150)}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-semibold rounded border ${
                            subjectLabel === 'Macro'
                              ? 'bg-blue-100 text-blue-800 border-blue-300'
                              : 'bg-green-100 text-green-800 border-green-300'
                          }`}>
                            {subjectLabel}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-700">
                          {drillUnit !== null ? `Unit ${drillUnit}` : 'N/A'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredDrills.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-gray-500 font-semibold">No dojo drills found matching your filters.</p>
              </div>
            )}
          </div>
        )}
          </>
        )}
      </div>

      {/* Sticky Footer - Only show for builder view */}
      {viewMode === 'builder' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black shadow-[0_-4px_8px_rgba(0,0,0,0.1)] z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-lg font-black text-black">
                {selectedIds.size} {
                  assignmentType === 'mcq' 
                    ? 'question' 
                    : assignmentType === 'graphGym'
                    ? 'scenario'
                    : 'drill'
                }{selectedIds.size !== 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center gap-3">
              {assignmentModeChoice === 'live' ? (
                assignmentType === 'mcq' && selectedIds.size > 0 && (
                  <button
                    type="button"
                    onClick={openShareScreen}
                    className="inline-flex items-center gap-2 px-6 py-3 font-black text-white rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-blue-600 hover:bg-blue-700 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    Generate a Share Screen
                  </button>
                )
              ) : (
                <>
                  {selectedIds.size > 0 && (
                    <button
                      type="button"
                      onClick={openPreview}
                      className="inline-flex items-center gap-2 px-5 py-3 font-black rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-white text-black hover:bg-gray-50 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <Eye className="w-5 h-5" />
                      Preview assignment
                    </button>
                  )}
                  <button
                    onClick={generateLink}
                    disabled={selectedIds.size === 0}
                    className={`px-6 py-3 font-black text-white rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
                      selectedIds.size === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : linkCopied
                        ? 'bg-green-600 hover:bg-green-700 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                        : assignmentType === 'mcq'
                        ? 'bg-blue-600 hover:bg-blue-700 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                        : assignmentType === 'graphGym'
                        ? 'bg-green-600 hover:bg-green-700 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                        : 'bg-purple-600 hover:bg-purple-700 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    }`}
                  >
                    {linkCopied ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Copied to Clipboard
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Copy className="w-5 h-5" />
                        Create Assignment Link
                      </span>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        </div>
      )}

    </div>
  );
}

export default function TutorBuilderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <TutorBuilderContent />
    </Suspense>
  );
}

