import { useState, useEffect } from 'react'
import { COLORS, FONTS } from '../../utils/constants'

const KEY = 'sergiolab_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true)
  }, [])

  const accept = () => { localStorage.setItem(KEY, 'all'); setVisible(false) }
  const reject = () => { localStorage.setItem(KEY, 'essential'); setVisible(false) }

  if (!visible) return null

  const btnBase = {
    fontFamily: FONTS.body, fontSize: 12, fontWeight: 600,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    border: 'none', borderRadius: 6, padding: '9px 20px',
    cursor: 'pointer', transition: 'opacity 0.2s',
    whiteSpace: 'nowrap',
  }

  return (
    <div
      role="dialog"
      aria-label="Consentimiento de cookies"
      aria-live="polite"
      style={{
        position: 'fixed', bottom: 24, left: 24, right: 24,
        maxWidth: 640, margin: '0 auto',
        background: '#141B24',
        border: '1.5px solid rgba(0,217,255,0.22)',
        borderRadius: 14,
        padding: 'clamp(20px, 3vh, 28px) clamp(20px, 3vw, 28px)',
        zIndex: 9000,
        boxShadow: '0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,217,255,0.06)',
      }}
    >
      {/* Dot */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
        <span style={{
          flexShrink: 0, marginTop: 3,
          width: 8, height: 8, borderRadius: '50%',
          background: COLORS.accentCyan,
          boxShadow: `0 0 8px ${COLORS.accentCyan}`,
        }} />
        <div>
          <p style={{
            fontFamily: FONTS.heading, fontSize: 15, fontWeight: 700,
            color: COLORS.textWhite, margin: '0 0 6px',
          }}>
            Usamos cookies
          </p>
          <p style={{
            fontFamily: FONTS.body, fontSize: 13,
            color: COLORS.textMuted, margin: 0, lineHeight: 1.6,
          }}>
            Utilizamos cookies propias (esenciales) y de terceros (analítica) para mejorar tu
            experiencia y medir el rendimiento del sitio.{' '}
            <button
              onClick={() => setShowDetail(v => !v)}
              style={{
                background: 'none', border: 'none', padding: 0,
                fontFamily: FONTS.body, fontSize: 13,
                color: COLORS.accentCyan, cursor: 'pointer', textDecoration: 'underline',
              }}
            >
              {showDetail ? 'Ocultar detalle' : 'Ver detalle'}
            </button>
          </p>

          {showDetail && (
            <div style={{
              marginTop: 12, padding: '12px 14px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 8,
            }}>
              {[
                { name: 'Esenciales', desc: 'Necesarias para que el sitio funcione correctamente. Siempre activas.', always: true },
                { name: 'Analítica', desc: 'Google Analytics para conocer el tráfico y mejorar el contenido. Solo con tu permiso.', always: false },
              ].map(c => (
                <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                  <div>
                    <p style={{ fontFamily: FONTS.mono, fontSize: 10, color: c.always ? COLORS.accentGreen : COLORS.accentCyan, textTransform: 'uppercase', letterSpacing: '0.14em', margin: '0 0 2px' }}>
                      {c.name} {c.always && '· siempre activas'}
                    </p>
                    <p style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textMuted, margin: 0, lineHeight: 1.5 }}>
                      {c.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <a
          href="/cookies"
          style={{
            fontFamily: FONTS.body, fontSize: 12, color: COLORS.textDim,
            textDecoration: 'none', alignSelf: 'center',
            marginRight: 'auto',
          }}
        >
          Política de cookies
        </a>
        <button
          onClick={reject}
          style={{ ...btnBase, background: 'rgba(255,255,255,0.06)', color: COLORS.textMuted }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Solo esenciales
        </button>
        <button
          onClick={accept}
          style={{ ...btnBase, background: COLORS.accentCyan, color: '#0F1419' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Aceptar todas
        </button>
      </div>
    </div>
  )
}
