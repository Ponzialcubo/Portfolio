// ── Proyectos ───────────────────────────────────────────────────────────────
// Calidad sobre cantidad: cada proyecto es un sistema completo, no una landing.
// `highlights` resume las capacidades técnicas reales.
//
// Para PUBLICAR un proyecto que está `published: false`, ponle la URL real en
// `href` y cambia `published` a true (o elimina la propiedad). Aparecerá solo
// en el carrusel; el resto del código no necesita tocarse.

const allProjects = [
  {
    id: 1,
    category: 'E-COMMERCE · IA',
    title: 'Oudh & Co — Perfumería Premium',
    description:
      'Tienda online completa de perfumería árabe: catálogo con filtros, carrito, checkout con Stripe, chatbot con IA (Claude), panel de administración y facturación automática en PDF.',
    highlights: [
      'Pasarela de pagos Stripe',
      'Chatbot IA (Claude)',
      'Panel admin completo',
      'Facturas PDF + analytics',
    ],
    tech: ['Next.js 14', 'Stripe', 'WooCommerce', 'IA'],
    accent: '#00D9FF',
    buttonText: 'Ver demo en vivo',
    href: 'https://oudh.sergiolab.es',
    badge: 'DEMO EN VIVO',
    bg: 'radial-gradient(ellipse 80% 80% at 25% 40%, rgba(0,217,255,0.09) 0%, transparent 60%), linear-gradient(140deg, #050e18 0%, #091624 100%)',
  },
  {
    id: 2,
    category: 'RESERVAS · HOTEL',
    title: 'Casa del Surf — Motor de Reservas',
    description:
      'Sistema de reservas y pagos para una surf house: disponibilidad por fechas, cobro con Stripe, panel de gestión para el personal y sincronización anti-overbooking con Booking y otras OTAs.',
    highlights: [
      'Reservas por rango de fechas',
      'Pagos Stripe (depósito)',
      'Panel anti-overbooking',
      'Analítica de ingresos',
    ],
    tech: ['Next.js 14', 'Supabase', 'Stripe', 'MotoPress'],
    accent: '#8B5CF6',
    buttonText: 'Ver proyecto',
    href: 'https://casadelsurf.vercel.app',
    badge: 'EN DESARROLLO',
    bg: 'radial-gradient(ellipse 80% 80% at 25% 40%, rgba(139,92,246,0.09) 0%, transparent 60%), linear-gradient(140deg, #07040f 0%, #0e0818 100%)',
  },
  {
    id: 3,
    category: 'INMOBILIARIA',
    title: 'Inmobiliaria Marina Carranque',
    description:
      'Portal de propiedades con búsqueda avanzada, filtros dinámicos, fichas detalladas con galería, contacto directo con agentes y base de datos en tiempo real. Cliente real en producción.',
    highlights: [
      'Búsqueda + filtros avanzados',
      'Fichas con galería',
      'Base de datos en tiempo real',
      'Contacto directo con agentes',
    ],
    tech: ['React', 'WordPress', 'Base de datos'],
    accent: '#F59E0B',
    buttonText: 'Ver sitio real',
    href: 'https://inmobiliariamarinacarranque.es',
    badge: 'PROYECTO REAL',
    bg: 'radial-gradient(ellipse 80% 80% at 25% 40%, rgba(245,158,11,0.09) 0%, transparent 60%), linear-gradient(140deg, #0f0a02 0%, #181005 100%)',
  },
  {
    // ⏳ PENDIENTE DE MONTAR — no se muestra hasta `published: true`.
    // Cuando esté listo: pon la URL en `href` y cambia published a true.
    id: 4,
    category: 'IA · AUTOMATIZACIÓN',
    title: 'Laboratorio de IA — Agentes & Chatbots',
    description:
      'Plataforma de herramientas con IA: skills, servidores MCP, plugins y agentes sobre la API de Anthropic, además de chatbots de ventas para e-commerce. Proyecto propio en construcción.',
    highlights: [
      'Agentes con API de Anthropic',
      'Servidores MCP + plugins',
      'Skills a medida',
      'Chatbots de ventas',
    ],
    tech: ['API Anthropic', 'MCP', 'Node.js', 'Next.js'],
    accent: '#22D3EE',
    buttonText: 'Próximamente',
    href: 'https://tools.sergiolab.es',
    badge: 'PRÓXIMAMENTE',
    bg: 'radial-gradient(ellipse 80% 80% at 25% 40%, rgba(34,211,238,0.09) 0%, transparent 60%), linear-gradient(140deg, #04101a 0%, #07181f 100%)',
    published: false,
  },
]

// Solo los proyectos publicados llegan a la web.
export const projects = allProjects.filter(p => p.published !== false)

// Lista completa (incluye los no publicados) por si se necesita en otro sitio.
export const allProjectsRaw = allProjects
