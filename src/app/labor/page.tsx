import Link from 'next/link'
import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'

// ─── Colours ─────────────────────────────────────────────────────────────────

const TERRA = '#F44D0B'
const SAGE  = '#4A6655'
const INK   = '#141210'
const SAND  = '#8B7355'

function wa(hex: string, a: number) {
  const n = parseInt(hex.replace('#', ''), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
}

// ─── Content types + data ───────────────────────────────────────────────────

type LaborType = 'Podcast' | 'Essay' | 'Whitepaper' | 'Experiment' | 'Prototyp' | 'Debatte' | 'Theorie'

type LaborItem = {
  type:      LaborType
  title:     string
  author?:   string
  guest?:    string
  date:      string
  duration?: string
  pages?:    string
  readTime?: string
  excerpt:   string
  image?:    string
  href:      string
  episode?:  number
}

const TYPE_STYLE: Record<LaborType, { accent: string; gradient: string }> = {
  Podcast:    { accent: TERRA, gradient: `linear-gradient(135deg, ${TERRA} 0%, #C13A06 100%)` },
  Essay:      { accent: SAGE,  gradient: `linear-gradient(150deg, #5C7D6B 0%, ${SAGE} 100%)` },
  Whitepaper: { accent: INK,   gradient: `linear-gradient(135deg, #2E2B28 0%, ${INK} 100%)` },
  Experiment: { accent: TERRA, gradient: `linear-gradient(120deg, ${TERRA} 0%, #B8CC8A 100%)` },
  Prototyp:   { accent: SAGE,  gradient: `linear-gradient(135deg, #5C7D6B 0%, ${SAGE} 100%)` },
  Debatte:    { accent: TERRA, gradient: `linear-gradient(160deg, ${TERRA} 0%, #C13A06 80%)` },
  Theorie:    { accent: SAND,  gradient: `linear-gradient(135deg, #A89478 0%, ${SAND} 100%)` },
}

// Featured + 11 more items for the bento grid.
const FEATURED: LaborItem = {
  type:     'Essay',
  title:    'Nähe als Organisationsprinzip — warum wir Corporate Therapy auf die Bühne bringen',
  author:   'Huma Nagafi',
  date:     'April 2024',
  readTime: '8 Min',
  excerpt:  'Eine Reflexion über Distanz, Vertrauen und die Frage, wieso Organisationen den Mut zur Nähe oft erst auf der Bühne finden — und was das für moderne Operating Models bedeutet.',
  image:    '/labor/Artikel_Cover_1.jpg',
  href:     '#',
}

const ITEMS: LaborItem[] = [
  {
    type:     'Podcast',
    title:    'Das Internet: Utopie, Infrastruktur, Schlachtfeld',
    guest:    'Marie Kilg',
    date:     'März 2024',
    duration: '47 Min',
    episode:  142,
    excerpt:  'Wie das Netz unsere Vorstellung von Öffentlichkeit, Macht und Selbstorganisation verändert hat — und welche Strukturen es heute braucht.',
    image:    '/labor/Artikel_Cover_2.webp',
    href:     '#',
  },
  {
    type:    'Whitepaper',
    title:   'Target Operating Models in regulierten Märkten',
    author:  '1789 Research',
    date:    'März 2024',
    pages:   '24 Seiten',
    excerpt: 'Wie Banken, Versicherer und Energieunternehmen Operating Models entwickeln, die Compliance-Anforderungen und Wertschöpfung gleichzeitig tragen.',
    image:   '/labor/Artikel_Cover_3.jpg',
    href:    '#',
  },
  {
    type:    'Experiment',
    title:   'Mission Boards als Entscheidungsformat',
    author:  'Pilot bei greyt.',
    date:    'Februar 2024',
    excerpt: 'Ein Format, das wöchentliche Entscheidungsroutinen so verankert, dass Verantwortung sichtbar wird — und Strategie nicht im Statusmeeting verschwindet.',
    href:    '#',
  },
  {
    type:     'Debatte',
    title:    'Selbstorganisation ist kein Selbstläufer',
    author:   'Mary Jane Bolton',
    date:     'Februar 2024',
    readTime: '6 Min',
    excerpt:  'Warum sich Selbstorganisation nicht installieren lässt — und welche Voraussetzungen Führung schaffen muss, damit sie überhaupt tragen kann.',
    href:     '#',
  },
  {
    type:    'Prototyp',
    title:   'Verantwortungslandkarte als Onboarding-Tool',
    author:  '1789 Research',
    date:    'Januar 2024',
    excerpt: 'Ein visueller Prototyp, der neue Mitarbeitende durch die ungeschriebenen Entscheidungswege ihrer Organisation führt.',
    href:    '#',
  },
  {
    type:     'Theorie',
    title:    'Strukturkopplung in komplexen Organisationen',
    author:   'Patrick Breitenbach',
    date:     'Januar 2024',
    readTime: '12 Min',
    excerpt:  'Eine Auseinandersetzung mit Luhmanns Begriff der Strukturkopplung und seiner Anwendbarkeit auf moderne Transformations­begleitung.',
    href:     '#',
  },
  {
    type:     'Podcast',
    title:    'Strategie und Struktur — was zuerst?',
    guest:    'Patrick Breitenbach',
    date:     'Januar 2024',
    duration: '52 Min',
    episode:  141,
    excerpt:  'Eine Debatte über die Henne-Ei-Frage der Organisations­entwicklung — und warum beide Antworten meistens unvollständig sind.',
    href:     '#',
  },
  {
    type:    'Essay',
    title:   'Operating Models sind keine Org-Charts',
    author:  'Huma Nagafi',
    date:    'Dezember 2023',
    readTime:'10 Min',
    excerpt: 'Warum der häufigste Reflex — "wir brauchen eine neue Aufbau­organisation" — meist die falsche Antwort auf das richtige Problem ist.',
    href:    '#',
  },
  {
    type:    'Experiment',
    title:   'Entscheidungs­tagebücher für Führungsteams',
    author:  '1789 Research',
    date:    'Dezember 2023',
    excerpt: 'Wir haben drei Führungsteams 90 Tage lang ein gemeinsames Entscheidungs­tagebuch führen lassen. Das sind die Befunde.',
    href:    '#',
  },
  {
    type:     'Podcast',
    title:    'Social Entrepreneurship ohne Illusionen',
    guest:    'Agnesa Kolica',
    date:     'Dezember 2023',
    duration: '51 Min',
    episode:  140,
    excerpt:  'Was es wirklich braucht, wenn Wirkung das Geschäftsmodell ist — und wie sich Strukturen anders verhalten müssen.',
    href:     '#',
  },
  {
    type:    'Debatte',
    title:   'KI ist kein Add-on zur Organisation',
    author:  'Mary Jane Bolton',
    date:    'November 2023',
    readTime:'7 Min',
    excerpt: 'Warum die meisten KI-Initiativen scheitern, weil sie als Tool-Einführung behandelt werden — und nicht als organisationaler Eingriff.',
    href:    '#',
  },
]

const TYPES: LaborType[] = ['Podcast', 'Essay', 'Whitepaper', 'Experiment', 'Prototyp', 'Debatte', 'Theorie']

const FORMATS = [
  {
    name:    'Corporate Therapy',
    kind:    'Podcast',
    cadence: 'wöchentlich',
    blurb:   'Gespräche über das Innere von Organisationen — Strukturen, Routinen, Wachstumsschmerzen.',
    href:    '#',
  },
  {
    name:    '1789 Research Letter',
    kind:    'Whitepaper',
    cadence: 'quartalsweise',
    blurb:   'Tiefere Analysen aus aktuellen Mandaten und unserer Auseinandersetzung mit Organisations­theorie.',
    href:    '#',
  },
  {
    name:    'Experimente aus dem Feld',
    kind:    'Experiment',
    cadence: 'unregelmäßig',
    blurb:   'Was wir in Piloten ausprobieren, dokumentieren und mit unseren Mandanten weiterentwickeln.',
    href:    '#',
  },
]

// ─── Helpers ────────────────────────────────────────────────────────────────

function itemMeta(item: LaborItem): string {
  const parts = []
  if (item.episode)  parts.push(`#${item.episode}`)
  if (item.duration) parts.push(item.duration)
  if (item.pages)    parts.push(item.pages)
  if (item.readTime) parts.push(item.readTime)
  parts.push(item.date)
  return parts.join(' · ')
}

function itemByline(item: LaborItem): string | null {
  if (item.author) return item.author
  if (item.guest)  return `mit ${item.guest}`
  return null
}

// ─── Teaser image (real <img> or gradient placeholder) ──────────────────────

function ItemTeaser({ item, size }: { item: LaborItem; size: 'hero' | 'large' | 'small' }) {
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
  const chipColor = item.type === 'Essay' || item.type === 'Theorie'
    ? 'rgba(26,23,20,0.85)'
    : 'rgba(255,255,255,0.95)'
  const ornament = item.episode ? `#${item.episode}` : item.type[0]

  const dim = size === 'hero' ? { chip: '0.75rem', orn: 'clamp(4rem, 8vw, 7rem)' }
            : size === 'large' ? { chip: '0.6875rem', orn: 'clamp(2.5rem, 5vw, 4.5rem)' }
            : { chip: '0.5rem', orn: '1.75rem' }

  return (
    <div style={{
      width:      '100%',
      height:     '100%',
      position:   'relative',
      background: t.gradient,
      overflow:   'hidden',
    }}>
      <span style={{
        position:      'absolute',
        top:           size === 'small' ? '0.5rem' : '1rem',
        left:          size === 'small' ? '0.6rem' : '1.1rem',
        fontFamily:    'var(--font-mono)',
        fontSize:      dim.chip,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color:         chipColor,
        opacity:       0.9,
      }}>
        {item.type}
      </span>
      <span
        aria-hidden="true"
        style={{
          position:      'absolute',
          bottom:        size === 'small' ? '-0.35rem' : '-0.75rem',
          right:         size === 'small' ? '0.4rem' : '1rem',
          fontFamily:    'var(--font-display)',
          fontStyle:     'italic',
          fontWeight:    300,
          fontSize:      dim.orn,
          color:         'rgba(255,255,255,0.32)',
          lineHeight:    0.9,
          letterSpacing: '-0.04em',
          userSelect:    'none',
        }}
      >
        {ornament}
      </span>
    </div>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      style={{
        paddingTop:      'calc(5rem + 5rem)',
        paddingBottom:   'clamp(3rem, 6vw, 5rem)',
        backgroundColor: 'var(--color-background)',
      }}
    >
      <Container>
        <Grid>
          <Col span={9}>
            <Tag>Denk Labor</Tag>
            <h1
              className="page-hero-h1"
              style={{
                fontFamily:    'var(--font-display)',
                fontWeight:    600,
                fontSize:      'clamp(2.75rem, 6.5vw, 6.5rem)',
                lineHeight:    0.98,
                letterSpacing: '-0.03em',
                color:         'var(--color-ink)',
                marginTop:     '1.75rem',
                maxWidth:      '22ch',
              }}
            >
              Wo Theorie<br />
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-terra)' }}>
                auf Praxis trifft.
              </em>
            </h1>
          </Col>
        </Grid>
        <Grid className="stack-cols" style={{ marginTop: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
          <Col span={6} start={4}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   'clamp(1rem, 1.25vw, 1.25rem)',
                lineHeight: 1.7,
                color:      'var(--color-ink-muted)',
                maxWidth:   '60ch',
              }}
            >
              Im Denk Labor veröffentlichen wir, woran wir denken: Whitepaper aus
              unserer Forschung, Prototypen aus laufenden Mandaten, Debatten­beiträge
              zu strukturellen Fragen und Podcast-Folgen mit Menschen, die uns
              herausfordern. Ein offenes Archiv unserer Auseinandersetzung mit
              Organisation.
            </p>
          </Col>
        </Grid>
      </Container>
    </section>
  )
}

