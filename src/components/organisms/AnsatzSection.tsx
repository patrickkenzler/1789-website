'use client'

/**
 * AnsatzSection — v2  dark edition
 *
 * Full dark section (var(--color-ink) throughout).
 * Each of the 5 steps carries an accent colour drawn from the brand palette
 * (terra / sage / sand).  That colour flows through:
 *   Left  — step number, 2px left-border stripe on the active item
 *   Right — blockquote border, list arrows, output-tag border, outcome label
 *
 * Layout: flex column, 100svh
 *   Row A  full-width header band (borderBottom, no vertical divider)
 *   Row B  CSS grid 1fr/2fr
 *          Left  accordion (borderRight)
 *          Right detail card (3fr) + FVS illustration (1fr)
 */

import { useState } from 'react'
import { Tag }          from '@/components/atoms/Tag'
import { CollagePanel } from '@/components/molecules/CollagePanel'

// ── Colour helpers ────────────────────────────────────────────────────────────

const TERRA = '#F44D0B'
const SAGE  = '#B8CC8A'
const SAND  = '#E3DDD5'

/** Return rgba(…) string from a 6-digit hex + alpha 0–1 */
function wa(hex: string, a: number) {
  const n = parseInt(hex.replace('#', ''), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
}

// ── Data ──────────────────────────────────────────────────────────────────────

type PanelVariant = 'analyse' | 'change' | 'responsibility' | 'iterate' | 'overall'

type Step = {
  num:       string
  title:     string
  leitfrage: string
  text:      string
  wir:       string[]
  outputs:   string[]
  outcome:   string
  panel:     PanelVariant
  color:     string   // brand accent for this step
}

const STEPS: Step[] = [
  {
    num:       '01',
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
    panel:   'analyse',
    color:   TERRA,
  },
  {
    num:       '02',
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
    panel:   'change',
    color:   SAGE,
  },
  {
    num:       '03',
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
    outcome: 'Veränderung wird praktisch erfahrbar, bevor sie groß ausgerollt wird. Die Organisation erkennt früh, was funktioniert, was angepasst werden muss.',
    panel:   'responsibility',
    color:   SAND,
  },
  {
    num:       '04',
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
    panel:   'iterate',
    color:   TERRA,
  },
  {
    num:       '05',
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
    panel:   'overall',
    color:   SAGE,
  },
]

// ── Accordion item ─────────────────────────────────────────────────────────────

interface ItemProps {
  step:       Step
  isFirst:    boolean
  isActive:   boolean
  onActivate: () => void
}

function AccordionItem({ step, isFirst, isActive, onActivate }: ItemProps) {
  const [hovered, setHovered] = useState(false)
  const { color } = step

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={onActivate}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onActivate() }}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex:            1,
        minHeight:       0,          /* allow flex to shrink below content size */
        overflow:        'hidden',
        display:         'flex',
        flexDirection:   'column',
        justifyContent:  'center',
        /* All vertical spacing in svh so items scale with viewport height */
        paddingLeft:     'calc(var(--grid-margin) - 2px)',
        paddingRight:    'var(--grid-margin)',
        paddingBlock:    '2svh',
        borderLeft:      `2px solid ${isActive ? color : hovered ? wa(color, 0.35) : 'transparent'}`,
        cursor:          'pointer',
        outline:         'none',
        backgroundColor: isActive ? wa(color, 0.1) : hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.03)',
        transition:      'background-color 0.3s var(--ease-standard), border-left-color 0.3s var(--ease-standard)',
        userSelect:      'none',
      }}
    >
      {/* Step number */}
      <span style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      'var(--text-xxs)',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color:         color,
        opacity:       isActive ? 1 : hovered ? 0.55 : 0.28,
        transition:    'opacity 0.25s var(--ease-standard)',
        marginBottom:  '0.7svh',
        display:       'block',
      }}>
        {step.num}
      </span>

      {/* Title — svh-based font so it scales with height, not just width */}
      <h3 style={{
        fontFamily:    'var(--font-display)',
        fontWeight:    300,
        fontSize:      'clamp(1.1rem, 2.8svh, 2.25rem)',
        lineHeight:    1.0,
        letterSpacing: '-0.025em',
        color:         isActive
                         ? 'rgba(242,242,242,0.95)'
                         : hovered
                           ? 'rgba(242,242,242,0.6)'
                           : 'rgba(242,242,242,0.3)',
        margin:        0,
        transition:    'color 0.3s var(--ease-standard)',
      }}>
        {step.title}
      </h3>

      {/* Leitfrage — collapses to zero height when inactive */}
      <p style={{
        fontFamily:    'var(--font-display)',
        fontStyle:     'italic',
        fontSize:      'clamp(0.75rem, 1.5svh, 1rem)',
        lineHeight:    1.45,
        color:         'rgba(242,242,242,0.55)',
        margin:        0,
        marginTop:     isActive ? '0.8svh' : 0,
        maxHeight:     isActive ? '5svh' : 0,
        overflow:      'hidden',
        opacity:       isActive ? 1 : 0,
        transition:    'max-height 0.4s var(--ease-entry), opacity 0.35s var(--ease-entry), margin-top 0.35s var(--ease-entry)',
        pointerEvents: 'none',
        maxWidth:      '36ch',
      }}>
        {step.leitfrage}
      </p>
    </div>
  )
}

