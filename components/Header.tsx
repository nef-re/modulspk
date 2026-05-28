'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/Button'
import { company, estimateCta, navLinks } from '@/lib/site'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-border bg-white/95 shadow-[0_2px_16px_rgb(11_31_53/0.06)] backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
      style={{ height: 'var(--header-h)' }}
    >
      <div className="container-site flex h-full items-center justify-between gap-4 lg:gap-6">
        <Link href="/" className="shrink-0">
          <Logo variant="header" showText={false} />
        </Link>

        <nav
          className={`fixed inset-0 top-[var(--header-h)] z-40 flex flex-col gap-8 bg-white p-6 transition-transform duration-300 lg:static lg:min-w-0 lg:flex-1 lg:flex-row lg:items-center lg:justify-center lg:bg-transparent lg:p-0 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
          }`}
          aria-label="Основная навигация"
        >
          <ul className="flex flex-col gap-1 lg:flex-row lg:flex-nowrap lg:items-center lg:justify-center lg:gap-x-0 xl:gap-x-1">
            {navLinks.map((link) => {
              const active =
                link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <li key={link.href} className="shrink-0">
                  <Link
                    href={link.href}
                    className={`block whitespace-nowrap px-2.5 py-2.5 lg:px-3 lg:py-2 xl:px-3.5 ${
                      active ? 'nav-link--active nav-link' : 'nav-link'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="flex flex-col gap-3 border-t border-border pt-6 lg:hidden">
            <a href={company.phoneHref} className="text-lg font-bold text-brand">
              {company.phone}
            </a>
            <Button href={estimateCta.href} full>
              {estimateCta.label}
            </Button>
          </div>
        </nav>

        <div className="hidden shrink-0 items-center gap-4 xl:gap-5 lg:flex">
          <a href={company.phoneHref} className="whitespace-nowrap text-sm font-bold text-text">
            {company.phone}
          </a>
          <Button href={estimateCta.href} size="sm">
            {estimateCta.label}
          </Button>
        </div>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className={`h-0.5 w-6 bg-text transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span className={`h-0.5 w-6 bg-text transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span
            className={`h-0.5 w-6 bg-text transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>
    </header>
  )
}
