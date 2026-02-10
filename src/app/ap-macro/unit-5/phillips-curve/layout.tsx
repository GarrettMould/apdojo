import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Phillips Curve Deep Dive | AP Dojo',
  description: 'Master the Short-Run and Long-Run Phillips Curves. Understand the trade-off between inflation and unemployment and how policy affects both curves.',
  openGraph: {
    title: 'The Phillips Curve Deep Dive | AP Dojo',
    description: 'Master the Short-Run and Long-Run Phillips Curves and the trade-off between inflation and unemployment.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-5/phillips-curve',
  },
};

export default function PhillipsCurveDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