// ── Detail card ────────────────────────────────────────────────────────────────

function DetailCard({ step }: { step: Step }) {
  const pad   = 'clamp(1.5rem, 2.5vw, 2.75rem)'
  const color = step.color

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* ── Scrollable body ── */}
      <div style={{
        flex:          1,
        overflowY:     'auto',
        paddingInline: pad,
        paddingTop:    pad,
        paddingBottom: 'clamp(1.5rem, 2.2vw, 2.25rem)',
        display:       'flex',
        flexDirection: 'column',
        gap:           'clamp(1.25rem, 2vw, 2rem)',
      }}>

        {/* Editorial quote */}
        <blockquote style={{
          fontFamily:  'var(--font-display)',
          fontStyle:   'italic',
          fontWeight:  300,
          fontSize:    'clamp(1rem, 1.35vw, 1.25rem)',
          lineHeight:  1.65,
          color:       'rgba(242,242,242,0.88)',
          borderLeft:  `2px solid ${color}`,
          paddingLeft: '1.25rem',
          margin:      0,
        }}>
          {step.text}
        </blockquote>

        {/* Was wir tun */}
        <div>
          <p style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-xxs)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color:         'rgba(242,242,242,0.35)',
            margin:        '0 0 0.75rem',
          }}>
            Was wir tun
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.425rem' }}>
            {step.wir.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'baseline' }}>
                <span style={{
                  color:      color,
                  fontFamily: 'var(--font-mono)',
                  fontSize:   'var(--text-xxs)',
                  flexShrink: 0,
                  lineHeight: 1.7,
                  opacity:    0.8,
                }}>
                  →
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '0.875rem',
                  color:      'rgba(242,242,242,0.62)',
                  lineHeight: 1.6,
                }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Typische Outputs */}
        <div>
          <p style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-xxs)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color:         'rgba(242,242,242,0.35)',
            margin:        '0 0 0.75rem',
          }}>
            Typische Outputs
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {step.outputs.map((o, i) => (
              <span key={i} style={{
                fontFamily:      'var(--font-mono)',
                fontSize:        '0.625rem',
                letterSpacing:   '0.08em',
                textTransform:   'uppercase',
                color:           wa(color, 0.75),
                backgroundColor: wa(color, 0.07),
                border:          `1px solid ${wa(color, 0.25)}`,
                borderRadius:    '2px',
                paddingInline:   '0.5rem',
                paddingBlock:    '0.3rem',
                lineHeight:      1.5,
              }}>
                {o}
              </span>
            ))}
          </div>
        </div>

        {/* Outcome */}
        <div style={{
          paddingTop: 'clamp(1rem, 1.5vw, 1.5rem)',
          borderTop:  '1px solid rgba(255,255,255,0.08)',
        }}>
          <p style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-xxs)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color:         color,
            margin:        '0 0 0.5rem',
            opacity:       0.85,
          }}>
            Outcome
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'var(--text-xs)',
            lineHeight: 1.75,
            color:      'rgba(242,242,242,0.82)',
            margin:     0,
          }}>
            {step.outcome}
          </p>
        </div>

      </div>
    </div>
  )
}

