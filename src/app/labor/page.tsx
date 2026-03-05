import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'

const items = [
  { type: 'Essay',       title: '[Publikations-Titel Platzhalter]',  date: '[Datum]', readTime: '8 Min', tags: ['Transformation', 'Strategie'] },
  { type: 'Podcast',     title: '[Episode-Titel Platzhalter]',        date: '[Datum]', readTime: '45 Min', tags: ['Operating Model'] },
  { type: 'Talk',        title: '[Talk-Titel Platzhalter]',           date: '[Datum]', readTime: '20 Min', tags: ['Führung'] },
  { type: 'Essay',       title: '[Essay-Titel Platzhalter]',          date: '[Datum]', readTime: '12 Min', tags: ['Gap', 'Struktur'] },
  { type: 'Publikation', title: '[Publikations-Titel Platzhalter]',   date: '[Datum]', readTime: '30 Min', tags: ['Systemshift'] },
  { type: 'Talk',        title: '[Conference-Titel Platzhalter]',     date: '[Datum]', readTime: '40 Min', tags: ['Transformation'] },
]

export default function Labor() {
  return (
    <main className="pt-40">

      <section className="pb-24">
        <Container>
          <Grid>
            <Col span={7}>
              <Tag>Denk Labor</Tag>
              <h1
                className="mt-8 font-display font-light text-ink balance"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1', letterSpacing: '-0.03em' }}
              >
                Podcast, Publikationen<br />
                <em className="font-display italic not-italic" style={{ color: 'var(--color-terra)' }}>&amp; Talks</em>
              </h1>
            </Col>
            <Col span={4} start={9} className="flex items-end">
              <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-sub)', lineHeight: '1.6' }}>
                Wo Organisationstheorie auf Praxis trifft.
                Unsere veröffentlichten Gedanken, Experimente und Erkenntnisse.
              </p>
            </Col>
          </Grid>
        </Container>
      </section>

      {/* Filter */}
      <section style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <Container>
          <div className="py-4 flex items-center gap-3">
            {['Alle', 'Essay', 'Podcast', 'Talk', 'Publikation'].map((f) => (
              <button
                key={f}
                className="font-mono text-xs tracking-widest uppercase px-4 py-2"
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

      <section className="py-16">
        <Container>
          <Grid>
            {items.map((item, i) => (
              <Col key={i} span={i === 0 ? 8 : 4} className="mb-6">
                <div
                  className="group p-8 flex flex-col gap-6 cursor-pointer hover:-translate-y-1 transition-transform duration-300 h-full"
                  style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: i === 0 ? 'var(--color-surface)' : 'transparent',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <Tag>{item.type}</Tag>
                    <span className="font-mono text-xs" style={{ color: 'var(--color-ink-subtle)' }}>{item.date}</span>
                  </div>
                  <h3
                    className="font-display font-light text-ink flex-1"
                    style={{
                      fontSize: i === 0 ? 'var(--text-md)' : 'var(--text-base)',
                      lineHeight: '1.2',
                    }}
                  >
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {item.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                    </div>
                    <span className="font-mono text-xs" style={{ color: 'var(--color-ink-subtle)' }}>
                      {item.readTime}
                    </span>
                  </div>
                </div>
              </Col>
            ))}
          </Grid>
        </Container>
      </section>

    </main>
  )
}
