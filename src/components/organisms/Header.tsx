'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo1789 }   from '@/components/atoms/Logo1789'
import { useScrollProgress } from '@/hooks/useScrollProgress'

/**
 * Header — editorial split-nav
 *
 * Desktop: [Ansatz · Leistungen · Cases] [1789 logo — centered] [Labor · Podcast · Kontakt]
 * Mobile:  [Logo — left] [Hamburger — right]
 *          Hamburger opens a full-screen ink overlay with large nav links.
 *
 * The logo is always visible (no scroll-driven fade — the hero no longer
 * contains a logo, so identity is established through the nav from the start).
 * Nav background + blur fade in on scroll via the `scrolled` flag.
 */

const LEFT_ITEMS = [
  { label: 'Ansatz',     href: '/ansatz' },
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Cases',      href: '/projekte' },
]

const RIGHT_ITEMS = [
  { label: 'Labor',      href: '/labor' },
  { label: 'Podcast',    href: '/podcast' },
  { label: 'Kontakt',    href: '/kontakt' },
]

const ALL_ITEMS = [...LEFT_ITEMS, ...RIGHT_ITEMS]

const NAV_LINK: React.CSSProperties = {
  fontFamily:     'var(--font-body)',
  fontSize:       'var(--text-xs)',
  fontWeight:     500,
  letterSpacing:  '0.13em',
  textTransform:  'uppercase',
  color:          'var(--color-ink-muted)',
  textDecoration: 'none',
  transition:     'color 150ms',
  whiteSpace:     'nowrap',
}

export function Header() {
  const { scrolled } = useScrollProgress()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          right:           0,
          zIndex:          50,
          transition:      'background-color 300ms',
          backgroundColor: scrolled ? 'rgba(242,242,242,0.92)' : 'transparent',
          /* Always on — toggling backdrop-filter creates/destroys compositor
             layers on every scroll event, causing site-wide repaint flicker.
             blur on a fully-transparent bg is invisible, so there's no visual
             difference at the top of the page. */
          backdropFilter:  'blur(12px)',
        }}
      >
        {/* ── Desktop layout (≥ 1024px): editorial split-nav with centered logo ── */}
        <div
          className="show-desktop-grid"
          style={{
            gridTemplateColumns: '1fr auto 1fr',
            alignItems:          'center',
            height:              '5rem',
            paddingInline:       'var(--grid-margin)',
            gap:                 '2.5rem',
          }}
        >

          {/* Left nav */}
          <nav
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'flex-end',
              gap:            '2rem',
            }}
          >
            {LEFT_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="hover-line" style={NAV_LINK}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Logo — centered */}
          <Link
            href="/"
            aria-label="1789 Innovation — zur Startseite"
            style={{
              textDecoration: 'none',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
            }}
          >
            <Logo1789 height={38} showSub={false} />
          </Link>

          {/* Right nav */}
          <nav
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'flex-start',
              gap:            '2rem',
            }}
          >
            {RIGHT_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="hover-line" style={NAV_LINK}>
                {item.label}
              </Link>
            ))}
          </nav>

        </div>

        {/* ── Tablet layout (768px–1023px): logo left, all links right ── */}
        <div
          className="show-tablet-flex"
          style={{
            alignItems:     'center',
            justifyContent: 'space-between',
            height:         '5rem',
            paddingInline:  'var(--grid-margin)',
            gap:            '2rem',
          }}
        >
          {/* Logo — left */}
          <Link
            href="/"
            aria-label="1789 Innovation — zur Startseite"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          >
            <Logo1789 height={34} showSub={false} />
          </Link>

          {/* All links — right, compact */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {ALL_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="hover-line" style={NAV_LINK}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Mobile layout (< 768px): logo left, hamburger right ── */}
        <div
          className="show-mobile-flex"
          style={{
            display:        'none', /* overridden by .show-mobile-flex */
            alignItems:     'center',
            justifyContent: 'space-between',
            height:         '5rem',
            paddingInline:  'var(--grid-margin)',
          }}
        >
          {/* Logo — left on mobile */}
          <Link
            href="/"
            aria-label="1789 Innovation — zur Startseite"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          >
            <Logo1789 height={32} showSub={false} />
          </Link>

          {/* Hamburger — right */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
            style={{
              background:     'none',
              border:         'none',
              cursor:         'pointer',
              padding:        '0.5rem',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              flexDirection:  'column',
              gap:            '5px',
              width:          '2.5rem',
              height:         '2.5rem',
            }}
          >
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
                    i === 0 && menuOpen ? 'translateY(6.5px) rotate(45deg)'   :
                    i === 2 && menuOpen ? 'translateY(-6.5px) rotate(-45deg)' :
                    'none',
                  opacity: i === 1 && menuOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
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
        <nav
          style={{
            flex:           '1',
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'center',
            gap:            '0.25rem',
          }}
        >
          {ALL_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily:     'var(--font-display)',
                fontSize:       'clamp(2.5rem, 10vw, 4rem)',
                fontWeight:     300,
                lineHeight:     1.1,
                letterSpacing:  '-0.02em',
                color:          'var(--color-background)',
                textDecoration: 'none',
                paddingBlock:   '0.5rem',
                borderBottom:   '1px solid rgba(227,221,213,0.08)',
                opacity:        menuOpen ? 1 : 0,
                transform:      menuOpen ? 'translateY(0)' : 'translateY(12px)',
                transition:     `opacity 400ms var(--ease-entry) ${80 + i * 60}ms, transform 400ms var(--ease-expressive) ${80 + i * 60}ms`,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/kontakt"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop:      '2rem',
            fontFamily:     'var(--font-body)',
            fontSize:       'var(--text-xs)',
            fontWeight:     500,
            letterSpacing:  '0.15em',
            textTransform:  'uppercase',
            color:          'var(--color-terra)',
            textDecoration: 'none',
            opacity:        menuOpen ? 1 : 0,
            transition:     'opacity 400ms var(--ease-entry) 520ms',
          }}
        >
          Erstgespräch vereinbaren →
        </Link>
      </div>
    </>
  )
}
