import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Roboto_Flex } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

// Variable font — wdth (75–125) + wght (100–1000) axes
// Used exclusively for the hero "1789" display
const robotoFlex = Roboto_Flex({
  variable: '--font-variable',
  subsets: ['latin'],
  axes: ['wdth', 'opsz'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: '1789 Management Consulting — Wie verändern Systeme für die Zukunft',
  description: 'Structure · Strategy · Gap Consulting. Wir begleiten Organisationen durch Wandel — strukturell, strategisch, wirksam.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${inter.variable} ${robotoFlex.variable}`}>
      <body className="antialiased bg-background text-ink">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
