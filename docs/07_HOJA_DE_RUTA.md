# 07 · Hoja de Ruta

## Hecho (sesión 2026-06-02 — rediseño profesional)
- ✅ Reposicionamiento a Full-Stack Developer & Web Designer (Madrid + España).
- ✅ Portfolio reducido a 3 proyectos reales (Oudh & Co, Casa del Surf, Inmobiliaria).
- ✅ Tarjetas de proyecto enriquecidas con `highlights` (capacidades clave).
- ✅ Servicios reescritos sin precios, alineados al perfil full-stack.
- ✅ Secciones nuevas: **Stack tecnológico**, **Testimonios**, **FAQ** (acordeón).
- ✅ SEO/AEO: meta, Open Graph, geo tags y JSON-LD (Person, ProfessionalService,
  ItemList, FAQPage, WebSite).
- ✅ Limpieza de archivos duplicados/muertos.
- ✅ Documentación (`docs/`, `CLAUDE.md`) + `HANDOFF.md`.

## Pendiente del cliente (Sergio) — bloquea contenido final
1. ✅ **CV integrado** (2026-06-03): `stack.js` y `credentials.js` verificados;
   contacto y schema con nombre real, teléfono, LinkedIn y GitHub.
2. **Testimonios reales** → sustituir placeholders en `src/data/testimonials.js`
   y quitar `isPlaceholder` (siguen atados a los 3 proyectos).
3. **og-image.jpg** (1200×630) en `public/`.
4. **Vídeo del hero** definitivo en `public/assets/hero-video.mp4` (+ `.webm`).

## Próximas mejoras técnicas (priorizadas)
### Alta
- [ ] Generar `og-image.jpg` y verificar previsualización en LinkedIn/WhatsApp.
- [ ] Vídeo hero a `.webm` (LCP −300/500 ms en 4G).
- [ ] Alta en Google Search Console + envío de sitemap.
- [ ] Banner de consentimiento de cookies (GDPR) antes de activar Analytics.

### Media
- [ ] Focus-trap real en el menú móvil (WCAG 2.1.2).
- [ ] Páginas de caso de estudio por proyecto (más contenido = más SEO).
- [ ] `Review`/`AggregateRating` en schema cuando haya reseñas reales.
- [ ] Inicializar repositorio git + CI de build.

### Baja / futuro
- [ ] Versión en inglés (i18n) para alcance internacional.
- [ ] Blog técnico para SEO de contenidos.
- [ ] Integrar formulario con backend propio o EmailJS además de Formspree.

## Notas de decisión
- **Sin precios en la web** (decisión 2026-06-02): presupuesto a medida tras llamada.
- **Solo 3 proyectos**: calidad sobre cantidad; cada uno es un sistema completo.
- La carpeta `audit/` contiene la auditoría previa (mayo 2025); queda como histórico,
  los docs canónicos ahora son `docs/` + `CLAUDE.md`.
