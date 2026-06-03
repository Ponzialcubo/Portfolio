import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations(ref) {
  useEffect(() => {
    if (!ref.current) return

    const el = ref.current
    const tween = gsap.fromTo(
      el,
      { opacity: 0, scale: 0.96, y: 48 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [ref])
}
