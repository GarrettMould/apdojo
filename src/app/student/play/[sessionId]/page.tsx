'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question, QuestionBank } from '@/data/questionBanks/types';
import { FullExam } from '@/components/FullExam';
import { AlertCircle, Home, Loader2 } from 'lucide-react';
import Link from 'next/link';

const LIVE_STUDENT_NAME_KEY = (sid: string) => `live_student_name_${sid}`;

interface SessionDoc {
  status: string;
  assignmentId: string;
  assignmentType?: string;
}

function buildQuestionBankFromEncoded(encodedParam: string): { bank: QuestionBank; examType: 'macro' | 'micro' } | null {
  let decodedString: string;
  try {
    decodedString = atob(encodedParam);
  } catch {
    return null;
  }
  const ids = decodedString.split(',').map((id) => parseInt(id.trim(), 10)).filter((id) => !isNaN(id));
  if (ids.length === 0) return null;

  const questionsMap = new Map<number, Question>();
  allQuestions.forEach((q) => {
    if (!questionsMap.has(q.id)) questionsMap.set(q.id, q);
  });

  const filteredQuestions: Question[] = [];
  const foundIds = new Set<number>();
  for (const id of ids) {
    if (!foundIds.has(id)) {
      const question = questionsMap.get(id);
      if (question) {
        filteredQuestions.push(question);
        foundIds.add(id);
      }
    }
  }
  if (filteredQuestions.length === 0) return null;

  const firstQuestion = filteredQuestions[0];
  const examType: 'macro' | 'micro' = firstQuestion.subject === 'ap_macroeconomics' ? 'macro' : 'micro';
  const bank: QuestionBank = {
    name: 'Live Session',
    questions: filteredQuestions,
  };
  return { bank, examType };
}

export default function StudentPlayPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const sessionId = (params?.sessionId as string) ?? '';
  const studentIdFromQuery = searchParams.get('studentId') ?? '';

  const [session, setSession] = useState<SessionDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const studentId = useMemo(() => {
    if (studentIdFromQuery) return studentIdFromQuery;
    if (typeof window === 'undefined' || !sessionId) return '';
    return sessionStorage.getItem(`live_student_${sessionId}`) ?? '';
  }, [sessionId, studentIdFromQuery]);

  const studentName = useMemo(() => {
    if (typeof window === 'undefined' || !sessionId) return '';
    return sessionStorage.getItem(LIVE_STUDENT_NAME_KEY(sessionId)) ?? '';
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError('No session');
      return;
    }
    const sessionRef = doc(db, 'sessions', sessionId);
    getDoc(sessionRef).then((snap) => {
      if (!snap.exists()) {
        setError('Session not found or ended.');
        setLoading(false);
        return;
      }
      const data = snap.data() as SessionDoc;
      if (data.status !== 'ACTIVE') {
        setError('Session has not started yet.');
        setLoading(false);
        return;
      }
      setSession(data);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setError('Could not load session.');
      setLoading(false);
    });
  }, [sessionId]);

  const questionData = useMemo(() => {
    if (!session?.assignmentId) return null;
    if (session.assignmentType !== 'mcq') return null;
    return buildQuestionBankFromEncoded(session.assignmentId);
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700">Loading assignment…</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <AlertCircle className="w-16 h-16 text-red-600 mb-4" />
        <p className="text-xl font-semibold text-gray-800 mb-6">{error ?? 'Session not found.'}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
      </div>
    );
  }

  if (session.assignmentType !== 'mcq' || !questionData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <p className="text-xl font-semibold text-gray-800 mb-6">This session type is not supported yet.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
      </div>
    );
  }

  if (!studentId) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <p className="text-xl font-semibold text-gray-800 mb-6">Please join the session from the lobby first (scan the QR or use the join link).</p>
        <Link
          href={`/student/join?id=${encodeURIComponent(sessionId)}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          Go to lobby
        </Link>
      </div>
    );
  }

  return (
    <FullExam
      questionBank={questionData.bank}
      examType={questionData.examType}
      questionType="mcq"
      examNumber="live"
      isCustomAssignment={true}
      assignmentLinkId={session.assignmentId}
      liveSessionId={sessionId}
      liveStudentId={studentId || undefined}
      liveStudentName={studentName || undefined}
    />
  );
}
