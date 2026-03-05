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

      <section className="pb-24">
        <Container>
          <Grid>
            <Col span={8}>
              <Tag>Leistungen</Tag>
              <h1
                className="mt-8 font-display font-light text-ink balance"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1', letterSpacing: '-0.03em' }}
              >
                Structure · Strategy · Gap
              </h1>
            </Col>
            <Col span={5} start={8} className="flex items-end mt-8">
              <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
                Unsere Leistungen sind keine Produkte. Sie sind Antworten auf den Gap, den jede
                erfolgreiche Organisation kennt — aber selten benennen kann.
              </p>
            </Col>
          </Grid>
        </Container>
      </section>

      <section style={{ borderTop: '1px solid var(--color-border)' }}>
        <Container>
          {offerings.map((o) => (
            <div
              key={o.num}
              className="py-20"
              style={{ borderBottom: '1px solid var(--color-border)' }}
            >
              <Grid>
                <Col span={1}>
                  <span className="font-mono text-xs" style={{ color: 'var(--color-terra)' }}>{o.num}</span>
                </Col>
                <Col span={4}>
                  <Tag className="mb-4">{o.category}</Tag>
                  <h2
                    className="font-display font-light text-ink"
                    style={{ fontSize: 'var(--text-md)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
                  >
                    {o.title}
                  </h2>
                  <p className="mt-2 font-mono text-xs" style={{ color: 'var(--color-ink-subtle)' }}>
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

      <section className="py-32">
        <Container>
          <Grid>
            <Col span={6} start={4} className="text-center">
              <h2
                className="font-display font-light text-ink balance"
                style={{ fontSize: 'var(--text-md)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
              >
                Nicht sicher, wo der Gap bei euch liegt?
              </h2>
              <p className="mt-6 font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
                Das Erstgespräch dient der gegenseitigen Erkenntnis.
                Kein Pitch. Kein Sales-Deck.
              </p>
              <div className="mt-10">
                <Button variant="primary" size="lg">Erstgespräch anfragen</Button>
              </div>
            </Col>
          </Grid>
        </Container>
      </section>

    </main>
  )
}
