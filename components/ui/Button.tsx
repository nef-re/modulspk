import Link from 'next/link'
import { type ComponentProps } from 'react'

const variants = {
  primary:
    'bg-brand text-white hover:bg-brand-hover shadow-[0_4px_14px_rgb(0_101_255/0.35)]',
  ghost:
    'border border-border bg-white text-text hover:border-brand/40 hover:text-brand',
  light: 'bg-white text-brand font-bold hover:bg-white/95',
} as const

const sizes = {
  sm: 'px-5 py-2.5 text-sm rounded-full',
  md: 'px-7 py-3.5 text-sm rounded-full',
} as const

type ButtonProps = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  full?: boolean
  href?: string
} & ComponentProps<'button'>

export function Button({
  variant = 'primary',
  size = 'md',
  full,
  href,
  className = '',
  children,
  type,
  ...props
}: ButtonProps) {
  const cls = [
    'inline-flex items-center justify-center font-bold transition-all duration-200',
    variants[variant],
    sizes[size],
    full ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type ?? 'button'} className={cls} {...props}>
      {children}
    </button>
  )
}
