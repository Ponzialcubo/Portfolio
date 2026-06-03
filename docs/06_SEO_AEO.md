# 06 · SEO & AEO

Objetivo: visibilidad en Google (SEO) **y** en buscadores con IA / respuestas
generativas (AEO — Answer Engine Optimization). Foco geográfico: **Madrid + España**.

## ⭐ Prerender (lo más importante — no romper)
La web es una **SPA de React multi-página**: la home sirve solo `Hero + Footer`
(ver `pages/HomePage.jsx`). Las secciones viven en rutas propias (`/portfolio`,
`/servicios`, etc.). El HTML servido solo tiene `<div id="root">`, así que los
crawlers que no ejecutan todo el JS verían una página **vacía** → sin H1, sin
texto, sin enlaces internos.

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

Las páginas de casos de estudio (`/proyectos/:slug`) tienen sus propios
`metaTitle` y `metaDescription` en `src/data/caseStudies.js`. El componente
`CaseStudy.jsx` aplica `document.title` dinámicamente vía `useEffect`.

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
6. **BreadcrumbList** (`#breadcrumb`) — las 6 rutas principales (Inicio, Portfolio,
   Servicios, Sobre mí, El proceso, Contacto). ← añadido 2026-06-03.

> ⚠️ **Sincronización obligatoria:** las preguntas del `FAQPage` deben coincidir
> palabra por palabra con `src/data/faq.js`. Si editas una, edita las dos.

## Buenas prácticas AEO aplicadas
- Respuestas FAQ **autocontenidas** y en lenguaje natural (citables por una IA).
- Encabezados claros y jerárquicos (un solo `<h1>` en el hero; `<h2>` por sección;
  preguntas FAQ en `<h3>`).
- Datos estructurados ricos (Service, FAQPage, ItemList, BreadcrumbList).
- Contenido que responde a la *intención* del usuario (precio, plazos, mantenimiento,
  "¿aparecerá en Google?", remoto…), no solo keywords.

## Auditoría 2026-06-03 — hallazgos y correcciones

### ✅ Corregido
| Problema | Fix |
|---|---|
| Sitemap incompleto (faltaban `/portfolio`, `/servicios`, `/sobre-mi`, `/proceso`, `/contacto`) | Añadidas las 5 rutas con prioridades correctas |
| `CaseStudy.jsx` no actualizaba `document.title` | `useEffect` que aplica `cs.metaTitle` al montar, revierte al desmontar |
| Faltaba `twitter:creator` en Twitter Card | Añadida (`@SergioLab_es`) |
| Faltaba `BreadcrumbList` en JSON-LD | Añadido `#breadcrumb` con 6 entradas |

### ⚠️ Pendiente (no depende del código)
| Item | Estado |
|---|---|
| `public/og-image.jpg` (1200×630) | Pendiente del cliente — el meta la referencia pero no existe |
| Alta en Google Search Console + sitemap enviado | Pendiente |
| `twitter:site` (`@SergioLab_es`) | Verificar handle real antes de activar |
| Backlinks / off-page (External factors Seobility) | Solo sube con directorios, Google Business, LinkedIn, reseñas |

## Sitemap — rutas cubiertas (2026-06-03)
```
/ (home)          priority 1.0
/portfolio        priority 0.85
/servicios        priority 0.85
/contacto         priority 0.80
/sobre-mi         priority 0.75
/proceso          priority 0.65
/proyectos/oudh-co                         priority 0.90
/proyectos/casa-del-surf                   priority 0.90
/proyectos/inmobiliaria-marina-carranque   priority 0.90
/privacy, /cookies, /terms                priority 0.40
```

## Checklist de verificación (al desplegar)
- [x] `index.html` title ≤ ~67 car. y description ≤ ~143 car.
- [x] JSON-LD completo: Person, ProfessionalService, ItemList, FAQPage, WebSite, BreadcrumbList.
- [x] `robots.txt` permite indexación y apunta al sitemap.
- [x] `sitemap.xml` con `lastmod` 2026-06-03 y todas las rutas públicas.
- [x] `CaseStudy.jsx` aplica `document.title` dinámico.
- [ ] Validar JSON-LD en https://validator.schema.org y Rich Results Test.
- [ ] `public/og-image.jpg` 1200×630 existe.
- [ ] Core Web Vitals en verde (PageSpeed Insights).
- [ ] Alta en Google Search Console + envío de sitemap.

## Pendiente / mejoras futuras
- Generar `og-image.jpg` (hoy referenciada pero no existe en `public/`).
- Convertir el vídeo del hero a `.webm` (mejora LCP en móvil).
- Añadir `Review` + `AggregateRating` al schema cuando haya testimonios reales.
- Añadir `LocalBusiness` si el negocio se da de alta en Google Business Profile.
- Open Graph por proyecto si en el futuro hay páginas de caso de estudio con imagen propia.
- Verificar handle `@SergioLab_es` en X/Twitter antes de activar `twitter:site/creator`.
