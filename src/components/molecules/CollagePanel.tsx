'use client'

/**
 * CollagePanel + PhaseIllustration — FVS Primitive Grid
 *
 * ── System ────────────────────────────────────────────────────────────────────
 *   Canvas: 600 × 600 px
 *   Grid:   4 × 4 cells, each 150 × 150 px
 *
 *   Background layer (every phase):
 *     16 faint circles at 8 % opacity — the machine, the order reference.
 *
 *   Foreground layer (per phase):
 *     Selected cells filled with one of three primitives:
 *       ■  full square   (fills the cell)
 *       ●  full circle   (inscribed, r = 75)
 *       ◜◝◟◞  quarter-circle pie slice (one per corner orientation)
 *
 *   The SAME grid underlies all four phases.
 *   Only the GESTURE (which cells, which primitive) changes.
 *
 * ── Quarter-circle orientation key ───────────────────────────────────────────
 *   ◜  qTL(c,r)  centre at cell's top-left      → fills cell's bottom-right
 *   ◝  qTR(c,r)  centre at cell's top-right     → fills cell's bottom-left
 *   ◟  qBL(c,r)  centre at cell's bottom-left   → fills cell's top-right
 *   ◞  qBR(c,r)  centre at cell's bottom-right  → fills cell's top-left
 *
 * ── FVS rule per phase ────────────────────────────────────────────────────────
 *   Analyse        FRAME   4 corner quarters converge on 4 inner circles   terra
 *   Change         MORPH   sq→◟→◟→● diagonal: same mass, shape transforms  ink+sage
 *   Responsibility SHIFT   two square columns shifted to edges + connecting circles  ink+terra
 *   Iterate        SCALE   two concentric rings of quarters, opacity gradient  terra
 *
 * ── Palette (hard-coded — CSS vars unreliable in SVG fill/stroke) ─────────────
 *   BG #EDEAE6 · INK #1A1714 · TERRA #F44D0B · SAGE #B8CC8A
 */

import React from 'react'

// ─── Palette ──────────────────────────────────────────────────────────────────

const BG    = '#EDEAE6'
const INK   = '#1A1714'
const TERRA = '#F44D0B'
const SAGE  = '#B8CC8A'

// ─── Grid ─────────────────────────────────────────────────────────────────────

const S = 150  // cell size in px; 4 × 150 = 600

// ─── Quarter-circle path helpers ─────────────────────────────────────────────
// Each returns a filled SVG pie-slice.
// Circle centre = specified corner of cell (c, r); radius = S = full cell side.
// The arc sweeps through the interior of the cell.
//
// Verification — qTL(c, r):
//   centre (c·S, r·S), arc from (c·S+S, r·S) CW to (c·S, r·S+S)
//   mid-arc ≈ (c·S + S·cos45°, r·S + S·sin45°) — cell interior ✓

