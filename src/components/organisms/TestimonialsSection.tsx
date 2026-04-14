'use client'

/**
 * TestimonialsSection
 *
 * Shows 3 testimonial cards at a time in a fixed-height sticky card.
 * Prev / next arrow buttons slide the track to reveal the remaining cards.
 * No scroll-pinning — the section behaves like every other scroll-card.
 */

import { useState } from 'react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const em = (text: string) => (
  <strong style={{ fontStyle: 'normal', fontWeight: 600, color: 'var(--color-ink)' }}>
    {text}
  </strong>
)

const TESTIMONIALS: {
  quote:     React.ReactNode
  name:      string
  title:     string
  company:   string
  photo:     string | null
  linkedin:  string
  caseHref:  string | null
  caseLabel: string | null
}[] = [
  {
    quote: <>
      1789 führt uns bei der Gestaltung eines {em('Target-Operating-Models')}, das den Anforderungen
      unseres schnelllebigen, dynamischen Marktes gerecht wird. 1789 geht weit über die traditionelle
      Beratung hinaus: Es handelt sich um einen {em('gemeinsamen Entwicklungsprozess auf Augenhöhe')} –
      sie sind {em('Innovatoren mit herausragender Expertise')}.
    </>,
    name:      'Sven Kalisch',
    title:     'CEO',
    company:   'teccle group',
    photo:     '/testimonials/sven-kalisch.jpeg',
    linkedin:  'https://www.linkedin.com/in/sven-kalisch-b4113610b/',
    caseHref:  '/projekte/integration',
    caseLabel: 'Integration: 15 Firmen, eine Organisation',
  },
  {
    quote: <>
      Es war sehr beeindruckend, {em('wie schnell uns 1789 bereits nach dem ersten Kennenlernen vollends durchdrungen hat')}. 1789 hat uns {em('gechallenged')} — immer anpackend,
      partnerschaftlich und stets {em('mit Blick auf klare Resultate und Actions')}.
    </>,
    name:      'Daniel Kalisch',
    title:     'General Manager D.A.CH.',
    company:   'WD-40 Company',
    photo:     '/testimonials/daniel-kalisch.jpeg',
    linkedin:  'https://www.linkedin.com/in/daniel-kalisch-3b21a651',
    caseHref:  '/projekte/innovationskraft-durch-zusammenarbeit',
    caseLabel: 'Innovationskraft durch Zusammenarbeit',
  },
  {
    quote: <>
      Mit einem {em('tiefen Verständnis für die Herausforderungen eines Konzerns')} und für die
      Notwendigkeit, sich an neue Gegebenheiten anzupassen, wurde 1789 ausgewählt, um von{' '}
      {em('strategischer Planung über Konzeption bis hin zur Implementierung')} als Partner zu fungieren.
    </>,
    name:      'Timo Salzsieder',
    title:     'Chief Information Officer',
    company:   'Müller Holding GmbH & Co. KG',
    photo:     '/testimonials/timo-salzsieder.jpeg',
    linkedin:  'https://www.linkedin.com/in/timo-salzsieder-88993514',
    caseHref:  null,
    caseLabel: null,
  },
  {
    quote: <>
      Besonders wertvoll war für uns die Unterstützung seitens 1789 beim{' '}
      {em('Workshopdesign und der Moderation großer Gruppen')}, einerseits im Managementteam aber
      auch mit ausgewählten Mitarbeitenden. So ist es uns gelungen,{' '}
      {em('unterschiedliche Zielgruppen aktiv in den Prozess einzubinden')}. Außerdem war die
      Zusammenarbeit geprägt von {em('großem Vertrauen')} und hat zu jedem Zeitpunkt Spaß gemacht.
    </>,
    name:      'Viola Krauss',
    title:     'Chief People and Culture Officer',
    company:   'WTS Deutschland',
    photo:     '/testimonials/viola-krauss.jpg',
    linkedin:  'https://www.linkedin.com/in/viola-krauss-3a09254b',
    caseHref:  '/projekte/motivieren-und-entwickeln',
    caseLabel: 'Motivieren und Entwickeln',
  },
  {
    quote: <>
      Gemeinsam mit 1789 haben wir ein {em('Operating Model geschaffen')}, angepasst an unsere
      junge Kultur und Leistungsorientiertheit — unbeeinflusst von leistungsbeschneidenden
      Strukturen anderer Unternehmen. Zentral war für uns,{' '}
      {em('die Verantwortungsfähigkeit der Mitarbeiter zu erhöhen')}, um ihre Schaffenskräfte
      zu fördern, was 1789 in der {em('„Selbstorganisierenden Organisation"')} realisieren konnte.
    </>,
    name:      'Henrik Ekstrand',
    title:     'Founder',
    company:   'greyt.',
    photo:     '/testimonials/henrik-ekstrand.jpeg',
    linkedin:  'https://www.linkedin.com/in/henrikekstrand/',
    caseHref:  '/projekte/skalierung-und-qualitaet',
    caseLabel: 'Skalierung und Qualität durch Struktur',
  },
]

