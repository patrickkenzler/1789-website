'use client'

import { Container }  from '@/components/layout/Grid'
import { Logo1789 }   from '@/components/atoms/Logo1789'
import { useScrollProgress } from '@/hooks/useScrollProgress'

const navItems = [
  { label: 'Home',       href: '/' },
  { label: 'Ansatz',     href: '/ansatz' },
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Cases',      href: '/projekte' },
  { label: 'Labor',      href: '/labor' },
  { label: 'Podcast',    href: '/podcast' },
  { label: 'Kontakt',    href: '/kontakt' },
]

/**
 * Header
 *
 * Three-column layout:  [Logo – left]  [Nav links – centre]  [CTA – right]
 *
 * Logo is always visible on the left. Nav items are centred in the bar.
 * CTA fades in after the hero section.
 */

export function Header() {
  const { progress: scrollProgress, scrolled } = useScrollProgress()

  // Logo fades in as you scroll (0 → 1)
  const logoOpacity = scrollProgress
  const logoScale   = 0.65 + 0.35 * scrollProgress

  // CTA appears in the final stretch (last 30 % of the transition)
  const pastHero   = scrollProgress > 0.85
  const ctaOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.7) / 0.3))

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
            left  (auto) — logo, always visible
            center (1fr) — nav links, centred
            right (auto) — CTA, flex-end
        */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            alignItems: 'center',
            height: '5rem',
            gap: '2rem',
          }}
        >

          {/* ── Left: logo — fades in on scroll ── */}
          <a
            href="/"
            aria-label="1789 Innovation — zur Startseite"
            style={{
              textDecoration:  'none',
              display:         'flex',
              alignItems:      'center',
              opacity:         logoOpacity,
              transform:       `scale(${logoScale})`,
              transformOrigin: 'left center',
              pointerEvents:   logoOpacity > 0.05 ? 'auto' : 'none',
              willChange:      'opacity, transform',
            }}
          >
            <Logo1789 height={36} showSub={false} />
          </a>

          {/* ── Centre: nav links ── */}
          <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
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

          {/* ── Right: CTA ── */}
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
      </Container>
    </header>
  )
}
