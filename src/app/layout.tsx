import './globals.css'
import type { Metadata } from 'next'
import { HeaderWrapper } from '@/components/header-wrapper'
import { Footer } from '@/components/Footer'
import { PageContainer } from '@/components/ui/page-container'
import { AuthProvider } from '@/contexts/AuthContext'

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
        <AuthProvider>
          <HeaderWrapper />
          <main className="flex-1">
            <PageContainer>
              {children}
            </PageContainer>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
