/** Юридические документы сайта (152-ФЗ, рекомендации Роскомнадзора). */
export const legal = {
  /** Дата последнего обновления документов (отображается на страницах). */
  lastUpdated: '28.05.2026',
  cookieStorageKey: 'modulspk_cookie_consent_v1',
  links: {
    privacy: '/privacy',
    cookies: '/cookies',
    consent: '/consent',
  },
  roskomnadzor: {
    name: 'Роскомнадзор',
    url: 'https://rkn.gov.ru/',
    address: '109074, г. Москва, Китайгородский проезд, д. 7, стр. 2',
  },
} as const

export const legalNav = [
  { href: legal.links.privacy, label: 'Политика обработки ПДн' },
  { href: legal.links.cookies, label: 'Политика cookie' },
  { href: legal.links.consent, label: 'Согласие на обработку ПДн' },
] as const
