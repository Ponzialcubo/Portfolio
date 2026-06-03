import { useRef } from 'react'
import Container from '../../common/Container'
import SectionHeader from '../../common/SectionHeader'
import PortfolioCarousel from './PortfolioCarousel'
import { COLORS } from '../../../utils/constants'
import { useScrollAnimations } from '../../../hooks/useScrollAnimations'

export default function Portfolio() {
  const ref = useRef(null)
  useScrollAnimations(ref)

  return (
    <section
      ref={ref}
      id="portfolio"
      style={{
        width: '100%',
        minHeight: '100vh',
        background: COLORS.bgPrimary,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ padding: 'clamp(36px, 5vh, 64px) clamp(24px, 5vw, 64px) clamp(20px, 3vh, 36px)', flexShrink: 0 }}>
        <SectionHeader
          eyebrow="TRABAJOS SELECCIONADOS"
          title="PORTFOLIO"
          subtitle="Tres sistemas completos: e-commerce con IA, motor de reservas e inmobiliaria. Proyectos reales, no plantillas."
          style={{ maxWidth: 600 }}
        />
      </div>

      {/* Carousel fills remaining height */}
      <PortfolioCarousel />
    </section>
  )
}
