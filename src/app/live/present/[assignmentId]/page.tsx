'use client';

import QRCode from 'react-qr-code';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { doc, onSnapshot, updateDoc, collection, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2, Users, CheckCircle2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface SessionDoc {
  status: 'WAITING' | 'ACTIVE';
  assignmentId?: string;
  assignmentType?: string;
  tutorId?: string;
  code?: string;
  createdAt?: unknown;
}

interface StudentDoc {
  id: string;
  name: string;
  joinedAt?: unknown;
  completed?: boolean;
  score?: number;
  correctCount?: number;
  totalQuestions?: number;
  submittedAt?: unknown;
}

export default function PresenterPage() {
  const params = useParams();
  const sessionId = (params?.assignmentId as string) ?? '';

  const [session, setSession] = useState<SessionDoc | null>(null);
  const [students, setStudents] = useState<StudentDoc[]>([]);
  const [starting, setStarting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [joinUrl, setJoinUrl] = useState('');
  const [studentListExpanded, setStudentListExpanded] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId || typeof window === 'undefined') return;
    const origin = window.location.origin;
    if (session?.code) {
      setJoinUrl(`${origin}/join?code=${encodeURIComponent(session.code)}`);
    } else {
      setJoinUrl(`${origin}/student/join?id=${encodeURIComponent(sessionId)}`);
    }
  }, [sessionId, session?.code]);

  useEffect(() => {
    if (!sessionId) return;
    const sessionRef = doc(db, 'sessions', sessionId);
    const unsubscribe = onSnapshot(sessionRef, (snap) => {
      if (snap.exists()) setSession(snap.data() as SessionDoc);
    });
    return () => unsubscribe();
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) return;
    const studentsRef = collection(db, 'sessions', sessionId, 'students');
    const unsubscribe = onSnapshot(studentsRef, (snapshot) => {
      const list = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as StudentDoc[];
      setStudents(list);
    });
    return () => unsubscribe();
  }, [sessionId]);

  const handleStartSession = async () => {
    if (!sessionId || session?.status === 'ACTIVE') return;
    setStarting(true);
    try {
      await updateDoc(doc(db, 'sessions', sessionId), { status: 'ACTIVE' });
    } catch (err) {
      console.error('Error starting session:', err);
    } finally {
      setStarting(false);
    }
  };

  const handleCopy = () => {
    if (!joinUrl) return;
    navigator.clipboard.writeText(joinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRemoveStudent = async (studentId: string) => {
    if (!sessionId || removingId) return;
    setRemovingId(studentId);
    try {
      await deleteDoc(doc(db, 'sessions', sessionId, 'students', studentId));
    } catch (err) {
      console.error('Error removing student:', err);
    } finally {
      setRemovingId(null);
    }
  };

  const isActive = session?.status === 'ACTIVE';
  const completedCount = students.filter((s) => s.completed).length;
  const totalCount = students.length;

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 flex flex-col items-center justify-center p-8 text-white">
        <p className="text-xl text-slate-400">Invalid session. Go back and generate a share screen from the tutor builder.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 flex flex-col items-center justify-center p-8 text-white">
      {!session ? (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-slate-400" />
          <p className="text-slate-400">Loading session…</p>
        </div>
      ) : !isActive ? (
        <>
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
              Join the Session
            </h1>
            <p className="text-xl text-slate-400">
              Scan the QR code or enter the code at apdojo.com/join
            </p>
          </div>

          {/* Join code - prominent 5-character display (or fallback for legacy sessions) */}
          {session.code ? (
            <div className="mb-10">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Join code</p>
              <div className="bg-white py-6 px-10 rounded-2xl border-4 border-slate-700 shadow-xl">
                <span className="text-5xl md:text-6xl font-black font-mono tracking-[0.3em] text-slate-900">
                  {session.code}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-slate-500 text-sm mb-6">Share the join link below (this session was created before codes).</p>
          )}

          <div className="bg-white p-8 rounded-3xl shadow-2xl mb-10">
            <div className="w-64 h-64 md:w-96 md:h-96">
              <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={joinUrl}
                viewBox="0 0 256 256"
              />
            </div>
          </div>

          {/* Tally: click to expand student list; each student has trash to remove */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 px-8 py-6 mb-10 w-full max-w-md">
            <button
              type="button"
              onClick={() => setStudentListExpanded((e) => !e)}
              className="w-full flex items-center justify-center gap-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-800 rounded-xl py-1"
            >
              <Users className="w-10 h-10 text-blue-400 flex-shrink-0" />
              <div className="text-center">
                <span className="text-4xl font-black text-white">{totalCount}</span>
                <span className="text-xl font-semibold text-slate-400 ml-2">
                  student{totalCount !== 1 ? 's' : ''} joined
                </span>
              </div>
              {studentListExpanded ? (
                <ChevronUp className="w-6 h-6 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-400 flex-shrink-0" />
              )}
            </button>
            {studentListExpanded && (
              <div className="mt-4 pt-4 border-t border-slate-700 space-y-2">
                {students.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-2">No students in lobby yet.</p>
                ) : (
                  students.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between gap-3 bg-slate-700/50 rounded-lg px-4 py-3"
                    >
                      <span className="font-semibold text-white truncate">{s.name || 'Student'}</span>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleRemoveStudent(s.id); }}
                        disabled={removingId === s.id}
                        className="flex-shrink-0 p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50"
                        aria-label={`Remove ${s.name || 'student'}`}
                      >
                        {removingId === s.id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          

          <div className="fixed bottom-8 right-8">
            <button
              type="button"
              onClick={handleStartSession}
              disabled={starting}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 text-white text-xl font-bold py-4 px-8 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2"
            >
              {starting ? <Loader2 className="w-6 h-6 animate-spin" /> : null}
              Start Session →
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
              Live Results
            </h1>
            <p className="text-xl text-slate-400">
              Student progress
            </p>
          </div>

          <div className="w-full max-w-2xl mb-8">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-white">Completed</span>
                <span className="text-2xl font-bold text-blue-400">
                  {completedCount} / {totalCount}
                </span>
              </div>
              <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: totalCount ? `${(completedCount / totalCount) * 100}%` : '0%' }}
                />
              </div>
            </div>
          </div>

          <div className="w-full max-w-2xl space-y-3">
            {students.map((s) => (
              <div
                key={s.id}
                className="bg-slate-800 rounded-xl border border-slate-700 px-6 py-4 flex items-center justify-between"
              >
                <span className="font-semibold text-white">{s.name || 'Student'}</span>
                {s.completed ? (
                  <span className="flex items-center gap-2 text-green-400 font-semibold">
                    <CheckCircle2 className="w-5 h-5" />
                    {s.score}%
                  </span>
                ) : (
                  <span className="text-slate-500">In progress…</span>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
