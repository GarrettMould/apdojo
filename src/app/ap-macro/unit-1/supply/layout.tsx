import type { Metadata } from 'next';
import { macroLessonMetadata } from '@/lib/macroLessonMetadata';

export const metadata: Metadata = macroLessonMetadata('1', 'supply');

export default function SupplyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
