'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { submitContact } from '@/lib/api'
import { Button } from '@/components/ui/Button'

const inputClass =
  'w-full rounded-[var(--radius-md)] border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20'

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      await submitContact({
        name: String(data.get('name') ?? ''),
        phone: String(data.get('phone') ?? ''),
        email: String(data.get('email') ?? '') || undefined,
        service: String(data.get('service') ?? '') || undefined,
        message: String(data.get('message') ?? '') || undefined,
      })
      setSent(true)
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка отправки')
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
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5 text-sm">
          <span className="font-semibold text-text-muted">Имя</span>
          <input type="text" name="name" required placeholder="Иван Иванов" className={inputClass} />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-semibold text-text-muted">Телефон</span>
          <input type="tel" name="phone" required placeholder="+7 (___) ___-__-__" className={inputClass} />
        </label>
      </div>
      <label className="block space-y-1.5 text-sm">
        <span className="font-semibold text-text-muted">Email</span>
        <input type="email" name="email" placeholder="mail@example.ru" className={inputClass} />
      </label>
      <label className="block space-y-1.5 text-sm">
        <span className="font-semibold text-text-muted">Тип услуги</span>
        <select name="service" defaultValue="" className={inputClass}>
          <option value="" disabled>
            Выберите направление
          </option>
          <option value="vent-design">Проектирование вентиляции</option>
          <option value="vent-install">Монтаж вентиляции</option>
          <option value="vent-prod">Производство оборудования</option>
          <option value="elec-design">Проектирование электрики</option>
          <option value="elec-install">Монтаж электрики</option>
          <option value="other">Другое</option>
        </select>
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
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" full disabled={loading} className="disabled:opacity-60">
        {loading ? 'Отправка…' : 'Отправить заявку'}
      </Button>
      <p className="text-center text-xs text-text-muted">
        Нажимая кнопку, вы соглашаетесь с{' '}
        <Link href="/privacy" className="text-brand hover:underline">
          политикой обработки данных
        </Link>
        .
      </p>
    </form>
  )
}
