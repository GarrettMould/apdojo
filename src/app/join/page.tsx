'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function JoinPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If URL has ?code=..., go straight to lobby (for QR / shared links)
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
      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 flex flex-col items-center justify-center p-8 text-white">
        <Loader2 className="w-12 h-12 animate-spin text-slate-400 mb-4" />
        <p className="text-slate-400">Joining session…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 flex flex-col items-center justify-center p-8 text-white">
      <div className="w-full max-w-sm min-h-[28rem] flex flex-col items-center justify-center rounded-2xl bg-slate-800/50 border border-slate-700/80 p-8 shadow-xl">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">Join a session</h1>
        <p className="text-slate-400 mb-8 text-center">Enter the 5-character code from your teacher.</p>

        <form onSubmit={handleJoin} className="w-full">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase().slice(0, 5));
                setError(null);
              }}
              placeholder="e.g. A3X9K"
              maxLength={5}
              autoComplete="off"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-600 bg-slate-800 text-white text-center text-2xl font-mono tracking-[0.3em] placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={loading || code.trim().length === 0}
              className="w-full px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Join'}
            </button>
          </div>
          {error && (
            <p className="mt-4 text-amber-400 text-sm text-center flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </p>
          )}
        </form>

        <Link href="/" className="mt-10 text-slate-500 hover:text-slate-300 text-sm">
          Go to apdojo.com
        </Link>
      </div>
    </div>
  );
}
