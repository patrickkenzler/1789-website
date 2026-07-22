import Link from 'next/link'
import type { Metadata } from 'next'
import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'

export const metadata: Metadata = {
  title: 'Impressum — 1789 Innovation',
  robots: { index: false, follow: false },
}

const SECTION_HEADING: React.CSSProperties = {
  fontFamily:    'var(--font-mono)',
  fontSize:      'var(--text-xxs)',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color:         'var(--color-ink-subtle)',
  marginBottom:  '0.75rem',
}

const SECTION_BODY: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize:   'var(--text-base)',
  lineHeight: 1.75,
  color:      'var(--color-ink)',
  whiteSpace: 'pre-line',
}

const DIVIDER: React.CSSProperties = {
  marginBottom:  '2.5rem',
  paddingBottom: '2.5rem',
  borderBottom:  '1px solid var(--color-border)',
}

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
                  body: '1789 Innovations GmbH\nElbestraße 17\n60329 Frankfurt am Main',
                },
                {
                  heading: 'Geschäftsführung',
                  body: 'Human Nagafi und Mary-Jane Bolten',
                },
                {
                  heading: 'Registereintrag',
                  body: 'Eintragung im Handelsregister\nRegistergericht: Amtsgericht Frankfurt\nRegisternummer: 143364\nBerufsbezeichnung: Management Consulting',
                },
                {
                  heading: 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV',
                  body: 'Postadresse:\n1789 Innovations GmbH\nCoventrystr. 31\n65934 Frankfurt am Main',
                },
                {
                  heading: 'Online-Streitbeilegung',
                  body: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit.\n\nUnsere E-Mail-Adresse finden Sie oben im Impressum.\n\nWir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
                },
                {
                  heading: 'Haftung für Inhalte',
                  body: 'Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.\n\nVerpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
                },
                {
                  heading: 'Haftung für Links',
                  body: 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.\n\nEine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
                },
                {
                  heading: 'Urheberrecht',
                  body: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.\n\nSoweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.',
                },
              ].map(({ heading, body }) => (
                <div key={heading} style={DIVIDER}>
                  <p style={SECTION_HEADING}>{heading}</p>
                  <p style={SECTION_BODY}>{body}</p>
                </div>
              ))}

              <Link
                href="/"
                style={{
                  fontFamily:     'var(--font-mono)',
                  fontSize:       'var(--text-xxs)',
                  letterSpacing:  '0.12em',
                  textTransform:  'uppercase',
                  color:          'var(--color-ink-muted)',
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
