import Link from 'next/link'
import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'
import { Button } from '@/components/atoms/Button'
import {
  GlyphSee, GlyphTarget, GlyphFrame, GlyphLoop, GlyphHandover,
} from '@/components/molecules/PhaseGlyph'

// ─── Colours — hex so we can mix alphas inline for output chips ──────────────
//
// The home AnsatzSection sits on `--color-ink` and uses the *light* phase
// variants (sand #E3DDD5, sage #B8CC8A). On this page's cream background
// those tones disappear — sand has only ~1.1:1 contrast against cream, well
// below the WCAG threshold. We use the *dark* variants here so every accent
// reads on the light surface.

const TERRA = '#F44D0B'          /* unchanged — already high-contrast on cream */
const SAGE  = '#4A6655'          /* deep forest sage — matches updated --color-sage token */
const SAND  = '#8B7355'          /* warm tan — replaces #E3DDD5 */

function wa(hex: string, a: number) {
  const n = parseInt(hex.replace('#', ''), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
}

// ─── Phase data — full long-form content ─────────────────────────────────────

type Phase = {
  num:       string
  meta:      string
  title:     string
  leitfrage: string
  text:      string
  wir:       string[]
  outputs:   string[]
  outcome:   string
  color:     string
  glyph:     () => React.ReactElement
}

const PHASES: Phase[] = [
  {
    num:       '01',
    meta:      'Diagnose',
    title:     'Sichtbar machen',
    leitfrage: 'Was blockiert uns wirklich?',
    text:      'Wir machen sichtbar, wie die Organisation wirklich arbeitet. Nicht entlang offizieller Organigramme, sondern entlang tatsächlicher Entscheidungen, Routinen, Verantwortungen und Reibungen. So entsteht ein gemeinsames Bild der Ordnung, die heute wirkt.',
    wir: [
      'Interviews und Gespräche mit relevanten Akteur:innen',
      'Analyse von Entscheidungswegen, Rollen und Verantwortlichkeiten',
      'Beobachtung von Routinen, Meetings, Übergaben und Schnittstellen',
      'Verdichtung organisationaler Spannungen',
      'Entwicklung erster Hypothesen zur tatsächlichen Organisationslogik',
    ],
    outputs: ['Systembild', 'Spannungslandkarte', 'Entscheidungs- & Rollenlandkarte', 'Hypothesen zur Organisationslogik', 'Designprinzipien'],
    outcome: 'Die Organisation bekommt ein gemeinsames Vokabular für das, was bisher diffus war. Führung kann klarer sehen, welche Strukturfragen wirklich bearbeitet werden müssen.',
    color:   TERRA,
    glyph:   GlyphSee,
  },
  {
    num:       '02',
    meta:      'Zielbild',
    title:     'Entscheidbar machen',
    leitfrage: 'Wie müsste unsere Organisation arbeiten, damit Strategie wirksam wird?',
    text:      'Wir übersetzen Erkenntnis in ein entscheidbares Zielmodell. Es zeigt, wie Arbeit künftig organisiert werden soll: welche Verantwortung wo liegt, wie Entscheidungen getroffen werden, welche Routinen tragen und welche Struktur Strategie wirksam macht.',
    wir: [
      'Entwicklung eines organisationalen Zielbilds',
      'Design von Operating Model, Governance und Entscheidungsarchitektur',
      'Klärung von Rollen, Verantwortlichkeiten und Schnittstellen',
      'Übersetzung strategischer Ambitionen in organisatorische Anforderungen',
      'Priorisierung von Veränderungsschritten & Operationalisierungsplan',
    ],
    outputs: ['Zielbild', 'Target Operating Model', 'Governance- & Entscheidungsarchitektur', 'Rollen- & Verantwortungsmodell', 'Operationalisierungsplan'],
    outcome: 'Führung kann entscheiden, was verändert wird, in welcher Reihenfolge und mit welchem Anspruch. Die Organisation erhält eine gemeinsame Orientierung für die nächste Entwicklungsbewegung.',
    color:   SAGE,
    glyph:   GlyphTarget,
  },
  {
    num:       '03',
    meta:      'Pilot',
    title:     'Gestaltbar machen',
    leitfrage: 'Wie kommt das Modell in echte Arbeit?',
    text:      'Struktur entsteht im Arbeiten am Modell. Deshalb bringen wir Zielbilder früh in reale Situationen: in Piloten, Entscheidungen, Routinen und Arbeitsformate. So wird sichtbar, was trägt — und was weiterentwickelt werden muss.',
    wir: [
      'Entwicklung von Pilot- und Prototyping-Formaten',
      'Gestaltung von Workshops, Entscheidungsformaten und Arbeitsroutinen',
      'Simulation neuer Rollen, Schnittstellen oder Governance-Elemente',
      'Begleitung erster Anwendungssituationen',
      'Iteration des Zielmodells auf Basis realer Erfahrung',
    ],
    outputs: ['Pilotdesign', 'Workshop-Architektur', 'Rollenprototypen', 'Meeting- & Entscheidungsformate', 'Iterationslogik'],
    outcome: 'Veränderung wird praktisch erfahrbar, bevor sie groß ausgerollt wird. Die Organisation erkennt früh, was funktioniert, und was angepasst werden muss.',
    color:   SAND,
    glyph:   GlyphFrame,
  },
  {
    num:       '04',
    meta:      'Praxis',
    title:     'Erprobbar machen',
    leitfrage: 'Was funktioniert wirklich — und was muss angepasst werden?',
    text:      'Das Zielmodell wird erst belastbar, wenn es in realen Arbeitssituationen geprüft wird. Die Organisation prüft, widerspricht, passt an — und macht das Modell dadurch zu ihrer eigenen Struktur.',
    wir: [
      'Begleitung erster Anwendungssituationen im echten Betrieb',
      'Iteration und Weiterentwicklung des Zielmodells',
      'Übersetzung in konkrete Arbeitsartefakte',
      'Prüfung, Widerspruch und Anpassung durch die Organisation',
    ],
    outputs: ['Pilotdesign', 'Arbeitsartefakte', 'Mission Boards', 'Iterationslogik'],
    outcome: 'Die Organisation erkennt früh, was funktioniert, was angepasst werden muss und welche neue Arbeitsweise tragfähig ist.',
    color:   TERRA,
    glyph:   GlyphLoop,
  },
  {
    num:       '05',
    meta:      'Transfer',
    title:     'Unabhängig machen',
    leitfrage: 'Wie bleibt es wirksam, wenn 1789 rausgeht?',
    text:      'Wir verankern neue Strukturen so, dass Organisationen sie selbst weiterentwickeln können. Dafür braucht es Verantwortung, Routinen, Messpunkte und einen Rhythmus, in dem Anpassung Teil der Arbeit wird.',
    wir: [
      'Entwicklung eines Operating Rhythm',
      'Aufbau interner Weiterentwicklungs- und Verantwortungsrollen',
      'Befähigung von Führung und internen Transformationsrollen',
      'Gestaltung von Reflexions-, Mess- und Anpassungsformaten',
      'Übergabe der Arbeitsarchitektur',
    ],
    outputs: ['Playbook', 'Operating Rhythm', 'Verantwortungslandkarte', 'Enablement-Formate', 'Übergabe- & Iterationsmodell'],
    outcome: 'Die Organisation kann die neue Struktur eigenständig weiterentwickeln. Veränderung wird nicht als Projekt verwaltet, sondern in die Arbeitsfähigkeit eingebettet.',
    color:   SAGE,
    glyph:   GlyphHandover,
  },
]

// ─── Shared inline styles ────────────────────────────────────────────────────

const eyebrowStyle: React.CSSProperties = {
  fontFamily:    'var(--font-mono)',
  fontSize:      'var(--text-xxs)',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color:         'var(--color-ink-subtle)',
  margin:        0,
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Ansatz() {
  return (
    <main>
      <HeroSection />
      <OverviewStrip />
      {PHASES.map((phase) => (
        <PhaseSection key={phase.num} phase={phase} />
      ))}
      <ClosingCTA />
    </main>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      style={{
        paddingTop:      'calc(5rem + 5rem)',
        paddingBottom:   'clamp(4rem, 7vw, 6rem)',
        backgroundColor: 'var(--color-background)',
      }}
    >
      <Container>
        <Grid>
          <Col span={9}>
            <Tag>Unser Ansatz</Tag>
            <h1
              className="page-hero-h1"
              style={{
                fontFamily:    'var(--font-display)',
                fontWeight:    600,
                fontSize:      'clamp(3rem, 7vw, 7rem)',
                lineHeight:    0.95,
                letterSpacing: '-0.03em',
                color:         'var(--color-ink)',
                marginTop:     '1.75rem',
              }}
            >
              Von Diagnose<br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-terra)', fontWeight: 400 }}>
                zur Eigenständigkeit.
              </em>
            </h1>
          </Col>
        </Grid>
        <Grid className="stack-cols" style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <Col span={7} start={4}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   'var(--text-base)',
                lineHeight: 1.75,
                color:      'var(--color-ink-muted)',
                maxWidth:   '64ch',
              }}
            >
              Fünf Phasen, fünf Leitfragen. Jeder Schritt baut auf der Erkenntnis
              des vorigen auf — von der Diagnose bestehender Strukturen über das
              gestaltbare Zielmodell bis zur Übergabe einer Organisation, die
              sich selbst weiterentwickeln kann.
            </p>
          </Col>
        </Grid>
      </Container>
    </section>
  )
}

