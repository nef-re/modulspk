'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { isYmEnabled, YM_COUNTER_ID } from '@/lib/analytics'
import {
  COOKIE_CONSENT_EVENT,
  hasAnalyticsConsent,
  type CookieConsentValue,
} from '@/lib/cookie-consent'

export default function YandexMetrika() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!isYmEnabled()) return undefined

    setEnabled(hasAnalyticsConsent())

    const onConsent = (event: Event) => {
      const value = (event as CustomEvent<CookieConsentValue>).detail
      setEnabled(value === 'accepted')
    }

    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent)
  }, [])

  if (!enabled || !isYmEnabled()) return null

  const id = YM_COUNTER_ID

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`(function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${id}', 'ym');

    window.dataLayer = window.dataLayer || [];
    ym(${id}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});`}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${id}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  )
}
