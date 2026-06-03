# 09 · Claude API Chatbot — Cloudflare Worker Proxy

El chatbot del sitio está preparado para conectarse a la API de Claude. Como el sitio
es **estático en Hostinger** (sin servidor propio), la API key no puede ir en el
bundle del cliente. La solución es un **Cloudflare Worker** como proxy
(plan gratuito: 100.000 req/día, más que suficiente).

---

## Cómo activarlo

### 1. Crear el Worker en Cloudflare

1. Entra en [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create Application** → **Create Worker**.
2. Pega el código de abajo.
3. En **Settings → Variables → Add variable**: añade `ANTHROPIC_API_KEY = sk-ant-...` como **Secret** (no como texto plano).
4. Despliega. La URL será algo como `https://sergiolab-chat.tuuser.workers.dev`.

### 2. Configurar CORS en el Worker

El Worker ya incluye los headers CORS necesarios para que `sergiolab.es` pueda llamarlo.
Cambia `https://sergiolab.es` por tu dominio real si es distinto.

### 3. Añadir la URL al portfolio

En la raíz del portfolio crea (o edita) `.env.local`:
```
VITE_CHAT_ENDPOINT=https://sergiolab-chat.tuuser.workers.dev/chat
```

Luego haz `npm run build` y sube el `dist/` a Hostinger. El chatbot usará Claude
automáticamente. Sin la variable, sigue funcionando con keyword-matching como fallback.

---

## Código del Worker

```js
// worker.js — pegar en el editor de Cloudflare Workers
export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': 'https://sergiolab.es',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    let body
    try { body = await request.json() } catch {
      return new Response('Bad request', { status: 400 })
    }

    const { message, history = [] } = body

    // System prompt: conciso para minimizar tokens
    const systemPrompt = `Eres el asistente de SergioLab, una empresa de desarrollo web freelance con base en Madrid. Responde en español, de forma breve y directa (máximo 3 frases). Solo responde preguntas sobre servicios web, procesos de trabajo, tecnologías usadas, plazos o precios orientativos. Si la pregunta es muy específica o requiere un presupuesto, di que la mejor opción es contactar directamente por email: info@sergiolab.es`

    // Construir historial (máx. 6 mensajes para mantener tokens bajos)
    const recentHistory = history.slice(-6).map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content,
    }))

    const messages = [...recentHistory, { role: 'user', content: message }]

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001', // modelo más económico
        max_tokens: 200,                     // respuestas cortas
        system: systemPrompt,
        messages,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      return new Response(JSON.stringify({ error: err }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const data = await response.json()
    const text = data.content?.[0]?.text ?? ''

    return new Response(JSON.stringify({ text }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://sergiolab.es',
      },
    })
  },
}
```

---

## Consumo estimado de tokens

| Escenario | Tokens por mensaje | Coste (Claude Haiku) |
|---|---|---|
| Sistema | ~80 tokens (fijo) | $0.00008 |
| Historial (6 msg) | ~150 tokens | $0.00015 |
| Respuesta | ≤200 tokens | $0.00020 |
| **Total por intercambio** | **~430 tokens** | **~$0.00043** |

Con 1.000 conversaciones al mes → **~$0.43/mes**. Prácticamente gratis.

---

## Variables de entorno

| Variable | Dónde | Valor |
|---|---|---|
| `ANTHROPIC_API_KEY` | Cloudflare Worker Secret | `sk-ant-api03-...` |
| `VITE_CHAT_ENDPOINT` | `.env.local` del portfolio | URL del Worker |

El `.env.local` ya está en `.gitignore`. No lo subas nunca a GitHub.
