'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type ProjectGalleryProps = {
  photos: string[]
  title: string
  object: string
  description: string
  photoScale?: number[]
}

function isVideo(src: string) {
  return src.toLowerCase().endsWith('.mp4') || src.toLowerCase().endsWith('.webm')
}

export default function ProjectGallery({
  photos,
  title,
  object,
  description,
  photoScale,
}: ProjectGalleryProps) {
  const [active, setActive] = useState(0)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const hasPhotos = photos.length > 0

  useEffect(() => {
    if (photos.length <= 1) return undefined
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % photos.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [photos.length])

  const panelClasses = hasPhotos
    ? [
        'translate-y-full opacity-0 transition-all duration-500',
        detailsOpen ? 'max-md:translate-y-0 max-md:opacity-100' : '',
        'md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100',
      ].join(' ')
    : 'opacity-100'

  return (
    <div
      className={`relative overflow-hidden rounded-t-2xl bg-[#eaf2ff] ${
        hasPhotos ? 'max-md:cursor-pointer' : ''
      }`}
      onClick={hasPhotos ? () => setDetailsOpen((open) => !open) : undefined}
      onKeyDown={
        hasPhotos
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setDetailsOpen((open) => !open)
              }
            }
          : undefined
      }
      role={hasPhotos ? 'button' : undefined}
      tabIndex={hasPhotos ? 0 : undefined}
      aria-expanded={hasPhotos ? detailsOpen : undefined}
      aria-label={hasPhotos ? `${title}. Нажмите, чтобы ${detailsOpen ? 'скрыть' : 'показать'} описание` : undefined}
    >
      <div className="relative aspect-[16/8]">
        {hasPhotos ? (
          photos.map((photo, idx) => {
            const zoom = photoScale?.[idx] ?? 1
            const isActive = idx === active
            const visibility = isActive
              ? 'opacity-100'
              : 'pointer-events-none opacity-0'
            const scaleClass =
              zoom === 1
                ? isActive
                  ? 'scale-100 md:group-hover:scale-[1.06]'
                  : 'scale-[1.02]'
                : ''
            const mediaStyle =
              zoom !== 1
                ? { transform: `scale(${zoom})`, transformOrigin: 'center center' }
                : undefined
            const cls = `object-cover object-center transition-all duration-700 ${visibility} ${scaleClass}`

            if (isVideo(photo)) {
              return (
                <video
                  key={`${title}-${idx}`}
                  src={photo}
                  className={`absolute inset-0 h-full w-full ${cls}`}
                  style={mediaStyle}
                  muted
                  loop
                  playsInline
                  autoPlay={isActive}
                  controls={false}
                  preload="metadata"
                />
              )
            }

            return (
              <Image
                key={`${title}-${idx}`}
                src={photo}
                alt={`${title} — фото ${idx + 1}`}
                fill
                className={cls}
                style={mediaStyle}
                sizes="(max-width: 640px) 100vw, 50vw"
                priority={idx === 0}
              />
            )
          })
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand to-[#4c9aff]" />
        )}

        {hasPhotos && !detailsOpen && (
          <span
            className="pointer-events-none absolute inset-x-0 bottom-3 z-[15] flex justify-center md:hidden"
            aria-hidden
          >
            <span className="rounded-full bg-black/35 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
              Нажмите для описания
            </span>
          </span>
        )}

        <div
          className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-brand via-brand to-brand/80 p-4 text-white lg:p-5 ${panelClasses}`}
        >
          <h3 className="text-base font-extrabold leading-tight lg:text-lg">{title}</h3>
          <p className="mt-1 text-xs font-semibold text-white/90 lg:text-sm">Объект: {object}</p>
          <p className="mt-2 line-clamp-4 text-xs text-white/90 lg:text-sm">{description}</p>
        </div>
      </div>

      {photos.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 z-30 flex items-center justify-center gap-2">
          {photos.map((_, idx) => (
            <button
              key={`${title}-dot-${idx}`}
              type="button"
              aria-label={`Показать фото ${idx + 1}`}
              aria-current={idx === active}
              onClick={(e) => {
                e.stopPropagation()
                setActive(idx)
              }}
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
