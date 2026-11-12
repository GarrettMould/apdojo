import type { Metadata } from 'next';
import { macroLessonPageMetadata } from '@/lib/macroLessonMetadata';

export const metadata: Metadata = macroLessonPageMetadata('4.1');

export default function LessonLayout({ children }: { children: React.ReactNode }) {
  return children;
}
