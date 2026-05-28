import Link from 'next/link'
import { legalNav } from '@/lib/legal'

type LegalNavProps = {
  current: string
}

export default function LegalNav({ current }: LegalNavProps) {
  return (
    <nav
      className="mb-10 flex flex-wrap gap-2 rounded-2xl border border-border bg-white p-2"
      aria-label="Юридические документы"
    >
      {legalNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
            current === item.href
              ? 'bg-brand text-white'
              : 'text-text-muted hover:bg-brand-dim hover:text-brand'
          }`}
          aria-current={current === item.href ? 'page' : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
