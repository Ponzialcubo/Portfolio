import { useRef, useState, useEffect } from 'react'
import { COLORS, FONTS } from '../../utils/constants'
import Container from '../common/Container'
import { faqs } from '../../data/faq'
import { useScrollAnimations } from '../../hooks/useScrollAnimations'

// ── Keyword matching ─────────────────────────────────────────────────────────
// Mapeo de palabras clave a índices del array `faqs`.
const KEYWORD_MAP = [
  { keys: ['qué', 'que', 'tipo', 'proyectos', 'haces', 'desarrollas', 'servicios', 'ofrecés'], idx: 0 },
  { keys: ['precio', 'cuesta', 'coste', 'cuánto', 'cuanto', 'presupuesto', 'tarifa', 'cobras', 'euros'], idx: 1 },
  { keys: ['tiempo', 'tarda', 'plazo', 'semana', 'días', 'dias', 'duración', 'cuándo', 'cuando', 'termina'], idx: 2 },
  { keys: ['google', 'seo', 'posicionar', 'posicion', 'ranquear', 'busqueda', 'búsqueda', 'aparecer'], idx: 3 },
  { keys: ['gestionar', 'gestión', 'contenidos', 'pedidos', 'panel', 'admin', 'yo mismo', 'editar'], idx: 4 },
  { keys: ['pago', 'stripe', 'herramienta', 'integración', 'integracion', 'whatsapp', 'analytics', 'chatbot'], idx: 5 },
  { keys: ['mantenimiento', 'soporte', 'después', 'despues', 'entregar', 'actualizar', 'mes', 'mensual'], idx: 6 },
  { keys: ['madrid', 'remoto', 'presencial', 'distancia', 'españa', 'espana', 'donde', 'dónde'], idx: 7 },
]

function findAnswer(query) {
  const q = query.toLowerCase()
  for (const { keys, idx } of KEYWORD_MAP) {
    if (keys.some(k => q.includes(k))) return faqs[idx]
  }
  return null
}

const SUGGESTIONS = [
  '¿Cuánto cuesta una web?',
  '¿En cuánto tiempo la tienes?',
  '¿Aparecerá en Google?',
  '¿Ofrecéis mantenimiento?',
]

const BOT_AVATAR = (
  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,217,255,0.12)', border: '1.5px solid rgba(0,217,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" fill="#00D9FF" opacity=".7" />
    </svg>
  </div>
)

