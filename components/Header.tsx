'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Logo from '@/components/Logo'
import MaxContactLink from '@/components/MaxContactLink'
import PhoneContactLink from '@/components/PhoneContactLink'
import { Button } from '@/components/ui/Button'
import { headerCta, navLinks } from '@/lib/site'

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <ul className="flex flex-col gap-1 lg:flex-row lg:flex-nowrap lg:items-center lg:justify-center lg:gap-x-0 xl:gap-x-1">
      {navLinks.map((link) => {
        const active =
          link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
        return (
          <li key={link.href} className="shrink-0">
            <Link
              href={link.href}
              onClick={onNavigate}
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
  )
}

function MobileMenu({
  open,
  pathname,
  onClose,
}: {
  open: boolean
  pathname: string
  onClose: () => void
}) {
  if (!open) return null

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[90] bg-[#0b1f35]/25 lg:hidden"
        aria-label="Закрыть меню"
        onClick={onClose}
      />
      <nav
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[95] flex flex-col gap-8 overflow-y-auto p-6 shadow-[0_8px_32px_rgb(11_31_53/0.12)] lg:hidden"
        style={{ backgroundColor: '#ffffff' }}
        aria-label="Мобильная навигация"
      >
        <NavLinks pathname={pathname} onNavigate={onClose} />
        <div className="border-t border-border pt-6">
          <Button href={headerCta.href} full>
            {headerCta.label}
          </Button>
        </div>
      </nav>
    </>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const syncScroll = () => setScrolled(window.scrollY > 8)
    syncScroll()
    window.addEventListener('scroll', syncScroll, { passive: true })
    return () => window.removeEventListener('scroll', syncScroll)
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

  const headerElevated = scrolled || menuOpen
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] border-b bg-white transition-[box-shadow,border-color] duration-200 ${
          headerElevated
            ? 'border-border shadow-[0_2px_16px_rgb(11_31_53/0.06)]'
            : 'border-border/80 shadow-none'
        }`}
        style={{ height: 'var(--header-h)' }}
      >
        <div className="container-site flex h-full items-center justify-between gap-4 lg:gap-6">
          <Link href="/" className="shrink-0">
            <Logo variant="header" showText={false} />
          </Link>

          <nav
            className="hidden min-w-0 flex-1 flex-row items-center justify-center lg:flex"
            aria-label="Основная навигация"
          >
            <NavLinks pathname={pathname} />
          </nav>

          <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
            <PhoneContactLink size="sm" />
            <MaxContactLink size="sm" />
            <Button href={headerCta.href} size="sm">
              {headerCta.label}
            </Button>
          </div>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <PhoneContactLink size="sm" />
            <MaxContactLink size="sm" />
          </div>

          <button
            type="button"
            className="relative z-10 flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 lg:hidden"
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

      {mounted
        ? createPortal(
            <MobileMenu open={menuOpen} pathname={pathname} onClose={closeMenu} />,
            document.body,
          )
        : null}
    </>
  )
}
