import type { Metadata } from 'next'
import FeatureCard from '@/components/FeatureCard'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import ServicePageExtras from '@/components/ServicePageExtras'
import { geography, smrDocumentation } from '@/lib/site'

export const dynamic = 'force-static'

const SERVICE_DESCRIPTION =
  'ООО «Модуль» — СМР и ПНР в Томске и Томском районе: монтаж вентиляции и электрики, техническая и исполнительная документация, сдача объекта.'

export const metadata: Metadata = {
  title: 'СМР и пусконаладка вентиляции и электрики',
  description: SERVICE_DESCRIPTION,
}

const PAGE_H1 = 'СМР и пусконаладка вентиляции и электрики'

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
        title={PAGE_H1}
        subtitle={`Монтаж вентиляции и электрики, ПНР и сдача объекта под ключ — ${geography.smr}.`}
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
              <h2 className="mt-3 text-2xl font-bold lg:text-3xl">
                Строительно-монтажные работы {geography.smr}
              </h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                Собственные монтажные бригады, опытные прорабы и инженеры ПНР. Используем
                оборудование собственного производства в Томске — сроки и качество под контролем.
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

      <section
        id="tehnicheskaya-dokumentaciya"
        className="scroll-mt-[calc(var(--header-h)+1rem)] border-t border-border bg-bg py-16 lg:py-20"
      >
        <div className="container-site max-w-3xl">
          <Reveal>
            <span className="section-label">Документация</span>
            <h2 className="mt-3 text-2xl font-bold lg:text-3xl">{smrDocumentation.techDocsTitle}</h2>
            <p className="mt-4 text-text-muted leading-relaxed">{smrDocumentation.techDocsText}</p>
          </Reveal>
        </div>
      </section>

      <section
        id="ispolnitelnaya-dokumentaciya"
        className="scroll-mt-[calc(var(--header-h)+1rem)] border-t border-border bg-white py-16 lg:py-20"
      >
        <div className="container-site">
          <Reveal>
            <div className="max-w-3xl">
              <span className="section-label">Сдача объекта</span>
              <h2 className="mt-3 text-2xl font-bold lg:text-3xl">{smrDocumentation.execDocsTitle}</h2>
              <p className="mt-6 text-lg font-medium leading-relaxed text-text">
                {smrDocumentation.problem}
              </p>
              <p className="mt-4 text-text-muted leading-relaxed">{smrDocumentation.support}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h3 className="mb-8 mt-12 text-xl font-bold lg:text-2xl">Что мы делаем</h3>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {smrDocumentation.tasks.map((task, i) => (
              <Reveal key={task.title} delay={i * 60}>
                <article className="h-full rounded-2xl border border-border bg-bg-card p-6">
                  <h4 className="text-lg font-bold">{task.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{task.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-bg py-16 lg:py-20">
        <div className="container-site">
          <Reveal>
            <h2 className="mb-10 text-center text-2xl font-bold lg:text-3xl">
              Этапы СМР и пусконаладки на объекте
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
        path="/smr"
        serviceName={PAGE_H1}
        serviceDescription={SERVICE_DESCRIPTION}
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: '/smr', label: 'СМР' },
        ]}
        faqKey="smr"
      />
    </>
  )
}