// ── Main export ────────────────────────────────────────────────────────────────

export function AnsatzSection() {
  const [active, setActive] = useState(0)

  return (
    <div
      className="ansatz-grid"
      style={{
        display:         'flex',
        flexDirection:   'column',
        height:          '100%',   /* fills the scroll-card wrapper in page.tsx */
        overflow:        'hidden',
        backgroundColor: 'var(--color-ink)',
      }}
    >

      {/* ══ Row A: header — compact strip, all vertical sizes in svh ════════ */}
      <div
        style={{
          flexShrink:          0,
          display:             'grid',
          gridTemplateColumns: '1fr 2fr',
          paddingTop:          '1.8svh',
          borderBottom:        '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Left cell: tag + headline */}
        <div style={{
          paddingInline: 'var(--grid-margin)',
          paddingBottom: '1.8svh',
        }}>
          <Tag variant="accent">Unser Ansatz</Tag>
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontWeight:    300,
            /* svh-driven so header scales with viewport height, not width */
            fontSize:      'clamp(1rem, 2.4svh, 2.25rem)',
            lineHeight:    1.05,
            letterSpacing: '-0.03em',
            color:         'rgba(242,242,242,0.92)',
            margin:        '0.8svh 0 0',
          }}>
            Von Diagnose<br />zur Eigenständigkeit.
          </h2>
        </div>

        {/* Right cell: caption-size description — key to keeping header compact */}
        <div style={{
          paddingInline: 'var(--grid-margin)',
          paddingBottom: '1.8svh',
          display:       'flex',
          alignItems:    'flex-end',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            /* Reduced from text-base (20px) to xs (13px) — the large font
               was the main reason the header ate 280px instead of ~90px */
            fontSize:   'clamp(0.75rem, 1.4svh, 0.9375rem)',
            lineHeight: 1.55,
            color:      'rgba(242,242,242,0.4)',
            margin:     0,
            maxWidth:   '52ch',
          }}>
            Fünf Phasen, in denen wir Organisationen von der ersten Erkenntnis bis
            zur selbstständigen Weiterentwicklung begleiten.
          </p>
        </div>
      </div>

      {/* ══ Row B: two-column body ═══════════════════════════════════════════ */}
      <div
        style={{
          flex:                1,
          display:             'grid',
          gridTemplateColumns: '1fr 2fr',
          minHeight:           0,
          overflow:            'hidden',
        }}
      >

        {/* ── Left: accordion ── */}
        <div
          className="ansatz-left"
          style={{
            borderRight:   '1px solid rgba(255,255,255,0.08)',
            display:       'flex',
            flexDirection: 'column',
            gap:           '1px',   /* dark ink shows between cards */
            overflow:      'hidden',
          }}
        >
          {STEPS.map((step, i) => (
            <AccordionItem
              key={step.num}
              step={step}
              isFirst={i === 0}
              isActive={active === i}
              onActivate={() => setActive(i)}
            />
          ))}
        </div>

        {/* ── Right: detail card (top 3/4) + FVS illustration (bottom 1/4) ── */}
        <div
          className="ansatz-right"
          style={{
            display:          'grid',
            gridTemplateRows: '2fr 1fr',
            overflow:         'hidden',
            backgroundColor:  'var(--color-ink)',
          }}
        >

          {/* Detail card */}
          <div
            className="ansatz-detail"
            style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                aria-hidden={active !== i}
                style={{
                  position:      'absolute',
                  inset:         0,
                  opacity:       active === i ? 1 : 0,
                  transition:    'opacity 0.45s var(--ease-entry)',
                  pointerEvents: active === i ? 'auto' : 'none',
                  zIndex:        active === i ? 1 : 0,
                }}
              >
                <DetailCard step={step} />
              </div>
            ))}
          </div>

          {/* FVS illustration strip */}
          <div
            className="ansatz-image"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                aria-hidden={active !== i}
                style={{
                  position:   'absolute',
                  inset:      0,
                  opacity:    active === i ? 1 : 0,
                  transition: 'opacity 0.55s var(--ease-entry)',
                  zIndex:     active === i ? 1 : 0,
                }}
              >
                <CollagePanel variant={step.panel} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