const VISIBLE   = 3
const MAX_OFFSET = TESTIMONIALS.length - VISIBLE // 2

// ─── Arrow button ─────────────────────────────────────────────────────────────

function ArrowBtn({
  dir, disabled, onClick,
}: { dir: 'prev' | 'next'; disabled: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'prev' ? 'Vorherige' : 'Nächste'}
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        justifyContent:  'center',
        width:           '2.5rem',
        height:          '2.5rem',
        borderRadius:    '50%',
        border:          '1px solid rgba(255,255,255,0.35)',
        backgroundColor: 'transparent',
        color:           'rgba(255,255,255,0.9)',
        cursor:          disabled ? 'default' : 'pointer',
        opacity:         disabled ? 0.28 : 1,
        transition:      'background 200ms, opacity 200ms, border-color 200ms',
        flexShrink:      0,
      }}
      onMouseEnter={e => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.12)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
      }}
    >
      {dir === 'prev' ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function TestimonialCard({
  quote, name, title, company, photo, linkedin, caseHref, caseLabel,
}: (typeof TESTIMONIALS)[number]) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div
      className="testimonial-card"
      style={{
        height:          '100%',
        display:         'flex',
        flexDirection:   'column',
        borderRadius:    'var(--radius-md)',
        overflow:        'hidden',
        backgroundColor: 'var(--color-background)',
        boxShadow:       '0 0 0 1px rgba(26,23,20,0.10)',
      }}
    >
      {/* ── Portrait ──────────────────────────────────────────────────────── */}
      <div
        className="t-card-photo"
        style={{
          position:        'relative',
          flexShrink:      0,
          height:          '54%',
          overflow:        'hidden',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={name}
            className="t-card-img"
            style={{
              width:          '100%',
              height:         '100%',
              objectFit:      'cover',
              objectPosition: 'top center',
              display:        'block',
            }}
          />
        ) : (
          <div
            style={{
              width:           '100%',
              height:          '100%',
              background:      'linear-gradient(135deg, var(--color-terra) 0%, rgba(244,77,11,0.55) 100%)',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle:  'italic',
                fontSize:   'clamp(4rem, 6vw, 7rem)',
                color:      'rgba(255,255,255,0.30)',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {initials}
            </span>
          </div>
        )}

        {/* Colour wash — #8FA66A duotone */}
        <div
          aria-hidden
          style={{
            position:      'absolute',
            inset:         0,
            background:    'rgba(143,166,106,0.65)',
            mixBlendMode:  'multiply',
            pointerEvents: 'none',
          }}
        />

        {/* Company pill */}
        <div
          style={{
            position:             'absolute',
            bottom:               '0.875rem',
            left:                 '1rem',
            fontFamily:           'var(--font-mono)',
            fontSize:             '0.595rem',
            letterSpacing:        '0.15em',
            textTransform:        'uppercase',
            color:                'var(--color-terra)',
            backgroundColor:      'rgba(242,242,242,0.84)',
            backdropFilter:       'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            padding:              '0.28rem 0.65rem',
            borderRadius:         '3px',
            whiteSpace:           'nowrap',
          }}
        >
          {company}
        </div>
      </div>

      {/* ── Text zone ─────────────────────────────────────────────────────── */}
      <div
        style={{
          flex:          1,
          minHeight:     0,
          display:       'flex',
          flexDirection: 'column',
          padding:       '1rem 1.375rem 1.125rem',
          overflow:      'hidden',
        }}
      >
        <span
          aria-hidden
          style={{
            fontFamily:   'var(--font-display)',
            fontStyle:    'italic',
            fontSize:     '2.5rem',
            lineHeight:   0.7,
            color:        'var(--color-terra)',
            marginBottom: '0.5rem',
            display:      'block',
            userSelect:   'none',
            opacity:      0.85,
          }}
        >
          "
        </span>

        <p
          style={{
            fontFamily:    'var(--font-display)',
            fontStyle:     'italic',
            fontSize:      'clamp(0.82rem, 0.9vw, 0.98rem)',
            lineHeight:    1.62,
            letterSpacing: '-0.01em',
            color:         'var(--color-ink-muted)',
            flex:          1,
            minHeight:     0,
            overflow:      'hidden',
          }}
        >
          {quote}
        </p>

        <div style={{ flexShrink: 0, marginTop: '0.875rem' }}>
          <div
            style={{
              height:       '1px',
              background:   'linear-gradient(to right, rgba(26,23,20,0.18), transparent)',
              marginBottom: '0.75rem',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'space-between' }}>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {name}
              </p>
              {title && (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-ink-muted)', marginTop: '0.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', opacity: 0.75 }}>
                  {title}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              {caseHref && (
                <a
                  href={caseHref}
                  className="case-link"
                  title={caseLabel ?? undefined}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--color-terra)', textDecoration: 'none', opacity: 0.8, transition: 'opacity 200ms' }}
                >
                  Case ↗
                </a>
              )}
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} auf LinkedIn`}
                className="linkedin-hover"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '1.625rem', height: '1.625rem', borderRadius: '50%', border: '1px solid rgba(26,23,20,0.18)', color: 'var(--color-ink-muted)', flexShrink: 0, transition: 'color 200ms, border-color 200ms' }}
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function TestimonialsSection() {
  const [offset, setOffset] = useState(0)

  return (
    <div
      className="scroll-card testimonials-section"
      style={{
        top:             '5rem',
        height:          'calc(100svh - 5rem)',
        backgroundColor: 'var(--color-terra)',
        borderRadius:    '1.5rem 1.5rem 0 0',
        boxShadow:       'inset 0 6px 20px rgba(26,23,20,0.05)',
        display:         'flex',
        flexDirection:   'column',
        overflow:        'hidden',
      }}
    >
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div
        style={{
          flexShrink:     0,
          display:        'flex',
          alignItems:     'flex-end',
          justifyContent: 'space-between',
          paddingInline:  'var(--grid-margin)',
          paddingTop:     '3rem',
          paddingBottom:  '2rem',
        }}
      >
        <div>
          <span
            style={{
              display:       'inline-block',
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-xxs)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.9)',
              border:        '1px solid rgba(255,255,255,0.45)',
              borderRadius:  'var(--radius-full)',
              padding:       '0.3rem 0.9rem',
              marginBottom:  '1.25rem',
            }}
          >
            Stimmen
          </span>
          <h2
            className="font-heading font-normal"
            style={{ display: 'block', fontSize: 'var(--text-md)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--color-white)' }}
          >
            Was Kunden sagen.
          </h2>
        </div>

        {/* ── Arrows + counter ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '0.25rem' }}>
          <ArrowBtn dir="prev" disabled={offset === 0}          onClick={() => setOffset(o => Math.max(0, o - 1))} />
          <ArrowBtn dir="next" disabled={offset === MAX_OFFSET} onClick={() => setOffset(o => Math.min(MAX_OFFSET, o + 1))} />
        </div>
      </div>

      {/* ── Card track ────────────────────────────────────────────────────── */}
      {/*
        The outer div clips the overflow; the inner track slides via translateX.
        Card width = 1/3 of (viewport - 2×margin - 2×gaps).
        Step per arrow click = cardWidth + gap = the same expression + 1.5rem.
        We express this as a CSS calc so it stays correct at any viewport width.
      */}
      <div
        style={{
          flex:     1,
          minHeight: 0,
          overflow: 'hidden',
          paddingInline: 'var(--grid-margin)',
          paddingBottom: '2.5rem',
        }}
      >
        <div
          style={{
            display:    'flex',
            gap:        '1.5rem',
            height:     '100%',
            transform:  `translateX(calc(${-offset} * ((100vw - 2 * var(--grid-margin) - 2 * 1.5rem) / 3 + 1.5rem)))`,
            transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform',
          }}
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              style={{
                flexShrink: 0,
                width:      'calc((100vw - 2 * var(--grid-margin) - 2 * 1.5rem) / 3)',
                height:     '100%',
              }}
            >
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
