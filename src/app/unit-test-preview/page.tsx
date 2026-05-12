'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PlayCircle, Clock, PauseCircle, PenLine, EyeOff, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { macroUnits, microUnits, govUnits } from '@/data/cheatSheets';
import { getUnitMCQTestUrl, getUnitFrqPackUrl, getUnitFinalPracticeTestsUrl } from '@/lib/utils';
import { getUnitTestMeta, formatTestTime } from '@/data/unitTestMeta';
import { getGovUnitStimulusFrqs } from '@/data/gov/govUnitStimulusFrqs';
import { useAuthContext } from '@/contexts/AuthContext';
import { loadTestProgress, clearTestProgress } from '@/lib/testProgress';
import { hasAdminRole } from '@/lib/adminAccess';

const RULES = [
  'Each question has one correct answer — select the best choice.',
  'You can move between questions freely during the test.',
  'Your score and explanations are shown immediately after submitting.',
  'Pause only if absolutely necessary — you cannot pause on exam day.',
  'Once you submit, you cannot retake the same session.',
];

const TOOLS = [
  {
    icon: <PenLine className="w-4 h-4" />,
    label: 'Drawing Pad',
    desc: 'Scratch work and diagrams',
  },
  {
    icon: <EyeOff className="w-4 h-4" />,
    label: 'Hide Timer',
    desc: 'Focus without the countdown',
  },
  {
    icon: <PauseCircle className="w-4 h-4" />,
    label: 'Pause Test',
    desc: 'Pause the timer at any time',
  },
];

/** College Board–style directions for the unit FRQ pack preview (timing scales with question count). */
function govFrqPackDirectionsParagraph(questionCount: number, totalSeconds: number): string {
  const totalMin = Math.max(1, Math.round(totalSeconds / 60));
  const n = questionCount;
  const minutes = Array.from({ length: n }, (_, i) => {
    const base = Math.floor(totalMin / n);
    const rem = totalMin - base * n;
    return i === n - 1 ? base + rem : base;
  });
  const qPhrase =
    n === 1 ? 'the following question' : n === 2 ? 'both of the following questions' : `all ${n} of the following questions`;
  const allPartsPhrase =
    n === 1 ? 'all parts of the question' : `all parts of all ${n} questions`;

  let pacing: string;
  if (n <= 0) {
    pacing = '';
  } else if (n === 1) {
    pacing = 'It is suggested that you use this time for that question.';
  } else if (minutes.length > 0 && minutes.every((m) => m === minutes[0])) {
    const per = minutes[0];
    pacing = `It is suggested that you spend approximately ${per} minute${per === 1 ? '' : 's'} on each question.`;
  } else {
    const segments = minutes.map((m, i) => `approximately ${m} minute${m === 1 ? '' : 's'} on Question ${i + 1}`);
    pacing =
      n === 2
        ? `It is suggested that you spend ${segments[0]} and ${segments[1]}.`
        : `It is suggested that you spend ${segments.slice(0, -1).join(', ')}, and ${segments[n - 1]}.`;
  }

  return `You have approximately ${totalMin} minutes to answer ${qPhrase}. ${pacing} Unless directions indicate otherwise, respond to ${allPartsPhrase}. In your response, use substantive examples where appropriate. It is recommended that you take a few minutes to plan each answer. You may plan your answers using the optional on-screen notes available during the session; no credit is given for planning or scratch work alone. You may move between questions freely. The timer reflects a suggested pace for practice; pause or hide it when you need additional focus. After you submit, you can review scoring guidance for each item.`;
}

// Calculator intentionally excluded — not available on the AP Macro/Micro MCQ section

function UnitTestPreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, userData, loadingUserData } = useAuthContext();

  const subjectParam = searchParams.get('subject');
  const subject =
    subjectParam === 'macro' || subjectParam === 'micro' || subjectParam === 'gov'
      ? subjectParam
      : 'macro';
  const unitParam = searchParams.get('unit') || '1';
  const unitNumber = parseInt(unitParam, 10);
  const testFormat: 'mcq' | 'frq' = searchParams.get('type') === 'frq' ? 'frq' : 'mcq';
  const isFrqPreview = testFormat === 'frq';

  // testId must match what FullExam saves: unit_${examNumber}_${examType}
  const testId = `unit_${unitNumber}_${subject}`;

  const [savedAnswerCount, setSavedAnswerCount] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    if (!user || isFrqPreview) {
      setSavedAnswerCount(null);
      return;
    }
    loadTestProgress(user.uid, testId)
      .then((progress) => {
        if (progress && !progress.isSubmitted && progress.answeredQuestions) {
          const count = Object.keys(progress.answeredQuestions).length;
          setSavedAnswerCount(count > 0 ? count : null);
        } else {
          setSavedAnswerCount(null);
        }
      })
      .catch(() => setSavedAnswerCount(null));
  }, [user, testId, isFrqPreview]);

  const units =
    subject === 'gov' ? govUnits : subject === 'micro' ? microUnits : macroUnits;
  const unit = units.find((u) => u.number === unitNumber);
  const isGov = subject === 'gov';
  const canAccessGov = Boolean(user && hasAdminRole(userData));
  const isMicro = subject === 'micro';
  const subjectName = isGov
    ? 'U.S. Government and Politics'
    : isMicro
      ? 'Microeconomics'
      : 'Macroeconomics';
  const accentBg = isGov ? 'bg-violet-600' : isMicro ? 'bg-green-600' : 'bg-blue-600';

  if (isGov && loadingUserData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <p className="text-gray-600 font-semibold">Checking access…</p>
      </div>
    );
  }

  if (isGov && !canAccessGov) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <PauseCircle className="w-12 h-12 mx-auto text-gray-500 mb-4 opacity-70" />
          <h1 className="text-2xl font-black text-gray-900 mb-2">AP Gov is in admin preview</h1>
          <p className="text-gray-600 font-medium mb-6">
            This content is currently restricted to admin accounts.
          </p>
          <button
            type="button"
            onClick={() => router.push(getUnitFinalPracticeTestsUrl('macro'))}
            className="w-full rounded-lg py-3 text-white font-black bg-blue-600 hover:bg-blue-700"
          >
            Back to AP Macro practice tests
          </button>
        </div>
      </div>
    );
  }

  if (isFrqPreview && subject !== 'gov') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <PauseCircle className="w-12 h-12 mx-auto text-gray-500 mb-4 opacity-70" />
          <h1 className="text-2xl font-black text-gray-900 mb-2">Unit FRQ packs</h1>
          <p className="text-gray-600 font-medium mb-6">
            Stimulus FRQ packs are only available for AP Gov right now. Use your course&apos;s full FRQ exams for
            Macro and Micro.
          </p>
          <button
            type="button"
            onClick={() =>
              router.push(getUnitFinalPracticeTestsUrl(isMicro ? 'micro' : 'macro'))
            }
            className={`w-full rounded-lg py-3 text-white font-black ${accentBg} hover:opacity-90`}
          >
            Back to unit practice tests
          </button>
        </div>
      </div>
    );
  }

  const govFrqCount = isGov ? getGovUnitStimulusFrqs(unitNumber).length : 0;

  if (isGov && unitNumber !== 1) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <PauseCircle className="w-12 h-12 mx-auto text-violet-500 mb-4 opacity-70" />
          <h1 className="text-2xl font-black text-gray-900 mb-2">Coming soon</h1>
          <p className="text-gray-600 font-medium mb-6">
            The Unit {unitNumber} {isFrqPreview ? 'FRQ pack' : 'practice exam'} for AP Gov isn&apos;t available yet.
            Unit 1 is live now.
          </p>
          <button
            type="button"
            onClick={() => router.push(getUnitFinalPracticeTestsUrl('gov'))}
            className={`w-full rounded-lg py-3 text-white font-black ${accentBg} hover:opacity-90`}
          >
            Back to unit practice tests
          </button>
        </div>
      </div>
    );
  }

  const meta = getUnitTestMeta(subject, unitNumber);
  const mcqQuestionCount = meta?.questionCount ?? 15;
  const mcqTimeLabel = meta ? formatTestTime(meta.timeLimitSeconds) : '—';

  /** FRQ pack (Gov): 60 minutes total (~20 minutes per FRQ — AP Gov Section II pacing). */
  const frqSuggestedSeconds = 60 * 60;
  const questionCount = isFrqPreview ? govFrqCount : mcqQuestionCount;
  const timeLabel = isFrqPreview ? formatTestTime(frqSuggestedSeconds) : mcqTimeLabel;

  const testUrl = isFrqPreview ? getUnitFrqPackUrl(unitNumber, subject) : getUnitMCQTestUrl(unitNumber, subject);

  if (isFrqPreview && isGov && govFrqCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <PauseCircle className="w-12 h-12 mx-auto text-violet-500 mb-4 opacity-70" />
          <h1 className="text-2xl font-black text-gray-900 mb-2">FRQ pack coming soon</h1>
          <p className="text-gray-600 font-medium mb-6">No stimulus FRQs are published for Unit {unitNumber} yet.</p>
          <button
            type="button"
            onClick={() => router.push(getUnitFinalPracticeTestsUrl('gov'))}
            className={`w-full rounded-lg py-3 text-white font-black ${accentBg} hover:opacity-90`}
          >
            Back to unit practice tests
          </button>
        </div>
      </div>
    );
  }

  if (!unit) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 font-semibold">Unit not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-16 px-4">
      {/* Back link — top left */}
      <button
        type="button"
        onClick={() => router.push(getUnitFinalPracticeTestsUrl(subject))}
        className="fixed top-6 left-6 text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors tracking-wide"
      >
        ← Back
      </button>

      <div className="w-full max-w-xl">

        {/* Header */}
        <div className="mb-7">
          {/* AP Dojo branding */}
          <div className="flex items-center gap-2.5 mb-5">
            <Image src="/images/dojoIconJan26.svg" alt="AP Dojo" width={38} height={38} unoptimized />
            <span className="text-xl font-black tracking-wide text-gray-900">
              AP <span className={isGov ? 'text-violet-600' : isMicro ? 'text-green-600' : 'text-blue-500'}>Dojo</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
            {unit.title}
          </h1>

          {/* Unit pill — light, below headline */}
          <span className={`inline-block mt-3 text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded ${isGov ? 'bg-violet-50 text-violet-800' : isMicro ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
            AP {subjectName} · Unit {unitNumber}
            {isFrqPreview ? ' · FRQ pack' : ''}
          </span>

          <p className="text-gray-500 mt-3 text-sm leading-relaxed">{unit.description}</p>
        </div>

        {/* Main card */}
        <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">

          {/* Section table */}
          <div className="border-b border-gray-100">
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-10 px-6 py-3 bg-gray-50">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Section</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Questions</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Time</span>
            </div>
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-10 px-6 py-5 items-center border-t border-gray-100">
              <span className="text-sm font-semibold text-gray-900">
                {isFrqPreview ? 'Section II – Free Response (stimulus pack)' : 'Section I – Multiple Choice'}
              </span>
              <span className="text-sm font-semibold text-gray-900 text-right">{questionCount}</span>
              <span className="text-sm text-gray-600 text-right">{timeLabel}</span>
            </div>
          </div>

          {/* Available tools — always expanded */}
          <div className="border-b border-gray-100 px-6 py-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Available tools</p>
            <div className="space-y-3">
              {TOOLS.map((tool) => (
                <div key={tool.label} className="flex items-center gap-2.5">
                  <span className="text-sm font-semibold text-gray-800 w-28 shrink-0">{tool.label}</span>
                  <span className="text-gray-400 shrink-0">{tool.icon}</span>
                  <span className="text-xs text-gray-500">{tool.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules / FRQ directions */}
          <div className="px-6 py-5 border-b border-gray-100">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Before you begin</p>
            {isFrqPreview ? (
              <p className="text-sm text-gray-600 leading-relaxed">
                {govFrqPackDirectionsParagraph(questionCount, frqSuggestedSeconds)}
              </p>
            ) : (
              <ul className="space-y-2.5">
                {RULES.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* CTA */}
          <div className="px-6 py-5 bg-gray-50">
            {savedAnswerCount !== null ? (
              <>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                  In progress — {savedAnswerCount} of {questionCount} answered
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => router.push(testUrl)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded text-white font-black text-sm tracking-wide hover:opacity-90 transition-opacity ${accentBg}`}
                  >
                    <PlayCircle className="w-4 h-4" />
                    Resume Test
                  </button>
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded border-2 border-gray-300 bg-white text-gray-700 font-black text-sm tracking-wide hover:border-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    New Test
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => router.push(testUrl)}
                className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded text-white font-semibold text-base tracking-wide hover:opacity-90 active:opacity-80 transition-opacity ${accentBg}`}
              >
                <PlayCircle className="w-4 h-4" />
                {isFrqPreview ? 'Begin FRQ pack' : 'Begin test'}
              </button>
            )}
            <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1.5">
              <Clock className="w-3 h-3" />
              {timeLabel} · {questionCount} {isFrqPreview ? 'FRQs' : 'questions'}
            </p>
          </div>
        </div>
      </div>

      {/* Confirm new test modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-50 border-2 border-black rounded-md shadow-2xl max-w-sm w-full p-8">
            <div className="flex items-center gap-3 mb-3">
              <Image src="/images/dojoIconJan26.svg" alt="AP Dojo" width={28} height={28} unoptimized />
              <h3 className="text-lg font-black text-gray-900">Start a new test?</h3>
            </div>
            <p className="text-gray-600 font-medium mb-6 leading-relaxed">
              Starting a new test will clear your previous progress for this unit. This cannot be undone. Do you wish to proceed?
            </p>
            <div className="flex flex-col gap-3">
              <button
                disabled={isClearing}
                onClick={async () => {
                  setIsClearing(true);
                  if (user) await clearTestProgress(user.uid, testId);
                  setSavedAnswerCount(null);
                  setShowConfirmModal(false);
                  setIsClearing(false);
                  router.push(`${testUrl}?fresh=1`);
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black rounded-md border-2 border-red-800 tracking-wide transition-colors disabled:opacity-50"
              >
                {isClearing ? 'Clearing…' : 'Yes, start fresh'}
              </button>
              <button
                disabled={isClearing}
                onClick={() => setShowConfirmModal(false)}
                className="w-full py-3 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-700 font-bold rounded-md tracking-wide transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function UnitTestPreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-800" />
      </div>
    }>
      <UnitTestPreviewContent />
    </Suspense>
  );
}
