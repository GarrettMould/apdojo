'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [sessionName, setSessionName] = useState<string>('Session');
  const [error, setError] = useState<string | null>(null);
  const [removedFromLobby, setRemovedFromLobby] = useState(false);
  const hasNavigatedToPlayRef = useRef(false);

  useEffect(() => {
    if (!sessionId) {
      setSessionExists(false);
      return;
    }
    hasNavigatedToPlayRef.current = false;
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
        if (data?.name) setSessionName(data.name as string);
        // Only navigate once when status first becomes ACTIVE (avoid repeated router.push on every snapshot)
        if (data?.status === 'ACTIVE' && !hasNavigatedToPlayRef.current) {
          hasNavigatedToPlayRef.current = true;
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

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
          <p className="text-lg text-slate-600 text-center">No session ID. Use the link or QR code from your teacher.</p>
        </div>
        <p className="mt-12 text-slate-300 text-sm font-semibold tracking-wider">AP DOJO</p>
      </div>
    );
  }

  if (sessionExists === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
          <Loader2 className="w-12 h-12 animate-spin text-slate-400 mb-4" />
          <p className="text-slate-500">Loading…</p>
        </div>
        <p className="mt-12 text-slate-300 text-sm font-semibold tracking-wider">AP DOJO</p>
      </div>
    );
  }

  if (sessionExists === false) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
          <p className="text-lg text-slate-600 text-center">Session not found or has ended.</p>
        </div>
        <p className="mt-12 text-slate-300 text-sm font-semibold tracking-wider">AP DOJO</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Context banner */}
        <div className="bg-blue-50 rounded-t-3xl p-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {joined ? 'Any second now...' : 'Almost There...'}
          </h1>
        </div>

        <div className="p-8">
          {removedFromLobby ? (
            <>
              <p className="text-lg font-semibold text-slate-900 mb-4 text-center">You have been removed from the lobby.</p>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = `${window.location.origin}/join`;
                  }
                }}
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition"
              >
                Join again
              </button>
            </>
          ) : joined ? (
            <>
              <p className="text-xl font-bold text-slate-900 mb-2 text-center">Get ready!</p>
              <p className="text-slate-500 text-center mb-6">Waiting for your teacher to start the assignment…</p>
              <div className="flex justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-slate-400" />
              </div>
            </>
          ) : (
            <>
              <label className="block text-slate-500 text-sm font-medium mb-3">
                What should we call you?
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full p-4 text-xl border-0 border-b-2 border-slate-200 focus:outline-none focus:border-black focus:ring-0 rounded-none bg-transparent mb-6"
                onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
              />
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                type="button"
                onClick={handleJoin}
                disabled={!name.trim() || joining}
                className="w-full py-4 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600 text-white text-xl font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                {joining ? <Loader2 className="w-6 h-6 animate-spin" /> : null}
                Enter Class
              </button>
              <p className="mt-4 text-slate-400 text-sm text-center">
                Waiting for host to start...
              </p>
            </>
          )}
        </div>
      </div>

      <p className="mt-12 text-slate-300 text-sm font-semibold tracking-wider">
        AP DOJO
      </p>
    </div>
  );
}
