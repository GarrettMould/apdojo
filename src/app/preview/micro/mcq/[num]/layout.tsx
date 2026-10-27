import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ num: string }>;
}): Promise<Metadata> {
  const { num } = await params;
  const title = `AP Microeconomics MCQ Practice Test ${num}`;
  const description =
    'Full-length AP Microeconomics multiple-choice practice exam with explanations. Preview the first questions free.';
  const url = `https://apdojo.com/ap-micro-mcq-practice-test-${num}`;

  return {
    title,
    description,
    openGraph: { title, description, url },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: url },
  };
}

export default function MicroMcqPreviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
