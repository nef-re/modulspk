import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { company } from '@/lib/site'

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
        subtitle="Оставьте заявку или позвоните — ответим в рабочее время и назначим выезд инженера."
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: '/kontakty', label: 'Контакты' },
        ]}
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
                <span className="text-xs font-bold uppercase tracking-wide text-text-muted">Телефон</span>
                <div className="mt-2">
                  <a href={company.phoneHref} className="text-xl font-bold text-brand hover:underline">
                    {company.phone}
                  </a>
                </div>
              </div>
              {company.phone2 && (
                <div className="rounded-2xl border border-border bg-white px-5 py-4 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wide text-text-muted">
                    Доп. телефон
                  </span>
                  <div className="mt-2">
                    <a href={company.phone2Href} className="font-semibold text-brand hover:underline">
                      {company.phone2}
                    </a>
                  </div>
                </div>
              )}
              <div className="rounded-2xl border border-border bg-white px-5 py-4 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wide text-text-muted">Email</span>
                <div className="mt-2">
                  <a href={company.emailHref} className="font-semibold text-brand hover:underline">
                    {company.email}
                  </a>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-white px-5 py-4 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wide text-text-muted">
                  Режим работы
                </span>
                <p className="mt-2 text-text-muted">{company.hours}</p>
              </div>
              <div className="rounded-2xl border border-border bg-bg px-5 py-4 text-sm text-text-muted">
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
            <div className="rounded-2xl border border-border bg-white p-8 shadow-[0_4px_24px_rgb(11_31_53/0.08)] lg:p-10">
              <h2 className="mb-2 text-2xl font-bold">Форма заявки</h2>
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
