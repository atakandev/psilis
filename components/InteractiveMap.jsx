'use client'
import { useEffect, useRef, useState } from 'react'

const pct = (n) => Math.max(0, Math.min(100, Number(n) || 0))
const safeLink = (s) => { const x = String(s || '').trim(); return /^(https?:\/\/|mailto:|tel:|\/[^/]|#[\w-])/i.test(x) ? x : '' }
export default function InteractiveMap({ points = [], edit = false, onChange }) {
  const [open, setOpen] = useState(null)
  const [hover, setHover] = useState(null)
  const [moving, setMoving] = useState(null)
  const stage = useRef(null)
  const live = (points || []).filter(p => edit || p.enabled !== false)
  useEffect(() => { if (open !== null && !live.some((p, i) => (p.id ?? i) === open)) setOpen(null) }, [points])
  const locate = (e) => {
    const b = stage.current.getBoundingClientRect()
    return { x: Math.round(pct((e.clientX - b.left) / b.width * 100) * 10) / 10, y: Math.round(pct((e.clientY - b.top) / b.height * 100) * 10) / 10 }
  }
  const update = (id, patch) => onChange?.(points.map((p,i) => ((p.id ?? i) === id ? {...p, ...patch} : p)))
  const active = live.find((p,i) => (p.id ?? i) === open)
  const tooltip = active || live.find((p,i) => (p.id ?? i) === hover)
  const link = safeLink(tooltip?.url)
  return <div className={'interactive-map ' + (edit ? 'interactive-map-edit' : '')}>
    <div className="interactive-map-stage" ref={stage} onPointerMove={e => { if (!edit || moving === null) return; update(moving, locate(e)) }} onPointerUp={e => { if (moving === null) return; try { e.currentTarget.releasePointerCapture(e.pointerId) } catch {} setMoving(null) }} onPointerCancel={() => setMoving(null)} onClick={e => { if (e.target === e.currentTarget) setOpen(null) }}>
      <img src="/south-aegean-minimal-map.svg" width="1448" height="1086" alt="Muğla sahil bölgesi hizmet haritası" draggable="false" />
      {live.map((p,i) => { const id = p.id ?? i; return <button key={id} type="button" className={'map-pin ' + (open === id ? 'is-open ' : '') + (p.enabled === false ? 'is-disabled' : '')} style={{left: `${pct(p.x)}%`, top: `${pct(p.y)}%`}} aria-label={`${p.title || 'Location'} — details`} aria-expanded={open === id} onPointerEnter={() => !edit && setHover(id)} onPointerLeave={() => setHover(null)} onPointerDown={e => { if (!edit) return; e.preventDefault(); e.currentTarget.parentElement.setPointerCapture(e.pointerId); setMoving(id); setOpen(id) }} onClick={() => setOpen(open === id ? null : id)}><span className="map-pin-inner" /></button> })}
      {!edit && tooltip && <div className="map-popup" style={{left: `${Math.max(5,Math.min(95,pct(tooltip.x)))}%`, top: `${pct(tooltip.y)}%`}} onMouseEnter={() => setHover(tooltip.id ?? live.indexOf(tooltip))} onMouseLeave={() => setHover(null)}>
        <button className="map-popup-close" type="button" onClick={() => {setOpen(null); setHover(null)}} aria-label="Close">×</button>
        <span className="map-popup-kicker">24/7 MEDICAL ASSISTANCE</span><strong>{tooltip.title || 'Service area'}</strong>
        {tooltip.description && <p>{tooltip.description}</p>}
        {link && <a href={link} target={link.startsWith('http') ? '_blank' : undefined} rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}>{tooltip.linkLabel || 'Learn more'} <span aria-hidden="true">↗</span></a>}
      </div>}
    </div>
    {edit && <p className="map-edit-tip">Drag a pin to move it. Coordinates are saved with the section when you select “Save”.</p>}
  </div>
}
