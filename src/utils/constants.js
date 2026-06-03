export const COLORS = {
  bgPrimary:     '#0F1419',
  bgSecondary:   '#141B24',
  bgCard:        'rgba(255,255,255,0.025)',
  accentCyan:    '#00D9FF',
  accentGreen:   '#10B981',
  accentAmber:   '#F59E0B',
  accentPurple:  '#8B5CF6',
  accentPink:    '#EC4899',
  accentOrange:  '#F97316',
  textWhite:     '#FFFFFF',
  textLight:     '#E2E8F0',
  textMuted:     'rgba(226,232,240,0.72)',
  textDim:       'rgba(226,232,240,0.45)',
  border:        'rgba(255,255,255,0.08)',
  borderHover:   'rgba(255,255,255,0.18)',
}

export const FONTS = {
  heading: "'Sora', sans-serif",
  body:    "'Inter', sans-serif",
  mono:    '"JetBrains Mono", monospace',
}

// Type scale — fixed sizes for consistent legibility across all sections
export const FONT_SIZES = {
  h1:    'clamp(52px, 8vw, 96px)',  // Hero headline — Sora 800 — white
  h2:    'clamp(32px, 4vw, 48px)',  // Section titles — Sora 700/800 — white
  h3:    '20px',                    // Card titles — Sora 700 — white
  lead:  '18px',                    // Lead / credential titles — Sora 700 — white
  body:  '14px',                    // Body copy — Inter 400 — #E2E8F0
  large: '16px',                    // Large body — Inter 400 — #E2E8F0
  small: '12px',                    // Secondary — Inter 400 — #94A3B8
  mono:  '11px',                    // Tech stacks — JetBrains Mono 500 — cyan
  label: '9px',                     // Eyebrow caps — JetBrains Mono 500 — cyan/dim
}

// Semantic color roles — follow these rules everywhere:
// CYAN  → small accents only (eyebrows, checkmarks, bars, key words ≤ 16px)
// WHITE → headlines, card titles
// LIGHT → body/primary text
// GRAY  → secondary/description text
// DIM   → meta / very small text

export const BREAKPOINTS = {
  mobile:  480,
  tablet:  768,
  desktop: 1024,
  wide:    1440,
}

export const TRANSITIONS = {
  fast:   '0.18s ease',
  normal: '0.3s ease',
  slow:   '0.6s cubic-bezier(0.4, 0, 0.2, 1)',
}

export const CAROUSEL = {
  CLONES:        2,
  AUTOPLAY_MS:   5000,
  TRANSITION_MS: 640,
  GAP:           28,
}
