import {
  contactIconSizeClass,
  type ContactIconSize,
} from '@/components/contact-icon-styles'
import { company } from '@/lib/site'

type PhoneContactLinkProps = {
  size?: ContactIconSize
  className?: string
}

/** Иконка звонка (картинка в стиле MAX). */
export default function PhoneContactLink({ size = 'md', className = '' }: PhoneContactLinkProps) {
  const s = contactIconSizeClass[size]

  return (
    <a
      href={company.phoneHref}
      className={`${s.link} ${className}`}
      aria-label={`Позвонить: ${company.phone}`}
      title={company.phone}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={company.phoneIconSrc}
        alt="Позвонить"
        className={s.img}
        width={64}
        height={64}
      />
    </a>
  )
}
