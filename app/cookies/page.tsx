import type { Metadata } from 'next'
import Link from 'next/link'
import LegalNav from '@/components/LegalNav'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { legal } from '@/lib/legal'
import { company } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Политика использования cookie',
  description: `Информация об использовании файлов cookie на сайте ${company.domain}.`,
}

export default function CookiesPage() {
  return (
    <>
      <PageHero
        label="Документы"
        title="Политика использования файлов cookie"
        subtitle={`Действует с ${legal.lastUpdated}.`}
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: legal.links.cookies, label: 'Cookie' },
        ]}
      />

      <section className="py-16 lg:py-20">
        <div className="container-site max-w-3xl">
          <LegalNav current={legal.links.cookies} />
          <Reveal>
            <article className="legal-prose space-y-6 text-text-muted">
              <p>
                Настоящая Политика описывает, как {company.name} (Оператор) использует файлы cookie
                и аналогичные технологии на сайте{' '}
                <a href={company.siteUrl} className="text-brand hover:underline">
                  {company.domain}
                </a>
                .
              </p>

              <section>
                <h2 className="text-xl font-bold text-text">1. Что такое cookie</h2>
                <p>
                  Cookie — небольшие текстовые файлы, которые сохраняются на устройстве
                  пользователя при посещении сайта. Они помогают обеспечить работу сайта,
                  запоминать настройки и анализировать использование (при наличии
                  соответствующих сервисов).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text">2. Какие cookie мы используем</h2>
                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <thead className="bg-bg text-text">
                      <tr>
                        <th className="px-4 py-3 font-bold">Тип</th>
                        <th className="px-4 py-3 font-bold">Назначение</th>
                        <th className="px-4 py-3 font-bold">Срок</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-white">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text">Строго необходимые</td>
                        <td className="px-4 py-3">
                          Обеспечение работы сайта, безопасность, сохранение выбора по cookie
                        </td>
                        <td className="px-4 py-3">До 12 месяцев</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-text">Функциональные</td>
                        <td className="px-4 py-3">
                          Запоминание предпочтений пользователя (при наличии соответствующих функций)
                        </td>
                        <td className="px-4 py-3">До 12 месяцев</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  На момент публикации Политики Сайт не использует рекламные cookie и cookie
                  сторонних аналитических систем (например, Яндекс.Метрика, Google Analytics). При
                  подключении таких сервисов Политика будет обновлена, а согласие запрашивается
                  повторно.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text">3. Правовые основания</h2>
                <p>
                  Использование строго необходимых cookie осуществляется для обеспечения
                  функционирования Сайта. Для иных категорий cookie Оператор запрашивает согласие
                  пользователя через баннер при первом посещении в соответствии с требованиями
                  законодательства РФ о персональных данных и разъяснениями Роскомнадзора.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text">4. Управление cookie</h2>
                <p>Вы можете:</p>
                <ul className="list-inside list-disc space-y-1">
                  <li>принять все cookie или выбрать «Только необходимые» в баннере на Сайте;</li>
                  <li>удалить сохранённые cookie в настройках браузера;</li>
                  <li>запретить сохранение cookie в настройках браузера (это может ограничить работу Сайта).</li>
                </ul>
                <p className="mt-2">
                  Инструкции по настройке cookie обычно доступны в разделе «Справка» вашего
                  браузера (Chrome, Firefox, Safari, Edge и др.).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text">5. Связь с персональными данными</h2>
                <p>
                  Некоторые cookie могут содержать или сопоставляться с идентификаторами,
                  относящимися к персональным данным. Порядок обработки таких данных определён в{' '}
                  <Link href={legal.links.privacy} className="text-brand hover:underline">
                    Политике обработки персональных данных
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text">6. Контакты</h2>
                <p>
                  По вопросам использования cookie:{' '}
                  <a href={company.emailHref} className="text-brand hover:underline">
                    {company.email}
                  </a>
                  , тел.{' '}
                  <a href={company.phoneHref} className="text-brand hover:underline">
                    {company.phone}
                  </a>
                  .
                </p>
              </section>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  )
}
