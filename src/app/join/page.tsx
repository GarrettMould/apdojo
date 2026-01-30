'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2, AlertCircle } from 'lucide-react';

function JoinPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const urlCode = searchParams.get('code')?.toUpperCase().trim();
  const hasUrlCode = !!urlCode && urlCode.length === 5;
  const [joiningFromUrl, setJoiningFromUrl] = useState(false);

  useEffect(() => {
    if (!hasUrlCode) return;
    let cancelled = false;
    setJoiningFromUrl(true);
    const go = async () => {
      try {
        const q = query(collection(db, 'sessions'), where('code', '==', urlCode));
        const snapshot = await getDocs(q);
        if (cancelled) return;
        if (!snapshot.empty) {
          const sessionId = snapshot.docs[0].id;
          router.replace(`/student/join?id=${encodeURIComponent(sessionId)}`);
        } else {
          setJoiningFromUrl(false);
          setError('Code not found or session has ended.');
        }
      } catch {
        if (!cancelled) {
          setJoiningFromUrl(false);
          setError('Could not join. Please try again.');
        }
      }
    };
    go();
    return () => { cancelled = true; };
  }, [urlCode, hasUrlCode, router]);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.toUpperCase().trim();
    if (!trimmed) {
      setError('Enter the code from your teacher.');
      return;
    }
    if (trimmed.length !== 5) {
      setError('Code should be 5 characters.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const sessionsRef = collection(db, 'sessions');
      const q = query(sessionsRef, where('code', '==', trimmed));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setError('Code not found or session has ended.');
        setLoading(false);
        return;
      }
      const sessionId = snapshot.docs[0].id;
      router.replace(`/student/join?id=${encodeURIComponent(sessionId)}`);
    } catch (err) {
      console.error('Error looking up session by code:', err);
      setError('Could not join. Please try again.');
      setLoading(false);
    }
  };

  if (joiningFromUrl) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
        <Loader2 className="w-12 h-12 animate-spin text-slate-400 mb-4" />
        <p className="text-slate-500">Joining session…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-1">
          Enter Game Code
        </h1>
        <p className="text-slate-500 text-center text-sm mb-8">
          Check the projector screen
        </p>

        <form onSubmit={handleJoin} className="w-full">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase().slice(0, 5));
              setError(null);
            }}
            placeholder="•••••"
            maxLength={5}
            autoComplete="off"
            className="w-full text-center text-4xl tracking-[0.3em] font-mono uppercase py-5 mb-6 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-0 transition-colors"
          />
          <button
            type="submit"
            disabled={loading || code.trim().length === 0}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-900 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Join'}
          </button>
          {error && (
            <p className="mt-4 text-red-500 text-sm text-center flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </p>
          )}
        </form>
      </div>

      <p className="mt-12 text-slate-300 text-sm font-semibold tracking-wider">
        AP DOJO
      </p>
    </div>
  );
}

export default function JoinPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
          <Loader2 className="w-12 h-12 animate-spin text-slate-400 mb-4" />
          <p className="text-slate-500">Loading…</p>
        </div>
      }
    >
      <JoinPageContent />
    </Suspense>
  );
}
