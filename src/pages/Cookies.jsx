import { COLORS, FONTS } from '../utils/constants'
import LegalLayout from '../components/layouts/LegalLayout'

const H2 = ({ children }) => (
  <h2 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 700, color: COLORS.textWhite, margin: '40px 0 14px', lineHeight: 1.2 }}>
    {children}
  </h2>
)
const H3 = ({ children }) => (
  <h3 style={{ fontFamily: FONTS.heading, fontSize: 18, fontWeight: 700, color: COLORS.textWhite, margin: '24px 0 10px' }}>
    {children}
  </h3>
)
const P = ({ children }) => (
  <p style={{ fontFamily: FONTS.body, fontSize: 15, color: '#E2E8F0', lineHeight: 1.8, margin: '0 0 14px' }}>
    {children}
  </p>
)
const Li = ({ children }) => (
  <li style={{ fontFamily: FONTS.body, fontSize: 15, color: '#E2E8F0', lineHeight: 1.8, marginBottom: 6 }}>
    {children}
  </li>
)

export default function Cookies() {
  return (
    <LegalLayout>
      <p style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.accentCyan, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 12px' }}>
        Legal
      </p>
      <h1 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: COLORS.textWhite, margin: '0 0 10px', lineHeight: 1.1 }}>
        Política de Cookies
      </h1>
      <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textDim, margin: '0 0 48px' }}>
        Última actualización: 25 de mayo de 2025
      </p>

      <H2>1. Qué son las cookies</H2>
      <P>
        Las cookies son pequeños ficheros de texto almacenados en tu dispositivo cuando visitas
        un sitio web. Se usan para recordar información sobre tu visita y mejorar la experiencia.
      </P>

      <H2>2. Tipos de cookies que usamos</H2>

      <H3>📌 Cookies Esenciales (siempre activas)</H3>
      <P>
        <strong style={{ color: COLORS.textWhite }}>Función:</strong> Mantener el sitio funcionando correctamente.<br />
        <strong style={{ color: COLORS.textWhite }}>Consentimiento:</strong> No necesario — son obligatorias.<br />
        <strong style={{ color: COLORS.textWhite }}>Duración:</strong> Sesión.
      </P>

      <H3>📊 Cookies Analíticas — Google Analytics</H3>
      <P>
        <strong style={{ color: COLORS.textWhite }}>Función:</strong> Analizar cómo usas el sitio (páginas, tiempo, dispositivo).<br />
        <strong style={{ color: COLORS.textWhite }}>Consentimiento:</strong> Sí — opt-in requerido.<br />
        <strong style={{ color: COLORS.textWhite }}>Proveedor:</strong> Google LLC.<br />
        <strong style={{ color: COLORS.textWhite }}>Cookies:</strong> _ga, _ga_*, _gid.<br />
        <strong style={{ color: COLORS.textWhite }}>Duración:</strong> 26 meses.
      </P>

      <H3>⚙️ Cookies de Preferencia</H3>
      <P>
        <strong style={{ color: COLORS.textWhite }}>Función:</strong> Recordar si aceptaste el banner de cookies.<br />
        <strong style={{ color: COLORS.textWhite }}>Cookie:</strong> sergiolab-consent.<br />
        <strong style={{ color: COLORS.textWhite }}>Duración:</strong> 1 año.
      </P>

      <H3>🎯 Cookies de Marketing</H3>
      <P>
        Actualmente <strong style={{ color: COLORS.textWhite }}>no usamos</strong> cookies de marketing
        (Facebook Pixel, LinkedIn Insight, etc.). Se añadirán con consentimiento explícito si se implementan.
      </P>

      <H2>3. Gestión del consentimiento</H2>
      <P>Al visitar el sitio por primera vez, un banner te permite:</P>
      <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
        <Li>✅ <strong style={{ color: COLORS.textWhite }}>Aceptar todo:</strong> Activa analytics y preferencias</Li>
        <Li>❌ <strong style={{ color: COLORS.textWhite }}>Rechazar:</strong> Solo cookies esenciales</Li>
      </ul>
      <P>Puedes cambiar tu preferencia en cualquier momento contactando en info@sergiolab.es.</P>

      <H2>4. Cómo desactivar cookies en tu navegador</H2>
      <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
        <Li><strong style={{ color: COLORS.textWhite }}>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</Li>
        <Li><strong style={{ color: COLORS.textWhite }}>Firefox:</strong> Configuración → Privacidad → Cookies y datos del sitio</Li>
        <Li><strong style={{ color: COLORS.textWhite }}>Safari:</strong> Preferencias → Privacidad → Gestionar datos del sitio</Li>
        <Li><strong style={{ color: COLORS.textWhite }}>Edge:</strong> Configuración → Privacidad, búsqueda y servicios</Li>
      </ul>
      <P style={{ color: COLORS.textDim, fontStyle: 'italic' }}>
        ⚠️ Desactivar cookies esenciales puede afectar el funcionamiento del sitio.
      </P>

      <H2>5. Proveedores de terceros</H2>
      <P>
        <strong style={{ color: COLORS.textWhite }}>Google Analytics (Google LLC):</strong><br />
        Política de privacidad:{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.accentCyan }}>
          policies.google.com/privacy
        </a>
      </P>

      <H2>6. Contacto</H2>
      <P>
        Preguntas sobre cookies:{' '}
        <a href="mailto:info@sergiolab.es" style={{ color: COLORS.accentCyan }}>info@sergiolab.es</a>
      </P>
    </LegalLayout>
  )
}
