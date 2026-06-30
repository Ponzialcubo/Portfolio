// api/send-conversation.js — Vercel serverless function
// Recibe el transcript del chat y lo envía a Sergio por email via Resend.

const ALLOWED_ORIGIN = (process.env.ALLOWED_ORIGIN || 'https://sergiolab.es').replace(/['"]/g, '').trim()
const TO_EMAIL       = process.env.CONTACT_EMAIL || 'info@sergiolab.es'

function escHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function buildTranscriptHtml({ name, email, messages }) {
  const now = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid', dateStyle: 'long', timeStyle: 'short' })

  const messagesHtml = messages
    .filter(m => m.from !== 'bot' || m.id !== 0)
    .map(m => {
      const isUser = m.from === 'user'
      return `
      <div style="margin-bottom:16px">
        <p style="margin:0 0 4px;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:${isUser ? '#00D9FF' : 'rgba(255,255,255,0.3)'}">
          ${isUser ? escHtml(name || 'Cliente') : 'Asistente SergioLab'}
        </p>
        <div style="background:${isUser ? 'rgba(0,217,255,0.08)' : 'rgba(255,255,255,0.04)'};border:1px solid ${isUser ? 'rgba(0,217,255,0.2)' : 'rgba(255,255,255,0.07)'};border-radius:${isUser ? '12px 12px 4px 12px' : '12px 12px 12px 4px'};padding:12px 16px">
          <p style="margin:0;font-size:14px;color:#E2E8F0;line-height:1.65;white-space:pre-wrap">${escHtml(m.text)}</p>
        </div>
      </div>`
    }).join('')

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0F1419;font-family:'Inter',system-ui,sans-serif;color:#E2E8F0">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px">

    <div style="border-bottom:1px solid rgba(0,217,255,0.15);padding-bottom:20px;margin-bottom:28px">
      <p style="margin:0 0 6px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#00D9FF">SERGIOLAB · CHAT TRANSCRIPT</p>
      <h1 style="margin:0 0 4px;font-size:20px;font-weight:800;color:#fff">Conversación de ${escHtml(name || 'un visitante')}</h1>
      <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35)">${now}</p>
    </div>

    ${email ? `
    <div style="background:rgba(0,217,255,0.06);border:1px solid rgba(0,217,255,0.2);border-radius:10px;padding:14px 18px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center">
      <div>
        <p style="margin:0 0 2px;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,0.3)">Contacto</p>
        <p style="margin:0;font-size:14px;color:#E2E8F0">${escHtml(name)} · <a href="mailto:${escHtml(email)}" style="color:#00D9FF;text-decoration:none">${escHtml(email)}</a></p>
      </div>
      <a href="mailto:${escHtml(email)}?subject=Re: Tu proyecto web — SergioLab"
         style="display:inline-block;background:#00D9FF;color:#0F1419;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:9px 16px;border-radius:6px;white-space:nowrap">
        RESPONDER →
      </a>
    </div>` : ''}

    <div style="margin-bottom:8px">
      <p style="margin:0 0 16px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,0.25)">Conversación completa</p>
      ${messagesHtml}
    </div>

    <p style="margin:32px 0 0;font-size:11px;color:rgba(255,255,255,0.2);text-align:center;border-top:1px solid rgba(255,255,255,0.05);padding-top:20px">
      Transcript generado por el chat de <a href="https://sergiolab.es" style="color:rgba(0,217,255,0.5);text-decoration:none">sergiolab.es</a>
    </p>
  </div>
</body>
</html>`
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, messages } = req.body ?? {}

  if (!messages?.length) {
    return res.status(400).json({ error: 'Sin conversación que enviar' })
  }

  const displayName = name?.trim() || 'Visitante'

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:     'SergioLab Chat <noreply@sergiolab.es>',
        to:       [TO_EMAIL],
        reply_to: email || undefined,
        subject:  `[Chat] Conversación de ${displayName}${email ? ` · ${email}` : ''}`,
        html:     buildTranscriptHtml({ name: displayName, email, messages }),
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      console.error('Resend error:', err)
      return res.status(500).json({ error: 'Error al enviar el transcript' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Send-conversation error:', err)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}
