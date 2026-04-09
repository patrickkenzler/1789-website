'use client'

/**
 * HeroLogo — v4: Dripos-inspired editorial split
 *
 * Layout:
 *   LEFT  (7fr) — massive headline, bottom-aligned, fills the column
 *   RIGHT (5fr) — supporting body copy + CTAs, bottom-aligned
 *
 * Design references (Dripos):
 *  – Full-height section; content bottom-anchored so the headline
 *    appears to rise from the bottom of the viewport.
 *  – Subtle 12-column grid lines as editorial texture.
 *  – Clean vertical separator between left and right.
 *  – No centred masthead — logo lives in the header only.
 *
 * Animations:
 *  – Headline:  fadeUp 900ms, 100ms delay
 *  – Right col: fadeUp 700ms, 350ms delay (slightly after headline)
 */

import { Button } from '@/components/atoms/Button'

/** Shorthand for CSS animation shorthand with fill-mode:both */
const a = (
  name:     string,
  duration: string,
  delay:    string,
  easing  = 'var(--ease-entry)',
) => `${name} ${duration} ${easing} ${delay} both`

export function HeroLogo() {
  return (
    <div
      style={{
        flex:     '1',
        display:  'flex',
        flexDirection: 'column',
        position: 'relative',
        // Subtle 12-column editorial grid lines
        backgroundImage: 'linear-gradient(90deg, rgba(46,43,40,0.05) 1px, transparent 1px)',
        backgroundSize:  'calc(100% / 12) 100%',
        backgroundPosition: 'calc(var(--grid-margin) * -1) 0',
      }}
    >

      {/* ── Eyebrow — top-left label ── */}
      <div
        style={{
          paddingInline: 'var(--grid-margin)',
          paddingTop:    'clamp(1.5rem, 2.5vw, 2.5rem)',
          animation:     a('fadeUp', '600ms', '0ms'),
        }}
      >
        <span
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-xxs)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'var(--color-terra)',
            border:        '1px solid var(--color-terra)',
            borderRadius:  'var(--radius-full)',
            padding:       '0.3rem 0.9rem',
            display:       'inline-block',
          }}
        >
          Organisationsarchitektur
        </span>
      </div>

      {/* ── MAIN SPLIT — headline left / body right ── */}
      <div
        className="hero-split"
        style={{
          flex:                '1',
          display:             'grid',
          gridTemplateColumns: '7fr 5fr',
          alignItems:          'flex-end',
        }}
      >

        {/* LEFT — massive headline, bottom-aligned */}
        <div
          style={{
            padding:       'clamp(2rem, 3vw, 4rem) var(--grid-margin)',
            paddingBottom: 'clamp(2.5rem, 4vw, 5rem)',
            animation:     a('fadeUp', '900ms', '100ms', 'var(--ease-expressive)'),
          }}
        >
          <h1
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    400,
              fontSize:      'clamp(3.25rem, 6.5vw, 10.5rem)',
              lineHeight:    0.92,
              letterSpacing: '-0.025em',
              color:         'var(--color-ink)',
            }}
          >
            Organisationen<br />
            scheitern nicht<br />
            an schlechten<br />
            Strategien.
          </h1>
        </div>

        {/* RIGHT — body text + CTAs, bottom-aligned */}
        <div
          style={{
            padding:       'clamp(2rem, 3vw, 4rem) var(--grid-margin)',
            paddingBottom: 'clamp(2.5rem, 4vw, 5rem)',
            borderLeft:    '1px solid rgba(46,43,40,0.1)',
            animation:     a('fadeUp', '700ms', '350ms'),
          }}
        >
          <p
            style={{
              fontFamily:   'var(--font-body)',
              fontSize:     'var(--text-base)',
              color:        'var(--color-ink-muted)',
              lineHeight:   1.75,
              maxWidth:     '42ch',
              marginBottom: '2.5rem',
            }}
          >
            Wir nennen diese Lücke den Gap — und er ist kein Defizit,
            sondern der produktivste Ort Ihrer Organisation. 1789 macht
            den Gap verhandelbar: durch Organisationsarchitekturen, die
            Strategie und Struktur als zwei Seiten derselben Bewegung behandeln.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/kontakt">
              <Button variant="terra">Erstgespräch vereinbaren</Button>
            </a>
            <a href="/ansatz">
              <Button variant="ghost">Unser Ansatz →</Button>
            </a>
          </div>
        </div>

      </div>

    </div>
  )
}
