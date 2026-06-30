import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { NavigationProvider } from '../../context/NavigationContext'
import Navigation from '../common/Navigation'

// Shared wrapper for all main pages (not legal pages, not case studies).
// Provides: sticky nav + scroll-to-top on route change + padding for fixed nav.
export default function SiteLayout({ children, withFooter = true, noPadding = false }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <NavigationProvider>
      {/* Fixed navigation — always visible across all pages */}
      <Navigation />

      {/* Page content — padded below the fixed nav */}
      <div style={{
        paddingTop: noPadding ? 0 : 'clamp(64px, 8vh, 80px)',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
      }}>
        {children}
      </div>
    </NavigationProvider>
  )
}
