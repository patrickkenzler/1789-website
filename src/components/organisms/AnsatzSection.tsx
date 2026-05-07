'use client'

/**
 * AnsatzSection — v1
 *
 * Layout:
 *   Left  50vw — accordion list (5 process steps)
 *   Right 50vw — split vertically at 50svh:
 *                top    → detail card (crossfades between active steps)
 *                bottom → FVS illustration panel (CollagePanel)
 *
 * Ordering principle:
 *   — Items use flex:1 → equal height slots, no layout jump on activate
 *   — Leitfrage fades in (opacity) inside the fixed slot; no height change
 *   — Detail + panel crossfade via stacked absolute divs with opacity
 */

import { useState } from 'react'
import { Tag }          from '@/components/atoms/Tag'
import { CollagePanel } from '@/components/molecules/CollagePanel'

// ── Data ──────────────────────────────────────────────────────────────────────

type PanelVariant = 'analyse' | 'change' | 'responsibility' | 'iterate' | 'overall'

type Step = {
  num:       string
  title:     string
  leitfrage: string
  text:      string    // editorial quote for the card
  wir:       string[]  // "Was wir tun"
  outputs:   string[]  // "Typische Outputs"
  outcome:   string
  panel:     PanelVariant
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
    outcome:   'Die Organisation bekommt ein gemeinsames Vokabular für das, was bisher diffus war. Führung kann klarer sehen, welche Strukturfragen wirklich bearbeitet werden müssen.',
    panel:     'analyse',
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
    outcome:   'Führung kann entscheiden, was verändert wird, in welcher Reihenfolge und mit welchem Anspruch. Die Organisation erhält eine gemeinsame Orientierung für die nächste Entwicklungsbewegung.',
    panel:     'change',
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
    outcome:   'Veränderung wird praktisch erfahrbar, bevor sie groß ausgerollt wird. Die Organisation erkennt früh, was funktioniert, was angepasst werden muss.',
    panel:     'responsibility',
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
    outcome:   'Die Organisation erkennt früh, was funktioniert, was angepasst werden muss und welche neue Arbeitsweise tragfähig ist.',
    panel:     'iterate',
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
    outcome:   'Die Organisation kann die neue Struktur eigenständig weiterentwickeln. Veränderung wird nicht als Projekt verwaltet, sondern in die Arbeitsfähigkeit eingebettet.',
    panel:     'overall',
  },
]

// ── Accordion item ─────────────────────────────────────────────────────────────

interface ItemProps {
  step:       Step
  isActive:   boolean
  onActivate: () => void
}

function AccordionItem({ step, isActive, onActivate }: ItemProps) {
  const [hovered, setHovered] = useState(false)
  const lit = isActive || hovered

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
        display:         'flex',
        flexDirection:   'column',
        justifyContent:  'center',
        paddingInline:   'var(--grid-margin)',
        paddingBlock:    'clamp(0.75rem, 1.2svh, 1.5rem)',
        borderTop:       '1px solid var(--color-border)',
        borderLeft:      isActive ? '3px solid var(--color-terra)' : '3px solid transparent',
        cursor:          'pointer',
        outline:         'none',
        transition:      'border-color 0.3s var(--ease-standard)',
        backgroundColor: isActive ? 'rgba(244,77,11,0.025)' : 'transparent',
        userSelect:      'none',
      }}
    >
      {/* Step number */}
      <span style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      'var(--text-xxs)',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color:         'var(--color-terra)',
        opacity:       lit ? 1 : 0.4,
        transition:    'opacity 0.25s',
        marginBottom:  '0.3rem',
        display:       'block',
      }}>
        {step.num}
      </span>

      {/* Title */}
      <h3 style={{
        fontFamily:    'var(--font-display)',
        fontWeight:    300,
        fontSize:      'clamp(1.4rem, 2vw, 2.25rem)',
        lineHeight:    1.0,
        letterSpacing: '-0.025em',
        color:         lit ? 'var(--color-ink)' : 'var(--color-ink-muted)',
        margin:        0,
        transition:    'color 0.3s var(--ease-standard)',
      }}>
        {step.title}
      </h3>

      {/* Leitfrage — fades in, no height change */}
      <p style={{
        fontFamily:  'var(--font-display)',
        fontStyle:   'italic',
        fontSize:    'var(--text-xs)',
        lineHeight:  1.4,
        color:       'var(--color-terra)',
        margin:      '0.45rem 0 0',
        opacity:     isActive ? 1 : 0,
        transform:   isActive ? 'translateY(0)' : 'translateY(4px)',
        transition:  'opacity 0.35s var(--ease-entry), transform 0.35s var(--ease-entry)',
        pointerEvents: 'none',
        maxWidth:    '36ch',
      }}>
        {step.leitfrage}
      </p>
    </div>
  )
}

// ── Detail card ────────────────────────────────────────────────────────────────