// ─── Featured ──────────────────────────────────────────────────────────────

function FeaturedSection() {
  const item = FEATURED
  const meta = itemMeta(item)

  return (
    <section
      style={{
        paddingBlock:    'clamp(3rem, 6vw, 5rem)',
        backgroundColor: 'var(--color-background)',
        borderTop:       '1px solid var(--color-border)',
      }}
    >
      <Container>
        <p
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-xxs)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         'var(--color-terra)',
            margin:        0,
            marginBottom:  'clamp(1.5rem, 2vw, 2rem)',
          }}
        >
          ★ Featured · diese Woche
        </p>

        <Grid className="stack-cols" style={{ alignItems: 'center', gap: 'clamp(1.5rem, 3vw, 3rem)' }}>
          <Col span={7}>
            <Link
              href={item.href}
              style={{
                display:        'block',
                aspectRatio:    '3 / 2',
                width:          '100%',
                overflow:       'hidden',
                borderRadius:   'var(--radius-md)',
                textDecoration: 'none',
              }}
            >
              <ItemTeaser item={item} size="hero" />
            </Link>
          </Col>
          <Col span={5}>
            <p
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      'var(--text-xxs)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color:         TYPE_STYLE[item.type].accent,
                margin:        0,
                marginBottom:  '0.75rem',
              }}
            >
              {item.type} · {meta}
            </p>
            <h2
              style={{
                fontFamily:    'var(--font-display)',
                fontWeight:    500,
                fontSize:      'clamp(2rem, 3.5vw, 3.25rem)',
                lineHeight:    1.05,
                letterSpacing: '-0.025em',
                color:         'var(--color-ink)',
                margin:        0,
              }}
            >
              <Link href={item.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                {item.title}
              </Link>
            </h2>
            {item.author && (
              <p style={{
                fontFamily: 'var(--font-display)',
                fontStyle:  'italic',
                fontSize:   'clamp(1rem, 1.1vw, 1.125rem)',
                color:      'var(--color-ink-subtle)',
                margin:     '1rem 0 0',
              }}>
                {item.author}
              </p>
            )}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   'var(--text-base)',
                lineHeight: 1.7,
                color:      'var(--color-ink-muted)',
                margin:     '1.5rem 0 0',
              }}
            >
              {item.excerpt}
            </p>
            <Link
              href={item.href}
              className="hover-line"
              style={{
                display:        'inline-block',
                marginTop:      '2rem',
                fontFamily:     'var(--font-mono)',
                fontSize:       'var(--text-xxs)',
                letterSpacing:  '0.16em',
                textTransform:  'uppercase',
                color:          'var(--color-terra)',
                textDecoration: 'none',
              }}
            >
              Weiterlesen →
            </Link>
          </Col>
        </Grid>
      </Container>
    </section>
  )
}

