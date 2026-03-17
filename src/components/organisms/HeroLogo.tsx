'use client'

import { Button } from '@/components/atoms/Button'

/**
 * HeroLogo — editorial split hero with orchestrated entrance animation.
 *
 * Animation sequence (all CSS, no runtime deps):
 *   100ms  H1 line 1  — lineReveal wipe-up  (900ms, ease-expressive)
 *   260ms  H1 line 2  — lineReveal wipe-up  (900ms, ease-expressive)
 *   500ms  Sub-claim  — fadeUp              (800ms, ease-entry)
 *   700ms  Divider    — growLine            (600ms, ease-expressive)
 *   860ms  Body §1    — fadeUp              (700ms, ease-entry)
 *   980ms  Body §2    — fadeUp              (700ms, ease-entry)
 *  1100ms  Body §3    — fadeUp              (700ms, ease-entry)
 *  1260ms  CTAs       — fadeUp              (700ms, ease-entry)
 *
 *   200ms  Logo       — heroLogoReveal      (1400ms, ease-expressive)
 *  1600ms  Logo       — floatLogo loop      (7s, ease-in-out, infinite)
 */

/** Shorthand for animation shorthand strings with fill-mode:both */
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
        flex:                '1',
        display:             'grid',
        gridTemplateColumns: 'minmax(0, 7fr) minmax(0, 5fr)',
        gap:                 'clamp(3rem, 6vw, 8rem)',
        paddingInline:       'var(--grid-margin)',
        paddingBlock:        'clamp(3rem, 6vh, 5rem)',
        alignItems:          'center',
      }}
    >

      {/* ── LEFT: Content hierarchy ── */}
      <div>

        {/* H1 — Level 1 claim: line-by-line editorial wipe-up */}
        <h1
          style={{
            fontFamily:    'var(--font-display)',
            fontWeight:    300,
            fontSize:      'clamp(2.25rem, 5vw, 4.75rem)',
            lineHeight:    0.93,
            letterSpacing: '-0.03em',
            color:         'var(--color-ink)',
          }}
        >
          {/* Each line: outer = clip mask, inner = animated element */}
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
            <span
              style={{
                display:   'block',
                animation: a('lineReveal', '900ms', '100ms', 'var(--ease-expressive)'),
              }}
            >
              Organisationen, die sich
            </span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
            <span
              style={{
                display:   'block',
                animation: a('lineReveal', '900ms', '260ms', 'var(--ease-expressive)'),
              }}
            >
              selbst verstehen,{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-terra)' }}>
                gewinnen.
              </em>
            </span>
          </span>
        </h1>

        {/* Sub-claim — italic, follows H1 */}
        <p
          style={{
            marginTop:     '1.5rem',
            fontFamily:    'var(--font-display)',
            fontStyle:     'italic',
            fontSize:      'clamp(1.1rem, 2vw, 1.75rem)',
            lineHeight:    1.2,
            letterSpacing: '-0.02em',
            color:         'var(--color-ink-muted)',
            animation:     a('fadeUp', '800ms', '500ms'),
          }}
        >
          Wir schaffen diese Klarheit — mit Ihnen, nicht für Sie.
        </p>

        {/* Terra divider — grows left → right */}
        <div
          style={{
            height:          '1px',
            backgroundColor: 'var(--color-terra)',
            marginBlock:     '2rem',
            animation:       a('growLine', '600ms', '700ms', 'var(--ease-expressive)'),
          }}
        />

        {/* Level 2 — Explanatory body */}
        <div
          style={{
            fontFamily:    'var(--font-body)',
            fontSize:      'var(--text-base)',
            lineHeight:    1.75,
            color:         'var(--color-ink-muted)',
            maxWidth:      '46ch',
            display:       'flex',
            flexDirection: 'column',
            gap:           '1em',
          }}
        >
          <p style={{ animation: a('fadeUp', '700ms', '860ms') }}>
            <strong style={{ color: 'var(--color-ink)', fontWeight: 500 }}>
              Ihre Strategie ist gut. Ihre Struktur hält sie auf.
            </strong>{' '}
            Ihre Kultur entscheidet, welche der beiden gewinnt.
          </p>
          <p style={{ animation: a('fadeUp', '700ms', '980ms') }}>
            Wir arbeiten dort, wo die meisten Berater nicht hinschauen —
            an den Wechselwirkungen zwischen Strategie, Struktur und Kultur.
            Denn Wertschöpfung entsteht nicht in einer Folie.
            Sie entsteht in der täglichen Realität Ihrer Organisation.
          </p>
          <p style={{ animation: a('fadeUp', '700ms', '1100ms') }}>
            Wir machen diese Realität{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-ink)' }}>lesbar</em>.
            {' '}Und{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-ink)' }}>veränderbar</em>.
            {' '}In Schritten, die Sie selbst gehen — mit Klarheit darüber, wohin.
          </p>
        </div>

        {/* CTAs — last to appear */}
        <div
          style={{
            display:   'flex',
            gap:       '1rem',
            marginTop: '2.5rem',
            flexWrap:  'wrap',
            animation: a('fadeUp', '700ms', '1260ms'),
          }}
        >
          <a href="/kontakt">
            <Button variant="primary">Erstgespräch vereinbaren</Button>
          </a>
          <a href="/ansatz">
            <Button variant="ghost">Unser Ansatz →</Button>
          </a>
        </div>

      </div>

      {/* ── RIGHT: Brand mark — reveals, then floats ── */}
      <div
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-1789-innovation.svg"
          alt="1789 Innovation"
          style={{
            width:      '100%',
            maxWidth:   '520px',
            height:     'auto',
            userSelect: 'none',
            /*
             * Two-phase animation:
             * 1. heroLogoReveal — lands in from slightly below + scaled down
             * 2. floatLogo      — starts after reveal finishes (200ms + 1400ms = 1600ms delay)
             *    and loops forever with a gentle vertical drift
             */
            animation: [
              a('heroLogoReveal', '1400ms', '200ms', 'var(--ease-expressive)'),
              'floatLogo 7s ease-in-out 1600ms infinite',
            ].join(', '),
          }}
        />
      </div>

    </div>
  )
}