function DetailCard({ step }: { step: Step }) {
  return (
    <div style={{
      height:          '100%',
      display:         'flex',
      flexDirection:   'column',
      backgroundColor: 'var(--color-surface)',
      overflow:        'hidden',
    }}>
      {/* ── Header strip ── */}
      <div style={{
        paddingInline: 'clamp(1.75rem, 2.5vw, 2.75rem)',
        paddingTop:    'clamp(1.5rem, 2.5vw, 2.25rem)',
        paddingBottom: '1.125rem',
        borderBottom:  '1px solid var(--color-border)',
        flexShrink:    0,
      }}>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-xxs)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         'var(--color-terra)',
          display:       'block',
          marginBottom:  '0.3rem',
        }}>
          {step.num}
        </span>
        <h3 style={{
          fontFamily:    'var(--font-display)',
          fontWeight:    300,
          fontSize:      'clamp(1.5rem, 2.2vw, 2.5rem)',
          lineHeight:    0.95,
          letterSpacing: '-0.025em',
          color:         'var(--color-ink)',
          margin:        0,
        }}>
          {step.title}
        </h3>
      </div>

      {/* ── Scrollable body ── */}
      <div style={{
        flex:          1,
        overflowY:     'auto',
        paddingInline: 'clamp(1.75rem, 2.5vw, 2.75rem)',
        paddingBlock:  'clamp(1.25rem, 2vw, 2rem)',
        display:       'flex',
        flexDirection: 'column',
        gap:           'clamp(1rem, 1.5vw, 1.5rem)',
      }}>

        {/* Editorial quote */}
        <blockquote style={{
          fontFamily:  'var(--font-display)',
          fontStyle:   'italic',
          fontWeight:  300,
          fontSize:    'clamp(0.95rem, 1.2vw, 1.175rem)',
          lineHeight:  1.6,
          color:       'var(--color-ink)',
          borderLeft:  '2px solid var(--color-terra)',
          paddingLeft: '1rem',
          margin:      0,
        }}>
          {step.text}
        </blockquote>

        {/* Was wir tun */}
        <div>
          <p style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-xxs)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         'var(--color-ink-subtle)',
            margin:        '0 0 0.5rem',
          }}>
            Was wir tun
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {step.wir.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
                <span style={{ color: 'var(--color-terra)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xxs)', flexShrink: 0, lineHeight: 1.6 }}>
                  →
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-ink-muted)', lineHeight: 1.55 }}>
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
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         'var(--color-ink-subtle)',
            margin:        '0 0 0.5rem',
          }}>
            Typische Outputs
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {step.outputs.map((o, i) => (
              <span key={i} style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.625rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color:         'var(--color-ink-muted)',
                backgroundColor: 'var(--color-background)',
                border:        '1px solid var(--color-border)',
                borderRadius:  '2px',
                paddingInline: '0.5rem',
                paddingBlock:  '0.25rem',
                lineHeight:    1.5,
              }}>
                {o}
              </span>
            ))}
          </div>
        </div>

        {/* Outcome — always at bottom via marginTop auto */}
        <div style={{
          marginTop:   'auto',
          paddingTop:  '1rem',
          borderTop:   '1px solid var(--color-border)',
        }}>
          <p style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-xxs)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         'var(--color-terra)',
            margin:        '0 0 0.35rem',
          }}>
            Outcome
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'var(--text-xs)',
            lineHeight: 1.7,
            color:      'var(--color-ink)',
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
        display:             'grid',
        gridTemplateColumns: '1fr 1fr',
        height:              '100svh',
        overflow:            'hidden',
        position:            'relative',
      }}
    >

      {/* ══ LEFT: accordion ══════════════════════════════════════════════════ */}
      <div
        className="ansatz-left"
        style={{
          display:        'flex',
          flexDirection:  'column',
          height:         '100svh',
          borderRight:    '1px solid var(--color-border)',
          overflow:       'hidden',
          paddingTop:     '5rem',   /* clear fixed nav */
        }}
      >
        {/* Section label */}
        <div style={{
          paddingInline:  'var(--grid-margin)',
          paddingBlock:   '1.75rem 1.25rem',
          flexShrink:     0,
          borderBottom:   '1px solid var(--color-border)',
        }}>
          <Tag>Unser Ansatz</Tag>
        </div>

        {/* Accordion items — flex:1 distributes remaining height equally */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {STEPS.map((step, i) => (
            <AccordionItem
              key={step.num}
              step={step}
              isActive={active === i}
              onActivate={() => setActive(i)}
            />
          ))}
        </div>
      </div>

      {/* ══ RIGHT: detail + illustration ════════════════════════════════════ */}
      <div
        className="ansatz-right"
        style={{
          display:             'grid',
          gridTemplateRows:    '1fr 1fr',
          height:              '100svh',
          overflow:            'hidden',
        }}
      >

        {/* ── Detail card — top 50svh ── */}
        <div className="ansatz-detail" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--color-border)' }}>
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

        {/* ── FVS illustration — bottom 50svh ── */}
        <div className="ansatz-image" style={{ position: 'relative', overflow: 'hidden' }}>
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              aria-hidden={active !== i}
              style={{
                position:      'absolute',
                inset:         0,
                opacity:       active === i ? 1 : 0,
                transition:    'opacity 0.55s var(--ease-entry)',
                zIndex:        active === i ? 1 : 0,
              }}
            >
              <CollagePanel variant={step.panel} />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
