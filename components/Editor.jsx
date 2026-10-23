'use client'
import InteractiveMap from './InteractiveMap'
import { useState, useTransition } from 'react'
import { saveSection } from '@/lib/actions'

const blank = (v) => (Array.isArray(v) ? [] : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)])) : '')
const mv = (a, i, d) => { const b = [...a], j = i + d; if (j < 0 || j >= b.length) return a; [b[i], b[j]] = [b[j], b[i]]; return b }

// İçerik JSON'undan otomatik form üretir: metin, liste (ekle/sil/sırala) ve iç içe nesneler.
function Node({ v, set, name }) {
  const label = String(name).replace(/([A-Z])/g, ' $1')
  if (Array.isArray(v)) return (
    <div className="grp"><label>{label}</label>
      {v.map((it, i) => (
        <div className="item" key={i}>
          <Node v={it} name={`#${i + 1}`} set={(x) => set(v.map((y, j) => (j === i ? x : y)))} />
          <button type="button" onClick={() => set(mv(v, i, -1))}>↑</button>{' '}
          <button type="button" onClick={() => set(mv(v, i, 1))}>↓</button>{' '}
          <button type="button" onClick={() => set(v.filter((_, j) => j !== i))}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => set([...v, blank(v[0] ?? '')])}>+ Add</button>
    </div>
  )
  if (v && typeof v === 'object') return (
    <div className={name ? 'grp' : ''}>{name && <label>{label}</label>}
      {Object.keys(v).map((k) => <Node key={k} name={k} v={v[k]} set={(x) => set({ ...v, [k]: x })} />)}
    </div>
  )
  const T = String(v).length > 70 ? 'textarea' : 'input'
  return (<><label>{label}</label><T value={v} rows={3} onChange={(e) => set(e.target.value)} /></>)
}

export default function Editor({ k, initial }) {
  const [d, setD] = useState(initial)
  const [msg, setMsg] = useState('')
  const [pending, start] = useTransition()
  const mapPoints = d?.mapPoints || []
  const editMap = (next) => setD(prev => ({...prev, mapPoints: next}))
  const save = () => start(async () => {
    setMsg('')
    try { await saveSection(k, d); setMsg('Saved ✓') } catch (e) { setMsg('Error: ' + e.message) }
  })
  return (
    <>
      {k === 'hero' && <div className="map-admin-editor">
        <h2>Interactive service map</h2>
        <p>Click and drag the pins to position them. Edit text, links and visibility below, then click Save.</p>
        <InteractiveMap points={mapPoints} edit onChange={editMap} />
        <div className="map-admin-list">
          {mapPoints.map((p,i) => <fieldset key={p.id || i} className="map-admin-point"><legend>{p.title || `Location ${i+1}`}</legend>
            <div className="map-admin-fields"><label>Place name<input value={p.title || ''} onChange={e => editMap(mapPoints.map((x,j) => j === i ? {...x,title:e.target.value}:x))} /></label>
            <label>Horizontal X (%)<input type="number" step="0.1" min="0" max="100" value={p.x ?? 50} onChange={e => editMap(mapPoints.map((x,j) => j === i ? {...x,x:Number(e.target.value)}:x))} /></label>
            <label>Vertical Y (%)<input type="number" step="0.1" min="0" max="100" value={p.y ?? 50} onChange={e => editMap(mapPoints.map((x,j) => j === i ? {...x,y:Number(e.target.value)}:x))} /></label>
            <label>Link (https:// or /path or #section)<input value={p.url || ''} onChange={e => editMap(mapPoints.map((x,j) => j === i ? {...x,url:e.target.value}:x))} /></label>
            <label>Link button text<input value={p.linkLabel || ''} onChange={e => editMap(mapPoints.map((x,j) => j === i ? {...x,linkLabel:e.target.value}:x))} /></label>
            <label className="map-admin-check"><input type="checkbox" checked={p.enabled !== false} onChange={e => editMap(mapPoints.map((x,j) => j === i ? {...x,enabled:e.target.checked}:x))} /> Visible</label></div>
            <label>Description<textarea rows={3} value={p.description || ''} onChange={e => editMap(mapPoints.map((x,j) => j === i ? {...x,description:e.target.value}:x))} /></label>
            <button type="button" onClick={() => editMap(mapPoints.filter((_,j) => j !== i))}>Remove point</button>
          </fieldset>)}
          <button type="button" className="pri" onClick={() => editMap([...mapPoints, {id:`point-${Date.now()}`, title:'New location', description:'',url:'', linkLabel:'Learn more',x:50,y:50,enabled:true}])}>+ Add location</button>
        </div>
      </div>}
      <Node v={k === 'hero' ? Object.fromEntries(Object.entries(d).filter(([key]) => key !== 'mapPoints')) : d} set={k === 'hero' ? next => setD(prev => ({...prev,...next})) : setD} name="" />
      <div className="save"><button className="pri" disabled={pending} onClick={save}>{pending ? 'Saving…' : 'Save'}</button> {msg}</div>
    </>
  )
}
