import Link from 'next/link'
import { Container, Grid, Col } from '@/components/layout/Grid'
import { Button } from '@/components/atoms/Button'

const offerings = [
  {
    num: '01',
    category: 'Benchmark',
    title: 'Benchmark & Defining the Gap',
    body: 'Wir analysieren die Spannung zwischen dem, was eine Organisation heute ist, und dem, was sie morgen sein will. Systematisch, präzise, mit neuem Vokabular.',
    deliverables: ['Gap-Analyse', 'Benchmark-Bericht', 'Organisations-Diagnose', 'Maßnahmenrahmen'],
    duration: '6–10 Wochen',
  },
  {
    num: '02',
    category: 'Workshop',
    title: 'Workshop & Strategy Structure',
    body: 'Wir transformieren Erkenntnisse in konkrete Strukturen. Partizipativ, artefaktgetrieben und sofort wirksam — nicht erst nach dem Prozess.',
    deliverables: ['Operating Model Entwurf', 'Mission Board', 'Responsibility Framework', 'Pilotdesign'],
    duration: '3–6 Monate',
  },
  {
    num: '03',
    category: 'Transformation',
    title: 'Transformation Begleitung',
    body: 'Wir begleiten Organisationen durch den vollständigen Systemshift Cycle. Von der Erkenntnis bis zur eigenständig iterierenden Organisation.',
    deliverables: ['Vollständiger Systemshift Cycle', 'Organisationales Mindset', 'Verbindlichkeitsstrukturen', 'Übergabe & Verselbstständigung'],
    duration: '6–18 Monate',
  },
]

/* ── Precise geometric marks — one per service ──────────────────────────────
 * Thin-line SVGs that visualise each service metaphor.
 * terra = highlight/focal point  ·  currentColor (ink) = structure
 */
const marks = [
  // 01 — The Gap: two organisational states with a measured gap between them
  <svg key="01" width="64" height="52" viewBox="0 0 64 52" fill="none" aria-hidden="true">
    <rect x="1"  y="14" width="21" height="24" rx="1.5" stroke="currentColor" strokeWidth="1.25" opacity="0.28"/>
    <line x1="8"  y1="14" x2="8"  y2="38" stroke="currentColor" strokeWidth="0.75" opacity="0.15"/>
    <line x1="15" y1="14" x2="15" y2="38" stroke="currentColor" strokeWidth="0.75" opacity="0.15"/>
    <rect x="42" y="10" width="21" height="32" rx="1.5" stroke="currentColor" strokeWidth="1.25" opacity="0.28"/>
    <line x1="49" y1="10" x2="49" y2="42" stroke="currentColor" strokeWidth="0.75" opacity="0.15"/>
    <line x1="56" y1="10" x2="56" y2="42" stroke="currentColor" strokeWidth="0.75" opacity="0.15"/>
    {/* Gap span */}
    <line x1="22" y1="26" x2="42" y2="26" stroke="var(--color-terra)" strokeWidth="1.25"/>
    <line x1="22" y1="21" x2="22" y2="31" stroke="var(--color-terra)" strokeWidth="1.25"/>
    <line x1="42" y1="21" x2="42" y2="31" stroke="var(--color-terra)" strokeWidth="1.25"/>
    <circle cx="32" cy="26" r="2" fill="var(--color-terra)"/>
  </svg>,

  // 02 — Structure: modular 3×3 grid with a highlighted focal node
  <svg key="02" width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
    {([0,1,2] as const).map(row =>
      ([0,1,2] as const).map(col => {
        const x = col * 17 + 1
        const y = row * 17 + 1
        const isCenter = row === 1 && col === 1
        const isDim    = (row === 0 && col === 2) || (row === 2 && col === 0)
        return (
          <rect key={`${row}${col}`}
            x={x} y={y} width="13" height="13" rx="1.5"
            fill={isCenter ? 'var(--color-terra)' : 'none'}
            stroke={isCenter ? 'var(--color-terra)' : 'currentColor'}
            strokeWidth="1.25"
            opacity={isDim ? 0.18 : isCenter ? 1 : 0.38}
          />
        )
      })
    )}
  </svg>,

  // 03 — Transformation: three-node cycle with directional arrow
  <svg key="03" width="58" height="52" viewBox="0 0 58 52" fill="none" aria-hidden="true">
    <circle cx="29" cy="9"  r="7" stroke="var(--color-terra)" strokeWidth="1.25"/>
    <circle cx="9"  cy="44" r="7" stroke="currentColor"       strokeWidth="1.25" opacity="0.35"/>
    <circle cx="49" cy="44" r="7" stroke="currentColor"       strokeWidth="1.25" opacity="0.35"/>
    <path d="M23 14 L13 38"  stroke="currentColor" strokeWidth="1" opacity="0.28"/>
    <path d="M35 14 L45 38"  stroke="currentColor" strokeWidth="1" opacity="0.28"/>
    {/* Terra bottom arrow = completed cycle returns to growth */}
    <path d="M16 44 L42 44"  stroke="var(--color-terra)" strokeWidth="1.25"/>
    <path d="M39 41 L43 44 L39 47" stroke="var(--color-terra)" strokeWidth="1.25" strokeLinejoin="round" fill="none"/>
  </svg>,
]

