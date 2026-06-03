import { COLORS, FONTS } from '../../utils/constants'
import Container from '../common/Container'
import { navLinks } from '../../data/navigation'
import { caseStudies } from '../../data/caseStudies'

const EMAIL = 'info@sergiolab.es'

const LEGAL = [
  { label: 'Privacidad', href: '/privacy' },
  { label: 'Aviso Legal', href: '/terms' },
  { label: 'Cookies', href: '/cookies' },
]

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/sergiocontreras-dev',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Ponzialcubo',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ width: '100%', background: '#080D12', borderTop: `1px solid rgba(255,255,255,0.06)` }}>

      {/* ── CTA band ────────────────────────────────────────────── */}
      <div style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <Container>
          <div style={{
            padding: 'clamp(48px,7vh,80px) 0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 'clamp(24px,4vw,48px)', flexWrap: 'wrap',
          }}>
            <div style={{ maxWidth: 560 }}>
              <p style={{ fontFamily: FONTS.mono, fontSize: 10.5, letterSpacing: '0.2em', color: COLORS.accentCyan, textTransform: 'uppercase', margin: '0 0 14px' }}>
                ¿Empezamos?
              </p>
              <h2 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: COLORS.textWhite, letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0 }}>
                Cuéntame tu proyecto.<br />
                <span style={{ color: COLORS.accentCyan }}>Te respondo hoy.</span>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              <a
                href="#contacto"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  fontFamily: FONTS.body, fontSize: 13, fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  textDecoration: 'none', color: '#0F1419',
                  background: COLORS.accentCyan,
                  padding: '14px 32px', borderRadius: 10,
                  boxShadow: '0 4px 24px rgba(0,217,255,0.3)',
                  transition: 'opacity 0.2s, transform 0.15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none' }}
              >
                AGENDAR LLAMADA →
              </a>
              <a href={`mailto:${EMAIL}`} style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textDim, textDecoration: 'none', letterSpacing: '0.02em' }}
                onMouseEnter={e => e.currentTarget.style.color = COLORS.textLight}
                onMouseLeave={e => e.currentTarget.style.color = COLORS.textDim}
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Main footer grid ────────────────────────────────────── */}
      <Container>
        <div style={{
          padding: 'clamp(40px,6vh,56px) 0 clamp(24px,3vh,32px)',
          display: 'grid',
          gridTemplateColumns: '1.8fr 1fr 1fr',
          gap: 'clamp(32px,4vw,56px)',
        }}
          className="footer-cols"
        >
          {/* Col 1 — Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <a href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <span style={{ fontFamily: FONTS.heading, fontSize: 18, fontWeight: 800, color: COLORS.textWhite }}>SERGIOLAB</span>
              <span style={{ fontFamily: FONTS.heading, fontSize: 18, fontWeight: 800, color: COLORS.accentCyan }}> · DEVELOPER</span>
            </a>
            <p style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.textDim, lineHeight: 1.7, margin: 0, maxWidth: 280 }}>
              Desarrollo web a medida para negocios. E-commerce, motores de reserva y paneles de gestión. Madrid · toda España.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {SOCIAL.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 38, height: 38, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: COLORS.textDim, border: `1px solid rgba(255,255,255,0.08)`,
                    background: 'rgba(255,255,255,0.04)',
                    transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = COLORS.accentCyan; e.currentTarget.style.borderColor = 'rgba(0,217,255,0.35)'; e.currentTarget.style.background = 'rgba(0,217,255,0.06)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = COLORS.textDim; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 6, padding: '7px 13px', alignSelf: 'flex-start' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 7px #10B981', flexShrink: 0 }} />
              <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: '#10B981', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Disponible
              </span>
            </div>
          </div>

          {/* Col 2 — Navegación + proyectos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <p style={{ fontFamily: FONTS.mono, fontSize: 9.5, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', margin: '0 0 14px' }}>Navegación</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {navLinks.map(({ label, href }) => (
                  <li key={href}>
                    <a href={href} style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.textDim, textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = COLORS.textLight}
                      onMouseLeave={e => e.currentTarget.style.color = COLORS.textDim}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 3 — Proyectos */}
          <div>
            <p style={{ fontFamily: FONTS.mono, fontSize: 9.5, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', margin: '0 0 14px' }}>Proyectos</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {caseStudies.map(cs => (
                <li key={cs.slug}>
                  <a href={`/proyectos/${cs.slug}`} style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.textDim, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = COLORS.textLight}
                    onMouseLeave={e => e.currentTarget.style.color = COLORS.textDim}
                  >
                    {cs.title.split('—')[0].trim()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ padding: 'clamp(16px,2.5vh,22px) 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: 'rgba(255,255,255,0.2)', margin: 0 }}>
            © {year} SergioLab · Sergio Contreras — Madrid, España
          </p>
          <nav aria-label="Legal" style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {LEGAL.map(({ label, href }, i) => (
              <span key={href} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && <span style={{ color: 'rgba(255,255,255,0.15)', margin: '0 10px', fontSize: 10 }}>·</span>}
                <a href={href} style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: 'rgba(255,255,255,0.2)', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = COLORS.textDim}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
                >
                  {label}
                </a>
              </span>
            ))}
          </nav>
        </div>
      </Container>

      <style>{`
        @media (max-width: 860px) {
          .footer-cols { grid-template-columns: 1fr 1fr !important; }
          .footer-cols > *:first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 520px) {
          .footer-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
