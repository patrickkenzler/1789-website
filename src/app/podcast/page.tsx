import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'

const SHOW_ID = '4YJAFJozpGByyV6F5IX7o6'

const episodes = [
  {
    num: 142,
    spotifyId: '5rW7kTMsBrpdNdeyRorwX9',
    title: 'Das Internet: Utopie, Infrastruktur, Schlachtfeld',
    guest: 'Marie Kilg',
    tags: ['Digital', 'Gesellschaft'],
  },
  {
    num: 141,
    spotifyId: '0nZGfWUwO5UhEJP6GkF6fL',
    title: 'Neujahrsansprache – Management, Maschine, Obskurität',
    guest: null,
    tags: ['Management', 'KI'],
  },
  {
    num: 140,
    spotifyId: '0xMmNdGcifr5yJIyXFB4oB',
    title: '2025 – Ein Jahr zwischen Hype und Handwerk',
    guest: null,
    tags: ['Strategie', 'Trends'],
  },
  {
    num: 139,
    spotifyId: '3GLP2k6oBpReKlkOXYRWAn',
    title: 'Social Entrepreneurship Ohne Illusionen',
    guest: 'Agnesa Kolica',
    tags: ['Leadership', 'Entrepreneurship'],
  },
  {
    num: 138,
    spotifyId: '4AIjARf7dMhMEaq5fFQy12',
    title: 'High Performer, Störenfriede & die Ambivalenzen der Leistung',
    guest: null,
    tags: ['Leadership', 'Kultur'],
  },
  {
    num: 137,
    spotifyId: '0DRuTXPgAuulCYT4c3UCVS',
    title: 'Der Fehler ist nicht der Fehler',
    guest: null,
    tags: ['Kultur', 'Lernen'],
  },
  {
    num: 136,
    spotifyId: '6P3yZ8VKOgmlhYbflJB0cs',
    title: 'Klima, Wirtschaft, Wirklichkeit',
    guest: null,
    tags: ['Strategie', 'Nachhaltigkeit'],
  },
  {
    num: 135,
    spotifyId: '62AFEb0XvGwMj0xb6ErQTt',
    title: 'Kinderwüste, Kapital und Care',
    guest: null,
    tags: ['Gesellschaft', 'Führung'],
  },
  {
    num: 134,
    spotifyId: '5OSfkCP5QzUklNo8jYGslg',
    title: 'Die Kunst der Partizipation',
    guest: null,
    tags: ['Transformation', 'Führung'],
  },
  {
    num: 133,
    spotifyId: '2qM4K84iclYUmuGymkXYvP',
    title: 'Die Ethik im Taumel',
    guest: null,
    tags: ['Gesellschaft', 'Führung'],
  },
  {
    num: 132,
    spotifyId: '68oiJRpO6RTCUvTaURqvvG',
    title: 'Wenn der Arbeitsmarkt sich dreht',
    guest: null,
    tags: ['Transformation', 'HR'],
  },
  {
    num: 131,
    spotifyId: '4M7zuEqqzErz82QL91W0xx',
    title: 'KI im Unternehmen: Grenzen und Potenziale',
    guest: null,
    tags: ['KI', 'Strategie'],
  },
  {
    num: 130,
    spotifyId: '3OJ0sbgCVOzAbrH22eyguy',
    title: 'Wenn Resilienz zur Pflicht wird',
    guest: null,
    tags: ['Führung', 'Kultur'],
  },
  {
    num: 129,
    spotifyId: '67gZVqUuLtqO9rtDib3Ld0',
    title: 'Resilienz: Über die Grenzen einer Krisenmentalität',
    guest: null,
    tags: ['Führung', 'Strategie'],
  },
  {
    num: 128,
    spotifyId: '10t8fVpo6tM6mDa3G3bCy2',
    title: 'Polykrise und BWL – Umdenken des Managements',
    guest: null,
    tags: ['Strategie', 'Management'],
  },
  {
    num: 127,
    spotifyId: '1UQ8Hir08QwMzCUknIEb3N',
    title: 'Conway\'s Law in der Praxis: Technik vs. Organisation',
    guest: null,
    tags: ['Operating Model', 'Technologie'],
  },
  {
    num: 126,
    spotifyId: '7cS2DXCTaqAZdxJmPeU5wk',
    title: 'Von Denkwerkzeugen, Methode Moden und Innovationen',
    guest: null,
    tags: ['Transformation', 'Innovation'],
  },
  {
    num: 125,
    spotifyId: '1I1yKU49c10Te8cdXkHk48',
    title: 'Demokratische Unternehmensführung',
    guest: null,
    tags: ['Führung', 'Transformation'],
  },
  {
    num: 124,
    spotifyId: '5IBwzqZbnHQsHZzokGTAiD',
    title: 'Methoden & Frameworks – hilfreiche Tools oder Verblendung?',
    guest: null,
    tags: ['Transformation', 'Strategie'],
  },
  {
    num: 123,
    spotifyId: '2zPIDPQ2E0RgcS3SakKDz0',
    title: 'VW & die Autoindustrie – Management- oder Politikversagen?',
    guest: null,
    tags: ['Wirtschaft', 'Management'],
  },
]

