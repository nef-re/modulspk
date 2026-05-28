import type { Metadata } from 'next'
import FeatureCard from '@/components/FeatureCard'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'СМР и ПНР',
  description: 'Строительно-монтажные и пусконаладочные работы по вентиляции и электрике.',
}

const items = [
  {
    title: 'Монтаж',
    text: 'Воздуховоды, вентустановки, кабельные линии, щитовое оборудование, автоматика.',
  },
  {
    title: 'ПНР',
    text: 'Пусконаладка, балансировка, испытания, ввод систем в эксплуатацию.',
  },
  {
    title: 'Сдача объекта',
    text: 'Исполнительная документация, обучение персонала, гарантийное сопровождение.',
  },
]

const scopes = [
  'Монтаж систем вентиляции и кондиционирования',
  'Электромонтаж и щитовое оборудование',
  'Изоляция, огнезащита, гидроизоляция узлов',
  'Пусконаладочные работы',
  'Сопровождение на всех этапах строительства',
  'Работа по проектам собственного проектного отдела',
]

export default function SmrPage() {
  return (
    <>
      <PageHero
        label="СМР"
        title="Строительно-монтажные и пусконаладочные работы"
        subtitle="Выполняем монтаж и ПНР «под ключ» — от подготовки площадки до сдачи объекта заказчику."
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: '/smr', label: 'СМР' },
        ]}
      />

      <section className="py-16 lg:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="section-label">О направлении</span>
              <h2 className="mt-3 text-2xl font-bold lg:text-3xl">Монтаж с ответственностью за результат</h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                Собственные монтажные бригады, опытные прорабы и инженеры ПНР. Используем
                оборудование собственного производства — сроки и качество под контролем.
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
            <h2 className="mb-10 text-center text-2xl font-bold lg:text-3xl">Этапы работ на объекте</h2>
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
