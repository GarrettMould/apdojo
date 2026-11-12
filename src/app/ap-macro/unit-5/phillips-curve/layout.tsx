import type { Metadata } from 'next';
import { macroLessonPageMetadata } from '@/lib/macroLessonMetadata';

export const metadata: Metadata = macroLessonPageMetadata('5.2');

export default function LessonLayout({ children }: { children: React.ReactNode }) {
  return children;
}
