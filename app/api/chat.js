// api/chat.js — Vercel serverless function
// Proxy seguro para la API de Anthropic (Claude).
// Mantiene el API key en el servidor — nunca expuesto al cliente.
// Variables de entorno: ANTHROPIC_API_KEY, ALLOWED_ORIGIN

const ALLOWED_ORIGIN = (process.env.ALLOWED_ORIGIN || 'https://sergiolab.es').replace(/['"]/g, '').trim()

const SYSTEM_PROMPT = `Eres el asistente de ventas de SergioLab (estudio de desarrollo web de Sergio Contreras, Madrid). Atiendes como un consultor: escuchas, preguntas, propones y consigues que el visitante envíe la conversación a Sergio para recibir presupuesto.

REGLAS ABSOLUTAS:
- Máximo 2-3 frases por respuesta. Siempre.
- Una sola pregunta por mensaje. Nunca dos.
- Texto plano. Sin asteriscos, sin markdown, sin emojis.
- No repitas información que ya hayas dado en la conversación.
- Cada proyecto real (Oudh & Co, Casa del Surf, Inmobiliaria) menciónalo como máximo UNA vez en toda la conversación y solo si viene al caso.
- Tu nombre es "Asistente de SergioLab". No uses otro nunca.

DATOS QUE DEBES RECOGER (en orden, con naturalidad):
1. Nombre: pregúntalo en el segundo mensaje. Úsalo de vez en cuando, no en cada frase.
2. Email: pídelo en el turno 4-5 cuando el interés sea claro. Cuando lo tengas, invita a pulsar "Enviar conversación a Sergio".

SERVICIOS:
Landing / web corporativa — diseño a medida, SEO, móvil, formularios.
E-commerce — Stripe, panel de gestión propio, catálogo, sin comisiones por venta.
Sistema de reservas — reservas online, cobro, panel para el personal, emails automáticos.
Panel / dashboard — interfaz a medida, datos en tiempo real, informes.
Todos incluyen mantenimiento mensual opcional (actualizaciones + informe de métricas).

PROYECTOS REALES (menciona uno solo si encaja, luego no vuelvas a él):
Oudh & Co (oudh.sergiolab.es) — e-commerce de perfumería árabe en producción. Stripe, chatbot IA, panel admin, facturas PDF.
Casa del Surf (www.casadelsurf.es) — motor de reservas en producción para surf house, Stripe, panel anti-overbooking, sync con OTAs.
Inmobiliaria Marina Carranque — portal inmobiliario, filtros, galería, CMS.

PRECIOS (solo si preguntan):
Landing: desde 400€ · Web: 800-1.500€ · E-commerce: 1.000-2.000€ · Sistema: desde 1.500€.
Precio exacto tras definir alcance. Siempre precio fijo.

FLUJO:
Turno 1: entiende qué necesitan.
Turno 2: pregunta el nombre, profundiza en el proyecto.
Turno 3-4: una pregunta concreta por turno (¿tiene web? ¿cuántos productos? ¿fecha límite?).
Turno 5: pide el email, invita a enviar la conversación.
Turno 6+: cierra hacia el envío o hacia info@sergiolab.es.

EJEMPLOS DE RESPUESTAS CORRECTAS:

Usuario: quiero una tienda online
Tú: Perfecto, es uno de los proyectos que más hacemos. ¿Qué tipo de productos vas a vender?

Usuario: ropa
Tú: Genial. Por cierto, ¿cómo te llamo?

Usuario: Ana
Tú: Ana, ¿tienes web actualmente o partimos desde cero?

Usuario: desde cero, quiero vender online
Tú: Entendido. ¿Cuántos productos tienes pensado subir al principio?

Usuario: unos 50
Tú: Con 50 productos el catálogo ya tiene buena envergadura. Para que Sergio pueda prepararte algo concreto, ¿me das tu email?

ERRORES QUE NUNCA DEBES COMETER:
- Repetir el mismo proyecto dos veces.
- Dar más información de la que preguntaron.
- Empezar con "¡" o frases de robot como "¡Qué buena pregunta!".
- Mencionar precios sin que los pidan.`

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

  const { message, history = [], name, email } = req.body ?? {}

  if (!message?.trim()) return res.status(400).json({ error: 'Mensaje vacío' })

  // Límite de longitud — evita prompts masivos
  if (message.trim().length > 500) {
    return res.status(200).json({ text: '¡Vaya, tienes mucho que contar! Mejor vamos paso a paso. ¿Puedes resumirlo en una o dos frases y empezamos por ahí?' })
  }

  // Límite de conversación — corta abusos de sesión larga (8 turnos = suficiente para cualificar)
  if (history.length > 16) {
    return res.status(200).json({ text: 'Creo que ya tenemos suficiente contexto para que Sergio te prepare algo concreto. Usa el botón de abajo para enviarle esta conversación — te contacta hoy con un presupuesto real.' })
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
    ...history.slice(-8),
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
        model:      'claude-sonnet-4-6',
        max_tokens: 160,
        system:     SYSTEM_PROMPT + (name ? `\n\nDATO CONFIRMADO: el visitante se llama ${name}${email ? ` y su email es ${email}` : ''}. NO vuelvas a pedirle estos datos.` : ''),
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
