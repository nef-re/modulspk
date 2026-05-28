import type { Metadata } from 'next'
import FeatureCard from '@/components/FeatureCard'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Проектирование',
  description: 'Проектирование систем вентиляции, кондиционирования и электроснабжения в Томске.',
}

const items = [
  {
    title: 'Раздел ОВ',
    text: 'Приточно-вытяжная вентиляция, кондиционирование, дымоудаление, расчёт воздухообмена.',
  },
  {
    title: 'Раздел ЭОМ',
    text: 'Электроснабжение, освещение, силовые сети, однолинейные схемы, спецификации.',
  },
  {
    title: 'Согласования',
    text: 'Подготовка документации для экспертизы и согласования с надзорными органами.',
  },
]

const scopes = [
  'Проектная и рабочая документация',
  'Инженерные изыскания по запросу',
  'Подбор оборудования и материалов',
  'Сметная документация',
  'Авторский надзор',
  'BIM-моделирование по запросу',
]

export default function DesignPage() {
  return (
    <>
      <PageHero
        label="Проектирование"
        title="Проектная документация ОВ, ВК и ЭОМ"
        subtitle="Разрабатываем решения с учётом норм СП, ПУЭ и требований заказчика. Согласуем смету и сроки до начала СМР."
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: '/proektirovanie', label: 'Проектирование' },
        ]}
      />

      <section className="py-16 lg:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="section-label">О направлении</span>
              <h2 className="mt-3 text-2xl font-bold lg:text-3xl">Точные решения до монтажа</h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                Проектный отдел ООО «Модуль» выполняет полный цикл проектирования инженерных систем
                для коммерческих, промышленных и жилых объектов в Томске и области.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <ul className="space-y-3">
              {scopes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border bg-white px-4 py-3.5 text-sm shadow-sm"
                >
                  <span className="mt-0.5 font-bold text-brand">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-white py-16 lg:py-20">
        <div className="container-site">
          <Reveal>
            <h2 className="mb-10 text-center text-2xl font-bold lg:text-3xl">Этапы проектирования</h2>
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
