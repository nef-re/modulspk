'use client'

import InteractiveCube from '@/components/InteractiveCube'

export default function HeroCube() {
  return (
    <InteractiveCube
      syncScroll
      captureWheel={false}
      autoRotate={false}
      initialRotation={{ x: -28, y: 132 }}
      showPanel={false}
      showHint={false}
      showDots={false}
      className="hero-cube"
    />
  )
}
