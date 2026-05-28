'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { legal } from '@/lib/legal'

type ConsentValue = 'accepted' | 'essential_only'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(legal.cookieStorageKey)
      if (!stored) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  function save(value: ConsentValue) {
    try {
      localStorage.setItem(legal.cookieStorageKey, value)
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-white/95 p-4 shadow-[0_-8px_32px_rgb(11_31_53/0.12)] backdrop-blur-sm sm:p-5"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="container-site flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p id="cookie-consent-title" className="text-sm font-bold text-text">
            Использование файлов cookie
          </p>
          <p id="cookie-consent-desc" className="mt-1 text-sm text-text-muted">
            Сайт использует обязательные cookie для корректной работы. Продолжая пользоваться
            сайтом, вы соглашаетесь с{' '}
            <Link href={legal.links.cookies} className="text-brand underline-offset-2 hover:underline">
              политикой использования cookie
            </Link>{' '}
            и{' '}
            <Link href={legal.links.privacy} className="text-brand underline-offset-2 hover:underline">
              политикой обработки персональных данных
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => save('essential_only')}
            className="rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-text-muted transition hover:border-brand hover:text-brand"
          >
            Только необходимые
          </button>
          <button
            type="button"
            onClick={() => save('accepted')}
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-hover"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  )
}
