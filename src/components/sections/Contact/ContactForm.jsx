import { useState } from 'react'
import { COLORS, FONTS } from '../../../utils/constants'
import { validateContactForm } from '../../../utils/validators'
import { sendContactForm } from '../../../utils/api'
import Button from '../../common/Button'

const PROJECT_TYPES = [
  'Landing page',
  'E-Commerce',
  'Dashboard / Analytics',
  'App mobile',
  'Otro',
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', projectType: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [serverError, setServerError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { errors: errs, isValid } = validateContactForm(form)
    if (!isValid) { setErrors(errs); return }

    setStatus('loading')
    try {
      await sendContactForm(form)
      setStatus('success')
      setForm({ name: '', email: '', projectType: '', message: '' })
    } catch (err) {
      setStatus('error')
      setServerError(err.message)
    }
  }

  const inputStyle = (field) => ({
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.04)',
    border: `1.5px solid ${errors[field] ? '#EF4444' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 8,
    padding: '12px 16px',
    fontFamily: FONTS.body, fontSize: 14,
    color: COLORS.textWhite,
    outline: 'none',
    transition: 'border-color 0.2s ease',
  })

  const labelStyle = {
    fontFamily: FONTS.mono, fontSize: 10, fontWeight: 600,
    letterSpacing: '0.16em', textTransform: 'uppercase',
    color: COLORS.textDim, marginBottom: 6, display: 'block',
  }

  const errStyle = {
    fontFamily: FONTS.body, fontSize: 11,
    color: '#EF4444', marginTop: 4,
  }

  if (status === 'success') {
    return (
      <div
        role="alert"
        style={{
          textAlign: 'center', padding: '48px 24px',
          background: 'rgba(16,185,129,0.08)',
          border: '1.5px solid rgba(16,185,129,0.3)',
          borderRadius: 12,
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 16 }} aria-hidden="true">✓</div>
        <h3 style={{ fontFamily: FONTS.heading, fontSize: 22, color: COLORS.textWhite, margin: '0 0 8px' }}>
          Mensaje enviado
        </h3>
        <p style={{ fontFamily: FONTS.body, color: COLORS.textMuted, margin: 0 }}>
          Te respondo en menos de 24 horas.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Name + Email row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
        className="contact-grid"
      >
        <div>
          <label htmlFor="contact-name" style={labelStyle}>Nombre</label>
          <input
            id="contact-name"
            name="name" value={form.name} onChange={handleChange}
            placeholder="Tu nombre"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'err-name' : undefined}
            style={inputStyle('name')}
          />
          {errors.name && <p id="err-name" role="alert" style={errStyle}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" style={labelStyle}>Email</label>
          <input
            id="contact-email"
            name="email" type="email" value={form.email} onChange={handleChange}
            placeholder="tu@email.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'err-email' : undefined}
            style={inputStyle('email')}
          />
          {errors.email && <p id="err-email" role="alert" style={errStyle}>{errors.email}</p>}
        </div>
      </div>

      {/* Project type */}
      <div>
        <label htmlFor="contact-type" style={labelStyle}>Tipo de proyecto</label>
        <select
          id="contact-type"
          name="projectType" value={form.projectType} onChange={handleChange}
          style={{ ...inputStyle('projectType'), cursor: 'pointer' }}
        >
          <option value="" disabled>Selecciona una opción</option>
          {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" style={labelStyle}>Mensaje</label>
        <textarea
          id="contact-message"
          name="message" value={form.message} onChange={handleChange}
          placeholder="Cuéntame qué necesitas..."
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'err-message' : undefined}
          style={{ ...inputStyle('message'), resize: 'vertical', lineHeight: 1.6 }}
        />
        {errors.message && <p id="err-message" role="alert" style={errStyle}>{errors.message}</p>}
      </div>

      {/* Honeypot — hidden from users, catches bots */}
      <input
        name="_honeypot"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
        autoComplete="off"
      />

      {serverError && (
        <p role="alert" style={{ ...errStyle, marginTop: 0 }}>
          Error: {serverError}. Escríbeme directamente a info@sergiolab.es
        </p>
      )}

      <Button
        variant="primary"
        accent={COLORS.accentCyan}
        size="lg"
        disabled={status === 'loading'}
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? 'Enviando...' : 'ENVIAR MENSAJE →'}
      </Button>

      <style>{`
        @media (max-width: 520px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(226,232,240,0.3); }
        select option { background: #1A1F2E; color: #E2E8F0; }
        input:focus, textarea:focus, select:focus { border-color: rgba(0,217,255,0.5) !important; }
        input:focus-visible, textarea:focus-visible, select:focus-visible, button:focus-visible, a:focus-visible {
          outline: 2px solid #00D9FF;
          outline-offset: 3px;
        }
      `}</style>
    </form>
  )
}
