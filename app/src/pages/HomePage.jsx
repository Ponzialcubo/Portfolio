import { Suspense } from 'react'
import { NavigationProvider } from '../context/NavigationContext'
import AnimatedBackground from '../components/common/AnimatedBackground'
import Hero from '../components/sections/Hero'
import Footer from '../components/sections/Footer'

// The home page is just the hero — navigation links point to section pages.
// AnimatedBackground is already rendered globally in App.jsx.
export default function HomePage() {
  return (
    <NavigationProvider>
      <Hero />
      <Suspense fallback={null}><Footer /></Suspense>
    </NavigationProvider>
  )
}
