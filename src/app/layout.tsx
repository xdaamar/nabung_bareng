import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Couple Saving 💗',
  description: 'Web nabung bareng untuk pasangan',
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
