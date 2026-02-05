'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, getDoc, doc, orderBy } from 'firebase/firestore';
import { Loader2, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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

export default function TutorResultsPage() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [assignmentResults, setAssignmentResults] = useState<AssignmentResult[]>([]);
  const [loadingResults, setLoadingResults] = useState(false);

  useEffect(() => {
    if (!user) return;

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
  }, [user]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/tutor/builder"
            className="inline-flex items-center gap-2 text-indigo-700 font-bold hover:text-indigo-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Builder
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Student Results</h1>
        </div>

        {/* Assignment Results View */}
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
      </div>
    </div>
  );
}
