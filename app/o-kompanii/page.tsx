import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import StatCounter from '@/components/StatCounter'
import { aboutPlainText, company, stats, advantages, sroMemberships } from '@/lib/site'
import { breadcrumbJsonLd } from '@/lib/structured-data'

export const dynamic = 'force-static'

const breadcrumbs = [
  { href: '/', label: 'Главная' },
  { href: '/o-kompanii', label: 'О компании' },
] as const

export const metadata: Metadata = {
  title: 'О компании — подрядчик по вентиляции и электрике в Томске',
  description: `ООО «Модуль» — инженерная компания в ${company.city}: монтаж вентиляции и электрики, СРО, 200+ объектов, собственное производство.`,
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([...breadcrumbs])} />
      <PageHero
        label="О компании"
        title={`${company.name} — вентиляция и электрика в Томске`}
        subtitle="Инженерный подрядчик: проектирование, СМР, ПНР и собственное производство вентиляционного оборудования."
        breadcrumbs={[...breadcrumbs]}
      />

      <section className="border-b border-border bg-white py-12 lg:py-16">
        <div className="container-site max-w-3xl">
          <Reveal>
            <h2 className="text-xl font-bold lg:text-2xl">{aboutPlainText.title}</h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-text-muted lg:text-base">
              {aboutPlainText.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="container-site space-y-12">
          <Reveal>
            <p className="max-w-3xl text-xl leading-relaxed text-text-muted">
              Мы объединяем проектный отдел, монтажные бригады и производство вентиляционного
              оборудования, чтобы заказчик получал единое решение без разрыва ответственности между
              подрядчиками.
            </p>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 60}>
                <div className="text-center">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                  <p className="mt-2 text-sm text-text-muted">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg py-20">
        <div className="container-site">
          <Reveal>
            <h2 className="mb-12 text-center text-3xl font-bold">
              Преимущества инженерного подрядчика в Томске
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <article className="relative overflow-hidden rounded-2xl border border-border bg-bg-card p-6">
                  <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-brand to-amber" />
                  <h3 className="text-lg font-bold">{item.title}</h3>
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
            <h2 className="text-2xl font-bold">География работ: Томск и область</h2>
            <p className="mt-4 text-text-muted">
              Основной регион — Томск и Томская область. Выполняем проекты для жилых комплексов,
              офисов, торговых центров, производственных и складских помещений. Готовы выехать на
              объект для обследования и подготовки коммерческого предложения.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
