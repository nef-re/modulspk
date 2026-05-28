import Reveal from '@/components/Reveal'

export default function FeatureCard({
  title,
  text,
  index = 0,
}: {
  title: string
  text: string
  index?: number
}) {
  return (
    <Reveal delay={index * 100}>
      <article className="h-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:shadow-md">
        <div className="h-1 bg-brand" />
        <div className="p-6">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{text}</p>
        </div>
      </article>
    </Reveal>
  )
}
