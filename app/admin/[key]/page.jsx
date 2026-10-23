import { notFound } from 'next/navigation'
import { getSections } from '@/lib/content'
import Editor from '@/components/Editor'

export default async function EditPage({ params }) {
  const { key } = await params
  const s = (await getSections()).find((x) => x.key === key)
  if (!s) notFound()
  return (
    <main className="adm">
      <a href="/admin">← Back</a>
      <h1>{s.label}</h1>
      <Editor k={key} initial={s.content} />
    </main>
  )
}
