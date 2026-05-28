import { Router } from 'express'
import { z } from 'zod'
import { appendFile, mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '..', 'data')
const leadsFile = path.join(dataDir, 'leads.jsonl')

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(6).max(30),
  email: z.string().email().max(120).optional().or(z.literal('')),
  service: z.string().max(64).optional(),
  message: z.string().max(2000).optional(),
})

export const contactRouter = Router()

contactRouter.post('/', async (req, res) => {
  const parsed = contactSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: 'Проверьте поля формы',
      details: parsed.error.flatten().fieldErrors,
    })
  }

  const lead = {
    ...parsed.data,
    email: parsed.data.email || undefined,
    createdAt: new Date().toISOString(),
    ip: req.ip,
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
