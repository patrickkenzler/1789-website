import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Studio · Name — Beratung mit Haltung',
  description: 'Eine Beratung, die denkt wie eine Designagentur. Strategie, Markenentwicklung und digitale Erfahrung.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased bg-background text-ink">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
