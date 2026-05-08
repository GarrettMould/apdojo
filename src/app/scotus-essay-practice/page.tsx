import type { Metadata } from 'next';
import ScotusEssayPracticeHubClient from './ScotusEssayPracticeHubClient';

export const metadata: Metadata = {
  title: 'SCOTUS Essay Practice | AP Gov | AP Dojo',
  description:
    'Choose from 15 AP Gov SCOTUS comparison FRQ prompts and practice structured constitutional analysis.',
};

export default function ScotusEssayPracticeHubPage() {
  return <ScotusEssayPracticeHubClient />;
}
