/**
 * CollagePanel — v3: Abstract Pattern Illustrations
 *
 * Bauhaus / Swiss-design geometric patterns — one per Systemshift phase.
 * Inspired by systematic poster design: halftone fields, cascading tiles,
 * woven grids, concentric growth rings.
 *
 * Brand palette (hard-coded — CSS vars can't be used inside SVG fill/stroke):
 *   terra  #F44D0B  ·  sage  #B8CC8A  ·  sand  #E3DDD5  ·  ink  #1A1714
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface CollagePanelProps {
  variant?: 'analyse' | 'change' | 'responsibility' | 'iterate' | 'overall'
}

// ─── Pre-computed data (constant, evaluated once at module load) ───────────────

/**
 * ANALYSE — Halftone focal array
 * 14 × 16 grid of dots. Dot radius + opacity grow toward focal point (300, 660)
 * below the canvas — largest/boldest at bottom-centre, smallest at top corners.
 * Concept: "the field of data converging toward a single truth."
 */
const ANALYSE_DOTS: { x: string; y: string; r: string; o: string }[] = (() => {
  const cols = 14, rows = 16, pad = 28
  const stepX = (600 - pad * 2) / (cols - 1)
  const stepY = (600 - pad * 2) / (rows - 1)
  const fx = 300, fy = 660
  const maxD = Math.sqrt((pad - fx) ** 2 + (pad - fy) ** 2)
  const out: { x: string; y: string; r: string; o: string }[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = pad + c * stepX
      const y = pad + r * stepY
      const t = Math.max(0, 1 - Math.sqrt((x - fx) ** 2 + (y - fy) ** 2) / maxD)
      out.push({
        x: x.toFixed(1),
        y: y.toFixed(1),
        r: (2.5 + t * 16).toFixed(1),
        o: (0.15 + t * 0.76).toFixed(2),
      })
    }
  }
  return out
})()

/**
 * CHANGE — Diagonal parallelogram cascade
 * 8 rows of slanted tiles that widen and densify toward the bottom.
 * Alternating sage / sand fill; odd rows staggered by half a step.
 * Concept: "collective force accelerating in the same direction."
 */
const CHANGE_SHAPES: { pts: string; fill: string; o: string }[] = (() => {
  const S = 18 // horizontal slant offset (px)
  const out: { pts: string; fill: string; o: string }[] = []
  for (let row = 0; row < 8; row++) {
    const t    = row / 7
    const w    = 20 + t * 56   // 20 → 76 px wide
    const h    = 13 + t * 13   // 13 → 26 px tall
    const gap  = 16 - t * 10   // gap shrinks as shapes grow
    const cy   = 30 + row * 74
    const step = w + gap
    const cols = Math.ceil(680 / step) + 1
    const fill = row % 2 === 0 ? '#B8CC8A' : '#E3DDD5'
    const o    = (0.28 + t * 0.52).toFixed(2)
    for (let col = 0; col < cols; col++) {
      const cx = -step + col * step + (row % 2 === 1 ? step / 2 : 0)
      const pts = [
        `${(cx - w / 2 + S).toFixed(1)},${(cy - h / 2).toFixed(1)}`,
        `${(cx + w / 2 + S).toFixed(1)},${(cy - h / 2).toFixed(1)}`,
        `${(cx + w / 2 - S).toFixed(1)},${(cy + h / 2).toFixed(1)}`,
        `${(cx - w / 2 - S).toFixed(1)},${(cy + h / 2).toFixed(1)}`,
      ].join(' ')
      out.push({ pts, fill, o })
    }
  }
  return out
})()

/**
 * RESPONSIBILITY — Woven grid
 * Sand horizontal bands interlace with terra vertical bands.
 * At alternating intersections the horizontal band renders on top — true weave.
 * Concept: "interlocking structure; shared commitment holds the fabric together."
 */
const WEAVE_RECTS: { x: number; y: number; w: number; h: number; fill: string; k: string }[] = (() => {
  const C = 48, B = 28 // cell size, band width
  const N = Math.ceil(600 / C) + 1
  const out: { x: number; y: number; w: number; h: number; fill: string; k: string }[] = []
  // Layer 1 — all horizontal bands (sand)
  for (let r = 0; r < N; r++)
    out.push({ x: 0, y: r * C, w: 600, h: B, fill: '#E3DDD5', k: `hf${r}` })
  // Layer 2 — all vertical bands (terra)
  for (let c = 0; c < N; c++)
    out.push({ x: c * C, y: 0, w: B, h: 600, fill: '#F44D0B', k: `vf${c}` })
  // Layer 3 — at (r+c)%2===0 intersections redraw horizontal on top
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++)
      if ((r + c) % 2 === 0)
        out.push({ x: c * C, y: r * C, w: B, h: B, fill: '#E3DDD5', k: `xt${r}_${c}` })
  return out
})()

/**
 * ITERATE — Concentric rotating squares
 * 18 nested squares, each 2.8° more rotated than the previous.
 * Stroke weight and opacity grow outward; terra colour throughout.
 * Concept: "growth through repetition — each cycle slightly reoriented."
 */
const ITER_SQUARES: { s: number; rot: string; sw: string; o: string }[] = Array.from(
  { length: 18 },
  (_, i) => {
    const t = i / 17
    return {
      s:   16 + t * 564,
      rot: (i * 2.8).toFixed(1),
      sw:  (0.6 + t * 1.4).toFixed(2),
      o:   (0.22 + t * 0.68).toFixed(2),
    }
  },
)

// ─── Illustration components ──────────────────────────────────────────────────

function AnalyseSVG() {
  return (
    <svg
      viewBox="0 0 600 600"
      width="100%"
      height="100%"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}
    >
      {ANALYSE_DOTS.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#F44D0B" opacity={d.o} />
      ))}
    </svg>
  )
}

