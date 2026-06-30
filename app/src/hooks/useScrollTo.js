export function useScrollTo() {
  const scrollTo = (elementId) => {
    const el = document.getElementById(elementId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return { scrollTo, scrollToTop }
}
