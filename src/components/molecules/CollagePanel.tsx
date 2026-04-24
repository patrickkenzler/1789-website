/**
 * CollagePanel — v4: Bauhaus Modular Grid System
 *
 * Tile-based illustrations built from a small set of geometric primitives
 * snapped to a precise grid — inspired by Swiss/Bauhaus poster design.
 *
 * Module vocabulary:
 *   '##'  solid fill
 *   '  '  empty (background shows through)
 *   'se' 'sw' 'ne' 'nw'  quarter-circle pie filling named quadrant
 *   'tn' 'ts' 'tw' 'te'  right triangle filling N/S/W/E diagonal half
 *   'ci'  inscribed circle
 *   'ri'  concentric rings (3 alternating circles, target style)
 *
 * Palette (hard-coded — CSS vars unreliable in SVG attributes):
 *   bg    #EDEAE6  ·  ink  #1A1714  ·  terra  #F44D0B
 */

// ─── Types ────────────────────────────────────────────────────────────────────

type Mod = '##' | '  ' | 'se' | 'sw' | 'ne' | 'nw'
         | 'tn' | 'ts' | 'tw' | 'te'
         | 'ci' | 'ri'

interface CollagePanelProps {
  variant?: 'analyse' | 'change' | 'responsibility' | 'iterate' | 'overall'
}

// ─── Palette ──────────────────────────────────────────────────────────────────

const BG    = '#EDEAE6'
const INK   = '#1A1714'
const TERRA = '#F44D0B'

// ─── Grid layouts ─────────────────────────────────────────────────────────────

/**
 * ANALYSE — 4 × 4  ·  C = 150 px
 * Classic quarter-circle tile: adjacent pies together form circular lenses.
 * Terra fills the 2 × 2 centre — the focal point of the "lens."
 * Concept: scanning the field, converging toward a single truth.
 */
const A_GRID: Mod[][] = [
  ['se', 'sw', 'se', 'sw'],
  ['ne', 'nw', 'ne', 'nw'],
  ['se', 'sw', 'se', 'sw'],
  ['ne', 'nw', 'ne', 'nw'],
]
const A_ACC = new Set(['1,1', '1,2', '2,1', '2,2'])

/**
 * CHANGE — 5 × 5  ·  C = 120 px
 * Diagonal triangles densify from sparse (top) to solid (bottom).
 * Reads as: ignition → acceleration → full force.
 * Concept: kinetic momentum; change while it happens.
 */
const C_GRID: Mod[][] = [
  ['  ', 'tn', '  ', 'tn', '  '],
  ['ts', 'tn', 'ts', 'tn', 'ts'],
  ['tn', '##', 'tn', '##', 'tn'],
  ['##', '##', '##', '##', '##'],
  ['##', '##', '##', '##', '##'],
]
const C_ACC = new Set(['0,1', '0,3'])   // terra sparks at ignition row

/**
 * RESPONSIBILITY — 4 × 4  ·  C = 150 px
 * Checkerboard of concentric rings and solid blocks.
 * The rings reference each other across the grid — interconnected commitment.
 * Concept: structure that holds; accountability interlocking like a fabric.
 */
const R_GRID: Mod[][] = [
  ['ri', '##', 'ri', '##'],
  ['##', 'ri', '##', 'ri'],
  ['ri', '##', 'ri', '##'],
  ['##', 'ri', '##', 'ri'],
]
const R_ACC = new Set(['0,0', '1,3', '2,2', '3,1'])  // diagonal terra rings

/**
 * ITERATE — 4 × 4  ·  C = 150 px
 * Staircase progression: empty → circle → ring → solid (top-right to bottom-left).
 * Each diagonal step shows one stage of maturation.
 * Concept: growth through repetition; each cycle slightly more complete.
 */
const I_GRID: Mod[][] = [
  ['  ', '  ', 'ci', '##'],
  ['  ', 'ci', 'ri', '##'],
  ['ci', 'ri', '##', '##'],
  ['ri', '##', '##', '##'],
]
const I_ACC = new Set(['0,2', '1,2', '2,1'])  // terra on the pivot/transition cells

/**
 * OVERALL — 5 × 5  ·  C = 120 px
 * All four module families combined in a balanced editorial composition.
 * Concept: the complete Systemshift vocabulary in one frame.
 */
const O_GRID: Mod[][] = [
  ['se', 'ri', 'tn', '##', 'sw'],
  ['##', 'ci', 'te', 'ri', '  '],
  ['nw', '##', 'ri', 'ci', 'tn'],
  ['ci', 'te', '##', 'ri', 'ne'],
  ['##', 'sw', 'ci', 'tn', 'ri'],
]
const O_ACC = new Set(['0,3', '2,2', '4,4'])

