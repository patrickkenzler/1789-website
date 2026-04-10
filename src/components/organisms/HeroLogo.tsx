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

// ─── Gap Graphic — mountain contour fills ────────────────────────────────────
/**
 * Topographic contour aesthetic: 6 closed filled shapes per side at 60% opacity.
 * Shapes stack largest→smallest so overlapping areas accumulate opacity, creating
 * a natural gradient — darkest at the fixed outer edge, lightest near the gap.
 *
 * Each contour is a CLOSED shape:
 *   Terra:  M 0,0 · L tx,0 · Q×4 (organic right edge) · L 0,470 · Z
 *   Sage:   M 560,0 · L tx,0 · Q×4 (organic left edge) · L 560,470 · Z
 *
 * The outer corners (0,0), (0,470) for terra and (560,0), (560,470) for sage
 * are always fixed. Only the organic edge slides per stage.
 *
 * Contour offsets [0, 28, 56, 84, 112, 140] px — each layer's organic edge
 * retreats inward by that amount. 6 layers × 60% opacity → nearly solid at
 * the outer edge, single-layer transparency near the gap.
 *
 * Terra 20 s / Sage 13 s (5 s begin-offset) → LCM 260 s before phase repeats.
 */

// Anchor arrays: [tx, a1, a2, a3, a4, bx]
//   tx = organic-edge x at y=0  (slides; corner stays at 0 or 560)
//   a1–a4 = interior anchors at y = [94, 188, 282, 376]
//   bx = organic-edge x at y=470
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

/** Closed terra shape: fixed left corners, organic right edge shifted left by δ */
function terraContour(xs: readonly number[], δ: number): string {
  const [tx, a1, a2, a3, a4, bx] = xs.map(x => Math.max(0, Math.round(x - δ)))
  const m1 = Math.round((a1 + a2) / 2)
  const m2 = Math.round((a2 + a3) / 2)
  const m3 = Math.round((a3 + a4) / 2)
  return `M 0,0 L ${tx},0 Q ${a1},94 ${m1},141 Q ${a2},188 ${m2},235 Q ${a3},282 ${m3},329 Q ${a4},376 ${bx},470 L 0,470 Z`
}

/** Closed sage shape: fixed right corners, organic left edge shifted right by δ */
function sageContour(xs: readonly number[], δ: number): string {
  const [tx, a1, a2, a3, a4, bx] = xs.map(x => Math.min(560, Math.round(x + δ)))
  const m1 = Math.round((a1 + a2) / 2)
  const m2 = Math.round((a2 + a3) / 2)
  const m3 = Math.round((a3 + a4) / 2)
  return `M 560,0 L ${tx},0 Q ${a1},94 ${m1},141 Q ${a2},188 ${m2},235 Q ${a3},282 ${m3},329 Q ${a4},376 ${bx},470 L 560,470 Z`
}

// 9 layers; rendered largest→smallest so overlap areas stack opacity naturally
const CONTOUR_OFFSETS = [0, 20, 40, 60, 80, 100, 120, 140, 160]
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
      {/* ── Struktur — terra (left) · 20 s · largest shape first ── */}
      {CONTOUR_OFFSETS.map((δ, i) => {
        const vals = [...TERRA_STAGES, TERRA_STAGES[0]].map(s => terraContour(s, δ)).join(';')
        return (
          <path
            key={`t${i}`}
            fill="var(--color-terra)"
            fillOpacity="0.3"
            d={terraContour(TERRA_STAGES[0], δ)}
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

      {/* ── Strategie — sage (right) · 13 s · offset 5 s · largest first ── */}
      {CONTOUR_OFFSETS.map((δ, i) => {
        const vals = [...SAGE_STAGES, SAGE_STAGES[0]].map(s => sageContour(s, δ)).join(';')
        return (
          <path
            key={`s${i}`}
            fill="var(--color-sage)"
            fillOpacity="0.3"
            d={sageContour(SAGE_STAGES[0], δ)}
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
            LEFT — all text: both headlines + body copy + CTAs
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
          {/* Block 1 — ink, regular */}
          <p
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    400,
              fontStyle:     'normal',
              fontSize:      'clamp(1.35rem, min(5.4vw, 7.65svh), 8.1rem)',
              lineHeight:    0.93,
              letterSpacing: '-0.028em',
              color:         'var(--color-ink)',
              paddingBottom: '0.22em',
            }}
          >
            Organisationen<br />
            scheitern nicht an<br />
            schlechten Strategien
          </p>

          {/* Block 2 — terra, italic regular */}
          <p
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    400,
              fontStyle:     'italic',
              fontSize:      'clamp(1.35rem, min(5.4vw, 7.65svh), 8.1rem)',
              lineHeight:    0.93,
              letterSpacing: '-0.028em',
              color:         'var(--color-terra)',
              paddingBottom: '0.22em',
            }}
          >
            Sie scheitern an der<br />
            Lücke zwischen<br />
            Strategie &amp; Struktur
          </p>

          {/* Body copy */}
          <p
            style={{
              fontFamily:   'var(--font-body)',
              fontSize:     'clamp(0.875rem, 1.05vw, 1.05rem)',
              color:        'var(--color-ink)',
              lineHeight:   1.7,
            }}
          >
            Wir sind <strong style={{ color: 'var(--color-terra)' }}>1789 Innovation</strong>, mit unserem <strong>innovativen
            Beratungsansatz</strong> begleiten wir Organisationen in der <strong>Veränderung
            ihrer Strukturen und Unternehmensstrategie.</strong> Dabei verknüpfen wir
            wissenschaftliche <strong>systemtheoretische Ansätze</strong> mit sofortigen <strong>pragmatischen
            Pilotierungen</strong> von Veränderungsprozessen.
          </p>

          {/* CTAs */}
          <div
            style={{
              display:  'flex',
              gap:      '1rem',
              flexWrap: 'wrap',
              animation: a('fadeUp', '700ms', '350ms'),
            }}
          >
            <a href="/ansatz">
              <Button variant="ghost">Unser Ansatz →</Button>
            </a>
            <a href="/kontakt">
              <Button variant="terra">Erstgespräch vereinbaren</Button>
            </a>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT — SVG animation only, full column height, no padding
        ──────────────────────────────────────────────────────────────── */}
        <div
          style={{
            display:   'flex',
            alignItems: 'stretch',
            overflow:  'hidden',
            animation: a('fadeUp', '1000ms', '200ms', 'var(--ease-expressive)'),
          }}
        >
          <GapGraphic />
        </div>
      </div>

    </div>
  )
}
