import type { MetadataRoute } from 'next'
import { company } from '@/lib/site'

const routes = [
  '/',
  '/proektirovanie',
  '/smr',
  '/proizvodstvo',
  '/ventilyaciya',
  '/elektrika',
  '/o-kompanii',
  '/kontakty',
  '/privacy',
  '/cookies',
  '/consent',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return routes.map((route) => ({
    url: `${company.siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/kontakty' ? 0.9 : 0.8,
  }))
}

