# 03 · Sistema de Diseño

Fuente única de tokens: **`src/utils/constants.js`** (espejada en variables CSS
de `src/index.css`). No hardcodear colores/fuentes: importar de ahí.

## Colores
```js
// Fondos
bgPrimary    '#0F1419'   // secciones "impares"
bgSecondary  '#141B24'   // secciones "pares" (ritmo visual alterno)
bgCard       'rgba(255,255,255,0.025)'
'#080D12'                // footer

// Acentos (uno por sección/elemento)
accentCyan   '#00D9FF'   ← principal (eyebrows, CTAs, barras, checks)
accentGreen  '#10B981'   accentAmber  '#F59E0B'   accentPurple '#8B5CF6'
accentPink   '#EC4899'   accentOrange '#F97316'

// Texto
textWhite '#FFFFFF'  textLight '#E2E8F0'  textMuted 'rgba(226,232,240,.72)'
textDim 'rgba(226,232,240,.45)'
border 'rgba(255,255,255,.08)'  borderHover 'rgba(255,255,255,.18)'
```

### Regla semántica de color (respetar SIEMPRE)
- **CYAN** → solo acentos pequeños: eyebrows, checkmarks, barras, palabras clave ≤16px.
- **WHITE** → titulares y títulos de tarjeta.
- **LIGHT (#E2E8F0)** → texto de cuerpo principal.
- **MUTED** → descripciones / secundario.
- **DIM** → meta, etiquetas muy pequeñas.

Patrón de acento por componente: borde `${accent}22`, fondo hover `${accent}08`,
barra/realce `${accent}` con opacidad. Cada tarjeta lleva su propio `accent`.

## Tipografía
```
Sora (700/800)          → titulares (h1, h2, títulos de tarjeta)
Inter (400/500/600)     → cuerpo, descripciones, formularios
JetBrains Mono (400/500)→ eyebrows, stacks de tecnología, meta/labels
```
Escala (`FONT_SIZES` / variables `--fs-*`): h1 `clamp(52px,8vw,96px)`,
h2 `clamp(32px,5vw,64px)`, h3 20px, lead 18px, body 14px, large 16px, small 12px,
mono 11px, label 9px. Usar `clamp()` para fluidez.

## Componentes comunes reutilizables
- **`<Container>`** — ancho máximo + padding lateral. Envolver el contenido de cada sección.
- **`<SectionHeader eyebrow title subtitle align maxSubtitleWidth style />`** — cabecera
  estándar (eyebrow mono cyan + h2 Sora uppercase + subtítulo). Usar en toda sección nueva.
- **`<Button>`**, **`<LoadingSpinner>`**, **`<AnimatedBackground>`**.

## Patrón de tarjeta estándar
```js
{
  background: 'rgba(255,255,255,0.025)',
  border: `1.5px solid ${accent}22`,   // hover: ${accent}55
  borderRadius: 12-14,
  padding: 'clamp(20px, 3vh, 32px)',
  // hover: transform translateY(-3/-4px) + boxShadow con el accent
}
```
Barra de acento: superior `linear-gradient(to right, ${accent}88, ${accent}00)`
o lateral izquierda 3px.

## Animaciones
- **Entrada hero:** clases `.anim-fade` + delays `.d-0…d-580` (en `index.css`).
- **Reveal on scroll:** hook `useScrollAnimations(ref)` añade visibilidad al entrar en viewport.
- **Glitch del titular:** `@keyframes glitchIn` (aberración cromática cyan/rojo).
- Respetar `prefers-reduced-motion` al añadir animaciones nuevas.

## Accesibilidad (ya implementado, mantener)
- Skip-link `.skip-link`, `:focus-visible` global con outline cyan.
- Botones con `aria-expanded`/`aria-controls` (menú móvil, acordeón FAQ).
- SVGs decorativos con `aria-hidden="true"`; imágenes/secciones con landmarks
  (`<header> <main> <section> <footer> <figure>`).
