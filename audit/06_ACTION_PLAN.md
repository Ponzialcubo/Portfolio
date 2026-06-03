# 🚀 ACTION PLAN — HOJA DE RUTA PRIORIZADA

---

## 📊 RESUMEN EJECUTIVO

```
Status actual: 75/100 (después de fixes críticos)
Target: 85/100 (esta semana) + 90/100 (mes 1)

Tiempo total: ~4 horas de trabajo
ROI conversión esperado: +30-50%
```

---

## 🎯 FASE 1: ESTA SEMANA (Crítica) — DEPLOY

**Impacto**: +40 SEO, +25% conversión  
**Esfuerzo**: 2 horas  
**ROI**: Altísimo — Urgente

### ✅ YA LISTO (Solo deploy)
```
□ index.html (meta tags + schema)
□ robots.txt + sitemap.xml
□ favicon.svg
□ Hero.jsx (video fix)
□ ContactForm.jsx (accesibilidad)
□ App.jsx (<main> + Suspense)
□ index.css (focus-visible)

ACCIÓN: git push → deploy a producción
TIEMPO: 15 min
```

### ⚙️ QUICK WINS (30-45 min)

#### 1. Crear og-image.jpg (30 min)
```
Opción A: Screenshot
  1. Abre tu sitio en navegador
  2. Haz screenshot del hero
  3. Crop a 1200×630px
  4. Guarda como public/og-image.jpg

Opción B: Figma rápido
  1. Figma → New design file
  2. 1200×630px artboard
  3. Fondo: #0F1419
  4. Texto: "Sergio Contreras | Developer Madrid"
  5. Color texto: #00D9FF
  6. Export como JPG
  7. Sube a public/og-image.jpg

Opción C: Canva (más fácil)
  1. Canva.com → New design
  2. Busca template "Social Media"
  3. 1200×630 (Instagram post)
  4. Customiza con tu logo + nombre
  5. Download como JPG
```

✅ **Impacto**: Compartir en LinkedIn/WhatsApp +50% clicks  
⏱️ **Tiempo**: 30 min  
🎯 **Prioridad**: ALTA

#### 2. Verificar en Google Search Console (15 min)
```
1. Ve a https://search.google.com/search-console
2. Click "Add property"
3. Pon: https://sergiocontreras.dev/
4. Verifica (método: HTML file o DNS)
5. Wait 1-2 horas → Status "verified"
6. Request indexing para homepage
```

✅ **Impacto**: Google sabe que tu sitio existe  
⏱️ **Tiempo**: 15 min  
🎯 **Prioridad**: CRÍTICA

### ⚠️ PENDIENTES SEMANA 1 (Opción quick or full)

#### Opción A: QUICK (Formspree) — 15 min
```
Sin backend, gratuito, rápido:

1. Ve a https://formspree.io
2. Sign up con Gmail
3. Create form → copia form ID (ej: f/abc123)
4. En ContactForm.jsx, cambiar endpoint:

fetch('https://formspree.io/f/YOUR_ID', { ... })

5. Deploy
6. Test: envía mensaje desde formulario
7. Recibes email en inbox
```

✅ **Ventaja**: 0 configuración backend  
⏱️ **Tiempo**: 15 min  
📊 **Desventaja**: No controlas servidor

#### Opción B: FULL (Netlify Functions) — 45 min
```
Si alojas en Netlify:

1. Crea netlify/functions/contact.js (ver 02_CODE_FIXES.md)
2. Instala nodemailer: npm install nodemailer
3. Configure env variables:
   EMAIL_USER=tu@email.com
   EMAIL_PASS=tu-app-password
4. Deploy: git push
5. Test: fetch('/.netlify/functions/contact')
```

✅ **Ventaja**: Controlas lógica  
⏱️ **Tiempo**: 45 min  
📊 **Desventaja**: Más config

**RECOMENDACIÓN**: Haz Formspree esta semana, upgradeA a backend el mes que viene.

---

## ✅ CHECKLIST SEMANA 1

```
ANTES DEL FIN DE SEMANA:
□ Deploy de cambios HTML/CSS
□ Crear og-image.jpg
□ Verificar Google Search Console
□ Implementar formulario (Formspree o Netlify)
□ Test en mobile (responsive)
□ Test en 2 navegadores (Chrome + Firefox)
□ Monitorizar Search Console 2-3 días

FINAL ESPERADO:
✅ Sitio en Google index (24-48h)
✅ Formulario funcional
✅ Meta tags visible en redes
✅ Score SEO 72/100 (vs 28 antes)
```

---

## 📅 FASE 2: SEMANA 2 (Importante) — ASSETS

