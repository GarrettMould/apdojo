'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  BookOpenText,
  Scale,
  ClipboardCheck,
  Sparkles,
  MessageSquareQuote,
  CheckCircle2,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  GitCompareArrows,
} from 'lucide-react';
import { scotusEssayPrompts } from '@/data/gov/scotusEssayPrompts';
import { auth as firebaseAuth } from '@/lib/firebase';
import { tutorAvatarUrl } from '@/lib/tutorAvatar';
import { personaForSubject } from '@/lib/chatPersonas';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasAdminRole } from '@/lib/adminAccess';
import Link from 'next/link';

type ScotusEssayPracticeClientProps = {
  caseName: string;
};

type SenseiMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

function toApiTurns(messages: SenseiMessage[]): { role: 'user' | 'assistant'; content: string }[] {
  const filtered = messages
    .map((m) => ({ role: m.role, content: m.content.trim() }))
    .filter((m) => m.content.length > 0);

  const firstUserIndex = filtered.findIndex((m) => m.role === 'user');
  if (firstUserIndex === -1) return [];

  const trimmed = filtered.slice(firstUserIndex);
  const collapsed: { role: 'user' | 'assistant'; content: string }[] = [];

  for (const turn of trimmed) {
    const last = collapsed[collapsed.length - 1];
    if (last && last.role === turn.role) {
      last.content = `${last.content}\n\n${turn.content}`;
    } else {
      collapsed.push({ ...turn });
    }
  }

  if (collapsed.length % 2 === 0 && collapsed[collapsed.length - 1]?.role === 'assistant') {
    collapsed.pop();
  }

  return collapsed;
}

const RESEARCH_TABS = [
  { id: 'case-facts', label: 'Case Facts', icon: BookOpenText, active: true },
  { id: 'constitutional-clause', label: 'Constitutional Clause', icon: Scale, active: false },
  { id: 'comparison-points', label: 'Comparison Points', icon: GitCompareArrows, active: false },
  { id: 'rubric', label: 'Rubric', icon: ClipboardCheck, active: false },
];

