# HANDOFF — SergioLab Portfolio
> Estado de la web tras la auditoría SEO. Punto de partida de la próxima sesión.
> Fecha: 2026-06-03 · Stack: React 18 + Vite 5 · Build: pendiente de correr

---

## TL;DR
Portfolio profesional full-stack en estado sólido. Multi-página SPA con routing,
casos de estudio ricos, chat IA en FAQ, FloatingChat, prerender SEO, 6 tipos de
JSON-LD. Esta sesión corrigió 4 gaps SEO (sitemap incompleto, sin document.title
dinámico en casos de estudio, sin BreadcrumbList, sin twitter:creator). Faltan
**3 inputs del cliente** para el contenido 100% final: og-image, testimonios
reales, vídeo hero.

## Cómo arrancar
```bash
cd c:\Users\ponzi\Desktop\mi-portfolio
npm run dev       # desarrollo
npm run build     # producción → dist/ (incluye prerender SEO)
```
Leer primero: `CLAUDE.md` → `docs/08_ESTADO_ACTUAL.md` → `docs/07_HOJA_DE_RUTA.md`.

---

## Qué se hizo en sesiones anteriores

### Sesión 2026-06-02 — Reposicionamiento + rediseño base
| | Antes | Ahora |
|---|---|---|
| Rol | Frontend Developer · Madrid | **Full-Stack Developer & Web Designer** |
| SEO | Solo Madrid | **Madrid + toda España (remoto)** |
| Hero | "TU PYME / POSICIONADA" | **"DE LA IDEA / AL DEPLOY"** |
| Precios | "Desde 800€…" | **Sin precios** (presupuesto a medida) |

Portfolio → 3 proyectos REALES (Oudh & Co, Casa del Surf, Inmobiliaria Marina
Carranque). Secciones nuevas: Stack, Testimonios, FAQ. SEO/AEO completo.
Documentación `docs/` + `CLAUDE.md`.

### Sesión 2026-06-03 — CV, rediseño visual, SEO técnico, ajustes
- **CV integrado**: Stack (7 grupos), credenciales, nombre real "Sergio Contreras",
  LinkedIn (sergiocontreras-dev), GitHub (Ponzialcubo).
- **Rediseño profesional**: Stack GSAP stagger, HowItWorks carrusel interactivo,
  Testimonials con estrellas, FAQ → chat IA keyword-matching, ContactForm
  mejorado, Footer 3 columnas, FloatingChat widget, CookieBanner.
- **SEO técnico**: `scripts/prerender.js` (HTML estático para crawlers, evita SPA
  vacía), `.htaccess` ampliado, multi-página SPA con React Router.
- **Teléfono retirado** de toda la web. Contacto = solo email + LinkedIn + GitHub.
- **4º proyecto** preparado con `published: false` (tools.sergiolab.es).
- **Casos de estudio** (`/proyectos/:slug`) con contenido rico.

### Sesión 2026-06-03 (esta) — Auditoría SEO
Revisión completa del sitio. **4 correcciones aplicadas:**

| # | Problema | Fix | Archivo |
|---|---|---|---|
| 1 | Sitemap incompleto (faltaban 5 rutas de sección) | Añadidas `/portfolio`, `/servicios`, `/contacto`, `/sobre-mi`, `/proceso` | `public/sitemap.xml` |
| 2 | `CaseStudy` sin `document.title` dinámico | `useEffect` aplica `cs.metaTitle`; revierte al desmontar | `src/pages/CaseStudy.jsx` |
| 3 | Sin `twitter:creator` | Añadido `@SergioLab_es` | `index.html` |
| 4 | Sin `BreadcrumbList` en JSON-LD | Añadido `#breadcrumb` con 6 entradas | `index.html` |

---

## Arquitectura actual (resumen)

```
src/
├── pages/
│   ├── HomePage.jsx          Hero + Footer (ruta /)
│   ├── PortfolioPage.jsx     (ruta /portfolio)
│   ├── ServicesPage.jsx      (ruta /servicios)
│   ├── AboutPage.jsx         (ruta /sobre-mi)
│   ├── ProcessPage.jsx       (ruta /proceso)
│   ├── ContactPage.jsx       (ruta /contacto)
│   ├── CaseStudy.jsx         (ruta /proyectos/:slug) ← document.title dinámico
│   └── Privacy|Terms|Cookies
├── data/
│   ├── projects.js           3 publicados + 1 (published:false)
│   ├── caseStudies.js        metaTitle/metaDescription por proyecto
│   ├── faq.js                8 Q&A (sync con FAQPage JSON-LD en index.html)
│   ├── stack.js / services.js / testimonials.js / howItWorks.js
│   ├── credentials.js / navigation.js / whyMe.js
└── components/
    ├── common/FloatingChat.jsx  CookieBanner.jsx
    └── sections/*

scripts/prerender.js    Inyecta HTML SEO estático en dist/index.html tras build
public/
├── sitemap.xml         11 URLs: home + 5 secciones + 3 casos + 3 legales
├── robots.txt          Allow: / + Sitemap pointer
└── .htaccess           HTTPS, GZip, caché, security headers
```

---

## JSON-LD en index.html — 6 tipos
1. **Person** — Sergio Contreras, jobTitle, sameAs (LinkedIn/GitHub), hasCredential
2. **ProfessionalService** — SergioLab, areaServed, hasOfferCatalog (3 servicios)
3. **ItemList** — 3 proyectos como WebSite
4. **FAQPage** — 8 Q&A (sync con `data/faq.js`)
5. **WebSite** — metadatos del sitio
6. **BreadcrumbList** — 6 rutas principales ← nuevo

---

## ⚠️ Pendiente del cliente

| Item | Prioridad | Acción |
|---|---|---|
| `public/og-image.jpg` (1200×630) | **Alta** | Crear en Figma/Canva y subir a `public/` |
| Alta en Google Search Console | **Alta** | Entrar en search.google.com/search-console, verificar con DNS o meta tag, enviar sitemap |
| Testimonios reales | Media | Sustituir en `src/data/testimonials.js`, quitar `isPlaceholder: true` |
| Vídeo hero `.webm` | Media | Convertir `hero-video.mp4` a `.webm` para LCP móvil |
| Verificar `@SergioLab_es` en X/Twitter | Baja | Si el handle es correcto, dejar el `twitter:creator`; si no, corregirlo |

## Próximos pasos técnicos (ver `docs/07_HOJA_DE_RUTA.md`)
- `npm run build` para aplicar los cambios de esta sesión.
- Validar JSON-LD en https://validator.schema.org (especialmente el BreadcrumbList nuevo).
- Activar Google Search Console + enviar sitemap actualizado (11 URLs).
- Banner de cookies GDPR activo → conectar Google Analytics.

## Recordatorios para la próxima IA
- **Contenido = datos**: editar `src/data/*.js`, no el JSX.
- **FAQ**: si cambias `data/faq.js`, sincroniza el `FAQPage` de `index.html`.
- **Estilos**: inline + tokens de `utils/constants.js`, nada de Tailwind en componentes.
- **Prerender**: si cambias el copy del hero en `Hero.jsx`, actualiza `scripts/prerender.js`.
- **Sitemap**: si añades rutas nuevas en `App.jsx`, añadirlas también a `sitemap.xml`.
- Al terminar: `npm run build` y actualizar `docs/08_ESTADO_ACTUAL.md`.
