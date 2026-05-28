import {
  contactIconSizeClass,
  type ContactIconSize,
} from '@/components/contact-icon-styles'
import { getActiveMessengers } from '@/lib/site'

type MaxContactLinkProps = {
  size?: ContactIconSize
  showPhone?: boolean
  className?: string
}

/** Иконка MAX (и Telegram при `telegramMessenger.enabled`). */
export default function MaxContactLink({
  size = 'md',
  showPhone = false,
  className = '',
}: MaxContactLinkProps) {
  const active = getActiveMessengers()
  const s = contactIconSizeClass[size]

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {active.map((m) => (
        <a
          key={m.id}
          href={m.href}
          target="_blank"
          rel="noopener noreferrer"
          className={s.link}
          title={`Написать в ${m.label}: ${m.phone}`}
          aria-label={`Написать в ${m.label}, ${m.phone}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={m.logoSrc}
            alt={m.label}
            className={`${s.img} ${m.id === 'max' ? 'p-0 object-cover' : ''}`}
            width={64}
            height={64}
          />
          {showPhone && <span className={`mt-1 block ${s.caption}`}>{m.phone}</span>}
        </a>
      ))}
    </div>
  )
}
