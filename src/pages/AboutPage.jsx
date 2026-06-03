import { Suspense } from 'react'
import SiteLayout from '../components/layouts/SiteLayout'
import WhyMe from '../components/sections/WhyMe'
import Stack from '../components/sections/Stack'
import Footer from '../components/sections/Footer'

export default function AboutPage() {
  return (
    <SiteLayout>
      <WhyMe />
      <Stack />
      <Suspense fallback={null}><Footer /></Suspense>
    </SiteLayout>
  )
}
