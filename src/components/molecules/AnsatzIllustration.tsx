/**
 * AnsatzIllustration — FVS (Flexible Visual System) Grid Illustrations
 *
 * System logic (Martin Lorenz / FVS):
 *   One primitive:  100 × 100 px square cell
 *   Grid:           6 × 6 cells → 600 × 600 viewBox
 *   Gesture:        a bold geometric shape "drawn" across the neutral grid
 *   Identity:       the filled cells form the phase's visual signature
 *
 * The machine (regular grid) + the human gesture (distinctive fill pattern)
 * = order / disorder tension that creates recognisability.
 *
 * Phase shapes:
 *   analyse        → FRAME:    hollow rectangular window (seeing through)
 *   change         → STAIR:    ascending diagonal staircase (kinetic motion)
 *   responsibility → H-SHAPE:  two pillars + double-bar bridge (binding two entities)
 *   iterate        → RINGS:    three concentric rings, opacity gradient (growth depth)
 *
 * Palette (hard-coded — CSS vars unreliable in SVG fill/stroke):
 *   grid bg    #EDE9E4   grid lines  #C4BCB4
 *   terra      #F44D0B   sage        #B8CC8A   ink  #1A1714
 */

import React from 'react'

// ─── Palette ─────────────────────────────────────────────────────────────────

const TERRA     = '#F44D0B'
const SAGE      = '#B8CC8A'
const INK       = '#1A1714'
const GRID_BG   = '#EDE9E4'
const GRID_LINE = '#C4BCB4'

// ─── Types ───────────────────────────────────────────────────────────────────

export type AnsatzVariant = 'analyse' | 'change' | 'responsibility' | 'iterate'

type Cell = readonly [number, number] // [col, row] — col 0 = left, row 0 = top

// ─── Shape cell arrays ───────────────────────────────────────────────────────
// All shapes live on a 6 × 6 grid.

/** FRAME — hollow 4 × 4 rectangle inset by one cell. Metaphor: looking through a window. */
const ANALYSE_CELLS: Cell[] = [
  [1, 1], [2, 1], [3, 1], [4, 1],   // top edge
  [1, 4], [2, 4], [3, 4], [4, 4],   // bottom edge
  [1, 2], [1, 3],                    // left edge
  [4, 2], [4, 3],                    // right edge
]

/** STAIR — ascending diagonal staircase from bottom-left to top-right.
 *  Each step = 2 cells wide, reading bottom → top = upward kinetic motion. */
const CHANGE_CELLS: Cell[] = [
  [0, 5], [1, 5],   // step 1 (bottom)
  [1, 4], [2, 4],   // step 2
  [2, 3], [3, 3],   // step 3
  [3, 2], [4, 2],   // step 4
  [4, 1], [5, 1],   // step 5
  [5, 0],           // tip (top-right)
]

/** H-SHAPE — two single-cell-wide vertical pillars + a two-row-thick crossbar.
 *  Metaphor: two independent entities (left / right) bound by a shared centre. */
const RESPONSIBILITY_CELLS: Cell[] = [
  // left pillar (col 0, all rows)
  [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  // right pillar (col 5, all rows)
  [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5],
  // crossbar row 2 (centre-left to centre-right)
  [1, 2], [2, 2], [3, 2], [4, 2],
  // crossbar row 3 (double-bar = weight / commitment)
  [1, 3], [2, 3], [3, 3], [4, 3],
]

/** RINGS — three concentric square rings rendered at increasing opacity.
 *  Inner ring = full intensity → outer ring = lightest → growth reads inside-out. */
const ITERATE_OUTER: Cell[] = [
  [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0],   // top row
  [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5],   // bottom row
  [0, 1], [0, 2], [0, 3], [0, 4],                    // left col (excl. corners)
  [5, 1], [5, 2], [5, 3], [5, 4],                    // right col (excl. corners)
]
const ITERATE_MIDDLE: Cell[] = [
  [1, 1], [2, 1], [3, 1], [4, 1],   // inner top
  [1, 4], [2, 4], [3, 4], [4, 4],   // inner bottom
  [1, 2], [1, 3],                    // inner left
  [4, 2], [4, 3],                    // inner right
]
const ITERATE_CENTER: Cell[] = [
  [2, 2], [3, 2], [2, 3], [3, 3],
]

// ─── Grid line positions (module-level, no Math.random) ──────────────────────

const VLINES = [0, 100, 200, 300, 400, 500, 600] // x coords
const HLINES = [0, 100, 200, 300, 400, 500, 600] // y coords

// ─── Sub-components ──────────────────────────────────────────────────────────

function GridLines() {
  return (
    <>
      {VLINES.map((x) => (
        <line key={`v${x}`} x1={x} y1={0} x2={x} y2={600}
          stroke={GRID_LINE} strokeWidth={0.75} />
      ))}
      {HLINES.map((y) => (
        <line key={`h${y}`} x1={0} y1={y} x2={600} y2={y}
          stroke={GRID_LINE} strokeWidth={0.75} />
      ))}
    </>
  )
}

function Cells({
  cells,
  color,
  opacity = 1,
}: {
  cells: Cell[]
  color: string
  opacity?: number
}) {
  return (
    <>
      {cells.map(([col, row]) => (
        <rect
          key={`${col}-${row}`}
          x={col * 100}
          y={row * 100}
          width={100}
          height={100}
          fill={color}
          fillOpacity={opacity}
        />
      ))}
    </>
  )
}

function PhaseSVG({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <svg
      viewBox="0 0 600 600"
      width="100%"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      {/* Ground — warm off-white, same family as --color-surface */}
      <rect width={600} height={600} fill={GRID_BG} />

      {/* System layer — the machine; barely-there grid lines */}
      <GridLines />

      {/* Gesture layer — the human mark on the grid */}
      {children}

      {/* Signature label — bottom-left, monospace, near-invisible */}
      <text
        x={14}
        y={587}
        fontSize={9}
        fontFamily="'DM Mono', 'Courier New', monospace"
        fill={INK}
        fillOpacity={0.28}
        letterSpacing={1.2}
      >
        FVS · 1789 · {label}
      </text>
    </svg>
  )
}

// ─── Phase SVGs ───────────────────────────────────────────────────────────────

function AnalyseSVG() {
  return (
    <PhaseSVG label="ANALYSE">
      <Cells cells={ANALYSE_CELLS} color={TERRA} />
    </PhaseSVG>
  )
}

function ChangeSVG() {
  return (
    <PhaseSVG label="CHANGE">
      <Cells cells={CHANGE_CELLS} color={SAGE} />
    </PhaseSVG>
  )
}

function ResponsibilitySVG() {
  return (
    <PhaseSVG label="RESPONSIBILITY">
      <Cells cells={RESPONSIBILITY_CELLS} color={INK} />
    </PhaseSVG>
  )
}

function IterateSVG() {
  return (
    <PhaseSVG label="ITERATE">
      {/* Opacity rings: outside-in → lightest → darkest, reads as growth */}
      <Cells cells={ITERATE_OUTER}  color={TERRA} opacity={0.22} />
      <Cells cells={ITERATE_MIDDLE} color={TERRA} opacity={0.55} />
      <Cells cells={ITERATE_CENTER} color={TERRA} opacity={1.00} />
    </PhaseSVG>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function AnsatzIllustration({ variant }: { variant: AnsatzVariant }) {
  const svgMap: Record<AnsatzVariant, React.ReactNode> = {
    analyse:        <AnalyseSVG />,
    change:         <ChangeSVG />,
    responsibility: <ResponsibilitySVG />,
    iterate:        <IterateSVG />,
  }

  return svgMap[variant]
}
