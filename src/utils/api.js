const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkoeqgpz'

export async function sendContactForm({ name, email, projectType, message }) {
  const res = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, projectType, message }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || `Error ${res.status}`)
  }

  return res.json()
}
