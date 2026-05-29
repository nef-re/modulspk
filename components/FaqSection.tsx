import Reveal from '@/components/Reveal'
import type { FaqItem } from '@/lib/site'

export default function FaqSection({
  items,
  title = 'Частые вопросы о вентиляции и электрике в Томске',
}: {
  items: readonly FaqItem[]
  title?: string
}) {
  if (items.length === 0) return null

  return (
    <section className="border-t border-border bg-bg py-16 lg:py-20">
      <div className="container-site max-w-3xl">
        <Reveal>
          <h2 className="text-center text-2xl font-bold lg:text-3xl">{title}</h2>
        </Reveal>
        <dl className="mt-10 space-y-4">
          {items.map((item, i) => (
            <Reveal key={item.q} delay={i * 50}>
              <details className="group rounded-2xl border border-border bg-white px-5 py-4 shadow-sm open:shadow-md">
                <summary className="cursor-pointer list-none font-semibold text-text marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span
                      className="mt-1 shrink-0 text-brand transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </span>
                </summary>
                <dd className="mt-3 text-sm leading-relaxed text-text-muted">{item.a}</dd>
              </details>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
