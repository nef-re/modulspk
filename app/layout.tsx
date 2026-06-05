import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import CookieConsent from '@/components/CookieConsent'
import YandexMetrika from '@/components/YandexMetrika'
import Footer from '@/components/Footer'
import GradientOrbs from '@/components/GradientOrbs'
import Header from '@/components/Header'
import JsonLd from '@/components/JsonLd'
import { company, seo } from '@/lib/site'
import {
  hvacBusinessJsonLd,
  organizationJsonLd,
  webSiteJsonLd,
} from '@/lib/structured-data'
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
    default: `Вентиляция и электрика — проект, СМР, ПНР | ${company.shortName}`,
    template: `%s | ${company.shortName}`,
  },
  description: `${company.name} — проектирование по России, СМР и ПНР в Томске и Томском районе. Собственное производство вентиляционного оборудования в Томске.`,
  keywords: [...seo.defaultKeywords],
  category: 'business',
  alternates: { canonical: company.siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: company.siteUrl,
    siteName: company.shortName,
    title: `Вентиляция и электрика — проект, СМР, ПНР | ${company.shortName}`,
    description: `${company.name} — проектирование по России, монтаж и ПНР в Томске и Томском районе.`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Вентиляция и электрика — ${company.shortName}`,
    description: `Проектирование по России, монтаж и ПНР. Собственное производство в Томске.`,
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={hvacBusinessJsonLd()} />
        <JsonLd data={webSiteJsonLd()} />
        <GradientOrbs />
        <Header />
        <div className="flex min-h-0 flex-1 flex-col overflow-x-clip">
          <main className="flex-1 pt-[var(--header-h)]">{children}</main>
          <Footer />
        </div>
        <CookieConsent />
        <YandexMetrika />
      </body>
    </html>
  )
}
