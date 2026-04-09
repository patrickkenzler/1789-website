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
// Command sequence: M · C(top) · C(R1) · C(R2) · C(R3) · C(R4) · C(bottom) · Z
//
// T1 — retracted: thin strip, right edge ~115px
// T2 — expanded:  dramatic lobes push right edge to ~400px
// T3 — complex:   asymmetric bulges, right edge ~385px
const T1 = 'M 0,0 C 38,0 88,0 115,0 C 122,38 102,85 98,128 C 94,172 108,215 105,262 C 102,308 95,352 100,398 C 100,435 98,458 105,470 C 68,470 30,470 0,470 Z'
const T2 = 'M 0,0 C 70,0 178,0 210,0 C 248,35 412,82 400,118 C 385,155 215,198 205,238 C 195,278 395,322 385,358 C 370,398 210,442 195,470 C 155,470 70,470 0,470 Z'
const T3 = 'M 0,0 C 65,0 168,0 195,0 C 240,40 295,85 282,118 C 268,152 172,195 168,238 C 164,282 385,325 375,358 C 362,398 195,442 180,470 C 142,470 62,470 0,470 Z'

// Sage (Strategie — right shape) — independent timing
// S1 — medium:      left edge ~480px  (gap ≥80px from T1 max)
// S2 — thin/right:  left edge ~510px  (retreats while terra might be expanding)
// S3 — complex:     left edge ~455px  (still ≥55px clear of T2/T3 max ~400)
const S1 = 'M 560,0 C 520,0 502,0 480,0 C 478,38 470,85 472,128 C 474,172 490,215 488,262 C 486,308 468,352 470,398 C 472,435 478,458 478,470 C 505,470 528,470 560,470 Z'
const S2 = 'M 560,0 C 545,0 525,0 510,0 C 514,38 518,85 515,128 C 514,172 505,215 505,262 C 505,308 520,352 518,398 C 516,435 512,458 512,470 C 530,470 548,470 560,470 Z'
const S3 = 'M 560,0 C 522,0 482,0 455,0 C 462,38 455,85 458,128 C 460,172 498,215 496,262 C 494,308 452,352 455,398 C 458,435 468,458 468,470 C 492,470 527,470 560,470 Z'

// Looping: append stage 1 at the end so each cycle is seamless
// Terra: 15 s · Sage: 11 s  →  LCM = 165 s before phase repeat
// begin="4s" on sage offsets the two clocks so they rarely align
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
      preserveAspectRatio="xMidYMid meet"
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
        ──────────────────────────────────────────────────────────────── */}
        <div
          style={{
            display:       'flex',
            flexDirection: 'column',
            borderLeft:    '1px solid rgba(46,43,40,0.08)',
          }}
        >

          {/* Graphic — fills remaining space; minHeight:0 lets it shrink on small screens */}
          <div
            style={{
              flex:      '1 1 0',
              minHeight: 0,
              overflow:  'hidden',
              padding:   'clamp(1rem, 1.5svh, 2.5rem) clamp(1.25rem, 2.5vw, 3rem)',
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
              flexShrink:   0,
              padding:      'clamp(1rem, 1.5svh, 2rem) clamp(1.25rem, 2.5vw, 3rem)',
              paddingBottom: 'clamp(1.25rem, 2.5svh, 3.5rem)',
              borderTop:    '1px solid rgba(46,43,40,0.08)',
              animation:    a('fadeUp', '700ms', '350ms'),
            }}
          >
            <p
              style={{
                fontFamily:   'var(--font-body)',
                fontSize:     'clamp(0.875rem, 1.05vw, 1.05rem)',
                color:        'var(--color-ink)',
                lineHeight:   1.7,
                marginBottom: 'clamp(1rem, 2svh, 2rem)',
                maxWidth:     '44ch',
              }}
            >
              Wir nennen diese Lücke <strong>den Gap</strong><br />
              Er ist kein Defizit, sondern der produktivste Ort Ihrer
              Organisation. <strong>1789 macht den Gap verhandelbar:</strong> durch
              Organisationsarchitekturen, die Strategie und Struktur als das
              behandeln, was sie sind – zwei Seiten derselben Bewegung.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
