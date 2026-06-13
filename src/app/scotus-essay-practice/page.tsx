import type { Metadata } from 'next';
import ScotusEssayPracticeHubClient from './ScotusEssayPracticeHubClient';

export const metadata: Metadata = {
  title: 'SCOTUS Comparison Practice | AP Gov | AP Dojo',
  description:
    'Practice AP Gov SCOTUS comparison FRQs for all 14 required Supreme Court cases.',
};

export default function ScotusEssayPracticeHubPage() {
  return <ScotusEssayPracticeHubClient />;
}
