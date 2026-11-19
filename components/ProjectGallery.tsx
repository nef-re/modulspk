'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
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

/** Кадр-превью рядом с видео: `name.mp4` → `name-poster.jpg`. */
function videoPoster(src: string) {
  return src.replace(/\.(mp4|webm)$/i, '-poster.jpg')
}

/**
 * Видео грузится и играет только в зоне видимости — не тянет мегабайты
 * при открытии страницы и не крутится вне экрана.
 */
function LazyVideo({
  src,
  active,
  className,
  style,
}: {
  src: string
  active: boolean
  className: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '200px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (visible && active) {
      el.play().catch(() => {})
    } else {
      el.pause()
    }
  }, [visible, active])

  return (
    <video
      ref={ref}
      src={visible ? src : undefined}
      poster={videoPoster(src)}
      className={className}
      style={style}
      muted
      loop
      playsInline
      controls={false}
      preload="none"
      aria-hidden="true"
    />
  )
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
      // Тап по карточке на мобильных; для клавиатуры и скринридеров — кнопка ниже.
      // role="button" на контейнере не ставим: внутри заголовок и кнопки (невалидный HTML).
      onClick={hasPhotos ? () => setDetailsOpen((open) => !open) : undefined}
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
                <LazyVideo
                  key={`${title}-${idx}`}
                  src={photo}
                  active={isActive}
                  className={`absolute inset-0 h-full w-full ${cls}`}
                  style={mediaStyle}
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

        {hasPhotos && (
          <span className="absolute inset-x-0 bottom-3 z-[15] flex justify-center md:hidden">
            <button
              type="button"
              aria-expanded={detailsOpen}
              aria-label={`${detailsOpen ? 'Скрыть' : 'Показать'} описание: ${title}`}
              onClick={(e) => {
                e.stopPropagation()
                setDetailsOpen((open) => !open)
              }}
              className={
                detailsOpen
                  ? 'sr-only focus:not-sr-only'
                  : 'rounded-full bg-black/35 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm'
              }
            >
              {detailsOpen ? 'Скрыть описание' : 'Нажмите для описания'}
            </button>
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
