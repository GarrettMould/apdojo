'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getWorksheetBySlug, type Worksheet } from '@/lib/worksheets';
import { Printer, Loader2, AlertCircle, Key } from 'lucide-react';

function AnswerKeyPageContent() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const [worksheet, setWorksheet] = useState<Worksheet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('Invalid worksheet link.');
      setLoading(false);
      return;
    }
    getWorksheetBySlug(slug)
      .then((data) => {
        setWorksheet(data);
        if (!data) setError('Worksheet not found.');
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load answer key.');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const buildAnswerKeyUrl = () => {
    if (!worksheet || (!worksheet.q && !worksheet.f)) return null;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const search = new URLSearchParams();
    if (worksheet.q) search.set('q', worksheet.q);
    if (worksheet.f) search.set('f', worksheet.f);
    search.set('embed', '1');
    search.set('answerKey', '1');
    return `${origin}/tutor/print-preview?${search.toString()}`;
  };

  const iframeUrl = buildAnswerKeyUrl();
  const hasAnswerKey = !!(worksheet?.q || worksheet?.f);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">Loading answer key…</p>
        </div>
      </div>
    );
  }

  if (error || !worksheet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-sm w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-slate-900 mb-2">Answer key not found</h1>
          <p className="text-slate-600 mb-6">{error ?? 'This link may be broken or the worksheet was removed.'}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Go to AP Dojo
          </Link>
        </div>
      </div>
    );
  }

  if (!hasAnswerKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-sm w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
          <Key className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-slate-900 mb-2">Answer key not available</h1>
          <p className="text-slate-600 mb-6">
            This worksheet does not have a generated answer key. You can still view the worksheet.
          </p>
          <Link
            href={`/worksheets/${slug}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            View worksheet
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="w-full max-w-4xl mx-auto px-4 pt-8 pb-6">
        <button
          type="button"
          onClick={handlePrint}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition-all print:hidden mb-8"
        >
          <Printer className="w-5 h-5" />
          Print / Save as PDF
        </button>
        {iframeUrl && (
          <iframe
            src={iframeUrl}
            title={`${worksheet.title} – Answer Key`}
            className="w-full min-h-[120vh] rounded-lg border border-slate-200 bg-white"
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 px-4 py-4 safe-area-inset-bottom">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-slate-600">
            Answer key for <span className="font-semibold">{worksheet.title}</span>.{' '}
            <Link href={`/worksheets/${slug}`} className="text-blue-600 hover:underline font-medium">
              View worksheet
            </Link>
            {' · '}
            <Link href="/" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
              AP Dojo
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function AnswerKeyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      }
    >
      <AnswerKeyPageContent />
    </Suspense>
  );
}
