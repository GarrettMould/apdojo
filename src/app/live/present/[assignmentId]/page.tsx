'use client';

import QRCode from 'react-qr-code';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { doc, onSnapshot, updateDoc, collection, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2, Users, CheckCircle2, Trash2, ChevronDown, ChevronUp, Copy, Play } from 'lucide-react';

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
  const [headlinePhase, setHeadlinePhase] = useState<'enter' | 'typing'>('enter');
  const [typedLength, setTypedLength] = useState(0);

  const typewriterText = 'apdojo.com/join';

  // After "Enter the Dojo" is shown, switch to typing phase
  useEffect(() => {
    const t = setTimeout(() => setHeadlinePhase('typing'), 2500);
    return () => clearTimeout(t);
  }, []);

  // Type out "apdojo.com/join" character by character
  useEffect(() => {
    if (headlinePhase !== 'typing' || typedLength >= typewriterText.length) return;
    const interval = setInterval(() => {
      setTypedLength((n) => Math.min(n + 1, typewriterText.length));
    }, 120);
    return () => clearInterval(interval);
  }, [headlinePhase, typedLength]);

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

  const displayCode = session?.code ?? (joinUrl ? (() => {
    try {
      const u = new URL(joinUrl);
      return u.searchParams.get('code') ?? u.searchParams.get('id') ?? '';
    } catch {
      return '';
    }
  })() : '');

  const handleCopy = () => {
    if (!displayCode) return;
    navigator.clipboard.writeText(displayCode);
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 md:p-8">
      {!session ? (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-slate-400" />
          <p className="text-slate-500 text-lg">Loading session…</p>
        </div>
      ) : !isActive ? (
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left: QR Code */}
              <div className="p-6 md:p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
                <div className="p-4 border border-slate-200 rounded-2xl bg-slate-50/50">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
                    <QRCode
                      size={256}
                      style={{ height: '100%', width: '100%' }}
                      value={joinUrl}
                      viewBox="0 0 256 256"
                      fgColor="#0f172a"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Header, URL box, Footer */}
              <div className="flex-1 flex flex-col p-6 md:p-8">
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2 min-h-[1.2em]">
                    {headlinePhase === 'enter' ? (
                      'Enter the Dojo'
                    ) : (
                      <span>
                        {typewriterText.slice(0, typedLength)}
                        {typedLength < typewriterText.length && (
                          <span className="animate-pulse">|</span>
                        )}
                      </span>
                    )}
                  </h1>
                  <p className="text-lg md:text-xl text-slate-500 mb-6">
                    Scan the QR code or enter the code below
                  </p>

                  {/* URL copy box */}
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="w-full flex items-center justify-between gap-3 px-4 py-4 md:px-5 md:py-5 rounded-xl border-2 border-slate-200 hover:bg-blue-50 hover:border-blue-200 transition-colors text-left group"
                  >
                    <span className="text-3xl md:text-4xl font-black text-blue-500 tracking-[0.2em] flex-1">
                      {displayCode || '—'}
                    </span>
                    <span className="flex-shrink-0 text-slate-500 group-hover:text-blue-600">
                      {copied ? (
                        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 md:w-6 md:h-6" />
                      )}
                    </span>
                  </button>
                </div>

                {/* Footer: Student count + Start Session */}
                <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStudentListExpanded((e) => !e)}
                    className="flex items-center justify-center gap-3 text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded-xl py-2"
                  >
                    <Users className="w-8 h-8 md:w-10 md:h-10 text-slate-600 flex-shrink-0" />
                    <span className="text-2xl md:text-3xl font-black text-slate-900">{totalCount}</span>
                    <span className="text-lg md:text-xl font-semibold text-slate-500">
                      student{totalCount !== 1 ? 's' : ''} joined
                    </span>
                    {studentListExpanded ? (
                      <ChevronUp className="w-6 h-6 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleStartSession}
                    disabled={starting}
                    className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-xl md:text-2xl font-black py-4 px-8 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                  >
                    {starting ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <Play className="w-6 h-6 flex-shrink-0" />
                    )}
                    Start Session
                  </button>
                </div>

                {/* Expandable student list */}
                {studentListExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
                    {students.length === 0 ? (
                      <p className="text-slate-500 text-base text-center py-2">No students in lobby yet.</p>
                    ) : (
                      students.map((s) => (
                        <div
                          key={s.id}
                          className="flex items-center justify-between gap-3 bg-slate-50 rounded-lg px-4 py-3 border border-slate-200"
                        >
                          <span className="font-semibold text-slate-900 truncate">{s.name || 'Student'}</span>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleRemoveStudent(s.id); }}
                            disabled={removingId === s.id}
                            className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
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
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-slate-200 bg-slate-50/50">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-2 text-center">
                Live Results
              </h1>
              <p className="text-xl text-slate-500 text-center">
                Student progress
              </p>
            </div>

            <div className="p-6 md:p-8">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-slate-900">Completed</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {completedCount} / {totalCount}
                  </span>
                </div>
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: totalCount ? `${(completedCount / totalCount) * 100}%` : '0%' }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                {students.map((s) => (
                  <div
                    key={s.id}
                    className="rounded-xl border border-slate-200 bg-slate-50/50 px-6 py-4 flex items-center justify-between"
                  >
                    <span className="font-semibold text-slate-900">{s.name || 'Student'}</span>
                    {s.completed ? (
                      <span className="flex items-center gap-2 text-green-600 font-semibold">
                        <CheckCircle2 className="w-5 h-5" />
                        {s.score}%
                      </span>
                    ) : (
                      <span className="text-slate-500">In progress…</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
