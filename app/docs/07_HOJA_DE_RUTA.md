# 07 · Hoja de Ruta

## ✅ Completado

### Sesión 2026-06-02 — Rediseño + reposicionamiento
- ✅ Reposicionamiento a Full-Stack Developer & Web Designer (Madrid + España).
- ✅ Portfolio reducido a 3 proyectos reales (Oudh & Co, Casa del Surf, Inmobiliaria).
- ✅ Tarjetas de proyecto enriquecidas con `highlights`.
- ✅ Servicios reescritos sin precios.
- ✅ Secciones nuevas: Stack, Testimonios, FAQ.
- ✅ SEO/AEO: meta, Open Graph, geo tags y JSON-LD completo.
- ✅ Limpieza de archivos duplicados/muertos.
- ✅ Documentación (`docs/`, `CLAUDE.md`) + `HANDOFF.md`.

### Sesión 2026-06-03 — CV, rediseño visual, SEO técnico, ajustes
- ✅ **CV integrado**: `stack.js` y `credentials.js` verificados; contacto y
  schema con nombre real "Sergio Contreras", LinkedIn (sergiocontreras-dev),
  GitHub (Ponzialcubo).
- ✅ **Rediseño profesional completo**: Stack GSAP, HowItWorks carrusel,
  Testimonials con estrellas, FAQ → chat IA keyword-matching, ContactForm
  rediseñado, Footer 3 columnas, FloatingChat widget.
- ✅ **SEO técnico**: `scripts/prerender.js` (contenido estático para crawlers),
  `.htaccess` (HTTPS, GZip, caché, security headers). Build = `vite build &&
  node scripts/prerender.js`.
- ✅ **Teléfono retirado** de toda la web. Contacto público = solo email.
- ✅ **Casa del Surf URL** → `https://casadelsurf.vercel.app`.
- ✅ **4º proyecto "Laboratorio de IA"** preparado con `published: false`.
- ✅ **Rutas SPA multi-página**: cada sección es su propia ruta y página.
- ✅ **Casos de estudio** (`/proyectos/:slug`) con contenido rico por proyecto.
- ✅ **CookieBanner** component implementado.

### Sesión 2026-06-03 (esta) — Auditoría SEO + corrección de bugs
- ✅ **Sitemap corregido**: añadidas `/portfolio`, `/servicios`, `/contacto`,
  `/sobre-mi`, `/proceso` (faltaban completamente).
- ✅ **`document.title` dinámico** en `CaseStudy.jsx` (usa `cs.metaTitle`,
  revierte al desmontar).
- ✅ **`twitter:creator`** añadido a Twitter Card.
- ✅ **`BreadcrumbList`** JSON-LD añadido al `@graph` de `index.html`.
- ✅ **Focus-trap menú móvil** verificado — ya estaba implementado en
  `Navigation.jsx` (Escape, Tab cycling, `inert`, body overflow hidden).
- ✅ **FloatingChat badge** — stale closure corregida con `useRef` para no
  mostrar el badge si el usuario ya había abierto el chat.
- ✅ **Vite chunk splitting** — GSAP separado en su propio chunk. El chunk
  `sections` bajó de 331.83 KB → 98.13 KB (gzip: 114 → 34 KB, −70%).
- ✅ Docs actualizados (`06`, `07`, `08`, `HANDOFF`).

---

## Pendiente del cliente (Sergio) — bloquea contenido final
1. **`public/og-image.jpg`** (1200×630) → referenciada en meta pero no existe.
   Crear en Figma/Canva: fondo oscuro, logo SergioLab, tagline, URL.
2. **Testimonios reales** (2–4) → sustituir en `src/data/testimonials.js` y
   quitar `isPlaceholder: false`.
3. **Vídeo del hero** definitivo → `public/assets/hero-video.mp4` + `.webm`.

---

## Próximas mejoras técnicas

### Alta prioridad
- [ ] Generar `public/og-image.jpg` y verificar en LinkedIn/WhatsApp.
- [ ] Alta en **Google Search Console** + envío de sitemap.
- [ ] **Cookie banner GDPR** (ya existe `CookieBanner.jsx`) → activar antes de
  conectar Analytics. Verificar que funciona correctamente.
- [ ] Vídeo hero a `.webm` (LCP −300/500 ms en 4G móvil).

### Media prioridad
- [ ] Verificar handle `@SergioLab_es` en X/Twitter — activar `twitter:site/creator`
  cuando se confirme.
- [ ] `Review` + `AggregateRating` en schema cuando haya reseñas reales.
- [x] Focus-trap en el menú móvil (WCAG 2.1.2) — ya implementado en `Navigation.jsx`.
- [ ] Validar JSON-LD en https://validator.schema.org + Google Rich Results Test.
- [ ] Enviar sitemap manualmente en Search Console tras el alta.
- [ ] Publicar 4º proyecto "Laboratorio de IA" (`published: true` + URL real en
  `projects.js`) cuando `tools.sergiolab.es` esté montado.

### Baja / futuro
- [ ] Páginas de caso de estudio con Open Graph image propia por proyecto.
- [ ] `LocalBusiness` schema si se da de alta en Google Business Profile.
- [ ] Versión en inglés (i18n) para alcance internacional.
- [ ] Blog técnico para SEO de contenidos.
- [ ] Backend propio o EmailJS para el formulario (alternativa a Formspree).

## Notas de decisión
- **Sin precios en la web** (2026-06-02): presupuesto a medida tras llamada.
- **Solo 3 proyectos**: calidad sobre cantidad; cada uno es un sistema completo.
- **Contacto público = solo email** (2026-06-03): teléfono retirado de toda la web.
- La carpeta `audit/` contiene la auditoría previa (mayo 2025); queda como histórico,
  los docs canónicos ahora son `docs/` + `CLAUDE.md`.
