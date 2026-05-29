import type { MetadataRoute } from 'next'
import { company } from '@/lib/site'

const routes: {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/uslugi', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/proektirovanie', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/smr', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/proizvodstvo', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/ventilyaciya', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/elektrika', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/o-kompanii', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/kontakty', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/cookies', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/consent', changeFrequency: 'yearly', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${company.siteUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
