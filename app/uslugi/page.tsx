import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import ServiceCard from '@/components/ServiceCard'
import { services } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Услуги — вентиляция, электрика, проектирование в Томске',
  description:
    'Услуги ООО «Модуль» в Томске: проектирование ОВ и ЭОМ, СМР, ПНР, производство и монтаж вентиляции и электрики.',
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Услуги"
        title="Инженерные услуги в Томске: вентиляция и электрика"
        subtitle="Проектирование, производство, СМР и ПНР — вентиляция и электроснабжение для промышленных и коммерческих объектов."
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: '/uslugi', label: 'Услуги' },
        ]}
        cta={{ href: '/kontakty', label: 'Заказать консультацию' }}
      />

      <section className="py-20">
        <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      <section className="bg-bg py-20">
        <div className="container-site grid gap-6 md:grid-cols-3">
          <Reveal>
            <Link
              href="/ventilyaciya"
              className="block rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/10 to-white p-6 transition hover:shadow-lg"
            >
              <h3 className="text-xl font-bold text-brand">Вентиляция</h3>
              <p className="mt-2 text-sm text-text-muted">
                Приточно-вытяжные системы, кондиционирование, дымоудаление, автоматика.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-brand">Перейти →</span>
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <Link
              href="/elektrika"
              className="block rounded-2xl border border-amber/30 bg-gradient-to-br from-amber/10 to-white p-6 transition hover:shadow-lg"
            >
              <h3 className="text-xl font-bold text-amber">Электрика</h3>
              <p className="mt-2 text-sm text-text-muted">
                Электроснабжение, освещение, слаботочные системы, щитовое оборудование.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-amber">Перейти →</span>
            </Link>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href="/proizvodstvo"
              className="block rounded-2xl border border-violet/30 bg-gradient-to-br from-violet/10 to-white p-6 transition hover:shadow-lg"
            >
              <h3 className="text-xl font-bold text-violet">Производство</h3>
              <p className="mt-2 text-sm text-text-muted">
                Изготовление вентиляционного оборудования на собственных мощностях.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-violet">Перейти →</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
