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
const P = ({ children }) => <p style={{ fontFamily: FONTS.body, fontSize: 15, color: '#CBD5E1', lineHeight: 1.8, margin: '0 0 12px' }}>{children}</p>
const Ul = ({ children }) => <ul style={{ paddingLeft: 20, margin: '0 0 12px' }}>{children}</ul>
const Li = ({ children }) => <li style={{ fontFamily: FONTS.body, fontSize: 15, color: '#CBD5E1', lineHeight: 1.8, marginBottom: 6 }}>{children}</li>
const Strong = ({ children }) => <strong style={{ color: COLORS.textWhite }}>{children}</strong>
const Cyan = ({ href, children }) => <a href={href} style={{ color: COLORS.accentCyan }}>{children}</a>

export default function Terms() {
  return (
    <LegalLayout>
      <p style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.accentCyan, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 12px' }}>Legal · LSSI</p>
      <h1 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: COLORS.textWhite, margin: '0 0 8px', lineHeight: 1.1 }}>
        Aviso Legal
      </h1>
      <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textDim, margin: '0 0 48px' }}>
        Última actualización: 3 de junio de 2026
      </p>

      <Section num={1} title="Datos identificativos (LSSI, art. 10)">
        <P>En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se informa:</P>
        <Ul>
          <Li><Strong>Titular:</Strong> Sergio Contreras</Li>
          <Li><Strong>Nombre comercial:</Strong> SergioLab</Li>
          <Li><Strong>Domicilio:</Strong> Madrid, España</Li>
          <Li><Strong>Email de contacto:</Strong> <Cyan href="mailto:info@sergiolab.es">info@sergiolab.es</Cyan></Li>
          <Li><Strong>Sitio web:</Strong> <Cyan href="https://sergiolab.es">https://sergiolab.es</Cyan></Li>
          <Li><Strong>Actividad:</Strong> Diseño y desarrollo de sitios web, aplicaciones web y software a medida para empresas y autónomos.</Li>
        </Ul>
      </Section>

      <Section num={2} title="Objeto y aceptación">
        <P>El presente Aviso Legal regula el acceso y uso del sitio web <Strong>sergiolab.es</Strong> (en adelante, «el Sitio») de acuerdo con la legislación española y europea aplicable. El acceso y uso del Sitio implica la aceptación expresa de estas condiciones.</P>
        <P>Si no estás de acuerdo con alguna de estas condiciones, te rogamos que no utilices el Sitio.</P>
      </Section>

      <Section num={3} title="Propiedad intelectual e industrial">
        <P>Todos los contenidos del Sitio —incluyendo textos, imágenes, gráficos, logotipos, diseño, código fuente y software— son propiedad exclusiva de Sergio Contreras (SergioLab) o de sus legítimos titulares, y están protegidos por las leyes de propiedad intelectual e industrial.</P>
        <P>Queda expresamente prohibido:</P>
        <Ul>
          <Li>Reproducir, distribuir o comunicar públicamente los contenidos sin autorización escrita previa.</Li>
          <Li>Modificar, transformar o crear obras derivadas de los contenidos del Sitio.</Li>
          <Li>Usar los contenidos con fines comerciales sin autorización expresa.</Li>
        </Ul>
        <P>El incumplimiento de estas prohibiciones podrá dar lugar al ejercicio de las acciones legales oportunas.</P>
      </Section>

      <Section num={4} title="Exclusión de responsabilidad">
        <P>SergioLab no garantiza la disponibilidad continua e ininterrumpida del Sitio, ni que esté libre de errores técnicos. Podrá suspender temporalmente el acceso para mantenimiento o mejoras.</P>
        <P>SergioLab no se responsabiliza de los daños derivados del uso del Sitio, de errores u omisiones en los contenidos, ni del acceso a sitios web de terceros mediante enlaces externos. Los enlaces a terceros se proporcionan únicamente a efectos informativos.</P>
      </Section>

      <Section num={5} title="Condiciones generales de contratación">
        <P>Los presupuestos y propuestas emitidas tienen una validez de <Strong>30 días naturales</Strong> desde su fecha de emisión, salvo indicación contraria.</P>
        <P>La relación contractual se formaliza mediante la aceptación por escrito (email o contrato firmado) del presupuesto. El inicio de los trabajos requiere el pago de un anticipo del <Strong>50 % del importe total acordado</Strong>, salvo condiciones específicas pactadas entre las partes.</P>
        <P>El saldo restante se abona a la entrega del proyecto o según el calendario de pagos establecido en el presupuesto. Los precios incluyen IVA cuando corresponda según la normativa aplicable.</P>
      </Section>

      <Section num={6} title="Política de cancelación y devoluciones">
        <P>Una vez iniciados los trabajos y abonado el anticipo, este no será reembolsable, salvo incumplimiento grave imputable a SergioLab.</P>
        <P>El cliente podrá cancelar el proyecto notificándolo por escrito. En tal caso:</P>
        <Ul>
          <Li>Si la cancelación se produce antes del inicio: reembolso íntegro del anticipo.</Li>
          <Li>Si la cancelación se produce durante el desarrollo: se abonará la parte proporcional al trabajo realizado hasta ese momento, sin derecho a reembolso del anticipo.</Li>
        </Ul>
      </Section>

      <Section num={7} title="Ley aplicable y jurisdicción">
        <P>El presente Aviso Legal se rige íntegramente por la legislación española. Para la resolución de cualquier controversia derivada de su interpretación o aplicación, las partes se someten, con renuncia expresa a cualquier otro fuero, a los Juzgados y Tribunales de Madrid (España).</P>
        <P>No obstante, si eres consumidor en la Unión Europea, también puedes acudir a la plataforma de resolución de litigios en línea de la Comisión Europea: <Cyan href="https://ec.europa.eu/consumers/odr">https://ec.europa.eu/consumers/odr</Cyan>.</P>
      </Section>
    </LegalLayout>
  )
}
