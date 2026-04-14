import Link from 'next/link'
import { Container, Grid, Col } from '@/components/layout/Grid'

const navItems = [
  { label: 'Ansatz',     href: '/ansatz' },
  { label: 'Cases',      href: '/projekte' },
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Labor',      href: '/labor' },
  { label: 'Podcast',    href: '/podcast' },
  { label: 'Kontakt',    href: '/kontakt' },
]

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <Container>
        <Grid>
          <Col span={4} className="py-16">
            <p className="text-label text-ink mb-4">1789 Consulting GmbH</p>
            <p className="text-body-sm text-ink-muted pretty">
              Wir verzahnen Strategieentwicklung mit Organisationsentwicklung.
            </p>
          </Col>

          <Col span={2} start={7} className="py-16">
            <p className="text-label text-ink-subtle mb-4">Navigation</p>
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-body-sm text-ink-muted hover:text-ink hover-line transition-colors duration-fast">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col span={2} start={10} className="py-16">
            <p className="text-label text-ink-subtle mb-4">Kontakt</p>
            <ul className="flex flex-col gap-2">
              <li><a href="mailto:hello@1789consulting.de" className="text-body-sm text-ink-muted hover:text-terra transition-colors duration-fast">hello@1789consulting.de</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-body-sm text-ink-muted hover:text-ink hover-line transition-colors duration-fast">Instagram</a></li>
              <li><a href="https://de.linkedin.com/company/1789-consulting" target="_blank" rel="noreferrer" className="text-body-sm text-ink-muted hover:text-ink hover-line transition-colors duration-fast">LinkedIn</a></li>
            </ul>
          </Col>
        </Grid>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between py-6 border-t border-border">
          <p className="text-micro text-ink-subtle">
            © {new Date().getFullYear()} 1789 Consulting GmbH. Alle Rechte vorbehalten.
          </p>
          <p className="text-micro text-ink-subtle">
            Impressum · Datenschutz
          </p>
        </div>
      </Container>
    </footer>
  )
}
