import { Container, Grid, Col } from '@/components/layout/Grid'
import { Button } from '@/components/atoms/Button'
import { Tag } from '@/components/atoms/Tag'
import { featuredCases } from '@/data/cases'
import { HeroLogo } from '@/components/organisms/HeroLogo'
import { QuestionsTicker } from '@/components/molecules/QuestionsTicker'
import { ClientLogoCarousel } from '@/components/molecules/ClientLogoCarousel'
import { CollagePanel } from '@/components/molecules/CollagePanel'

// ─── Data ────────────────────────────────────────────────────────────────────

const pillars = [
  {
    num: '01',
    title: 'Structure',
    body: 'Wir schaffen für unsere Kunden ein neues Organisationsverständnis auf Struktur- und Strategieebene.',
  },
  {
    num: '02',
    title: 'Strategy',
    body: 'Den bestehenden Gap sichtbar, beschreibbar und besprechbar machen – Erkenntnis als Ausgangspunkt jeder Veränderung.',
  },
  {
    num: '03',
    title: 'Gap',
    body: 'Wir treten für erfolgreiche Organisationen an. Das, was andere als Problem sehen, sehen wir als Lösung.',
  },
]

const approach = [
  {
    icon: '◎',
    title: 'Analyse & Erkenntnis',
    body: 'Eine Organisation kann nur Dinge erkennen und ändern, um die sie weiß. Wir setzen sie in die Lage, sich in ihrem System zu erkennen.',
  },
  {
    icon: '⟳',
    title: 'Change by Action',
    body: 'Veränderung wird sofort Teil des Vorgehens. Die Transformation beginnt während – nicht nach – unserem Prozess.',
  },
  {
    icon: '◈',
    title: 'Responsibility',
    body: 'Wir gestalten verantwortungsgetriebene Operating Modelle. Verbindlichkeitsstrukturen als Basis nachhaltiger Wirkung.',
  },
  {
    icon: '↗',
    title: 'Iterate',
    body: 'Artefaktgetrieben, pragmatisch, partizipativ. Wir strapazieren Organisationen und fordern ihre Fähigkeit zur Veränderung.',
  },
]

const achievements = [
  {
    phase: 'Planning',
    items: ['Erkenntnis über den Gap', 'Vokabular für die Organisation', 'Operating Model Entwurf'],
  },
  {
    phase: 'Rollout',
    items: ['Prototypische Transformation', 'Artefaktgestützte Begleitung', 'Partizipative Umsetzung'],
  },
  {
    phase: 'Adjustment',
    items: ['Messbare Veränderung', 'Eigenständige Iteration', 'Organisationales Mindset'],
  },
]

// ─── Shared style for staggered display headlines ────────────────────────────

const displayStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 300,
  letterSpacing: '-0.03em',
  lineHeight: 0.92,
  color: 'var(--color-ink)',
  fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main>

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          height: '100svh',
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          overflow: 'hidden',
        }}
      >
        {/* ── Top bar ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingInline: 'var(--grid-margin)',
            paddingTop: '7rem',
            paddingBottom: '2rem',
          }}
        >
          <Tag>Structure · Strategy · Gap Consulting</Tag>
          <a href="/ansatz"><Button variant="text" style={{ fontSize: 'var(--text-xs)' }}>Unser Ansatz →</Button></a>
        </div>

        {/* ── HeroLogo + Claim (fills the 1fr row) ── */}
        <HeroLogo />

        {/* ── Bottom strip ── */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
          }}
        >
          <div
            style={{
              paddingInline: 'var(--grid-margin)',
              paddingBlock: '1.25rem',
              borderRight: '1px solid var(--color-border)',
              animation: 'slideInBottom 0.9s 0.4s var(--ease-expressive) both',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(1rem, 2vw, 1.625rem)',
                color: 'var(--color-terra)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              Management Consulting
            </p>
          </div>

          <div
            style={{
              paddingInline: 'var(--grid-margin)',
              paddingBlock: '1.25rem',
              borderRight: '1px solid var(--color-border)',
              animation: 'slideInBottom 0.9s 0.55s var(--ease-expressive) both',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sub)',
                color: 'var(--color-ink-muted)',
                lineHeight: '1.5',
              }}
            >
              Wie verändern Systeme für die Zukunft
            </p>
          </div>

          <div
            style={{
              paddingInline: 'var(--grid-margin)',
              paddingBlock: '1.25rem',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '1rem',
              animation: 'slideInBottom 0.9s 0.7s var(--ease-expressive) both',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xxs)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-subtle)',
              }}
            >
              Scroll
            </span>
            <div style={{ width: '1px', height: '2.5rem', backgroundColor: 'var(--color-border)' }} />
          </div>
        </div>
      </section>

      {/* ─── Ticker ───────────────────────────────────────────────────────── */}
      <div className="overflow-hidden py-4" style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="flex gap-16 whitespace-nowrap">
          {Array(4).fill([
            'Structure', 'Strategy', 'Gap Consulting', 'Operating Model',
            'Systemshift', 'Transformation', 'Wertschöpfungsfluss',
          ]).flat().map((item, i) => (
            <span key={i} className="inline-flex items-center gap-8 font-mono text-xs tracking-[0.12em] uppercase" style={{ color: 'var(--color-ink-subtle)' }}>
              {item}
              <span className="inline-block w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--color-terra)' }} />
            </span>
          ))}
        </div>
      </div>

      {/* ─── Dafür stehen wir ─────────────────────────────────────────────── */}
      <section style={{ paddingBlock: '7rem 5rem' }}>
        <Container>

          {/* ── Staggered editorial headline ── */}
          <div style={{ marginBottom: '5rem' }}>
            <Tag>Dafür stehen wir</Tag>
            <div style={{ marginTop: '3rem', overflow: 'hidden' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={displayStyle}>Ein neues Organisations&shy;verständnis —</span>
              </div>
              <div style={{ marginTop: '0.15em' }}>
                <span style={{ ...displayStyle, paddingLeft: '8%', fontStyle: 'italic', color: 'var(--color-terra)' }}>
                  auf Struktur- und Strategieebene.
                </span>
              </div>
            </div>
          </div>

          {/* ── Intro copy ── */}
          <Grid>
            <Col span={5} start={8}>
              <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
                Wir machen Organisationen und ihre Spannungen auf eine neue Art sichtbar.
                Durch Erkenntnis und Vokabular entsteht eine neue Möglichkeit,
                sich mit Problemen und Lösungen auseinanderzusetzen.
              </p>
            </Col>
          </Grid>

          {/* ── Pillars ── */}
          <Grid className="mt-20">
            {pillars.map((pillar) => (
              <Col key={pillar.num} span={4}>
                <div
                  className="p-10 h-full flex flex-col gap-8 group hover:-translate-y-1 transition-transform duration-300"
                  style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <span className="font-mono text-xs tracking-[0.15em]" style={{ color: 'var(--color-terra)' }}>
                    {pillar.num}
                  </span>
                  <h3
                    className="font-display font-light text-ink"
                    style={{ fontSize: 'var(--text-lg)', lineHeight: '1', letterSpacing: '-0.03em' }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="font-body text-ink-muted mt-auto" style={{ fontSize: 'var(--text-sub)', lineHeight: '1.6' }}>
                    {pillar.body}
                  </p>
                </div>
              </Col>
            ))}
          </Grid>
        </Container>
      </section>

      {/* ─── Client Logo Carousel ─────────────────────────────────────────── */}
      <ClientLogoCarousel />

      {/* ─── Highlight Cases ──────────────────────────────────────────────── */}
      <section style={{ paddingBlock: '7rem', backgroundColor: 'var(--color-ink)' }}>
        <Container>
          <Grid>
            <Col span={6}>
              <Tag variant="accent">Shift Cases</Tag>
              <h2
                className="mt-6 font-heading font-normal balance"
                style={{ fontSize: 'var(--text-md)', lineHeight: '1.1', letterSpacing: '-0.02em', color: 'var(--color-background)' }}
              >
                Organisationen,<br />die den Shift gewagt haben.
              </h2>
            </Col>
            <Col span={2} start={11} className="flex items-end justify-end">
              <a href="/projekte">
                <Button variant="ghost" size="sm" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'var(--color-background)' }}>
                  Alle Cases →
                </Button>
              </a>
            </Col>
          </Grid>

          <Grid className="mt-16">
            {featuredCases.map((c, i) => {
              const bgColors   = ['var(--color-terra)', 'rgba(255,255,255,0.06)', 'var(--color-sage)']
              const textColors = ['var(--color-background)', 'var(--color-background)', 'var(--color-ink)']
              const bg = bgColors[i % 3]
              const fg = textColors[i % 3]
              return (
                <a
                  key={c.slug}
                  href={`/projekte/${c.slug}`}
                  className="group p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    gridColumn:      'span 4',
                    backgroundColor: bg,
                    borderRadius:    'var(--radius-md)',
                    border:          '1px solid rgba(255,255,255,0.08)',
                    minHeight:       '340px',
                    textDecoration:  'none',
                  }}
                >
                  <div className="flex gap-2 flex-wrap">
                    {c.tags.slice(0, 1).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase px-3 py-1 rounded-full"
                        style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.7)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div>
                    <p className="font-mono text-[0.6rem] tracking-widest uppercase mb-2"
                      style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {c.client}
                    </p>
                    <h3
                      className="font-display font-light"
                      style={{ fontSize: 'var(--text-sm)', lineHeight: '1.15', color: fg }}
                    >
                      {c.title}
                    </h3>
                    <p className="mt-3 font-mono text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {c.duration} · {c.scale}
                    </p>
                  </div>
                </a>
              )
            })}
          </Grid>
        </Container>
      </section>

      {/* ─── Questions Ticker ─────────────────────────────────────────────── */}
      <QuestionsTicker />

      {/* ─── Denk Labor ───────────────────────────────────────────────────── */}
      <section style={{ paddingBlock: '7rem', backgroundColor: 'var(--color-surface)' }}>
        <Container>
          <Grid>
            <Col span={5}>
              <Tag>Denk Labor</Tag>
              <h2
                className="mt-6 font-display font-light text-ink balance"
                style={{ fontSize: 'var(--text-md)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
              >
                Podcast, Publikationen & Talks
              </h2>
              <p className="mt-6 font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
                Unser Denklabor — wo Organisationstheorie auf Praxis trifft.
              </p>
            </Col>
          </Grid>

          <Grid className="mt-16">
            <Col span={6}>
              <div
                className="group p-10 h-full cursor-pointer hover:-translate-y-1 transition-transform duration-300"
                style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
              >
                <span className="font-mono text-xs tracking-[0.12em] uppercase" style={{ color: 'var(--color-terra)' }}>
                  Podcast · Aktuelle Folge
                </span>
                <h3
                  className="mt-4 font-display font-light text-ink"
                  style={{ fontSize: 'var(--text-sm)', lineHeight: '1.2' }}
                >
                  [Podcast-Titel]<br />
                  <em className="font-heading italic text-ink-muted" style={{ fontSize: 'var(--text-base)' }}>
                    mit [Co-Podcaster Name]
                  </em>
                </h3>
                <div className="mt-8 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-terra)', color: 'white', fontSize: '0.75rem' }}
                  >
                    ▶
                  </div>
                  <span className="font-body text-ink-muted" style={{ fontSize: 'var(--text-sub)' }}>
                    Jetzt anhören
                  </span>
                </div>
                <p className="mt-6 font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--color-terra)' }}>
                  Von uns empfohlen ★
                </p>
              </div>
            </Col>

            <Col span={6}>
              <div className="flex flex-col gap-6 h-full">
                {[
                  { type: 'Publikation', title: '[Titel der aktuellen Publikation]', meta: 'Essay · Veröffentlicht 2025' },
                  { type: 'Talk',        title: '[Nächster Talk / Event-Name]',       meta: 'Vortrag · [Ort] · [Datum]' },
                ].map((item) => (
                  <div
                    key={item.type}
                    className="group flex-1 p-8 cursor-pointer hover:-translate-y-0.5 transition-transform duration-300"
                    style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
                  >
                    <span className="font-mono text-xs tracking-[0.12em] uppercase" style={{ color: 'var(--color-ink-subtle)' }}>
                      {item.type}
                    </span>
                    <h3
                      className="mt-3 font-heading font-normal text-ink"
                      style={{ fontSize: 'var(--text-base)', lineHeight: '1.4' }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-2 font-mono text-xs" style={{ color: 'var(--color-ink-subtle)' }}>
                      {item.meta}
                    </p>
                  </div>
                ))}
              </div>
            </Col>
          </Grid>
        </Container>
      </section>

      {/* ─── Unser Ansatz — sticky 2-col (foreverday pattern) ──────────── */}
      <section>
        {/* Section header inside container */}
        <Container>
          <div style={{ paddingBlock: '7rem 4rem' }}>
            <Grid>
              <Col span={5}>
                <Tag>Unser Ansatz</Tag>
                <h2
                  className="mt-6 font-display font-light text-ink balance"
                  style={{ fontSize: 'var(--text-md)', lineHeight: '1.0', letterSpacing: '-0.02em' }}
                >
                  Der Systemshift Cycle
                </h2>
                <p className="mt-6 font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.7' }}>
                  Wertschöpfungsfluss ist der Herzschlag unserer Projekte.
                  Wie organisiert man die Arbeit um die Wertschöpfung herum?
                </p>
              </Col>
            </Grid>
          </div>
        </Container>

        {/* Full-bleed sticky 2-col — collage left, items right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

          {/* LEFT: sticky abstract collage panel */}
          <div style={{ position: 'sticky', top: 0, height: '100svh' }}>
            <CollagePanel variant="analyse" />
          </div>

          {/* RIGHT: approach items, scrolls past the sticky panel */}
          <div style={{ paddingRight: 'var(--grid-margin)', paddingLeft: 'clamp(2rem, 4vw, 5rem)' }}>
            {approach.map((a, i) => {
              const variants = ['analyse', 'change', 'responsibility', 'iterate'] as const
              return (
                <div
                  key={a.title}
                  style={{ borderTop: '1px solid var(--color-border)', paddingBlock: 'clamp(3rem, 5vw, 5rem)' }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xxs)',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--color-terra)',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-md)',
                      fontWeight: 300,
                      lineHeight: 1.0,
                      letterSpacing: '-0.02em',
                      color: 'var(--color-ink)',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {a.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      color: 'var(--color-ink-muted)',
                      lineHeight: '1.7',
                      maxWidth: '38ch',
                    }}
                  >
                    {a.body}
                  </p>
                </div>
              )
            })}
            {/* CTA row below the last item */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingBlock: '3rem' }}>
              <a href="/ansatz"><Button variant="ghost">Ansatz im Detail →</Button></a>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Was wir erreichen ────────────────────────────────────────────── */}
      <section style={{ paddingBlock: '7rem', backgroundColor: 'var(--color-surface)' }}>
        <Container>

          {/* ── Staggered editorial headline ── */}
          <div style={{ marginBottom: '5rem' }}>
            <Tag>Was wir erreichen</Tag>
            <div style={{ marginTop: '3rem', overflow: 'hidden' }}>
              <div>
                <span style={{ ...displayStyle, paddingLeft: '4%' }}>Drei Dinge,</span>
              </div>
              <div style={{ marginTop: '0.15em', textAlign: 'right' }}>
                <span style={{ ...displayStyle, fontStyle: 'italic' }}>
                  die jede Transformation braucht.
                </span>
              </div>
            </div>
          </div>

          {/* ── Intro copy ── */}
          <Grid>
            <Col span={5} start={8}>
              <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
                Wir machen Organisationen und ihre Spannungen auf eine neue Art sichtbar.
                Wir setzen Transformation prototypisch, zielgetrieben, pragmatisch,
                partizipativ und effektiv um.
              </p>
            </Col>
          </Grid>

          <Grid className="mt-16">
            {achievements.map((a, i) => (
              <Col key={a.phase} span={4}>
                <div
                  className="p-10 h-full"
                  style={{
                    borderTop: `3px solid ${i === 0 ? 'var(--color-terra)' : i === 1 ? 'var(--color-sage)' : 'var(--color-ink)'}`,
                  }}
                >
                  <p className="font-mono text-xs tracking-[0.15em] uppercase mb-6" style={{ color: 'var(--color-ink-subtle)' }}>
                    Phase {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3
                    className="font-display font-light text-ink mb-8"
                    style={{ fontSize: 'var(--text-sm)', lineHeight: 1 }}
                  >
                    {a.phase}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {a.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span style={{ color: 'var(--color-terra)', marginTop: '3px' }}>·</span>
                        <span className="font-body text-ink-muted" style={{ fontSize: 'var(--text-sub)', lineHeight: '1.5' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}
          </Grid>
        </Container>
      </section>

      {/* ─── Calendar / Newsletter ────────────────────────────────────────── */}
      <section style={{ paddingBlock: '7rem' }}>
        <Container>
          <Grid>
            <Col span={6}>
              <Tag>News & Termine</Tag>
              <h2
                className="mt-6 font-heading font-normal text-ink balance"
                style={{ fontSize: 'var(--text-md)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
              >
                Upcoming Events & Neuigkeiten
              </h2>
            </Col>
            <Col span={4} start={9} className="flex items-end">
              <div
                className="w-full p-8"
                style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}
              >
                <p className="font-body text-ink-muted mb-4" style={{ fontSize: 'var(--text-sub)' }}>
                  Systemshift-Perspektiven direkt in Ihr Postfach.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Ihre E-Mail"
                    className="flex-1 px-4 py-3 font-body text-ink bg-transparent outline-none"
                    style={{
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-sub)',
                    }}
                  />
                  <Button variant="primary" size="sm">→</Button>
                </div>
              </div>
            </Col>
          </Grid>

          <div className="mt-16" style={{ borderTop: '1px solid var(--color-border)' }}>
            {[
              { date: '[TT.MM.JJJJ]', type: 'Talk',     title: '[Event-Titel Platzhalter]',    location: '[Ort]' },
              { date: '[TT.MM.JJJJ]', type: 'Workshop', title: '[Workshop-Titel Platzhalter]', location: '[Ort]' },
              { date: '[TT.MM.JJJJ]', type: 'Podcast',  title: '[Neue Episode Platzhalter]',   location: 'Online' },
            ].map((e, i) => (
              <div
                key={i}
                className="grid items-center py-6 hover:pl-4 transition-all duration-300 cursor-pointer group"
                style={{
                  gridTemplateColumns: '10rem 6rem 1fr 8rem',
                  gap: '2rem',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <span className="font-mono text-xs" style={{ color: 'var(--color-ink-subtle)' }}>{e.date}</span>
                <Tag>{e.type}</Tag>
                <span className="font-heading font-normal text-ink" style={{ fontSize: 'var(--text-base)' }}>{e.title}</span>
                <span className="font-mono text-xs text-right" style={{ color: 'var(--color-ink-subtle)' }}>{e.location}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Big typographic statement ────────────────────────────────────── */}
      {/*
        Inspired by diffferent's full-width staggered footer statement.
        Three lines alternating left/right, spanning full container width.
        No grid constraint — deliberately uses the full max-width.
      */}
      <section
        style={{
          paddingBlock: '8rem',
          borderTop: '1px solid var(--color-border)',
          overflow: 'hidden',
        }}
      >
        <Container>
          <div>
            {/* Line 1 — right */}
            <div style={{ textAlign: 'right' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.88,
                  color: 'var(--color-ink)',
                  fontSize: 'clamp(3rem, 8vw, 8rem)',
                }}
              >
                Transformation beginnt
              </span>
            </div>
            {/* Line 2 — left, indented */}
            <div style={{ marginTop: '0.08em' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.88,
                  color: 'var(--color-ink)',
                  fontSize: 'clamp(3rem, 8vw, 8rem)',
                  paddingLeft: '12%',
                }}
              >
                mit der Benennung
              </span>
            </div>
            {/* Line 3 — right, italic terra */}
            <div style={{ marginTop: '0.08em', textAlign: 'right' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.88,
                  color: 'var(--color-terra)',
                  fontSize: 'clamp(3rem, 8vw, 8rem)',
                }}
              >
                des Gaps.
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ paddingBlock: '7rem', backgroundColor: 'var(--color-terra)' }}>
        <Container>
          <Grid>
            <Col span={8} start={3} className="text-center">
              <p
                className="font-mono text-xs tracking-[0.2em] uppercase mb-8"
                style={{ color: 'rgba(242,242,242,0.6)' }}
              >
                Bereit für den Shift?
              </p>
              <h2
                className="font-display font-light balance"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  lineHeight: '1',
                  letterSpacing: '-0.03em',
                  color: 'var(--color-background)',
                }}
              >
                Let&apos;s shift{' '}
                <em className="font-display italic not-italic" style={{ opacity: 0.7 }}>
                  your
                </em>{' '}
                system.
              </h2>
              <p
                className="mt-8 font-body mx-auto max-w-lg"
                style={{ fontSize: 'var(--text-base)', lineHeight: '1.75', color: 'rgba(242,242,242,0.75)' }}
              >
                Wir haben es uns zum Anspruch gemacht, unseren Kunden ein neues Verständnis
                ihrer Organisation aufzuzeigen und gemeinsam wirksame Veränderungen zu entwerfen.
              </p>
              <div className="mt-12 flex items-center justify-center gap-6">
                <a href="/kontakt">
                  <Button
                    variant="ghost"
                    size="lg"
                    style={{ borderColor: 'var(--color-background)', color: 'var(--color-background)' }}
                  >
                    Erstgespräch vereinbaren
                  </Button>
                </a>
              </div>
            </Col>
          </Grid>
        </Container>
      </section>

    </main>
  )
}
