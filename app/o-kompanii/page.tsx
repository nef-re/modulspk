import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import StatCounter from '@/components/StatCounter'
import { company, stats, advantages } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'О компании',
  description: `Инженерная компания в ${company.city}: вентиляция, электрика и собственное производство.`,
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="О компании"
        title={company.name}
        subtitle={`Инженерная компания в ${company.city}: вентиляция, электрика и собственное производство.`}
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: '/o-kompanii', label: 'О компании' },
        ]}
      />

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
            <h2 className="mb-12 text-center text-3xl font-bold">Наши ценности</h2>
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
        <div className="container-site max-w-3xl prose prose-slate">
          <Reveal>
            <h2 className="text-2xl font-bold">География работ</h2>
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
