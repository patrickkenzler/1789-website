'use client'
import { useRef, useEffect, type ReactNode, type CSSProperties } from 'react'

/**
 * StickyScrollSection — sticky frame + sibling spacer
 *
 * Architecture:
 *   1. Sticky frame   — position:sticky, height = viewport − nav (same as every
 *                       other scroll-card). Content inside translates upward as
 *                       the page scrolls so all content is reachable.
 *   2. Sibling spacer — plain div right after the sticky frame.
 *                       height = overflow + 6vh dwell.
 *                       Its viewport position drives the translateY calculation,
 *                       avoiding any unreliable scrollHeight-based outer-div math.
 *
 * Timing (verified):
 *   • Content starts scrolling the moment the sticky frame locks (scroll = 0 past sticky).
 *   • Content finishes scrolling when the spacer top hits viewport bottom.
 *   • 6vh later the next scroll-card enters from below — the "sticky moment".
 *   • When content fits the viewport (no overflow) the spacer = 6vh, giving the
 *     same dwell the original scroll-cards had via margin-bottom: 6vh.
 */
export function StickyScrollSection({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) {
  const spacerRef  = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const spacer  = spacerRef.current
    const content = contentRef.current
    if (!spacer || !content) return

    const rootFs = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const NAV    = rootFs * 5                    // 5rem nav height in px

    const stickyH  = () => window.innerHeight - NAV
    const overflow = () => Math.max(0, content!.scrollHeight - stickyH())
    const dwell    = () => window.innerHeight * 0.06  // 6vh pause after content done

    function setSpacerHeight() {
      spacer!.style.height = `${overflow() + dwell()}px`
    }

    function onScroll() {
      // spacerTop = viewportH exactly when sticky starts locking.
      // As user scrolls further, spacerTop drops below viewportH.
      // scrolledPast tracks how far past that moment we are.
      const spacerTop    = spacer!.getBoundingClientRect().top
      const scrolledPast = Math.max(0, window.innerHeight - spacerTop)
      const ov           = overflow()
      content!.style.transform =
        ov > 0 ? `translateY(${-Math.min(scrolledPast, ov)}px)` : ''
    }

    const onResize = () => { setSpacerHeight(); onScroll() }

    setSpacerHeight()
    onScroll()

    window.addEventListener('scroll', onScroll,  { passive: true })
    window.addEventListener('resize', onResize,  { passive: true })
    const ro = new ResizeObserver(onResize)
    ro.observe(content)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
    }
  }, [])

  return (
    <>
      {/* Sticky frame — visually identical to every other scroll-card */}
      <div
        className="scroll-card"
        style={{
          top:          '5rem',
          height:       'calc(100svh - 5rem)',
          marginBottom: 0,       // spacer controls all spacing below
          overflow:     'hidden',
          ...style,
        }}
      >
        <div ref={contentRef} style={{ willChange: 'transform' }}>
          {children}
        </div>
      </div>

      {/* Spacer — same background as section, creates scroll room for overflow + dwell.
          Height is set by JS above. Section 3 starts right after this div. */}
      <div
        ref={spacerRef}
        style={{ backgroundColor: style?.backgroundColor ?? 'var(--color-background)' }}
      />
    </>
  )
}
