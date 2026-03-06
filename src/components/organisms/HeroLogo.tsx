'use client'

import { useEffect, useState } from 'react'

/**
 * HeroLogo
 *
 * Renders the large animated "1789 / Systemshifter" hero block and drives
 * a scroll-linked exit so it fades + drifts upward as the user scrolls —
 * visually "becoming" the small nav wordmark that fades in at the same time.
 *
 * Progress 0 = at the top (hero fully visible)
 * Progress 1 = scrolled 60 % of viewport height (hero fully gone)
 */

const SCROLL_THRESHOLD_VH = 0.6   // fraction of innerHeight over which transition runs

export function HeroLogo() {
  const [p, setP] = useState(0)

  useEffect(() => {
    const update = () => {
      const threshold = window.innerHeight * SCROLL_THRESHOLD_VH
      setP(Math.min(1, Math.max(0, window.scrollY / threshold)))
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        // Scroll-linked exit: fades out and drifts upward toward the nav
        opacity: 1 - p,
        transform: `translateY(${-50 * p}px) scale(${1 - 0.06 * p})`,
        willChange: 'opacity, transform',
      }}
    >
      {/* ── Animated 1789 ── */}
      <h1
        style={{
          fontFamily: 'var(--font-variable), var(--font-display), sans-serif',
          fontSize: 'clamp(4rem, 30vw, 72svh)',
          lineHeight: '0.9',
          color: 'var(--color-ink)',
          userSelect: 'none',
          display: 'flex',
          animation: 'morphGap 21s ease-in-out -7s infinite',
        }}
      >
        <span style={{ flex: 'none', willChange: 'font-variation-settings', animation: 'morph1 19s ease-in-out 0s infinite' }}>1</span>
        <span style={{ flex: 'none', willChange: 'font-variation-settings', animation: 'morph7 19s ease-in-out 0s infinite' }}>7</span>
        <span style={{ flex: 'none', willChange: 'font-variation-settings', animation: 'morph8 14s ease-in-out -3s infinite' }}>8</span>
        <span style={{ flex: 'none', willChange: 'font-variation-settings', animation: 'morph9 26s ease-in-out -10s infinite' }}>9</span>
      </h1>

      {/* ── Static Systemshifter — professional tracked subtitle ── */}
      {/*
        Static: fixed width, no dependency on the animated h1 width.
        paddingLeft compensates for trailing letter-spacing so the word
        is visually centred (standard typographic correction).
      */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1.95rem, 3.6vw, 3rem)',
          fontWeight: 300,
          letterSpacing: '0.12em',
          paddingLeft: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-ink-muted)',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Management Consulting
      </p>
    </div>
  )
}
