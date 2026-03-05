import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'

const cases = [
  { tag: 'Strategie',      title: 'Karrieremodell vs. Strategy Goals',      scope: 'Defining the Gap · 6 Monate',     status: 'Aktuell' },
  { tag: 'Transformation', title: 'Eigenverantwortung vs. Hierarchie',       scope: 'Operating Model · 8 Monate',      status: 'Aktuell' },
  { tag: 'Struktur',       title: 'Wertschöpfungsfluss Redesign',            scope: 'Structure Workshop · 4 Monate',   status: 'Abgeschlossen' },
  { tag: 'Benchmark',      title: 'Benchmark & Gap Analyse',                 scope: 'Benchmark · 3 Monate',            status: 'Abgeschlossen' },
  { tag: 'Pilotierung',    title: 'Mission Board Meeting Design',             scope: 'Artefakt-getrieben · laufend',    status: 'Aktuell' },
  { tag: 'Operating Model','title': 'Check & Balance Strukturen',             scope: 'Responsibility Model · 5 Monate', status: 'Abgeschlossen' },
]

export default function Projekte() {
  return (
    <main className="pt-40">

      <section className="pb-24">
        <Container>
          <Grid>
            <Col span={8}>
              <Tag>Shift Cases</Tag>
              <h1
                className="mt-8 font-display font-light text-ink balance"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1', letterSpacing: '-0.03em' }}
              >
                Aktuelle Kunden.<br />
                <em className="font-display italic not-italic" style={{ color: 'var(--color-terra)' }}>
                  Echte Veränderung.
                </em>
              </h1>
            </Col>
            <Col span={4} start={9} className="flex items-end">
              <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-sub)', lineHeight: '1.6' }}>
                Fiktive oder echte Projektnamen — echter Scope, echte Methodik, echte Wirkung.
              </p>
            </Col>
          </Grid>
        </Container>
      </section>

      {/* Filter Tags */}
      <section style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <Container>
          <div className="py-4 flex items-center gap-3">
            {['Alle', 'Strategie', 'Transformation', 'Struktur', 'Operating Model', 'Benchmark', 'Pilotierung'].map((f) => (
              <button
                key={f}
                className="font-mono text-xs tracking-widest uppercase px-4 py-2 transition-all duration-200"
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-full)',
                  color: f === 'Alle' ? 'var(--color-white)' : 'var(--color-ink-muted)',
                  backgroundColor: f === 'Alle' ? 'var(--color-ink)' : 'transparent',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Cases Grid */}
      <section className="py-16">
        <Container>
          <Grid>
            {cases.map((c, i) => (
              <Col key={i} span={4} className="mb-6">
                <div
                  className="group p-8 flex flex-col gap-6 cursor-pointer hover:-translate-y-1 transition-transform duration-300 h-full"
                  style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
                >
                  <div className="flex items-center justify-between">
                    <Tag>{c.tag}</Tag>
                    <span
                      className="font-mono text-xs"
                      style={{ color: c.status === 'Aktuell' ? 'var(--color-terra)' : 'var(--color-ink-subtle)' }}
                    >
                      ● {c.status}
                    </span>
                  </div>
                  <h3
                    className="font-display font-light text-ink flex-1"
                    style={{ fontSize: 'var(--text-sm)', lineHeight: '1.2' }}
                  >
                    {c.title}
                  </h3>
                  <p className="font-mono text-xs" style={{ color: 'var(--color-ink-subtle)' }}>
                    {c.scope}
                  </p>
                </div>
              </Col>
            ))}
          </Grid>
        </Container>
      </section>

    </main>
  )
}
