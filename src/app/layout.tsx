import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext'
import { LayoutClientWrapper } from '@/components/LayoutClientWrapper'
import { LayoutWrapper } from '@/components/LayoutWrapper'

const inter = Inter({ subsets: ['latin'] });

// Default metadata for the site
export const metadata: Metadata = {
  metadataBase: new URL('https://apdojo.com'),
  title: {
    default: 'AP Dojo | AP Macroeconomics and AP Microeconomics Study Resources',
    template: '%s | AP Dojo',
  },
  description: 'Unlock top AP scores with AP Dojo. Free AP Macroeconomics and AP Microeconomics study guides, cheat sheets, practice tests, and practice questions. Comprehensive exam prep resources.',
  keywords: [
    'AP Macroeconomics',
    'AP Microeconomics',
    'AP Economics',
    'AP exam prep',
    'AP study guide',
    'AP practice tests',
    'AP economics cheat sheet',
    'AP economics review',
    'AP exam practice questions',
    'free AP study materials',
  ],
  authors: [{ name: 'AP Dojo' }],
  creator: 'AP Dojo',
  publisher: 'AP Dojo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://apdojo.com',
    siteName: 'AP Dojo',
    title: 'AP Dojo | AP Macroeconomics and AP Microeconomics Study Resources',
    description: 'Unlock top AP scores with AP Dojo. Free AP Macroeconomics and AP Microeconomics study guides, cheat sheets, practice tests, and practice questions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Dojo | AP Macroeconomics and AP Microeconomics Study Resources',
    description: 'Unlock top AP scores with AP Dojo. Free AP Macroeconomics and AP Microeconomics study guides, cheat sheets, practice tests, and practice questions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

// Remove the old LayoutClientContent definition entirely
/*
'use client'; 
function LayoutClientContent({ children }: { children: React.ReactNode }) {
  // ... removed ...
}
*/

// RootLayout remains a Server Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LayoutWrapper>
            <LayoutClientWrapper>
              {children}
            </LayoutClientWrapper>
          </LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
