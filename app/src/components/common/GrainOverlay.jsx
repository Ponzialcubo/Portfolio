// GrainOverlay — textura de grano/ruido sobre toda la página.
// Da ese acabado premium "impreso" que usan las webs de diseño de alta gama.
// Implementado con SVG feTurbulence inline: cero imágenes externas.

export default function GrainOverlay({ opacity = 0.038 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         9997,
        pointerEvents:  'none',
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize:   '300px 300px',
        mixBlendMode:     'overlay',
      }}
    />
  )
}
