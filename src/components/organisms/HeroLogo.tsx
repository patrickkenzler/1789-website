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
 * Two organic blobs that continuously morph between 4 states via SVG <animate>.
 *
 * Shape design:
 *  – All paths use the SAME command sequence: M · C×5 · Z (5 cubic segments).
 *    SVG SMIL requires identical commands in every keyframe for smooth morphing.
 *  – Control points are derived via Catmull-Rom → cubic bezier conversion,
 *    guaranteeing C1 continuity (smooth tangent at every anchor) — no kinks.
 *  – Each shape has 4 right/left-edge anchor points at y = [100, 200, 300, 400].
 *    One anchor (y=200) has a small oscillation range (~30 px) so the edge
 *    reads as a slow-breathing wave rather than a uniform pulse.
 *  – Terra and sage run on DIFFERENT clocks (20 s / 13 s, 5 s begin-offset)
 *    so they drift continuously — LCM = 260 s before the phase repeats.
 *  – Terra max x ≈ 240; sage min x ≈ 350 → guaranteed ~110 px gap clearance.
 */

// Terra (Struktur — left shape) — 4 keyframe paths
// Path: M 0,0 → CR-bezier down right edge → 0,470 → Z (left edge implicit)
//
// Anchor x-values (TA / TB / TC / TD):
//   y=100:  80 / 220 / 130 / 230   large swing (150 px)
//   y=200: 215 / 190 / 225 / 180   small swing  (45 px) ← wave anchor
//   y=300: 240 /  70 / 200 /  80   large swing (170 px)
//   y=400: 100 / 210 /  80 / 220   large swing (140 px)
//
// Catmull-Rom formula: CP1 = Pi + (Pi+1 − Pi−1)/6
//                      CP2 = Pi+1 − (Pi+2 − Pi)/6
// (virtual P−1 = start, virtual Pn = end for boundary segments)
const TA = 'M 0,0 C 13,17 44,67 80,100 C 116,133 188,167 215,200 C 242,233 259,267 240,300 C 221,333 140,372 100,400 C 60,428 17,458 0,470 Z'
const TB = 'M 0,0 C 37,17 188,67 220,100 C 252,133 215,167 190,200 C 165,233 67,267 70,300 C 73,333 222,372 210,400 C 198,428 35,458 0,470 Z'
const TC = 'M 0,0 C 22,17 92,67 130,100 C 168,133 213,167 225,200 C 237,233 224,267 200,300 C 176,333 113,372 80,400 C 47,428 13,458 0,470 Z'
const TD = 'M 0,0 C 38,17 200,67 230,100 C 260,133 205,167 180,200 C 155,233 73,267 80,300 C 87,333 233,372 220,400 C 207,428 37,458 0,470 Z'

// Sage (Strategie — right shape) — independent timing, equally organic
// Path: M 560,0 → CR-bezier down left edge → 560,470 → Z (right edge implicit)
//
// Anchor x-values (SA / SB / SC / SD):
//   y=100: 500 / 370 / 470 / 360   large swing (140 px)
//   y=200: 460 / 480 / 455 / 475   small swing  (25 px) ← wave anchor
//   y=300: 350 / 500 / 380 / 510   large swing (160 px)
//   y=400: 490 / 370 / 510 / 360   large swing (150 px)
const SA = 'M 560,0 C 550,17 517,67 500,100 C 483,133 485,167 460,200 C 435,233 345,267 350,300 C 355,333 455,372 490,400 C 525,428 548,458 560,470 Z'
const SB = 'M 560,0 C 528,17 383,67 370,100 C 357,133 458,167 480,200 C 502,233 518,267 500,300 C 482,333 360,372 370,400 C 380,428 528,458 560,470 Z'
const SC = 'M 560,0 C 545,17 488,67 470,100 C 452,133 470,167 455,200 C 440,233 371,267 380,300 C 389,333 480,372 510,400 C 540,428 552,458 560,470 Z'
const SD = 'M 560,0 C 527,17 374,67 360,100 C 346,133 450,167 475,200 C 500,233 529,267 510,300 C 491,333 352,372 360,400 C 368,428 527,458 560,470 Z'

// Looping: append stage A at the end so each cycle is seamless.
// Terra: 20 s · Sage: 13 s  →  LCM = 260 s before the phase repeats.
// The 5 s begin-offset ensures they start drifted and never lock in phase.
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
      <path fill="var(--color-terra)" d={T1}>
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
      <path fill="var(--color-sage)" d={S1}>
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
