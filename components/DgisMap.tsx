'use client'

import { useEffect, useId, useRef } from 'react'
import { company } from '@/lib/site'

type DGMap = {
  remove: () => void
}

type DGNamespace = {
  then: (cb: () => void) => void
  map: (el: HTMLElement | string, opts: { center: [number, number]; zoom: number }) => DGMap
  marker: (coords: [number, number]) => { addTo: (map: DGMap) => void }
}

declare global {
  interface Window {
    DG?: DGNamespace
  }
}

let loaderPromise: Promise<void> | null = null

function loadDgisApi() {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.DG) {
    return new Promise<void>((resolve) => {
      window.DG!.then(() => resolve())
    })
  }

  if (!loaderPromise) {
    loaderPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://maps.api.2gis.ru/2.0/loader.js?pkg=full'
      script.async = true
      script.onload = () => window.DG?.then(() => resolve())
      script.onerror = () => reject(new Error('Не удалось загрузить карту 2ГИС'))
      document.head.appendChild(script)
    })
  }

  return loaderPromise
}

export default function DgisMap({ className = '' }: { className?: string }) {
  const reactId = useId().replace(/:/g, '')
  const mapId = `dgis-map-${reactId}`
  const mapRef = useRef<DGMap | null>(null)

  useEffect(() => {
    let cancelled = false

    loadDgisApi()
      .then(() => {
        if (cancelled || !window.DG) return
        const container = document.getElementById(mapId)
        if (!container) return

        const map = window.DG.map(container, {
          center: [company.mapLat, company.mapLon],
          zoom: company.mapZoom,
        })
        window.DG.marker([company.mapLat, company.mapLon]).addTo(map)
        mapRef.current = map
      })
      .catch(() => {})

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [mapId])

  return (
    <div className={className}>
      <div
        id={mapId}
        className="h-[340px] w-full bg-bg"
        role="region"
        aria-label={`Карта 2ГИС: ${company.address}`}
      />
      <a
        href={company.map2gisUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex text-sm font-semibold text-brand hover:underline"
      >
        Открыть адрес в 2ГИС
      </a>
    </div>
  )
}
