// BorderBeam — conic-gradient + CSS @property.
// Esta es la técnica real que usan Cult UI y Magic UI internamente.
//
// Funciona así:
// 1. Un div del tamaño del padre con padding = grosor del borde.
// 2. conic-gradient con --angle animado crea un cometa que gira.
// 3. mask-composite: exclude revela SOLO la zona de padding (= el borde).
// Resultado: un arco de luz que orbita el contorno del contenedor.

import { useRef } from 'react'

export default function BorderBeam({
  color     = '#00D9FF',
  thickness = 1.5,
  duration  = 3,
  opacity   = 1,
}) {
  const idRef = useRef(`bb-${Math.random().toString(36).slice(2, 8)}`)
  const id    = idRef.current

  return (
    <>
      <div
        aria-hidden="true"
        className={`_beam ${id}`}
        style={{
          position:      'absolute',
          inset:         0,
          borderRadius:  'inherit',
          padding:       thickness,
          // La mayor parte es transparente; el cometa aparece en ~20% del arco
          background:    `conic-gradient(
            from var(--${id}-a, 0deg),
            transparent   0%,
            transparent  70%,
            ${color}55   80%,
            ${color}     87%,
            rgba(255,255,255,0.9) 90%,
            ${color}     93%,
            ${color}55   97%,
            transparent 100%
          )`,
          // Mask: muestra solo el borde (zona de padding)
          WebkitMask:    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          zIndex:        1,
          opacity,
          filter:        `drop-shadow(0 0 5px ${color}99)`,
        }}
      />

      <style>{`
        @property --${id}-a {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes ${id}-spin {
          to { --${id}-a: 360deg; }
        }
        .${id} {
          animation: ${id}-spin ${duration}s linear infinite;
        }
      `}</style>
    </>
  )
}
