import { useState, useRef, useEffect, useCallback } from 'react'
import { COLORS, FONTS } from '../../utils/constants'
import { faqs } from '../../data/faq'
import { useChat } from '../../context/ChatContext'

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
const INITIAL = [{ id: 0, from: 'bot', text: 'Hola, soy el asistente de SergioLab. Cuéntame qué proyecto tienes en mente y te ayudo a definirlo.', showCTA: false }]

const SUGGESTIONS = ['Quiero una tienda online', 'Necesito una web profesional', 'Tengo una idea, no sé por dónde empezar']

const EMAIL_REGEX = /[\w.+-]+@[\w-]+\.[a-z]{2,}/i

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
  const { startChat: startChatCtx } = useChat()
  const [open, setOpen]             = useState(false)
  const [started, setStarted]       = useState(false)   // pre-chat form completed
  const [userData, setUserData]     = useState({ name: '', email: '' })
  const [preForm, setPreForm]       = useState({ name: '', email: '' })
  const [messages, setMessages]     = useState(INITIAL)
  const [input, setInput]           = useState('')
  const [typing, setTyping]         = useState(false)
  const [exchanges, setExchanges]   = useState(0)
  const [badge, setBadge]           = useState(false)
  const [autoSent, setAutoSent]     = useState(false)
  const msgsRef      = useRef(null)
  const inputRef     = useRef(null)
  const hasOpenedRef = useRef(false)

  useEffect(() => {
    if (!msgsRef.current) return
    msgsRef.current.scrollTop = msgsRef.current.scrollHeight
  }, [messages, typing])

  useEffect(() => {
    const t = setTimeout(() => { if (!hasOpenedRef.current) setBadge(true) }, 8000)
    return () => clearTimeout(t)
  }, [])

  // Abre el chat cuando el FAQ u otro componente dispara 'open-floating-chat'
  useEffect(() => {
    const handleOpenFromFAQ = () => {
      hasOpenedRef.current = true
      setOpen(true)
      setBadge(false)
    }
    window.addEventListener('open-floating-chat', handleOpenFromFAQ)
    return () => window.removeEventListener('open-floating-chat', handleOpenFromFAQ)
  }, [])

  const sendTranscript = useCallback(async (name, email, msgs) => {
    if (!email || msgs.length <= 1) return
    try {
      const ep = import.meta.env.VITE_CHAT_ENDPOINT?.replace('/chat', '/send-conversation') || '/api/send-conversation'
      await fetch(ep, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, messages: msgs }),
      })
    } catch {}
  }, [])

  const handleOpen = () => {
    hasOpenedRef.current = true
    setOpen(v => !v)
    setBadge(false)
    setTimeout(() => inputRef.current?.focus(), 200)
  }

  // Auto-envía transcript al cerrar si hubo al menos 1 intercambio
  const handleClose = useCallback(() => {
    setOpen(false)
    if (exchanges > 0 && !autoSent && userData.email) {
      setAutoSent(true)
      sendTranscript(userData.name, userData.email, messages)
    }
  }, [exchanges, autoSent, userData, messages, sendTranscript])

  const handleStartChat = (e) => {
    e.preventDefault()
    const name  = preForm.name.trim()
    const email = preForm.email.trim()
    if (!name || !email) return

    // Guarda en contexto para que FAQ.jsx lo lea
    startChatCtx(name, email)

    // Si hay sección #faq en la página actual → scroll y cierra el panel
    const faqEl = document.getElementById('faq')
    if (faqEl) {
      setOpen(false)
      setTimeout(() => {
        faqEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.dispatchEvent(new CustomEvent('faq-chat-start', { detail: { name, email } }))
      }, 150)
      return
    }

    // Fallback: no hay FAQ en esta página → continúa como panel flotante
    setUserData({ name, email })
    setStarted(true)
    const firstName = name.split(' ')[0]
    setMessages([{ id: 0, from: 'bot', text: `Hola ${firstName}, cuéntame qué proyecto tienes en mente.`, showCTA: false }])
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
          body: JSON.stringify({ message: q, history, name: userData.name, email: userData.email }),
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

  const handleSendNow = useCallback(async () => {
    if (autoSent || !userData.email) return
    setAutoSent(true)
    sendTranscript(userData.name, userData.email, messages)
  }, [autoSent, userData, messages, sendTranscript])

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
            <button onClick={handleClose} style={{ background: 'none', border: 'none', color: COLORS.textDim, cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', lineHeight: 1 }}>
              <CloseIcon />
            </button>
          </div>

          {/* Pre-chat form — se muestra hasta que el usuario da sus datos */}
          {!started && (
            <form onSubmit={handleStartChat} style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ margin: 0, fontFamily: FONTS.heading, fontSize: 15, fontWeight: 700, color: COLORS.textWhite, lineHeight: 1.4 }}>
                Cuéntame tu proyecto
              </p>
              <p style={{ margin: 0, fontFamily: FONTS.body, fontSize: 12, color: COLORS.textMuted, lineHeight: 1.5 }}>
                Déjame tus datos y te ayudo a definirlo antes de hablar con Sergio.
              </p>
              <input
                required type="text" placeholder="Tu nombre"
                value={preForm.name} onChange={e => setPreForm(f => ({ ...f, name: e.target.value }))}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 12px', fontFamily: FONTS.body, fontSize: 13, color: COLORS.textWhite, outline: 'none', boxSizing: 'border-box', width: '100%' }}
              />
              <input
                required type="email" placeholder="Tu email"
                value={preForm.email} onChange={e => setPreForm(f => ({ ...f, email: e.target.value }))}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 12px', fontFamily: FONTS.body, fontSize: 13, color: COLORS.textWhite, outline: 'none', boxSizing: 'border-box', width: '100%' }}
              />
              <button type="submit" style={{ fontFamily: FONTS.body, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0F1419', background: COLORS.accentCyan, border: 'none', borderRadius: 8, padding: '11px 0', cursor: 'pointer', width: '100%' }}>
                Iniciar conversación →
              </button>
              <p style={{ margin: 0, fontFamily: FONTS.body, fontSize: 11, color: COLORS.textDim, textAlign: 'center', lineHeight: 1.4 }}>
                Solo para que Sergio pueda contactarte. Sin spam.
              </p>
            </form>
          )}

          {/* Messages — solo visibles tras el pre-chat form */}
          {started && <div ref={msgsRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 8px', display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 320 }}>
            {messages.map((msg, i) => (
              <div key={msg.id} style={{ animation: 'fchat-msg-in 0.3s cubic-bezier(0.16,1,0.3,1) both', animationDelay: `${i === 0 ? 0 : 0}ms` }}>
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
          </div>}

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

          {/* Botón enviar a Sergio — aparece tras 2 intercambios, auto-envía y cierra */}
          {started && exchanges >= 2 && !autoSent && (
            <div style={{ padding: '8px 14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <button
                onClick={() => { handleSendNow(); handleClose() }}
                style={{ width: '100%', fontFamily: FONTS.body, fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: COLORS.accentCyan, background: 'rgba(0,217,255,0.07)', border: '1px solid rgba(0,217,255,0.25)', borderRadius: 7, padding: '8px 0', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,217,255,0.13)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,217,255,0.07)'}
              >
                Enviar conversación a Sergio →
              </button>
            </div>
          )}
          {started && autoSent && (
            <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
              <p style={{ margin: 0, fontFamily: FONTS.body, fontSize: 12, color: '#10B981' }}>Enviado ✓ Sergio te contactará hoy.</p>
            </div>
          )}

          {/* Input — solo visible en conversación activa */}
          {started && <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '10px 12px', display: 'flex', gap: 8, flexShrink: 0 }}>
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
          </div>}
        </div>
      )}

      {/* ── Floating button ──────────────────────────────────────── */}
      <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9500 }}>
        {/* Anillo pulsante exterior — siempre visible cuando está cerrado */}
        {!open && (
          <>
            <span style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '1.5px solid rgba(0,217,255,0.4)', animation: 'fchat-ring 2.4s ease-out infinite' }} />
            <span style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '1px solid rgba(0,217,255,0.2)', animation: 'fchat-ring 2.4s ease-out 0.8s infinite' }} />
          </>
        )}
        <button
          onClick={handleOpen}
          aria-label={open ? 'Cerrar chat' : 'Abrir chat de ayuda'}
          style={{
            position: 'relative',
            width: 56, height: 56, borderRadius: '50%',
            background: open ? 'rgba(255,255,255,0.08)' : COLORS.accentCyan,
            border: open ? '1.5px solid rgba(255,255,255,0.15)' : 'none',
            color: open ? COLORS.textMuted : '#0F1419',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', outline: 'none',
            boxShadow: open ? 'none' : '0 4px 28px rgba(0,217,255,0.5)',
            transition: 'background 0.25s, box-shadow 0.25s, transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {open ? <CloseIcon /> : <ChatIcon />}
          {badge && !open && (
            <span style={{ position: 'absolute', top: 2, right: 2, width: 14, height: 14, borderRadius: '50%', background: '#EF4444', border: '2px solid #0F1419', animation: 'fchat-pulse 2s ease-in-out infinite' }} />
          )}
        </button>
      </div>

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
        @keyframes fchat-msg-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fchat-ring {
          0%   { transform: scale(1);    opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        input::placeholder { color: rgba(226,232,240,0.25); }
        input:focus { border-color: rgba(0,217,255,0.4) !important; }
      `}</style>
    </>
  )
}
