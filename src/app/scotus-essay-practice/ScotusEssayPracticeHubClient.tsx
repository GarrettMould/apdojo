'use client';

import Link from 'next/link';
import { ArrowRight, Scale } from 'lucide-react';
import {
  AP_GOV_REQUIRED_SCOTUS_CASES,
  formatScotusCaseTitle,
  getScotusCaseRecord,
  isScotusPracticeLive,
} from '@/data/gov/scotusRequiredCases';
import { scotusEssayPrompts } from '@/data/gov/scotusEssayPrompts';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasAdminRole } from '@/lib/adminAccess';

function ScotusCaseCard({
  caseIndex,
  caseId,
  caseTitle,
  summary,
  topic,
  comparisonCase,
  isLive,
  href,
}: {
  caseIndex: number;
  caseId: string;
  caseTitle: string;
  summary?: string;
  topic?: string;
  comparisonCase?: string;
  isLive: boolean;
  href?: string;
}) {
  const cardBody = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex rounded-md border border-gray-300 bg-gray-50 px-2 py-1 text-xs font-black text-gray-700">
          Case {caseIndex + 1}
        </span>
        <Scale className="h-4 w-4 text-violet-600" />
      </div>
      <h2 className="mt-3 text-lg font-black leading-snug text-gray-900">{caseTitle}</h2>
      {topic ? <p className="mt-1 text-sm font-semibold text-violet-700">{topic}</p> : null}
      {summary ? <p className="mt-2 line-clamp-3 text-sm text-gray-600">{summary}</p> : null}
      {comparisonCase ? (
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">Comparison: {comparisonCase}</p>
      ) : null}
      {isLive ? (
        <div className="mt-4 inline-flex items-center gap-2 text-sm font-black text-violet-700">
          Open practice prompt
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </div>
      ) : (
        <p className="mt-4 text-xs font-black uppercase tracking-wide text-gray-400">Coming soon</p>
      )}
    </>
  );

  const cardClassName = `group rounded-xl border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition ${
    isLive
      ? 'hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
      : 'opacity-75'
  }`;

  if (isLive && href) {
    return (
      <Link key={caseId} href={href} className={cardClassName}>
        {cardBody}
      </Link>
    );
  }

  return (
    <div key={caseId} className={cardClassName} aria-disabled="true">
      {cardBody}
    </div>
  );
}

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
    <main className="min-h-screen bg-gray-50 px-4 pb-10 pt-12 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8">
          <p className="inline-flex w-fit rounded-md border-2 border-violet-700 bg-violet-600 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            AP Gov
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-gray-900 sm:mt-5 sm:text-4xl">
            SCOTUS Comparison Practice
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-gray-700 sm:text-base">
            All 14 required Supreme Court cases are available. Open a prompt to practice the full FRQ workspace with
            A/B/C writing tasks and a comparison case.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {AP_GOV_REQUIRED_SCOTUS_CASES.map((requiredCase, index) => {
            const prompt = scotusEssayPrompts.find((item) => item.id === requiredCase.id);
            const record = getScotusCaseRecord(requiredCase);
            const isLive = isScotusPracticeLive(requiredCase.id);

            return (
              <ScotusCaseCard
                key={requiredCase.id}
                caseIndex={index}
                caseId={requiredCase.id}
                caseTitle={formatScotusCaseTitle(requiredCase)}
                summary={record?.summary}
                topic={prompt?.topic}
                comparisonCase={prompt?.nonRequiredCase}
                isLive={isLive}
                href={isLive ? `/scotus-essay-practice/${requiredCase.id}` : undefined}
              />
            );
          })}
        </section>
      </div>
    </main>
  );
}
