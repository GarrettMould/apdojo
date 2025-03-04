import './globals.css'
import type { Metadata } from 'next'

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
      <body>
        {children}
      </body>
    </html>
  )
}