**Impacto**: +12 rendimiento, -300ms LCP  
**Esfuerzo**: 1.5 horas  
**ROI**: Alto

### ⚙️ PENDIENTES SEMANA 2

#### 1. Convertir video a WebM (20 min)
```
Requisito: ffmpeg instalado
https://ffmpeg.org/download.html

Terminal (macOS/Linux):
ffmpeg -i public/hero-video.mp4 \
  -c:v libvpx-vp9 \
  -crf 30 \
  public/hero-video.webm

Windows (cmd):
ffmpeg.exe -i public\hero-video.mp4 -c:v libvpx-vp9 -crf 30 public\hero-video.webm

Resultado:
✅ hero-video.mp4 (12 MB) → hero-video.webm (3.5 MB)
✅ Mismo contenido, -71% tamaño
```

✅ **Impacto**: LCP -300ms en 4G  
⏱️ **Tiempo**: 20 min  
🎯 **Prioridad**: ALTA

#### 2. Implementar Cookie Consent (45 min)
```
npm install react-cookie-consent

En App.jsx:
import CookieConsent from "react-cookie-consent";

<CookieConsent
  location="bottom"
  buttonText="Aceptar"
  declineButtonText="Rechazar"
  cookieName="sergiocontreras-consent"
>
  Usamos cookies para analytics...
</CookieConsent>

Deploy y test:
1. Abre sitio en navegador incógnito
2. ¿Aparece banner cookies abajo?
3. Haz clic "Aceptar"
4. ¿Se va el banner?
5. Refresh página
6. ¿No aparece banner?
```

✅ **Impacto**: GDPR compliant, confianza +10%  
⏱️ **Tiempo**: 45 min  
🎯 **Prioridad**: MEDIA (legal pero no urgente)

#### 3. Focus-trap en menú móvil (30 min)
```
npm install focus-trap-react

En MobileMenu.jsx o NavBar.jsx:
import FocusTrap from 'focus-trap-react';

<FocusTrap active={isOpen}>
  <div role="dialog" aria-modal="true">
    {/* Menú items */}
  </div>
</FocusTrap>

Test:
1. Abre menú mobile (click hamburger)
2. Presiona Tab 10 veces
3. ¿Focus se queda dentro del menú?
4. ¿No escapa al fondo?
```

✅ **Impacto**: WCAG 2.1.2 compliance  
⏱️ **Tiempo**: 30 min  
🎯 **Prioridad**: MEDIA (accesibilidad)

---

## ✅ CHECKLIST SEMANA 2

```
DESPUÉS DE SEMANA 1 (con resultado de búsqueda):
□ Convertir video a WebM
□ Instalar react-cookie-consent
□ Instalar focus-trap-react
□ Deploy cambios
□ Test keyword ranking en GSC
□ Analizar sesiones iniciales en GA4
□ Medir Core Web Vitals (PageSpeed Insights)

FINAL ESPERADO:
✅ LCP <2s (verde)
✅ Video 70% más rápido
✅ Menú accesible keyboard
✅ GDPR compliant
✅ Score global 82/100
```

---

## 📈 FASE 3: SEMANA 3-4 (Monitorización) — DATA

**Impacto**: Insights para optimización  
**Esfuerzo**: 1 hora (setup)  
**ROI**: Preparar para A/B testing

### ⚙️ SETUP MONITORIZACIÓN

#### 1. Google Analytics 4 (30 min)
```
Si aún no tienes:
1. Ve a https://analytics.google.com
2. Create property → Nombre: "sergio-dev"
3. Data stream → Web → URL: https://sergiocontreras.dev
4. Copia code tracking: G-XXXXXXXXXX
5. En index.html <head>:

<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  if (getCookie('sergiocontreras-consent') === 'true') {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  }
</script>

6. Deploy
7. Espera 24h → Ver datos en GA4
```

✅ **Tracking**: Sesiones, bounce rate, conversiones  
⏱️ **Tiempo**: 30 min  
🎯 **Prioridad**: CRÍTICA (necesitas datos)

#### 2. Eventos de conversión (20 min)
```
En ContactForm.jsx, después de éxito:

if (window.gtag) {
  gtag('event', 'form_submission', {
    form_type: 'contact',
    form_location: 'contact_section'
  });
}

En App.jsx, track CTA clicks:

const handleHeroClick = () => {
  if (window.gtag) {
    gtag('event', 'cta_click', {
      cta_text: 'Consultoría gratuita',
      cta_location: 'hero'
    });
  }
  scrollToContact();
};
```

✅ **Qué mide**: Quién hace clic, quién envía mensaje  
⏱️ **Tiempo**: 20 min  
🎯 **Prioridad**: ALTA (necesitas conversiones)

