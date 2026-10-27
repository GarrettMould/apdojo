import type { Metadata } from 'next';
import { getLessonData } from '@/data/lessonRegistry';

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
