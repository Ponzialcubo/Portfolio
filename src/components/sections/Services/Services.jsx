import { useRef } from 'react'
import { COLORS } from '../../../utils/constants'
import Container from '../../common/Container'
import SectionHeader from '../../common/SectionHeader'
import ServiceCard from './ServiceCard'
import { services } from '../../../data/services'
import { useScrollAnimations } from '../../../hooks/useScrollAnimations'

export default function Services() {
  const ref = useRef(null)
  useScrollAnimations(ref)

  return (
    <section
      ref={ref}
      id="servicios"
      style={{
        width: '100%',
        background: COLORS.bgSecondary,
        padding: 'clamp(72px, 10vh, 120px) 0',
      }}
    >
      <Container>
        <SectionHeader
          eyebrow="LO QUE OFREZCO"
          title="SERVICIOS"
          subtitle="Incluye acceso a Google Business y reporte mensual de datos"
          style={{ marginBottom: 'clamp(48px, 7vh, 72px)' }}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(16px, 2vw, 28px)',
        }}>
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  )
}
