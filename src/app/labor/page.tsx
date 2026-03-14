import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'

// ─── Content ─────────────────────────────────────────────────────────────────

const featured = {
  type:      'Podcast',
  num:       142,
  spotifyId: '5rW7kTMsBrpdNdeyRorwX9',
  title:     'Das Internet: Utopie, Infrastruktur, Schlachtfeld',
  guest:     'Marie Kilg',
  author:    null,
  date:      '2024',
  readTime:  '58 Min',
  tags:      ['Digital', 'Gesellschaft'],
}

const items = [
  {
    type:      'Essay',
    spotifyId: null,
    title:     'Nähe als Organisationsprinzip — warum wir Corporate Therapy auf die Bühne bringen',
    guest:     null,
    author:    'Human Nagafi',
    date:      '2024',
    readTime:  '8 Min',
    tags:      ['Transformation', 'Format'],
    liveEvent: false,
  },
  {
    type:      'Live Talk',
    spotifyId: null,
    title:     'Corporate Therapy — Live in Frankfurt am Main',
    guest:     null,
    author:    null,
    date:      '25.06.2024',
    readTime:  '90 Min',
    tags:      ['Podcast', 'Führung'],
    liveEvent: true,
  },
  {
    type:      'Podcast',
    spotifyId: '0nZGfWUwO5UhEJP6GkF6fL',
    title:     'Neujahrsansprache – Management, Maschine, Obskurität',
    guest:     null,
    author:    null,
    date:      'Jan 2024',
    readTime:  '42 Min',
    tags:      ['Management', 'KI'],
    liveEvent: false,
  },
  {
    type:      'Podcast',
    spotifyId: '0xMmNdGcifr5yJIyXFB4oB',
    title:     '2025 – Ein Jahr zwischen Hype und Handwerk',
    guest:     null,
    author:    null,
    date:      'Dez 2023',
    readTime:  '38 Min',
    tags:      ['Strategie', 'Trends'],
    liveEvent: false,
  },
  {
    type:      'Podcast',
    spotifyId: '3GLP2k6oBpReKlkOXYRWAn',
    title:     'Social Entrepreneurship Ohne Illusionen',
    guest:     'Agnesa Kolica',
    author:    null,
    date:      'Dez 2023',
    readTime:  '51 Min',
    tags:      ['Leadership', 'Entrepreneurship'],
    liveEvent: false,
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Labor() {
  return (
    <main className="pt-40">

      {/* ── Page header ── */}
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

      {/* ── Filter bar ── */}
      <section style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <Container>
          <div className="py-4 flex items-center gap-3">
            {['Alle', 'Essay', 'Podcast', 'Talk', 'Live'].map((f) => (
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

      {/* ── Featured: latest podcast episode ── */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-ink)' }}>
        <Container>
          <p
            className="font-body uppercase tracking-widest mb-8"
            style={{ fontSize: 'var(--text-xs)', color: 'var(--color-terra)' }}
          >
            ★ Aktuelle Folge · #{featured.num}
          </p>
          <Grid>
            <Col span={5}>
              <h2
                className="font-display font-light balance"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', lineHeight: '1.05', color: 'var(--color-background)', letterSpacing: '-0.02em' }}
              >
                {featured.title}
              </h2>
              {featured.guest && (
                <p className="mt-4 font-body italic" style={{ fontSize: 'var(--text-base)', color: 'rgba(242,237,230,0.55)' }}>
                  mit {featured.guest}
                </p>
              )}
              <div className="flex gap-2 mt-6">
                {featured.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: '0.6rem',
                      fontWeight: 500,
                      fontFamily: 'var(--font-body)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(242,242,242,0.2)',
                      borderRadius: 'var(--radius-full)',
                      padding: '0.25rem 0.75rem',
                      color: 'rgba(242,237,230,0.5)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href="/podcast"
                className="hover-line inline-block mt-10 font-body uppercase tracking-widest"
                style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'rgba(242,237,230,0.5)' }}
              >
                Alle Podcast-Folgen →
              </a>
            </Col>
            <Col span={7}>
              <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                <iframe
                  src={`https://open.spotify.com/embed/episode/${featured.spotifyId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  style={{ display: 'block', borderRadius: '12px' }}
                />
              </div>
            </Col>
          </Grid>
        </Container>
      </section>

      {/* ── All items ── */}
      <section className="py-16">
        <Container>
          <Grid>
            {items.map((item, i) => (
              <Col key={i} span={i === 0 ? 8 : 4} className="mb-6">
                <div
                  className="group p-8 flex flex-col gap-5 cursor-pointer hover:-translate-y-1 transition-transform duration-300 h-full"
                  style={{
                    border: `1px solid ${item.liveEvent ? 'var(--color-terra)' : 'var(--color-border)'}`,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: item.liveEvent
                      ? 'rgba(244,77,11,0.04)'
                      : i === 0
                        ? 'var(--color-surface)'
                        : 'transparent',
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

                  {item.guest && (
                    <p className="font-body italic" style={{ fontSize: 'var(--text-sub)', color: 'var(--color-ink-subtle)' }}>
                      mit {item.guest}
                    </p>
                  )}
                  {item.author && (
                    <p className="font-body italic" style={{ fontSize: 'var(--text-sub)', color: 'var(--color-ink-subtle)' }}>
                      {item.author}
                    </p>
                  )}

                  {/* Spotify compact embed for podcast items */}
                  {item.spotifyId && (
                    <iframe
                      src={`https://open.spotify.com/embed/episode/${item.spotifyId}?utm_source=generator`}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      style={{ display: 'block', borderRadius: '10px' }}
                    />
                  )}

                  {/* Live event details */}
                  {item.liveEvent && (
                    <div
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: 'rgba(244,77,11,0.07)' }}
                    >
                      <p className="font-body" style={{ fontSize: 'var(--text-sub)', color: 'var(--color-ink-muted)', lineHeight: '1.6' }}>
                        Live-Folge Corporate Therapy mit Human, Patrick & Gast.
                        Einlass ab 18:00 Uhr, Start 18:30 Uhr.
                        Im Anschluss: Gespräche, Snacks & Drinks.
                      </p>
                      <p className="mt-2 font-mono text-xs" style={{ color: 'var(--color-terra)' }}>
                        Frankfurt am Main
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-2 flex-wrap">
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
