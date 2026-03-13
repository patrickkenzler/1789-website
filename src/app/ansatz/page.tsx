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

      {/* ── Page Hero — staggered editorial headline ── */}
      <section style={{ paddingBottom: '6rem' }}>
        <Container>

          {/* Tag */}
          <Tag>Unser Ansatz</Tag>

          {/* Staggered h1 — two lines alternating right / left */}
          <div style={{ marginTop: '3rem', overflow: 'hidden' }}>
            <div style={{ textAlign: 'right' }}>
              <h1
                style={{
                  display: 'inline',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.92,
                  color: 'var(--color-ink)',
                  fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                }}
              >
                Der Systemshift
              </h1>
            </div>
            <div style={{ marginTop: '0.08em' }}>
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
                  paddingLeft: '10%',
                }}
              >
                Cycle.
              </h1>
            </div>
          </div>

          {/* Lead copy — aligned right, offset from headline */}
          <Grid className="mt-16">
            <Col span={5} start={8}>
              <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
                Wertschöpfungsfluss ist der Herzschlag unserer Projekte.
                Wie organisiert man die Arbeit um die Wertschöpfung herum?
                Das ist die zentrale Frage hinter jedem unserer Engagements.
              </p>
            </Col>
          </Grid>
        </Container>
      </section>

      {/* ── Cycle Steps ── */}
      <section style={{ borderTop: '1px solid var(--color-border)' }}>
        <Container>
          {cycle.map((step) => (
            <Grid
              key={step.num}
              className="py-16"
              style={{ borderBottom: '1px solid var(--color-border)' }}
            >
              <Col span={1}>
                <span className="font-mono text-xs" style={{ color: 'var(--color-terra)' }}>{step.num}</span>
              </Col>
              <Col span={4}>
                {/* Large editorial h2 for each cycle step */}
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    color: 'var(--color-ink)',
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  }}
                >
                  {step.title}
                </h2>
                <p
                  className="mt-3 font-heading italic font-light"
                  style={{ fontSize: 'var(--text-base)', color: 'var(--color-terra)' }}
                >
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

      {/* ── Org Mindset — staggered closing statement ── */}
      <section style={{ paddingBlock: '8rem', backgroundColor: 'var(--color-surface)', overflow: 'hidden' }}>
        <Container>

          {/* Staggered editorial statement */}
          <div style={{ marginBottom: '4rem' }}>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.9,
                  color: 'var(--color-ink)',
                  fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
                  paddingLeft: '5%',
                }}
              >
                Die Organisation lernt,
              </span>
            </div>
            <div style={{ marginTop: '0.1em', textAlign: 'right' }}>
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
                sich selbst neu zu sehen —
              </span>
            </div>
            <div style={{ marginTop: '0.1em' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.9,
                  color: 'var(--color-terra)',
                  fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
                  paddingLeft: '18%',
                }}
              >
                und sich eigenständig weiterzuentwickeln.
              </span>
            </div>
          </div>

          {/* Tag label + CTA below */}
          <Grid className="mt-20">
            <Col span={4}>
              <Tag>Organisationales Mindset</Tag>
              <p className="mt-6 font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
                Die Organisation bekommt eine Arbeitsweise und Methoden vermittelt,
                neu mit ihren Spannungen umzugehen und sich selbst weiterzuentwickeln.
              </p>
              <div className="mt-10">
                <Button variant="primary">Shift starten</Button>
              </div>
            </Col>
          </Grid>
        </Container>
      </section>

    </main>
  )
}
