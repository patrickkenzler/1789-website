'use client'

/**
 * CollagePanel + PhaseIllustration — FVS Circle / Square / Quarter system
 *
 * ── Primitive vocabulary ──────────────────────────────────────────────────────
 *   ⬤  full circle    ◼  full square    ◜◝◟◞  quarter-circle pie slice
 *
 * ── FVS transformation rule set ──────────────────────────────────────────────
 *   SCALE   →  iterate:        same circle repeated at 5 scales (opacity gradient)
 *   ROTATE  →  change:         square → square rotated 45° → circle (morph read)
 *   SHIFT   →  responsibility: two identical squares offset to create overlap zone
 *   QUARTER →  all phases:     corner pie slices as structural framing devices
 *
 * ── Phase colour logic ────────────────────────────────────────────────────────
 *   analyse        terra primary  + ink corners
 *   change         ink squares    + sage circle / sage corner quarter
 *   responsibility ink squares    + terra binding circle + ink corner
 *   iterate        terra rings    + ink corner quarter
 *   overall        all four in 2×2 quadrant montage
 *
 * ── Two exports ──────────────────────────────────────────────────────────────
 *   CollagePanel      fills its parent container (accordion sticky panel)
 *   PhaseIllustration intrinsic 1:1 square (ansatz page inline column)
 *
 * Palette hard-coded — CSS vars unreliable in SVG fill/stroke attributes.
 */

import React from 'react'

// ─── Palette ──────────────────────────────────────────────────────────────────

const BG    = '#EDEAE6'
const INK   = '#1A1714'
const TERRA = '#F44D0B'
const SAGE  = '#B8CC8A'

// ─── Types ────────────────────────────────────────────────────────────────────

export type PhaseVariant  = 'analyse' | 'change' | 'responsibility' | 'iterate'
type        PanelVariant  = PhaseVariant | 'overall'

// ─── Quarter-circle helpers ───────────────────────────────────────────────────
// Each returns a filled SVG pie-slice path anchored at a canvas corner,
// pointing inward toward the canvas centre (viewBox 600 × 600).
//
//   TL (0,0)       → CW arc   sweep=1   qTL(r) = M 0,0 L r,0 A r,r 0 0,1 0,r Z
//   TR (600,0)     → CCW arc  sweep=0
//   BL (0,600)     → CCW arc  sweep=0
//   BR (600,600)   → CW arc   sweep=1

function qTL(r: number): string { return `M 0,0 L ${r},0 A ${r},${r} 0 0,1 0,${r} Z` }
function qTR(r: number): string { return `M 600,0 L ${600-r},0 A ${r},${r} 0 0,0 600,${r} Z` }
function qBL(r: number): string { return `M 0,600 L ${r},600 A ${r},${r} 0 0,0 0,${600-r} Z` }
function qBR(r: number): string { return `M 600,600 L ${600-r},600 A ${r},${r} 0 0,1 600,${600-r} Z` }

// ─── ANALYSE — Scale + Corner quarters ───────────────────────────────────────
// Primary rule: FOCUS — convergence to a point.
//
// Large terra circle (the subject under examination) fills the centre.
// Two ink corner quarter-circles frame it like a viewfinder.
// A small rotated square (diamond) at centre = the crystallised insight.
// A faint horizontal axis bisects the composition — the line of precise seeing.

function AnalyseSVG() {
  return (
    <>
      {/* Axis hairline — precision reference */}
      <line x1={0} y1={300} x2={600} y2={300}
        stroke={INK} strokeWidth={0.75} opacity={0.10} />

      {/* Viewfinder frames — ink corner quarters */}
      <path d={qTL(160)} fill={INK} fillOpacity={0.16} />
      <path d={qBR(160)} fill={INK} fillOpacity={0.16} />

      {/* Primary: terra circle — the focal field */}
      <circle cx={300} cy={300} r={200} fill={TERRA} fillOpacity={0.86} />

      {/* Focal point: small diamond (square rotated 45°) at centre */}
      {/* rect 78×78 centred at (300,300), half-diagonal ≈ 55 px */}
      <rect x={261} y={261} width={78} height={78}
        fill={BG} fillOpacity={0.80}
        transform="rotate(45 300 300)" />
    </>
  )
}

// ─── CHANGE — Rotate (morph read) ────────────────────────────────────────────
// Primary rule: TRANSFORMATION — same shape at different stages of rotation.
//
// Three shapes along a bottom-left → top-right diagonal:
//   1. Aligned square (ink)         = structure at rest
//   2. Diamond  (ink, rotated 45°)  = structure mid-rotation
//   3. Circle   (sage)              = the organic, transformed state
// Sage quarter at TR corner: momentum continues beyond the frame.

