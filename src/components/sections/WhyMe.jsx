import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { COLORS, FONTS } from '../../utils/constants'
import Container from '../common/Container'
import PageBanner from '../common/PageBanner'
import { credentials } from '../../data/credentials'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: '3+', label: 'Proyectos\nen producción', accent: COLORS.accentCyan },
  { value: '3', label: 'Titulaciones\ntécnicas', accent: '#10B981' },
  { value: '∞', label: 'Café\ndiario', accent: '#F59E0B' },
]

const DIFFERENTIALS = [
  'Analítica mensual incluida en cada proyecto',
  'Acceso a Google Business + informe PDF',
  'Tú eres dueño del código y los datos',
  'Sin comisiones por venta ni dependencias de terceros',
]

const EXPERIENCE = [
  {
    period: '2026 — Actualidad',
    role: 'Desarrollador Web Full-Stack · Freelance',
    detail: 'Desarrollo a medida para pymes: e-commerce, motores de reserva y paneles de gestión. Marca SergioLab.',
    accent: COLORS.accentCyan,
  },
  {
    period: 'Mar — Jun 2026',
    role: 'Prácticas · Desarrollo & BI · Mercanza',
    detail: 'Desarrollo React con demos en producción, mashups e inyección de objetos Qlik Sense. Dashboard Power BI desde cero.',
    accent: '#10B981',
  },
]

export default function WhyMe() {
  const sectionRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    if (!statsRef.current) return
    const items = statsRef.current.querySelectorAll('.stat-item')
    gsap.fromTo(items,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      }
    )
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <div ref={sectionRef}>
      <PageBanner
        eyebrow="SOBRE MÍ"
        title="SERGIO CONTRERAS"
        subtitle="Desarrollador web full-stack y diseñador con base en Madrid. Del diseño en Figma al despliegue en producción, cuidando el rendimiento, el SEO y la conversión."
        accent={COLORS.accentCyan}
      />

    <section
      id="sobre-mi"
      style={{ width: '100%', background: COLORS.bgPrimary, padding: 'clamp(52px, 8vh, 88px) 0' }}
    >
      <Container>
        {/* ── Dos columnas: stats + experiencia ─────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.2fr)', gap: 'clamp(40px, 6vw, 80px)', marginBottom: 'clamp(48px, 7vh, 72px)' }} className="about-cols">

          {/* Stats */}
          <div ref={statsRef} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {STATS.map(s => (
              <div key={s.label} className="stat-item" style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 0', borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
                <span style={{ fontFamily: FONTS.heading, fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 800, color: s.accent, lineHeight: 1, letterSpacing: '-0.03em', flexShrink: 0 }}>
                  {s.value}
                </span>
                <span style={{ fontFamily: FONTS.body, fontSize: 15, color: COLORS.textMuted, lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Experiencia + formación */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
              <p style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.18em', color: COLORS.textDim, textTransform: 'uppercase', margin: '0 0 20px' }}>Experiencia</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {EXPERIENCE.map(e => (
                  <div key={e.role} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 3, alignSelf: 'stretch', background: e.accent, opacity: 0.5, borderRadius: 2, flexShrink: 0, marginTop: 4 }} />
                    <div>
                      <p style={{ fontFamily: FONTS.mono, fontSize: 10, color: e.accent, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 4px' }}>{e.period}</p>
                      <p style={{ fontFamily: FONTS.heading, fontSize: 15, fontWeight: 700, color: COLORS.textWhite, margin: '0 0 6px', lineHeight: 1.3 }}>{e.role}</p>
                      <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textMuted, lineHeight: 1.65, margin: 0 }}>{e.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.18em', color: COLORS.textDim, textTransform: 'uppercase', margin: '0 0 16px' }}>Formación</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {credentials.education.map(c => (
                  <div key={c.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ fontSize: 20, lineHeight: 1.4, flexShrink: 0 }}>{c.icon}</span>
                    <div>
                      <p style={{ fontFamily: FONTS.heading, fontSize: 14, fontWeight: 700, color: COLORS.textWhite, margin: 0, lineHeight: 1.3 }}>{c.title}</p>
                      <p style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textDim, margin: '3px 0 0' }}>{c.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Diferencial — callout ancho ───────────────────────── */}
        <div style={{
          background: 'rgba(0,217,255,0.04)',
          border: '1.5px solid rgba(0,217,255,0.15)',
          borderRadius: 16,
          padding: 'clamp(28px, 4vh, 44px) clamp(28px, 4vw, 48px)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(24px, 4vw, 48px)', alignItems: 'center' }} className="diff-cols">
            <div>
              <p style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.18em', color: COLORS.accentCyan, textTransform: 'uppercase', margin: '0 0 12px' }}>
                Diferencial · Analytics incluido
              </p>
              <h3 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: COLORS.textWhite, margin: '0 0 12px', lineHeight: 1.25 }}>
                No solo te hago el sitio.{' '}
                <span style={{ color: COLORS.accentCyan }}>Te entrego los datos mensuales</span>{' '}
                para que sepas cómo va tu negocio.
              </h3>
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {DIFFERENTIALS.map(d => (
                <li key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, background: 'rgba(0,217,255,0.1)', border: '1px solid rgba(0,217,255,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5.5L4 7.5L8 3" stroke="#00D9FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.textLight, lineHeight: 1.55 }}>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'clamp(32px, 5vh, 48px)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a href="/contacto" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: FONTS.body, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: '#0F1419', background: COLORS.accentCyan, padding: '13px 28px', borderRadius: 9, boxShadow: '0 4px 20px rgba(0,217,255,0.25)' }}>
            HABLEMOS →
          </a>
          <a href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: FONTS.body, fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: COLORS.textMuted, background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)', padding: '13px 28px', borderRadius: 9 }}>
            VER PROYECTOS
          </a>
        </div>
      </Container>

      <style>{`
        @media (max-width: 820px) {
          .about-cols { grid-template-columns: 1fr !important; }
          .diff-cols  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
    </div>
  )
}