function TypingBubble() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
      {BOT_AVATAR}
      <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px 16px 16px 4px', padding: '14px 18px' }}>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: COLORS.accentCyan, opacity: 0.5, animation: `dot-bounce 1.2s ease-in-out ${i * 0.18}s infinite` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const sectionRef = useRef(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  useScrollAnimations(sectionRef)

  const [messages, setMessages] = useState([
    {
      id: 0, from: 'bot',
      text: '¡Hola! Soy el asistente de SergioLab. ¿Qué duda tienes sobre el proceso de desarrollo o los servicios? Puedes preguntarme cualquier cosa.',
      showCTA: false,
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [exchanges, setExchanges] = useState(0)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const handleSend = (text) => {
    const q = (text || input).trim()
    if (!q) return
    setInput('')

    const userMsg = { id: Date.now(), from: 'user', text: q }
    setMessages(m => [...m, userMsg])
    setTyping(true)

    setTimeout(() => {
      const match = findAnswer(q)
      const newExchanges = exchanges + 1
      setExchanges(newExchanges)
      setTyping(false)

      if (match) {
        setMessages(m => [...m, {
          id: Date.now() + 1, from: 'bot',
          text: match.answer,
          showCTA: newExchanges >= 2,
        }])
      } else {
        setMessages(m => [...m, {
          id: Date.now() + 1, from: 'bot',
          text: 'Buena pregunta. Para darte una respuesta personalizada sobre tu proyecto concreto, lo mejor es que hablemos directamente. Te respondo en menos de 24 horas.',
          showCTA: true,
        }])
      }
    }, 900 + Math.random() * 400)
  }

  const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }

  return (
    <section
      ref={sectionRef}
      id="faq"
      style={{ width: '100%', background: COLORS.bgPrimary, padding: 'clamp(72px, 10vh, 120px) 0' }}
    >
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.9fr) minmax(0,1.1fr)', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'start' }} className="faq-layout">

          {/* Left: copy */}
          <div style={{ position: 'sticky', top: 'clamp(80px,12vh,100px)' }} className="faq-aside">
            <p style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 500, letterSpacing: '0.26em', color: COLORS.accentCyan, textTransform: 'uppercase', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 22, height: 1, background: COLORS.accentCyan, opacity: 0.55, display: 'inline-block' }} />
              DUDAS FRECUENTES
            </p>
            <h2 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 800, color: COLORS.textWhite, letterSpacing: '-0.025em', lineHeight: 0.95, margin: '0 0 20px', textTransform: 'uppercase' }}>
              ¿TIENES<br />DUDAS?
            </h2>
            <p style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.textMuted, lineHeight: 1.7, margin: '0 0 28px' }}>
              Pregúntame directamente. El asistente responde al instante sobre procesos, tecnología y servicios.
              Si tu pregunta es más específica, te derivo al formulario de contacto.
            </p>

            {/* Quick suggestions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 4px' }}>Preguntas frecuentes</p>
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 8, padding: '10px 14px', cursor: 'pointer',
                    fontFamily: FONTS.body, fontSize: 13, color: COLORS.textMuted,
                    textAlign: 'left', transition: 'border-color 0.2s, color 0.2s', outline: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,217,255,0.3)'; e.currentTarget.style.color = COLORS.textLight }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = COLORS.textMuted }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Right: chat */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* Chat window */}
            <div style={{
              background: 'rgba(255,255,255,0.025)', border: `1.5px solid rgba(255,255,255,0.08)`,
              borderRadius: '16px 16px 0 0', overflow: 'hidden',
            }}>
              {/* Topbar */}
              <div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
                <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Asistente · en línea</span>
              </div>

              {/* Messages */}
              <div style={{ height: 380, overflowY: 'auto', padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {messages.map(msg => (
                  <div key={msg.id}>
                    {msg.from === 'bot' ? (
                      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        {BOT_AVATAR}
                        <div style={{ maxWidth: '82%' }}>
                          <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px 16px 16px 4px', padding: '14px 18px' }}>
                            <p style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.textLight, lineHeight: 1.65, margin: 0 }}>{msg.text}</p>
                          </div>
                          {msg.showCTA && (
                            <a
                              href="#contacto"
                              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 10, fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', color: COLORS.accentCyan, background: 'rgba(0,217,255,0.1)', border: '1.5px solid rgba(0,217,255,0.35)', padding: '8px 16px', borderRadius: 6 }}
                            >
                              CONTACTAR →
                            </a>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ maxWidth: '78%', background: `rgba(0,217,255,0.12)`, border: '1px solid rgba(0,217,255,0.25)', borderRadius: '16px 16px 4px 16px', padding: '12px 16px' }}>
                          <p style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.textWhite, lineHeight: 1.6, margin: 0 }}>{msg.text}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {typing && <TypingBubble />}
                <div ref={bottomRef} />
              </div>
            </div>

            {/* Input */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.08)', borderTop: 'none', borderRadius: '0 0 16px 16px', padding: '14px 16px', display: 'flex', gap: 10 }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Escribe tu pregunta..."
                style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 14px', fontFamily: FONTS.body, fontSize: 14, color: COLORS.textWhite, outline: 'none' }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || typing}
                style={{ width: 44, height: 44, borderRadius: 10, border: 'none', cursor: input.trim() && !typing ? 'pointer' : 'default', background: input.trim() && !typing ? COLORS.accentCyan : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s', outline: 'none' }}
                aria-label="Enviar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke={input.trim() && !typing ? '#0F1419' : COLORS.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes dot-bounce {
          0%, 100% { transform: translateY(0); opacity: .5; }
          50%       { transform: translateY(-4px); opacity: 1; }
        }
        @media (max-width: 820px) {
          .faq-layout { grid-template-columns: 1fr !important; }
          .faq-aside  { position: static !important; }
        }
        input::placeholder { color: rgba(226,232,240,0.28); }
        input:focus { border-color: rgba(0,217,255,0.4) !important; }
      `}</style>
    </section>
  )
}
