"use client"

import { useEffect, useRef } from "react"

interface ParticleFieldProps {
  theme: string
}

export default function ParticleField({ theme }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Particle settings
    const particleCount = 100
    const particles = []

    const particleColor = theme === "dark" ? { r: 0, g: 200, b: 255 } : { r: 0, g: 150, b: 200 }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(${particleColor.r}, ${particleColor.g}, ${particleColor.b}, ${Math.random() * 0.5 + 0.2})`,
        vx: Math.random() * 1 - 0.5,
        vy: Math.random() * 1 - 0.5,
        connect: [],
      })
    }

    let animationActive = true

    const animate = () => {
      if (!ctx || !animationActive) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move particle
        p.x += p.vx
        p.y += p.vy

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        // Find connections
        p.connect = []
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            p.connect.push({
              p: p2,
              opacity: 1 - distance / 150,
            })
          }
        }

        // Draw connections
        for (const connection of p.connect) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(connection.p.x, connection.p.y)
          ctx.strokeStyle = `rgba(${particleColor.r}, ${particleColor.g}, ${particleColor.b}, ${connection.opacity * 0.2})`
          ctx.stroke()
        }
      }

      requestAnimationFrame(animate)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    animate()

    return () => {
      animationActive = false
      window.removeEventListener("resize", handleResize)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />
}
