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
 * Smoothness — quadratic bezier midpoint chaining (6 anchors per shape):
 *   Anchors sit at y = [0, 94, 188, 282, 376, 470] — the first and last are
 *   ON the top/bottom boundary. Q-bezier endpoints sit at midpoints between
 *   adjacent anchors; the anchors are the Q control points.
 *
 *   Key consequence of top/bottom anchors:
 *   – The bezier from M(0,0) with control A0=(ax,0) exits HORIZONTALLY along
 *     y=0, so the organic edge is already moving at the very top of the frame.
 *   – The final bezier arrives at (0,470) with control A5=(ax,470), also
 *     horizontal — so the edge also animates at the very bottom.
 *   – Convex-hull guarantee: Q-beziers never overshoot their control points →
 *     no spikes, guaranteed smooth tangents (C1) at every midpoint junction.
 *
 *   Path: M 0,0 · Q A0 m01 · Q A1 m12 · Q A2 m23 · Q A3 m34 · Q A4 m45 · Q A5 0,470 · Z
 *
 *  – Terra max control x ≤ 240; sage min ≥ 350 → ≥ 110 px gap always.
 *  – Terra 20 s / Sage 13 s (5 s offset) → LCM 260 s before phase repeats.
 */

// Terra (Struktur — left shape) — 4 keyframe paths, 6 Q commands each
//
// Anchor x at y = [0, 94, 188, 282, 376, 470]   (TA / TB / TC / TD):
//   A0 y=  0:   80 / 200 /  60 / 220   top-edge organic movement ← NEW
//   A1 y= 94:  180 /  80 / 100 / 200
//   A2 y=188:  240 /  60 / 160 / 150
//   A3 y=282:  180 / 100 / 220 /  80
//   A4 y=376:   80 / 220 / 240 /  60
//   A5 y=470:  160 /  60 / 180 / 160   bottom-edge organic movement ← NEW
//
// Midpoints = avg of adjacent anchor (x, y).
const TA = 'M 0,0 Q 80,0 130,47 Q 180,94 210,141 Q 240,188 210,235 Q 180,282 130,329 Q 80,376 120,423 Q 160,470 0,470 Z'
const TB = 'M 0,0 Q 200,0 140,47 Q 80,94 70,141 Q 60,188 80,235 Q 100,282 160,329 Q 220,376 140,423 Q 60,470 0,470 Z'
const TC = 'M 0,0 Q 60,0 80,47 Q 100,94 130,141 Q 160,188 190,235 Q 220,282 230,329 Q 240,376 210,423 Q 180,470 0,470 Z'
const TD = 'M 0,0 Q 220,0 210,47 Q 200,94 175,141 Q 150,188 115,235 Q 80,282 70,329 Q 60,376 110,423 Q 160,470 0,470 Z'

// Sage (Strategie — right shape) — independent timing, 6 Q commands each
//
// Anchor x at y = [0, 94, 188, 282, 376, 470]   (SA / SB / SC / SD):
//   A0 y=  0:  480 / 380 / 510 / 380   top-edge organic movement ← NEW
//   A1 y= 94:  380 / 490 / 460 / 350
//   A2 y=188:  360 / 520 / 400 / 400
//   A3 y=282:  400 / 480 / 350 / 460
//   A4 y=376:  500 / 370 / 380 / 510
//   A5 y=470:  420 / 500 / 460 / 390   bottom-edge organic movement ← NEW
//
// Sage min x ≥ 350 → gap from terra max 240 = 110 px guaranteed.
const SA = 'M 560,0 Q 480,0 430,47 Q 380,94 370,141 Q 360,188 380,235 Q 400,282 450,329 Q 500,376 460,423 Q 420,470 560,470 Z'
const SB = 'M 560,0 Q 380,0 435,47 Q 490,94 505,141 Q 520,188 500,235 Q 480,282 425,329 Q 370,376 435,423 Q 500,470 560,470 Z'
const SC = 'M 560,0 Q 510,0 485,47 Q 460,94 430,141 Q 400,188 375,235 Q 350,282 365,329 Q 380,376 420,423 Q 460,470 560,470 Z'
const SD = 'M 560,0 Q 380,0 365,47 Q 350,94 375,141 Q 400,188 430,235 Q 460,282 485,329 Q 510,376 450,423 Q 390,470 560,470 Z'

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
