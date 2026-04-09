'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

type Point = { x: number; y: number }
type TransitionType = 'wave' | 'pulse' | 'rotate' | 'scatter' | 'breathe' | 'spiral'

type Direction = 'none' | 'right' | 'left' | 'up' | 'down' | 'up-right' | 'up-left' | 'down-right' | 'down-left'

type Shape = {
  id: string
  label: string
  points: Point[]
  /** Per-point random seeds for independent motion */
  seeds: { sx: number; sy: number; freq: number }[]
  /** HSL color + opacity */
  hue: number
  saturation: number
  lightness: number
  opacity: number
  transition: TransitionType
  amplitude: number
  speed: number
  roundness: number
  visible: boolean
  /** Movement direction across the frame */
  direction: Direction
  /** Movement speed (pixels per second) */
  moveSpeed: number
}

function shapeColor(s: Shape, opacityOverride?: number): string {
  const a = opacityOverride ?? s.opacity
  return `hsla(${s.hue}, ${s.saturation}%, ${s.lightness}%, ${a})`
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SIZE = 500
const CX = SIZE / 2
const CY = SIZE / 2
const TRANSITIONS: TransitionType[] = ['wave', 'pulse', 'rotate', 'scatter', 'breathe', 'spiral']
const DIRECTIONS: Direction[] = ['none', 'right', 'left', 'up', 'down', 'up-right', 'up-left', 'down-right', 'down-left']

function directionToVector(dir: Direction): { dx: number; dy: number } {
  switch (dir) {
    case 'right':      return { dx: 1, dy: 0 }
    case 'left':       return { dx: -1, dy: 0 }
    case 'up':         return { dx: 0, dy: -1 }
    case 'down':       return { dx: 0, dy: 1 }
    case 'up-right':   return { dx: 0.707, dy: -0.707 }
    case 'up-left':    return { dx: -0.707, dy: -0.707 }
    case 'down-right': return { dx: 0.707, dy: 0.707 }
    case 'down-left':  return { dx: -0.707, dy: 0.707 }
    default:           return { dx: 0, dy: 0 }
  }
}

/** Direction arrow symbols for the UI */
function directionArrow(dir: Direction): string {
  switch (dir) {
    case 'right':      return '\u2192'
    case 'left':       return '\u2190'
    case 'up':         return '\u2191'
    case 'down':       return '\u2193'
    case 'up-right':   return '\u2197'
    case 'up-left':    return '\u2196'
    case 'down-right': return '\u2198'
    case 'down-left':  return '\u2199'
    default:           return '\u25CB'
  }
}

// ─── File download helper ────────────────────────────────────────────────────

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// ─── Color conversion helpers ────────────────────────────────────────────────

function hslToHex(h: number, s: number, l: number): string {
  const s1 = s / 100
  const l1 = l / 100
  const a = s1 * Math.min(l1, 1 - l1)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l1 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break
      case g: h = ((b - r) / d + 2) * 60; break
      case b: h = ((r - g) / d + 4) * 60; break
    }
  }

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) }
}

// ─── Shape generators ────────────────────────────────────────────────────────

function makeSeeds(n: number): Shape['seeds'] {
  return Array.from({ length: n }, () => ({
    sx: Math.random() * 6.28 - 3.14,
    sy: Math.random() * 6.28 - 3.14,
    freq: 0.6 + Math.random() * 0.8,
  }))
}

function generateCircle(n = 32, r = 160): Point[] {
  return Array.from({ length: n }, (_, i) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2
    return { x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r }
  })
}

function generateTriangle(r = 180): Point[] {
  return [0, 1, 2].map((i) => {
    const a = (Math.PI * 2 * i) / 3 - Math.PI / 2
    return { x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r }
  })
}

function generateRectangle(w = 280, h = 220): Point[] {
  return [
    { x: CX - w / 2, y: CY - h / 2 },
    { x: CX + w / 2, y: CY - h / 2 },
    { x: CX + w / 2, y: CY + h / 2 },
    { x: CX - w / 2, y: CY + h / 2 },
  ]
}

function generatePentagon(r = 170): Point[] {
  return Array.from({ length: 5 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 5 - Math.PI / 2
    return { x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r }
  })
}

