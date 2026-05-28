import { appendFile, mkdir, writeFile } from 'fs/promises'
import { randomUUID } from 'crypto'
import path from 'path'
import { z } from 'zod'
import { FILE_UPLOAD_LIMITS } from '@/lib/contact-upload-config'

export const contactSchema = z.object({
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

export type ContactPayload = z.infer<typeof contactSchema>
export type UploadedFileMeta = {
  originalName: string
  savedName: string
  mimeType: string
  size: number
  relativePath: string
}

export function isLikelySpam(payload: ContactPayload): boolean {
  const honeypot = payload.website?.trim()
  if (honeypot) return true

  if (payload.formStartedAt) {
    const elapsed = Date.now() - payload.formStartedAt
    if (elapsed < 1500) return true
  }
  return false
}

function leadsFilePath() {
  return path.join(process.cwd(), 'server', 'data', 'leads.jsonl')
}

function uploadsDirPath() {
  return path.join(process.cwd(), 'server', 'uploads')
}

function sanitizeFileName(name: string): string {
  return name.replace(/[^\w.\-() ]+/g, '_').slice(0, 120)
}

export async function saveUploadedFiles(files: File[]): Promise<UploadedFileMeta[]> {
  if (files.length > FILE_UPLOAD_LIMITS.maxFiles) {
    throw new Error(`Можно приложить не более ${FILE_UPLOAD_LIMITS.maxFiles} файлов`)
  }

  const uploadsDir = uploadsDirPath()
  await mkdir(uploadsDir, { recursive: true })
  const saved: UploadedFileMeta[] = []

  for (const file of files) {
    const ext = path.extname(file.name || '').toLowerCase()
    const mimeAllowed = FILE_UPLOAD_LIMITS.allowedMimeTypes.includes(
      file.type as (typeof FILE_UPLOAD_LIMITS.allowedMimeTypes)[number],
    )
    const extAllowed = FILE_UPLOAD_LIMITS.allowedExtensions.includes(
      ext as (typeof FILE_UPLOAD_LIMITS.allowedExtensions)[number],
    )
    if (!mimeAllowed && !extAllowed) {
      throw new Error(`Недопустимый тип файла: ${file.name}`)
    }
    if (file.size > FILE_UPLOAD_LIMITS.maxFileSizeBytes) {
      throw new Error(`Файл слишком большой: ${file.name}`)
    }

    const safeBase = sanitizeFileName(path.basename(file.name, ext) || 'file')
    const savedName = `${Date.now()}-${randomUUID()}-${safeBase}${ext}`
    const absolutePath = path.join(uploadsDir, savedName)
    const relativePath = path.join('server', 'uploads', savedName)
    const bytes = Buffer.from(await file.arrayBuffer())
    await writeFile(absolutePath, bytes)

    saved.push({
      originalName: file.name,
      savedName,
      mimeType: file.type,
      size: file.size,
      relativePath,
    })
  }
  return saved
}

export async function saveContactLead(
  payload: ContactPayload,
  meta?: { ip?: string; attachments?: UploadedFileMeta[] },
) {
  const lead = {
    name: payload.name || undefined,
    phone: payload.phone || undefined,
    email: payload.email || undefined,
    message: payload.message,
    attachments: meta?.attachments ?? [],
    personalDataConsent: true,
    consentAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    ip: meta?.ip,
  }

  const dataDir = path.dirname(leadsFilePath())
  await mkdir(dataDir, { recursive: true })
  await appendFile(leadsFilePath(), `${JSON.stringify(lead)}\n`, 'utf8')
  return lead
}

export function parseContactBody(body: unknown) {
  return contactSchema.safeParse(body)
}
