'use client'

import { useEffect, useState } from 'react'

/**
 * Fraction of viewport height over which the hero↔nav transition runs.
 * Single source of truth — imported by both HeroLogo and Header.
 */
export const SCROLL_THRESHOLD_VH = 0.6

interface ScrollState {
  /** Scroll progress clamped to [0, 1]: 0 = top, 1 = past threshold. */
  progress: number
  /** True once scrollY exceeds `scrolledPx` (default 40px). Used for the frosted nav bg. */
  scrolled: boolean
}

/**
 * Tracks scroll position in a single passive listener.
 * Returns both a normalised [0,1] progress value and a simple boolean flag,
 * so callers don't need to register their own scroll handlers.
 */
export function useScrollProgress(
  thresholdVh = SCROLL_THRESHOLD_VH,
  scrolledPx  = 40,
): ScrollState {
  const [state, setState] = useState<ScrollState>({ progress: 0, scrolled: false })

  useEffect(() => {
    const update = () => {
      const y         = window.scrollY
      const threshold = window.innerHeight * thresholdVh
      setState({
        progress: Math.min(1, Math.max(0, y / threshold)),
        scrolled: y > scrolledPx,
      })
    }

    window.addEventListener('scroll', update, { passive: true })
    update() // sync on mount in case the page loads mid-scroll
    return () => window.removeEventListener('scroll', update)
  }, [thresholdVh, scrolledPx])

  return state
}
