/**
 * CollagePanel — v2: Phase-Specific Illustrations
 *
 * Each Systemshift phase gets a distinct editorial SVG illustration:
 *   analyse        → The Lens:   concentric rings converging to a terra focal point
 *   change         → The Force:  radiating vectors from a focal point — explosive motion
 *   responsibility → The Knot:   two overlapping circles with a terra-filled intersection
 *   iterate        → The Spiral: expanding Archimedean spiral with directional arrow
 *
 * All SVGs are inline JSX (no external files), using brand colour tokens.
 * Container and label system unchanged from v1.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface CollagePanelProps {
  /** Visual variant — each evokes a different phase of the Systemshift Cycle */
  variant?: 'analyse' | 'change' | 'responsibility' | 'iterate'
}

// ─── Pre-computed paths (constant — run once at module load) ──────────────────

/** Archimedean spiral centred at (300, 320): 5.5 turns, r 12 → 262 */
const SPIRAL_PATH = (() => {
  const cx = 300, cy = 320
  const turns = 5.5
  const rStart = 12, rEnd = 262
  const steps = 500
  const total = turns * 2 * Math.PI
  const b = (rEnd - rStart) / total
  return Array.from({ length: steps + 1 }, (_, i) => {
    const θ = (i / steps) * total
    const r = rStart + b * θ
    const x = (cx + r * Math.cos(θ - Math.PI / 2)).toFixed(1)
    const y = (cy + r * Math.sin(θ - Math.PI / 2)).toFixed(1)
    return i === 0 ? `M${x},${y}` : `L${x},${y}`
  }).join(' ')
})()

// ─── Illustrations ────────────────────────────────────────────────────────────

/**
 * The Lens — Analyse & Erkenntnis
 * Concentric rings narrowing to a terra focal point.
 * A horizontal hairline bisects the composition at the centre of focus.
 * Tick marks on the hairline at each ring radius evoke a calibrated instrument.
 */
function AnalyseSVG() {
  const cx = 300, cy = 370
  const radii = [292, 228, 162, 104, 54]

  return (
    <svg
      viewBox="0 0 600 600"
      width="100%"
      height="100%"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}
    >
      {/* Outermost ring — very faint terra */}
      <circle cx={cx} cy={cy} r={radii[0]} fill="none" stroke="#F44D0B" strokeWidth="0.5" opacity="0.1" />
      {/* Middle rings — sand */}
      <circle cx={cx} cy={cy} r={radii[1]} fill="none" stroke="#E3DDD5" strokeWidth="0.75" opacity="0.2" />
      <circle cx={cx} cy={cy} r={radii[2]} fill="none" stroke="#E3DDD5" strokeWidth="1"    opacity="0.28" />
      {/* Inner rings — terra, increasing opacity */}
      <circle cx={cx} cy={cy} r={radii[3]} fill="none" stroke="#F44D0B" strokeWidth="1"    opacity="0.45" />
      <circle cx={cx} cy={cy} r={radii[4]} fill="none" stroke="#F44D0B" strokeWidth="1.5"  opacity="0.65" />
      {/* Focal point */}
      <circle cx={cx} cy={cy} r={8} fill="#F44D0B" opacity="0.95" />
      <circle cx={cx} cy={cy} r={3} fill="#1A1714" opacity="1" />

      {/* Horizontal bisecting hairline */}
      <line x1="0" y1={cy} x2="600" y2={cy} stroke="#E3DDD5" strokeWidth="0.5" opacity="0.18" />

      {/* Tick marks at each ring radius */}
      {radii.slice(1).map((r) => (
        <g key={r}>
          <line x1={cx - r} y1={cy - 5} x2={cx - r} y2={cy + 5} stroke="#E3DDD5" strokeWidth="0.75" opacity="0.3" />
          <line x1={cx + r} y1={cy - 5} x2={cx + r} y2={cy + 5} stroke="#E3DDD5" strokeWidth="0.75" opacity="0.3" />
        </g>
      ))}

      {/* Short vertical crosshair through focal point */}
      <line x1={cx} y1={cy - 180} x2={cx} y2={cy + 60} stroke="#E3DDD5" strokeWidth="0.5" opacity="0.1" />
    </svg>
  )
}

