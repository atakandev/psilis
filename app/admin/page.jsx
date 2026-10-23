import { getSections } from '@/lib/content'
import { sb } from '@/lib/supabase'
import { moveSection, toggleSection, logout } from '@/lib/actions'

export default async function Admin() {
  const all = await getSections()
  const { data: reqs } = await (await sb()).from('callbacks').select('*').order('created_at', { ascending: false }).limit(20)
  const body = all.filter((x) => !x.fixed)
  return (
    <main className="adm">
      <div className="bar"><h1>Admin panel</h1><a href="/" target="_blank">View site ↗</a><form action={logout}><button>Sign out</button></form></div>

      <h2>Page layout</h2>
      <p>Reorder or hide sections; click Edit to change their text.</p>
      {body.map((x, i) => (
        <div className="rowc" key={x.key}>
          <span className={x.visible ? '' : 'off'}>{x.label}</span>
          <form action={moveSection.bind(null, x.key, -1)}><button disabled={i === 0}>↑</button></form>
          <form action={moveSection.bind(null, x.key, 1)}><button disabled={i === body.length - 1}>↓</button></form>
          <form action={toggleSection.bind(null, x.key)}><button>{x.visible ? 'Hide' : 'Show'}</button></form>
          <a href={`/admin/${x.key}`}>Edit</a>
        </div>
      ))}

      <h2>Header, footer & site settings</h2>
      {all.filter((x) => x.fixed).map((x) => <div className="rowc" key={x.key}><span>{x.label}</span><a href={`/admin/${x.key}`}>Edit</a></div>)}

      <h2>Callback requests</h2>
      <table><tbody>
        {(reqs || []).map((r) => <tr key={r.id}><td>{new Date(r.created_at).toLocaleString()}</td><td>{r.name}</td><td>{r.phone}</td><td>{r.insurance}</td><td>{r.message}</td></tr>)}
      </tbody></table>
    </main>
  )
}
