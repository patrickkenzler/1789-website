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
 * Two organic blobs that continuously morph between 3 states via SVG <animate>.
 *
 * Rules:
 *  – Both shapes use the SAME command sequence (M C C C C C C Z) in every
 *    stage so SVG can interpolate smoothly between them.
 *  – The facing edges (terra right / sage left) shift independently but
 *    always maintain a minimum gap of ~50 viewBox units — they never touch.
 *  – Terra and sage run on DIFFERENT clocks (15 s / 11 s, 4 s phase offset)
 *    so they never lock into the same phase twice — LCM = 165 s before repeat.
 *  – Terra swings dramatically: retracted to ~115 px (left strip) up to ~400 px
 *    (covering 71 % of canvas). Sage oscillates between ~510 px (thin) and
 *    ~455 px (moderate), always staying at least 55 px clear of terra's max.
 *
 * Stage 1 — terra: retracted thin strip   | sage: medium presence
 * Stage 2 — terra: dramatic wide lobes    | sage: retreated thin strip
 * Stage 3 — terra: asymmetric bulges      | sage: complex interdigitation
 */

// Terra (Struktur — left shape) — 3 keyframe paths
// Command sequence: M · C(top) · C×8(right contour) · C(bottom) · Z  =  10 C commands
//
// Each of the 8 contour anchor points has its OWN phase so the edge ripples
// rather than scaling uniformly:
//   Odd points  (y≈59,177,294,412): peak in T2, small in T3
//   Even points (y≈118,235,353,470): peak in T3, small in T2
// This makes every point feel independent as the animation cycles.
//
// T1 — all points retracted (108–145 px)
// T2 — odd points BIG (252–262 px), even points small (175–195 px)
// T3 — even points BIG (240–255 px), odd points small (172–195 px)
const T1 = 'M 0,0 C 28,0 82,0 118,0 C 118,25 115,45 112,59 C 118,80 140,100 138,118 C 132,135 105,152 108,177 C 112,198 148,218 145,235 C 140,252 112,270 115,294 C 118,312 145,332 142,353 C 138,372 108,392 112,412 C 115,432 130,452 128,470 C 92,470 32,470 0,470 Z'
const T2 = 'M 0,0 C 55,0 132,0 185,0 C 208,20 272,42 252,59 C 238,76 192,98 195,118 C 202,138 268,158 258,177 C 248,196 178,218 182,235 C 186,252 272,272 262,294 C 252,315 172,335 175,353 C 180,372 258,392 248,412 C 238,432 188,452 192,470 C 145,470 52,470 0,470 Z'
const T3 = 'M 0,0 C 45,0 118,0 168,0 C 172,20 188,42 185,59 C 188,76 252,98 248,118 C 242,138 168,158 172,177 C 176,196 262,218 255,235 C 248,252 188,272 195,294 C 202,312 245,332 240,353 C 234,372 178,392 182,412 C 178,432 162,452 165,470 C 120,470 40,470 0,470 Z'

// Sage (Strategie — right shape) — independent timing, equally dramatic
// Command sequence: M · C(top) · C×8(left contour) · C(bottom) · Z  =  10 C commands
//
// Same staggered-phase principle as terra — each contour point has its own
// expansion rhythm, preventing the edge from breathing as one uniform mass.
//
// S1 — moderate, varied  (412–445 px)
// S2 — most expanded     (338–415 px)  gap vs T2 odd peaks ≈ 65 px ← narrowest
// S3 — retracted, varied (480–492 px)  gap vs T1         ≈ 340 px ← widest
const S1 = 'M 560,0 C 530,0 488,0 445,0 C 435,20 418,38 422,59 C 426,80 440,100 438,118 C 432,138 412,158 415,177 C 418,198 438,218 435,235 C 432,252 415,272 418,294 C 421,314 440,334 438,353 C 436,372 418,392 420,412 C 422,432 440,452 438,470 C 492,470 532,470 560,470 Z'
const S2 = 'M 560,0 C 505,0 458,0 415,0 C 388,20 340,42 352,59 C 364,76 408,98 398,118 C 388,138 335,158 342,177 C 349,196 402,218 392,235 C 382,252 330,272 338,294 C 346,316 392,336 388,353 C 384,370 342,392 348,412 C 354,432 402,452 395,470 C 448,470 510,470 560,470 Z'
const S3 = 'M 560,0 C 545,0 515,0 482,0 C 488,20 498,38 492,59 C 486,80 478,98 480,118 C 476,138 496,158 490,177 C 484,196 478,218 482,235 C 486,252 494,272 490,294 C 486,316 478,338 480,353 C 482,370 492,390 488,412 C 484,432 480,452 484,470 C 515,470 545,470 560,470 Z'

// Looping: append stage 1 at the end so each cycle is seamless.
// Terra: 15 s · Sage: 11 s  →  LCM = 165 s before the phase combination repeats.
// The 4 s begin-offset means they start out of phase and drift continuously —
// the gap breathes wide, narrows to ~65 px, opens again, never the same twice.
const TERRA_VALS  = [T1, T2, T3, T1].join(';')
const SAGE_VALS   = [S1, S2, S3, S1].join(';')
const KEY_TIMES   = '0; 0.33; 0.66; 1'
const KEY_SPLINES = '0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1'  // ease-in-out per segment

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
          dur="15s"
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
          dur="11s"
          begin="4s"
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
