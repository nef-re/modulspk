import type { Metadata } from 'next'
import Link from 'next/link'
import FaqSection from '@/components/FaqSection'
import JsonLd from '@/components/JsonLd'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import {
  formatRub,
  formatUpdated,
  priceSections,
  PRICES_DISCLAIMER_SHORT,
  PRICES_UPDATED,
  pricesDisclaimer,
  VAT_RATE,
} from '@/lib/prices'
import { pageMetadata } from '@/lib/seo'
import { company, type FaqItem } from '@/lib/site'
import { breadcrumbJsonLd, faqJsonLd, priceCatalogJsonLd } from '@/lib/structured-data'

export const dynamic = 'force-static'

const PATH = '/ceny'

const breadcrumbs = [
  { href: '/', label: 'Главная' },
  { href: PATH, label: 'Цены' },
] as const

const vat = VAT_RATE
const ductPrice = priceSections.flatMap((s) => s.items).find((i) => i.name === 'Монтаж воздуховодов')?.price

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: 'Цены на монтаж вентиляции, кондиционеров и электрики в Томске',
  description: `Прайс ${company.name} на работы в Томске: монтаж воздуховодов${
    ductPrice ? ` от ${formatRub(ductPrice)} за м²` : ''
  }, вентустановок, кондиционеров, электромонтаж, пусконаладка. Цены с НДС ${vat}%.`,
})

const faq: FaqItem[] = [
  {
    q: 'Входят ли в цены оборудование и материалы?',
    a: 'Нет, в таблице — стоимость работ. Оборудование и материалы считаются отдельно в коммерческом предложении: часть вентиляционных изделий мы изготавливаем на собственном производстве в Томске.',
  },
  {
    q: 'Почему цены указаны «от»?',
    a: 'Стоимость зависит от высоты монтажа, стеснённости, материала стен и перекрытий, объёма работ и сроков. Точная цена фиксируется в коммерческом предложении после выезда и обмеров или по проекту.',
  },
  {
    q: 'Цены указаны с НДС?',
    a: `Да, все цены — с НДС ${vat}%.`,
  },
  {
    q: 'Как получить точный расчёт стоимости?',
    a: 'Оставьте заявку и приложите проект, план помещения или фото объекта. Мы подготовим коммерческое предложение с разбивкой: оборудование и материалы, монтаж, сопутствующие работы.',
  },
  {
    q: 'Где выполняете работы?',
    a: 'Монтаж и пусконаладку — в Томске и Томском районе. Проектирование — по всей России.',
  },
]

export default function PricesPage() {
  const sections = priceSections
  const updated = PRICES_UPDATED

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([...breadcrumbs])} />
      <JsonLd data={priceCatalogJsonLd(sections, PATH)} />
      <JsonLd data={faqJsonLd(faq)} />
      <PageHero
        label="Цены"
        title="Цены на работы"
        subtitle={`Монтаж вентиляции и кондиционеров, электромонтаж и пусконаладка в Томске и Томском районе. Цены «от», с НДС ${vat}%, без стоимости оборудования и материалов.`}
        breadcrumbs={[...breadcrumbs]}
        cta={{ href: '/kontakty#zayavka', label: 'Получить точный расчёт' }}
      />

      <section className="border-b border-border bg-white py-6">
        <div className="container-site">
          <p className="mb-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-text">
            {PRICES_DISCLAIMER_SHORT} Цены актуальны на {formatUpdated(updated)}.
          </p>
          <nav aria-label="Разделы прайса" className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-text-muted transition hover:border-brand hover:text-brand"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-site max-w-4xl space-y-14">
          {sections.map((section) => (
            <Reveal key={section.id}>
              <div id={section.id} className="scroll-mt-28">
                <h2 className="text-2xl font-bold lg:text-3xl">{section.title}</h2>
                <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white">
                  <table className="w-full text-left text-sm lg:text-base">
                    <thead className="bg-bg text-xs uppercase tracking-wide text-text-muted">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-semibold">Работа</th>
                        <th scope="col" className="hidden px-4 py-3 font-semibold sm:table-cell">Ед.</th>
                        <th scope="col" className="px-4 py-3 text-right font-semibold">Цена</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {section.items.map((item) => (
                        <tr key={item.name}>
                          <td className="px-4 py-3 text-text">
                            {item.name}
                            <span className="block text-xs text-text-muted sm:hidden">за {item.unit}</span>
                          </td>
                          <td className="hidden whitespace-nowrap px-4 py-3 text-text-muted sm:table-cell">
                            {item.unit}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-text">
                            от {formatRub(item.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/10 to-white p-6 lg:p-8">
              <h2 className="text-xl font-bold">Нужна стоимость «под ключ»?</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted lg:text-base">
                Пришлите проект, план помещения или фото объекта — подготовим коммерческое предложение
                с оборудованием, материалами, монтажом и пусконаладкой.
              </p>
              <Link
                href="/kontakty#zayavka"
                className="mt-5 inline-block rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-hover"
              >
                Отправить заявку
              </Link>
            </div>
          </Reveal>

          <div className="space-y-2 border-t border-border pt-6 text-xs leading-relaxed text-text-muted">
            {pricesDisclaimer(updated, vat).map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faq} title="Частые вопросы о ценах" />
    </>
  )
}
