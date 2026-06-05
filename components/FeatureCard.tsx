import Image from 'next/image'
import Reveal from '@/components/Reveal'

export default function FeatureCard({
  title,
  text,
  image,
  imageAlt,
  index = 0,
}: {
  title: string
  text: string
  image?: string
  imageAlt?: string
  index?: number
}) {
  return (
    <Reveal delay={index * 100}>
      <article className="h-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:shadow-md">
        {image ? (
          <div className="relative aspect-[16/10] bg-[#eaf2ff]">
            <Image
              src={image}
              alt={imageAlt ?? title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="h-1 bg-brand" />
        )}
        <div className="p-6">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{text}</p>
        </div>
      </article>
    </Reveal>
  )
}
