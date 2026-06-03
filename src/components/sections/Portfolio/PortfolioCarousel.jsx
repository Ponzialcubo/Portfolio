import { useState, useEffect, useRef } from 'react'
import { useCarousel } from '../../../hooks/useCarousel'
import { CAROUSEL, COLORS } from '../../../utils/constants'
import { projects } from '../../../data/projects'
import ProjectCard from './ProjectCard'

const { CLONES, GAP } = CAROUSEL

// Extended array with clones for seamless infinite loop
// [clone(N-2), clone(N-1), ...projects, clone(0), clone(1)]
const EXTENDED = [
  ...projects.slice(projects.length - CLONES),
  ...projects,
  ...projects.slice(0, CLONES),
]

const ChevLeft  = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M13 4L7 10l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ChevRight = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function ArrowBtn({ onClick, side, children }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="carousel-arrow"
      aria-label={side === 'prev' ? 'Anterior' : 'Siguiente'}
      style={{
        position: 'absolute',
        top: '50%',
        [side === 'prev' ? 'left' : 'right']: 'clamp(12px, 2.5vw, 40px)',
        transform: hov ? 'translateY(-50%) scale(1.1)' : 'translateY(-50%) scale(1)',
        zIndex: 10,
        width: 48, height: 48, borderRadius: '50%',
        border: `1.5px solid rgba(255,255,255,${hov ? 0.28 : 0.13})`,
        background: hov ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.055)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        color: hov ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s',
        boxShadow: hov ? '0 0 22px rgba(255,255,255,0.12)' : 'none',
        outline: 'none',
      }}
    >
      {children}
    </button>
  )
}

export default function PortfolioCarousel() {
  const { displayIndex, noAnim, realIndex, isPaused, setIsPaused, prev, next, goTo, DISPLAY_OFFSET } =
    useCarousel(projects.length)

  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [cw, setCw] = useState(0)
  const containerRef = useRef(null)
  const touchStartX = useRef(null)

  const cardWidth = cw > 0
    ? cw > 900 ? Math.min(620, cw * 0.46) : cw > 600 ? cw * 0.52 : cw * 0.84
    : 540

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(entries => setCw(entries[0].contentRect.width))
    ro.observe(el)
    setCw(el.getBoundingClientRect().width)
    return () => ro.disconnect()
  }, [])

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev()
    touchStartX.current = null
  }

  const trackOffset = cw > 0
    ? (cw - cardWidth) / 2 - displayIndex * (cardWidth + GAP)
    : 0

  const padStr = (n) => String(n + 1).padStart(2, '0')

  return (
    <>
      {/* Viewport */}
      <div
        ref={containerRef}
        style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); setHoveredIndex(null) }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Track */}
        <div style={{
          display: 'flex',
          gap: GAP,
          transform: `translateX(${trackOffset}px)`,
          transition: noAnim ? 'none' : 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
          willChange: 'transform',
          alignItems: 'center',
          padding: '8px 0',
          width: 'max-content',
        }}>
          {EXTENDED.map((project, i) => {
            const dist = Math.abs(i - displayIndex)
            const isActive = dist === 0
            const isAdj = dist === 1
            const isHov = hoveredIndex === i

            let scale, opacity, filterVal
            if (isActive) {
              scale = 1; opacity = 1; filterVal = 'saturate(1) brightness(1)'
            } else if (isAdj) {
              scale = isHov ? 0.90 : 0.85
              opacity = isHov ? 0.58 : 0.40
              filterVal = isHov ? 'saturate(0.5) brightness(0.80)' : 'saturate(0.18) brightness(0.62)'
            } else {
              scale = 0.80; opacity = 0; filterVal = 'saturate(0)'
            }

            return (
              <div
                key={`${project.id}-${i}`}
                style={{
                  flexShrink: 0,
                  transform: `scale(${scale})`,
                  opacity, filter: filterVal,
                  transition: noAnim
                    ? 'none'
                    : 'transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.6s ease-out, filter 0.5s ease-out',
                  cursor: isAdj ? 'pointer' : 'default',
                  transformOrigin: 'center center',
                }}
                onClick={() => isAdj && goTo(((i - DISPLAY_OFFSET) % projects.length + projects.length) % projects.length)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <ProjectCard
                  project={project}
                  isActive={isActive}
                  cardWidth={cardWidth}
                  isHovered={isHov}
                />
              </div>
            )
          })}
        </div>

        <ArrowBtn onClick={prev} side="prev"><ChevLeft size={20} /></ArrowBtn>
        <ArrowBtn onClick={next} side="next"><ChevRight size={20} /></ArrowBtn>
      </div>

      {/* Indicators */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 18,
        padding: 'clamp(16px, 2.5vh, 28px) clamp(24px, 5vw, 64px)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Proyecto ${i + 1}`}
              style={{
                height: 7, width: i === realIndex ? 30 : 7,
                borderRadius: 4,
                background: i === realIndex ? projects[realIndex].accent : 'rgba(255,255,255,0.2)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'width 0.32s cubic-bezier(0.4,0,0.2,1), background 0.32s ease',
              }}
            />
          ))}
        </div>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12, color: 'rgba(255,255,255,0.32)',
          letterSpacing: '0.16em', userSelect: 'none',
        }}>
          {padStr(realIndex)} / {padStr(projects.length - 1)}
        </span>
      </div>

      <style>{`@media (max-width: 480px) { .carousel-arrow { display: none !important; } }`}</style>
    </>
  )
}
