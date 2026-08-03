import type { Metadata } from 'next'
import './globals.css'
import { validateEnv } from '@/lib/env'

validateEnv()

export const metadata: Metadata = {
  title: 'Couple Saving 💗',
  description: 'Web nabung bareng untuk pasangan',
  applicationName: 'Couple Saving',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
