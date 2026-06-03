# HANDOFF — SergioLab Portfolio
> Estado de la web tras el rediseño profesional. Punto de partida de la próxima sesión.
> Fecha: 2026-06-02 · Stack: React 18 + Vite 5 · Build: ✅ limpio

---

## TL;DR
El portfolio pasó de "freelance genérico con proyectos inventados" a **web de
estudio profesional**: posicionamiento full-stack, 3 proyectos reales, secciones
nuevas (Stack, Testimonios, FAQ) y SEO/AEO completo. La web compila y está lista
para desplegar. Faltan **3 inputs del cliente** para el contenido 100% final
(CV, testimonios reales, og-image) — ver "Pendiente".

## Cómo arrancar
```bash
cd c:\Users\ponzi\Desktop\mi-portfolio
npm run dev       # desarrollo
npm run build     # producción → dist/
```
Leer primero: `CLAUDE.md` → `docs/08_ESTADO_ACTUAL.md` → `docs/07_HOJA_DE_RUTA.md`.

---

## Qué se hizo en esta sesión

### 1. Reposicionamiento (decidido con el cliente)
| | Antes | Ahora |
|---|---|---|
| Rol | Frontend Developer · Madrid | **Full-Stack Developer & Web Designer** |
| SEO | Solo Madrid | **Madrid + toda España (remoto)** |
| Hero | "TU PYME / POSICIONADA" | **"DE LA IDEA / AL DEPLOY"** |
| Precios | "Desde 800€…" | **Sin precios** (presupuesto a medida) |

### 2. Portfolio → 3 proyectos REALES
Reescrito `src/data/projects.js`. Eliminados los inventados (perfumería demo,
restaurante, app fitness, dashboard gym). Quedan:
1. **Oudh & Co** — e-commerce perfumería + Stripe + chatbot IA (Claude) + panel
   admin + facturas PDF → `oudh.sergiolab.es` · badge "DEMO EN VIVO".
2. **Casa del Surf** — motor de reservas (fechas) + Stripe + panel anti-overbooking
   → `casadelsurf.es` · badge "EN DESARROLLO".
3. **Inmobiliaria Marina Carranque** — portal inmobiliario, cliente real
   → `inmobiliariamarinacarranque.es` · badge "PROYECTO REAL".

Cada tarjeta ahora muestra `highlights` (4 capacidades clave con checkmarks) —
`ProjectCard.jsx` actualizado.

### 3. Secciones nuevas (data-driven + lazy)
- **Stack tecnológico** — `sections/Stack.jsx` + `data/stack.js` (grid por categorías).
- **Testimonios** — `sections/Testimonials.jsx` + `data/testimonials.js`
  (placeholders marcados; muestran aviso hasta ser reales).
- **FAQ** — `sections/FAQ.jsx` + `data/faq.js` (acordeón accesible, 8 preguntas
  orientadas a AEO).

Orden final de la home (`App.jsx`):
`Hero → Portfolio → Servicios → Sobre mí → Stack → Proceso → Testimonios → FAQ → Contacto → Footer`.
Servicios reescritos sin precios (`data/services.js`). Navegación ampliada
(`data/navigation.js`: + Proceso, + FAQ).

### 4. SEO / AEO (todo en `index.html`)
- Title, description, keywords nuevos (keywords full-stack + Madrid/España).
- Geo tags, Open Graph y Twitter Card actualizados.
- JSON-LD `@graph` reescrito: **Person**, **ProfessionalService** (con OfferCatalog
  de 3 servicios), **ItemList** (3 proyectos), **FAQPage** (8 Q&A) y **WebSite**.
- `sitemap.xml` con `lastmod` 2026-06-02. `robots.txt` OK.

### 5. Limpieza
Eliminados 7 archivos duplicados/muertos (`components/Footer|Hero|Navigation|
Portfolio.jsx`, `sections/Cookies|Legal|Privacy.jsx`). El árbol quedó coherente.

