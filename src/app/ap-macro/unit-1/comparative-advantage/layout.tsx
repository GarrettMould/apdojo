import type { Metadata } from 'next';
import { macroLessonMetadata } from '@/lib/macroLessonMetadata';

export const metadata: Metadata = macroLessonMetadata('1', 'comparative-advantage');

export default function ComparativeAdvantageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
