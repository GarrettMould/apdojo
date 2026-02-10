import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changes in AD-AS Model Deep Dive: Understanding Short-Run Economic Changes | AP Dojo',
  description: 'Master how changes in aggregate demand and short-run aggregate supply affect price level and real GDP in the short run. Learn about demand and supply shocks.',
  openGraph: {
    title: 'Changes in AD-AS Model Deep Dive: Understanding Short-Run Economic Changes | AP Dojo',
    description: 'Master how changes in aggregate demand and short-run aggregate supply affect price level and real GDP in the short run.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-3/changes-ad-as-short-run',
  },
};

export default function ChangesADASShortRunDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
