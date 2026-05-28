import Image from 'next/image'
import { company } from '@/lib/site'

type LogoVariant = 'header' | 'hero' | 'footer'

const sizes: Record<LogoVariant, { w: number; h: number; maxH: number; maxW: number }> = {
  header: { w: 400, h: 96, maxH: 96, maxW: 400 },
  hero: { w: 320, h: 88, maxH: 88, maxW: 320 },
  footer: { w: 360, h: 104, maxH: 104, maxW: 360 },
}

export default function Logo({
  className = '',
  showText = true,
  variant = 'header',
}: {
  className?: string
  showText?: boolean
  variant?: LogoVariant
}) {
  const { w, h, maxH, maxW } = sizes[variant]

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/logo.png"
        alt={company.name}
        width={w}
        height={h}
        className="block w-auto object-contain"
        style={{ maxHeight: maxH, maxWidth: maxW, height: 'auto', width: 'auto' }}
        priority={variant === 'header'}
      />
      {showText && variant === 'header' && (
        <span className="text-xs font-semibold text-text-muted">{company.city}</span>
      )}
    </span>
  )
}
