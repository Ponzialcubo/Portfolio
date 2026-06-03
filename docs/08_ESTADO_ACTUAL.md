# 08 · Estado Actual (memoria viva)

> Actualizar al final de cada sesión: qué se hizo, qué se decidió, qué queda.

## Sesión 2026-06-03 (d) — Rediseño profesional completo
- **`hooks/useStaggerReveal.js`** (nuevo): GSAP ScrollTrigger + stagger para grupos
  de tarjetas. Se usa en Stack y Testimonials.
- **Stack:** grid con contador de tecnologías, animación GSAP stagger entrada,
  hover por badge, borde top-accent por categoría.
- **HowItWorks:** reemplazado el grid estático por carrusel horizontal interactivo
  con tabs de paso, barra de progreso GSAP, panel de contenido animado con GSAP
  `fromTo`, número grande decorativo, controles prev/next.
- **Testimonials:** eliminado el aviso "testimonios de ejemplo". Cards mejoradas
  con estrellas, hover con lift y GSAP stagger.
- **FAQ:** acordeón eliminado → widget de **chat IA** con keyword-matching sobre
  `data/faq.js`, indicador de typing animado, CTA automático al formulario tras
  2 intercambios, sugerencias rápidas en el lateral.
- **ContactForm:** rediseñado completo — campo presupuesto, focus states, colores
  dinámicos, submit con boxShadow, mensaje de privacidad.
- **Footer:** CTA band prominente ("Cuéntame tu proyecto. Te respondo hoy."),
  grid 3 columnas (Brand+Social / Nav / Proyectos), iconos LinkedIn/GitHub SVG.
- **Build** ✅ limpio. Push a GitHub `d27f8f3..b77d5c7`.

## Sesión 2026-06-03 (c) — SEO técnico: prerender + server config
- **Causa raíz detectada:** la SPA servía HTML vacío → Seobility daba 42% on-page,
  Link structure 0%, contenido bajo, sin estructura.
- **`scripts/prerender.js`** (nuevo): tras `vite build`, inyecta contenido estático
  semántico (H1/H2/H3, párrafos, listas, enlaces) en `#root` de `dist/index.html`
  desde `src/data/*`. `package.json` build = `vite build && node scripts/prerender.js`.
  Resultado: 1 H1, 8 H2, 27 H3, ~1.200 palabras, enlaces internos (legales incluidos).
- **`public/.htaccess`** ampliado: HTTPS+non-www canónico, GZip, caché, charset UTF-8,
  cabeceras de seguridad, Cache-Control inmutable para assets.
- **Meta description** acortada a <160 caracteres.
- **Build** ✅ (prerender confirma inyección). dist/ listo para subir a Hostinger.
- **Pendiente que NO depende del código:** External factors (3%) = backlinks/off-page
  (alta en directorios, Google Business, LinkedIn, redes). No sube solo con código.

## Sesión 2026-06-03 (b) — Ajustes de contacto, URL y 4º proyecto
- **Teléfono eliminado** de toda la web (Contact, Footer, schema Person y
  ProfessionalService). Contacto público = solo email. Se mantienen LinkedIn/GitHub.
- **Casa del Surf URL** actualizada a `https://casadelsurf.vercel.app` (projects.js,
  index.html, docs).
- **4º proyecto "Laboratorio de IA"** añadido a `projects.js` con `published: false`
  (URL futura tools.sergiolab.es, badge PRÓXIMAMENTE). `projects.js` ahora exporta
  solo los publicados (`projects = allProjects.filter(p => p.published !== false)`).
  Para publicarlo: poner URL real + `published: true`. No requiere tocar nada más.
- **Build** ✅ limpio (sigue mostrando 3 proyectos).

## Sesión 2026-06-03 — Integración del CV
- **Stack** (`stack.js`) reorganizado en 7 grupos según el CV: Frontend & Diseño,
  Backend & BBDD, CMS/E-commerce & Pagos, SEO & Conversión, Datos & Analítica,
  IA & Automatización, Herramientas & Despliegue.
- **Formación** (`credentials.js`) verificada: Máster Data & Analytics (The Power),
  DAM (The Power), ASIR (C.F.P. INGLAN) con años.
- **Contacto** (`Contact.jsx` + `Footer.jsx`): + teléfono +34 604 95 43 09,
  + LinkedIn (sergiocontreras-dev) + GitHub (Ponzialcubo), ubicación
  "Madrid · Remoto / Híbrido".
- **Schema** (`index.html`): Person con nombre real "Sergio Contreras"
  (alternateName SergioLab), telephone, sameAs (LinkedIn/GitHub), knowsAbout y
  hasCredential ampliados; telephone también en ProfessionalService.
- **Testimonios**: atados a Oudh & Co y Casa del Surf (siguen `isPlaceholder`).
- **Build** ✅ limpio.


## Sesión 2026-06-02 — Rediseño profesional + reposicionamiento

### Qué se hizo
- **Posicionamiento:** de "Frontend Developer · Madrid" a **"Full-Stack Developer
  & Web Designer"**, SEO Madrid + España. Hero: tagline `FULL-STACK DEVELOPER &
  WEB DESIGNER`, headline `DE LA IDEA / AL DEPLOY`, subtítulo nuevo.
- **Proyectos:** `src/data/projects.js` reescrito con los **3 reales**:
  Oudh & Co (e-commerce + IA), Casa del Surf (reservas) e Inmobiliaria Marina
  Carranque. Añadido campo `highlights`; `ProjectCard` los pinta con checkmarks.
- **Servicios:** `src/data/services.js` → Webs & Landing / E-commerce & Pagos /
  Sistemas a Medida. Sin precios.
- **Secciones nuevas:** `Stack.jsx` (+`data/stack.js`), `Testimonials.jsx`
  (+`data/testimonials.js`, placeholders marcados), `FAQ.jsx` (+`data/faq.js`,
  acordeón accesible). Cableadas en `App.jsx` con lazy loading.
- **Navegación:** `data/navigation.js` con Proceso y FAQ añadidos.
- **SEO/AEO:** `index.html` — title/description/keywords nuevos, geo tags, OG/Twitter
  actualizados y `@graph` JSON-LD reescrito (Person, ProfessionalService con
  OfferCatalog, ItemList de proyectos, FAQPage con 8 Q&A, WebSite).
- **Sitemap:** `lastmod` → 2026-06-02.
- **Limpieza:** eliminados duplicados muertos (`components/Footer|Hero|Navigation|
  Portfolio.jsx` y `sections/Cookies|Legal|Privacy.jsx`).
- **Docs:** creada carpeta `docs/` (01–08), `CLAUDE.md` y `HANDOFF.md`.
- **Build:** `npm run build` ✅ limpio (81 módulos, chunks nuevos para Stack/
  Testimonials/FAQ).

### Decisiones tomadas
- Rol = Full-Stack Developer & Web Designer. SEO = Madrid + España.
- Secciones añadidas: FAQ, Testimonios, Stack (NO planes/precios).
- Testimonios como placeholders marcados hasta tener reseñas reales.

### Pendiente (ver `07_HOJA_DE_RUTA.md`)
- CV de Sergio → ampliar `stack.js` y verificar `credentials.js`.
- Testimonios reales → quitar `isPlaceholder`.
- `og-image.jpg`, vídeo hero `.webm`, alta en Search Console, cookie consent GDPR.

### Estado del repo
- No es repositorio git (aún). Build de producción correcto.
