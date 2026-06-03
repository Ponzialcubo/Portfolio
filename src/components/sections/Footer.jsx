import { useState } from 'react'
import { COLORS, FONTS } from '../../utils/constants'
import Container from '../common/Container'
import { navLinks } from '../../data/navigation'

const EMAIL = 'info@sergiolab.es'

const LEGAL_LINKS = [
  { label: 'Privacidad', href: '/privacy' },
  { label: 'Aviso Legal', href: '/terms' },
  { label: 'Cookies',    href: '/cookies' },
]

function MiniForm() {
  const [email, setEmail]   = useState('')
  const [msg, setMsg]       = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !msg.trim()) return
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/xkoeqgpz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Contacto rápido', email, projectType: 'General', message: msg }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail(''); setMsg('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{
        padding: '16px', borderRadius: 8, textAlign: 'center',
        background: 'rgba(16,185,129,0.08)',
        border: '1px solid rgba(16,185,129,0.25)',
      }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: '#10B981', letterSpacing: '0.1em' }}>
          ✓ MENSAJE ENVIADO — TE RESPONDO PRONTO
        </span>
      </div>
    )
  }

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 6, padding: '9px 13px',
    fontFamily: FONTS.body, fontSize: 13,
    color: COLORS.textWhite, outline: 'none',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ fontFamily: FONTS.mono, fontSize: 9, letterSpacing: '0.2em', color: COLORS.textDim, textTransform: 'uppercase', margin: 0 }}>
        Contacto rápido
      </p>
      <input
        type="email" value={email} onChange={e => setEmail(e.target.value)}
        placeholder="tu@email.com" required style={inputStyle}
      />
      <textarea
        value={msg} onChange={e => setMsg(e.target.value)}
        placeholder="¿En qué puedo ayudarte?" rows={3} required
        style={{ ...inputStyle, resize: 'none', lineHeight: 1.55 }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          fontFamily: FONTS.body, fontSize: 11.5, fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: COLORS.accentCyan,
          background: 'rgba(0,217,255,0.08)',
          border: '1.5px solid rgba(0,217,255,0.35)',
          borderRadius: 6, padding: '9px 0', cursor: 'pointer',
          transition: 'background 0.2s, border-color 0.2s',
          width: '100%',
          opacity: status === 'loading' ? 0.6 : 1,
        }}
      >
        {status === 'loading' ? 'ENVIANDO...' : 'ENVIAR MENSAJE →'}
      </button>
      {status === 'error' && (
        <p style={{ fontFamily: FONTS.body, fontSize: 11, color: '#EF4444', margin: 0 }}>
          Error al enviar. Escríbeme directamente a {EMAIL}
        </p>
      )}
      <style>{`
        input::placeholder, textarea::placeholder { color: rgba(226,232,240,0.28); }
        input:focus, textarea:focus { border-color: rgba(0,217,255,0.4) !important; }
      `}</style>
    </form>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      width: '100%',
      background: '#080D12',
      borderTop: `1px solid ${COLORS.border}`,
      padding: 'clamp(44px, 6vh, 68px) 0 clamp(24px, 3vh, 36px)',
    }}>
      <Container>

        {/* ── Main grid ─────────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr 1.2fr',
          gap: 'clamp(32px, 4vw, 60px)',
          marginBottom: 'clamp(32px, 5vh, 48px)',
        }}
          className="footer-grid"
        >
          {/* Col 1 — Brand + contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <a href="/" style={{ textDecoration: 'none' }}>
              <span style={{ fontFamily: FONTS.heading, fontSize: 'clamp(14px, 1.4vw, 17px)', fontWeight: 800, color: COLORS.textWhite }}>
                SERGIOLAB
              </span>
              <span style={{ fontFamily: FONTS.heading, fontSize: 'clamp(14px, 1.4vw, 17px)', fontWeight: 800, color: COLORS.accentCyan }}>
                {' '}· DEVELOPER
              </span>
            </a>

            <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6, margin: 0, maxWidth: 260 }}>
              Landing pages, e-commerce y dashboards con análisis de datos mensual incluido.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a
                href={`mailto:${EMAIL}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontFamily: FONTS.body, fontSize: 13,
                  color: COLORS.accentCyan, textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <span style={{ fontSize: 14 }}>✉️</span>
                {EMAIL}
              </a>
              <span style={{
                display: 'flex', alignItems: 'center', gap: 10,
                fontFamily: FONTS.body, fontSize: 13, color: COLORS.textMuted,
              }}>
                <span style={{ fontSize: 14 }}>📍</span>
                MADRID · REMOTO / HÍBRIDO
              </span>
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { label: 'LinkedIn', href: 'https://linkedin.com/in/sergiocontreras-dev' },
                { label: 'GitHub',   href: 'https://github.com/Ponzialcubo' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: FONTS.mono, fontSize: 10, fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: COLORS.textMuted, textDecoration: 'none',
                    border: `1px solid ${COLORS.border}`,
                    padding: '6px 12px', borderRadius: 6,
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = COLORS.accentCyan; e.currentTarget.style.borderColor = 'rgba(0,217,255,0.35)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = COLORS.textMuted; e.currentTarget.style.borderColor = COLORS.border }}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Availability pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.25)',
              borderRadius: 6, padding: '8px 14px',
              alignSelf: 'flex-start',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981', flexShrink: 0 }} />
              <span style={{ fontFamily: FONTS.mono, fontSize: 9.5, color: '#10B981', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Disponible para proyectos
              </span>
            </div>
          </div>

          {/* Col 2 — Nav + stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <p style={{ fontFamily: FONTS.mono, fontSize: 9, letterSpacing: '0.2em', color: COLORS.textDim, textTransform: 'uppercase', marginBottom: 14, marginTop: 0 }}>
                Navegación
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {navLinks.map(({ label, href }) => (
                  <li key={href}>
                    <a href={href} style={{
                      fontFamily: FONTS.body, fontSize: 14,
                      color: COLORS.textMuted, textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = COLORS.textLight}
                      onMouseLeave={e => e.currentTarget.style.color = COLORS.textMuted}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p style={{ fontFamily: FONTS.mono, fontSize: 9, letterSpacing: '0.2em', color: COLORS.textDim, textTransform: 'uppercase', marginBottom: 14, marginTop: 0 }}>
                Stack
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['React', 'WordPress', 'Stripe', 'Figma', 'Power BI'].map(t => (
                  <span key={t} style={{
                    fontFamily: FONTS.mono, fontSize: 9, fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: COLORS.accentCyan,
                    background: 'rgba(0,217,255,0.07)',
                    border: '1px solid rgba(0,217,255,0.18)',
                    padding: '3px 8px', borderRadius: 4,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Col 3 — Mini form */}
          <div>
            <MiniForm />
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────── */}
        <div style={{ height: 1, background: COLORS.border, marginBottom: 20 }} />
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: COLORS.textDim, margin: 0 }}>
            © {year} SergioLab — Todos los derechos reservados
          </p>

          {/* Legal page links */}
          <nav aria-label="Información legal" style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {LEGAL_LINKS.map(({ label, href }, i) => (
              <span key={href} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && <span style={{ color: COLORS.textDim, margin: '0 8px', fontSize: 10 }}>·</span>}
                <a
                  href={href}
                  style={{
                    fontFamily: FONTS.mono, fontSize: 10.5,
                    color: COLORS.textDim, textDecoration: 'none',
                    transition: 'color 0.2s',
                    letterSpacing: '0.05em',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = COLORS.textLight}
                  onMouseLeave={e => e.currentTarget.style.color = COLORS.textDim}
                >
                  {label}
                </a>
              </span>
            ))}
          </nav>
        </div>

      </Container>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
