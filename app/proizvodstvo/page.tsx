import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { Button } from '@/components/ui/Button'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Производство',
  description: 'Вентиляционное оборудование собственного производства в Томске.',
}

const products = [
  'Вентиляционные установки приточные и приточно-вытяжные',
  'Камеры обработки воздуха',
  'Воздуховоды прямоугольного и круглого сечения',
  'Фасонные изделия и переходы',
  'Клапаны, заслонки, диффузоры',
  'Шумоглушители и фильтрующие секции',
]

export default function ProductionPage() {
  return (
    <>
      <PageHero
        label="Производство"
        title="Вентиляционное оборудование"
        subtitle="Собственное производство в Томске — контроль качества, гибкие сроки и индивидуальные решения."
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: '/proizvodstvo', label: 'Производство' },
        ]}
      />

      <section className="py-20">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="section-label">Завод</span>
              <h2 className="mt-2 text-3xl font-bold">От чертежа до отгрузки</h2>
              <p className="mt-4 text-text-muted">
                Изготавливаем вентиляционное оборудование по типовым и индивидуальным проектам.
                Собственный цех металлообработки, покраски и сборки позволяет выполнять заказы в
                сжатые сроки.
              </p>
              <div className="mt-8">
                <Button href="/ventilyaciya" variant="ghost">
                  Услуги по вентиляции
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ul className="space-y-3">
              {products.map((item) => (
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
            <div className="grid gap-8 rounded-3xl border border-border bg-bg-card p-8 sm:grid-cols-3 sm:p-12">
              <div className="text-center">
                <strong className="font-display text-3xl text-brand">3 000+</strong>
                <span className="mt-2 block text-sm text-text-muted">м² производственных площадей</span>
              </div>
              <div className="text-center">
                <strong className="font-display text-3xl text-brand">ISO</strong>
                <span className="mt-2 block text-sm text-text-muted">контроль качества на всех этапах</span>
              </div>
              <div className="text-center">
                <strong className="font-display text-3xl text-brand">5–14</strong>
                <span className="mt-2 block text-sm text-text-muted">дней — типовой срок изготовления</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
