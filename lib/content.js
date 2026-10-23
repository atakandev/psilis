import { sb } from './supabase'
import { DEFAULTS } from './defaults'

// DB kaydı varsa varsayılanın üstüne yazar; yoksa varsayılan kullanılır. Sıralama = position.
export async function getSections() {
  const { data } = await (await sb()).from('sections').select('*')
  const db = Object.fromEntries((data || []).map((r) => [r.key, r]))
  return DEFAULTS.map((d, i) => {
    const r = db[d.key]
    return { ...d, position: r?.position ?? i, visible: r?.visible ?? true, content: { ...d.content, ...(r?.content || {}) } }
  }).sort((a, b) => a.position - b.position)
}
