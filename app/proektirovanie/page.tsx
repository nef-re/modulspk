import type { Metadata } from 'next'
import FeatureCard from '@/components/FeatureCard'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import ServicePageExtras from '@/components/ServicePageExtras'
import { designCta, geography } from '@/lib/site'

export const dynamic = 'force-static'

const SERVICE_DESCRIPTION =
  'Инженерный центр ООО «Модуль» — проектирование ОВ и ЭОМ по России: BIM, экспертиза, промышленные и общественные объекты любой сложности.'

export const metadata: Metadata = {
  title: 'Проектирование вентиляции и электрики (ИОС, ОВ, ЭОМ) по России',
  description: SERVICE_DESCRIPTION,
}

const PAGE_H1 = 'Проектирование вентиляции и электрики по России'

const designScopes = [
  'Стадия П — ИОС 5.4, ИОС 5.1',
  'Стадия Р — ОВ, АОВ',
  'Стадия Р — ЭОМ, ЭС, ЭН',
  'Сметная документация',
  'Авторский надзор',
] as const

const objectTypes = [
  {
    title: 'Промышленные предприятия и заводы',
    text: 'Цеха с высокой тепловой нагрузкой, взрывопожароопасные объекты, склады.',
  },
  {
    title: 'Чистые помещения и научные центры',
    text: 'Лаборатории, химические и высокотехнологичные производства.',
  },
  {
    title: 'Объекты HoReCa и ритейл',
    text: 'Крупные рестораны, пищеблоки с мощным технологическим вытяжным оборудованием, торговые центры.',
  },
  {
    title: 'Административные и общественные здания',
    text: 'Бизнес-центры, медицинские учреждения, государственные и военные объекты.',
  },
] as const

const complexApproach = [
  {
    title: 'Разработка и аудит ТЗ',
    text: 'Помогаем составить грамотное техническое задание. Если у вас уже есть готовый проект, проведём его аудит — найдём ошибки и предложим решения, которые оптимизируют бюджет строительства до 15% без потери качества.',
  },
  {
    title: 'Проектирование в BIM-среде',
    text: 'Мы не просто чертим плоские схемы. Создание цифрового 3D-двойника здания позволяет обнаружить и устранить коллизии ещё до закупки материалов.',
  },
  {
    title: 'Инструментальные и инженерные расчёты',
    text: 'Проводим точные расчёты воздухообмена, аэродинамики, токов короткого замыкания, падения напряжения и нагрузок в строгом соответствии с СП, ГОСТ и ПУЭ.',
  },
  {
    title: 'Сопровождение в экспертизе',
    text: 'Полностью берём на себя защиту проектных решений в государственной и негосударственной экспертизе. Оперативно отрабатываем замечания экспертов до получения положительного заключения.',
  },
] as const

const whyChoose = [
  {
    title: 'Проектируем с учётом монтажного опыта',
    text: 'Мы — проектно-монтажная организация с собственным производством. Проектировщики работают в постоянной связке с прорабами и ПТО. Проект будет реализуемым, а не останется красивой, но бесполезной бумагой.',
  },
  {
    title: 'Официальный допуск СРО',
    text: 'Имеем действующие лицензии и допуски СРО на проектирование объектов капитального строительства.',
  },
  {
    title: 'Энергоэффективность и импортозамещение',
    text: 'Закладываем в проект современные технические решения (рекуперация тепла, частотное регулирование), которые снижают эксплуатационные расходы. Подбираем оборудование, доступное к быстрой поставке на рынке в 2026 году.',
  },
] as const

const workflowSteps = [
  {
    step: '01',
    title: 'Предпроектный анализ',
    text: 'Выезд инженера на объект, сбор исходных данных, ТУ, согласование концепции.',
  },
  {
    step: '02',
    title: 'Договор и график',
    text: 'Чёткая фиксация сроков выдачи разделов и неизменной стоимости проектирования.',
  },
  {
    step: '03',
    title: 'Разработка проекта',
    text: 'Выполнение расчётов, подбор оборудования, создание 3D-модели и чертежей.',
  },
  {
    step: '04',
    title: 'Сдача и согласование',
    text: 'Передача готового комплекта документации (в PDF, DWG/RVT), защита в экспертизе.',
  },
] as const

export default function DesignPage() {
  return (
    <>
      <PageHero
        label="Проектирование"
        title={PAGE_H1}
        subtitle={`Проектная и рабочая документация по нормам СП и ПУЭ — ${geography.design}.`}
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: '/proektirovanie', label: 'Проектирование' },
        ]}
        cta={designCta}
      />

      <section className="py-16 lg:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="section-label">Инженерный центр</span>
              <h2 className="mt-3 text-2xl font-bold lg:text-3xl">
                Проектирование инженерных систем {geography.design}
              </h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                Инженерный центр ООО «Модуль» выполняет проектирование систем вентиляции,
                кондиционирования, силового электрооборудования и освещения (разделы ОВ и ЭОМ)
                любой сложности. Мы создаём проекты, которые без проблем проходят экспертизу,
                точно соответствуют вашему бюджету и легко монтируются на площадке.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <ul className="space-y-3">
              {designScopes.map((item) => (
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

      <section className="border-t border-border bg-bg py-16 lg:py-20">
        <div className="container-site">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <span className="section-label">Объекты</span>
              <h2 className="mt-3 text-2xl font-bold lg:text-3xl">Что мы проектируем</h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                Разрабатываем проектную и рабочую документацию для объектов с повышенными
                требованиями к надёжности и безопасности:
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {objectTypes.map((item, i) => (
              <FeatureCard key={item.title} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white py-16 lg:py-20">
        <div className="container-site">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <span className="section-label">Подход</span>
              <h2 className="mt-3 text-2xl font-bold lg:text-3xl">
                Комплексный подход: от идеи до прохождения экспертизы
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {complexApproach.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <article className="h-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                  <div className="h-1 bg-brand" />
                  <div className="p-6">
                    <span className="text-sm font-bold text-brand/60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.text}</p>
                  </div>
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
              Почему генподрядчики и заказчики выбирают ООО «Модуль»
            </h2>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {whyChoose.map((item, i) => (
              <FeatureCard key={item.title} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white py-16 lg:py-20">
        <div className="container-site">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <span className="section-label">Процесс</span>
              <h2 className="mt-3 text-2xl font-bold lg:text-3xl">Как мы работаем</h2>
            </div>
          </Reveal>
          <div className="grid gap-4 lg:grid-cols-2">
            {workflowSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 60}>
                <article className="flex h-full gap-4 rounded-2xl border border-border bg-bg-card p-6 shadow-sm">
                  <span className="text-2xl font-bold text-brand/30">{step.step}</span>
                  <div>
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">{step.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServicePageExtras
        path="/proektirovanie"
        serviceName={PAGE_H1}
        serviceDescription={SERVICE_DESCRIPTION}
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: '/proektirovanie', label: 'Проектирование' },
        ]}
        faqKey="proektirovanie"
      />
    </>
  )
}