// ─── Overview strip — five phase anchors at a glance ─────────────────────────

function OverviewStrip() {
  return (
    <section
      style={{
        paddingBlock:    'clamp(2rem, 4vw, 3rem)',
        backgroundColor: 'var(--color-background)',
        borderTop:       '1px solid var(--color-border)',
        borderBottom:    '1px solid var(--color-border)',
      }}
    >
      <Container>
        <div
          className="ansatz-overview"
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
            gap:                 'clamp(1rem, 2vw, 2rem)',
          }}
        >
          {PHASES.map((phase) => (
            <a
              key={phase.num}
              href={`#phase-${phase.num}`}
              style={{
                display:        'block',
                textDecoration: 'none',
                paddingTop:     'clamp(0.5rem, 1.5vw, 0.875rem)',
                borderTop:      `2px solid ${phase.color}`,
              }}
            >
              <p
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      'var(--text-xxs)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color:         phase.color,
                  margin:        0,
                }}
              >
                {phase.num} — {phase.meta}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize:   'clamp(0.9375rem, 1.4vw, 1.25rem)',
                  lineHeight: 1.1,
                  color:      'var(--color-ink)',
                  marginTop:  '0.5rem',
                }}
              >
                {phase.title}
              </p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ─── Single phase section — fully detailed ──────────────────────────────────

