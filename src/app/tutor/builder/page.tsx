'use client';

import { useState, useMemo, useEffect } from 'react';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question } from '@/data/questionBanks/types';
import { Copy, CheckCircle2, Search, Filter, Eye, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, getDoc, doc, orderBy } from 'firebase/firestore';
import { graphGymScenarios, GraphGymScenario } from '@/data/graphGymScenarios';

type AssignmentType = 'mcq' | 'graphGym';
type ViewMode = 'builder' | 'results';

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

export default function TutorBuilderPage() {
  const { user } = useAuthContext();
  const [viewMode, setViewMode] = useState<ViewMode>('builder');
  
  // Check URL hash or localStorage for view mode preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#results') {
        setViewMode('results');
      }
    }
  }, []);
  const [assignmentType, setAssignmentType] = useState<AssignmentType>('mcq');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
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

  // Filter questions based on search and filters (MCQs only)
  const filteredQuestions = useMemo(() => {
    if (assignmentType === 'graphGym') return [];
    return allQuestions.filter(q => {
      const matchesSearch = searchTerm === '' || 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.id.toString().includes(searchTerm) ||
        q.unitName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesUnit = unitFilter === null || q.unit === unitFilter;
      
      const matchesSubject = q.subject === subjectFilter;
      
      return matchesSearch && matchesUnit && matchesSubject;
    });
  }, [searchTerm, unitFilter, subjectFilter, assignmentType]);

  // Filter Graph Gym scenarios based on search and filters - only show IDs 1, 13-17, 41-45, and 46
  const filteredScenarios = useMemo(() => {
    if (assignmentType === 'mcq') return [];
    return graphGymScenarios.filter(scenario => {
      const matchesSubject = scenario.subject === graphGymSubject;
      // Show IDs: 1, 13-17, 41-45, 46, 47, 48, 50, 51
      const matchesIdRange = scenario.id === 1 ||
             (scenario.id >= 13 && scenario.id <= 17) ||
             (scenario.id >= 41 && scenario.id <= 45) ||
             scenario.id === 46 ||
             scenario.id === 47 ||
             scenario.id === 48 ||
             scenario.id === 50 ||
             scenario.id === 51;
      
      const matchesSearch = searchTerm === '' || 
        scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scenario.id.toString().includes(searchTerm) ||
        scenario.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scenario.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesSubject && matchesIdRange && matchesSearch;
    });
  }, [searchTerm, graphGymSubject, assignmentType]);

  const toggleSelection = (id: number) => {
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


  const generateLink = async () => {
    if (selectedIds.size === 0) return;
    
    const idsArray = Array.from(selectedIds).sort((a, b) => a - b);
    const idsString = idsArray.join(',');
    const encoded = btoa(idsString);
    
    // Generate URL based on assignment type
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
          assignmentType: assignmentType, // 'mcq' or 'graphGym'
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
                const typeLabel = linkData.assignmentType === 'mcq' ? 'MCQ' : 'Graph Gym';
                assignmentName = `${subjectLabel} ${typeLabel} - ${linkData.totalQuestions} questions`;
              }
            } catch (linkError: any) {
              // If we can't read the assignment link, use a fallback name
              console.warn(`Could not read assignment link ${data.assignmentLinkId}:`, linkError);
              const typeLabel = data.assignmentType === 'mcq' ? 'MCQ' : 'Graph Gym';
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
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
                placeholder={assignmentType === 'mcq' ? "Search by ID, question text, or unit..." : "Search by ID, title, description, or topics..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-black rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Unit Filter - Only show for MCQs */}
            {assignmentType === 'mcq' && (
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
            )}
            {assignmentType === 'graphGym' && <div />}

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
                          {truncateText(question.question, 150)}
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
          </>
        )}
      </div>

      {/* Sticky Footer - Only show for builder view */}
      {viewMode === 'builder' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black shadow-[0_-4px_8px_rgba(0,0,0,0.1)] z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-lg font-black text-black">
                {selectedIds.size} {assignmentType === 'mcq' ? 'question' : 'scenario'}{selectedIds.size !== 1 ? 's' : ''} selected
              </span>
            </div>
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
                  : 'bg-green-600 hover:bg-green-700 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
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
          </div>
        </div>
        </div>
      )}

    </div>
  );
}

