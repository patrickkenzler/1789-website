'use client'

import { Container }  from '@/components/layout/Grid'
import { Logo1789 }   from '@/components/atoms/Logo1789'
import { useScrollProgress } from '@/hooks/useScrollProgress'

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

export function Header() {
  const { progress: scrollProgress, scrolled } = useScrollProgress()

  // Logo grows from 65 % → 100 % and fades 0 → 1 as you scroll
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

          {/* ── Centre: minimal "1789" wordmark — scroll-driven scale + fade ── */}
          {/*
            Uses the same variable font as the hero so the brain perceives
            the nav mark as the hero logo arriving at a smaller scale.
            No CSS transition — tracks scroll directly for physical feel.
          */}
          <a
            href="/"
            aria-label="1789 Management Consulting — zur Startseite"
            style={{
              textDecoration:  'none',
              opacity:         logoOpacity,
              transform:       `scale(${logoScale})`,
              transformOrigin: 'center center',
              pointerEvents:   logoOpacity > 0.05 ? 'auto' : 'none',
              willChange:      'opacity, transform',
            }}
          >
            <Logo1789 height={36} showSub={false} />
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