#### 3. Heat Maps (Bonus) — 15 min
```
Herramienta: Hotjar (gratis hasta 100 sesiones)

1. https://www.hotjar.com → Sign up
2. Añade sitio
3. Copia tracking code
4. Pega en <head> (HTML o GA4)
5. Espera 5 sesiones
6. Ve a Heatmaps → Click recordings
7. Mira dónde hacen clic usuarios
```

✅ **Muestra**: Behavior mapping  
⏱️ **Tiempo**: 15 min setup + observación  
🎯 **Prioridad**: MEDIA (complemento)

---

## ✅ CHECKLIST SEMANA 3-4

```
DESPUÉS DE SEMANA 2:
□ Setup Google Analytics 4 (ya debería estar)
□ Crear eventos: form_submission, cta_click
□ Setup Hotjar (opcional pero recomendado)
□ Monitorizar 1-2 semanas
□ Analizar datos
□ Identificar dónde se pierden usuarios

MÉTRICAS A VER:
✓ Total sesiones/semana
✓ Bounce rate por página
✓ Time on page (cuánto tiempo en formulario)
✓ Conversion rate (quién envía form)
✓ Comportamiento usuarios (heat map)

EJEMPLO ESPERADO:
- 50-100 sesiones semana 1
- 10-20% bounce rate
- 5-10% conversión formulario
- Usuarios scroller hasta contact
```

---

## 🎯 FASE 4: MES 2+ (Optimización) — A/B TESTING

**Impacto**: +10-20% conversión con mejoras pequeñas  
**Esfuerzo**: 2-3 horas/semana  
**ROI**: Exponencial

### 💡 QUICK WINS PARA A/B TEST

#### Experimento 1: CTA Button Color (5 min)
```
Actual: Cyan (#00D9FF)
Test: Rojo (#EF4444)

Hipótesis: Rojo atrae más clics (urgencia psicológica)

Implementation:
<Button
  variant="primary"
  accent={useExperiment ? '#EF4444' : '#00D9FF'}
/>

Medir 2 semanas, comparar CTR

Resultado: Si rojo gana +15% → cambiar para todos
```

#### Experimento 2: CTA Text (5 min)
```
Actual: "ENVIAR MENSAJE →"
Opciones:
  A) "QUIERO CONSULTORÍA GRATUITA"
  B) "CONTACTARME AHORA"
  C) "EMPECEMOS"

Test 2 semanas cada uno, ver conversión.

Típicamente: Texto específico > genérico
```

#### Experimento 3: Form Fields (10 min)
```
Actual: name, email, projectType, message

Test: Reducir a:
  - name
  - email
  - message

Hipótesis: Menos campos = más completadas

Medir: drop-off rate en cada campo
```

---

## 📊 MÉTRICAS DE ÉXITO ESPERADAS

### Después de Semana 1 (Deploy)
```
✅ Google indexation: 100%
✅ Search Console: Homepage indexed
✅ Meta tags: Visible en redes
✅ Formulario: Funcional
✅ Core Web Vitals: LCP 2.5s (amarillo)
```

### Después de Semana 2 (Assets)
```
✅ Core Web Vitals: LCP 1.8s (verde)
✅ Sesiones: 50-100/semana
✅ Bounce rate: <45%
✅ Tiempo en sitio: >2 min
✅ Form views: 20-40/semana
```

### Después de Mes 1 (Monitorización)
```
✅ Sesiones: 200-300/mes
✅ Conversión formula: 5-10%
✅ Keywords ranking: Top 20 "developer madrid"
✅ Bounce rate: <40%
✅ CTR búsqueda: >2%
```

### Después de Mes 3 (Optimización)
```
✅ Sesiones: 400-600/mes
✅ Conversión: 8-12% (con A/B testing)
✅ Keywords ranking: Top 10 long-tails
✅ Posición: Top 5-10 "developer madrid"
✅ Leads: 10-15 contactos/mes
```

---

## 💰 ROI ESPERADO

### Inversión de tiempo
```
Semana 1: 2 horas
Semana 2: 1.5 horas
Semana 3-4: 1 hora (setup pasivo)
Mes 2+: 1 hora/semana (monitorización)

TOTAL PRIMERAS 4 SEMANAS: ~5-6 horas
```

### Beneficio conversión
```
Clientes típicamente:
- Tarifa freelancer: €50-150/hora
- Proyecto medio: €2,000-5,000

Con +30% conversión en mes 2:
- De 2-3 leads/mes → 5-6 leads/mes
- 1-2 proyectos extra/mes
- €2,000-5,000 extra/mes

ROI: 4-6 horas invertidas = €2,000-5,000
= €400-1,200 por hora ✅
```

---

## 🗓️ TIMELINE GLOBAL

