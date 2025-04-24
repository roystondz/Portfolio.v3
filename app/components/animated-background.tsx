"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Grid settings
    const gridSize = 40
    const gridWidth = Math.ceil(canvas.width / gridSize) + 1
    const gridHeight = Math.ceil(canvas.height / gridSize) + 1

    // Create grid points
    const points = []
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        points.push({
          x: x * gridSize,
          y: y * gridSize,
          originX: x * gridSize,
          originY: y * gridSize,
          vx: 0,
          vy: 0,
        })
      }
    }

    let mouseX = 0
    let mouseY = 0
    const mouseRadius = 200
    let animationActive = true

    const animate = () => {
      if (!ctx || !animationActive) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw grid
      for (let i = 0; i < points.length; i++) {
        const point = points[i]

        // Calculate distance from mouse
        const dx = mouseX - point.x
        const dy = mouseY - point.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Apply force if within radius
        if (distance < mouseRadius) {
          const force = (1 - distance / mouseRadius) * 0.2
          point.vx -= dx * force
          point.vy -= dy * force
        }

        // Apply spring force to return to original position
        point.vx += (point.originX - point.x) * 0.05
        point.vy += (point.originY - point.y) * 0.05

        // Apply friction
        point.vx *= 0.9
        point.vy *= 0.9

        // Update position
        point.x += point.vx
        point.y += point.vy
      }

      // Draw grid lines
      ctx.beginPath()
      ctx.strokeStyle = "rgba(0, 255, 0, 0.05)"

      // Horizontal lines
      for (let y = 0; y < gridHeight; y++) {
        ctx.moveTo(0, points[y * gridWidth].y)

        for (let x = 0; x < gridWidth; x++) {
          const point = points[y * gridWidth + x]
          ctx.lineTo(point.x, point.y)
        }
      }

      // Vertical lines
      for (let x = 0; x < gridWidth; x++) {
        ctx.moveTo(points[x].x, 0)

        for (let y = 0; y < gridHeight; y++) {
          const point = points[y * gridWidth + x]
          ctx.lineTo(point.x, point.y)
        }
      }

      ctx.stroke()

      requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Recalculate grid
      const newGridWidth = Math.ceil(canvas.width / gridSize) + 1
      const newGridHeight = Math.ceil(canvas.height / gridSize) + 1

      // Reset points array
      points.length = 0

      for (let y = 0; y < newGridHeight; y++) {
        for (let x = 0; x < newGridWidth; x++) {
          points.push({
            x: x * gridSize,
            y: y * gridSize,
            originX: x * gridSize,
            originY: y * gridSize,
            vx: 0,
            vy: 0,
          })
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    animate()

    return () => {
      animationActive = false
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-30" />
}
