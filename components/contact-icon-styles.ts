/** Единый стиль иконок контактов (телефон, MAX) в духе app-icon. */
export type ContactIconSize = 'sm' | 'md' | 'lg' | 'card'

export const contactIconSizeClass: Record<
  ContactIconSize,
  { link: string; img: string; caption: string }
> = {
  sm: {
    link: 'inline-block shrink-0 transition hover:scale-[1.06] active:scale-[0.98]',
    img: 'h-10 w-10 rounded-[22%] bg-white object-contain p-1.5 shadow-[0_2px_12px_rgb(11_31_53/0.12)] ring-1 ring-border/80',
    caption: 'text-xs text-text-muted',
  },
  md: {
    link: 'inline-block shrink-0 transition hover:scale-[1.06] active:scale-[0.98]',
    img: 'h-11 w-11 rounded-[22%] bg-white object-contain p-1.5 shadow-[0_2px_12px_rgb(11_31_53/0.12)] ring-1 ring-border/80',
    caption: 'text-sm text-text-muted',
  },
  lg: {
    link: 'inline-block shrink-0 transition hover:scale-[1.06] active:scale-[0.98]',
    img: 'h-14 w-14 rounded-[22%] bg-white object-contain p-2 shadow-[0_4px_16px_rgb(11_31_53/0.14)] ring-1 ring-border/80',
    caption: 'text-sm text-text-muted',
  },
  card: {
    link: 'inline-flex flex-col items-start gap-3 rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:border-brand/40 hover:shadow-md',
    img: 'h-16 w-16 rounded-[22%] bg-white object-contain p-2 shadow-[0_4px_16px_rgb(11_31_53/0.14)] ring-1 ring-border/80',
    caption: 'text-sm text-text-muted',
  },
}
