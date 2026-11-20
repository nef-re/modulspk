/** ID счётчика Яндекс.Метрики */
export const YM_COUNTER_ID = Number(process.env.NEXT_PUBLIC_YM_ID ?? '109483081')

export function isYmEnabled(): boolean {
  return Number.isFinite(YM_COUNTER_ID) && YM_COUNTER_ID > 0
}

/** Контейнер Google Tag Manager (в нём настраивается Google Analytics 4). */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? 'GTM-TDJ886WW'

export function isGtmEnabled(): boolean {
  return /^GTM-[A-Z0-9]+$/.test(GTM_ID)
}

/**
 * Цели Метрики (тип «JavaScript-событие», идентификатор = значение):
 * создаются в интерфейсе Метрики → Настройки → Цели.
 */
export const YM_GOALS = {
  /** Заявка успешно отправлена через форму */
  leadForm: 'lead_form_sent',
  /** Клик по номеру телефона */
  phone: 'phone_click',
  /** Клик по email */
  email: 'email_click',
  /** Переход в мессенджер (MAX / Telegram) */
  messenger: 'messenger_click',
} as const

export type YmGoal = (typeof YM_GOALS)[keyof typeof YM_GOALS]

type YmFn = (id: number, method: 'reachGoal', goal: string) => void

/**
 * Отправить цель в Метрику и событие с тем же именем в Google Tag Manager
 * (в GTM — триггер «Специальное событие» с этим именем).
 * Ничего не делает, если счётчики не загружены (нет согласия на cookie).
 */
export function reachGoal(goal: YmGoal): void {
  if (typeof window === 'undefined') return
  const w = window as unknown as { ym?: YmFn; dataLayer?: unknown[]; google_tag_manager?: unknown }
  try {
    if (isYmEnabled() && typeof w.ym === 'function') w.ym(YM_COUNTER_ID, 'reachGoal', goal)
    if (isGtmEnabled() && w.google_tag_manager && Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: goal })
    }
  } catch {
    // аналитика не должна ломать сайт
  }
}

/** Какая цель соответствует ссылке (tel:, mailto:, мессенджеры). */
export function goalForHref(href: string): YmGoal | null {
  const h = href.trim().toLowerCase()
  if (h.startsWith('tel:')) return YM_GOALS.phone
  if (h.startsWith('mailto:')) return YM_GOALS.email
  if (/^https?:\/\/(www\.)?(max\.ru|t\.me|telegram\.me)\//.test(h)) return YM_GOALS.messenger
  return null
}
