import InteractiveMap from './InteractiveMap'
import { requestCallback } from '@/lib/actions'
import { MAP_SVG } from '@/lib/svgs'

const Head = ({ c }) => (
  <div className="section-head">
    <span className="eyebrow">{c.eyebrow}</span>
    <h2>{c.title}</h2>
    {c.text && <p>{c.text}</p>}
  </div>
)

export const Header = ({ c, g }) => (
  <header className="site"><div className="container nav-inner">
    <div className="brand">
      <img src={g.logo} alt={c.brand} />
      <div className="brand-text"><div className="name">{c.brand}</div><div className="sub">{c.sub}</div></div>
    </div>
    <nav className="links">{c.links.map((l, i) => <a key={i} href={l.href}>{l.label}</a>)}</nav>
    <div className="nav-actions"><a href={`tel:${g.phone}`} className="btn btn-primary"><span>{c.cta}</span></a></div>
  </div></header>
)

export const Hero = ({ c, g }) => (
  <section className="hero">
    <div className="hero-arc"></div><div className="hero-arc two"></div>
    <div className="container">
      <div className="hero-copy">
        <span className="eyebrow">{c.eyebrow}</span>
        <h1>{c.title} <em>{c.highlight}</em></h1>
        <p className="hero-sub">{c.text}</p>
        <div className="hero-ctas">
          <a href={`tel:${g.phone}`} className="btn btn-gold"><span>{c.callLabel}</span></a>
          <a href={`https://wa.me/${g.whatsapp}`} className="btn btn-ghost" style={{ border: '1.5px solid rgba(255,255,255,0.5)' }}><span>{c.whatsappLabel}</span></a>
        </div>
        <div className="hero-meta">{c.meta.map((m, i) => <div className="item" key={i}><b>{m.value}</b><span>{m.label}</span></div>)}</div>
      </div>
      <div className="hero-visual hero-map"><InteractiveMap points={c.mapPoints || []} /></div>
    </div>
    <svg className="wave-divider" viewBox="0 0 1440 90" preserveAspectRatio="none"><path d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,45 L1440,90 L0,90 Z" fill="#FBF8F1"></path></svg>
  </section>
)

export const Trust = ({ c }) => (
  <section className="trust" style={{ paddingTop: 0 }}><div className="container"><div className="trust-grid">
    {c.items.map((it, i) => <div className="cell" key={i}><div className="icon">{it.icon}</div><div className="label"><span>{it.label}</span></div></div>)}
  </div></div></section>
)

export const Services = ({ c }) => (
  <section id="hizmetler"><div className="container">
    <Head c={c} />
    <div className="services-grid">
      {c.items.map((it, i) => (
        <div className="service-card" key={i}>
          <div className="num">{String(i + 1).padStart(2, '0')}</div>
          <div className="icon-wrap">{it.icon}</div>
          <h3>{it.title}</h3><p>{it.text}</p>
        </div>
      ))}
    </div>
  </div></section>
)

export const Coverage = ({ c }) => (
  <section id="bolge" className="coverage"><div className="container">
    <Head c={c} />
    <div className="coverage-map" dangerouslySetInnerHTML={{ __html: MAP_SVG }} />
    <div className="coverage-legend">{c.places.map((p, i) => <div className="leg" key={i}><span className="dot"></span><span>{p}</span></div>)}</div>
  </div></section>
)

export const Process = ({ c }) => (
  <section id="surec" className="process"><div className="container">
    <Head c={c} />
    <div className="process-list">
      {c.steps.map((s, i) => <div className="process-step" key={i}><div className="step-num">{i + 1}</div><h3>{s.title}</h3><p>{s.text}</p></div>)}
    </div>
  </div></section>
)

export const Contact = ({ c, g, sent }) => (
  <section id="iletisim" className="contact"><div className="container">
    <Head c={c} />
    <div className="contact-wrap">
      <div className="contact-card">
        <div>
          <span className="eyebrow" style={{ color: 'var(--gold-light)' }}>{c.cardEyebrow}</span>
          <h3>{c.cardTitle}</h3><p>{c.cardText}</p>
          <div className="contact-number">{g.phoneDisplay}</div>
        </div>
        <a href={`https://wa.me/${g.whatsapp}`} className="btn btn-gold"><span>{c.whatsappLabel}</span></a>
      </div>
      <div className="form-card">
        <h3>{c.formTitle}</h3>
        <form action={requestCallback}>
          <div className="form-row">
            <input type="text" name="name" required placeholder={c.namePlaceholder} />
            <input type="tel" name="phone" required placeholder={c.phonePlaceholder} />
          </div>
          <div className="form-row"><input type="text" name="insurance" placeholder={c.insurancePlaceholder} /></div>
          <div className="form-row full"><textarea name="message" placeholder={c.messagePlaceholder}></textarea></div>
          <button type="submit"><span>{c.submitLabel}</span></button>
          <p className="form-note">{sent ? c.successMessage : c.note}</p>
        </form>
      </div>
    </div>
  </div></section>
)

export const Footer = ({ c, g }) => (
  <footer><div className="container">
    <div className="footer-top">
      <div className="footer-brand"><img src={g.logo} alt={c.brand} /><div><div className="name">{c.brand}</div></div></div>
      <div className="footer-cols">
        {c.cols.map((col, i) => <div className="footer-col" key={i}><h4>{col.title}</h4>{col.items.map((t, j) => <div key={j}>{t}</div>)}</div>)}
      </div>
    </div>
    <div className="footer-bottom"><span>{c.copyright}</span></div>
  </div></footer>
)

export const MAP = { hero: Hero, trust: Trust, services: Services, coverage: Coverage, process: Process, contact: Contact }
