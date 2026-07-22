/**
 * AnsatzSection — editorial 5-step spread (v2)
 *
 * Visual approach: XXL italic numbers act as the visual rhythm, each phase
 * is its own vertical "tab" anchored by a 2px accent-coloured top stripe
 * (BCG/Bain editorial convention). Tag-line summaries instead of paragraph
 * descriptions keep the section scannable from across the room.
 *
 * Full long-form content (Was wir tun, Outputs, Outcome) lives on /ansatz.
 */

import Link from 'next/link'
import { Container, Grid, Col } from '@/components/layout/Grid'
import { Tag } from '@/components/atoms/Tag'
import {
  GlyphSee, GlyphTarget, GlyphFrame, GlyphLoop, GlyphHandover,
} from '@/components/molecules/PhaseGlyph'

const TERRA = 'var(--color-terra)'
const SAGE  = 'var(--color-sage)'
const SAND  = 'var(--color-sand)'

type Step = {
  num:       string
  meta:      string   // single-word phase tag, e.g. "Diagnose"
  title:     string
  leitfrage: string
  tagline:   string   // single-sentence essence — under ~10 words
  color:     string
  glyph:     () => React.ReactElement
}

const STEPS: readonly Step[] = [
  {
    num:       '01',
    meta:      'Diagnose',
    title:     'Sichtbar machen',
    leitfrage: 'Was blockiert uns wirklich?',
    tagline:   'Reale Entscheidungen, Routinen und Reibungen sichtbar machen.',
    color:     TERRA,
    glyph:     GlyphSee,
  },
  {
    num:       '02',
    meta:      'Zielbild',
    title:     'Entscheidbar machen',
    leitfrage: 'Wie müsste unsere Organisation arbeiten?',
    tagline:   'Erkenntnis in ein entscheidbares Zielmodell übersetzen.',
    color:     SAGE,
    glyph:     GlyphTarget,
  },
  {
    num:       '03',
    meta:      'Pilot',
    title:     'Gestaltbar machen',
    leitfrage: 'Wie kommt das Modell in echte Arbeit?',
    tagline:   'Zielbilder früh in reale Arbeitssituationen übersetzen.',
    color:     SAND,
    glyph:     GlyphFrame,
  },
  {
    num:       '04',
    meta:      'Praxis',
    title:     'Erprobbar machen',
    leitfrage: 'Was funktioniert wirklich?',
    tagline:   'In der Praxis prüfen, anpassen und verankern.',
    color:     TERRA,
    glyph:     GlyphLoop,
  },
  {
    num:       '05',
    meta:      'Transfer',
    title:     'Unabhängig machen',
    leitfrage: 'Wie bleibt es wirksam, wenn 1789 rausgeht?',
    tagline:   'Verantwortung und Rhythmus für eigenständige Weiterentwicklung.',
    color:     SAGE,
    glyph:     GlyphHandover,
  },
]

