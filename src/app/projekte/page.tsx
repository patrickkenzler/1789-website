import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'
import { cases } from '@/data/cases'

const colorMap = {
  terra:   { bg: 'var(--color-terra)',   text: 'var(--color-background)' },
  sage:    { bg: 'var(--color-sage)',    text: 'var(--color-ink)' },
  ink:     { bg: 'var(--color-ink)',     text: 'var(--color-background)' },
  neutral: { bg: 'var(--color-surface)', text: 'var(--color-ink)' },
}

const allTags = Array.from(new Set(cases.flatMap((c) => c.tags)))

export default function Projekte() {
  return (
    <main className="pt-40">

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pb-24">
        <Container>
          <Grid>
            <Col span={7}>
              <Tag>Shift Cases</Tag>
              <h1
                className="mt-8 font-display font-light text-ink balance"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1', letterSpacing: '-0.03em' }}
              >
                Organisationen,<br />
                <em className="not-italic font-display italic" style={{ color: 'var(--color-terra)' }}>
                  die den Shift gewagt haben.
                </em>
              </h1>
            </Col>
            <Col span={4} start={9} className="flex items-end">
              <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-sub)', lineHeight: '1.6' }}>
                Jedes Engagement beginnt mit einer ehrlichen Diagnose des Gaps.
                Was hier folgt, sind keine Erfolgsgeschichten — sondern
                Erkenntnisse aus echter Transformation.
              </p>
            </Col>
          </Grid>

          {/* Stats */}
          <Grid className="mt-20">
            {[
              { value: '8',    label: 'Abgeschlossene Projekte' },
              { value: '~40', label: 'Monate Ø Projektdauer' },
              { value: '3+',   label: 'Sektoren' },
              { value: '100%', label: 'Partizipativ entwickelt' },
            ].map((s) => (
              <Col key={s.label} span={3}>
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                  <p
                    className="font-display font-light text-ink"
                    style={{ fontSize: 'var(--text-lg)', lineHeight: 1, letterSpacing: '-0.03em' }}
                  >
                    {s.value}
                  </p>
                  <p className="mt-2 font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--color-ink-subtle)' }}>
                    {s.label}
                  </p>
                </div>
              </Col>
            ))}
          </Grid>
        </Container>
      </section>

      {/* ─── Filter ───────────────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <Container>
          <div className="py-4 flex items-center gap-3 flex-wrap">
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--color-ink-subtle)' }}>
              Filter:
            </span>
            {['Alle', ...allTags].map((f) => (
              <button
                key={f}
                className="font-mono text-xs tracking-widest uppercase px-4 py-1.5 transition-all duration-200"
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-full)',
                  color: f === 'Alle' ? 'var(--color-white)' : 'var(--color-ink-muted)',
                  backgroundColor: f === 'Alle' ? 'var(--color-ink)' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* ─── Cases Grid ───────────────────────────────────────────────────── */}
      <section className="py-24">
        <Container>
          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' }}>
            {cases.map((c, i) => {
              const colors = colorMap[c.color]
              const isWide = i === 0 || i === 5  // erste und sechste Karte breit
              return (
                <a
                  key={c.slug}
                  href={`/projekte/${c.slug}`}
                  className="group flex flex-col justify-between cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    gridColumn: isWide ? 'span 7' : 'span 5',
                    backgroundColor: colors.bg,
                    borderRadius: 'var(--radius-md)',
                    padding: '2.5rem',
                    minHeight: '360px',
                    textDecoration: 'none',
                    border: c.color === 'neutral' ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  {/* Top */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-2 flex-wrap">
                      {c.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase px-3 py-1 rounded-full"
                          style={{
                            border: `1px solid ${c.color === 'neutral' ? 'var(--color-border)' : 'rgba(255,255,255,0.25)'}`,
                            color: c.color === 'neutral' ? 'var(--color-ink-muted)' : 'rgba(255,255,255,0.75)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span
                      className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: colors.text }}
                    >
                      →
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <p
                      className="font-mono text-xs tracking-widest uppercase mb-3"
                      style={{ color: c.color === 'neutral' ? 'var(--color-ink-subtle)' : 'rgba(255,255,255,0.5)' }}
                    >
                      {c.client} · {c.sector}
                    </p>
                    <h2
                      className="font-display font-light balance"
                      style={{
                        fontSize: isWide ? 'var(--text-md)' : 'var(--text-sm)',
                        lineHeight: '1.1',
                        letterSpacing: '-0.02em',
                        color: colors.text,
                      }}
                    >
                      {c.title}
                    </h2>
                    <p
                      className="mt-3 font-heading italic font-light"
                      style={{
                        fontSize: 'var(--text-sub)',
                        lineHeight: '1.4',
                        color: c.color === 'neutral' ? 'var(--color-ink-muted)' : 'rgba(255,255,255,0.65)',
                      }}
                    >
                      {c.tagline}
                    </p>

                    {/* Meta */}
                    <div className="mt-6 flex gap-6">
                      {[
                        { label: 'Dauer', value: c.duration },
                        { label: 'Scope', value: c.scale },
                      ].map((m) => (
                        <div key={m.label}>
                          <p className="font-mono text-[0.6rem] tracking-widest uppercase"
                            style={{ color: c.color === 'neutral' ? 'var(--color-ink-subtle)' : 'rgba(255,255,255,0.4)' }}>
                            {m.label}
                          </p>
                          <p className="font-mono text-xs mt-0.5"
                            style={{ color: c.color === 'neutral' ? 'var(--color-ink-muted)' : 'rgba(255,255,255,0.7)' }}>
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Container>
          <Grid>
            <Col span={6} start={4} className="text-center">
              <p className="font-mono text-xs tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--color-ink-subtle)' }}>
                Ihr Projekt
              </p>
              <h2
                className="font-display font-light text-ink balance"
                style={{ fontSize: 'var(--text-md)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
              >
                Jede Transformation beginnt mit der ehrlichen Benennung des Gaps.
              </h2>
              <p className="mt-6 font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
                Das Erstgespräch dient der gegenseitigen Erkenntnis.
                Kein Pitch. Kein Sales-Deck.
              </p>
              <div className="mt-10">
                <a
                  href="/kontakt"
                  className="inline-flex items-center gap-3 font-body font-medium text-xs tracking-[0.15em] uppercase px-8 py-4 transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--color-ink)',
                    color: 'var(--color-background)',
                    borderRadius: 0,
                  }}
                >
                  Erstgespräch anfragen
                </a>
              </div>
            </Col>
          </Grid>
        </Container>
      </section>

    </main>
  )
}
