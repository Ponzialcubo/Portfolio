import { COLORS, FONTS } from '../../utils/constants'

export default function LegalLayout({ children }) {
  return (
    <div style={{ background: COLORS.bgPrimary, minHeight: '100vh' }}>

      {/* Minimal header */}
      <header style={{
        borderBottom: `1px solid ${COLORS.border}`,
        padding: '16px clamp(20px, 5vw, 64px)',
        display: 'flex', alignItems: 'center', gap: 20,
      }}>
        <a
          href="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: FONTS.body, fontSize: 13, fontWeight: 500,
            color: COLORS.textMuted, textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = COLORS.accentCyan}
          onMouseLeave={e => e.currentTarget.style.color = COLORS.textMuted}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Volver al inicio
        </a>
        <span style={{ color: COLORS.border }}>|</span>
        <a href="/" style={{ fontFamily: FONTS.heading, fontSize: 15, fontWeight: 800, color: COLORS.textWhite, textDecoration: 'none' }}>
          SERGIOLAB<span style={{ color: COLORS.accentCyan }}> ·</span>
        </a>
      </header>

      {/* Content */}
      <main style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(40px, 6vh, 72px) clamp(20px, 5vw, 48px)' }}>
        {children}
      </main>

      {/* Minimal footer */}
      <footer style={{
        borderTop: `1px solid ${COLORS.border}`,
        padding: '20px clamp(20px, 5vw, 64px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
      }}>
        <p style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, margin: 0 }}>
          © {new Date().getFullYear()} SergioLab — Madrid, España
        </p>
        <nav style={{ display: 'flex', gap: 16 }}>
          {[['Privacidad', '/privacy'], ['Cookies', '/cookies'], ['Términos', '/terms']].map(([label, href]) => (
            <a key={href} href={href} style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = COLORS.textLight}
              onMouseLeave={e => e.currentTarget.style.color = COLORS.textDim}
            >
              {label}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  )
}