// ─── Filter strip ──────────────────────────────────────────────────────────

function FilterStrip() {
  const counts: Record<string, number> = { Alle: ITEMS.length + 1 }
  for (const item of [FEATURED, ...ITEMS]) {
    counts[item.type] = (counts[item.type] ?? 0) + 1
  }
  const filters: { label: string; count: number; accent?: string }[] = [
    { label: 'Alle', count: counts.Alle },
    ...TYPES.map((t) => ({ label: t, count: counts[t] ?? 0, accent: TYPE_STYLE[t].accent })),
  ]

  return (
    <section
      style={{
        borderTop:       '1px solid var(--color-border)',
        borderBottom:    '1px solid var(--color-border)',
        backgroundColor: 'var(--color-background)',
      }}
    >
      <Container>
        <div
          style={{
            display:    'flex',
            gap:        'clamp(0.4rem, 0.8vw, 0.75rem)',
            flexWrap:   'wrap',
            paddingBlock: 'clamp(1rem, 1.6vw, 1.4rem)',
            alignItems: 'center',
          }}
        >
          {filters.map((f, i) => (
            <button
              key={f.label}
              type="button"
              style={{
                fontFamily:      'var(--font-mono)',
                fontSize:        'var(--text-xxs)',
                letterSpacing:   '0.16em',
                textTransform:   'uppercase',
                paddingInline:   '0.85rem',
                paddingBlock:    '0.45rem',
                borderRadius:    'var(--radius-full)',
                backgroundColor: i === 0 ? 'var(--color-ink)' : 'transparent',
                color:           i === 0 ? 'var(--color-background)' : 'var(--color-ink-muted)',
                border:          i === 0 ? '1px solid var(--color-ink)' : '1px solid var(--color-border)',
                cursor:          'pointer',
                transition:      'background-color 200ms, color 200ms',
              }}
            >
              {f.label}
              <span style={{
                marginLeft: '0.5rem',
                opacity:    i === 0 ? 0.6 : 0.5,
                fontSize:   '0.6875rem',
              }}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ─── Card components ──────────────────────────────────────────────────────

/** Large editorial card — image on top, body below. */
function LargeCard({ item }: { item: LaborItem }) {
  const accent = TYPE_STYLE[item.type].accent
  return (
    <Link
      href={item.href}
      style={{
        display:         'flex',
        flexDirection:   'column',
        height:          '100%',
        textDecoration:  'none',
        color:           'inherit',
        backgroundColor: 'var(--color-background)',
        borderRadius:    'var(--radius-md)',
        overflow:        'hidden',
        boxShadow:       '0 0 0 1px rgba(26,23,20,0.08)',
      }}
    >
      <div style={{ width: '100%', aspectRatio: '3 / 2', position: 'relative' }}>
        <ItemTeaser item={item} size="large" />
      </div>
      <div style={{ padding: 'clamp(1.25rem, 2vw, 2rem)', flex: 1, display: 'flex', flexDirection: 'column', gap: 'clamp(0.6rem, 0.9vw, 0.9rem)' }}>
        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-xxs)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         accent,
          margin:        0,
        }}>
          {item.type} · {itemMeta(item)}
        </p>
        <h3 style={{
          fontFamily:    'var(--font-display)',
          fontWeight:    500,
          fontSize:      'clamp(1.375rem, 2vw, 1.875rem)',
          lineHeight:    1.1,
          letterSpacing: '-0.02em',
          color:         'var(--color-ink)',
          margin:        0,
        }}>
          {item.title}
        </h3>
        {itemByline(item) && (
          <p style={{
            fontFamily: 'var(--font-display)',
            fontStyle:  'italic',
            fontSize:   'clamp(0.875rem, 1vw, 1rem)',
            color:      'var(--color-ink-subtle)',
            margin:     0,
          }}>
            {itemByline(item)}
          </p>
        )}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   'clamp(0.8125rem, 0.95vw, 0.9375rem)',
          lineHeight: 1.6,
          color:      'var(--color-ink-muted)',
          margin:     0,
        }}>
          {item.excerpt}
        </p>
      </div>
    </Link>
  )
}

