import Link from 'next/link'
import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'
import { Button } from '@/components/atoms/Button'

export default function Kontakt() {
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
              <Tag>Kontakt</Tag>
              <h1
                style={{
                  fontFamily:    'var(--font-display)',
                  fontWeight:    300,
                  fontSize:      'clamp(3rem, 7vw, 7rem)',
                  lineHeight:    0.92,
                  letterSpacing: '-0.03em',
                  color:         'var(--color-ink)',
                  marginTop:     '1.75rem',
                }}
              >
                Erstgespräch<br />
                <em style={{ fontStyle: 'italic', color: 'var(--color-terra)' }}>vereinbaren.</em>
              </h1>
            </Col>
          </Grid>
        </Container>
      </section>

      {/* ─── Contact split ────────────────────────────────────────────────── */}
      <section style={{ paddingBlock: '6rem', backgroundColor: 'var(--color-background)' }}>
        <Container>
          <Grid className="stack-cols">

            {/* Left — intro */}
            <Col span={5}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   'var(--text-base)',
                  lineHeight: 1.75,
                  color:      'var(--color-ink-muted)',
                }}
              >
                Das Erstgespräch dient der gegenseitigen Erkenntnis.
                Kein Pitch. Kein Sales-Deck. Wir hören zu — und prüfen gemeinsam,
                ob ein Systemshift der richtige Schritt ist.
              </p>

              <div style={{ marginTop: '3rem' }}>
                <p
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      'var(--text-xxs)',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color:         'var(--color-ink-subtle)',
                    marginBottom:  '0.5rem',
                  }}
                >
                  E-Mail
                </p>
                <a
                  href="mailto:hello@1789.consulting"
                  style={{
                    fontFamily:     'var(--font-display)',
                    fontWeight:     300,
                    fontSize:       'clamp(1.25rem, 2.5vw, 2rem)',
                    letterSpacing:  '-0.02em',
                    color:          'var(--color-ink)',
                    textDecoration: 'none',
                  }}
                  className="footer-link-email"
                >
                  hello@1789.consulting
                </a>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <p
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      'var(--text-xxs)',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color:         'var(--color-ink-subtle)',
                    marginBottom:  '0.5rem',
                  }}
                >
                  Standort
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   'var(--text-base)',
                    lineHeight: 1.6,
                    color:      'var(--color-ink)',
                  }}
                >
                  Frankfurt am Main<br />
                  Deutschland
                </p>
              </div>
            </Col>

            {/* Right — contact form */}
            <Col span={6} start={7}>
              <div
                className="card"
                style={{ padding: '2.5rem' }}
              >
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label
                        style={{
                          display:       'block',
                          fontFamily:    'var(--font-mono)',
                          fontSize:      'var(--text-xxs)',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color:         'var(--color-ink-subtle)',
                          marginBottom:  '0.5rem',
                        }}
                      >
                        Vorname
                      </label>
                      <input
                        type="text"
                        placeholder="Max"
                        style={{
                          width:        '100%',
                          padding:      '0.75rem 1rem',
                          fontFamily:   'var(--font-body)',
                          fontSize:     'var(--text-sub)',
                          color:        'var(--color-ink)',
                          background:   'transparent',
                          border:       '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-sm)',
                          outline:      'none',
                          boxSizing:    'border-box',
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display:       'block',
                          fontFamily:    'var(--font-mono)',
                          fontSize:      'var(--text-xxs)',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color:         'var(--color-ink-subtle)',
                          marginBottom:  '0.5rem',
                        }}
                      >
                        Nachname
                      </label>
                      <input
                        type="text"
                        placeholder="Mustermann"
                        style={{
                          width:        '100%',
                          padding:      '0.75rem 1rem',
                          fontFamily:   'var(--font-body)',
                          fontSize:     'var(--text-sub)',
                          color:        'var(--color-ink)',
                          background:   'transparent',
                          border:       '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-sm)',
                          outline:      'none',
                          boxSizing:    'border-box',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display:       'block',
                        fontFamily:    'var(--font-mono)',
                        fontSize:      'var(--text-xxs)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color:         'var(--color-ink-subtle)',
                        marginBottom:  '0.5rem',
                      }}
                    >
                      Organisation
                    </label>
                    <input
                      type="text"
                      placeholder="Ihr Unternehmen"
                      style={{
                        width:        '100%',
                        padding:      '0.75rem 1rem',
                        fontFamily:   'var(--font-body)',
                        fontSize:     'var(--text-sub)',
                        color:        'var(--color-ink)',
                        background:   'transparent',
                        border:       '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        outline:      'none',
                        boxSizing:    'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display:       'block',
                        fontFamily:    'var(--font-mono)',
                        fontSize:      'var(--text-xxs)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color:         'var(--color-ink-subtle)',
                        marginBottom:  '0.5rem',
                      }}
                    >
                      E-Mail
                    </label>
                    <input
                      type="email"
                      placeholder="max@organisation.de"
                      style={{
                        width:        '100%',
                        padding:      '0.75rem 1rem',
                        fontFamily:   'var(--font-body)',
                        fontSize:     'var(--text-sub)',
                        color:        'var(--color-ink)',
                        background:   'transparent',
                        border:       '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        outline:      'none',
                        boxSizing:    'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display:       'block',
                        fontFamily:    'var(--font-mono)',
                        fontSize:      'var(--text-xxs)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color:         'var(--color-ink-subtle)',
                        marginBottom:  '0.5rem',
                      }}
                    >
                      Ihre Situation
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Beschreiben Sie kurz, womit Sie sich gerade beschäftigen — welche Spannung, welche Lücke, welches Thema."
                      style={{
                        width:        '100%',
                        padding:      '0.75rem 1rem',
                        fontFamily:   'var(--font-body)',
                        fontSize:     'var(--text-sub)',
                        color:        'var(--color-ink)',
                        background:   'transparent',
                        border:       '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        outline:      'none',
                        resize:       'vertical',
                        boxSizing:    'border-box',
                        lineHeight:   '1.6',
                      }}
                    />
                  </div>

                  <Button variant="terra" size="lg" style={{ width: '100%', justifyContent: 'center' }}>
                    Nachricht senden →
                  </Button>

                </form>
              </div>
            </Col>
          </Grid>
        </Container>
      </section>

    </main>
  )
}
