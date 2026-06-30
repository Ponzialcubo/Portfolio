// SpotlightCursor — un halo de luz que sigue el cursor por toda la página.
// Actualiza el DOM directamente (sin setState) para máximo rendimiento.
// Visible en desktop únicamente; en móvil no tiene ratón así que se omite.

import { useEffect, useRef } from 'react'

export default function SpotlightCursor({
  color = '0,217,255',  // RGB sin #
  size  = 650,
  opacity = 0.06,
}) {
  const ref = useRef(null)

  useEffect(() => {
    // Solo desktop
    if (window.matchMedia('(pointer: coarse)').matches) return

    const el = ref.current
    if (!el) return

    let raf = null
    let tx = -9999, ty = -9999
    let cx = -9999, cy = -9999

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      cx = lerp(cx, tx, 0.08)
      cy = lerp(cy, ty, 0.08)
      el.style.transform = `translate(${cx - size / 2}px, ${cy - size / 2}px)`
      raf = requestAnimationFrame(animate)
    }

    const onMove = (e) => { tx = e.clientX; ty = e.clientY }
    const onLeave = () => { tx = -9999; ty = -9999 }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [size])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         size,
        height:        size,
        borderRadius:  '50%',
        background:    `radial-gradient(circle, rgba(${color},${opacity}) 0%, transparent 65%)`,
        pointerEvents: 'none',
        zIndex:        0,
        willChange:    'transform',
        mixBlendMode:  'screen',
      }}
    />
  )
}
