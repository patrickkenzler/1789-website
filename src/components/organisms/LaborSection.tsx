/**
 * LaborSection — editorial magazine spread for the Denk-Labor feed
 *
 * Layout: one large featured card on the left, five compact thumbnail
 * cards stacked vertically on the right. Mixed content types — Podcast,
 * Essay, Whitepaper, Experiment — each carrying its own teaser graphic.
 *
 * Teaser images are placeholder gradients with a typ-specific ornament
 * (episode number for podcasts, large initial for essays/whitepapers,
 * abstract dot field for experiments) until real artwork is commissioned.
 * Real images are supported via the optional `image` field on each item.
 */

import Link from 'next/link'
import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'

// ─── Data ─────────────────────────────────────────────────────────────────────

type LaborType = 'Podcast' | 'Essay' | 'Whitepaper' | 'Experiment'

type LaborItem = {
  type:   LaborType
  title:  string
  author: string
  meta:   string            // "#142 · 47 Min" or "8 Min · 2024" etc.
  intro?: string            // shown only on the featured card
  href:   string
  image?: string            // optional real-image path under /public
  // ornament override — useful for podcasts (episode num) and talks (date)
  ornament?: string
}

const ITEMS: LaborItem[] = [
  // ── Featured ─────────────────────────────────────────────────────────
  {
    type:     'Essay',
    title:    'Nähe als Organisationsprinzip — warum wir Corporate Therapy auf die Bühne bringen',
    author:   'Huma Nagafi',
    meta:     '8 Min · 2024',
    intro:    'Eine Reflexion über Distanz, Vertrauen und die Frage, wieso Organisationen den Mut zur Nähe oft erst auf der Bühne finden.',
    href:     '/labor',
    ornament: 'E',
  },
  // ── Thumbnail column ────────────────────────────────────────────────
  {
    type:     'Podcast',
    title:    'Das Internet: Utopie, Infrastruktur, Schlachtfeld',
    author:   'mit Marie Kilg',
    meta:     '#142 · 47 Min',
    href:     '/labor',
    ornament: '#142',
  },
  {
    type:     'Whitepaper',
    title:    'Target Operating Models in regulierten Märkten',
    author:   '1789 Research',
    meta:     '24 Seiten · 2024',
    href:     '/labor',
    ornament: 'WP',
  },
  {
    type:     'Experiment',
    title:    'Mission Boards als Entscheidungsformat',
    author:   'Pilot bei greyt.',
    meta:     'Pilot · 2023',
    href:     '/labor',
    ornament: 'X',
  },
  {
    type:     'Podcast',
    title:    'Strategie und Struktur — was zuerst?',
    author:   'mit Patrick Breitenbach',
    meta:     '#141 · 52 Min',
    href:     '/labor',
    ornament: '#141',
  },
  {
    type:     'Essay',
    title:    'Selbstorganisation ist kein Selbstläufer',
    author:   'Mary Jane Bolton',
    meta:     '6 Min · 2024',
    href:     '/labor',
    ornament: 'E',
  },
]

// ─── Type-specific styling for teaser placeholders ────────────────────────────

const TYPE_STYLE: Record<LaborType, { gradient: string; chipColor: string }> = {
  Podcast:    {
    gradient:  'linear-gradient(135deg, #F44D0B 0%, #C13A06 100%)',
    chipColor: 'rgba(255,255,255,0.95)',
  },
  Essay:      {
    gradient:  'linear-gradient(150deg, #B8CC8A 0%, #8FA66A 100%)',
    chipColor: 'rgba(26,23,20,0.85)',
  },
  Whitepaper: {
    gradient:  'linear-gradient(135deg, #2E2B28 0%, #1A1714 100%)',
    chipColor: 'rgba(242,242,242,0.95)',
  },
  Experiment: {
    gradient:  'linear-gradient(120deg, #F44D0B 0%, #B8CC8A 100%)',
    chipColor: 'rgba(255,255,255,0.95)',
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
      {/* Type chip — top-left */}
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

      {/* Big italic ornament — bottom-right */}
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

      {/* Decorative dot field on Experiment placeholder only */}
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

// ─── Featured card (large, left) ─────────────────────────────────────────────

function FeaturedCard({ item }: { item: LaborItem }) {
  return (
    <Link
      href={item.href}
      style={{
        display:         'flex',
        flexDirection:   'column',
        height:          '100%',
        minHeight:       0,
        borderRadius:    'var(--radius-md)',
        overflow:        'hidden',
        backgroundColor: 'var(--color-background)',
        boxShadow:       '0 0 0 1px rgba(26,23,20,0.08)',
        textDecoration:  'none',
        color:           'inherit',
      }}
    >
      {/* Teaser — top portion */}
      <div style={{ flex: '0 0 58%', minHeight: 0, position: 'relative' }}>
        <ItemTeaser item={item} size="large" />
      </div>

      {/* Text body */}
      <div
        style={{
          flex:          1,
          minHeight:     0,
          display:       'flex',
          flexDirection: 'column',
          padding:       'clamp(1rem, 2vw, 1.75rem)',
          gap:           'clamp(0.35rem, 0.8svh, 0.65rem)',
        }}
      >
        <span className="c-eyebrow">
          {item.type} · {item.meta}
        </span>
        <h3
          style={{
            fontFamily:    'var(--font-display)',
            fontWeight:    300,
            fontSize:      'clamp(1.25rem, 2.6svh, 1.875rem)',
            lineHeight:    1.1,
            letterSpacing: '-0.02em',
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
              fontSize:   'clamp(0.8125rem, 1.5svh, 0.9375rem)',
              lineHeight: 1.55,
              color:      'var(--color-ink-muted)',
              margin:     0,
              marginTop:  '0.25rem',
            }}
          >
            {item.intro}
          </p>
        )}
      </div>
    </Link>
  )
}

