import { Link } from 'react-router-dom'
import { FONTS, COLORS } from '../../../utils/constants'
import BorderBeam from '../../common/BorderBeam'
import GlareOverlay from '../../common/GlareOverlay'

// ── Wireframe mockup ──────────────────────────────────────────────────────────
function WireframeMockup({ accent }) {
  const row = (w, op) => (
    <div style={{ height: 7, width: w, background: `rgba(255,255,255,${op})`, borderRadius: 2 }} />
  )
  return (
    <div style={{
      position: 'absolute', inset: '8% 12%',
      background: 'rgba(255,255,255,0.025)',
      borderRadius: 7, border: '1px solid rgba(255,255,255,0.07)',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        height: 22, background: 'rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', padding: '0 10px', gap: 5, flexShrink: 0,
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        ))}
        <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 3, marginLeft: 8 }} />
      </div>
      <div style={{ padding: '12px 12px 10px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <div style={{ height: 32, background: `${accent}18`, borderRadius: 4, border: `1px solid ${accent}22` }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {row('88%', 0.06)}{row('70%', 0.04)}{row('78%', 0.04)}
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ flex: 1, height: 20, background: `${accent}12`, borderRadius: 3 }} />
          ))}
        </div>
        <div style={{ width: 56, height: 15, background: `${accent}25`, borderRadius: 3, marginTop: 2 }} />
      </div>
    </div>
  )
}

