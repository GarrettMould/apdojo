import type { Metadata } from 'next';
import { UnitResourceLibraryPage } from '@/components/UnitResourceLibraryPage';

export const metadata: Metadata = {
  title: 'Printable Unit Study Guides',
  description:
    'Printable one-page AP review guides. Interactive unit pages are also available for Macro, Micro, Gov, and Stats.',
  alternates: {
    canonical: 'https://apdojo.com/unit-cheat-sheets',
  },
};

export default function UnitStudyGuidesPage() {
  return <UnitResourceLibraryPage copyMode="study-guides" />;
}

