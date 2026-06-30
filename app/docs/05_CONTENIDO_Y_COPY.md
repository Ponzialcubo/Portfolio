# 05 · Contenido y Copy — dónde se edita cada cosa

Mapa rápido: *"quiero cambiar X" → edita este archivo*.

| Quiero cambiar… | Archivo |
|------------------|---------|
| Título, descripción, tecnologías o link de un **proyecto** | `src/data/projects.js` |
| Los **servicios** que ofrezco (3 tarjetas) | `src/data/services.js` |
| Los enlaces del **menú** (desktop y móvil) | `src/data/navigation.js` |
| Los 6 motivos del **"Sobre mí / Por qué elegirme"** | `src/data/whyMe.js` |
| **Formación** académica y diferenciales (Sobre mí) | `src/data/credentials.js` |
| Los 4 pasos del **proceso** | `src/data/howItWorks.js` |
| Las **preguntas frecuentes (FAQ)** | `src/data/faq.js` + JSON-LD de `index.html` |
| Los **testimonios** | `src/data/testimonials.js` |
| El **stack tecnológico** (grid por categorías) | `src/data/stack.js` |
| Titular, subtítulo y tagline del **Hero** | `src/components/sections/Hero.jsx` |
| El mini-stack del Hero | `src/components/sections/TechStack.jsx` |
| Email, ubicación, redes del **footer/contacto** | `Footer.jsx` y `Contact/Contact.jsx` |
| Metadatos, título de pestaña, **SEO**, schema | `index.html` |

## Reglas de copy
- **Tono:** profesional, directo, orientado a negocio. Hablar de resultados
  ("vende", "genera clientes", "sin comisiones"), no solo de tecnología.
- **Persona:** primera persona ("desarrollo", "te entrego", "trabajo en remoto").
- **Sin precios** en la web. CTA siempre hacia `#contacto` / llamada.
- **Español** correcto con tildes. Evitar anglicismos innecesarios (pero "deploy",
  "e-commerce", "full-stack" son aceptados como términos de marca).

## Estructura de un proyecto (`projects.js`)
```js
{
  id, category, title, description,
  highlights: ['…','…','…','…'],   // 4 capacidades clave (checkmarks en la tarjeta)
  tech: ['Next.js 14','Stripe','…'],
  accent: '#00D9FF',
  buttonText: 'Ver demo en vivo',
  href: 'https://…',               // '#' = no externo
  badge: 'DEMO EN VIVO',           // o null
  bg: 'radial-gradient(…)',        // fondo decorativo de la mockup
}
```

## Estructura de una FAQ (`faq.js`)
```js
{ id, question: '¿…?', answer: 'Respuesta directa y autocontenida.' }
```
> ⚠️ Al editar una FAQ, replica el cambio en el bloque `FAQPage` de `index.html`
> para que el rich result de Google y los buscadores con IA queden sincronizados.

## Estructura de un testimonio (`testimonials.js`)
```js
{ id, quote, author, role, company, accent, isPlaceholder: true }
```
> Mientras exista algún `isPlaceholder: true`, la sección muestra el aviso
> "Testimonios de ejemplo". Cuando todos sean reales, quita el flag y añade el
> bloque `Review`/`AggregateRating` al schema (ver `06_SEO_AEO.md`).

## Pendiente de rellenar con datos reales
- **Stack** (`stack.js`): ampliar con todas las tecnologías del CV de Sergio.
- **Testimonios**: 2-4 reseñas reales (nombre + negocio + cargo).
- **Credenciales** (`credentials.js`): verificar contra el CV.
