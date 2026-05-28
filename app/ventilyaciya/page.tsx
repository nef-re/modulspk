import type { Metadata } from 'next'
import FeatureCard from '@/components/FeatureCard'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Вентиляция',
  description: 'Проектирование и монтаж систем вентиляции и кондиционирования в Томске.',
}

const items = [
  {
    title: 'Проектирование',
    text: 'Разработка разделов ОВ, ВК, расчёт воздухообмена, подбор оборудования, согласование.',
  },
  {
    title: 'Монтаж',
    text: 'Установка воздуховодов, вентустановок, фанкойлов, автоматики, испытания и балансировка.',
  },
  {
    title: 'Сервис',
    text: 'Пусконаладка, регламентное обслуживание, модернизация существующих систем.',
  },
]

const scopes = [
  'Приточно-вытяжная вентиляция',
  'Системы кондиционирования',
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
        title="Системы вентиляции и кондиционирования"
        subtitle="Проектирование и строительно-монтажные работы с применением собственного оборудования."
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
              <h2 className="mt-2 text-3xl font-bold">Комфортный микроклимат на объекте</h2>
              <p className="mt-4 text-text-muted">
                Проектируем и монтируем вентиляционные системы с учётом назначения помещений, норм
                СП 60.13330 и энергоэффективности. Используем оборудование собственного производства —
                это сокращает сроки и стоимость.
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
            <h2 className="mb-12 text-center text-3xl font-bold">Этапы работ</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {items.map((item, i) => (
              <FeatureCard key={item.title} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
