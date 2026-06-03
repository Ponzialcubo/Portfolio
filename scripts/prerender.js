// ── Prerender SEO ───────────────────────────────────────────────────────────
// La web es una SPA de React: el HTML que se sirve solo tiene <div id="root">.
// Los crawlers (Seobility, etc.) que no ejecutan todo el JS ven una página vacía
// → sin H1, sin texto, sin enlaces internos. Este script, tras `vite build`,
// inyecta una versión ESTÁTICA y semántica del contenido (generada desde los
// mismos datos de src/data/*) dentro de #root en dist/index.html.
//
// En el navegador, React (createRoot().render()) limpia #root y monta la app
// real — mismo contenido, sin cloaking. Con JS desactivado o para un crawler,
// queda una página completa, legible y rastreable.
//
// IMPORTANTE: el copy del hero está hardcodeado aquí; si cambias Hero.jsx,
// actualiza también los textos de `hero` más abajo.

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import { projects } from '../src/data/projects.js'
import { services } from '../src/data/services.js'
import { whyMeItems } from '../src/data/whyMe.js'
import { credentials } from '../src/data/credentials.js'
import { steps } from '../src/data/howItWorks.js'
import { stackGroups } from '../src/data/stack.js'
import { testimonials } from '../src/data/testimonials.js'
import { faqs } from '../src/data/faq.js'
import { navLinks } from '../src/data/navigation.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST_HTML = resolve(__dirname, '../dist/index.html')

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const hero = {
  tagline: 'Full-Stack Developer & Web Designer',
  h1: 'De la idea al deploy',
  subtitle:
    'Diseño y desarrollo web a medida: e-commerce con pagos, sistemas de reserva y paneles de gestión. Madrid · toda España.',
}

// ── Bloques ─────────────────────────────────────────────────────────────────
const navHtml = `
  <nav aria-label="Navegación principal">
    ${navLinks.map(l => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join('')}
  </nav>`

const heroHtml = `
  <section id="hero">
    <p class="eyebrow">${esc(hero.tagline)}</p>
    <h1>${esc(hero.h1)}</h1>
    <p class="lead">${esc(hero.subtitle)}</p>
    <p><a href="#contacto">Contactar</a> · <a href="#portfolio">Ver proyectos</a></p>
  </section>`

const portfolioHtml = `
  <section id="portfolio">
    <h2>Portfolio</h2>
    <p>Tres sistemas completos: e-commerce con IA, motor de reservas e inmobiliaria. Proyectos reales, no plantillas.</p>
    ${projects
      .map(
        p => `
    <article>
      <h3>${esc(p.title)}</h3>
      <p class="cat">${esc(p.category)}</p>
      <p>${esc(p.description)}</p>
      <ul>${(p.highlights || []).map(h => `<li>${esc(h)}</li>`).join('')}</ul>
      <p class="tech">Tecnologías: ${(p.tech || []).map(esc).join(' · ')}</p>
      <p><a href="${esc(p.href)}"${p.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${esc(p.buttonText)}</a></p>
    </article>`
      )
      .join('')}
  </section>`

const servicesHtml = `
  <section id="servicios">
    <h2>Servicios</h2>
    <p>Diseño y desarrollo web a medida para negocios. Incluye SEO y AEO desde el primer día.</p>
    ${services
      .map(
        s => `
    <article>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.description)}</p>
      <ul>${(s.features || []).map(f => `<li>${esc(f)}</li>`).join('')}</ul>
    </article>`
      )
      .join('')}
  </section>`

const aboutHtml = `
  <section id="sobre-mi">
    <h2>Sobre mí</h2>
    <p>Sergio Contreras — desarrollador full-stack y diseñador web. Llevo cada proyecto de principio a fin: frontend, backend, base de datos y despliegue, cuidando el rendimiento, el SEO/AEO y la conversión.</p>
    <h3>Formación</h3>
    <ul>${credentials.education.map(c => `<li>${esc(c.title)} — ${esc(c.issuer)}</li>`).join('')}</ul>
    <h3>Por qué elegirme</h3>
    <ul>${whyMeItems.map(w => `<li><strong>${esc(w.title)}:</strong> ${esc(w.description)}</li>`).join('')}</ul>
  </section>`

const stackHtml = `
  <section id="stack">
    <h2>Stack tecnológico</h2>
    ${stackGroups
      .map(g => `<h3>${esc(g.label)}</h3><p>${g.items.map(esc).join(' · ')}</p>`)
      .join('')}
  </section>`

