'use client'

import React, { useEffect, useRef } from 'react'

type ConfettiBurstProps = {
  startOnMount?: boolean
  durationMs?: number
  particleCount?: number
  zIndex?: number
}

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rotation: number
  rotationSpeed: number
  gravity: number
  drag: number
  color: string
  shape: 'rect' | 'heart' | 'spark'
  life: number
  maxLife: number
}

const PALETTE = ['#ff5a8b', '#ff8fa3', '#ffd166', '#8be0ff', '#a3ffcf', '#c9a3ff']

function drawHeart(ctx: CanvasRenderingContext2D, size: number) {
  const s = size
  ctx.beginPath()
  ctx.moveTo(0, s * 0.35)
  ctx.bezierCurveTo(0, -s * 0.2, s * 0.9, -s * 0.1, 0, s)
  ctx.bezierCurveTo(-s * 0.9, -s * 0.1, 0, -s * 0.2, 0, s * 0.35)
  ctx.closePath()
}

function drawSpark(ctx: CanvasRenderingContext2D, size: number) {
  const s = size
  ctx.beginPath()
  ctx.moveTo(0, -s)
  ctx.lineTo(s * 0.2, -s * 0.2)
  ctx.lineTo(s, 0)
  ctx.lineTo(s * 0.2, s * 0.2)
  ctx.lineTo(0, s)
  ctx.lineTo(-s * 0.2, s * 0.2)
  ctx.lineTo(-s, 0)
  ctx.lineTo(-s * 0.2, -s * 0.2)
  ctx.closePath()
}

export default function ConfettiBurst({
  startOnMount = true,
  durationMs = 1800,
  particleCount = 180,
  zIndex = 60,
}: ConfettiBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!startOnMount) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: Particle[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawn = () => {
      const { innerWidth: w, innerHeight: h } = window
      const emitters = [
        { x: w * 0.5, y: h * 0.15 },
        { x: w * 0.25, y: h * 0.2 },
        { x: w * 0.75, y: h * 0.2 },
      ]
      for (let i = 0; i < particleCount; i += 1) {
        const emitter = emitters[i % emitters.length]
        const angle = (Math.random() * Math.PI) / 1.5 + Math.PI * 0.25
        const speed = 4 + Math.random() * 5.5
        const shape: Particle['shape'] =
          Math.random() < 0.2 ? 'heart' : Math.random() < 0.5 ? 'spark' : 'rect'

        particles.push({
          x: emitter.x + (Math.random() - 0.5) * 60,
          y: emitter.y + (Math.random() - 0.5) * 40,
          vx: Math.cos(angle) * speed * (Math.random() < 0.5 ? -1 : 1),
          vy: -Math.abs(Math.sin(angle) * speed) - 2,
          size: 6 + Math.random() * 8,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.25,
          gravity: 0.12 + Math.random() * 0.1,
          drag: 0.992 - Math.random() * 0.01,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          shape,
          life: 0,
          maxLife: 90 + Math.floor(Math.random() * 60),
        })
      }
    }

    const start = performance.now()
    resize()
    spawn()

    const tick = (now: number) => {
      const elapsed = now - start
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i]
        p.life += 1
        p.vx *= p.drag
        p.vy = p.vy * p.drag + p.gravity
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed

        const alpha = Math.max(0, 1 - p.life / p.maxLife)
        if (alpha <= 0 || p.y > window.innerHeight + 60) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.fillStyle = p.color

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size * 0.5, -p.size * 0.3, p.size, p.size * 0.6)
        } else if (p.shape === 'heart') {
          drawHeart(ctx, p.size * 0.7)
          ctx.fill()
        } else {
          drawSpark(ctx, p.size * 0.6)
          ctx.fill()
        }

        ctx.restore()
      }

      if (elapsed < durationMs || particles.length > 0) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    window.addEventListener('resize', resize)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [durationMs, particleCount, startOnMount])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex,
      }}
    />
  )
}
