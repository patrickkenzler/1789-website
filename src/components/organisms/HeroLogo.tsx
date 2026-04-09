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
// Every contour anchor point has a UNIQUE trajectory across the 3 stages.
// Points 3 (y≈177) and 6 (y≈353) are LARGEST in T1 and SHRINK during T1→T2,
// while points 1, 4, 7 grow. This means in every transition some points move
// rightward while others move leftward simultaneously → no group behaviour.
//
//   Point x-values  (T1 / T2 / T3):
//   y≈ 59:  191 / 255 / 135   peaks T2
//   y≈118:  135 / 195 / 245   peaks T3
//   y≈177:  258 / 152 / 195   peaks T1  ← contracts during T1→T2
//   y≈235:  145 / 248 / 178   peaks T2
//   y≈294:  112 / 165 / 252   peaks T3
//   y≈353:  240 / 148 / 205   peaks T1  ← contracts during T1→T2
//   y≈412:  155 / 245 / 112   peaks T2
//   y≈470:  112 / 182 / 258   peaks T3
//
// Terra max x ≈ 258; gap to sage min ≈ 340 → guaranteed ~82 px clearance
const T1 = 'M 0,0 C 61,0 112,0 160,0 C 172,20 182,40 191,59 C 170,79 152,99 135,118 C 182,138 221,158 258,177 C 215,197 179,217 145,235 C 132,255 122,275 112,294 C 161,314 202,334 240,353 C 208,373 180,393 155,412 C 139,432 125,452 112,470 C 69,470 34,470 0,470 Z'
const T2 = 'M 0,0 C 82,0 151,0 215,0 C 230,20 243,40 255,59 C 232,79 213,99 195,118 C 179,138 165,158 152,177 C 188,197 219,217 248,235 C 216,255 190,275 165,294 C 159,314 153,334 148,353 C 185,373 216,393 245,412 C 221,432 201,452 182,470 C 113,470 55,470 0,470 Z'
const T3 = 'M 0,0 C 58,0 106,0 152,0 C 146,20 140,40 135,59 C 177,79 212,99 245,118 C 226,138 210,158 195,177 C 189,197 183,217 178,235 C 206,255 230,275 252,294 C 234,314 219,334 205,353 C 170,373 140,393 112,412 C 167,432 214,452 258,470 C 160,470 77,470 0,470 Z'

// Sage (Strategie — right shape) — independent timing, equally dramatic
// Command sequence: M · C(top) · C×8(left contour) · C(bottom) · Z  =  10 C commands
//
// Same independent-trajectory principle — each of the 8 left-edge anchor
// points peaks in a different stage, so S1→S2 has 4 points expanding while
// 4 contract, and S2→S3 is similarly mixed.
//
//   Point x-values  (S1 / S2 / S3):
//   y≈ 59:  380 / 358 / 482   peaks S2 (most expanded)
//   y≈118:  440 / 395 / 480   peaks S2
//   y≈177:  362 / 480 / 420   peaks S1  ← expands during S1, contracts S1→S2
//   y≈235:  462 / 345 / 485   peaks S2
//   y≈294:  485 / 375 / 342   peaks S3  ← most expanded in S3!
//   y≈353:  355 / 478 / 430   peaks S1  ← contracts during S1→S2
//   y≈412:  465 / 340 / 490   peaks S2
//   y≈470:  432 / 465 / 358   peaks S3
//
// Sage min x ≈ 340 (gap to terra max 258 → ~82 px guaranteed clearance)
const S1 = 'M 560,0 C 505,0 458,0 415,0 C 402,20 390,40 380,59 C 403,79 422,99 440,118 C 410,138 385,158 362,177 C 400,197 432,217 462,235 C 471,255 478,275 485,294 C 436,314 394,334 355,353 C 397,373 432,393 465,412 C 452,432 442,452 432,470 C 481,470 522,470 560,470 Z'
const S2 = 'M 560,0 C 492,0 434,0 380,0 C 372,20 365,40 358,59 C 372,79 384,99 395,118 C 427,138 455,158 480,177 C 429,197 385,217 345,235 C 356,255 366,275 375,294 C 414,314 447,334 478,353 C 426,373 381,393 340,412 C 388,432 428,452 465,470 C 501,470 532,470 560,470 Z'
const S3 = 'M 560,0 C 530,0 504,0 480,0 C 480,20 481,40 482,59 C 482,79 481,99 480,118 C 457,138 438,158 420,177 C 445,197 466,217 485,235 C 431,255 385,275 342,294 C 375,314 404,334 430,353 C 453,373 472,393 490,412 C 440,432 398,452 358,470 C 435,470 499,470 560,470 Z'

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
