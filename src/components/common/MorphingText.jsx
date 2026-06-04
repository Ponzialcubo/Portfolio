// MorphingText — rota entre un array de palabras con transición blur + fade.
// Inspirado en Magic UI "Morphing Text". Pure CSS transitions, zero deps.

import { useState, useEffect } from 'react'

export default function MorphingText({
  words    = [],
  interval = 2800,   // ms entre cambios
  style    = {},
}) {
  const [idx, setIdx]         = useState(0)
  const [blurOut, setBlurOut] = useState(false)

  useEffect(() => {
    if (words.length < 2) return
    const t = setInterval(() => {
      setBlurOut(true)
      setTimeout(() => {
        setIdx(i => (i + 1) % words.length)
        setBlurOut(false)
      }, 350)
    }, interval)
    return () => clearInterval(t)
  }, [words, interval])

  return (
    <span
      style={{
        display: 'inline-block',
        filter:     blurOut ? 'blur(10px)' : 'blur(0px)',
        opacity:    blurOut ? 0 : 1,
        transform:  blurOut ? 'scale(0.96)' : 'scale(1)',
        transition: 'filter 0.35s ease, opacity 0.35s ease, transform 0.35s ease',
        willChange: 'filter, opacity, transform',
        ...style,
      }}
    >
      {words[idx]}
    </span>
  )
}
