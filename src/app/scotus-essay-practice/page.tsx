import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import {
  pickRandomScotusPracticeCaseId,
  scotusPracticeCasePath,
} from '@/data/gov/scotusRequiredCases';

export const metadata: Metadata = {
  title: 'SCOTUS Comparison Practice | AP Gov | AP Dojo',
  description:
    'Practice AP Gov SCOTUS comparison FRQs for all 14 required Supreme Court cases.',
};

export const dynamic = 'force-dynamic';

/** Entry from nav — land on a random live case instead of a hub list. */
export default function ScotusEssayPracticeHubPage() {
  redirect(scotusPracticeCasePath(pickRandomScotusPracticeCaseId()));
}
