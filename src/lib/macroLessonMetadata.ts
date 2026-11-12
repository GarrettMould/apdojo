import type { Metadata } from 'next';
import { getLessonData } from '@/data/lessonRegistry';
import { MACRO_GUIDED_LESSONS, macroLessonName } from '@/data/guidedLessons/lessonLinks';
import { macroLessonHref } from '@/data/macroLessonPages';

export function macroLessonMetadata(unit: string, slug: string): Metadata {
  const data = getLessonData('ap-macro', unit, slug);
  if (!data) {
    return { title: 'Lesson Not Found' };
  }

  const title = `AP Macro ${data.id}: ${data.title}`;
  const description = data.instantAnswer.blurb.trim()
    ? data.instantAnswer.blurb.trim()
    : `Free AP Macroeconomics Unit ${unit} lesson on ${data.title}. Review key terms, graphs, and exam-style practice.`;
  const url = `https://apdojo.com/ap-macro/unit-${unit}/${slug}`;

  return {
    title,
    description,
    openGraph: { title, description, url },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: url },
  };
}

/** Cut text to whole sentences that fit a search snippet (falls back to whole words). */
function snippet(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const sentences = clean.match(/[^.!?]+[.!?]+/g) ?? [];
  let out = '';
  for (const sentence of sentences) {
    const next = (out + sentence).trim();
    if (next.length > max) break;
    out = next + ' ';
  }
  out = out.trim();
  if (out) return out;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
}

/**
 * Title and description for an AP Macro lesson URL, e.g. "AP Macro 2.3: Unemployment".
 * The description comes from the explainer's written lesson.
 */
export function macroLessonPageMetadata(lessonId: string): Metadata {
  const unit = lessonId.split('.')[0];
  const name = macroLessonName(lessonId);
  const brief = MACRO_GUIDED_LESSONS.find((l) => l.lessonId === lessonId)?.brief;
  const title = `AP Macro ${lessonId}: ${name}`;
  const description = brief
    ? snippet(brief)
    : `Free AP Macroeconomics Unit ${unit} lesson on ${name}. Review key terms, graphs, and exam-style practice.`;
  const url = `https://apdojo.com${macroLessonHref(lessonId)}`;

  return {
    title,
    description,
    openGraph: { title, description, url },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: url },
  };
}
