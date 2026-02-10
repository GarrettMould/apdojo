import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Monetary Policy Deep Dive: Understanding Central Bank Tools | AP Dojo',
  description: 'Master monetary policy and the tools the central bank uses to influence the money supply and interest rates. Learn about open market operations, reserve requirements, and the discount rate.',
  openGraph: {
    title: 'Monetary Policy Deep Dive: Understanding Central Bank Tools | AP Dojo',
    description: 'Master monetary policy and the tools the central bank uses to influence the money supply and interest rates.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-4/monetary-policy',
  },
};

export default function MonetaryPolicyDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
