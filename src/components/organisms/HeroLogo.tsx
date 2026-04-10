'use client'

/**
 * HeroLogo — v6: independent morphing animation
 *
 * Left  (7fr):  Two-part bold headline
 *               1. Ink bold:    "Organisationen scheitern nicht an schlechten Strategien"
 *               2. Terra italic bold: "Sie scheitern an der Lücke zwischen Strategie und Struktur."
 *
 * Right (5fr):  Upper — GapGraphic: two abstract SVG shapes
 *                         orange (terra)  = Struktur
 *                         sage            = Strategie
 *                         white gap       = der Gap
 *               Lower — body copy with bold emphasis + CTA row
 *
 * Font weights: 700 (bold) for both headline blocks.
 * Cormorant Garamond 700 is declared in layout.tsx.
 */

import { Button } from '@/components/atoms/Button'

/** Shorthand for CSS animation shorthand with fill-mode:both */
const a = (
  name:     string,
  duration: string,
  delay:    string,
  easing  = 'var(--ease-entry)',
) => `${name} ${duration} ${easing} ${delay} both`

// ─── Gap Graphic — mountain contour strokes ──────────────────────────────────
/**
 * Mountain-contour aesthetic: strokes only, no fill.
 * Each side renders 6 contour lines spaced 30 px apart — like a topographic
 * map of a canyon, with terra lines on the left and sage lines on the right.
 *
 * Each contour is an OPEN path (no closing lines) running from y=0 to y=470:
 *   M tx,0  Q a1,94 m1,141  Q a2,188 m2,235  Q a3,282 m3,329  Q a4,376 bx,470
 *
 * Anchor arrays: [tx, a1, a2, a3, a4, bx]
 *   tx = x where edge meets y=0 (slides horizontally)
 *   a1–a4 = interior anchors at y = [94, 188, 282, 376]
 *   bx = x where edge meets y=470 (slides horizontally)
 *   m1–m3 = midpoints between adjacent interior anchors (Q endpoints)
 *
 * Contour offsets: the 6 lines are shifted inward by [0, 30, 60, 90, 120, 150] px.
 * Terra shifts LEFT; sage shifts RIGHT — both move toward their respective edges.
 * Terra outermost max x = 240; sage outermost min x = 350 → ≥ 110 px gap.
 *
 * Terra 20 s / Sage 13 s (5 s begin-offset) → LCM 260 s before phase repeats.
 */

// Stage data: [tx, a1, a2, a3, a4, bx]
const TERRA_STAGES: ReadonlyArray<readonly number[]> = [
  [ 80, 180, 240, 180,  80, 160],  // bell
  [220,  80,  60, 100, 220,  80],  // valley
  [ 60, 100, 160, 220, 240, 180],  // rising
  [240, 200, 150,  80,  60, 180],  // falling
]
const SAGE_STAGES: ReadonlyArray<readonly number[]> = [
  [490, 380, 360, 400, 500, 420],  // valley-r
  [380, 490, 520, 480, 370, 500],  // bell-r
  [510, 460, 400, 350, 380, 460],  // falling-r
  [370, 350, 400, 460, 510, 390],  // rising-r
]

/** Open path for one terra contour edge, shifted left by δ px */
function terraEdge(xs: readonly number[], δ: number): string {
  const [tx, a1, a2, a3, a4, bx] = xs.map(x => Math.max(0, Math.round(x - δ)))
  return `M ${tx},0 Q ${a1},94 ${Math.round((a1+a2)/2)},141 Q ${a2},188 ${Math.round((a2+a3)/2)},235 Q ${a3},282 ${Math.round((a3+a4)/2)},329 Q ${a4},376 ${bx},470`
}

/** Open path for one sage contour edge, shifted right by δ px */
function sageEdge(xs: readonly number[], δ: number): string {
  const [tx, a1, a2, a3, a4, bx] = xs.map(x => Math.min(560, Math.round(x + δ)))
  return `M ${tx},0 Q ${a1},94 ${Math.round((a1+a2)/2)},141 Q ${a2},188 ${Math.round((a2+a3)/2)},235 Q ${a3},282 ${Math.round((a3+a4)/2)},329 Q ${a4},376 ${bx},470`
}

const CONTOUR_OFFSETS = [0, 30, 60, 90, 120, 150]   // 6 contour lines per side
const KEY_TIMES   = '0; 0.25; 0.5; 0.75; 1'
const KEY_SPLINES = '0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1'

