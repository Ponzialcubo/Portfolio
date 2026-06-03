import { useRef, useState } from 'react'
import { COLORS, FONTS } from '../../utils/constants'
import Container from '../common/Container'
import { stackGroups } from '../../data/stack'
import { useStaggerReveal } from '../../hooks/useStaggerReveal'
import { useScrollAnimations } from '../../hooks/useScrollAnimations'

function StackGroup({ group }) {
  const [activeItem, setActiveItem] = useState(null)

  return (
    <div
      className="stack-card"
      style={{
        background: 'rgba(255,255,255,0.028)',
        border: `1.5px solid rgba(255,255,255,0.07)`,
        borderRadius: 16,
        padding: 'clamp(22px, 3vh, 30px)',
        display: 'flex', flexDirection: 'column', gap: 18,
        transition: 'border-color 0.3s, box-shadow 0.3s',
        position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = group.accent + '44'
        e.currentTarget.style.boxShadow = `0 0 32px ${group.accent}10`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${group.accent}99, ${group.accent}00)`,
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <p style={{
          fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: group.accent, margin: 0,
        }}>
          {group.label}
        </p>
        <span style={{
          fontFamily: FONTS.mono, fontSize: 10, color: 'rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 20, padding: '2px 9px',
        }}>
          {group.items.length}
        </span>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {group.items.map(item => (
          <button
            key={item}
            onMouseEnter={() => setActiveItem(item)}
            onMouseLeave={() => setActiveItem(null)}
            style={{
              fontFamily: FONTS.body, fontSize: 13, fontWeight: 500,
              color: activeItem === item ? group.accent : COLORS.textLight,
              background: activeItem === item ? `${group.accent}14` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeItem === item ? group.accent + '44' : 'rgba(255,255,255,0.07)'}`,
              padding: '7px 13px', borderRadius: 8,
              cursor: 'default', transition: 'all 0.18s ease',
              outline: 'none',
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Stack() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  useScrollAnimations(headerRef)
  useStaggerReveal(gridRef, { childSelector: '.stack-card', stagger: 0.07, y: 32 })

  const totalTech = stackGroups.reduce((a, g) => a + g.items.length, 0)

  return (
    <section
      ref={sectionRef}
      id="stack"
      style={{
        width: '100%',
        background: COLORS.bgPrimary,
        padding: 'clamp(72px, 10vh, 120px) 0',
      }}
    >
      <Container>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: 'clamp(40px, 6vh, 64px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <p style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 500, letterSpacing: '0.26em', color: COLORS.accentCyan, textTransform: 'uppercase', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 22, height: 1, background: COLORS.accentCyan, opacity: 0.55, display: 'inline-block' }} />
              HERRAMIENTAS
            </p>
            <h2 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 800, color: COLORS.textWhite, letterSpacing: '-0.025em', lineHeight: 0.95, margin: 0, textTransform: 'uppercase' }}>
              STACK
            </h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: FONTS.heading, fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: COLORS.accentCyan, margin: 0, lineHeight: 1 }}>{totalTech}</p>
            <p style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '4px 0 0' }}>tecnologías</p>
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'clamp(12px, 1.6vw, 18px)',
          }}
        >
          {stackGroups.map(group => (
            <StackGroup key={group.id} group={group} />
          ))}
        </div>
      </Container>
    </section>
  )
}
