'use client';

import Link from 'next/link';
import { ArrowRight, Scale } from 'lucide-react';
import { scotusEssayPrompts } from '@/data/gov/scotusEssayPrompts';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasAdminRole } from '@/lib/adminAccess';

export default function ScotusEssayPracticeHubClient() {
  const { user, userData, loadingUserData } = useAuthContext();
  const canAccessGov = Boolean(user && hasAdminRole(userData));

  if (loadingUserData) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-gray-600 font-semibold">Checking access...</p>
        </div>
      </main>
    );
  }

  if (!canAccessGov) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-black text-gray-900">AP Gov is in admin preview</h1>
          <p className="mt-3 text-gray-600">This content is currently restricted to admin accounts.</p>
          <Link
            href="/ap-macro-practice-tests"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
          >
            Go to AP Macro practice tests
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8">
          <p className="inline-flex w-fit rounded-md border-2 border-violet-700 bg-violet-600 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            AP Gov
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            SCOTUS Essay Practice Prompts
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-gray-700 sm:text-base">
            Pick one prompt to open the full FRQ workspace. Each set includes a required case, a comparison case, and
            A/B/C writing tasks.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {scotusEssayPrompts.map((prompt, index) => (
            <Link
              key={prompt.id}
              href={`/scotus-essay-practice/${prompt.id}`}
              className="group rounded-xl border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex rounded-md border border-gray-300 bg-gray-50 px-2 py-1 text-xs font-black text-gray-700">
                  Prompt {index + 1}
                </span>
                <Scale className="h-4 w-4 text-violet-600" />
              </div>
              <h2 className="mt-3 text-lg font-black leading-snug text-gray-900">
                {prompt.requiredCase} - STILL IN DEVELOPMENT
              </h2>
              <p className="mt-1 text-sm font-semibold text-gray-700">{prompt.topic}</p>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">Comparison: {prompt.nonRequiredCase}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-black text-violet-700">
                Open prompt
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}

