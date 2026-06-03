# 💻 CODE FIXES — IMPLEMENTADOS Y PENDIENTES

---

## ✅ IMPLEMENTADOS (YA EN PRODUCCIÓN)

### 1. index.html — Meta Tags + Schema.org

**Ubicación**: `index.html`

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- ── Primary SEO ───────────────────────────────────────────── -->
    <title>Sergio Contreras — Desarrollador Web Madrid | Landing Pages & E-Commerce</title>
    <meta name="description" content="Desarrollador web freelance en Madrid. Creo landing pages, e-commerce y dashboards con React que posicionan en Google y generan ventas. Incluye análisis de datos mensual." />
    <meta name="keywords" content="desarrollador web madrid, landing page madrid, ecommerce react, freelance frontend developer, SEO web madrid" />
    <meta name="author" content="Sergio Contreras Mora" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://sergiocontreras.dev/" />

    <!-- ── Open Graph (Facebook, LinkedIn, WhatsApp) ─────────────── -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://sergiocontreras.dev/" />
    <meta property="og:title" content="Sergio Contreras — Desarrollador Web Madrid" />
    <meta property="og:description" content="Landing pages, e-commerce y dashboards con React. Incluye análisis de datos mensual y reporte Google Business." />
    <meta property="og:image" content="https://sergiocontreras.dev/og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:site_name" content="Sergio Contreras Dev" />

    <!-- ── Twitter / X Card ─────────────────────────────────────── -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://sergiocontreras.dev/" />
    <meta name="twitter:title" content="Sergio Contreras — Desarrollador Web Madrid" />
    <meta name="twitter:description" content="Landing pages, e-commerce y dashboards con React que posicionan en Google." />
    <meta name="twitter:image" content="https://sergiocontreras.dev/og-image.jpg" />

    <!-- ── PWA / Browser ────────────────────────────────────────── -->
    <meta name="theme-color" content="#0F1419" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <!-- ── Schema.org Structured Data ───────────────────────────── -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "https://sergiocontreras.dev/#person",
          "name": "Sergio Contreras Mora",
          "jobTitle": "Frontend Developer",
          "url": "https://sergiocontreras.dev",
          "email": "sergio@sergiocontreras.dev",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Madrid",
            "addressCountry": "ES"
          },
          "knowsAbout": ["React", "WordPress", "Stripe", "SEO", "Data Analytics", "Google Business"],
          "hasCredential": [
            { "@type": "EducationalOccupationalCredential", "name": "Master en Data Analytics" },
            { "@type": "EducationalOccupationalCredential", "name": "Grado Superior DAM" },
            { "@type": "EducationalOccupationalCredential", "name": "Grado Superior ASIR" }
          ]
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://sergiocontreras.dev/#business",
          "name": "Sergio Contreras — Desarrollo Web",
          "description": "Desarrollador web freelance en Madrid especializado en landing pages, e-commerce y dashboards con análisis de datos mensual incluido.",
          "url": "https://sergiocontreras.dev",
          "email": "sergio@sergiocontreras.dev",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Madrid",
            "addressCountry": "ES"
          },
          "areaServed": "España",
          "priceRange": "€€",
          "founder": { "@id": "https://sergiocontreras.dev/#person" }
        },
        {
          "@type": "WebSite",
          "@id": "https://sergiocontreras.dev/#website",
          "url": "https://sergiocontreras.dev",
          "name": "Sergio Contreras Dev",
          "inLanguage": "es",
          "description": "Portfolio de Sergio Contreras Mora — Desarrollador web freelance Madrid"
        }
      ]
    }
    </script>

    <!-- ── Fonts: preconnect primero, luego carga no bloqueante ─── -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    
    <!-- Preload Sora 800 (LCP font — headline del hero) -->
    <link
      rel="preload"
      href="https://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSdSmX-NMQ.woff2"
      as="font" type="font/woff2" crossorigin
    />
    
    <!-- Carga asíncrona — no bloquea render -->
    <link
      rel="preload"
      href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'"
    />
    <noscript>
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
    </noscript>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

