# 01 · El Proyecto — SergioLab Portfolio

## Qué es
Portfolio profesional de **SergioLab**, desarrollador full-stack y diseñador web
con base en Madrid que trabaja con clientes de toda España. La web (`sergiolab.es`)
vende servicios de creación de webs, e-commerce y sistemas a medida para pymes, y
al mismo tiempo es la mejor prueba de su trabajo.

## Objetivo de negocio
Que un dueño de pyme que aterriza en la web piense *"esta es la persona que quiero
que me haga la web"* y rellene el formulario de contacto o reserve una llamada.
La web debe transmitir profesionalidad de estudio/agencia boutique, no de freelance
improvisado.

## Posicionamiento (decidido 2026-06-02)
- **Rol:** Desarrollador Full-Stack & Diseñador Web.
- **Foco geográfico SEO:** Madrid como ancla local + toda España en remoto.
- **Precios:** NO se muestran en la web. Presupuesto cerrado tras llamada inicial.
- **Diferenciales:** diseño 100% a medida (sin plantillas), software propio sin
  comisiones por venta, el cliente es dueño de su web y sus datos, SEO/AEO real e
  informe mensual de métricas.

## Datos de contacto / marca
- **Nombre real:** Sergio Contreras · **Marca:** SergioLab
- **Email:** info@sergiolab.es  ← única vía de contacto pública (el teléfono NO se publica)
- **Ubicación:** Madrid · Remoto / Híbrido
- **LinkedIn:** linkedin.com/in/sergiocontreras-dev · **GitHub:** github.com/Ponzialcubo
- **Dominio:** https://sergiolab.es · **Laboratorio IA:** tools.sergiolab.es (pendiente de montar)
- **Formulario:** Formspree (`https://formspree.io/f/xkoeqgpz`)

## Los 3 proyectos del portfolio (reales)

### 1. Oudh & Co — E-commerce de perfumería premium
- **URL:** https://oudh.sergiolab.es · **Badge:** DEMO EN VIVO
- Tienda online de perfumería árabe. Stack: Next.js 14 + WooCommerce REST API +
  Stripe + NextAuth + Resend + Zustand + SWR + Anthropic (Claude) + jsPDF + Recharts.
- **Capacidades:** catálogo con filtros, carrito, checkout Stripe (PaymentIntents,
  webhooks, cupones), chatbot con IA (Claude), panel admin (pedidos, productos,
  clientes, devoluciones, marketing/newsletter/cupones), facturas PDF, analítica,
  emails transaccionales, multiidioma, SEO/AEO.
- Repo local: `c:\Users\ponzi\Desktop\oudh-co-frontend` (ver su `HANDOFF.md`).

### 2. Casa del Surf — Motor de reservas para alojamiento
- **URL:** https://www.casadelsurf.es · **Badge:** EN PRODUCCIÓN
- Surf house en Somo (Cantabria). Stack: Next.js 14 + Supabase + NextAuth + Stripe
  + Resend + SWR + Zustand + Framer Motion + Recharts.
- **Capacidades:** reservas por rango de fechas (no stock), pagos Stripe
  (depósito/completo), panel de gestión pensado para personal no técnico,
  calendario visual, sincronización anti-overbooking con OTAs (Booking, etc.),
  analítica de ingresos.
- Repo local: `c:\Users\ponzi\Desktop\casadelsurf` (ver su `docs/` y `HANDOFF.md`).

### 3. Inmobiliaria Marina Carranque — Portal inmobiliario
- **URL:** https://inmobiliariamarinacarranque.es · **Badge:** PROYECTO REAL
- Cliente real en producción. Stack: React + WordPress + base de datos.
- **Capacidades:** búsqueda avanzada, filtros dinámicos, fichas detalladas con
  galería, contacto directo con agentes, base de datos en tiempo real.

### 4. Laboratorio de IA — Agentes & Chatbots (PENDIENTE DE MONTAR)
- **URL futura:** https://tools.sergiolab.es · **Badge:** PRÓXIMAMENTE
- Plataforma propia de herramientas con IA: skills, servidores MCP, plugins y
  agentes sobre la API de Anthropic + chatbots de ventas para e-commerce.
- Está **preparado en los datos** con `published: false`: NO se muestra en la web
  todavía. Para publicarlo cuando esté montado: pon la URL real en `href` y cambia
  `published` a `true` en `src/data/projects.js`. Aparecerá solo en el carrusel.

> Los datos de cada proyecto viven en `src/data/projects.js`. Para añadir/editar
> un proyecto se edita ese array (campos: category, title, description, highlights,
> tech, accent, buttonText, href, badge, bg, published). Solo los proyectos con
> `published !== false` se exportan a la web.

## Pendiente del cliente (Sergio)
- ✅ **Currículum integrado** (2026-06-03): `stack.js` y `credentials.js` verificados
  con el CV; contacto y schema con nombre real, teléfono, LinkedIn y GitHub.
- **Testimonios reales:** los de `src/data/testimonials.js` siguen como placeholders
  (atados a los 3 proyectos) hasta tener reseñas verdaderas de los clientes.
- **og-image.jpg** (1200×630) en `public/` para compartir en redes.
- **Vídeo del hero:** `public/assets/hero-video.mp4` (+ versión `.webm` recomendada).
