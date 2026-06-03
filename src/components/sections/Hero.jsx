import { useRef, useEffect } from 'react'
import Navigation from '../common/Navigation'
import TechStack from './TechStack'

export default function Hero() {
  const videoRef   = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onError = () => console.error('Video no encontrado: /assets/hero-video.mp4')
    const onLoaded = () => {
      video.classList.add('is-loaded')
      console.log('%c✓ Video cargado', 'color:#00D9FF; font-weight:700; font-size:13px;')
    }
    const source = video.querySelector('source')

    video.addEventListener('error', onError)
    video.addEventListener('loadeddata', onLoaded)
    if (source) source.addEventListener('error', onError)

    video.play().catch((err) => {
      if (err.name !== 'NotAllowedError') onError()
    })

    return () => {
      video.removeEventListener('error', onError)
      video.removeEventListener('loadeddata', onLoaded)
      if (source) source.removeEventListener('error', onError)
    }
  }, [])

  return (
    <section id="hero">
      <video ref={videoRef} id="bg-video" autoPlay muted loop playsInline preload="metadata" width="1920" height="1080">
        <source src="/assets/hero-video.mp4" type="video/mp4" />
      </video>

      <div id="ov-base"   aria-hidden="true" />
      <div id="ov-dir"    aria-hidden="true" />
      <div id="ov-vign"   aria-hidden="true" />
      <div id="ov-bottom" aria-hidden="true" />

      <Navigation />

      <div id="content" ref={contentRef} style={{ willChange: 'transform' }}>
        <div id="hero-body">
          <div className="hero-text-block">
            <p className="tagline anim-fade d-80">
              <span className="tagline-dash" aria-hidden="true" />
              FULL-STACK DEVELOPER &amp; WEB DESIGNER
            </p>

            <h1 className="headline-h1 d-250" style={{ marginBottom: 'clamp(6px, 1.4vh, 16px)' }}>
              <span className="hero-line">
                <span className="cyan-bar" aria-hidden="true" />
                <span className="headline-word d-250">DE LA IDEA</span>
              </span>
              <span className="hero-line">
                <span className="cyan-bar" aria-hidden="true" />
                <span className="headline-word d-250">AL DEPLOY</span>
              </span>
            </h1>

            <p className="subtitle anim-fade d-350">
              Diseño y desarrollo web a medida: e-commerce con pagos, sistemas
              de reserva y paneles de gestión. Madrid · toda España.
            </p>

            <div className="cta-group anim-fade d-500" style={{ marginTop: '-4px' }}>
              <a href="#contacto" className="btn-primary">
                <span aria-hidden="true">→</span> CONTACTAR
              </a>
              <a href="#portfolio" className="btn-secondary">
                <span aria-hidden="true">●</span> PORTFOLIO
              </a>
            </div>
          </div>
        </div>

        <TechStack />
      </div>
    </section>
  )
}
