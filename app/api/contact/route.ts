import { FILE_UPLOAD_LIMITS } from '@/lib/contact-upload-config'
import { sendContactEmail } from '@/lib/contact-mailer'
import { isLikelySpam, parseContactBody, saveContactLead, saveUploadedFiles } from '@/lib/contact-lead'

export const runtime = 'nodejs'

const rateLimit = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
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

export async function POST(request: Request) {
  let body: unknown
  let files: File[] = []
  try {
    const contentType = request.headers.get('content-type') ?? ''
    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData()
      files = form
        .getAll('attachments')
        .filter((item): item is File => item instanceof File && item.size > 0)

      body = {
        name: String(form.get('name') ?? ''),
        phone: String(form.get('phone') ?? ''),
        email: String(form.get('email') ?? ''),
        message: String(form.get('message') ?? ''),
        website: String(form.get('website') ?? ''),
        formStartedAt: Number(form.get('formStartedAt') ?? 0) || undefined,
        personalDataConsent:
          String(form.get('personalDataConsent') ?? '').toLowerCase() === 'true',
      }
    } else {
      body = await request.json()
    }
  } catch {
    return Response.json({ ok: false, error: 'Некорректный формат запроса' }, { status: 400 })
  }

  const parsed = parseContactBody(body)
  if (!parsed.success) {
    return Response.json(
      {
        ok: false,
        error: 'Проверьте поля формы',
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown'

    if (!checkRateLimit(ip)) {
      return Response.json(
        { ok: false, error: 'Слишком много запросов. Повторите через минуту.' },
        { status: 429 },
      )
    }

    if (isLikelySpam(parsed.data)) {
      return Response.json({ ok: false, error: 'Запрос отклонен как подозрительный.' }, { status: 400 })
    }

    if (files.length > FILE_UPLOAD_LIMITS.maxFiles) {
      return Response.json(
        { ok: false, error: `Можно приложить не более ${FILE_UPLOAD_LIMITS.maxFiles} файлов.` },
        { status: 400 },
      )
    }

    const attachments = await saveUploadedFiles(files)
    await saveContactLead(parsed.data, { ip, attachments })
    await sendContactEmail({ payload: parsed.data, ip, files })
    return Response.json({ ok: true, message: 'Заявка принята' }, { status: 201 })
  } catch (err) {
    console.error('[contact]', err)
    const message = err instanceof Error ? err.message : 'Не удалось сохранить заявку'
    const isValidation =
      message.includes('Можно приложить') ||
      message.includes('Недопустимый тип файла') ||
      message.includes('Файл слишком большой')
    return Response.json({ ok: false, error: message }, { status: isValidation ? 400 : 500 })
  }
}
