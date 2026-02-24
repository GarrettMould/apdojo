'use client';

import { useState, useMemo, useEffect, Suspense, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question } from '@/data/questionBanks/types';
import { Copy, CheckCircle2, Search, Filter, Eye, Loader2, GraduationCap, ArrowRight, ChevronLeft, ChevronRight, X, Play, Clock, Zap, BookOpen, Users, BarChart3, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { useSearchParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { getPublicAssignmentTemplates, type PublicAssignmentTemplate } from '@/lib/assignments';
import { collection, addDoc, serverTimestamp, query, where, getDocs, getDoc, doc, orderBy } from 'firebase/firestore';
import { graphGymScenarios, GraphGymScenario } from '@/data/graphGymScenarios';
import { frqExams } from '@/data/frqQuestions';
import { Printer } from 'lucide-react';

type AssignmentType = 'mcq' | 'graphGym' | 'mcqAndFrq';
type ViewMode = 'builder' | 'results';
type AssignmentModeChoice = 'live' | 'homework' | 'printHomework' | null; // null = haven't chosen yet (show choice screen)

function truncateText(text: string, max: number) {
  return text.length <= max ? text : text.slice(0, max) + '…';
}

/** Reorder icon: up/down arrows (common "reorder" symbol). */
function ReorderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 15l5 5 5-5" />
      <path d="M7 9l5-5 5 5" />
    </svg>
  );
}

/** Draggable MCQ card: click reorder button to start drag; move mouse to reorder; release to drop. */
function McqPreviewCard({
  question: q,
  index: idx,
  total,
  isDragging,
  onRemove,
  onDragStart,
}: {
  question: Question;
  index: number;
  total: number;
  isDragging: boolean;
  onRemove: () => void;
  onDragStart: (questionId: number, clientX: number, clientY: number) => void;
}) {
  const onReorderMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    onDragStart(q.id, e.clientX, e.clientY);
  };

  return (
    <div
      data-mcq-card-index={idx}
      className={`group relative bg-white rounded-xl border-2 border-slate-200 shadow-sm p-5 transition-all ${isDragging ? 'opacity-40 scale-[0.98]' : ''}`}
    >
      <button
        type="button"
        onMouseDown={onReorderMouseDown}
        className="absolute top-3 right-12 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Drag to reorder question"
        title="Drag to reorder"
      >
        <ReorderIcon className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Remove question from assignment"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="flex items-center justify-between mb-3 pl-4 pr-8 group-hover:pr-20 transition-[padding] duration-200 ease-out">
        <span className="text-xs font-bold text-slate-500">Question {idx + 1} of {total}</span>
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
  );
}

