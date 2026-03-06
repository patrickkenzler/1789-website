'use client'

import { useScrollProgress } from '@/hooks/useScrollProgress'

/**
 * HeroLogo
 *
 * Full-height hero content block:
 *   Upper area — animated 1789 + Management Consulting (centred)
 *   Lower area — claim "Transformation beginnt / mit der Benennung / des Gaps." (left-aligned)
 *
 * The whole block drives a scroll-linked exit (fades + drifts upward)
 * so it visually "becomes" the small nav wordmark at the same time.
 *
 * Progress 0 = at the top (hero fully visible)
 * Progress 1 = scrolled 60 % of viewport height (hero fully gone)
 */

const claimSize = 'clamp(2.25rem, 5.5vw, 5.5rem)'
const claimBase = {
  fontFamily:    'var(--font-display)',
  fontWeight:    300,
  letterSpacing: '-0.04em',
  lineHeight:    0.88,
  fontSize:      claimSize,
} as const

export function HeroLogo() {
  const { progress: scrollProgress } = useScrollProgress()

  return (
    <div
      style={{
        width:           '100%',
        height:          '100%',
        display:         'flex',
        flexDirection:   'column',
        // Scroll-linked exit: fades out and drifts upward toward the nav
        opacity:         1 - scrollProgress,
        transform:       `translateY(${-50 * scrollProgress}px) scale(${1 - 0.06 * scrollProgress})`,
        willChange:      'opacity, transform',
      }}
    >

      {/* ── Upper area: 1789 + Management Consulting, centred ── */}
      <div
        style={{
          flex:          '1',
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          justifyContent:'center',
          gap:           '1.5rem',
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

        {/* Management Consulting subtitle */}
        <p
          style={{
            fontFamily:    'var(--font-display)',
            fontStyle:     'italic',
            fontSize:      'clamp(1.95rem, 3.6vw, 3rem)',
            fontWeight:    300,
            letterSpacing: '-0.02em',
            color:         'var(--color-terra)',
            userSelect:    'none',
            whiteSpace:    'nowrap',
          }}
        >
          Management Consulting
        </p>
      </div>

      {/* ── Lower area: Claim, left-aligned at container margin ── */}
      <div
        style={{
          paddingInline:  'var(--grid-margin)',
          paddingBottom:  'clamp(2rem, 4vh, 3.5rem)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.06em' }}>
          <span style={{ ...claimBase, color: 'var(--color-ink)' }}>
            Transformation beginnt
          </span>
          <span style={{ ...claimBase, color: 'var(--color-ink)' }}>
            mit der Benennung
          </span>
          <span style={{ ...claimBase, fontStyle: 'italic', color: 'var(--color-terra)' }}>
            des Gaps.
          </span>
        </div>
      </div>

    </div>
  )
}