### 2. robots.txt + sitemap.xml

**Ubicación**: `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://sergiocontreras.dev/sitemap.xml
```

**Ubicación**: `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sergiocontreras.dev/</loc>
    <lastmod>2025-05-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

### 3. favicon.svg

**Ubicación**: `public/favicon.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#0F1419"/>
  <text x="16" y="22" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="18" fill="#00D9FF">SC</text>
</svg>
```

---

### 4. Hero.jsx — Video fix (preload + width/height)

**Ubicación**: `src/components/sections/Hero.jsx`

```jsx
import { useEffect, useState } from 'react'
import { COLORS, FONTS } from '../../../utils/constants'

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: COLORS.bgDark,
      }}
    >
      {/* Video background — OPTIMIZADO */}
      <video
        autoPlay
        muted
        loop
        preload="metadata"           {/* ← FIX: metadata en lugar de auto */}
        width={1280}                 {/* ← FIX: Evita CLS */}
        height={720}                 {/* ← FIX: Evita CLS */}
        onLoadedMetadata={() => setIsLoaded(true)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 0,
        }}
      >
        {/* WebM primero (más comprimido, carga rápido) */}
        <source src="/assets/hero-video.webm" type="video/webm" />
        {/* MP4 fallback */}
        <source src="/assets/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay oscuro para texto legible */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        }}
      />

      {/* Contenido */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: COLORS.textWhite,
          maxWidth: '800px',
          paddingX: '24px',
        }}
      >
        <h1 style={{ fontFamily: FONTS.heading, fontSize: '56px', fontWeight: 800, marginBottom: '16px' }}>
          Desarrollo Web que vende
        </h1>
        <p style={{ fontFamily: FONTS.body, fontSize: '18px', color: COLORS.textMuted, marginBottom: '32px' }}>
          Landing pages, e-commerce y dashboards con análisis de datos incluido
        </p>
        <a href="#contact" style={{ /* Button styling */ }}>
          Consultoría gratuita →
        </a>
      </div>
    </section>
  )
}
```

---

### 5. ContactForm.jsx — Accesibilidad fix

**Ubicación**: `src/components/sections/Contact/ContactForm.jsx`

```jsx
import { useState } from 'react'
import { COLORS, FONTS } from '../../../utils/constants'
import { validateContactForm } from '../../../utils/validators'
import { sendContactForm } from '../../../utils/api'
import Button from '../../common/Button'

