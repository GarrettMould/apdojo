'use client';

import { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { bestExplainerForLesson, type LessonExplainer } from '@/lib/lessonContent';
import { trackEvent } from '@/lib/analytics';
import headshot from '../../../public/images/Headshot.jpg';

interface ResultQuestion {
  id: number | string;
  subject?: string | readonly string[] | null;
  lessonIDS?: readonly string[] | null;
  correctAnswer?: string | null;
}

/**
 * On a test's results screen: one line per lesson with missed questions that has something to read, e.g.
 * "You missed 3 questions on 3.2 Short-Run Production Costs. Garrett walks through it here."
 */
export function GuideResultsHint({
  questions,
  answers,
  source,
  includeLessonPages = true,
}: {
  questions: ResultQuestion[];
  /** The student's chosen letter, by question id. */
  answers: { [questionId: number]: string | undefined };
  source: string;
  /** Off where the screen already lists the Macro lesson walkthroughs, so they aren't shown twice. */
  includeLessonPages?: boolean;
}) {
  const missed = useMemo(() => {
    const byLesson = new Map<string, { explainer: LessonExplainer; count: number }>();
    for (const q of questions) {
      if (answers[q.id as number] === q.correctAnswer) continue;
      const explainer = bestExplainerForLesson(q.subject, q.lessonIDS, { includeLessonPages });
      if (!explainer) continue;
      const key = `${explainer.course}:${explainer.lesson}`;
      const entry = byLesson.get(key) ?? { explainer, count: 0 };
      entry.count += 1;
      byLesson.set(key, entry);
    }
    // Most-missed first; at most three lines so it stays a pointer, not a list.
    return [...byLesson.values()].sort((a, b) => b.count - a.count).slice(0, 3);
  }, [questions, answers, includeLessonPages]);

  useEffect(() => {
    for (const { explainer, count } of missed) {
      void trackEvent('guide_hint_shown', { lesson: explainer.lesson, course: explainer.course, kind: explainer.kind, source, missed: count });
    }
    // Once per results screen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missed.length]);

  if (missed.length === 0) return null;

  return (
    <ul className="mt-4 flex w-full flex-col gap-2">
      {missed.map(({ explainer, count }) => (
        <li key={`${explainer.course}:${explainer.lesson}`}>
          <a
            href={explainer.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => void trackEvent('guide_hint_click', { lesson: explainer.lesson, course: explainer.course, kind: explainer.kind, source })}
            className="flex items-center gap-2.5 text-sm text-slate-600 transition hover:text-blue-700"
          >
            {explainer.kind === 'guide' ? (
              <Image src={headshot} alt="" width={22} height={22} className="h-[22px] w-[22px] shrink-0 rounded-full object-cover object-[50%_0%]" />
            ) : (
              <BookOpen className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
            )}
            <span>
              You missed {count} {count === 1 ? 'question' : 'questions'} on {explainer.lesson}
              {explainer.lessonName ? ` ${explainer.lessonName}` : ''}.{' '}
              <span className="font-semibold text-blue-600">
                {explainer.kind === 'guide'
                  ? 'Garrett walks through it here →'
                  : explainer.kind === 'article'
                    ? `Read: ${explainer.title} →`
                    : 'Review the lesson →'}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
