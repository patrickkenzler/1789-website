'use client'

/**
 * SystemshiftAccordion
 *
 * Interactive accordion for the four Systemshift Cycle phases.
 * Interaction model inspired by foreverday.one:
 *   — click/hover a row → it expands, others collapse
 *   — left collage panel crossfades to the matching variant
 *
 * Design principles applied:
 *   — display typography at ~3.5rem; weight 300 (light Cormorant)
 *   — terra colour for active state + mono labels
 *   — grid-template-rows 0fr→1fr for smooth, performant expand
 *   — opacity crossfade (no paint cost) for the visual panel
 */

import { useState } from 'react'
import { CollagePanel } from '@/components/molecules/CollagePanel'
import { Button } from '@/components/atoms/Button'

// ─── Data ─────────────────────────────────────────────────────────────────────

const ITEMS = [
  {
    num: '01',
    title: 'Analyse & Erkenntnis',
    subtitle: 'Sehen, was ist.',
    body: 'Eine Organisation kann nur Dinge erkennen und ändern, um die sie weiß. Wir setzen sie in die Lage, sich in ihrem System zu erkennen — schonungslos, präzise, ohne Vorannahmen.',
    variant: 'analyse' as const,
    href: '/ansatz',
  },
  {
    num: '02',
    title: 'Change by Action',
    subtitle: 'Verändern, während es passiert.',
    body: 'Veränderung wird sofort Teil des Vorgehens. Die Transformation beginnt während — nicht nach — unserem Prozess. Handlung erzeugt Erkenntnis, Erkenntnis treibt Handlung.',
    variant: 'change' as const,
    href: '/ansatz',
  },
  {
    num: '03',
    title: 'Responsibility',
    subtitle: 'Verbindlichkeit gestalten.',
    body: 'Wir gestalten verantwortungsgetriebene Operating Modelle. Verbindlichkeitsstrukturen als Basis nachhaltiger Wirkung — jede Rolle weiß, wofür sie steht.',
    variant: 'responsibility' as const,
    href: '/ansatz',
  },
  {
    num: '04',
    title: 'Iterate',
    subtitle: 'Kontinuierlich wachsen.',
    body: 'Artefaktgetrieben, pragmatisch, partizipativ. Wir strapazieren Organisationen und fordern ihre Fähigkeit zur Veränderung — immer wieder, immer tiefer.',
    variant: 'iterate' as const,
    href: '/ansatz',
  },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

export function SystemshiftAccordion() {
  const [active, setActive] = useState<number>(0)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

      {/* ── LEFT: sticky visual panel, crossfades between variants ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100svh',
          overflow: 'hidden',
        }}
      >
        {ITEMS.map((item, i) => (
          <div
            key={item.variant}
            aria-hidden={active !== i}
            style={{
              position:   'absolute',
              inset:      0,
              opacity:    active === i ? 1 : 0,
              transition: 'opacity 0.55s var(--ease-entry)',
              zIndex:     active === i ? 1 : 0,
            }}
          >
            <CollagePanel variant={item.variant} />
          </div>
        ))}
      </div>

      {/* ── RIGHT: accordion list ── */}
      <div
        style={{
          paddingRight: 'var(--grid-margin)',
          paddingLeft:  'clamp(2rem, 4vw, 5rem)',
        }}
      >
        {ITEMS.map((item, i) => {
          const isActive = active === i

          return (
            <AccordionRow
              key={item.title}
              num={item.num}
              title={item.title}
              subtitle={item.subtitle}
              body={item.body}
              href={item.href}
              isActive={isActive}
              onActivate={() => setActive(i)}
            />
          )
        })}

        {/* CTA below last item */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingBlock: '3rem' }}>
          <a href="/ansatz">
            <Button variant="ghost">Ansatz im Detail →</Button>
          </a>
        </div>
      </div>

    </div>
  )
}

// ─── Accordion Row ─────────────────────────────────────────────────────────────

interface RowProps {
  num:        string
  title:      string
  subtitle:   string
  body:       string
  href:       string
  isActive:   boolean
  onActivate: () => void
}

function AccordionRow({ num, title, subtitle, body, href, isActive, onActivate }: RowProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      onClick={onActivate}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onActivate() } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: '1px solid var(--color-border)',
        cursor:    'pointer',
        outline:   'none',
      }}
    >
      {/* ── Header row ── */}
      <div
        style={{
          display:        'flex',
          alignItems:     'baseline',
          gap:            '1.5rem',
          paddingBlock:   'clamp(1.75rem, 2.5vw, 2.75rem)',
        }}
      >
        {/* Step number */}
        <span
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-xxs)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'var(--color-terra)',
            flexShrink:    0,
            paddingTop:    '0.25em',
            opacity:       isActive || hovered ? 1 : 0.5,
            transition:    'opacity 0.3s var(--ease-standard)',
          }}
        >
          {num}
        </span>

        {/* Title */}
        <h3
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(2rem, 3.2vw, var(--text-lg))',
            fontWeight:    300,
            lineHeight:    1.0,
            letterSpacing: '-0.02em',
            color:         isActive
                             ? 'var(--color-ink)'
                             : hovered
                               ? 'var(--color-ink)'
                               : 'var(--color-ink-muted)',
            flex:          1,
            margin:        0,
            transition:    'color 0.35s var(--ease-standard)',
          }}
        >
          {title}
        </h3>

        {/* Arrow — rotates when active */}
        <span
          aria-hidden
          style={{
            display:       'inline-flex',
            alignItems:    'center',
            justifyContent:'center',
            width:         '1.75rem',
            height:        '1.75rem',
            borderRadius:  '50%',
            border:        isActive
                             ? '1px solid var(--color-terra)'
                             : '1px solid var(--color-border)',
            color:         isActive ? 'var(--color-terra)' : 'var(--color-ink-subtle)',
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.7rem',
            flexShrink:    0,
            transform:     isActive ? 'rotate(90deg)' : 'rotate(0deg)',
            transition:    'transform 0.4s var(--ease-expressive), border-color 0.3s, color 0.3s',
          }}
        >
          →
        </span>
      </div>

      {/* ── Expandable body — grid-rows technique ── */}
      <div
        style={{
          display:             'grid',
          gridTemplateRows:    isActive ? '1fr' : '0fr',
          transition:          'grid-template-rows 0.45s var(--ease-standard)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              paddingBottom: 'clamp(2rem, 3vw, 3.5rem)',
              paddingRight:  'clamp(0rem, 2vw, 2rem)',
            }}
          >
            {/* Italic subtitle */}
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle:  'italic',
                fontSize:   'var(--text-base)',
                color:      'var(--color-terra)',
                marginBottom: '0.875rem',
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </p>

            {/* Body copy */}
            <p
              style={{
                fontFamily:   'var(--font-body)',
                fontSize:     'var(--text-base)',
                color:        'var(--color-ink-muted)',
                lineHeight:   1.75,
                maxWidth:     '42ch',
                marginBottom: '1.75rem',
              }}
            >
              {body}
            </p>

            {/* Inline CTA link */}
            <a
              href={href}
              onClick={(e) => e.stopPropagation()}
              style={{
                display:       'inline-flex',
                alignItems:    'center',
                gap:           '0.5rem',
                fontFamily:    'var(--font-mono)',
                fontSize:      'var(--text-xxs)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         'var(--color-ink)',
                borderBottom:  '1px solid var(--color-ink)',
                paddingBottom: '2px',
                textDecoration:'none',
              }}
            >
              Mehr erfahren
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}
