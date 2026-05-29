import nodemailer from 'nodemailer'
import type { ContactPayload } from '@/lib/contact-lead'

const MAIL_TO = 'info@modulspk.ru'
const MAIL_SUBJECT = 'Форма ОС [modulspk.ru]'

type UploadedFormFile = {
  name: string
  type: string
  arrayBuffer: () => Promise<ArrayBuffer>
}

function requiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Не задана переменная окружения ${name} для отправки email`)
  }
  return value
}

function createTransporter() {
  const host = requiredEnv('SMTP_HOST')
  const portRaw = requiredEnv('SMTP_PORT')
  const user = requiredEnv('SMTP_USER')
  const pass = requiredEnv('SMTP_PASS')
  const port = Number(portRaw)
  if (!Number.isFinite(port)) {
    throw new Error('SMTP_PORT должен быть числом')
  }
  const secure = String(process.env.SMTP_SECURE ?? '').toLowerCase() === 'true' || port === 465

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  })
}

export async function sendContactEmail(args: {
  payload: ContactPayload
  ip?: string
  files: UploadedFormFile[]
}) {
  const transporter = createTransporter()
  const from = process.env.SMTP_FROM || requiredEnv('SMTP_USER')
  const { payload, ip, files } = args

  const text = [
    payload.message?.trim() || '-',
    '',
    `Имя: ${payload.name || '-'}`,
    `Телефон: ${payload.phone || '-'}`,
    `Email: ${payload.email || '-'}`,
    `Сообщение: ${payload.message || '-'}`,
    `IP: ${ip || '-'}`,
    `Согласие ПДн: да`,
    `Отправлено: ${new Date().toLocaleString('ru-RU')}`,
  ].join('\n')

  const attachments = await Promise.all(
    files.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || undefined,
    })),
  )

  await transporter.sendMail({
    from,
    to: MAIL_TO,
    subject: MAIL_SUBJECT,
    text,
    attachments,
  })
}

