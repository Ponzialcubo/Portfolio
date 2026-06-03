# 06 · SEO & AEO

Objetivo: visibilidad en Google (SEO) **y** en buscadores con IA / respuestas
generativas (AEO — Answer Engine Optimization). Foco geográfico: **Madrid + España**.

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
