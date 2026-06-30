import { useRef } from 'react'
import { COLORS, FONTS } from '../../../utils/constants'
import Container from '../../common/Container'
import PageBanner from '../../common/PageBanner'
import ServiceCard from './ServiceCard'
import { services } from '../../../data/services'
import { useScrollAnimations } from '../../../hooks/useScrollAnimations'
import { useStaggerReveal } from '../../../hooks/useStaggerReveal'

const GUARANTEES = [
  { icon: '📐', label: 'Diseño 100% a medida', sub: 'Sin plantillas' },
  { icon: '🔍', label: 'SEO + AEO incluido', sub: 'Desde el día 1' },
  { icon: '📊', label: 'Analítica mensual', sub: 'Datos reales' },
  { icon: '🔑', label: 'Tú eres dueño del código', sub: 'Sin dependencias' },
]

export default function Services() {
  const cardsRef = useRef(null)
  const guaranteesRef = useRef(null)

  useStaggerReveal(cardsRef, { childSelector: 'article', stagger: 0.1, y: 36 })
  useStaggerReveal(guaranteesRef, { childSelector: '.guarantee-item', stagger: 0.07, y: 20 })

  return (
    <div>
      <PageBanner
        eyebrow="LO QUE OFREZCO"
        title="SERVICIOS"
        subtitle="Webs a medida, e-commerce y sistemas de gestión para negocios reales. Sin plantillas, sin comisiones por venta."
        accent={COLORS.accentCyan}
      />

      <section id="servicios" style={{ background: COLORS.bgSecondary, padding: 'clamp(52px, 8vh, 80px) 0' }}>
        <Container>
          <div
            ref={cardsRef}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(16px, 2vw, 28px)' }}
          >
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Garantías ──────────────────────────────────────────── */}
      <section style={{ background: COLORS.bgPrimary, borderTop: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(44px, 7vh, 72px) 0' }}>
        <Container>
          <p style={{ fontFamily: FONTS.mono, fontSize: 10, letterSpacing: '0.2em', color: COLORS.textDim, textTransform: 'uppercase', textAlign: 'center', margin: '0 0 clamp(28px,4vh,40px)' }}>
            Incluido en todos los proyectos
          </p>
          <div ref={guaranteesRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(16px,2.5vw,32px)' }} className="guarantees-grid">
            {GUARANTEES.map(g => (
              <div key={g.label} className="guarantee-item" style={{ textAlign: 'center', padding: 'clamp(20px,3vh,28px)' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{g.icon}</div>
                <p style={{ fontFamily: FONTS.heading, fontSize: 14, fontWeight: 700, color: COLORS.textWhite, margin: '0 0 4px', lineHeight: 1.3 }}>{g.label}</p>
                <p style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{g.sub}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA strip ──────────────────────────────────────────── */}
      <section style={{ background: 'rgba(0,217,255,0.04)', borderTop: '1px solid rgba(0,217,255,0.1)', borderBottom: '1px solid rgba(0,217,255,0.08)', padding: 'clamp(28px,4vh,40px) 0' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontFamily: FONTS.heading, fontSize: 'clamp(18px,2.2vw,24px)', fontWeight: 700, color: COLORS.textWhite, margin: '0 0 4px' }}>
                ¿No sabes qué necesitas?
              </p>
              <p style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.textMuted, margin: 0 }}>
                En la llamada inicial lo vemos juntos — 15 min, sin compromiso.
              </p>
            </div>
            <a href="/contacto" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: FONTS.body, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: '#05090D', background: COLORS.accentCyan, padding: '13px 28px', borderRadius: 9, whiteSpace: 'nowrap', boxShadow: '0 0 24px rgba(0,217,255,0.2)' }}>
              LLAMADA GRATUITA →
            </a>
          </div>
        </Container>
      </section>

      <style>{`
        @media (max-width: 760px) { .guarantees-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 420px) { .guarantees-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
