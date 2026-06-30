import { Suspense, lazy } from 'react'
import SiteLayout from '../components/layouts/SiteLayout'
import Services from '../components/sections/Services/Services'
import Footer from '../components/sections/Footer'

export default function ServicesPage() {
  return (
    <SiteLayout>
      <Services />
      <Suspense fallback={null}><Footer /></Suspense>
    </SiteLayout>
  )
}
