import { Suspense } from 'react'
import SiteLayout from '../components/layouts/SiteLayout'
import Contact from '../components/sections/Contact/Contact'
import FAQ from '../components/sections/FAQ'
import Footer from '../components/sections/Footer'

export default function ContactPage() {
  return (
    <SiteLayout>
      <FAQ />
      <Contact />
      <Suspense fallback={null}><Footer /></Suspense>
    </SiteLayout>
  )
}