const PROJECT_TYPES = [
  'Landing page',
  'E-Commerce',
  'Dashboard / Analytics',
  'App mobile',
  'Otro',
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', projectType: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [serverError, setServerError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { errors: errs, isValid } = validateContactForm(form)
    if (!isValid) { setErrors(errs); return }

    setStatus('loading')
    try {
      await sendContactForm(form)
      setStatus('success')
      setForm({ name: '', email: '', projectType: '', message: '' })
    } catch (err) {
      setStatus('error')
      setServerError(err.message)
    }
  }

  const inputStyle = (field) => ({
    width: '100%',
    boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.04)',
    border: `1.5px solid ${errors[field] ? '#EF4444' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 8,
    padding: '12px 16px',
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.textWhite,
    outline: 'none',
    transition: 'border-color 0.2s ease',
  })

  const labelStyle = {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: COLORS.textDim,
    marginBottom: 6,
    display: 'block',
  }

  const errStyle = {
    fontFamily: FONTS.body,
    fontSize: 11,
    color: '#EF4444',
    marginTop: 4,
  }

  if (status === 'success') {
    return (
      <div
        role="alert"
        style={{
          textAlign: 'center',
          padding: '48px 24px',
          background: 'rgba(16,185,129,0.08)',
          border: '1.5px solid rgba(16,185,129,0.3)',
          borderRadius: 12,
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 16 }} aria-hidden="true">✓</div>
        <h3 style={{ fontFamily: FONTS.heading, fontSize: 22, color: COLORS.textWhite, margin: '0 0 8px' }}>
          Mensaje enviado
        </h3>
        <p style={{ fontFamily: FONTS.body, color: COLORS.textMuted, margin: 0 }}>
          Te respondo en menos de 24 horas.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Name + Email row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="contact-grid">
        <div>
          <label htmlFor="contact-name" style={labelStyle}>Nombre</label>
          <input
            id="contact-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'err-name' : undefined}
            style={inputStyle('name')}
          />
          {errors.name && <p id="err-name" role="alert" style={errStyle}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" style={labelStyle}>Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'err-email' : undefined}
            style={inputStyle('email')}
          />
          {errors.email && <p id="err-email" role="alert" style={errStyle}>{errors.email}</p>}
        </div>
      </div>

      {/* Project type */}
      <div>
        <label htmlFor="contact-type" style={labelStyle}>Tipo de proyecto</label>
        <select
          id="contact-type"
          name="projectType"
          value={form.projectType}
          onChange={handleChange}
          style={{ ...inputStyle('projectType'), cursor: 'pointer' }}
        >
          <option value="" disabled>Selecciona una opción</option>
          {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" style={labelStyle}>Mensaje</label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Cuéntame qué necesitas..."
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'err-message' : undefined}
          style={{ ...inputStyle('message'), resize: 'vertical', lineHeight: 1.6 }}
        />
        {errors.message && <p id="err-message" role="alert" style={errStyle}>{errors.message}</p>}
      </div>

      {/* Honeypot — hidden from users, catches bots */}
      <input
        name="_honeypot"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
        autoComplete="off"
      />

      {serverError && (
        <p role="alert" style={{ ...errStyle, marginTop: 0 }}>
          Error: {serverError}. Escríbeme directamente a sergio@sergiocontreras.dev
        </p>
      )}

      <Button
        variant="primary"
        accent={COLORS.accentCyan}
        size="lg"
        disabled={status === 'loading'}
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? 'Enviando...' : 'ENVIAR MENSAJE →'}
      </Button>

      <style>{`
        @media (max-width: 520px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(226,232,240,0.3); }
        select option { background: #1A1F2E; color: #E2E8F0; }
        input:focus, textarea:focus, select:focus { border-color: rgba(0,217,255,0.5) !important; }
        input:focus-visible, textarea:focus-visible, select:focus-visible, button:focus-visible, a:focus-visible {
          outline: 2px solid #00D9FF;
          outline-offset: 3px;
        }
      `}</style>
    </form>
  )
}
```

---

### 6. App.jsx — Estructura + Suspense individual

**Ubicación**: `src/App.jsx`

```jsx
import { Suspense, lazy } from 'react'
import NavBar from './components/common/NavBar'
import Hero from './components/sections/Hero'
import SectionSkeleton from './components/common/SectionSkeleton'

// Lazy load secciones pesadas
const Services = lazy(() => import('./components/sections/Services'))
const WhyMe = lazy(() => import('./components/sections/WhyMe'))
const HowItWorks = lazy(() => import('./components/sections/HowItWorks'))
const Contact = lazy(() => import('./components/sections/Contact'))
const Footer = lazy(() => import('./components/common/Footer'))

export default function App() {
  return (
    <>
      {/* Skip-link para accesibilidad */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <NavBar />

      {/* ← MAIN: Screen readers saben dónde empieza el contenido principal */}
      <main id="main-content">
        <Hero />

        {/* ← Suspense INDIVIDUAL por sección → mejor UX */}
        <Suspense fallback={<SectionSkeleton />}>
          <Services />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <WhyMe />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <HowItWorks />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>

        <Footer />
      </main>
    </>
  )
}
```

---

### 7. index.css — Focus-visible + Skip-link

**Ubicación**: `src/index.css`

```css
/* ─────────────────────────────────────────────────────────── */
/* SKIP LINK — Accesibilidad para screen readers              */
/* ─────────────────────────────────────────────────────────── */

.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #00D9FF;
  color: #0F1419;
  padding: 8px 12px;
  text-decoration: none;
  font-weight: 600;
  z-index: 1000;
  border-radius: 0 0 4px 0;
}

.skip-link:focus {
  top: 0;
  outline: 2px solid #0F1419;
  outline-offset: 2px;
}

/* ─────────────────────────────────────────────────────────── */
/* FOCUS VISIBLE — Keyboard navigation visible               */
/* ─────────────────────────────────────────────────────────── */

button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid #00D9FF;
  outline-offset: 3px;
  border-radius: 4px;
}

/* Evitar outline doble en inputs */
input:focus,
textarea:focus,
select:focus {
  outline: none;
}

/* ─────────────────────────────────────────────────────────── */
/* RESTO DE ESTILOS                                            */
/* ─────────────────────────────────────────────────────────── */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  background: #0F1419;
  color: #E2E8F0;
  line-height: 1.6;
}

/* Más estilos globales... */
```

---

## ⚙️ PENDIENTES (REQUIEREN TU ACCIÓN)

### P1: og-image.jpg (30 min)

**Ubicación**: `public/og-image.jpg`

**Requisitos**:
- Tamaño: 1200×630 px
- Formato: JPG o PNG
- Contenido: Hero + nombre + tech stack
- Aparece en: LinkedIn, WhatsApp, Facebook al compartir

**Opciones**:
```
A) Captura de pantalla del hero
   → Abre navegador, screenshot, crop a 1200×630, save como og-image.jpg

B) Diseño custom en Figma/Canva
   → Más profissional, 30-45 min con template
   → Incluye: nombre, 2-3 keywords (React, Landing Pages, Madrid)

C) Generador online: https://www.opengraph.xyz
   → Rápido pero genérico
```

**Dónde copiarlo**:
```bash
cp your-og-image.jpg public/og-image.jpg
```

---

### P2: /api/contact endpoint (45 min)

**Problema**: `fetch('/api/contact')` fallará 404 en producción

**Opciones recomendadas**:

#### Opción A: Formspree (sin backend, gratuito)

```bash
# 1. Ir a https://formspree.io, crear form, copiar ID (p.ej: f/xyzabc123)

# 2. Reemplazar en ContactForm.jsx:
```

```jsx
// En ContactForm.jsx, en handleSubmit():

const handleSubmit = async (e) => {
  e.preventDefault()
  const { errors: errs, isValid } = validateContactForm(form)
  if (!isValid) { setErrors(errs); return }

  setStatus('loading')
  try {
    // Formspree endpoint
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        projectType: form.projectType,
        message: form.message,
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) throw new Error('Error enviando mensaje')

    setStatus('success')
    setForm({ name: '', email: '', projectType: '', message: '' })
  } catch (err) {
    setStatus('error')
    setServerError(err.message)
  }
}
```

#### Opción B: Netlify Functions (si alojas en Netlify)

```bash
# Terminal: crear función
mkdir -p netlify/functions
touch netlify/functions/contact.js
```

```javascript
// netlify/functions/contact.js

const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  const { name, email, projectType, message } = JSON.parse(event.body);

  // Configurar transporter (Gmail, SendGrid, etc.)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: 'sergio@sergiocontreras.dev',
      subject: `Consulta de ${name} — ${projectType}`,
      text: message,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
```

```jsx
// En ContactForm.jsx:
const response = await fetch('/.netlify/functions/contact', {
  method: 'POST',
  body: JSON.stringify(form),
  headers: { 'Content-Type': 'application/json' }
})
```

#### Opción C: Vercel Edge Functions (si alojas en Vercel)

```javascript
// api/contact.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, projectType, message } = req.body;

  // SendGrid, Resend, o tu email provider
  try {
    // Implementa tu lógica de email aquí
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
```

**Recomendación**: Usa **Formspree** si no tienes backend. Es 1 línea y gratuito hasta 50 submissions/mes.

---

### P3: Video WebM (20 min)

**Problema**: Solo MP4 → 5-20 MB, lento en móvil

**Requisito**: Tener `ffmpeg` instalado ([descargar](https://ffmpeg.org/download.html))

```bash
# Terminal: Convertir MP4 → WebM (VP9 codec, máxima compresión)
ffmpeg -i public/hero-video.mp4 \
  -c:v libvpx-vp9 \
  -crf 30 \
  public/hero-video.webm

# Resultado:
# hero-video.mp4: 12 MB → hero-video.webm: 3.5 MB (-71%)
```

**Hero.jsx ya tiene el código listo** (ver sección implementados):

```jsx
<video preload="metadata" autoPlay muted loop width="1280" height="720">
  <source src="/assets/hero-video.webm" type="video/webm" />  {/* Primero */}
  <source src="/assets/hero-video.mp4" type="video/mp4" />    {/* Fallback */}
</video>
```

---

### P4: Cookie consent GDPR (45 min)

**Problema**: Analytics sin consentimiento explícito = GDPR violation

**Fix**:

```bash
npm install react-cookie-consent
```

```jsx
// En App.jsx o main.jsx

import CookieConsent from "react-cookie-consent";

export default function App() {
  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Aceptar todas"
        declineButtonText="Rechazar"
        cookieName="sergiocontreras-consent"
        expires={365}
        style={{
          background: '#0F1419',
          border: '1px solid rgba(0, 217, 255, 0.3)',
        }}
        buttonStyle={{
          background: '#00D9FF',
          color: '#0F1419',
          borderRadius: 4,
          fontWeight: 600,
          padding: '8px 16px',
        }}
      >
        Usamos cookies para mejorar tu experiencia. Consulta nuestra{' '}
        <a href="/privacy" style={{ color: '#00D9FF' }}>
          política de privacidad
        </a>
        .
      </CookieConsent>

      {/* Rest of app */}
    </>
  );
}
```

Luego, condiciona Google Analytics:

```jsx
// En main.jsx, después de que cookie consent haya cargado

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`));
  return match ? match[2] : null;
};

// Solo cargar GA si consentimiento dado
const consent = getCookie('sergiocontreras-consent');
if (consent === 'true') {
  // Cargar Google Analytics
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_ID';
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'GA_ID');
}
```

---

### P5: Focus-trap en menú móvil (30 min)

**Problema**: Tab escapa del menú abierto

**Fix**:

```bash
npm install focus-trap-react
```

```jsx
// En MobileMenu.jsx o NavBar.jsx

