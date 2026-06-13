import type { Metadata } from 'next';
import { scotusEssayPrompts } from '@/data/gov/scotusEssayPrompts';
import ScotusEssayPracticeClient from './ScotusEssayPracticeClient';

type PageProps = {
  params: Promise<{
    caseName: string;
  }>;
};

export function generateStaticParams() {
  return scotusEssayPrompts.map((prompt) => ({ caseName: prompt.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { caseName } = await params;
  const prompt = scotusEssayPrompts.find((item) => item.id === caseName);
  const caseTitle = prompt?.requiredCase ?? 'SCOTUS Comparison Practice';

  return {
    title: `${caseTitle} | SCOTUS Comparison Practice | AP Dojo`,
    description:
      'Practice AP Gov SCOTUS comparison FRQs with scaffolded prompts, A/B/C task flow, and structured writing support.',
  };
}

export default async function ScotusEssayPracticePage({ params }: PageProps) {
  const { caseName } = await params;
  return <ScotusEssayPracticeClient caseName={caseName} />;
}
