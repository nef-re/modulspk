import { legal } from '@/lib/legal'

export type CookieConsentValue = 'accepted' | 'essential_only'

export const COOKIE_CONSENT_EVENT = 'modulspk:cookie-consent'

export function getCookieConsent(): CookieConsentValue | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(legal.cookieStorageKey)
    if (stored === 'accepted' || stored === 'essential_only') return stored
    return null
  } catch {
    return null
  }
}

/**
 * Яндекс.Метрика работает по уведомлению: до выбора в баннере и после «Принять».
 * Отключается только явным отказом («Только необходимые»).
 */
export function isMetrikaAllowed(): boolean {
  return getCookieConsent() !== 'essential_only'
}

export function notifyCookieConsent(value: CookieConsentValue) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }))
}