const featured = episodes[0]
const rest     = episodes.slice(1)

export default function Podcast() {
  return (
    <main className="pt-40">

      {/* ── Page header ── */}
      <section className="pb-20">
        <Container>
          <Grid>
            <Col span={7}>
              <Tag>Podcast</Tag>
              <h1
                className="mt-8 font-display font-light text-ink balance"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1', letterSpacing: '-0.03em' }}
              >
                Corporate Therapy
              </h1>
              <p
                className="mt-2 font-body uppercase tracking-widest"
                style={{ fontSize: 'var(--text-xs)', color: 'var(--color-terra)' }}
              >
                The 1789 Podcast
              </p>
              <p className="mt-6 font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75', maxWidth: '38rem' }}>
                Organisationstheorie trifft Praxis. Gespräche über Systemshift, Führung und
                die Kunst, Organisationen wirklich zu verändern — ohne Buzzwords, mit Haltung.
              </p>
              <a
                href={`https://open.spotify.com/show/${SHOW_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-line inline-flex items-center gap-2 mt-8 font-body"
                style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Auf Spotify hören
              </a>
            </Col>
          </Grid>
        </Container>
      </section>

      {/* ── Featured: latest episode ── */}
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
                    className="font-body uppercase tracking-widest"
                    style={{
                      fontSize: '0.6rem',
                      fontWeight: 500,
                      letterSpacing: '0.12em',
                      border: '1px solid rgba(242,237,230,0.2)',
                      borderRadius: 'var(--radius-full)',
                      padding: '0.25rem 0.75rem',
                      color: 'rgba(242,237,230,0.5)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Col>
            <Col span={7}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', marginTop: '0' }}>
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

      {/* ── All episodes ── */}
      <section className="py-24">
        <Container>

          <div
            className="flex items-center justify-between mb-16"
            style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem' }}
          >
            <h2
              className="font-display font-light text-ink"
              style={{ fontSize: 'var(--text-md)', letterSpacing: '-0.02em' }}
            >
              Alle Folgen
            </h2>
            <span
              className="font-body uppercase tracking-widest"
              style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-subtle)', fontWeight: 500 }}
            >
              {rest.length + 1} Episoden
            </span>
          </div>

          {/* Episode grid — 2 columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 28rem), 1fr))',
              gap: '3rem 4rem',
            }}
          >
            {rest.map((ep) => (
              <article key={ep.num}>
                {/* Episode meta */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="font-body"
                        style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-terra)', letterSpacing: '0.06em' }}
                      >
                        #{ep.num}
                      </span>
                      {ep.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                    </div>
                    <h3
                      className="font-heading font-normal text-ink"
                      style={{ fontSize: 'var(--text-base)', lineHeight: '1.35' }}
                    >
                      {ep.title}
                    </h3>
                    {ep.guest && (
                      <p
                        className="mt-1 font-body italic"
                        style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-subtle)' }}
                      >
                        mit {ep.guest}
                      </p>
                    )}
                  </div>
                </div>

                {/* Spotify compact embed */}
                <iframe
                  src={`https://open.spotify.com/embed/episode/${ep.spotifyId}?utm_source=generator`}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  style={{ display: 'block', borderRadius: '12px' }}
                />
              </article>
            ))}
          </div>

        </Container>
      </section>

    </main>
  )
}