/** Quote / opinion card — text-only, accent border-left, italic excerpt. */
function QuoteCard({ item }: { item: LaborItem }) {
  const accent = TYPE_STYLE[item.type].accent
  return (
    <Link
      href={item.href}
      style={{
        display:         'flex',
        flexDirection:   'column',
        height:          '100%',
        textDecoration:  'none',
        color:           'inherit',
        backgroundColor: wa(accent, 0.05),
        borderLeft:      `3px solid ${accent}`,
        borderRadius:    '0 var(--radius-md) var(--radius-md) 0',
        padding:         'clamp(1.5rem, 2.5vw, 2.25rem)',
        gap:             'clamp(0.6rem, 1vw, 1rem)',
      }}
    >
      <p style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      'var(--text-xxs)',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color:         accent,
        margin:        0,
      }}>
        {item.type} · {itemMeta(item)}
      </p>
      <h3 style={{
        fontFamily:    'var(--font-display)',
        fontStyle:     'italic',
        fontWeight:    300,
        fontSize:      'clamp(1.5rem, 2.4vw, 2.25rem)',
        lineHeight:    1.15,
        letterSpacing: '-0.02em',
        color:         'var(--color-ink)',
        margin:        0,
      }}>
        {item.title}
      </h3>
      {itemByline(item) && (
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize:   'clamp(0.875rem, 1.05vw, 1rem)',
          color:      'var(--color-ink-subtle)',
          margin:     0,
        }}>
          {itemByline(item)}
        </p>
      )}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize:   'clamp(0.875rem, 1vw, 1rem)',
        lineHeight: 1.7,
        color:      'var(--color-ink-muted)',
        margin:     'auto 0 0 0',
      }}>
        {item.excerpt}
      </p>
    </Link>
  )
}

