// api/contact.js — Vercel serverless function
// Recibe el formulario de contacto del portfolio y envía un email via Resend.
// Variable de entorno necesaria: RESEND_API_KEY

const ALLOWED_ORIGIN = (process.env.ALLOWED_ORIGIN || 'https://sergiolab.es').replace(/['"]/g, '').trim()
const TO_EMAIL       = process.env.CONTACT_EMAIL   || 'info@sergiolab.es'
const FROM_EMAIL     = 'SergioLab Portfolio <noreply@sergiolab.es>'

const PROJECT_LABELS = {
  landing:   'Landing page / Web corporativa',
  ecommerce: 'Tienda online / E-commerce',
  reservas:  'Sistema de reservas',
  dashboard: 'Panel / Dashboard / Analytics',
  otro:      'Otro — cuéntame',
}

const BUDGET_LABELS = {
  '<800':   'Hasta 800 € — Landing sencilla',
  '800-2k': '800 – 2.000 € — Web corporativa',
  '2-5k':   '2.000 – 5.000 € — E-commerce / Sistema',
  '>5k':    'Más de 5.000 € — Proyecto complejo',
  nse:      'No lo sé aún',
}

function buildHtml({ name, email, projectType, budget, message }) {
  const projectLabel = PROJECT_LABELS[projectType] || projectType || '—'
  const budgetLabel  = BUDGET_LABELS[budget]       || budget       || '—'
  const now = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid', dateStyle: 'long', timeStyle: 'short' })

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0F1419;font-family:'Inter',system-ui,sans-serif;color:#E2E8F0">
  <div style="max-width:580px;margin:0 auto;padding:32px 24px">

    <!-- Header -->
    <div style="border-bottom:1px solid rgba(0,217,255,0.15);padding-bottom:20px;margin-bottom:28px">
      <p style="margin:0;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#00D9FF">SERGIOLAB · PORTFOLIO</p>
      <h1 style="margin:8px 0 4px;font-size:22px;font-weight:800;color:#fff">Nuevo contacto</h1>
      <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35)">${now}</p>
    </div>

    <!-- Info del contacto -->
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;overflow:hidden;margin-bottom:24px">
      ${row('Nombre',    name)}
      ${row('Email',     `<a href="mailto:${email}" style="color:#00D9FF;text-decoration:none">${email}</a>`)}
      ${row('Proyecto',  projectLabel)}
      ${row('Presupuesto', budgetLabel)}
    </div>

    <!-- Mensaje -->
    <div style="margin-bottom:28px">
      <p style="margin:0 0 10px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,0.3)">Mensaje</p>
      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:18px 20px">
        <p style="margin:0;font-size:14px;color:#E2E8F0;line-height:1.7;white-space:pre-wrap">${escHtml(message)}</p>
      </div>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:32px">
      <a href="mailto:${email}?subject=Re: Tu consulta en SergioLab"
         style="display:inline-block;background:#00D9FF;color:#0F1419;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;padding:13px 28px;border-radius:8px">
        RESPONDER A ${escHtml(name.split(' ')[0].toUpperCase())} →
      </a>
    </div>

    <!-- Footer -->
    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);text-align:center;border-top:1px solid rgba(255,255,255,0.05);padding-top:20px">
      Este email fue generado automáticamente por el formulario de contacto de
      <a href="https://sergiolab.es" style="color:rgba(0,217,255,0.5);text-decoration:none">sergiolab.es</a>
    </p>
  </div>
</body>
</html>`
}

function row(label, value) {
  return `<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 18px;border-bottom:1px solid rgba(255,255,255,0.05)">
    <span style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,0.3);white-space:nowrap">${label}</span>
    <span style="font-size:14px;color:#E2E8F0;text-align:right">${value}</span>
  </div>`
}

function escHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function buildAutoReply(name) {
  const firstName = escHtml(name.split(' ')[0])
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Mensaje recibido — SergioLab</title></head>
<body style="margin:0;padding:0;background:#080D12;font-family:'Inter',system-ui,-apple-system,sans-serif;color:#E2E8F0">

  <!-- Wrapper -->
  <div style="max-width:560px;margin:0 auto;padding:0 0 40px">

    <!-- Header con barra de color -->
    <div style="background:linear-gradient(135deg,#0F1419 0%,#0a1520 100%);border-bottom:2px solid #00D9FF;padding:32px 36px 28px">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <p style="margin:0;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#00D9FF;font-weight:600">SERGIOLAB</p>
            <p style="margin:2px 0 0;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,0.25)">Desarrollo Web · Madrid</p>
          </td>
          <td align="right">
            <div style="width:38px;height:38px;background:rgba(0,217,255,0.1);border:1.5px solid rgba(0,217,255,0.3);border-radius:10px;display:inline-flex;align-items:center;justify-content:center">
              <span style="font-size:18px;line-height:1">💻</span>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Cuerpo -->
    <div style="background:#0F1419;padding:36px 36px 32px">

      <h1 style="margin:0 0 8px;font-size:28px;font-weight:800;color:#fff;letter-spacing:-.02em;line-height:1.2">
        Recibido, ${firstName}.
      </h1>
      <p style="margin:0 0 28px;font-size:13px;color:rgba(0,217,255,0.7);letter-spacing:.06em;text-transform:uppercase;font-weight:600">
        Tu mensaje está en mis manos
      </p>

      <p style="margin:0 0 18px;font-size:15px;color:#CBD5E1;line-height:1.75">
        Gracias por contactar. He recibido todos los detalles de tu proyecto
        y te respondo personalmente hoy mismo.
      </p>

      <p style="margin:0 0 32px;font-size:15px;color:#CBD5E1;line-height:1.75">
        Si quieres añadir algo más antes de que hablemos, responde directamente
        a este email — llega directo a mí.
      </p>

      <!-- Qué pasa ahora -->
      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:22px 24px;margin-bottom:32px">
        <p style="margin:0 0 16px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,0.3);font-weight:600">Qué pasa ahora</p>
        ${[
          ['01', 'Reviso tu proyecto', 'Leo los detalles que me has enviado y analizo el mejor enfoque.'],
          ['02', 'Te escribo hoy', 'Te respondo con preguntas concretas o directamente con una propuesta.'],
          ['03', 'Presupuesto cerrado', 'Sin sorpresas. Todo claro antes de empezar.'],
        ].map(([n, title, desc]) => `
        <div style="display:flex;gap:14px;align-items:flex-start;margin-bottom:14px">
          <span style="flex-shrink:0;width:26px;height:26px;background:rgba(0,217,255,0.1);border:1px solid rgba(0,217,255,0.25);border-radius:6px;font-size:10px;font-weight:700;color:#00D9FF;display:flex;align-items:center;justify-content:center;letter-spacing:.04em">${n}</span>
          <div>
            <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#fff">${title}</p>
            <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.4);line-height:1.5">${desc}</p>
          </div>
        </div>`).join('')}
      </div>

      <!-- CTA -->
      <div style="text-align:center">
        <a href="https://sergiolab.es/portfolio"
           style="display:inline-block;background:#00D9FF;color:#0a0f14;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:8px;margin-bottom:12px">
          VER PROYECTOS REALES →
        </a>
        <p style="margin:12px 0 0;font-size:12px;color:rgba(255,255,255,0.25)">Mientras tanto, echa un vistazo a lo que hemos construido</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#080D12;padding:20px 36px;border-top:1px solid rgba(255,255,255,0.05)">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <p style="margin:0;font-size:13px;font-weight:700;color:#fff">Sergio Contreras</p>
            <p style="margin:3px 0 0;font-size:11px;color:rgba(255,255,255,0.3)">Full-Stack Developer &amp; Web Designer</p>
          </td>
          <td align="right" style="vertical-align:middle">
            <a href="https://sergiolab.es" style="font-size:11px;color:#00D9FF;text-decoration:none;letter-spacing:.06em">sergiolab.es</a>
          </td>
        </tr>
      </table>
      <p style="margin:16px 0 0;font-size:10px;color:rgba(255,255,255,0.15);line-height:1.5">
        Recibiste este email porque usaste el formulario de contacto de sergiolab.es.
        No es spam — te respondo en persona.
      </p>
    </div>

  </div>
</body>
</html>`
}

// ── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, projectType, budget, message, _honeypot } = req.body ?? {}

  // Anti-spam honeypot
  if (_honeypot) return res.status(200).json({ ok: true })

  // Validación básica (la validación completa ya se hace en el cliente)
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Faltan campos requeridos' })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:     FROM_EMAIL,
        to:       [TO_EMAIL],
        reply_to: email,
        subject:  `[Portfolio] Nuevo contacto de ${name}`,
        html:     buildHtml({ name, email, projectType, budget, message }),
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      console.error('Resend error:', err)
      return res.status(500).json({ error: 'Error al enviar el mensaje' })
    }

    // Auto-reply al contacto
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:    'Sergio · SergioLab <info@sergiolab.es>',
        to:      [email],
        subject: `Recibido ✓ — Te respondo hoy, ${name.split(' ')[0]}`,
        html:    buildAutoReply(name),
      }),
    }).catch(err => console.error('Auto-reply error:', err))

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact handler error:', err)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}
