export function getApiBase(): string {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? 'http://localhost:3001'
  }
  return process.env.NEXT_PUBLIC_API_URL ?? ''
}

export async function submitContact(formData: FormData) {
  const base = getApiBase()
  const url = base ? `${base}/api/contact` : '/api/contact'

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    const details = json.details as Record<string, string[] | undefined> | undefined
    const fieldHint = details
      ? Object.values(details).flat().filter(Boolean)[0]
      : undefined
    throw new Error(fieldHint ?? json.error ?? 'Ошибка отправки')
  }
  return json
}
