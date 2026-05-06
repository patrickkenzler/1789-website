import Link from 'next/link'
import { Container, Grid, Col } from '@/components/layout/Grid'
import { Button } from '@/components/atoms/Button'
import { Tag } from '@/components/atoms/Tag'
import { featuredCases } from '@/data/cases'
import { HeroLogo } from '@/components/organisms/HeroLogo'
import { SystemshiftAccordion } from '@/components/organisms/SystemshiftAccordion'
import { TestimonialsSection } from '@/components/organisms/TestimonialsSection'
import { StickyScrollSection } from '@/components/layout/StickyScrollSection'

// ─── Pillar icons ─────────────────────────────────────────────────────────────

/** Segmented circle — pixelated ring built from 18 rectangular arcs */
function PillarIcon1() {
  return (
    <svg width="40" height="40" viewBox="0 0 125 125" fill="none" aria-hidden="true">
      <path d="M31.8008 8V30.7H62.1008V0C51.1008 0 40.7008 3 31.8008 8Z" fill="var(--color-terra)"/>
      <path d="M0.0996094 62.0002H30.7996V31.7002H8.09961C3.09961 40.6002 0.0996094 51.0002 0.0996094 62.0002Z" fill="var(--color-terra)"/>
      <path d="M62.1008 31.7002H31.8008V62.0002H62.1008V31.7002Z" fill="var(--color-terra)"/>
      <path d="M62.1008 63H31.8008V93.3H62.1008V63Z" fill="var(--color-terra)"/>
      <path d="M94.3008 30.7001H116.401C111.001 21.6001 103.401 14.0001 94.3008 8.6001V30.7001Z" fill="var(--color-terra)"/>
      <path d="M63.0996 0V30.7H93.3996V8C84.3996 3 74.0996 0 63.0996 0Z" fill="var(--color-terra)"/>
      <path d="M30.7996 63H0.0996094C0.199609 74 3.0996 84.3 8.1996 93.3H30.7996V63Z" fill="var(--color-terra)"/>
      <path d="M93.3996 31.7002H63.0996V62.0002H93.3996V31.7002Z" fill="var(--color-terra)"/>
      <path d="M62.1008 125V94.2002H31.8008V116.9C40.7008 121.9 51.1008 124.9 62.1008 125Z" fill="var(--color-terra)"/>
      <path d="M93.3 94.2002H63V124.9C74 124.8 84.3 121.9 93.3 116.8V94.2002Z" fill="var(--color-terra)"/>
      <path d="M30.7992 30.7001V8.6001C21.6992 14.0001 14.0992 21.6001 8.69922 30.7001H30.7992Z" fill="var(--color-terra)"/>
      <path d="M30.7992 94.2002H8.69922C14.0992 103.3 21.6992 110.9 30.7992 116.3V94.2002Z" fill="var(--color-terra)"/>
      <path d="M94.3008 94.2002V116.3C103.401 110.9 111.001 103.3 116.401 94.2002H94.3008Z" fill="var(--color-terra)"/>
      <path d="M93.3996 63H63.0996V93.3H93.3996V63Z" fill="var(--color-terra)"/>
      <path d="M125.001 63H94.3008V93.2H117.001C122.001 84.3 125.001 74 125.001 63Z" fill="var(--color-terra)"/>
      <path d="M94.3008 31.7002V62.0002H125.001C124.901 51.0002 122.001 40.7002 116.901 31.7002H94.3008Z" fill="var(--color-terra)"/>
    </svg>
  )
}