```
ESTA SEMANA (Día 1-7)
├─ Deploy cambios
├─ Crear og-image.jpg
├─ Setup Google Search Console
├─ Implementar formulario (Formspree)
└─ Verificar en mobile

SEMANA 2 (Día 8-14)
├─ Convertir video a WebM
├─ Cookie consent
├─ Focus-trap menú
├─ Medir PageSpeed
└─ Analizar tráfico inicial

SEMANA 3-4 (Día 15-28)
├─ Setup Google Analytics
├─ Crear eventos conversión
├─ Setup Hotjar heatmaps
├─ Analizar comportamiento
└─ Identificar oportunidades

MES 2+ (Día 29+)
├─ A/B Testing CTA
├─ A/B Testing Copy
├─ Optimizar formulario
├─ Crear contenido (blog)
└─ Link building local

RESULTADO ESPERADO:
SEMANA 1: Ranking inicial en Google
SEMANA 2: +50 sesiones
MES 2: +300 sesiones, 5-10 leads
MES 3: Posición Top 10, 10-15 leads
```

---

## 📋 DECISIONES POR TOMAR

### Semana 1
- [ ] ¿Formspree o backend propio? (RECOMENDACIÓN: Formspree)
- [ ] ¿Dónde hostas? Netlify/Vercel/otro? (Afecta deployment)

### Semana 2
- [ ] ¿Implementar analytics ya? (SÍ, así ves datos desde día 1)

### Semana 3
- [ ] ¿Empezar blog para SEO? (SÍ, después de ajustar formulario)

### Mes 2
- [ ] ¿Invertir en paid ads (Google Ads, LinkedIn)?  
  (DESPUÉS de optimizar tasa conversión natural)

---

## 🚀 COMANDOS RÁPIDOS (Terminal)

```bash
# Deploy (si usas Netlify)
git add .
git commit -m "feat: SEO + accesibilidad + performance"
git push origin main
# Netlify deploy automático en 1-2 min

# Instalar dependencias pendientes
npm install react-cookie-consent focus-trap-react

# Convertir video a WebM
ffmpeg -i public/hero-video.mp4 -c:v libvpx-vp9 -crf 30 public/hero-video.webm

# Verificar lighthouse local
npm run build  # Si tienes build script
# Luego: lighthouse https://tu-sitio
```

---

## 🎯 OBJETIVOS POR MES

### Mes 1: FOUNDATION (Días 1-30)
```
GOAL: Sitio indexado, conversión inicial funcionando
✅ Deploy completo semana 1
✅ Google indexación semana 2
✅ Primeros 100+ sesiones semana 2-3
✅ 5-10 conversiones (form submissions)
✅ Score SEO 75+/100
```

### Mes 2: OPTIMIZATION (Días 31-60)
```
GOAL: Mejoras pequeñas, +20% conversión
✅ A/B Testing CTA color/text
✅ Optimización formulario (menos campos)
✅ Posición ranking: Top 20 keywords
✅ 200-300 sesiones
✅ 15-20 conversiones
✅ Score SEO 82+/100
```

### Mes 3: GROWTH (Días 61-90)
```
GOAL: Posicionamiento fuerte, inbound steady
✅ Top 10 ranking for long-tails
✅ Contenido blog (2-3 posts)
✅ 400+ sesiones
✅ 25-35 conversiones
✅ 8-12 leads calificados
✅ Score SEO 85+/100
```

---

## ⚠️ TRAMPA COMÚN

```
❌ NO hagas:
- Obsesionarte con tráfico día 1
- Cambiar todo basado en 10 sesiones
- Esperar a que Google rank antes de mejorar conversión
- Descuidar accesibilidad por velocidad

✅ SÍ haz:
- Paciencia: SEO toma 6-12 semanas
- Decisiones basadas en datos: 2-4 semanas data
- Mejorar conversión mientras esperas ranking
- Atrapar leads ahora para futuro
```

---

## 📞 SOPORTE & PRÓXIMOS PASOS

### Si tienes dudas:
```
1. Revisa los documentos de referencia:
   - 01_ISSUES_DETALLADOS.md
   - 02_CODE_FIXES.md
   - 03_OPTIMIZATION_GUIDE.md

2. Test con herramientas:
   - PageSpeed Insights
   - axe DevTools
   - Google Search Console

3. Documentación oficial:
   - developers.google.com/search
   - www.w3.org/WAI/WCAG21
   - React docs
```

---

**Este plan es tu hoja de ruta para los próximos 90 días.**  
**Sigue el orden, mide resultados, itera.**

**El objetivo**: De invisible en Google (28/100) a competitivo (85+/100) en 1 mes.

**Good luck! 🚀**

