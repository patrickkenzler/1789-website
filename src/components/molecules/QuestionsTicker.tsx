'use client'

/**
 * QuestionsTicker
 *
 * A horizontally scrolling strip of real client questions — inspired by
 * diffferent.de's "What drives our clients" editorial device.
 *
 * Pattern: Verbatim client questions, in italic serif, auto-scroll.
 * Duplicated array creates a seamless marquee loop.
 */

const questions = [
  'Warum greifen unsere Strategien nicht mehr?',
  'Wie bauen wir Eigenverantwortung wirklich in die Struktur ein?',
  'Was hält uns davon ab, das zu sein, was wir wollen?',
  'Wie schaffen wir Transformation ohne die Organisation zu lähmen?',
  'Weshalb entscheiden wir noch wie vor 10 Jahren?',
  'Wo beginnt eigentlich unsere Veränderung?',
  'Was ist unser tatsächliches Operating Model?',
  'Wie machen wir den Gap endlich besprechbar?',
]

export function QuestionsTicker() {
  // Duplicate for seamless loop — marqueeSlide translates -50% (= first copy width)
  const items = [...questions, ...questions]

  return (
    <div
      style={{
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingBlock: '2rem',
        backgroundColor: 'var(--color-ink)',
      }}
    >
      {/* Label — sits above the ticker */}
      <div
        style={{
          paddingInline: 'var(--grid-margin)',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xxs)',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(242,242,242,0.4)',
          }}
        >
          Was unsere Kunden fragen
        </span>
        <span style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.12)' }} />
      </div>

      {/* Scrolling strip */}
      <div
        style={{
          display: 'flex',
          gap: '4rem',
          whiteSpace: 'nowrap',
          animation: 'marqueeSlide 45s linear infinite',
        }}
      >
        {items.map((q, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4rem',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
              color: 'rgba(242,242,242,0.65)',
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}
          >
            {q}
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontStyle: 'normal',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                color: 'var(--color-terra)',
              }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