/** Eight outward-pointing chevrons — compass / radiate pattern */
function PillarIcon3() {
  return (
    <svg width="40" height="40" viewBox="0 0 125 125" fill="none" aria-hidden="true">
      <path d="M0 74.5405V104.716C0 107.614 3.49998 109.113 5.59998 107.015L35.7999 76.8387C37.8999 74.7404 36.4 71.2432 33.5 71.2432H3.19995C1.39995 71.2432 0 72.642 0 74.5405Z" fill="var(--color-terra)"/>
      <path d="M35.7999 48.1613L5.59998 17.9854C3.49998 15.8871 0 17.3859 0 20.2836V50.4594C0 52.258 1.49993 53.7568 3.29993 53.7568H33.5C36.4 53.7568 37.7999 50.2596 35.7999 48.1613Z" fill="var(--color-terra)"/>
      <path d="M50.4002 0.100098H20.2003C17.3003 0.100098 15.8002 3.59729 17.9002 5.69561L48.1003 35.8715C50.2003 37.9698 53.7003 36.471 53.7003 33.5733V3.39746C53.7003 1.49898 52.3002 0.100098 50.4002 0.100098Z" fill="var(--color-terra)"/>
      <path d="M71.1992 3.29737V33.4732C71.1992 36.3709 74.6992 37.8697 76.7992 35.7714L106.999 5.59553C109.099 3.49721 107.599 0 104.699 0H74.4993C72.5993 0.0999201 71.1992 1.4988 71.1992 3.29737Z" fill="var(--color-terra)"/>
      <path d="M89.1 76.8387L119.3 107.015C121.4 109.113 124.9 107.614 124.9 104.716V74.5405C124.9 72.742 123.4 71.2432 121.6 71.2432H91.3999C88.4999 71.2432 87.1 74.7404 89.1 76.8387Z" fill="var(--color-terra)"/>
      <path d="M125.001 50.4594V20.2836C125.001 17.3859 121.501 15.8871 119.401 17.9854L89.201 48.1613C87.101 50.2596 88.6011 53.7568 91.5011 53.7568H121.701C123.501 53.7568 125.001 52.3579 125.001 50.4594Z" fill="var(--color-terra)"/>
      <path d="M71.1992 91.5268V121.703C71.1992 123.501 72.6993 125 74.4993 125H104.699C107.599 125 109.099 121.503 106.999 119.404L76.7992 89.2286C74.6992 87.1303 71.1992 88.5292 71.1992 91.5268Z" fill="var(--color-terra)"/>
      <path d="M48.1003 89.1285L17.9002 119.304C15.8002 121.403 17.3003 124.9 20.2003 124.9H50.4002C52.2002 124.9 53.7003 123.401 53.7003 121.603V91.4267C53.7003 88.529 50.2003 87.1301 48.1003 89.1285Z" fill="var(--color-terra)"/>
    </svg>
  )
}

