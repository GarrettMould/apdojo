import './globals.css'
import type { Metadata } from 'next'
import { Inter, Permanent_Marker } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext'
import { LayoutClientWrapper } from '@/components/LayoutClientWrapper'
import { LayoutWrapper } from '@/components/LayoutWrapper'
import Script from 'next/script'
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_TITLE } from '@/lib/siteMetadata';
const inter = Inter({ subsets: ['latin'] });
const permanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-permanent-marker',
  display: 'swap',
});

// Default metadata for the site
export const metadata: Metadata = {
  metadataBase: new URL('https://apdojo.com'),
  title: {
    default: SITE_TITLE,
    template: '%s | AP Dojo',
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://apdojo.com',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
        <Script
          id="ms-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "vuk1ilkluo");`,
          }}
        />
      </head>
      <Script id="google-ads-tag" strategy="lazyOnload">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','AW-18008787960');`}
      </Script>
      <body className={`${inter.className} ${permanentMarker.variable}`}>
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
