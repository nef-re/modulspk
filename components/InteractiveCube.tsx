'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import CubeFaceImage from '@/components/CubeFaceImage'
import { cubeFaces } from '@/lib/site'

const FACE_LABELS = ['front', 'right', 'back', 'left', 'top', 'bottom'] as const
/** Раскладка: front, right, back, left, top, bottom — вентиляция/электрика напротив; сверху ПНР, снизу СМР */
const FACE_MAP = [0, 4, 3, 5, 2, 1]

export default function InteractiveCube({
  className = '',
  syncScroll = true,
  activeIndex: controlledIndex,
  onActiveChange,
  showPanel = true,
  showHint = true,
  showDots = true,
  captureWheel = true,
  autoRotate = true,
  initialRotation = cubeFaces[0].rotation,
}: {
  className?: string
  syncScroll?: boolean
  activeIndex?: number
  onActiveChange?: (index: number) => void
  showPanel?: boolean
  showHint?: boolean
  showDots?: boolean
  /** false — колёсико прокручивает страницу, не грани куба */
  captureWheel?: boolean
  /** Автоповорот граней (в hero лучше выключить — меньше дёрганий при скролле) */
  autoRotate?: boolean
  initialRotation?: { x: number; y: number }
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const [internalIndex, setInternalIndex] = useState(0)
  const isControlled = controlledIndex !== undefined
  const activeIndex = isControlled ? controlledIndex : internalIndex

  const [rotation, setRotation] = useState(initialRotation)
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 })
  const rotationRef = useRef(initialRotation)
  const idleTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastScrollYRef = useRef(0)

  const setActive = useCallback(
    (index: number) => {
      const i = ((index % cubeFaces.length) + cubeFaces.length) % cubeFaces.length
      if (!isControlled) setInternalIndex(i)
      onActiveChange?.(i)
      setRotation(cubeFaces[i].rotation)
      rotationRef.current = cubeFaces[i].rotation
    },
    [isControlled, onActiveChange],
  )

  const goToFace = useCallback((index: number) => setActive(index), [setActive])

  useEffect(() => {
    if (isControlled && controlledIndex !== undefined) {
      setRotation(cubeFaces[controlledIndex].rotation)
      rotationRef.current = cubeFaces[controlledIndex].rotation
    }
  }, [isControlled, controlledIndex])

  const nextFace = useCallback(() => goToFace(activeIndex + 1), [activeIndex, goToFace])
  const prevFace = useCallback(() => goToFace(activeIndex - 1), [activeIndex, goToFace])

  useEffect(() => {
    if (!captureWheel) return undefined
    const el = sceneRef.current
    if (!el) return undefined

    const onWheel = (e: WheelEvent) => {
      if (!el.contains(e.target as Node)) return
      e.preventDefault()
      e.stopPropagation()
      if (e.deltaY > 0) nextFace()
      else prevFace()
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [captureWheel, nextFace, prevFace])

  useEffect(() => {
    if (!syncScroll) return undefined
    const section =
      document.getElementById('cube-scroll-section') ??
      sceneRef.current?.closest('section') ??
      sceneRef.current?.parentElement
    if (!section) return undefined

    const onScroll = () => {
      if (isDragging) return
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.top > vh || rect.bottom < 0) return

      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollYRef.current
      if (!delta) return
      lastScrollYRef.current = currentScrollY

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const nextY = rotationRef.current.y + delta * 0.28
        const nextX = Math.max(-60, Math.min(36, rotationRef.current.x - delta * 0.08))
        const nextRotation = { x: nextX, y: nextY }
        rotationRef.current = nextRotation
        setRotation(nextRotation)

        // Обновляем активную грань только как индикатор, без "прилипания" к фиксированным углам.
        const normalized = ((nextY % 360) + 360) % 360
        const snapped = Math.round(normalized / 60) % cubeFaces.length
        if (!isControlled) setInternalIndex(snapped)
        onActiveChange?.(snapped)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    lastScrollYRef.current = window.scrollY
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [isControlled, isDragging, onActiveChange, syncScroll])

  useEffect(() => {
    if (!autoRotate || isDragging || isControlled) return undefined
    idleTimer.current = setInterval(() => {
      setInternalIndex((prev) => {
        const next = (prev + 1) % cubeFaces.length
        setRotation(cubeFaces[next].rotation)
        onActiveChange?.(next)
        return next
      })
    }, 5000)
    return () => {
      if (idleTimer.current) clearInterval(idleTimer.current)
    }
  }, [autoRotate, isDragging, isControlled, onActiveChange])

  const onPointerDown = (e: React.PointerEvent) => {
    if (!e.isPrimary) return
    if (e.pointerType === 'mouse' && e.button !== 0) return
    setIsDragging(true)
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotation.x,
      rotY: rotation.y,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !e.isPrimary) return
    const dx = e.clientX - dragRef.current.x
    const dy = e.clientY - dragRef.current.y
    const rotY = dragRef.current.rotY + dx * 0.4
    const rotX = Math.max(-70, Math.min(40, dragRef.current.rotX - dy * 0.3))
    const nextRotation = { x: rotX, y: rotY }
    rotationRef.current = nextRotation
    setRotation(nextRotation)

    const normalized = ((rotY % 360) + 360) % 360
    const snapped = Math.round(normalized / 60) % cubeFaces.length
    if (snapped !== activeIndex) {
      if (!isControlled) setInternalIndex(snapped)
      onActiveChange?.(snapped)
    }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (!e.isPrimary) return
    setIsDragging(false)
    e.currentTarget.releasePointerCapture(e.pointerId)
    goToFace(activeIndex)
  }

  const active = cubeFaces[activeIndex]

  return (
    <div ref={wrapRef} className={`flex flex-col items-center gap-6 ${className}`}>
      {showHint && (
        <p className="text-center text-xs text-text-muted max-md:hidden">
          Крутите куб мышью или колёсиком · при прокрутке страницы грани меняются
        </p>
      )}

      <div
        ref={sceneRef}
        className={`interactive-cube-scene ${isDragging ? 'interactive-cube-scene--drag' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="img"
        aria-label={`Интерактивный куб: ${active.title}`}
      >
        <div
          className="interactive-cube"
          style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
        >
          {FACE_LABELS.map((pos, i) => {
            const data = cubeFaces[FACE_MAP[i]]
            return (
              <div
                key={pos}
                className={`interactive-cube__face interactive-cube__face--${pos}`}
                aria-label={data.title}
              >
                <CubeFaceImage icon={data.icon} />
              </div>
            )
          })}
        </div>
        <div className="interactive-cube__shadow" aria-hidden="true" />
      </div>

      {showPanel && (
        <div className="flex w-full max-w-lg gap-4 rounded-2xl border border-border bg-bg-card p-4 shadow-lg">
          <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden">
            <CubeFaceImage icon={active.icon} className="rounded-lg" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-text">{active.title}</h3>
            <p className="mb-2 text-sm text-text-muted">{active.subtitle}</p>
          </div>
        </div>
      )}

      {showDots && (
        <div className="flex gap-2" role="tablist" aria-label="Грани куба">
          {cubeFaces.map((face, i) => (
            <button
              key={face.id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={face.title}
              className={`h-2.5 w-2.5 rounded-full transition-transform ${
                i === activeIndex ? 'scale-125 bg-brand' : 'bg-border'
              }`}
              onClick={() => goToFace(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
