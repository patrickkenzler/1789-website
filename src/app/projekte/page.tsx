import Link from 'next/link'
import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'
import { Button } from '@/components/atoms/Button'
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
    <main>

      {/* ─── Page Hero ─────────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop:      'calc(5rem + 5rem)',
          paddingBottom:   'clamp(4rem, 7vw, 6rem)',
          backgroundColor: 'var(--color-background)',
        }}
      >
        <Container>
          <Grid>
            <Col span={9}>
              <Tag>Shift Cases</Tag>
              <h1
                className="page-hero-h1"
                style={{
                  fontFamily:    'var(--font-display)',
                  fontWeight:    600,
                  fontSize:      'clamp(3rem, 7vw, 6.5rem)',
                  lineHeight:    0.92,
                  letterSpacing: '-0.03em',
                  color:         'var(--color-ink)',
                  marginTop:     '1.75rem',
                }}
              >
                Organisationen,{' '}
                <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-terra)' }}>
                  die den Shift gewagt haben.
                </em>
              </h1>
            </Col>
          </Grid>
          <Grid className="stack-cols" style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <Col span={7} start={4}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   'var(--text-base)',
                  lineHeight: 1.75,
                  color:      'var(--color-ink-muted)',
                  maxWidth:   '64ch',
                }}
              >
                Jedes Engagement beginnt mit einer ehrlichen Diagnose des Gaps.
                Was hier folgt, sind keine Erfolgsgeschichten — sondern
                Erkenntnisse aus echter Transformation.
              </p>
            </Col>
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
          <div className="cases-featured-grid">
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
                    className="font-display"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: '1.05', letterSpacing: '-0.02em', color: 'var(--color-background)', fontWeight: 500 }}
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
              className="font-display text-ink"
              style={{ fontSize: 'var(--text-md)', letterSpacing: '-0.02em', fontWeight: 500 }}
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
                      fontWeight: 500,
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

      {/* ─── Closing CTA ──────────────────────────────────────────────────── */}
      <section
        style={{
          paddingBlock:    'clamp(5rem, 10vw, 8rem)',
          backgroundColor: 'var(--color-terra)',
        }}
      >
        <Container>
          <Grid>
            <Col span={8} start={3} className="text-center">
              <p
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      'var(--text-xxs)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color:         'rgba(242,239,232,0.65)',
                  margin:        0,
                }}
              >
                Bereit zur Diagnose?
              </p>
              <h2
                style={{
                  fontFamily:    'var(--font-display)',
                  fontWeight:    600,
                  fontSize:      'clamp(2.5rem, 6vw, 5rem)',
                  lineHeight:    1,
                  letterSpacing: '-0.03em',
                  color:         'var(--color-background)',
                  marginTop:     '1.5rem',
                }}
              >
                Jede Transformation<br />
                <em style={{ fontStyle: 'italic', fontWeight: 400, opacity: 0.82 }}>beginnt mit dem Gap.</em>
              </h2>
              <p
                style={{
                  fontFamily:   'var(--font-body)',
                  fontSize:     'var(--text-sub)',
                  lineHeight:   1.7,
                  color:        'rgba(242,239,232,0.65)',
                  marginTop:    '1.5rem',
                  maxWidth:     '44ch',
                  marginInline: 'auto',
                }}
              >
                Das Erstgespräch dient der gegenseitigen Erkenntnis. Kein Pitch. Kein Sales-Deck.
              </p>
              <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
                <Link href="/kontakt">
                  <Button
                    variant="ghost"
                    size="lg"
                    style={{ borderColor: 'var(--color-background)', color: 'var(--color-background)' }}
                  >
                    Erstgespräch anfragen
                  </Button>
                </Link>
              </div>
            </Col>
          </Grid>
        </Container>
      </section>

    </main>
  )
}
