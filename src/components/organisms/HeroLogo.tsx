'use client'

import { Button } from '@/components/atoms/Button'

/**
 * HeroLogo — editorial split hero
 *
 * Left  (content): Label · H1 claim · italic sub-claim · body · CTA
 * Right (visual):  1789 Consulting brand mark (SVG)
 */
export function HeroLogo() {
  return (
    <div
      style={{
        flex:          1,
        display:       'grid',
        gridTemplateColumns: 'minmax(0, 7fr) minmax(0, 5fr)',
        gap:           'clamp(3rem, 6vw, 8rem)',
        paddingInline: 'var(--grid-margin)',
        paddingBlock:  'clamp(3rem, 6vh, 5rem)',
        alignItems:    'center',
      }}
    >

      {/* ── LEFT: Content hierarchy ── */}
      <div>

        {/* Label */}
        <p
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-xxs)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color:         'var(--color-terra)',
            marginBottom:  '2.5rem',
          }}
        >
          Management Consulting
        </p>

        {/* H1 — Level 1 claim */}
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
          Organisationen, die sich<br />
          selbst verstehen,{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--color-terra)' }}>
            gewinnen.
          </em>
        </h1>

        {/* Sub-claim — still Level 1 */}
        <p
          style={{
            marginTop:     '1.5rem',
            fontFamily:    'var(--font-display)',
            fontStyle:     'italic',
            fontSize:      'clamp(1.1rem, 2vw, 1.75rem)',
            lineHeight:    1.2,
            letterSpacing: '-0.02em',
            color:         'var(--color-ink-muted)',
          }}
        >
          Wir schaffen diese Klarheit — mit Ihnen, nicht für Sie.
        </p>

        {/* Divider */}
        <div
          style={{
            width:           '3rem',
            height:          '1px',
            backgroundColor: 'var(--color-terra)',
            marginBlock:     '2rem',
          }}
        />

        {/* Level 2 — Explanatory text */}
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'var(--text-base)',
            lineHeight: 1.75,
            color:      'var(--color-ink-muted)',
            maxWidth:   '46ch',
            display:    'flex',
            flexDirection: 'column',
            gap:        '1em',
          }}
        >
          <p>
            <strong style={{ color: 'var(--color-ink)', fontWeight: 500 }}>
              Ihre Strategie ist gut. Ihre Struktur hält sie auf.
            </strong>{' '}
            Ihre Kultur entscheidet, welche der beiden gewinnt.
          </p>
          <p>
            Wir arbeiten dort, wo die meisten Berater nicht hinschauen —
            an den Wechselwirkungen zwischen Strategie, Struktur und Kultur.
            Denn Wertschöpfung entsteht nicht in einer Folie.
            Sie entsteht in der täglichen Realität Ihrer Organisation.
          </p>
          <p>
            Wir machen diese Realität{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-ink)' }}>lesbar</em>.
            {' '}Und{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-ink)' }}>veränderbar</em>.
            {' '}In Schritten, die Sie selbst gehen — mit Klarheit darüber, wohin.
          </p>
        </div>

        {/* CTAs */}
        <div
          style={{
            display:    'flex',
            gap:        '1rem',
            marginTop:  '2.5rem',
            flexWrap:   'wrap',
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

      {/* ── RIGHT: Level 3 — Brand mark ── */}
      <div
        style={{
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-1789.svg"
          alt="1789 Consulting"
          style={{
            width:     '100%',
            maxWidth:  '520px',
            height:    'auto',
            userSelect: 'none',
          }}
        />
      </div>

    </div>
  )
}
