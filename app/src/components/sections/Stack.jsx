import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { COLORS, FONTS } from '../../utils/constants'
import Container from '../common/Container'
import { stackGroups } from '../../data/stack'

const ALL_ITEMS = stackGroups.flatMap(g => g.items.map(item => ({ item, accent: g.accent, label: g.label })))

function Ticker() {
  const trackRef = useRef(null)
  const tweenRef = useRef(null)
  const DURATION = 38

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const w = track.scrollWidth / 2
    gsap.set(track, { x: 0 })
    tweenRef.current = gsap.to(track, {
      x: -w, duration: DURATION, ease: 'none', repeat: -1,
    })
    return () => tweenRef.current?.kill()
  }, [])

  const pause  = () => tweenRef.current?.pause()
  const resume = () => tweenRef.current?.play()

  return (
    <div
      onMouseEnter={pause} onMouseLeave={resume}
      style={{ overflow: 'hidden', padding: 'clamp(18px, 3vh, 28px) 0', cursor: 'default', position: 'relative' }}
      aria-label="Tecnologías que uso"
    >
      {/* fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(to right, ${COLORS.bgSecondary}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(to left, ${COLORS.bgSecondary}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />

      <div ref={trackRef} style={{ display: 'flex', gap: 20, width: 'max-content' }}>
        {[...ALL_ITEMS, ...ALL_ITEMS].map(({ item, accent }, i) => (
          <span key={i} style={{
            fontFamily: FONTS.body, fontSize: 14, fontWeight: 500,
            color: COLORS.textLight,
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid rgba(255,255,255,0.07)`,
            padding: '8px 16px', borderRadius: 8,
            display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
            transition: 'border-color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = accent + '55'; e.currentTarget.style.color = accent }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = COLORS.textLight }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, flexShrink: 0 }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function CategoryFilter({ active, onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 'clamp(24px, 3.5vh, 36px)' }}>
      <button
        onClick={() => onChange('all')}
        style={{ fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '7px 16px', borderRadius: 20, cursor: 'pointer', border: 'none', transition: 'all 0.2s', background: active === 'all' ? COLORS.accentCyan : 'rgba(255,255,255,0.05)', color: active === 'all' ? '#0F1419' : COLORS.textDim, outline: 'none' }}
      >
        Todo
      </button>
      {stackGroups.map(g => (
        <button key={g.id} onClick={() => onChange(g.id)}
          style={{ fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '7px 16px', borderRadius: 20, cursor: 'pointer', border: `1px solid ${active === g.id ? g.accent + '88' : 'rgba(255,255,255,0.07)'}`, transition: 'all 0.2s', background: active === g.id ? `${g.accent}14` : 'rgba(255,255,255,0.03)', color: active === g.id ? g.accent : COLORS.textDim, outline: 'none' }}
        >
          {g.label}
        </button>
      ))}
    </div>
  )
}

export default function Stack() {
  const [active, setActive] = useState('all')
  const gridRef = useRef(null)

  const filtered = active === 'all'
    ? stackGroups
    : stackGroups.filter(g => g.id === active)

  useEffect(() => {
    if (!gridRef.current) return
    const items = gridRef.current.querySelectorAll('.tech-tag')
    gsap.fromTo(items, { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.03, ease: 'power2.out' })
  }, [active])

  const totalTech = stackGroups.reduce((a, g) => a + g.items.length, 0)

  return (
    <section id="stack" style={{ width: '100%', background: COLORS.bgSecondary, padding: 'clamp(72px, 10vh, 120px) 0' }}>

      {/* Ticker band */}
      <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, marginBottom: 'clamp(48px, 7vh, 72px)' }}>
        <Ticker />
      </div>

      <Container>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 'clamp(32px, 5vh, 48px)' }}>
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
            <p style={{ fontFamily: FONTS.heading, fontSize: 'clamp(40px, 6vw, 60px)', fontWeight: 800, color: COLORS.accentCyan, margin: 0, lineHeight: 1 }}>{totalTech}</p>
            <p style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '4px 0 0' }}>tecnologías</p>
          </div>
        </div>

        {/* Category filter */}
        <CategoryFilter active={active} onChange={setActive} />

        {/* Tech tags grid */}
        <div ref={gridRef} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {filtered.map(group => (
            <div key={group.id}>
              <p style={{ fontFamily: FONTS.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: group.accent, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 16, height: 1, background: group.accent, opacity: 0.55, display: 'inline-block' }} />
                {group.label}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {group.items.map(item => (
                  <span key={item} className="tech-tag" style={{ fontFamily: FONTS.body, fontSize: 14, fontWeight: 500, color: COLORS.textLight, background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,0.07)`, padding: '9px 16px', borderRadius: 9, cursor: 'default', transition: 'all 0.18s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = group.accent; e.currentTarget.style.borderColor = group.accent + '44'; e.currentTarget.style.background = `${group.accent}0c` }}
                    onMouseLeave={e => { e.currentTarget.style.color = COLORS.textLight; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
