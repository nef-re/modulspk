import Link from 'next/link'
import Logo from '@/components/Logo'
import MaxContactLink from '@/components/MaxContactLink'
import { legal } from '@/lib/legal'
import { company, estimateCta, navLinks } from '@/lib/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-footer text-white">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="inline-block">
            <Logo variant="footer" showText={false} />
          </Link>
          <p className="mt-4 text-sm text-footer-muted">{company.slogan}</p>
          <p className="mt-3 text-sm font-semibold text-white">{company.name}</p>
          <p className="mt-1 text-xs text-footer-muted">
            ИНН {company.inn} · КПП {company.kpp}
            <br />
            ОГРН {company.ogrn}
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-white/90">
            Разделы
          </h4>
          <ul className="space-y-2.5 text-sm text-footer-muted">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-white/90">
            Услуги
          </h4>
          <ul className="space-y-2.5 text-sm text-footer-muted">
            <li>
              <Link href="/proektirovanie" className="hover:text-white">
                Проектирование
              </Link>
            </li>
            <li>
              <Link href="/smr" className="hover:text-white">
                СМР и ПНР
              </Link>
            </li>
            <li>
              <Link href="/proizvodstvo" className="hover:text-white">
                Производство
              </Link>
            </li>
            <li>
              <Link href="/ventilyaciya" className="hover:text-white">
                Вентиляция
              </Link>
            </li>
            <li>
              <Link href="/elektrika" className="hover:text-white">
                Электрика
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-white/90">
            Контакты
          </h4>
          <div className="space-y-3 text-sm">
            <a href={company.phoneHref} className="block text-lg font-bold text-white hover:underline">
              {company.phone}
            </a>
            {company.phone2 && (
              <a href={company.phone2Href} className="block text-footer-muted hover:text-white">
                {company.phone2}
              </a>
            )}
            <a href={company.emailHref} className="block text-footer-muted hover:text-white">
              {company.email}
            </a>
            <div className="pt-2">
              <MaxContactLink size="sm" />
            </div>
            <p className="text-footer-muted leading-relaxed">{company.address}</p>
            <p className="text-footer-muted">{company.hours}</p>
            <Link
              href={estimateCta.href}
              className="mt-2 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-hover"
            >
              {estimateCta.label}
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-footer-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. Все права защищены.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a href={company.siteUrl} className="hover:text-white">
              {company.domain}
            </a>
            <Link href={legal.links.privacy} className="hover:text-white">
              Политика ПДн
            </Link>
            <Link href={legal.links.cookies} className="hover:text-white">
              Cookie
            </Link>
            <Link href={legal.links.consent} className="hover:text-white">
              Согласие на обработку ПДн
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
