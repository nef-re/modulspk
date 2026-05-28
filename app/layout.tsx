import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import CookieConsent from '@/components/CookieConsent'
import Footer from '@/components/Footer'
import GradientOrbs from '@/components/GradientOrbs'
import Header from '@/components/Header'
import { company, seo } from '@/lib/site'
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
    title: `${company.name} — вентиляция и электрика | ${company.city}`,
    description: `${company.name} — проектирование, СМР, ПНР, производство. Вентиляция и электрика в ${company.city}.`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${company.name} — вентиляция и электрика`,
    description: `Проектирование, монтаж, ПНР, производство в ${company.city}.`,
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: company.siteUrl,
    telephone: company.phone,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address,
      addressLocality: company.city,
      addressCountry: 'RU',
    },
  }

  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: company.name,
    url: company.siteUrl,
    image: `${company.siteUrl}/favicon.png`,
    telephone: company.phone,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address,
      addressLocality: company.city,
      postalCode: '634507',
      addressCountry: 'RU',
    },
    areaServed: ['Томск', 'Томская область'],
    openingHours: 'Mo-Fr 09:00-18:00',
  }

  return (
    <html lang="ru" className={manrope.variable}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
        />
        <GradientOrbs />
        <Header />
        <main className="flex-1 pt-[var(--header-h)]">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
