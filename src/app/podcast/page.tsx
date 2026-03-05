import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'

const episodes = Array(6).fill(null).map((_, i) => ({
  num: String(i + 1).padStart(2, '0'),
  title: `[Episode ${i + 1} Titel Platzhalter]`,
  guest: '[Gast Name]',
  tags: ['Transformation', 'Operating Model'].slice(0, (i % 2) + 1),
  duration: `${40 + i * 5} Min`,
  featured: i === 0,
}))

export default function Podcast() {
  return (
    <main className="pt-40">

      <section className="pb-24">
        <Container>
          <Grid>
            <Col span={7}>
              <Tag>Podcast</Tag>
              <h1
                className="mt-8 font-display font-light text-ink balance"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1', letterSpacing: '-0.03em' }}
              >
                [Podcast-Name]
              </h1>
              <p className="mt-6 font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
                Organisationstheorie trifft Praxis. Gespräche über Systemshift, Führung und
                die Kunst, Organisationen wirklich zu verändern.
              </p>
            </Col>
          </Grid>
        </Container>
      </section>

      {/* Featured / Aktuelle Folge */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-ink)' }}>
        <Container>
          <Grid>
            <Col span={7}>
              <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--color-terra)' }}>
                ★ Von uns empfohlen · Aktuelle Folge
              </p>
              <h2
                className="font-display font-light balance"
                style={{ fontSize: 'var(--text-md)', lineHeight: '1.1', color: 'var(--color-background)' }}
              >
                {episodes[0].title}
              </h2>
              <p className="mt-3 font-heading italic" style={{ fontSize: 'var(--text-base)', color: 'rgba(242,237,230,0.6)' }}>
                mit {episodes[0].guest}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <button
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110"
                  style={{ backgroundColor: 'var(--color-terra)', color: 'white' }}
                >
                  ▶
                </button>
                <span className="font-mono text-xs" style={{ color: 'rgba(242,237,230,0.5)' }}>
                  {episodes[0].duration}
                </span>
              </div>
            </Col>
          </Grid>
        </Container>
      </section>

      {/* Alle Folgen */}
      <section className="py-24">
        <Container>
          {/* Filter */}
          <div className="flex items-center gap-3 mb-12">
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--color-ink-subtle)' }}>
              Filter:
            </span>
            {['Alle', 'Transformation', 'Operating Model', 'Führung', 'Strategie'].map((f) => (
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

          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {episodes.map((ep) => (
              <div
                key={ep.num}
                className="group grid items-center py-6 hover:pl-4 cursor-pointer transition-all duration-300"
                style={{
                  gridTemplateColumns: '3rem 1fr auto 6rem',
                  gap: '2rem',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <span className="font-mono text-xs" style={{ color: 'var(--color-terra)' }}>
                  {ep.num}
                </span>
                <div>
                  <h3 className="font-heading font-normal text-ink" style={{ fontSize: 'var(--text-base)' }}>
                    {ep.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs" style={{ color: 'var(--color-ink-subtle)' }}>
                    mit {ep.guest}
                  </p>
                </div>
                <div className="flex gap-2">
                  {ep.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
                <span className="font-mono text-xs text-right" style={{ color: 'var(--color-ink-subtle)' }}>
                  {ep.duration}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

    </main>
  )
}
