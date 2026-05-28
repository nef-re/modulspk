'use client'

import Link from 'next/link'
import { useRef, useState, type FormEvent } from 'react'
import { FILE_UPLOAD_LIMITS } from '@/lib/contact-upload-config'
import { submitContact } from '@/lib/api'
import { legal } from '@/lib/legal'
import { Button } from '@/components/ui/Button'

const inputClass =
  'w-full rounded-[var(--radius-md)] border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20'
const maxFiles = FILE_UPLOAD_LIMITS.maxFiles
const maxFileSizeMB = Math.floor(FILE_UPLOAD_LIMITS.maxFileSizeBytes / (1024 * 1024))

export default function ContactForm() {
  const startedAtRef = useRef(Date.now())
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [consent, setConsent] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  function mergeFiles(incoming: File[]) {
    if (!incoming.length) return
    setSelectedFiles((prev) => {
      const map = new Map<string, File>()
      for (const file of [...prev, ...incoming]) {
        map.set(`${file.name}-${file.size}-${file.lastModified}`, file)
      }
      return Array.from(map.values())
    })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!consent) {
      setError('Необходимо дать согласие на обработку персональных данных')
      return
    }

    const form = e.currentTarget
    const data = new FormData(form)
    const phone = String(data.get('phone') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()

    if (!phone && !email) {
      setError('Укажите телефон или email для обратной связи')
      return
    }

    setLoading(true)

    try {
      const files = selectedFiles.filter((file) => file.size > 0)
      if (files.length > maxFiles) {
        throw new Error(`Можно приложить не более ${maxFiles} файлов.`)
      }
      const tooLarge = files.find((file) => file.size > maxFileSizeMB * 1024 * 1024)
      if (tooLarge) {
        throw new Error(`Файл слишком большой: ${tooLarge.name}`)
      }

      data.delete('attachments')
      files.forEach((file) => data.append('attachments', file))
      data.set('phone', phone)
      data.set('email', email)
      data.set('website', String(data.get('website') ?? ''))
      data.set('formStartedAt', String(startedAtRef.current))
      data.set('personalDataConsent', 'true')

      await submitContact(data)
      setSent(true)
      form.reset()
      setConsent(false)
      setSelectedFiles([])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка отправки'
      setError(
        message === 'Failed to fetch' || message.includes('NetworkError')
          ? 'Не удалось отправить заявку. Проверьте подключение к интернету или позвоните нам.'
          : message,
      )
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-brand/20 bg-brand-dim p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-2xl text-white">
          ✓
        </div>
        <h3 className="text-xl font-bold">Заявка отправлена</h3>
        <p className="mt-2 text-text-muted">Мы свяжемся с вами в ближайшее рабочее время.</p>
      </div>
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      {/* Honeypot: поле скрыто для пользователей, но часто заполняется ботами */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5 text-sm">
          <span className="font-semibold text-text-muted">Имя</span>
          <input type="text" name="name" placeholder="Иван Иванов" className={inputClass} />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-semibold text-text-muted">Телефон</span>
          <input type="tel" name="phone" placeholder="+7 (___) ___-__-__" className={inputClass} />
        </label>
      </div>
      <label className="block space-y-1.5 text-sm">
        <span className="font-semibold text-text-muted">Email</span>
        <input type="email" name="email" placeholder="mail@example.ru" className={inputClass} />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-semibold text-text-muted">Сообщение</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Опишите объект и задачу..."
          className={inputClass}
        />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-semibold text-text-muted">Прикрепить файлы</span>
        <input
          ref={fileInputRef}
          type="file"
          name="attachments"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip,.rar,.dwg"
          className="hidden"
          onChange={(e) => mergeFiles(Array.from(e.target.files ?? []))}
        />
        <div className="mt-1 grid gap-3 sm:grid-cols-[auto_1fr]">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-white px-5 text-sm font-semibold text-text transition hover:border-brand hover:text-brand"
          >
            Выбрать файлы
          </button>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              mergeFiles(Array.from(e.dataTransfer.files ?? []))
            }}
            className="flex min-h-11 items-center rounded-xl border border-dashed border-border bg-white px-4 text-sm text-text-muted"
          >
            Перетащите файлы сюда
          </div>
        </div>
        <p className="text-xs text-text-muted">
          До {maxFiles} файлов, не более {maxFileSizeMB} МБ каждый (PDF, DOC/DOCX, XLS/XLSX, JPG/PNG, ZIP, RAR, DWG).
        </p>
        {selectedFiles.length > 0 && (
          <div className="rounded-xl border border-border bg-white px-4 py-3 text-sm">
            <p className="mb-2 font-semibold text-text">Загруженные файлы:</p>
            <ul className="space-y-1 text-text-muted">
              {selectedFiles.map((file) => (
                <li key={`${file.name}-${file.size}`} className="truncate">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </label>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-bg px-4 py-3 text-sm">
        <input
          type="checkbox"
          name="personalDataConsent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-1 h-4 w-4 shrink-0 accent-brand"
        />
        <span className="text-text-muted leading-relaxed">
          Я даю{' '}
          <Link href={legal.links.consent} className="text-brand hover:underline" target="_blank">
            согласие
          </Link>{' '}
          на обработку персональных данных и подтверждаю ознакомление с{' '}
          <Link href={legal.links.privacy} className="text-brand hover:underline" target="_blank">
            политикой обработки персональных данных
          </Link>
          .
        </span>
      </label>
      <p className="text-xs text-text-muted">Обязательное поле: телефон или email.</p>

      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      <Button type="submit" full disabled={loading} className="disabled:opacity-60">
        {loading ? 'Отправка…' : 'Отправить заявку'}
      </Button>
    </form>
  )
}
