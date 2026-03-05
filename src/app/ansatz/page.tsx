import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'
import { Button } from '@/components/atoms/Button'

const cycle = [
  {
    num: '01',
    title: 'Analyse & Erkenntnis',
    sub: 'Sehen, was ist',
    body: 'Eine Organisation kann nur Dinge erkennen und ändern, um die sie weiß. Wir setzen Organisationen in die Lage, sich in ihrem System zu erkennen und zu verstehen.',
    example: 'Beispiel: Karrieremodell vs. Strategy Goals',
  },
  {
    num: '02',
    title: 'Change by Action',
    sub: 'Verändern, während es passiert',
    body: 'Veränderung wird sofort Teil des Vorgehens. Die spürbare und messbare Transformation beginnt während – nicht nach – unserem Prozess.',
    example: 'Beispiel: Eigenverantwortung vs. Hierarchie',
  },
  {
    num: '03',
    title: 'Responsibility',
    sub: 'Verbindlichkeit gestalten',
    body: 'Wir erzeugen Verbindlichkeit. Wir gestalten verantwortungsgetriebene Operating Modelle und stärken die Fähigkeit der Organisation zur eigenständigen Weiterentwicklung.',
    example: 'Prinzip: Check and Balances',
  },
  {
    num: '04',
    title: 'Iterate',
    sub: 'Kontinuierlich wachsen',
    body: 'Artefaktgetrieben, minimal viable, partizipativ. Wir strapazieren Organisationen und fordern ihre Fähigkeit zur Veränderung heraus.',
    example: 'Artefakt: Mission Board Meeting',
  },
]

export default function Ansatz() {
  return (
    <main className="pt-40">

      {/* Hero */}
      <section className="pb-24">
        <Container>
          <Grid>
            <Col span={8}>
              <Tag>Unser Ansatz</Tag>
              <h1
                className="mt-8 font-display font-light text-ink balance"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1', letterSpacing: '-0.03em' }}
              >
                Der Systemshift Cycle
              </h1>
            </Col>
            <Col span={5} start={8} className="flex items-end mt-8">
              <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
                Wertschöpfungsfluss ist der Herzschlag unserer Projekte.
                Wie organisiert man die Arbeit um die Wertschöpfung herum?
                Das ist die zentrale Frage hinter jedem unserer Engagements.
              </p>
            </Col>
          </Grid>
        </Container>
      </section>

      {/* Cycle Steps */}
      <section className="py-24" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Container>
          {cycle.map((step, i) => (
            <Grid
              key={step.num}
              className="py-16"
              style={{ borderBottom: '1px solid var(--color-border)' }}
            >
              <Col span={1}>
                <span className="font-mono text-xs" style={{ color: 'var(--color-terra)' }}>{step.num}</span>
              </Col>
              <Col span={4}>
                <h2
                  className="font-display font-light text-ink"
                  style={{ fontSize: 'var(--text-md)', lineHeight: '1', letterSpacing: '-0.02em' }}
                >
                  {step.title}
                </h2>
                <p className="mt-2 font-heading italic font-light" style={{ fontSize: 'var(--text-base)', color: 'var(--color-terra)' }}>
                  {step.sub}
                </p>
              </Col>
              <Col span={4} start={7}>
                <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
                  {step.body}
                </p>
                <p className="mt-4 font-mono text-xs" style={{ color: 'var(--color-ink-subtle)' }}>
                  → {step.example}
                </p>
              </Col>
            </Grid>
          ))}
        </Container>
      </section>

      {/* Org Mindset */}
      <section className="py-32" style={{ backgroundColor: 'var(--color-surface)' }}>
        <Container>
          <Grid>
            <Col span={6} start={4} className="text-center">
              <Tag>Organisationales Mindset</Tag>
              <p
                className="mt-8 font-display font-light text-ink balance"
                style={{ fontSize: 'var(--text-md)', lineHeight: '1.2', letterSpacing: '-0.02em' }}
              >
                Die Organisation bekommt eine Arbeitsweise und Methoden vermittelt,
                neu mit ihren Spannungen umzugehen und sich selbst weiterzuentwickeln.
              </p>
              <div className="mt-12">
                <Button variant="primary">Shift starten</Button>
              </div>
            </Col>
          </Grid>
        </Container>
      </section>

    </main>
  )
}