function qTL(c: number, r: number): string {
  const x = c * S, y = r * S
  return `M ${x},${y} L ${x+S},${y} A ${S},${S} 0 0,1 ${x},${y+S} Z`
}
function qTR(c: number, r: number): string {
  const x = c * S, y = r * S
  return `M ${x+S},${y} L ${x},${y} A ${S},${S} 0 0,0 ${x+S},${y+S} Z`
}
function qBL(c: number, r: number): string {
  const x = c * S, y = r * S
  return `M ${x},${y+S} L ${x+S},${y+S} A ${S},${S} 0 0,0 ${x},${y} Z`
}
function qBR(c: number, r: number): string {
  const x = c * S, y = r * S
  return `M ${x+S},${y+S} L ${x},${y+S} A ${S},${S} 0 0,1 ${x+S},${y} Z`
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type PhaseVariant = 'analyse' | 'change' | 'responsibility' | 'iterate'
type        PanelVariant = PhaseVariant | 'overall'

// ─── Background grid (shared) ─────────────────────────────────────────────────
// 16 inscribed circles at 8 % opacity — the visible grid / machine layer.

const CELLS = Array.from({ length: 16 }, (_, i) => ({ c: i % 4, r: Math.floor(i / 4) }))

function GridBG({ color }: { color: string }) {
  return (
    <>
      {CELLS.map(({ c, r }) => (
        <circle
          key={`${c}-${r}`}
          cx={c * S + S / 2}
          cy={r * S + S / 2}
          r={S / 2}
          fill={color}
          fillOpacity={0.08}
        />
      ))}
    </>
  )
}

// ─── ANALYSE — FRAME ─────────────────────────────────────────────────────────
// Grid pattern:
//   ◜ · · ◝    four corner quarters point inward — a viewfinder / lens frame
//   · ● ● ·    four inner circles — the focal zone being examined
//   · ● ● ·
//   ◟ · · ◞

function AnalyseSVG() {
  return (
    <>
      <GridBG color={INK} />
      {/* Corner quarters — framing, pointing toward canvas centre */}
      <path d={qTL(0, 0)} fill={TERRA} fillOpacity={0.88} />
      <path d={qTR(3, 0)} fill={TERRA} fillOpacity={0.88} />
      <path d={qBL(0, 3)} fill={TERRA} fillOpacity={0.88} />
      <path d={qBR(3, 3)} fill={TERRA} fillOpacity={0.88} />
      {/* Inner 2×2 circles — focal cluster */}
      <circle cx={1*S + S/2} cy={1*S + S/2} r={S/2} fill={TERRA} fillOpacity={0.88} />
      <circle cx={2*S + S/2} cy={1*S + S/2} r={S/2} fill={TERRA} fillOpacity={0.88} />
      <circle cx={1*S + S/2} cy={2*S + S/2} r={S/2} fill={TERRA} fillOpacity={0.88} />
      <circle cx={2*S + S/2} cy={2*S + S/2} r={S/2} fill={TERRA} fillOpacity={0.88} />
    </>
  )
}

// ─── CHANGE — MORPH ───────────────────────────────────────────────────────────
// Grid pattern:
//   · · · ●    circle  — organic, transformed destination  (sage)
//   · · ◟ ·    quarter — shape mid-rotation, pointing top-right (sage)
//   · ◟ · ·    quarter — continuing transformation         (sage)
//   ■ · · ·    square  — structure at rest, origin        (ink)
//
// Diagonal axis BL→TR: same visual mass at each step, shape transforms.
// ◟ = qBL: centre at cell's bottom-left, fills the cell's top-right quadrant
// = pointing toward top-right = toward the direction of change.

function ChangeSVG() {
  return (
    <>
      <GridBG color={INK} />
      {/* Origin: aligned square — structure before change */}
      <rect x={0} y={3*S} width={S} height={S} fill={INK} fillOpacity={0.85} />
      {/* Mid-1: quarter pointing top-right */}
      <path d={qBL(1, 2)} fill={SAGE} fillOpacity={0.85} />
      {/* Mid-2: quarter pointing top-right */}
      <path d={qBL(2, 1)} fill={SAGE} fillOpacity={0.85} />
      {/* Destination: circle — organic, transformed state */}
      <circle cx={3*S + S/2} cy={S/2} r={S/2} fill={SAGE} fillOpacity={0.88} />
    </>
  )
}

// ─── RESPONSIBILITY — SHIFT ───────────────────────────────────────────────────
// Grid pattern:
//   ■ · · ■    two square columns at the outer edges (ink)
//   ■ · · ■    both 4 cells tall — the two entities
//   ■ ● ● ■    terra circles at row 2, centre columns — the binding link
//   ■ · · ■
//
// Same primitive (square), shifted to opposite edges.
// Circles mark the zone of shared accountability.

function ResponsibilitySVG() {
  return (
    <>
      <GridBG color={INK} />
      {/* Left column */}
      {[0, 1, 2, 3].map(r => (
        <rect key={`L${r}`} x={0} y={r*S} width={S} height={S}
          fill={INK} fillOpacity={0.78} />
      ))}
      {/* Right column */}
      {[0, 1, 2, 3].map(r => (
        <rect key={`R${r}`} x={3*S} y={r*S} width={S} height={S}
          fill={INK} fillOpacity={0.78} />
      ))}
      {/* Binding circles — the shared commitment zone */}
      <circle cx={1*S + S/2} cy={2*S + S/2} r={S/2} fill={TERRA} fillOpacity={0.92} />
      <circle cx={2*S + S/2} cy={2*S + S/2} r={S/2} fill={TERRA} fillOpacity={0.92} />
    </>
  )
}

// ─── ITERATE — SCALE ──────────────────────────────────────────────────────────
// Grid pattern:
//   ◜ · · ◝    outer ring at 36 % — the most recent, expanded iteration
//   · ◜ ◝ ·    inner ring at 80 % — the established core
//   · ◟ ◞ ·
//   ◟ · · ◞
//
// Same quarter-circle primitive at two scales / opacities.
// All 8 quarters point toward canvas centre — convergent growth read.
// Inner quarters are centred at the corners of the inner 2×2 meeting at (300,300).

function IterateSVG() {
  return (
    <>
      <GridBG color={TERRA} />
      {/* Outer ring — canvas corners, lighter */}
      <path d={qTL(0, 0)} fill={TERRA} fillOpacity={0.36} />
      <path d={qTR(3, 0)} fill={TERRA} fillOpacity={0.36} />
      <path d={qBL(0, 3)} fill={TERRA} fillOpacity={0.36} />
      <path d={qBR(3, 3)} fill={TERRA} fillOpacity={0.36} />
      {/* Inner ring — inner 2×2 corners, full intensity */}
      <path d={qTL(1, 1)} fill={TERRA} fillOpacity={0.80} />
      <path d={qTR(2, 1)} fill={TERRA} fillOpacity={0.80} />
      <path d={qBL(1, 2)} fill={TERRA} fillOpacity={0.80} />
      <path d={qBR(2, 2)} fill={TERRA} fillOpacity={0.80} />
    </>
  )
}

// ─── OVERALL — quadrant montage ───────────────────────────────────────────────
// Each phase at 0.5× scale in its 300×300 quadrant.
// SVG transform: translate(tx,ty) scale(0.5) — scale from origin, then translate.
// The same GridBG + phase shapes render at half size, perfectly filling each zone.

function OverallSVG() {
  return (
    <>
      <defs>
        <clipPath id="ov-tl"><rect width={300} height={300} /></clipPath>
        <clipPath id="ov-tr"><rect x={300} width={300} height={300} /></clipPath>
        <clipPath id="ov-bl"><rect y={300} width={300} height={300} /></clipPath>
        <clipPath id="ov-br"><rect x={300} y={300} width={300} height={300} /></clipPath>
      </defs>

      <g clipPath="url(#ov-tl)" transform="scale(0.5)">
        <AnalyseSVG />
      </g>
      <g clipPath="url(#ov-tr)" transform="translate(300,0) scale(0.5)">
        <ChangeSVG />
      </g>
      <g clipPath="url(#ov-bl)" transform="translate(0,300) scale(0.5)">
        <ResponsibilitySVG />
      </g>
      <g clipPath="url(#ov-br)" transform="translate(300,300) scale(0.5)">
        <IterateSVG />
      </g>

      <line x1={300} y1={0}   x2={300} y2={600} stroke={INK} strokeWidth={0.75} opacity={0.18} />
      <line x1={0}   y1={300} x2={600} y2={300} stroke={INK} strokeWidth={0.75} opacity={0.18} />
      <circle cx={300} cy={300} r={10} fill={TERRA} fillOpacity={0.88} />
    </>
  )
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────

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

// ─── PhaseIllustration — inline / intrinsic sizing ────────────────────────────
// For the /ansatz page. SVG derives height from viewBox (600:600 = 1:1 square).

export function PhaseIllustration({ variant }: { variant: PhaseVariant }) {
  return (
    <svg viewBox="0 0 600 600" width="100%" style={{ display: 'block' }} aria-hidden="true">
      <rect width={600} height={600} fill={BG} />
      <PhaseContent variant={variant} />
      <text
        x={14} y={587} fontSize={9}
        fontFamily="'DM Mono', 'Courier New', monospace"
        fill={INK} fillOpacity={0.20} letterSpacing={1.4}
      >
        FVS · 1789 · {PHASE_LABEL[variant].toUpperCase()}
      </text>
    </svg>
  )
}

// ─── CollagePanel — fill mode for SystemshiftAccordion ────────────────────────
// Stretches to fill 100 % × 100 svh of its sticky panel container.

interface CollagePanelProps {
  variant?: PanelVariant
}

export function CollagePanel({ variant = 'overall' }: CollagePanelProps) {
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      minHeight: '100svh', backgroundColor: BG, overflow: 'hidden',
    }}>
      <svg
        viewBox="0 0 600 600"
        width="100%" height="100%"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0 }}
        aria-hidden="true"
      >
        <PhaseContent variant={variant} />
      </svg>

      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '2.5rem',
        display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 1,
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(26,23,20,0.4)',
        }}>
          Systemshift · 1789
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(26,23,20,0.25)',
        }}>
          {PHASE_LABEL[variant]}
        </span>
      </div>
    </div>
  )
}
