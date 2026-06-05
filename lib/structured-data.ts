import {
  company,
  projects,
  sroMemberships,
  type ProjectItem,
} from '@/lib/site'
import type { FaqItem } from '@/lib/site'

export const ORGANIZATION_ID = `${company.siteUrl}/#organization`

type BreadcrumbItem = { href: string; label: string }

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: company.name,
    alternateName: company.shortName,
    url: company.siteUrl,
    logo: `${company.siteUrl}/logo.png`,
    image: `${company.siteUrl}/logo.png`,
    telephone: [company.phone, company.phone2],
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address,
      addressLocality: company.city,
      postalCode: '634507',
      addressCountry: 'RU',
    },
    sameAs: [
      company.map2gisUrl,
      ...sroMemberships.map((s) => s.site),
    ],
    knowsAbout: [
      'вентиляция',
      'проектирование ИОС 5.4',
      'проектирование ИОС 5.1',
      'проектирование ОВ',
      'проектирование АОВ',
      'проектирование ЭОМ',
      'проектирование ЭС',
      'проектирование ЭН',
      'электромонтаж',
      'пусконаладка',
      'производство вентиляционного оборудования',
      'строительно-монтажные работы',
    ],
  }
}

export function hvacBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': `${company.siteUrl}/#localbusiness`,
    name: company.name,
    url: company.siteUrl,
    image: `${company.siteUrl}/logo.png`,
    logo: `${company.siteUrl}/logo.png`,
    telephone: [company.phone, company.phone2],
    email: company.email,
    parentOrganization: { '@id': ORGANIZATION_ID },
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address,
      addressLocality: company.city,
      postalCode: '634507',
      addressCountry: 'RU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: company.mapLat,
      longitude: company.mapLon,
    },
    areaServed: { '@type': 'Country', name: 'Россия' },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '$$',
  }
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href.startsWith('http') ? item.href : `${company.siteUrl}${item.href}`,
    })),
  }
}

export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${company.siteUrl}${path}`,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: { '@type': 'Country', name: 'Россия' },
    serviceType: name,
  }
}

export function faqJsonLd(faq: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

export function projectsItemListJsonLd(projectItems: ProjectItem[] = projects) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Примеры работ ООО «Модуль»',
    numberOfItems: projectItems.length,
    itemListElement: projectItems.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        about: project.object,
        ...(project.photos?.[0]
          ? { image: `${company.siteUrl}${project.photos[0]}` }
          : {}),
      },
    })),
  }
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${company.siteUrl}/#website`,
    url: company.siteUrl,
    name: company.name,
    description: `${company.name} — ${company.tagline} в ${company.city}`,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'ru-RU',
  }
}
