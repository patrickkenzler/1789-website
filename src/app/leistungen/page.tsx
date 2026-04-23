import Link from 'next/link'
import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'
import { Button } from '@/components/atoms/Button'

const offerings = [
  {
    num: '01',
    category: 'Benchmark',
    title: 'Benchmark & Defining the Gap',
    body: 'Wir analysieren die Spannung zwischen dem, was eine Organisation heute ist, und dem, was sie morgen sein will. Systematisch, präzise, mit neuem Vokabular.',
    deliverables: ['Gap-Analyse', 'Benchmark-Bericht', 'Organisations-Diagnose', 'Maßnahmenrahmen'],
    duration: '6–10 Wochen',
  },
  {
    num: '02',
    category: 'Workshop',
    title: 'Workshop & Strategy Structure',
    body: 'Wir transformieren Erkenntnisse in konkrete Strukturen. Partizipativ, artefaktgetrieben und sofort wirksam — nicht erst nach dem Prozess.',
    deliverables: ['Operating Model Entwurf', 'Mission Board', 'Responsibility Framework', 'Pilotdesign'],
    duration: '3–6 Monate',
  },
  {
    num: '03',
    category: 'Transformation',
    title: 'Transformation Begleitung',
    body: 'Wir begleiten Organisationen durch den vollständigen Systemshift Cycle. Von der Erkenntnis bis zur eigenständig iterierenden Organisation.',
    deliverables: ['Vollständiger Systemshift Cycle', 'Organisationales Mindset', 'Verbindlichkeitsstrukturen', 'Übergabe & Verselbstständigung'],
    duration: '6–18 Monate',
  },
]

export default function Leistungen() {
  return (
    <main className="pt-40">

      {/* ── Page Hero — staggered editorial h1 ── */}
      <section style={{ paddingBottom: '6rem' }}>
        <Container>
          <Tag>Leistungen</Tag>

          {/* Staggered h1 */}
          <div style={{ marginTop: '3rem', overflow: 'hidden' }}>
            <div>
              <h1
                style={{
                  display: 'inline',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.92,
                  color: 'var(--color-ink)',
                  fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                  paddingLeft: '6%',
                }}
              >
                Structure · Strategy ·
              </h1>
            </div>
            <div style={{ marginTop: '0.08em', textAlign: 'right' }}>
              <h1
                style={{
                  display: 'inline',
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.92,
                  color: 'var(--color-terra)',
                  fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                }}
              >
                Gap.
              </h1>
            </div>
          </div>

          {/* Lead copy */}
          <Grid className="mt-16">
            <Col span={5} start={8}>
              <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
                Unsere Leistungen sind keine Produkte. Sie sind Antworten auf den Gap, den jede
                erfolgreiche Organisation kennt — aber selten benennen kann.
              </p>
            </Col>
          </Grid>
        </Container>
      </section>

      {/* ── Offerings — editorial list ── */}
      <section style={{ borderTop: '1px solid var(--color-border)' }}>
        <Container>
          {offerings.map((o) => (
            <div
              key={o.num}
              style={{ paddingBlock: '5rem', borderBottom: '1px solid var(--color-border)' }}
            >
              <Grid>
                <Col span={1}>
                  <span
                    className="font-mono text-xs"
                    style={{ color: 'var(--color-terra)', paddingTop: '0.75rem', display: 'block' }}
                  >
                    {o.num}
                  </span>
                </Col>
                <Col span={5}>
                  <Tag className="mb-6">{o.category}</Tag>
                  {/* Large editorial offering title */}
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 300,
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      color: 'var(--color-ink)',
                      fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                    }}
                  >
                    {o.title}
                  </h2>
                  <p className="mt-3 font-mono text-xs" style={{ color: 'var(--color-ink-subtle)' }}>
                    Dauer: {o.duration}
                  </p>
                </Col>
                <Col span={3} start={7}>
                  <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
                    {o.body}
                  </p>
                </Col>
                <Col span={3} start={10}>
                  <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-ink-subtle)' }}>
                    Deliverables
                  </p>
                  <ul className="flex flex-col gap-2">
                    {o.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <span style={{ color: 'var(--color-terra)' }}>·</span>
                        <span className="font-body text-ink-muted" style={{ fontSize: 'var(--text-sub)' }}>{d}</span>
                      </li>
                    ))}
                  </ul>
                </Col>
              </Grid>
            </div>
          ))}
        </Container>
      </section>

      {/* ── Closing — staggered big question + CTA ── */}
      <section style={{ paddingBlock: '8rem', overflow: 'hidden' }}>
        <Container>

          {/* Staggered closing question */}
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ textAlign: 'right' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.9,
                  color: 'var(--color-ink)',
                  fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
                }}
              >
                Nicht sicher,
              </span>
            </div>
            <div style={{ marginTop: '0.1em' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.9,
                  color: 'var(--color-ink)',
                  fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
                  paddingLeft: '12%',
                }}
              >
                wo der Gap bei euch liegt?
              </span>
            </div>
            <div style={{ marginTop: '0.1em', textAlign: 'right' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.9,
                  color: 'var(--color-terra)',
                  fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
                }}
              >
                Das Erstgespräch klärt das.
              </span>
            </div>
          </div>

          {/* Sub copy + CTA */}
          <Grid>
            <Col span={4}>
              <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
                Das Erstgespräch dient der gegenseitigen Erkenntnis.
                Kein Pitch. Kein Sales-Deck.
              </p>
              <div className="mt-10">
                <Link href="/kontakt">
                  <Button variant="primary" size="lg">Erstgespräch anfragen</Button>
                </Link>
              </div>
            </Col>
          </Grid>
        </Container>
      </section>

    </main>
  )
}
