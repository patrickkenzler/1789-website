/**
 * AnsatzSection — editorial 5-step list
 *
 * Replaces the previous accordion + detail-panel + illustration layout with a
 * compact editorial list that matches the rest of the home page (Hero, AI
 * section, Pillars). One row per phase:
 *   [italic-display number, accent colour]   [title + leitfrage]   [summary]
 *
 * Long-form descriptions, "Was wir tun" lists, output tags and outcomes have
 * moved to /ansatz so this section can stay one viewport-tall sticky card.
 * All vertical sizing is svh-driven so the five rows + header + CTA fit on
 * 13" laptops / iPad mirrors as well as full desktop.
 */

import Link from 'next/link'
import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'

const TERRA = 'var(--color-terra)'
const SAGE  = 'var(--color-sage)'
const SAND  = 'var(--color-sand)'

type Step = {
  num:       string
  title:     string
  leitfrage: string
  summary:   string
  color:     string
}

const STEPS: readonly Step[] = [
  {
    num:       '01',
    title:     'Sichtbar machen',
    leitfrage: 'Was blockiert uns wirklich?',
    summary:   'Wir machen sichtbar, wie die Organisation tatsächlich arbeitet — entlang realer Entscheidungen, Routinen und Reibungen.',
    color:     TERRA,
  },
  {
    num:       '02',
    title:     'Entscheidbar machen',
    leitfrage: 'Wie müsste unsere Organisation arbeiten, damit Strategie wirksam wird?',
    summary:   'Aus Erkenntnis wird ein entscheidbares Zielmodell — Operating Model, Governance, Verantwortung.',
    color:     SAGE,
  },
  {
    num:       '03',
    title:     'Gestaltbar machen',
    leitfrage: 'Wie kommt das Modell in echte Arbeit?',
    summary:   'Zielbilder treffen früh auf reale Situationen — in Piloten, Routinen und Entscheidungen.',
    color:     SAND,
  },
  {
    num:       '04',
    title:     'Erprobbar machen',
    leitfrage: 'Was funktioniert wirklich?',
    summary:   'Das Modell wird in der Praxis geprüft, angepasst — und wird so zur eigenen Struktur der Organisation.',
    color:     TERRA,
  },
  {
    num:       '05',
    title:     'Unabhängig machen',
    leitfrage: 'Wie bleibt es wirksam, wenn 1789 rausgeht?',
    summary:   'Verantwortung, Routinen und ein Rhythmus, in dem Anpassung Teil der Arbeit wird.',
    color:     SAGE,
  },
]

export function AnsatzSection() {
  return (
    <div
      style={{
        height:          '100%',
        display:         'flex',
        flexDirection:   'column',
        overflow:        'hidden',
        backgroundColor: 'var(--color-ink)',
        paddingBlock:    'clamp(2rem, 4svh, 4rem)',
      }}
    >
      <Container style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* ── Header ────────────────────────────────────────────────────── */}
        <header style={{ flexShrink: 0 }}>
          <Grid className="stack-cols" style={{ alignItems: 'flex-end' }}>
            <Col span={7}>
              <Tag variant="accent">Unser Ansatz</Tag>
              <h2
                style={{
                  fontFamily:    'var(--font-display)',
                  fontWeight:    300,
                  fontSize:      'clamp(1.75rem, 4svh, 4rem)',
                  lineHeight:    1.02,
                  letterSpacing: '-0.025em',
                  color:         'rgba(242,242,242,0.92)',
                  marginTop:     'clamp(1rem, 2svh, 1.75rem)',
                }}
              >
                Von Diagnose<br />
                <em style={{ fontStyle: 'italic', color: 'var(--color-terra)' }}>
                  zur Eigenständigkeit.
                </em>
              </h2>
            </Col>
            <Col span={5}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   'clamp(0.8125rem, 1.55svh, 1.0625rem)',
                  lineHeight: 1.65,
                  color:      'rgba(242,242,242,0.5)',
                  maxWidth:   '48ch',
                  margin:     0,
                }}
              >
                Fünf Phasen, in denen wir Organisationen von der ersten Diagnose
                bis zur selbstständigen Weiterentwicklung begleiten.
              </p>
            </Col>
          </Grid>
        </header>

        {/* ── Steps — flex:1 fills remaining height, rows evenly distributed ── */}
        <ol
          style={{
            flex:           1,
            minHeight:      0,
            listStyle:      'none',
            margin:         'clamp(1.5rem, 3svh, 3rem) 0 clamp(1rem, 2svh, 2rem)',
            padding:        0,
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'space-between',
            borderTop:      '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {STEPS.map((step) => (
            <li
              key={step.num}
              style={{
                display:             'grid',
                gridTemplateColumns: 'auto minmax(0, 1fr) minmax(0, 1.4fr)',
                gap:                 'clamp(1rem, 2vw, 2.5rem)',
                alignItems:          'baseline',
                paddingBlock:        'clamp(0.8rem, 1.6svh, 1.5rem)',
                borderBottom:        '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Number — italic display, accent colour */}
              <span
                aria-hidden="true"
                style={{
                  fontFamily:  'var(--font-display)',
                  fontStyle:   'italic',
                  fontWeight:  300,
                  fontSize:    'clamp(1.5rem, 3.4svh, 2.75rem)',
                  lineHeight:  1,
                  color:       step.color,
                  minWidth:    '1.5ch',
                  textAlign:   'left',
                }}
              >
                {step.num}
              </span>

              {/* Title + leitfrage */}
              <div style={{ minWidth: 0 }}>
                <h3
                  style={{
                    fontFamily:    'var(--font-display)',
                    fontWeight:    300,
                    fontSize:      'clamp(1.125rem, 2.4svh, 1.75rem)',
                    lineHeight:    1.1,
                    letterSpacing: '-0.02em',
                    color:         'rgba(242,242,242,0.92)',
                    margin:        0,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle:  'italic',
                    fontWeight: 300,
                    fontSize:   'clamp(0.8125rem, 1.55svh, 1rem)',
                    lineHeight: 1.4,
                    color:      'rgba(242,242,242,0.5)',
                    margin:     '0.35rem 0 0',
                  }}
                >
                  {step.leitfrage}
                </p>
              </div>

              {/* Summary */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   'clamp(0.8125rem, 1.5svh, 0.9375rem)',
                  lineHeight: 1.6,
                  color:      'rgba(242,242,242,0.62)',
                  margin:     0,
                }}
              >
                {step.summary}
              </p>
            </li>
          ))}
        </ol>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <footer style={{ flexShrink: 0 }}>
          <Link
            href="/ansatz"
            className="hover-line"
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-xxs)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color:         'var(--color-terra)',
              textDecoration:'none',
            }}
          >
            Den vollständigen Ansatz lesen →
          </Link>
        </footer>

      </Container>
    </div>
  )
}
