import { Link } from 'react-router-dom'
import { COLORS, FONTS } from '../../utils/constants'
import Container from '../common/Container'
import { caseStudies } from '../../data/caseStudies'

const EMAIL = 'info@sergiolab.es'
const YEAR  = new Date().getFullYear()

const LEGAL = [
  { label: 'Privacidad', href: '/privacy' },
  { label: 'Aviso Legal', href: '/terms' },
  { label: 'Cookies',    href: '/cookies' },
]

const NAV = [
  { label: 'Proyectos', href: '/portfolio' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Sobre mí',  href: '/sobre-mi' },
  { label: 'Proceso',   href: '/proceso' },
  { label: 'Contacto',  href: '/contacto' },
]

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/sergiocontreras-dev',
    svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.8"/></svg>,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Ponzialcubo',
    svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
]

function SocialIcon({ label, href, svg }) {
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      style={{ width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.08)', transition: 'color 0.2s, border-color 0.2s, background 0.2s', textDecoration: 'none' }}
      onMouseEnter={e => { e.currentTarget.style.color = COLORS.accentCyan; e.currentTarget.style.borderColor = 'rgba(0,217,255,0.3)'; e.currentTarget.style.background = 'rgba(0,217,255,0.06)' }}
      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'transparent' }}
    >
      {svg}
    </a>
  )
}

export default function Footer() {
  return (
    <footer style={{ width: '100%', background: '#06090E', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle top glow */}
      <div aria-hidden="true" style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 500, height: 200, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,217,255,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* ── Main grid ────────────────────────────────────────────── */}
      <Container>
        <div style={{ padding: 'clamp(36px, 5vh, 52px) 0 clamp(20px, 3vh, 28px)', display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gap: 'clamp(24px, 4vw, 52px)' }} className="footer-grid">

          {/* Col 1 — Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <span style={{ fontFamily: FONTS.heading, fontSize: 16, fontWeight: 800, color: COLORS.textWhite, letterSpacing: '0.04em' }}>SERGIOLAB</span>
              <span style={{ fontFamily: FONTS.heading, fontSize: 16, fontWeight: 800, color: COLORS.accentCyan }}> · DEVELOPER</span>
            </Link>
            <p style={{ fontFamily: FONTS.body, fontSize: 13, color: 'rgba(255,255,255,0.28)', lineHeight: 1.65, margin: 0, maxWidth: 260 }}>
              Desarrollo web a medida. E-commerce, motores de reserva y paneles de gestión. Madrid · España.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              {SOCIAL.map(s => <SocialIcon key={s.label} {...s} />)}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 6, padding: '6px 12px', alignSelf: 'flex-start' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981', flexShrink: 0 }} />
              <span style={{ fontFamily: FONTS.mono, fontSize: 9.5, color: 'rgba(16,185,129,0.8)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Disponible</span>
            </div>
          </div>

          {/* Col 2 — Nav */}
          <div>
            <p style={{ fontFamily: FONTS.mono, fontSize: 9.5, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', margin: '0 0 16px' }}>Navegación</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
              {NAV.map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} style={{ fontFamily: FONTS.body, fontSize: 14, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = COLORS.textLight}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Proyectos */}
          <div>
            <p style={{ fontFamily: FONTS.mono, fontSize: 9.5, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', margin: '0 0 16px' }}>Proyectos</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
              {caseStudies.map(cs => (
                <li key={cs.slug}>
                  <Link to={`/proyectos/${cs.slug}`} style={{ fontFamily: FONTS.body, fontSize: 14, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = COLORS.textLight}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                  >
                    {cs.title.split('—')[0].trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* ── Bottom bar ───────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <Container>
          <div style={{ padding: 'clamp(14px, 2vh, 20px) 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <p style={{ fontFamily: FONTS.mono, fontSize: 10, color: 'rgba(255,255,255,0.15)', margin: 0 }}>
              © {YEAR} SergioLab · Sergio Contreras — Madrid, España
            </p>
            <nav aria-label="Legal" style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              {LEGAL.map(({ label, href }, i) => (
                <span key={href} style={{ display: 'flex', alignItems: 'center' }}>
                  {i > 0 && <span style={{ color: 'rgba(255,255,255,0.1)', margin: '0 10px', fontSize: 10 }}>·</span>}
                  <Link to={href} style={{ fontFamily: FONTS.mono, fontSize: 10, color: 'rgba(255,255,255,0.18)', textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '0.04em' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.18)'}
                  >
                    {label}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
        </Container>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .footer-cta-layout { grid-template-columns: 1fr !important; }
          .footer-cta-layout > *:last-child { align-items: flex-start !important; }
        }
        @media (max-width: 680px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid > *:first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 420px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
