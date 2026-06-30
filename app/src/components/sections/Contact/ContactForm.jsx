import { useState } from 'react'
import { COLORS, FONTS } from '../../../utils/constants'
import { validateContactForm } from '../../../utils/validators'
import { sendContactForm } from '../../../utils/api'

const PROJECT_TYPES = [
  { value: 'landing', label: 'Landing page / Web corporativa' },
  { value: 'ecommerce', label: 'Tienda online / E-commerce' },
  { value: 'reservas', label: 'Sistema de reservas' },
  { value: 'dashboard', label: 'Panel / Dashboard / Analytics' },
  { value: 'otro', label: 'Otro — cuéntame' },
]


const inputBase = {
  width: '100%', boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.04)',
  border: '1.5px solid rgba(255,255,255,0.09)',
  borderRadius: 10, padding: '13px 16px',
  fontFamily: FONTS.body, fontSize: 14,
  color: COLORS.textWhite, outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
}

const labelSt = {
  fontFamily: FONTS.mono, fontSize: 9.5, fontWeight: 600,
  letterSpacing: '0.18em', textTransform: 'uppercase',
  color: COLORS.textDim, marginBottom: 8, display: 'block',
}

const errSt = {
  fontFamily: FONTS.body, fontSize: 11.5,
  color: '#EF4444', marginTop: 5,
}

function Field({ label, error, children }) {
  return (
    <div>
      {label && <label style={labelSt}>{label}</label>}
      {children}
      {error && <p role="alert" style={errSt}>{error}</p>}
    </div>
  )
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', projectType: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')
  const [focused, setFocused] = useState(null)

  const handle = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: null }))
  }

  const fieldStyle = (field) => ({
    ...inputBase,
    borderColor: errors[field] ? '#EF4444' : focused === field ? 'rgba(0,217,255,0.45)' : 'rgba(255,255,255,0.09)',
    background: focused === field ? 'rgba(0,217,255,0.03)' : 'rgba(255,255,255,0.04)',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { errors: errs, isValid } = validateContactForm(form)
    if (!isValid) { setErrors(errs); return }
    setStatus('loading')
    try {
      await sendContactForm({ ...form, projectType: form.projectType || 'No especificado' })
      setStatus('success')
      setForm({ name: '', email: '', projectType: '', message: '' })
    } catch (err) {
      setStatus('error'); setServerError(err.message)
    }
  }

  if (status === 'success') {
    return (
      <div role="alert" style={{ textAlign: 'center', padding: 'clamp(48px,8vh,72px) 24px', background: 'rgba(16,185,129,0.06)', border: '1.5px solid rgba(16,185,129,0.25)', borderRadius: 16 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '1.5px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 12.5L9 17.5L20 7" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 style={{ fontFamily: FONTS.heading, fontSize: 22, fontWeight: 700, color: COLORS.textWhite, margin: '0 0 10px' }}>Mensaje enviado</h3>
        <p style={{ fontFamily: FONTS.body, fontSize: 15, color: COLORS.textMuted, margin: 0, lineHeight: 1.6 }}>
          Gracias, te respondo en menos de 24 horas.<br />
          <span style={{ color: '#10B981' }}>info@sergiolab.es</span>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Name + Email */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="cf-row">
        <Field label="Nombre" error={errors.name}>
          <input id="cf-name" name="name" value={form.name} onChange={handle} placeholder="Tu nombre"
            aria-invalid={!!errors.name} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
            style={fieldStyle('name')} />
        </Field>
        <Field label="Email" error={errors.email}>
          <input id="cf-email" name="email" type="email" value={form.email} onChange={handle} placeholder="tu@email.com"
            aria-invalid={!!errors.email} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
            style={fieldStyle('email')} />
        </Field>
      </div>

      {/* Project type */}
      <Field label="Tipo de proyecto">
        <select name="projectType" value={form.projectType} onChange={handle}
          onFocus={() => setFocused('projectType')} onBlur={() => setFocused(null)}
          style={{ ...fieldStyle('projectType'), cursor: 'pointer' }}>
          <option value="">Seleccionar…</option>
          {PROJECT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </Field>

      {/* Message */}
      <Field label="Cuéntame tu proyecto" error={errors.message}>
        <textarea id="cf-message" name="message" value={form.message} onChange={handle}
          placeholder="Describe brevemente qué necesitas, en qué sector estás y qué objetivo quieres conseguir con la web..."
          rows={5} aria-invalid={!!errors.message}
          onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
          style={{ ...fieldStyle('message'), resize: 'vertical', lineHeight: 1.65 }} />
      </Field>

      {/* Honeypot */}
      <input name="_honeypot" tabIndex={-1} aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} autoComplete="off" />

      {serverError && (
        <p role="alert" style={{ ...errSt, marginTop: 0 }}>
          Error al enviar. Escríbeme directamente a{' '}
          <a href="mailto:info@sergiolab.es" style={{ color: COLORS.accentCyan }}>info@sergiolab.es</a>
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          fontFamily: FONTS.body, fontSize: 13, fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: '#0F1419', background: status === 'loading' ? 'rgba(0,217,255,0.5)' : COLORS.accentCyan,
          border: 'none', borderRadius: 10, padding: '15px 0',
          cursor: status === 'loading' ? 'default' : 'pointer',
          transition: 'opacity 0.2s, transform 0.15s',
          width: '100%',
          boxShadow: '0 4px 24px rgba(0,217,255,0.25)',
        }}
        onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.opacity = '0.88' }}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        {status === 'loading' ? 'Enviando...' : 'ENVIAR MENSAJE →'}
      </button>

      <p style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textDim, margin: 0, textAlign: 'center', lineHeight: 1.5 }}>
        Sin spam. Solo te contacto para responder a tu consulta.
      </p>

      <style>{`
        @media (max-width: 520px) { .cf-row { grid-template-columns: 1fr !important; } }
        input::placeholder, textarea::placeholder { color: rgba(226,232,240,0.25); }
        select option { background: #141B24; color: #E2E8F0; }
      `}</style>
    </form>
  )
}
