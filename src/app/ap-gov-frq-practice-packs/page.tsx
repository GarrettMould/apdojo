'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FullExamFRQ } from '@/components/FullExamFRQ';
import { getGovUnitStimulusFrqs } from '@/data/gov/govUnitStimulusFrqs';

function buildGovPackQuestions() {
  const unitOnePack = getGovUnitStimulusFrqs(1);
  return {
    examTitle: 'AP Gov FRQ Pack (3 Questions)',
    questions: unitOnePack.map((frq, idx) => ({
      questionNumber: idx + 1,
      prompt: frq.stimulus
        ? `${frq.title}\n\nStimulus:\n${frq.stimulus}\n\nTask:\n${frq.prompt}`
        : `${frq.title}\n\nTask:\n${frq.prompt}`,
      parts: frq.tasks.map((task, taskIdx) => ({
        label: String.fromCharCode(65 + taskIdx),
        text: task,
        answerType: 'text' as const,
      })),
    })),
  };
}

export default function ApGovFrqPracticePacksPage() {
  const govPack = buildGovPackQuestions();

  if (govPack.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-14">
        <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-black text-gray-900">AP Gov FRQ Pack Coming Soon</h1>
          <p className="mt-3 text-gray-600">No AP Gov FRQ pack questions are available yet.</p>
          <Link
            href="/unit-final-practice-tests?subject=gov"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 font-bold text-white hover:bg-violet-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to AP Gov Practice Tests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="mx-auto max-w-5xl px-4 pt-6">
        <Link
          href="/unit-final-practice-tests?subject=gov"
          className="inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm font-bold text-violet-800 hover:bg-violet-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to AP Gov Practice Tests
        </Link>
        <div className="mt-4 rounded-2xl border border-violet-200 bg-white/90 p-5 shadow-sm">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            AP Gov FRQ Pack
          </h1>
          <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
            Three AP-style stimulus FRQs with cleaner prompts and part-by-part typing space.
            Use this like the macro/micro FRQ flow: move question to question, then submit.
          </p>
        </div>
      </div>
      <FullExamFRQ
        questions={govPack}
        examType="gov"
        backUrl="/unit-final-practice-tests?subject=gov"
      />
    </div>
  );
}

