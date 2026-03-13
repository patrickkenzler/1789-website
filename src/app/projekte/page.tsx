import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'
import { cases } from '@/data/cases'

const allTags = Array.from(new Set(cases.flatMap((c) => c.tags)))

// ── Color helpers ─────────────────────────────────────────────────────────────
const accentFor: Record<string, string> = {
  terra:   'var(--color-terra)',
  sage:    'var(--color-sage-dark)',
  ink:     'var(--color-ink)',
  neutral: 'var(--color-ink-subtle)',
}

export default function Projekte() {
  // Split into featured (first 2) + list (rest)
  const featured = cases.slice(0, 2)
  const list     = cases.slice(2)

  return (
    <main className="pt-40">

      {/* ─── Page Hero — staggered h1 ─────────────────────────────────────── */}
      <section style={{ paddingBottom: '6rem' }}>
        <Container>
          <Tag>Shift Cases</Tag>

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
                  paddingLeft: '5%',
                }}
              >
                Organisationen,
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
                die den Shift gewagt haben.
              </h1>
            </div>
          </div>

          {/* Stats + lead copy */}
          <Grid className="mt-16">
            <Col span={4} start={9}>
              <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-sub)', lineHeight: '1.6' }}>
                Jedes Engagement beginnt mit einer ehrlichen Diagnose des Gaps.
                Was hier folgt, sind keine Erfolgsgeschichten — sondern
                Erkenntnisse aus echter Transformation.
              </p>
            </Col>
          </Grid>

          {/* Stats row */}
          <Grid className="mt-16">
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

      {/* ─── Featured cases — large cards ────────────────────────────────── */}
      <section style={{ paddingBlock: '5rem', backgroundColor: 'var(--color-ink)' }}>
        <Container>
          <p
            className="font-body uppercase tracking-widest mb-10"
            style={{ fontSize: 'var(--text-xxs)', color: 'rgba(242,237,230,0.4)', fontWeight: 500 }}
          >
            ★ Highlight Cases
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
            }}
          >
            {featured.map((c) => (
              <a
                key={c.slug}
                href={`/projekte/${c.slug}`}
                className="group flex flex-col justify-between"
                style={{
                  backgroundColor: c.color === 'terra' ? 'var(--color-terra)' : 'rgba(255,255,255,0.06)',
                  borderRadius: 'var(--radius-md)',
                  padding: '3rem',
                  minHeight: '400px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'transform 300ms',
                }}
              >
                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                  {c.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase px-3 py-1 rounded-full"
                      style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.65)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {/* Content */}
                <div>
                  <p className="font-mono text-[0.6rem] tracking-widest uppercase mb-3"
                    style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {c.client} · {c.sector}
                  </p>
                  <h2
                    className="font-display font-light"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: '1.05', letterSpacing: '-0.02em', color: 'var(--color-background)' }}
                  >
                    {c.title}
                  </h2>
                  <p className="mt-3 font-heading italic font-light"
                    style={{ fontSize: 'var(--text-sub)', color: 'rgba(255,255,255,0.6)' }}>
                    {c.tagline}
                  </p>
                  <div className="mt-6 flex gap-6">
                    {[{ label: 'Dauer', value: c.duration }, { label: 'Scope', value: c.scale }].map((m) => (
                      <div key={m.label}>
                        <p className="font-mono text-[0.6rem] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>{m.label}</p>
                        <p className="font-mono text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Filter bar ───────────────────────────────────────────────────── */}
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

      {/* ─── All cases — editorial list (diffferent style) ────────────────── */}
      <section style={{ paddingBlock: '4rem 7rem' }}>
        <Container>

          {/* Section heading */}
          <div
            className="flex items-center justify-between mb-12"
            style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem' }}
          >
            <h2
              className="font-display font-light text-ink"
              style={{ fontSize: 'var(--text-md)', letterSpacing: '-0.02em' }}
            >
              Alle Cases
            </h2>
            <span
              className="font-body uppercase tracking-widest"
              style={{ fontSize: 'var(--text-xxs)', color: 'var(--color-ink-subtle)', fontWeight: 500 }}
            >
              {cases.length} Engagements
            </span>
          </div>

          {/* Editorial list rows */}
          <div>
            {list.map((c) => (
              <a
                key={c.slug}
                href={`/projekte/${c.slug}`}
                className="group"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '3rem',
                  alignItems: 'center',
                  paddingBlock: '2.5rem',
                  borderBottom: '1px solid var(--color-border)',
                  textDecoration: 'none',
                  transition: 'padding-left 300ms var(--ease-expressive)',
                }}
              >
                {/* Left: meta + title + tagline */}
                <div>
                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    {c.tags.slice(0, 2).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  {/* Title — large editorial serif */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 300,
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      color: 'var(--color-ink)',
                      fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                      transition: 'color 200ms',
                    }}
                  >
                    {c.title}
                  </h3>
                  {/* Tagline — italic serif */}
                  <p
                    className="mt-3 font-heading italic font-light"
                    style={{ fontSize: 'var(--text-base)', color: 'var(--color-ink-muted)', lineHeight: '1.4' }}
                  >
                    {c.tagline}
                  </p>
                  {/* Meta */}
                  <p className="mt-4 font-mono text-xs" style={{ color: 'var(--color-ink-subtle)' }}>
                    {c.client} · {c.sector} · {c.duration}
                  </p>
                </div>

                {/* Right: accent block + arrow */}
                <div className="flex flex-col items-end gap-4">
                  {/* Color accent — small square in case color */}
                  <div
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: accentFor[c.color] || 'var(--color-ink-subtle)',
                      opacity: 0.85,
                    }}
                  />
                  {/* Arrow */}
                  <span
                    className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: 'var(--color-terra)', fontSize: '1.25rem' }}
                  >
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ paddingBlock: '7rem', borderTop: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <Container>
          {/* Staggered closing question */}
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ textAlign: 'right' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.9,
                  color: 'var(--color-ink)',
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                }}
              >
                Jede Transformation
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
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  paddingLeft: '14%',
                }}
              >
                beginnt mit der ehrlichen
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
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                }}
              >
                Benennung des Gaps.
              </span>
            </div>
          </div>

          <Grid>
            <Col span={4}>
              <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
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
