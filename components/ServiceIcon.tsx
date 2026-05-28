import type { ReactNode } from 'react'

const icons: Record<string, ReactNode> = {
  blueprint: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
      <path d="M4 20V4l8-3 8 3v16l-8 3-8-3z" />
      <path d="M12 1v22M4 7l8 3 8-3" />
    </svg>
  ),
  install: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
      <path d="M14 4h6v6M10 20H4v-6M20 4l-8 8M4 20l8-8" />
    </svg>
  ),
  factory: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
      <path d="M2 20V10l6-3v13M8 7l6-3v16M14 4l8-4v20H2" />
      <path d="M6 14h2M10 14h2M14 14h2" />
    </svg>
  ),
  circuit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <path d="M10 6h4M6 10v4M14 14h4M18 10v-4" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  ),
}

export default function ServiceIcon({ name }: { name: string }) {
  return (
    <span className="mb-4 inline-flex rounded-xl bg-brand-dim p-3 text-brand">
      {icons[name] ?? icons.blueprint}
    </span>
  )
}
