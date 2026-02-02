'use client';

import { useState, useMemo, useEffect, Suspense, useRef } from 'react';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question } from '@/data/questionBanks/types';
import { Copy, CheckCircle2, Search, Filter, Eye, Loader2, GraduationCap, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { useSearchParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { getPublicAssignmentTemplates, type PublicAssignmentTemplate } from '@/lib/assignments';
import { collection, addDoc, serverTimestamp, query, where, getDocs, getDoc, doc, orderBy } from 'firebase/firestore';
import { graphGymScenarios, GraphGymScenario } from '@/data/graphGymScenarios';

type AssignmentType = 'mcq' | 'graphGym';
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
  assignmentType: 'mcq' | 'graphGym';
}

function TutorBuilderContent() {
  const { user, userData, loadingUserData, setUserData } = useAuthContext();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [assignmentModeChoice, setAssignmentModeChoice] = useState<AssignmentModeChoice>(null);
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
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [selectedTopicTags, setSelectedTopicTags] = useState<Set<string>>(new Set());
  const [isGeneratingShareScreen, setIsGeneratingShareScreen] = useState(false);
  const [publicTemplates, setPublicTemplates] = useState<PublicAssignmentTemplate[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [templatesPage, setTemplatesPage] = useState(0);
  const [templateModalTemplate, setTemplateModalTemplate] = useState<PublicAssignmentTemplate | null>(null);
  
  // Fetch public assignment templates when on choice screen
  useEffect(() => {
    if (assignmentModeChoice !== null) return;
    setLoadingTemplates(true);
    setTemplatesPage(0);
    getPublicAssignmentTemplates()
      .then(setPublicTemplates)
      .catch((err) => {
        console.error('Error fetching public templates:', err);
        setPublicTemplates([]);
      })
      .finally(() => setLoadingTemplates(false));
  }, [assignmentModeChoice]);
  
  // Assignment results state
  const [assignmentResults, setAssignmentResults] = useState<AssignmentResult[]>([]);
  const [loadingResults, setLoadingResults] = useState(false);

  // Convert subject filter to graph gym format
  const graphGymSubject = useMemo(() => {
    return subjectFilter === 'ap_macroeconomics' ? 'macro' : 'micro';
  }, [subjectFilter]);

  // Normalize tag for matching (e.g. "Supply & Demand" -> "supply and demand")
  const normalizeTag = (tag: string) => tag.toLowerCase().replace(/\s*&\s*/g, ' and ').trim();

  // Get unique units for the selected subject (MCQs only)
  const uniqueUnits = useMemo(() => {
    if (assignmentType === 'graphGym') return [];
    const units = new Set(
      allQuestions
        .filter(q => q.subject === subjectFilter)
        .map(q => q.unit)
    );
    return Array.from(units).sort((a, b) => a - b);
  }, [subjectFilter, assignmentType]);

  // Filter questions based on search, unit, subject, and topic tags (MCQs only)
  const filteredQuestions = useMemo(() => {
    if (assignmentType === 'graphGym') return [];
    const filtered = allQuestions.filter(q => {
      const matchesSearch = searchTerm === '' || 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.id.toString().includes(searchTerm) ||
        q.unitName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesUnit = unitFilter === null || q.unit === unitFilter;
      
      const matchesSubject = q.subject === subjectFilter;
      
      const searchableText = `${q.unitName} ${q.question}`.toLowerCase();
      const matchesTopics = selectedTopicTags.size === 0 || 
        Array.from(selectedTopicTags).some(tag => searchableText.includes(normalizeTag(tag)));
      
      return matchesSearch && matchesUnit && matchesSubject && matchesTopics;
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
  }, [searchTerm, unitFilter, subjectFilter, assignmentType, selectedTopicTags]);

  // Filter Graph Gym scenarios based on search, topic tags, and filters
  const filteredScenarios = useMemo(() => {
    if (assignmentType === 'mcq') return [];
    return graphGymScenarios.filter(scenario => {
      const scenarioSubjects = Array.isArray(scenario.subject) ? scenario.subject : [scenario.subject];
      const matchesSubject = scenarioSubjects.includes(graphGymSubject);
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
      
      const scenarioTopicText = scenario.topics.join(' ').toLowerCase();
      const matchesTopics = selectedTopicTags.size === 0 || 
        Array.from(selectedTopicTags).some(tag => {
          const norm = normalizeTag(tag);
          return scenarioTopicText.includes(norm) || scenario.title.toLowerCase().includes(norm) || scenario.description.toLowerCase().includes(norm);
        });
      
      return matchesSubject && matchesIdRange && matchesSearch && matchesTopics;
    });
  }, [searchTerm, graphGymSubject, assignmentType, selectedTopicTags]);

  // Resolve selected IDs to full question objects for MCQ preview (order preserved)
  const selectedMcqQuestions = useMemo(() => {
    if (assignmentType !== 'mcq') return [];
    const ids = Array.from(selectedIds)
      .filter((id): id is number => typeof id === 'number')
      .sort((a, b) => a - b);
    const map = new Map(allQuestions.map((q) => [q.id, q]));
    return ids.map((id) => map.get(id)).filter(Boolean) as Question[];
  }, [assignmentType, selectedIds]);

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
    const idsArray = Array.from(selectedIds).sort((a, b) => Number(a) - Number(b));
    const idsString = idsArray.map(id => String(id)).join(',');
    const encoded = btoa(idsString);
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const previewSuffix = '&preview=1';
    if (assignmentType === 'mcq') {
      return `${origin}/exam/custom?q=${encoded}${previewSuffix}`;
    }
    return `${origin}/graph-gym/custom?q=${encoded}${previewSuffix}`;
  };

  const openPreview = () => {
    const url = getPreviewUrl();
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Encoded assignment ID for live presenter URL (same encoding as getPreviewUrl)
  const getEncodedAssignmentId = (): string | null => {
    if (selectedIds.size === 0) return null;
    const idsArray = Array.from(selectedIds).sort((a, b) => Number(a) - Number(b));
    const idsString = idsArray.map(id => String(id)).join(',');
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

  const openGraphGymPresenter = () => {
    if (assignmentType !== 'graphGym' || selectedIds.size === 0) return;
    const idsArray = Array.from(selectedIds).sort((a, b) => Number(a) - Number(b));
    const idsString = idsArray.map((id) => String(id)).join(',');
    const encoded = btoa(idsString);
    router.push(`/live/graph-gym-present?q=${encodeURIComponent(encoded)}`);
  };

  const openShareScreen = async () => {
    const encoded = getEncodedAssignmentId();
    if (!encoded || !user || assignmentType !== 'mcq') return;
    setIsGeneratingShareScreen(true);
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
    } finally {
      setIsGeneratingShareScreen(false);
    }
  };

  const generateLink = async () => {
    if (selectedIds.size === 0) return;
    
    const idsArray = Array.from(selectedIds).sort((a, b) => Number(a) - Number(b));
    const idsString = idsArray.map(id => String(id)).join(',');
    const encoded = btoa(idsString);
    
    const url = assignmentType === 'mcq'
      ? `${window.location.origin}/exam/custom?q=${encoded}`
      : `${window.location.origin}/graph-gym/custom?q=${encoded}`;
    
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
          assignmentType: assignmentType,
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

  /** Apply a public template: pre-fill builder and open assignment flow in the chosen mode (live or homework). */
  const applyPublicTemplate = (template: PublicAssignmentTemplate, mode: 'live' | 'homework') => {
    if (template.assignmentType !== 'mcq' && template.assignmentType !== 'graphGym') return;
    setAssignmentType(template.assignmentType);
    setSelectedIds(new Set(template.questionIds));
    setSubjectFilter(template.subject);
    setAssignmentModeChoice(mode);
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
      <div className="min-h-screen bg-slate-100">
        {/* Student Results link only on this home/choice screen */}
        <div className="w-full flex justify-end px-6 pt-4 pb-2">
          <Link
            href="/tutor/results"
            className="text-indigo-700 font-black text-lg tracking-tight hover:text-indigo-800 hover:underline transition-colors uppercase"
          >
            Student Results
          </Link>
        </div>
        <div className="max-w-4xl mx-auto px-6">
        <div id="choice">
          {/* Main choice: fills viewport so you scroll to see pre-made drills */}
          <section className="min-h-screen flex flex-col justify-center py-16">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-black text-black mb-3">
                How would you like to assign this?
              </h1>
              <p className="text-lg text-gray-700 font-semibold">
                Run a live session now or generate a link for later.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 flex-1 items-stretch">
              <button
                type="button"
                onClick={() => setAssignmentModeChoice('live')}
                className="group flex flex-col items-start justify-center text-left p-10 bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[320px] flex-1 w-full max-w-[320px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400 flex-shrink-0" aria-hidden />
                  <h2 className="text-2xl font-bold text-indigo-700 group-hover:text-indigo-800 transition-colors">
                    Launch a Live Session
                  </h2>
                </div>
                <p className="text-base text-slate-600 font-semibold pl-8">
                  Best for bell-ringers and synchronous activities
                </p>
              </button>
              <button
                type="button"
                onClick={() => setAssignmentModeChoice('homework')}
                className="group flex flex-col items-start justify-center text-left p-10 bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[320px] flex-1 w-full max-w-[320px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-5 h-5 rounded-full bg-red-500 flex-shrink-0" aria-hidden />
                  <h2 className="text-2xl font-bold text-indigo-700 group-hover:text-indigo-800 transition-colors">
                    Assign as Homework
                  </h2>
                </div>
                <p className="text-base text-slate-600 font-semibold pl-8">
                  Best for take home activities or individual class work
                </p>
              </button>
            </div>
          </section>

          {/* Short on time? – free-floating headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-indigo-700 mb-8 md:mb-10 text-center">
            Short on time? Grab a pre-made drill:
          </h2>
          {/* Custom assignment templates: full-width row, large rectangles, minimal rounding */}
          {loadingTemplates ? (
            <div className="flex items-center justify-center py-16 gap-4 w-full">
              <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
              <span className="font-semibold text-slate-600 text-lg">Loading...</span>
            </div>
          ) : publicTemplates.length === 0 ? (
            <div className="py-16 text-center text-slate-600 font-semibold text-lg w-full">
              No custom assignments yet.
            </div>
          ) : (() => {
            const mcqAndGraphGymTemplates = publicTemplates.filter((t) => t.assignmentType === 'mcq' || t.assignmentType === 'graphGym');
            if (mcqAndGraphGymTemplates.length === 0) {
              return (
                <div className="py-16 text-center text-slate-600 font-semibold text-lg w-full mb-20">
                  No custom assignments yet.
                </div>
              );
            }
            const TEMPLATES_PER_PAGE = 3;
            const totalPages = Math.ceil(mcqAndGraphGymTemplates.length / TEMPLATES_PER_PAGE);
            const start = templatesPage * TEMPLATES_PER_PAGE;
            const visibleTemplates = mcqAndGraphGymTemplates.slice(start, start + TEMPLATES_PER_PAGE);
            return (
              <div className="w-full mb-20 space-y-4">
                {visibleTemplates.map((template) => {
                  const title = template.assignmentName ?? template.templateTitle ?? `${template.subject === 'ap_macroeconomics' ? 'Macro' : 'Micro'} – ${template.assignmentType === 'mcq' ? 'MCQ' : 'Graph Gym'}`;
                  const topic = template.templateTopic ?? (template.subject === 'ap_macroeconomics' ? 'Macro' : 'Micro');
                  return (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => setTemplateModalTemplate(template)}
                      className="w-full flex flex-row items-center justify-between text-left p-6 sm:p-8 bg-white border-2 border-slate-200 rounded-lg shadow-md hover:shadow-lg hover:border-indigo-300 transition-all min-h-[120px]"
                    >
                      <div className="min-w-0 flex-1 pr-4">
                        <span className="text-xl md:text-2xl font-bold text-indigo-700 leading-tight block mb-1 line-clamp-1">{title}</span>
                        <p className="text-base font-semibold text-slate-600">{topic} · {template.totalQuestions} question{template.totalQuestions !== 1 ? 's' : ''}</p>
                      </div>
                      <span className="flex-shrink-0 text-indigo-600 font-bold text-base whitespace-nowrap">Use This →</span>
                    </button>
                  );
                })}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setTemplatesPage((p) => Math.max(0, p - 1))}
                      disabled={templatesPage === 0}
                      className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-300 transition-all text-slate-700"
                      aria-label="Previous templates"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setTemplatesPage((p) => Math.min(totalPages - 1, p + 1))}
                      disabled={templatesPage >= totalPages - 1}
                      className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-300 transition-all text-slate-700"
                      aria-label="Next templates"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>
            );
          })()}

          {/* How to use: headline + 3 step cards */}
          <div className="max-w-5xl mx-auto pt-12 pb-12">
            <h2 className="text-4xl md:text-5xl font-black text-blue-500 text-center mb-12">
              How to use the Tutor Builder
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1: Choose your mode */}
              <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col min-h-[280px]">
                <h3 className="text-xl font-bold text-emerald-600 mb-2 flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-emerald-600 text-emerald-600 font-bold text-lg flex-shrink-0">1</span>
                  Choose your mode
                </h3>
                <p className="text-base font-bold text-black mb-4">Explore</p>
                <p className="text-base text-slate-600 flex-1 leading-relaxed">
                  Pick <span className="font-bold text-emerald-600">live activities</span> or <span className="font-bold text-emerald-600">asynchronous assignments</span> to match how you want to run class—bell-ringers, homework, or both.
                </p>
              </div>
              {/* Step 2: Create and Share */}
              <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col min-h-[280px]">
                <h3 className="text-xl font-bold text-blue-500 mb-2 flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-blue-500 text-blue-500 font-bold text-lg flex-shrink-0">2</span>
                  Create and Share
                </h3>
                <p className="text-base font-bold text-black mb-4">Build</p>
                <p className="text-base text-slate-600 flex-1 leading-relaxed">
                  Choose from our library of <span className="font-bold text-blue-500">MCQs</span>, <span className="font-bold text-blue-500">Graphing Exercises</span>, or interactive activities. Share a link or launch a live session.
                </p>
              </div>
              {/* Step 3: Track Results */}
              <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col min-h-[280px]">
                <h3 className="text-xl font-bold text-violet-600 mb-2 flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-violet-600 text-violet-600 font-bold text-lg flex-shrink-0">3</span>
                  Track Results
                </h3>
    
                <p className="text-base text-slate-600 flex-1 leading-relaxed">
                  See <span className="font-bold text-violet-600">detailed progress</span> for every student. Review scores, completion, and question-level data in one place.
                </p>
              </div>
            </div>
          </div>

          {/* Modal: choose Live or Homework when using a pre-made template */}
          {templateModalTemplate && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              onClick={() => setTemplateModalTemplate(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="template-modal-title"
            >
              <div
                className="bg-slate-100 rounded-3xl shadow-2xl max-w-2xl w-full p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative mb-8">
                  <h2 id="template-modal-title" className="text-2xl font-black text-black text-center">
                    How would you like to assign this?
                  </h2>
                  <button
                    type="button"
                    onClick={() => setTemplateModalTemplate(null)}
                    className="absolute top-1/2 right-0 -translate-y-1/2 p-2 rounded-full hover:bg-slate-200 text-slate-600 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-6">
                  <button
                    type="button"
                    onClick={() => {
                      applyPublicTemplate(templateModalTemplate, 'live');
                      setTemplateModalTemplate(null);
                    }}
                    className="group flex flex-col items-start justify-center text-left p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[240px] flex-1 min-w-[240px]"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-5 h-5 rounded-full bg-amber-400 flex-shrink-0" aria-hidden />
                      <h3 className="text-xl font-bold text-indigo-700 group-hover:text-indigo-800 transition-colors">
                        Launch a Live Session
                      </h3>
                    </div>
                    <p className="text-base text-slate-600 font-semibold pl-8">
                      Best for bell-ringers and synchronous activities
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      applyPublicTemplate(templateModalTemplate, 'homework');
                      setTemplateModalTemplate(null);
                    }}
                    className="group flex flex-col items-start justify-center text-left p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[240px] flex-1 min-w-[240px]"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-5 h-5 rounded-full bg-red-500 flex-shrink-0" aria-hidden />
                      <h3 className="text-xl font-bold text-indigo-700 group-hover:text-indigo-800 transition-colors">
                        Assign as Homework
                      </h3>
                    </div>
                    <p className="text-base text-slate-600 font-semibold pl-8">
                      Best for take home activities or individual class work
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Back to Home only (choice screen); no Student Results on builder/list or results view */}
      <div className="w-full flex justify-end px-6 pt-4 pb-2">
        <button
          type="button"
          onClick={() => setAssignmentModeChoice(null)}
          className="text-indigo-700 font-black text-lg tracking-tight hover:text-indigo-800 hover:underline transition-colors uppercase"
        >
          Back to Home
        </button>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
        {/* Upgrade Banner for Non-Teachers */}
        {showUpgradeBanner && (
          <div className="mb-6 bg-white rounded-3xl shadow-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-full">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">
                    Unlock Teacher Mode
                  </h2>
                  <p className="text-slate-600 font-semibold">
                    Create custom assignments, track student progress, and access all tutor features - completely free!
                  </p>
                </div>
              </div>
              <button
                onClick={handleUpgradeToTeacher}
                disabled={isUpgrading}
                className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all ${
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

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Tutor Dashboard</h1>
        </div>

        {/* Assignment Results View */}
        {viewMode === 'results' && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            {loadingResults ? (
              <div className="p-12 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-slate-500 font-semibold">Loading results...</p>
              </div>
            ) : assignmentResults.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-slate-500 font-semibold">No assignment results yet. Share your assignment links with students to see their submissions here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Assignment</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Student Name</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Score</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Submitted</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignmentResults.map((result) => (
                      <tr
                        key={result.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          {result.assignmentName}
                        </td>
                        <td className="px-4 py-3 text-slate-700">
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
                        <td className="px-4 py-3 text-slate-600 text-sm">
                          {formatDate(result.submittedAt)}
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            href={`/tutor/results/${result.id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
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
              <p className="text-base text-slate-600">Select questions to create a custom assignment link</p>
            </div>

            <div className="flex gap-6 flex-1 min-h-0">
              {/* Left: Assignment Type + Filters + Table */}
              <div className="flex-1 min-w-0">
        {/* Connected card: Assignment Type + Filters + Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Row 1: Assignment Type (left) + Subject (right) */}
          <div className="p-6 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-600">Assignment Type:</span>
              <div className="flex rounded-xl shadow-lg border border-slate-200 overflow-hidden bg-white">
                <button
                  onClick={() => {
                    setAssignmentType('mcq');
                    setSelectedIds(new Set());
                    setSearchTerm('');
                    setUnitFilter(null);
                  }}
                  className={`px-6 py-2.5 font-bold transition-colors ${
                    assignmentType === 'mcq'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
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
                  className={`px-6 py-2.5 font-bold transition-colors border-l border-slate-200 ${
                    assignmentType === 'graphGym'
                      ? 'bg-green-600 text-white border-l-transparent'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Graph Gym FRQs
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-600">Subject:</span>
              <div className="flex rounded-xl shadow-lg border border-slate-200 overflow-hidden bg-white">
                <button
                  onClick={() => {
                    setSubjectFilter('ap_macroeconomics');
                    setUnitFilter(null);
                  }}
                  className={`px-4 py-2.5 font-bold transition-colors ${
                    subjectFilter === 'ap_macroeconomics'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Macro
                </button>
                <button
                  onClick={() => {
                    setSubjectFilter('ap_microeconomics');
                    setUnitFilter(null);
                    setSelectedTopicTags(new Set());
                  }}
                  className={`px-4 py-2.5 font-bold transition-colors border-l border-slate-200 ${
                    subjectFilter === 'ap_microeconomics'
                      ? 'bg-green-600 text-white border-l-transparent'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Micro
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Topic/tag filter chips (5 per subject, multi-select; filter by any selected tag) */}
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex flex-wrap gap-2">
              {(subjectFilter === 'ap_macroeconomics'
                ? ['Supply & Demand', 'Fiscal Policy', 'LF Market', 'Monetary Policy', 'AD-AS']
                : ['Supply & Demand', 'Costs of Production', 'Market Structures', 'Factor Markets', 'International Trade']
              ).map((tag) => {
                const isSelected = selectedTopicTags.has(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSelectedTopicTags((prev) => {
                        const next = new Set(prev);
                        if (next.has(tag)) next.delete(tag);
                        else next.add(tag);
                        return next;
                      });
                    }}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all border-2 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-800 shadow-sm ring-2 ring-indigo-200 ring-offset-1 hover:bg-indigo-100'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Search icon (expandable) + Unit dropdown */}
          <div className="p-6 border-b border-slate-200 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchExpanded((v) => !v)}
                className="flex items-center justify-center w-11 h-11 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
                aria-label="Toggle search"
              >
                <Search className="w-5 h-5" />
              </button>
              {searchExpanded && (
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
                  className="w-64 sm:w-72 pl-4 pr-4 py-2.5 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  autoFocus
                />
              )}
            </div>
            {assignmentType === 'mcq' && (
              <div className="relative flex items-center gap-2">
                <Filter className="absolute left-3 text-slate-400 w-5 h-5 pointer-events-none" />
                <select
                  value={unitFilter || ''}
                  onChange={(e) => setUnitFilter(e.target.value ? parseInt(e.target.value) : null)}
                  className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">All Units</option>
                  {uniqueUnits.map(unit => (
                    <option key={unit} value={unit}>Unit {unit}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Questions Table - MCQs */}
          {assignmentType === 'mcq' && (
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-slate-900 w-12">Select</th>
                    <th className="px-4 py-3 text-left font-bold text-slate-900 w-16">ID</th>
                    <th className="px-4 py-3 text-left font-bold text-slate-900">Question Text</th>
                    <th className="px-4 py-3 text-left font-bold text-slate-900">Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuestions.map((question, index) => {
                    const isSelected = selectedIds.has(question.id);
                    return (
                      <tr
                        key={`${question.id}-${index}`}
                        className={`border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${
                          isSelected ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => toggleSelection(question.id)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center">
                            {isSelected ? (
                              <CheckCircle2 className="w-6 h-6 text-blue-600" />
                            ) : (
                              <div className="w-6 h-6 border-2 border-slate-300 rounded-lg" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-900">{question.id}</td>
                        <td className="px-4 py-3 text-slate-700 max-w-md">
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
                <p className="text-slate-500 font-semibold">No questions found matching your filters.</p>
              </div>
            )}
          </div>
        )}

          {/* Graph Gym Scenarios Table */}
          {assignmentType === 'graphGym' && (
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-slate-900">ID</th>
                    <th className="px-4 py-3 text-left font-bold text-slate-900">Title</th>
                    <th className="px-4 py-3 text-left font-bold text-slate-900">Description</th>
                    <th className="px-4 py-3 text-left font-bold text-slate-900">Lesson</th>
                    <th className="px-4 py-3 text-left font-bold text-slate-900">Difficulty</th>
                    <th className="px-4 py-3 text-left font-bold text-slate-900">Topics</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredScenarios.map((scenario, index) => {
                    const isSelected = selectedIds.has(scenario.id);
                    return (
                      <tr
                        key={`${scenario.id}-${index}`}
                        className={`border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${
                          isSelected ? 'bg-green-50' : ''
                        }`}
                        onClick={() => toggleSelection(scenario.id)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center">
                            {isSelected ? (
                              <CheckCircle2 className="w-6 h-6 text-green-600" />
                            ) : (
                              <div className="w-6 h-6 border-2 border-slate-300 rounded-lg" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-900">{scenario.id}</td>
                        <td className="px-4 py-3 font-semibold text-slate-900">{scenario.title}</td>
                        <td className="px-4 py-3 text-slate-700 max-w-md">
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
                <p className="text-slate-500 font-semibold">No scenarios found matching your filters.</p>
              </div>
            )}
          </div>
          )}

        </div>
              </div>

              {/* Right: Live preview – scrolls with the page (hidden on small screens) */}
              <aside className="hidden lg:flex w-full lg:w-[420px] flex-shrink-0 flex-col">
                <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-slate-200 bg-white">
                    <h3 className="text-lg font-bold text-slate-800">Assignment Preview</h3>
                    <p className="text-sm text-slate-600">What students will see</p>
                  </div>
                  <div className="p-4 space-y-6">
                    {assignmentType === 'mcq' && (
                      selectedMcqQuestions.length === 0 ? (
                        <p className="text-slate-500 text-sm font-medium">Select questions from the list to preview them here.</p>
                      ) : (
                        selectedMcqQuestions.map((q, idx) => (
                          <div
                            key={q.id}
                            className="group relative bg-white rounded-xl border-2 border-slate-200 shadow-sm p-5"
                          >
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); toggleSelection(q.id); }}
                              className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label="Remove question from assignment"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <div className="flex items-center justify-between mb-3 pr-8">
                              <span className="text-xs font-bold text-slate-500">Question {idx + 1}</span>
                              <span className="text-xs font-mono text-slate-400">ID {q.id}</span>
                            </div>
                            <p className="text-base font-medium text-slate-900 mb-4 leading-relaxed">{q.question}</p>
                            {q.image && (
                              <div className="my-3 rounded-lg overflow-hidden border border-slate-200">
                                <img
                                  src={typeof q.image === 'string' ? q.image : (q.image as { src: string }).src}
                                  alt="Question"
                                  className="max-h-40 w-auto object-contain"
                                />
                              </div>
                            )}
                            <div className="space-y-2">
                              {q.options.map((opt, oi) => (
                                <div
                                  key={oi}
                                  className="flex items-start gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-sm"
                                >
                                  <span className="font-bold text-slate-500 flex-shrink-0">{String.fromCharCode(65 + oi)}.</span>
                                  <span>{opt}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      )
                    )}
                    {assignmentType === 'graphGym' && (
                      selectedIds.size === 0 ? (
                        <p className="text-slate-500 text-sm font-medium">Select Graph Gym scenarios to see them listed here.</p>
                      ) : (
                        <div className="space-y-3">
                          {Array.from(selectedIds)
                            .filter((id): id is number => typeof id === 'number')
                            .sort((a, b) => a - b)
                            .map((id) => {
                              const scenario = graphGymScenarios.find((s) => s.id === id);
                              return scenario ? (
                                <div
                                  key={scenario.id}
                                  className="group relative bg-white rounded-xl border-2 border-slate-200 shadow-sm p-4"
                                >
                                  <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); toggleSelection(scenario.id); }}
                                    className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label="Remove scenario from assignment"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                  <p className="font-bold text-slate-900 pr-8">{scenario.title}</p>
                                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{scenario.description}</p>
                                </div>
                              ) : null;
                            })}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>

      {/* Sticky Footer - Only show for builder view */}
      {viewMode === 'builder' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-xl z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-slate-900">
                {selectedIds.size} {
                  assignmentType === 'mcq' ? 'question' : 'scenario'
                }{selectedIds.size !== 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center gap-3">
              {assignmentModeChoice === 'live' ? (
                <>
                  {assignmentType === 'mcq' && selectedIds.size > 0 && (
                    <button
                      type="button"
                      onClick={openShareScreen}
                      disabled={isGeneratingShareScreen}
                      className="inline-flex items-center gap-2 px-6 py-3 font-bold text-white rounded-xl shadow-lg transition-all bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isGeneratingShareScreen ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        'Generate a Share Screen'
                      )}
                    </button>
                  )}
                  {assignmentType === 'graphGym' && selectedIds.size > 0 && (
                    <button
                      type="button"
                      onClick={openGraphGymPresenter}
                      className="inline-flex items-center gap-2 px-6 py-3 font-bold text-white rounded-xl shadow-lg transition-all bg-green-600 hover:bg-green-700"
                    >
                      Start Activity
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={generateLink}
                    disabled={selectedIds.size === 0}
                    className={`px-6 py-3 font-bold text-white rounded-xl shadow-lg transition-all ${
                      selectedIds.size === 0
                        ? 'bg-slate-400 cursor-not-allowed'
                        : linkCopied
                        ? 'bg-green-600 hover:bg-green-700'
                        : assignmentType === 'mcq'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-green-600 hover:bg-green-700'
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

