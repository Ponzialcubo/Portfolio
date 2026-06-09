// GlareOverlay — recibe la posición del ratón desde el padre (pointerEvents: none).
// Usar así: <GlareOverlay x={glarePos?.x} y={glarePos?.y} color="..." size="..." />
// El padre trackea el ratón en su propio onMouseMove/onMouseLeave.

export default function GlareOverlay({ color = 'rgba(255,255,255,0.1)', size = '65%', x = null, y = null }) {
  if (x == null || y == null) return null
  return (
    <div
      aria-hidden="true"
      style={{
        position:      'absolute',
        inset:         0,
        borderRadius:  'inherit',
        zIndex:        2,
        pointerEvents: 'none',
        background:    `radial-gradient(circle ${size} at ${x}% ${y}%, ${color}, transparent)`,
      }}
    />
  )
}
