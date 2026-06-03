import { useState, useRef, useEffect, useCallback } from 'react'
import { COLORS, FONTS } from '../../utils/constants'
import { faqs } from '../../data/faq'

// ── Keyword matching (same as FAQ.jsx) ───────────────────────────────────────
const KEYWORD_MAP = [
  { keys: ['qué', 'que', 'tipo', 'proyectos', 'haces', 'servicios', 'ofrecés'], idx: 0 },
  { keys: ['precio', 'cuesta', 'cuánto', 'cuanto', 'presupuesto', 'tarifa', 'cobras', 'euros', 'coste'], idx: 1 },
  { keys: ['tiempo', 'tarda', 'plazo', 'semana', 'días', 'duración', 'cuándo'], idx: 2 },
  { keys: ['google', 'seo', 'posicionar', 'busqueda', 'aparecer', 'aeo'], idx: 3 },
  { keys: ['gestionar', 'panel', 'admin', 'yo mismo', 'editar', 'contenidos'], idx: 4 },
  { keys: ['pago', 'stripe', 'herramienta', 'integración', 'whatsapp', 'chatbot'], idx: 5 },
  { keys: ['mantenimiento', 'soporte', 'después', 'actualizar', 'mensual'], idx: 6 },
  { keys: ['madrid', 'remoto', 'presencial', 'distancia', 'españa'], idx: 7 },
]
function findAnswer(q) {
  const lq = q.toLowerCase()
  for (const { keys, idx } of KEYWORD_MAP) {
    if (keys.some(k => lq.includes(k))) return faqs[idx]
  }
  return null
}

const ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT
const INITIAL = [{ id: 0, from: 'bot', text: 'Hola, soy el asistente de SergioLab. ¿En qué puedo ayudarte?', showCTA: false }]

const SUGGESTIONS = ['¿Cuánto cuesta una web?', '¿En cuánto tiempo?', '¿Incluye SEO?']

const BOT_ICON = (
  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,217,255,0.15)', border: '1px solid rgba(0,217,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" fill="#00D9FF" opacity=".8"/></svg>
  </div>
)

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      {BOT_ICON}
      <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '14px 14px 14px 4px', padding: '10px 14px', display: 'flex', gap: 5, alignItems: 'center' }}>
        {[0,1,2].map(i => (
          <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.accentCyan, opacity: 0.5, animation: `fchat-dot 1.2s ease-in-out ${i*0.18}s infinite` }} />
        ))}
      </div>
    </div>
  )
}