/**
 * The Force — Change by Action
 * Radiating vectors from a bottom-left focal point, fanning upward and rightward.
 * Suggests explosive momentum: collective force moving in the same direction.
 * The primary terra line is the dominant stroke; sage and sand recede behind it.
 */
function ChangeSVG() {
  const fx = 80, fy = 520  // focal origin — bottom-left

  // [target x, target y, color, strokeWidth, opacity]
  const rays: [number, number, string, number, number][] = [
    [600,   0, '#E3DDD5', 0.5,  0.2],   // steep top-right — sand, faint
    [600,  80, '#B8CC8A', 1,    0.35],  // top-right — sage thin
    [600, 200, '#B8CC8A', 2,    0.55],  // upper-right — sage medium
    [600, 340, '#F44D0B', 4,    0.75],  // dominant right — terra bold
    [600, 460, '#B8CC8A', 2.5,  0.6],   // right — sage
    [600, 570, '#B8CC8A', 1,    0.35],  // flat-right — sage thin
    [420,   0, '#E3DDD5', 0.75, 0.2],   // upward-right — sand
    [240,   0, '#E3DDD5', 0.5,  0.15],  // steep upward — sand faint
  ]

  return (
    <svg
      viewBox="0 0 600 600"
      width="100%"
      height="100%"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}
    >
      <defs>
        <marker id="arrow-terra" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#F44D0B" opacity="0.75" />
        </marker>
        <marker id="arrow-sage" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <polygon points="0 0, 5 2.5, 0 5" fill="#B8CC8A" opacity="0.6" />
        </marker>
      </defs>

      {/* Focal glow */}
      <circle cx={fx} cy={fy} r="24" fill="#F44D0B" opacity="0.06" />
      <circle cx={fx} cy={fy} r="10" fill="#F44D0B" opacity="0.12" />
      <circle cx={fx} cy={fy} r="4"  fill="#F44D0B" opacity="0.5"  />

      {/* Rays */}
      {rays.map(([tx, ty, color, width, opacity], i) => (
        <line
          key={i}
          x1={fx} y1={fy}
          x2={tx} y2={ty}
          stroke={color}
          strokeWidth={width}
          opacity={opacity}
          markerEnd={
            color === '#F44D0B' ? 'url(#arrow-terra)'
            : width >= 2        ? 'url(#arrow-sage)'
            : undefined
          }
        />
      ))}
    </svg>
  )
}

/**
 * The Knot — Responsibility / Verbindlichkeit gestalten
 * Two overlapping circles (Venn). Their intersection is filled terra —
 * the shared zone where commitment is forged.
 */
function ResponsibilitySVG() {
  return (
    <svg
      viewBox="0 0 600 600"
      width="100%"
      height="100%"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}
    >
      <defs>
        <clipPath id="panel-clip-left">
          <circle cx="225" cy="300" r="192" />
        </clipPath>
        <clipPath id="panel-clip-right">
          <circle cx="375" cy="300" r="192" />
        </clipPath>
      </defs>

      {/* Outer glow rings */}
      <circle cx="225" cy="300" r="210" fill="none" stroke="#E3DDD5" strokeWidth="0.5" opacity="0.1" />
      <circle cx="375" cy="300" r="210" fill="none" stroke="#E3DDD5" strokeWidth="0.5" opacity="0.1" />

      {/* Left circle — sand stroke, very subtle fill */}
      <circle cx="225" cy="300" r="192" fill="rgba(227,221,213,0.04)" stroke="#E3DDD5" strokeWidth="1" opacity="0.5" />
      {/* Right circle — same */}
      <circle cx="375" cy="300" r="192" fill="rgba(227,221,213,0.04)" stroke="#E3DDD5" strokeWidth="1" opacity="0.5" />

      {/* Intersection fill — terra, clipped to left circle */}
      <circle cx="375" cy="300" r="192" fill="#F44D0B" opacity="0.22" clipPath="url(#panel-clip-left)" />
      {/* Terra stroke along left-circle boundary within right circle */}
      <circle cx="225" cy="300" r="192" fill="none" stroke="#F44D0B" strokeWidth="1" opacity="0.35" clipPath="url(#panel-clip-right)" />
      {/* Terra stroke along right-circle boundary within left circle */}
      <circle cx="375" cy="300" r="192" fill="none" stroke="#F44D0B" strokeWidth="1" opacity="0.35" clipPath="url(#panel-clip-left)" />

      {/* Centre focal dot */}
      <circle cx="300" cy="300" r="7" fill="#F44D0B" opacity="0.9" />
      <circle cx="300" cy="300" r="3" fill="#1A1714" opacity="1" />

      {/* Horizontal axis hairline */}
      <line x1="20" y1="300" x2="580" y2="300" stroke="#E3DDD5" strokeWidth="0.5" opacity="0.15" />
    </svg>
  )
}

