import type { Metadata } from 'next';
import { UnitResourceLibraryPage } from '@/components/UnitResourceLibraryPage';

export const metadata: Metadata = {
  title: 'Printable Unit Cheat Sheets | AP Dojo',
  description:
    'Printable AP Economics unit cheat sheets. One-page, high-yield review sheets for AP Macro units.',
  alternates: {
    canonical: 'https://apdojo.com/unit-cheat-sheets',
  },
};

export default function UnitCheatSheetsPage() {
  return <UnitResourceLibraryPage copyMode="cheat-sheets" />;
}