// Render text with newlines as <br>
function BotText({ text }) {
  return (
    <p style={{ margin: 0, fontFamily: FONTS.body, fontSize: 13, color: COLORS.textLight, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
      {text}
    </p>
  )
}

export default function FloatingChat() {
  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState(INITIAL)
  const [input, setInput]     = useState('')
  const [typing, setTyping]   = useState(false)
  const [exchanges, setExchanges] = useState(0)
  const [badge, setBadge]     = useState(false)
  const msgsRef = useRef(null)
  const inputRef = useRef(null)
  const hasOpenedRef = useRef(false)

  // Scroll only inside the chat container
  useEffect(() => {
    if (!msgsRef.current) return
    msgsRef.current.scrollTop = msgsRef.current.scrollHeight
  }, [messages, typing])

  // Show badge after 8s if user never opened the chat.
  // Uses a ref instead of the `open` state to avoid stale closure.
  useEffect(() => {
    const t = setTimeout(() => { if (!hasOpenedRef.current) setBadge(true) }, 8000)
    return () => clearTimeout(t)
  }, [])

  const handleOpen = () => {
    hasOpenedRef.current = true
    setOpen(v => !v)
    setBadge(false)
    setTimeout(() => inputRef.current?.focus(), 200)
  }

  const handleSend = useCallback(async (text) => {
    const q = (text || input).trim()
    if (!q || typing) return
    setInput('')
    setMessages(m => [...m, { id: Date.now(), from: 'user', text: q }])
    setTyping(true)
    const newEx = exchanges + 1
    setExchanges(newEx)

    let botText = null

    if (ENDPOINT) {
      try {
        const history = messages.slice(-4).map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }))
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: q, history }),
        })
        if (res.ok) {
          const data = await res.json()
          botText = data.text ?? null
        }
      } catch { /* fallback */ }
    }

    if (!botText) {
      const match = findAnswer(q)
      botText = match ? match.answer : 'Lo mejor es que hables directamente con Sergio en info@sergiolab.es — te responde hoy mismo.'
    }

    // Strip any remaining markdown
    const clean = botText.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')

    setTyping(false)
    setMessages(m => [...m, { id: Date.now() + 1, from: 'bot', text: clean, showCTA: newEx >= 2 || !findAnswer(q) }])
  }, [input, typing, exchanges, messages])

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <>
      {/* ── Panel ───────────────────────────────────────────────── */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat con SergioLab"
          style={{
            position: 'fixed', bottom: 84, right: 20, zIndex: 9500,
            width: 'clamp(300px, 90vw, 360px)',
            background: '#0F1419',
            border: '1.5px solid rgba(0,217,255,0.2)',
            borderRadius: 16,
            boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,217,255,0.06)',
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden',
            animation: 'fchat-slide-in 0.22s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Header */}
          <div style={{ background: 'rgba(0,217,255,0.06)', borderBottom: '1px solid rgba(0,217,255,0.12)', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981', flexShrink: 0 }} />
              <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Asistente · en línea</span>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: COLORS.textDim, cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', lineHeight: 1 }}>
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div ref={msgsRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 8px', display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 320 }}>
            {messages.map(msg => (
              <div key={msg.id}>
                {msg.from === 'bot' ? (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    {BOT_ICON}
                    <div style={{ maxWidth: '84%' }}>
                      <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px 14px 14px 4px', padding: '10px 13px' }}>
                        <BotText text={msg.text} />
                      </div>
                      {msg.showCTA && (
                        <a href="/contacto" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8, fontFamily: FONTS.body, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', color: COLORS.accentCyan, background: 'rgba(0,217,255,0.08)', border: '1px solid rgba(0,217,255,0.3)', padding: '6px 12px', borderRadius: 6 }}>
                          CONTACTAR →
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ maxWidth: '80%', background: 'rgba(0,217,255,0.1)', border: '1px solid rgba(0,217,255,0.2)', borderRadius: '14px 14px 4px 14px', padding: '10px 13px' }}>
                      <p style={{ margin: 0, fontFamily: FONTS.body, fontSize: 13, color: COLORS.textWhite, lineHeight: 1.5 }}>{msg.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {typing && <TypingDots />}
          </div>

          {/* Suggestions (only at start) */}
          {messages.length <= 1 && (
            <div style={{ padding: '0 14px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => handleSend(s)} style={{ fontFamily: FONTS.body, fontSize: 11, color: COLORS.textMuted, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '5px 10px', borderRadius: 6, cursor: 'pointer', outline: 'none', transition: 'border-color 0.2s, color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,217,255,0.35)'; e.currentTarget.style.color = COLORS.textLight }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = COLORS.textMuted }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '10px 12px', display: 'flex', gap: 8, flexShrink: 0 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escribe tu pregunta..."
              style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 8, padding: '9px 12px', fontFamily: FONTS.body, fontSize: 13, color: COLORS.textWhite, outline: 'none' }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || typing}
              style={{ width: 38, height: 38, borderRadius: 9, border: 'none', background: input.trim() && !typing ? COLORS.accentCyan : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() && !typing ? 'pointer' : 'default', transition: 'background 0.2s', flexShrink: 0, outline: 'none' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke={input.trim() && !typing ? '#0F1419' : COLORS.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Floating button ──────────────────────────────────────── */}
      <button
        onClick={handleOpen}
        aria-label={open ? 'Cerrar chat' : 'Abrir chat de ayuda'}
        style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 9500,
          width: 56, height: 56, borderRadius: '50%',
          background: open ? 'rgba(255,255,255,0.08)' : COLORS.accentCyan,
          border: open ? '1.5px solid rgba(255,255,255,0.15)' : 'none',
          color: open ? COLORS.textMuted : '#0F1419',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', outline: 'none',
          boxShadow: open ? 'none' : '0 4px 24px rgba(0,217,255,0.4)',
          transition: 'background 0.25s, box-shadow 0.25s, transform 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
        {badge && !open && (
          <span style={{ position: 'absolute', top: 2, right: 2, width: 14, height: 14, borderRadius: '50%', background: '#EF4444', border: '2px solid #0F1419', animation: 'fchat-pulse 2s ease-in-out infinite' }} />
        )}
      </button>

      <style>{`
        @keyframes fchat-dot {
          0%, 100% { transform: translateY(0); opacity: .5; }
          50%       { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes fchat-slide-in {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fchat-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        input::placeholder { color: rgba(226,232,240,0.25); }
        input:focus { border-color: rgba(0,217,255,0.4) !important; }
      `}</style>
    </>
  )
}
