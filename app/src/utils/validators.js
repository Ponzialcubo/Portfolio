export const validateRequired = (value, fieldName = 'Este campo') => {
  if (!value || !value.toString().trim()) {
    return `${fieldName} es obligatorio`
  }
  return null
}

export const validateEmail = (value) => {
  if (!value || !value.trim()) return 'El email es obligatorio'
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!re.test(value.trim())) return 'Introduce un email válido'
  return null
}

export const validateMinLength = (value, min, fieldName = 'Este campo') => {
  if (!value || value.trim().length < min) {
    return `${fieldName} debe tener al menos ${min} caracteres`
  }
  return null
}

export const validateContactForm = ({ name, email, message }) => {
  const errors = {}

  const nameErr = validateRequired(name, 'El nombre')
  if (nameErr) errors.name = nameErr

  const emailErr = validateEmail(email)
  if (emailErr) errors.email = emailErr

  const msgErr = validateMinLength(message, 20, 'El mensaje')
  if (msgErr) errors.message = msgErr

  return { errors, isValid: Object.keys(errors).length === 0 }
}
