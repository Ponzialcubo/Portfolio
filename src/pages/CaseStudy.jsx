import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { COLORS, FONTS } from '../utils/constants'
import { caseStudies } from '../data/caseStudies'
import Container from '../components/common/Container'

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 11L11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const CheckIcon = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
    <path d="M2 7.5L5.5 11L12 3.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function CaseStudy() {
  const { slug } = useParams()
  const cs = caseStudies.find(c => c.slug === slug)

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!cs) return <Navigate to="/" replace />

  const other = caseStudies.filter(c => c.slug !== slug)

  return (
    <div style={{ background: COLORS.bgPrimary, minHeight: '100vh' }}>

      {/* ── Back nav ─────────────────────────────────────────────── */}
      <div style={{ borderBottom: `1px solid ${COLORS.border}` }}>
        <Container>
          <div style={{ padding: 'clamp(14px,2vh,20px) 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <Link
              to="/#portfolio"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: FONTS.body, fontSize: 13, color: COLORS.textMuted, textDecoration: 'none' }}
            >
              <ArrowLeft /> Volver al portfolio
            </Link>
            <a
              href="/" style={{ fontFamily: FONTS.heading, fontSize: 15, fontWeight: 800, color: COLORS.textWhite, textDecoration: 'none' }}
            >
              SERGIOLAB<span style={{ color: COLORS.accentCyan }}> · DEVELOPER</span>
            </a>
          </div>
        </Container>
      </div>

      {/* ── Hero del caso ─────────────────────────────────────────── */}
      <div style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${cs.accent}12 0%, transparent 65%), ${COLORS.bgPrimary}`,
        padding: 'clamp(56px,9vh,96px) 0 clamp(40px,6vh,64px)',
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <Container>
          <p style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.22em', color: cs.accent, textTransform: 'uppercase', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 22, height: 1, background: cs.accent, opacity: 0.6, display: 'inline-block' }} />
            {cs.category}
          </p>
          <h1 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, color: COLORS.textWhite, letterSpacing: '-0.025em', lineHeight: 1.1, margin: '0 0 20px', maxWidth: 760 }}>
            {cs.title}
          </h1>
          <p style={{ fontFamily: FONTS.body, fontSize: 'clamp(15px,1.6vw,18px)', color: COLORS.textMuted, lineHeight: 1.7, margin: '0 0 32px', maxWidth: 680 }}>
            {cs.overview}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href={cs.liveUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: FONTS.body, fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', color: cs.accent, background: `${cs.accent}14`, border: `1.5px solid ${cs.accent}55`, padding: '10px 20px', borderRadius: 6 }}
            >
              VER PROYECTO <ArrowUpRight />
            </a>
            <span style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: cs.accent, background: `${cs.accent}14`, border: `1px solid ${cs.accent}30`, padding: '5px 12px', borderRadius: 4 }}>
              {cs.badge}
            </span>
          </div>
        </Container>
      </div>

      {/* ── Contenido principal ───────────────────────────────────── */}
      <Container>
        <div style={{ padding: 'clamp(48px,7vh,80px) 0', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,340px)', gap: 'clamp(40px,6vw,72px)', alignItems: 'start' }} className="cs-layout">

          {/* Columna izquierda */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px,6vh,56px)' }}>

            {/* Reto */}
            <section>
              <p style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.2em', color: cs.accent, textTransform: 'uppercase', margin: '0 0 12px' }}>El reto</p>
              <h2 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(22px,2.8vw,30px)', fontWeight: 700, color: COLORS.textWhite, margin: '0 0 14px', lineHeight: 1.2 }}>
                ¿Cuál era el problema?
              </h2>
              <p style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.textMuted, lineHeight: 1.75, margin: 0 }}>
                {cs.challenge}
              </p>
            </section>

            {/* Solución */}
            <section>
              <p style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.2em', color: cs.accent, textTransform: 'uppercase', margin: '0 0 12px' }}>La solución</p>
              <h2 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(22px,2.8vw,30px)', fontWeight: 700, color: COLORS.textWhite, margin: '0 0 14px', lineHeight: 1.2 }}>
                Qué se construyó
              </h2>
              <p style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.textMuted, lineHeight: 1.75, margin: 0 }}>
                {cs.solution}
              </p>
            </section>

            {/* Resultados */}
            <section>
              <p style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.2em', color: cs.accent, textTransform: 'uppercase', margin: '0 0 12px' }}>Resultados</p>
              <h2 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(22px,2.8vw,30px)', fontWeight: 700, color: COLORS.textWhite, margin: '0 0 20px', lineHeight: 1.2 }}>
                Qué se entregó
              </h2>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {cs.results.map(r => (
                  <li key={r} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <CheckIcon color={cs.accent} />
                    <span style={{ fontFamily: FONTS.body, fontSize: 15, color: COLORS.textLight, lineHeight: 1.6 }}>{r}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Columna derecha — sticky */}
          <aside style={{ position: 'sticky', top: 'clamp(80px,12vh,100px)', display: 'flex', flexDirection: 'column', gap: 20 }} className="cs-aside">

            {/* Stack */}
            <div style={{ background: 'rgba(255,255,255,0.025)', border: `1.5px solid ${cs.accent}22`, borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ borderBottom: `1px solid ${cs.accent}18`, padding: '16px 20px' }}>
                <p style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.18em', color: cs.accent, textTransform: 'uppercase', margin: 0 }}>Stack técnico</p>
              </div>
              <div style={{ padding: '4px 0' }}>
                {cs.techStack.map(t => (
                  <div key={t.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 20px', borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
                    <span style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.1em', color: COLORS.textDim, textTransform: 'uppercase', flexShrink: 0 }}>{t.label}</span>
                    <span style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textLight, textAlign: 'right' }}>{t.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO */}
            {cs.seoNote && (
              <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(255,255,255,0.07)`, borderRadius: 10, padding: '14px 18px' }}>
                <p style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.15em', color: COLORS.accentGreen, textTransform: 'uppercase', margin: '0 0 8px' }}>SEO</p>
                <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6, margin: 0 }}>{cs.seoNote}</p>
              </div>
            )}

            {/* CTA */}
            <div style={{ background: `${cs.accent}08`, border: `1.5px solid ${cs.accent}28`, borderRadius: 12, padding: '20px' }}>
              <p style={{ fontFamily: FONTS.heading, fontSize: 16, fontWeight: 700, color: COLORS.textWhite, margin: '0 0 8px' }}>¿Quieres algo similar?</p>
              <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6, margin: '0 0 16px' }}>Cuéntame tu proyecto y te preparo un presupuesto cerrado en 24 h.</p>
              <a href="/#contacto" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', color: cs.accent, background: `${cs.accent}14`, border: `1.5px solid ${cs.accent}55`, padding: '10px 0', borderRadius: 6, width: '100%' }}>
                CONTACTAR →
              </a>
            </div>
          </aside>
        </div>
      </Container>

      {/* ── Otros proyectos ────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${COLORS.border}`, background: COLORS.bgSecondary }}>
        <Container>
          <div style={{ padding: 'clamp(40px,6vh,64px) 0' }}>
            <p style={{ fontFamily: FONTS.mono, fontSize: 11, letterSpacing: '0.2em', color: COLORS.accentCyan, textTransform: 'uppercase', margin: '0 0 32px' }}>
              Otros proyectos
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 16 }}>
              {other.map(o => (
                <Link
                  key={o.slug}
                  to={`/proyectos/${o.slug}`}
                  style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 10, background: 'rgba(255,255,255,0.025)', border: `1.5px solid ${o.accent}22`, borderRadius: 12, padding: '20px 22px', transition: 'border-color 0.25s, transform 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = o.accent + '55'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = o.accent + '22'; e.currentTarget.style.transform = 'none' }}
                >
                  <p style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.16em', color: o.accent, textTransform: 'uppercase', margin: 0 }}>{o.category}</p>
                  <h3 style={{ fontFamily: FONTS.heading, fontSize: 17, fontWeight: 700, color: COLORS.textWhite, margin: 0, lineHeight: 1.3 }}>{o.title}</h3>
                  <span style={{ fontFamily: FONTS.body, fontSize: 12, color: o.accent, marginTop: 'auto' }}>Ver caso de estudio →</span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cs-layout { grid-template-columns: 1fr !important; }
          .cs-aside  { position: static !important; }
        }
      `}</style>
    </div>
  )
}
