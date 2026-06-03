import { Suspense } from 'react'
import SiteLayout from '../components/layouts/SiteLayout'
import Contact from '../components/sections/Contact/Contact'
import FAQ from '../components/sections/FAQ'
import Footer from '../components/sections/Footer'
import PageBanner from '../components/common/PageBanner'
import { COLORS } from '../utils/constants'

export default function ContactPage() {
  return (
    <SiteLayout>
      <PageBanner
        eyebrow="CONTACTO"
        title="HABLEMOS"
        subtitle="Cuéntame tu proyecto. Presupuesto cerrado en menos de 24 horas, sin compromiso."
        accent={COLORS.accentCyan}
      />
      <FAQ />
      <Contact />
      <Suspense fallback={null}><Footer /></Suspense>
    </SiteLayout>
  )
}