function ChangeSVG() {
  return (
    <>
      {/* Stage 1: aligned square — static structure */}
      <rect x={68} y={408} width={98} height={98}
        fill={INK} fillOpacity={0.82} />

      {/* Stage 2: diamond — same square, rotated 45° — in motion */}
      {/* rect 126×126 centred at (300,300) */}
      <rect x={237} y={237} width={126} height={126}
        fill={INK} fillOpacity={0.82}
        transform="rotate(45 300 300)" />

      {/* Stage 3: circle — the transformed, organic state */}
      <circle cx={458} cy={142} r={118} fill={SAGE} fillOpacity={0.88} />

      {/* Continuation: sage quarter at TR — momentum beyond the frame */}
      <path d={qTR(178)} fill={SAGE} fillOpacity={0.28} />
    </>
  )
}

// ─── RESPONSIBILITY — Shift (overlap zone) ────────────────────────────────────
// Primary rule: INTERLOCKING — two identical shapes shifted to share a zone.
//
// Two large ink squares offset horizontally; their overlap reads darker (alpha compositing).
// A terra circle sits at the exact overlap centre = the binding commitment.
// Ink quarter at BL corner = structural anchor / grounding.

function ResponsibilitySVG() {
  return (
    <>
      {/* Left square  — spans x: 62–326, y: 168–432 */}
      <rect x={62} y={168} width={264} height={264}
        fill={INK} fillOpacity={0.50} />

      {/* Right square — spans x: 274–538, y: 168–432   overlap x: 274–326 = 52 px wide */}
      <rect x={274} y={168} width={264} height={264}
        fill={INK} fillOpacity={0.50} />

      {/* Binding element: terra circle at the overlap centre */}
      <circle cx={300} cy={300} r={70} fill={TERRA} fillOpacity={0.92} />

      {/* Anchor: ink quarter at BL corner */}
      <path d={qBL(120)} fill={INK} fillOpacity={0.16} />
    </>
  )
}

// ─── ITERATE — Scale (opacity rings) ─────────────────────────────────────────
// Primary rule: EXPANSION — same circle scaled across 5 steps, opacity gradient.
//
// Innermost ring = full intensity (the origin/seed).
// Each outer ring = lighter = earlier/later iteration still present.
// Ink quarter at BR corner = the rotational, cyclical momentum of iteration.

const ITERATE_RINGS: ReadonlyArray<readonly [number, number]> = [
  [272, 0.07],
  [210, 0.16],
  [148, 0.34],
  [86,  0.65],
  [34,  1.00],
] as const

function IterateSVG() {
  return (
    <>
      {/* Rotational indicator: ink quarter at BR — the ongoing cycle */}
      <path d={qBR(205)} fill={INK} fillOpacity={0.11} />

      {/* Concentric terra rings — outermost → innermost = faint → solid */}
      {ITERATE_RINGS.map(([r, opacity]) => (
        <circle key={r} cx={300} cy={300} r={r}
          fill={TERRA} fillOpacity={opacity} />
      ))}
    </>
  )
}

// ─── OVERALL — Quadrant montage ───────────────────────────────────────────────
// All four phase signatures at half scale in a 2×2 grid.
// A small terra circle at the canvas centre binds the four quadrants.

