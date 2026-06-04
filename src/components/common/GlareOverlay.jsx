// GlareOverlay — coloca este componente DENTRO de un contenedor position:relative.
// Crea un reflejo de luz que sigue el ratón, estilo "Glare Card" de Magic UI.
// Zero deps — pure JS mouse tracking + CSS radial-gradient.

import { useState, useCallback } from 'react'

export default function GlareOverlay({
  color   = 'rgba(255,255,255,0.1)',
  size    = '65%',
  style   = {},
}) {
  const [pos, setPos] = useState(null)

  const onMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({
      x: ((e.clientX - rect.left) / rect.width)  * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    })
  }, [])

  const onLeave = useCallback(() => setPos(null), [])

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        zIndex: 2,
        pointerEvents: 'auto',
        overflow: 'hidden',
        ...style,
      }}
    >
      {pos && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle ${size} at ${pos.x}% ${pos.y}%, ${color}, transparent)`,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            transition: 'opacity 0.15s',
          }}
        />
      )}
    </div>
  )
}