/** Compact card — small image + text, for tighter grid cells. */
function CompactCard({ item }: { item: LaborItem }) {
  const accent = TYPE_STYLE[item.type].accent
  return (
    <Link
      href={item.href}
      style={{
        display:         'flex',
        flexDirection:   'column',
        height:          '100%',
        textDecoration:  'none',
        color:           'inherit',
        backgroundColor: 'var(--color-background)',
        borderRadius:    'var(--radius-md)',
        overflow:        'hidden',
        boxShadow:       '0 0 0 1px rgba(26,23,20,0.08)',
      }}
    >
      <div style={{ width: '100%', aspectRatio: '16 / 10', position: 'relative' }}>
        <ItemTeaser item={item} size="large" />
      </div>
      <div style={{ padding: 'clamp(1rem, 1.5vw, 1.4rem)', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-xxs)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         accent,
          margin:        0,
        }}>
          {item.type} · {itemMeta(item)}
        </p>
        <h4 style={{
          fontFamily:    'var(--font-display)',
          fontWeight:    500,
          fontSize:      'clamp(1.0625rem, 1.4vw, 1.375rem)',
          lineHeight:    1.15,
          letterSpacing: '-0.018em',
          color:         'var(--color-ink)',
          margin:        0,
        }}>
          {item.title}
        </h4>
        {itemByline(item) && (
          <p style={{
            fontFamily: 'var(--font-display)',
            fontStyle:  'italic',
            fontSize:   '0.875rem',
            color:      'var(--color-ink-subtle)',
            margin:     0,
          }}>
            {itemByline(item)}
          </p>
        )}
      </div>
    </Link>
  )
}

