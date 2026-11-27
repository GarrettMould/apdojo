'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { bestExplainerForLesson, type LessonExplainer } from '@/lib/lessonContent';
import { trackEvent } from '@/lib/analytics';
import headshot from '../../../public/images/Headshot.jpg';

/** Which question each lesson's hint is attached to this session, so it shows at most once per lesson. */
const STORAGE_KEY = 'apdojo:guideHints';

function readShown(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}') as Record<string, string>;
  } catch {
    return {};
  }
}

/** The link text for each kind of explainer. */
export function explainerLinkText(e: LessonExplainer): string {
  if (e.kind === 'guide') return `Garrett explains ${e.lesson} →`;
  if (e.kind === 'article') return `Read: ${e.title} →`;
  return `Walk through lesson ${e.lesson} →`;
}

/**
 * After a wrong answer: one quiet line pointing to the best explanation of the question's lesson (a guide,
 * else a blog article, else the Macro lesson walkthrough). Shown only on the first missed question per
 * lesson per browser session.
 */
export function GuideHint({
  subject,
  lessonIds,
  questionId,
  source,
}: {
  subject: string | readonly string[] | null | undefined;
  lessonIds: readonly string[] | null | undefined;
  questionId: string | number;
  /** Where it was shown, for analytics (e.g. "unit-practice"). */
  source: string;
}) {
  const explainer = useMemo(() => bestExplainerForLesson(subject, lessonIds), [subject, lessonIds]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!explainer) return;
    const key = `${explainer.course}:${explainer.lesson}`;
    const shown = readShown();
    const owner = shown[key];
    // The question that first showed it keeps it (re-renders, revisiting); other questions don't repeat it.
    if (owner && owner !== String(questionId)) return;
    setVisible(true);
    if (!owner) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...shown, [key]: String(questionId) }));
      } catch {
        // Private browsing etc.: it may show again on the next miss; harmless.
      }
      void trackEvent('guide_hint_shown', { lesson: explainer.lesson, course: explainer.course, kind: explainer.kind, source });
    }
  }, [explainer, questionId, source]);

  if (!explainer || !visible) return null;

  return (
    <a
      href={explainer.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => void trackEvent('guide_hint_click', { lesson: explainer.lesson, course: explainer.course, kind: explainer.kind, source })}
      className="mt-3 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-blue-700"
    >
      {explainer.kind === 'guide' ? (
        <Image src={headshot} alt="" width={20} height={20} className="h-5 w-5 rounded-full object-cover object-[50%_0%]" />
      ) : (
        <BookOpen className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
      )}
      <span>
        Still fuzzy on this? <span className="font-semibold text-blue-600">{explainerLinkText(explainer)}</span>
      </span>
    </a>
  );
}