const processHtml = `
  <section id="proceso">
    <h2>El proceso</h2>
    ${steps
      .map(s => `<h3>${esc(s.number)}. ${esc(s.title)}</h3><p>${esc(s.subtitle)} — ${esc(s.description)}</p>`)
      .join('')}
  </section>`

const testimonialsHtml = `
  <section id="testimonios">
    <h2>Testimonios</h2>
    ${testimonials
      .map(
        t => `<blockquote><p>${esc(t.quote)}</p><footer>${esc(t.author)}, ${esc(t.role)} · ${esc(t.company)}</footer></blockquote>`
      )
      .join('')}
  </section>`

const faqHtml = `
  <section id="faq">
    <h2>Preguntas frecuentes</h2>
    ${faqs.map(f => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join('')}
  </section>`

const contactHtml = `
  <section id="contacto">
    <h2>Contacto</h2>
    <p>¿Tienes un proyecto en mente? Cuéntame. Te respondo en menos de 24 horas.</p>
    <ul>
      <li>Email: <a href="mailto:info@sergiolab.es">info@sergiolab.es</a></li>
      <li>Ubicación: Madrid · Remoto / Híbrido</li>
      <li><a href="https://linkedin.com/in/sergiocontreras-dev" target="_blank" rel="noopener">LinkedIn</a></li>
      <li><a href="https://github.com/Ponzialcubo" target="_blank" rel="noopener">GitHub</a></li>
    </ul>
  </section>`

const footerHtml = `
  <footer>
    <p>SergioLab · Desarrollo web a medida en Madrid y toda España.</p>
    <nav aria-label="Información legal">
      <a href="/privacy">Privacidad</a> ·
      <a href="/terms">Aviso Legal</a> ·
      <a href="/cookies">Cookies</a>
    </nav>
    <p>© ${new Date().getFullYear()} SergioLab — Todos los derechos reservados.</p>
  </footer>`

const content = `<div class="seo-pre">
  <header>
    <a href="/" class="brand">SergioLab · Developer</a>
    ${navHtml}
  </header>
  <main>
    ${heroHtml}
    ${portfolioHtml}
    ${servicesHtml}
    ${aboutHtml}
    ${stackHtml}
    ${processHtml}
    ${testimonialsHtml}
    ${faqHtml}
    ${contactHtml}
  </main>
  ${footerHtml}
</div>`

// Estilos mínimos para el fallback sin-JS / el instante previo a montar React.
const style = `<style id="seo-pre-style">
  .seo-pre{max-width:1100px;margin:0 auto;padding:32px 24px;font-family:Inter,system-ui,-apple-system,sans-serif;color:#E2E8F0;line-height:1.6}
  .seo-pre header{display:flex;flex-wrap:wrap;gap:16px;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,.08);padding-bottom:20px}
  .seo-pre .brand{font-weight:800;color:#fff;text-decoration:none}
  .seo-pre nav a{color:#E2E8F0;text-decoration:none;margin:0 8px;font-size:14px}
  .seo-pre h1{font-size:clamp(40px,8vw,72px);color:#fff;margin:24px 0 8px;letter-spacing:-.02em}
  .seo-pre h2{font-size:clamp(28px,4vw,40px);color:#fff;margin:56px 0 12px}
  .seo-pre h3{color:#fff;margin:24px 0 6px}
  .seo-pre .eyebrow{color:#00D9FF;letter-spacing:.2em;text-transform:uppercase;font-size:12px;margin:0}
  .seo-pre .lead{font-size:18px}
  .seo-pre a{color:#00D9FF}
  .seo-pre .cat,.seo-pre .tech{color:#94A3B8;font-size:13px}
  .seo-pre article{border-top:1px solid rgba(255,255,255,.06);padding-top:16px;margin-top:16px}
  .seo-pre blockquote{border-left:3px solid #00D9FF;margin:16px 0;padding-left:16px}
  .seo-pre footer{border-top:1px solid rgba(255,255,255,.08);margin-top:56px;padding-top:24px;color:#94A3B8;font-size:13px}
</style>`

// ── Inyección ───────────────────────────────────────────────────────────────
let html = readFileSync(DIST_HTML, 'utf8')

if (!html.includes('<div id="root"></div>')) {
  console.error('✗ prerender: no se encontró <div id="root"></div> en dist/index.html')
  process.exit(1)
}

html = html
  .replace('</head>', `${style}\n</head>`)
  .replace('<div id="root"></div>', `<div id="root">${content}</div>`)

writeFileSync(DIST_HTML, html, 'utf8')

const words = content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
console.log(`✓ prerender: contenido SEO inyectado en dist/index.html (~${words} palabras, ${projects.length} proyectos, ${faqs.length} FAQ)`)