// ─── Bento content grid ────────────────────────────────────────────────────

function ContentGrid() {
  // Distribute the 11 items into a layout that mixes large image cards with
  // text-led quote cards every few rows for rhythm.
  const [a, b, c, d, e, f, g, h, i, j, k] = ITEMS

  return (
    <section style={{ paddingBlock: 'clamp(3rem, 6vw, 5rem)', backgroundColor: 'var(--color-background)' }}>
      <Container>
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap:                 'clamp(1.25rem, 2vw, 2rem)',
          }}
        >
          {/* Row 1 — Podcast + Whitepaper */}
          <div style={{ gridColumn: 'span 7' }}><LargeCard item={a} /></div>
          <div style={{ gridColumn: 'span 5' }}><LargeCard item={b} /></div>

          {/* Row 2 — Experiment + Debatte (quote card) */}
          <div style={{ gridColumn: 'span 5' }}><CompactCard item={c} /></div>
          <div style={{ gridColumn: 'span 7' }}><QuoteCard item={d} /></div>

          {/* Row 3 — Prototyp + Theorie (quote) + Podcast */}
          <div style={{ gridColumn: 'span 4' }}><CompactCard item={e} /></div>
          <div style={{ gridColumn: 'span 4' }}><QuoteCard item={f} /></div>
          <div style={{ gridColumn: 'span 4' }}><CompactCard item={g} /></div>

          {/* Row 4 — Essay + Experiment + Podcast */}
          <div style={{ gridColumn: 'span 5' }}><CompactCard item={h} /></div>
          <div style={{ gridColumn: 'span 7' }}><LargeCard item={i} /></div>

          {/* Row 5 — Debatte + Podcast */}
          <div style={{ gridColumn: 'span 7' }}><LargeCard item={j} /></div>
          <div style={{ gridColumn: 'span 5' }}><QuoteCard item={k} /></div>
        </div>
      </Container>
    </section>
  )
}

