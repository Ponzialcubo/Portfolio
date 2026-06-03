import { COLORS, FONTS } from '../../utils/constants'
import Container from './Container'

// Visual page header for section pages.
// Provides: eyebrow label, large H1, subtitle, and optional right-side content.
// The gradient/glow accent uses the page accent color.
export default function PageBanner({
  eyebrow,
  title,
  subtitle,
  accent = COLORS.accentCyan,
  right = null,
  children = null,
}) {
  return (
    <div
      style={{
        width: '100%',
        background: COLORS.bgPrimary,
        borderBottom: `1px solid rgba(255,255,255,0.05)`,
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'clamp(48px, 7vh, 80px)',
        paddingBottom: 'clamp(40px, 6vh, 64px)',
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden="true" style={{ position: 'absolute', top: -80, left: -60, width: 480, height: 320, borderRadius: '50%', background: `radial-gradient(ellipse, ${accent}12 0%, transparent 65%)`, pointerEvents: 'none' }} />
      {/* Top edge line */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${accent}44, ${accent}11, transparent)` }} />

      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: right ? 'minmax(0,1fr) auto' : '1fr', gap: 'clamp(24px, 4vw, 48px)', alignItems: 'flex-end' }} className="page-banner-layout">
          <div>
            {eyebrow && (
              <p style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 500, letterSpacing: '0.26em', color: accent, textTransform: 'uppercase', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 22, height: 1, background: accent, opacity: 0.55, display: 'inline-block' }} />
                {eyebrow}
              </p>
            )}
            <h1 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: 800, color: COLORS.textWhite, letterSpacing: '-0.03em', lineHeight: 0.92, margin: '0 0 clamp(16px,2.5vh,24px)', textTransform: 'uppercase' }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ fontFamily: FONTS.body, fontSize: 'clamp(15px, 1.6vw, 18px)', color: COLORS.textMuted, lineHeight: 1.7, margin: 0, maxWidth: 560 }}>
                {subtitle}
              </p>
            )}
            {children}
          </div>
          {right && (
            <div style={{ alignSelf: 'center' }}>{right}</div>
          )}
        </div>
      </Container>

      <style>{`
        @media (max-width: 720px) { .page-banner-layout { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
