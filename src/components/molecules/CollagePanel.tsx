'use client'

/**
 * CollagePanel — v5: Phase-specific editorial illustrations
 *
 * Each variant is a distinct SVG composition expressing the conceptual
 * identity of the corresponding Systemshift phase.
 *
 *   analyse        → The Lens:   concentric rings converging to a focal point
 *   change         → The Motion: diagonal vectors, sparse→dense (acceleration)
 *   responsibility → The Knot:   two overlapping circles, terra-filled intersection
 *   iterate        → The Spiral: expanding Archimedean spiral
 *   overall        → Quadrant montage of all four motifs
 *
 * Palette (hard-coded — CSS vars unreliable in SVG fill/stroke attributes):
 *   bg  #EDEAE6  ·  ink  #1A1714  ·  terra  #F44D0B  ·  sage  #B8CC8A
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface CollagePanelProps {
  variant?: 'analyse' | 'change' | 'responsibility' | 'iterate' | 'overall'
}

// ─── Palette ──────────────────────────────────────────────────────────────────

const BG    = '#EDEAE6'
const INK   = '#1A1714'
const TERRA = '#F44D0B'
const SAGE  = '#B8CC8A'

// ─── Spiral path helper ───────────────────────────────────────────────────────

/**
 * Returns SVG path data for an Archimedean spiral.
 * r = b·θ, starting from the top (−π/2 phase offset).
 */
function makeSpiral(
  cx: number, cy: number,
  turns: number, maxR: number,
  steps = 320,
): string {
  const tMax = turns * 2 * Math.PI
  const b    = maxR / tMax
  const pts: string[] = []
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * tMax
    const r = b * t
    const x = (cx + r * Math.cos(t - Math.PI / 2)).toFixed(1)
    const y = (cy + r * Math.sin(t - Math.PI / 2)).toFixed(1)
    pts.push(`${i === 0 ? 'M' : 'L'}${x},${y}`)
  }
  return pts.join(' ')
}

// Pre-compute spirals at module level (avoids per-render allocation)
const SPIRAL_MAIN = makeSpiral(300, 300, 3.5, 272)
const SPIRAL_BR   = makeSpiral(450, 450, 2.5, 128)

// ─── ANALYSE — The Lens ───────────────────────────────────────────────────────
/**
 * Concentric rings narrowing to a focal point.
 * A horizontal hairline bisects the composition — the precise gaze.
 */

function LensSVG() {
  const rings = [268, 218, 168, 118, 70, 28]
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}>
      {/* Concentric rings — terra, progressively stronger toward centre */}
      {rings.map((r, i) => (
        <circle key={r} cx={300} cy={300} r={r}
          fill="none" stroke={TERRA}
          strokeWidth={0.75 + i * 0.4}
          opacity={0.05 + i * 0.12}
        />
      ))}
      {/* Primary hairline — horizontal axis */}
      <line x1={0} y1={300} x2={600} y2={300}
        stroke={INK} strokeWidth={0.75} opacity={0.22} />
      {/* Secondary hairline — vertical */}
      <line x1={300} y1={0} x2={300} y2={600}
        stroke={INK} strokeWidth={0.75} opacity={0.09} />
      {/* Lens brackets — arcs above and below the horizontal */}
      <path d="M 22,300 A 278,278 0 0 1 578,300"
        fill="none" stroke={INK} strokeWidth={0.75} opacity={0.12} />
      <path d="M 22,300 A 278,278 0 0 0 578,300"
        fill="none" stroke={INK} strokeWidth={0.75} opacity={0.07} />
      {/* Focal dot */}
      <circle cx={300} cy={300} r={11} fill={BG} />
      <circle cx={300} cy={300} r={7}  fill={TERRA} opacity={0.92} />
    </svg>
  )
}

// ─── CHANGE — The Motion ──────────────────────────────────────────────────────
/**
 * Diagonal lines at 45° (y = x + c), sparse at upper-right → dense at lower-left.
 * Reads as kinetic acceleration: momentum building as it sweeps across the canvas.
 *
 * Lines clipped to viewBox 600×600.
 * x1 = max(0,−c), y1 = max(0,c), x2 = min(600,600−c), y2 = min(600,600+c)
 */

// c-values: few at top-right (large negative c) → many packed at lower-left
const MOTION_C = [
  // Sparse — upper-right area
  -520, -400, -270,
  // Building — crossing the canvas
  -180, -110, -55, -10,
  // Dense — lower-left accumulation
  28, 60, 90, 118, 144, 168, 190,
  210, 228, 246, 262, 278, 293, 308,
  322, 338, 355, 374, 396, 424, 458,
]

type MotionLine = [number, number, number, number, string, number, number]

