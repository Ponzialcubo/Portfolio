import { COLORS, FONTS } from '../utils/constants'
import LegalLayout from '../components/layouts/LegalLayout'

const H2 = ({ children }) => (
  <h2 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 700, color: COLORS.textWhite, margin: '40px 0 14px', lineHeight: 1.2 }}>
    {children}
  </h2>
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

export default function Terms() {
  return (
    <LegalLayout>
      <p style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.accentCyan, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 12px' }}>
        Legal
      </p>
      <h1 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: COLORS.textWhite, margin: '0 0 10px', lineHeight: 1.1 }}>
        Términos de Servicio
      </h1>
      <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textDim, margin: '0 0 48px' }}>
        Última actualización: 25 de mayo de 2025
      </p>

      <H2>1. Aceptación de términos</H2>
      <P>
        Al usar sergiolab.es, aceptas los presentes términos en su totalidad.
        Si no estás de acuerdo con alguna parte, por favor no uses el sitio.
        Nos reservamos el derecho a actualizar estos términos en cualquier momento.
      </P>

      <H2>2. Uso permitido</H2>
      <P>Puedes usar este sitio para:</P>
      <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
        <Li>Ver información sobre nuestros servicios</Li>
        <Li>Contactarnos con consultas o solicitar presupuesto</Li>
      </ul>
      <P>
        <strong style={{ color: COLORS.textWhite }}>Usos prohibidos:</strong> scraping automatizado, hacking,
        spam, distribución de contenido ilegal, o cualquier infracción de propiedad intelectual.
      </P>

      <H2>3. Propiedad intelectual</H2>
      <P>
        Todo el contenido de sergiolab.es — incluyendo texto, diseño, código e imágenes —
        es propiedad de SergioLab y está protegido por derechos de autor.
        No puedes reproducirlo ni distribuirlo sin permiso escrito previo.
      </P>

      <H2>4. Disponibilidad del sitio</H2>
      <P>
        SergioLab no garantiza disponibilidad 24/7. El sitio puede estar offline por
        mantenimiento, actualizaciones o circunstancias ajenas a nuestro control.
      </P>

      <H2>5. Limitación de responsabilidad</H2>
      <P>En la máxima medida permitida por ley, SergioLab no es responsable de:</P>
      <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
        <Li>Daños derivados del uso o imposibilidad de uso del sitio</Li>
        <Li>Pérdida de datos o interrupciones del servicio</Li>
        <Li>Resultados específicos de SEO, conversión o tráfico (dependen de múltiples factores)</Li>
        <Li>Virus o problemas de seguridad en dispositivos de terceros</Li>
      </ul>

      <H2>6. Disclaimer de servicios</H2>
      <P>
        No somos abogados, contables ni consultores financieros.
        Para asesoramiento en dichas áreas, consulta con profesionales certificados.
      </P>
      <P>
        No garantizamos resultados específicos en SEO, conversión o tráfico web.
        El éxito depende de múltiples factores (contenido, competencia, marketing, sector).
      </P>

      <H2>7. Formulario de contacto</H2>
      <P>Al enviar el formulario, aceptas que:</P>
      <ul style={{ paddingLeft: 22, marginBottom: 14 }}>
        <Li>Tus datos se usan para responder tu consulta</Li>
        <Li>Podemos conservar tu información para futuras comunicaciones</Li>
        <Li>Has leído y aceptas nuestra <a href="/privacy" style={{ color: COLORS.accentCyan }}>Política de Privacidad</a></Li>
      </ul>

      <H2>8. Enlaces externos</H2>
      <P>
        El sitio puede contener enlaces a sitios de terceros. SergioLab no es responsable
        de su contenido, políticas de privacidad ni prácticas.
      </P>

      <H2>9. Ley aplicable y jurisdicción</H2>
      <P>
        Estos términos se rigen por la legislación española y la normativa de la UE.
        Cualquier disputa se resolverá ante los juzgados de Madrid.
      </P>

      <H2>10. Contacto</H2>
      <P>
        Para dudas sobre estos términos:{' '}
        <a href="mailto:info@sergiolab.es" style={{ color: COLORS.accentCyan }}>info@sergiolab.es</a>
      </P>
    </LegalLayout>
  )
}
