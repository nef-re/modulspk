import FaqSection from '@/components/FaqSection'
import JsonLd from '@/components/JsonLd'
import { faqByPage, type FaqPageKey } from '@/lib/site'
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '@/lib/structured-data'

type Breadcrumb = { href: string; label: string }

export default function ServicePageExtras({
  path,
  serviceName,
  serviceDescription,
  breadcrumbs,
  faqKey,
}: {
  path: string
  serviceName: string
  serviceDescription: string
  breadcrumbs: Breadcrumb[]
  faqKey: FaqPageKey
}) {
  const faq = faqByPage[faqKey]

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={serviceJsonLd({
          name: serviceName,
          description: serviceDescription,
          path,
        })}
      />
      <JsonLd data={faqJsonLd([...faq])} />
      <FaqSection items={faq} />
    </>
  )
}
