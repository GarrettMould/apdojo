import './globals.css'
import type { Metadata } from 'next'
import { HeaderWrapper } from '@/components/header-wrapper'
import { Footer } from '@/components/Footer'
import { PageContainer } from '@/components/ui/page-container'

export const metadata: Metadata = {
  title: 'APDojo',
  description: 'AP Economics Exam Prep',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <HeaderWrapper />
        <main className="flex-1">
          <PageContainer>
            {children}
          </PageContainer>
        </main>
        <Footer />
      </body>
    </html>
  )
}
