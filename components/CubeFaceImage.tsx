const FACE_IMAGES: Record<string, string> = {
  electrics: '/cube/electrics.webp',
  ventilation: '/cube/ventilation.webp',
  smr: '/cube/smr.webp',
  design: '/cube/design.webp',
  pnr: '/cube/pnr.webp',
  production: '/cube/production.webp',
}

export default function CubeFaceImage({
  icon,
  className = '',
}: {
  icon: string
  className?: string
}) {
  const src = FACE_IMAGES[icon]
  if (!src) return null

  return (
    <div className={`cube-face-image-wrap ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="cube-face-image"
        draggable={false}
        decoding="async"
      />
      <span className="cube-face-image-edge-glow" aria-hidden />
    </div>
  )
}
