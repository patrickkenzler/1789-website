'use client'

import { useState, useEffect } from 'react'
import { Container } from '@/components/layout/Grid'

const navItems = [
  { label: 'Ansatz',     href: '/ansatz' },
  { label: 'Cases',      href: '/projekte' },
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Labor',      href: '/labor' },
  { label: 'Podcast',    href: '/podcast' },
]

/**
 * Header
 *
 * Three-column layout:  [Nav links]  [Logo – centre]  [CTA]
 *
 * The centred wordmark mirrors the HeroLogo component's exit:
 *   - Both track `scrollProgress` over the first 60 % of viewport height
 *   - Hero fades/drifts UP  (opacity 1→0, translateY 0→-50px)
 *   - Nav logo fades/grows IN (opacity 0→1, scale 0.65→1)
 * The two animations overlap so the logo appears to travel from
 * the hero into the nav bar as the user scrolls.
 */

const SCROLL_THRESHOLD_VH = 0.6   // must match HeroLogo.tsx

export function Header() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrolled,       setScrolled]       = useState(false)

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      const threshold = window.innerHeight * SCROLL_THRESHOLD_VH
      setScrollProgress(Math.min(1, Math.max(0, y / threshold)))
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Logo grows from 65 % → 100 % and fades 0 → 1 as you scroll
  const logoOpacity = scrollProgress
  const logoScale   = 0.65 + 0.35 * scrollProgress

  // CTA appears in the final stretch
  const pastHero    = scrollProgress > 0.85
  const ctaOpacity  = Math.min(1, Math.max(0, (scrollProgress - 0.7) / 0.3))

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 300ms, border-color 300ms',
        backgroundColor: scrolled ? 'rgba(242,242,242,0.92)' : 'transparent',
        backdropFilter:  scrolled ? 'blur(12px)' : 'none',
        borderBottom:    scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      }}
    >
      <Container>
        {/*
          3-column grid:
            left  (1fr) — nav links, flex-start
            center (auto) — wordmark, perfectly centred in the bar
            right (1fr) — CTA, flex-end
        */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            height: '5rem',
          }}
        >

          {/* ── Left: nav links ── */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover-line"
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      'var(--text-xs)',
                  fontWeight:    500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color:         'var(--color-ink-muted)',
                  transition:    'color 150ms',
                  textDecoration:'none',
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* ── Centre: wordmark — scroll-driven scale + fade ── */}
          {/*
            Mirrors the hero logo layout (1789 stacked above Management Consulting)
            so the brain perceives them as the same object at two scales.
            No CSS transition — tracks scroll directly for physical feel.
          */}
          <a
            href="/"
            aria-label="1789 Management Consulting — zur Startseite"
            style={{
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              gap:            '0.15rem',
              textDecoration: 'none',
              opacity:        logoOpacity,
              transform:      `scale(${logoScale})`,
              transformOrigin:'center center',
              pointerEvents:  logoOpacity > 0.05 ? 'auto' : 'none',
              willChange:     'opacity, transform',
            }}
          >
            <span
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      '1.35rem',
                fontWeight:    300,
                letterSpacing: '-0.02em',
                lineHeight:    1,
                color:         'var(--color-ink)',
              }}
            >
              1789
            </span>
            <span
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '0.45rem',
                fontWeight:    400,
                letterSpacing: '0.25em',
                paddingLeft:   '0.25em',
                textTransform: 'uppercase',
                color:         'var(--color-terra)',
                lineHeight:    1,
                whiteSpace:    'nowrap',
              }}
            >
              Management Consulting
            </span>
          </a>

          {/* ── Right: CTA ── */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a
              href="/kontakt"
              aria-hidden={!pastHero}
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      'var(--text-xs)',
                fontWeight:    500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         'var(--color-terra)',
                textDecoration:'none',
                opacity:       ctaOpacity,
                pointerEvents: ctaOpacity > 0.05 ? 'auto' : 'none',
                willChange:    'opacity',
              }}
            >
              Shift starten →
            </a>
          </div>

        </div>
      </Container>
    </header>
  )
}
