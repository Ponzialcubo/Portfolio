# CLAUDE.md — SergioLab Portfolio
> Punto de entrada único para la IA del IDE. Leer SIEMPRE primero.
> Última actualización: 2026-06-02

---

## Qué es este proyecto

Portfolio profesional de **SergioLab** (`sergiolab.es`): un desarrollador
full-stack y diseñador web que vende servicios de creación de webs, e-commerce
y sistemas a medida a pymes. La web es a la vez la carta de presentación y la
mejor demostración de su trabajo: tiene que transmitir "este es quien me va a
hacer la web". Stack: **React 18 + Vite 5 + Tailwind (mínimo) + GSAP**, SPA con
`react-router-dom`. Deploy estático (carpeta `dist/`).

---

## Reglas que NO se rompen

1. **Estilos inline + tokens, no Tailwind para componentes.** El diseño vive en
   estilos inline de React que leen de `src/utils/constants.js` (`COLORS`,
   `FONTS`). Tailwind solo está cargado para el reset base en `index.css`. No
   metas clases de utilidad de Tailwind en los componentes.
2. **Contenido = data, no JSX.** Todo el texto editable vive en `src/data/*.js`.
   Para cambiar proyectos, servicios, FAQ, testimonios o stack se edita el
   array de datos, NO el componente. Ver `docs/05_CONTENIDO_Y_COPY.md`.
3. **Solo 3 proyectos reales.** Oudh & Co, Casa del Surf, Inmobiliaria Marina
   Carranque. Calidad sobre cantidad. No reintroducir proyectos inventados.
4. **SEO/AEO sincronizado.** Si cambias las FAQ en `src/data/faq.js`, actualiza
   también el bloque `FAQPage` JSON-LD de `index.html`. Ver `docs/06_SEO_AEO.md`.
5. **Nada de testimonios falsos en producción.** Los de `src/data/testimonials.js`
   están marcados `isPlaceholder: true` y muestran un aviso. Quitar el flag solo
   cuando sean reseñas REALES.
6. **Commits en inglés:** `feat:` / `fix:` / `refactor:` / `docs:` / `style:`.

---

## Posicionamiento (decidido 2026-06-02)

- **Rol:** Desarrollador Full-Stack & Diseñador Web (antes era "Frontend Developer").
- **SEO local:** Madrid + toda España (remoto).
- **Tagline Hero:** `FULL-STACK DEVELOPER & WEB DESIGNER`
- **Headline:** `DE LA IDEA / AL DEPLOY`
- **Sin precios en la web** (presupuesto a medida tras llamada).

---

## Tokens de diseño (copiar de `src/utils/constants.js`)

```js
COLORS.bgPrimary    '#0F1419'   // fondo secciones impares
COLORS.bgSecondary  '#141B24'   // fondo secciones pares
COLORS.accentCyan   '#00D9FF'   // acento principal (eyebrows, CTAs, barras)
COLORS.accentGreen  '#10B981'   COLORS.accentAmber  '#F59E0B'
COLORS.accentPurple '#8B5CF6'   COLORS.accentPink   '#EC4899'
COLORS.accentOrange '#F97316'
COLORS.textWhite '#FFFFFF'  textLight '#E2E8F0'  textMuted '…0.72'  textDim '…0.45'

FONTS.heading "'Sora', sans-serif"     // títulos
FONTS.body    "'Inter', sans-serif"    // cuerpo
FONTS.mono    '"JetBrains Mono", monospace'  // eyebrows, stacks, meta
```

Regla de color: **CYAN** = acentos pequeños · **WHITE** = titulares · **LIGHT** =
cuerpo · **MUTED/DIM** = secundario. Ver `docs/03_DISENO_SISTEMA.md`.

---

## Índice de documentación

| Si vas a trabajar en… | Leer |
|----------------------|------|
| **Empezar sesión / estado actual** | `docs/08_ESTADO_ACTUAL.md` + `HANDOFF.md` |
| **Qué es, posicionamiento, proyectos** | `docs/01_PROYECTO.md` |
| **Arquitectura, estructura, rutas, build** | `docs/02_ARQUITECTURA.md` |
| **Diseño, tokens, componentes** | `docs/03_DISENO_SISTEMA.md` |
| **Convenciones de código** | `docs/04_REGLAS_Y_CONVENCIONES.md` |
| **Copy, contenido, dónde editar cada texto** | `docs/05_CONTENIDO_Y_COPY.md` |
| **SEO, AEO, schema, keywords** | `docs/06_SEO_AEO.md` |
| **Pendientes y próximos pasos** | `docs/07_HOJA_DE_RUTA.md` |

---

## Comandos

```bash
npm run dev      # desarrollo (Vite)
npm run build    # build de producción → dist/
npm run preview  # previsualizar el build
```

## URLs

```
Producción:  https://sergiolab.es
Proyectos:   https://oudh.sergiolab.es · https://casadelsurf.vercel.app · https://inmobiliariamarinacarranque.es
4º (oculto): https://tools.sergiolab.es  (Laboratorio de IA, published:false hasta montarlo)
```

> Contacto público = solo email (info@sergiolab.es). El teléfono NO se publica.
