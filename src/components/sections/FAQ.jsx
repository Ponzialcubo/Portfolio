import { useRef, useState } from 'react'
import { COLORS, FONTS } from '../../utils/constants'
import Container from '../common/Container'
import SectionHeader from '../common/SectionHeader'
import { faqs } from '../../data/faq'
import { useScrollAnimations } from '../../hooks/useScrollAnimations'

function FaqItem({ item, isOpen, onToggle }) {
  const panelId = `faq-panel-${item.id}`
  const btnId = `faq-btn-${item.id}`

  return (
    <div style={{
      borderBottom: `1px solid ${COLORS.border}`,
    }}>
      <h3 style={{ margin: 0 }}>
        <button
          id={btnId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          style={{
            width: '100%', textAlign: 'left', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
            background: 'transparent', border: 'none',
            padding: 'clamp(18px, 2.4vh, 24px) 4px',
            fontFamily: FONTS.heading,
            fontSize: 'clamp(15px, 1.8vh, 19px)', fontWeight: 600,
            color: isOpen ? COLORS.accentCyan : COLORS.textWhite,
            transition: 'color 0.2s',
          }}
        >
          {item.question}
          <span
            aria-hidden="true"
            style={{
              flexShrink: 0, width: 24, height: 24, position: 'relative',
              transition: 'transform 0.3s', transform: isOpen ? 'rotate(45deg)' : 'none',
            }}
          >
            <span style={{ position: 'absolute', top: '50%', left: 4, right: 4, height: 2, background: isOpen ? COLORS.accentCyan : COLORS.textMuted, transform: 'translateY(-50%)', borderRadius: 2 }} />
            <span style={{ position: 'absolute', left: '50%', top: 4, bottom: 4, width: 2, background: isOpen ? COLORS.accentCyan : COLORS.textMuted, transform: 'translateX(-50%)', borderRadius: 2 }} />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        hidden={!isOpen}
        style={{
          paddingBottom: isOpen ? 'clamp(18px, 2.4vh, 24px)' : 0,
        }}
      >
        <p style={{
          margin: 0, paddingRight: 'clamp(0px, 4vw, 56px)',
          fontFamily: FONTS.body, fontSize: 'clamp(14px, 1.5vh, 16px)',
          color: COLORS.textMuted, lineHeight: 1.7,
        }}>
          {item.answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  useScrollAnimations(ref)
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null)

  return (
    <section
      ref={ref}
      id="faq"
      style={{
        width: '100%',
        background: COLORS.bgPrimary,
        padding: 'clamp(64px, 9vh, 112px) 0',
      }}
    >
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }}
          className="faq-layout"
        >
          <div style={{ position: 'sticky', top: 'clamp(80px, 12vh, 120px)' }} className="faq-aside">
            <SectionHeader
              eyebrow="DUDAS FRECUENTES"
              title="PREGUNTAS"
              subtitle="Lo que más me preguntan antes de empezar un proyecto. ¿No ves tu duda? Escríbeme."
            />
            <a
              href="#contacto"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                marginTop: 'clamp(20px, 3vh, 28px)',
                fontFamily: FONTS.body, fontSize: 13, fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                textDecoration: 'none', color: COLORS.accentCyan,
                background: 'rgba(0,217,255,0.08)',
                border: '1.5px solid rgba(0,217,255,0.35)',
                padding: '10px 20px', borderRadius: 6,
              }}
            >
              HACER UNA PREGUNTA →
            </a>
          </div>

          <div>
            {faqs.map(item => (
              <FaqItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 820px) {
          .faq-layout { grid-template-columns: 1fr !important; }
          .faq-aside  { position: static !important; }
        }
      `}</style>
    </section>
  )
}
