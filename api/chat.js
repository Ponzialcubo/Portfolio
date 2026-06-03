// api/chat.js — Vercel serverless function
// Proxy seguro para la API de Anthropic (Claude).
// Mantiene el API key en el servidor — nunca expuesto al cliente.
// Variables de entorno: ANTHROPIC_API_KEY, ALLOWED_ORIGIN

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://sergiolab.es'

const SYSTEM_PROMPT = `Eres el asistente de SergioLab, el negocio de desarrollo web de Sergio Contreras en Madrid.
Tu único objetivo: que el visitante acabe contactando con Sergio en info@sergiolab.es.

ESTILO: cercano y directo, como si fuera Sergio respondiendo en persona. Sin formalismos. Texto plano siempre, sin asteriscos.
LONGITUD: responde completo pero conciso. NUNCA cortes una frase a mitad. Si listas precios, dálos todos en esa misma respuesta.

PRECIOS ORIENTATIVOS (menciona siempre que hay mantenimiento mensual opcional):
Landing page sencilla: desde 400 euros
Web corporativa: entre 800 y 1.500 euros
Tienda online: entre 1.000 y 2.000 euros según complejidad
Sistema de reservas o panel a medida: desde 1.500 euros
El mantenimiento mensual se pacta aparte, es asequible y vale mucho la pena.

Cuando des precios, ponlos en líneas separadas para que se lean bien.
Si preguntan precio exacto: explica que depende del proyecto y que lo mejor es hablarlo.
Si ves que no avanzan o preguntan algo que no tiene que ver: diles que escriban a info@sergiolab.es y que Sergio responde hoy.`

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Method not allowed' })

  const { message, history = [] } = req.body ?? {}

  if (!message?.trim()) {
    return res.status(400).json({ error: 'Mensaje vacío' })
  }

  const messages = [
    ...history.slice(-4),
    { role: 'user', content: message },
  ]

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key':         process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type':      'application/json',
      },
      body: JSON.stringify({
        model:      'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system:     SYSTEM_PROMPT,
        messages,
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      console.error('Anthropic error:', err)
      return res.status(502).json({ error: 'API error' })
    }

    const data = await response.json()
    const raw  = data.content?.[0]?.text ?? ''
    const text = raw.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')

    return res.status(200).json({ text })
  } catch (err) {
    console.error('Chat handler error:', err)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}
