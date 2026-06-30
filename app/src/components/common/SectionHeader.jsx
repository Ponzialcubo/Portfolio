import { COLORS, FONTS } from '../../utils/constants'

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  accent = COLORS.accentCyan,
  align = 'left',
  maxSubtitleWidth = 480,
  style = {},
}) {
  const textAlign = align === 'center' ? 'center' : 'left'
  const alignItems = align === 'center' ? 'center' : 'flex-start'

  return (
    <header style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      textAlign,
      alignItems,
      ...style,
    }}>
      {eyebrow && (
        <p style={{
          fontFamily: FONTS.mono,
          fontSize: 'clamp(10px, 0.85vw, 12px)',
          fontWeight: 500,
          color: accent,
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          margin: 0,
        }}>
          <span style={{
            width: 22, height: 1,
            background: accent, opacity: 0.55,
            flexShrink: 0, display: 'inline-block',
          }} />
          {eyebrow}
        </p>
      )}

      <h2 style={{
        fontFamily: FONTS.heading,
        fontSize: 'clamp(32px, 5vw, 64px)',
        fontWeight: 800,
        color: COLORS.textWhite,
        letterSpacing: '-0.025em',
        lineHeight: 0.95,
        margin: 0,
        textTransform: 'uppercase',
      }}>
        {title}
      </h2>

      {subtitle && (
        <p style={{
          fontFamily: FONTS.body,
          fontSize: 'clamp(14px, 1.2vw, 17px)',
          fontWeight: 400,
          color: COLORS.textMuted,
          lineHeight: 1.6,
          margin: 0,
          maxWidth: maxSubtitleWidth,
        }}>
          {subtitle}
        </p>
      )}
    </header>
  )
}
