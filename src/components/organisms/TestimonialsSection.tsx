'use client'

/**
 * TestimonialsSection
 *
 * 5 client quotes in a 3+2 editorial grid.
 *
 * Animations:
 *  – Entrance: IntersectionObserver adds .in-view to the section;
 *    CSS transitions fade+slide each card up with a 120 ms stagger
 *    (driven by a --card-delay CSS custom property per card).
 *  – Hover: CSS class .testimonial-card handles lift + terra border
 *    (pure CSS, zero JS, composited transform only).
 */

import { useEffect, useRef } from 'react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote:
      '1789 führt uns bei der Gestaltung eines Target-Operating-Models, das den Anforderungen unseres schnelllebigen, dynamischen Marktes gerecht wird. 1789 geht weit über die traditionelle Beratung hinaus: Es handelt sich um einen gemeinsamen Entwicklungsprozess auf Augenhöhe – sie sind Innovatoren mit herausragender Expertise.',
    name:     'Sven Kalisch',
    title:    'CEO',
    company:  'teccle group',
    photo:    '/testimonials/sven-kalisch.jpg',
    linkedin: 'https://www.linkedin.com/in/sven-kalisch-b4113610b/',
  },
  {
    quote:
      'Es war sehr beeindruckend, wie schnell uns 1789 bereits nach dem ersten Kennenlernen vollends durchdrungen hat. 1789 hat uns gechallenged — immer anpackend, partnerschaftlich und stets mit Blick auf klaren Resultaten und Actions.',
    name:     'Daniel Kalisch',
    title:    'General Manager D.A.CH.',
    company:  'WD-40 Company',
    photo:    '/testimonials/daniel-kalisch.jpeg',
    linkedin: 'https://www.linkedin.com/in/daniel-kalisch-3b21a651',
  },
  {
    quote:
      'Mit einem tiefen Verständnis für die Herausforderungen eines Konzerns und für die Notwendigkeit, sich an neue Gegebenheiten anzupassen, wurde 1789 ausgewählt, um von strategischer Planung über Konzeption bis hin zur Implementierung als Partner zu fungieren.',
    name:     'Timo Salzsieder',
    title:    'Chief Information Officer',
    company:  'Müller Holding GmbH & Co. KG',
    photo:    '/testimonials/timo-salzsieder.jpeg',
    linkedin: 'https://www.linkedin.com/in/timo-salzsieder-88993514',
  },
  {
    quote:
      'Besonders wertvoll war für uns die Unterstützung seitens 1789 beim Workshopdesign und der Moderation großer Gruppen, einerseits im Managementteam aber auch mit ausgewählten Mitarbeitenden. So ist es uns gelungen, unterschiedliche Zielgruppen aktiv in den Prozess einzubinden. Außerdem war die Zusammenarbeit geprägt von großem Vertrauen und hat zu jedem Zeitpunkt Spaß gemacht.',
    name:     'Viola Krauss',
    title:    'Chief People and Culture Officer',
    company:  'WTS Deutschland',
    photo:    '/testimonials/viola-krauss.jpg',
    linkedin: 'https://www.linkedin.com/in/viola-krauss-3a09254b',
  },
  {
    quote:
      'Gemeinsam mit 1789 haben wir, angepasst an unsere junge Kultur und Leistungsorientiertheit, ein Operating Model geschaffen, unbeeinflusst von Erfahrungen in leistungsbeschneidenden Strukturen anderer Unternehmen. Zentral war für uns, die Verantwortungsfähigkeit der Mitarbeiter zu erhöhen, um ihre Schaffenskräfte zu fördern, was 1789 in der „Selbstorganisierenden Organisation" realisieren konnte.',
    name:     'Henrik Ekstrand',
    title:    'Founder',
    company:  'greyt.',
    photo:    '/testimonials/henrik-ekstrand.jpg',
    linkedin: 'https://www.linkedin.com/in/henrikekstrand/',
  },
]

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ name, photo }: { name: string; photo: string | null }) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt={name}
        style={{
          width:        '2.75rem',
          height:       '2.75rem',
          borderRadius: '50%',
          objectFit:    'cover',
          flexShrink:   0,
          border:       '1px solid var(--color-border)',
          opacity:      0.92,
        }}
      />
    )
  }

  return (
    <span
      aria-label={name}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        width:          '2.75rem',
        height:         '2.75rem',
        borderRadius:   '50%',
        backgroundColor:'var(--color-terra)',
        flexShrink:     0,
        fontFamily:     'var(--font-mono)',
        fontSize:       '0.65rem',
        letterSpacing:  '0.08em',
        color:          '#fff',
        userSelect:     'none',
      }}
    >
      {initials}
    </span>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function TestimonialCard({
  quote, name, title, company, photo, linkedin, wide, index,
}: (typeof TESTIMONIALS)[number] & { wide?: boolean; index: number }) {
  return (
    <div
      className="testimonial-card"
      style={{
        gridColumn:      wide ? 'span 6' : 'span 4',
        display:         'flex',
        flexDirection:   'column',
        justifyContent:  'space-between',
        padding:         'clamp(1.75rem, 2.5vw, 2.5rem)',
        border:          '1px solid var(--color-border)',
        borderRadius:    'var(--radius-md)',
        backgroundColor: 'var(--color-background)',
        /* stagger via CSS custom property — read by .in-view rule */
        ['--card-delay' as string]: `${index * 120}ms`,
      }}
    >
      {/* Opening quotation mark */}
      <span
        aria-hidden
        style={{
          fontFamily:   'var(--font-display)',
          fontStyle:    'italic',
          fontSize:     'clamp(3.5rem, 5vw, 6rem)',
          lineHeight:   0.8,
          color:        'var(--color-terra)',
          marginBottom: '1rem',
          display:      'block',
          userSelect:   'none',
        }}
      >
        "
      </span>

      {/* Quote body */}
      <p
        style={{
          fontFamily:    'var(--font-display)',
          fontStyle:     'italic',
          fontSize:      'clamp(1rem, 1.4vw, 1.375rem)',
          lineHeight:    1.55,
          letterSpacing: '-0.01em',
          color:         'var(--color-ink)',
          flex:          1,
          marginBottom:  '2rem',
        }}
      >
        {quote}
      </p>

      {/* Divider */}
      <div
        style={{
          height:          '1px',
          backgroundColor: 'var(--color-border)',
          marginBottom:    '1.25rem',
          opacity:         0.4,
        }}
      />

      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        <Avatar name={name} photo={photo} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily:   'var(--font-body)',
              fontSize:     'var(--text-xs)',
              fontWeight:   500,
              color:        'var(--color-ink)',
              whiteSpace:   'nowrap',
              overflow:     'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {name}
          </p>
          {(title || company) && (
            <p
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      'var(--text-xxs)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color:         'var(--color-ink-muted)',
                marginTop:     '0.15rem',
                whiteSpace:    'nowrap',
                overflow:      'hidden',
                textOverflow:  'ellipsis',
              }}
            >
              {[title, company].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>

        {/* LinkedIn icon */}
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} auf LinkedIn`}
          className="linkedin-hover"
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            justifyContent: 'center',
            width:          '2rem',
            height:         '2rem',
            borderRadius:   '50%',
            border:         '1px solid var(--color-border)',
            color:          'var(--color-ink-muted)',
            flexShrink:     0,
            transition:     'color 200ms, border-color 200ms',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
          </svg>
        </a>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view')
          observer.disconnect() // fire once
        }
      },
      { threshold: 0.08 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const row1 = TESTIMONIALS.slice(0, 3)
  const row2 = TESTIMONIALS.slice(3, 5)

  return (
    <section
      ref={sectionRef}
      className="testimonials-section"
      style={{ paddingBlock: '7rem', backgroundColor: 'var(--color-surface)' }}
    >
      <div
        style={{
          maxWidth:      '1920px',
          margin:        '0 auto',
          paddingInline: 'var(--grid-margin)',
        }}
      >
        {/* Section header */}
        <div style={{ marginBottom: '4rem' }}>
          <span
            style={{
              display:       'inline-block',
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-xxs)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         'var(--color-terra)',
              border:        '1px solid var(--color-terra)',
              borderRadius:  'var(--radius-full)',
              padding:       '0.3rem 0.9rem',
              marginBottom:  '1.5rem',
            }}
          >
            Stimmen
          </span>
          <h2
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'var(--text-md)',
              fontWeight:    300,
              lineHeight:    1.0,
              letterSpacing: '-0.02em',
              color:         'var(--color-ink)',
            }}
          >
            Was Kunden{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-terra)' }}>sagen.</em>
          </h2>
        </div>

        {/* Row 1 — 3 cards */}
        <div
          className="testimonials-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap:                 'clamp(1rem, 1.5vw, 1.5rem)',
            marginBottom:        'clamp(1rem, 1.5vw, 1.5rem)',
          }}
        >
          {row1.map((t, i) => (
            <TestimonialCard key={t.name} {...t} index={i} />
          ))}
        </div>

        {/* Row 2 — 2 cards */}
        <div
          className="testimonials-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap:                 'clamp(1rem, 1.5vw, 1.5rem)',
          }}
        >
          {row2.map((t, i) => (
            <TestimonialCard key={t.name} {...t} wide index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  )
}
