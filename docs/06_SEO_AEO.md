# 06 · SEO & AEO

Objetivo: visibilidad en Google (SEO) **y** en buscadores con IA / respuestas
generativas (AEO — Answer Engine Optimization). Foco geográfico: **Madrid + España**.

## ⭐ Prerender (lo más importante — no romper)
La web es una **SPA de React**: el HTML servido solo tiene `<div id="root">`, así
que los crawlers que no ejecutan todo el JS (Seobility, algunos bots) verían una
página **vacía** → sin H1, sin texto, sin enlaces. Esto hundía el SEO
(Link structure 0%, contenido bajo, sin estructura).

**Solución:** `scripts/prerender.js` se ejecuta tras `vite build` (ver
`package.json` → `"build": "vite build && node scripts/prerender.js"`) e inyecta
una versión **estática y semántica** del contenido (generada desde `src/data/*`)
dentro de `#root` en `dist/index.html`: header + nav, H1, un H2 por sección, H3
por tarjeta/pregunta, párrafos, listas y enlaces internos/externos.

- En el navegador, `createRoot().render()` limpia `#root` y monta la app real
  (mismo contenido → **no es cloaking**).
- Con JS desactivado o para un crawler, queda una página completa y rastreable.

Resultado en `dist/index.html`: ~1 H1, 8 H2, 27 H3, ~1.200 palabras, enlaces
internos (incluidos `/privacy`, `/terms`, `/cookies`).

> ⚠️ El copy del **hero** está hardcodeado en `scripts/prerender.js` (objeto
> `hero`). Si cambias el titular/subtítulo en `Hero.jsx`, actualízalo también ahí.
> El resto del contenido se genera solo desde `src/data/*`.
> **Siempre desplegar el resultado de `npm run build`** (que incluye el prerender),
> nunca un `dist` generado solo con `vite build`.

## Server configuration (Apache / Hostinger) — `public/.htaccess`
Incluye: redirección a HTTPS + host canónico sin www, SPA routing, `AddDefaultCharset
UTF-8`, compresión GZip (mod_deflate), caché de navegador (mod_expires), cabeceras
de seguridad (X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
Permissions-Policy) y `Cache-Control` inmutable para assets con hash.
> El `.htaccess` se copia a `dist/` en el build. Súbelo siempre (archivo oculto).

## Dónde vive el SEO
Todo el SEO on-page está en **`index.html`** (`<head>`): title, meta description,
keywords, Open Graph, Twitter Card, geo tags, canonical y los bloques JSON-LD.
Los textos de las secciones (H1/H2, FAQ, copy) refuerzan las keywords.

## Keywords principales
```
desarrollo web a medida · desarrollador full-stack madrid · diseñador web
tienda online stripe · ecommerce a medida · sistema de reservas hotel
panel de gestión · next.js · react · web profesional españa
```

## JSON-LD implementado (`@graph` en index.html)
1. **Person** (`#person`) — Sergio: jobTitle "Desarrollador Full-Stack & Diseñador Web",
   `knowsAbout`, `hasCredential` (Data Analytics, DAM, ASIR).
2. **ProfessionalService** (`#business`) — el negocio, con `areaServed`
   (Madrid + España) y `hasOfferCatalog` con los 3 servicios.
3. **ItemList** (`#portfolio`) — los 3 proyectos como WebSite con URL y descripción.
4. **FAQPage** (`#faq`) — las 8 preguntas/respuestas (clave para AEO y rich results).
5. **WebSite** (`#website`) — metadatos del sitio.

> ⚠️ **Sincronización obligatoria:** las preguntas del `FAQPage` deben coincidir
> palabra por palabra con `src/data/faq.js`. Si editas una, edita las dos.

## Buenas prácticas AEO aplicadas
- Respuestas FAQ **autocontenidas** y en lenguaje natural (citables por una IA).
- Encabezados claros y jerárquicos (un solo `<h1>` en el hero; `<h2>` por sección;
  preguntas FAQ en `<h3>`).
- Datos estructurados ricos (Service, FAQPage, ItemList).
- Contenido que responde a la *intención* del usuario (precio, plazos, mantenimiento,
  "¿aparecerá en Google?", remoto…), no solo keywords.

## Checklist de verificación (al desplegar)
- [ ] `index.html` title ≤ ~60 car. y description ≤ ~155 car.
- [ ] Validar JSON-LD en https://validator.schema.org y Rich Results Test.
- [ ] `public/og-image.jpg` 1200×630 existe (hoy **pendiente** — el meta lo referencia).
- [ ] `robots.txt` permite indexación y apunta al sitemap. ✅
- [ ] `sitemap.xml` con `lastmod` actual. ✅ (2026-06-02)
- [ ] Core Web Vitals en verde (PageSpeed Insights) — vídeo del hero optimizado.
- [ ] Dar de alta el sitio en Google Search Console y enviar sitemap.

## Pendiente / mejoras futuras
- Generar `og-image.jpg` (hoy referenciada pero no existe en `public/`).
- Convertir el vídeo del hero a `.webm` (mejora LCP en móvil).
- Añadir `Review` + `AggregateRating` al schema cuando haya testimonios reales.
- Considerar `BreadcrumbList` si se añaden páginas/rutas nuevas.
- Open Graph por proyecto si en el futuro hay páginas de caso de estudio.
