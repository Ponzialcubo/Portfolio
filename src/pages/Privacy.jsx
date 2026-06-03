import { COLORS, FONTS } from '../utils/constants'
import LegalLayout from '../components/layouts/LegalLayout'

const Section = ({ num, title, children }) => (
  <div style={{ marginBottom: 40 }}>
    <h2 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(18px, 2.2vw, 22px)', fontWeight: 700, color: COLORS.textWhite, margin: '0 0 14px', lineHeight: 1.3 }}>
      {num}. {title}
    </h2>
    {children}
  </div>
)
const P = ({ children }) => (
  <p style={{ fontFamily: FONTS.body, fontSize: 15, color: '#CBD5E1', lineHeight: 1.8, margin: '0 0 12px' }}>{children}</p>
)
const Ul = ({ children }) => (
  <ul style={{ paddingLeft: 20, margin: '0 0 12px' }}>{children}</ul>
)
const Li = ({ children }) => (
  <li style={{ fontFamily: FONTS.body, fontSize: 15, color: '#CBD5E1', lineHeight: 1.8, marginBottom: 6 }}>{children}</li>
)
const Strong = ({ children }) => <strong style={{ color: COLORS.textWhite }}>{children}</strong>
const Cyan = ({ href, children }) => <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ color: COLORS.accentCyan, textDecoration: 'underline' }}>{children}</a>

