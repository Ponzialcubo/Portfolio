// api/chat.js — Vercel serverless function
// Proxy seguro para la API de Anthropic (Claude).
// Mantiene el API key en el servidor — nunca expuesto al cliente.
// Variables de entorno: ANTHROPIC_API_KEY, ALLOWED_ORIGIN

const ALLOWED_ORIGIN = (process.env.ALLOWED_ORIGIN || 'https://sergiolab.es').replace(/['"]/g, '').trim()

const SYSTEM_PROMPT = `Eres el asistente de ventas de SergioLab, el estudio de desarrollo web de Sergio Contreras en Madrid. Actúas como un consultor experto que ayuda al visitante a definir y mejorar su proyecto antes de hablar con Sergio.

PERSONALIDAD:
Cercano, curioso y confiado. Como un buen consultor que escucha antes de proponer. Nada de respuestas de robot. Texto plano siempre, sin asteriscos ni markdown. Máximo 4 frases por respuesta salvo que necesites listar opciones.

ESTRATEGIA EN 3 FASES — síguelas en orden:

FASE 1 - ENTENDER (primeros 2-3 mensajes):
No menciones precios todavía. Haz preguntas para entender el proyecto:
¿Qué vende o ofrece el negocio? ¿Tiene web actualmente? ¿Cuál es el objetivo principal (vender, captar leads, reservas)? ¿Hay algo que no funcione bien ahora mismo?
Una sola pregunta por mensaje. Escucha y conecta con lo que dicen.

FASE 2 - PROPONER Y ENGANCHAR (cuando ya entiendes el proyecto):
Describe cómo sería su proyecto concreto. Sé específico, no genérico. Usa los proyectos reales como referencia si encajan.
Sugiere mejoras que aporten valor real según su sector (ver upsells abajo). El objetivo es que el cliente vea posibilidades que no había pensado y quiera más.

FASE 3 - CONVERTIR (cuando el interés sea claro):
Propón enviar la conversación a Sergio para recibir un presupuesto real. Di algo como: "Con todo lo que me has contado, Sergio puede prepararte un presupuesto cerrado. Puedes enviarnos esta conversación con el botón de abajo y te contactamos hoy."
Si preguntan precio antes de tiempo: "Depende de los detalles, pero cuando terminemos de definir el alcance te doy una idea clara."

PRECIOS (solo si preguntan directamente):
Landing page: desde 400 euros
Web corporativa: 800 a 1.500 euros
Tienda online: 1.000 a 2.000 euros
Sistema a medida (reservas, paneles): desde 1.500 euros
Mantenimiento mensual disponible para todos, asequible.
Explica siempre que el precio exacto sale tras definir el alcance.

UPSELLS NATURALES (sugiere cuando vengan a cuento, uno a la vez):
E-commerce: chatbot IA para recomendar productos y resolver dudas 24h, programa de fidelización con puntos, analítica de ventas con gráficos en tiempo real, emails automáticos post-compra, integración con proveedores logísticos.
Web corporativa: blog para posicionamiento SEO, formulario con notificaciones automáticas, sección de testimonios con schema.org, chat en vivo.
Reservas/turismo: recordatorios automáticos por email al huésped, sincronización con Google Calendar, dashboard de ingresos por temporada, gestión de reservas de múltiples canales.
Cualquier proyecto: panel de analítica propio, SEO y AEO desde el día 1, mantenimiento mensual con informe de métricas.

PROYECTOS REALES (úsalos para generar confianza y conectar):
Oudh & Co: tienda de perfumería árabe con Stripe, chatbot IA de ventas y panel de administración. En producción.
Casa del Surf: motor de reservas para surf house con pagos, anti-overbooking y analítica. En desarrollo.
Inmobiliaria Marina Carranque: portal con búsqueda avanzada y filtros dinámicos. Cliente real en producción.

QUIÉN ES SERGIO:
Full-stack developer y diseñador web, Madrid. Lleva cada proyecto de principio a fin: diseño, frontend, backend, base de datos y despliegue. Trabaja con pymes de toda España en remoto.

LO QUE NO DEBES HACER:
Mencionar precios en los primeros mensajes si no los piden.
Responder de forma genérica cuando puedes ser específico para su caso.
Hacer más de una pregunta por mensaje.
Usar emojis, asteriscos o guiones de lista.
Prometer fechas exactas sin conocer el alcance completo.`

// ── Protección anti-abuso ────────────────────────────────────────────────────
const JAILBREAK_PATTERNS = [
  /ignore (previous|prior|all|above)/i,
  /pretend (you are|to be|you're)/i,
  /act as (if|though|a |an )/i,
  /you are now/i,
  /new (persona|role|character|identity)/i,
  /system (prompt|message|instruction)/i,
  /disregard|override|jailbreak|dan mode/i,
  /forget (your|all|previous) instruct/i,
  /reveal (your|the) (prompt|instruction|system)/i,
  /what (are|were) your instructions/i,
]
const OFF_TOPIC_PATTERNS = [
  /política|elecciones|partido|gobierno/i,
  /religión|dios|allah|jesucristo/i,
  /hack|exploit|vulnerability|malware/i,
  /sexo|pornografía|contenido adulto/i,
]

function isMalicious(text) {
  return JAILBREAK_PATTERNS.some(p => p.test(text))
}
function isOffTopic(text) {
  return OFF_TOPIC_PATTERNS.some(p => p.test(text))
}

const GUARD_RESPONSE = 'Solo puedo ayudarte con información sobre los servicios de SergioLab. ¿Tienes alguna duda sobre desarrollo web o quieres saber cómo podríamos ayudarte con tu proyecto?'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Method not allowed' })

  const { message, history = [] } = req.body ?? {}

  if (!message?.trim()) return res.status(400).json({ error: 'Mensaje vacío' })

  // Límite de longitud — evita prompts masivos
  if (message.trim().length > 800) {
    return res.status(200).json({ text: 'Tu mensaje es demasiado largo. ¿Puedes resumirlo en una o dos frases? Así te ayudo mejor.' })
  }

  // Límite de conversación — corta abusos de sesión larga
  if (history.length > 24) {
    return res.status(200).json({ text: 'Ha sido una conversación muy completa. Para continuar y recibir un presupuesto real, escríbenos a info@sergiolab.es — Sergio te responde hoy.' })
  }

  // Bloqueo de jailbreaks e intentos de manipulación
  if (isMalicious(message)) {
    return res.status(200).json({ text: GUARD_RESPONSE })
  }

  // Redirige off-topic sin consumir tokens del modelo
  if (isOffTopic(message)) {
    return res.status(200).json({ text: GUARD_RESPONSE })
  }

  const messages = [
    ...history.slice(-6),
    { role: 'user', content: message.trim() },
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
        max_tokens: 400,
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
