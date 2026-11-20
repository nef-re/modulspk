'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { GTM_ID, isGtmEnabled } from '@/lib/analytics'
import {
  COOKIE_CONSENT_EVENT,
  hasAnalyticsConsent,
  type CookieConsentValue,
} from '@/lib/cookie-consent'

/**
 * Google Tag Manager (Google Analytics 4 настраивается внутри контейнера).
 * Как и Метрика, загружается только после согласия на аналитические cookie.
 */
export default function GoogleTagManager() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!isGtmEnabled()) return undefined

    setEnabled(hasAnalyticsConsent())

    const onConsent = (event: Event) => {
      const value = (event as CustomEvent<CookieConsentValue>).detail
      setEnabled(value === 'accepted')
    }

    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent)
  }, [])

  if (!enabled || !isGtmEnabled()) return null

  return (
    <Script id="google-tag-manager" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  )
}