// ─── Formats showcase ─────────────────────────────────────────────────────

function FormatsSection() {
  return (
    <section
      style={{
        paddingBlock:    'clamp(4rem, 7vw, 6rem)',
        backgroundColor: 'var(--color-ink)',
        color:           'var(--color-background)',
      }}
    >
      <Container>
        <Grid>
          <Col span={8}>
            <p style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-xxs)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         'var(--color-terra)',
              margin:        0,
              marginBottom:  '1.25rem',
            }}>
              Formate
            </p>
            <h2 style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    600,
              fontSize:      'clamp(2rem, 3.5vw, 3.5rem)',
              lineHeight:    1,
              letterSpacing: '-0.025em',
              color:         'var(--color-background)',
              margin:        0,
            }}>
              Wiederkehrende<br />
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-terra)' }}>
                Auseinandersetzungen.
              </em>
            </h2>
          </Col>
        </Grid>

        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 'clamp(1.25rem, 2vw, 2rem)',
            marginTop:           'clamp(2.5rem, 4vw, 4rem)',
          }}
          className="labor-formats"
        >
          {FORMATS.map((f) => {
            const accent = TYPE_STYLE[f.kind as LaborType]?.accent ?? TERRA
            return (
              <Link
                key={f.name}
                href={f.href}
                style={{
                  display:        'flex',
                  flexDirection:  'column',
                  gap:            '1rem',
                  padding:        'clamp(1.5rem, 2.5vw, 2rem)',
                  borderRadius:   'var(--radius-md)',
                  border:         '1px solid rgba(242,242,242,0.12)',
                  textDecoration: 'none',
                  color:          'inherit',
                  transition:     'border-color 200ms, background-color 200ms',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      'var(--text-xxs)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color:         accent,
                  }}>
                    {f.kind}
                  </span>
                  <span style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.6875rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color:         'rgba(242,242,242,0.4)',
                  }}>
                    {f.cadence}
                  </span>
                </div>
                <h3 style={{
                  fontFamily:    'var(--font-display)',
                  fontWeight:    500,
                  fontSize:      'clamp(1.5rem, 2vw, 2rem)',
                  lineHeight:    1.05,
                  letterSpacing: '-0.02em',
                  color:         'var(--color-background)',
                  margin:        0,
                }}>
                  {f.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '0.9375rem',
                  lineHeight: 1.6,
                  color:      'rgba(242,242,242,0.6)',
                  margin:     0,
                }}>
                  {f.blurb}
                </p>
                <span style={{
                  marginTop:      'auto',
                  paddingTop:     '1rem',
                  fontFamily:     'var(--font-mono)',
                  fontSize:       'var(--text-xxs)',
                  letterSpacing:  '0.15em',
                  textTransform:  'uppercase',
                  color:          accent,
                }}>
                  Alle Folgen →
                </span>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

// ─── Newsletter CTA ────────────────────────────────────────────────────────

function NewsletterCTA() {
  return (
    <section
      style={{
        paddingBlock:    'clamp(4rem, 8vw, 7rem)',
        backgroundColor: 'var(--color-background)',
      }}
    >
      <Container>
        <div
          style={{
            display:         'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap:             'clamp(1.5rem, 3vw, 3rem)',
            alignItems:      'center',
            padding:         'clamp(2rem, 4vw, 4rem)',
            borderRadius:    'var(--radius-md)',
            border:          '1px solid var(--color-border)',
            backgroundColor: 'var(--color-background)',
          }}
        >
          <div style={{ gridColumn: 'span 7' }}>
            <p style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-xxs)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         'var(--color-terra)',
              margin:        0,
              marginBottom:  '0.875rem',
            }}>
              ✉ Newsletter
            </p>
            <h2 style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    500,
              fontSize:      'clamp(1.875rem, 3.5vw, 3rem)',
              lineHeight:    1.05,
              letterSpacing: '-0.025em',
              color:         'var(--color-ink)',
              margin:        0,
            }}>
              Neue Beiträge<br />
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-terra)' }}>
                direkt im Postfach.
              </em>
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-base)',
              lineHeight: 1.7,
              color:      'var(--color-ink-muted)',
              maxWidth:   '48ch',
              margin:     '1.25rem 0 0',
            }}>
              Etwa einmal im Monat — Whitepaper, Essays, neue Podcastfolgen.
              Nie Spam, immer ohne Pflichtfelder.
            </p>
          </div>
          <form
            action="https://1789.us-east-1.list-manage.com/subscribe/post"
            method="post"
            target="_blank"
            style={{
              gridColumn:    'span 5',
              display:       'flex',
              flexDirection: 'column',
              gap:           '0.75rem',
            }}
          >
            <input
              type="email"
              name="EMAIL"
              required
              placeholder="ihre@email.de"
              aria-label="E-Mail-Adresse"
              style={{
                fontFamily:      'var(--font-body)',
                fontSize:        'clamp(0.9375rem, 1.05vw, 1.0625rem)',
                paddingInline:   '1.25rem',
                paddingBlock:    '0.9rem',
                backgroundColor: 'transparent',
                border:          '1px solid var(--color-border)',
                borderRadius:    'var(--radius-sm)',
                color:           'var(--color-ink)',
                outline:         'none',
              }}
            />
            <button
              type="submit"
              style={{
                fontFamily:      'var(--font-mono)',
                fontSize:        'var(--text-xxs)',
                letterSpacing:   '0.16em',
                textTransform:   'uppercase',
                color:           'var(--color-background)',
                backgroundColor: 'var(--color-terra)',
                border:          'none',
                paddingBlock:    '0.95rem',
                borderRadius:    'var(--radius-sm)',
                cursor:          'pointer',
              }}
            >
              Newsletter abonnieren →
            </button>
          </form>
        </div>
      </Container>
    </section>
  )
}