export default function Privacy() {
  return (
    <LegalLayout>
      <p style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.accentCyan, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 12px' }}>Legal · RGPD</p>
      <h1 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: COLORS.textWhite, margin: '0 0 8px', lineHeight: 1.1 }}>
        Política de Privacidad
      </h1>
      <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textDim, margin: '0 0 48px' }}>
        Última actualización: 3 de junio de 2026
      </p>

      <Section num={1} title="Responsable del tratamiento">
        <P>En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales (LOPDGDD), te informamos:</P>
        <Ul>
          <Li><Strong>Responsable:</Strong> Sergio Contreras (SergioLab)</Li>
          <Li><Strong>Email:</Strong> <Cyan href="mailto:info@sergiolab.es">info@sergiolab.es</Cyan></Li>
          <Li><Strong>Dirección:</Strong> Madrid, España</Li>
          <Li><Strong>Sitio web:</Strong> <Cyan href="https://sergiolab.es">https://sergiolab.es</Cyan></Li>
        </Ul>
      </Section>

      <Section num={2} title="Datos que recopilamos">
        <P><Strong>Formulario de contacto:</Strong> nombre, dirección de correo electrónico, tipo de proyecto, presupuesto orientativo y mensaje libre. Estos datos los proporcionas voluntariamente.</P>
        <P><Strong>Cookies de análisis (solo con tu consentimiento):</Strong> Google Analytics 4 recopila datos técnicos agregados como páginas visitadas, duración de la sesión, tipo de dispositivo y ubicación aproximada (nivel ciudad). No se recogen datos identificativos.</P>
        <P><Strong>Cookies esenciales:</Strong> almacenamos en <code>localStorage</code> tu preferencia de consentimiento de cookies para no mostrarte el aviso en cada visita. No es posible desactivarlas sin que el sitio deje de funcionar correctamente.</P>
      </Section>

      <Section num={3} title="Base legal del tratamiento (RGPD, art. 6)">
        <Ul>
          <Li><Strong>Consentimiento (art. 6.1.a):</Strong> formulario de contacto y cookies analíticas. Puedes retirar tu consentimiento en cualquier momento.</Li>
          <Li><Strong>Interés legítimo (art. 6.1.f):</Strong> análisis de rendimiento y mejora del servicio.</Li>
          <Li><Strong>Obligación legal (art. 6.1.c):</Strong> cuando sea requerido por normativa fiscal o de protección de datos.</Li>
        </Ul>
      </Section>

      <Section num={4} title="Finalidad del tratamiento">
        <Ul>
          <Li>Responder a tu consulta y enviarte un presupuesto o propuesta personalizada.</Li>
          <Li>Comunicaciones relacionadas con la prestación del servicio contratado.</Li>
          <Li>Análisis de rendimiento del sitio web (solo con consentimiento).</Li>
          <Li>Cumplimiento de obligaciones legales y fiscales.</Li>
        </Ul>
      </Section>

      <Section num={5} title="Conservación de los datos">
        <Ul>
          <Li><Strong>Formulario de contacto:</Strong> durante el proceso de consulta/contratación y hasta 3 años después del último contacto, o el plazo legal que corresponda.</Li>
          <Li><Strong>Datos de facturación:</Strong> 5 años según la normativa tributaria española.</Li>
          <Li><Strong>Google Analytics:</Strong> 14 meses (configuración por defecto de GA4). Datos anonimizados.</Li>
          <Li><Strong>Preferencia de cookies:</Strong> 1 año (renovable).</Li>
        </Ul>
      </Section>

      <Section num={6} title="Destinatarios y transferencias internacionales">
        <P>No cedemos ni vendemos tus datos a terceros con fines comerciales. Podemos compartirlos con:</P>
        <Ul>
          <Li><Strong>Formspree Inc.</Strong> (EE. UU.): gestión del formulario de contacto. Acogido al marco de adecuación EU-US Data Privacy Framework.</Li>
          <Li><Strong>Google LLC</Strong> (EE. UU.): Google Analytics 4 (solo con consentimiento). Acogido al marco EU-US Data Privacy Framework. <Cyan href="https://policies.google.com/privacy">Política de privacidad de Google</Cyan>.</Li>
          <Li><Strong>Anthropic PBC</Strong> (EE. UU.): chatbot del sitio, si lo usas (solo con consentimiento). Acogido al marco EU-US. <Cyan href="https://www.anthropic.com/privacy">Política de Anthropic</Cyan>.</Li>
        </Ul>
      </Section>

      <Section num={7} title="Tus derechos (RGPD, arts. 15-22)">
        <P>Puedes ejercer en cualquier momento los siguientes derechos enviando un correo a <Cyan href="mailto:info@sergiolab.es">info@sergiolab.es</Cyan> con copia de tu DNI/NIE:</P>
        <Ul>
          <Li><Strong>Acceso:</Strong> conocer qué datos tenemos sobre ti y cómo los tratamos.</Li>
          <Li><Strong>Rectificación:</Strong> corregir datos inexactos o incompletos.</Li>
          <Li><Strong>Supresión:</Strong> eliminar tus datos cuando ya no sean necesarios («derecho al olvido»).</Li>
          <Li><Strong>Limitación:</Strong> restringir el tratamiento en determinadas circunstancias.</Li>
          <Li><Strong>Portabilidad:</Strong> recibir tus datos en formato estructurado y de uso común.</Li>
          <Li><Strong>Oposición:</Strong> oponerte al tratamiento basado en interés legítimo.</Li>
          <Li><Strong>Retirada del consentimiento:</Strong> sin que afecte a la licitud del tratamiento previo.</Li>
        </Ul>
        <P>Si consideras que el tratamiento vulnera la normativa, puedes presentar una reclamación ante la <Cyan href="https://www.aepd.es">Agencia Española de Protección de Datos (AEPD)</Cyan>.</P>
      </Section>

      <Section num={8} title="Seguridad">
        <P>Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos: comunicación cifrada mediante HTTPS/TLS, acceso restringido a personal autorizado, y revisión periódica de los sistemas de seguridad.</P>
      </Section>

      <Section num={9} title="Modificaciones">
        <P>Podemos actualizar esta política para adaptarla a cambios normativos o del servicio. La versión vigente siempre estará disponible en esta URL con la fecha de última actualización. Los cambios significativos se comunicarán por correo electrónico si tienes una relación comercial activa con nosotros.</P>
      </Section>
    </LegalLayout>
  )
}
