import type { Metadata } from 'next';
import { getLessonData } from '@/data/lessonRegistry';
import { macroLessonMetadata } from '@/lib/macroLessonMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; rest?: string[] }>;
}): Promise<Metadata> {
  const { slug, rest } = await params;
  if (rest?.length === 2 && rest[0].startsWith('unit-')) {
    const unit = rest[0].replace(/^unit-/, '');
    const lessonSlug = rest[1];
    if (slug === 'ap-macro' && getLessonData(slug, unit, lessonSlug)) {
      return macroLessonMetadata(unit, lessonSlug);
    }
  }
  return {};
}

export default function SlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
