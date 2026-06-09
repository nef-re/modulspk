import type { Metadata } from 'next'
import Image from 'next/image'
import FeatureCard from '@/components/FeatureCard'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import ServicePageExtras from '@/components/ServicePageExtras'
import { geography, maintenanceService, smrDocumentation } from '@/lib/site'

export const dynamic = 'force-static'

const SERVICE_DESCRIPTION =
  'ООО «Модуль» — СМР и ПНР в Томске и Томском районе: монтаж вентиляции, кондиционирования и электрики, обслуживание и ремонт, исполнительная документация, сдача объекта.'

export const metadata: Metadata = {
  title: 'СМР и пусконаладка вентиляции и электрики',
  description: SERVICE_DESCRIPTION,
}

const PAGE_H1 = 'СМР и пусконаладка вентиляции и электрики'

const items = [
  {
    title: 'Монтаж',
    text: 'Воздуховоды, вентустановки, системы кондиционирования, кабельные линии, щитовое оборудование, автоматика.',
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
  'Обслуживание и ремонт климатических систем',
  'Сопровождение на всех этапах строительства',
  'Работа по проектам собственного проектного отдела',
]

export default function SmrPage() {
  return (
    <>
      <PageHero
        label="СМР"
        title={PAGE_H1}
        subtitle={`Монтаж вентиляции, кондиционирования и электрики, ПНР и сдача объекта под ключ — ${geography.smr}.`}
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
                Собственные монтажные бригады, опытные прорабы и инженеры ПНР. Монтируем вентиляцию
                и системы кондиционирования, используем оборудование собственного производства в
                Томске — сроки и качество под контролем.
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
        id="obsluzhivanie"
        className="scroll-mt-[calc(var(--header-h)+1rem)] border-t border-border bg-bg py-16 lg:py-20"
      >
        <div className="container-site">
          <Reveal>
            <div className="mb-10 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              <div className="relative aspect-[21/9] sm:aspect-[2/1]">
                <Image
                  src="/services/obsluzhivanie.png"
                  alt="Обслуживание и ремонт систем вентиляции и кондиционирования"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 1200px"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <span className="section-label">Сервис</span>
            <h2 className="mt-3 max-w-3xl text-2xl font-bold lg:text-3xl">
              {maintenanceService.title}
            </h2>
            {maintenanceService.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-4 max-w-3xl text-text-muted leading-relaxed">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {maintenanceService.categories.map((category, i) => (
              <Reveal key={category.title} delay={i * 70}>
                <article className="h-full rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold leading-snug">{category.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-text-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <div className="mt-12 max-w-3xl rounded-2xl border border-brand/25 bg-gradient-to-br from-brand/8 to-white p-6 lg:p-8">
              <h3 className="text-xl font-bold">{maintenanceService.repair.title}</h3>
              <p className="mt-3 text-text-muted leading-relaxed">
                {maintenanceService.repair.intro}
              </p>
              <ul className="mt-4 space-y-2.5">
                {maintenanceService.repair.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-text-muted"
                  >
                    <span className="mt-0.5 font-bold text-brand">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
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
