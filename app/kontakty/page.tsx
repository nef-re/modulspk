import type { Metadata } from 'next'
import Image from 'next/image'
import ContactForm from '@/components/ContactForm'
import DgisMap from '@/components/DgisMap'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { company, maxMessenger } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Контакты ООО «Модуль» — Томск, телефон, адрес, реквизиты.',
}

export default function ContactsPage() {
  return (
    <>
      <PageHero
        label="Контакты"
        title="Свяжитесь с нами"
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: '/kontakty', label: 'Контакты' },
        ]}
        cta={false}
      />

      <section className="py-16 lg:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold">{company.name}</h2>
                <p className="mt-2 text-sm text-text-muted">{company.address}</p>
              </div>
              <div className="rounded-2xl border border-border bg-white px-5 py-4 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wide text-text-muted">
                  Контакты для связи
                </span>
                <div className="mt-3 space-y-3 text-sm">
                  <div>
                    <span className="text-text-muted">Телефон:</span>{' '}
                    <a href={company.phoneHref} className="text-lg font-bold text-brand hover:underline">
                      {company.phone}
                    </a>
                  </div>
                  {company.phone2 && (
                    <div className="flex items-center gap-3">
                      <span className="text-text-muted">Доп. телефон:</span>{' '}
                      <a href={company.phone2Href} className="font-semibold text-brand hover:underline">
                        {company.phone2}
                      </a>
                      <a
                        href={maxMessenger.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex transition hover:scale-[1.05]"
                        title={`Написать в MAX: ${maxMessenger.phone}`}
                        aria-label={`Написать в MAX: ${maxMessenger.phone}`}
                      >
                        <Image
                          src={maxMessenger.logoSrc}
                          alt="MAX"
                          className="h-10 w-10 rounded-[22%] object-cover shadow-sm"
                          width={40}
                          height={40}
                        />
                      </a>
                    </div>
                  )}
                  <div>
                    <span className="text-text-muted">Email:</span>{' '}
                    <a href={company.emailHref} className="font-semibold text-brand hover:underline">
                      {company.email}
                    </a>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-white px-5 py-4 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wide text-text-muted">
                  Режим работы
                </span>
                <p className="mt-2 text-text-muted">{company.hours}</p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-[0_4px_24px_rgb(11_31_53/0.08)] lg:p-5">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-text-muted">
                  Как нас найти
                </h3>
                <DgisMap />
              </div>
              <div className="rounded-2xl border border-border bg-bg px-5 py-4 text-sm text-text-muted">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-text-muted">Реквизиты</p>
                <p>
                  <span className="font-semibold text-text">ИНН</span> {company.inn}
                </p>
                <p className="mt-1">
                  <span className="font-semibold text-text">КПП</span> {company.kpp}
                </p>
                <p className="mt-1">
                  <span className="font-semibold text-text">ОГРН</span> {company.ogrn}
                </p>
                <p className="mt-1">
                  <span className="font-semibold text-text">ОКПО</span> {company.okpo}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div
              id="zayavka"
              className="scroll-mt-28 rounded-2xl border border-border bg-white p-8 shadow-[0_4px_24px_rgb(11_31_53/0.08)] lg:p-10"
            >
              <h2 className="mb-2 text-2xl font-bold">Форма обратной связи</h2>
              <p className="mb-6 text-sm text-text-muted">
                Заполните поля — мы перезвоним и рассчитаем смету по вашему объекту.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
