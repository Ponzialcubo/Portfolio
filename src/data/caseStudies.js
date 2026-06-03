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
      'Se desarrolló una tienda Next.js 14 conectada a WooCommerce como catálogo, con checkout nativo de Stripe (PaymentIntents), panel de administración completo y un chatbot de ventas con IA (API de Claude) capaz de responder preguntas sobre los productos, recomendar fragancias y guiar al usuario hasta el carrito.',
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
      { label: 'Catálogo', value: 'WooCommerce REST API' },
      { label: 'Pagos', value: 'Stripe (PaymentIntents + Webhooks)' },
      { label: 'IA', value: 'API de Anthropic (Claude)' },
      { label: 'Auth', value: 'NextAuth.js v4' },
      { label: 'Emails', value: 'Resend' },
      { label: 'Estado', value: 'Zustand + SWR' },
      { label: 'Deploy', value: 'Vercel' },
    ],
    seoNote: 'SEO técnico + schema.org Product/Organization. Rendimiento optimizado para Core Web Vitals en verde.',
  },
  {
    slug: 'casa-del-surf',
    projectId: 2,
    title: 'Casa del Surf — Motor de Reservas para Alojamiento',
    metaTitle: 'Casa del Surf · Motor de Reservas y Pagos | SergioLab',
    metaDescription: 'Caso de estudio: sistema de reservas y pagos para surf house con Next.js, Supabase y Stripe. Panel anti-overbooking y analítica de ingresos. Desarrollado por SergioLab.',
    category: 'Reservas · Hotel',
    accent: '#8B5CF6',
    liveUrl: 'https://casadelsurf.vercel.app',
    badge: 'EN DESARROLLO',
    overview:
      'Casa del Surf es el primer Surf House de España, situado en Somo (Cantabria). El proyecto reemplaza su web WordPress estática por un sistema de gestión completo: reservas online con pago, panel para el personal y sincronización con los canales externos para evitar solapamientos.',
    challenge:
      'Un alojamiento que recibe reservas por teléfono, Booking.com y su propia web necesita un sistema centralizado que evite el doble booking. Además, el personal no es técnico, por lo que el panel de gestión debía ser extremadamente sencillo.',
    solution:
      'Se construyó sobre Next.js 14 con Supabase como base de datos en tiempo real. El motor de reservas funciona por rangos de fechas (no por stock), lo que evita colisiones. El pago se hace con Stripe (depósito o importe completo según política). El panel de administración permite al personal bloquear fechas, marcar reservas de otros canales y ver el calendario de ocupación con dos clics.',
    results: [
      'Motor de reservas por rango de fechas con disponibilidad en tiempo real',
      'Pago online con Stripe (depósito o importe completo)',
      'Panel anti-overbooking con calendario visual para el personal',
      'Emails transaccionales automáticos al huésped y al alojamiento',
      'Gestión de reservas externas (Booking, teléfono) desde el panel',
      'Dashboard de analítica de ingresos por temporada',
    ],
    techStack: [
      { label: 'Framework', value: 'Next.js 14 (App Router, TypeScript)' },
      { label: 'Base de datos', value: 'Supabase (PostgreSQL)' },
      { label: 'Pagos', value: 'Stripe (PaymentIntents)' },
      { label: 'Auth', value: 'NextAuth.js v4 (admin + cliente)' },
      { label: 'UI', value: 'Tailwind CSS + shadcn/ui + Radix UI' },
      { label: 'Emails', value: 'Resend' },
      { label: 'Animaciones', value: 'Framer Motion' },
      { label: 'Deploy', value: 'Vercel' },
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
