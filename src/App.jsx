import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AnimatedBackground from './components/common/AnimatedBackground'
import CookieBanner from './components/common/CookieBanner'
import MainLayout from './components/layouts/MainLayout'
import Hero from './components/sections/Hero'
import Portfolio from './components/sections/Portfolio/Portfolio'
import LoadingSpinner from './components/common/LoadingSpinner'

// Lazy-loaded below-fold sections
const Services     = lazy(() => import('./components/sections/Services/Services'))
const WhyMe        = lazy(() => import('./components/sections/WhyMe'))
const Stack        = lazy(() => import('./components/sections/Stack'))
const HowItWorks   = lazy(() => import('./components/sections/HowItWorks'))
const Testimonials = lazy(() => import('./components/sections/Testimonials'))
const FAQ          = lazy(() => import('./components/sections/FAQ'))
const Contact      = lazy(() => import('./components/sections/Contact/Contact'))
const Footer       = lazy(() => import('./components/sections/Footer'))

// Legal pages (lazy — rarely visited)
const Privacy    = lazy(() => import('./pages/Privacy'))
const Cookies    = lazy(() => import('./pages/Cookies'))
const Terms      = lazy(() => import('./pages/Terms'))
const CaseStudy  = lazy(() => import('./pages/CaseStudy'))

function HomePage() {
  return (
    <MainLayout>
      <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
      <Hero />
      <main id="main-content">
        <Portfolio />
        <Suspense fallback={<LoadingSpinner />}><Services /></Suspense>
        <Suspense fallback={<LoadingSpinner />}><WhyMe /></Suspense>
        <Suspense fallback={<LoadingSpinner />}><Stack /></Suspense>
        <Suspense fallback={<LoadingSpinner />}><HowItWorks /></Suspense>
        <Suspense fallback={<LoadingSpinner />}><Testimonials /></Suspense>
        <Suspense fallback={<LoadingSpinner />}><FAQ /></Suspense>
        <Suspense fallback={<LoadingSpinner />}><Contact /></Suspense>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
    </MainLayout>
  )
}

export default function App() {
  return (
    <>
    <AnimatedBackground />
    <CookieBanner />
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<HomePage />} />
        <Route path="/proyectos/:slug" element={<Suspense fallback={<LoadingSpinner />}><CaseStudy /></Suspense>} />
        <Route path="/privacy"         element={<Suspense fallback={<LoadingSpinner />}><Privacy /></Suspense>} />
        <Route path="/cookies"         element={<Suspense fallback={<LoadingSpinner />}><Cookies /></Suspense>} />
        <Route path="/terms"           element={<Suspense fallback={<LoadingSpinner />}><Terms /></Suspense>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}
