'use client'
import { useEffect } from 'react'

/**
 * Zero-render client component that runs after paint and equalizes
 * all [data-pillar-top] wrappers to the same height.
 * Needed because the Modeling card has ~6 lines of body text while
 * AI-Human-Native has 2 — CSS alone cannot align the dividers without
 * either clipping content or a fixed (viewport-specific) pixel value.
 */
export function PillarEqualizeTopSections() {
  useEffect(() => {
    function equalize() {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('[data-pillar-top]')
      )
      if (!sections.length) return

      // Reset so we measure natural heights
      sections.forEach((el) => (el.style.minHeight = ''))

      // Find tallest
      const max = Math.max(...sections.map((el) => el.getBoundingClientRect().height))

      // Apply to all
      sections.forEach((el) => (el.style.minHeight = `${max}px`))
    }

    equalize()

    const ro = new ResizeObserver(equalize)
    const container = document.querySelector('[data-pillar-grid]')
    if (container) ro.observe(container)

    return () => ro.disconnect()
  }, [])

  return null
}
