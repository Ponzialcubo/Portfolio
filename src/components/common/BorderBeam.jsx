// BorderBeam — inspirado en Cult UI, implementado con CSS motion-path puro.
// No requiere Framer Motion ni Tailwind: funciona con los tokens del portfolio.
//
// Cómo funciona: un elemento absoluto viaja por el perímetro del contenedor
// padre usando `offset-path: border-box` + `offset-distance` animado.
// El "haz" es un degradado radial que simula un cometa.

export default function BorderBeam({
  color    = '#00D9FF',
  size     = 120,        // longitud del haz en px
  duration = 5,          // segundos por vuelta
  delay    = 0,
  opacity  = 0.8,
}) {
  const id = `bb-${Math.random().toString(36).slice(2, 7)}`

  return (
    <>
      <span
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          borderRadius: 'inherit',
          overflow:   'hidden',
          pointerEvents: 'none',
          zIndex:     0,
        }}
      >
        {/* Haz viajero */}
        <span
          className={id}
          style={{
            position:   'absolute',
            width:      size,
            height:     2,
            background: `linear-gradient(to right, transparent, ${color}, transparent)`,
            borderRadius: 9999,
            offsetPath:   'border-box',
            offsetDistance: '0%',
            animationName: `${id}-move`,
            animationDuration: `${duration}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `${delay}s`,
            opacity,
            filter: `blur(0.5px) drop-shadow(0 0 4px ${color})`,
          }}
        />
        {/* Resplandor suave detrás del haz */}
        <span
          className={`${id}-glow`}
          style={{
            position:   'absolute',
            width:      size * 1.8,
            height:     4,
            background: `radial-gradient(ellipse 60% 100% at center, ${color}44, transparent)`,
            borderRadius: 9999,
            offsetPath:   'border-box',
            offsetDistance: '0%',
            animationName: `${id}-move`,
            animationDuration: `${duration}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `${delay}s`,
            opacity: opacity * 0.5,
          }}
        />
      </span>

      <style>{`
        @keyframes ${id}-move {
          0%   { offset-distance:   0%; }
          100% { offset-distance: 100%; }
        }
      `}</style>
    </>
  )
}