/**
 * The Spiral — Iterate / Kontinuierlich wachsen
 * An expanding Archimedean spiral — continuous, open, directional.
 * Radial guide lines suggest cadence; the arrow at the terminus marks direction.
 */
function IterateSVG() {
  // Arrowhead: last point of spiral and the direction tangent
  // At θ = 5.5 * 2π, direction tangent ≈ perpendicular to radius
  const endTheta = 5.5 * 2 * Math.PI
  const cx = 300, cy = 320
  const rEnd = 262
  const endX = cx + rEnd * Math.cos(endTheta - Math.PI / 2)
  const endY = cy + rEnd * Math.sin(endTheta - Math.PI / 2)
  // Tangent at end: derivative of (r·cos θ, r·sin θ) — simplified as perpendicular to radius
  const tangentAngle = endTheta - Math.PI / 2 + Math.PI / 2  // 90° from radius = tangent
  const arrowLen = 16
  const ax1 = endX + arrowLen * Math.cos(tangentAngle - 0.35)
  const ay1 = endY + arrowLen * Math.sin(tangentAngle - 0.35)
  const ax2 = endX + arrowLen * Math.cos(tangentAngle + 0.35)
  const ay2 = endY + arrowLen * Math.sin(tangentAngle + 0.35)

  return (
    <svg
      viewBox="0 0 600 600"
      width="100%"
      height="100%"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}
    >
      {/* Faint radial guides — 5 spokes at 72° intervals */}
      {[0, 72, 144, 216, 288].map((deg) => {
        const rad = (deg - 90) * (Math.PI / 180)
        return (
          <line
            key={deg}
            x1={cx} y1={cy}
            x2={(cx + 270 * Math.cos(rad)).toFixed(1)}
            y2={(cy + 270 * Math.sin(rad)).toFixed(1)}
            stroke="#E3DDD5"
            strokeWidth="0.5"
            opacity="0.07"
          />
        )
      })}

      {/* Outer reference circle */}
      <circle cx={cx} cy={cy} r="275" fill="none" stroke="#E3DDD5" strokeWidth="0.5" opacity="0.08" />

      {/* The spiral */}
      <path d={SPIRAL_PATH} fill="none" stroke="#F44D0B" strokeWidth="1.5" opacity="0.75" />

      {/* Directional arrowhead at spiral terminus */}
      <line
        x1={endX.toFixed(1)} y1={endY.toFixed(1)}
        x2={ax1.toFixed(1)}  y2={ay1.toFixed(1)}
        stroke="#F44D0B" strokeWidth="1.5" opacity="0.75"
      />
      <line
        x1={endX.toFixed(1)} y1={endY.toFixed(1)}
        x2={ax2.toFixed(1)}  y2={ay2.toFixed(1)}
        stroke="#F44D0B" strokeWidth="1.5" opacity="0.75"
      />

      {/* Centre origin dot */}
      <circle cx={cx} cy={cy} r="5" fill="#F44D0B" opacity="0.9" />
    </svg>
  )
}

// ─── Panel ────────────────────────────────────────────────────────────────────

export function CollagePanel({ variant = 'analyse' }: CollagePanelProps) {
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

      {/* ── Label — bottom-left ── */}
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
            color:         'rgba(227, 221, 213, 0.35)',
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
            color:         'rgba(227, 221, 213, 0.2)',
          }}
        >
          {variant === 'analyse'        ? '01 / Analyse'
         : variant === 'change'         ? '02 / Change'
         : variant === 'responsibility' ? '03 / Responsibility'
         :                               '04 / Iterate'}
        </span>
      </div>
    </div>
  )
}