// ─── Thumbnail card (compact, right column) ──────────────────────────────────

function ThumbnailCard({ item }: { item: LaborItem }) {
  return (
    <Link
      href={item.href}
      className="labor-thumb"
      style={{
        flex:           1,
        minHeight:      0,
        display:        'grid',
        gridTemplateColumns: 'auto 1fr',
        gap:            'clamp(0.85rem, 1.5vw, 1.25rem)',
        alignItems:     'stretch',
        textDecoration: 'none',
        color:          'inherit',
        transition:     'opacity 200ms',
      }}
    >
      {/* Teaser */}
      <div
        style={{
          aspectRatio:  '1 / 1',
          height:       '100%',
          maxHeight:    '100%',
          minHeight:    0,
          overflow:     'hidden',
          borderRadius: 'var(--radius-sm)',
          flexShrink:   0,
        }}
      >
        <ItemTeaser item={item} size="small" />
      </div>

      {/* Text */}
      <div
        style={{
          minWidth:       0,
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          gap:            '0.2rem',
        }}
      >
        <span className="c-eyebrow">
          {item.type} · {item.meta}
        </span>
        <h4
          style={{
            fontFamily:    'var(--font-display)',
            fontWeight:    300,
            fontSize:      'clamp(0.9375rem, 1.8svh, 1.125rem)',
            lineHeight:    1.2,
            letterSpacing: '-0.015em',
            color:         'var(--color-ink)',
            margin:        0,
            display:       '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow:      'hidden',
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

// ─── Main section ─────────────────────────────────────────────────────────────

export function LaborSection() {
  const [featured, ...rest] = ITEMS

  return (
    <section
      className="scroll-card"
      style={{
        top:             '5rem',
        height:          'calc(100svh - 5rem)',
        paddingBlock:    'clamp(2rem, 4svh, 4rem)',
        backgroundColor: 'var(--color-background)',
        overflow:        'hidden',
      }}
    >
      <Container style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* ── Header ────────────────────────────────────────────────────── */}
        <header style={{ flexShrink: 0, marginBottom: 'clamp(1.5rem, 3svh, 2.5rem)' }}>
          <Grid className="stack-cols" style={{ alignItems: 'flex-end' }}>
            <Col span={7}>
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
                }}
              >
                Wo Organisationstheorie<br />
                <em style={{ fontStyle: 'italic', color: 'var(--color-terra)' }}>
                  auf Praxis trifft.
                </em>
              </h2>
            </Col>
            <Col span={5} style={{ paddingBottom: '0.25rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   'clamp(0.8125rem, 1.55svh, 1.0625rem)',
                  lineHeight: 1.65,
                  color:      'var(--color-ink-muted)',
                  maxWidth:   '46ch',
                  margin:     0,
                }}
              >
                Podcasts, Essays, Whitepaper und Experimente — was im Hintergrund
                unserer Arbeit entsteht.
              </p>
              <Link
                href="/labor"
                className="hover-line"
                style={{
                  display:        'inline-block',
                  marginTop:      '1rem',
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
            </Col>
          </Grid>
        </header>

        {/* ── Spread: featured (left) + thumbnail column (right) ───────── */}
        <div
          className="labor-grid"
          style={{
            flex:                1,
            minHeight:           0,
            display:             'grid',
            gridTemplateColumns: '7fr 5fr',
            gap:                 'clamp(1.5rem, 2.5vw, 2.5rem)',
          }}
        >
          <FeaturedCard item={featured} />

          <div
            style={{
              display:        'flex',
              flexDirection:  'column',
              gap:            'clamp(0.75rem, 1.6svh, 1.25rem)',
              minHeight:      0,
            }}
          >
            {rest.map((item) => (
              <ThumbnailCard key={item.title} item={item} />
            ))}
          </div>
        </div>

      </Container>
    </section>
  )
}
