import { useState, useEffect, useRef, useCallback } from 'react'
import { CAROUSEL } from '../utils/constants'

const { CLONES, AUTOPLAY_MS, TRANSITION_MS } = CAROUSEL

export function useCarousel(total) {
  const DISPLAY_OFFSET = CLONES

  const [displayIndex, setDisplayIndex] = useState(DISPLAY_OFFSET)
  const [noAnim, setNoAnim] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const lockRef = useRef(false)

  // Real 0-based index within the original array
  const realIndex = ((displayIndex - DISPLAY_OFFSET) % total + total) % total

  const snapIfNeeded = useCallback((next) => {
    if (next <= CLONES - 1) {
      setTimeout(() => {
        setNoAnim(true)
        setDisplayIndex(next + total)
        requestAnimationFrame(() => requestAnimationFrame(() => setNoAnim(false)))
        lockRef.current = false
      }, TRANSITION_MS)
    } else if (next >= total + CLONES) {
      setTimeout(() => {
        setNoAnim(true)
        setDisplayIndex(next - total)
        requestAnimationFrame(() => requestAnimationFrame(() => setNoAnim(false)))
        lockRef.current = false
      }, TRANSITION_MS)
    } else {
      setTimeout(() => { lockRef.current = false }, TRANSITION_MS)
    }
  }, [total])

  const navigate = useCallback((dir) => {
    if (lockRef.current) return
    lockRef.current = true
    setDisplayIndex(cur => {
      const next = cur + dir
      snapIfNeeded(next)
      return next
    })
  }, [snapIfNeeded])

  const prev = useCallback(() => navigate(-1), [navigate])
  const next = useCallback(() => navigate(1), [navigate])

  const goTo = useCallback((realIdx) => {
    if (lockRef.current) return
    lockRef.current = true
    setDisplayIndex(realIdx + DISPLAY_OFFSET)
    setTimeout(() => { lockRef.current = false }, TRANSITION_MS)
  }, [DISPLAY_OFFSET])

  // Autoplay
  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => navigate(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [isPaused, navigate])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  return {
    displayIndex,
    noAnim,
    realIndex,
    isPaused,
    setIsPaused,
    prev,
    next,
    goTo,
    DISPLAY_OFFSET,
    CLONES,
  }
}
