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
    metaDescription: 'Caso de estudio: portal inmobiliario con React y WordPress, búsqueda avanzada, filtros dinámicos y fichas con galería. Cliente real en producción. Desarrollado por SergioLab.',
    category: 'Inmobiliaria',
    accent: '#F59E0B',
    liveUrl: 'https://inmobiliariamarinacarranque.es',
    badge: 'PROYECTO REAL',
    overview:
      'Portal inmobiliario real, en producción para un cliente de Madrid. El objetivo era dar a la agencia una presencia digital profesional donde los clientes puedan buscar y filtrar propiedades directamente, sin depender de portales de terceros que cobran comisión por cada lead.',
    challenge:
      'La agencia necesitaba una web donde los potenciales compradores pudieran buscar propiedades con filtros (precio, zona, tipo), ver fichas completas con galería de fotos y contactar directamente con el agente, todo sin intermediarios.',
    solution:
      'Se desarrolló un portal con React en el frontend y WordPress + WooCommerce como CMS headless, permitiendo al equipo de la agencia añadir y editar propiedades desde un panel conocido. La búsqueda avanzada y los filtros dinámicos se resuelven en el frontend para una experiencia fluida, con la base de datos consultada en tiempo real.',
    results: [
      'Portal con fichas completas de propiedades y galería de imágenes',
      'Búsqueda avanzada y filtros dinámicos por precio, zona y tipo',
      'Consulta de base de datos en tiempo real',
      'Formulario de contacto directo con cada agente',
      'CMS editable: el equipo gestiona el catálogo sin código',
      'SEO optimizado para búsquedas inmobiliarias locales',
    ],
    techStack: [
      { label: 'Frontend', value: 'React 18' },
      { label: 'CMS', value: 'WordPress (headless)' },
      { label: 'Base de datos', value: 'MySQL (vía WordPress REST API)' },
      { label: 'Estilos', value: 'CSS personalizado + GSAP' },
      { label: 'Formularios', value: 'Formspree' },
      { label: 'Deploy', value: 'Hostinger' },
    ],
    seoNote: 'SEO local Madrid. Schema.org RealEstateAgent. Sitemap dinámico de propiedades.',
  },
]