/** Draggable FRQ set card in assignment preview: reorder within FRQ section, remove with X. */
function FrqPreviewCard({
  exam,
  index: idx,
  total,
  isDragging,
  onRemove,
  onDragStart,
}: {
  exam: { examTitle: string; unit: number; questions: unknown[] };
  index: number;
  total: number;
  isDragging: boolean;
  onRemove: () => void;
  onDragStart: (index: number, clientX: number, clientY: number) => void;
}) {
  const onReorderMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    onDragStart(idx, e.clientX, e.clientY);
  };

  return (
    <div
      data-frq-card-index={idx}
      className={`group relative bg-white rounded-xl border-2 border-slate-200 shadow-sm p-4 transition-all ${isDragging ? 'opacity-40 scale-[0.98]' : ''}`}
    >
      <button
        type="button"
        onMouseDown={onReorderMouseDown}
        className="absolute top-3 right-12 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Drag to reorder FRQ set"
        title="Drag to reorder"
      >
        <ReorderIcon className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Remove FRQ set from assignment"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="flex items-center justify-between mb-2 pl-4 pr-8 group-hover:pr-20 transition-[padding] duration-200 ease-out">
        <span className="text-xs font-bold text-slate-500">FRQ set {idx + 1} of {total}</span>
        <span className="text-xs text-slate-400">Unit {exam.unit}</span>
      </div>
      <p className="text-base font-medium text-slate-900 pr-8">{exam.examTitle}</p>
      <p className="text-sm text-slate-500 mt-1">{exam.questions.length} question{exam.questions.length !== 1 ? 's' : ''}</p>
    </div>
  );
}

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
  assignmentType: 'mcq' | 'graphGym' | 'mcqAndFrq';
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
  /** Ordered list of selected IDs (MCQ order is preserved for assignment; Graph Gym still sorted when encoding). */
  const [selectedIdsOrder, setSelectedIdsOrder] = useState<(number | string)[]>([]);
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
  const [draggedMcqId, setDraggedMcqId] = useState<number | null>(null);
  const [ghostPosition, setGhostPosition] = useState<{ x: number; y: number } | null>(null);
  const [ghostQuestion, setGhostQuestion] = useState<Question | null>(null);
  const [draggedFrqIndex, setDraggedFrqIndex] = useState<number | null>(null);
  const [ghostFrqExam, setGhostFrqExam] = useState<(typeof frqExams)[0] | null>(null);
  /** For mcqAndFrq / print: indices into frqExams for selected FRQ exams. */
  const [selectedFrqExamIndices, setSelectedFrqExamIndices] = useState<number[]>([]);
  /** Unit filter for FRQ sets (when on FRQs tab). */
  const [frqUnitFilter, setFrqUnitFilter] = useState<number | null>(null);
  /** Worksheet link modal (publish to /worksheets/[slug]) */
  const [showWorksheetModal, setShowWorksheetModal] = useState(false);
  const [worksheetUrl, setWorksheetUrl] = useState<string | null>(null);
  const [worksheetError, setWorksheetError] = useState<string | null>(null);
  const [publishingWorksheet, setPublishingWorksheet] = useState(false);

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

  // Reset FRQ unit filter when subject changes so the dropdown doesn't show an empty list
  useEffect(() => {
    setFrqUnitFilter(null);
  }, [subjectFilter]);

  // Hydrate assignment from URL when returning from print preview (Back to Builder with q/f params)
  useEffect(() => {
    const qParam = searchParams.get('q');
    const fParam = searchParams.get('f');
    if (!qParam && !fParam) return;
    try {
      setAssignmentModeChoice('printHomework');
      setAssignmentType(fParam ? 'mcqAndFrq' : 'mcq');
      if (qParam) {
        const decoded = atob(qParam);
        const ids = decoded.split(',').map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n));
        setSelectedIdsOrder(ids);
      }
      if (fParam) {
        const decoded = atob(fParam);
        const indices = decoded.split(',').map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n) && n >= 0 && n < frqExams.length);
        setSelectedFrqExamIndices(indices);
      }
      router.replace('/tutor/builder', { scroll: false });
    } catch {
      // Invalid params - ignore
    }
  }, [searchParams, router]);

  // Assignment results state
  const [assignmentResults, setAssignmentResults] = useState<AssignmentResult[]>([]);
  const [loadingResults, setLoadingResults] = useState(false);

  // Convert subject filter to graph gym format
  const graphGymSubject = useMemo(() => {
    return subjectFilter === 'ap_macroeconomics' ? 'macro' : 'micro';
  }, [subjectFilter]);

  // FRQ exams filtered by subject with global index (for mcqAndFrq / print)
  const frqExamsBySubjectWithIndex = useMemo(() => {
    const subjectKey = subjectFilter === 'ap_macroeconomics' ? 'macro' : 'micro';
    return frqExams
      .map((exam, globalIndex) => ({ exam, globalIndex }))
      .filter(({ exam }) =>
        exam.questions.some((q) =>
          Array.isArray(q.subject) ? q.subject.includes(subjectKey) : q.subject === subjectKey
        )
      );
  }, [subjectFilter]);

  // Map theme tag -> unit numbers for FRQ filtering (same themes as MCQ row)
  const frqThemeToUnits: Record<string, number[]> = useMemo(() => {
    if (subjectFilter === 'ap_macroeconomics') {
      return {
        'Supply & Demand': [2],
        'Fiscal Policy': [5],
        'LF Market': [4],
        'Monetary Policy': [4],
        'AD-AS': [3],
      };
    }
    return {
      'Supply & Demand': [2],
      'Costs of Production': [3],
      'Market Structures': [4],
      'Factor Markets': [5],
      'International Trade': [6],
    };
  }, [subjectFilter]);

  // Unique units from FRQ exams for the current subject (for Units dropdown on FRQs tab)
  const uniqueFrqUnits = useMemo(() => {
    const units = new Set(frqExamsBySubjectWithIndex.map(({ exam }) => exam.unit));
    return Array.from(units).sort((a, b) => a - b);
  }, [frqExamsBySubjectWithIndex]);

  // FRQ exams filtered by subject, unit dropdown, theme chips, and search (same pattern as MCQs)
  const filteredFrqExamsWithIndex = useMemo(() => {
    let list = frqExamsBySubjectWithIndex;
    if (frqUnitFilter != null) {
      list = list.filter(({ exam }) => exam.unit === frqUnitFilter);
    }
    if (selectedTopicTags.size > 0) {
      const themeUnits = new Set(
        Array.from(selectedTopicTags).flatMap((tag) => frqThemeToUnits[tag] ?? [])
      );
      list = list.filter(({ exam }) => themeUnits.has(exam.unit));
    }
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      list = list.filter(
        ({ exam }) =>
          exam.examTitle.toLowerCase().includes(term) ||
          exam.unit.toString().includes(term)
      );
    }
    return list;
  }, [frqExamsBySubjectWithIndex, frqUnitFilter, selectedTopicTags, searchTerm, frqThemeToUnits]);

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
             scenario.id === 53 ||
             (scenario.id >= 54 && scenario.id <= 72);
      
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

  // Resolve selected IDs to full question objects for MCQ preview (order preserved for drag-to-reorder)
  const selectedMcqQuestions = useMemo(() => {
    if (assignmentType !== 'mcq' && assignmentType !== 'mcqAndFrq') return [];
    const ids = selectedIdsOrder.filter((id): id is number => typeof id === 'number');
    const map = new Map(allQuestions.map((q) => [q.id, q]));
    return ids.map((id) => map.get(id)).filter(Boolean) as Question[];
  }, [assignmentType, selectedIdsOrder]);

  const toggleSelection = (id: number | string) => {
    setSelectedIdsOrder(prev => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return [...prev, id];
    });
  };

  /** Reorder MCQ questions in the assignment (used by drag-and-drop in sidebar). */
  const moveSelectedMcq = useCallback((fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    setSelectedIdsOrder(prev => {
      const onlyNumbers = prev.filter((id): id is number => typeof id === 'number');
      const [removed] = onlyNumbers.splice(fromIndex, 1);
      onlyNumbers.splice(toIndex, 0, removed);
      return onlyNumbers;
    });
  }, []);

  const selectedMcqQuestionsRef = useRef<Question[]>([]);
  selectedMcqQuestionsRef.current = selectedMcqQuestions;

  useEffect(() => {
    if (draggedMcqId === null) return;
    const onMove = (e: MouseEvent) => {
      setGhostPosition({ x: e.clientX, y: e.clientY });
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const card = el?.closest?.('[data-mcq-card-index]');
      const targetIndex = card != null ? parseInt((card as HTMLElement).getAttribute('data-mcq-card-index') ?? '-1', 10) : -1;
      if (targetIndex < 0) return;
      const list = selectedMcqQuestionsRef.current;
      const fromIndex = list.findIndex((q) => q.id === draggedMcqId);
      if (fromIndex !== -1 && fromIndex !== targetIndex) moveSelectedMcq(fromIndex, targetIndex);
    };
    const onUp = () => {
      setDraggedMcqId(null);
      setGhostPosition(null);
      setGhostQuestion(null);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return onUp;
  }, [draggedMcqId, moveSelectedMcq]);

  /** Reorder FRQ sets in the assignment (used by drag-and-drop in sidebar). */
  const moveSelectedFrq = useCallback((fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    setSelectedFrqExamIndices((prev) => {
      const copy = [...prev];
      const [removed] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, removed);
      return copy;
    });
  }, []);

  const selectedFrqExamsRef = useRef<number[]>([]);
  selectedFrqExamsRef.current = selectedFrqExamIndices;

  useEffect(() => {
    if (draggedFrqIndex === null) return;
    const onMove = (e: MouseEvent) => {
      setGhostPosition({ x: e.clientX, y: e.clientY });
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const card = el?.closest?.('[data-frq-card-index]');
      const targetIndex = card != null ? parseInt((card as HTMLElement).getAttribute('data-frq-card-index') ?? '-1', 10) : -1;
      if (targetIndex < 0) return;
      const list = selectedFrqExamsRef.current;
      const fromIndex = draggedFrqIndex;
      if (fromIndex >= 0 && fromIndex < list.length && fromIndex !== targetIndex) {
        moveSelectedFrq(fromIndex, targetIndex);
        setDraggedFrqIndex(targetIndex);
      }
    };
    const onUp = () => {
      setDraggedFrqIndex(null);
      setGhostPosition(null);
      setGhostFrqExam(null);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return onUp;
  }, [draggedFrqIndex, moveSelectedFrq]);

  // Build the same URL students would see (for preview in new tab). MCQ uses selection order; Graph Gym sorts by id.
  const getPreviewUrl = (): string | null => {
    if (assignmentModeChoice === 'printHomework') {
      if (selectedIdsOrder.length === 0 && selectedFrqExamIndices.length === 0) return null;
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const params = new URLSearchParams();
      if (selectedIdsOrder.length > 0) {
        const mcqIds = selectedIdsOrder.filter((id): id is number => typeof id === 'number');
        params.set('q', btoa(mcqIds.map(String).join(',')));
      }
      if (selectedFrqExamIndices.length > 0) {
        params.set('f', btoa(selectedFrqExamIndices.join(',')));
      }
      return `${origin}/tutor/print-preview?${params.toString()}`;
    }
    if (selectedIdsOrder.length === 0) return null;
    const idsArray = assignmentType === 'mcq'
      ? selectedIdsOrder.filter((id): id is number => typeof id === 'number')
      : [...selectedIdsOrder].sort((a, b) => Number(a) - Number(b));
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
    if (selectedIdsOrder.length === 0) return null;
    const idsArray = assignmentType === 'mcq'
      ? selectedIdsOrder.filter((id): id is number => typeof id === 'number')
      : [...selectedIdsOrder].sort((a, b) => Number(a) - Number(b));
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
    if (assignmentType !== 'graphGym' || selectedIdsOrder.length === 0) return;
    const idsArray = [...selectedIdsOrder].sort((a, b) => Number(a) - Number(b));
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
    if (assignmentType === 'mcqAndFrq') {
      if (selectedIdsOrder.length === 0 || selectedFrqExamIndices.length === 0) return;
      const mcqIds = selectedIdsOrder.filter((id): id is number => typeof id === 'number');
      const qEncoded = btoa(mcqIds.map(String).join(','));
      const fEncoded = btoa(selectedFrqExamIndices.join(','));
      const url = `${window.location.origin}/exam/custom?q=${qEncoded}&f=${fEncoded}`;
      if (user) {
        try {
          await addDoc(collection(db, 'assignmentLinks'), {
            tutorId: user.uid,
            tutorEmail: user.email,
            questionIds: mcqIds,
            encodedParam: qEncoded,
            frqExamIndices: selectedFrqExamIndices,
            url,
            subject: subjectFilter,
            assignmentType: 'mcqAndFrq',
            createdAt: serverTimestamp(),
            totalQuestions: mcqIds.length
          });
        } catch (error) {
          console.error('Error saving assignment link to Firebase:', error);
        }
      }
      navigator.clipboard.writeText(url).then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 3000);
      });
      return;
    }
    if (selectedIdsOrder.length === 0) return;
    const idsArray = assignmentType === 'mcq'
      ? selectedIdsOrder.filter((id): id is number => typeof id === 'number')
      : [...selectedIdsOrder].sort((a, b) => Number(a) - Number(b));
    const idsString = idsArray.map(id => String(id)).join(',');
    const encoded = btoa(idsString);
    
    const url = assignmentType === 'mcq'
      ? `${window.location.origin}/exam/custom?q=${encoded}`
      : `${window.location.origin}/graph-gym/custom?q=${encoded}`;
    
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
      }
    }
    
    navigator.clipboard.writeText(url).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 3000);
    });
  };

  const openPrintPreview = () => {
    if (assignmentModeChoice !== 'printHomework') return;
    if (selectedIdsOrder.length === 0 && selectedFrqExamIndices.length === 0) return;
    const params = new URLSearchParams();
    if (selectedIdsOrder.length > 0) {
      const mcqIds = selectedIdsOrder.filter((id): id is number => typeof id === 'number');
      params.set('q', btoa(mcqIds.map(String).join(',')));
    }
    if (selectedFrqExamIndices.length > 0) {
      params.set('f', btoa(selectedFrqExamIndices.join(',')));
    }
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/tutor/print-preview?${params.toString()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const generateRandomSlug = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const bytes = typeof crypto !== 'undefined' && crypto.getRandomValues
      ? crypto.getRandomValues(new Uint8Array(10))
      : Array.from({ length: 10 }, () => Math.floor(Math.random() * 256));
    return Array.from(bytes).map((b) => chars[b % chars.length]).join('');
  };

  const openWorksheetModal = () => {
    setWorksheetUrl(null);
    setWorksheetError(null);
    setShowWorksheetModal(true);
    if (selectedIdsOrder.length === 0 && selectedFrqExamIndices.length === 0) {
      setWorksheetError('Add at least one MCQ or FRQ set to the assignment.');
      setPublishingWorksheet(false);
      return;
    }
    if (!user) {
      setWorksheetError('Sign in to create a worksheet link.');
      setPublishingWorksheet(false);
      return;
    }
    setWorksheetError(null);
    setPublishingWorksheet(true);
    const slug = generateRandomSlug();
    const data: Record<string, unknown> = {
      slug,
      title: 'Worksheet',
      createdAt: serverTimestamp(),
    };
    if (selectedIdsOrder.length > 0) {
      const mcqIds = selectedIdsOrder.filter((id): id is number => typeof id === 'number');
      data.q = btoa(mcqIds.map(String).join(','));
    }
    if (selectedFrqExamIndices.length > 0) {
      data.f = btoa(selectedFrqExamIndices.join(','));
    }
    addDoc(collection(db, 'worksheets'), data)
      .then(() => {
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        setWorksheetUrl(`${origin}/worksheets/${slug}`);
      })
      .catch((err) => {
        console.error(err);
        setWorksheetError('Could not create worksheet. Try again.');
      })
      .finally(() => setPublishingWorksheet(false));
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  /** Apply a public template: pre-fill builder and open assignment flow in the chosen mode (live or homework). */
  const applyPublicTemplate = (template: PublicAssignmentTemplate, mode: 'live' | 'homework') => {
    if (template.assignmentType !== 'mcq' && template.assignmentType !== 'graphGym') return;
    setAssignmentType(template.assignmentType);
    setSelectedIdsOrder(Array.isArray(template.questionIds) ? [...template.questionIds] : []);
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
      router.push('/signup');
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Student Results link */}
        <div className="w-full flex justify-end px-6 pt-6 pb-4">
          <Link
            href="/tutor/results"
            className="flex items-center gap-2 text-indigo-700 font-bold hover:text-indigo-800 transition-colors"
          >
            <BarChart3 className="w-5 h-5" />
            Student Results
          </Link>
        </div>
        
        <div className="max-w-6xl mx-auto px-6">
        <div id="choice">
          {/* Hero Section with Main Choice Cards */}
          <section className="py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Create Your Assignment
              </h1>
              <p className="text-xl text-slate-600 font-semibold max-w-2xl mx-auto">
                Choose how you want to deliver your assignment—live in class, link for homework, or a printable PDF
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
              <button
                type="button"
                onClick={() => setAssignmentModeChoice('live')}
                className="group relative flex flex-col p-8 bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
                    <Play className="w-8 h-8 text-white" fill="white" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 group-hover:text-green-600 transition-colors">
                    Live Session
                  </h2>
                </div>
                <p className="text-base text-slate-700 font-semibold mb-4 leading-relaxed">
                  Launch a real-time session for synchronous class activities. Perfect for bell-ringers, warm-ups, and interactive lessons.
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-green-600 mt-auto">
                  <Users className="w-4 h-4" />
                  <span>Real-time participation</span>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setAssignmentModeChoice('homework')}
                className="group relative flex flex-col p-8 bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
                    <Clock className="w-8 h-8 text-white" fill="white" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    Homework
                  </h2>
                </div>
                <p className="text-base text-slate-700 font-semibold mb-4 leading-relaxed">
                  Generate a shareable link for asynchronous assignments. Students complete at their own pace, anytime, anywhere.
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-blue-600 mt-auto">
                  <BookOpen className="w-4 h-4" />
                  <span>Self-paced learning</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAssignmentModeChoice('printHomework');
                  setAssignmentType('mcqAndFrq');
                }}
                className="group relative flex flex-col p-8 bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-600 flex items-center justify-center shadow-lg">
                    <Printer className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    Print Homework
                  </h2>
                </div>
                <p className="text-base text-slate-700 font-semibold mb-4 leading-relaxed">
                  Build a PDF assignment from MCQs and FRQs. MCQs appear first, then free-response with space to write and draw.
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-amber-600 mt-auto">
                  <Printer className="w-4 h-4" />
                  <span>Save as PDF</span>
                </div>
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
                      className="w-full flex flex-row items-center justify-between text-left p-6 sm:p-8 bg-white border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all min-h-[120px]"
                    >
                      <div className="min-w-0 flex-1 pr-4">
                        <span className="text-xl md:text-2xl font-bold text-indigo-700 leading-tight block mb-1 line-clamp-1">{title}</span>
                        <p className="text-base font-semibold text-indigo-700">{topic} · {template.totalQuestions} question{template.totalQuestions !== 1 ? 's' : ''}</p>
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
          <div className="max-w-5xl mx-auto py-12 mb-12">
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
                <div className="grid md:grid-cols-2 gap-6">
                  <button
                    type="button"
                    onClick={() => {
                      applyPublicTemplate(templateModalTemplate, 'live');
                      setTemplateModalTemplate(null);
                    }}
                    className="group relative flex flex-col p-8 bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
                        <Play className="w-8 h-8 text-white" fill="white" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 group-hover:text-green-600 transition-colors">
                        Live Session
                      </h3>
                    </div>
                    <p className="text-base text-slate-700 font-semibold mb-4 leading-relaxed">
                      Launch a real-time session for synchronous class activities. Perfect for bell-ringers, warm-ups, and interactive lessons.
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold text-green-600 mt-auto">
                      <Users className="w-4 h-4" />
                      <span>Real-time participation</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      applyPublicTemplate(templateModalTemplate, 'homework');
                      setTemplateModalTemplate(null);
                    }}
                    className="group relative flex flex-col p-8 bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
                        <Clock className="w-8 h-8 text-white" fill="white" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                        Homework
                      </h3>
                    </div>
                    <p className="text-base text-slate-700 font-semibold mb-4 leading-relaxed">
                      Generate a shareable link for asynchronous assignments. Students complete at their own pace, anytime, anywhere.
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold text-blue-600 mt-auto">
                      <BookOpen className="w-4 h-4" />
                      <span>Self-paced learning</span>
                    </div>
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
      {/* Drag ghost: smaller card that follows cursor when reordering MCQ */}
      {typeof document !== 'undefined' && ghostQuestion && ghostPosition && createPortal(
        <div
          className="max-w-[280px] w-[280px] bg-white rounded-xl border-2 border-slate-300 shadow-xl p-4 pointer-events-none select-none"
          style={{
            position: 'fixed',
            left: ghostPosition.x,
            top: ghostPosition.y,
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
          }}
        >
          <p className="text-xs font-bold text-slate-500 mb-1">Question</p>
          <p className="text-sm font-medium text-slate-900 leading-snug line-clamp-3">{truncateText(ghostQuestion.question, 120)}</p>
          {ghostQuestion.options[0] != null && (
            <p className="text-xs text-slate-600 mt-2 line-clamp-1">A. {truncateText(ghostQuestion.options[0], 60)}</p>
          )}
        </div>,
        document.body
      )}
      {/* Drag ghost: smaller card that follows cursor when reordering FRQ */}
      {typeof document !== 'undefined' && ghostFrqExam && ghostPosition && createPortal(
        <div
          className="max-w-[280px] w-[280px] bg-white rounded-xl border-2 border-slate-300 shadow-xl p-4 pointer-events-none select-none"
          style={{
            position: 'fixed',
            left: ghostPosition.x,
            top: ghostPosition.y,
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
          }}
        >
          <p className="text-xs font-bold text-slate-500 mb-1">FRQ set</p>
          <p className="text-sm font-medium text-slate-900 leading-snug">{truncateText(ghostFrqExam.examTitle, 80)}</p>
          <p className="text-xs text-slate-600 mt-1">Unit {ghostFrqExam.unit} · {ghostFrqExam.questions.length} question{ghostFrqExam.questions.length !== 1 ? 's' : ''}</p>
        </div>,
        document.body
      )}
      {/* Back to Home only (choice screen); no Student Results on builder/list or results view */}
      <div className="w-full flex justify-start pl-8 pr-6 pt-6 pb-3">
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
                className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl transition-all border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 disabled:shadow-none disabled:translate-y-0 ${
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
          {/* Row 1: Subject (dropdown for print, pills for live/homework) + Assignment Type */}
          <div className="p-6 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-600">Subject:</span>
              {assignmentModeChoice === 'printHomework' ? (
                <select
                  value={subjectFilter}
                  onChange={(e) => {
                    const v = e.target.value as 'ap_macroeconomics' | 'ap_microeconomics';
                    setSubjectFilter(v);
                    setUnitFilter(null);
                    if (v === 'ap_microeconomics') setSelectedTopicTags(new Set());
                  }}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="ap_macroeconomics">AP Macroeconomics</option>
                  <option value="ap_microeconomics">AP Microeconomics</option>
                </select>
              ) : (
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
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-600">Assignment Type:</span>
              {assignmentModeChoice === 'printHomework' ? (
                <div className="flex rounded-xl shadow-lg border border-slate-200 overflow-hidden bg-white">
                  <button
                    onClick={() => {
                      setAssignmentType('mcq');
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
                      setAssignmentType('mcqAndFrq');
                      setSearchTerm('');
                      setUnitFilter(null);
                    }}
                    className={`px-6 py-2.5 font-bold transition-colors border-l border-slate-200 ${
                      assignmentType === 'mcqAndFrq'
                        ? 'bg-indigo-600 text-white border-l-transparent'
                        : 'bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    FRQs
                  </button>
                </div>
              ) : (
                <div className="flex rounded-xl shadow-lg border border-slate-200 overflow-hidden bg-white">
                  <button
                    onClick={() => {
                      setAssignmentType('mcq');
                      setSelectedIdsOrder([]);
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
                      setSelectedIdsOrder([]);
                      setSearchTerm('');
                      setUnitFilter(null);
                    }}
                    className={`px-6 py-2.5 font-bold transition-colors border-l border-slate-200 ${
                      assignmentType === 'graphGym'
                        ? 'bg-green-600 text-white border-l-transparent'
                        : 'bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Graph Gym
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Row 2: Suggested themes (MCQs, FRQs, and Graph Gym) */}
          {(assignmentType === 'mcq' || assignmentType === 'graphGym' || assignmentType === 'mcqAndFrq') && (
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
          )}

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
                        : assignmentType === 'mcqAndFrq'
                        ? "Search FRQ sets..."
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
            {assignmentType === 'mcqAndFrq' && (
              <div className="relative flex items-center gap-2">
                <Filter className="absolute left-3 text-slate-400 w-5 h-5 pointer-events-none" />
                <select
                  value={frqUnitFilter ?? ''}
                  onChange={(e) => setFrqUnitFilter(e.target.value ? parseInt(e.target.value) : null)}
                  className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">All Units</option>
                  {uniqueFrqUnits.map(unit => (
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
                    const isSelected = selectedIdsOrder.includes(question.id);
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

          {/* FRQ exam selector (print: FRQs tab; legacy homework had MCQ+FRQ) */}
          {assignmentType === 'mcqAndFrq' && (
            <div className={assignmentModeChoice === 'printHomework' ? 'pt-6 px-6 pb-6' : 'mt-8 border-t border-slate-200 pt-8 px-6 pb-6'}>
              {assignmentModeChoice !== 'printHomework' && (
                <h3 className="text-lg font-bold text-slate-800 mb-4">FRQ sets to include (shown after MCQs)</h3>
              )}
              <div className="overflow-x-auto rounded-xl border-2 border-slate-200">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-slate-900 w-12">Add</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">FRQ set</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Unit</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Questions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFrqExamsWithIndex.map(({ exam, globalIndex }) => {
                      const isSelected = selectedFrqExamIndices.includes(globalIndex);
                      return (
                        <tr
                          key={globalIndex}
                          className={`border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${
                            isSelected ? 'bg-indigo-50' : ''
                          }`}
                          onClick={() => {
                            setSelectedFrqExamIndices((prev) =>
                              prev.includes(globalIndex)
                                ? prev.filter((i) => i !== globalIndex)
                                : [...prev, globalIndex]
                            );
                          }}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center">
                              {isSelected ? (
                                <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                              ) : (
                                <div className="w-6 h-6 border-2 border-slate-300 rounded-lg" />
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 font-semibold text-slate-900">{exam.examTitle}</td>
                          <td className="px-4 py-3 text-slate-600">Unit {exam.unit}</td>
                          <td className="px-4 py-3 text-slate-600">{exam.questions.length} question{exam.questions.length !== 1 ? 's' : ''}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {filteredFrqExamsWithIndex.length === 0 && (
                <p className="p-4 text-slate-500 font-semibold">
                  {frqExamsBySubjectWithIndex.length === 0
                    ? 'No FRQ sets for this subject.'
                    : 'No FRQ sets match the selected unit or themes.'}
                </p>
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
                    const isSelected = selectedIdsOrder.includes(scenario.id);
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
                    {(assignmentType === 'mcq' || (assignmentModeChoice === 'printHomework' && selectedIdsOrder.length > 0)) && (
                      selectedMcqQuestions.length === 0 && !(assignmentModeChoice === 'printHomework' && selectedFrqExamIndices.length > 0) ? (
                        <p className="text-slate-500 text-sm font-medium">{assignmentModeChoice === 'printHomework' ? 'Add MCQs and FRQ sets using the tabs below.' : 'Select questions from the list to preview them here.'}</p>
                      ) : (
                        <>
                          {selectedMcqQuestions.length > 0 && selectedMcqQuestions.map((q, idx) => (
                            <McqPreviewCard
                              key={q.id}
                              question={q}
                              index={idx}
                              total={selectedMcqQuestions.length}
                              isDragging={draggedMcqId === q.id}
                              onRemove={() => toggleSelection(q.id)}
                              onDragStart={(questionId, clientX, clientY) => {
                                setDraggedMcqId(questionId);
                                setGhostPosition({ x: clientX, y: clientY });
                                setGhostQuestion(selectedMcqQuestions.find((qq) => qq.id === questionId) ?? null);
                              }}
                            />
                          ))}
                          {assignmentModeChoice === 'printHomework' && selectedFrqExamIndices.length > 0 && (
                            <div className={selectedMcqQuestions.length > 0 ? 'pt-4 border-t border-slate-200 space-y-3' : 'space-y-3'}>
                              <p className="text-xs font-bold text-slate-500">FRQ sets ({selectedFrqExamIndices.length})</p>
                              {selectedFrqExamIndices.map((globalIdx, listIdx) => {
                                const exam = frqExams[globalIdx];
                                return exam ? (
                                  <FrqPreviewCard
                                    key={globalIdx}
                                    exam={exam}
                                    index={listIdx}
                                    total={selectedFrqExamIndices.length}
                                    isDragging={draggedFrqIndex === listIdx}
                                    onRemove={() => setSelectedFrqExamIndices((prev) => prev.filter((_, i) => i !== listIdx))}
                                    onDragStart={(idx, clientX, clientY) => {
                                      setDraggedFrqIndex(idx);
                                      setGhostPosition({ x: clientX, y: clientY });
                                      setGhostFrqExam(frqExams[selectedFrqExamIndices[idx]] ?? null);
                                    }}
                                  />
                                ) : null;
                              })}
                            </div>
                          )}
                        </>
                      )
                    )}
                    {assignmentModeChoice === 'printHomework' && selectedIdsOrder.length === 0 && selectedFrqExamIndices.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-xs font-bold text-slate-500">FRQ sets ({selectedFrqExamIndices.length})</p>
                        {selectedFrqExamIndices.map((globalIdx, listIdx) => {
                          const exam = frqExams[globalIdx];
                          return exam ? (
                            <FrqPreviewCard
                              key={globalIdx}
                              exam={exam}
                              index={listIdx}
                              total={selectedFrqExamIndices.length}
                              isDragging={draggedFrqIndex === listIdx}
                              onRemove={() => setSelectedFrqExamIndices((prev) => prev.filter((_, i) => i !== listIdx))}
                              onDragStart={(idx, clientX, clientY) => {
                                setDraggedFrqIndex(idx);
                                setGhostPosition({ x: clientX, y: clientY });
                                setGhostFrqExam(frqExams[selectedFrqExamIndices[idx]] ?? null);
                              }}
                            />
                          ) : null;
                        })}
                      </div>
                    )}
                    {assignmentModeChoice === 'printHomework' && selectedIdsOrder.length === 0 && selectedFrqExamIndices.length === 0 && (
                      <p className="text-slate-500 text-sm font-medium">Add MCQs and FRQ sets using the tabs below.</p>
                    )}
                    {assignmentType === 'graphGym' && (
                      selectedIdsOrder.length === 0 ? (
                        <p className="text-slate-500 text-sm font-medium">Select Graph Gym scenarios to see them listed here.</p>
                      ) : (
                        <div className="space-y-3">
                          {[...selectedIdsOrder]
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
                {assignmentModeChoice === 'printHomework' ? (
                  <>{selectedIdsOrder.length} MCQ{selectedIdsOrder.length !== 1 ? 's' : ''}, {selectedFrqExamIndices.length} FRQ set{selectedFrqExamIndices.length !== 1 ? 's' : ''}</>
                ) : (
                  <>{selectedIdsOrder.length} {assignmentType === 'mcq' ? 'question' : 'scenario'}{selectedIdsOrder.length !== 1 ? 's' : ''} selected</>
                )}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {assignmentModeChoice === 'live' ? (
                <>
                  {assignmentType === 'mcq' && selectedIdsOrder.length > 0 && (
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
                  {assignmentType === 'graphGym' && selectedIdsOrder.length > 0 && (
                    <button
                      type="button"
                      onClick={openGraphGymPresenter}
                      className="inline-flex items-center gap-2 px-6 py-3 font-bold text-white rounded-xl shadow-lg transition-all bg-green-600 hover:bg-green-700"
                    >
                      Start Activity
                    </button>
                  )}
                </>
              ) : assignmentModeChoice === 'printHomework' ? (
                <>
                  <button
                    type="button"
                    onClick={openPrintPreview}
                    disabled={selectedIdsOrder.length === 0 && selectedFrqExamIndices.length === 0}
                    className="inline-flex items-center gap-2 px-6 py-3 font-bold text-white rounded-xl transition-all bg-amber-600 hover:bg-amber-700 disabled:bg-slate-400 disabled:cursor-not-allowed border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 disabled:shadow-none disabled:translate-y-0"
                  >
                    <Printer className="w-5 h-5" />
                    Open print view (PDF)
                  </button>
                  <button
                    type="button"
                    onClick={openWorksheetModal}
                    disabled={selectedIdsOrder.length === 0 && selectedFrqExamIndices.length === 0}
                    className="inline-flex items-center gap-2 px-6 py-3 font-bold text-white rounded-xl transition-all bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 disabled:shadow-none disabled:translate-y-0"
                  >
                    <Share2 className="w-5 h-5" />
                    Get worksheet link
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={generateLink}
                    disabled={selectedIdsOrder.length === 0}
                    className={`px-6 py-3 font-bold text-white rounded-xl transition-all border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 ${
                      selectedIdsOrder.length === 0
                        ? 'bg-slate-400 cursor-not-allowed shadow-none translate-y-0'
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

      {/* Worksheet link modal: show generated URL with Copy */}
      {showWorksheetModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => !publishingWorksheet && setShowWorksheetModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="worksheet-modal-title"
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border-2 border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 id="worksheet-modal-title" className="text-xl font-bold text-slate-900">
                Worksheet link
              </h2>
              {!publishingWorksheet && (
                <button
                  type="button"
                  onClick={() => setShowWorksheetModal(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {worksheetError ? (
              <div className="space-y-4">
                <p className="text-red-600 text-sm font-medium">{worksheetError}</p>
                <button
                  type="button"
                  onClick={() => setShowWorksheetModal(false)}
                  className="w-full py-2.5 font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg"
                >
                  Close
                </button>
              </div>
            ) : publishingWorksheet && !worksheetUrl ? (
              <div className="py-6 flex flex-col items-center gap-3">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                <p className="text-slate-600 font-medium">Creating link…</p>
              </div>
            ) : worksheetUrl ? (
              <div className="space-y-4">
                <p className="text-slate-600 text-sm">Anyone with this link can view the worksheet (no sign-in required):</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={worksheetUrl}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(worksheetUrl);
                      setLinkCopied(true);
                      setTimeout(() => setLinkCopied(false), 2000);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 flex-shrink-0 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  >
                    {linkCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setShowWorksheetModal(false)}
                  className="w-full py-2.5 font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg"
                >
                  Done
                </button>
              </div>
            ) : null}
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

