'use client'

/**
 * HeroLogo — v2: "Der Gap" editorial hero
 *
 * Layout: centered masthead logo, full-width typographic headline with
 * "der Lücke." as a massive terra centerpiece, 2-col subline at bottom.
 *
 * Animation sequence (CSS only, fill-mode:both):
 *    0ms  Logo          — fadeUp          (800ms)
 *  200ms  Terra hairline— growLine        (500ms)
 *  300ms  H1 line 1     — lineReveal      (900ms, expressive)
 *  450ms  H1 line 2     — lineReveal      (900ms, expressive)
 *  700ms  Bridge text   — fadeUp          (700ms)
 *  850ms  "der Lücke."  — heroLogoReveal  (1000ms, expressive)
 * 1100ms  Completion    — fadeUp          (700ms)
 * 1250ms  Rule          — fadeUp          (600ms)
 * 1400ms  Subline+CTAs  — fadeUp          (700ms)
 */

import { Logo1789 }  from '@/components/atoms/Logo1789'
import { Button }    from '@/components/atoms/Button'

/** Shorthand for CSS animation shorthand with fill-mode:both */
const a = (
  name: string,
  duration: string,
  delay: string,
  easing = 'var(--ease-entry)',
) => `${name} ${duration} ${easing} ${delay} both`

export function HeroLogo() {
  return (
    <div
      style={{
        flex:          '1',
        display:       'flex',
        flexDirection: 'column',
        paddingInline: 'var(--grid-margin)',
        paddingBottom: '4rem',
        maxWidth:      '1440px',
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
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
        <div
          style={{
            width:           '3rem',
            height:          '1px',
            backgroundColor: 'var(--color-terra)',
            animation:       a('growLine', '500ms', '200ms', 'var(--ease-expressive)'),
          }}
        />
      </div>

      {/* ── HEADLINE BLOCK — vertically centred in remaining space ── */}
      <div
        style={{
          flex:          '1',
          display:       'flex',
          flexDirection: 'column',
          justifyContent:'center',
        }}
      >

        {/* S1 Line 1 — "Organisationen scheitern" — left */}
        <div style={{ overflow: 'hidden', paddingBottom: '0.25em', marginBottom: '-0.25em' }}>
          <span
            style={{
              display:       'block',
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(2rem, 4.2vw, 5rem)',
              fontWeight:    300,
              lineHeight:    1.0,
              letterSpacing: '-0.025em',
              color:         'var(--color-ink)',
              animation:     a('lineReveal', '900ms', '300ms', 'var(--ease-expressive)'),
            }}
          >
            Organisationen scheitern
          </span>
        </div>

        {/* S1 Line 2 — "nicht an schlechten Strategien." — offset right on desktop */}
        <div style={{ overflow: 'hidden', paddingBottom: '0.3em', marginBottom: '-0.3em' }} className="hero-indent">
          <span
            style={{
              display:       'block',
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(2rem, 4.2vw, 5rem)',
              fontWeight:    300,
              lineHeight:    1.0,
              letterSpacing: '-0.025em',
              color:         'var(--color-ink)',
              animation:     a('lineReveal', '900ms', '450ms', 'var(--ease-expressive)'),
            }}
          >
            nicht an schlechten Strategien.
          </span>
        </div>

        {/* Bridge — italic, left, smaller */}
        <p
          style={{
            fontFamily:    'var(--font-display)',
            fontStyle:     'italic',
            fontSize:      'clamp(1.1rem, 2vw, 2rem)',
            fontWeight:    300,
            lineHeight:    1.1,
            letterSpacing: '-0.02em',
            color:         'var(--color-ink-muted)',
            marginTop:     'clamp(0.75rem, 1.5vw, 1.5rem)',
            animation:     a('fadeUp', '700ms', '700ms'),
          }}
        >
          Sie scheitern an —
        </p>

        {/* THE GAP — the centrepiece: massive terra italic */}
        <div
          style={{
            display:        'flex',
            justifyContent: 'center',
            /* Negative margin pulls surrounding lines closer, preserving tight rhythm */
            marginBlock:    'clamp(-0.75rem, -1.5vw, -1.5rem)',
            animation:      a('heroLogoReveal', '1000ms', '850ms', 'var(--ease-expressive)'),
          }}
        >
          <span
            style={{
              fontFamily:    'var(--font-display)',
              fontStyle:     'italic',
              fontSize:      'clamp(5.5rem, 13vw, 15rem)',
              fontWeight:    300,
              lineHeight:    0.88,
              letterSpacing: '-0.04em',
              color:         'var(--color-terra)',
              userSelect:    'none',
            }}
          >
            der Lücke.
          </span>
        </div>

        {/* Completion — right, same small size as bridge */}
        <p
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(1.1rem, 2vw, 2rem)',
            fontWeight:    300,
            lineHeight:    1.1,
            letterSpacing: '-0.02em',
            color:         'var(--color-ink-muted)',
            textAlign:     'right',
            marginTop:     'clamp(0.5rem, 1vw, 1rem)',
            animation:     a('fadeUp', '700ms', '1100ms'),
          }}
        >
          zwischen Strategie und Struktur.
        </p>

      </div>

      {/* ── BOTTOM: divider + 2-col subline/CTAs ── */}
      <div style={{ paddingTop: '3rem' }}>

        {/* Full-width border rule */}
        <div
          style={{
            height:          '1px',
            backgroundColor: 'var(--color-border)',
            marginBottom:    '2.5rem',
            animation:       a('fadeUp', '600ms', '1250ms'),
          }}
        />

        {/* 2-col: mono metadata left | body text + CTAs right */}
        <div
          className="stack-cols"
          style={{
            display:             'grid',
            gridTemplateColumns: '14ch 1fr',
            gap:                 '2rem',
            animation:           a('fadeUp', '700ms', '1400ms'),
          }}
        >

          {/* LEFT — mono labels */}
          <div
            style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           '0.5rem',
              paddingTop:    '0.15rem',
            }}
          >
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

          {/* RIGHT — subline + CTAs */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   'var(--text-base)',
                color:      'var(--color-ink-muted)',
                lineHeight: 1.75,
                maxWidth:   '62ch',
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
                marginBottom: '2rem',
              }}
            >
              1789 macht den Gap verhandelbar: durch Organisationsarchitekturen,
              die Strategie und Struktur als das behandeln, was sie sind –
              zwei Seiten derselben Bewegung.
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

    </div>
  )
}
