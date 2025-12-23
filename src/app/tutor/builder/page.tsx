'use client';

import { useState, useMemo } from 'react';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question } from '@/data/questionBanks/types';
import { Copy, CheckCircle2, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function TutorBuilderPage() {
  const { user } = useAuthContext();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [unitFilter, setUnitFilter] = useState<number | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<'ap_macroeconomics' | 'ap_microeconomics'>('ap_macroeconomics');
  const [linkCopied, setLinkCopied] = useState(false);

  // Get unique units for the selected subject
  const uniqueUnits = useMemo(() => {
    const units = new Set(
      allQuestions
        .filter(q => q.subject === subjectFilter)
        .map(q => q.unit)
    );
    return Array.from(units).sort((a, b) => a - b);
  }, [subjectFilter]);

  // Filter questions based on search and filters
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(q => {
      const matchesSearch = searchTerm === '' || 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.id.toString().includes(searchTerm) ||
        q.unitName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesUnit = unitFilter === null || q.unit === unitFilter;
      
      const matchesSubject = q.subject === subjectFilter;
      
      return matchesSearch && matchesUnit && matchesSubject;
    });
  }, [searchTerm, unitFilter, subjectFilter]);

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
    const url = `${window.location.origin}/exam/custom?q=${encoded}`;
    
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-black">Assignment Builder</h1>
          <p className="text-sm text-gray-600 mt-1">Select questions to create a custom assignment link</p>
        </div>
        {/* Filters */}
        <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by ID, question text, or unit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-black rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Unit Filter */}
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

        {/* Questions Table */}
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
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black shadow-[0_-4px_8px_rgba(0,0,0,0.1)] z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-lg font-black text-black">
                {selectedIds.size} question{selectedIds.size !== 1 ? 's' : ''} selected
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
                  : 'bg-blue-600 hover:bg-blue-700 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
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

    </div>
  );
}