export default function Leistungen() {
  return (
    <main>

      {/* ── Page Hero ────────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop:      'calc(5rem + 5rem)',
          paddingBottom:   'clamp(3.5rem, 6vw, 5rem)',
          backgroundColor: 'var(--color-background)',
        }}
      >
        <Container>
          <Grid>
            <Col span={10}>
              <p className="c-eyebrow c-eyebrow--terra" style={{ marginBottom: '1.5rem' }}>
                Leistungen
              </p>
              <h1
                className="page-hero-h1 balance"
                style={{
                  fontFamily:    'var(--font-display)',
                  fontWeight:    600,
                  fontSize:      'clamp(3rem, 7vw, 6.5rem)',
                  lineHeight:    0.92,
                  letterSpacing: '-0.03em',
                  color:         'var(--color-ink)',
                }}
              >
                Structure · Strategy ·{' '}
                <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-terra)' }}>Gap.</em>
              </h1>
            </Col>
          </Grid>
          <Grid style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <Col span={5} start={6}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   'var(--text-base)',
                  lineHeight: 1.7,
                  color:      'var(--color-ink-muted)',
                }}
              >
                Unsere Leistungen sind keine Produkte. Sie sind Antworten auf den Gap,
                den jede erfolgreiche Organisation kennt — aber selten benennen kann.
              </p>
            </Col>
          </Grid>
        </Container>
      </section>

      {/* ── Offerings ────────────────────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid var(--color-border)' }}>
        <Container>
          {offerings.map((o, i) => (
            <div
              key={o.num}
              style={{
                position:    'relative',
                overflow:    'hidden',
                paddingTop:  'clamp(3rem, 5vw, 5rem)',
                paddingBottom:'clamp(3.5rem, 5.5vw, 5.5rem)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >

              {/* Ghost numeral — decorative depth element */}
              <span
                aria-hidden="true"
                style={{
                  position:      'absolute',
                  right:         '-0.25em',
                  bottom:        '-0.15em',
                  fontFamily:    'var(--font-display)',
                  fontWeight:    700,
                  fontSize:      'clamp(10rem, 22vw, 22rem)',
                  lineHeight:    0.82,
                  letterSpacing: '-0.06em',
                  color:         'var(--color-ink)',
                  opacity:       0.032,
                  pointerEvents: 'none',
                  userSelect:    'none',
                }}
              >
                {o.num}
              </span>

              <Grid>

                {/* ── Left: heading area ── */}
                <Col span={5}>
                  {/* Single meta line: all context in one typographic voice */}
                  <p
                    className="c-eyebrow"
                    style={{ color: 'var(--color-terra)', marginBottom: 'clamp(1.25rem, 2.5vw, 2rem)' }}
                  >
                    {o.num} · {o.category} · {o.duration}
                  </p>

                  {/* Heading — the dominant element */}
                  <h2
                    style={{
                      fontFamily:    'var(--font-display)',
                      fontWeight:    500,
                      fontSize:      'clamp(2rem, 3.5vw, 3.25rem)',
                      lineHeight:    1.0,
                      letterSpacing: '-0.025em',
                      color:         'var(--color-ink)',
                    }}
                  >
                    {o.title}
                  </h2>

                  {/* Service mark — geometric diagram */}
                  <div
                    style={{
                      marginTop: 'clamp(2rem, 3.5vw, 3rem)',
                      color:     'var(--color-ink)',
                      opacity:   0.75,
                    }}
                  >
                    {marks[i]}
                  </div>
                </Col>

                {/* ── Centre: body description ── */}
                <Col span={3} start={7}>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   'var(--text-base)',
                      lineHeight: 1.72,
                      color:      'var(--color-ink-muted)',
                    }}
                  >
                    {o.body}
                  </p>
                </Col>

                {/* ── Right: structured deliverables ── */}
                <Col span={3} start={10}>
                  <div
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      borderRadius:    'var(--radius-md)',
                      padding:         '1.25rem 1.5rem',
                    }}
                  >
                    <p
                      className="c-eyebrow"
                      style={{ marginBottom: '1rem' }}
                    >
                      Deliverables
                    </p>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                      {o.deliverables.map((d, j) => (
                        <li
                          key={d}
                          style={{
                            display:        'flex',
                            alignItems:     'flex-start',
                            gap:            '0.75rem',
                            paddingBlock:   '0.5rem',
                            borderTop:      j > 0 ? '1px solid rgba(46,43,40,0.10)' : 'none',
                          }}
                        >
                          <span
                            style={{
                              color:      'var(--color-terra)',
                              fontFamily: 'var(--font-mono)',
                              fontSize:   '0.55rem',
                              marginTop:  '0.35rem',
                              flexShrink: 0,
                            }}
                          >
                            →
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize:   'var(--text-sub)',
                              lineHeight: 1.5,
                              color:      'var(--color-ink-muted)',
                            }}
                          >
                            {d}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>

              </Grid>
            </div>
          ))}
        </Container>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section
        style={{
          paddingBlock:    'clamp(5rem, 10vw, 8rem)',
          backgroundColor: 'var(--color-terra)',
        }}
      >
        <Container>
          <Grid>
            <Col span={8} start={3} className="text-center">
              <p
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      'var(--text-xxs)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color:         'rgba(242,239,232,0.65)',
                  margin:        0,
                }}
              >
                Nicht sicher, wo der Gap liegt?
              </p>
              <h2
                style={{
                  fontFamily:    'var(--font-display)',
                  fontWeight:    600,
                  fontSize:      'clamp(2.5rem, 6vw, 5rem)',
                  lineHeight:    1,
                  letterSpacing: '-0.03em',
                  color:         'var(--color-background)',
                  marginTop:     '1.5rem',
                }}
              >
                Das Erstgespräch<br />
                <em style={{ fontStyle: 'italic', fontWeight: 400, opacity: 0.82 }}>klärt das.</em>
              </h2>
              <p
                style={{
                  fontFamily:   'var(--font-body)',
                  fontSize:     'var(--text-sub)',
                  lineHeight:   1.7,
                  color:        'rgba(242,239,232,0.65)',
                  marginTop:    '1.5rem',
                  maxWidth:     '44ch',
                  marginInline: 'auto',
                }}
              >
                Kein Pitch. Kein Sales-Deck. Wir prüfen gemeinsam, ob ein Systemshift
                der richtige Schritt ist.
              </p>
              <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
                <Link href="/kontakt">
                  <Button
                    variant="ghost"
                    size="lg"
                    style={{ borderColor: 'var(--color-background)', color: 'var(--color-background)' }}
                  >
                    Erstgespräch anfragen
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
