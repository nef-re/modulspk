import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { Button } from '@/components/ui/Button'
import { estimateCta } from '@/lib/site'

type Crumb = { href: string; label: string }

export default function PageHero({
  label,
  title,
  subtitle,
  breadcrumbs = [],
  cta = estimateCta,
}: {
  label?: string
  title: string
  subtitle?: string
  breadcrumbs?: Crumb[]
  /** Передайте `false`, чтобы скрыть кнопку CTA */
  cta?: { href: string; label: string } | false
}) {
  return (
    <section className="border-b border-border bg-white pb-12 pt-8 lg:pb-16 lg:pt-10">
      <div className="container-site">
        {breadcrumbs.length > 0 && (
          <nav className="mb-6 text-sm text-text-muted" aria-label="Хлебные крошки">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.href}>
                {i > 0 && <span className="mx-2 text-border">/</span>}
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-text">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-brand">
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        )}
        <Reveal>
          {label && <span className="section-label">{label}</span>}
          <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg text-text-muted leading-relaxed">{subtitle}</p>
          )}
          {cta !== false && cta && (
            <div className="mt-8">
              <Button href={cta.href}>{cta.label}</Button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
