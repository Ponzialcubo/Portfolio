import { useRef, useState } from 'react'
import { COLORS, FONTS } from '../../utils/constants'
import Container from '../common/Container'
import { testimonials } from '../../data/testimonials'
import { useScrollAnimations } from '../../hooks/useScrollAnimations'
import { useStaggerReveal } from '../../hooks/useStaggerReveal'

function Stars({ accent }) {
  return (
    <div style={{ display: 'flex', gap: 3 }} aria-label="5 estrellas">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill={accent} aria-hidden="true">
          <path d="M7 1l1.545 3.09L12 4.545l-2.5 2.41.59 3.41L7 8.91l-3.09 1.455L4.5 6.955 2 4.545l3.455-.455L7 1z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ item }) {
  const [hov, setHov] = useState(false)
  const initials = item.company.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()

  return (
    <figure
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        margin: 0,
        background: hov ? `${item.accent}06` : 'rgba(255,255,255,0.025)',
        border: `1.5px solid ${hov ? item.accent + '44' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 16,
        padding: 'clamp(24px, 3.5vh, 36px)',
        display: 'flex', flexDirection: 'column', gap: 20,
        transition: 'background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? `0 16px 40px ${item.accent}14, 0 4px 20px rgba(0,0,0,0.35)` : '0 2px 16px rgba(0,0,0,0.2)',
        cursor: 'default',
      }}
    >
      {/* Quote mark */}
      <svg width="36" height="28" viewBox="0 0 36 28" fill="none" aria-hidden="true">
        <path d="M0 28V15.4C0 6.87 5.3 1.3 14.3 0l1.4 3.6C11.4 4.8 9 7.7 8.7 11.6H15V28H0zm21 0V15.4C21 6.87 26.3 1.3 35.3 0l1.4 3.6c-4.3 1.2-6.7 4.1-7 8H36V28H21z" fill={item.accent} opacity="0.35" />
      </svg>

      <blockquote style={{ margin: 0, flex: 1 }}>
        <p style={{ fontFamily: FONTS.body, fontSize: 'clamp(14px, 1.55vw, 16px)', color: COLORS.textLight, lineHeight: 1.75, margin: 0, fontStyle: 'normal' }}>
          "{item.quote}"
        </p>
      </blockquote>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <figcaption style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
            background: `${item.accent}18`, border: `1.5px solid ${item.accent}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: FONTS.heading, fontWeight: 700, fontSize: 14, color: item.accent,
          }}>
            {initials}
          </span>
          <div>
            <p style={{ fontFamily: FONTS.heading, fontSize: 14, fontWeight: 700, color: COLORS.textWhite, margin: 0, lineHeight: 1.3 }}>
              {item.author}
            </p>
            <p style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textDim, margin: '2px 0 0' }}>
              {item.role} · {item.company}
            </p>
          </div>
        </figcaption>
        <Stars accent={item.accent} />
      </div>
    </figure>
  )
}

export default function Testimonials() {
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  useScrollAnimations(headerRef)
  useStaggerReveal(gridRef, { childSelector: 'figure', stagger: 0.12, y: 36 })

  return (
    <section
      id="testimonios"
      style={{ width: '100%', background: COLORS.bgSecondary, padding: 'clamp(72px, 10vh, 120px) 0' }}
    >
      <Container>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: 'clamp(40px, 6vh, 56px)' }}>
          <p style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 500, letterSpacing: '0.26em', color: COLORS.accentCyan, textTransform: 'uppercase', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 22, height: 1, background: COLORS.accentCyan, opacity: 0.55, display: 'inline-block' }} />
            LO QUE DICEN
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 800, color: COLORS.textWhite, letterSpacing: '-0.025em', lineHeight: 0.95, margin: 0, textTransform: 'uppercase' }}>
              CLIENTES
            </h2>
            <p style={{ fontFamily: FONTS.body, fontSize: 'clamp(14px, 1.3vw, 16px)', color: COLORS.textMuted, margin: 0, maxWidth: 400, lineHeight: 1.6 }}>
              Negocios que confiaron su presencia digital a un sistema a medida.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(14px, 2vw, 22px)',
          }}
        >
          {testimonials.map(item => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  )
}
