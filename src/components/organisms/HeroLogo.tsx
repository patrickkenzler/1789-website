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
 * Smoothness technique — quadratic bezier midpoint chaining:
 *   Each stage defines 5 "anchor" points on the organic edge. The SVG path
 *   places Q-bezier ENDPOINTS at the midpoints between adjacent anchors, and
 *   uses the anchors themselves as Q control points. Because quadratic beziers
 *   are always within the convex hull of (start, control, end), the curve
 *   NEVER overshoots or spikes — it flows smoothly through every anchor
 *   neighbourhood. Adjacent segments automatically share a smooth tangent at
 *   every midpoint endpoint, giving C1 continuity with no kinks.
 *
 *   Path structure (terra):  M 0,0 · Q A0 m01 · Q A1 m12 · Q A2 m23 · Q A3 m34 · Q A4 0,470 · Z
 *   Path structure (sage):   M 560,0 · Q A0 m01 · …same… · Q A4 560,470 · Z
 *
 *  – Terra max control-point x ≤ 240; sage min ≥ 350 → ≥ 110 px gap always.
 *  – Terra: 20 s · Sage: 13 s (5 s offset) → LCM 260 s before phase repeats.
 */

// Terra (Struktur — left shape) — 4 keyframe paths
//
// Anchor x-values at y = [50, 160, 250, 360, 440]  (TA / TB / TC / TD):
//   A0 y=50:   60 / 230 /  80 / 200   rising ↔ falling
//   A1 y=160: 120 / 210 / 200 /  80   varied
//   A2 y=250: 190 / 150 / 240 /  60   bell ↔ valley
//   A3 y=360: 240 /  80 / 180 / 130   large swing
//   A4 y=440: 200 /  60 /  80 / 220   varied
//
// Midpoints (Q endpoints) = avg of adjacent anchor x/y coords.
// Convex-hull guarantee: curve x ≤ max(anchor, midpoint) ≤ 240 for all stages.
const TA = 'M 0,0 Q 60,50 90,105 Q 120,160 155,205 Q 190,250 215,305 Q 240,360 220,400 Q 200,440 0,470 Z'
const TB = 'M 0,0 Q 230,50 220,105 Q 210,160 180,205 Q 150,250 115,305 Q 80,360 70,400 Q 60,440 0,470 Z'
const TC = 'M 0,0 Q 80,50 140,105 Q 200,160 220,205 Q 240,250 210,305 Q 180,360 130,400 Q 80,440 0,470 Z'
const TD = 'M 0,0 Q 200,50 140,105 Q 80,160 70,205 Q 60,250 95,305 Q 130,360 175,400 Q 220,440 0,470 Z'

// Sage (Strategie — right shape) — independent timing
//
// Anchor x-values at y = [50, 160, 250, 360, 440]  (SA / SB / SC / SD):
//   A0 y=50:  490 / 370 / 480 / 360   large swing
//   A1 y=160: 360 / 450 / 380 / 490   large swing
//   A2 y=250: 380 / 510 / 350 / 500   large swing
//   A3 y=360: 470 / 380 / 440 / 360   varied
//   A4 y=440: 520 / 360 / 500 / 380   varied
//
// Sage min control-point x ≥ 350 (SC A2) → gap from terra max 240 = 110 px.
const SA = 'M 560,0 Q 490,50 425,105 Q 360,160 370,205 Q 380,250 425,305 Q 470,360 495,400 Q 520,440 560,470 Z'
const SB = 'M 560,0 Q 370,50 410,105 Q 450,160 480,205 Q 510,250 445,305 Q 380,360 370,400 Q 360,440 560,470 Z'
const SC = 'M 560,0 Q 480,50 430,105 Q 380,160 365,205 Q 350,250 395,305 Q 440,360 470,400 Q 500,440 560,470 Z'
const SD = 'M 560,0 Q 360,50 425,105 Q 490,160 495,205 Q 500,250 430,305 Q 360,360 370,400 Q 380,440 560,470 Z'

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
