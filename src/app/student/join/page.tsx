'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { doc, onSnapshot, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

const LIVE_STUDENT_KEY = (sessionId: string) => `live_student_${sessionId}`;
const LIVE_STUDENT_NAME_KEY = (sessionId: string) => `live_student_name_${sessionId}`;

export default function StudentJoinPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('id') ?? '';

  const [name, setName] = useState('');
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);
  const [sessionExists, setSessionExists] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [removedFromLobby, setRemovedFromLobby] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setSessionExists(false);
      return;
    }
    const sessionRef = doc(db, 'sessions', sessionId);
    const unsubscribe = onSnapshot(
      sessionRef,
      (snap) => {
        if (!snap.exists()) {
          setSessionExists(false);
          return;
        }
        setSessionExists(true);
        const data = snap.data();
        if (data?.status === 'ACTIVE') {
          const sid = typeof window !== 'undefined' ? sessionStorage.getItem(LIVE_STUDENT_KEY(sessionId)) : null;
          router.push(`/student/play/${sessionId}${sid ? `?studentId=${encodeURIComponent(sid)}` : ''}`);
        }
      },
      (err) => {
        console.error('Session listener error:', err);
        setSessionExists(false);
      }
    );
    return () => unsubscribe();
  }, [sessionId, router]);

  // When joined, listen to own student doc; if deleted, teacher removed us from lobby
  useEffect(() => {
    if (!sessionId || !joined || removedFromLobby) return;
    const studentId = typeof window !== 'undefined' ? sessionStorage.getItem(LIVE_STUDENT_KEY(sessionId)) : null;
    if (!studentId) return;
    const studentRef = doc(db, 'sessions', sessionId, 'students', studentId);
    const unsubscribe = onSnapshot(studentRef, (snap) => {
      if (!snap.exists()) {
        setRemovedFromLobby(true);
      }
    });
    return () => unsubscribe();
  }, [sessionId, joined, removedFromLobby]);

  const handleJoin = async () => {
    const trimmed = name.trim();
    if (!trimmed || !sessionId || joining) return;
    setJoining(true);
    setError(null);
    try {
      const studentsRef = collection(db, 'sessions', sessionId, 'students');
      const docRef = await addDoc(studentsRef, {
        name: trimmed,
        joinedAt: serverTimestamp(),
      });
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(LIVE_STUDENT_KEY(sessionId), docRef.id);
        sessionStorage.setItem(LIVE_STUDENT_NAME_KEY(sessionId), trimmed);
      }
      setJoined(true);
    } catch (err) {
      console.error('Error joining session:', err);
      setError('Could not join. Please try again.');
    } finally {
      setJoining(false);
    }
  };

  const containerClass = 'w-full max-w-sm min-h-[28rem] flex flex-col items-center justify-center rounded-2xl bg-slate-800/50 border border-slate-700/80 p-8 shadow-xl text-center';

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 flex flex-col items-center justify-center p-8 text-white">
        <div className={containerClass}>
          <p className="text-xl text-slate-400">No session ID. Use the link or QR code from your teacher.</p>
        </div>
      </div>
    );
  }

  if (sessionExists === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 flex flex-col items-center justify-center p-8 text-white">
        <div className={containerClass}>
          <Loader2 className="w-12 h-12 animate-spin text-slate-400 mb-4" />
          <p className="text-slate-400">Loading…</p>
        </div>
      </div>
    );
  }

  if (sessionExists === false) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 flex flex-col items-center justify-center p-8 text-white">
        <div className={containerClass}>
          <p className="text-xl text-slate-400">Session not found or has ended.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 flex flex-col items-center justify-center p-8 text-white">
      <div className={containerClass}>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
          Join the session
        </h1>
        <p className="text-slate-400 mb-8">
          Enter your name. Wait for your teacher to start the assignment.
        </p>

        {removedFromLobby ? (
          <>
            <p className="text-xl font-semibold text-white mb-4">You have been removed from the lobby.</p>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = `${window.location.origin}/join`;
                }
              }}
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition"
            >
              Join again
            </button>
          </>
        ) : joined ? (
          <>
            <p className="text-xl font-semibold text-white mb-2">You’re in!</p>
            <p className="text-slate-400 mb-6">Waiting for your teacher to start the assignment…</p>
            <div className="flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 mb-4"
              onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
            />
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <button
              type="button"
              onClick={handleJoin}
              disabled={!name.trim() || joining}
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
            >
              {joining ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              Join
            </button>
          </>
        )}
      </div>
    </div>
  );
}
