import type { Metadata } from 'next';
import { macroLessonMetadata } from '@/lib/macroLessonMetadata';

export const metadata: Metadata = macroLessonMetadata('2', 'limitations-gdp');

export default function LimitationsGdpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
