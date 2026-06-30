import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Anima en stagger los hijos directos (o el selector `childSelector`) del `ref`
// cuando entran en viewport. Devuelve la timeline por si se necesita controlar.
export function useStaggerReveal(ref, {
  childSelector = ':scope > *',
  y = 40,
  duration = 0.65,
  stagger = 0.08,
  start = 'top 80%',
  delay = 0,
} = {}) {
  useEffect(() => {
    if (!ref.current) return
    const children = ref.current.querySelectorAll(childSelector)
    if (!children.length) return

    gsap.set(children, { opacity: 0, y })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: 'play none none none',
        invalidateOnRefresh: true,
      },
    })

    tl.to(children, { opacity: 1, y: 0, duration, stagger, ease: 'power3.out', delay })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [ref, childSelector, y, duration, stagger, start, delay])
}
