import Link from 'next/link'
import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'
import { Button } from '@/components/atoms/Button'

// ─── Team data ────────────────────────────────────────────────────────────────
//
// Four leadership contacts. Photos are placeholders — initials over a soft
// terra/sage gradient until real portraits are commissioned. Profile copy is
// placeholder text where final wording is pending; mark with [Platzhalter].

type Person = {
  name:     string
  role:     string
  initials: string
  photo:    string | null   // path under /public when available
  bio:      string
  accent:   'terra' | 'sage'
}

const TEAM: Person[] = [
  {
    name:     'Huma Nagafi',
    role:     'Founder & Partner',
    initials: 'HN',
    photo:    null,
    bio:      'Gründerin von 1789. Begleitet Organisationen seit über zwei Jahrzehnten durch strukturelle Transformation — vom Mittelstand bis zum Konzern.',
    accent:   'terra',
  },
  {
    name:     'Mary Jane Bolton',
    role:     'Partner',
    initials: 'MB',
    photo:    null,
    bio:      'Verantwortet Governance-Design und Target-Operating-Modelle. Übersetzt Komplexität in tragfähige Strukturen, die im Alltag halten.',
    accent:   'sage',
  },
  {
    name:     'Patrick Breitenbach',
    role:     'Partner',
    initials: 'PB',
    photo:    null,
    bio:      '[Kurzprofil folgt — Rollenbeschreibung wird ergänzt.]',
    accent:   'terra',
  },
  {
    name:     '[Platzhalter]',
    role:     'Partner',
    initials: '??',
    photo:    null,
    bio:      '[Person und Kurzprofil folgen.]',
    accent:   'sage',
  },
]

// ─── Portrait — placeholder gradient with initials ────────────────────────────

