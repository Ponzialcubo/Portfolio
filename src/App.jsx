import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AnimatedBackground from './components/common/AnimatedBackground'
import CookieBanner from './components/common/CookieBanner'
import LoadingSpinner from './components/common/LoadingSpinner'

// ── Main pages (lazy — each is its own route) ─────────────────────────────
const HomePage      = lazy(() => import('./pages/HomePage'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const ServicesPage  = lazy(() => import('./pages/ServicesPage'))
const AboutPage     = lazy(() => import('./pages/AboutPage'))
const ProcessPage   = lazy(() => import('./pages/ProcessPage'))
const ContactPage   = lazy(() => import('./pages/ContactPage'))

// ── Project case studies ──────────────────────────────────────────────────
const CaseStudy = lazy(() => import('./pages/CaseStudy'))

// ── Legal pages ───────────────────────────────────────────────────────────
const Privacy = lazy(() => import('./pages/Privacy'))
const Cookies = lazy(() => import('./pages/Cookies'))
const Terms   = lazy(() => import('./pages/Terms'))

const S = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
)

export default function App() {
  return (
    <>
      <AnimatedBackground />
      <CookieBanner />
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route path="/"           element={<S><HomePage /></S>} />

          {/* Section pages */}
          <Route path="/portfolio"  element={<S><PortfolioPage /></S>} />
          <Route path="/servicios"  element={<S><ServicesPage /></S>} />
          <Route path="/sobre-mi"   element={<S><AboutPage /></S>} />
          <Route path="/proceso"    element={<S><ProcessPage /></S>} />
          <Route path="/contacto"   element={<S><ContactPage /></S>} />

          {/* Case studies */}
          <Route path="/proyectos/:slug" element={<S><CaseStudy /></S>} />

          {/* Legal */}
          <Route path="/privacy" element={<S><Privacy /></S>} />
          <Route path="/cookies" element={<S><Cookies /></S>} />
          <Route path="/terms"   element={<S><Terms /></S>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
