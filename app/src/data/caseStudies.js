// ── Casos de estudio ─────────────────────────────────────────────────────────
// Cada entrada corresponde a un proyecto del portfolio y amplía los datos
// básicos de projects.js con contenido rico para las páginas /proyectos/[slug].
// El slug debe coincidir con la ruta definida en App.jsx.

export const caseStudies = [
  {
    slug: 'oudh-co',
    projectId: 1,
    title: 'Oudh & Co — E-commerce de Perfumería Premium',
    metaTitle: 'Oudh & Co · E-commerce con IA y Stripe | SergioLab',
    metaDescription: 'Caso de estudio: tienda online de perfumería árabe con Next.js, Stripe, chatbot con IA (Claude) y panel de administración completo. Desarrollado por SergioLab.',
    category: 'E-Commerce · IA',
    accent: '#00D9FF',
    liveUrl: 'https://oudh.sergiolab.es',
    badge: 'DEMO EN VIVO',
    overview:
      'Tienda online completa de perfumería árabe premium. El objetivo era demostrar que una pyme puede tener un e-commerce serio, sin comisiones por venta, con una experiencia de compra tan cuidada como la de las grandes marcas.',
    challenge:
      'El cliente necesitaba un e-commerce completo que pudiera gestionar él mismo sin conocimientos técnicos, con pagos reales mediante tarjeta y un sistema de soporte al cliente que no requiriera personal disponible 24/7.',
    solution:
      'Se desarrolló una tienda Next.js 14 con backend propio: catálogo, variantes, pedidos, clientes y cupones sobre una base de datos PostgreSQL (Prisma como ORM), sin depender de plugins ni de servicios de terceros. Checkout nativo de Stripe (PaymentIntents + webhook) con precios calculados en servidor, panel de administración completo y un chatbot de ventas con IA (API de Claude) que responde preguntas sobre los productos, recomienda fragancias y guía al usuario hasta el carrito. Todo autoalojado en un VPS propio con Docker.',
    results: [
      'Checkout completo con Stripe (tarjeta, Apple Pay, Google Pay)',
      'Chatbot IA que responde preguntas y guía la compra las 24h',
      'Panel de administración: pedidos, productos, clientes, devoluciones',
      'Facturación automática en PDF con cada pedido',
      'Newsletter y gestión de cupones desde el panel',
      'Analítica de ventas con gráficos en tiempo real',
    ],
    techStack: [
      { label: 'Framework', value: 'Next.js 14 (App Router)' },
      { label: 'Base de datos', value: 'PostgreSQL + Prisma (backend propio)' },
      { label: 'Pagos', value: 'Stripe (PaymentIntents + Webhooks)' },
      { label: 'IA', value: 'API de Anthropic (Claude)' },
      { label: 'Auth', value: 'NextAuth.js v4 (credenciales + Google, bcrypt)' },
      { label: 'Emails', value: 'Resend' },
      { label: 'Estado/datos', value: 'Zustand + SWR' },
      { label: 'Infraestructura', value: 'VPS propio · Docker + Nginx Proxy Manager' },
    ],
    seoNote: 'SEO técnico + schema.org Product/Organization. Rendimiento optimizado para Core Web Vitals en verde.',
  },
  {
    slug: 'casa-del-surf',
    projectId: 2,
    title: 'Casa del Surf — Motor de Reservas para Alojamiento',
    metaTitle: 'Casa del Surf · Motor de Reservas y Pagos | SergioLab',
    metaDescription: 'Caso de estudio: motor de reservas en producción para surf house con Next.js 14, Supabase y Stripe. Panel anti-overbooking, sincronización con OTAs y analítica de ingresos. Desarrollado por SergioLab.',
    category: 'Reservas · Hotel',
    accent: '#8B5CF6',
    liveUrl: 'https://www.casadelsurf.es',
    badge: 'EN PRODUCCIÓN',
    overview:
      'Casa del Surf es el primer Surf House de España, en Somo (Cantabria), con 8 habitaciones. Se reemplazó su web estática por una plataforma de gestión completa: motor de reservas online con pago, panel para personal no técnico y sincronización anti-overbooking con OTAs (Holidu/Booking).',
    challenge:
      'Centralizar reservas que llegaban por teléfono, OTAs y web propia evitando el doble booking, con un panel de administración extremadamente sencillo para personal no técnico.',
    solution:
      'Motor de reservas por rangos de fechas (no por stock): la disponibilidad es solapamiento de fechas, con garantía a nivel de base de datos (constraint EXCLUDE GIST) que hace imposible el overbooking. Los precios se calculan siempre en servidor —el cliente nunca envía importes— y la reserva solo se confirma en el webhook de Stripe (payment_intent.succeeded), autolimpiando los checkouts abandonados. El panel ofrece un calendario de ocupación (arrastrar para mover reservas, clic para crear reserva manual), bloqueo de fechas y gestión de habitaciones y tarifas. La sincronización iCal con Holidu es bidireccional (importa reservas de OTAs y cierra esas fechas en la web; exporta la venta directa), con aviso por email ante choques. Incluye facturación legal (numeración correlativa atómica, IVA parametrizable, rectificativas y comisión de Stripe como gasto deducible) y un dashboard de revenue management.',
    results: [
      'Motor de reservas por rango de fechas con disponibilidad en tiempo real',
      'Pago online con Stripe (depósito o importe completo según política)',
      'Panel anti-overbooking con calendario visual para el personal',
      'Sincronización automática con OTAs (Holidu/Booking) vía iCal, anti doble-reserva',
      'Facturación legal automática (numeración correlativa, IVA, rectificativas)',
      'Dashboard de analítica de ingresos (ADR, RevPAR, ocupación, canal directo vs OTA)',
      'Emails transaccionales automáticos al huésped y al alojamiento',
      'Multi-idioma (7 idiomas) y SEO local',
    ],
    techStack: [
      { label: 'Framework', value: 'Next.js 14 (App Router, React 18, TypeScript)' },
      { label: 'Base de datos', value: 'Supabase (PostgreSQL + RLS)' },
      { label: 'Pagos', value: 'Stripe (PaymentIntents + Elements + Webhook)' },
      { label: 'Auth', value: 'NextAuth.js v4 (Google + credenciales, admin/cliente)' },
      { label: 'UI', value: 'Tailwind CSS 3.4 + shadcn/ui + Radix UI' },
      { label: 'Estado/datos', value: 'SWR + Zustand' },
      { label: 'Emails', value: 'Resend (transaccionales + factura PDF)' },
      { label: 'Animaciones', value: 'Framer Motion' },
      { label: 'Analítica', value: 'Recharts' },
      { label: 'i18n', value: 'Propio (7 idiomas)' },
      { label: 'Deploy', value: 'Vercel (CI/CD en push a master)' },
    ],
    seoNote: 'SEO local para Somo (Cantabria) y turismo surf España. Schema.org LodgingBusiness.',
  },
  {
    slug: 'inmobiliaria-marina-carranque',
    projectId: 3,
    title: 'Inmobiliaria Marina Carranque — Portal Inmobiliario',
    metaTitle: 'Inmobiliaria Marina Carranque · Portal Web Real | SergioLab',
    metaDescription: 'Caso de estudio: portal inmobiliario con Next.js 15 y backend propio (PostgreSQL + Prisma), panel de administración y subida de fotos con conversión automática a WebP. Migrado de WordPress y autoalojado en VPS. Cliente real en producción. Desarrollado por SergioLab.',
    category: 'Inmobiliaria',
    accent: '#F59E0B',
    liveUrl: 'https://inmobiliariamarinacarranque.es',
    badge: 'EN PRODUCCIÓN',
    overview:
      'Portal inmobiliario real, en producción para una agencia de Toledo y La Sagra. El objetivo era darle una presencia digital profesional —donde los clientes buscan y filtran propiedades directamente, sin portales de terceros que cobran comisión por lead— y, sobre todo, sacarla de las limitaciones del WordPress anterior pasándola a una infraestructura propia que controla al 100%.',
    challenge:
      'La agencia necesitaba que los compradores pudieran buscar propiedades con filtros (precio, zona, tipo), ver fichas completas con galería y contactar con el agente; y que su equipo, sin perfil técnico, pudiera gestionar el catálogo y subir fotos de forma rápida y sencilla, sin depender del rendimiento ni de los plugins del WordPress previo.',
    solution:
      'Se migró el portal de WordPress/Estatik a un stack propio: frontend con Next.js 15 (App Router) renderizado en servidor desde una base de datos PostgreSQL propia (Prisma como ORM), con la búsqueda y los filtros (precio, zona, tipo, características) resueltos al instante en el cliente. La agencia gestiona los inmuebles desde un panel de administración protegido con NextAuth; al subir fotos, se convierten automáticamente a WebP y se publican al momento, sin recargas ni esperas. Todas las propiedades e imágenes del WordPress anterior se trasladaron con un script de migración a medida. Todo autoalojado en un VPS propio con Docker + Nginx Proxy Manager y HTTPS de Let\'s Encrypt, con backups automáticos y sin comisiones ni dependencias de terceros.',
    results: [
      'Catálogo con fichas completas y galería, servidas desde base de datos propia',
      'Búsqueda y filtros avanzados (precio, zona, tipo, características) instantáneos',
      'Panel de administración para crear y editar inmuebles sin tocar código',
      'Subida de fotos con conversión automática a WebP, publicadas al instante',
      'Migración completa de propiedades e imágenes desde WordPress',
      'Autoalojado en VPS propio (Docker) con HTTPS y backups automáticos',
      'SEO local optimizado (schema.org RealEstateAgent + sitemap)',
    ],
    techStack: [
      { label: 'Framework', value: 'Next.js 15 (App Router, React 19)' },
      { label: 'Base de datos', value: 'PostgreSQL + Prisma (backend propio)' },
      { label: 'Auth', value: 'NextAuth.js v4 (credenciales, bcrypt)' },
      { label: 'Imágenes', value: 'Subida con conversión automática a WebP (sharp)' },
      { label: 'Estilos', value: 'Tailwind CSS v3' },
      { label: 'Infraestructura', value: 'VPS propio · Docker + Nginx Proxy Manager · Let\'s Encrypt' },
      { label: 'Migración', value: 'Script a medida desde WordPress/Estatik' },
    ],
    seoNote: 'SEO local para Toledo y La Sagra. Schema.org RealEstateAgent. Sitemap de propiedades.',
  },
]