export function AnsatzSection() {
  return (
    <div
      className="ansatz-container"
      style={{
        width:           '100%',
        height:          '100%',
        maxHeight:       '920px',
        margin:          'auto 0',
        display:         'flex',
        flexDirection:   'column',
        overflow:        'hidden',
        backgroundColor: 'var(--color-ink)',
        paddingBlock:    'clamp(2.5rem, 5svh, 5rem)',
      }}
    >
      <Container style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* ── Header — Tag + headline only ───────────────────────────────
            Description moved to the footer next to the "Den vollständigen
            Ansatz lesen" link, matching the pattern used in LaborSection. */}
        <header style={{ flexShrink: 0, marginBottom: 'clamp(2rem, 4svh, 4rem)' }}>
          <Tag
            variant="default"
            style={{
              color:       'rgba(255,255,255,0.9)',
              borderColor: 'rgba(255,255,255,0.45)',
            }}
          >
            Unser Ansatz
          </Tag>
          <h2
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    300,
              fontSize:      'clamp(2rem, 4.5svh, 4.5rem)',
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
        </header>

        {/* ── Step spread — 5 vertical phase tabs ───────────────────────── */}
        <ol className="ansatz-steps" style={{ flex: 1, minHeight: 0 }}>
          {STEPS.map((step) => (
            <li
              key={step.num}
              style={{
                display:        'flex',
                flexDirection:  'column',
                minWidth:       0,
                paddingTop:     'clamp(1rem, 2svh, 1.75rem)',
                borderTop:      `2px solid ${step.color}`,
              }}
            >
              {/* Meta phase tag (mono, accent) */}
              <span
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      'var(--text-xxs)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color:         step.color,
                  opacity:       0.85,
                  display:       'block',
                }}
              >
                {step.meta}
              </span>

              {/* Hero number — italic display, accent colour */}
              <span
                aria-hidden="true"
                style={{
                  fontFamily:    'var(--font-display)',
                  fontStyle:     'italic',
                  fontWeight:    300,
                  fontSize:      'clamp(2.75rem, 8svh, 6.5rem)',
                  lineHeight:    0.95,
                  letterSpacing: '-0.04em',
                  color:         step.color,
                  display:       'block',
                  marginTop:     'clamp(0.5rem, 1svh, 1rem)',
                }}
              >
                {step.num}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily:    'var(--font-display)',
                  fontWeight:    300,
                  fontSize:      'clamp(1.125rem, 2.4svh, 1.625rem)',
                  lineHeight:    1.1,
                  letterSpacing: '-0.02em',
                  color:         'rgba(242,242,242,0.95)',
                  margin:        'clamp(0.5rem, 1svh, 1rem) 0 0',
                }}
              >
                {step.title}
              </h3>

              {/* Leitfrage — italic supporting question */}
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle:  'italic',
                  fontWeight: 300,
                  fontSize:   'clamp(0.8125rem, 1.55svh, 1rem)',
                  lineHeight: 1.4,
                  color:      'rgba(242,242,242,0.5)',
                  margin:     'clamp(0.4rem, 0.8svh, 0.7rem) 0 0',
                }}
              >
                {step.leitfrage}
              </p>

              {/* Glyph — centred in remaining space between leitfrage + tagline */}
              <div
                style={{
                  flex:           1,
                  minHeight:      0,
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  paddingBlock:   'clamp(1rem, 2svh, 2rem)',
                  color:          step.color,
                }}
              >
                <div style={{
                  width:    'clamp(2.25rem, 5.5svh, 3.75rem)',
                  height:   'clamp(2.25rem, 5.5svh, 3.75rem)',
                  display:  'block',
                }}>
                  <step.glyph />
                </div>
              </div>

              {/* Tagline — punchy single-line essence, pinned to bottom */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   'clamp(0.75rem, 1.4svh, 0.875rem)',
                  lineHeight: 1.55,
                  color:      'rgba(242,242,242,0.7)',
                  margin:     0,
                }}
              >
                {step.tagline}
              </p>
            </li>
          ))}
        </ol>

        {/* ── CTA — description sits above the link as a lead-in ────── */}
        <footer
          style={{
            flexShrink:    0,
            marginTop:     'clamp(1.5rem, 3svh, 3rem)',
            display:       'flex',
            flexDirection: 'column',
            gap:           'clamp(0.75rem, 1.5svh, 1.25rem)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'clamp(0.8125rem, 1.55svh, 1.0625rem)',
              lineHeight: 1.65,
              color:      'rgba(242,242,242,0.5)',
              maxWidth:   '54ch',
              margin:     0,
            }}
          >
            Fünf Phasen, in denen wir Organisationen von der ersten Diagnose
            bis zur selbstständigen Weiterentwicklung begleiten.
          </p>
          <Link
            href="/ansatz"
            className="hover-line"
            style={{
              alignSelf:      'flex-start',
              fontFamily:     'var(--font-mono)',
              fontSize:       'var(--text-xxs)',
              letterSpacing:  '0.16em',
              textTransform:  'uppercase',
              color:          'var(--color-terra)',
              textDecoration: 'none',
            }}
          >
            Den vollständigen Ansatz lesen →
          </Link>
        </footer>

      </Container>
    </div>
  )
}