// ─── Archive footer ────────────────────────────────────────────────────────

function ArchiveFooter() {
  return (
    <section
      style={{
        paddingBlock:    'clamp(3rem, 5vw, 4rem)',
        backgroundColor: 'var(--color-background)',
        borderTop:       '1px solid var(--color-border)',
      }}
    >
      <Container>
        <Grid>
          <Col span={6}>
            <p style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-xxs)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         'var(--color-ink-subtle)',
              margin:        0,
              marginBottom:  '0.75rem',
            }}>
              Archiv
            </p>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontStyle:  'italic',
              fontSize:   'clamp(1.125rem, 1.6vw, 1.5rem)',
              lineHeight: 1.4,
              color:      'var(--color-ink-muted)',
              margin:     0,
              maxWidth:   '46ch',
            }}>
              Über 140 Podcast-Folgen, 30+ Essays und Whitepaper aus zwei Jahrzehnten
              Auseinandersetzung mit Organisation.
            </p>
          </Col>
          <Col span={4} start={9} style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Link
              href="#"
              className="hover-line"
              style={{
                fontFamily:     'var(--font-mono)',
                fontSize:       'var(--text-xs)',
                letterSpacing:  '0.16em',
                textTransform:  'uppercase',
                color:          'var(--color-terra)',
                textDecoration: 'none',
              }}
            >
              Vollständiges Archiv →
            </Link>
          </Col>
        </Grid>
      </Container>
    </section>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function Labor() {
  return (
    <main>
      <HeroSection />
      <FeaturedSection />
      <FilterStrip />
      <ContentGrid />
      <FormatsSection />
      <NewsletterCTA />
      <ArchiveFooter />
    </main>
  )
}