const ArrowRight   = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7h10M8 3l4 4-4 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ArrowUpRight = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 11L11 3M5 3h6v6" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ── Card ──────────────────────────────────────────────────────────────────────
export default function ProjectCard({ project, isActive, cardWidth, isHovered }) {
  const showHover = isActive && isHovered
  const isInternal = project.href && project.href.startsWith('/')
  const isExternal = !isInternal && project.href !== '#'

  return (
    <article style={{
      position: 'relative',
      width: cardWidth,
      background: COLORS.bgCard,
      border: `1.5px solid ${showHover ? project.accent + '55' : COLORS.border}`,
      borderRadius: 12, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      boxShadow: showHover
        ? `0 20px 60px ${project.accent}22, 0 6px 24px rgba(0,0,0,0.55)`
        : '0 4px 24px rgba(0,0,0,0.35)',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    }}>
      {/* Border Beam — visible siempre, más brillante en hover */}
      <BorderBeam
        color={project.accent}
        thickness={1.5}
        duration={showHover ? 1.8 : 4}
        opacity={showHover ? 1 : 0.5}
      />
      {/* Glare — sigue el ratón, refuerza la sensación premium */}
      <GlareOverlay color={`${project.accent}18`} size="55%" />

      {/* Image */}
      <div style={{
        position: 'relative', width: '100%',
        height: 'clamp(200px, 28vh, 340px)',
        overflow: 'hidden', flexShrink: 0,
      }}>
        <div style={{ position: 'absolute', inset: 0, background: project.bg }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle, ${project.accent}18 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }} />
        <WireframeMockup accent={project.accent} />
        <span style={{
          position: 'absolute', bottom: 12, left: 14,
          fontFamily: FONTS.mono, fontSize: 10, fontWeight: 500,
          letterSpacing: '0.2em', color: project.accent,
          opacity: 0.78, textTransform: 'uppercase',
        }}>
          {project.category}
        </span>
        {project.badge && (
          <span style={{
            position: 'absolute', top: 14, right: 14,
            fontFamily: FONTS.mono, fontSize: 9, fontWeight: 700,
            letterSpacing: '0.15em', color: '#0F1419',
            background: project.accent, padding: '4px 10px',
            borderRadius: 4, textTransform: 'uppercase',
          }}>
            {project.badge}
          </span>
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(120deg, transparent 0%, ${project.accent}0a 50%, transparent 100%)`,
          opacity: showHover ? 1 : 0,
          transition: 'opacity 0.4s ease', pointerEvents: 'none',
        }} />
      </div>

      {/* Body */}
      <div style={{
        padding: 'clamp(20px, 2.4vh, 28px) clamp(20px, 2vw, 28px)',
        display: 'flex', flexDirection: 'column', gap: 10, flex: 1,
      }}>
        <h3 style={{
          fontFamily: FONTS.heading,
          fontSize: 'clamp(16px, 1.8vh, 22px)', fontWeight: 700,
          color: COLORS.textWhite, lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0,
        }}>
          {project.title}
        </h3>
        <p style={{
          fontFamily: FONTS.body,
          fontSize: 'clamp(12px, 1.35vh, 15px)', fontWeight: 400,
          color: COLORS.textMuted, lineHeight: 1.6, margin: 0,
          overflow: 'hidden', display: '-webkit-box',
          WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
        }}>
          {project.description}
        </p>

        {/* Key capabilities */}
        {project.highlights?.length > 0 && (
          <ul style={{
            listStyle: 'none', margin: 0, padding: 0, flex: 1,
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '6px 12px',
          }}>
            {project.highlights.map(h => (
              <li key={h} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                fontFamily: FONTS.body, fontSize: 'clamp(10.5px, 1.15vh, 12.5px)',
                color: COLORS.textLight, lineHeight: 1.3,
              }}>
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M2 7.5L5.5 11L12 3.5" stroke={project.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {h}
              </li>
            ))}
          </ul>
        )}

        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2px 0',
          fontFamily: FONTS.mono, fontSize: 'clamp(10px, 1.1vh, 12px)',
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>
          {project.tech.map((t, i) => (
            <span key={t}>
              <span style={{ color: project.accent }}>{t}</span>
              {i < project.tech.length - 1 && (
                <span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 8px' }}>·</span>
              )}
            </span>
          ))}
        </div>
        <div style={{ height: 1, background: COLORS.border }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {isInternal ? (
            <Link
              to={project.href}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: FONTS.body, fontSize: 'clamp(11px, 1.2vh, 13px)', fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
                color: project.accent,
                background: showHover ? `${project.accent}18` : 'transparent',
                border: `1.5px solid ${showHover ? project.accent + 'bb' : project.accent + '55'}`,
                padding: 'clamp(8px, 1vh, 12px) clamp(16px, 1.8vw, 24px)', borderRadius: 6,
                transition: 'background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
                boxShadow: showHover ? `0 0 20px ${project.accent}35` : 'none',
              }}
            >
              {project.buttonText}
              <ArrowRight size={13} color={project.accent} />
            </Link>
          ) : (
            <a
              href={project.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: FONTS.body, fontSize: 'clamp(11px, 1.2vh, 13px)', fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
                color: project.accent,
                background: showHover ? `${project.accent}18` : 'transparent',
                border: `1.5px solid ${showHover ? project.accent + 'bb' : project.accent + '55'}`,
                padding: 'clamp(8px, 1vh, 12px) clamp(16px, 1.8vw, 24px)', borderRadius: 6,
                transition: 'background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
                boxShadow: showHover ? `0 0 20px ${project.accent}35` : 'none',
              }}
            >
              {project.buttonText}
              {isExternal ? <ArrowUpRight size={13} color={project.accent} /> : <ArrowRight size={13} color={project.accent} />}
            </a>
          )}
          {/* Enlace al sitio live */}
          {project.liveUrl && (
            <a
              href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: FONTS.body, fontSize: 'clamp(11px, 1.2vh, 13px)', fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
                color: COLORS.textMuted,
                background: 'rgba(255,255,255,0.04)',
                border: '1.5px solid rgba(255,255,255,0.12)',
                padding: 'clamp(8px, 1vh, 12px) clamp(14px, 1.5vw, 20px)', borderRadius: 6,
                transition: 'background 0.22s ease, border-color 0.22s ease, color 0.22s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${project.accent}12`
                e.currentTarget.style.borderColor = `${project.accent}55`
                e.currentTarget.style.color = project.accent
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.color = COLORS.textMuted
              }}
            >
              Ver sitio <ArrowUpRight size={13} color="currentColor" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
