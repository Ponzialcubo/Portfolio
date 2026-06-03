import { useState, useRef } from 'react'
import { COLORS, FONTS } from '../../utils/constants'
import { useScrollAnimations } from '../../hooks/useScrollAnimations'
import Container from '../common/Container'
import SectionHeader from '../common/SectionHeader'
import { whyMeItems } from '../../data/whyMe'
import { credentials } from '../../data/credentials'

// ── Credential badge ────────────────────────────────────────────
function CredentialBadge({ item }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${item.accent}28`,
      borderRadius: 10, padding: '16px 20px',
      flex: 1, minWidth: 0,
    }}>
      <span style={{ fontSize: 40, lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
      <div>
        <p style={{
          fontFamily: FONTS.heading, fontSize: 18, fontWeight: 700,
          color: COLORS.textWhite, margin: 0, lineHeight: 1.3,
        }}>
          {item.title}
        </p>
        <p style={{
          fontFamily: FONTS.body, fontSize: 14,
          color: '#94A3B8', margin: '4px 0 0', lineHeight: 1.4,
        }}>
          {item.issuer}
        </p>
      </div>
    </div>
  )
}

// ── Why card ────────────────────────────────────────────────────
function WhyCard({ item }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? `${item.accent}08` : 'rgba(255,255,255,0.025)',
        border: `1.5px solid ${hov ? item.accent + '38' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 12,
        padding: '24px',
        display: 'flex', flexDirection: 'column', gap: 10,
        transition: 'background 0.3s, border-color 0.3s, transform 0.3s',
        transform: hov ? 'translateY(-3px)' : 'none',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: 3, borderRadius: '12px 0 0 12px',
        background: item.accent, opacity: hov ? 0.85 : 0.35,
        transition: 'opacity 0.3s',
      }} />

      <span style={{ fontSize: 32, lineHeight: 1, paddingLeft: 8 }}>{item.icon}</span>

      <h3 style={{
        fontFamily: FONTS.heading,
        fontSize: 20, fontWeight: 700,
        color: COLORS.textWhite,
        margin: 0, lineHeight: 1.2, paddingLeft: 8,
      }}>
        {item.title}
      </h3>

      <p style={{
        fontFamily: FONTS.body,
        fontSize: 14,
        color: '#94A3B8', lineHeight: 1.65, margin: 0, paddingLeft: 8,
      }}>
        {item.description}
      </p>
    </div>
  )
}

// ── Main section ────────────────────────────────────────────────
export default function WhyMe() {
  const ref = useRef(null)
  useScrollAnimations(ref)

  return (
    <section
      ref={ref}
      id="sobre-mi"
      style={{
        width: '100%',
        background: COLORS.bgPrimary,
        padding: 'clamp(64px, 9vh, 112px) 0',
      }}
    >
      <Container>
        <SectionHeader
          eyebrow="POR QUÉ ELEGIRME"
          title="SOBRE MÍ"
          subtitle="Desarrollador full-stack con formación técnica real y análisis de datos incluido"
          style={{ marginBottom: 'clamp(32px, 5vh, 48px)' }}
        />

        {/* ── Formación académica ─────────────────────────────── */}
        <div style={{ marginBottom: 'clamp(28px, 4vh, 44px)' }}>
          <p style={{
            fontFamily: FONTS.mono, fontSize: 12, letterSpacing: '0.18em',
            color: COLORS.accentCyan, textTransform: 'uppercase', margin: '0 0 14px',
          }}>
            Formación Académica
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }} className="creds-grid">
            {credentials.education.map(item => (
              <CredentialBadge key={item.title} item={item} />
            ))}
          </div>
        </div>

        {/* ── Diferencial único ───────────────────────────────── */}
        <div style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1.5px solid rgba(0,217,255,0.18)',
          borderRadius: 14,
          padding: 'clamp(24px, 3.5vh, 36px) clamp(24px, 3vw, 36px)',
          marginBottom: 'clamp(36px, 5vh, 56px)',
        }}>
          <p style={{
            fontFamily: FONTS.mono, fontSize: 12, letterSpacing: '0.18em',
            color: COLORS.accentCyan, textTransform: 'uppercase', margin: '0 0 14px',
          }}>
            Diferencial único · Analytics & Reporting
          </p>

          <p style={{
            fontFamily: FONTS.heading,
            fontSize: 'clamp(22px, 2.8vw, 32px)',
            fontWeight: 700, color: COLORS.textWhite,
            margin: '0 0 12px', lineHeight: 1.3,
          }}>
            No solo te hago el sitio web —{' '}
            <span style={{ color: COLORS.accentCyan }}>
              te entrego datos mensuales
            </span>{' '}
            para que sepas cómo va tu negocio.
          </p>

          <p style={{
            fontFamily: FONTS.body, fontSize: 16,
            color: '#E2E8F0', margin: '0 0 20px', lineHeight: 1.6,
          }}>
            Acceso a Google Business, dashboard mensual e informes PDF incluidos en cada proyecto.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {credentials.differentiators.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(0,217,255,0.12)',
                  border: '1px solid rgba(0,217,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, color: COLORS.accentCyan,
                }}>
                  ✓
                </span>
                <span style={{
                  fontFamily: FONTS.body, fontSize: 15, fontWeight: 500,
                  color: '#E2E8F0',
                }}>
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 6-card grid ─────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(12px, 1.6vw, 20px)',
        }}
          className="whyme-grid"
        >
          {whyMeItems.map(item => (
            <WhyCard key={item.id} item={item} />
          ))}
        </div>
      </Container>

      <style>{`
        .creds-grid > * { min-width: 0; }
        @media (max-width: 960px) {
          .whyme-grid  { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .creds-grid  { flex-direction: column !important; }
          .whyme-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
