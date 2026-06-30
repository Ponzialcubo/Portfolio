import { lazy, Suspense } from 'react'
import SiteLayout from '../components/layouts/SiteLayout'
import Portfolio from '../components/sections/Portfolio/Portfolio'
import LoadingSpinner from '../components/common/LoadingSpinner'
import PageFooter from '../components/sections/Footer'

export default function PortfolioPage() {
  return (
    <SiteLayout>
      <Portfolio />
      <Suspense fallback={null}><PageFooter /></Suspense>
    </SiteLayout>
  )
}