const pillarIcons = [
  <PillarIcon1 key="i1" />,
  <img key="i2" src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/icons/icon_2.png`} width={40} height={40} alt="" aria-hidden="true" style={{ display: 'block' }} />,
  <PillarIcon3 key="i3" />,
]

// ─── Data ────────────────────────────────────────────────────────────────────

const pillars = [
  {
    num: '01',
    title: 'Modeling',
    body: 'Wir beginnen nicht mit Lösungen, sondern übersetzen Beobachtungen in Hypothesen. Welche Entscheidungen, Rollen, Erwartungen und informalen Routinen halten die Organisation zusammen? Daraus entsteht ein Zielmodell
- nicht als Blueprint, sondern als Arbeitsgegenstand für
Führung.',
    items: ['Research', 'Zielbild', 'Designprinzipien', 'Rollen & Rechenschaft'],
  },
  {
    num: '02',
    title: 'Structuration',
    body: 'Struktur entsteht nicht im Rollout. Die Organisation arbeitet sich am Modell ab, prüft, widerspricht, passt an
— und macht es dadurch zu ihrer eigenen Struktur. Was trägt, wird verstetigt. Was nicht trägt, verändert das Modell.',
    items: ['Prototyp', 'Sparring', 'Simulation', 'Einpassung'],
  },
  {
    num: '03',
    title: 'AI-Human-Native',
    body: 'Al ist kein Add-on zur Organisation. Wenn Arbeit neu geordnet wird, denken wir Al als Medium mit: in Rollen, Workflows, Entscheidungen und im Zugriff auf organisationales Wissen.',
    items: ['AI Operating System', 'AI enabled Structures', 'AI Mediation bei Human to Human Erwartungsstrukturen', 'AI Companions'],
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
      <StickyScrollSection style={{ backgroundColor: 'var(--color-background)' }}>
        <section style={{ paddingBlock: '3rem 4rem' }}>
          <Container>

            {/* ── Headline ── */}
            <div style={{ marginBottom: '2rem' }}>
              <Tag>DER 1789-BLICK</Tag>
              <div style={{ marginTop: '1.75rem' }}>
                <p style={displayStyle}>Was heute blockiert, —</p>
                <p style={{ ...displayStyle, marginTop: '0.12em', fontStyle: 'italic', color: 'var(--color-terra)' }}>
                   hat gestern getragen.
                </p>
              </div>
            </div>

            {/* ── Intro copy ── */}
            <Grid className="stack-cols">
              <Col span={5}>
                <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75', textAlign: 'left' }}>
                Jede Organisation lebt von Entscheidungen, Routinen und informalen Lösungen, die einmal funktioniert haben. Wir legen frei, welche Ordnung heute noch trägt, wo sie blockiert und was neu entschieden werden muss damit Verantwortung greift, Veränderung tragfähig wird und Wertschöpfung & Wirkung entstehen.</p>
              </Col>
            </Grid>

            {/* ── Pillars ── */}
            <Grid className="stack-cols mt-10">
              {pillars.map((pillar, i) => (
                <Col key={pillar.title} span={4}>
                  <div
                    className="card h-full flex flex-col"
                    style={{ padding: '1.75rem', position: 'relative' }}
                  >
                    {/* Icon — upper right corner */}
                    <div
                      aria-hidden="true"
                      style={{
                        position:      'absolute',
                        top:           '1.25rem',
                        right:         '1.25rem',
                        opacity:       1,
                        pointerEvents: 'none',
                        lineHeight:    0,
                      }}
                    >
                      {pillarIcons[i]}
                    </div>

                    {/* Title — prominent, no number eyebrow */}
                    <h3
                      style={{
                        fontFamily:    'var(--font-display)',
                        fontWeight:    400,
                        fontSize:      'clamp(1.75rem, 2.5vw, 2.5rem)',
                        lineHeight:    1.05,
                        letterSpacing: '-0.025em',
                        color:         'var(--color-ink)',
                        marginTop:     0,
                        paddingRight:  '3rem', /* clear the icon */
                      }}
                    >
                      {pillar.title}
                    </h3>

                    {/* Body copy */}
                    <p className="c-body" style={{ marginTop: '1rem' }}>
                      {pillar.body}
                    </p>

                    {/* Divider */}
                    <div
                      style={{
                        marginTop:       '1.25rem',
                        marginBottom:    '1.25rem',
                        height:          '1px',
                        backgroundColor: 'var(--color-border)',
                      }}
                    />

                    {/* Bullet list */}
                    <ul className="flex flex-col gap-2 mt-auto">
                      {pillar.items.map((item) => (
                        <li key={item} className="flex items-baseline gap-2">
                          <span
                            style={{
                              color:      'var(--color-terra)',
                              fontFamily: 'var(--font-mono)',
                              fontSize:   'var(--text-xxs)',
                              flexShrink: 0,
                            }}
                          >
                            →
                          </span>
                          <span
                            style={{
                              fontFamily:    'var(--font-mono)',
                              fontSize:      'var(--text-xxs)',
                              letterSpacing: '0.06em',
                              color:         'var(--color-ink-muted)',
                              lineHeight:    1.5,
                            }}
                          >
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

      </StickyScrollSection>

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
      <section style={{ flex: 1, minHeight: 0, overflow: 'hidden', paddingBlock: '3rem', display: 'flex', flexDirection: 'column' }}>
        <Container style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
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
              <Link href="/projekte">
                <Button variant="ghost" size="sm" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'var(--color-background)' }}>
                  Alle Cases →
                </Button>
              </Link>
            </Col>
          </Grid>

          <Grid className="stack-cols mt-8" style={{ flex: 1, minHeight: 0, gridAutoRows: '1fr' }}>
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
                <Link
                  key={c.slug}
                  href={`/projekte/${c.slug}`}
                  className="card-dark group flex flex-col cursor-pointer"
                  style={{
                    gridColumn:      'span 4',
                    backgroundColor: bg,
                    height:          '100%',
                    textDecoration:  'none',
                    overflow:        'hidden',
                  }}
                >
                  {/* ── Title image slot ── */}
                  <div
                    style={{
                      position:           'relative',
                      height:             '55%',
                      flexShrink:         0,
                      overflow:           'hidden',
                      backgroundImage:    c.image ? `url(${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${c.image})` : placeholderBg,
                      backgroundSize:     'cover',
                      backgroundPosition: 'center',
                      backgroundColor:    '#0D0B0A',
                    }}
                  >
                    {/* Subtle brand tint — fades on hover */}
                    {c.image && (
                      <div
                        className="case-img-overlay"
                        style={{
                          position:        'absolute',
                          top:             0,
                          right:           0,
                          bottom:          0,
                          left:            0,
                          backgroundColor: overlayColors[i % 3],
                          opacity:         0.18,
                          transition:      'opacity 300ms var(--ease-standard)',
                        }}
                      />
                    )}
                    {/* Client badge — always on image, same style as testimonials */}
                    <div
                      style={{
                        position:        'absolute',
                        bottom:          '0.875rem',
                        left:            '1rem',
                        fontFamily:      'var(--font-mono)',
                        fontSize:        '0.595rem',
                        letterSpacing:   '0.15em',
                        textTransform:   'uppercase',
                        color:           'var(--color-terra)',
                        backgroundColor: 'rgba(242,242,242,0.94)',
                        padding:         '0.28rem 0.65rem',
                        borderRadius:    '3px',
                        whiteSpace:      'nowrap',
                      }}
                    >
                      {c.client}
                    </div>
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
                      <h3
                        className="c-title"
                        style={{ fontSize: 'clamp(1.1rem, 1.3vw, 1.4rem)', lineHeight: '1.45', color: fg }}
                      >
                        {c.teaser ?? c.title}
                      </h3>
                      <p className="mt-3 font-mono text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        {c.duration} · {c.scale}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </Grid>
        </Container>
      </section>

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
              <Link
                href="/labor"
                className="hover-line inline-block mt-8 font-body uppercase tracking-widest"
                style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--color-ink-muted)' }}
              >
                Alle Inhalte →
              </Link>
            </Col>
          </Grid>

          <Grid className="stack-cols mt-16">
            {/* ── Left: latest podcast episode with embedded player ── */}
            <Col span={6}>
              <div
                className="card"
                style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <div className="p-8 pb-5">
                  <span className="c-eyebrow c-eyebrow--terra" style={{ marginBottom: '0.25rem' }}>
                    ★ Aktuelle Folge · #142
                  </span>
                  <h3 className="c-title">
                    Das Internet: Utopie, Infrastruktur, Schlachtfeld
                  </h3>
                  <p className="c-body" style={{ fontStyle: 'italic', color: 'var(--color-ink-subtle)' }}>
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
                  <Link
                    href="/podcast"
                    className="hover-line font-body uppercase tracking-widest"
                    style={{ fontSize: 'var(--text-xxs)', fontWeight: 500, color: 'var(--color-terra)' }}
                  >
                    Alle Folgen →
                  </Link>
                </div>
              </div>
            </Col>

            {/* ── Right: essay + upcoming event ── */}
            <Col span={6}>
              <div className="flex flex-col gap-6 h-full">

                {/* Essay by Human Nagafi */}
                <Link
                  href="/labor"
                  className="card flex-1 block"
                  style={{ padding: '1.75rem', textDecoration: 'none' }}
                >
                  <span className="c-eyebrow">
                    Essay
                  </span>
                  <h3 className="c-title">
                    Nähe als Organisationsprinzip — warum wir Corporate Therapy auf die Bühne bringen
                  </h3>
                  <p className="c-body" style={{ fontStyle: 'italic', color: 'var(--color-ink-subtle)' }}>
                    Human Nagafi
                  </p>
                  <p className="c-meta">
                    Essay · 8 Min · 2024
                  </p>
                </Link>

                {/* Upcoming live event */}
                <Link
                  href="/labor"
                  className="card card-terra flex-1 block"
                  style={{ padding: '1.75rem', textDecoration: 'none' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="c-eyebrow c-eyebrow--terra">
                      Live · Talk
                    </span>
                    <span className="font-mono text-xs" style={{ color: 'var(--color-terra)' }}>
                      25.06.2024
                    </span>
                  </div>
                  <h3 className="c-title">
                    Corporate Therapy — Live in Frankfurt
                  </h3>
                  <p className="c-body">
                    Live-Folge mit Human, Patrick &amp; Gast. Einlass ab 18 Uhr, Start 18:30 Uhr. Gespräche, Snacks &amp; Drinks.
                  </p>
                  <p className="c-meta">
                    Frankfurt am Main
                  </p>
                </Link>

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

          {/* ── Headline ── */}
          <div style={{ marginBottom: '5rem' }}>
            <Tag>Was wir erreichen</Tag>
            <div style={{ marginTop: '1.75rem' }}>
              <p style={displayStyle}>Drei Dinge,</p>
              <p style={{ ...displayStyle, marginTop: '0.12em', fontStyle: 'italic', color: 'var(--color-terra)' }}>
                die jede Transformation braucht.
              </p>
            </div>
          </div>

          {/* ── Intro copy ── */}
          <Grid className="stack-cols">
            <Col span={5}>
              <p className="font-body text-ink-muted" style={{ fontSize: 'var(--text-base)', lineHeight: '1.75', textAlign: 'left' }}>
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
                  className={`card h-full ${i === 0 ? 'card-terra' : i === 1 ? 'card-sage' : 'card-ink'}`}
                  style={{ padding: '1.75rem' }}
                >
                  <p className="c-eyebrow">
                    Phase {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="c-title">
                    {a.phase}
                  </h3>
                  <ul className="flex flex-col gap-3" style={{ marginTop: '1.5rem' }}>
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
              <div className="card w-full" style={{ padding: '1.75rem' }}>
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
                <Link href="/kontakt">
                  <Button
                    variant="ghost"
                    size="lg"
                    style={{ borderColor: 'var(--color-background)', color: 'var(--color-background)' }}
                  >
                    Erstgespräch vereinbaren
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
