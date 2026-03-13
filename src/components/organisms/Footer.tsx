import { Container, Grid, Col } from '@/components/layout/Grid'

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <Container>
        <Grid>
          <Col span={4} className="py-16">
            <p className="text-label text-ink mb-4">1789 Consulting</p>
            <p className="text-body-sm text-ink-muted pretty">
              Wir gestalten Stratgien und entwickeln Organisationen in die Zukunft.
            </p>
          </Col>

          <Col span={2} start={7} className="py-16">
            <p className="text-label text-ink-subtle mb-4">Navigation</p>
            <ul className="flex flex-col gap-2">
              {['Leistungen', 'Arbeit', 'Studio', 'Kontakt'].map((item) => (
                <li key={item}>
                  <a href={`/${item.toLowerCase()}`} className="text-body-sm text-ink-muted hover:text-ink hover-line transition-colors duration-fast">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          <Col span={2} start={10} className="py-16">
            <p className="text-label text-ink-subtle mb-4">Kontakt</p>
            <ul className="flex flex-col gap-2">
              <li><a href="mailto:hello@studio.de" className="text-body-sm text-ink-muted hover:text-terra transition-colors duration-fast">hello@1789.com</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-body-sm text-ink-muted hover:text-ink hover-line transition-colors duration-fast">Instagram</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-body-sm text-ink-muted hover:text-ink hover-line transition-colors duration-fast">LinkedIn</a></li>
            </ul>
          </Col>
        </Grid>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between py-6 border-t border-border">
          <p className="text-micro text-ink-subtle">
            © {new Date().getFullYear()} Studio·Name. Alle Rechte vorbehalten.
          </p>
          <p className="text-micro text-ink-subtle">
            Impressum · Datenschutz
          </p>
        </div>
      </Container>
    </footer>
  )
}
