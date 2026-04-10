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

// ─── Gap Graphic — morphing SVG ──────────────────────────────────────────────
/**
 * Two organic blobs morphing through 4 states via SVG <animate>.
 *
 * Shape structure — straight top/bottom, organic middle:
 *   Top and bottom edges are STRAIGHT horizontal lines whose x-endpoint
 *   slides left/right each stage → the shape has a clean squared corner
 *   where the horizontal edge meets the organic vertical edge.
 *   The organic middle uses quadratic bezier midpoint chaining (4 interior
 *   anchors) for guaranteed smooth, spike-free curves.
 *
 *   Path (terra):  M 0,0 · L tx,0 · Q A1 m12 · Q A2 m23 · Q A3 m34 · Q A4 bx,470 · L 0,470 · Z
 *   Path (sage):   M 560,0 · L tx,0 · Q … · L 560,470 · Z
 *
 *   tx = top anchor x (slides along y=0)
 *   bx = bottom anchor x (slides along y=470)
 *   A1–A4 = interior organic anchors at y = [94, 188, 282, 376]
 *   m12, m23, m34 = midpoints between adjacent interior anchors (Q endpoints)
 *
 *  – Terra max x ≤ 240; sage min x ≥ 350 → ≥ 110 px gap always.
 *  – Terra 20 s / Sage 13 s (5 s offset) → LCM 260 s before phase repeats.
 */

// Terra (Struktur — left shape) — 4 keyframe paths
//                      tx /  A1  /  A2  /  A3  /  A4  / bx
//  TA (bell):          80 / 180  / 240  / 180  /  80  / 160
//  TB (valley):       220 /  80  /  60  / 100  / 220  /  80
//  TC (rising):        60 / 100  / 160  / 220  / 240  / 180
//  TD (falling):      240 / 200  / 150  /  80  /  60  / 180
//
// All interior midpoints = avg of adjacent anchor (x, y).
// Terra convex-hull max x = 240 across all stages.
const TA = 'M 0,0 L 80,0 Q 180,94 210,141 Q 240,188 210,235 Q 180,282 130,329 Q 80,376 160,470 L 0,470 Z'
const TB = 'M 0,0 L 220,0 Q 80,94 70,141 Q 60,188 80,235 Q 100,282 160,329 Q 220,376 80,470 L 0,470 Z'
const TC = 'M 0,0 L 60,0 Q 100,94 130,141 Q 160,188 190,235 Q 220,282 230,329 Q 240,376 180,470 L 0,470 Z'
const TD = 'M 0,0 L 240,0 Q 200,94 175,141 Q 150,188 115,235 Q 80,282 70,329 Q 60,376 180,470 L 0,470 Z'

// Sage (Strategie — right shape) — independent timing
//                      tx  /  A1  /  A2  /  A3  /  A4  / bx
//  SA (valley-r):     490  / 380  / 360  / 400  / 500  / 420
//  SB (bell-r):       380  / 490  / 520  / 480  / 370  / 500
//  SC (falling-r):    510  / 460  / 400  / 350  / 380  / 460
//  SD (rising-r):     370  / 350  / 400  / 460  / 510  / 390
//
// Sage convex-hull min x = 350 → gap from terra max 240 = 110 px.
const SA = 'M 560,0 L 490,0 Q 380,94 370,141 Q 360,188 380,235 Q 400,282 450,329 Q 500,376 420,470 L 560,470 Z'
const SB = 'M 560,0 L 380,0 Q 490,94 505,141 Q 520,188 500,235 Q 480,282 425,329 Q 370,376 500,470 L 560,470 Z'
const SC = 'M 560,0 L 510,0 Q 460,94 430,141 Q 400,188 375,235 Q 350,282 365,329 Q 380,376 460,470 L 560,470 Z'
const SD = 'M 560,0 L 370,0 Q 350,94 375,141 Q 400,188 430,235 Q 460,282 485,329 Q 510,376 390,470 L 560,470 Z'

// Looping: append stage A at the end so each cycle is seamless.
// Terra: 20 s · Sage: 13 s  →  LCM = 260 s before the phase combination repeats.
const TERRA_VALS  = [TA, TB, TC, TD, TA].join(';')
const SAGE_VALS   = [SA, SB, SC, SD, SA].join(';')
const KEY_TIMES   = '0; 0.25; 0.5; 0.75; 1'
const KEY_SPLINES = '0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1'

function GapGraphic() {
  return (
    <svg
      viewBox="0 0 560 470"
      width="100%"
      height="100%"
      aria-label="Der Gap: Struktur und Strategie getrennt durch eine sich verändernde Lücke"
      style={{ display: 'block' }}
      preserveAspectRatio="none"
    >
      {/* ── Struktur — terra (left) · 15 s cycle ── */}
      <path fill="var(--color-terra)" d={TA}>
        <animate
          attributeName="d"
          dur="20s"
          begin="0s"
          repeatCount="indefinite"
          values={TERRA_VALS}
          calcMode="spline"
          keyTimes={KEY_TIMES}
          keySplines={KEY_SPLINES}
        />
      </path>

      {/* ── Strategie — sage (right) · 11 s cycle, offset by 4 s ── */}
      <path fill="var(--color-sage)" d={SA}>
        <animate
          attributeName="d"
          dur="13s"
          begin="5s"
          repeatCount="indefinite"
          values={SAGE_VALS}
          calcMode="spline"
          keyTimes={KEY_TIMES}
          keySplines={KEY_SPLINES}
        />
      </path>
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
