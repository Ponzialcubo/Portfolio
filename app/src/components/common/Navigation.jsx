import { useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks, mobileLinks } from '../../data/navigation'
import { useNavigation } from '../../context/NavigationContext'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Renders either a <Link> (internal page) or <a> (anchor/external)
function NavAnchor({ href, children, className, onClick, style }) {
  const isPage = href.startsWith('/')
  if (isPage) {
    return <Link to={href} className={className} onClick={onClick} style={style}>{children}</Link>
  }
  return <a href={href} className={className} onClick={onClick} style={style}>{children}</a>
}

export default function Navigation() {
  const { isMenuOpen, setIsMenuOpen } = useNavigation()
  const menuRef = useRef(null)
  const hamburgerRef = useRef(null)
  const { pathname } = useLocation()

  const close = useCallback(() => setIsMenuOpen(false), [setIsMenuOpen])

  // Close menu on route change
  useEffect(() => { close() }, [pathname, close])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setIsMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [setIsMenuOpen])

  // Focus-trap when menu is open
  useEffect(() => {
    if (!isMenuOpen) return
    const menu = menuRef.current
    if (!menu) return
    const focusables = Array.from(menu.querySelectorAll(FOCUSABLE))
    focusables[0]?.focus()

    const onKeydown = (e) => {
      if (e.key === 'Escape') { close(); hamburgerRef.current?.focus(); return }
      if (e.key !== 'Tab') return
      const els = Array.from(menu.querySelectorAll(FOCUSABLE))
      if (!els.length) return
      if (e.shiftKey) {
        if (document.activeElement === els[0]) { e.preventDefault(); els[els.length - 1].focus() }
      } else {
        if (document.activeElement === els[els.length - 1]) { e.preventDefault(); els[0].focus() }
      }
    }
    document.addEventListener('keydown', onKeydown)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKeydown); document.body.style.overflow = '' }
  }, [isMenuOpen, close])

  return (
    <>
      <header id="glass-nav" className="anim-fade d-0">
        <div id="nav-inner">
          <Link to="/" className="logo" aria-label="SergioLab — Developer">
            SERGIOLAB<span className="dev"> · DEVELOPER</span>
          </Link>

          <ul id="desktop-links" role="list">
            {navLinks.map(({ label, href, isCta }) => {
              const isActive = !isCta && pathname === href
              return (
                <li key={href}>
                  <NavAnchor href={href} className={isCta ? 'nav-cta' : `nav-link${isActive ? ' is-active' : ''}`}>{label}</NavAnchor>
                </li>
              )
            })}
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
        <div aria-hidden="true" onClick={close}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 89, backdropFilter: 'blur(3px)' }} />
      )}

      <div ref={menuRef} id="mobile-menu" className={isMenuOpen ? 'is-open' : ''}
        role="dialog" aria-label="Menú principal" aria-modal="true"
        {...(!isMenuOpen && { inert: '' })}
      >
        <button id="close-btn" aria-label="Cerrar menú" onClick={close}>✕</button>
        {mobileLinks.map(({ label, href, isAccent }) => (
          <NavAnchor key={href} href={href} className={`mobile-link${isAccent ? ' accent' : ''}`} onClick={close}>
            {label}
          </NavAnchor>
        ))}
        <p className="mobile-menu-stack">
          REACT · NEXT.JS · WORDPRESS · STRIPE · FIGMA<br />
          📍 MADRID · ES
        </p>
      </div>
    </>
  )
}
