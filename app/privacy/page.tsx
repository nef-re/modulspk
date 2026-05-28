import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { company } from '@/lib/site'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Документы"
        title="Политика конфиденциальности"
        breadcrumbs={[
          { href: '/', label: 'Главная' },
          { href: '/privacy', label: 'Политика' },
        ]}
      />

      <section className="py-20">
        <div className="container-site max-w-3xl space-y-6 text-text-muted">
          <Reveal>
            <p>
              Настоящая политика определяет порядок обработки персональных данных посетителей сайта{' '}
              {company.name}.
            </p>
            <h2 className="mt-8 text-xl font-bold text-text">1. Общие положения</h2>
            <p>
              Отправляя форму на сайте, вы соглашаетесь на обработку указанных данных (имя, телефон,
              email, текст сообщения) исключительно для связи по вашему запросу и подготовки
              коммерческого предложения.
            </p>
            <h2 className="mt-8 text-xl font-bold text-text">2. Цели обработки</h2>
            <ul className="list-inside list-disc space-y-1">
              <li>Обратная связь по заявке</li>
              <li>Подготовка расчёта и коммерческого предложения</li>
              <li>Информирование о статусе обращения</li>
            </ul>
            <h2 className="mt-8 text-xl font-bold text-text">3. Хранение данных</h2>
            <p>
              Данные хранятся в течение срока, необходимого для исполнения запроса, и не передаются
              третьим лицам без вашего согласия, за исключением случаев, предусмотренных
              законодательством РФ.
            </p>
            <h2 className="mt-8 text-xl font-bold text-text">4. Контакты</h2>
            <p>
              По вопросам обработки данных:{' '}
              <a href={company.emailHref} className="text-brand hover:underline">
                {company.email}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
