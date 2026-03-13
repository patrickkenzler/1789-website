'use client'

import { useScrollProgress } from '@/hooks/useScrollProgress'

/**
 * HeroLogo
 *
 * Full-height hero content block (Figma node 29:6):
 *   Top-left  — "Management Consulting" italic terra
 *   Centre    — animated 1789 (fills available height)
 *   Bottom    — headline 2-line + tagline italic terra:
 *               "Wenn Strategien ins Leere laufen,"
 *               "liegt der Grund im System."
 *               "Wir machen ihn sichtbar." (italic terra)
 *
 * Progress 0 = at the top (hero fully visible)
 * Progress 1 = scrolled 60 % of viewport height (hero fully gone)
 */

const claimSize = 'clamp(2rem, 4.5vw, 5rem)'
const claimBase: React.CSSProperties = {
  fontFamily:    'var(--font-display)',
  fontWeight:    300,
  letterSpacing: '-0.03em',
  lineHeight:    0.95,
  fontSize:      claimSize,
}

export function HeroLogo() {
  const { progress: scrollProgress } = useScrollProgress()

  return (
    <div
      style={{
        width:         '100%',
        height:        '100%',
        display:       'flex',
        flexDirection: 'column',
        opacity:       1 - scrollProgress,
        transform:     `translateY(${-50 * scrollProgress}px) scale(${1 - 0.06 * scrollProgress})`,
        willChange:    'opacity, transform',
      }}
    >

      {/* ── Upper area: Management Consulting top-left + 1789 centred ── */}
      <div
        style={{
          flex:          '1',
          display:       'flex',
          flexDirection: 'column',
        }}
      >
        {/* Management Consulting — top left */}
        <p
          style={{
            fontFamily:    'var(--font-display)',
            fontStyle:     'italic',
            fontSize:      'clamp(1.5rem, 3.5vw, 3.5rem)',
            fontWeight:    300,
            letterSpacing: '-0.02em',
            color:         'var(--color-terra)',
            userSelect:    'none',
            paddingInline: 'var(--grid-margin)',
            paddingTop:    'clamp(1rem, 2vh, 2rem)',
            lineHeight:    1,
          }}
        >
          Management Consulting
        </p>

        {/* 1789 — centred in remaining space */}
        <div
          style={{
            flex:           '1',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-variable), var(--font-display), sans-serif',
              fontSize:   'clamp(4rem, 28vw, 68svh)',
              lineHeight: '0.9',
              color:      'var(--color-ink)',
              userSelect: 'none',
              display:    'flex',
              animation:  'morphGap 21s ease-in-out -7s infinite',
            }}
          >
            <span style={{ flex: 'none', willChange: 'font-variation-settings', animation: 'morph1 19s ease-in-out 0s infinite' }}>1</span>
            <span style={{ flex: 'none', willChange: 'font-variation-settings', animation: 'morph7 19s ease-in-out 0s infinite' }}>7</span>
            <span style={{ flex: 'none', willChange: 'font-variation-settings', animation: 'morph8 14s ease-in-out -3s infinite' }}>8</span>
            <span style={{ flex: 'none', willChange: 'font-variation-settings', animation: 'morph9 26s ease-in-out -10s infinite' }}>9</span>
          </h1>
        </div>
      </div>

      {/* ── Lower area: Headline + tagline ── */}
      <div
        style={{
          paddingInline: 'var(--grid-margin)',
          paddingBottom: 'clamp(2rem, 4vh, 3.5rem)',
        }}
      >
        {/* Line 1 */}
        <div>
          <span style={{ ...claimBase, color: 'var(--color-ink)' }}>
            Wenn Strategien ins Leere laufen,
          </span>
        </div>
        {/* Line 2 */}
        <div style={{ marginTop: '0.06em' }}>
          <span style={{ ...claimBase, color: 'var(--color-ink)' }}>
            liegt der Grund im System.
          </span>
        </div>
        {/* Tagline — italic terra */}
        <div style={{ marginTop: '0.35em' }}>
          <span style={{ ...claimBase, fontStyle: 'italic', color: 'var(--color-terra)' }}>
            Wir machen ihn sichtbar.
          </span>
        </div>
      </div>

    </div>
  )
}
