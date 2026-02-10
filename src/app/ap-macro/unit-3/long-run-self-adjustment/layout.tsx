import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Long-Run Self-Adjustment Deep Dive: Understanding Economic Recovery | AP Dojo',
  description: 'Master how the economy self-adjusts in the long run after short-run shocks. Learn about the automatic return to full employment and potential output.',
  openGraph: {
    title: 'Long-Run Self-Adjustment Deep Dive: Understanding Economic Recovery | AP Dojo',
    description: 'Master how the economy self-adjusts in the long run after short-run shocks and returns to full employment.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-3/long-run-self-adjustment',
  },
};

export default function LongRunSelfAdjustmentDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
