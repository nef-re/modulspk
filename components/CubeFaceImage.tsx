const FACE_IMAGES: Record<string, string> = {
  electrics: '/cube/electrics.png',
  ventilation: '/cube/ventilation.png',
  smr: '/cube/smr.png',
  design: '/cube/design.png',
  pnr: '/cube/pnr.png',
  production: '/cube/production.png',
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
