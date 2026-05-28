import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import Footer from '@/components/Footer'
import GradientOrbs from '@/components/GradientOrbs'
import Header from '@/components/Header'
import { company } from '@/lib/site'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: `${company.name} — вентиляция и электрика | ${company.city}`,
    template: `%s | ${company.shortName}`,
  },
  description: `${company.name} — проектирование, СМР, ПНР, производство. Вентиляция и электрика в ${company.city}.`,
  alternates: { canonical: company.siteUrl },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="flex min-h-screen flex-col">
        <GradientOrbs />
        <Header />
        <main className="flex-1 pt-[var(--header-h)]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