function ChangeSVG() {
  return (
    <svg
      viewBox="0 0 600 600"
      width="100%"
      height="100%"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}
    >
      {CHANGE_SHAPES.map((s, i) => (
        <polygon key={i} points={s.pts} fill={s.fill} opacity={s.o} />
      ))}
    </svg>
  )
}

function ResponsibilitySVG() {
  return (
    <svg
      viewBox="0 0 600 600"
      width="100%"
      height="100%"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}
    >
      {WEAVE_RECTS.map((r) => (
        <rect key={r.k} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.fill} opacity="0.82" />
      ))}
    </svg>
  )
}

function IterateSVG() {
  const cx = 300, cy = 300
  return (
    <svg
      viewBox="0 0 600 600"
      width="100%"
      height="100%"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}
    >
      {ITER_SQUARES.map((sq, i) => (
        <rect
          key={i}
          x={cx - sq.s / 2}
          y={cy - sq.s / 2}
          width={sq.s}
          height={sq.s}
          fill="none"
          stroke="#F44D0B"
          strokeWidth={sq.sw}
          opacity={sq.o}
          transform={`rotate(${sq.rot},${cx},${cy})`}
        />
      ))}
      {/* Centre anchor */}
      <circle cx={cx} cy={cy} r="5" fill="#F44D0B" opacity="0.9" />
    </svg>
  )
}

/**
 * OVERALL — Composite bold geometric abstraction
 * Large overlapping shapes in brand colours with a fine dot-texture overlay.
 * Combines the visual logic of all four phases into a single composition.
 */
function OverallSVG() {
  // Fine dot texture pattern — subtle grain approximation
  const textureDots: { x: number; y: number }[] = []
  for (let r = 0; r <= 30; r++)
    for (let c = 0; c <= 30; c++)
      textureDots.push({ x: c * 20, y: r * 20 })

  return (
    <svg
      viewBox="0 0 600 600"
      width="100%"
      height="100%"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}
    >
      <defs>
        <clipPath id="ov-top-left">
          <rect x="0" y="0" width="300" height="300" />
        </clipPath>
        <clipPath id="ov-top-right">
          <rect x="300" y="0" width="300" height="300" />
        </clipPath>
        <clipPath id="ov-bot-left">
          <rect x="0" y="300" width="300" height="300" />
        </clipPath>
        <clipPath id="ov-bot-right">
          <rect x="300" y="300" width="300" height="300" />
        </clipPath>
      </defs>

      {/* ── Q1 top-left: halftone dots (Analyse) ── */}
      <g clipPath="url(#ov-top-left)">
        {ANALYSE_DOTS.filter((_, i) => i % 2 === 0).map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#F44D0B" opacity={d.o} />
        ))}
      </g>

      {/* ── Q2 top-right: parallelogram cascade (Change) ── */}
      <g clipPath="url(#ov-top-right)">
        {CHANGE_SHAPES.map((s, i) => (
          <polygon key={i} points={s.pts} fill={s.fill} opacity={s.o} />
        ))}
      </g>

      {/* ── Q3 bottom-left: woven grid (Responsibility) ── */}
      <g clipPath="url(#ov-bot-left)">
        {WEAVE_RECTS.map((r) => (
          <rect key={r.k} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.fill} opacity="0.75" />
        ))}
      </g>

      {/* ── Q4 bottom-right: concentric squares (Iterate) ── */}
      <g clipPath="url(#ov-bot-right)">
        {ITER_SQUARES.map((sq, i) => (
          <rect
            key={i}
            x={300 - sq.s / 2}
            y={300 - sq.s / 2}
            width={sq.s}
            height={sq.s}
            fill="none"
            stroke="#F44D0B"
            strokeWidth={sq.sw}
            opacity={sq.o}
            transform={`rotate(${sq.rot},300,300)`}
          />
        ))}
      </g>

      {/* ── Quadrant dividers ── */}
      <line x1="300" y1="0"   x2="300" y2="600" stroke="#E3DDD5" strokeWidth="1" opacity="0.2" />
      <line x1="0"   y1="300" x2="600" y2="300" stroke="#E3DDD5" strokeWidth="1" opacity="0.2" />

      {/* ── Central disc — unifies all four quadrants ── */}
      <circle cx="300" cy="300" r="88" fill="#1A1714" opacity="0.92" />
      <circle cx="300" cy="300" r="88" fill="none" stroke="#E3DDD5" strokeWidth="0.75" opacity="0.3" />
      <circle cx="300" cy="300" r="5"  fill="#F44D0B" opacity="0.9" />
    </svg>
  )
}

// ─── Panel ────────────────────────────────────────────────────────────────────

export function CollagePanel({ variant = 'analyse' }: CollagePanelProps) {
  const label =
    variant === 'analyse'        ? '01 / Analyse'
    : variant === 'change'       ? '02 / Change'
    : variant === 'responsibility' ? '03 / Responsibility'
    : variant === 'iterate'      ? '04 / Iterate'
    :                              'Systemshift Cycle'

  return (
    <div
      style={{
        position:        'relative',
        width:           '100%',
        height:          '100%',
        minHeight:       '100svh',
        backgroundColor: 'var(--color-ink)',
        overflow:        'hidden',
      }}
    >
      {variant === 'analyse'        && <AnalyseSVG />}
      {variant === 'change'         && <ChangeSVG />}
      {variant === 'responsibility' && <ResponsibilitySVG />}
      {variant === 'iterate'        && <IterateSVG />}
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
            color:         'rgba(227,221,213,0.35)',
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
            color:         'rgba(227,221,213,0.2)',
          }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}
