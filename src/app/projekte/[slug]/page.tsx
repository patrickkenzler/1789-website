import { notFound } from 'next/navigation'
import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'
import { cases, getCaseBySlug } from '@/data/cases'

export async function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }))
}

const colorMap = {
  terra:   { bg: 'var(--color-terra)',   text: 'var(--color-background)', muted: 'rgba(255,255,255,0.6)' },
  sage:    { bg: 'var(--color-sage)',    text: 'var(--color-ink)',        muted: 'rgba(26,23,20,0.55)' },
  ink:     { bg: 'var(--color-ink)',     text: 'var(--color-background)', muted: 'rgba(255,255,255,0.6)' },
  neutral: { bg: 'var(--color-surface)', text: 'var(--color-ink)',        muted: 'var(--color-ink-muted)' },
}

export default async function CaseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = getCaseBySlug(slug)
  if (!c) notFound()

  const colors = colorMap[c.color]
  const otherCases = cases.filter((x) => x.slug !== c.slug).slice(0, 3)

  return (
    <main>

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="pt-40 pb-24"
        style={{ backgroundColor: colors.bg }}
      >
        <Container>
          <div className="mb-8">
            <a
              href="/projekte"
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: colors.muted, textDecoration: 'none' }}
            >
              ← Shift Cases
            </a>
          </div>
          <Grid>
            <Col span={8}>
              <div className="flex gap-2 flex-wrap mb-8">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase px-3 py-1 rounded-full"
                    style={{
                      border: `1px solid ${c.color === 'neutral' ? 'var(--color-border)' : 'rgba(255,255,255,0.3)'}`,
                      color: colors.muted,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h1
                className="font-display font-light balance"
                style={{
                  fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                  lineHeight: '1',
                  letterSpacing: '-0.03em',
                  color: colors.text,
                }}
              >
                {c.title}
              </h1>
              <p
                className="mt-6 font-heading italic font-light"
                style={{ fontSize: 'var(--text-sm)', lineHeight: '1.3', color: colors.muted }}
              >
                {c.tagline}
              </p>
            </Col>
            <Col span={3} start={10} className="flex flex-col justify-end gap-6">
              {[
                { label: 'Mandant',  value: c.client },
                { label: 'Sektor',   value: c.sector },
                { label: 'Dauer',    value: c.duration },
                { label: 'Scope',    value: c.scale },
                { label: 'Lead',     value: c.lead },
              ].map((m) => (
                <div key={m.label}>
                  <p className="font-mono text-[0.6rem] tracking-widest uppercase" style={{ color: colors.muted }}>
                    {m.label}
                  </p>
                  <p className="font-body mt-0.5" style={{ fontSize: 'var(--text-sub)', color: colors.text }}>
                    {m.value}
                  </p>
                </div>
              ))}
            </Col>
          </Grid>
        </Container>
      </section>

      {/* ─── Narrative: Gap / Shift / Result ──────────────────────────────── */}
      <section className="py-32">
        <Container>

          {/* Der Gap */}
          <Grid className="pb-20" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <Col span={3}>
              <div className="flex items-center gap-4 sticky top-32">
                <span
                  className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: 'var(--color-terra)' }}
                >
                  Der Gap
                </span>
                <div className="h-px flex-1" style={{ backgroundColor: 'var(--color-terra)' }} />
              </div>
            </Col>
            <Col span={7} start={5}>
              <p
                className="font-display font-light text-ink balance"
                style={{ fontSize: 'var(--text-md)', lineHeight: '1.2', letterSpacing: '-0.02em' }}
              >
                {c.gap}
              </p>
            </Col>
          </Grid>

          {/* Der Shift */}
          <Grid className="py-20" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <Col span={3}>
              <div className="flex items-center gap-4 sticky top-32">
                <span
                  className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: 'var(--color-ink-subtle)' }}
                >
                  Der Shift
                </span>
                <div className="h-px flex-1" style={{ backgroundColor: 'var(--color-border)' }} />
              </div>
            </Col>
            <Col span={7} start={5}>
              <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.85' }}>
                {c.shift}
              </p>
            </Col>
          </Grid>

          {/* Das Ergebnis */}
          <Grid className="pt-20">
            <Col span={3}>
              <div className="flex items-center gap-4 sticky top-32">
                <span
                  className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: 'var(--color-sage-dark)' }}
                >
                  Das Ergebnis
                </span>
                <div className="h-px flex-1" style={{ backgroundColor: 'var(--color-sage)' }} />
              </div>
            </Col>
            <Col span={7} start={5}>
              <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.85' }}>
                {c.result}
              </p>

              {/* Quote */}
              {c.quote && (
                <blockquote
                  className="mt-16 p-10"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderLeft: '3px solid var(--color-terra)',
                  }}
                >
                  <p
                    className="font-heading italic font-light text-ink"
                    style={{ fontSize: 'var(--text-sm)', lineHeight: '1.4' }}
                  >
                    &ldquo;{c.quote.text}&rdquo;
                  </p>
                  <footer className="mt-6">
                    <p className="font-body font-medium text-ink" style={{ fontSize: 'var(--text-sub)' }}>
                      {c.quote.author}
                    </p>
                    <p className="font-mono text-xs mt-1" style={{ color: 'var(--color-ink-subtle)' }}>
                      {c.quote.role}
                    </p>
                  </footer>
                </blockquote>
              )}
            </Col>
          </Grid>

        </Container>
      </section>

      {/* ─── Weitere Cases ────────────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      >
        <Container>
          <p className="font-mono text-xs tracking-widest uppercase mb-12" style={{ color: 'var(--color-ink-subtle)' }}>
            Weitere Shifts
          </p>
          <Grid>
            {otherCases.map((other) => {
              const oc = colorMap[other.color]
              return (
                <Col key={other.slug} span={4}>
                  <a
                    href={`/projekte/${other.slug}`}
                    className="group flex flex-col justify-between cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                    style={{
                      backgroundColor: oc.bg,
                      borderRadius: 'var(--radius-md)',
                      padding: '2rem',
                      minHeight: '260px',
                      textDecoration: 'none',
                      border: other.color === 'neutral' ? '1px solid var(--color-border)' : 'none',
                    }}
                  >
                    <p
                      className="font-mono text-[0.6rem] tracking-widest uppercase"
                      style={{ color: other.color === 'neutral' ? 'var(--color-ink-subtle)' : 'rgba(255,255,255,0.5)' }}
                    >
                      {other.client}
                    </p>
                    <div>
                      <h3
                        className="font-display font-light"
                        style={{
                          fontSize: 'var(--text-base)',
                          lineHeight: '1.2',
                          color: oc.text,
                        }}
                      >
                        {other.title}
                      </h3>
                      <p
                        className="mt-2 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ color: oc.text }}
                      >
                        Mehr →
                      </p>
                    </div>
                  </a>
                </Col>
              )
            })}
          </Grid>
        </Container>
      </section>

    </main>
  )
}
