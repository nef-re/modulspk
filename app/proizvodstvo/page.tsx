import type { Metadata } from 'next'
import Image from 'next/image'
import FeatureCard from '@/components/FeatureCard'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import ServicePageExtras from '@/components/ServicePageExtras'
import { productionCta } from '@/lib/site'

export const dynamic = 'force-static'

const SERVICE_DESCRIPTION =
  'ООО «Модуль» — производство вентиляционного оборудования и металлообработка в Томске: воздуховоды, фасонные изделия, лазерная и плазменная резка, нестандартные изделия.'

export const metadata: Metadata = {
  title: 'Производство вентиляционного оборудования в Томске',
  description: SERVICE_DESCRIPTION,
}

const PAGE_H1 = 'Производство вентиляционного оборудования в Томске'

const products = [
  'Вентиляционные установки приточные и приточно-вытяжные',
  'Камеры обработки воздуха',
  'Воздуховоды прямоугольного и круглого сечения',
  'Фасонные изделия и переходы',
  'Клапаны, заслонки, диффузоры',
  'Шумоглушители и фильтрующие секции',
]

const showcasePhotos = [
  {
    src: '/proizvodstvo/products.png',
    alt: 'Фасонные изделия и воздуховоды собственного производства',
    caption: 'Воздуховоды, переходы, фасонные изделия',
  },
  {
    src: '/proizvodstvo/grilles.png',
    alt: 'Вентиляционные решётки и диффузоры',
    caption: 'Решётки, диффузоры, клапаны',
  },
] as const

const equipment = [
  {
    title: 'Лазерный станок с ЧПУ',
    text: 'Обеспечивает филигранную точность раскроя и идеально ровный рез без окалины и деформации металла — вырезает детали абсолютно любого сложного контура.',
    image: '/proizvodstvo/laser-cnc.png',
    imageAlt: 'Лазерный станок с ЧПУ G·WEIK',
  },
  {
    title: 'Автоматическая линия ADF-P3',
    text: 'Гарантирует скоростной и непрерывный выпуск прямых участков прямоугольных воздуховодов.',
    image: '/proizvodstvo/adf-line.png',
    imageAlt: 'Автоматическая линия по производству профильных труб ADF-P3',
  },
  {
    title: 'Установка ВС-007',
    text: 'Основа производства круглых воздуховодов. Формирует плотный, герметичный замок, обеспечивая максимальную жёсткость магистрали.',
    image: '/proizvodstvo/round-ducts.png',
    imageAlt: 'Производство круглых воздуховодов на установке ВС-007',
  },
  {
    title: 'Станок плазменной резки Spiro Plasma Florett 3000',
    text: 'С высочайшей скоростью раскраивает листовой металл для фасонных деталей: переходы, тройники, сложные отводы.',
    image: '/proizvodstvo/plasma-cutter.png',
    imageAlt: 'Станок плазменной резки Spiro Plasma Florett 3000',
  },
  {
    title: 'Станок тоннельной сборки RAS 2010',
    text: 'Создаёт абсолютно герметичный и неразрывный продольный шов на прямоугольных коробах, исключая потери воздуха в системе.',
    image: '/proizvodstvo/ras-assembly.png',
    imageAlt: 'Станок тоннельной сборки RAS 2010',
  },
  {
    title: 'Заготовительная и сборочная база',
    text: 'Промышленные гильотинные ножницы СТД 9А, парк вальцовочных станков, зиг-машин и машин контактной точечной сварки Tecna для надёжной финальной фиксации.',
    image: '/proizvodstvo/guillotine.png',
    imageAlt: 'Гильотинные ножницы СТД 9А и заготовительный участок',
  },
] as const

