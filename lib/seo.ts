import type { Metadata } from 'next'
import { company } from '@/lib/site'

/** Картинка превью для соцсетей/мессенджеров (генерируется: npm run og-image). */
export const OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: `${company.name} — ${company.tagline.toLowerCase()}`,
}

/**
 * Метаданные страницы: title, description, собственный canonical и Open Graph.
 * Canonical обязательно у каждой страницы — иначе поисковики считают её дублем главной.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string
  description: string
  /** Путь страницы от корня сайта, например `/smr` (для главной — `/`). */
  path: string
  keywords?: readonly string[]
}): Metadata {
  const fullTitle = `${title} | ${company.shortName}`
  return {
    title,
    description,
    ...(keywords ? { keywords: [...keywords] } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      siteName: company.shortName,
      url: path,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  }
}