export default function ScotusEssayPracticeClient({ caseName }: ScotusEssayPracticeClientProps) {
  const { user, userData, loadingUserData } = useAuthContext();
  const canAccessGov = Boolean(user && hasAdminRole(userData));
  const caseSlug = decodeURIComponent(caseName).toLowerCase();
  const prompt = useMemo(
    () => scotusEssayPrompts.find((item) => item.id === caseSlug) ?? scotusEssayPrompts[0],
    [caseSlug]
  );
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isResearchOpen, setIsResearchOpen] = useState(true);
  const [isAiOpen, setIsAiOpen] = useState(true);
  const [senseiInput, setSenseiInput] = useState('');
  const [senseiSending, setSenseiSending] = useState(false);
  const [senseiMessages, setSenseiMessages] = useState<SenseiMessage[]>([
    {
      id: 'sensei-welcome',
      role: 'assistant',
      content:
        'Dojo Sensei here. We train point-by-point. Start with Point A: which constitutional clause or liberty links these two cases?',
    },
  ]);
  const senseiScrollRef = useRef<HTMLDivElement | null>(null);

  const readableCaseName = `${prompt.requiredCase} - STILL IN DEVELOPMENT`;
  const senseiAvatar = tutorAvatarUrl('gov');
  const senseiName = personaForSubject('gov').name;

  useEffect(() => {
    if (!senseiScrollRef.current) return;
    senseiScrollRef.current.scrollTop = senseiScrollRef.current.scrollHeight;
  }, [senseiMessages, senseiSending]);

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

  const sendSenseiMessage = async () => {
    const text = senseiInput.trim();
    if (!text || senseiSending) return;
    const userMessage: SenseiMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
    };
    const nextMessages = [...senseiMessages, userMessage];
    setSenseiMessages(nextMessages);
    setSenseiInput('');
    setSenseiSending(true);

    try {
      const token = await firebaseAuth.currentUser?.getIdToken();
      const res = await fetch('/api/cheat-sheet-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          subject: 'gov',
          unitNumber: 1,
          unitTitle: prompt.topic,
          mode: 'scotus_essay',
          scotusPrompt: {
            requiredCase: prompt.requiredCase,
            nonRequiredCase: prompt.nonRequiredCase,
            topic: prompt.topic,
            scenario: prompt.scenario,
            tasks: prompt.tasks,
          },
          messages: toApiTurns(nextMessages),
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      const reply =
        res.ok && data.reply?.trim()
          ? data.reply.trim()
          : `Sensei could not respond: ${data.error || res.statusText || 'try again.'}`;
      setSenseiMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: reply,
        },
      ]);
    } catch {
      setSenseiMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: 'Sensei connection failed. Check your network and try again.',
        },
      ]);
    } finally {
      setSenseiSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto w-full max-w-[1700px] px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <header className="mb-6">
          <p className="inline-flex w-fit rounded-md border-2 border-indigo-700 bg-indigo-500 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            SCOTUS Essay Practice
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
            {readableCaseName}
          </h1>
        </header>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-12 xl:gap-5">
          {isResearchOpen && (
            <aside className="xl:col-span-3 transition-all duration-300">
              <div className="h-full rounded-xl border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-black uppercase tracking-wider text-gray-900">Research Dojo</h2>
                  <button
                    type="button"
                    onClick={() => setIsResearchOpen(false)}
                    className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-gray-50 px-2 py-1 text-xs font-bold text-gray-700 hover:border-gray-700"
                  >
                    <PanelLeftClose className="h-3.5 w-3.5" />
                    Hide
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {RESEARCH_TABS.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        className={`flex w-full items-center gap-3 rounded-lg border-2 px-3 py-3 text-left transition ${
                          tab.active
                            ? 'border-indigo-700 bg-indigo-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                            : 'border-gray-300 bg-white text-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="text-sm font-bold">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>
          )}

          <section
            className={`${
              isResearchOpen && isAiOpen
                ? 'xl:col-span-6'
                : isResearchOpen || isAiOpen
                  ? 'xl:col-span-9'
                  : 'xl:col-span-12'
            } transition-all duration-300`}
          >
            <div className="rounded-xl border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:p-5">
              {(!isResearchOpen || !isAiOpen) && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {!isResearchOpen && (
                    <button
                      type="button"
                      onClick={() => setIsResearchOpen(true)}
                      className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-xs font-bold text-gray-700 hover:border-gray-700"
                    >
                      <PanelLeftOpen className="h-3.5 w-3.5" />
                      Show Research Dojo
                    </button>
                  )}
                  {!isAiOpen && (
                    <button
                      type="button"
                      onClick={() => setIsAiOpen(true)}
                      className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-xs font-bold text-gray-700 hover:border-gray-700"
                    >
                      <PanelRightOpen className="h-3.5 w-3.5" />
                      Show AI Sensei
                    </button>
                  )}
                </div>
              )}
              <h2 className="text-sm font-black uppercase tracking-wider text-gray-900">FRQ Prompt</h2>
              <div className="mt-4 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-md border-2 border-violet-700 bg-violet-600 px-2.5 py-1 text-xs font-black uppercase tracking-wide text-white">
                    {prompt.topic}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-800">{prompt.scenario}</p>
              </div>

              <div className="mt-5 rounded-xl border-2 border-gray-200 bg-white">
                {prompt.tasks.map((task, idx) => {
                  const label = String.fromCharCode(65 + idx);
                  const isActive = idx === activeTaskIndex;
                  const isCompleted = Boolean(answers[idx]?.trim());
                  return (
                    <div key={`task-${label}`} className="border-b border-gray-200 last:border-b-0">
                      <button
                        type="button"
                        onClick={() => setActiveTaskIndex(idx)}
                        className={`flex w-full items-center justify-between px-4 py-3 text-left transition ${
                          isActive
                            ? 'translate-y-[2px] border-b-2 border-indigo-900 bg-indigo-600 text-white shadow-[0_3px_0_rgba(49,46,129,0.9)]'
                            : isCompleted
                              ? 'bg-emerald-50 text-emerald-900'
                              : 'bg-white text-gray-800 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-sm font-black">Part {label}</span>
                        <div className="flex items-center gap-2">
                          {isCompleted && <CheckCircle2 className="h-4 w-4" />}
                          <span className="text-xs font-black">{isActive ? 'OPEN' : 'OPEN PART'}</span>
                        </div>
                      </button>
                      {isActive && (
                        <div className="space-y-3 border-t-2 border-indigo-800 bg-white p-4">
                          <p className="text-sm font-semibold leading-relaxed text-gray-800">{task}</p>
                          <textarea
                            value={answers[idx] ?? ''}
                            onChange={(e) =>
                              setAnswers((prev) => ({
                                ...prev,
                                [idx]: e.target.value,
                              }))
                            }
                            placeholder="Write your AP Gov FRQ response here..."
                            className="min-h-[min(44vh,360px)] w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base leading-relaxed text-gray-900 shadow-[0_2px_0_rgba(17,24,39,0.1)] outline-none transition focus:translate-y-[1px] focus:border-gray-500 focus:shadow-[0_4px_0_rgba(17,24,39,0.22)]"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-lg border-2 border-dashed border-indigo-700 bg-indigo-50 p-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-indigo-700">Final Assembly</h3>
                <p className="mt-2 text-sm text-gray-700">
                  Assemble your final response by tightening claim, citing both cases, and linking to the target civic principle.
                </p>
                <div className="mt-3 flex min-h-20 items-center justify-center rounded-md border-2 border-indigo-300 bg-white text-xs font-black uppercase tracking-wide text-indigo-700">
                  Final FRQ Draft Zone
                </div>
              </div>
            </div>
          </section>

          {isAiOpen && (
            <aside className="xl:col-span-3 transition-all duration-300">
              <div className="h-full rounded-xl border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-black uppercase tracking-wider text-gray-900">AI Sensei</h2>
                  <button
                    type="button"
                    onClick={() => setIsAiOpen(false)}
                    className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-gray-50 px-2 py-1 text-xs font-bold text-gray-700 hover:border-gray-700"
                  >
                    <PanelRightClose className="h-3.5 w-3.5" />
                    Hide
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="rounded-lg border-2 border-indigo-700 bg-indigo-50 p-3">
                    <div className="flex items-center gap-2 text-indigo-700">
                      {senseiAvatar ? (
                        <span className="inline-flex h-8 w-8 overflow-hidden rounded-full border border-indigo-300 bg-white">
                          <Image
                            src={senseiAvatar}
                            alt={senseiName}
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                            unoptimized
                          />
                        </span>
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )}
                      <span className="text-xs font-black uppercase tracking-wide">{senseiName} · Socratic Coach</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">
                      Sensei coaches one rubric point at a time and ends each turn with your next writing move.
                    </p>
                  </div>

                  <div
                    ref={senseiScrollRef}
                    className="max-h-[52vh] space-y-2 overflow-y-auto rounded-lg border-2 border-gray-300 bg-gray-50 p-3"
                  >
                    {senseiMessages.map((m) => (
                      <div key={m.id} className="flex items-start gap-2">
                        {m.role === 'assistant' && senseiAvatar ? (
                          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 overflow-hidden rounded-full border border-indigo-200 bg-white">
                            <Image
                              src={senseiAvatar}
                              alt={senseiName}
                              width={28}
                              height={28}
                              className="h-full w-full object-cover"
                              unoptimized
                            />
                          </span>
                        ) : null}
                        <div
                          className={`rounded-lg border px-3 py-2 text-sm ${
                            m.role === 'assistant'
                              ? 'border-indigo-200 bg-white text-gray-800'
                              : 'border-emerald-200 bg-emerald-50 text-gray-900'
                          }`}
                        >
                          {m.content}
                        </div>
                      </div>
                    ))}
                    {senseiSending && (
                      <div className="rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm text-gray-500">
                        Sensei is thinking...
                      </div>
                    )}
                  </div>

                  <div className="rounded-lg border-2 border-gray-300 bg-gray-50 p-3">
                    <div className="flex items-start gap-2">
                      <MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <p className="text-xs font-semibold text-gray-600">
                        Keep it short: write your next sentence for Part {String.fromCharCode(65 + activeTaskIndex)}.
                      </p>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <input
                        value={senseiInput}
                        onChange={(e) => setSenseiInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            void sendSenseiMessage();
                          }
                        }}
                        placeholder="Type your next FRQ sentence..."
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => void sendSenseiMessage()}
                        disabled={senseiSending || !senseiInput.trim()}
                        className="rounded-md border-2 border-indigo-700 bg-indigo-600 px-3 py-2 text-xs font-black text-white disabled:opacity-50"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          )}
        </section>
      </div>
    </main>
  );
}

