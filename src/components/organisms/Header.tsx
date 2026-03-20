'use client'

import { useState } from 'react'
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
 * Desktop: [Logo – scroll-driven left] [Nav – centred] [CTA – right]
 * Mobile:  [Logo – always visible left] [Hamburger – right]
 *          Hamburger opens a full-screen ink overlay with large nav links.
 */
export function Header() {
  const { progress: scrollProgress, scrolled } = useScrollProgress()
  const [menuOpen, setMenuOpen] = useState(false)

  const logoOpacity = scrollProgress
  const logoScale   = 0.65 + 0.35 * scrollProgress
  const pastHero    = scrollProgress > 0.85
  const ctaOpacity  = Math.min(1, Math.max(0, (scrollProgress - 0.7) / 0.3))

  return (
    <>
      <header
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          right:           0,
          zIndex:          50,
          transition:      'background 300ms, border-color 300ms',
          backgroundColor: scrolled ? 'rgba(242,242,242,0.92)' : 'transparent',
          backdropFilter:  scrolled ? 'blur(12px)' : 'none',
          borderBottom:    scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        }}
      >
        <Container>
          <div
            style={{
              display:    'grid',
              alignItems: 'center',
              height:     '5rem',
              /* Desktop: logo | nav | cta   Mobile: logo | hamburger */
              gridTemplateColumns: 'auto 1fr auto',
              gap: '2rem',
            }}
          >

            {/* ── Logo ── */}
            {/*
              Desktop: scroll-driven opacity/scale via inline style
              Mobile:  .header-logo-link overrides both to opacity:1 / scale(1)
            */}
            <a
              href="/"
              aria-label="1789 Innovation — zur Startseite"
              className="header-logo-link"
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

            {/* ── Desktop nav (hidden on mobile) ── */}
            <nav
              className="hide-mobile"
              style={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                gap:            '2rem',
              }}
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="hover-line"
                  style={{
                    fontFamily:     'var(--font-body)',
                    fontSize:       'var(--text-xs)',
                    fontWeight:     500,
                    letterSpacing:  '0.12em',
                    textTransform:  'uppercase',
                    color:          'var(--color-ink-muted)',
                    transition:     'color 150ms',
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* ── Desktop CTA (hidden on mobile) ── */}
            <a
              href="/kontakt"
              aria-hidden={!pastHero}
              className="hide-mobile"
              style={{
                fontFamily:     'var(--font-body)',
                fontSize:       'var(--text-xs)',
                fontWeight:     500,
                letterSpacing:  '0.12em',
                textTransform:  'uppercase',
                color:          'var(--color-terra)',
                textDecoration: 'none',
                opacity:        ctaOpacity,
                pointerEvents:  ctaOpacity > 0.05 ? 'auto' : 'none',
                willChange:     'opacity',
              }}
            >
              Shift starten →
            </a>

            {/* ── Mobile hamburger (hidden on desktop) ── */}
            <button
              className="show-mobile-flex"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={menuOpen}
              style={{
                background:  'none',
                border:      'none',
                cursor:      'pointer',
                padding:     '0.5rem',
                display:     'none', /* overridden by .show-mobile-flex on mobile */
                alignItems:  'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap:         '5px',
                width:       '2.5rem',
                height:      '2.5rem',
              }}
            >
              {/* Animated 3-line → X icon */}
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display:         'block',
                    width:           '20px',
                    height:          '1.5px',
                    backgroundColor: 'var(--color-ink)',
                    borderRadius:    '1px',
                    transition:      'transform 350ms var(--ease-expressive), opacity 250ms',
                    transform:
                      i === 0 && menuOpen ? 'translateY(6.5px) rotate(45deg)'  :
                      i === 2 && menuOpen ? 'translateY(-6.5px) rotate(-45deg)' :
                      'none',
                    opacity: i === 1 && menuOpen ? 0 : 1,
                  }}
                />
              ))}
            </button>

          </div>
        </Container>
      </header>

      {/* ── Mobile nav overlay ── */}
      <div
        aria-hidden={!menuOpen}
        style={{
          position:        'fixed',
          inset:           0,
          zIndex:          48,
          backgroundColor: 'var(--color-ink)',
          display:         'flex',
          flexDirection:   'column',
          paddingInline:   'var(--grid-margin)',
          paddingBlock:    '6rem 3rem',
          opacity:         menuOpen ? 1 : 0,
          pointerEvents:   menuOpen ? 'auto' : 'none',
          transition:      'opacity 350ms var(--ease-standard)',
          overflowY:       'auto',
        }}
      >
        {/* Nav links — large Cormorant display */}
        <nav
          style={{
            flex:          '1',
            display:       'flex',
            flexDirection: 'column',
            justifyContent:'center',
            gap:           '0.25rem',
          }}
        >
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(2.5rem, 10vw, 4rem)',
                fontWeight:    300,
                lineHeight:    1.1,
                letterSpacing: '-0.02em',
                color:         'var(--color-background)',
                textDecoration:'none',
                paddingBlock:  '0.5rem',
                borderBottom:  '1px solid rgba(227,221,213,0.08)',
                opacity:       menuOpen ? 1 : 0,
                transform:     menuOpen ? 'translateY(0)' : 'translateY(12px)',
                transition:    `opacity 400ms var(--ease-entry) ${80 + i * 60}ms, transform 400ms var(--ease-expressive) ${80 + i * 60}ms`,
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA at the bottom */}
        <a
          href="/kontakt"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop:     '2rem',
            fontFamily:    'var(--font-body)',
            fontSize:      'var(--text-xs)',
            fontWeight:    500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color:         'var(--color-terra)',
            textDecoration:'none',
            opacity:       menuOpen ? 1 : 0,
            transition:    'opacity 400ms var(--ease-entry) 520ms',
          }}
        >
          Erstgespräch vereinbaren →
        </a>
      </div>
    </>
  )
}