const MOTION_LINES: MotionLine[] = MOTION_C.map((c, i) => {
  const x1 = Math.max(0, -c)
  const y1 = Math.max(0,  c)
  const x2 = Math.min(600, 600 - c)
  const y2 = Math.min(600, 600 + c)
  const midY   = (y1 + y2) / 2
  const density = Math.min(1, midY / 500)
  const color   = (i % 7 === 2 || i % 7 === 5) ? TERRA : SAGE
  return [x1, y1, x2, y2, color, 0.14 + density * 0.62, 0.5 + density * 2.2]
})

function MotionSVG() {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}>
      {MOTION_LINES.map(([x1, y1, x2, y2, color, opacity, width], i) => (
        <line key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={color} strokeWidth={width} opacity={opacity}
          strokeLinecap="round"
        />
      ))}
    </svg>
  )
}

// ─── RESPONSIBILITY — The Knot ────────────────────────────────────────────────
/**
 * Two large overlapping circles — a Venn diagram.
 * The shared lens intersection is filled with terra: the space of commitment.
 *
 * Circle geometry:
 *   r = 165, centres at (215, 300) and (385, 300), distance = 170
 *   Intersection x = 300
 *   Intersection y = 300 ± √(165²−85²) = 300 ± √(19800) ≈ 300 ± 141
 */
const KNOT_R  = 165
const KNOT_LX = 215
const KNOT_RX = 385
const KNOT_CY = 300
const KNOT_OFF = KNOT_RX - 300  // = 85
const KNOT_YO  = Math.round(Math.sqrt(KNOT_R * KNOT_R - KNOT_OFF * KNOT_OFF)) // ≈ 141

// Lens path: arc of left circle (CW, short) + arc of right circle (CW, short)
const KNOT_LENS = `M 300,${KNOT_CY - KNOT_YO} A ${KNOT_R},${KNOT_R} 0 0 1 300,${KNOT_CY + KNOT_YO} A ${KNOT_R},${KNOT_R} 0 0 1 300,${KNOT_CY - KNOT_YO} Z`

function KnotSVG() {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}>
      {/* Left circle */}
      <circle cx={KNOT_LX} cy={KNOT_CY} r={KNOT_R}
        fill="none" stroke={INK} strokeWidth={1.5} opacity={0.5} />
      {/* Right circle */}
      <circle cx={KNOT_RX} cy={KNOT_CY} r={KNOT_R}
        fill="none" stroke={INK} strokeWidth={1.5} opacity={0.5} />
      {/* Shared intersection — terra fill */}
      <path d={KNOT_LENS} fill={TERRA} opacity={0.78} />
      {/* Centre marks */}
      <circle cx={KNOT_LX} cy={KNOT_CY} r={4} fill={INK} opacity={0.2} />
      <circle cx={KNOT_RX} cy={KNOT_CY} r={4} fill={INK} opacity={0.2} />
      {/* Horizontal axis through both centres */}
      <line x1={30} y1={KNOT_CY} x2={570} y2={KNOT_CY}
        stroke={INK} strokeWidth={0.6} opacity={0.12} />
    </svg>
  )
}

// ─── ITERATE — The Spiral ─────────────────────────────────────────────────────
/**
 * An expanding Archimedean spiral — 3.5 revolutions, terra stroke.
 * Growth that never closes: each cycle extends the previous.
 * Guide rings (dashed) show the concentric rhythm underneath.
 */

function SpiralSVG() {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}>
      {/* Dashed guide rings */}
      {[68, 136, 204, 272].map(r => (
        <circle key={r} cx={300} cy={300} r={r}
          fill="none" stroke={INK} strokeWidth={0.5} opacity={0.07}
          strokeDasharray="3 12" />
      ))}
      {/* Archimedean spiral */}
      <path d={SPIRAL_MAIN}
        fill="none" stroke={TERRA} strokeWidth={2.5} opacity={0.86}
        strokeLinecap="round" strokeLinejoin="round" />
      {/* Origin dot */}
      <circle cx={300} cy={300} r={4} fill={TERRA} opacity={0.9} />
    </svg>
  )
}

// ─── OVERALL — Quadrant montage ───────────────────────────────────────────────
/**
 * All four motifs arranged in a 2×2 grid, each clipped to its quadrant.
 * TL = Lens, TR = Motion, BL = Knot, BR = Spiral.
 */

// Small Venn for BL quadrant — circles at (118,450) and (182,450), r=70
const VENN2_R  = 70
const VENN2_OFF = 32
const VENN2_YO  = Math.round(Math.sqrt(VENN2_R * VENN2_R - VENN2_OFF * VENN2_OFF)) // ≈ 62
const VENN2_LENS = `M 150,${450 - VENN2_YO} A ${VENN2_R},${VENN2_R} 0 0 1 150,${450 + VENN2_YO} A ${VENN2_R},${VENN2_R} 0 0 1 150,${450 - VENN2_YO} Z`

