# 04 · Reglas y Convenciones de Código

## 1. Estilos: inline + tokens
- Estilizar con el atributo `style={{ … }}` leyendo de `COLORS`/`FONTS`
  (`src/utils/constants.js`). **No** usar clases de utilidad de Tailwind en
  componentes (Tailwind solo está para el reset base).
- El responsive puntual va en un bloque `<style>{`@media …`}</style>` al final del
  componente, con clases sobre `className`. Para fluidez usar `clamp()`.
- Animaciones globales / del hero → `src/index.css`.

## 2. Contenido como datos, no como JSX
- Todo texto/listado editable vive en `src/data/*.js` exportando un array/objeto.
- Los componentes **mapean** esos datos; no llevan copy hardcodeado salvo
  microcopy estructural (botones fijos, labels de UI).
- Añadir un proyecto/servicio/FAQ = editar el array de datos, no el componente.

## 3. Estructura de un componente de sección
```jsx
import { useRef } from 'react'
import { COLORS, FONTS } from '../../utils/constants'
import Container from '../common/Container'
import SectionHeader from '../common/SectionHeader'
import { datos } from '../../data/datos'
import { useScrollAnimations } from '../../hooks/useScrollAnimations'

export default function Seccion() {
  const ref = useRef(null)
  useScrollAnimations(ref)
  return (
    <section ref={ref} id="ancla" style={{ background: COLORS.bgPrimary, padding: '…' }}>
      <Container>
        <SectionHeader eyebrow="…" title="…" subtitle="…" />
        {datos.map(d => <Card key={d.id} item={d} />)}
      </Container>
    </section>
  )
}
```

## 4. Convenciones
- **Idioma del producto:** español (es-ES) en todo el copy visible.
- **Acentos:** cada elemento/tarjeta declara su `accent` en los datos.
- **IDs de ancla:** en español y estables (`#portfolio`, `#servicios`, `#proceso`,
  `#sobre-mi`, `#stack`, `#testimonios`, `#faq`, `#contacto`). Si cambias un id,
  actualiza `src/data/navigation.js`.
- **Lazy loading:** secciones below-the-fold con `React.lazy` + `Suspense` en `App.jsx`.
- **Imports relativos** según profundidad (ojo con `../../` vs `../../../` en `sections/X/`).

## 5. Git
- Commits en inglés con prefijo: `feat:` `fix:` `refactor:` `docs:` `style:` `chore:`.
- El proyecto **no es un repo git todavía** (estado 2026-06-02). Si se inicializa,
  añadir `.gitignore` (ya existe) y no commitear `dist/` ni `node_modules/`.

## 6. Antes de dar por terminada una sesión
1. `npm run build` debe pasar limpio.
2. Si tocaste FAQ → sincroniza el JSON-LD de `index.html` (ver `06_SEO_AEO.md`).
3. Si tocaste rutas/anclas → revisa `navigation.js` y `sitemap.xml`.
4. Actualiza `docs/08_ESTADO_ACTUAL.md` con qué hiciste y qué queda.

## 7. Qué NO hacer
- No reintroducir proyectos inventados (solo los 3 reales).
- No publicar testimonios con `isPlaceholder` como si fueran reales.
- No exponer claves de terceros en el cliente (este front no las usa, mantenerlo así).
- No romper la regla semántica de color (cyan solo para acentos pequeños).