// ─── Core renderer ────────────────────────────────────────────────────────────

/**
 * Converts a 2-D grid of module codes into an array of SVG elements.
 * Circles and rings are emitted as <circle> elements; all other modules
 * are emitted as a single <path>. Cells with '  ' type are skipped.
 */
function renderGrid(
  layout:    Mod[][],
  C:         number,
  accentSet: Set<string>,
): React.ReactNode[] {
  const els: React.ReactNode[] = []

  layout.forEach((row, r) => {
    row.forEach((type, c) => {
      if (type === '  ') return

      const ox   = c * C
      const oy   = r * C
      const fill = accentSet.has(`${r},${c}`) ? TERRA : INK

      // ── Circle ────────────────────────────────────────────────────────────
      if (type === 'ci') {
        els.push(
          <circle
            key={`${r}-${c}`}
            cx={ox + C / 2}
            cy={oy + C / 2}
            r={C * 0.44}
            fill={fill}
          />,
        )
        return
      }

      // ── Concentric rings (target style) ───────────────────────────────────
      if (type === 'ri') {
        const cx = ox + C / 2
        const cy = oy + C / 2
        // 5 circles alternating fill/background → 3 visible ink rings
        ;[0.44, 0.33, 0.23, 0.13, 0.05].forEach((ratio, i) => {
          els.push(
            <circle
              key={`${r}-${c}-${i}`}
              cx={cx}
              cy={cy}
              r={C * ratio}
              fill={i % 2 === 0 ? fill : BG}
            />,
          )
        })
        return
      }

      // ── Path-based modules ────────────────────────────────────────────────
      const d = (() => {
        const R = C // arc radius = cell size (quarter-circle fits exactly)
        switch (type) {
          // Solid block
          case '##':
            return `M${ox},${oy}h${C}v${C}h-${C}Z`

          // Quarter-circle pies — arc fills the named quadrant
          // 'se': circle centre at NW corner → arc CW fills SE quadrant
          case 'se':
            return `M${ox},${oy}L${ox+C},${oy}A${R},${R}0,0,1,${ox},${oy+C}Z`
          // 'sw': circle centre at NE corner → arc CCW fills SW quadrant
          case 'sw':
            return `M${ox+C},${oy}L${ox},${oy}A${R},${R}0,0,0,${ox+C},${oy+C}Z`
          // 'nw': circle centre at SE corner → arc CCW fills NW quadrant
          case 'nw':
            return `M${ox+C},${oy+C}L${ox+C},${oy}A${R},${R}0,0,0,${ox},${oy+C}Z`
          // 'ne': circle centre at SW corner → arc CW fills NE quadrant
          case 'ne':
            return `M${ox},${oy+C}L${ox},${oy}A${R},${R}0,0,1,${ox+C},${oy+C}Z`

          // Right triangles — NW↘SE diagonal splits (tn=NE half, ts=SW half)
          case 'tn': return `M${ox},${oy}L${ox+C},${oy}L${ox+C},${oy+C}Z`
          case 'ts': return `M${ox},${oy}L${ox},${oy+C}L${ox+C},${oy+C}Z`
          // NE↙SW diagonal splits (tw=NW half, te=SE half)
          case 'tw': return `M${ox},${oy}L${ox+C},${oy}L${ox},${oy+C}Z`
          case 'te': return `M${ox+C},${oy}L${ox+C},${oy+C}L${ox},${oy+C}Z`

          default: return null
        }
      })()

      if (d) {
        els.push(<path key={`${r}-${c}`} d={d} fill={fill} />)
      }
    })
  })

  return els
}

// ─── Phase SVG wrapper ────────────────────────────────────────────────────────

function PhaseSVG({
  layout,
  C,
  accent,
}: {
  layout: Mod[][]
  C:      number
  accent: Set<string>
}) {
  return (
    <svg
      viewBox="0 0 600 600"
      width="100%"
      height="100%"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}
    >
      {renderGrid(layout, C, accent)}
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
      {variant === 'analyse'        && <PhaseSVG layout={A_GRID} C={150} accent={A_ACC} />}
      {variant === 'change'         && <PhaseSVG layout={C_GRID} C={120} accent={C_ACC} />}
      {variant === 'responsibility' && <PhaseSVG layout={R_GRID} C={150} accent={R_ACC} />}
      {variant === 'iterate'        && <PhaseSVG layout={I_GRID} C={150} accent={I_ACC} />}
      {variant === 'overall'        && <PhaseSVG layout={O_GRID} C={120} accent={O_ACC} />}

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