// Motion lines for TR quadrant — a few lines radiating from left edge into right half
const TR_LINES: Array<[number, number, number, number, string, number, number]> = [
  [300, 300, 600,  20, SAGE,  0.20, 0.75],
  [300, 300, 600,  90, SAGE,  0.30, 1.00],
  [300, 300, 600, 165, SAGE,  0.40, 1.25],
  [300, 300, 600, 240, TERRA, 0.60, 1.75],
  [360, 300, 600, 100, SAGE,  0.28, 0.75],
  [420, 300, 600, 170, TERRA, 0.50, 1.25],
  [480, 300, 600, 230, SAGE,  0.35, 0.75],
]

function OverallSVG() {
  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}>

      <defs>
        <clipPath id="cp-tl"><rect x={0}   y={0}   width={300} height={300} /></clipPath>
        <clipPath id="cp-tr"><rect x={300} y={0}   width={300} height={300} /></clipPath>
        <clipPath id="cp-bl"><rect x={0}   y={300} width={300} height={300} /></clipPath>
        <clipPath id="cp-br"><rect x={300} y={300} width={300} height={300} /></clipPath>
      </defs>

      {/* TL — The Lens (simplified) */}
      <g clipPath="url(#cp-tl)">
        {[118, 88, 58, 28, 10].map((r, i) => (
          <circle key={r} cx={150} cy={150} r={r}
            fill="none" stroke={TERRA}
            strokeWidth={0.75 + i * 0.4}
            opacity={0.06 + i * 0.14}
          />
        ))}
        <line x1={0}   y1={150} x2={300} y2={150} stroke={INK} strokeWidth={0.6} opacity={0.18} />
        <line x1={150} y1={0}   x2={150} y2={300} stroke={INK} strokeWidth={0.6} opacity={0.09} />
        <circle cx={150} cy={150} r={5} fill={BG}    />
        <circle cx={150} cy={150} r={3} fill={TERRA} opacity={0.9} />
      </g>

      {/* TR — The Motion */}
      <g clipPath="url(#cp-tr)">
        {TR_LINES.map(([x1, y1, x2, y2, color, opacity, width], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color} strokeWidth={width} opacity={opacity}
            strokeLinecap="round" />
        ))}
      </g>

      {/* BL — The Knot (small Venn) */}
      <g clipPath="url(#cp-bl)">
        <circle cx={150 - VENN2_OFF} cy={450} r={VENN2_R}
          fill="none" stroke={INK} strokeWidth={1} opacity={0.4} />
        <circle cx={150 + VENN2_OFF} cy={450} r={VENN2_R}
          fill="none" stroke={INK} strokeWidth={1} opacity={0.4} />
        <path d={VENN2_LENS} fill={TERRA} opacity={0.72} />
      </g>

      {/* BR — The Spiral */}
      <g clipPath="url(#cp-br)">
        <path d={SPIRAL_BR}
          fill="none" stroke={TERRA} strokeWidth={1.5} opacity={0.82}
          strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={450} cy={450} r={3} fill={TERRA} opacity={0.9} />
      </g>

      {/* Quadrant dividers */}
      <line x1={300} y1={0}   x2={300} y2={600} stroke={INK} strokeWidth={0.75} opacity={0.16} />
      <line x1={0}   y1={300} x2={600} y2={300} stroke={INK} strokeWidth={0.75} opacity={0.16} />
    </svg>
  )
}

// ─── Panel ────────────────────────────────────────────────────────────────────

export function CollagePanel({ variant = 'analyse' }: CollagePanelProps) {
  const label =
    variant === 'analyse'          ? '01 / Analyse'
    : variant === 'change'         ? '02 / Change'
    : variant === 'responsibility' ? '03 / Responsibility'
    : variant === 'iterate'        ? '04 / Iterate'
    :                                'Systemshift Cycle'

  return (
    <div
      style={{
        position:        'relative',
        width:           '100%',
        height:          '100%',
        minHeight:       '100svh',
        backgroundColor: BG,
        overflow:        'hidden',
      }}
    >
      {variant === 'analyse'        && <LensSVG />}
      {variant === 'change'         && <MotionSVG />}
      {variant === 'responsibility' && <KnotSVG />}
      {variant === 'iterate'        && <SpiralSVG />}
      {variant === 'overall'        && <OverallSVG />}

      {/* ── Label — bottom left ── */}
      <div
        style={{
          position:      'absolute',
          bottom:        '2.5rem',
          left:          '2.5rem',
          display:       'flex',
          flexDirection: 'column',
          gap:           '0.5rem',
          zIndex:        1,
        }}
      >
        <span
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         'rgba(26,23,20,0.4)',
          }}
        >
          Systemshift · 1789
        </span>
        <span
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         'rgba(26,23,20,0.25)',
          }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}
