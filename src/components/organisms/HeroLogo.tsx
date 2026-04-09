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
// T1 — retracted:   thin strip,   right edge ≈ 150 px
// T2 — expanded:    two lobes,    right edge ≈ 270 px
// T3 — asymmetric:  medium,       right edge ≈ 245 px
// Terra swing: 150 → 270 px  =  ~120 px range
const T1 = 'M 0,0 C 45,0 105,0 150,0 C 155,40 142,88 138,130 C 134,172 148,215 144,262 C 140,308 136,352 140,400 C 142,438 148,458 150,470 C 100,470 42,470 0,470 Z'
const T2 = 'M 0,0 C 58,0 142,0 178,0 C 212,35 278,80 265,118 C 250,155 192,198 188,238 C 184,278 265,318 258,355 C 248,395 192,442 182,470 C 140,470 55,470 0,470 Z'
const T3 = 'M 0,0 C 55,0 132,0 168,0 C 195,38 255,88 245,128 C 235,168 188,205 185,245 C 182,285 248,328 240,365 C 230,402 188,445 178,470 C 136,470 52,470 0,470 Z'

// Sage (Strategie — right shape) — independent timing, equally dramatic
//
// S1 — moderate:    left edge ≈ 416 px  →  covers 26 % of canvas from the right
// S2 — advanced:    left edge ≈ 335 px  →  covers 40 % of canvas from the right  ← KEY
// S3 — retracted:   left edge ≈ 480 px  →  thin strip on the right
// Sage swing: 335 → 480 px  =  ~145 px range  (sage is slightly MORE dynamic than terra)
//
// Guaranteed minimum gap (T2 max ≈ 270 + S2 min ≈ 335): ~65 px — shapes never touch.
// Gap range: ~65 px (both inward, maximum tension) → ~330 px (both retracted, open air).
const S1 = 'M 560,0 C 515,0 470,0 420,0 C 418,40 426,88 428,130 C 430,172 420,215 418,262 C 416,308 428,352 426,400 C 428,438 424,458 422,470 C 472,470 518,470 560,470 Z'
const S2 = 'M 560,0 C 516,0 468,0 405,0 C 390,40 352,88 340,128 C 330,168 346,212 344,252 C 342,292 340,330 338,368 C 336,405 348,445 342,470 C 402,470 515,470 560,470 Z'
const S3 = 'M 560,0 C 538,0 512,0 480,0 C 482,40 490,88 488,130 C 486,172 492,215 490,262 C 488,308 482,352 484,400 C 486,438 490,458 488,470 C 514,470 540,470 560,470 Z'

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
            Horizontal padding lives on the outer wrapper so both the
            graphic and the text share an identical content width.
        ──────────────────────────────────────────────────────────────── */}
        <div
          style={{
            display:       'flex',
            flexDirection: 'column',
            paddingInline: 'clamp(1.25rem, 2.5vw, 3rem)',
          }}
        >

          {/* Graphic — fills remaining space; minHeight:0 lets it shrink on small screens */}
          <div
            style={{
              flex:      '1 1 0',
              minHeight: 0,
              overflow:  'hidden',
              paddingBlock: 'clamp(1rem, 1.5svh, 2.5rem)',
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
              flexShrink:    0,
              paddingTop:    'clamp(1rem, 1.5svh, 2rem)',
              paddingBottom: 'clamp(1.25rem, 2.5svh, 3.5rem)',
              animation:     a('fadeUp', '700ms', '350ms'),
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
