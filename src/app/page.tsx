import { Container, Grid, Col } from '@/components/layout/Grid'
import { Button } from '@/components/atoms/Button'
import { Tag } from '@/components/atoms/Tag'
import { featuredCases } from '@/data/cases'

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

const cases = [
  { tag: 'Strategie',      title: 'Karrieremodell\nvs. Strategy Goals',     scope: 'Defining the Gap · 6 Monate' },
  { tag: 'Transformation', title: 'Eigenverantwortung\nvs. Hierarchie',       scope: 'Operating Model · 8 Monate' },
  { tag: 'Struktur',       title: 'Wertschöpfungs-\nfluss Redesign',          scope: 'Structure Workshop · 4 Monate' },
  { tag: 'Benchmark',      title: 'Benchmark &\nGap Analyse',                 scope: 'Benchmark · 3 Monate' },
  { tag: 'Pilotierung',    title: 'Mission Board\nMeeting Design',             scope: 'Artefakt-getrieben · laufend' },
  { tag: 'Operating Model','title': 'Check &\nBalance Strukturen',             scope: 'Responsibility Model · 5 Monate' },
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
    phase: 'Planing',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Button variant="text" style={{ fontSize: 'var(--text-xs)' }}>Unser Ansatz →</Button>
            <Button variant="primary" size="sm">Shift starten</Button>
          </div>
        </div>

        {/* ── 1789 — Variable Font, almost fullscreen ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingInline: 'var(--grid-margin)',
            overflow: 'hidden',
          }}
        >
          {/* Each digit gets its own animation — independent wdth+wght morphing.
              flex layout so gap can be added later to visualise "the Gap". */}
          <h1
            style={{
              fontFamily: 'var(--font-variable), var(--font-display), sans-serif',
              /* clamp: floor 6rem | scale with vw | cap at 72 % svh */
              fontSize: 'clamp(6rem, 55vw, 72svh)',
              lineHeight: '0.9',
              color: 'var(--color-ink)',
              userSelect: 'none',
              display: 'flex',
              gap: 0,
            }}
          >
            {/* "1" — Anchor: narrow+black → wide+thin */}
            <span style={{
              flex: 'none',
              willChange: 'font-variation-settings',
              animation: 'morph1 12s ease-in-out infinite',
            }}>1</span>

            {/* "7" — Opposite: wide+thin → narrow+heavy (mirror of "1") */}
            <span style={{
              flex: 'none',
              willChange: 'font-variation-settings',
              animation: 'morph7 12s ease-in-out infinite',
            }}>7</span>

            {/* "8" — Transformer: extreme width swings, fastest cycle */}
            <span style={{
              flex: 'none',
              willChange: 'font-variation-settings',
              animation: 'morph8 9s ease-in-out infinite -2s',
            }}>8</span>

            {/* "9" — Wanderer: slowest, independent arc */}
            <span style={{
              flex: 'none',
              willChange: 'font-variation-settings',
              animation: 'morph9 16s ease-in-out infinite -6s',
            }}>9</span>
          </h1>
        </div>

        {/* ── Bottom strip ── */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
          }}
        >
          {/* Left — Systemshifter */}
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
              Systemshifter
            </p>
          </div>

          {/* Center — Tagline */}
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
              Turning organisational friction<br />
              into forward motion.
            </p>
          </div>

          {/* Right — Scroll */}
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
      <section className="py-32">
        <Container>
          <Grid>
            <Col span={5}>
              <Tag>Dafür stehen wir</Tag>
              <h2
                className="mt-6 font-heading font-normal text-ink balance"
                style={{ fontSize: 'var(--text-md)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
              >
                Ein neues Organisationsverständnis — auf Struktur- und Strategieebene.
              </h2>
            </Col>
            <Col span={5} start={8} className="flex items-end">
              <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
                Wir machen Organisationen und ihre Spannungen auf eine neue Art sichtbar.
                Durch Erkenntnis und Vokabular entsteht eine neue Möglichkeit,
                sich mit Problemen und Lösungen auseinanderzusetzen.
              </p>
            </Col>
          </Grid>

          <Grid className="mt-20">
            {pillars.map((p) => (
              <Col key={p.num} span={4}>
                <div
                  className="p-10 h-full flex flex-col gap-8 group hover:-translate-y-1 transition-transform duration-300"
                  style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <span className="font-mono text-xs tracking-[0.15em]" style={{ color: 'var(--color-terra)' }}>
                    {p.num}
                  </span>
                  <h3
                    className="font-display font-light text-ink"
                    style={{ fontSize: 'var(--text-lg)', lineHeight: '1', letterSpacing: '-0.03em' }}
                  >
                    {p.title}
                  </h3>
                  <p className="font-body text-ink-muted mt-auto" style={{ fontSize: 'var(--text-sub)', lineHeight: '1.6' }}>
                    {p.body}
                  </p>
                </div>
              </Col>
            ))}
          </Grid>
        </Container>
      </section>

      {/* ─── Highlight Cases ──────────────────────────────────────────────── */}
      <section className="py-32" style={{ backgroundColor: 'var(--color-ink)' }}>
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
              const bgColors = ['var(--color-terra)', 'rgba(255,255,255,0.06)', 'var(--color-sage)']
              const textColors = ['var(--color-background)', 'var(--color-background)', 'var(--color-ink)']
              const bg = bgColors[i % 3]
              const fg = textColors[i % 3]
              return (
                <a
                  key={c.slug}
                  href={`/projekte/${c.slug}`}
                  className="group p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    gridColumn: 'span 4',
                    backgroundColor: bg,
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    minHeight: '340px',
                    textDecoration: 'none',
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

      {/* ─── Denk Labor ───────────────────────────────────────────────────── */}
      <section className="py-32" style={{ backgroundColor: 'var(--color-surface)' }}>
        <Container>
          <Grid>
            <Col span={5}>
              <Tag>Denk Labor</Tag>
              <h2
                className="mt-6 font-heading font-normal text-ink balance"
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
            {/* Podcast — featured */}
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

            {/* Publikation + Talk */}
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

      {/* ─── Unser Ansatz ─────────────────────────────────────────────────── */}
      <section className="py-32">
        <Container>
          <Grid>
            <Col span={5}>
              <Tag>Unser Ansatz</Tag>
              <h2
                className="mt-6 font-heading font-normal text-ink balance"
                style={{ fontSize: 'var(--text-md)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
              >
                Der Systemshift Cycle
              </h2>
              <p className="mt-6 font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
                Wertschöpfungsfluss ist der Herzschlag unserer Projekte.
                Wie organisiert man die Arbeit um die Wertschöpfung herum?
              </p>
              <div className="mt-8">
                <Button variant="ghost">Ansatz im Detail →</Button>
              </div>
            </Col>
          </Grid>

          <div className="mt-16" style={{ borderTop: '1px solid var(--color-border)' }}>
            {approach.map((a, i) => (
              <div
                key={a.title}
                className="group grid py-10 hover:pl-6 transition-all duration-300"
                style={{
                  gridTemplateColumns: '4rem 1fr 1fr',
                  gap: '2rem',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <span
                  className="text-2xl group-hover:scale-110 transition-transform duration-300 inline-block"
                  style={{ color: 'var(--color-terra)', lineHeight: 1 }}
                >
                  {a.icon}
                </span>
                <div>
                  <p className="font-mono text-xs tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--color-ink-subtle)' }}>
                    0{i + 1}
                  </p>
                  <h3 className="font-heading font-normal text-ink" style={{ fontSize: 'var(--text-sm)' }}>
                    {a.title}
                  </h3>
                </div>
                <p className="font-body text-ink-muted self-center" style={{ fontSize: 'var(--text-sub)', lineHeight: '1.6' }}>
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Was wir erreichen ────────────────────────────────────────────── */}
      <section className="py-32" style={{ backgroundColor: 'var(--color-surface)' }}>
        <Container>
          <Grid>
            <Col span={6}>
              <Tag>Was wir erreichen</Tag>
              <h2
                className="mt-6 font-heading font-normal text-ink balance"
                style={{ fontSize: 'var(--text-md)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
              >
                Mit uns erleben Sie 3 Dinge
              </h2>
              <p className="mt-6 font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
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
      <section className="py-32">
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

          {/* Event Placeholders */}
          <div className="mt-16" style={{ borderTop: '1px solid var(--color-border)' }}>
            {[
              { date: '[TT.MM.JJJJ]', type: 'Talk',        title: '[Event-Titel Platzhalter]',      location: '[Ort]' },
              { date: '[TT.MM.JJJJ]', type: 'Workshop',    title: '[Workshop-Titel Platzhalter]',   location: '[Ort]' },
              { date: '[TT.MM.JJJJ]', type: 'Podcast',     title: '[Neue Episode Platzhalter]',     location: 'Online' },
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

      {/* ─── CTA: Let's shift your system ────────────────────────────────── */}
      <section className="py-48" style={{ backgroundColor: 'var(--color-terra)' }}>
        <Container>
          <Grid>
            <Col span={8} start={3} className="text-center">
              <p
                className="font-mono text-xs tracking-[0.2em] uppercase mb-8"
                style={{ color: 'rgba(242,237,230,0.6)' }}
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
                style={{ fontSize: 'var(--text-base)', lineHeight: '1.75', color: 'rgba(242,237,230,0.75)' }}
              >
                Wir haben es uns zum Anspruch gemacht, unseren Kunden ein neues Verständnis
                ihrer Organisation aufzuzeigen und gemeinsam wirksame Veränderungen zu entwerfen.
              </p>
              <div className="mt-12 flex items-center justify-center gap-6">
                <Button
                  variant="ghost"
                  size="lg"
                  style={{ borderColor: 'var(--color-background)', color: 'var(--color-background)' }}
                >
                  Erstgespräch vereinbaren
                </Button>
              </div>
            </Col>
          </Grid>
        </Container>
      </section>

    </main>
  )
}
