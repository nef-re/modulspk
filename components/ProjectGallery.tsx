'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type ProjectGalleryProps = {
  photos: string[]
  title: string
  object: string
  description: string
}

export default function ProjectGallery({ photos, title, object, description }: ProjectGalleryProps) {
  const [active, setActive] = useState(0)
  const hasPhotos = photos.length > 0

  useEffect(() => {
    if (photos.length <= 1) return undefined
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % photos.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [photos.length])

  return (
    <div className="relative overflow-hidden rounded-t-2xl bg-[#eaf2ff]">
      <div className="relative aspect-[16/8]">
        {hasPhotos ? (
          photos.map((photo, idx) => (
            <Image
              key={`${title}-${idx}`}
              src={photo}
              alt={`${title} — фото ${idx + 1}`}
              fill
              className={`object-cover transition-all duration-700 ${
                idx === active
                  ? 'scale-100 object-center opacity-100 md:group-hover:scale-[1.06]'
                  : 'pointer-events-none scale-[1.02] object-center opacity-0'
              }`}
              sizes="(max-width: 640px) 100vw, 50vw"
              priority={idx === 0}
            />
          ))
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand to-[#4c9aff]" />
        )}

        <div
          className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-brand via-brand to-brand/80 p-4 text-white lg:p-5 ${
            hasPhotos
              ? 'md:translate-y-full md:opacity-0 md:transition-all md:duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100'
              : 'opacity-100'
          }`}
        >
          <h3 className="text-base font-extrabold leading-tight lg:text-lg">{title}</h3>
          <p className="mt-1 text-xs font-semibold text-white/90 lg:text-sm">Объект: {object}</p>
          <p className="mt-2 line-clamp-4 text-xs text-white/90 lg:text-sm">{description}</p>
        </div>
      </div>

      {photos.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-2">
          {photos.map((_, idx) => (
            <button
              key={`${title}-dot-${idx}`}
              type="button"
              aria-label={`Показать фото ${idx + 1}`}
              aria-current={idx === active}
              onClick={() => setActive(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === active ? 'w-6 bg-white' : 'w-2.5 bg-white/60 hover:bg-white/85'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

