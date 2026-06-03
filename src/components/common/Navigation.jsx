import { useState, useEffect } from 'react'
import { navLinks, mobileLinks } from '../../data/navigation'
import { useNavigation } from '../../context/NavigationContext'

export default function Navigation() {
  const { isMenuOpen, setIsMenuOpen } = useNavigation()

  useEffect(() => {
    const onResize  = () => { if (window.innerWidth > 768) setIsMenuOpen(false) }
    const onKeydown = (e) => { if (e.key === 'Escape') setIsMenuOpen(false) }
    window.addEventListener('resize', onResize)
    document.addEventListener('keydown', onKeydown)
    return () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('keydown', onKeydown)
    }
  }, [setIsMenuOpen])

  const close = () => setIsMenuOpen(false)

  return (
    <>
      <header id="glass-nav" className="anim-fade d-0">
        <div id="nav-inner">
          <a href="/" className="logo" aria-label="SergioLab — Developer">
            SERGIOLAB<span className="dev"> · DEVELOPER</span>
          </a>

          <ul id="desktop-links" role="list">
            {navLinks.map(({ label, href, isCta }) => (
              <li key={href}>
                <a href={href} className={isCta ? 'nav-cta' : 'nav-link'}>{label}</a>
              </li>
            ))}
          </ul>

          <button
            id="hamburger"
            className={isMenuOpen ? 'is-open' : ''}
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={isMenuOpen ? 'is-open' : ''}
        role="dialog"
        aria-label="Menú principal"
        aria-modal="true"
      >
        <button id="close-btn" aria-label="Cerrar menú" onClick={close}>✕</button>
        {mobileLinks.map(({ label, href, isAccent }) => (
          <a
            key={href}
            href={href}
            className={`mobile-link${isAccent ? ' accent' : ''}`}
            onClick={close}
          >
            {label}
          </a>
        ))}
        <p className="mobile-menu-stack">
          REACT · WORDPRESS · FIGMA · STRIPE · POWER BI<br />
          📍 MADRID · ES
        </p>
      </div>
    </>
  )
}
