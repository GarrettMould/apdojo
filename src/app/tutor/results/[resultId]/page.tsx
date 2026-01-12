'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { graphGymScenarios, GraphGymScenario } from '@/data/graphGymScenarios';

interface QuestionResult {
  questionId: number;
  studentAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
  unit: number;
  unitName: string;
}

interface ScenarioResult {
  scenarioId: number;
  scenarioTitle: string;
  completed: boolean;
  imageUrl?: string | null;
}

interface AssignmentResult {
  assignmentLinkId: string;
  tutorId: string;
  studentId: string | null;
  studentEmail: string | null;
  questionResults?: QuestionResult[];
  scenarioResults?: ScenarioResult[];
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  score: number;
  answers?: Record<string, string>;
  submittedAt: any;
  assignmentType: 'mcq' | 'graphGym';
}

export default function AssignmentResultPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthContext();
  const resultId = params.resultId as string;
  
  const [result, setResult] = useState<AssignmentResult | null>(null);
  const [assignmentName, setAssignmentName] = useState<string>('Assignment');
  const [studentName, setStudentName] = useState<string>('Student');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !resultId) return;

    const fetchResult = async () => {
      try {
        // Fetch the result document
        const resultDoc = await getDoc(doc(db, 'assignmentResults', resultId));
        
        if (!resultDoc.exists()) {
          setError('Result not found');
          setLoading(false);
          return;
        }

        const data = resultDoc.data() as AssignmentResult;
        
        // Verify the tutor owns this result
        if (data.tutorId !== user.uid) {
          setError('You do not have permission to view this result');
          setLoading(false);
          return;
        }

        // Fetch assignment link details
        try {
          const assignmentLinkDoc = await getDoc(doc(db, 'assignmentLinks', data.assignmentLinkId));
          if (assignmentLinkDoc.exists()) {
            const linkData = assignmentLinkDoc.data();
            const subjectLabel = linkData.subject === 'ap_macroeconomics' ? 'Macro' : 'Micro';
            const typeLabel = linkData.assignmentType === 'mcq' ? 'MCQ' : 'Graph Gym';
            setAssignmentName(`${subjectLabel} ${typeLabel} Assignment - ${linkData.totalQuestions} questions`);
          }
        } catch (error) {
          console.error('Error fetching assignment link:', error);
        }

        // Use studentName from result if available, otherwise fetch from user doc
        if (data.studentName) {
          setStudentName(data.studentName);
        } else if (data.studentId) {
          try {
            const userDoc = await getDoc(doc(db, 'users', data.studentId));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setStudentName(userData.displayName || userData.email || data.studentEmail || 'Student');
            } else {
              setStudentName(data.studentEmail || 'Guest');
            }
          } catch (error) {
            console.error('Error fetching student name:', error);
            setStudentName(data.studentEmail || 'Guest');
          }
        } else {
          setStudentName(data.studentEmail || 'Guest');
        }

        setResult(data);
      } catch (error) {
        console.error('Error fetching result:', error);
        setError('Failed to load result');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [user, resultId]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-4">{error || 'Result not found'}</p>
          <Link
            href="/tutor/builder"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/tutor/builder"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-black text-black mb-2">Assignment Results</h1>
          <p className="text-gray-600">{assignmentName}</p>
        </div>

        {/* Summary Card */}
        <div className="bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Student</p>
              <p className="text-lg font-bold text-gray-900">{studentName}</p>
            </div>
            {result.assignmentType === 'mcq' && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Score</p>
                <p className={`text-2xl font-black ${
                  result.score >= 80
                    ? 'text-green-600'
                    : result.score >= 60
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}>
                  {result.score}%
                </p>
              </div>
            )}
            {result.assignmentType === 'graphGym' && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Scenarios Completed</p>
                <p className="text-2xl font-black text-green-600">
                  {result.correctCount} / {result.totalQuestions}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600 mb-1">Submitted</p>
              <p className="text-lg font-semibold text-gray-900">{formatDate(result.submittedAt)}</p>
            </div>
          </div>
          {result.assignmentType === 'mcq' && (
            <div className="mt-4 pt-4 border-t-2 border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">
                  Correct: <span className="text-green-600">{result.correctCount}</span> / {result.totalQuestions}
                </span>
                <span className="text-sm font-semibold text-gray-700">
                  Incorrect: <span className="text-red-600">{result.incorrectCount}</span> / {result.totalQuestions}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Question/Scenario Results */}
        <div className="bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <div className="bg-gray-100 border-b-4 border-black px-6 py-4">
            <h2 className="text-xl font-black text-black">
              {result.assignmentType === 'mcq' ? 'Question Details' : 'Scenario Completion'}
            </h2>
          </div>
          <div className="divide-y-2 divide-gray-200">
            {/* MCQ Results */}
            {result.assignmentType === 'mcq' && result.questionResults && result.questionResults.map((qResult, index) => (
              <div
                key={qResult.questionId}
                className={`p-6 ${qResult.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${
                      qResult.isCorrect
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Question {qResult.questionId}</p>
                      <p className="text-sm text-gray-600">Unit {qResult.unit} - {qResult.unitName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {qResult.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <span className={`font-bold ${
                      qResult.isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {qResult.isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className={`p-4 rounded-lg border-2 ${
                    qResult.isCorrect
                      ? 'bg-green-100 border-green-300'
                      : 'bg-red-100 border-red-300'
                  }`}>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Student Answer</p>
                    <p className="font-bold text-gray-900">
                      {qResult.studentAnswer || 'No answer provided'}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border-2 bg-green-100 border-green-300">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Correct Answer</p>
                    <p className="font-bold text-gray-900">{qResult.correctAnswer}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Graph Gym Results */}
            {result.assignmentType === 'graphGym' && result.scenarioResults && result.scenarioResults.map((sResult, index) => {
              // Find the scenario data to get description and sample answer image
              const scenarioData = graphGymScenarios.find(s => s.id === sResult.scenarioId);
              
              // Debug logging
              console.log('[Tutor Results] Rendering scenario result:', {
                scenarioId: sResult.scenarioId,
                completed: sResult.completed,
                hasImageUrl: !!sResult.imageUrl,
                imageUrl: sResult.imageUrl || 'MISSING',
                scenarioResult: sResult
              });
              
              return (
                <div
                  key={sResult.scenarioId}
                  className={`p-6 ${sResult.completed ? 'bg-green-50' : 'bg-gray-50'}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${
                        sResult.completed
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-400 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{sResult.scenarioTitle}</p>
                        {scenarioData && (
                          <p className="text-sm text-gray-600 mt-1">{scenarioData.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {sResult.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-gray-400" />
                      )}
                      <span className={`font-bold ${
                        sResult.completed ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {sResult.completed ? 'Completed' : 'Not Completed'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Show student's drawing and sample answer side by side */}
                  {sResult.completed && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Student's Board */}
                      <div className="bg-white rounded-lg border-2 border-gray-300 p-4">
                        <p className="text-sm font-bold text-gray-900 mb-3">Student's Drawing</p>
                        {sResult.imageUrl ? (
                          <img
                            src={sResult.imageUrl}
                            alt={`Scenario ${sResult.scenarioId} student board`}
                            className="w-full rounded-lg border border-gray-200 shadow-sm"
                            onError={(e) => {
                              console.error(`Failed to load student image for scenario ${sResult.scenarioId}:`, sResult.imageUrl);
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent && !parent.querySelector('.error-message')) {
                                const errorDiv = document.createElement('div');
                                errorDiv.className = 'error-message text-sm text-red-600 p-2';
                                errorDiv.textContent = 'Image could not be loaded';
                                parent.appendChild(errorDiv);
                              }
                            }}
                          />
                        ) : (
                          <div className="text-sm text-gray-500 p-4 text-center border-2 border-dashed border-gray-300 rounded-lg">
                            No drawing submitted for this scenario
                          </div>
                        )}
                      </div>
                      
                      {/* Sample Answer */}
                      {scenarioData && scenarioData.correctImage && (
                        <div className="bg-white rounded-lg border-2 border-blue-300 p-4">
                          <p className="text-sm font-bold text-gray-900 mb-3">Sample Answer</p>
                          <img
                            src={scenarioData.correctImage}
                            alt={`Scenario ${sResult.scenarioId} sample answer`}
                            className="w-full rounded-lg border border-gray-200 shadow-sm"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Show message if not completed */}
                  {!sResult.completed && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg border-2 border-gray-300">
                      <p className="text-sm text-gray-600 italic">This scenario was not completed by the student.</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

