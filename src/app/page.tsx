import Link from 'next/link'
import { Container, Grid, Col } from '@/components/layout/Grid'
import { Button } from '@/components/atoms/Button'
import { Tag } from '@/components/atoms/Tag'
import { featuredCases } from '@/data/cases'
import { HeroLogo } from '@/components/organisms/HeroLogo'
import { AnsatzSection } from '@/components/organisms/AnsatzSection'
import { TestimonialsSection } from '@/components/organisms/TestimonialsSection'
import { LaborSection } from '@/components/organisms/LaborSection'
import { StickyScrollSection } from '@/components/layout/StickyScrollSection'
import { PillarEqualizeTopSections } from '@/components/atoms/PillarEqualizeTopSections'

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
    body: 'Wir beginnen nicht mit Lösungen, sondern übersetzen Beobachtungen in Hypothesen. Welche Entscheidungen, Rollen, Erwartungen und informalen Routinen halten die Organisation zusammen? Daraus entsteht ein Zielmodell, nicht als Blueprint, sondern als Arbeitsgegenstand für Führung.',
    items: ['Research', 'Zielbild', 'Designprinzipien', 'Rollen & Rechenschaft'],
  },
  {
    num: '02',
    title: 'Structuration',
    body: 'Struktur entsteht nicht im Rollout. Die Organisation arbeitet sich am Modell ab, prüft, widerspricht, passt an — und macht es dadurch zu ihrer eigenen Struktur. Was trägt, wird verstetigt. Was nicht trägt, verändert das Modell.',
    items: ['Prototyp', 'Sparring', 'Simulation', 'Einpassung'],
  },
  {
    num: '03',
    title: 'AI-Human-Native',
    body: 'Al ist kein Add-on zur Organisation. Wenn Arbeit neu geordnet wird, denken wir Al als Medium mit: in Rollen, Workflows, Entscheidungen und im Zugriff auf organisationales Wissen.',
    items: ['AI Operating System', 'AI enabled Structures', 'AI Mediation bei Human to Human Erwartungsstrukturen', 'AI Companions'],
  },
]


// ─── AI & Organisation — four dimensions arranged around a diamond ────────
//
// WIP: copy/title are placeholder while the section narrative is still being
// refined. Order matches the briefing: 01 Prozesse · 02 Mensch · 03 Entscheidungen · 04 Strukturen.

const AI_DIMENSIONS = [
  {
    num:   '01',
    title: 'AI in Prozessen',
    body:  'Wie KI Abläufe neu strukturiert — Automatisierung, hybride Workflows, neue Geschwindigkeiten.',
  },
  {
    num:   '02',
    title: 'AI und Mensch',
    body:  'Wie KI Zusammenarbeit verschiebt — Rollen, Erwartungen, Kompetenzbilder.',
  },
  {
    num:   '03',
    title: 'AI in Entscheidungen',
    body:  'Wie KI Urteilsbildung verändert — Datenbasis, Vorschlagslogik, Verantwortung.',
  },
  {
    num:   '04',
    title: 'AI und Strukturen',
    body:  'Wie KI Organisationsdesign herausfordert — Governance, Verantwortlichkeit, Architektur.',
  },
] as const

type AIDimension = (typeof AI_DIMENSIONS)[number]

/** Four-quadrant diamond — visual centerpiece. Subtle terra/sage tints
 *  on each triangle, thin ink outline, terra dot at the centre. */
function AIDiamond() {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ display: 'block' }} aria-hidden="true">
      {/* Quadrant fills — top, right, bottom, left */}
      <polygon points="100,5 195,100 100,100" fill="var(--color-terra)" fillOpacity="0.12" />
      <polygon points="195,100 100,195 100,100" fill="var(--color-sage)"  fillOpacity="0.14" />
      <polygon points="100,195 5,100 100,100"  fill="var(--color-terra)" fillOpacity="0.06" />
      <polygon points="5,100 100,5 100,100"    fill="var(--color-sage)"  fillOpacity="0.08" />
      {/* Outline */}
      <polygon
        points="100,5 195,100 100,195 5,100"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="1.25"
        strokeOpacity="0.5"
      />
      {/* Internal cross — quadrant dividers */}
      <line x1="100" y1="5"   x2="100" y2="195" stroke="var(--color-ink)" strokeWidth="0.6" strokeOpacity="0.18" />
      <line x1="5"   y1="100" x2="195" y2="100" stroke="var(--color-ink)" strokeWidth="0.6" strokeOpacity="0.18" />
      {/* Centre point */}
      <circle cx="100" cy="100" r="3" fill="var(--color-terra)" />
    </svg>
  )
}

/** Label cell for one dimension. textAlign adapts to its position so the
 *  copy "leans toward" the diamond at the centre. */
