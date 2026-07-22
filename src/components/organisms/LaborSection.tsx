/**
 * LaborSection — three-tier editorial spread for the Denk-Labor feed
 *
 * Hierarchy expressed through size + density:
 *   Tier 1 — Featured (left column, big teaser image + intro paragraph)
 *   Tier 2 — Medium  (middle column, two horizontal cards w/ small image)
 *   Tier 3 — List    (right column, three text-only rows w/ divider lines)
 *   + Newsletter CTA (terra-coloured card pinned to the bottom of col 3)
 *
 * All teasers are placeholder gradients with a type-specific ornament
 * (episode number for podcasts, initial otherwise) until real artwork is
 * commissioned. Real images supported via the optional `image` field.
 */

import Link from 'next/link'
import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'

// ─── Data ─────────────────────────────────────────────────────────────────────

type LaborType = 'Podcast' | 'Essay' | 'Whitepaper' | 'Experiment'
type Tier      = 'featured' | 'medium' | 'list'

type LaborItem = {
  tier:      Tier
  type:      LaborType
  title:     string
  author:    string
  meta:      string
  intro?:    string
  href:      string
  image?:    string
  ornament?: string
}

const ITEMS: LaborItem[] = [
  // ── Tier 1 — Featured ────────────────────────────────────────────────
  {
    tier:     'featured',
    type:     'Essay',
    title:    'Nähe als Organisationsprinzip — warum wir Corporate Therapy auf die Bühne bringen',
    author:   'Huma Nagafi',
    meta:     '8 Min · 2024',
    intro:    'Eine Reflexion über Distanz, Vertrauen und die Frage, wieso Organisationen den Mut zur Nähe oft erst auf der Bühne finden.',
    href:     '/labor',
    image:    '/labor/Artikel_Cover_1.jpg',
    ornament: 'E',
  },
  // ── Tier 2 — Medium ──────────────────────────────────────────────────
  {
    tier:     'medium',
    type:     'Podcast',
    title:    'Das Internet: Utopie, Infrastruktur, Schlachtfeld',
    author:   'mit Marie Kilg',
    meta:     '#142 · 47 Min',
    href:     '/labor',
    image:    '/labor/Artikel_Cover_2.webp',
    ornament: '#142',
  },
  {
    tier:     'medium',
    type:     'Whitepaper',
    title:    'Target Operating Models in regulierten Märkten',
    author:   '1789 Research',
    meta:     '24 Seiten · 2024',
    href:     '/labor',
    image:    '/labor/Artikel_Cover_3.jpg',
    ornament: 'WP',
  },
  // ── Tier 3 — List ────────────────────────────────────────────────────
  {
    tier:   'list',
    type:   'Experiment',
    title:  'Mission Boards als Entscheidungsformat',
    author: 'Pilot bei greyt.',
    meta:   '2023',
    href:   '/labor',
  },
  {
    tier:   'list',
    type:   'Podcast',
    title:  'Strategie und Struktur — was zuerst?',
    author: 'mit Patrick Breitenbach',
    meta:   '#141 · 52 Min',
    href:   '/labor',
  },
  {
    tier:   'list',
    type:   'Essay',
    title:  'Selbstorganisation ist kein Selbstläufer',
    author: 'Mary Jane Bolton',
    meta:   '6 Min · 2024',
    href:   '/labor',
  },
]

// ─── Type colour mapping ──────────────────────────────────────────────────────

