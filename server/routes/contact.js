import { Router } from 'express'
import { z } from 'zod'
import { appendFile, mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '..', 'data')
const leadsFile = path.join(dataDir, 'leads.jsonl')
const rateLimit = new Map()

const contactSchema = z.object({
  name: z.string().min(2).max(120).optional().or(z.literal('')),
  phone: z.string().min(6).max(30).optional().or(z.literal('')),
  email: z.string().email().max(120).optional().or(z.literal('')),
  message: z.string().max(2000).optional(),
  website: z.string().max(256).optional().or(z.literal('')),
  formStartedAt: z.number().optional(),
  personalDataConsent: z.literal(true, {
    errorMap: () => ({ message: 'Требуется согласие на обработку персональных данных' }),
  }),
}).refine((data) => Boolean(data.phone?.trim() || data.email?.trim()), {
  message: 'Укажите телефон или email',
  path: ['phone'],
})

function checkRateLimit(ip) {
  const now = Date.now()
  const current = rateLimit.get(ip)
  if (!current || current.resetAt < now) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  if (current.count >= 5) return false
  current.count += 1
  return true
}

export const contactRouter = Router()

contactRouter.post('/', async (req, res) => {
  const ip = req.ip ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      ok: false,
      error: 'Слишком много запросов. Повторите через минуту.',
    })
  }

  const parsed = contactSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: 'Проверьте поля формы',
      details: parsed.error.flatten().fieldErrors,
    })
  }

  if ((parsed.data.website ?? '').trim()) {
    return res.status(400).json({ ok: false, error: 'Запрос отклонен как подозрительный.' })
  }

  if (parsed.data.formStartedAt && Date.now() - parsed.data.formStartedAt < 1500) {
    return res.status(400).json({ ok: false, error: 'Запрос отклонен как подозрительный.' })
  }

  const lead = {
    name: parsed.data.name || undefined,
    phone: parsed.data.phone || undefined,
    email: parsed.data.email || undefined,
    message: parsed.data.message,
    personalDataConsent: true,
    consentAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    ip,
  }

  try {
    await mkdir(dataDir, { recursive: true })
    await appendFile(leadsFile, `${JSON.stringify(lead)}\n`, 'utf8')
    console.log('[lead]', lead.name, lead.phone)
    res.status(201).json({ ok: true, message: 'Заявка принята' })
  } catch (err) {
    console.error('Failed to save lead:', err)
    res.status(500).json({ ok: false, error: 'Не удалось сохранить заявку' })
  }
})
