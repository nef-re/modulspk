'use client'

import InteractiveCube from '@/components/InteractiveCube'

export default function HeroCube() {
  return (
    <InteractiveCube
      syncScroll
      captureWheel={false}
      autoRotate={false}
      initialRotation={{ x: -34, y: 226 }}
      showPanel={false}
      showHint={false}
      showDots={false}
      className="hero-cube"
    />
  )
}
