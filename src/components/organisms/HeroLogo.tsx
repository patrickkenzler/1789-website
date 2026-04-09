'use client'

/**
 * HeroLogo — v5: Figma editorial split
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
 *  – The outer edges (terra left / sage right) are stable; only the inner
 *    facing edges morph, as shown in the concept sketch.
 *
 * Stage 1 → gentle S-curves, wide gap
 * Stage 2 → terra expands with large lobes, sage responds
 * Stage 3 → narrow peninsulas, complex interdigitation, tighter gap
 */

// Terra (Struktur — left shape) — 3 keyframe paths
// Command sequence: M · C(top) · C(R1) · C(R2) · C(R3) · C(R4) · C(bottom) · Z
const T1 = 'M 0,0 C 70,0 175,0 210,0 C 230,35 238,82 235,118 C 232,155 202,195 195,235 C 188,275 218,315 225,352 C 232,390 210,440 200,470 C 160,470 70,470 0,470 Z'
const T2 = 'M 0,0 C 70,0 180,0 215,0 C 248,30 300,88 285,128 C 272,165 218,205 210,242 C 200,280 268,315 275,358 C 280,398 218,448 208,470 C 165,470 70,470 0,470 Z'
const T3 = 'M 0,0 C 70,0 182,0 218,0 C 238,42 278,98 262,135 C 246,172 232,212 228,248 C 224,285 265,328 270,362 C 275,402 222,448 212,470 C 168,470 70,470 0,470 Z'

// Sage (Strategie — right shape)
// Minimum gap at each stage: S1 ≥70px · S2 ≥57px · S3 ≥54px
const S1 = 'M 560,0 C 488,0 362,0 330,0 C 325,35 308,82 305,118 C 302,155 345,195 348,235 C 355,275 322,315 318,352 C 314,390 328,440 330,470 C 362,470 488,470 560,470 Z'
const S2 = 'M 560,0 C 488,0 370,0 348,0 C 350,30 345,88 342,128 C 340,165 368,205 370,242 C 372,280 345,315 342,358 C 340,398 352,448 350,470 C 372,470 488,470 560,470 Z'
const S3 = 'M 560,0 C 488,0 358,0 325,0 C 328,42 325,95 322,135 C 320,172 285,212 282,248 C 280,285 328,325 325,362 C 322,402 280,448 278,470 C 338,470 488,470 560,470 Z'

// Looping: append stage 1 at the end so the cycle is seamless
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
      {/* ── Struktur — terra (left) ── */}
      <path fill="var(--color-terra)" d={T1}>
        <animate
          attributeName="d"
          dur="10s"
          repeatCount="indefinite"
          values={TERRA_VALS}
          calcMode="spline"
          keyTimes={KEY_TIMES}
          keySplines={KEY_SPLINES}
        />
      </path>

      {/* ── Strategie — sage (right) ── */}
      <path fill="var(--color-sage)" d={S1}>
        <animate
          attributeName="d"
          dur="10s"
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
