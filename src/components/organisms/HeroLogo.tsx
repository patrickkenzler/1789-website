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

// ─── Gap Graphic ─────────────────────────────────────────────────────────────
/**
 * Two organic blob shapes representing the two halves of the Gap:
 *   Left  (terra)  — Struktur
 *   Right (sage)   — Strategie
 *   Negative space — der Gap
 *
 * viewBox 0 0 560 470 — proportioned to fill the right column.
 * Paths are cubic-bezier blobs; the facing edges are irregular to
 * evoke territories that almost fit but don't.
 */
function GapGraphic() {
  return (
    <svg
      viewBox="0 0 560 470"
      width="100%"
      height="100%"
      aria-label="Der Gap: Struktur (orange) und Strategie (grün) durch eine Lücke getrennt"
      style={{ display: 'block' }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ── Struktur — terra (left blob) ── */}
      <path
        fill="var(--color-terra)"
        d={[
          'M 0,28',
          'C 62,4    178,2   205,10',   // top sweep left → right
          'C 228,16  224,50  212,86',   // right edge — slight outward
          'C 200,122 176,138 174,168',  // right edge — first concave notch
          'C 172,198 212,216 212,252',  // right edge — outward bulge
          'C 212,286 192,302 190,334',  // right edge — second concave
          'C 188,365 210,385 196,416',  // right edge — slight outward at base
          'C 184,436 122,448 0,444',    // bottom sweep right → left
          'Z',
        ].join(' ')}
      />

      {/* ── Strategie — sage (right blob) ── */}
      <path
        fill="var(--color-sage)"
        d={[
          'M 285,6',
          'C 352,-4   468,8   545,26',   // top sweep left → right
          'C 560,70   548,186 544,282',  // right edge — smooth
          'C 540,375  528,448 460,456',  // bottom-right
          'C 400,462  285,440 270,402',  // bottom sweep right → left
          'C 254,360  285,332 283,298',  // left (facing) edge — first notch
          'C 281,264  255,240 258,206',  // left edge — inward concave
          'C 261,172  285,152 278,118',  // left edge — outward
          'C 270,84   252,52  285,6',    // close to top
          'Z',
        ].join(' ')}
      />
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
            LEFT — two headline blocks stacked, top-aligned
        ──────────────────────────────────────────────────────────────── */}
        <div
          style={{
            padding:    'clamp(2rem, 3vw, 3.5rem) var(--grid-margin)',
            paddingBottom: 'clamp(2.5rem, 4vw, 5rem)',
            display:    'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            animation:  a('fadeUp', '900ms', '80ms', 'var(--ease-expressive)'),
          }}
        >
          {/* Block 1 — ink, bold */}
          <p
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    700,
              fontStyle:     'normal',
              fontSize:      'clamp(2.75rem, 5.5vw, 8.75rem)',
              lineHeight:    0.93,
              letterSpacing: '-0.028em',
              color:         'var(--color-ink)',
              marginBottom:  'clamp(0.75rem, 1.2vw, 1.75rem)',
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
              fontSize:      'clamp(2.75rem, 5.5vw, 8.75rem)',
              lineHeight:    0.93,
              letterSpacing: '-0.028em',
              color:         'var(--color-terra)',
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

          {/* Graphic — fills remaining space above body copy */}
          <div
            style={{
              flex:    '1',
              padding: 'clamp(1.5rem, 2vw, 2.5rem) clamp(1.5rem, 3vw, 3rem)',
              display: 'flex',
              alignItems: 'stretch',
              animation: a('fadeUp', '1000ms', '200ms', 'var(--ease-expressive)'),
            }}
          >
            <GapGraphic />
          </div>

          {/* Body copy + CTAs — anchored to bottom */}
          <div
            style={{
              padding:      'clamp(1.5rem, 2vw, 2rem) clamp(1.5rem, 3vw, 3rem)',
              paddingBottom: 'clamp(2rem, 3.5vw, 4rem)',
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
                marginBottom: 'clamp(1.5rem, 2.5vw, 2.5rem)',
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
