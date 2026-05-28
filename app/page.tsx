import type { Metadata } from 'next'
import Link from 'next/link'
import FeatureCard from '@/components/FeatureCard'
import HeroCube from '@/components/HeroCube'
import Reveal from '@/components/Reveal'
import ServiceCard from '@/components/ServiceCard'
import StatCounter from '@/components/StatCounter'
import { Button } from '@/components/ui/Button'
import {
  company,
  estimateCta,
  seo,
  services,
  stats,
  advantages,
  projects,
  processSteps,
} from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Главная',
  description:
    'Проектирование, монтаж, пусконаладка вентиляции и электрики в Томске. Собственное производство вентиляционного оборудования.',
  keywords: seo.defaultKeywords,
}

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-section__bg" aria-hidden="true" />
        <div className="container-site hero-section__inner">
          <div className="hero-section__content">
            <span className="hero-section__badge section-label">{company.city}</span>
            <h1 className="hero-section__title">
              {company.slogan}
              <span className="hero-section__title-accent">
                {' '}
                — инженерные системы под ключ
              </span>
            </h1>
            <p className="hero-section__lead">
              {company.name} — проектирование, производство вентиляционного оборудования,
              строительно-монтажные и пусконаладочные работы в Томске и области.
            </p>
            <p className="mt-4 max-w-xl text-sm text-text-muted">
              Выполняем инженерные работы для жилых, коммерческих и производственных объектов с
              полным циклом: проектирование, СМР, ПНР и сервисное сопровождение.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={estimateCta.href}>{estimateCta.label}</Button>
              <Button href="/proektirovanie" variant="ghost">
                Наши услуги
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { href: '/proektirovanie', label: 'Проектирование' },
                { href: '/smr', label: 'СМР' },
                { href: '/proizvodstvo', label: 'Производство' },
              ].map((chip) => (
                <Link
                  key={chip.href}
                  href={chip.href}
                  className="hero-section__chip"
                >
                  {chip.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hero-section__visual">
            <HeroCube />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white py-14 lg:py-16">
        <div className="container-site grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 60}>
              <div className="text-center">
                <StatCounter value={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-sm text-text-muted">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-site">
          <Reveal>
            <div className="mb-10 max-w-2xl lg:mb-14">
              <span className="section-label">Услуги</span>
              <h2 className="mt-3 text-3xl font-bold text-text lg:text-4xl">
                Комплексные инженерные решения
              </h2>
              <p className="mt-4 text-lg text-text-muted">
                Полный цикл: от проектной документации до монтажа, ПНР и собственного производства.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container-site">
          <Reveal>
            <div className="mb-10 text-center lg:mb-14">
              <span className="section-label">Преимущества</span>
              <h2 className="mt-3 text-3xl font-bold lg:text-4xl">Почему выбирают нас</h2>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item, i) => (
              <FeatureCard key={item.title} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div>
              <span className="section-label">Как мы работаем</span>
              <h2 className="mt-3 text-3xl font-bold lg:text-4xl">Прозрачный процесс на каждом этапе</h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                Сопровождаем объект от первой встречи до сдачи исполнительной документации. Сроки и
                бюджет фиксируем в договоре.
              </p>
              <div className="mt-8">
                <Button href={estimateCta.href}>{estimateCta.label}</Button>
              </div>
            </div>
          </Reveal>
          <div className="space-y-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 80}>
                <article className="flex gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <span className="text-2xl font-bold text-brand/30">{step.step}</span>
                  <div>
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="mt-1 text-sm text-text-muted">{step.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container-site">
          <Reveal>
            <div className="mb-10 text-center lg:mb-14">
              <span className="section-label">Портфолио</span>
              <h2 className="mt-3 text-3xl font-bold lg:text-4xl">Реализованные объекты</h2>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.title} delay={i * 70}>
                <article className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgb(11_31_53/0.08)]">
                  <div className="aspect-[16/7] bg-gradient-to-br from-brand to-[#4c9aff]" />
                  <div className="p-6 lg:p-8">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="mt-2 text-text-muted">{project.type}</p>
                    <span className="mt-4 inline-block rounded-full bg-brand-dim px-3 py-1 text-xs font-bold text-brand">
                      {project.area}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container-site">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-brand px-8 py-10 text-white sm:flex-row sm:items-center lg:px-14 lg:py-12">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">Нужен расчёт по вашему объекту?</h2>
                <p className="mt-3 max-w-lg text-white/90">
                  Оставьте заявку — инженер свяжется с вами и подготовит коммерческое предложение.
                </p>
              </div>
              <Button href={estimateCta.href} variant="light" className="shrink-0">
                {estimateCta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