function generateHexagon(r = 170): Point[] {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 6 - Math.PI / 2
    return { x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r }
  })
}

function generateStar(r = 180, innerR = 80, n = 5): Point[] {
  return Array.from({ length: n * 2 }, (_, i) => {
    const a = (Math.PI * 2 * i) / (n * 2) - Math.PI / 2
    const radius = i % 2 === 0 ? r : innerR
    return { x: CX + Math.cos(a) * radius, y: CY + Math.sin(a) * radius }
  })
}

// ─── Path builder ────────────────────────────────────────────────────────────

function buildPath(points: Point[], roundness: number): string {
  if (points.length < 2) return ''

  if (roundness <= 0) {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z'
  }

  const n = points.length
  const t = roundness

  let d = ''
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n]
    const p1 = points[i]
    const p2 = points[(i + 1) % n]
    const p3 = points[(i + 2) % n]

    if (i === 0) d += `M${p1.x},${p1.y} `

    const cp1x = p1.x + ((p2.x - p0.x) / 6) * t
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * t
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * t
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * t

    d += `C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y} `
  }

  return d + 'Z'
}

// ─── Animation — each point moves independently ─────────────────────────────

function animatePoints(shape: Shape, time: number): Point[] {
  const t = time * shape.speed * 0.001
  const amp = shape.amplitude

  return shape.points.map((p, i) => {
    const seed = shape.seeds[i]
    let dx = 0
    let dy = 0

    switch (shape.transition) {
      case 'wave':
        dx = Math.sin(t * seed.freq + seed.sx) * amp
        dy = Math.cos(t * seed.freq * 0.7 + seed.sy) * amp * 0.6
        break

      case 'pulse': {
        const scale = 1 + Math.sin(t * seed.freq + seed.sx) * amp * 0.008
        dx = (p.x - CX) * (scale - 1)
        dy = (p.y - CY) * (scale - 1)
        break
      }

      case 'rotate': {
        const angle = Math.sin(t * 0.5 * seed.freq + seed.sx) * amp * 0.015
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        const rx = p.x - CX
        const ry = p.y - CY
        dx = rx * cos - ry * sin - rx
        dy = rx * sin + ry * cos - ry
        break
      }

      case 'scatter':
        dx = Math.sin(t * 1.5 * seed.freq + seed.sx) * amp * 1.2
        dy = Math.cos(t * 1.3 * seed.freq + seed.sy) * amp * 1.2
        break

      case 'breathe': {
        const breath = Math.sin(t * 0.4 * seed.freq + seed.sx) * 0.5 + 0.5
        const scale2 = 1 + breath * amp * 0.012
        dx = (p.x - CX) * (scale2 - 1)
        dy = (p.y - CY) * (scale2 - 1)
        break
      }

      case 'spiral': {
        const spiralAngle = t * 0.3 * seed.freq + seed.sx
        const spiralR = Math.sin(t * 0.5 * seed.freq + seed.sy) * amp
        dx = Math.cos(spiralAngle) * spiralR
        dy = Math.sin(spiralAngle) * spiralR
        break
      }
    }

    return { x: p.x + dx, y: p.y + dy }
  })
}

// ─── Color presets (HSL) ─────────────────────────────────────────────────────

const COLOR_PRESETS: { hue: number; saturation: number; lightness: number }[] = [
  { hue: 18, saturation: 93, lightness: 50 },   // terra
  { hue: 82, saturation: 37, lightness: 67 },   // sage
  { hue: 24, saturation: 10, lightness: 12 },   // ink
  { hue: 222, saturation: 44, lightness: 55 },  // blue
  { hue: 320, saturation: 50, lightness: 55 },  // magenta
  { hue: 175, saturation: 50, lightness: 47 },  // teal
]

// ─── Create shape helper ─────────────────────────────────────────────────────

