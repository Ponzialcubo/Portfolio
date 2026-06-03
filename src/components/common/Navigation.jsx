import { useState, useEffect, useRef, useCallback } from 'react'
import { navLinks, mobileLinks } from '../../data/navigation'
import { useNavigation } from '../../context/NavigationContext'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Navigation() {
  const { isMenuOpen, setIsMenuOpen } = useNavigation()
  const menuRef = useRef(null)
  const hamburgerRef = useRef(null)

  const close = useCallback(() => setIsMenuOpen(false), [setIsMenuOpen])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setIsMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [setIsMenuOpen])

  // Focus-trap: mantiene el foco dentro del menú móvil cuando está abierto
  useEffect(() => {
    if (!isMenuOpen) return

    const menu = menuRef.current
    if (!menu) return

    // Mover el foco al primer elemento interactivo al abrir
    const focusables = Array.from(menu.querySelectorAll(FOCUSABLE))
    focusables[0]?.focus()

    const onKeydown = (e) => {
      if (e.key === 'Escape') {
        close()
        hamburgerRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return

      const els = Array.from(menu.querySelectorAll(FOCUSABLE))
      if (!els.length) return
      const first = els[0]
      const last = els[els.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }

    document.addEventListener('keydown', onKeydown)
    // Bloquear scroll de body mientras el menú está abierto
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeydown)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen, close])

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
            ref={hamburgerRef}
            id="hamburger"
            className={isMenuOpen ? 'is-open' : ''}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(v => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          aria-hidden="true"
          onClick={close}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 89, backdropFilter: 'blur(2px)' }}
        />
      )}

      <div
        ref={menuRef}
        id="mobile-menu"
        className={isMenuOpen ? 'is-open' : ''}
        role="dialog"
        aria-label="Menú principal"
        aria-modal="true"
        // Oculto de AT cuando cerrado
        {...(!isMenuOpen && { inert: '' })}
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
