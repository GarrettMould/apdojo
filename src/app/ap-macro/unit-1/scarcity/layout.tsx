import type { Metadata } from 'next';
import { macroLessonMetadata } from '@/lib/macroLessonMetadata';

export const metadata: Metadata = macroLessonMetadata('1', 'scarcity');

export default function ScarcityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
