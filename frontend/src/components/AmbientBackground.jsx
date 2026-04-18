// frontend/src/components/AmbientBackground.jsx
// Floating ember particles + layered fog gradients
import { useEffect, useRef } from 'react'

export default function AmbientBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.08),
      opacity: Math.random() * 0.55 + 0.08,
      phase: Math.random() * Math.PI * 2,
    }))

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.x += p.vx + Math.sin(Date.now() / 3000 + p.phase) * 0.12
        p.y += p.vy
        p.phase += 0.008

        if (p.y < -12) { p.y = canvas.height + 12; p.x = Math.random() * canvas.width }
        if (p.x < -12) p.x = canvas.width + 12
        if (p.x > canvas.width + 12) p.x = -12

        const alpha = p.opacity * (0.55 + 0.45 * Math.sin(p.phase * 1.3))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,151,58,${alpha})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      {/* Ember particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 0, opacity: 0.7,
        }}
      />
      {/* Radial glow at center */}
      <div style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,151,58,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Bottom vignette */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0,
        width: '100%', height: '220px',
        background: 'linear-gradient(to top, rgba(10,8,6,0.9) 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
    </>
  )
}
