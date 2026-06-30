import { Suspense } from 'react'
import SiteLayout from '../components/layouts/SiteLayout'
import HowItWorks from '../components/sections/HowItWorks'
import Footer from '../components/sections/Footer'

export default function ProcessPage() {
  return (
    <SiteLayout>
      <HowItWorks />
      <Suspense fallback={null}><Footer /></Suspense>
    </SiteLayout>
  )
}
