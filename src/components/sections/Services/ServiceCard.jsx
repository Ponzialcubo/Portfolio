import { useState } from 'react'
import { COLORS, FONTS } from '../../../utils/constants'
import GlareOverlay from '../../common/GlareOverlay'

const ArrowRight = ({ size = 12, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7h10M8 3l4 4-4 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function ServiceCard({ service }) {
  const [hov, setHov] = useState(false)
  const [btnHov, setBtnHov] = useState(false)
  const [glarePos, setGlarePos] = useState(null)

  const onGlareMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setGlarePos({
      x: ((e.clientX - rect.left) / rect.width)  * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    })
  }

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setGlarePos(null) }}
      onMouseMove={onGlareMove}
      style={{
        position: 'relative',
        background: COLORS.bgCard,
        border: `1.5px solid ${hov ? service.accent + '55' : COLORS.border}`,
        borderRadius: 12,
        padding: 'clamp(24px, 3vh, 36px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov
          ? `0 16px 40px ${service.accent}18, 0 4px 20px rgba(0,0,0,0.4)`
          : '0 2px 16px rgba(0,0,0,0.25)',
        overflow: 'hidden',
      }}
    >
      <GlareOverlay color={`${service.accent}15`} size="60%" x={glarePos?.x} y={glarePos?.y} />
      {/* Icon + number + title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <span style={{ fontSize: 'clamp(28px, 3.5vh, 38px)', lineHeight: 1 }}>{service.icon}</span>
        <div>
          <p style={{
            fontFamily: FONTS.mono, fontSize: 10, fontWeight: 500,
            color: service.accent, letterSpacing: '0.2em',
            textTransform: 'uppercase', margin: '0 0 6px',
          }}>
            SERVICIO {String(service.id).padStart(2, '0')}
          </p>
          <h3 style={{
            fontFamily: FONTS.heading,
            fontSize: 'clamp(18px, 2.2vh, 22px)',
            fontWeight: 700, color: COLORS.textWhite,
            margin: 0, lineHeight: 1.15,
          }}>
            {service.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: FONTS.body,
        fontSize: 'clamp(13px, 1.3vh, 15px)',
        color: COLORS.textMuted,
        lineHeight: 1.65,
        margin: 0,
        flex: 1,
      }}>
        {service.description}
      </p>

      {/* Feature list */}
      <ul style={{
        listStyle: 'none', margin: 0, padding: 0,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        {service.features.map(f => (
          <li key={f} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            fontFamily: FONTS.body,
            fontSize: 'clamp(12px, 1.2vh, 13.5px)',
            color: COLORS.textMuted,
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: service.accent, flexShrink: 0,
            }} />
            {f}
          </li>
        ))}
      </ul>

      {/* Tech chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {service.tech.map(t => (
          <span key={t} style={{
            fontFamily: FONTS.mono, fontSize: 9, fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: service.accent,
            background: `${service.accent}14`,
            border: `1px solid ${service.accent}30`,
            padding: '4px 10px', borderRadius: 4,
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: COLORS.border }} />

      {/* CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <span style={{
          fontFamily: FONTS.mono, fontSize: 10,
          color: COLORS.textDim, letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Pregunta tu presupuesto
        </span>
        <a
          href="/contacto"
          onMouseEnter={() => setBtnHov(true)}
          onMouseLeave={() => setBtnHov(false)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            fontFamily: FONTS.body, fontSize: 11.5, fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            textDecoration: 'none',
            color: service.accent,
            background: btnHov ? `${service.accent}18` : 'transparent',
            border: `1.5px solid ${btnHov ? service.accent + 'bb' : service.accent + '55'}`,
            padding: '7px 16px', borderRadius: 6,
            transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
            boxShadow: btnHov ? `0 0 14px ${service.accent}30` : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          CONTACTAR
          <ArrowRight size={12} color={service.accent} />
        </a>
      </div>
    </article>
  )
}
