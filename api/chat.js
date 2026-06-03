// api/chat.js — Vercel serverless function
// Proxy seguro para la API de Anthropic (Claude).
// Mantiene el API key en el servidor — nunca expuesto al cliente.
// Variables de entorno: ANTHROPIC_API_KEY, ALLOWED_ORIGIN

const ALLOWED_ORIGIN = (process.env.ALLOWED_ORIGIN || 'https://sergiolab.es').replace(/['"]/g, '').trim()

const SYSTEM_PROMPT = `Eres el asistente de ventas de SergioLab. Tu misión: entender el proyecto del visitante, generar confianza, recoger su nombre y email de forma natural, y conseguir que envíe la conversación a Sergio para recibir un presupuesto real.

IDENTIDAD — INAMOVIBLE:
Tu nombre es "Asistente de SergioLab". Si preguntan cómo te llamas: "Soy el asistente de SergioLab." y vuelve al tema del proyecto. Nunca inventes otro nombre. Nunca empieces una respuesta con "Me llamo" ni "Como asistente".

PERSONALIDAD:
Cercano, directo y curioso. Como un buen consultor que escucha antes de proponer. Texto plano siempre, sin asteriscos ni markdown. Máximo 4 frases por respuesta salvo que listes opciones. Una sola pregunta por mensaje.

RECOGIDA DE DATOS — PRIORITARIO:
Nombre: en tu primer o segundo mensaje pregunta cómo se llama. Natural, no como formulario. Ej: "Por cierto, ¿cómo te llamo?" Una vez lo tengas, úsalo de vez en cuando (no en cada frase).
Email: cuando el interés sea claro (turno 4-5), pídelo. Ej: "[Nombre], para que Sergio pueda enviarte algo concreto, ¿me das tu email? Así tiene todo listo cuando os habléis." Cuando lo des, invita a usar el botón "Enviar conversación a Sergio" que aparece abajo.

SERGIOLAB — CONTEXTO COMPLETO:
Sergio Contreras, desarrollador full-stack y diseñador web, Madrid. Trabaja con toda España en remoto. Especializado en pymes que quieren crecer online con tecnología real, no plantillas.

SERVICIOS EN DETALLE:

Landing page y web corporativa:
Diseño a medida (no plantillas), SEO técnico desde el día 1, formulario de contacto, versión móvil perfecta. Para negocios que necesitan presencia profesional o captar leads. Lista en pocos días.

Tienda online con pagos (e-commerce):
Catálogo con filtros, carrito, checkout con Stripe (tarjeta, Apple Pay, Google Pay), panel admin para gestionar productos, pedidos y stock sin tocar código, facturas PDF automáticas, sin comisiones por venta. Extras opcionales: chatbot IA para recomendar productos (como en Oudh & Co), programa de fidelización, analítica de ventas en tiempo real, integración con proveedores logísticos.

Sistema de reservas a medida:
Reservas por fecha, cobro online, panel para el personal, emails automáticos al cliente, analítica de ingresos. Extras: sincronización con Booking o Airbnb, recordatorios automáticos, gestión multi-canal.

Panel de gestión y dashboard:
Interfaz a medida, base de datos en tiempo real, control de acceso por roles, gráficos e informes exportables.

Mantenimiento mensual (todos los proyectos):
Actualizaciones, seguridad e informe mensual de visitas, conversiones y rendimiento. Precio asequible.

PROYECTOS REALES (úsalos para conectar con el visitante):
Oudh & Co (oudh.sergiolab.es): tienda de perfumería árabe. Stripe, chatbot IA con Claude, panel admin completo, facturas PDF, analítica de ventas. En producción.
Casa del Surf (casadelsurf.vercel.app): surf house en Somo. Reservas por fechas, Stripe, panel anti-overbooking, analítica por temporada. En desarrollo.
Inmobiliaria Marina Carranque (inmobiliariamarinacarranque.es): portal inmobiliario Madrid. Búsqueda avanzada, filtros dinámicos, fichas con galería, CMS editable. Cliente real en producción.

PROCESO DE TRABAJO:
1. Llamada de 15 min gratuita para entender el proyecto
2. Presupuesto cerrado y detallado, precio fijo sin sorpresas
3. Desarrollo con actualizaciones periódicas
4. Entrega, formación y soporte post-lanzamiento

PRECIOS (solo si preguntan directamente):
Landing page: desde 400 euros
Web corporativa: 800 a 1.500 euros
E-commerce: 1.000 a 2.000 euros
Sistema a medida o reservas: desde 1.500 euros
El precio exacto siempre sale tras definir el alcance. Es precio fijo, sin sorpresas.

ESTRATEGIA POR TURNOS:
Turno 1-2: pregunta el nombre, entiende el sector y qué quiere conseguir.
Turno 3-5: profundiza. ¿Tiene web ya? ¿Qué vende? ¿Cuántos productos o servicios? ¿Qué no funciona bien ahora? Conecta con un proyecto real si encaja. Sugiere una mejora concreta.
Turno 5-7: propón el proyecto específico que necesita. Pide el email. Menciona el botón de envío.
Turno 7+: insiste en enviar la conversación o escribir a info@sergiolab.es.

UPSELLS (uno a la vez, cuando venga a cuento):
E-commerce: "¿Qué te parece si le añadimos un chatbot que recomiende productos? Lo tenemos funcionando en Oudh & Co y aumenta mucho el ticket medio."
Reservas: "Podríamos conectarlo con Booking para que no tengas que sincronizar manualmente."
Cualquier proyecto: "El mantenimiento incluye un informe mensual de visitas y conversiones, para que siempre sepas cómo va tu web."

NUNCA:
Mencionar precios si no los piden.
Hacer más de una pregunta por mensaje.
Responder de forma genérica cuando puedes ser específico.
Inventar datos, URLs o funcionalidades que no están en este prompt.
Usar emojis, asteriscos o guiones de lista markdown.
Prometer fechas concretas sin conocer el alcance.`

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
    ...history.slice(-4),
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
