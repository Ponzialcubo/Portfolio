import { useRef } from 'react'
import { COLORS, FONTS } from '../../utils/constants'
import Container from '../common/Container'
import SectionHeader from '../common/SectionHeader'
import { testimonials } from '../../data/testimonials'
import { useScrollAnimations } from '../../hooks/useScrollAnimations'

function QuoteMark({ color }) {
  return (
    <svg width="34" height="26" viewBox="0 0 34 26" fill="none" aria-hidden="true" style={{ opacity: 0.5 }}>
      <path
        d="M0 26V14.2C0 6.36 4.9 1.2 13.2 0l1.4 3.6c-4.3 1.1-6.6 3.9-6.9 7.6H14V26H0zm20 0V14.2C20 6.36 24.9 1.2 33.2 0l1.4 3.6c-4.3 1.1-6.6 3.9-6.9 7.6H34V26H20z"
        fill={color}
      />
    </svg>
  )
}

function TestimonialCard({ item }) {
  const initials = item.company
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()

  return (
    <figure style={{
      margin: 0,
      background: 'rgba(255,255,255,0.025)',
      border: `1.5px solid ${item.accent}22`,
      borderRadius: 14,
      padding: 'clamp(24px, 3vh, 32px)',
      display: 'flex', flexDirection: 'column', gap: 18,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 3,
        background: item.accent, opacity: 0.45,
      }} />

      <QuoteMark color={item.accent} />

      <blockquote style={{
        margin: 0, fontFamily: FONTS.body,
        fontSize: 'clamp(14px, 1.5vh, 16px)',
        color: COLORS.textLight, lineHeight: 1.7, fontStyle: 'normal',
      }}>
        “{item.quote}”
      </blockquote>

      <figcaption style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 'auto' }}>
        <span style={{
          width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
          background: `${item.accent}18`,
          border: `1px solid ${item.accent}38`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: FONTS.heading, fontWeight: 700, fontSize: 15,
          color: item.accent,
        }}>
          {initials}
        </span>
        <div>
          <p style={{ fontFamily: FONTS.heading, fontSize: 15, fontWeight: 700, color: COLORS.textWhite, margin: 0, lineHeight: 1.3 }}>
            {item.author}
          </p>
          <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textMuted, margin: '2px 0 0' }}>
            {item.role} · {item.company}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  useScrollAnimations(ref)

  const hasPlaceholders = testimonials.some(t => t.isPlaceholder)

  return (
    <section
      ref={ref}
      id="testimonios"
      style={{
        width: '100%',
        background: COLORS.bgSecondary,
        padding: 'clamp(64px, 9vh, 112px) 0',
      }}
    >
      <Container>
        <SectionHeader
          eyebrow="LO QUE DICEN"
          title="TESTIMONIOS"
          subtitle="Clientes que confiaron su negocio a un sistema a medida."
          style={{ marginBottom: 'clamp(36px, 5vh, 56px)' }}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(16px, 2vw, 24px)',
        }}
          className="testimonials-grid"
        >
          {testimonials.map(item => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>

        {hasPlaceholders && (
          <p style={{
            fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textDim,
            margin: 'clamp(20px, 3vh, 28px) 0 0', letterSpacing: '0.04em',
          }}>
            * Testimonios de ejemplo — se sustituirán por reseñas reales de clientes.
          </p>
        )}
      </Container>

      <style>{`
        @media (max-width: 900px) {
          .testimonials-grid { grid-template-columns: 1fr !important; max-width: 560px; margin: 0 auto; }
        }
      `}</style>
    </section>
  )
}
