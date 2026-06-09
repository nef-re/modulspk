import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import ServiceCard from '@/components/ServiceCard'
import { geography, maintenanceService, services, smrDocumentation } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Услуги — вентиляция, электрика, проектирование',
  description:
    'Услуги ООО «Модуль»: проектирование по России, СМР и ПНР в Томске и Томском районе, производство в Томске.',
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Услуги"
        title="Инженерные услуги под ключ"
        subtitle={`Проектирование ${geography.design}, производство ${geography.production}, СМР и ПНР ${geography.smr}, обслуживание вентиляции и кондиционирования.`}
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: '/uslugi', label: 'Услуги' },
        ]}
        cta={{ href: '/kontakty', label: 'Заказать консультацию' }}
      />

      <section className="py-20">
        <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      <section className="bg-bg py-20">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/10 to-white p-8 lg:p-10">
              <h3 className="text-xl font-bold text-brand">{maintenanceService.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {maintenanceService.intro[0]}
              </p>
              <Link
                href="/smr#obsluzhivanie"
                className="mt-5 inline-block text-sm font-bold text-brand hover:underline"
              >
                Подробнее об обслуживании →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/10 to-white p-8 lg:p-10">
              <h3 className="text-xl font-bold text-brand">Сдача объекта и исполнительная документация</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {smrDocumentation.problem} Помогаем с подготовкой ИД, актами КС-2 и КС-3, сопровождением
                при проверках ГСН и Ростехнадзора.
              </p>
              <Link
                href="/smr#ispolnitelnaya-dokumentaciya"
                className="mt-5 inline-block text-sm font-bold text-brand hover:underline"
              >
                Подробнее о сдаче объекта →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
