import type { Metadata } from 'next'
import FeatureCard from '@/components/FeatureCard'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import ServicePageExtras from '@/components/ServicePageExtras'
import { geography } from '@/lib/site'

export const dynamic = 'force-static'

const SERVICE_DESCRIPTION =
  'ООО «Модуль» — проектирование вентиляции по России, монтаж и обслуживание в Томске и Томском районе: ОВ, дымоудаление, системы кондиционирования, ПНР.'

export const metadata: Metadata = {
  title: 'Монтаж и проектирование вентиляции',
  description: SERVICE_DESCRIPTION,
}

const PAGE_H1 = 'Монтаж и проектирование вентиляции'

const items = [
  {
    title: 'Проектирование',
    text: 'Разработка разделов ОВ, ВК, расчёт воздухообмена, подбор оборудования, согласование.',
  },
  {
    title: 'Монтаж',
    text: 'Установка воздуховодов, вентустановок, сплит- и мульти-сплит систем, VRF/VRV, фанкойлов, автоматики, испытания и балансировка.',
  },
  {
    title: 'Сервис',
    text: 'Пусконаладка, регламентное обслуживание и ремонт вентиляции и кондиционирования, модернизация систем.',
  },
]

const scopes = [
  'Приточно-вытяжная вентиляция',
  'Монтаж систем кондиционирования (сплит, VRF/VRV, чиллер-фанкойл)',
  'Обслуживание и ремонт климатического оборудования',
  'Дымоудаление и подпор воздуха',
  'Вентиляция производственных цехов',
  'Вентиляция торговых и офисных центров',
  'Чистые помещения и медицинские объекты',
]

export default function VentilationPage() {
  return (
    <>
      <PageHero
        label="Вентиляция"
        title={PAGE_H1}
        subtitle={`Приточно-вытяжная вентиляция, кондиционирование, дымоудаление — проект ${geography.design}, СМР ${geography.smr}.`}
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: '/ventilyaciya', label: 'Вентиляция' },
        ]}
      />

      <section className="py-20">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="section-label">О направлении</span>
              <h2 className="mt-2 text-3xl font-bold">
                Системы вентиляции и кондиционирования
              </h2>
              <p className="mt-4 text-text-muted">
                Проектируем {geography.design} и монтируем {geography.smr} вентиляционные системы и
                кондиционирование с учётом назначения помещений, норм СП 60.13330 и
                энергоэффективности. Используем оборудование собственного производства в Томске — это
                сокращает сроки и стоимость.
              </p>
              <p className="mt-4 text-text-muted">
                После ввода в эксплуатацию обеспечиваем сервисное сопровождение: регламентное
                обслуживание, диагностику и ремонт ПВУ, сплит-систем, чиллеров и автоматики.{' '}
                <a href="/smr#obsluzhivanie" className="font-semibold text-brand hover:underline">
                  Подробнее об обслуживании
                </a>
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ul className="space-y-3">
              {scopes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border bg-bg-card px-4 py-3 text-sm"
                >
                  <span className="mt-0.5 text-brand">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg py-20">
        <div className="container-site">
          <Reveal>
            <h2 className="mb-12 text-center text-3xl font-bold">
              Этапы монтажа и проектирования вентиляции
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {items.map((item, i) => (
              <FeatureCard key={item.title} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ServicePageExtras
        path="/ventilyaciya"
        serviceName={PAGE_H1}
        serviceDescription={SERVICE_DESCRIPTION}
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: '/ventilyaciya', label: 'Вентиляция' },
        ]}
        faqKey="ventilyaciya"
      />
    </>
  )
}
