type Size = 'face' | 'panel'

const sizeClass: Record<Size, string> = {
  face: 'h-[72px] w-[72px] max-h-[72px] max-w-[72px] shrink-0',
  panel: 'h-20 w-20 max-h-20 max-w-20 shrink-0',
}

/** Иконки для граней куба — линейный стиль, высокий контраст */
export default function CubeFaceArt({ type, size = 'face' }: { type: string; size?: Size }) {
  const cls = `block shrink-0 drop-shadow-sm ${sizeClass[size]}`

  switch (type) {
    case 'design':
      return (
        <svg className={cls} viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <rect x="14" y="18" width="52" height="44" stroke="white" strokeWidth="2" />
          <path d="M22 30 H58 M22 40 H48 M22 50 H36" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M50 46 L58 38 L58 54 Z" fill="white" fillOpacity="0.9" />
          <circle cx="40" cy="12" r="3" fill="white" />
          <path d="M40 15 V18" stroke="white" strokeWidth="1.5" />
        </svg>
      )
    case 'smr':
      return (
        <svg className={cls} viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <path d="M16 58 H64 V42 L48 48 L40 32 L24 40 L16 36 Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2" strokeLinejoin="round" />
          <rect x="22" y="46" width="10" height="12" fill="white" />
          <path d="M38 28 V46 M38 28 L52 22 V46" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="58" cy="26" r="5" stroke="white" strokeWidth="2" />
          <path d="M58 21 V16 M58 31 V36 M53 26 H48 M63 26 H68" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'pnr':
      return (
        <svg className={cls} viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <rect x="20" y="22" width="40" height="36" rx="0" stroke="white" strokeWidth="2" />
          <path d="M28 34 L36 42 L52 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M28 50 H52" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <circle cx="56" cy="24" r="8" stroke="white" strokeWidth="2" />
          <path d="M56 18 V14 M56 30 V34" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'production':
      return (
        <svg className={cls} viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <path d="M12 56 H68 V36 L54 42 L40 26 L26 34 L12 30 Z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2" strokeLinejoin="round" />
          <rect x="20" y="44" width="12" height="12" fill="white" />
          <rect x="36" y="40" width="12" height="16" fill="white" fillOpacity="0.85" />
          <rect x="52" y="46" width="10" height="10" fill="white" fillOpacity="0.7" />
          <path d="M58 28 L62 20 L66 28 L62 32 Z" fill="white" />
        </svg>
      )
    case 'ventilation':
      return (
        <svg className={cls} viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <circle cx="40" cy="40" r="22" stroke="white" strokeWidth="2" opacity="0.4" />
          <circle cx="40" cy="40" r="5" fill="white" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={deg}
              d="M40 16 L44 30 L40 26 L36 30 Z"
              fill="white"
              transform={`rotate(${deg} 40 40)`}
            />
          ))}
          <path d="M8 40 H18 M62 40 H72" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <ellipse cx="40" cy="40" rx="32" ry="10" stroke="white" strokeWidth="1" opacity="0.25" />
        </svg>
      )
    case 'electrics':
      return (
        <svg className={cls} viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <path
            d="M44 12 L28 44 H38 L34 68 L58 36 H46 L44 12Z"
            fill="white"
            stroke="white"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <rect x="14" y="52" width="14" height="18" stroke="white" strokeWidth="2" />
          <path d="M18 58 H24 M18 64 H24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'maintenance':
      return (
        <svg className={cls} viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <circle cx="40" cy="40" r="18" stroke="white" strokeWidth="2" />
          <path
            d="M52 28 L58 22 M58 22 L62 26 M58 22 L54 26"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M34 40 L38 44 L48 32" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'exec-docs':
      return (
        <svg className={cls} viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <rect x="18" y="16" width="44" height="52" stroke="white" strokeWidth="2" />
          <path d="M28 30 H52 M28 40 H52 M28 50 H44" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <rect x="46" y="12" width="16" height="16" rx="8" stroke="white" strokeWidth="2" />
          <path d="M50 20 L52 22 L58 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}