function OverallSVG() {
  return (
    <>
      <defs>
        <clipPath id="ovr-tl"><rect x={0}   y={0}   width={300} height={300} /></clipPath>
        <clipPath id="ovr-tr"><rect x={300} y={0}   width={300} height={300} /></clipPath>
        <clipPath id="ovr-bl"><rect x={0}   y={300} width={300} height={300} /></clipPath>
        <clipPath id="ovr-br"><rect x={300} y={300} width={300} height={300} /></clipPath>
      </defs>

      {/* TL — Analyse */}
      <g clipPath="url(#ovr-tl)">
        <line x1={0} y1={150} x2={300} y2={150} stroke={INK} strokeWidth={0.6} opacity={0.10} />
        <path d={qTL(80)} fill={INK} fillOpacity={0.16} />
        <circle cx={150} cy={150} r={100} fill={TERRA} fillOpacity={0.86} />
        <rect x={131} y={131} width={38} height={38}
          fill={BG} fillOpacity={0.80} transform="rotate(45 150 150)" />
      </g>

      {/* TR — Change */}
      <g clipPath="url(#ovr-tr)">
        <rect x={322} y={212} width={48} height={48} fill={INK} fillOpacity={0.82} />
        {/* diamond centred at (450, 150) */}
        <rect x={419} y={119} width={62} height={62} fill={INK} fillOpacity={0.82}
          transform="rotate(45 450 150)" />
        <circle cx={538} cy={70} r={58} fill={SAGE} fillOpacity={0.88} />
        <path d="M 600,0 L 512,0 A 88,88 0 0,0 600,88 Z" fill={SAGE} fillOpacity={0.28} />
      </g>

      {/* BL — Responsibility */}
      <g clipPath="url(#ovr-bl)">
        <rect x={28}  y={340} width={132} height={132} fill={INK} fillOpacity={0.50} />
        <rect x={119} y={340} width={132} height={132} fill={INK} fillOpacity={0.50} />
        <circle cx={150} cy={406} r={34} fill={TERRA} fillOpacity={0.92} />
        <path d="M 0,600 L 60,600 A 60,60 0 0,0 0,540 Z" fill={INK} fillOpacity={0.16} />
      </g>

      {/* BR — Iterate */}
      <g clipPath="url(#ovr-br)">
        <path d="M 600,600 L 497,600 A 103,103 0 0,1 600,497 Z" fill={INK} fillOpacity={0.11} />
        {([136, 105, 74, 43, 17] as const).map((r, i) => (
          <circle key={r} cx={450} cy={450} r={r} fill={TERRA}
            fillOpacity={([0.07, 0.16, 0.34, 0.65, 1.00] as const)[i]} />
        ))}
      </g>

      {/* Dividers */}
      <line x1={300} y1={0}   x2={300} y2={600} stroke={INK} strokeWidth={0.6} opacity={0.14} />
      <line x1={0}   y1={300} x2={600} y2={300} stroke={INK} strokeWidth={0.6} opacity={0.14} />

      {/* Centre binding element */}
      <circle cx={300} cy={300} r={14} fill={TERRA} fillOpacity={0.92} />
    </>
  )
}

// ─── Content dispatcher ───────────────────────────────────────────────────────

function PhaseContent({ variant }: { variant: PanelVariant }) {
  if (variant === 'analyse')        return <AnalyseSVG />
  if (variant === 'change')         return <ChangeSVG />
  if (variant === 'responsibility') return <ResponsibilitySVG />
  if (variant === 'iterate')        return <IterateSVG />
  return <OverallSVG />
}

const PHASE_LABEL: Record<PanelVariant, string> = {
  analyse:        '01 / Analyse',
  change:         '02 / Change',
  responsibility: '03 / Responsibility',
  iterate:        '04 / Iterate',
  overall:        'Systemshift Cycle',
}

// ─── PhaseIllustration ────────────────────────────────────────────────────────
// Inline, intrinsic-sized export for the /ansatz page.
// The SVG derives its height from viewBox aspect ratio (600:600 = 1:1).
// No external sizing needed — drop it in any block container.

export function PhaseIllustration({ variant }: { variant: PhaseVariant }) {
  return (
    <svg
      viewBox="0 0 600 600"
      width="100%"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      {/* Background */}
      <rect width={600} height={600} fill={BG} />

      {/* Phase shapes */}
      <PhaseContent variant={variant} />

      {/* Signature label */}
      <text
        x={14} y={587}
        fontSize={9}
        fontFamily="'DM Mono', 'Courier New', monospace"
        fill={INK} fillOpacity={0.22}
        letterSpacing={1.4}
      >
        FVS · 1789 · {PHASE_LABEL[variant].toUpperCase()}
      </text>
    </svg>
  )
}

// ─── CollagePanel ─────────────────────────────────────────────────────────────
// Fill-mode export for the SystemshiftAccordion sticky panel.
// The SVG stretches to fill 100 % × 100 % of its parent (position: absolute).
// preserveAspectRatio="xMidYMid slice" ensures no letterboxing at non-square ratios.

interface CollagePanelProps {
  variant?: PanelVariant
}

export function CollagePanel({ variant = 'overall' }: CollagePanelProps) {
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
      {/* SVG fills the panel — slice ensures no gaps at non-square viewports */}
      <svg
        viewBox="0 0 600 600"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0 }}
        aria-hidden="true"
      >
        <PhaseContent variant={variant} />
      </svg>

      {/* Label overlay — positioned by CSS, not SVG text */}
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
          {PHASE_LABEL[variant]}
        </span>
      </div>
    </div>
  )
}
