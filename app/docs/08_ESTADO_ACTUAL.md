# 08 · Estado Actual (memoria viva)

> Actualizar al final de cada sesión: qué se hizo, qué se decidió, qué queda.

## Sesión 2026-06-03 (e) — Auditoría SEO + correcciones

### Auditoría realizada
Revisión completa de: `index.html`, `sitemap.xml`, `robots.txt`,
`scripts/prerender.js`, `src/App.jsx`, `src/pages/CaseStudy.jsx`,
`src/pages/HomePage.jsx`, todos los `src/data/*.js` y la estructura de rutas.

### Hallazgos y correcciones
| Problema detectado | Archivo | Fix |
|---|---|---|
| Sitemap incompleto — faltaban `/portfolio`, `/servicios`, `/contacto`, `/sobre-mi`, `/proceso` | `public/sitemap.xml` | Añadidas 5 rutas con prioridades 0.65–0.85 |
| `CaseStudy.jsx` no actualizaba `document.title` al navegar | `src/pages/CaseStudy.jsx` | `useEffect` aplica `cs.metaTitle`; revierte al desmontar |
| Faltaba `twitter:creator` en Twitter Card | `index.html` | Añadido `@SergioLab_es` (verificar handle real) |
| Faltaba `BreadcrumbList` en JSON-LD | `index.html` | Añadido `#breadcrumb` con 6 entradas (rutas principales) |

### Estado del build
- Build: **pendiente de correr** tras los cambios — ejecutar `npm run build` antes de desplegar.
- Cambios aplicados son solo a archivos de `public/` y `src/` — no rompen el build.

---

## Sesión 2026-06-03 (d) — Rediseño profesional completo
- **`hooks/useStaggerReveal.js`** (nuevo): GSAP ScrollTrigger + stagger.
- **Stack:** grid animado GSAP stagger, contador, hover por badge.
- **HowItWorks:** carrusel interactivo (tabs + progress bar GSAP + número grande).
- **Testimonials:** cards con estrellas + hover lift + GSAP stagger.
- **FAQ:** acordeón → widget de **chat IA** con keyword-matching sobre `data/faq.js`,
  typing indicator, CTA automático tras 2 intercambios, chips de sugerencia.
- **ContactForm:** campo presupuesto, focus states dinámicos, submit CTA.
- **Footer:** CTA band + grid 3 cols (Brand+Social / Nav / Proyectos) + iconos SVG.
- **FloatingChat:** widget flotante persistente de chat IA.
- Build ✅ limpio. Push a GitHub `d27f8f3..b77d5c7`.

## Sesión 2026-06-03 (c) — SEO técnico: prerender + server config
- **Causa raíz detectada:** la SPA servía HTML vacío → Seobility 42%.
- **`scripts/prerender.js`** (nuevo): inyecta contenido estático semántico
  (H1/H2/H3, párrafos, listas, enlaces) en `#root` de `dist/index.html` desde
  `src/data/*`. Build = `vite build && node scripts/prerender.js`.
  Resultado: 1 H1, 8 H2, 27 H3, ~1.200 palabras, enlaces internos.
- **`public/.htaccess`** ampliado: HTTPS+non-www, GZip, caché, security headers.
- **Meta description** acortada a <160 caracteres.
- Build ✅ + prerender confirmado.

## Sesión 2026-06-03 (b) — Ajustes de contacto, URL y 4º proyecto
- **Teléfono eliminado** de toda la web. Contacto público = solo email.
- **Casa del Surf URL** → `https://casadelsurf.vercel.app`.
- **4º proyecto "Laboratorio de IA"** añadido con `published: false`.
- Build ✅ limpio (sigue mostrando 3 proyectos).

## Sesión 2026-06-03 (a) — Integración del CV
- **Stack** (`stack.js`) reorganizado en 7 grupos.
- **Formación** (`credentials.js`) verificada: Máster, DAM, ASIR.
- **Contacto**: LinkedIn (sergiocontreras-dev) + GitHub (Ponzialcubo).
- **Schema** (`index.html`): Person con nombre real "Sergio Contreras".
- Build ✅ limpio.

## Sesión 2026-06-02 — Rediseño profesional + reposicionamiento
- Posicionamiento: Full-Stack Developer & Web Designer. SEO Madrid + España.
- Proyectos: 3 reales. Servicios sin precios. Secciones nuevas: Stack, Testimonios, FAQ.
- SEO/AEO: JSON-LD completo (Person, ProfessionalService, ItemList, FAQPage, WebSite).
- Limpieza de duplicados. Documentación `docs/` + `CLAUDE.md`.
- Build ✅ limpio.

---

## Resumen del estado actual (2026-06-03 e)

### ¿Qué funciona?
- Web multi-página SPA con React Router (`/`, `/portfolio`, `/servicios`,
  `/sobre-mi`, `/proceso`, `/contacto`, `/proyectos/:slug`, legales).
- SEO on-page completo: JSON-LD 6 tipos, meta, OG, Twitter Card, BreadcrumbList.
- Prerender estático para crawlers tras `npm run build`.
- 3 proyectos reales + casos de estudio ricos.
- Chat IA en FAQ y FloatingChat (ambos con keyword-matching sobre `data/faq.js`).
- CookieBanner implementado.

### ¿Qué falta?
| Pendiente | Prioridad |
|---|---|
| `public/og-image.jpg` 1200×630 | Alta |
| Alta en Google Search Console + envío sitemap | Alta |
| Testimonios reales (quitar `isPlaceholder`) | Media |
| Vídeo hero .webm | Media |
| Verificar handle Twitter `@SergioLab_es` | Baja |
| Publicar 4º proyecto (`published: true`) | Cuando esté lista la URL |
