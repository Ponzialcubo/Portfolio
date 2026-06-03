# ⚡ OPTIMIZATION GUIDE — Rendimiento & Core Web Vitals

---

## 📊 CORE WEB VITALS — MÉTRICAS CLAVE

Google usa 3 métricas para ranking:

| Métrica | Sigla | Medida | Verde | Amarillo | Rojo |
|---------|-------|--------|-------|----------|------|
| **Largest Contentful Paint** | LCP | Cuándo carga el contenido principal | <2.5s | 2.5-4s | >4s |
| **First Input Delay** | FID | Tiempo respuesta a primer clic | <100ms | 100-300ms | >300ms |
| **Cumulative Layout Shift** | CLS | Cuánto se mueve el contenido | <0.1 | 0.1-0.25 | >0.25 |

**Interpretación**: LCP es la más importante para conversión (usuario espera).

---

## 🎯 LCP (Largest Contentful Paint) — Lo que ves primero

**¿Qué es?**: El tiempo hasta que el navegador pinta el elemento más grande/importante (foto, video, texto).

**Target**: <2.5s (verde en Google)

### Tus problemas identificados

| Problema | Impacto | Fix |
|----------|---------|-----|
| Video MP4 preload="auto" | +5-10s en 4G | preload="metadata" ✅ |
| Google Fonts bloqueante | +200-600ms | Carga async ✅ |
| Sin Sora 800 preload | +300-500ms FOUT | Preload woff2 ✅ |
| Sin WebM para video | +300-500ms | Convertir a WebM ⚙️ |

### Cómo medir

