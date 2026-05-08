import UnitPage from '@/app/unit/[unitId]/page';
import type { Metadata } from 'next';
import { govUnits } from '@/data/cheatSheets';

const unit = govUnits.find((u) => u.number === 2)!;

export const metadata: Metadata = {
  title: `AP Gov Unit 2 Cheat Sheet: ${unit.title} | AP Dojo`,
  description:
    `Free AP U.S. Government Unit 2 cheat sheet covering ${unit.title}. Review key terms, definitions, required cases, and unit-aligned practice.`,
  openGraph: {
    title: `AP Gov Unit 2 Cheat Sheet: ${unit.title} | AP Dojo`,
    description: `Free AP U.S. Government Unit 2 cheat sheet covering ${unit.title}.`,
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-gov-unit-2-cheat-sheet',
  },
};

export default function APGovUnit2CheatSheetPage() {
  return <UnitPage unitNumber={2} subject="gov" />;
}
