'use client'

/**
 * HeroLogo — v3: "Der Beweis" stat hero
 *
 * Layout: centered masthead logo → terra hairline → eyebrow label →
 * massive "73%" stat anchor → supporting context copy → centered CTAs →
 * full-width rule → 2-col metadata grid.
 *
 * The "73%" refers to the widely-cited McKinsey finding that ~70% of
 * organisational change initiatives fail. Replace the number in one place
 * when you confirm the exact figure.
 *
 * Animation sequence (CSS only, fill-mode:both):
 *    0ms  Logo           — fadeUp         (800ms)
 *  200ms  Terra hairline — growLine       (500ms)
 *  200ms  Eyebrow label  — fadeUp         (600ms)
 *  400ms  "73%"          — heroLogoReveal (1000ms, expressive)
 *  700ms  Context line 1 — fadeUp         (700ms)
 *  900ms  Context line 2 — fadeUp         (700ms)
 * 1100ms  CTAs           — fadeUp         (700ms)
 * 1300ms  Rule           — fadeUp         (500ms)
 * 1450ms  Metadata grid  — fadeUp         (700ms)
 */

import { Logo1789 } from '@/components/atoms/Logo1789'
import { Button }   from '@/components/atoms/Button'

/** Shorthand for CSS animation shorthand with fill-mode:both */
const a = (
  name:     string,
  duration: string,
  delay:    string,
  easing  = 'var(--ease-entry)',
) => `${name} ${duration} ${easing} ${delay} both`

// ─── The stat — change here to update everywhere ──────────────────────────────
const STAT = '73%'
const STAT_LABEL_TOP    = 'aller Transformationen scheitern'
const STAT_LABEL_BOTTOM = 'an der Lücke zwischen Strategie und Struktur.'

export function HeroLogo() {
  return (
    <div
      style={{
        flex:          '1',
        display:       'flex',
        flexDirection: 'column',
        paddingInline: 'var(--grid-margin)',
        paddingBottom: '4rem',
        maxWidth:      '1920px',
        margin:        '0 auto',
        width:         '100%',
      }}
    >

      {/* ── MASTHEAD — logo centred like a magazine nameplate ── */}
      <div
        style={{
          display:        'flex',
          justifyContent: 'center',
          paddingBottom:  '2rem',
          animation:      a('fadeUp', '800ms', '0ms'),
        }}
      >
        <Logo1789 height={54} showSub={true} />
      </div>

      {/* Terra hairline — centred, short */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
        <div
          style={{
            width:           '3rem',
            height:          '1px',
            backgroundColor: 'var(--color-terra)',
            animation:       a('growLine', '500ms', '200ms', 'var(--ease-expressive)'),
          }}
        />
      </div>

      {/* ── STAT BLOCK — vertically centred in remaining space ── */}
      <div
        style={{
          flex:           '1',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          alignItems:     'center',
          textAlign:      'center',
        }}
      >

        {/* Eyebrow — "Der Beweis" */}
        <p
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-xxs)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'var(--color-terra)',
            marginBottom:  'clamp(0.5rem, 1.2vw, 1.25rem)',
            animation:     a('fadeUp', '600ms', '200ms'),
          }}
        >
          Der Beweis
        </p>

        {/* THE STAT — massive italic terra number */}
        <div
          style={{ animation: a('heroLogoReveal', '1000ms', '400ms', 'var(--ease-expressive)') }}
        >
          <span
            style={{
              fontFamily:    'var(--font-display)',
              fontStyle:     'italic',
              fontSize:      'clamp(7rem, 20vw, 28rem)',
              fontWeight:    300,
              lineHeight:    0.85,
              letterSpacing: '-0.04em',
              color:         'var(--color-terra)',
              userSelect:    'none',
              display:       'block',
            }}
          >
            {STAT}
          </span>
        </div>

        {/* Context — line 1 (dark, italic) */}
        <p
          style={{
            fontFamily:    'var(--font-display)',
            fontStyle:     'italic',
            fontSize:      'clamp(1.1rem, 2.2vw, 3rem)',
            fontWeight:    300,
            lineHeight:    1.25,
            letterSpacing: '-0.02em',
            color:         'var(--color-ink)',
            marginTop:     'clamp(0.75rem, 1.5vw, 1.75rem)',
            animation:     a('fadeUp', '700ms', '700ms'),
          }}
        >
          {STAT_LABEL_TOP}
        </p>

        {/* Context — line 2 (muted) */}
        <p
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(1.1rem, 2.2vw, 3rem)',
            fontWeight:    300,
            lineHeight:    1.25,
            letterSpacing: '-0.02em',
            color:         'var(--color-ink-muted)',
            animation:     a('fadeUp', '700ms', '900ms'),
          }}
        >
          {STAT_LABEL_BOTTOM}
        </p>

        {/* CTAs — centred */}
        <div
          style={{
            display:        'flex',
            gap:            '1rem',
            flexWrap:       'wrap',
            justifyContent: 'center',
            marginTop:      'clamp(2rem, 3vw, 3.5rem)',
            animation:      a('fadeUp', '700ms', '1100ms'),
          }}
        >
          <a href="/kontakt">
            <Button variant="terra">Erstgespräch vereinbaren</Button>
          </a>
          <a href="/ansatz">
            <Button variant="ghost">Unser Ansatz →</Button>
          </a>
        </div>

      </div>

      {/* ── BOTTOM: divider + 2-col metadata ── */}
      <div style={{ paddingTop: '3rem' }}>

        {/* Full-width rule */}
        <div
          style={{
            height:          '1px',
            backgroundColor: 'var(--color-border)',
            marginBottom:    '2.5rem',
            animation:       a('fadeUp', '500ms', '1300ms'),
          }}
        />

        {/* 2-col: mono labels left | body text right */}
        <div
          className="stack-cols"
          style={{
            display:             'grid',
            gridTemplateColumns: '14ch 1fr',
            gap:                 '2rem',
            animation:           a('fadeUp', '700ms', '1450ms'),
          }}
        >

          {/* LEFT — mono labels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.15rem' }}>
            <span
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      'var(--text-xxs)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color:         'var(--color-terra)',
              }}
            >
              Der Gap
            </span>
            <span
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      'var(--text-xxs)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color:         'var(--color-ink-subtle)',
              }}
            >
              1789 Innovation
            </span>
          </div>

          {/* RIGHT — subline copy */}
          <div>
            <p
              style={{
                fontFamily:   'var(--font-body)',
                fontSize:     'var(--text-base)',
                color:        'var(--color-ink-muted)',
                lineHeight:   1.75,
                maxWidth:     '62ch',
                marginBottom: '0.6rem',
              }}
            >
              Wir nennen diese Lücke den Gap – und er ist kein Defizit,
              sondern der produktivste Ort Ihrer Organisation.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   'var(--text-base)',
                color:      'var(--color-ink-muted)',
                lineHeight: 1.75,
                maxWidth:   '62ch',
              }}
            >
              1789 macht den Gap verhandelbar: durch Organisationsarchitekturen,
              die Strategie und Struktur als das behandeln, was sie sind –
              zwei Seiten derselben Bewegung.
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}
