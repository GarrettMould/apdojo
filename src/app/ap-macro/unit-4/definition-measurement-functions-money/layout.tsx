import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Definition, Measurement, and Functions of Money Deep Dive | AP Dojo',
  description: 'Master the definition of money, how it is measured (M1 and M2), and the three key functions of money: medium of exchange, unit of account, and store of value.',
  openGraph: {
    title: 'Definition, Measurement, and Functions of Money Deep Dive | AP Dojo',
    description: 'Master the definition of money, how it is measured, and the three key functions of money.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-4/definition-measurement-functions-money',
  },
};

export default function DefinitionMeasurementFunctionsMoneyDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