function GapGraphic() {
  return (
    <svg
      viewBox="0 0 560 470"
      width="100%"
      height="100%"
      aria-label="Der Gap: Struktur und Strategie — Bergkonturen"
      style={{ display: 'block' }}
      preserveAspectRatio="none"
    >
      {/* ── Struktur — terra contours (left) · 20 s cycle ── */}
      {CONTOUR_OFFSETS.map((δ, i) => {
        const vals = [...TERRA_STAGES, TERRA_STAGES[0]].map(s => terraEdge(s, δ)).join(';')
        return (
          <path
            key={`t${i}`}
            fill="none"
            stroke="var(--color-terra)"
            strokeWidth="2"
            strokeLinecap="round"
            d={terraEdge(TERRA_STAGES[0], δ)}
          >
            <animate
              attributeName="d"
              dur="20s"
              begin="0s"
              repeatCount="indefinite"
              values={vals}
              calcMode="spline"
              keyTimes={KEY_TIMES}
              keySplines={KEY_SPLINES}
            />
          </path>
        )
      })}

      {/* ── Strategie — sage contours (right) · 13 s cycle, offset 5 s ── */}
      {CONTOUR_OFFSETS.map((δ, i) => {
        const vals = [...SAGE_STAGES, SAGE_STAGES[0]].map(s => sageEdge(s, δ)).join(';')
        return (
          <path
            key={`s${i}`}
            fill="none"
            stroke="var(--color-sage)"
            strokeWidth="2"
            strokeLinecap="round"
            d={sageEdge(SAGE_STAGES[0], δ)}
          >
            <animate
              attributeName="d"
              dur="13s"
              begin="5s"
              repeatCount="indefinite"
              values={vals}
              calcMode="spline"
              keyTimes={KEY_TIMES}
              keySplines={KEY_SPLINES}
            />
          </path>
        )
      })}
    </svg>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function HeroLogo() {
  return (
    <div
      style={{
        flex:    '1',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      {/* ── MAIN SPLIT ── */}
      <div
        className="hero-split"
        style={{
          flex:                '1',
          display:             'grid',
          gridTemplateColumns: '7fr 5fr',
        }}
      >

        {/* ─────────────────────────────────────────────────────────────
            LEFT — two headline blocks spread across full column height
        ──────────────────────────────────────────────────────────────── */}
        <div
          style={{
            paddingInline:  'var(--grid-margin)',
            paddingBlock:   'clamp(1rem, 2svh, 2.5rem)',
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'space-between',
            animation:      a('fadeUp', '900ms', '80ms', 'var(--ease-expressive)'),
          }}
        >
          {/* Block 1 — ink, bold
              font-size uses min(vw, svh) so it scales down whichever
              viewport dimension is the bottleneck (width OR height).
              On a 13" MBP (~1280×800) svh wins and keeps 6 lines inside the viewport. */}
          <p
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    400,
              fontStyle:     'normal',
              fontSize:      'clamp(1.5rem, min(6vw, 8.5svh), 9rem)',
              lineHeight:    0.93,
              letterSpacing: '-0.028em',
              color:         'var(--color-ink)',
              paddingBottom: '0.22em',   // descender clearance for "g" in "Strategien"
            }}
          >
            Organisationen<br />
            scheitern nicht an<br />
            schlechten Strategien
          </p>

          {/* Block 2 — terra, italic bold */}
          <p
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    700,
              fontStyle:     'italic',
              fontSize:      'clamp(1.5rem, min(6vw, 8.5svh), 9rem)',
              lineHeight:    0.93,
              letterSpacing: '-0.028em',
              color:         'var(--color-terra)',
              paddingBottom: '0.22em',   // descender clearance for "g" in "Strategie"
            }}
          >
            Sie scheitern an der<br />
            Lücke zwischen<br />
            Strategie und Struktur.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT — graphic (flex-grow) + body copy + CTAs
            ALL padding lives on the outer wrapper — graphic and text
            share one identical content box, so their widths always match.
        ──────────────────────────────────────────────────────────────── */}
        <div
          style={{
            display:        'flex',
            flexDirection:  'column',
            paddingInline:  'clamp(1.25rem, 2.5vw, 3rem)',
            paddingTop:     'clamp(1rem, 1.5svh, 2.5rem)',
            paddingBottom:  'clamp(1.25rem, 2.5svh, 3.5rem)',
          }}
        >

          {/* Graphic — fills remaining space; minHeight:0 lets it shrink on small screens */}
          <div
            style={{
              flex:      '1 1 0',
              minHeight: 0,
              overflow:  'hidden',
              display:   'flex',
              alignItems:'stretch',
              animation: a('fadeUp', '1000ms', '200ms', 'var(--ease-expressive)'),
            }}
          >
            <GapGraphic />
          </div>

          {/* Body copy + CTAs — fixed height, never hidden */}
          <div
            style={{
              flexShrink: 0,
              paddingTop: 'clamp(1rem, 1.5svh, 2rem)',
              animation:  a('fadeUp', '700ms', '350ms'),
            }}
          >
            <p
              style={{
                fontFamily:   'var(--font-body)',
                fontSize:     'clamp(0.875rem, 1.05vw, 1.05rem)',
                color:        'var(--color-ink)',
                lineHeight:   1.7,
                marginBottom: 'clamp(1rem, 2svh, 2rem)',
              }}
            >
              Wir nennen diese Lücke <strong>den Gap</strong><br />
              Er ist kein Defizit, sondern der produktivste Ort Ihrer Organisation.<br />
              <strong>1789 macht den Gap verhandelbar:</strong> durch
              Organisationsarchitekturen, die Strategie und Struktur als das
              behandeln, was sie sind – zwei Seiten derselben Bewegung.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <a href="/ansatz">
                <Button variant="ghost">Unser Ansatz →</Button>
              </a>
              <a href="/kontakt">
                <Button variant="terra">Erstgespräch vereinbaren</Button>
              </a>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
