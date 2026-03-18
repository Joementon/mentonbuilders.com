import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Menton Builders — Builders Building What Matters',
  description:
    'Design-build rooted in experience, guided by clarity, and built to perform. Serving Mendocino & Sonoma Counties with over 50 years of experience.',
  keywords: [
    'Menton Builders',
    'construction',
    'design-build',
    'Mendocino County',
    'Sonoma County',
    'Healdsburg',
    'custom homes',
    'renovations',
    'ADU',
    'commercial construction',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