function AIDimensionLabel({
  dim,
  position,
}: { dim: AIDimension; position: 'top' | 'right' | 'bottom' | 'left' }) {
  const textAlign =
    position === 'right'  ? 'right' :
    position === 'left'   ? 'left'  : 'center'

  return (
    <div style={{ maxWidth: '32ch', textAlign }}>
      <p className="c-eyebrow--terra" style={{ marginBottom: 'clamp(0.25rem, 0.5svh, 0.45rem)' }}>{dim.num}</p>
      <h3
        style={{
          fontFamily:    'var(--font-display)',
          fontWeight:    300,
          fontSize:      'clamp(1.1rem, 2.6svh, 2.25rem)',
          lineHeight:    1.05,
          letterSpacing: '-0.025em',
          color:         'var(--color-ink)',
          margin:        0,
        }}
      >
        {dim.title}
      </h3>
      <p
        className="c-body"
        style={{
          marginTop: 'clamp(0.35rem, 0.8svh, 0.6rem)',
          fontSize:  'clamp(0.8125rem, 1.5svh, 1.0625rem)',
          lineHeight: 1.55,
        }}
      >
        {dim.body}
      </p>
    </div>
  )
}

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
        Inherits position:sticky from .scroll-card so it stacks like every other
        card. overflow:hidden clips the full-bleed SVG inside HeroLogo (absolute
        inset-0); the sticky element itself is a containing block for absolute
        descendants, so no extra position declaration is needed.
      */}
      <section
        className="scroll-card"
        style={{
          height:          '100svh',
          minHeight:       '100svh',
          display:         'flex',
          flexDirection:   'column',
          paddingTop:      '5rem', /* nav height — content inside HeroLogo adds more */
          overflow:        'hidden',
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
        <section className="sticky-section-inner" style={{
          paddingBlock:  'clamp(1.5rem, 3svh, 3rem) clamp(2rem, 4svh, 4rem)',
          minHeight:     'calc(100svh - 5rem)',
          maxHeight:     '920px',
          margin:        '0 auto',
          width:         '100%',
          display:       'flex',
          flexDirection: 'column',
        }}>
          {/* Container is flex-column with justify-content:center so the
              whole group (header + intro + cards) centres vertically.
              On 4K the leftover space splits equally above and below the
              content — no more "everything tight at top, empty band below". */}
          <Container style={{
            flex:           1,
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'center',
            minHeight:      0,
          }}>

            {/* ── Headline ── */}
            <div style={{ marginBottom: 'clamp(1.5rem, 3svh, 3rem)' }}>
              <Tag>DER 1789-BLICK</Tag>
              <div style={{ marginTop: 'clamp(1.25rem, 2.5svh, 2.25rem)' }}>
                <p style={{ ...displayStyle, fontSize: 'clamp(2rem, 5svh, 5rem)' }}>Was heute blockiert, —</p>
                <p style={{ ...displayStyle, fontSize: 'clamp(2rem, 5svh, 5rem)', marginTop: '0.12em', fontStyle: 'italic', color: 'var(--color-terra)' }}>
                   hat gestern getragen.
                </p>
              </div>
            </div>

            {/* ── Intro copy ── */}
            <Grid className="stack-cols">
              <Col span={5}>
                <p className="font-body text-ink-muted" style={{ fontSize: 'clamp(0.875rem, 1.6svh, 1.25rem)', lineHeight: 1.6, textAlign: 'left' }}>
                Jede Organisation lebt von Entscheidungen, Routinen und informalen Lösungen, die einmal funktioniert haben. Wir legen frei, welche Ordnung heute noch trägt, wo sie blockiert und was neu entschieden werden muss damit Verantwortung greift, Veränderung tragfähig wird und Wertschöpfung & Wirkung entstehen.</p>
              </Col>
            </Grid>

            {/* ── Pillars ── */}
            <PillarEqualizeTopSections />
            <Grid data-pillar-grid="" style={{
              marginTop: 'clamp(4rem, 7svh, 6rem)',
            }}>
              {pillars.map((pillar, i) => (
                <Col key={pillar.title} span={4}>
                  <div
                    className="card h-full flex flex-col"
                    style={{ padding: 'clamp(1rem, 2.2svh, 1.75rem)', position: 'relative' }}
                  >
                    {/* Icon — upper right corner */}
                    <div
                      aria-hidden="true"
                      style={{
                        position:      'absolute',
                        top:           'clamp(0.75rem, 1.5svh, 1.25rem)',
                        right:         'clamp(0.75rem, 1.5svh, 1.25rem)',
                        opacity:       1,
                        pointerEvents: 'none',
                        lineHeight:    0,
                      }}
                    >
                      {pillarIcons[i]}
                    </div>

                    {/* Top section: title + body — equalized by PillarEqualizeTopSections */}
                    <div data-pillar-top="" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3
                        style={{
                          fontFamily:    'var(--font-display)',
                          fontWeight:    400,
                          fontSize:      'clamp(1.25rem, 2.8svh, 2.5rem)',
                          lineHeight:    1.05,
                          letterSpacing: '-0.025em',
                          color:         'var(--color-ink)',
                          marginTop:     0,
                          paddingRight:  '3rem', /* clear the icon */
                        }}
                      >
                        {pillar.title}
                      </h3>

                      <p className="c-body" style={{ marginTop: 'clamp(0.5rem, 1.2svh, 1rem)', fontSize: 'clamp(0.8125rem, 1.5svh, 1.0625rem)', lineHeight: 1.55 }}>
                        {pillar.body}
                      </p>
                    </div>

                    {/* Divider — anchored at the midpoint between top and bottom sections */}
                    <div
                      style={{
                        marginTop:       'clamp(0.75rem, 1.5svh, 1.25rem)',
                        marginBottom:    'clamp(0.75rem, 1.5svh, 1.25rem)',
                        height:          '1px',
                        backgroundColor: 'var(--color-border)',
                      }}
                    />

                    {/* Bottom section: bullet list — fills the other half, items at bottom */}
                    <ul className="flex flex-col gap-2" style={{ flex: 1, justifyContent: 'flex-end' }}>
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
      <section className="scroll-card-content sticky-section-inner" style={{ flex: 1, minHeight: 0, overflow: 'hidden', paddingBlock: '3rem', display: 'flex', flexDirection: 'column', maxHeight: '920px', margin: 'auto 0', width: '100%' }}>
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

          <Grid className="mt-8" style={{ flex: 1, minHeight: 0, gridAutoRows: '1fr' }}>
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
                  className="card-dark case-card group flex flex-col cursor-pointer"
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
                    className="case-img-slot"
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
      <LaborSection />

      {/* ─── Unser Ansatz — 5-step process accordion ────────────────── */}
      <section
        className="scroll-card"
        style={{
          backgroundColor: 'var(--color-ink)',
          top:             '5rem',
          height:          'calc(100svh - 5rem)',
          overflow:        'hidden',
          display:         'flex',
          flexDirection:   'column',
        }}
      >
        <AnsatzSection />
      </section>

      {/* ─── AI und Organisation ─────────────────────────────────────────── */}
      {/* WIP placeholder — title + framing copy still being developed.
          Sticky card sized to viewport so the diamond + four dimensions are
          all visible at once and don't get clipped by the next card. */}
      <section
        className="scroll-card"
        style={{
          top:             '5rem',
          height:          'calc(100svh - 5rem)',
          paddingBlock:    'clamp(2rem, 4svh, 4rem)',
          overflow:        'hidden',
          backgroundColor: 'var(--color-background)',
          display:         'flex',
          flexDirection:   'column',
        }}
      >
        <Container style={{ width: '100%', height: '100%', maxHeight: '920px', margin: 'auto 0' }}>

          {/* ── Headline ── */}
          <div style={{ marginBottom: 'clamp(1rem, 2svh, 2.5rem)' }}>
            <Tag>AI und Organisation</Tag>
            <div style={{ marginTop: 'clamp(0.5rem, 1.5svh, 1.5rem)' }}>
              <p style={{ ...displayStyle, fontSize: 'clamp(1.75rem, 4svh, 4rem)' }}>Vier Dimensionen,</p>
              <p style={{ ...displayStyle, fontSize: 'clamp(1.75rem, 4svh, 4rem)', marginTop: '0.12em', fontStyle: 'italic', color: 'var(--color-terra)' }}>
                in denen KI Organisation neu denkt.
              </p>
            </div>
          </div>

          {/* ── Diamond + four dimensions ── */}
          <div className="ai-grid" style={{ marginTop: 'clamp(1rem, 2svh, 2.5rem)' }}>

            {/* Row 1: empty · top label (01) · empty */}
            <div className="ai-spacer" aria-hidden="true" />
            <AIDimensionLabel dim={AI_DIMENSIONS[0]} position="top" />
            <div className="ai-spacer" aria-hidden="true" />

            {/* Row 2: left label (04) · diamond · right label (02) */}
            <AIDimensionLabel dim={AI_DIMENSIONS[3]} position="left" />
            <div className="ai-diamond" style={{ width: '100%', aspectRatio: '1 / 1' }}>
              <AIDiamond />
            </div>
            <AIDimensionLabel dim={AI_DIMENSIONS[1]} position="right" />

            {/* Row 3: empty · bottom label (03) · empty */}
            <div className="ai-spacer" aria-hidden="true" />
            <AIDimensionLabel dim={AI_DIMENSIONS[2]} position="bottom" />
            <div className="ai-spacer" aria-hidden="true" />

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
