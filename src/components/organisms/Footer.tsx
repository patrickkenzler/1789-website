import Link from 'next/link'
import { Container, Grid, Col } from '@/components/layout/Grid'

const NAV_ITEMS = [
  { label: 'Ansatz',     href: '/ansatz' },
  { label: 'Cases',      href: '/projekte' },
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Labor',      href: '/labor' },
  { label: 'Podcast',    href: '/podcast' },
]

const MONO_LABEL: React.CSSProperties = {
  fontFamily:    'var(--font-mono)',
  fontSize:      'var(--text-xxs)',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color:         'rgba(242,242,242,0.25)',
  marginBottom:  '1.5rem',
}

const LINK_BASE: React.CSSProperties = {
  fontFamily:     'var(--font-body)',
  fontSize:       'var(--text-xs)',
  letterSpacing:  '0.06em',
  textDecoration: 'none',
  display:        'block',
}

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-ink)' }}>

      {/* ── Wordmark ─────────────────────────────────────────────────────── */}
      <Container>
        <div
          style={{
            paddingTop:    '5rem',
            paddingBottom: '3.5rem',
            borderBottom:  '1px solid rgba(227,221,213,0.08)',
          }}
        >
          <p
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(5rem, 14vw, 11rem)',
              fontWeight:    300,
              letterSpacing: '-0.04em',
              lineHeight:    0.88,
              color:         'var(--color-background)',
            }}
          >
            1789
          </p>
          <p
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-xxs)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         'var(--color-terra)',
              marginTop:     '1.25rem',
            }}
          >
            Innovation · Consulting
          </p>
        </div>
      </Container>

      {/* ── Main columns ─────────────────────────────────────────────────── */}
      <Container>
        <Grid className="stack-cols" style={{ paddingBlock: '4rem' }}>

          {/* About + CTA */}
          <Col span={5}>
            <p
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight:    300,
                fontStyle:     'italic',
                lineHeight:    1.3,
                letterSpacing: '-0.02em',
                color:         'rgba(242,242,242,0.7)',
                maxWidth:      '28ch',
              }}
            >
              Zwischen Strategie und Wirklichkeit liegt eine Lücke. Wir arbeiten in ihr.
            </p>

            <Link
              href="/kontakt"
              className="footer-cta"
              style={{
                ...LINK_BASE,
                display:       'inline-block',
                marginTop:     '2.5rem',
                fontWeight:    500,
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                fontSize:      'var(--text-xs)',
              }}
            >
              Erstgespräch vereinbaren →
            </Link>
          </Col>

          {/* Navigation */}
          <Col span={3} start={8}>
            <p style={MONO_LABEL}>Seiten</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="footer-link hover-line"
                    style={LINK_BASE}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact */}
          <Col span={3} start={11}>
            <p style={MONO_LABEL}>Kontakt</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <a
                  href="mailto:hello@1789consulting.de"
                  className="footer-link-email"
                  style={LINK_BASE}
                >
                  hello@1789consulting.de
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link hover-line"
                  style={LINK_BASE}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://de.linkedin.com/company/1789-consulting"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link hover-line"
                  style={LINK_BASE}
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </Col>

        </Grid>
      </Container>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <Container>
        <div
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            paddingBlock:   '1.5rem',
            borderTop:      '1px solid rgba(227,221,213,0.08)',
            gap:            '1rem',
            flexWrap:       'wrap',
          }}
        >
          <p
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-xxs)',
              letterSpacing: '0.08em',
              color:         'rgba(242,242,242,0.2)',
            }}
          >
            © {new Date().getFullYear()} 1789 Consulting GmbH — Alle Rechte vorbehalten.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Impressum', 'Datenschutz'].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase()}`}
                className="footer-legal"
                style={{
                  fontFamily:     'var(--font-mono)',
                  fontSize:       'var(--text-xxs)',
                  letterSpacing:  '0.08em',
                  textDecoration: 'none',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </Container>

    </footer>
  )
}