function PhaseSection({ phase }: { phase: Phase }) {
  return (
    <section
      id={`phase-${phase.num}`}
      style={{
        paddingBlock:    'clamp(4rem, 8vw, 8rem)',
        backgroundColor: 'var(--color-background)',
        borderTop:       `2px solid ${phase.color}`,
        scrollMarginTop: '5rem', /* nav clearance for anchor links */
      }}
    >
      <Container>

        {/* ── Eyebrow + glyph ────────────────────────────────────────── */}
        <Grid style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)', alignItems: 'flex-start' }}>
          <Col span={6}>
            <p
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      'var(--text-xxs)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         phase.color,
                margin:        0,
              }}
            >
              Phase {phase.num} — {phase.meta}
            </p>
          </Col>
          <Col span={6}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div
                style={{
                  width:  'clamp(3rem, 4.5vw, 4.5rem)',
                  height: 'clamp(3rem, 4.5vw, 4.5rem)',
                  color:  phase.color,
                }}
              >
                <phase.glyph />
              </div>
            </div>
          </Col>
        </Grid>

        {/* ── Body — two-column editorial ─────────────────────────────── */}
        <Grid className="stack-cols">

          {/* LEFT — phase identity + narrative */}
          <Col span={5}>
            <span
              aria-hidden="true"
              style={{
                fontFamily:    'var(--font-display)',
                fontStyle:     'italic',
                fontWeight:    300,
                fontSize:      'clamp(4rem, 9vw, 9rem)',
                lineHeight:    0.9,
                letterSpacing: '-0.04em',
                color:         phase.color,
                display:       'block',
              }}
            >
              {phase.num}
            </span>
            <h2
              style={{
                fontFamily:    'var(--font-display)',
                fontWeight:    500,
                fontSize:      'clamp(2rem, 4vw, 3.5rem)',
                lineHeight:    1.0,
                letterSpacing: '-0.025em',
                color:         'var(--color-ink)',
                marginTop:     '1rem',
              }}
            >
              {phase.title}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle:  'italic',
                fontWeight: 300,
                fontSize:   'clamp(1.125rem, 1.75vw, 1.5rem)',
                lineHeight: 1.35,
                color:      'var(--color-ink-muted)',
                marginTop:  '1rem',
                maxWidth:   '24ch',
              }}
            >
              {phase.leitfrage}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   'var(--text-base)',
                lineHeight: 1.75,
                color:      'var(--color-ink-muted)',
                marginTop:  '2rem',
                maxWidth:   '52ch',
              }}
            >
              {phase.text}
            </p>
          </Col>

          {/* RIGHT — operational detail */}
          <Col span={6} start={7}>

            {/* Was wir tun */}
            <div>
              <p style={eyebrowStyle}>Was wir tun</p>
              <ul
                style={{
                  listStyle: 'none',
                  padding:   0,
                  margin:    'clamp(0.875rem, 2vw, 1.5rem) 0 0',
                }}
              >
                {phase.wir.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display:      'flex',
                      gap:          '0.75rem',
                      alignItems:   'baseline',
                      marginBottom: '0.55rem',
                    }}
                  >
                    <span
                      style={{
                        color:      phase.color,
                        fontFamily: 'var(--font-mono)',
                        fontSize:   'var(--text-xxs)',
                        flexShrink: 0,
                        lineHeight: 1.7,
                        opacity:    0.85,
                      }}
                    >
                      →
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize:   'var(--text-sub)',
                        lineHeight: 1.6,
                        color:      'var(--color-ink-muted)',
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Typische Outputs */}
            <div style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
              <p style={eyebrowStyle}>Typische Outputs</p>
              <div
                style={{
                  display:   'flex',
                  flexWrap:  'wrap',
                  gap:       '0.5rem',
                  marginTop: 'clamp(0.875rem, 2vw, 1.25rem)',
                }}
              >
                {phase.outputs.map((o, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily:      'var(--font-mono)',
                      fontSize:        '0.6875rem',
                      letterSpacing:   '0.1em',
                      textTransform:   'uppercase',
                      color:           wa(phase.color, 0.95),
                      backgroundColor: wa(phase.color, 0.08),
                      border:          `1px solid ${wa(phase.color, 0.3)}`,
                      paddingInline:   '0.65rem',
                      paddingBlock:    '0.4rem',
                      borderRadius:    '2px',
                      lineHeight:      1.4,
                    }}
                  >
                    {o}
                  </span>
                ))}
              </div>
            </div>

            {/* Outcome */}
            <div
              style={{
                marginTop:  'clamp(2rem, 4vw, 3rem)',
                paddingTop: 'clamp(1.5rem, 3vw, 2rem)',
                borderTop:  '1px solid var(--color-border)',
              }}
            >
              <p style={{ ...eyebrowStyle, color: phase.color }}>Outcome</p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle:  'italic',
                  fontWeight: 300,
                  fontSize:   'clamp(1.125rem, 1.6vw, 1.5rem)',
                  lineHeight: 1.5,
                  color:      'var(--color-ink)',
                  marginTop:  'clamp(0.875rem, 2vw, 1.5rem)',
                  maxWidth:   '52ch',
                }}
              >
                {phase.outcome}
              </p>
            </div>
          </Col>
        </Grid>
      </Container>
    </section>
  )
}

// ─── Closing CTA ─────────────────────────────────────────────────────────────

function ClosingCTA() {
  return (
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
                color:         'rgba(242,242,242,0.65)',
                margin:        0,
              }}
            >
              Bereit zur Diagnose?
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
              Sprechen wir<br />
              <em style={{ fontStyle: 'italic', fontWeight: 400, opacity: 0.82 }}>über Ihren Gap.</em>
            </h2>
            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
              <Link href="/kontakt">
                <Button
                  variant="ghost"
                  size="lg"
                  style={{
                    borderColor: 'var(--color-background)',
                    color:       'var(--color-background)',
                  }}
                >
                  Erstgespräch vereinbaren
                </Button>
              </Link>
            </div>
          </Col>
        </Grid>
      </Container>
    </section>
  )
}
