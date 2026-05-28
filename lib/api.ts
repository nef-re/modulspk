export function getApiBase(): string {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? 'http://localhost:3001'
  }
  return process.env.NEXT_PUBLIC_API_URL ?? ''
}

export async function submitContact(data: {
  name: string
  phone: string
  email?: string
  service?: string
  message?: string
}) {
  const base = getApiBase()
  const url = base ? `${base}/api/contact` : '/api/contact'

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(json.error ?? 'Ошибка отправки')
  }
  return json
}