function createShape(type: string, colorIdx: number): Shape {
  let pts: Point[]
  let label: string

  switch (type) {
    case 'circle':    pts = generateCircle();    label = 'Circle';    break
    case 'triangle':  pts = generateTriangle();  label = 'Triangle';  break
    case 'rectangle': pts = generateRectangle(); label = 'Rectangle'; break
    case 'pentagon':  pts = generatePentagon();  label = 'Pentagon';  break
    case 'hexagon':   pts = generateHexagon();   label = 'Hexagon';   break
    case 'star':      pts = generateStar();      label = 'Star';      break
    default:          pts = generateCircle();    label = 'Circle';    break
  }

  const preset = COLOR_PRESETS[colorIdx % COLOR_PRESETS.length]

  return {
    id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    label,
    points: pts,
    seeds: makeSeeds(pts.length),
    hue: preset.hue,
    saturation: preset.saturation,
    lightness: preset.lightness,
    opacity: 0.35,
    transition: 'wave',
    amplitude: 25,
    speed: 1,
    roundness: 0.8,
    visible: true,
    direction: 'none',
    moveSpeed: 30,
  }
}

// ─── Default shapes ──────────────────────────────────────────────────────────

const DEFAULT_SHAPES: Shape[] = [
  { ...createShape('circle', 0), id: 'circle' },
  { ...createShape('triangle', 1), id: 'triangle' },
  { ...createShape('rectangle', 2), id: 'rectangle' },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function SvgMorphTool() {
  const [shapes, setShapes] = useState<Shape[]>(DEFAULT_SHAPES)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showPoints, setShowPoints] = useState(false)
  const [time, setTime] = useState(0)
  const [expandedId, setExpandedId] = useState<string | null>('circle')
  const animRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return

    lastTimeRef.current = performance.now()

    const tick = (now: number) => {
      const delta = now - lastTimeRef.current
      lastTimeRef.current = now
      setTime((prev) => prev + delta)
      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [isPlaying])

  const updateShape = useCallback((id: string, updates: Partial<Shape>) => {
    setShapes((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)))
  }, [])

  const addShape = useCallback((type: string) => {
    const shape = createShape(type, shapes.length)
    setShapes((prev) => [...prev, shape])
    setExpandedId(shape.id)
  }, [shapes.length])

  const removeShape = useCallback((id: string) => {
    setShapes((prev) => prev.filter((s) => s.id !== id))
    setExpandedId((prev) => (prev === id ? null : prev))
  }, [])

  const reseedShape = useCallback((id: string) => {
    setShapes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, seeds: makeSeeds(s.points.length) } : s)),
    )
  }, [])

  const randomizeAll = useCallback(() => {
    const shapeTypes = ['circle', 'triangle', 'rectangle', 'pentagon', 'hexagon', 'star']
    const count = 2 + Math.floor(Math.random() * 4) // 2–5 shapes

    const newShapes: Shape[] = Array.from({ length: count }, (_, i) => {
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)]
      const base = createShape(type, i)
      return {
        ...base,
        hue: Math.floor(Math.random() * 360),
        saturation: 30 + Math.floor(Math.random() * 60),
        lightness: 30 + Math.floor(Math.random() * 40),
        opacity: 0.15 + Math.random() * 0.5,
        transition: TRANSITIONS[Math.floor(Math.random() * TRANSITIONS.length)],
        amplitude: 5 + Math.floor(Math.random() * 70),
        speed: 0.3 + Math.random() * 2.5,
        roundness: Math.random(),
        direction: DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)],
        moveSpeed: 10 + Math.floor(Math.random() * 120),
      }
    })

    setShapes(newShapes)
    setTime(0)
    setExpandedId(newShapes[0].id)
    setIsPlaying(true)
  }, [])

  // ─── Export: render one frame to SVG string ──────────────────────────────────

  const renderFrameSvg = useCallback((shapesArr: Shape[], frameTime: number): string => {
    let paths = ''

    for (const shape of shapesArr.filter((s) => s.visible)) {
      const animatedPts = animatePoints(shape, frameTime)
      const pathD = buildPath(animatedPts, shape.roundness)

      const vec = directionToVector(shape.direction)
      const timeSec = frameTime * 0.001
      const rawX = vec.dx * shape.moveSpeed * timeSec
      const rawY = vec.dy * shape.moveSpeed * timeSec
      const ox = ((rawX % SIZE) + SIZE) % SIZE
      const oy = ((rawY % SIZE) + SIZE) % SIZE

      const offsets = [
        [0, 0], [-SIZE, 0], [SIZE, 0],
        [0, -SIZE], [0, SIZE],
        [-SIZE, -SIZE], [SIZE, -SIZE],
        [-SIZE, SIZE], [SIZE, SIZE],
      ]

      const fill = shapeColor(shape)
      const stroke = shapeColor(shape, Math.min(shape.opacity + 0.35, 1))

      for (const [tx, ty] of offsets) {
        paths += `<g transform="translate(${ox + tx},${oy + ty})"><path d="${pathD}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" style="mix-blend-mode:multiply"/></g>\n`
      }
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">\n<defs><clipPath id="c"><rect width="${SIZE}" height="${SIZE}"/></clipPath></defs>\n<rect width="${SIZE}" height="${SIZE}" fill="#E8E8E8"/>\n<g clip-path="url(#c)">\n${paths}</g>\n</svg>`
  }, [])

  // ─── Export: still SVG (P key) ───────────────────────────────────────────────

  const exportStill = useCallback(() => {
    const svg = renderFrameSvg(shapes, time)
    downloadFile(svg, 'morph-still.svg', 'image/svg+xml')
  }, [shapes, time, renderFrameSvg])

  // ─── Export: animated SVG loop (128 frames) ──────────────────────────────────

  const exportAnimatedLoop = useCallback(() => {
    const FRAMES = 128
    const loopDuration = 6 // seconds
    const frameInterval = (loopDuration * 1000) / FRAMES // ms between frames

    const visibleShapes = shapes.filter((s) => s.visible)
    if (visibleShapes.length === 0) return

    // Sample 128 frames per shape, collecting path data + transforms
    type FrameData = { pathD: string; ox: number; oy: number }
    const shapeFrames: Map<string, FrameData[]> = new Map()

    for (const shape of visibleShapes) {
      const frames: FrameData[] = []
      for (let f = 0; f < FRAMES; f++) {
        const frameTime = time + f * frameInterval
        const animatedPts = animatePoints(shape, frameTime)
        const pathD = buildPath(animatedPts, shape.roundness)

        const vec = directionToVector(shape.direction)
        const timeSec = frameTime * 0.001
        const rawX = vec.dx * shape.moveSpeed * timeSec
        const rawY = vec.dy * shape.moveSpeed * timeSec
        const ox = ((rawX % SIZE) + SIZE) % SIZE
        const oy = ((rawY % SIZE) + SIZE) % SIZE

        frames.push({ pathD, ox, oy })
      }
      shapeFrames.set(shape.id, frames)
    }

    // Build animated SVG with SMIL animations
    let content = ''

    for (const shape of visibleShapes) {
      const frames = shapeFrames.get(shape.id)!
      const fill = shapeColor(shape)
      const stroke = shapeColor(shape, Math.min(shape.opacity + 0.35, 1))

      const pathValues = frames.map((f) => f.pathD).join(';')

      // For wrapping: animate the translate for each tiled copy
      const offsets = [
        [0, 0], [-SIZE, 0], [SIZE, 0],
        [0, -SIZE], [0, SIZE],
        [-SIZE, -SIZE], [SIZE, -SIZE],
        [-SIZE, SIZE], [SIZE, SIZE],
      ]

      for (const [tx, ty] of offsets) {
        const translateValues = frames
          .map((f) => `${f.ox + tx} ${f.oy + ty}`)
          .join(';')

        content += `<g>\n`
        content += `  <animateTransform attributeName="transform" type="translate" values="${translateValues}" dur="${loopDuration}s" repeatCount="indefinite" calcMode="linear"/>\n`
        content += `  <path fill="${fill}" stroke="${stroke}" stroke-width="1.5" style="mix-blend-mode:multiply">\n`
        content += `    <animate attributeName="d" values="${pathValues}" dur="${loopDuration}s" repeatCount="indefinite" calcMode="linear"/>\n`
        content += `  </path>\n`
        content += `</g>\n`
      }
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">\n<defs><clipPath id="c"><rect width="${SIZE}" height="${SIZE}"/></clipPath></defs>\n<rect width="${SIZE}" height="${SIZE}" fill="#E8E8E8"/>\n<g clip-path="url(#c)">\n${content}</g>\n</svg>`

    downloadFile(svg, 'morph-loop.svg', 'image/svg+xml')
  }, [shapes, time, renderFrameSvg])

  // ─── Keyboard shortcuts ──────────────────────────────────────────────────────

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignore when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault()
        exportStill()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [exportStill])

  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

      {/* ─── SVG Canvas ─── */}
      <div
        style={{
          width: SIZE,
          height: SIZE,
          flexShrink: 0,
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-surface)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <svg width={SIZE} height={SIZE} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width={SIZE} height={SIZE} fill="url(#grid)" />
          <line x1={CX} y1={0} x2={CX} y2={SIZE} stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1={0} y1={CY} x2={SIZE} y2={CY} stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" strokeDasharray="4 4" />
        </svg>

        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <defs>
            <clipPath id="frame-clip">
              <rect width={SIZE} height={SIZE} />
            </clipPath>
          </defs>
          <g clipPath="url(#frame-clip)">
            {shapes.filter((s) => s.visible).map((shape) => {
              const animatedPts = animatePoints(shape, time)
              const path = buildPath(animatedPts, shape.roundness)

              // Calculate translation offset with wrapping
              const vec = directionToVector(shape.direction)
              const timeSec = time * 0.001
              const rawOffsetX = vec.dx * shape.moveSpeed * timeSec
              const rawOffsetY = vec.dy * shape.moveSpeed * timeSec
              // Wrap: modulo SIZE so shape reappears from opposite side
              const offsetX = ((rawOffsetX % SIZE) + SIZE) % SIZE
              const offsetY = ((rawOffsetY % SIZE) + SIZE) % SIZE

              // Render shape at offset + 8 tiled copies for seamless wrapping
              const offsets = [
                [0, 0], [-SIZE, 0], [SIZE, 0],
                [0, -SIZE], [0, SIZE],
                [-SIZE, -SIZE], [SIZE, -SIZE],
                [-SIZE, SIZE], [SIZE, SIZE],
              ]

              return (
                <g key={shape.id}>
                  {offsets.map(([tx, ty], oi) => (
                    <g key={oi} transform={`translate(${offsetX + tx},${offsetY + ty})`}>
                      <path
                        d={path}
                        fill={shapeColor(shape)}
                        stroke={shapeColor(shape, Math.min(shape.opacity + 0.35, 1))}
                        strokeWidth={1.5}
                        style={{ mixBlendMode: 'multiply' }}
                      />
                      {showPoints && animatedPts.map((pt, pi) => (
                        <circle
                          key={pi}
                          cx={pt.x}
                          cy={pt.y}
                          r={3}
                          fill={shapeColor(shape, 0.9)}
                          stroke="white"
                          strokeWidth={1}
                        />
                      ))}
                    </g>
                  ))}
                </g>
              )
            })}
          </g>
        </svg>
      </div>

      {/* ─── Controls ─── */}
      <div style={{ flex: 1, minWidth: 300 }}>

        {/* Global playback */}
        <ControlSection label="Playback">
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setIsPlaying(!isPlaying)} style={btnStyle}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button onClick={() => { setTime(0); setIsPlaying(false) }} style={btnStyle}>
              Reset
            </button>
            <button
              onClick={randomizeAll}
              style={{
                ...btnStyle,
                borderColor: 'var(--color-terra)',
                color: 'var(--color-terra)',
                fontWeight: 500,
              }}
            >
              Randomize All
            </button>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-ink-muted)', cursor: 'pointer', marginLeft: 'auto' }}>
              <input type="checkbox" checked={showPoints} onChange={(e) => setShowPoints(e.target.checked)} />
              Points
            </label>
          </div>
        </ControlSection>

        {/* Export */}
        <ControlSection label="Export">
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={exportStill} style={btnStyle}>
              Still SVG
            </button>
            <button onClick={exportAnimatedLoop} style={btnStyle}>
              Loop SVG (128 frames)
            </button>
            <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: 'var(--color-ink-subtle)', marginLeft: 'auto' }}>
              P = save still
            </span>
          </div>
        </ControlSection>

        {/* Add shapes */}
        <ControlSection label="Add Shape">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {['circle', 'triangle', 'rectangle', 'pentagon', 'hexagon', 'star'].map((type) => (
              <button key={type} onClick={() => addShape(type)} style={btnStyle}>
                + {type}
              </button>
            ))}
          </div>
        </ControlSection>

        {/* Per-shape controls */}
        <ControlSection label={`Shapes (${shapes.length})`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {shapes.map((shape) => {
              const isExpanded = expandedId === shape.id
              return (
                <div
                  key={shape.id}
                  style={{
                    border: `1px solid ${isExpanded ? 'var(--color-terra)' : 'var(--color-border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {/* Header row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.6rem',
                      cursor: 'pointer',
                      backgroundColor: isExpanded ? 'rgba(244,77,11,0.04)' : 'transparent',
                    }}
                    onClick={() => setExpandedId(isExpanded ? null : shape.id)}
                  >
                    <span
                      style={{
                        width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                        backgroundColor: shapeColor(shape, 0.8),
                        border: '1px solid rgba(0,0,0,0.1)',
                      }}
                    />
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-ink)', flex: 1 }}>
                      {shape.label}
                      <span style={{ color: 'var(--color-ink-subtle)', marginLeft: '0.4rem' }}>
                        {shape.points.length} pts
                      </span>
                    </span>
                    {/* Visibility toggle */}
                    <button
                      onClick={(e) => { e.stopPropagation(); updateShape(shape.id, { visible: !shape.visible }) }}
                      style={{ ...iconBtnStyle, opacity: shape.visible ? 1 : 0.35 }}
                      title={shape.visible ? 'Hide' : 'Show'}
                    >
                      {shape.visible ? '◉' : '○'}
                    </button>
                    {/* Remove */}
                    <button
                      onClick={(e) => { e.stopPropagation(); removeShape(shape.id) }}
                      style={iconBtnStyle}
                      title="Remove"
                    >
                      &times;
                    </button>
                    {/* Expand arrow */}
                    <span style={{ fontSize: '0.6rem', color: 'var(--color-ink-subtle)', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      ▼
                    </span>
                  </div>

                  {/* Expanded controls */}
                  {isExpanded && (
                    <div style={{ padding: '0.5rem 0.6rem 0.75rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

                      {/* Transition */}
                      <div>
                        <MiniLabel>Transition</MiniLabel>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                          {TRANSITIONS.map((tr) => (
                            <button
                              key={tr}
                              onClick={() => updateShape(shape.id, { transition: tr })}
                              style={{
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.65rem',
                                fontFamily: 'var(--font-mono)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.06em',
                                border: `1px solid ${shape.transition === tr ? 'var(--color-terra)' : 'var(--color-border)'}`,
                                borderRadius: 'var(--radius-full)',
                                backgroundColor: shape.transition === tr ? 'var(--color-terra)' : 'transparent',
                                color: shape.transition === tr ? 'white' : 'var(--color-ink-muted)',
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                              }}
                            >
                              {tr}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Color */}
                      <div>
                        <MiniLabel>Color</MiniLabel>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div
                            style={{
                              width: 28, height: 28, borderRadius: 'var(--radius-sm)', flexShrink: 0,
                              backgroundColor: shapeColor(shape),
                              border: '1px solid rgba(0,0,0,0.15)',
                            }}
                          />
                          <input
                            type="color"
                            value={hslToHex(shape.hue, shape.saturation, shape.lightness)}
                            onChange={(e) => {
                              const { h, s, l } = hexToHsl(e.target.value)
                              updateShape(shape.id, { hue: h, saturation: s, lightness: l })
                            }}
                            style={{ width: 28, height: 28, padding: 0, border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
                            title="Pick color"
                          />
                        </div>
                      </div>

                      {/* Opacity */}
                      <div>
                        <MiniLabel>Opacity — {Math.round(shape.opacity * 100)}%</MiniLabel>
                        <input
                          type="range" min={0.05} max={1} step={0.05}
                          value={shape.opacity}
                          onChange={(e) => updateShape(shape.id, { opacity: parseFloat(e.target.value) })}
                          style={{ width: '100%', accentColor: 'var(--color-terra)' }}
                        />
                      </div>

                      {/* Roundness */}
                      <div>
                        <MiniLabel>Edges — {shape.roundness <= 0.1 ? 'Sharp' : shape.roundness >= 0.9 ? 'Round' : 'Mixed'}</MiniLabel>
                        <input
                          type="range" min={0} max={1} step={0.01}
                          value={shape.roundness}
                          onChange={(e) => updateShape(shape.id, { roundness: parseFloat(e.target.value) })}
                          style={{ width: '100%', accentColor: 'var(--color-terra)' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', color: 'var(--color-ink-subtle)', fontFamily: 'var(--font-mono)' }}>
                          <span>SHARP</span><span>ROUND</span>
                        </div>
                      </div>

                      {/* Amplitude */}
                      <div>
                        <MiniLabel>Amplitude — {shape.amplitude}px</MiniLabel>
                        <input
                          type="range" min={0} max={80} step={1}
                          value={shape.amplitude}
                          onChange={(e) => updateShape(shape.id, { amplitude: parseInt(e.target.value) })}
                          style={{ width: '100%', accentColor: 'var(--color-terra)' }}
                        />
                      </div>

                      {/* Speed */}
                      <div>
                        <MiniLabel>Speed — {shape.speed.toFixed(1)}x</MiniLabel>
                        <input
                          type="range" min={0.1} max={3} step={0.1}
                          value={shape.speed}
                          onChange={(e) => updateShape(shape.id, { speed: parseFloat(e.target.value) })}
                          style={{ width: '100%', accentColor: 'var(--color-terra)' }}
                        />
                      </div>

                      {/* Direction */}
                      <div>
                        <MiniLabel>Direction</MiniLabel>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                          {DIRECTIONS.map((dir) => (
                            <button
                              key={dir}
                              onClick={() => updateShape(shape.id, { direction: dir })}
                              style={{
                                width: 30, height: 30,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: dir === 'none' ? '0.65rem' : '0.85rem',
                                fontFamily: 'var(--font-mono)',
                                border: `1px solid ${shape.direction === dir ? 'var(--color-terra)' : 'var(--color-border)'}`,
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: shape.direction === dir ? 'var(--color-terra)' : 'transparent',
                                color: shape.direction === dir ? 'white' : 'var(--color-ink-muted)',
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                              }}
                              title={dir}
                            >
                              {directionArrow(dir)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Move Speed */}
                      {shape.direction !== 'none' && (
                        <div>
                          <MiniLabel>Move Speed — {shape.moveSpeed}px/s</MiniLabel>
                          <input
                            type="range" min={5} max={150} step={5}
                            value={shape.moveSpeed}
                            onChange={(e) => updateShape(shape.id, { moveSpeed: parseInt(e.target.value) })}
                            style={{ width: '100%', accentColor: 'var(--color-terra)' }}
                          />
                        </div>
                      )}

                      {/* Reseed button */}
                      <button
                        onClick={() => reseedShape(shape.id)}
                        style={{ ...btnStyle, alignSelf: 'flex-start' }}
                      >
                        Randomize Points
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
            {shapes.length === 0 && (
              <p style={{ fontSize: '0.75rem', color: 'var(--color-ink-subtle)', fontStyle: 'italic' }}>
                No shapes — add one above
              </p>
            )}
          </div>
        </ControlSection>

      </div>
    </div>
  )
}

// ─── Shared UI ───────────────────────────────────────────────────────────────

function ControlSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <p style={{
        fontSize: '0.6875rem', fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase', letterSpacing: '0.1em',
        color: 'var(--color-ink-muted)', marginBottom: '0.5rem',
      }}>
        {label}
      </p>
      {children}
    </div>
  )
}

function MiniLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: '0.6rem', fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase', letterSpacing: '0.08em',
      color: 'var(--color-ink-subtle)', marginBottom: '0.25rem',
    }}>
      {children}
    </p>
  )
}

const btnStyle: React.CSSProperties = {
  padding: '0.35rem 0.75rem',
  fontSize: '0.7rem',
  fontFamily: 'var(--font-mono)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: 'transparent',
  color: 'var(--color-ink)',
  cursor: 'pointer',
}

const iconBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--color-ink-subtle)',
  fontSize: '0.9rem',
  padding: '0 0.2rem',
  lineHeight: 1,
}
