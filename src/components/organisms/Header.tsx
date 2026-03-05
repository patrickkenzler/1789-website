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

export function Header() {
  const [scrolled,  setScrolled]  = useState(false)
  const [pastHero,  setPastHero]  = useState(false)

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      // CTA only appears once the user has scrolled past the full-screen hero
      setPastHero(y > window.innerHeight * 0.85)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 300ms, border-color 300ms',
        backgroundColor: scrolled ? 'rgba(242,237,230,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      }}
    >
      <Container>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '5rem' }}>

          {/* Logo / Wordmark */}
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.375rem',
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-base)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                color: 'var(--color-ink)',
              }}
            >
              1789
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xxs)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-terra)',
              }}
            >
              Systemshifter
            </span>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover-line"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink-muted)',
                  transition: 'color 150ms',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA — fades in only after scrolling past the hero */}
          <a
            href="/kontakt"
            aria-hidden={!pastHero}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-terra)',
              textDecoration: 'none',
              opacity: pastHero ? 1 : 0,
              pointerEvents: pastHero ? 'auto' : 'none',
              transition: 'opacity 400ms ease',
            }}
          >
            Shift starten →
          </a>
        </div>
      </Container>
    </header>
  )
}
