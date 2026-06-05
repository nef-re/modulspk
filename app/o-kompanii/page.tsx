import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { aboutDifferentiators, aboutPlainText, company, geography, sroMemberships } from '@/lib/site'
import { breadcrumbJsonLd } from '@/lib/structured-data'

export const dynamic = 'force-static'

const breadcrumbs = [
  { href: '/', label: 'Главная' },
  { href: '/o-kompanii', label: 'О компании' },
] as const

export const metadata: Metadata = {
  title: 'О компании — инженерные системы с 2004 года',
  description:
    'ООО «Модуль» — проектирование, производство и монтаж инженерных систем. Более 150 объектов с 2004 года, собственное производство в Томске.',
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([...breadcrumbs])} />
      <PageHero
        label="О компании"
        title={aboutPlainText.title}
        subtitle="Проектирование по России, собственное производство в Томске, СМР в Томске и Томском районе."
        breadcrumbs={[...breadcrumbs]}
        cta={false}
      />

      <section className="border-b border-border bg-white py-12 lg:py-16">
        <div className="container-site max-w-3xl">
          <Reveal>
            <div className="space-y-4 text-sm leading-relaxed text-text-muted lg:text-base">
              {aboutPlainText.paragraphs.slice(0, 2).map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg py-20">
        <div className="container-site">
          <Reveal>
            <h2 className="mb-12 text-center text-3xl font-bold">
              Чем «Модуль» отличается от других монтажных компаний
            </h2>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {aboutDifferentiators.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <article className="relative overflow-hidden rounded-2xl border border-border bg-bg-card p-6">
                  <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-brand to-amber" />
                  <span className="text-2xl font-bold text-brand/30">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-site">
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <span className="section-label">Документы и статус</span>
              <h2 className="mt-3 text-3xl font-bold">Членство в СРО</h2>
              <p className="mt-4 text-text-muted">
                ООО «Модуль» работает в рамках требований профильных саморегулируемых организаций.
                Актуальные сведения по объединениям размещены на их официальных сайтах.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            {sroMemberships.map((sro, i) => (
              <Reveal key={sro.registryNumber} delay={i * 80}>
                <article className="rounded-2xl border border-border bg-white p-6 shadow-sm lg:p-7">
                  <h3 className="text-xl font-bold">{sro.shortName}</h3>
                  <p className="mt-2 text-sm text-text-muted">{sro.name}</p>
                  <div className="mt-5 space-y-2 text-sm">
                    <p>
                      <span className="font-semibold text-text">Номер в реестре:</span>{' '}
                      {sro.registryNumber}
                    </p>
                    <p>
                      <span className="font-semibold text-text">Профиль:</span> {sro.scope}
                    </p>
                  </div>
                  <p className="mt-4 text-xs text-text-muted">{sro.note}</p>
                  <a
                    href={sro.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"
                  >
                    Перейти на сайт СРО
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-site max-w-3xl prose prose-slate">
          <Reveal>
            <h2 className="text-2xl font-bold">География работ</h2>
            <p className="mt-4 text-text-muted">
              Проектирование выполняем {geography.design}. Строительно-монтажные и пусконаладочные
              работы — {geography.smr}. Производство вентиляционного оборудования —{' '}
              {geography.production}. Офис и завод расположены в Томске.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
