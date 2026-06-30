import { useRef } from 'react'
import { COLORS, FONTS } from '../../../utils/constants'
import Container from '../../common/Container'
import PageBanner from '../../common/PageBanner'
import PortfolioCarousel from './PortfolioCarousel'

const STATS = [
  { value: '3', label: 'proyectos completos' },
  { value: '2', label: 'en producción' },
  { value: '1', label: 'en desarrollo activo' },
]

export default function Portfolio() {
  return (
    <div>
      <PageBanner
        eyebrow="TRABAJOS SELECCIONADOS"
        title="PORTFOLIO"
        subtitle="Tres sistemas completos — e-commerce con IA, motor de reservas e inmobiliaria. Sin plantillas."
        accent={COLORS.accentCyan}
        right={
          <div style={{ display: 'flex', gap: 'clamp(20px,3vw,40px)', alignItems: 'center' }}>
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: FONTS.heading, fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: COLORS.accentCyan, margin: 0, lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontFamily: FONTS.mono, fontSize: 9.5, color: COLORS.textDim, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '5px 0 0', maxWidth: 90, lineHeight: 1.4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        }
      />

      <section
        id="portfolio"
        style={{
          width: '100%',
          background: COLORS.bgPrimary,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '72vh',
          overflow: 'hidden',
          paddingTop: 'clamp(32px, 5vh, 52px)',
        }}
      >
        <PortfolioCarousel />
      </section>

      {/* ── Nota bajo el carrusel ─────────────────────────────── */}
      <section style={{ background: COLORS.bgSecondary, borderTop: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(32px,5vh,48px) 0' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <p style={{ fontFamily: FONTS.body, fontSize: 'clamp(14px,1.5vw,17px)', color: COLORS.textMuted, margin: 0, maxWidth: 500, lineHeight: 1.65 }}>
              Cada caso de estudio incluye el reto, la solución técnica y lo que se entregó.
              <span style={{ color: COLORS.textLight }}> Sin rellenar con promesas — con trabajo real.</span>
            </p>
            <a href="/contacto" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: FONTS.body, fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: COLORS.accentCyan, background: 'rgba(0,217,255,0.07)', border: '1.5px solid rgba(0,217,255,0.25)', padding: '12px 24px', borderRadius: 8, whiteSpace: 'nowrap' }}>
              HABLEMOS DEL TUYO →
            </a>
          </div>
        </Container>
      </section>
    </div>
  )
}