const TYPE_STYLE: Record<LaborType, { gradient: string; chipColor: string; accent: string }> = {
  Podcast:    {
    gradient:  'linear-gradient(135deg, #F44D0B 0%, #C13A06 100%)',
    chipColor: 'rgba(255,255,255,0.95)',
    accent:    'var(--color-terra)',
  },
  Essay:      {
    gradient:  'linear-gradient(150deg, #B8CC8A 0%, #8FA66A 100%)',
    chipColor: 'rgba(26,23,20,0.85)',
    accent:    '#8FA66A',
  },
  Whitepaper: {
    gradient:  'linear-gradient(135deg, #2E2B28 0%, #1A1714 100%)',
    chipColor: 'rgba(242,242,242,0.95)',
    accent:    'var(--color-ink)',
  },
  Experiment: {
    gradient:  'linear-gradient(120deg, #F44D0B 0%, #B8CC8A 100%)',
    chipColor: 'rgba(255,255,255,0.95)',
    accent:    'var(--color-terra)',
  },
}

// ─── Teaser image (placeholder gradient or real <img>) ────────────────────────

function ItemTeaser({ item, size }: { item: LaborItem; size: 'large' | 'small' }) {
  if (item.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${item.image}`}
        alt={item.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    )
  }

  const t = TYPE_STYLE[item.type]
  const isExperiment = item.type === 'Experiment'

  return (
    <div
      style={{
        width:      '100%',
        height:     '100%',
        position:   'relative',
        background: t.gradient,
        overflow:   'hidden',
      }}
    >
      <span
        style={{
          position:      'absolute',
          top:           size === 'small' ? '0.45rem' : '0.85rem',
          left:          size === 'small' ? '0.55rem' : '1rem',
          fontFamily:    'var(--font-mono)',
          fontSize:      size === 'small' ? '0.5rem' : '0.6875rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         t.chipColor,
          opacity:       0.88,
        }}
      >
        {item.type}
      </span>

      <span
        aria-hidden="true"
        style={{
          position:      'absolute',
          bottom:        size === 'small' ? '-0.35rem' : '-0.5rem',
          right:         size === 'small' ? '0.35rem' : '0.75rem',
          fontFamily:    'var(--font-display)',
          fontStyle:     'italic',
          fontWeight:    300,
          fontSize:      size === 'small' ? '2.25rem' : 'clamp(3.5rem, 7vw, 6rem)',
          color:         'rgba(255,255,255,0.36)',
          lineHeight:    0.85,
          letterSpacing: '-0.04em',
          userSelect:    'none',
        }}
      >
        {item.ornament ?? item.type[0]}
      </span>

      {isExperiment && size === 'large' && (
        <svg
          aria-hidden="true"
          width="100%"
          height="100%"
          viewBox="0 0 200 120"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', inset: 0, opacity: 0.45, pointerEvents: 'none' }}
        >
          {[...Array(28)].map((_, i) => {
            const x = (i * 37) % 200
            const y = (i * 53) % 120
            return <circle key={i} cx={x} cy={y} r={1.6} fill="rgba(255,255,255,0.85)" />
          })}
        </svg>
      )}
    </div>
  )
}

// ─── Tier 1: Featured card ────────────────────────────────────────────────────

function FeaturedCard({ item }: { item: LaborItem }) {
  return (
    <Link
      href={item.href}
      style={{
        display:         'flex',
        flexDirection:   'column',
        borderRadius:    'var(--radius-md)',
        overflow:        'hidden',
        backgroundColor: 'var(--color-background)',
        boxShadow:       '0 0 0 1px rgba(26,23,20,0.08)',
        textDecoration:  'none',
        color:           'inherit',
        alignSelf:       'start',    /* align card top with the medium / list columns */
        width:           '100%',
      }}
    >
      {/* Teaser — fixed-height clamp so the image keeps a stable landscape
          proportion regardless of how tall the card slot becomes on 4K. */}
      <div style={{
        width:      '100%',
        height:     'clamp(280px, 40svh, 460px)',
        flexShrink: 0,
        position:   'relative',
        overflow:   'hidden',
      }}>
        <ItemTeaser item={item} size="large" />
      </div>

      <div
        style={{
          display:       'flex',
          flexDirection: 'column',
          padding:       'clamp(1rem, 1.8vw, 1.6rem)',
          gap:           'clamp(0.3rem, 0.7svh, 0.55rem)',
        }}
      >
        <span className="c-eyebrow">
          {item.type} · {item.meta}
        </span>
        <h3
          style={{
            fontFamily:    'var(--font-display)',
            fontWeight:    300,
            fontSize:      'clamp(1.75rem, 3.6svh, 2.75rem)',
            lineHeight:    1.05,
            letterSpacing: '-0.025em',
            color:         'var(--color-ink)',
            margin:        0,
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle:  'italic',
            fontSize:   'clamp(0.875rem, 1.55svh, 1rem)',
            lineHeight: 1.4,
            color:      'var(--color-ink-subtle)',
            margin:     0,
          }}
        >
          {item.author}
        </p>
        {item.intro && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'clamp(0.8125rem, 1.45svh, 0.9375rem)',
              lineHeight: 1.55,
              color:      'var(--color-ink-muted)',
              margin:     '0.25rem 0 0',
            }}
          >
            {item.intro}
          </p>
        )}
      </div>
    </Link>
  )
}

// ─── Tier 2: Medium vertical card (landscape image on top, text below) ──────

function MediumCard({ item }: { item: LaborItem }) {
  return (
    <Link
      href={item.href}
      className="labor-thumb"
      style={{
        display:         'flex',
        flexDirection:   'column',
        overflow:        'hidden',
        borderRadius:    'var(--radius-sm)',
        backgroundColor: 'var(--color-background)',
        boxShadow:       '0 0 0 1px rgba(26,23,20,0.08)',
        textDecoration:  'none',
        color:           'inherit',
        transition:      'opacity 200ms',
        width:           '100%',
      }}
    >
      {/* Landscape teaser — fixed-height clamp so two stacked mediums each
          keep a stable proportion across all viewport sizes. */}
      <div style={{
        width:      '100%',
        height:     'clamp(140px, 18svh, 200px)',
        flexShrink: 0,
        position:   'relative',
        overflow:   'hidden',
      }}>
        <ItemTeaser item={item} size="small" />
      </div>

      {/* Text body — natural height */}
      <div
        style={{
          padding:        'clamp(0.7rem, 1.4vw, 1.1rem)',
          display:        'flex',
          flexDirection:  'column',
          gap:            '0.25rem',
        }}
      >
        <span className="c-eyebrow">
          {item.type} · {item.meta}
        </span>
        <h4
          style={{
            fontFamily:      'var(--font-display)',
            fontWeight:      300,
            fontSize:        'clamp(1.125rem, 2.4svh, 1.625rem)',
            lineHeight:      1.1,
            letterSpacing:   '-0.02em',
            color:           'var(--color-ink)',
            margin:          0,
            display:         '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow:        'hidden',
          }}
        >
          {item.title}
        </h4>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle:  'italic',
            fontSize:   'clamp(0.75rem, 1.35svh, 0.875rem)',
            lineHeight: 1.3,
            color:      'var(--color-ink-subtle)',
            margin:     0,
          }}
        >
          {item.author}
        </p>
      </div>
    </Link>
  )
}

// ─── Tier 3: List row (text-only, divider above) ──────────────────────────────

function ListItem({ item, first }: { item: LaborItem; first: boolean }) {
  const accent = TYPE_STYLE[item.type].accent

  return (
    <Link
      href={item.href}
      className="labor-thumb"
      style={{
        display:        'block',
        textDecoration: 'none',
        color:          'inherit',
        paddingTop:     first ? 0 : 'clamp(0.6rem, 1.2svh, 0.9rem)',
        marginTop:      first ? 0 : 'clamp(0.6rem, 1.2svh, 0.9rem)',
        borderTop:      first ? 'none' : '1px solid var(--color-border)',
        transition:     'opacity 200ms',
      }}
    >
      <span
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-xxs)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         accent,
          display:       'block',
          marginBottom:  '0.3rem',
        }}
      >
        {item.type} · {item.meta}
      </span>
      <p
        style={{
          fontFamily:      'var(--font-display)',
          fontWeight:      300,
          fontSize:        'clamp(1rem, 1.95svh, 1.375rem)',
          lineHeight:      1.15,
          letterSpacing:   '-0.018em',
          color:           'var(--color-ink)',
          margin:          0,
          display:         '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow:        'hidden',
        }}
      >
        {item.title}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle:  'italic',
          fontSize:   'clamp(0.6875rem, 1.25svh, 0.8125rem)',
          lineHeight: 1.3,
          color:      'var(--color-ink-subtle)',
          margin:     '0.2rem 0 0',
        }}
      >
        {item.author}
      </p>
    </Link>
  )
}

// ─── Newsletter CTA ───────────────────────────────────────────────────────────

function NewsletterCard() {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-ink)',
        color:           'var(--color-background)',
        borderRadius:    'var(--radius-md)',
        padding:         'clamp(1rem, 1.8vw, 1.5rem)',
        display:         'flex',
        flexDirection:   'column',
        gap:             'clamp(0.4rem, 1svh, 0.75rem)',
      }}
    >
      <span
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-xxs)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         'var(--color-terra)',
        }}
      >
        ✉ Newsletter
      </span>
      <h4
        style={{
          fontFamily:    'var(--font-display)',
          fontWeight:    300,
          fontSize:      'clamp(1rem, 2svh, 1.375rem)',
          lineHeight:    1.1,
          letterSpacing: '-0.02em',
          color:         'var(--color-background)',
          margin:        0,
        }}
      >
        Was im Labor entsteht — direkt im Postfach.
      </h4>
      <form
        action="https://1789.us-east-1.list-manage.com/subscribe/post"
        method="post"
        target="_blank"
        style={{
          marginTop:    'clamp(0.25rem, 0.5svh, 0.5rem)',
          display:      'flex',
          gap:          '0.45rem',
          alignItems:   'stretch',
        }}
      >
        <input
          type="email"
          name="EMAIL"
          required
          placeholder="E-Mail"
          aria-label="E-Mail-Adresse"
          style={{
            flex:           1,
            minWidth:       0,
            fontFamily:     'var(--font-body)',
            fontSize:       'clamp(0.75rem, 1.35svh, 0.875rem)',
            paddingInline:  '0.75rem',
            paddingBlock:   '0.55rem',
            backgroundColor: 'rgba(242,242,242,0.06)',
            border:         '1px solid rgba(242,242,242,0.18)',
            borderRadius:   'var(--radius-sm)',
            color:          'var(--color-background)',
            outline:        'none',
          }}
        />
        <button
          type="submit"
          aria-label="Newsletter abonnieren"
          style={{
            fontFamily:      'var(--font-mono)',
            fontSize:        'var(--text-xxs)',
            letterSpacing:   '0.15em',
            textTransform:   'uppercase',
            color:           'var(--color-background)',
            backgroundColor: 'var(--color-terra)',
            border:          'none',
            paddingInline:   '0.85rem',
            paddingBlock:    '0.55rem',
            borderRadius:    'var(--radius-sm)',
            cursor:          'pointer',
            transition:      'background-color 180ms',
          }}
        >
          →
        </button>
      </form>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function LaborSection() {
  const featured = ITEMS.find((i) => i.tier === 'featured')!
  const mediums  = ITEMS.filter((i) => i.tier === 'medium')
  const list     = ITEMS.filter((i) => i.tier === 'list')

  return (
    <section
      className="scroll-card"
      style={{
        top:             '5rem',
        height:          'calc(100svh - 5rem)',
        paddingBlock:    'clamp(2rem, 4svh, 4rem)',
        backgroundColor: 'var(--color-background)',
        overflow:        'hidden',
        display:         'flex',
        flexDirection:   'column',
      }}
    >
      <Container className="labor-container" style={{ width: '100%', height: '100%', maxHeight: '920px', margin: 'auto 0', display: 'flex', flexDirection: 'column' }}>

        {/* ── Header — Tag + headline only ───────────────────────────────
            Description + "Alle Inhalte" moved to the bottom-right cluster
            next to the Newsletter card (see Tier 3 column below). */}
        <header style={{ flexShrink: 0, marginBottom: 'clamp(2.5rem, 5svh, 4.5rem)' }}>
          <Tag>Denk Labor</Tag>
          <h2
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    300,
              fontSize:      'clamp(1.75rem, 4svh, 4rem)',
              lineHeight:    1.02,
              letterSpacing: '-0.025em',
              color:         'var(--color-ink)',
              marginTop:     'clamp(1rem, 2svh, 1.75rem)',
              maxWidth:      '20ch',
            }}
          >
            Wo Organisationstheorie<br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-terra)' }}>
              auf Praxis trifft.
            </em>
          </h2>
        </header>

        {/* ── Three-tier spread ─────────────────────────────────────────── */}
        <div
          className="labor-grid"
          style={{
            flex:                1,
            minHeight:           0,
            display:             'grid',
            gridTemplateColumns: '5fr 4fr 3fr',
            gap:                 'clamp(1.25rem, 2.2vw, 2.25rem)',
          }}
        >
          {/* Tier 1 */}
          <FeaturedCard item={featured} />

          {/* Tier 2 — stacked mediums (top-aligned, so the first medium
              card's top sits on the same horizontal line as the featured
              card and the first list item in tier 3) */}
          <div
            style={{
              display:        'flex',
              flexDirection:  'column',
              justifyContent: 'flex-start',
              gap:            'clamp(0.75rem, 1.6svh, 1.25rem)',
              minHeight:      0,
            }}
          >
            {mediums.map((item) => (
              <MediumCard key={item.title} item={item} />
            ))}
          </div>

          {/* Tier 3 — list at top, footer+newsletter cluster pinned to the
              bottom via marginTop:auto so the Newsletter's bottom edge
              aligns with the Featured card's bottom on the left. */}
          <div
            style={{
              display:        'flex',
              flexDirection:  'column',
              minHeight:      0,
              height:         '100%',
            }}
          >
            <div>
              {list.map((item, i) => (
                <ListItem key={item.title} item={item} first={i === 0} />
              ))}
            </div>

            {/* Bottom cluster — description + Alle-Inhalte link + newsletter.
                marginTop:auto absorbs all free space above this cluster so
                the newsletter card lines up with the bottom of the featured
                card in the leftmost column. */}
            <div style={{ marginTop: 'auto' }}>
              <div
                style={{
                  paddingTop:    'clamp(1rem, 2svh, 1.5rem)',
                  paddingBottom: 'clamp(0.75rem, 1.5svh, 1rem)',
                  borderTop:     '1px solid var(--color-border)',
                  marginTop:     'clamp(0.75rem, 1.5svh, 1.25rem)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   'clamp(0.75rem, 1.35svh, 0.875rem)',
                    lineHeight: 1.55,
                    color:      'var(--color-ink-muted)',
                    margin:     0,
                  }}
                >
                  Podcasts, Essays, Whitepaper und Experimente — was im
                  Hintergrund unserer Arbeit entsteht.
                </p>
                <Link
                  href="/labor"
                  className="hover-line"
                  style={{
                    display:        'inline-block',
                    marginTop:      'clamp(0.5rem, 1svh, 0.75rem)',
                    fontFamily:     'var(--font-mono)',
                    fontSize:       'var(--text-xxs)',
                    letterSpacing:  '0.16em',
                    textTransform:  'uppercase',
                    color:          'var(--color-terra)',
                    textDecoration: 'none',
                  }}
                >
                  Alle Inhalte →
                </Link>
              </div>

              <NewsletterCard />
            </div>
          </div>
        </div>

      </Container>
    </section>
  )
}
