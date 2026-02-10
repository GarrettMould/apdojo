import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automatic Stabilizers Deep Dive: Understanding Built-In Economic Stabilizers | AP Dojo',
  description: 'Master automatic stabilizers and understand how programs like unemployment insurance and progressive taxes automatically help stabilize the economy during economic fluctuations.',
  openGraph: {
    title: 'Automatic Stabilizers Deep Dive: Understanding Built-In Economic Stabilizers | AP Dojo',
    description: 'Master automatic stabilizers and understand how programs automatically help stabilize the economy during economic fluctuations.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-3/automatic-stabilizers',
  },
};

export default function AutomaticStabilizersDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
