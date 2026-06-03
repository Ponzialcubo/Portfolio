import { COLORS, FONTS } from '../utils/constants'
import LegalLayout from '../components/layouts/LegalLayout'

const H2 = ({ children }) => (
  <h2 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 700, color: COLORS.textWhite, margin: '40px 0 14px', lineHeight: 1.2 }}>
    {children}
  </h2>
)
const P = ({ children, style }) => (
  <p style={{ fontFamily: FONTS.body, fontSize: 15, color: '#E2E8F0', lineHeight: 1.8, margin: '0 0 14px', ...style }}>
    {children}
  </p>
)
const Li = ({ children }) => (
  <li style={{ fontFamily: FONTS.body, fontSize: 15, color: '#E2E8F0', lineHeight: 1.8, marginBottom: 6 }}>
    {children}
  </li>
)

export default function Privacy() {
  return (
    <LegalLayout>
      <p style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.accentCyan, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 12px' }}>
        Legal
      </p>
      <h1 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: COLORS.textWhite, margin: '0 0 10px', lineHeight: 1.1 }}>
        Política de Privacidad
      </h1>
      <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textDim, margin: '0 0 48px' }}>
        Última actualización: 25 de mayo de 2025
      </p>

      <H2>1. Responsable del tratamiento</H2>
      <P>
        <strong style={{ color: COLORS.textWhite }}>Empresa:</strong> SergioLab<br />
        <strong style={{ color: COLORS.textWhite }}>Correo:</strong> info@sergiolab.es<br />
        <strong style={{ color: COLORS.textWhite }}>Ubicación:</strong> Madrid, España<br />
        <strong style={{ color: COLORS.textWhite }}>Web:</strong> https://sergiolab.es
      </P>

      <H2>2. Qué datos recogemos</H2>
      <P>Recopilamos los siguientes datos cuando usas nuestro sitio:</P>
      <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
        <Li><strong style={{ color: COLORS.textWhite }}>Formulario de contacto:</strong> Nombre, email, tipo de proyecto, mensaje</Li>
        <Li><strong style={{ color: COLORS.textWhite }}>Google Analytics:</strong> Páginas visitadas, tiempo en sitio, dispositivo, ubicación aproximada</Li>
        <Li><strong style={{ color: COLORS.textWhite }}>Cookies:</strong> Preferencias de navegación, consentimiento</Li>
      </ul>

      <H2>3. Base legal (RGPD)</H2>
      <P>Procesamos tus datos bajo estas bases legales:</P>
      <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
        <Li><strong style={{ color: COLORS.textWhite }}>Consentimiento:</strong> Al rellenar el formulario o aceptar cookies</Li>
        <Li><strong style={{ color: COLORS.textWhite }}>Interés legítimo:</strong> Mejorar nuestro servicio</Li>
        <Li><strong style={{ color: COLORS.textWhite }}>Obligación legal:</strong> Cumplir con regulaciones de privacidad</Li>
      </ul>

      <H2>4. Cómo usamos tus datos</H2>
      <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
        <Li>Responder a tu consulta y enviar presupuesto</Li>
        <Li>Comunicaciones sobre nuestros servicios</Li>
        <Li>Analizar comportamiento del usuario (Google Analytics)</Li>
        <Li>Mejorar la experiencia del sitio</Li>
        <Li>Cumplir obligaciones legales</Li>
      </ul>

      <H2>5. Duración del almacenamiento</H2>
      <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
        <Li><strong style={{ color: COLORS.textWhite }}>Formulario de contacto:</strong> 2 años</Li>
        <Li><strong style={{ color: COLORS.textWhite }}>Google Analytics:</strong> 26 meses (política Google)</Li>
        <Li><strong style={{ color: COLORS.textWhite }}>Cookies:</strong> Sesión (esenciales) · 2 años (analíticas)</Li>
      </ul>

      <H2>6. Tus derechos (RGPD)</H2>
      <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
        <Li><strong style={{ color: COLORS.textWhite }}>Acceso:</strong> Conocer qué datos tenemos sobre ti</Li>
        <Li><strong style={{ color: COLORS.textWhite }}>Rectificación:</strong> Corregir datos incorrectos</Li>
        <Li><strong style={{ color: COLORS.textWhite }}>Supresión:</strong> Eliminar tus datos (derecho al olvido)</Li>
        <Li><strong style={{ color: COLORS.textWhite }}>Portabilidad:</strong> Recibir tus datos en formato legible</Li>
        <Li><strong style={{ color: COLORS.textWhite }}>Oposición:</strong> Rechazar el tratamiento</Li>
      </ul>
      <P>
        Para ejercer estos derechos, contáctanos en{' '}
        <a href="mailto:info@sergiolab.es" style={{ color: COLORS.accentCyan }}>info@sergiolab.es</a>.
        También puedes reclamar ante la <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.accentCyan }}>AEPD</a>.
      </P>

      <H2>7. Seguridad</H2>
      <P>
        Aplicamos medidas técnicas y organizativas (HTTPS, cifrado) para proteger tus datos.
        No cedemos ni vendemos información a terceros sin tu consentimiento expreso.
      </P>

      <H2>8. Cambios en esta política</H2>
      <P>
        Nos reservamos el derecho a actualizar esta política. Cambios significativos
        serán comunicados por email.
      </P>
    </LegalLayout>
  )
}
