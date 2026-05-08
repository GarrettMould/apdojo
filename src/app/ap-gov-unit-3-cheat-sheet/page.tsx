import UnitPage from '@/app/unit/[unitId]/page';
import type { Metadata } from 'next';
import { govUnits } from '@/data/cheatSheets';

const unit = govUnits.find((u) => u.number === 3)!;

export const metadata: Metadata = {
  title: `AP Gov Unit 3 Cheat Sheet: ${unit.title} | AP Dojo`,
  description:
    `Free AP U.S. Government Unit 3 cheat sheet covering ${unit.title}. Review key terms, definitions, required cases, and unit-aligned practice.`,
  openGraph: {
    title: `AP Gov Unit 3 Cheat Sheet: ${unit.title} | AP Dojo`,
    description: `Free AP U.S. Government Unit 3 cheat sheet covering ${unit.title}.`,
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-gov-unit-3-cheat-sheet',
  },
};

export default function APGovUnit3CheatSheetPage() {
  return <UnitPage unitNumber={3} subject="gov" />;
}