function Portrait({ person }: { person: Person }) {
  const isTerra = person.accent === 'terra'
  const gradient = isTerra
    ? 'linear-gradient(135deg, rgba(244,77,11,0.85) 0%, rgba(193,58,6,0.65) 100%)'
    : 'linear-gradient(135deg, rgba(74,102,85,0.85) 0%, rgba(58,82,69,0.7) 100%)'

  return (
    <div
      style={{
        position:        'relative',
        width:           '100%',
        aspectRatio:     '4 / 5',
        overflow:        'hidden',
        backgroundColor: 'var(--color-surface)',
        borderRadius:    'var(--radius-md)',
      }}
    >
      {person.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${person.photo}`}
          alt={person.name}
          style={{
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'top center',
            display:        'block',
          }}
        />
      ) : (
        <>
          <div
            aria-hidden="true"
            style={{
              position:       'absolute',
              inset:          0,
              background:     gradient,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle:  'italic',
                fontWeight: 300,
                fontSize:   'clamp(3rem, 5vw, 5rem)',
                color:      'rgba(255,255,255,0.4)',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {person.initials}
            </span>
          </div>
          {/* faint duotone wash for editorial feel */}
          <div
            aria-hidden="true"
            style={{
              position:     'absolute',
              inset:        0,
              background:   'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(26,23,20,0) 0%, rgba(26,23,20,0.12) 100%)',
              mixBlendMode: 'multiply',
            }}
          />
        </>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Wir() {
  return (
    <main>

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop:      'calc(5rem + 5rem)',
          paddingBottom:   '5rem',
          backgroundColor: 'var(--color-background)',
          borderBottom:    '1px solid var(--color-border)',
        }}
      >
        <Container>
          <Grid>
            <Col span={8}>
              <Tag>Wir</Tag>
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
                Vier Köpfe,<br />
                <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-terra)' }}>eine Haltung.</em>
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   'var(--text-base)',
                  lineHeight: 1.75,
                  color:      'var(--color-ink-muted)',
                  marginTop:  '2.5rem',
                  maxWidth:   '56ch',
                }}
              >
                1789 ist klein und bewusst klein gehalten. Wir arbeiten als Partner,
                nicht als Lieferant — und stehen jedem Mandat persönlich gegenüber.
                Hier sind die vier Ansprechpartner, mit denen Sie es zu tun haben.
              </p>
            </Col>
          </Grid>
        </Container>
      </section>

      {/* ─── Team grid ────────────────────────────────────────────────────── */}
      <section
        style={{
          paddingBlock:    'clamp(4rem, 8vw, 8rem)',
          backgroundColor: 'var(--color-background)',
        }}
      >
        <Container>

          {/* Eyebrow header for the section */}
          <div style={{ marginBottom: '3rem' }}>
            <p
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      'var(--text-xxs)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color:         'var(--color-ink-subtle)',
              }}
            >
              Partner & Ansprechpartner — 04
            </p>
          </div>

          <Grid className="stack-cols">
            {TEAM.map((person) => (
              <Col key={person.name} span={3}>
                <article
                  className="reveal is-visible"
                  style={{
                    display:        'flex',
                    flexDirection:  'column',
                  }}
                >
                  <Portrait person={person} />

                  <div style={{ marginTop: '1.5rem' }}>
                    <p
                      className={person.accent === 'terra' ? 'c-eyebrow--terra' : 'c-eyebrow'}
                    >
                      {person.role}
                    </p>
                    <h3
                      style={{
                        fontFamily:    'var(--font-display)',
                        fontWeight:    500,
                        fontSize:      'clamp(1.5rem, 1.9vw, 2rem)',
                        lineHeight:    1.1,
                        letterSpacing: '-0.02em',
                        color:         'var(--color-ink)',
                        marginTop:     '0.5rem',
                      }}
                    >
                      {person.name}
                    </h3>
                    <p
                      className="c-body"
                      style={{ marginTop: '0.875rem' }}
                    >
                      {person.bio}
                    </p>
                  </div>
                </article>
              </Col>
            ))}
          </Grid>
        </Container>
      </section>

      {/* ─── Office + about ───────────────────────────────────────────────── */}
      <section
        style={{
          paddingBlock:    'clamp(4rem, 8vw, 8rem)',
          backgroundColor: 'var(--color-background)',
          borderTop:       '1px solid var(--color-border)',
        }}
      >
        <Container>
          <Grid className="stack-cols" style={{ alignItems: 'center' }}>

            {/* Left: Office photo placeholder */}
            <Col span={6}>
              <div
                aria-hidden="true"
                style={{
                  position:        'relative',
                  width:           '100%',
                  aspectRatio:     '4 / 3',
                  borderRadius:    'var(--radius-md)',
                  overflow:        'hidden',
                  backgroundColor: 'var(--color-surface)',
                }}
              >
                {/* Layered placeholder — soft gradient + grain feel via subtle ring */}
                <div
                  style={{
                    position:    'absolute',
                    inset:       0,
                    background:  'linear-gradient(160deg, rgba(227,221,213,1) 0%, rgba(184,204,138,0.4) 55%, rgba(244,77,11,0.18) 100%)',
                  }}
                />
                {/* Centre label */}
                <div
                  style={{
                    position:       'absolute',
                    inset:          0,
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    flexDirection:  'column',
                    gap:            '0.5rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      'var(--text-xxs)',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color:         'rgba(26,23,20,0.45)',
                    }}
                  >
                    Foto folgt
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle:  'italic',
                      fontWeight: 300,
                      fontSize:   'clamp(1.5rem, 2vw, 2rem)',
                      color:      'rgba(26,23,20,0.35)',
                      lineHeight: 1,
                    }}
                  >
                    Unser Büro.
                  </span>
                </div>
                {/* Subtle inner ring for editorial framing */}
                <div
                  style={{
                    position:     'absolute',
                    inset:        0,
                    boxShadow:    'inset 0 0 0 1px rgba(26,23,20,0.08)',
                    borderRadius: 'var(--radius-md)',
                    pointerEvents:'none',
                  }}
                />
              </div>
            </Col>

            {/* Right: text about 1789 */}
            <Col span={6}>
              <Tag>Über 1789</Tag>
              <h2
                style={{
                  fontFamily:    'var(--font-display)',
                  fontWeight:    500,
                  fontSize:      'clamp(2.25rem, 4vw, 4rem)',
                  lineHeight:    1.05,
                  letterSpacing: '-0.025em',
                  color:         'var(--color-ink)',
                  marginTop:     '1.75rem',
                }}
              >
                Strategie und Struktur, <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-terra)' }}>aus einem Stück.</em>
              </h2>

              <div
                style={{
                  marginTop:  '2rem',
                  display:    'flex',
                  flexDirection: 'column',
                  gap:        '1.25rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   'var(--text-base)',
                    lineHeight: 1.75,
                    color:      'var(--color-ink-muted)',
                  }}
                >
                  1789 begleitet Organisationen durch strukturelle Transformation —
                  von der Diagnose über die Gestaltung des Operating Models bis zur
                  Erprobung im Alltag und zur Übergabe in die eigene Hand.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   'var(--text-base)',
                    lineHeight: 1.75,
                    color:      'var(--color-ink-muted)',
                  }}
                >
                  Wir arbeiten <em style={{ fontStyle: 'italic', color: 'var(--color-ink)' }}>auf Augenhöhe</em>,
                  in kleinen Mandaten, mit klarer Verantwortung. Was wir aufbauen,
                  muss ohne uns weitertragen — sonst war es nicht gut genug.
                </p>
              </div>

              <div style={{ marginTop: '2.5rem' }}>
                <Link href="/kontakt">
                  <Button variant="ghost">Erstgespräch vereinbaren →</Button>
                </Link>
              </div>
            </Col>
          </Grid>
        </Container>
      </section>

    </main>
  )
}
