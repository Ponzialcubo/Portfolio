import { useRef, useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { COLORS, FONTS } from '../../utils/constants'
import Container from '../common/Container'
import { steps } from '../../data/howItWorks'
import { useScrollAnimations } from '../../hooks/useScrollAnimations'

const ICONS = {
  phone: ({ color }) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C6.61 21 3 17.39 3 13c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  code: ({ color }) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="8 6 2 12 8 18" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  rocket: ({ color }) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  chart: ({ color }) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 20V10" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 20V4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M6 20v-6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
}

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const progressRef = useRef(null)
  const [active, setActive] = useState(0)
  const [prevActive, setPrevActive] = useState(null)

  useScrollAnimations(sectionRef)

  const goTo = useCallback((idx) => {
    if (idx === active) return
    setPrevActive(active)
    setActive(idx)
  }, [active])

  // Animate content on step change
  useEffect(() => {
    if (!contentRef.current) return
    gsap.fromTo(contentRef.current,
      { opacity: 0, x: prevActive !== null && prevActive < active ? 24 : -24 },
      { opacity: 1, x: 0, duration: 0.42, ease: 'power3.out' }
    )
    // Animate progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${((active + 1) / steps.length) * 100}%`,
        duration: 0.5, ease: 'power2.out',
      })
    }
  }, [active, prevActive])

  const step = steps[active]
  const Icon = ICONS[step.icon]

  return (
    <section
      ref={sectionRef}
      id="proceso"
      style={{
        width: '100%',
        background: COLORS.bgSecondary,
        padding: 'clamp(72px, 10vh, 120px) 0',
      }}
    >
      <Container>
        {/* Header */}
        <div style={{ marginBottom: 'clamp(40px, 6vh, 56px)' }}>
          <p style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 500, letterSpacing: '0.26em', color: COLORS.accentCyan, textTransform: 'uppercase', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 22, height: 1, background: COLORS.accentCyan, opacity: 0.55, display: 'inline-block' }} />
            CÓMO TRABAJO
          </p>
          <h2 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 800, color: COLORS.textWhite, letterSpacing: '-0.025em', lineHeight: 0.95, margin: 0, textTransform: 'uppercase' }}>
            EL PROCESO
          </h2>
        </div>

        {/* Step tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 'clamp(28px, 4vh, 40px)', borderBottom: `1px solid ${COLORS.border}` }}>
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-selected={active === i}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 'clamp(12px, 1.8vh, 18px) clamp(16px, 2.5vw, 28px)',
                fontFamily: FONTS.mono, fontSize: 11, fontWeight: 600,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: active === i ? s.accent : COLORS.textDim,
                borderBottom: `2px solid ${active === i ? s.accent : 'transparent'}`,
                marginBottom: -1,
                transition: 'color 0.2s, border-color 0.2s',
                display: 'flex', alignItems: 'center', gap: 8,
                outline: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontFamily: FONTS.heading, fontSize: 13, opacity: 0.5 }}>
                {s.number}
              </span>
              {s.title}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 2, marginBottom: 'clamp(32px, 5vh, 48px)', overflow: 'hidden' }}>
          <div
            ref={progressRef}
            style={{
              height: '100%',
              width: `${((active + 1) / steps.length) * 100}%`,
              background: `linear-gradient(90deg, ${step.accent}, ${step.accent}88)`,
              borderRadius: 2,
              transition: 'background 0.3s',
            }}
          />
        </div>

        {/* Content panel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center',
        }}
          className="process-layout"
        >
          {/* Left: text */}
          <div ref={contentRef}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: `${step.accent}14`,
                border: `1.5px solid ${step.accent}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon color={step.accent} />
              </div>
              <div>
                <p style={{ fontFamily: FONTS.mono, fontSize: 10, color: step.accent, letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>
                  PASO {step.number}
                </p>
                <h3 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: COLORS.textWhite, margin: 0, lineHeight: 1.2 }}>
                  {step.title}
                </h3>
              </div>
            </div>

            <p style={{ fontFamily: FONTS.body, fontSize: 'clamp(15px, 1.6vw, 17px)', color: COLORS.textMuted, lineHeight: 1.75, margin: '0 0 28px' }}>
              {step.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {step.subtitle.split(' · ').map(tag => (
                <span key={tag} style={{
                  fontFamily: FONTS.mono, fontSize: 11, fontWeight: 600,
                  color: step.accent,
                  background: `${step.accent}12`,
                  border: `1px solid ${step.accent}30`,
                  padding: '5px 14px', borderRadius: 20, letterSpacing: '0.08em',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: big number + nav */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{
                fontFamily: FONTS.heading, fontWeight: 800,
                fontSize: 'clamp(120px, 18vw, 200px)',
                color: step.accent, opacity: 0.07,
                lineHeight: 1, letterSpacing: '-0.05em',
                userSelect: 'none', pointerEvents: 'none',
              }}>
                {step.number}
              </span>
              <div style={{
                position: 'absolute',
                width: 'clamp(80px, 12vw, 120px)', height: 'clamp(80px, 12vw, 120px)',
                borderRadius: '50%',
                border: `2px solid ${step.accent}25`,
                boxShadow: `0 0 48px ${step.accent}18`,
              }} />
            </div>

            {/* Next/prev arrows */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={() => goTo(Math.max(0, active - 1))}
                disabled={active === 0}
                aria-label="Paso anterior"
                style={{
                  width: 44, height: 44, borderRadius: '50%', cursor: active === 0 ? 'default' : 'pointer',
                  background: 'rgba(255,255,255,0.05)', border: `1.5px solid ${COLORS.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: active === 0 ? COLORS.textDim : COLORS.textLight,
                  opacity: active === 0 ? 0.35 : 1, transition: 'opacity 0.2s',
                  outline: 'none',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLORS.textDim, letterSpacing: '0.1em' }}>
                {String(active + 1).padStart(2,'0')} / {String(steps.length).padStart(2,'0')}
              </span>
              <button
                onClick={() => goTo(Math.min(steps.length - 1, active + 1))}
                disabled={active === steps.length - 1}
                aria-label="Paso siguiente"
                style={{
                  width: 44, height: 44, borderRadius: '50%', cursor: active === steps.length - 1 ? 'default' : 'pointer',
                  background: 'rgba(255,255,255,0.05)', border: `1.5px solid ${COLORS.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: active === steps.length - 1 ? COLORS.textDim : COLORS.textLight,
                  opacity: active === steps.length - 1 ? 0.35 : 1, transition: 'opacity 0.2s',
                  outline: 'none',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: 'clamp(40px, 6vh, 56px)', paddingTop: 'clamp(28px, 4vh, 40px)', borderTop: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <p style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.textMuted, margin: 0 }}>
            ¿Listo para empezar?{' '}
            <span style={{ color: COLORS.textLight }}>Primera llamada gratuita, sin compromiso.</span>
          </p>
          <a href="#contacto" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: FONTS.body, fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', color: COLORS.accentCyan, background: 'rgba(0,217,255,0.08)', border: '1.5px solid rgba(0,217,255,0.35)', padding: '10px 22px', borderRadius: 6, whiteSpace: 'nowrap' }}>
            HABLEMOS →
          </a>
        </div>
      </Container>

      <style>{`
        @media (max-width: 720px) {
          .process-layout { grid-template-columns: 1fr !important; }
          .process-layout > *:last-child { display: none; }
        }
        @media (max-width: 560px) {
          #proceso [role="tab"], #proceso button[aria-selected] {
            padding: 10px 12px !important; font-size: 9px !important;
          }
        }
      `}</style>
    </section>
  )
}
