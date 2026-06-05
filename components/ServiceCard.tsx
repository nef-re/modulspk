import Image from 'next/image'
import Link from 'next/link'
import CubeFaceArt from '@/components/CubeFaceArt'
import Reveal from '@/components/Reveal'

type Service = {
  id: string
  title: string
  desc: string
  icon: string
  image?: string
  link: string
  accent: string
}

export default function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  return (
    <Reveal delay={index * 60}>
      <Link
        href={service.link}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgb(11_31_53/0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0_101_255/0.15)]"
      >
        {service.image ? (
          <div className="relative aspect-[4/3] overflow-hidden bg-bg">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div
            className={`relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${service.accent} p-8`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.2),transparent_55%)]" />
            <CubeFaceArt type={service.icon} size="panel" />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="text-xl font-bold text-text group-hover:text-brand">{service.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{service.desc}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand">
            Подробнее
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 transition group-hover:translate-x-1"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              />
            </svg>
          </span>
        </div>
      </Link>
    </Reveal>
  )
}
