const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact'

export async function sendContactForm({ name, email, projectType, budget, message }) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, projectType, budget, message }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || `Error ${res.status}`)
  }

  return res.json()
}
