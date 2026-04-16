'use client'
import { useRef, useEffect, type ReactNode, type CSSProperties } from 'react'

/**
 * StickyScrollSection
 *
 * Solves the "tall section in a sticky-card stack" problem:
 *
 *   • The outer div reserves space in document flow equal to the content height
 *     (or at least one viewport height when content is short).
 *   • The inner div is position:sticky — it looks and behaves like every other
 *     scroll-card in the stack (border-radius, box-shadow, card-recede animation).
 *   • A JS scroll listener translates the inner content upward so every line
 *     becomes reachable as the outer div scrolls past.
 *   • The outer height is calculated so that the next scroll-card enters the
 *     viewport from below at the *exact moment* the content finishes scrolling —
 *     creating the desired "reached the end → next card slides over" feel.
 */
export function StickyScrollSection({
  children,
  className = '',
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  const outerRef   = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer   = outerRef.current
    const content = contentRef.current
    if (!outer || !content) return

    // 5rem nav height in px — must match `top: 5rem` on the sticky frame
    const NAV = parseFloat(getComputedStyle(document.documentElement).fontSize) * 5

    const stickyH  = () => window.innerHeight - NAV
    const overflow = () => Math.max(0, content!.scrollHeight - stickyH())

    // Outer div height:
    //   content fits in viewport  → equal to viewport height  (normal scroll-card)
    //   content taller than viewport → equal to content height
    //   In both cases, the next section enters the viewport exactly when
    //   the content scroll finishes.
    function setHeight() {
      outer!.style.height = `${Math.max(content!.scrollHeight, stickyH())}px`
    }

    function onScroll() {
      const top         = outer!.getBoundingClientRect().top
      const scrolledPast = Math.max(0, NAV - top)
      const ov          = overflow()
      content!.style.transform =
        ov > 0 ? `translateY(${-Math.min(scrolledPast, ov)}px)` : ''
    }

    setHeight()
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    const ro = new ResizeObserver(() => { setHeight(); onScroll() })
    ro.observe(content)

    return () => {
      window.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [])

  return (
    // Outer: no positioning, just reserves height in document flow
    <div ref={outerRef}>
      {/* Inner: identical to every other scroll-card in the stack */}
      <div
        className={`scroll-card ${className}`.trim()}
        style={{
          top:          '5rem',
          height:       'calc(100svh - 5rem)',
          marginBottom: 0,          // outer div controls spacing, not margin
          overflow:     'hidden',
          ...style,
        }}
      >
        {/* Content: translateY driven by scroll listener above */}
        <div ref={contentRef} style={{ willChange: 'transform' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
