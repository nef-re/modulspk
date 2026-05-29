import type { Metadata } from 'next'
import FeatureCard from '@/components/FeatureCard'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import ServicePageExtras from '@/components/ServicePageExtras'

export const dynamic = 'force-static'

const SERVICE_DESCRIPTION =
  'ООО «Модуль» — проектирование и электромонтаж в Томске: ЭОМ, освещение, ВРУ, силовые сети, сдача объекта под ключ.'

export const metadata: Metadata = {
  title: 'Электромонтаж и проектирование электрики в Томске',
  description: SERVICE_DESCRIPTION,
}

const PAGE_H1 = 'Электромонтаж и проектирование электрики в Томске'

const items = [
  {
    title: 'Проектирование',
    text: 'Разделы ЭОМ, ЭС, освещение, расчёт нагрузок, однолинейные схемы, спецификации.',
  },
  {
    title: 'Монтаж',
    text: 'Кабельные линии, щиты, розеточные группы, заземление, испытания и сдача объекта.',
  },
  {
    title: 'Слаботочные системы',
    text: 'Структурированные кабельные системы, видеонаблюдение, СКУД по запросу.',
  },
]

const scopes = [
  'Вводно-распределительные устройства',
  'Внутреннее электроосвещение',
  'Силовые и розеточные сети',
  'Заземление и молниезащита',
  'Резервное электроснабжение',
  'Промышленные и складские объекты',
]

export default function ElectricsPage() {
  return (
    <>
      <PageHero
        label="Электрика"
        title={PAGE_H1}
        subtitle="ЭОМ, электроосвещение, ВРУ и силовые сети — проектирование и монтаж для зданий и промышленных объектов."
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: '/elektrika', label: 'Электрика' },
        ]}
      />

      <section className="py-20">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="section-label">О направлении</span>
              <h2 className="mt-2 text-3xl font-bold">
                Проектирование и монтаж электроснабжения в Томске
              </h2>
              <p className="mt-4 text-text-muted">
                Выполняем проектные и монтажные работы в соответствии с ПУЭ и действующими ГОСТ.
                Обеспечиваем безопасность, резервирование и удобство эксплуатации на каждом объекте.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ul className="space-y-3">
              {scopes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-amber/20 bg-amber-dim px-4 py-3 text-sm"
                >
                  <span className="mt-0.5 text-amber">✓</span>
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
              Этапы электромонтажа и проектирования ЭОМ
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
        path="/elektrika"
        serviceName={PAGE_H1}
        serviceDescription={SERVICE_DESCRIPTION}
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: '/elektrika', label: 'Электрика' },
        ]}
        faqKey="elektrika"
      />
    </>
  )
}
