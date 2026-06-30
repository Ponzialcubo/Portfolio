// Delay utility for staggered animations
export const staggerDelay = (index, baseMs = 80) => `${index * baseMs}ms`

// CSS keyframe strings (inject via <style> or styled-components)
export const KEYFRAMES = {
  fadeUp: `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `,
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  `,
  scaleIn: `
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.92); }
      to   { opacity: 1; transform: scale(1); }
    }
  `,
}

// Inline style helper for entrance animations
export const fadeUpStyle = (delayMs = 0) => ({
  animation: `fadeUp 0.55s cubic-bezier(0.4,0,0.2,1) ${delayMs}ms both`,
})

export const fadeInStyle = (delayMs = 0) => ({
  animation: `fadeIn 0.45s ease ${delayMs}ms both`,
})
