// ShinyText — shimmer de luz que recorre el texto horizontalmente.
// Inspirado en Magic UI "Animated Shiny Text". Pure CSS, zero deps.

export default function ShinyText({ children, color = '#00D9FF', shimmer = 'rgba(255,255,255,0.85)', speed = 3, style = {} }) {
  const id = `st-${Math.random().toString(36).slice(2, 6)}`

  return (
    <>
      <span
        className={id}
        style={{
          display: 'inline',
          backgroundImage: `linear-gradient(120deg, ${color} 30%, ${shimmer} 48%, ${shimmer} 52%, ${color} 70%)`,
          backgroundSize: '250% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          animationName: `${id}-shine`,
          animationDuration: `${speed}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          ...style,
        }}
      >
        {children}
      </span>

      <style>{`
        @keyframes ${id}-shine {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </>
  )
}
