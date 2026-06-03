# 02 · Arquitectura

## Stack
- **Build:** Vite 5 (`vite.config.js`)
- **UI:** React 18 (SPA) + `react-router-dom` v6
- **Estilos:** estilos inline en React leyendo tokens de `src/utils/constants.js`;
  CSS global y animaciones del hero en `src/index.css`. Tailwind 3 está instalado
  pero **solo** se usa el reset base (`@tailwind base/components/utilities`).
- **Animaciones:** GSAP + IntersectionObserver propio (`useScrollAnimations`).
- **Formularios:** Formspree (sin backend).
- **Deploy:** estático — `npm run build` genera `dist/` (se sube a Hostinger por
  File Manager/FTP). `build` = `vite build && node scripts/prerender.js`.
- **Prerender SEO:** `scripts/prerender.js` inyecta contenido estático crawlable en
  `dist/index.html` tras el build (ver `docs/06_SEO_AEO.md`). Imprescindible para SEO.

## Estructura de carpetas
```
index.html                  # <head> con todo el SEO/AEO + JSON-LD
src/
  main.jsx                  # entry → monta <App/>
  App.jsx                   # router + orden de secciones de la home
  index.css                 # reset, tokens CSS, animaciones, estilos del hero/nav
  utils/
    constants.js            # COLORS, FONTS, FONT_SIZES, BREAKPOINTS, CAROUSEL ← fuente de tokens
    animations.js  api.js  validators.js
  hooks/
    useScrollAnimations.js  # reveal on scroll (añade .is-visible)
    useCarousel.js  useScrollTo.js  useMediaQuery.js  useIntersection.js
  context/
    NavigationContext.jsx   # estado del menú móvil
  data/                     # ← TODO el contenido editable
    projects.js services.js navigation.js whyMe.js credentials.js
    howItWorks.js faq.js testimonials.js stack.js
  components/
    common/                 # Button, Container, SectionHeader, LoadingSpinner,
                            # Navigation, AnimatedBackground
    layouts/                # MainLayout, LegalLayout
    sections/
      Hero.jsx  TechStack.jsx  WhyMe.jsx  HowItWorks.jsx
      Stack.jsx  Testimonials.jsx  FAQ.jsx
      Portfolio/ (Portfolio, PortfolioCarousel, ProjectCard)
      Services/  (Services, ServiceCard)
      Contact/   (Contact, ContactForm)
      Footer.jsx
  pages/                    # Privacy, Cookies, Terms (rutas legales)
scripts/
  prerender.js              # post-build: inyecta HTML SEO crawlable en dist/index.html
public/                     # robots.txt, sitemap.xml, favicon.svg, .htaccess, assets/
```

## Orden de la home (`src/App.jsx`)
```
Hero → Portfolio → Services → WhyMe (Sobre mí) → Stack → HowItWorks (Proceso)
→ Testimonials → FAQ → Contact → Footer
```
El Hero y el Portfolio se cargan de inmediato; el resto va con `React.lazy` +
`Suspense` para mejorar el LCP.

## Rutas (react-router)
```
/         → HomePage (todas las secciones, navegación por anclas #id)
/privacy  → Política de privacidad
/cookies  → Política de cookies
/terms    → Aviso legal
```
Las secciones de la home NO son rutas: se navega por ancla (`#portfolio`,
`#servicios`, `#proceso`, `#sobre-mi`, `#faq`, `#contacto`).

## Patrón de un componente de sección
```jsx
export default function Seccion() {
  const ref = useRef(null)
  useScrollAnimations(ref)          // reveal on scroll
  return (
    <section ref={ref} id="ancla" style={{ background: COLORS.bgPrimary, padding: '...' }}>
      <Container>
        <SectionHeader eyebrow="…" title="…" subtitle="…" />
        {/* contenido mapeado desde src/data/*.js */}
      </Container>
      <style>{`@media (max-width: 900px) { … }`}</style>  {/* responsive puntual */}
    </section>
  )
}
```

## Notas
- Fondos alternos: `bgPrimary` (#0F1419) y `bgSecondary` (#141B24) para ritmo visual.
- El responsive se resuelve con bloques `<style>` locales + `clamp()` en los tamaños.
- `AnimatedBackground` se monta una vez en `App` por detrás de todo (`z-index`).
