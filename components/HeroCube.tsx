'use client'

import InteractiveCube from '@/components/InteractiveCube'

export default function HeroCube() {
  return (
    <InteractiveCube
      syncScroll={false}
      captureWheel={false}
      showPanel={false}
      showHint={false}
      showDots={false}
      className="hero-cube"
    />
  )
}
