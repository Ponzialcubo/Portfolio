import { useRef } from 'react'
import { COLORS, FONTS } from '../../../utils/constants'
import Container from '../../common/Container'
import SectionHeader from '../../common/SectionHeader'
import ContactForm from './ContactForm'
import { useScrollAnimations } from '../../../hooks/useScrollAnimations'

const CONTACT_INFO = [
  { icon: '📧', label: 'Email', value: 'info@sergiolab.es', href: 'mailto:info@sergiolab.es' },
  { icon: '📍', label: 'Ubicación', value: 'Madrid · Remoto / Híbrido', href: null },
  { icon: '💼', label: 'LinkedIn', value: 'sergiocontreras-dev', href: 'https://linkedin.com/in/sergiocontreras-dev' },
  { icon: '💻', label: 'GitHub', value: 'Ponzialcubo', href: 'https://github.com/Ponzialcubo' },
]

export default function Contact() {
  const ref = useRef(null)
  useScrollAnimations(ref)

  return (
    <section
      ref={ref}
      id="contacto"
      style={{
        width: '100%',
        background: COLORS.bgPrimary,
        padding: 'clamp(72px, 10vh, 120px) 0',
      }}
    >
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }}
          className="contact-layout"
        >
          {/* Left col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <SectionHeader
              eyebrow="HABLEMOS"
              title="CONTACTO"
              subtitle="¿Tienes un proyecto en mente? Cuéntame. Te respondo en menos de 24 horas."
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {CONTACT_INFO.map(({ icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{
                    width: 42, height: 42, borderRadius: 8,
                    background: 'rgba(0,217,255,0.08)',
                    border: '1px solid rgba(0,217,255,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0,
                  }}>
                    {icon}
                  </span>
                  <div>
                    <p style={{ fontFamily: FONTS.mono, fontSize: 9, letterSpacing: '0.15em', color: COLORS.textDim, margin: '0 0 2px', textTransform: 'uppercase' }}>
                      {label}
                    </p>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.accentCyan, textDecoration: 'none' }}
                      >
                        {value}
                      </a>
                    ) : (
                      <span style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.textLight }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.25)',
              borderRadius: 8, padding: '10px 16px',
              alignSelf: 'flex-start',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', flexShrink: 0, boxShadow: '0 0 8px #10B981' }} />
              <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: '#10B981', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Disponible para nuevos proyectos
              </span>
            </div>
          </div>

          {/* Right col — form */}
          <ContactForm />
        </div>
      </Container>

      <style>{`
        @media (max-width: 768px) {
          .contact-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
