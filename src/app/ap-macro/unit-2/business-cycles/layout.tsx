import type { Metadata } from 'next';
import { macroLessonMetadata } from '@/lib/macroLessonMetadata';

export const metadata: Metadata = macroLessonMetadata('2', 'business-cycles');

export default function BusinessCyclesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
