import { getSections } from '@/lib/content'
import { Header, Footer, MAP } from '@/components/sections'

export const dynamic = 'force-dynamic' // her istekte sunucuda render (SSR)

const pick = (all, k) => all.find((x) => x.key === k).content

export async function generateMetadata() {
  const g = pick(await getSections(), 'global')
  return {
    title: g.title, description: g.description, alternates: { canonical: g.siteUrl },
    openGraph: { title: g.title, description: g.description, url: g.siteUrl, images: [g.logo], type: 'website' },
    icons: { icon: g.logo, apple: g.logo },
  }
}

export default async function Page({ searchParams }) {
  const sent = !!(await searchParams).sent
  const all = await getSections()
  const g = pick(all, 'global')
  const ld = { '@context': 'https://schema.org', '@type': 'MedicalOrganization', name: pick(all, 'header').brand, url: g.siteUrl, logo: g.siteUrl + g.logo, description: g.description, telephone: g.phone, email: g.email }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Header c={pick(all, 'header')} g={g} />
      {all.filter((x) => !x.fixed && x.visible).map((x) => {
        const C = MAP[x.key]
        return <C key={x.key} c={x.content} g={g} sent={sent} />
      })}
      <Footer c={pick(all, 'footer')} g={g} />
    </>
  )
}
