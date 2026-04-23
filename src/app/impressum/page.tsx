import Link from 'next/link'
import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'

export default function Impressum() {
  return (
    <main>

      <section
        style={{
          paddingTop:      'calc(5rem + 5rem)',
          paddingBottom:   '7rem',
          backgroundColor: 'var(--color-background)',
        }}
      >
        <Container>
          <Grid>
            <Col span={7}>
              <Tag>Legal</Tag>
              <h1
                style={{
                  fontFamily:    'var(--font-display)',
                  fontWeight:    300,
                  fontSize:      'clamp(2.5rem, 5vw, 5rem)',
                  lineHeight:    0.95,
                  letterSpacing: '-0.03em',
                  color:         'var(--color-ink)',
                  marginTop:     '1.75rem',
                  marginBottom:  '3rem',
                }}
              >
                Impressum
              </h1>

              {[
                {
                  heading: 'Angaben gemäß § 5 TMG',
                  body: '1789 Consulting GmbH\nMusterstraße 1\n60311 Frankfurt am Main\nDeutschland',
                },
                {
                  heading: 'Vertreten durch',
                  body: 'Patrick Kenzler',
                },
                {
                  heading: 'Kontakt',
                  body: 'E-Mail: hello@1789.consulting',
                },
                {
                  heading: 'Registereintrag',
                  body: 'Eingetragen im Handelsregister.\nRegistergericht: Amtsgericht Frankfurt am Main\nRegisternummer: HRB XXXXX',
                },
                {
                  heading: 'Umsatzsteuer-ID',
                  body: 'Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:\nDE XXX XXX XXX',
                },
                {
                  heading: 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV',
                  body: 'Patrick Kenzler\nMusterstraße 1\n60311 Frankfurt am Main',
                },
              ].map(({ heading, body }) => (
                <div
                  key={heading}
                  style={{
                    marginBottom:  '2.5rem',
                    paddingBottom: '2.5rem',
                    borderBottom:  '1px solid var(--color-border)',
                  }}
                >
                  <p
                    style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      'var(--text-xxs)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color:         'var(--color-ink-subtle)',
                      marginBottom:  '0.75rem',
                    }}
                  >
                    {heading}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   'var(--text-base)',
                      lineHeight: 1.75,
                      color:      'var(--color-ink)',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {body}
                  </p>
                </div>
              ))}

              <Link
                href="/"
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      'var(--text-xxs)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color:         'var(--color-ink-muted)',
                  textDecoration: 'none',
                }}
              >
                ← Zurück zur Startseite
              </Link>
            </Col>
          </Grid>
        </Container>
      </section>

    </main>
  )
}
