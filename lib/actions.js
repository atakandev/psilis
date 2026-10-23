'use server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { sb } from './supabase'
import { getSections } from './content'

async function persist(list) {
  const s = await sb()
  const { data: { user } } = await s.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { error } = await s.from('sections').upsert(list.map((x, i) => ({ key: x.key, position: i, visible: x.visible, content: x.content })))
  if (error) throw new Error(error.message)
  revalidatePath('/'); revalidatePath('/admin')
}

export async function saveSection(key, content) {
  await persist((await getSections()).map((x) => (x.key === key ? { ...x, content } : x)))
}
export async function toggleSection(key) {
  await persist((await getSections()).map((x) => (x.key === key ? { ...x, visible: !x.visible } : x)))
}
export async function moveSection(key, dir) {
  const all = await getSections()
  const body = all.filter((x) => !x.fixed)
  const i = body.findIndex((x) => x.key === key), j = i + dir
  if (j < 0 || j >= body.length) return
  ;[body[i], body[j]] = [body[j], body[i]]
  await persist([...all.filter((x) => x.fixed), ...body])
}

export async function login(fd) {
  const { error } = await (await sb()).auth.signInWithPassword({ email: fd.get('email'), password: fd.get('password') })
  redirect(error ? '/admin/login?e=1' : '/admin')
}
export async function logout() {
  await (await sb()).auth.signOut()
  redirect('/admin/login')
}
export async function requestCallback(fd) {
  await (await sb()).from('callbacks').insert({ name: fd.get('name'), phone: fd.get('phone'), insurance: fd.get('insurance'), message: fd.get('message') })
  redirect('/?sent=1#iletisim')
}
