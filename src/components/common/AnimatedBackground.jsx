import { useEffect, useRef } from 'react'

const SECTIONS = [
  { y: 0,    r: 0,   g: 217, b: 255 },
  { y: 500,  r: 16,  g: 185, b: 129 },
  { y: 1200, r: 168, g: 85,  b: 247 },
  { y: 2000, r: 249, g: 115, b: 22  },
  { y: 2800, r: 0,   g: 217, b: 255 },
]

function getColor(scrollY) {
  for (let i = 0; i < SECTIONS.length - 1; i++) {
    const a = SECTIONS[i], b = SECTIONS[i + 1]
    if (scrollY >= a.y && scrollY < b.y) {
      const t = (scrollY - a.y) / (b.y - a.y)
      return {
        r: Math.round(a.r + (b.r - a.r) * t),
        g: Math.round(a.g + (b.g - a.g) * t),
        b: Math.round(a.b + (b.b - a.b) * t),
      }
    }
  }
  return SECTIONS[SECTIONS.length - 1]
}

export default function AnimatedBackground() {
  const canvasRef  = useRef(null)
  const nodesRef   = useRef([])
  const frameRef   = useRef(0)
  const animIdRef  = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    nodesRef.current = Array.from({ length: 28 }, () => ({
      x:      Math.random() * canvas.width,
      y:      Math.random() * canvas.height,
      vx:     (Math.random() - 0.5) * 0.3,
      vy:     (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 2,
    }))

    const MAX_DIST = 180

    const animate = () => {
      frameRef.current += 1
      const { r, g, b } = getColor(window.scrollY)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const nodes = nodesRef.current
      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        if (n.x - n.radius < 0 || n.x + n.radius > canvas.width)  n.vx *= -1
        if (n.y - n.radius < 0 || n.y + n.radius > canvas.height) n.vy *= -1
        n.x = Math.max(n.radius, Math.min(canvas.width  - n.radius, n.x))
        n.y = Math.max(n.radius, Math.min(canvas.height - n.radius, n.y))
      })

      const pulse = Math.sin(frameRef.current * 0.012) * 0.15 + 0.85

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x
          const dy   = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.35 * pulse
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`
            ctx.lineWidth   = 1.5
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      nodes.forEach((n) => {
        ctx.fillStyle = `rgba(${r},${g},${b},${0.55 * pulse})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animIdRef.current = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animIdRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
      aria-hidden="true"
    />
  )
}
