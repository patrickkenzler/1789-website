import { Container, Grid, Col } from '@/components/layout/Grid'
import { Button } from '@/components/atoms/Button'
import { Tag } from '@/components/atoms/Tag'
import { featuredCases } from '@/data/cases'
import { HeroLogo } from '@/components/organisms/HeroLogo'
import { QuestionsTicker } from '@/components/molecules/QuestionsTicker'
import { ClientLogoCarousel } from '@/components/molecules/ClientLogoCarousel'
import { SystemshiftAccordion } from '@/components/organisms/SystemshiftAccordion'
import { TestimonialsSection } from '@/components/organisms/TestimonialsSection'

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
      {/*
        position:relative + overflow:hidden → SVG inside HeroLogo (absolute inset-0)
        clips cleanly within the 100svh card. paddingTop pads the content column
        inside HeroLogo (not the card itself) so the SVG can bleed to true top=0.
      */}
      <section
        className="scroll-card"
        style={{
          height:          '100svh',
          display:         'flex',
          flexDirection:   'column',
          paddingTop:      '5rem', /* nav height — content inside HeroLogo adds more */
          overflow:        'hidden',
          position:        'relative',
          backgroundColor: 'var(--color-background)',
        }}
      >
        {/* ── Main hero content ── */}
        <HeroLogo />

        {/* Scroll indicator removed — hero now full-bleed with no strip at bottom */}
      </section>


      {/* ─── Dafür stehen wir + Logo Carousel (one sticky card) ────────────── */}
      {/*
        height: 100svh matches the hero pattern (which already works).
        The wrapper is exactly viewport-tall when stuck → overflow:hidden clips
        at the visual boundary, not at the layout position. The carousel sits
        at the viewport bottom; both are covered together by the next card.
      */}
      <div
        className="scroll-card"
        style={{
          backgroundColor: 'var(--color-background)',
          /*
           * Inline top override: dock the card flush under the fixed nav (5rem)
           * so no content is ever behind it. Height shrinks to the remaining
           * viewport so the carousel stays pinned at the exact bottom edge.
           */
          top:             '5rem',
          height:          'calc(100svh - 5rem)',
          display:         'flex',
          flexDirection:   'column',
          overflow:        'hidden',
        }}
      >
        {/* Section grows to fill the space above the carousel */}
        <section style={{ flex: 1, minHeight: 0, overflow: 'hidden', paddingBlock: '3rem 2rem' }}>
          <Container>

            {/* ── Staggered editorial headline ── */}
            <div style={{ marginBottom: '2rem' }}>
              <Tag>Dafür stehen wir</Tag>
              <div style={{ marginTop: '1.75rem' }}>
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
            <Grid className="stack-cols">
              <Col span={5} start={8}>
                <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
                  Wir machen Organisationen und ihre Spannungen auf eine neue Art sichtbar.
                  Durch Erkenntnis und Vokabular entsteht eine neue Möglichkeit,
                  sich mit Problemen und Lösungen auseinanderzusetzen.
                </p>
              </Col>
            </Grid>

            {/* ── Pillars ── */}
            <Grid className="stack-cols mt-10">
              {pillars.map((pillar) => (
                <Col key={pillar.num} span={4}>
                  <div
                    className="p-6 h-full flex flex-col gap-5 group hover:-translate-y-1 transition-transform duration-300"
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

        {/* Carousel pinned at the viewport bottom — always visible when card is active */}
        <ClientLogoCarousel />
      </div>

      {/* ─── Highlight Cases + Questions Ticker (one sticky card) ───────────── */}
      <div
        className="scroll-card"
        style={{
          backgroundColor: 'var(--color-ink)',
          top:             '5rem',
          height:          'calc(100svh - 5rem)',
          display:         'flex',
          flexDirection:   'column',
          overflow:        'hidden',
        }}
      >
      <section style={{ flex: 1, minHeight: 0, overflow: 'hidden', paddingBlock: '3rem 2rem' }}>
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

          <Grid className="stack-cols mt-8">
            {featuredCases.map((c, i) => {
              const bgColors   = ['var(--color-terra)', 'rgba(255,255,255,0.06)', 'var(--color-sage)']
              const textColors = ['var(--color-background)', 'var(--color-background)', 'var(--color-ink)']
              const bg = bgColors[i % 3]
              const fg = textColors[i % 3]

              // Image overlay colours — applied over photo when image is present
              const overlayColors = ['#F44D0B', '#1A1714', '#B8CC8A']
              // Placeholder accent colours — diagonal gradient + label
              const placeholderAccents = ['rgba(244,77,11,0.55)', 'rgba(227,221,213,0.2)', 'rgba(184,204,138,0.55)']
              const placeholderLines   = ['rgba(244,77,11,0.07)', 'rgba(227,221,213,0.04)', 'rgba(184,204,138,0.07)']
              const accentLabel        = ['#F44D0B', 'rgba(227,221,213,0.5)', '#B8CC8A']

              const placeholderBg = [
                `linear-gradient(135deg, ${placeholderAccents[i % 3]} 0%, transparent 65%), repeating-linear-gradient(135deg, transparent 0px, transparent 20px, ${placeholderLines[i % 3]} 20px, ${placeholderLines[i % 3]} 21px), #0D0B0A`,
              ][0]

              return (
                <a
                  key={c.slug}
                  href={`/projekte/${c.slug}`}
                  className="group flex flex-col cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    gridColumn:     'span 4',
                    backgroundColor: bg,
                    borderRadius:   'var(--radius-md)',
                    border:         '1px solid rgba(255,255,255,0.08)',
                    minHeight:      '340px',
                    textDecoration: 'none',
                    overflow:       'hidden',
                  }}
                >
                  {/* ── Title image slot (160px) ── */}
                  <div style={{ position: 'relative', height: '160px', flexShrink: 0, overflow: 'hidden' }}>
                    {c.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={c.image}
                        alt={c.title}
                        style={{
                          width:     '100%',
                          height:    '100%',
                          objectFit: 'cover',
                          filter:    'grayscale(0.65) brightness(0.82)',
                          display:   'block',
                        }}
                      />
                    ) : (
                      // Placeholder — diagonal texture + accent gradient
                      <div
                        style={{
                          width:    '100%',
                          height:   '100%',
                          background: placeholderBg,
                          display:  'flex',
                          alignItems:    'flex-end',
                          justifyContent:'flex-end',
                          padding:  '1rem 1.25rem',
                        }}
                      >
                        <span style={{
                          fontFamily:    'var(--font-mono)',
                          fontSize:      '0.6rem',
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color:         accentLabel[i % 3],
                          opacity:       0.7,
                        }}>
                          ↗ {c.client}
                        </span>
                      </div>
                    )}

                    {/* Colour overlay — sits above the photo, fades on hover */}
                    {c.image && (
                      <div
                        className="case-img-overlay"
                        style={{
                          position:        'absolute',
                          inset:           0,
                          backgroundColor: overlayColors[i % 3],
                          opacity:         0.5,
                          transition:      'opacity 300ms var(--ease-standard)',
                        }}
                      />
                    )}
                  </div>

                  {/* ── Card content ── */}
                  <div
                    className="p-8 flex flex-col justify-between"
                    style={{ flex: 1 }}
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
                      <p
                        className="font-mono text-[0.6rem] tracking-widest uppercase mb-2"
                        style={{ color: 'rgba(255,255,255,0.45)' }}
                      >
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
                  </div>
                </a>
              )
            })}
          </Grid>
        </Container>
      </section>

        {/* Ticker pinned at viewport bottom — always visible when card is active */}
        <QuestionsTicker />
      </div>

      {/* ─── Testimonials ────────────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ─── Denk Labor ───────────────────────────────────────────────────── */}
      <section className="scroll-card" style={{ paddingBlock: '7rem', backgroundColor: 'var(--color-surface)' }}>
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
              <a
                href="/labor"
                className="hover-line inline-block mt-8 font-body uppercase tracking-widest"
                style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--color-ink-muted)' }}
              >
                Alle Inhalte →
              </a>
            </Col>
          </Grid>

          <Grid className="stack-cols mt-16">
            {/* ── Left: latest podcast episode with embedded player ── */}
            <Col span={6}>
              <div
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div className="p-8 pb-5">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs tracking-[0.12em] uppercase" style={{ color: 'var(--color-terra)' }}>
                      ★ Aktuelle Folge · #142
                    </span>
                  </div>
                  <h3
                    className="font-display font-light text-ink"
                    style={{ fontSize: 'var(--text-sm)', lineHeight: '1.2' }}
                  >
                    Das Internet: Utopie, Infrastruktur, Schlachtfeld
                  </h3>
                  <p className="mt-2 font-body italic" style={{ fontSize: 'var(--text-sub)', color: 'var(--color-ink-subtle)' }}>
                    mit Marie Kilg
                  </p>
                  <div className="flex gap-2 mt-4">
                    {['Digital', 'Gesellschaft'].map((t) => <Tag key={t}>{t}</Tag>)}
                  </div>
                </div>
                <div className="px-4 pb-4 mt-auto">
                  <iframe
                    src="https://open.spotify.com/embed/episode/5rW7kTMsBrpdNdeyRorwX9?utm_source=generator"
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{ display: 'block', borderRadius: '8px' }}
                  />
                </div>
                <div className="px-8 pb-6">
                  <a
                    href="/podcast"
                    className="hover-line font-body uppercase tracking-widest"
                    style={{ fontSize: 'var(--text-xxs)', fontWeight: 500, color: 'var(--color-terra)' }}
                  >
                    Alle Folgen →
                  </a>
                </div>
              </div>
            </Col>

            {/* ── Right: essay + upcoming event ── */}
            <Col span={6}>
              <div className="flex flex-col gap-6 h-full">

                {/* Essay by Human Nagafi */}
                <a
                  href="/labor"
                  className="group flex-1 p-8 cursor-pointer hover:-translate-y-0.5 transition-transform duration-300 block"
                  style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', textDecoration: 'none' }}
                >
                  <span className="font-mono text-xs tracking-[0.12em] uppercase" style={{ color: 'var(--color-ink-subtle)' }}>
                    Essay
                  </span>
                  <h3
                    className="mt-3 font-heading font-normal text-ink"
                    style={{ fontSize: 'var(--text-base)', lineHeight: '1.4' }}
                  >
                    Nähe als Organisationsprinzip — warum wir Corporate Therapy auf die Bühne bringen
                  </h3>
                  <p className="mt-3 font-body italic" style={{ fontSize: 'var(--text-sub)', color: 'var(--color-ink-subtle)' }}>
                    Human Nagafi
                  </p>
                  <p className="mt-2 font-mono text-xs" style={{ color: 'var(--color-ink-subtle)' }}>
                    Essay · 8 Min · 2024
                  </p>
                </a>

                {/* Upcoming live event */}
                <a
                  href="/labor"
                  className="group flex-1 p-8 cursor-pointer hover:-translate-y-0.5 transition-transform duration-300 block"
                  style={{
                    border: '1px solid var(--color-terra)',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    backgroundColor: 'rgba(244,77,11,0.04)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.12em] uppercase" style={{ color: 'var(--color-terra)' }}>
                      Live · Talk
                    </span>
                    <span className="font-mono text-xs" style={{ color: 'var(--color-terra)' }}>
                      25.06.2024
                    </span>
                  </div>
                  <h3
                    className="mt-3 font-heading font-normal text-ink"
                    style={{ fontSize: 'var(--text-base)', lineHeight: '1.4' }}
                  >
                    Corporate Therapy — Live in Frankfurt
                  </h3>
                  <p className="mt-2 font-body" style={{ fontSize: 'var(--text-sub)', color: 'var(--color-ink-muted)', lineHeight: '1.5' }}>
                    Live-Folge mit Human, Patrick & Gast. Einlass ab 18 Uhr, Start 18:30 Uhr. Gespräche, Snacks & Drinks.
                  </p>
                  <p className="mt-3 font-mono text-xs" style={{ color: 'var(--color-ink-subtle)' }}>
                    Frankfurt am Main
                  </p>
                </a>

              </div>
            </Col>
          </Grid>
        </Container>
      </section>

      {/* ─── Unser Ansatz — sticky 2-col (foreverday pattern) ──────────── */}
      {/* NOTE: no scroll-card here — the inner SystemshiftAccordion has its
          own position:sticky left panel; nesting two sticky contexts causes
          the accordion to mis-behave. This section scrolls normally. */}
      <section style={{ backgroundColor: 'var(--color-background)', position: 'relative', zIndex: 0 }}>
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

        {/* Full-bleed accordion — collage crossfades left, items expand right */}
        <SystemshiftAccordion />
      </section>

      {/* ─── Was wir erreichen ────────────────────────────────────────────── */}
      <section className="scroll-card" style={{ paddingBlock: '7rem', backgroundColor: 'var(--color-surface)' }}>
        <Container>

          {/* ── Staggered editorial headline ── */}
          <div style={{ marginBottom: '5rem' }}>
            <Tag>Was wir erreichen</Tag>
            <div style={{ marginTop: '3rem' }}>
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
          <Grid className="stack-cols">
            <Col span={5} start={8}>
              <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75' }}>
                Wir machen Organisationen und ihre Spannungen auf eine neue Art sichtbar.
                Wir setzen Transformation prototypisch, zielgetrieben, pragmatisch,
                partizipativ und effektiv um.
              </p>
            </Col>
          </Grid>

          <Grid className="stack-cols mt-16">
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
      <section className="scroll-card" style={{ paddingBlock: '7rem', backgroundColor: 'var(--color-background)' }}>
        <Container>
          <Grid className="stack-cols">
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
              { date: '25.06.2024', type: 'Live Talk', title: 'Corporate Therapy — Live Episode mit Human, Patrick & Gast', location: 'Frankfurt a.M.' },
              { date: 'Laufend',    type: 'Podcast',   title: '#142 Das Internet: Utopie, Infrastruktur, Schlachtfeld',     location: 'Spotify' },
              { date: '2024',       type: 'Essay',     title: 'Nähe als Organisationsprinzip — Human Nagafi',               location: 'Labor' },
            ].map((e, i) => (
              <div
                key={i}
                className="event-row items-center py-6 hover:pl-4 transition-all duration-300 cursor-pointer group"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '10rem 6rem 1fr 8rem',
                  gap: '2rem',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <span className="font-mono text-xs" style={{ color: 'var(--color-ink-subtle)' }}>{e.date}</span>
                <Tag>{e.type}</Tag>
                <span className="font-heading font-normal text-ink" style={{ fontSize: 'var(--text-base)' }}>{e.title}</span>
                <span className="font-mono text-xs text-right event-location" style={{ color: 'var(--color-ink-subtle)' }}>{e.location}</span>
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
        className="scroll-card"
        style={{
          paddingBlock:    '8rem',
          borderTop:       '1px solid var(--color-border)',
          overflow:        'hidden',
          backgroundColor: 'var(--color-background)',
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
      <section className="scroll-card" style={{ paddingBlock: '7rem', backgroundColor: 'var(--color-terra)' }}>
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
