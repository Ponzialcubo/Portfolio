import { useRef } from 'react'
import { COLORS, FONTS } from '../../utils/constants'
import Container from '../common/Container'
import SectionHeader from '../common/SectionHeader'
import { stackGroups } from '../../data/stack'
import { useScrollAnimations } from '../../hooks/useScrollAnimations'

function StackGroup({ group }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.025)',
      border: `1.5px solid ${group.accent}22`,
      borderRadius: 14,
      padding: 'clamp(20px, 2.6vh, 28px)',
      display: 'flex', flexDirection: 'column', gap: 16,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(to right, ${group.accent}88, ${group.accent}00)`,
      }} />

      <p style={{
        fontFamily: FONTS.mono, fontSize: 11, fontWeight: 600,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: group.accent, margin: 0,
      }}>
        {group.label}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {group.items.map(item => (
          <span key={item} style={{
            fontFamily: FONTS.body, fontSize: 13, fontWeight: 500,
            color: COLORS.textLight,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '6px 12px', borderRadius: 6,
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Stack() {
  const ref = useRef(null)
  useScrollAnimations(ref)

  return (
    <section
      ref={ref}
      id="stack"
      style={{
        width: '100%',
        background: COLORS.bgPrimary,
        padding: 'clamp(64px, 9vh, 112px) 0',
      }}
    >
      <Container>
        <SectionHeader
          eyebrow="HERRAMIENTAS"
          title="STACK TECNOLÓGICO"
          subtitle="Tecnologías modernas y probadas en producción. Elijo cada herramienta según lo que tu proyecto necesita, no al revés."
          style={{ marginBottom: 'clamp(36px, 5vh, 56px)' }}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(14px, 1.8vw, 22px)',
        }}
          className="stack-grid"
        >
          {stackGroups.map(group => (
            <StackGroup key={group.id} group={group} />
          ))}
        </div>
      </Container>

      <style>{`
        @media (max-width: 900px) {
          .stack-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .stack-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