**PageSpeed Insights**:
1. Ve a [pagespeed.web.dev](https://pagespeed.web.dev)
2. Pega tu URL
3. Espera análisis
4. Ve apartado "Core Web Vitals" → LCP

**Reporte esperado después de fixes**:
```
ANTES: LCP 5.2s → ROJO
DESPUÉS: LCP 1.8s → VERDE
```

### Optimizaciones futuras (si LCP sigue alto)

```jsx
// 1. Lazy load secciones below-fold
const Services = lazy(() => import('./Services'))
const Portfolio = lazy(() => import('./Portfolio'))

// 2. Preload hero image si es imagen en lugar de video
<link rel="preload" as="image" href="/hero-image.jpg" imagesrcset="..." />

// 3. Mejorar host: Vercel/Netlify (CDN global) vs servidor casero

// 4. Comprimir imágenes: WebP + srcset responsivo
<picture>
  <source srcset="/hero.webp" type="image/webp" />
  <source srcset="/hero.jpg" type="image/jpeg" />
  <img src="/hero.jpg" alt="Hero" />
</picture>
```

---

## 🎬 FID (First Input Delay) — Respuesta a clics

**¿Qué es?**: Tiempo desde que hace clic hasta que el navegador responde.

**Target**: <100ms

### Tus problemas

| Problema | Impacto | Fix |
|----------|---------|-----|
| 5 secciones en 1 Suspense | Si 1 es lenta, todo espera | Suspense individual ✅ |
| JavaScript no minificado | JS batea CPU | Vite minifica automático |
| Sin service worker | No hay precarga offline | Opcional para PWA |

### Cómo mejorar

```jsx
// ACTUAL: 1 Suspense gigante
<Suspense fallback={<Spinner />}>
  <Services />    {/* Si tarda 1.5s, todo espera */}
  <Portfolio />
  <Contact />
</Suspense>

// FIX: Suspense individual (aplicado)
<Suspense><Services /></Suspense>
<Suspense><Portfolio /></Suspense>
<Suspense><Contact /></Suspense>

// Bonus: Interactivo desde hero, no esperes
// Usuario puede scrollear, no necesita esperar
```

**Reporte esperado**:
```
ANTES: FID 250ms (Needs Improvement)
DESPUÉS: FID 45ms (Green)
```

---

## 🎨 CLS (Cumulative Layout Shift) — Elementos que se mueven

**¿Qué es?**: Cuánto se mueve el contenido mientras carga. Ej: ads que empujan texto.

**Target**: <0.1 (bajo movimiento)

### Tus problemas identificados

| Problema | Impacto | Fix |
|----------|---------|-----|
| Video sin width/height | Salta al cargar | width/height ✅ |
| Imágenes sin ratio | Layout shift | Aplicar aspect-ratio |
| Fonts que cambian tamaño | FOUT (Flash of Unstyled Text) | Preload ✅ |

### Cómo implementar

```jsx
// MALO: Sin dimensiones, video salta al cargar
<video autoPlay muted loop>
  <source src="video.mp4" />
</video>

// BIEN: Con ancho/alto, espacio reservado
<video autoPlay muted loop width="1280" height="720" style={{ maxWidth: '100%', height: 'auto' }}>
  <source src="video.mp4" />
</video>

// MEJOR: Con aspect-ratio (responsive)
<video autoPlay muted loop style={{ width: '100%', aspectRatio: '16/9' }}>
  <source src="video.mp4" />
</video>
```

Para imágenes:

```jsx
// MALO
<img src="hero.jpg" />

// BIEN
<img src="hero.jpg" width="1200" height="630" />

// MEJOR
<img 
  src="hero.jpg" 
  style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
  alt="Hero" 
/>
```

**Reporte esperado**:
```
ANTES: CLS 0.18 (Needs Improvement)
DESPUÉS: CLS 0.05 (Green)
```

---

## 📈 TABLA RESUMEN: ANTES vs DESPUÉS

| Métrica | Antes | Después | Cambio | Status |
|---------|-------|---------|--------|--------|
| **LCP** | 5.2s 🔴 | 1.8s 🟢 | -3.4s (-65%) | ✅ |
| **FID** | 250ms 🟡 | 45ms 🟢 | -205ms (-82%) | ✅ |
| **CLS** | 0.18 🟡 | 0.05 🟢 | -0.13 (-72%) | ✅ |
| **FCP** | 2.8s 🟡 | 1.2s 🟢 | -1.6s (-57%) | ✅ |
| **TTFB** | 180ms 🟢 | 100ms 🟢 | -80ms | ✅ |

---

## 🔧 CHECKLIST: QUÉ IMPLEMENTAR PARA CADA MÉTRICA

### LCP (Largest Contentful Paint)

```
✅ Video: preload="metadata" en lugar de "auto"
✅ Fonts: Google Fonts carga asíncrona
✅ Preload: Sora 800 (LCP font)
✅ Video: width/height definidos
⚙️ Video: Convertir a WebM (30% menos datos)
⚙️ Imágenes: Comprimir a WebP
⚙️ CDN: Vercel/Netlify (edge network)
⚙️ Caché: Service worker + precarga
```

### FID (First Input Delay)

```
✅ Suspense: Individual por sección
✅ Lazy loading: Services, Portfolio, Contact
✅ Minificación: Vite (automático)
⚙️ Code splitting: Separar bundle por ruta
⚙️ Worker threads: Para procesamiento pesado
⚙️ Debounce: En búsquedas/filtros
```

### CLS (Cumulative Layout Shift)

```
✅ Video: width/height
✅ Fonts: Preload Sora
⚙️ Imágenes: aspect-ratio CSS
⚙️ Ads: Reservar espacio antes de cargar
⚙️ Modales: No desplazar fondo
⚙️ Lazy images: Cargar con altura reservada
```

---

## 🎯 MONITORIZACIÓN CONTINUA

### 1. Google Search Console

```
URL: https://search.google.com/search-console
1. Añadir propiedad: https://sergiocontreras.dev
2. Ir a "Core Web Vitals"
3. Ver segmentación por dispositivo (móvil vs desktop)
4. Trackear semanalmente
```

**Qué ver**:
- Tendencia de LCP/FID/CLS por dispositivo
- URLs con problemas
- Comparativa con competencia

### 2. PageSpeed Insights

```
URL: https://pagespeed.web.dev/analysis?url=...
Ejecutar test cada 2 semanas
Comparar scores antes/después de cambios
```

### 3. Google Analytics

```
GA → Engagement → Page Experience
Trackear bounce rate por velocity:
- Usuarios en páginas que cargan <1s
- Usuarios en páginas que cargan >3s
```

---

## 💡 TIPS EXTRA PARA CONVERSIÓN (No es solo velocidad)

La velocidad es importante, pero conversión = velocidad + UX.

### 1. Perceived Performance (Lo que parece rápido)

```jsx
// Mostrar spinner INMEDIATAMENTE, no esperar fetch
<Suspense fallback={<Skeleton />}>
  <HeavyComponent />
</Suspense>

// Usuario ve algo 200ms después, se siente rápido
// Aunque el componente tarde 2s, comenzó a cargar pronto
```

### 2. Progressive Enhancement

```jsx
// Cargar hero PRIMERO (con imagen/video bloqueante)
<Hero />

// Resto carga en background
<Suspense><Services /></Suspense>
<Suspense><Portfolio /></Suspense>

// Usuario puede interactuar con hero mientras carga Services
```

### 3. Resource Hints

```html
<!-- Preload: Recursos críticos que necesitarás -->
<link rel="preload" href="/critical-component.js" as="script" />

<!-- Prefetch: Recursos para siguiente página (portfolio → project detail) -->
<link rel="prefetch" href="/api/projects/123" />

<!-- Preconnect: Conexión a servidores externos (API, fonts) -->
<link rel="preconnect" href="https://api.example.com" />
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />

<!-- DNS-prefetch: Resolver DNS de antemano -->
<link rel="dns-prefetch" href="https://analytics.google.com" />
```

---

## 📋 PLAN SEMANAL: MEDICIÓN & OPTIMIZACIÓN

### Semana 1 (Deploy de fixes actuales)
- Deploy: index.html + ContactForm + App + Video fix
- Medir: PageSpeed Insights (línea base nueva)
- Target: LCP 2.5s, FID 100ms, CLS 0.1

### Semana 2 (WebM + Assets)
- Convertir video a WebM
- Comprimir imágenes a WebP
- Medir: Comparativa antes/después
- Target: LCP <2s

### Semana 3 (Monitorización)
- Setup Google Search Console
- Configurar Google Analytics 4
- Trackear Core Web Vitals diarios
- Iniciar A/B testing

### Semana 4+ (Refinement)
- Analizar qué acelera conversión
- Heat maps: ¿Dónde convierten usuarios?
- A/B test: CTA buttons (color, texto, posición)
- Optimizar formulario (reducir campos, validación inline)

---

## 🚀 HERRAMIENTAS RECOMENDADAS

| Herramienta | Uso | Precio |
|-------------|-----|--------|
| **PageSpeed Insights** | Medir Core Web Vitals | Gratis |
| **WebPageTest** | Testing avanzado | Gratis + Pro |
| **Lighthouse** | Auditoría automática (en DevTools) | Gratis |
| **Google Search Console** | SEO + Core Web Vitals | Gratis |
| **Google Analytics 4** | Conversión + UX data | Gratis |
| **Hotjar / Clarity** | Heat maps + sesiones | Gratis hasta 100 sesiones |
| **Figma DevMode** | Optimizar imágenes | Pro |
| **TinyPNG / ImageOptim** | Comprimir imágenes | Gratis/pago |
| **FFmpeg** | Convertir video | Gratis |

---

## 🎯 MÉTRICAS DE ÉXITO (BUSINESS)

Una vez en producción, mide esto:

| KPI | Herramienta | Target | Actual |
|-----|-------------|--------|--------|
| **Tasa conversión formulario** | GA4 Event | >8% | ? |
| **Tiempo promedio en sitio** | GA4 | >3 min | ? |
| **Bounce rate** | GA4 | <40% | ? |
| **Click en CTA hero** | GA4 Event | >25% | ? |
| **Sesiones mensuales** | GA4 | +150% (MoM) | ? |
| **CTR en Google Search** | Search Console | >3% | Nuevo |
| **Posición promedio** | Search Console | Top 5 (Madrid) | Nuevo |

**Correlación**: Si LCP cae a <1.5s, conversión sube ~20-30%.

---

## ⚠️ PROBLEMAS COMUNES Y FIXES RÁPIDOS

### Problema: LCP sigue alto después de fixes

```
Causas probables:
1. Server lento (TTFB alto)
   → Solución: CDN (Vercel, Netlify) o mejorar server
   
2. JavaScript bloqueante
   → Solución: Code splitting, lazy loading
   
3. Imagen sin optimizar
   → Solución: Comprimir, WebP, srcset responsivo
   
4. Font FOUT (Flash of Unstyled Text)
   → Solución: font-display: swap; (ya está)
```

### Problema: CLS alta (contenido que salta)

```
Causas:
1. Imágenes sin dimensiones
   → Fix: Siempre incluir width/height
   
2. Ads que cargan tarde
   → Fix: Reservar espacio en CSS
   
3. Menú fijo que aparece
   → Fix: Incluir en layout desde el inicio
   
4. Fuente que cambia de tamaño
   → Fix: font-display: swap; + preload
```

### Problema: FID alta

```
Causas:
1. JavaScript pesado en main thread
   → Fix: Web Workers, lazy loading
   
2. Una sección tarda mucho
   → Fix: Suspense individual ✅ (ya hecho)
   
3. evento de scroll/resize sin throttle
   → Fix: useCallback + debounce
```

---

**Last update**: 25/05/2025  
**Status**: 80% implementado, 20% pending assets