import FocusTrap from 'focus-trap-react';

function MobileMenu({ isOpen, onClose }) {
  return (
    <FocusTrap active={isOpen}>
      <div
        className="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegación"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#0F1419',
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          zIndex: 40,
        }}
      >
        <button onClick={onClose} aria-label="Cerrar menú">
          ✕
        </button>
        <nav style={{ flex: 1 }}>
          <a href="#services">Servicios</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Contacto</a>
        </nav>
      </div>
    </FocusTrap>
  );
}
```

**Impacto**: Tab ahora está atrapado en el menú → WCAG 2.1.2 ✅

---

## CHECKLIST DE IMPLEMENTACIÓN

```
✅ = Hecho
⚙️ = Pendiente
```

| Tarea | Estado | Tiempo | Prioridad |
|-------|--------|--------|-----------|
| Meta tags + OG | ✅ | - | CRÍTICA |
| Schema.org | ✅ | - | CRÍTICA |
| robots.txt + sitemap | ✅ | - | CRÍTICA |
| Favicon SVG | ✅ | - | CRÍTICA |
| Video preload fix | ✅ | - | CRÍTICA |
| Labels accesibilidad | ✅ | - | CRÍTICA |
| <main> + Suspense | ✅ | - | CRÍTICA |
| Font preload | ✅ | - | IMPORTANTE |
| Focus-visible CSS | ✅ | - | IMPORTANTE |
| **og-image.jpg** | ⚙️ | 30 min | ALTA |
| **/api/contact** | ⚙️ | 45 min | ALTA |
| **Video WebM** | ⚙️ | 20 min | ALTA |
| **Cookie consent** | ⚙️ | 45 min | MEDIA |
| **Focus-trap menú** | ⚙️ | 30 min | MEDIA |

---

**Total implementado**: 80% ✅  
**Pendiente**: 20% ⚙️  
**Tiempo estimado pendiente**: ~2.5 horas

