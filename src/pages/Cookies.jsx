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
const Strong = ({ children }) => <strong style={{ color: COLORS.textWhite }}>{children}</strong>
const Cyan = ({ href, children }) => (
  <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ color: COLORS.accentCyan }}>
    {children}
  </a>
)

function CookieTable({ rows }) {
  const thSt = {
    fontFamily: FONTS.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: COLORS.textDim, padding: '10px 16px',
    textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.07)',
  }
  const tdSt = {
    fontFamily: FONTS.body, fontSize: 13, color: '#CBD5E1', padding: '10px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.04)', verticalAlign: 'top',
  }
  return (
    <div style={{ overflowX: 'auto', marginBottom: 16 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: 10, overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
            {['Nombre', 'Proveedor', 'Finalidad', 'Duración'].map(h => <th key={h} style={thSt}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{r.map((cell, j) => <td key={j} style={tdSt}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const ESSENTIAL = [
  ['sergiolab_cookie_consent', 'SergioLab', 'Guarda tu preferencia de consentimiento de cookies', '1 año'],
]
const ANALYTICS = [
  ['_ga', 'Google Analytics', 'Distingue usuarios únicos asignando un ID aleatorio', '2 años'],
  ['_ga_*', 'Google Analytics', 'Almacena el estado y datos de sesión (GA4)', '2 años'],
]

export default function Cookies() {
  return (
    <LegalLayout>
      <p style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.accentCyan, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 12px' }}>
        Legal · Cookies
      </p>
      <h1 style={{ fontFamily: FONTS.heading, fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: COLORS.textWhite, margin: '0 0 8px', lineHeight: 1.1 }}>
        Política de Cookies
      </h1>
      <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.textDim, margin: '0 0 48px' }}>
        Última actualización: 3 de junio de 2026
      </p>

      <Section num={1} title="¿Qué son las cookies?">
        <P>Las cookies son pequeños ficheros de texto que los sitios web almacenan en tu navegador al visitarlos. Sirven para recordar preferencias, analizar el tráfico y mejorar la experiencia. Este sitio usa <Strong>localStorage</Strong> para guardar tu preferencia de consentimiento, y cookies de Google Analytics (solo si las aceptas).</P>
      </Section>

      <Section num={2} title="Cookies estrictamente necesarias">
        <P>Imprescindibles para el funcionamiento del sitio. No requieren consentimiento y no se pueden desactivar sin afectar al funcionamiento.</P>
        <CookieTable rows={ESSENTIAL} />
      </Section>

      <Section num={3} title="Cookies analíticas (solo con consentimiento)">
        <P>Usamos Google Analytics 4 para entender cómo se usa el sitio de forma anónima y agregada. Solo se activan si aceptas las cookies analíticas. Puedes consultar la <Cyan href="https://policies.google.com/privacy">política de privacidad de Google</Cyan>.</P>
        <CookieTable rows={ANALYTICS} />
      </Section>

      <Section num={4} title="Cómo gestionar o eliminar las cookies">
        <P>Puedes cambiar tus preferencias en cualquier momento haciendo clic en «Política de cookies» en el pie de página. También puedes gestionarlas desde tu navegador:</P>
        <ul style={{ paddingLeft: 20, margin: '0 0 12px' }}>
          {[
            ['Chrome', 'https://support.google.com/chrome/answer/95647'],
            ['Firefox', 'https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we'],
            ['Safari', 'https://support.apple.com/es-es/guide/safari/sfri11471/mac'],
            ['Edge', 'https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406'],
          ].map(([name, url]) => (
            <li key={name} style={{ fontFamily: FONTS.body, fontSize: 15, color: '#CBD5E1', lineHeight: 1.8, marginBottom: 4 }}>
              <Cyan href={url}>{name}</Cyan>
            </li>
          ))}
        </ul>
      </Section>

      <Section num={5} title="Actualizaciones">
        <P>Podemos actualizar esta política cuando cambiemos los servicios utilizados. La versión vigente siempre estará disponible en esta URL. ¿Dudas? <Cyan href="mailto:info@sergiolab.es">info@sergiolab.es</Cyan></P>
      </Section>
    </LegalLayout>
  )
}
