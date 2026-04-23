import Link from 'next/link'
import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'

export default function Datenschutz() {
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
                Datenschutz&shy;erklärung
              </h1>

              {[
                {
                  heading: '1. Datenschutz auf einen Blick',
                  body: 'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.',
                },
                {
                  heading: '2. Datenerfassung auf unserer Website',
                  body: 'Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.\n\nIhre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen, z.B. durch Ausfüllen des Kontaktformulars. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst.',
                },
                {
                  heading: '3. Ihre Rechte',
                  body: 'Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen.\n\nHierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.',
                },
                {
                  heading: '4. Hosting',
                  body: 'Diese Website wird auf GitHub Pages gehostet. Anbieter ist die GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA. GitHub Pages ist ein statischer Hosting-Dienst ohne serverseitige Verarbeitung personenbezogener Daten durch uns.',
                },
                {
                  heading: '5. Kontaktformular',
                  body: 'Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.',
                },
                {
                  heading: '6. Analyse-Tools und Tools von Drittanbietern',
                  body: 'Diese Website verwendet derzeit keine Analyse-Tools oder Tracking-Dienste Dritter.',
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
                  fontFamily:      'var(--font-mono)',
                  fontSize:        'var(--text-xxs)',
                  letterSpacing:   '0.12em',
                  textTransform:   'uppercase',
                  color:           'var(--color-ink-muted)',
                  textDecoration:  'none',
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