### 6. Documentación
Creada carpeta **`docs/`** (01_PROYECTO → 08_ESTADO_ACTUAL), **`CLAUDE.md`** (entry
point para la IA del IDE) y este `HANDOFF.md`. La vieja carpeta `audit/` queda
como histórico.

---

## Archivos clave tocados/creados
```
NUEVOS   src/data/faq.js · testimonials.js · stack.js
         src/components/sections/Stack.jsx · Testimonials.jsx · FAQ.jsx
         CLAUDE.md · HANDOFF.md · docs/01..08_*.md
EDITADOS src/data/projects.js · services.js · navigation.js
         src/components/sections/Hero.jsx · TechStack.jsx · WhyMe.jsx
         src/components/sections/Portfolio/Portfolio.jsx · ProjectCard.jsx
         src/App.jsx · index.html · public/sitemap.xml
BORRADOS components/{Footer,Hero,Navigation,Portfolio}.jsx
         components/sections/{Cookies,Legal,Privacy}.jsx
```

---

## ✅ CV integrado (2026-06-03)
`stack.js` (7 grupos) y `credentials.js` verificados con el CV. Contacto y schema
con nombre real **Sergio Contreras**, LinkedIn (sergiocontreras-dev) y GitHub
(Ponzialcubo). Ubicación "Madrid · Remoto / Híbrido".

## ✅ SEO técnico 2026-06-03 (c) — fix Seobility
La SPA servía HTML vacío → Seobility 42% (Link structure 0%, contenido bajo).
- **`scripts/prerender.js`**: tras `vite build`, inyecta contenido estático
  crawlable (1 H1, 8 H2, 27 H3, ~1.200 palabras, enlaces internos) en
  `dist/index.html`. `build` = `vite build && node scripts/prerender.js`. React
  lo reemplaza en el navegador (mismo contenido, no cloaking).
- **`public/.htaccess`**: HTTPS+non-www, GZip, caché, charset, security headers.
- **Meta description** < 160 car.
- ⚠️ Si cambias el hero en `Hero.jsx`, actualiza el copy en `scripts/prerender.js`.
- ⚠️ **External factors (3%)** = backlinks/off-page; no sube con código (alta en
  Google Business, directorios, LinkedIn, conseguir enlaces entrantes).

## ✅ Ajustes 2026-06-03 (b)
- **Teléfono retirado** de toda la web (Contact, Footer, schema). Contacto público
  = solo email. LinkedIn/GitHub se mantienen.
- **Casa del Surf** → URL `https://casadelsurf.vercel.app`.
- **4º proyecto "Laboratorio de IA"** preparado en `src/data/projects.js` con
  `published: false` (oculto). `projects` exporta solo los publicados. Para
  mostrarlo cuando esté montado: poner URL real + `published: true`. Nada más.

## ⚠️ Pendiente del cliente (bloquea contenido final)
1. **Testimonios reales** (2–4) → sustituir en `src/data/testimonials.js` y poner
   `isPlaceholder: false`. El aviso "Testimonios de ejemplo" desaparece solo.
   (Ahora son placeholders atados a los 3 proyectos.)
2. **`public/og-image.jpg`** (1200×630) → hoy el meta la referencia pero no existe.

## Próximos pasos técnicos (ver `docs/07_HOJA_DE_RUTA.md`)
- Vídeo del hero a `.webm` (mejora LCP móvil).
- Alta en Google Search Console + envío del sitemap.
- Banner de cookies (GDPR) antes de activar Analytics.
- Focus-trap real en el menú móvil.
- (Futuro) páginas de caso de estudio por proyecto, i18n inglés.

## Recordatorios para la próxima IA
- **Contenido = datos**: editar `src/data/*.js`, no el JSX.
- **FAQ**: si cambias `data/faq.js`, sincroniza el `FAQPage` de `index.html`.
- **Estilos**: inline + tokens de `utils/constants.js`, nada de Tailwind en componentes.
- Al terminar: `npm run build` y actualizar `docs/08_ESTADO_ACTUAL.md`.