const metalProducts = [
  {
    title: 'Архитектурный и интерьерный декор',
    text: 'Резные металлические панели, дизайнерские перегородки, экраны для радиаторов, перфорированные фасады, лофт-элементы — идеально реализуется на лазере с ЧПУ.',
  },
  {
    title: 'Корпусные изделия',
    text: 'Шкафы, защитные металлические кожухи для оборудования, инструментальные ящики и короба.',
  },
  {
    title: 'Промышленное и ёмкостное оборудование',
    text: 'Циклоны, бункеры, металлические баки, цилиндрические резервуары и поддоны — с применением трёхвалковых вальцовочных станков и контактной сварки.',
  },
  {
    title: 'Элементы для общепита и чистых помещений',
    text: 'Вытяжные зонты нестандартных габаритов, элементы из нержавеющей стали, жироуловители, вентиляционные решётки и адаптеры.',
  },
  {
    title: 'Нестандартные металлоконструкции',
    text: 'Кронштейны, крепёжные узлы, траверсы, профили, стеллажи и любые другие детали, где требуется точный раскрой, ровная гибка и прочная сборка.',
  },
] as const

export default function ProductionPage() {
  return (
    <>
      <PageHero
        label="Производство"
        title={PAGE_H1}
        subtitle="Завод в Томске: приточные установки, воздуховоды, клапаны — контроль качества и сроков изготовления."
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: '/proizvodstvo', label: 'Производство' },
        ]}
        cta={productionCta}
      />

      <section className="border-t border-border bg-bg py-16 lg:py-20">
        <div className="container-site">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <span className="section-label">Оборудование</span>
              <h2 className="mt-3 text-2xl font-bold lg:text-3xl">Наш парк оборудования</h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                Высокое качество нашей продукции — результат работы на современных,
                высокоточных станках. Мы отобрали лучшее профильное оборудование для решения самых
                сложных инженерных и производственных задач:
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.map((item, i) => (
              <FeatureCard key={item.title} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div>
              <span className="section-label">Завод</span>
              <h2 className="mt-2 text-2xl font-bold lg:text-3xl">
                Наше производство: современные технологии вентиляции и металлообработки
              </h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                Собственная производственная площадка позволяет нам не просто собирать системы
                вентиляции, а создавать их с нуля. Мы специализируемся на серийном и индивидуальном
                производстве круглых и прямоугольных воздуховодов, а также полного спектра фасонных
                изделий для систем вентиляции.
              </p>
              <p className="mt-4 text-text-muted leading-relaxed">
                Контроль на каждом этапе, отсутствие наценок посредников и мощная техническая база
                дают нам возможность гарантировать идеальную геометрию изделий и строгое соблюдение
                сроков.
              </p>
              <p className="mt-4 text-sm text-text-muted">
                Цех металлообработки, покраски и сборки — п. Предтеченск, Томск
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <p className="mb-3 text-sm font-semibold text-text">Ассортимент вентиляции:</p>
              <ul className="space-y-3">
                {products.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border bg-bg-card px-4 py-3 text-sm shadow-sm"
                  >
                    <span className="mt-0.5 text-brand">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="container-site mt-12 grid gap-6 sm:grid-cols-2">
          {showcasePhotos.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 80}>
              <figure className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <div className="relative aspect-[16/10] bg-[#eaf2ff]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    priority={i === 0}
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm font-semibold text-text-muted">
                  {photo.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-white py-16 lg:py-20">
        <div className="container-site">
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <span className="section-label">Металлообработка</span>
              <h2 className="mt-3 text-2xl font-bold lg:text-3xl">
                Не только вентиляция: воплотим в металле любую вашу задачу
              </h2>
              <p className="mt-4 text-text-muted leading-relaxed">
                Наличие лазерной и плазменной резки с ЧПУ в связке с мощными вальцами, гильотинами,
                фальцеосадочными механизмами и сварочными постами делает наше производство
                по-настоящему универсальным. Мы не ограничиваемся только вентиляционными системами
                и готовы изготовить практически любые нестандартные изделия из листового металла.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {metalProducts.map((item, i) => (
              <FeatureCard key={item.title} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ServicePageExtras
        path="/proizvodstvo"
        serviceName={PAGE_H1}
        serviceDescription={SERVICE_DESCRIPTION}
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: '/proizvodstvo', label: 'Производство' },
        ]}
        faqKey="proizvodstvo"
      />
    </>
  )
}
