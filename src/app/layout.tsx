import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext'
import { LayoutClientWrapper } from '@/components/LayoutClientWrapper'
import { LayoutWrapper } from '@/components/LayoutWrapper'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] });

/** Google Ads / conversion measurement — set in .env to disable in dev: leave unset uses this ID */
const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? 'AW-18008787960';

// Default metadata for the site
export const metadata: Metadata = {
  metadataBase: new URL('https://apdojo.com'),
  title: {
    default: 'AP Dojo | Free Economics Study Resources',
    template: '%s | AP Dojo',
  },
  description: 'Free AP Macroeconomics and Microeconomics study guides, practice tests, and questions. Achieve top scores with comprehensive exam prep resources.',
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
    title: 'AP Dojo | Free Economics Study Resources',
    description: 'Free AP Macroeconomics and Microeconomics study guides, practice tests, and questions. Achieve top scores with comprehensive exam prep resources.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Dojo | Free Economics Study Resources',
    description: 'Free AP Macroeconomics and Microeconomics study guides, practice tests, and questions. Achieve top scores with comprehensive exam prep resources.',
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet" />
        {/* Google tag (gtag.js) — one tag sitewide; enables Ads conversion measurement */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-ads-gtag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ADS_ID}');
            `,
          }}
        />
        <Script
          id="ms-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "vuk1ilkluo");`,
          }}
        />
      </head>
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
