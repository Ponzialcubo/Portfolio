import { useState } from 'react'
import { COLORS, FONTS, TRANSITIONS } from '../../utils/constants'

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  accent = COLORS.accentCyan,
  size = 'md',
  disabled = false,
  target,
  rel,
}) {
  const [hov, setHov] = useState(false)

  const sizes = {
    sm: { padding: '6px 14px',  fontSize: 11 },
    md: { padding: '8px 18px',  fontSize: 12.5 },
    lg: { padding: '12px 28px', fontSize: 14 },
  }

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: FONTS.body,
    fontWeight: 600,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    borderRadius: 6,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: `background ${TRANSITIONS.fast}, border-color ${TRANSITIONS.fast}, box-shadow ${TRANSITIONS.fast}, transform ${TRANSITIONS.fast}`,
    outline: 'none',
    border: 'none',
    ...sizes[size],
  }

  const variants = {
    primary: {
      background: hov ? accent : `${accent}dd`,
      color: '#0F1419',
      transform: hov ? 'translateY(-1px)' : 'none',
      boxShadow: hov ? `0 6px 20px ${accent}40` : 'none',
    },
    secondary: {
      background: hov ? `${accent}14` : 'transparent',
      color: accent,
      border: `1.5px solid ${hov ? accent + 'bb' : accent + '55'}`,
      boxShadow: hov ? `0 0 18px ${accent}30` : 'none',
    },
    ghost: {
      background: hov ? 'rgba(255,255,255,0.08)' : 'transparent',
      color: COLORS.textLight,
      border: `1px solid ${hov ? COLORS.borderHover : COLORS.border}`,
    },
  }

  const style = { ...baseStyle, ...variants[variant] }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        style={style}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={style}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </button>
  )
}
