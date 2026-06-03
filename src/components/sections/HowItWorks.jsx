import { useRef } from 'react'
import { COLORS, FONTS } from '../../utils/constants'
import Container from '../common/Container'
import SectionHeader from '../common/SectionHeader'
import { steps } from '../../data/howItWorks'
import { useScrollAnimations } from '../../hooks/useScrollAnimations'

// ── SVG icons ──────────────────────────────────────────────────
const PhoneIcon = ({ color, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C6.61 21 3 17.39 3 13c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
      stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
)

const CodeIcon = ({ color, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="8 6 2 12 8 18"   stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const RocketIcon = ({ color, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"  stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ChartIcon = ({ color, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 20V10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 20V4"  stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M6 20v-6"  stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M3 20h18"  stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.35" />
  </svg>
)

const ICONS = { phone: PhoneIcon, code: CodeIcon, rocket: RocketIcon, chart: ChartIcon }

// ── Inline arrow connectors ────────────────────────────────────
const ArrowRight = ({ color }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.45 }}>
    <svg width="24" height="14" viewBox="0 0 24 14" fill="none" aria-hidden="true">
      <path d="M0 7h20M14 1l6 6-6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

const ArrowDown = ({ color }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.45 }}>
    <svg width="14" height="24" viewBox="0 0 14 24" fill="none" aria-hidden="true">
      <path d="M7 0v20M1 14l6 6 6-6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

// ── Step card ───────────────────────────────────────────────────
function StepCard({ step }) {
  const Icon = ICONS[step.icon]
  return (
    <div style={{
      position: 'relative',
      background: 'rgba(255,255,255,0.025)',
      border: `1.5px solid ${step.accent}22`,
      borderRadius: 14,
      padding: '24px',
      display: 'flex', flexDirection: 'column', gap: 12,
      overflow: 'hidden',
    }}>
      {/* Faint background number */}
      <span style={{
        position: 'absolute', top: -4, right: 12,
        fontFamily: FONTS.heading, fontWeight: 800,
        fontSize: 'clamp(64px, 8vw, 96px)',
        color: step.accent, opacity: 0.055,
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        letterSpacing: '-0.04em',
      }}>
        {step.number}
      </span>

      {/* Icon box + step badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: `${step.accent}12`,
          border: `1px solid ${step.accent}28`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon color={step.accent} size={22} />
        </div>
        <span style={{
          fontFamily: FONTS.mono, fontSize: 11, fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: step.accent,
          background: `${step.accent}10`,
          border: `1px solid ${step.accent}28`,
          padding: '3px 9px', borderRadius: 4,
        }}>
          PASO {step.number}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: FONTS.heading,
        fontSize: 22, fontWeight: 700,
        color: COLORS.textWhite,
        margin: 0, lineHeight: 1.2,
      }}>
        {step.title}
      </h3>

      {/* Subtitle chips */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {step.subtitle.split(' · ').map(s => (
          <span key={s} style={{
            fontFamily: FONTS.body, fontSize: 12, fontWeight: 500,
            color: '#64748B',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '2px 8px', borderRadius: 4,
          }}>
            {s}
          </span>
        ))}
      </div>

      {/* Description */}
      <p style={{
        fontFamily: FONTS.body,
        fontSize: 14,
        color: '#94A3B8', lineHeight: 1.65, margin: 0,
      }}>
        {step.description}
      </p>

      {/* Accent bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 2, borderRadius: '0 0 14px 14px',
        background: `linear-gradient(to right, ${step.accent}55, ${step.accent}00)`,
      }} />
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────
export default function HowItWorks() {
  const ref = useRef(null)
  useScrollAnimations(ref)

  return (
    <section
      ref={ref}
      id="proceso"
      style={{
        width: '100%',
        background: COLORS.bgSecondary,
        padding: 'clamp(52px, 7vh, 80px) 0',
      }}
    >
      <Container>
        <SectionHeader
          eyebrow="CÓMO TRABAJO"
          title="EL PROCESO"
          subtitle="De la llamada inicial al dashboard de datos — 4 pasos, sin sorpresas"
          style={{ marginBottom: 'clamp(36px, 5vh, 56px)' }}
        />

        {/*
          Desktop 3-col grid:  [step1] [→] [step2]
                               [↓  ]  [ ] [↓  ]
                               [step3] [→] [step4]
          Mobile: single column, connectors hidden
        */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 44px 1fr',
            gridTemplateRows: 'auto 44px auto',
          }}
          className="steps-layout"
        >
          <StepCard step={steps[0]} />
          <ArrowRight color={steps[0].accent} />
          <StepCard step={steps[1]} />

          <ArrowDown color={steps[2].accent} />
          <div />
          <ArrowDown color={steps[3].accent} />

          <StepCard step={steps[2]} />
          <ArrowRight color={steps[2].accent} />
          <StepCard step={steps[3]} />
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 'clamp(36px, 5vh, 52px)',
          display: 'flex', alignItems: 'center', gap: 18,
          paddingTop: 'clamp(28px, 3.5vh, 40px)',
          borderTop: `1px solid ${COLORS.border}`,
          flexWrap: 'wrap',
        }}>
          <p style={{
            fontFamily: FONTS.body, fontSize: 16,
            color: '#E2E8F0', margin: 0,
          }}>
            ¿Listo para empezar?
          </p>
          <a
            href="#contacto"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: FONTS.body, fontSize: 13, fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              textDecoration: 'none', color: COLORS.accentCyan,
              background: 'rgba(0,217,255,0.08)',
              border: '1.5px solid rgba(0,217,255,0.35)',
              padding: '9px 20px', borderRadius: 6,
            }}
          >
            HABLEMOS →
          </a>
        </div>
      </Container>

      <style>{`
        @media (max-width: 680px) {
          .steps-layout {
            grid-template-columns: 1fr !important;
            grid-template-rows: unset !important;
          }
          /* hide all connector cells: cols 2, rows 2 */
          .steps-layout > *:nth-child(2),
          .steps-layout > *:nth-child(5),
          .steps-layout > *:nth-child(6),
          .steps-layout > *:nth-child(8) { display: none !important; }
        }
      `}</style>
    </section>
  )
}
