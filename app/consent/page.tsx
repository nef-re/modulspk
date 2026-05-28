import type { Metadata } from 'next'
import Link from 'next/link'
import LegalNav from '@/components/LegalNav'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { legal } from '@/lib/legal'
import { company } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Согласие на обработку персональных данных',
  description: `Текст согласия на обработку персональных данных ${company.name}.`,
}

export default function ConsentPage() {
  return (
    <>
      <PageHero
        label="Документы"
        title="Согласие на обработку персональных данных"
        subtitle={`Образец согласия при отправке форм на сайте ${company.domain}.`}
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: legal.links.consent, label: 'Согласие' },
        ]}
      />

      <section className="py-16 lg:py-20">
        <div className="container-site max-w-3xl">
          <LegalNav current={legal.links.consent} />
          <Reveal>
            <article className="legal-prose space-y-6 text-text-muted">
              <p>
                Настоящим, действуя свободно, своей волей и в своём интересе, я (далее — Субъект
                персональных данных) даю согласие {company.name} (ИНН {company.inn}, ОГРН{' '}
                {company.ogrn}, адрес: {company.address}) (далее — Оператор) на обработку моих
                персональных данных на условиях, изложенных ниже.
              </p>

              <section className="rounded-2xl border border-border bg-white p-6 text-text">
                <h2 className="text-lg font-bold">Текст согласия (для форм на Сайте)</h2>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">
                  Я подтверждаю, что ознакомлен(а) с{' '}
                  <Link href={legal.links.privacy} className="text-brand hover:underline">
                    Политикой обработки персональных данных
                  </Link>{' '}
                  и даю согласие Оператору на обработку моих персональных данных, указанных в форме
                  обратной связи (имя, телефон, email, сведения об услуге и текст сообщения), в
                  целях обработки обращения, обратной связи и подготовки коммерческого предложения,
                  включая сбор, запись, систематизацию, накопление, хранение, уточнение,
                  извлечение, использование, передачу (предоставление, доступ), обезличивание,
                  блокирование, удаление, уничтожение персональных данных с использованием средств
                  автоматизации и без их использования.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">
                  Согласие действует до достижения целей обработки или до его отзыва. Согласие
                  может быть отозвано путём направления заявления на{' '}
                  <a href={company.emailHref} className="text-brand hover:underline">
                    {company.email}
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text">Дополнительные условия</h2>
                <ul className="list-inside list-disc space-y-1">
                  <li>
                    Субъект подтверждает достоверность предоставленных данных и наличие права их
                    предоставить.
                  </li>
                  <li>
                    Оператор обрабатывает данные в соответствии с{' '}
                    <Link href={legal.links.privacy} className="text-brand hover:underline">
                      Политикой обработки персональных данных
                    </Link>
                    .
                  </li>
                  <li>
                    Субъект вправе запросить уточнение, блокирование или уничтожение данных, а также
                    обратиться в{' '}
                    <a
                      href={legal.roskomnadzor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand hover:underline"
                    >
                      Роскомнадзор
                    </a>
                    .
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text">Контакты оператора</h2>
                <p>
                  {company.name}
                  <br />
                  {company.address}
                  <br />
                  Email:{' '}
                  <a href={company.emailHref} className="text-brand hover:underline">
                    {company.email}
                  </a>
                  <br />
                  Тел.:{' '}
                  <a href={company.phoneHref} className="text-brand hover:underline">
                    {company.phone}
                  </a>
                </p>
              </section>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  )
}
