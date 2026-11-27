import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Printable AP Economics FRQ Packet',
  description:
    'Every AP Macro or AP Micro practice FRQ as a print-ready booklet: one question per page, answer space, blank graph frames and scoring guides.',
};

export default function FrqPacketLayout({ children }: { children: ReactNode }) {
  return children;
}
